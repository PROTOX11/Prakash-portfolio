import { useEffect, useRef, useState } from 'react';

interface UseAnimateOnScrollProps {
  threshold?: number;
  rootMargin?: string;
}

export function useAnimateOnScroll({ 
  threshold = 0.1, 
  rootMargin = "0px" 
}: UseAnimateOnScrollProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once the animation has triggered, we can stop observing
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

export default useAnimateOnScroll;