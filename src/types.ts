export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'Full-Stack' | 'AI & ML' | 'Mobile & Design' | 'Systems & Security';
  badge: string;
  featured: boolean;
  problem: string;
  solution: string;
  metrics: string[];
  tags: string[];
  github: string;
  liveUrl?: string;
  highlights?: string[];
  techStackDetailed?: {
    frontend?: string;
    backend?: string;
    database?: string;
    aiOrTools?: string;
  };
  dataModel?: string;
  dataVolumeNumeral?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'aimobile' | 'tools';
  tier: 'Production Core' | 'Proficient' | 'Specialized';
  projects: string[];
  description: string;
  accent: string;
  iconName?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issuerUrl?: string;
  date: string;
  badge: string;
  type: 'certification' | 'academic' | 'technical';
  description: string;
  credentialId?: string;
  skillsCovered: string[];
  details: string[];
  hasCertificatePreview: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  status: string;
  rollNo?: string;
  score?: string;
  description: string;
  highlights: string[];
  coursework: string[];
}

export interface ProfileData {
  name: string;
  tagline: string;
  role: string;
  location: string;
  currentCollege: string;
  university: string;
  school: string;
  degree: string;
  batch: string;
  semester: string;
  rollNo: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  github: string;
  linkedin: string;
  leetcode: string;
  bio: string;
  careerObjective: string;
}
