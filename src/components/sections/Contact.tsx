import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import Button from '../ui/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }, 1500);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-blue-600 dark:text-blue-500" size={24} />,
      title: 'Location',
      content: 'San Francisco, CA'
    },
    {
      icon: <Mail className="text-blue-600 dark:text-blue-500" size={24} />,
      title: 'Email',
      content: 'john@example.com',
      link: 'mailto:john@example.com'
    },
    {
      icon: <Phone className="text-blue-600 dark:text-blue-500" size={24} />,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="section-container">
        <AnimatedSection animation="fade-in-up" className="mb-12 text-center">
          <h2 className="section-title mx-auto">Get In Touch</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out – I'm always open to 
            discussing new opportunities and interesting projects.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection animation="fade-in-up" delay={1} className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 h-full">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Available For</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Full-time positions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Contract work
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Freelance projects
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Consultation
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-up" delay={2} className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Send Me a Message</h3>
              
              {submitStatus === 'success' ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    Thank you for your message! I'll get back to you as soon as possible.
                  </p>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    There was an error sending your message. Please try again later.
                  </p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                        ${errors.name 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-700' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                        ${errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-700' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700'
                        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors
                      ${errors.message 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-700' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
                    placeholder="Your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>
                
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    icon={<Send size={16} />}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;