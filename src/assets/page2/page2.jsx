import React, { useRef, useEffect } from 'react';
import './page2.css';
import { useRole } from '../../context/RoleContext.jsx';
import Skills from '../page1/skills/skills.jsx';

const stats = [
    { value: 4, label: 'SaaS Products', desc: 'Shipped live', icon: '🚀' },
    { value: 6, label: 'Certificates', desc: 'Professional credentials', icon: '🏅' },
    { value: 'Fresher', label: 'Experience', desc: 'Ready to contribute', icon: '🎓' },
];

function Page2({ setActiveTab }) {
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    const { role } = useRole();

    // Reveal on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
                else entry.target.classList.remove('visible');
            },
            { threshold: 0.12 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
    }, []);

    // Animated counters
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const numEl = entry.target.querySelector('.stat-number');
                        const target = parseInt(numEl?.getAttribute('data-value') || '0', 10);
                        let count = 0;
                        const step = Math.ceil(target / 30);
                        const timer = setInterval(() => {
                            count = Math.min(count + step, target);
                            if (numEl) numEl.textContent = count;
                            if (count >= target) clearInterval(timer);
                        }, 40);
                    }
                });
            },
            { threshold: 0.4 }
        );
        cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => cardRefs.current.forEach((ref) => { if (ref) observer.unobserve(ref); });
    }, []);

    const headingLines = role.aboutHeading.split('\n');

    return (
        <section className="about-skills-section" id="aboutw">
            <div className="about-skills-inner">

                {/* ─── ABOUT ME ─────────────────────────────── */}
                <div ref={sectionRef} className="about-block reveal">
                    <span className="section-label">About Me</span>
                    <h2 className="about-heading">
                        {headingLines[0]}<br />
                        <span className="gradient-text">{headingLines[1]}</span>
                    </h2>
                    <p className="about-para">{role.aboutPara1}</p>
                    <p className="about-para">{role.aboutPara2}</p>

                    {/* Stats row */}
                    <div className="about-stats-row">
                        {stats.map((stat, i) => (
                            <div
                                key={stat.label}
                                ref={(el) => (cardRefs.current[i] = el)}
                                className="about-stat-item"
                            >
                                <div className="about-stat-icon">{stat.icon}</div>
                                <div className="about-stat-number-row">
                                    {typeof stat.value === 'number' ? (
                                        <>
                                            <span className="stat-number" data-value={stat.value}>0</span>
                                            <span className="about-stat-plus">+</span>
                                        </>
                                    ) : (
                                        <span className="stat-number stat-number--text">{stat.value}</span>
                                    )}
                                </div>
                                <p className="about-stat-label">{stat.label}</p>
                                <p className="about-stat-desc">{stat.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="about-ctas">
                        <a
                            className="btn-primary"
                            href={role.resumeFile}
                            download={role.resumeName}
                            style={{ textDecoration: 'none' }}
                        >
                            Download Resume ↓
                        </a>
                        <button
                            className="btn-secondary"
                            onClick={() => {
                                const el = document.getElementById('portfolio-showcase');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Projects →
                        </button>
                    </div>
                </div>

                {/* ─── SKILLS (embedded, no section header) ── */}
                <div className="skills-block">
                    <Skills />
                </div>

            </div>
        </section>
    );
}

export default Page2;