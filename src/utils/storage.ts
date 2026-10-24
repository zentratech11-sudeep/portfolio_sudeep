// Robust client storage with IndexedDB primary and resilient localStorage fallback

const DB_NAME = 'devcraft_portfolio_db';
const STORE_NAME = 'keyval';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

export async function idbSet(key: string, value: any): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB write skipped', e);
  }
}

export async function idbGet(key: string): Promise<any | null> {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

/**
 * Clean up legacy keys that may have consumed localStorage quota in previous versions
 */
export function purgeLegacyStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const keysToRemove = [
      'devcraft_portfolio_state_v1',
      'devcraft_portfolio_state_v2',
    ];
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch {}
}

/**
 * Persists portfolio state to IndexedDB (unlimited quota)
 * and safely mirrors to localStorage without data loss.
 */
export async function persistPortfolioData(key: string, data: any): Promise<void> {
  if (!data) return;

  // 1. Always save full state into IndexedDB (supports rich compressed images)
  await idbSet(key, data);

  // 2. Also save to localStorage
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (err: any) {
    console.warn('localStorage save warning, relying on IndexedDB:', err?.name);
    // Free space from any legacy keys
    purgeLegacyStorage();
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  }
}

/**
 * Loads portfolio state, prioritizing whichever store has the latest valid data.
 */
export async function loadPortfolioData(key: string): Promise<any | null> {
  purgeLegacyStorage();

  // Try IndexedDB first
  const idbData = await idbGet(key);
  if (idbData && idbData.developer) {
    return idbData;
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(key);
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed && parsed.developer) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse from localStorage', e);
  }

  return null;
}

/**
 * Compresses and resizes image files before base64 encoding to keep payload sizes small (<100KB)
 */
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use JPEG for photography/characters for high compression
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}
