import { Experience, Education } from '../types';

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Senior Full Stack Developer',
    company: 'TechCorp Inc.',
    duration: 'Jan 2022 - Present',
    description: [
      'Lead a team of 5 developers working on enterprise-level web applications',
      'Architected and implemented a microservices-based platform using Node.js and React',
      'Reduced application load time by 40% through performance optimizations',
      'Implemented CI/CD pipelines and improved deployment reliability'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS', 'MongoDB']
  },
  {
    id: 2,
    role: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    duration: 'Mar 2019 - Dec 2021',
    description: [
      'Developed and maintained multiple client-facing web applications',
      'Designed and implemented RESTful APIs using Express and PostgreSQL',
      'Collaborated with designers to implement responsive UI designs',
      'Participated in code reviews and mentored junior developers'
    ],
    technologies: ['JavaScript', 'React', 'Express', 'PostgreSQL', 'Redux', 'Sass']
  },
  {
    id: 3,
    role: 'Frontend Developer',
    company: 'WebCreative Agency',
    duration: 'Jun 2017 - Feb 2019',
    description: [
      'Created responsive and interactive web interfaces for various clients',
      'Implemented designs using HTML, CSS, and JavaScript',
      'Optimized website performance and cross-browser compatibility',
      'Collaborated with UX designers to improve user experience'
    ],
    technologies: ['HTML/CSS', 'JavaScript', 'jQuery', 'React', 'Bootstrap']
  }
];

export const education: Education[] = [
  {
    id: 1,
    degree: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    duration: '2015 - 2017',
    description: 'Specialized in Software Engineering and Human-Computer Interaction'
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of California, Berkeley',
    duration: '2011 - 2015',
    description: 'Graduated with honors'
  }
];