export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
  icon?: React.ReactNode;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}