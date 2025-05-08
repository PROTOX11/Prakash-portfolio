import React from 'react';
import { ArrowDownCircle, Github, Linkedin, Twitter } from 'lucide-react';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';

const Hero: React.FC = () => {
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: 'https://twitter.com/' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
      
      {/* Background elements */}
      <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-gradient-to-tl from-blue-100 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-tl-full z-0 opacity-60"></div>
      <div className="absolute left-1/3 top-1/4 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob z-0"></div>
      <div className="absolute right-1/4 bottom-1/3 w-72 h-72 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fade-in-up" className="space-y-6">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium mb-2">
              Full Stack Developer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Hello, I'm <span className="text-blue-600 dark:text-blue-500">John Doe</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              I build exceptional and accessible digital experiences for the web. Focused on creating products that are inclusive, performant, and delightful.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 shadow-sm hover:shadow-md transition-all"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="scale-in" className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20 filter blur-lg"></div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-8 relative z-10">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="John Doe Portrait" 
                    className="w-full h-full object-cover mix-blend-overlay"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a 
            href="#about" 
            aria-label="Scroll to About section"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            <ArrowDownCircle size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;