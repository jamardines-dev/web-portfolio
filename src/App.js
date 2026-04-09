import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// ASSET IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

import ProfilePic from './assets/pp.jpeg';
import javaLogo from './assets/java.png';
import kotlinLogo from './assets/kotlin.png';
import reactLogo from './assets/react.png';
import dockerLogo from './assets/Docker.png';
import pythonLogo from './assets/python.png';

import PanindaDemo from './assets/projects/panindamobile.mp4';

import photo1 from './assets/gallery/photo1.jpg';
import photo2 from './assets/gallery/photo2.jpeg';
import photo3 from './assets/gallery/photo3.jpeg';
import photo4 from './assets/gallery/photo4.jpeg';
import photo5 from './assets/gallery/photo5.jpeg';
import photo6 from './assets/gallery/photo6.jpeg';
import photo7 from './assets/gallery/photo7.jpg';
import photo8 from './assets/gallery/photo8.jpg';
import photo9 from './assets/gallery/photo9.jpg';

// ─────────────────────────────────────────────────────────────────────────────
// DATA CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const GALLERY_PHOTOS = [
  { src: photo1 },
  { src: photo2 },
  { src: photo3 },
  { src: photo4 },
  { src: photo5 },
  { src: photo6 },
  { src: photo7 },
  { src: photo8 },
  { src: photo9 },
];

const SKILLS = [
  { logo: javaLogo,   name: 'Java',   desc: 'Object-oriented applications and backend services' },
  { logo: kotlinLogo, name: 'Kotlin', desc: 'Android & mobile-first development' },
  { logo: reactLogo,  name: 'React',  desc: 'Modern, component-driven web interfaces' },
  { logo: dockerLogo, name: 'Docker', desc: 'Containerization for consistent development and deployment' },
  { logo: pythonLogo, name: 'Python', desc: 'Data processing, automation, and backend scripting' },
];

const PROJECTS = [
  { id: 1, num: '01', title: 'Paninda Mobile',    year: '2025', role: 'Frontend Developer',   status: 'completed' },
  { id: 2, num: '02', title: 'AlgoSensei',        year: '2025', role: '',                     status: 'in-progress' },
  { id: 3, num: '03', title: 'Masala Restaurant', year: '2025', role: 'Full-Stack Developer', status: 'completed' },
  { id: 4, num: '04', title: 'Portfolio CMS',     year: '2025', role: 'Solo Developer',       status: 'completed' },
];

const NAV_ITEMS = [
  ['hero',      'Home'],
  ['techstack', 'Tech Stack'],
  ['projects',  'Projects'],
];

const PANINDA_FEATURES = [
  'Real-time inventory tracking with low-stock alerts',
  'Secure transaction logging and permanent sales history',
  'Business insights and reports for data-driven decisions',
  'Full operator control with strong data security',
];

const PANINDA_TAGS = ['Kotlin', 'Spring Boot', 'PostgreSQL'];

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
`;

const CSS_STYLES = `
  /* ─── CSS Variables ─── */
  :root {
    --ink:       #0f0e0d;
    --ink-m:     #6b6760;
    --ink-f:     #c8c5bf;
    --paper:     #f7f5f1;
    --paper-2:   #edeae4;
    --rule:      #d4d0c8;
    --blue:      #1a48c4;
    --blue-dim:  rgba(26,72,196,0.07);
    --serif:     'Playfair Display', Georgia, serif;
    --sans:      'DM Sans', system-ui, sans-serif;
    --max-width: 960px;
  }

  /* ─── Reset & Base ─── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; scroll-padding-top: 56px; }
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    min-height: 100vh;
  }

  /* ─── Layout ─── */
  .pf-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pf-container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 32px;
  }

  /* ─── Navigation ─── */
  .pf-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: var(--paper);
    border-bottom: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow .3s;
  }
  .pf-nav.scrolled { box-shadow: 0 1px 12px rgba(0,0,0,.06); }
  .pf-nav-inner {
    width: 100%;
    max-width: var(--max-width);
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    margin: 0 auto;
  }
  .pf-logo {
    font-family: var(--serif);
    font-size: 17px;
    letter-spacing: -.02em;
    color: var(--ink);
    text-decoration: none;
    cursor: pointer;
    background: none;
    border: none;
  }
  .pf-nav-links { display: flex; gap: 28px; list-style: none; }
  .pf-nav-links button {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--ink-m);
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
    font-family: var(--sans);
    padding: 0;
  }
  .pf-nav-links button:hover { color: var(--blue); }
  .pf-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }
  .pf-hamburger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: var(--ink);
    transition: transform .3s, opacity .3s;
    transform-origin: center;
  }
  .pf-hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
  .pf-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .pf-hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

  /* ─── Mobile Menu ─── */
  .pf-mobile-menu {
    position: fixed;
    inset: 52px 0 0;
    z-index: 90;
    background: var(--paper);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 36px;
    border-top: 1px solid var(--rule);
  }
  .pf-mobile-menu button {
    font-family: var(--serif);
    font-size: 32px;
    letter-spacing: -.02em;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ink);
    transition: color .2s;
  }
  .pf-mobile-menu button:hover { color: var(--blue); }

  /* ─── Hero ─── */
  .pf-hero {
    padding-top: 52px;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .pf-hero-body {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 0 56px;
    align-items: center;
    padding: 56px 0;
    width: 100%;
  }

  /* ─── Internship Badge ─── */
  .pf-internship-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--blue);
    color: #fff;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .14em;
    text-transform: uppercase;
    padding: 7px 14px;
    margin-bottom: 28px;
  }
  .pf-internship-badge::before {
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #34C759;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: .5; transform: scale(1.5); }
  }

  /* ─── Hero Typography ─── */
  .pf-headline {
    font-family: var(--serif);
    font-size: clamp(15px, 5.5vw, 50px);
    line-height: 1.08;
    letter-spacing: -.03em;
    color: var(--ink);
    margin-bottom: 24px;
    text-align: left;
  }
  .pf-headline em { font-style: normal; color: var(--blue); font-size: 55px; }
  .pf-sub {
    font-size: 15px;
    line-height: 1.8;
    color: var(--ink-m);
    max-width: 400px;
    margin-bottom: 40px;
  }

  /* ─── CTA Buttons ─── */
  .pf-cta { display: flex; gap: 14px; flex-wrap: wrap; }
  .pf-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--ink);
    color: var(--paper);
    font-size: 12px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 13px 26px;
    text-decoration: none;
    transition: background .2s;
    font-family: var(--sans);
    border: none;
    cursor: pointer;
  }
  .pf-btn-primary:hover { background: var(--blue); }
  .pf-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--rule);
    color: var(--ink);
    font-size: 12px;
    letter-spacing: .1em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 13px 26px;
    text-decoration: none;
    transition: border-color .2s, color .2s;
    font-family: var(--sans);
    background: none;
    cursor: pointer;
  }
  .pf-btn-ghost:hover { border-color: var(--blue); color: var(--blue); }

  /* ─── Hero Photo ─── */
  .pf-hero-photo {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    filter: grayscale(10%);
    border: 1px solid var(--rule);
  }

  /* ─── Gallery ─── */
  .pf-gallery {
    padding: 32px 0 56px;
    width: 100%;
  }
  .pf-gallery-label {
    font-size: 11px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--ink-m);
    margin-bottom: 14px;
  }
  .pf-gallery-grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 5px;
  }
  .pf-gallery-item {
    aspect-ratio: 1;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--rule);
    transition: border-color .2s;
  }
  .pf-gallery-item:hover { border-color: var(--blue); }
  .pf-gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .5s;
    display: block;
  }
  .pf-gallery-item:hover img { transform: scale(1.08); }

  /* ─── Sections ─── */
  .pf-section {
    padding: 80px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid var(--rule);
  }
  .pf-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 22px 0 40px;
    width: 100%;
  }
  .pf-section-title {
    font-family: var(--serif);
    font-size: clamp(36px, 4.5vw, 54px);
    letter-spacing: -.02em;
    line-height: 1;
  }

  /* ─── Tech Stack ─── */
  .pf-tech-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    width: 100%;
  }
  .pf-tech-item {
    background: var(--paper);
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    transition: background .2s, border-color .2s;
    cursor: default;
    border: 1px solid var(--rule);
    border-radius: 8px;
  }
  .pf-tech-item:hover {
    background: var(--blue-dim);
    border-color: var(--blue);
  }
  .pf-tech-logo { width: 48px; height: 48px; object-fit: contain; }
  .pf-tech-name {
    font-size: 13px;
    letter-spacing: .12em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--ink);
  }
  .pf-tech-desc {
    font-size: 13px;
    color: var(--ink-m);
    text-align: center;
    line-height: 1.65;
  }

  /* ─── Projects Table ─── */
  .pf-proj-table { width: 100%; border-collapse: collapse; }
  .pf-proj-row {
    border-top: 1px solid var(--rule);
    cursor: pointer;
    transition: background .15s;
  }
  .pf-proj-row:last-child { border-bottom: 1px solid var(--rule); }
  .pf-proj-row:hover { background: var(--blue-dim); }
  .pf-proj-row td { padding: 22px 0; vertical-align: middle; }
  .pf-proj-num { font-size: 12px; color: var(--ink-f); width: 44px; letter-spacing: .04em; }
  .pf-proj-title {
    font-family: var(--serif);
    font-size: clamp(18px, 2.2vw, 26px);
    letter-spacing: -.01em;
    padding-right: 20px;
  }
  .pf-proj-year  { font-size: 12px; color: var(--ink-m); width: 60px; }
  .pf-proj-role  { font-size: 12px; color: var(--ink-m); width: 200px; }
  .pf-proj-status { width: 110px; text-align: right; }
  .pf-badge {
    display: inline-block;
    font-size: 10px;
    letter-spacing: .12em;
    text-transform: uppercase;
    font-weight: 500;
    padding: 5px 10px;
  }
  .pf-badge-done { background: #e8f5e9; color: #2e7d32; }
  .pf-badge-wip  { background: #fff8e1; color: #e65100; }
  .pf-proj-arrow { width: 36px; text-align: right; font-size: 18px; color: var(--ink-f); }
  .pf-proj-row:hover .pf-proj-arrow { color: var(--blue); }

  /* ─── Footer ─── */
  .pf-footer {
    border-top: 3px solid var(--ink);
    padding: 28px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
  }
  .pf-footer-links { display: flex; gap: 20px; }
  .pf-footer-links a {
    font-size: 12px;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--ink-m);
    text-decoration: none;
    transition: color .2s;
  }
  .pf-footer-links a:hover { color: var(--blue); }
  .pf-footer-copy { font-size: 11px; color: var(--ink-f); margin: 0 auto; }

  /* ─── Lightbox ─── */
  .pf-lightbox {
    position: fixed;
    inset: 0;
    z-index: 300;
    background: rgba(15,14,13,.94);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .pf-lightbox img {
    max-width: 90vw;
    max-height: 88vh;
    object-fit: contain;
    border: 1px solid var(--rule);
  }
  .pf-lightbox-close {
    position: absolute;
    top: 20px; right: 24px;
    background: none;
    border: 1px solid #555;
    color: #fff;
    width: 40px; height: 40px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color .2s;
  }
  .pf-lightbox-close:hover { border-color: #fff; }

  /* ─── Modal ─── */
  .pf-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(15,14,13,.8);
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .pf-modal {
    background: var(--paper);
    width: 100%;
    max-width: 820px;
    border-top: 3px solid var(--blue);
    max-height: 90vh;
    overflow-y: auto;
    margin: 0 auto;
  }
  .pf-modal-header {
    padding: 24px 32px 20px;
    border-bottom: 1px solid var(--rule);
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 16px;
  }
  .pf-modal-title { font-family: var(--serif); font-size: 28px; letter-spacing: -.02em; }
  .pf-modal-meta { display: flex; gap: 10px; align-items: center; margin-top: 10px; }
  .pf-modal-close {
    background: none;
    border: 1px solid var(--rule);
    cursor: pointer;
    width: 36px; height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-m);
    flex-shrink: 0;
    transition: border-color .2s, color .2s;
  }
  .pf-modal-close:hover { border-color: var(--blue); color: var(--blue); }
  .pf-modal-body { display: grid; grid-template-columns: 240px 1fr; }
  .pf-modal-video { border-right: 1px solid var(--rule); padding: 24px; }
  .pf-modal-video video { width: 100%; border: 1px solid var(--rule); }
  .pf-modal-video-caption { font-size: 11px; color: var(--ink-f); margin-top: 10px; letter-spacing: .06em; }
  .pf-modal-info { padding: 24px 32px; }
  .pf-modal-info p { font-size: 14px; line-height: 1.8; color: var(--ink-m); margin-bottom: 24px; }
  .pf-modal-sublabel {
    font-size: 10px;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: var(--ink-f);
    font-weight: 500;
    margin-bottom: 12px;
  }
  .pf-modal-features { list-style: none; margin-bottom: 24px; }
  .pf-modal-features li {
    font-size: 13px;
    color: var(--ink-m);
    line-height: 1.6;
    padding: 8px 0;
    border-bottom: 1px solid var(--rule);
    display: flex;
    gap: 12px;
  }
  .pf-modal-features li::before { content: '—'; color: var(--blue); flex-shrink: 0; }
  .pf-modal-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .pf-tag {
    font-size: 11px;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: 5px 12px;
    border: 1px solid var(--rule);
    color: var(--ink-m);
  }
  .pf-modal-footer {
    padding: 20px 32px;
    border-top: 1px solid var(--rule);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--paper-2);
  }
  .pf-modal-footer-label { font-size: 12px; color: var(--ink-f); letter-spacing: .06em; }

  /* ─── Responsive ─── */
  @media (max-width: 768px) {
    .pf-container { padding: 0 20px; }
    .pf-hero-body { grid-template-columns: 1fr; gap: 32px 0; padding: 40px 0; }
    .pf-hero-sidebar { order: -1; }
    .pf-hero-photo { aspect-ratio: 4/3; }
    .pf-headline { font-size: 40px; }
    .pf-internship-badge { font-size: 10px; }
    .pf-gallery-grid { grid-template-columns: repeat(3, 1fr); }
    .pf-gallery-item:nth-child(n+4) { display: none; }
    .pf-tech-grid { grid-template-columns: repeat(2, 1fr); }
    .pf-proj-role, .pf-proj-year { display: none; }
    .pf-modal-body { grid-template-columns: 1fr; }
    .pf-modal-video { border-right: none; border-bottom: 1px solid var(--rule); }
    .pf-nav-links { display: none; }
    .pf-hamburger { display: flex; }
    .pf-footer { flex-direction: column; text-align: center; }
    .pf-footer-copy { margin: 0; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

const Navigation = ({ scrolled, menuOpen, setMenuOpen, onNavigate }) => (
  <>
    <nav className={`pf-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="pf-nav-inner">
        <button className="pf-logo" onClick={() => onNavigate('hero')}>
          Jam Ardines
        </button>
        <ul className="pf-nav-links">
          {NAV_ITEMS.map(([id, label]) => (
            <li key={id}>
              <button onClick={() => onNavigate(id)}>{label}</button>
            </li>
          ))}
        </ul>
        <button
          className={`pf-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>

    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="pf-mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {NAV_ITEMS.map(([id, label]) => (
            <button key={id} onClick={() => onNavigate(id)}>{label}</button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </>
);

const HeroSection = ({ onScrollToProjects, onOpenLightbox }) => (
  <section id="hero" className="pf-hero">
    <div className="pf-container">
      <motion.div
        className="pf-hero-body"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left — Text */}
        <div>
          <div className="pf-internship-badge">Open for Internships</div>
          <h1 className="pf-headline">
            Hi, I'm Jam a<br />
            <em>Software Developer</em>
          </h1>
          <p className="pf-sub">
            Third-year BSCS student at the University of Cebu. I build reliable,
            user-friendly applications that solve real problems.
          </p>
          <div className="pf-cta">
            <button className="pf-btn-primary" onClick={onScrollToProjects}>
              View Projects ↓
            </button>
            <a
              className="pf-btn-ghost"
              href="https://github.com/jamardines-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="pf-btn-ghost"
              href="https://www.linkedin.com/in/jam-ardines-33407b392/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Right — Photo */}
        <div className="pf-hero-sidebar">
          <img src={ProfilePic} alt="Jam Ardines" className="pf-hero-photo" />
        </div>
      </motion.div>

      {/* Gallery */}
      <div className="pf-gallery">
        <p className="pf-gallery-label">Gallery</p>
        <div className="pf-gallery-grid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="pf-gallery-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => onOpenLightbox(photo.src)}
            >
              <img src={photo.src} alt={`Gallery ${i + 1}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TechStackSection = () => (
  <section id="techstack" className="pf-section">
    <div className="pf-container">
      <div className="pf-section-header">
        <h2 className="pf-section-title">Tech Stack</h2>
      </div>
      <div className="pf-tech-grid">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="pf-tech-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <img src={skill.logo} alt={skill.name} className="pf-tech-logo" />
            <p className="pf-tech-name">{skill.name}</p>
            <p className="pf-tech-desc">{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection = ({ onOpenPaninda }) => (
  <section id="projects" className="pf-section">
    <div className="pf-container">
      <div className="pf-section-header">
        <h2 className="pf-section-title">Projects</h2>
      </div>
      <table className="pf-proj-table">
        <tbody>
          {PROJECTS.map((project, i) => (
            <motion.tr
              key={project.id}
              className="pf-proj-row"
              onClick={() => project.id === 1 && onOpenPaninda()}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <td className="pf-proj-num">{project.num}</td>
              <td className="pf-proj-title">{project.title}</td>
              <td className="pf-proj-year">{project.year}</td>
              <td className="pf-proj-role">{project.role}</td>
              <td className="pf-proj-status">
                <span className={`pf-badge ${project.status === 'completed' ? 'pf-badge-done' : 'pf-badge-wip'}`}>
                  {project.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </td>
              <td className="pf-proj-arrow">→</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const Footer = () => (
  <footer className="pf-section" style={{ paddingTop: 0 }}>
    <div className="pf-container">
      <div className="pf-footer">
        <div className="pf-footer-links" />
        <p className="pf-footer-copy">
          © {new Date().getFullYear()} Jam Ardines. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const Lightbox = ({ image, onClose }) => (
  <AnimatePresence>
    {image && (
      <motion.div
        className="pf-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      >
        <button className="pf-lightbox-close" onClick={onClose}>✕</button>
        <motion.img
          src={image}
          alt="Gallery view"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const PanindaModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="pf-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      >
        <motion.div
          className="pf-modal"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pf-modal-header">
            <div>
              <h3 className="pf-modal-title">Paninda Mobile</h3>
              <div className="pf-modal-meta">
                <span className="pf-badge pf-badge-done">Completed</span>
                <span style={{ fontSize: 12, color: 'var(--ink-f)' }}>2025</span>
              </div>
            </div>
            <button className="pf-modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="pf-modal-body">
            <div className="pf-modal-video">
              <video controls autoPlay muted playsInline>
                <source src={PanindaDemo} type="video/mp4" />
              </video>
              <p className="pf-modal-video-caption">App demonstration</p>
            </div>
            <div className="pf-modal-info">
              <p>
                An all-in-one store assistant that simplifies business management
                and keeps operations organized for small to medium-sized retail stores.
              </p>
              <p className="pf-modal-sublabel">Key Features</p>
              <ul className="pf-modal-features">
                {PANINDA_FEATURES.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <p className="pf-modal-sublabel">Tech Stack</p>
              <div className="pf-modal-tags">
                {PANINDA_TAGS.map((tag) => (
                  <span key={tag} className="pf-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="pf-modal-footer">
            <span className="pf-modal-footer-label">Frontend Developer</span>
            <a
              className="pf-btn-primary"
              href="https://github.com/jamardines-dev/PanindaMobile_Frontend"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12 }}
            >
              View on GitHub ↗
            </a>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [panindaOpen, setPanindaOpen] = useState(false);
  const [lightbox,    setLightbox]    = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (panindaOpen || lightbox || menuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [panindaOpen, lightbox, menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <>
      <style>{FONTS}{CSS_STYLES}</style>

      <div className="pf-layout">
        <Navigation
          scrolled={scrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onNavigate={scrollTo}
        />

        <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HeroSection
            onScrollToProjects={() => scrollTo('projects')}
            onOpenLightbox={setLightbox}
          />
          <TechStackSection />
          <ProjectsSection onOpenPaninda={() => setPanindaOpen(true)} />
        </main>

        <Footer />
      </div>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
      <PanindaModal isOpen={panindaOpen} onClose={() => setPanindaOpen(false)} />
    </>
  );
}