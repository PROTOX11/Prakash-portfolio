
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
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
            || /android|iPad|iPhone|iPod|mobile/i.test(navigator.userAgent);
        if (isTouchDevice) return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        if (cursor && cursorDot) {
            const cursorLerpFactor = 0.1;
            const cursorDotLerpFactor = 0.8;
            const speedThreshold = 10;
            let dislocationBoost = 1;
            let dislocationTimer = null;

            const handleMouseEnter = (e) => {
                mousePos.current = { x: e.clientX, y: e.clientY };
                cursorPos.current = { x: e.clientX, y: e.clientY };
                cursorDotPos.current = { x: e.clientX, y: e.clientY };
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                cursor.style.opacity = '1';
                cursorDot.style.opacity = '1';
            };

            const updateCursorPosition = () => {
                const deltaX = mousePos.current.x - lastMousePos.current.x;
                const deltaY = mousePos.current.y - lastMousePos.current.y;
                velocity.current = { x: deltaX, y: deltaY };
                lastMousePos.current = { ...mousePos.current };

                const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (speed > speedThreshold) {
                    dislocationBoost = 0.5;
                    clearTimeout(dislocationTimer);
                    dislocationTimer = setTimeout(() => {
                        dislocationBoost = 1;
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

            const handleMouseMove = (e) => {
                mousePos.current = { x: e.clientX, y: e.clientY };
            };

            const handleMouseLeave = () => {
                cursor.style.opacity = '0';
                cursorDot.style.opacity = '0';
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseenter', handleMouseEnter);
            document.addEventListener('mouseleave', handleMouseLeave);

            updateCursorPosition();

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