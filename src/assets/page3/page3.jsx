import React, { useState, useEffect } from 'react';
import './page3.css';
import { useRole } from '../../context/RoleContext.jsx';

const projectsBase = [
  {
    title: 'Tickzen',
    image: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1781290784/website-front/tickzen_vd06ui.png',
    liveDemo: 'https://tickzen.in.net',
    github: 'https://github.com/PROTOX11/tickzen',
    roles: ['se', 'devops', 'pm', 'ai'],
    descriptions: {
      se:  'Production-grade multi-tenant SaaS with Kanban boards, multi-role access, OTP signup & Razorpay payments.\nBuilt ZentriXAI — a voice-to-action AI agent that converts speech into real CRUD ops with no manual input.',
      pm:  'Founded & led TickZen from idea to production as Product Owner.\nDesigned ZentriXAI roadmap, onboarded 25+ active users with ~80% voice recognition accuracy.',
    },
    tags: {
      se:  ['React.js', 'Node.js', 'FastAPI', 'MongoDB', 'AssemblyAI'],
      pm:  ['SaaS Founder', 'Product Owner', '25+ Users', '~80% Accuracy'],
    },
    tagColor: 'gold',
  },
  {
    title: 'MedTrackFit',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1750796322/front_lwn0zr.png',
    liveDemo: 'https://medtrackfit.in.net',
    github: 'https://github.com/PROTOX11/medtrackfit',
    roles: ['se', 'devops', 'pm', 'ai'],
    descriptions: {
      se:  '4-role access system (Patient, Mentor, Doctor) with Spring Security & OAuth2 and 15+ REST APIs.\nDeployed via Kubernetes + Istio CI/CD pipeline with zero-downtime on Ubuntu VPS.',
      pm:  'Conceived at AICTE IDE Bootcamp — ranked Top 10 (Top 4%) among 250+ startups.\nShowcased to Founder of Rodbez & IAS Officers of Patna at CIMP. Led product from idea → live platform.',
    },
    tags: {
      se:  ['Spring Boot', 'OAuth2', 'MySQL', 'Kubernetes'],
      pm:  ['Top 10 AICTE', 'CIMP Showcase', 'Health SaaS', 'Founder'],
    },
    tagColor: 'cyan',
  },
  {
    title: 'Cloud-Native Microservices',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1750796324/log_q3ira8.png',
    liveDemo: 'https://github.com/PROTOX11',
    github: 'https://github.com/PROTOX11',
    roles: ['devops', 'se'],
    descriptions: {
      se:  'Kubernetes microservices platform with Helm IaC — version-controlled Deployments, ConfigMaps & Ingress.\nIstio service mesh with canary deployments, mTLS, circuit breaking & Prometheus + Grafana observability.',
      pm:  '',
    },
    tags: {
      se:  ['Kubernetes', 'Helm', 'Istio', 'Prometheus'],
      pm:  [],
    },
    tagColor: 'cyan',
  },
  {
    title: 'Vartalap',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1750796324/log_q3ira8.png',
    liveDemo: 'https://vartalap.in.net',
    github: 'https://github.com/PROTOX11/vartalap',
    roles: ['se', 'devops', 'pm'],
    descriptions: {
      se:  'Real-time bidirectional chat with Socket.IO, MongoDB persistence & JWT auth.\nGitHub Actions CI/CD cut deployment from 45 min to under 5 min. Nginx + PM2 on Ubuntu VPS.',
      pm:  'WebSocket-driven social platform focused on zero-friction onboarding and low-latency messaging.\nDesigned the UX flow to minimise time-to-first-message and maximise user retention.',
    },
    tags: {
      se:  ['Socket.IO', 'MERN', 'Docker', 'GitHub Actions'],
      pm:  ['Real-time UX', 'WebSocket', 'Zero-friction', 'Community'],
    },
    tagColor: 'purple',
  },
  {
    title: 'Aura Elysian',
    image: 'https://res.cloudinary.com/dgbkepcti/image/upload/v1764253929/pic/aura_fpeoxg.png',
    liveDemo: 'https://auraelysian.shop',
    github: 'https://github.com/PROTOX11',
    roles: ['se', 'pm'],
    descriptions: {
      se:  'Full-stack D2C e-commerce (React, TypeScript, Node.js, MongoDB) with Razorpay checkout.\nCustom image pre-caching for Core Web Vitals, real-time multi-facet filtering & Admin order panel.',
      pm:  'D2C candle brand with a custom personalisation engine — customers upload reference images for bespoke orders.\nFocused on reducing purchase friction and increasing AOV through curated discovery.',
    },
    tags: {
      se:  ['React', 'TypeScript', 'Razorpay', 'MongoDB'],
      pm:  ['D2C Brand', 'Personalisation', 'AOV Focus', 'Admin Panel'],
    },
    tagColor: 'cyan',
  },
  {
    title: 'Page Crafter',
    image: 'https://res.cloudinary.com/dyjlmweqb/image/upload/v1771908564/page-crafter_daor00.png',
    liveDemo: 'https://page-crafter-ten.vercel.app/',
    github: 'https://github.com/PROTOX11',
    roles: ['se', 'pm'],
    descriptions: {
      se:  'Drag-and-drop homepage builder with live preview and clean HTML export.\nBuilt in vanilla JavaScript — showcasing DOM manipulation, event-driven architecture & dynamic layout.',
      pm:  'No-code page builder removing the biggest user friction: needing to write code.\nDrag, drop, preview, export — landing pages ready in minutes. Zero coding required.',
    },
    tags: {
      se:  ['JavaScript', 'DOM', 'Drag & Drop', 'Builder'],
      pm:  ['No-Code', 'UX-First', 'Friction Removal', 'Builder'],
    },
    tagColor: 'purple',
  },
];


const techStack = [
  { name: 'Java', icon: 'https://img.icons8.com/?size=100&id=2572&format=png&color=000000' },
  { name: 'Spring', icon: 'https://img.icons8.com/?size=100&id=90519&format=png&color=000000' },
  { name: 'PostgreSQL', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968342.png' },
  { name: 'MongoDB', icon: 'https://img.icons8.com/?size=100&id=8rKdRqZFLurS&format=png&color=000000' },
  { name: 'Docker', icon: 'https://cdn-icons-png.flaticon.com/512/919/919853.png' },
  { name: 'AWS', icon: 'https://img.icons8.com/?size=100&id=33039&format=png&color=000000' },
  { name: 'GCP', icon: 'https://img.icons8.com/?size=100&id=20766&format=png&color=000000' },
  { name: 'Python', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png' },
  { name: 'JavaScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968292.png' },
  { name: 'React', icon: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png' },
  { name: 'Node.js', icon: 'https://cdn-icons-png.flaticon.com/512/919/919825.png' },
  { name: 'TypeScript', icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png' },
  { name: 'Tailwind', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
  { name: 'Git', icon: 'https://img.icons8.com/?size=100&id=38388&format=png&color=000000' },
  { name: 'Jira', icon: 'https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000' },
  { name: 'Postman', icon: 'https://img.icons8.com/?size=100&id=EPbEfEa7o8CB&format=png&color=000000' },
];

const certificates = [
  {
    title: 'PBEL Virtual Internship on Web Development',
    issuer: 'IBM',
    date: 'Sep 2025',
    image: 'https://substackcdn.com/image/fetch/$s_!1XDp!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb162f2d8-7878-4f8c-9b3f-6184293024dc_1000x1000.jpeg',
    link: 'https://courses.ibmmooc.skillsnetwork.site/certificates/bc123576e857484babddcbe857a6ba73',
    tag: 'Cloud',
  },
  {
    title: 'Google Cloud Skills Boost — Gold League',
    issuer: 'Google',
    date: 'Sep 2023',
    image: 'https://img.icons8.com/color/96/000000/google-logo.png',
    link: 'https://www.credly.com/badges/d65b2a5a-ac1b-411d-999b-b5aa00c89464/public_url',
    tag: 'Cloud',
  },
  {
    title: 'Bootcamp on Innovation, Design & Entrepreneurship',
    issuer: 'MIC & AICTE',
    date: 'Feb 2025',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/All_India_Council_for_Technical_Education_logo.png/250px-All_India_Council_for_Technical_Education_logo.png',
    link: 'https://alumniapi.mic.gov.in/api/certificates/16525/69283',
    tag: 'Product',
  },
  {
    title: 'Certificate for Completion of Python',
    issuer: 'GUVI / HCL',
    date: 'Jul 2025',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhiL56AMokHtHVYH3nM92N_dLcUGcrXHeEZw&s',
    link: 'https://www.guvi.in/certificate?id=q5246oyHz5TE7J7314',
    tag: 'AI',
  },
  {
    title: 'Data Science Fundamentals',
    issuer: 'Cisco / Credly',
    date: 'Jul 2023',
    image: 'https://www.citypng.com/public/uploads/preview/cisco-square-blue-logo-icon-png-735811696612218gzoiadfplh.png',
    link: 'https://www.credly.com/badges/ad2ca419-b7c6-415b-9386-85bf91284166/print',
    tag: 'AI',
  },
  {
    title: 'Test Automation with Night.js',
    issuer: 'BrowserStack',
    date: 'Apr 2025',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn3qu6U5LyfKjpMWajhiu-U9bMheUb1Hu8UQ&s',
    link: 'https://drive.google.com/file/d/1luzF4Z-lQyJDQ74l6lqTl6eNGdY3AbyN/view',
    tag: 'DevOps',
  },
];

import VSCodeWorkspace from './VSCodeWorkspace.jsx';

function Page3() {
  const { activeRole, role } = useRole();

  const projects = projectsBase
    .filter(p => {
      if (activeRole === 'se') return p.roles.some(r => ['se', 'devops', 'ai'].includes(r));
      return p.roles.includes('pm') && p.descriptions['pm'];
    })
    .map(p => ({
      title: p.title,
      description: activeRole === 'se'
        ? (p.descriptions.se || p.descriptions.devops || p.descriptions.ai)
        : p.descriptions.pm,
      image: p.image,
      liveDemo: p.liveDemo,
      github: p.github,
      tags: activeRole === 'se'
        ? (p.tags.se?.length ? p.tags.se : p.tags.devops?.length ? p.tags.devops : p.tags.ai || [])
        : (p.tags.pm || []),
      tagColor: p.tagColor,
    }));

  return (
    <section className="page3-section">
      <div className="page3-inner">
        <div className="page3-header">
          <span className="section-label">Workspace</span>
          <h2 className="page3-title" id="portfolio-showcase">
            Interactive <span className="gradient-text">Showcase</span>
          </h2>
          <p className="page3-subtitle">
            {activeRole === 'se'
              ? 'Explore my full-stack architectures, DevOps pipelines, AI agents and engineering credentials in this IDE.'
              : 'Explore the products I founded, the roadmaps I built, and the outcomes I shipped.'}
          </p>
        </div>

        <VSCodeWorkspace
          projects={projects}
          techStack={techStack}
          certificates={certificates}
          activeRole={activeRole}
        />
      </div>
    </section>
  );
}

export default Page3;