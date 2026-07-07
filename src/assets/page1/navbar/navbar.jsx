import React, { useEffect, useRef, useState } from 'react';
import './navbar.css';

import { useRole, ROLES } from '../../../context/RoleContext.jsx';

function Navbar({ setActiveTab }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const drawerRef = useRef(null);
    const { activeRole, setActiveRole } = useRole();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleOutside = (e) => {
            if (menuOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const scrollTo = (id, tab) => {
        if (tab) setActiveTab(tab);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, tab ? 100 : 0);
        setMenuOpen(false);
    };

    const navLinks = [
        { label: 'About',    action: () => scrollTo('aboutw') },
        { label: 'Skills',   action: () => scrollTo('skills-section') },
        { label: 'Projects', action: () => scrollTo('portfolio-showcase', 'projects') },
        { label: 'Contact',  action: () => scrollTo('last_page') },
    ];

    const roleList = [
        { id: 'se',  emoji: '💻', short: 'Software' },
        { id: 'pm',  emoji: '📊', short: 'Product' },
    ];

    return (
        <>
            <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar__inner">
                    {/* Logo */}
                    <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <span className="navbar__logo-tag">SE & PM</span>
                    </button>

                    {/* Desktop Links */}
                    <div className="navbar__links">
                        {navLinks.map((link) => (
                            <button key={link.label} className="navbar__link" onClick={link.action}>
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Role Switcher */}
                    <div className="role-switcher" aria-label="Switch recruiter view">
                        {roleList.map((r) => (
                            <button
                                key={r.id}
                                className={`role-pill role-pill--${ROLES[r.id].color} ${activeRole === r.id ? 'role-pill--active' : ''}`}
                                onClick={() => setActiveRole(r.id)}
                                title={ROLES[r.id].label}
                                aria-pressed={activeRole === r.id}
                            >
                                <span className="role-pill__emoji">{r.emoji}</span>
                                <span className="role-pill__label">{r.short}</span>
                            </button>
                        ))}
                    </div>

                    {/* Hire Me CTA */}
                    <button
                        className="navbar__cta"
                        onClick={() => scrollTo('last_page')}
                    >
                        Hire Me
                    </button>

                    {/* Hamburger */}
                    <button
                        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <div className={`drawer-overlay ${menuOpen ? 'drawer-overlay--visible' : ''}`} onClick={() => setMenuOpen(false)} />

            {/* Mobile Drawer */}
            <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`} ref={drawerRef}>
                <div className="mobile-drawer__header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className="navbar__logo-tag">SE & PM</span>
                    </div>
                    <button className="mobile-drawer__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                </div>

                {/* Mobile Role Switcher */}
                <div className="mobile-role-switcher">
                    <p className="mobile-role-label">Viewing as:</p>
                    <div className="mobile-role-pills">
                        {roleList.map((r) => (
                            <button
                                key={r.id}
                                className={`role-pill role-pill--${ROLES[r.id].color} ${activeRole === r.id ? 'role-pill--active' : ''}`}
                                onClick={() => setActiveRole(r.id)}
                                title={ROLES[r.id].label}
                            >
                                <span className="role-pill__emoji">{r.emoji}</span>
                                <span className="role-pill__label">{r.short}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <nav className="mobile-drawer__nav">
                    {navLinks.map((link) => (
                        <button key={link.label} className="mobile-drawer__link" onClick={link.action}>
                            {link.label}
                            <span className="mobile-drawer__arrow">→</span>
                        </button>
                    ))}
                </nav>
                <div className="mobile-drawer__footer">
                    <button className="btn-primary" onClick={() => scrollTo('last_page')}>
                        Hire Me ✦
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;