import React, { useState } from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import ProgressBar from '../ui/ProgressBar';
import { skills, skillCategories } from '../../data/skills';
import { experiences, education } from '../../data/experience';
import { Briefcase, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'experience' | 'education'>('skills');
  const [skillFilter, setSkillFilter] = useState('all');

  const filteredSkills = skills.filter(skill => 
    skillFilter === 'all' || skill.category === skillFilter
  );

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="section-container">
        <AnimatedSection animation="fade-in-up" className="mb-12 text-center">
          <h2 className="section-title mx-auto">About Me</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer with over 5 years of professional experience building 
            modern web applications. My goal is to create efficient, scalable, and user-friendly 
            solutions that solve real-world problems.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <AnimatedSection animation="fade-in-up" delay={1} className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 h-full">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="John Doe" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-blue-600 dark:text-blue-500 font-medium mb-4">Full Stack Developer</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Committed to creating elegant solutions to complex problems with clean and maintainable code.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Location:</span>
                  <span className="text-gray-900 dark:text-white">San Francisco, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Email:</span>
                  <a href="mailto:john@example.com" className="text-blue-600 dark:text-blue-500 hover:underline">john@example.com</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Availability:</span>
                  <span className="text-green-600 dark:text-green-500">Open to opportunities</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={2} className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`pb-3 px-1 font-medium ${
                      activeTab === 'skills' 
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`pb-3 px-1 font-medium ${
                      activeTab === 'experience' 
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`pb-3 px-1 font-medium ${
                      activeTab === 'education' 
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500' 
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Education
                  </button>
                </nav>
              </div>

              {activeTab === 'skills' && (
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skillCategories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSkillFilter(category.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          skillFilter === category.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSkills.map((skill, index) => (
                      <AnimatedSection 
                        key={skill.name} 
                        animation="stagger-item" 
                        delay={((index % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                        className="transition-all duration-300"
                      >
                        <ProgressBar 
                          label={skill.name} 
                          value={skill.level} 
                          variant={
                            skill.category === 'frontend' ? 'primary' :
                            skill.category === 'backend' ? 'secondary' :
                            skill.category === 'database' ? 'success' :
                            skill.category === 'devops' ? 'warning' : 'danger'
                          }
                        />
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <AnimatedSection 
                      key={exp.id} 
                      animation="stagger-item" 
                      delay={((index % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                      className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900 pb-5 last:pb-0"
                    >
                      <div className="absolute left-[-8px] top-0 w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full z-10">
                        <Briefcase size={16} className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="mb-1 text-blue-600 dark:text-blue-500 font-semibold">{exp.duration}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{exp.company}</p>
                      <ul className="mt-2 space-y-1">
                        {exp.description.map((item, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-400">• {item}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <AnimatedSection 
                      key={edu.id} 
                      animation="stagger-item" 
                      delay={((index % 5) + 1) as 1 | 2 | 3 | 4 | 5}
                      className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-purple-200 dark:before:bg-purple-900 pb-5 last:pb-0"
                    >
                      <div className="absolute left-[-8px] top-0 w-4 h-4 bg-purple-600 dark:bg-purple-500 rounded-full z-10">
                        <GraduationCap size={16} className="text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="mb-1 text-purple-600 dark:text-purple-500 font-semibold">{edu.duration}</div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{edu.institution}</p>
                      {edu.description && (
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{edu.description}</p>
                      )}
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;