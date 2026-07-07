import React, { useRef, useEffect } from 'react';
import './skills.css';
import { useRole } from '../../../context/RoleContext.jsx';

const skillCategories = [
    {
        id: 'software',
        icon: '💻',
        title: 'Software Engineering',
        subtitle: 'Full Stack · DevOps · Cloud · AI',
        glowColor: 'cyan',
        techIcons: [
            { name: 'Java', url: 'https://img.icons8.com/?size=100&id=2572&format=png&color=000000' },
            { name: 'React', url: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
            { name: 'Docker', url: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
            { name: 'K8s', url: 'https://img.icons8.com/?size=100&id=cvzmaEA4kC0o&format=png&color=000000' },
            { name: 'AWS', url: 'https://img.icons8.com/?size=100&id=33039&format=png&color=000000' },
            { name: 'Python', url: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
            { name: 'Node JS', url: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
            { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
        ],
        skillGroups: [
            {
                label: 'Languages & Frameworks',
                skills: [
                    { name: 'Java / Spring Boot', level: 85 },
                    { name: 'React.js / Next.js', level: 82 },
                    { name: 'Node.js / Express', level: 85 },
                    { name: 'TypeScript / JavaScript', level: 80 },
                ],
            },
            {
                label: 'DevOps & Cloud',
                skills: [
                    { name: 'Docker / Kubernetes', level: 88 },
                    { name: 'GitHub Actions / CI-CD', level: 90 },
                    { name: 'AWS · Nginx · Linux VPS', level: 75 },
                    { name: 'Terraform (IaC)', level: 68 },
                ],
            },
            {
                label: 'AI & Databases',
                skills: [
                    { name: 'LangChain / Prompt Eng.', level: 85 },
                    { name: 'OpenAI / Gemini API', level: 85 },
                    { name: 'SQL / MySQL / MongoDB', level: 78 },
                    { name: 'RAG Pipelines', level: 75 },
                ],
            },
        ],
    },
    {
        id: 'pm',
        icon: '📊',
        title: 'Product Management',
        subtitle: 'Strategy · Roadmapping · GTM',
        glowColor: 'gold',
        techIcons: [
            { name: 'Figma', url: 'https://img.icons8.com/?size=100&id=74402&format=png' },
            { name: 'Jira', url: 'https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000' },
            { name: 'Notion', url: 'https://img.icons8.com/?size=100&id=V3GEuSBPOEzK&format=png&color=000000' },
            { name: 'Git', url: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
            { name: 'Postman', url: 'https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000' },
        ],
        skillGroups: [
            {
                label: 'Product Strategy',
                skills: [
                    { name: 'MVP Scoping & Roadmapping', level: 88 },
                    { name: 'Feature Prioritization', level: 85 },
                    { name: 'User Feedback Iteration', level: 82 },
                    { name: 'Requirements Translation', level: 90 },
                ],
            },
            {
                label: 'Execution & Collaboration',
                skills: [
                    { name: 'Cross-functional Collab', level: 85 },
                    { name: 'Data-driven Decisions', level: 78 },
                    { name: 'Agile / Scrum', level: 82 },
                    { name: 'Stakeholder Communication', level: 85 },
                ],
            },
            {
                label: 'Technical Fluency',
                skills: [
                    { name: 'REST APIs & Postman', level: 88 },
                    { name: 'SQL / MongoDB', level: 78 },
                    { name: 'Git & Version Control', level: 85 },
                    { name: 'OpenAI Prompt Engineering', level: 80 },
                ],
            },
        ],
    },
];

function SkillBar({ name, level, color }) {
    const barRef = useRef(null);
    const hasAnimated = useRef(false); // ← never re-animate once done

    useEffect(() => {
        if (hasAnimated.current) return; // already filled — skip
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && barRef.current && !hasAnimated.current) {
                    barRef.current.style.width = `${level}%`;
                    hasAnimated.current = true;
                    observer.disconnect(); // stop watching
                }
            },
            { threshold: 0.3 }
        );
        if (barRef.current) observer.observe(barRef.current.parentElement);
        return () => observer.disconnect();
    }, [level]);

    return (
        <div className="skill-bar-item">
            <div className="skill-bar-header">
                <span className="skill-bar-name">{name}</span>
                <span className={`skill-bar-pct skill-bar-pct--${color}`}>{level}%</span>
            </div>
            <div className="skill-bar-track">
                <div ref={barRef} className={`skill-bar-fill skill-bar-fill--${color}`} style={{ width: 0 }} />
            </div>
        </div>
    );
}


function Skills() {
    const cardRefs = useRef([]);
    const { activeRole } = useRole();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                    else entry.target.classList.remove('visible');
                });
            },
            { threshold: 0.08 }
        );
        cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => cardRefs.current.forEach((ref) => { if (ref) observer.unobserve(ref); });
    }, []);

    // Show ONLY the card that matches the active role
    const activeCategory = activeRole === 'pm'
        ? skillCategories.find(c => c.id === 'pm')
        : skillCategories.find(c => c.id === 'software');

    const cats = activeCategory ? [activeCategory] : [];

    return (
        <section className="skills-section" id="skills-section">
            <div className="skills-inner">
                <div className="skills-header">
                    <span className="section-label">Expertise</span>
                    <h2 className="skills-heading">
                        My <span className="gradient-text">Skill Set</span>
                    </h2>
                    <p className="skills-subtitle">
                        {activeRole === 'pm'
                            ? 'Product strategy, user research, roadmapping and cross-functional execution.'
                            : 'Full-stack development, cloud infrastructure, DevOps automation and AI integration.'}
                    </p>
                </div>

                <div className="skills-grid-single">
                    {cats.map((cat, i) => (
                        <div
                            key={cat.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className={`skill-cat-card reveal skill-cat-card--${cat.glowColor} skill-cat-card--active`}
                        >
                            {/* Card Header */}
                            <div className="skill-cat-header">
                                <div className={`skill-cat-icon skill-cat-icon--${cat.glowColor}`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="skill-cat-title">{cat.title}</h3>
                                    <p className="skill-cat-subtitle">{cat.subtitle}</p>
                                </div>
                            </div>

                            {/* Tech Icon Row */}
                            <div className="skill-tech-icons">
                                {cat.techIcons.map((tech) => (
                                    <div key={tech.name} className="skill-tech-icon" title={tech.name}>
                                        <img src={tech.url} alt={tech.name} loading="lazy" />
                                    </div>
                                ))}
                            </div>

                            {/* Grouped Skill Bars */}
                            <div className="skill-groups">
                                {cat.skillGroups.map((group) => (
                                    <div key={group.label} className="skill-group">
                                        <p className="skill-group-label">{group.label}</p>
                                        <div className="skill-bars">
                                            {group.skills.map((skill) => (
                                                <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.glowColor} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;

