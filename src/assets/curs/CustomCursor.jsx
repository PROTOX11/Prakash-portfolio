// src/components/CustomCursor.jsx
import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const animationFrameRef = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const cursorDotPos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (cursor && cursorDot) {
            const cursorLerpFactor = 0.1; // Slower for outer circle
            const cursorDotLerpFactor = 0.8; // Very fast for dot to align closely with mouse
            const speedThreshold = 10; // Pixels per frame for dislocation
            let dislocationBoost = 1;
            let dislocationTimer = null;

            // Set initial position instantly on mouse enter
            const handleMouseEnter = (e) => {
                mousePos.current = { x: e.clientX, y: e.clientY };
                cursorPos.current = { x: e.clientX, y: e.clientY }; // Set outer circle instantly
                cursorDotPos.current = { x: e.clientX, y: e.clientY }; // Set dot instantly
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                cursor.style.opacity = '1';
                cursorDot.style.opacity = '1';
            };

            // Update cursor position
            const updateCursorPosition = () => {
                const deltaX = mousePos.current.x - lastMousePos.current.x;
                const deltaY = mousePos.current.y - lastMousePos.current.y;
                velocity.current = { x: deltaX, y: deltaY };
                lastMousePos.current = { ...mousePos.current };

                const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (speed > speedThreshold) {
                    dislocationBoost = 0.5; // Increase lag for outer circle
                    clearTimeout(dislocationTimer);
                    dislocationTimer = setTimeout(() => {
                        dislocationBoost = 1; // Reset after 200ms
                    }, 200);
                }

                const effectiveCursorLerp = cursorLerpFactor * dislocationBoost;
                cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * effectiveCursorLerp;
                cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * effectiveCursorLerp;
                cursorDotPos.current.x += (mousePos.current.x - cursorDotPos.current.x) * cursorDotLerpFactor;
                cursorDotPos.current.y += (mousePos.current.y - cursorDotPos.current.y) * cursorDotLerpFactor;

                cursor.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px) translate(-50%, -50%)`;
                cursorDot.style.transform = `translate(${cursorDotPos.current.x}px, ${cursorDotPos.current.y}px) translate(-50%, -50%)`;

                animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
            };

            // Handle mouse movement
            const handleMouseMove = (e) => {
                mousePos.current = { x: e.clientX, y: e.clientY };
            };

            // Handle mouse leave
            const handleMouseLeave = () => {
                cursor.style.opacity = '0';
                cursorDot.style.opacity = '0';
            };

            // Add event listeners
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseenter', handleMouseEnter);
            document.addEventListener('mouseleave', handleMouseLeave);

            // Start animation loop
            updateCursorPosition();

            // Cleanup
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseenter', handleMouseEnter);
                document.removeEventListener('mouseleave', handleMouseLeave);
                cancelAnimationFrame(animationFrameRef.current);
                clearTimeout(dislocationTimer);
            };
        }
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor"></div>
            <div ref={cursorDotRef} className="cursor-dot"></div>
        </>
    );
};

export default CustomCursor;