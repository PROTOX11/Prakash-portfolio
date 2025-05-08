import React, { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Card, CardImage, CardContent, CardTitle, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { projects, projectCategories } from '../../data/projects';
import { ExternalLink, Github, X } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = projects.filter(
    project => filter === 'all' || project.category === filter
  );

  const selectedProjectData = selectedProject !== null
    ? projects.find(p => p.id === selectedProject)
    : null;

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="section-container">
        <AnimatedSection animation="fade-in-up" className="mb-12 text-center">
          <h2 className="section-title mx-auto">My Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each project reflects my passion for creating 
            engaging, user-focused applications with clean, maintainable code.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in-up" className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {projectCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection
              key={project.id}
              animation="scale-in"
              delay={((index % 5) + 1) as 1 | 2 | 3 | 4 | 5}
              className="h-full flex"
            >
              <Card className="flex flex-col h-full">
                <CardImage 
                  src={project.image} 
                  alt={project.title}
                  className="h-48"
                />
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle>{project.title}</CardTitle>
                    {project.featured && (
                      <Badge variant="warning" className="ml-2">Featured</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center w-full">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      Details
                    </Button>
                    <div className="flex space-x-2">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                          aria-label="View GitHub repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Project Detail Modal */}
        {selectedProject !== null && selectedProjectData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProjectData.title}</h3>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <img 
                    src={selectedProjectData.image} 
                    alt={selectedProjectData.title} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Project Overview</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedProjectData.longDescription || selectedProjectData.description}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectData.technologies.map((tech) => (
                      <Badge key={tech} variant="primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  {selectedProjectData.demoUrl && (
                    <Button
                      variant="primary"
                      icon={<ExternalLink size={16} />}
                      onClick={() => window.open(selectedProjectData.demoUrl, '_blank')}
                    >
                      Live Demo
                    </Button>
                  )}
                  {selectedProjectData.githubUrl && (
                    <Button
                      variant="outline"
                      icon={<Github size={16} />}
                      onClick={() => window.open(selectedProjectData.githubUrl, '_blank')}
                    >
                      View Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;