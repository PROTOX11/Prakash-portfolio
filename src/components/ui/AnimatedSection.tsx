import React, { ReactNode } from 'react';
import useAnimateOnScroll from '../../hooks/useAnimateOnScroll';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'scale-in' | 'stagger-item';
  delay?: 1 | 2 | 3 | 4 | 5;
  threshold?: number;
  rootMargin?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation = 'fade-in-up',
  delay,
  threshold,
  rootMargin,
}) => {
  const { ref, isVisible } = useAnimateOnScroll({ threshold, rootMargin });
  
  const delayClass = delay ? `stagger-delay-${delay}` : '';
  const animationClass = `${animation} ${isVisible ? 'visible' : ''} ${delayClass}`;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`${animationClass} ${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;