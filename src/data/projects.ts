import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart, and payments.',
    longDescription: 'Built a complete e-commerce solution from the ground up, including product catalog, user authentication, shopping cart functionality, payment processing with Stripe, and order management. The application features a responsive design and optimized performance.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API'],
    image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'fullstack',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A Kanban-style task management application with drag-and-drop functionality.',
    longDescription: 'Developed a productivity application that allows users to organize tasks in a Kanban board format. Features include drag-and-drop task organization, custom categories, due dates, and notifications. The app uses real-time updates and synchronizes across devices.',
    technologies: ['React', 'TypeScript', 'Firebase', 'React DnD', 'Tailwind CSS'],
    image: 'https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'frontend',
    featured: true
  },
  {
    id: 3,
    title: 'Real-Time Chat Application',
    description: 'A real-time messaging platform with private and group chats.',
    longDescription: 'Created a real-time communication platform supporting private messaging, group chats, and media sharing. Implemented features like message status indicators, typing notifications, and read receipts. The application is fully responsive and supports multiple platforms.',
    technologies: ['React', 'Socket.IO', 'Express', 'MongoDB', 'Redis'],
    image: 'https://images.pexels.com/photos/7862558/pexels-photo-7862558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'fullstack'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather forecasting app with location search and detailed weather data.',
    longDescription: 'Built an intuitive weather application that provides current conditions and forecasts based on user location or search. Features include hourly and daily forecasts, interactive weather maps, and severe weather alerts. The UI is clean and optimized for all screen sizes.',
    technologies: ['JavaScript', 'React', 'OpenWeather API', 'Chart.js', 'Geolocation API'],
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'frontend'
  },
  {
    id: 5,
    title: 'Content Management System',
    description: 'A headless CMS with a modern admin interface and API.',
    longDescription: 'Designed and developed a flexible content management system that provides a powerful API for delivering content to various platforms. The admin interface offers intuitive content modeling, asset management, and workflow controls. The API supports multiple frontend frameworks.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'GraphQL', 'JWT', 'React'],
    image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'backend'
  },
  {
    id: 6,
    title: 'Fitness Tracking Mobile App',
    description: 'A mobile application for tracking workouts and nutrition.',
    longDescription: 'Developed a comprehensive fitness tracking application that allows users to log workouts, track nutrition, set goals, and view progress over time. Features include customizable workout plans, integration with wearable devices, and social sharing capabilities.',
    technologies: ['React Native', 'Redux', 'Firebase', 'HealthKit API', 'Google Fit API'],
    image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'mobile'
  }
];

export const projectCategories = [
  { value: 'all', label: 'All Projects' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'mobile', label: 'Mobile' }
];