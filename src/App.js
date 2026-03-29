import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfilePic from './assets/pp.jpeg';
import javaLogo from './assets/java.png';
import kotlinLogo from './assets/kotlin.png';
import reactLogo from './assets/react.png';
import githubLogo from './assets/github.png';
import linkedinLogo from './assets/linkedin.png';
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

export default function CleanMinimalPortfolio() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [showPanindaModal, setShowPanindaModal] = useState(false);
  const [startIndex, setStartIndex]   = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isMobile, setIsMobile]       = useState(false);

  const galleryPhotos = [
    { src: photo1 }, { src: photo2 }, { src: photo3 },
    { src: photo4 }, { src: photo5 }, { src: photo6 },
    { src: photo7 }, { src: photo8 }, { src: photo9 },
  ];

  const skills = [
    { logo: javaLogo,    name: 'Java'   },
    { logo: kotlinLogo,  name: 'Kotlin' },
    { logo: reactLogo,   name: 'React'  },
  ];

  const projects = [
    { id: 1, title: 'Paninda Mobile',   year: '2025', role: 'Frontend Developer',   status: 'completed'  },
    { id: 2, title: 'AlgoSensei',       year: '2025', role: '',                      status: 'in-progress' },
    { id: 3, title: 'Masala Restaurant',year: '2025', role: 'Full-Stack Developer',  status: 'completed'  },
    { id: 4, title: 'Portfolio CMS',    year: '2025', role: 'Solo Developer',        status: 'completed'  },
  ];

  const photosPerPage  = isMobile ? 3 : 5;
  const visiblePhotos  = galleryPhotos.slice(startIndex, startIndex + photosPerPage);
  const canGoPrev      = startIndex > 0;
  const canGoNext      = startIndex < galleryPhotos.length - photosPerPage;
  const totalDots      = galleryPhotos.length - photosPerPage + 1;

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 768); setStartIndex(0); };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (showPanindaModal || lightboxImage || menuOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPanindaModal, lightboxImage, menuOpen]);

  const handlePrev  = () => setStartIndex(p => Math.max(p - 1, 0));
  const handleNext  = () => setStartIndex(p => Math.min(p + 1, galleryPhotos.length - photosPerPage));
  const goToSlide   = (i) => setStartIndex(i);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── HEADER ── */}
      <header className={`fixed w-full top-0 left-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="w-full max-w-[928px] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <div
            className="text-sm font-medium tracking-wide cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => scrollToSection('home')}
          >
            Jam Ardines
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex gap-6 md:gap-8 text-sm">
            <button onClick={() => scrollToSection('home')}      className="hover:text-blue-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('techstack')} className="hover:text-blue-600 transition-colors">Tech Stack</button>
            <button onClick={() => scrollToSection('projects')}  className="hover:text-blue-600 transition-colors">Projects</button>
          </nav>

          {/* Hamburger */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {[['home','Home'],['techstack','Tech Stack'],['projects','Projects']].map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)}
                className="text-2xl font-light text-gray-800 hover:text-blue-600 transition-colors">
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        id="home"
        className="w-full max-w-[928px] mx-auto px-4 sm:px-6 min-h-screen flex flex-col items-center justify-center pt-20 pb-12"
      >
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile — side by side on sm+, stacked on mobile */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8 sm:gap-12 md:gap-16 mb-10 sm:mb-14 w-full">
            <div className="flex-shrink-0">
              <img
                src={ProfilePic}
                alt="Jam Ardines"
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover shadow-lg"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 leading-tight">
                Hi, I'm Jam<br />
                <span className="font-light">A</span>
                <span className="text-blue-600"> Software Developer</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center sm:text-justify">
                I am a third-year BSCS student at the University of Cebu and an aspiring
                Software Developer, passionate about building reliable and user-friendly applications.
              </p>
            </div>
          </div>

          {/* ── GALLERY ── */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-gray-400 uppercase">Gallery</p>
              <div className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: totalDots }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      idx === startIndex ? 'w-4 sm:w-6 bg-gray-800' : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Left arrow */}
              <button
                onClick={handlePrev} disabled={!canGoPrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center transition-all duration-300 ${
                  canGoPrev ? 'opacity-100 hover:scale-110 cursor-pointer text-gray-700' : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Previous"
              >
                <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {visiblePhotos.map((photo, idx) => (
                    <motion.div
                      key={photo.src} layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="flex-1 min-w-0 aspect-square overflow-hidden cursor-pointer"
                      whileHover={{ y: -3, scale: 1.02 }}
                      onClick={() => setLightboxImage(photo.src)}
                    >
                      <img src={photo.src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Right arrow */}
              <button
                onClick={handleNext} disabled={!canGoNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center transition-all duration-300 ${
                  canGoNext ? 'opacity-100 hover:scale-110 cursor-pointer text-gray-700' : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Next"
              >
                <svg width="12" height="12" className="sm:w-[14px] sm:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="techstack" className="w-full border-t border-gray-100 py-20 sm:py-28 md:py-36">
        <div className="w-full max-w-[928px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="mb-8 sm:mb-10 text-gray-500 text-xs sm:text-sm tracking-widest uppercase">Tech Stack</h2>
          <div className="flex gap-6 sm:gap-8 justify-center flex-wrap">
            {skills.map((s, i) => (
              <motion.div key={i} className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }} transition={{ duration: 0.2 }}>
                <span className="text-base sm:text-lg font-medium text-gray-700">{s.name}</span>
                <img src={s.logo} className="w-9 h-9 sm:w-12 sm:h-12 object-contain" alt={s.name} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="w-full border-t border-gray-100 py-20 sm:py-28 md:py-36">
        <div className="w-full max-w-[928px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="mb-8 sm:mb-12 text-gray-500 text-xs sm:text-sm tracking-widest uppercase">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {projects.map((p, idx) => (
              <motion.div
                key={p.id}
                className="group p-5 sm:p-6 border border-gray-100 rounded-lg cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => p.id === 1 && setShowPanindaModal(true)}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>
                {p.status === 'in-progress' && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs text-amber-600 font-medium">In Progress</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-5 sm:gap-6 mt-10 sm:mt-12">
            <motion.a href="https://www.linkedin.com/in/jam-ardines-33407b392/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
              <img src={linkedinLogo} alt="LinkedIn" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            </motion.a>
            <motion.a href="https://github.com/jamardines-dev" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
              <img src={githubLogo} alt="GitHub" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full py-6 sm:py-8 border-t border-gray-100">
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Jam Ardines. All Rights Reserved.
        </p>
      </footer>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] flex items-center justify-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-10 sm:-top-12 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <img src={lightboxImage} alt="Gallery view" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PANINDA MODAL ── */}
      <AnimatePresence>
        {showPanindaModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowPanindaModal(false)}
          >
            <motion.div
              className="bg-white rounded-t-2xl sm:rounded-2xl border border-gray-200 shadow-2xl w-full sm:max-w-[800px] sm:mx-4 max-h-[92vh] flex flex-col"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Drag handle — mobile only */}
              <div className="sm:hidden flex justify-center pt-3 pb-0.5 flex-shrink-0">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex-shrink-0">
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-base sm:text-lg font-medium text-gray-900">Paninda Mobile</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">Completed</span>
                    <span className="text-xs text-gray-400">2025</span>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition flex-shrink-0"
                  onClick={() => setShowPanindaModal(false)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 overflow-y-auto flex-1">
                <div className="flex-shrink-0 w-full sm:w-60 md:w-72">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <video className="w-full h-auto object-contain" controls autoPlay muted playsInline>
                      <source src={PanindaDemo} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 sm:mb-5">
                    An all-in-one store assistant that simplifies business management and keeps operations organized for small to medium-sized retail stores.
                  </p>
                  <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2 sm:mb-3">Key Features</p>
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                    {[
                      'Real-time inventory tracking with low-stock alerts',
                      'Secure transaction logging and permanent sales history',
                      'Business insights and reports for data-driven decisions',
                      'Full operator control with strong data security',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-[7px]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2 sm:mb-3">Tech Stack</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Kotlin', 'Spring Boot', 'PostgreSQL'].map(t => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
                <span className="text-xs text-gray-400">Frontend Developer</span>
                <a
                  href="http://github.com/jamardines-dev/PanindaMobile_Frontend"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}