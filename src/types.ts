export interface DeveloperProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  aboutTitle: string;
  avatarUrl: string;
  secondaryAvatarUrl: string;
  heroCharacterUrl: string;
  statusText: string;
  yearsExperience: number;
  completedProjects: number;
  dedicationRate: number;
  resumeUrl: string;
  email: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    youtube?: string;
    whatsapp?: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  iconName: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'design';
  proficiency: number;
  iconName: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  verified: boolean;
  credentialUrl: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'mobile' | 'dashboard' | 'design';
  description: string;
  fullOverview: string;
  keyFeatures: string[];
  techStack: string[];
  imageUrl: string;
  liveDemoUrl: string;
  githubUrl: string;
  metrics: string;
  featured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface ImageSlotTarget {
  key: string;
  currentUrl: string;
  label: string;
  aspectRatioHint?: string;
  onSelect: (newUrl: string) => void;
}
