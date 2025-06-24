import React, { useState, useEffect } from 'react';
import './page3.css';

const projects = [
  {
    title: 'MedtrackFit',
    description: 'MedTrackFit: Smart, AI-powered health tracking for personalized wellness insights....',
    image: 'https://user-images.githubusercontent.com/placeholder/intervueai.png',
    liveDemo: 'https://intervueai.example.com',
  },
  {
    title: 'Vartalap',
    description: 'A social app for real-time connection and effortless interaction., ...',
    image: 'https://user-images.githubusercontent.com/placeholder/blendy.png',
    liveDemo: 'https://blendy.example.com',
  },
  {
    title: 'We Help Together',
    description: 'We Help Together is a donation platform uniting communities to support those in need...',
    image: 'https://user-images.githubusercontent.com/placeholder/watchit.png',
    liveDemo: 'https://watchit.example.com',
  },
];

const techStack = [
  { name: 'Java', icon: 'https://img.icons8.com/?size=100&id=2572&format=png&color=000000' },
  { name: 'Spring', icon: 'https://img.icons8.com/?size=100&id=90519&format=png&color=000000' },
  { name: 'PostgreSQL', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png' },
  { name: 'MongoDB', icon: 'https://img.icons8.com/?size=100&id=8rKdRqZFLurS&format=png&color=000000' },
  { name: 'HTML', icon: 'https://cdn-icons-png.flaticon.com/512/732/732212.png' },
  { name: 'CSS', icon: 'https://cdn-icons-png.flaticon.com/512/732/732190.png' },
  { name: 'JavaScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
  { name: 'React + Native', icon: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
  { name: 'Docker', icon: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
  { name: 'Git', icon: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
  { name: 'Postman', icon: 'https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000' },
  { name: 'Jira', icon: 'https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000' },
  { name: 'AWS', icon: 'https://img.icons8.com/?size=100&id=33039&format=png&color=000000' },
  { name: 'GCP', icon: 'https://img.icons8.com/?size=100&id=20766&format=png&color=000000' },
  { name: 'JWT', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png' },
  { name: 'Node JS', icon: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
  { name: 'Express JS', icon: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
  { name: 'TypeScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
  { name: 'Tailwind CSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Expo', icon: 'https://img.icons8.com/?size=100&id=hmieDPifBlBM&format=png&color=000000' },
];

const certificates = [
  {
    title: 'Google Cloud Skill Badge',
    issuer: 'Google',
    date: 'Earned Sep 2023',
    image: 'https://img.icons8.com/color/96/000000/google-logo.png',
    link: 'https://www.credly.com/badges/d65b2a5a-ac1b-411d-999b-b5aa00c89464/public_url',
  },
  {
    title: 'Introduction to Data Science course',
    issuer: 'Cisco',
    date: 'Earned Sep 2023',
    image: 'https://static-00.iconduck.com/assets.00/cisco-icon-512x512-g1yuowb0.png',
    link: 'https://www.credly.com/badges/ad2ca419-b7c6-415b-9386-85bf91284166/print',
  },

];

function Page3({ activeTab, setActiveTab }) {
  
  const [fade, setFade] = useState(true);

  
  const handleTabChange = (tab) => {
    setFade(false); 
    setTimeout(() => {
      setActiveTab(tab); 
      setFade(true); 
    }, 300); 
  };

  
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  
  useEffect(() => {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible'); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    projectCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      projectCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [activeTab]); 

  return (
    <div className="page3-container">
      <h1 className="page3-title" id="portfolio-showcase">Portfolio Showcase</h1>
      <p className="page3-subtitle">
        Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
      </p>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => handleTabChange('projects')}
          aria-label="Projects Tab"
        >
          {'<>'} Projects
        </button>
        <button
          className={`tab-button ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => handleTabChange('certificates')}
          aria-label="Certificates Tab"
        >
          🎖 Certificates
        </button>
        <button
          className={`tab-button ${activeTab === 'techstack' ? 'active' : ''}`}
          onClick={() => handleTabChange('techstack')}
          aria-label="Tech Stack Tab"
        >
          ⚛ Tech Stack
        </button>
      </div>

      <div className={`tab-content ${fade ? 'fade-in' : 'fade-out'}`}>
        {activeTab === 'projects' && (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <img src={project.image} alt={project.title} className="project-image" />
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="live-demo-link">
                    Live Demo ↗
                  </a>
                  <button className="details-button">Details →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div id='certificates-section' className="certificates-grid">
            {certificates.map((cert) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-card"
              >
                <img src={cert.image} alt={cert.title} className="certificate-image" />
                <div className="certificate-info">
                  <h4 className="certificate-title">{cert.title}</h4>
                  <p className="certificate-issuer">{cert.issuer}</p>
                  <p className="certificate-date">{cert.date}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'techstack' && (
          <div id="techstack-section" className="techstack-grid">
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