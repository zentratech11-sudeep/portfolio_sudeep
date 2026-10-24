import JSZip from 'jszip';
import { 
  DeveloperProfile, 
  ServiceItem, 
  SkillItem, 
  CertificationItem, 
  ProjectItem 
} from '../types';

/**
 * Dynamically packages the entire project source code, embedding the user's
 * exact live customized images, copy, and configurations so the downloaded project
 * runs locally with all their new customizations already active.
 */
export async function downloadCustomizedZip(
  developer: DeveloperProfile,
  services: ServiceItem[],
  skills: SkillItem[],
  certifications: CertificationItem[],
  projects: ProjectItem[]
): Promise<void> {
  try {
    // 1. Fetch base project zip
    const response = await fetch('/portfolio-sudeep-tharu.zip');
    if (!response.ok) {
      throw new Error('Base template archive not found');
    }
    const arrayBuffer = await response.arrayBuffer();

    // 2. Load into JSZip
    const zip = await JSZip.loadAsync(arrayBuffer);

    // 3. Generate updated initialData.ts with CURRENT live customized data
    const updatedInitialDataCode = `import { DeveloperProfile, ServiceItem, SkillItem, CertificationItem, ProjectItem } from '../types';

export const INITIAL_DEVELOPER: DeveloperProfile = ${JSON.stringify(developer, null, 2)};

export const INITIAL_SERVICES: ServiceItem[] = ${JSON.stringify(services, null, 2)};

export const INITIAL_SKILLS: SkillItem[] = ${JSON.stringify(skills, null, 2)};

export const INITIAL_CERTIFICATIONS: CertificationItem[] = ${JSON.stringify(certifications, null, 2)};

export const INITIAL_PROJECTS: ProjectItem[] = ${JSON.stringify(projects, null, 2)};

export const IMAGE_PRESETS = [
  {
    label: "3D Spatial Tech Artwork",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    category: "3D Art",
  },
  {
    label: "Professional Male Developer Avatar",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    category: "Avatar",
  },
  {
    label: "Friendly Tech Engineer Portrait",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    category: "Avatar",
  },
  {
    label: "Creative Designer Avatar",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    category: "Avatar",
  },
  {
    label: "Modern SaaS Dashboard Mockup",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    category: "Project",
  },
];
`;

    // Overwrite with the latest live customized code
    zip.file('src/data/initialData.ts', updatedInitialDataCode);

    // Also include a custom export metadata file
    const meta = {
      exportedAt: new Date().toISOString(),
      developerName: developer.name,
      customImagesIncluded: true,
    };
    zip.file('custom-portfolio-config.json', JSON.stringify(meta, null, 2));

    // 4. Generate new customized zip blob
    const customizedBlob = await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    // 5. Trigger download
    const filename = `portfolio-${(developer.name || 'custom').toLowerCase().replace(/\s+/g, '-')}-source.zip`;
    const downloadUrl = URL.createObjectURL(customizedBlob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  } catch (err) {
    console.warn('Dynamic client zip generation failed, falling back to static zip', err);
    // Direct fallback
    window.location.href = '/portfolio-sudeep-tharu.zip';
  }
}
