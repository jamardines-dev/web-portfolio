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
  const [scrolled, setScrolled] = useState(false);
  const [showPanindaModal, setShowPanindaModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const galleryPhotos = [
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

  const skills = [
    { logo: javaLogo, name: 'Java' },
    { logo: kotlinLogo, name: 'Kotlin' },
    { logo: reactLogo, name: 'React' },
  ];

  const projects = [
    { id: 1, title: 'Paninda Mobile', year: '2025', role: 'Frontend Developer', status: 'completed' },
    { id: 2, title: 'AlgoSensei', year: '2025', role: '', status: 'in-progress' },
    { id: 3, title: 'Masala Restaurant', year: '2025', role: 'Full-Stack Developer', status: 'completed' },
    { id: 4, title: 'Portfolio CMS', year: '2025', role: 'Solo Developer', status: 'completed' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (showPanindaModal || lightboxImage) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPanindaModal, lightboxImage]);

  const visiblePhotos = galleryPhotos.slice(startIndex, startIndex + 5);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < galleryPhotos.length - 5;

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex(prev => Math.min(prev + 1, galleryPhotos.length - 5));

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open lightbox with selected image
  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ scrollBehavior: 'smooth' }}>

      {/* Global smooth scroll styles */}
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed w-full top-0 left-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}>
        <div className="w-full max-w-[928px] px-6 py-6 flex items-center justify-between">
          <div className="text-sm font-medium tracking-wide cursor-pointer hover:text-blue-600 transition-colors" onClick={() => scrollToSection('home')}>Jam Ardines</div>
          <nav className="flex gap-8 text-sm">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('techstack')} className="hover:text-blue-600 transition-colors">Tech Stack</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition-colors">Projects</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[992px] w-full max-w-[928px] flex flex-col items-center justify-center bg-white mx-auto px-6 py-20">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Hero content */}
          <div className="min-h-[70vh] flex items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-16 w-full">
              <div className="flex-shrink-0">
                <img src={ProfilePic} alt="Jam Ardines" className="w-80 h-74 object-cover shadow-lg" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-light mb-8 leading-tight">
                  Hi, I'm Jam<br />
                  <span className="font-light">A</span>
                  <span className="text-blue-600"> Software Developer</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed text-justify">
                  I am a third-year BSCS student at the University of Cebu and an aspiring
                  Software Developer, passionate about building reliable and user-friendly applications.
                </p>
              </div>
            </div>
          </div>

          {/* GALLERY SECTION */}
          <div className="-mt-28 w-full">
            <p className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase mb-6">Gallery</p>
            
            <div className="relative group">
              
              {/* Left Arrow */}
              <button 
                onClick={handlePrev} 
                disabled={!canGoPrev}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 ${
                  canGoPrev 
                    ? 'opacity-100 hover:scale-110 hover:shadow-xl cursor-pointer text-gray-700' 
                    : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Previous photos"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* Photos Grid */}
              <div className="flex gap-4 overflow-hidden px-1">
                <AnimatePresence mode="popLayout">
                  {visiblePhotos.map((photo, idx) => (
                    <motion.div
                      key={photo.src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex-shrink-0 w-[160px] h-[160px] overflow-hidden cursor-pointer"
                      whileHover={{ y: -4, scale: 1.02 }}
                      onClick={() => openLightbox(photo.src)}
                    >
                      <img 
                        src={photo.src} 
                        alt="Gallery photo" 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Right Arrow */}
              <button 
                onClick={handleNext} 
                disabled={!canGoNext}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center transition-all duration-300 ${
                  canGoNext 
                    ? 'opacity-100 hover:scale-110 hover:shadow-xl cursor-pointer text-gray-700' 
                    : 'opacity-0 pointer-events-none'
                }`}
                aria-label="Next photos"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>

            </div>
          </div>

        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="techstack" className="min-h-[992px] flex items-center justify-center border-t border-gray-100">
        <div className="text-center">
          <h2 className="mb-8 text-gray-500 text-sm tracking-wide">TECH STACK</h2>
          <div className="flex gap-6 justify-center flex-wrap">
            {skills.map((s, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg font-medium text-gray-700">{s.name}</span>
                <img src={s.logo} className="w-12 h-12 object-contain" alt={s.name} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-[992px] flex items-center justify-center border-t border-gray-100">
        <div className="text-center w-full max-w-4xl px-6">
          <h2 className="mb-12 text-gray-500 text-sm tracking-wide">PROJECTS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, idx) => (
              <motion.div 
                key={p.id} 
                className="group p-6 border border-gray-100 rounded-lg cursor-pointer hover:shadow-lg hover:border-gray-200 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => p.id === 1 && setShowPanindaModal(true)}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>
                
                {p.status === 'in-progress' ? (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                    <span className="text-xs text-amber-600 font-medium">In Progress</span>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-12">
            <motion.a 
              href="https://www.linkedin.com/in/jam-ardines-33407b392/" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.2 }}
            >
              <img src={linkedinLogo} alt="LinkedIn" className="w-8 h-8 object-contain" />
            </motion.a>
            <motion.a 
              href="https://github.com/jamardines-dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.2 }}
            >
              <img src={githubLogo} alt="GitHub" className="w-8 h-8 object-contain" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer - All Rights Reserved */}
      <footer className="py-8 border-t border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Jam Ardines. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                aria-label="Close lightbox"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Expanded Image */}
              <img 
                src={lightboxImage} 
                alt="Expanded gallery photo" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Paninda Mobile Modal */}
      <AnimatePresence>
        {showPanindaModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPanindaModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-[90vw] md:max-w-[800px] max-h-[98vh] flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-gray-100">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium text-gray-900">Paninda Mobile</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">Completed</span>
                    <span className="text-xs text-gray-400">2025</span>
                  </div>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowPanindaModal(false)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex flex-col md:flex-row gap-6 p-6 overflow-y-auto">
                <div className="flex-shrink-0 w-full md:w-72">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <video className="w-full h-auto object-contain" controls autoPlay muted>
                      <source src={PanindaDemo} type="video/mp4" />
                    </video>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    An all-in-one store assistant that simplifies business management and keeps operations organized for small to medium-sized retail stores.
                  </p>

                  <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-3">Key Features</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      'Real-time inventory tracking with low-stock alerts',
                      'Secure transaction logging and permanent sales history',
                      'Business insights and reports for data-driven decisions',
                      'Full operator control with strong data security',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-3">Tech Stack</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Kotlin', 'Spring Boot', 'PostgreSQL'].map((t) => (
                      <span key={t} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                <span className="text-xs text-gray-400">Frontend Developer</span>
                <a
                  href="http://github.com/jamardines-dev/PanindaMobile_Frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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