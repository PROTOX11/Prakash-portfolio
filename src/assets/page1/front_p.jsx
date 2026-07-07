import { useEffect, useRef, useState } from 'react';
import './front_p.css';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { handleEmailClick } from "../Connect";
import { useRole, ROLES } from '../../context/RoleContext.jsx';

const ROLE_ORDER = ['se', 'pm'];
const CYCLE_INTERVAL = 4500;

function Front_p() {
  const canvasRef = useRef(null);

  // Global role — driven by navbar clicks only
  const { activeRole, role } = useRole();

  // ── LOCAL display role for cycling ────────────────────────────────────────
  const [localRoleId, setLocalRoleId] = useState(activeRole);
  const [visible, setVisible] = useState(true);
  const localRole = ROLES[localRoleId] || role;

  // Sync local role when user clicks navbar
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setLocalRoleId(activeRole);
      setVisible(true);
    }, 300);
    return () => clearTimeout(t);
  }, [activeRole]);



  // Particle canvas (unchanged)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Hero accent = local role accent (only changes in hero)
  const accentColor = localRole.accentHex || '#00D4FF';

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div className="hero__orb hero__orb--cyan" />
      <div className="hero__orb hero__orb--purple" />

      <div className="hero__content">
        <div className="hero__grid">
          <div className="hero__text-side">
            {/* Role indicator pill — shows local cycling role */}
            <div className="hero__role-banner"
              style={{ borderColor: `${accentColor}55`, background: `${accentColor}12` }}>
              <span className="hero__role-banner-dot"
                style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
              <span style={{ color: accentColor, fontWeight: 700, fontSize: '0.78rem' }}>
                {localRole.emoji} {localRole.label}
              </span>
              <span className="hero__role-banner-sep">·</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>Open to opportunities</span>
            </div>

            {/* Name — always static */}
            <h1 className="hero__name">
              Prakash <span className="gradient-text">Kumar</span>
            </h1>

            {/* Headline — static, fades between roles */}
            <p
              className="hero__headline"
              style={{
                color: accentColor,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
              }}
            >
              {localRole.headline}
            </p>

            {/* Subheadline */}
            <p className={`hero__subheadline hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.05s' }}>
              {localRole.subheadline}
            </p>

            {/* Role Badges */}
            <div className={`hero__roles hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.1s' }}>
              {localRole.badges.map((badge) => (
                <span key={badge} className="hero__role-badge" style={{
                  borderColor: `${accentColor}55`,
                  background: `${accentColor}15`,
                  color: accentColor,
                }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* Tagline */}
            <p className={`hero__tagline hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.15s' }}>
              {localRole.tagline.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>

            {/* Tech Chips */}
            <div className={`hero__chips hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.2s' }}>
              {localRole.chips.map((chip) => (
                <span key={chip} className="tech-chip">{chip}</span>
              ))}
            </div>

            {/* CTAs — use global role for resume download */}
            <div className={`hero__ctas hero__fade-item ${visible ? 'hero__fade-item--in' : ''}`}
              style={{ transitionDelay: '0.25s' }}>
              <button className="btn-primary" onClick={() => {
                const el = document.getElementById('portfolio-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                View Projects →
              </button>
              <a className="btn-secondary" href={role.resumeFile} download={role.resumeName}>
                Download Resume ↓
              </a>
            </div>

            {/* Social Icons */}
            <div className="hero__socials">
              <a href="https://github.com/PROTOX11" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/protox1142" target="_blank" rel="noopener noreferrer" className="hero__social-link hero__social-link--linkedin" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <button onClick={handleEmailClick} className="hero__social-link hero__social-link--email" aria-label="Email">
                <FaEnvelope />
              </button>
            </div>
          </div>

          <div className="hero__image-side">
            <div className="hero__image-wrapper">
              <div className="hero__image-ring" style={{ borderColor: `${accentColor}33`, boxShadow: `0 0 30px ${accentColor}18` }} />
              <img
                src="/resumes/prakash_photo.png"
                alt="Prakash Kumar"
                className="hero__image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  );
}

export default Front_p;