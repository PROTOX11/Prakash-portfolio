import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' 
    : '';
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => (
  <div className={`w-full overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
);

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold text-gray-900 dark:text-white mb-2 ${className}`}>
    {children}
  </h3>
);

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`px-5 py-4 bg-gray-50 dark:bg-gray-900 ${className}`}>
    {children}
  </div>
);

export { Card };