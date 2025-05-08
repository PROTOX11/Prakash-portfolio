import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: <Github size={20} />, href: 'https://github.com/' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/' },
    { name: 'Twitter', icon: <Twitter size={20} />, href: 'https://twitter.com/' },
    { name: 'Email', icon: <Mail size={20} />, href: 'mailto:your-email@example.com' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">John Doe</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Full Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.
            </p>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin size={18} className="mr-2" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Home</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">About</a>
              <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Contact</a>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
          <p>© {currentYear} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;