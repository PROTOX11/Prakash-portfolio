import React, { createContext, useContext, useState, useEffect } from 'react';

export const ROLES = {
  se: {
    id: 'se',
    label: 'Software Engineer',
    short: 'Software',
    emoji: '💻',
    color: 'cyan',
    accentHex: '#00D4FF',
    headline: 'Software Engineer & Problem Solver',
    subheadline: 'I build, deploy and automate production-grade software end to end.',
    tagline: 'From designing scalable APIs and React frontends to shipping\nDocker pipelines, Kubernetes infra, and AI-powered features.',
    chips: ['Java', 'Spring Boot', 'React.js', 'Docker', 'Kubernetes', 'LangChain', 'GitHub Actions', 'AWS'],
    badges: ['Production-Grade Software', 'Cloud & DevOps', 'AI Integration'],
    resumeFile: '/resumes/Prakash_Kumar-SE.pdf',
    resumeName: 'Prakash_Kumar-SE.pdf',
    aboutHeading: 'Engineering at the intersection of\nCode, Cloud & AI',
    aboutPara1: "Hey, I'm Prakash Kumar — a B.Tech CSE graduate who builds and ships production-grade software. I've delivered 4 live SaaS platforms covering the full stack: Java/Spring Boot backends, React frontends, CI/CD pipelines with Docker & Kubernetes, and AI agents using LangChain and OpenAI.",
    aboutPara2: 'I thrive across the entire engineering stack — from REST API design and OAuth2 security, to zero-downtime Kubernetes deployments with Istio, to voice-to-action AI agents. Always shipping. Always improving.',
    contactDesc: "I'm actively seeking Software Engineer / DevOps / AI developer roles. I reply within 24 hours!",
    skillFeatured: 'all-tech', // all 3 tech cards featured
    filterTag: 'se',
  },
  pm: {
    id: 'pm',
    label: 'Product Manager',
    short: 'Product',
    emoji: '📊',
    color: 'gold',
    accentHex: '#FFB830',
    headline: 'Product Manager & SaaS Founder',
    subheadline: 'MVP Scoping · Roadmapping · User Research · Shipped 2 SaaS Products',
    tagline: 'Turning user pain points into shipped SaaS products —\nfrom idea to production with 25+ active users.',
    chips: ['MVP Scoping', 'Roadmapping', 'User Feedback', 'Figma', 'Jira', 'Notion', 'Agile', 'OKRs'],
    badges: ['Product Manager', 'SaaS Founder', 'Agile / Scrum'],
    resumeFile: '/resumes/Prakash_Kumar-PM.pdf',
    resumeName: 'Prakash_Kumar-PM.pdf',
    aboutHeading: 'Building products at the intersection of\nUser Needs, Feasibility & Business Goals',
    aboutPara1: "Hey, I'm Prakash Kumar — a PM-minded engineer who has conceived, built, and shipped 2 live SaaS products end-to-end. I led TickZen from idea to production, achieving 25+ active users and ~80% first-pass voice recognition accuracy through strategic PM decisions.",
    aboutPara2: 'I bridge the gap between user research and technical delivery — defining roadmaps, prioritizing features, and owning the full product lifecycle from requirement gathering to post-launch iteration based on user feedback.',
    contactDesc: "I'm open to PM / APM roles and SaaS product opportunities. Let's talk about building great products!",
    skillFeatured: 'pm',
    filterTag: 'pm',
  },
};

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [activeRole, setActiveRole] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_role');
      return ROLES[saved] ? saved : 'se';
    } catch {
      return 'se';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_role', activeRole);
    } catch {}
    document.documentElement.setAttribute('data-role', activeRole);
  }, [activeRole]);

  const role = ROLES[activeRole];

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole, role, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used inside RoleProvider');
  return ctx;
}
