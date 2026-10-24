import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  DeveloperProfile, 
  ServiceItem,
  SkillItem, 
  CertificationItem, 
  ProjectItem, 
  ImageSlotTarget 
} from '../types';
import { 
  INITIAL_DEVELOPER, 
  INITIAL_SERVICES,
  INITIAL_SKILLS, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_PROJECTS 
} from '../data/initialData';
import { 
  persistPortfolioData, 
  loadPortfolioData 
} from '../utils/storage';
import { downloadCustomizedZip } from '../utils/zipExporter';

interface PortfolioContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  developer: DeveloperProfile;
  services: ServiceItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  activeImageTarget: ImageSlotTarget | null;
  openImagePicker: (target: ImageSlotTarget) => void;
  closeImagePicker: () => void;
  updateDeveloperField: <K extends keyof DeveloperProfile>(field: K, value: DeveloperProfile[K]) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  removeSkill: (id: string) => void;
  updateCertification: (id: string, updates: Partial<CertificationItem>) => void;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  removeCertification: (id: string) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  addProject: (proj: Omit<ProjectItem, 'id'>) => void;
  removeProject: (id: string) => void;
  saveChangesNow: () => void;
  downloadSourceZip: () => Promise<void>;
  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
  hasUnsavedChanges: boolean;
  saveStatus: string;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const STORAGE_KEY = 'devcraft_portfolio_state_sudeep_v1';
const THEME_KEY = 'devcraft_portfolio_theme';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [developer, setDeveloper] = useState<DeveloperProfile>(INITIAL_DEVELOPER);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [certifications, setCertifications] = useState<CertificationItem[]>(INITIAL_CERTIFICATIONS);
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [activeImageTarget, setActiveImageTarget] = useState<ImageSlotTarget | null>(null);
  const [saveStatus, setSaveStatus] = useState<string>('Saved');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Maintain ref to latest master state to avoid stale closure overwrites
  const stateRef = useRef({
    developer,
    services,
    skills,
    certifications,
    projects,
  });

  // Keep ref synchronized
  useEffect(() => {
    stateRef.current = {
      developer,
      services,
      skills,
      certifications,
      projects,
    };
  }, [developer, services, skills, certifications, projects]);

  // Initialize from storage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }
    } catch {}

    loadPortfolioData(STORAGE_KEY).then((savedState) => {
      if (savedState) {
        if (savedState.developer) {
          setDeveloper(prev => ({
            ...prev,
            ...savedState.developer,
            // Guard against empty strings wiping default images
            avatarUrl: savedState.developer.avatarUrl || prev.avatarUrl,
            secondaryAvatarUrl: savedState.developer.secondaryAvatarUrl || prev.secondaryAvatarUrl,
            heroCharacterUrl: savedState.developer.heroCharacterUrl || prev.heroCharacterUrl,
            email: savedState.developer.email || 'zentratech11@gmail.com',
          }));
        }
        if (Array.isArray(savedState.services) && savedState.services.length > 0) {
          setServices(savedState.services);
        }
        if (Array.isArray(savedState.skills) && savedState.skills.length > 0) {
          setSkills(savedState.skills);
        }
        if (Array.isArray(savedState.certifications) && savedState.certifications.length > 0) {
          setCertifications(savedState.certifications);
        }
        if (Array.isArray(savedState.projects) && savedState.projects.length > 0) {
          setProjects(savedState.projects);
        }
      }
    }).catch((e) => {
      console.warn('Failed to load saved portfolio state', e);
    });
  }, []);

  // Theme synchronization with HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  // Master persist function that always writes latest ref data
  const persistCurrentState = (customState?: any) => {
    const current = customState || stateRef.current;
    const payload = {
      developer: current.developer,
      services: current.services,
      skills: current.skills,
      certifications: current.certifications,
      projects: current.projects,
      updatedAt: new Date().toISOString(),
    };

    setSaveStatus('Saving...');
    persistPortfolioData(STORAGE_KEY, payload)
      .then(() => {
        setSaveStatus('All edits saved');
        setHasUnsavedChanges(false);
        setTimeout(() => setSaveStatus('Saved'), 2500);
      })
      .catch((e) => {
        console.warn('Storage persist note:', e);
        setSaveStatus('Saved in memory');
      });
  };

  const saveChangesNow = () => {
    persistCurrentState();
  };

  const downloadSourceZip = async () => {
    setSaveStatus('Packaging latest images & code...');
    try {
      await downloadCustomizedZip(
        stateRef.current.developer,
        stateRef.current.services,
        stateRef.current.skills,
        stateRef.current.certifications,
        stateRef.current.projects
      );
      setSaveStatus('ZIP Downloaded');
      setTimeout(() => setSaveStatus('Saved'), 3000);
    } catch (e) {
      console.warn('ZIP download error:', e);
      setSaveStatus('Saved');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const openImagePicker = (target: ImageSlotTarget) => {
    setActiveImageTarget(target);
  };

  const closeImagePicker = () => {
    setActiveImageTarget(null);
  };

  const updateDeveloperField = <K extends keyof DeveloperProfile>(field: K, value: DeveloperProfile[K]) => {
    setDeveloper(prev => {
      const updatedDev = { ...prev, [field]: value };
      stateRef.current.developer = updatedDev;
      persistCurrentState({
        ...stateRef.current,
        developer: updatedDev,
      });
      return updatedDev;
    });
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => {
      const updated = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      stateRef.current.services = updated;
      persistCurrentState({
        ...stateRef.current,
        services: updated,
      });
      return updated;
    });
  };

  const updateSkill = (id: string, updates: Partial<SkillItem>) => {
    setSkills(prev => {
      const updated = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      stateRef.current.skills = updated;
      persistCurrentState({
        ...stateRef.current,
        skills: updated,
      });
      return updated;
    });
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `skill-${Date.now()}`,
    };
    setSkills(prev => {
      const updated = [...prev, newSkill];
      stateRef.current.skills = updated;
      persistCurrentState({
        ...stateRef.current,
        skills: updated,
      });
      return updated;
    });
  };

  const removeSkill = (id: string) => {
    setSkills(prev => {
      const updated = prev.filter(s => s.id !== id);
      stateRef.current.skills = updated;
      persistCurrentState({
        ...stateRef.current,
        skills: updated,
      });
      return updated;
    });
  };

  const updateCertification = (id: string, updates: Partial<CertificationItem>) => {
    setCertifications(prev => {
      const updated = prev.map(c => (c.id === id ? { ...c, ...updates } : c));
      stateRef.current.certifications = updated;
      persistCurrentState({
        ...stateRef.current,
        certifications: updated,
      });
      return updated;
    });
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    const newCert: CertificationItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    setCertifications(prev => {
      const updated = [...prev, newCert];
      stateRef.current.certifications = updated;
      persistCurrentState({
        ...stateRef.current,
        certifications: updated,
      });
      return updated;
    });
  };

  const removeCertification = (id: string) => {
    setCertifications(prev => {
      const updated = prev.filter(c => c.id !== id);
      stateRef.current.certifications = updated;
      persistCurrentState({
        ...stateRef.current,
        certifications: updated,
      });
      return updated;
    });
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects(prev => {
      const updated = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      stateRef.current.projects = updated;
      persistCurrentState({
        ...stateRef.current,
        projects: updated,
      });
      return updated;
    });
  };

  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...proj,
      id: `proj-${Date.now()}`,
    };
    setProjects(prev => {
      const updated = [newProj, ...prev];
      stateRef.current.projects = updated;
      persistCurrentState({
        ...stateRef.current,
        projects: updated,
      });
      return updated;
    });
  };

  const removeProject = (id: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      stateRef.current.projects = updated;
      persistCurrentState({
        ...stateRef.current,
        projects: updated,
      });
      return updated;
    });
  };

  const resetToDefaults = () => {
    if (window.confirm("Reset all customizations back to default portfolio content?")) {
      setDeveloper(INITIAL_DEVELOPER);
      setServices(INITIAL_SERVICES);
      setSkills(INITIAL_SKILLS);
      setCertifications(INITIAL_CERTIFICATIONS);
      setProjects(INITIAL_PROJECTS);
      stateRef.current = {
        developer: INITIAL_DEVELOPER,
        services: INITIAL_SERVICES,
        skills: INITIAL_SKILLS,
        certifications: INITIAL_CERTIFICATIONS,
        projects: INITIAL_PROJECTS,
      };
      persistCurrentState(stateRef.current);
    }
  };

  const exportJSON = () => {
    const data = {
      developer,
      services,
      skills,
      certifications,
      projects,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${developer.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.developer && parsed.skills && parsed.projects) {
        setDeveloper(parsed.developer);
        if (parsed.services) setServices(parsed.services);
        setSkills(parsed.skills);
        if (parsed.certifications) setCertifications(parsed.certifications);
        setProjects(parsed.projects);
        stateRef.current = {
          developer: parsed.developer,
          services: parsed.services || INITIAL_SERVICES,
          skills: parsed.skills,
          certifications: parsed.certifications || [],
          projects: parsed.projects,
        };
        persistCurrentState(stateRef.current);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON file', e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        theme,
        toggleTheme,
        developer,
        services,
        skills,
        certifications,
        projects,
        activeImageTarget,
        openImagePicker,
        closeImagePicker,
        updateDeveloperField,
        updateService,
        updateSkill,
        addSkill,
        removeSkill,
        updateCertification,
        addCertification,
        removeCertification,
        updateProject,
        addProject,
        removeProject,
        saveChangesNow,
        downloadSourceZip,
        resetToDefaults,
        exportJSON,
        importJSON,
        hasUnsavedChanges,
        saveStatus,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
