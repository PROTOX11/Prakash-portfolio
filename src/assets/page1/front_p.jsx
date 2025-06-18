import { useState, useEffect, useRef } from 'react';
import './Front_p.css';

function Front_p() {
    const skillRefs = useRef([]);

    useEffect(() => {
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
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div className='front-ptop'>
                <span className='t1'>Full Stack</span>
                <span className='t2'>Developer</span>
            </div>
            <div className='skill_set flex flex-wrap gap-3 justify-start' data-aos="fade-up" data-aos-delay="1200">
                <span ref={(el) => (skillRefs.current[0] = el)} className='skill-item px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 hover:bg-white/10 transition-colors'>Spring</span>
                <span ref={(el) => (skillRefs.current[1] = el)} className='skill-item px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 hover:bg-white/10 transition-colors'>Java</span>
                <span ref={(el) => (skillRefs.current[2] = el)} className='skill-item px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 hover:bg-white/10 transition-colors'>MERN</span>
                <span ref={(el) => (skillRefs.current[3] = el)} className='skill-item px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/20 text-sm text-gray-300 hover:bg-white/10 transition-colors'>sql</span>
            </div>
        </>
    );
}

export default Front_p;