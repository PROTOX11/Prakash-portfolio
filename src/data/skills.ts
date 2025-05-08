import { Skill } from '../types';

export const skills: Skill[] = [
  // Frontend Skills
  { name: 'HTML/CSS', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Vue.js', level: 80, category: 'frontend' },
  { name: 'Angular', level: 75, category: 'frontend' },
  { name: 'Redux', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'SASS/SCSS', level: 85, category: 'frontend' },
  { name: 'Webpack', level: 80, category: 'frontend' },
  
  // Backend Skills
  { name: 'Node.js', level: 90, category: 'backend' },
  { name: 'Express', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'Django', level: 75, category: 'backend' },
  { name: 'PHP', level: 70, category: 'backend' },
  { name: 'Laravel', level: 70, category: 'backend' },
  { name: 'GraphQL', level: 80, category: 'backend' },
  { name: 'REST API', level: 90, category: 'backend' },
  
  // Database Skills
  { name: 'MongoDB', level: 85, category: 'database' },
  { name: 'PostgreSQL', level: 80, category: 'database' },
  { name: 'MySQL', level: 85, category: 'database' },
  { name: 'Redis', level: 75, category: 'database' },
  { name: 'Firebase', level: 80, category: 'database' },
  
  // DevOps Skills
  { name: 'Docker', level: 80, category: 'devops' },
  { name: 'AWS', level: 75, category: 'devops' },
  { name: 'CI/CD', level: 80, category: 'devops' },
  { name: 'Git', level: 90, category: 'devops' },
  
  // Other Skills
  { name: 'Testing', level: 80, category: 'other' },
  { name: 'UI/UX Design', level: 75, category: 'other' },
  { name: 'Agile/Scrum', level: 85, category: 'other' },
  { name: 'Problem Solving', level: 90, category: 'other' },
];

export const skillCategories = [
  { value: 'all', label: 'All Skills' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'other', label: 'Other' }
];