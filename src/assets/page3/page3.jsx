import React, { useState } from 'react';
import './page3.css';

const projects = [
  {
    title: 'IntervueAI',
    description: 'Real-time mock interviews with AI, no forms or clicks just natural, ...',
    image: 'https://user-images.githubusercontent.com/placeholder/intervueai.png',
    liveDemo: 'https://intervueai.example.com',
  },
  {
    title: 'Blendy',
    description: 'A social app where you can connect in real-time, log in with one click, ...',
    image: 'https://user-images.githubusercontent.com/placeholder/blendy.png',
    liveDemo: 'https://blendy.example.com',
  },
  {
    title: 'WATCHit',
    description: 'A video streaming app made for easy, personal entertainment and...',
    image: 'https://user-images.githubusercontent.com/placeholder/watchit.png',
    liveDemo: 'https://watchit.example.com',
  },
];

const techStack = [
  { name: 'HTML', icon: 'https://cdn-icons-png.flaticon.com/512/732/732212.png' },
  { name: 'CSS', icon: 'https://cdn-icons-png.flaticon.com/512/732/732190.png' },
  { name: 'JavaScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
  { name: 'Tailwind CSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Express JS', icon: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
  { name: 'Node JS', icon: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
  { name: 'React + Native', icon: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
  { name: 'MongoDB', icon: 'https://cdn-icons-png.flaticon.com/512/919/919836.png' },
  { name: 'JWT', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png' },
  { name: 'PostgreSQL', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png' },
  { name: 'TypeScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
  { name: 'Docker', icon: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
];

function Page3() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="page3-container">
      <h1 className="page3-title">Portfolio Showcase</h1>
      <p className="page3-subtitle">
        Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
      </p>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
          aria-label="Projects Tab"
        >
          {'<>'} Projects
        </button>
        <button
          className={`tab-button ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
          aria-label="Certificates Tab"
        >
          &#x1F396; Certificates
        </button>
        <button
          className={`tab-button ${activeTab === 'techstack' ? 'active' : ''}`}
          onClick={() => setActiveTab('techstack')}
          aria-label="Tech Stack Tab"
        >
          &#x269B; Tech Stack
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'projects' && (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="live-demo-link">
                    Live Demo &#x2197;
                  </a>
                  <button className="details-button">Details &rarr;</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="certificates-placeholder">
            <p>Certificates content coming soon...</p>
          </div>
        )}

        {activeTab === 'techstack' && (
          <div className="techstack-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-card">
                <img src={tech.icon} alt={tech.name} className="tech-icon" />
                <p className="tech-name">{tech.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page3;
