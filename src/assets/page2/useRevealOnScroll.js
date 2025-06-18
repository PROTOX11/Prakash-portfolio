import { useEffect, useRef } from "react";
import "./useReveal.css"
export function useRevealOnScroll() {
    const ref = useRef();

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add("visible");
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return ref;
}
