import { useState, useEffect, useRef } from 'react';
import './Front_p.css';

function Front_p() {
    const skillRefs = useRef([]);
    const starContainerRef = useRef(null);

    useEffect(() => {
        const container = starContainerRef.current;
        if (container) {
            for (let i = 0; i < 10; i++) { // Number of stars
                const star = document.createElement('div');
                star.innerHTML = `
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                    </svg>
                `;
                star.className = 'background-star';
                star.style.left = `${Math.random() * 100}vw`; // Random horizontal start
                star.style.top = `${Math.random() * -50}vh`; // Start above viewport
                star.style.animationDelay = `${Math.random() * 5}s`; // Random delay
                // Random direction (between -1 and 1 for x, 1 for y to ensure downward)
                const dx = (Math.random() - 0.5) * 2; // -1 to 1
                const dy = 1; // Ensure downward movement
                star.dataset.dx = dx;
                star.dataset.dy = dy;
                container.appendChild(star);
            }
        }

        const handleMouseMove = (e) => {
            skillRefs.current.forEach((ref) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    ref.style.setProperty('--x', `${x}px`);
                    ref.style.setProperty('--y', `${y}px`);
                }
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (container) container.innerHTML = ''; // Cleanup stars
        };
    }, []);

    return (
        <>
            <div ref={starContainerRef} className="star-container"></div>
            <div className='front-ptop'>
                <span className='t1'>Full Stack</span>
                <span className='t2'>Developer</span>
            </div>
            <div className='skill_set'>
                <span className='skill-item no-animation'>Spring</span>
                <span className='skill-item no-animation'>Java</span>
                <span className='skill-item no-animation'>MERN</span>
                <span className='skill-item no-animation'>SQL</span>
                <span className='skill-item'>Other Skill</span>
            </div>
            <div className='front-pro'>
                <span className='t3'>Projects</span>
                <span className='t4'>Contact</span>
            </div>
        </>
    );
}

export default Front_p;