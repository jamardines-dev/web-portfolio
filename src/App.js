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

  const galleryPhotos = [
    { src: photo1, caption: 'photo 1' },
    { src: photo2, caption: 'photo 2' },
    { src: photo3, caption: 'photo 3' },
    { src: photo4, caption: 'photo 4' },
    { src: photo5, caption: 'photo 5' },
    { src: photo6, caption: 'photo 6' },
    { src: photo7, caption: 'photo 7' },
    { src: photo8, caption: 'photo 8' },
    { src: photo9, caption: 'photo 9' },
  ];

  const skills = [
    { logo: javaLogo, name: 'Java' },
    { logo: kotlinLogo, name: 'Kotlin' },
    { logo: reactLogo, name: 'React' },
  ];

  const projects = [
    { id: 1, title: 'Paninda Mobile', year: '2025', role: 'Frontend Developer' },
    { id: 2, title: 'AlgoSensei', year: '2025', role: 'Full-Stack Developer' },
    { id: 3, title: 'Masala Restaurant', year: '2025', role: 'Full-Stack Developer' },
    { id: 4, title: 'Portfolio CMS', year: '2025', role: 'Solo Developer' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPanindaModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPanindaModal]);

  const visiblePhotos = galleryPhotos.slice(startIndex, startIndex + 5);

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex(prev => Math.min(prev + 1, galleryPhotos.length - 5));

  return (
    <div className="min-h-screen bg-white text-gray-900 scroll-smooth">

      {/* Header */}
      <header className={`fixed w-full top-0 left-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-white'
      }`}>
        <div className="w-full max-w-[928px] px-6 py-6 flex items-center justify-between">
          <div className="text-sm font-medium tracking-wide">Jam Ardines</div>
          <nav className="flex gap-8 text-sm">
            <a href="#home">Home</a>
            <a href="#techstack">Tech Stack</a>
            <a href="#projects">Projects</a>
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
                <img src={ProfilePic} alt="Jam Ardines" className="w-80 h-74 object-cover" />
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

          {/* Gallery with arrows */}
          <div className="-mt-28 w-full">
            <p className="text-sm font-medium tracking-wide text-gray-500 mb-6">GALLERY</p>
            <div className="relative flex items-center justify-center gap-3">

              {/* Left arrow */}
              <button 
                onClick={handlePrev} 
                className="absolute left-0 z-10 p-2 bg-white border rounded-full shadow hover:bg-gray-50"
                disabled={startIndex === 0}
              >
                ◀
              </button>

              {/* Visible photos */}
              <div className="flex gap-3 overflow-hidden w-full justify-center">
                {visiblePhotos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    className="w-[150px] h-[150px] flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center text-gray-400 text-xs"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>

              {/* Right arrow */}
              <button 
                onClick={handleNext} 
                className="absolute right-0 z-10 p-2 bg-white border rounded-full shadow hover:bg-gray-50"
                disabled={startIndex >= galleryPhotos.length - 5}
              >
                ▶
              </button>

            </div>
          </div>

        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="techstack" className="min-h-[992px] flex items-center justify-center border-t">
        <div className="text-center">
          <h2 className="mb-8 text-gray-500 text-sm tracking-wide">SKILLS</h2>
          <div className="flex gap-6 justify-center flex-wrap">
            {skills.map((s, i) => (
              <motion.div key={i} className="flex items-center gap-4 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-2xl font-medium">{s.name}</span>
                <img src={s.logo} className="w-16 h-16 object-contain" alt={s.name} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-[992px] flex items-center justify-center border-t">
        <div className="text-center">
          <h2 className="mb-12 text-gray-500 text-sm tracking-wide">PROJECTS</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, idx) => (
              <motion.div key={p.id} className="p-6 border rounded-lg cursor-pointer hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => p.id === 1 && setShowPanindaModal(true)}
              >
                <h3 className="text-2xl font-medium mb-2">{p.title}</h3>
                <p className="text-gray-500 mb-1">{p.role}</p>
                <p className="text-gray-400 text-sm">{p.year}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <motion.a href="https://www.linkedin.com/in/jam-ardines-33407b392/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
              <img src={linkedinLogo} alt="LinkedIn" className="w-10 h-10" />
            </motion.a>
            <motion.a href="https://github.com/jamardines-dev" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
              <img src={githubLogo} alt="GitHub" className="w-10 h-10" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Paninda Mobile Modal - IMPROVED VERSION */}
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
              className="bg-white rounded-2xl border border-gray-200 shadow-xl w-full max-w-[90vw] md:max-w-[800px] max-h-[98vh] flex flex-col"
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
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-800">Completed</span>
                  </div>
                </div>
                <button
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition text-sm flex-shrink-0"
                  onClick={() => setShowPanindaModal(false)}
                >
                  ✕
                </button>
              </div>

              {/* Body (SCROLLABLE) */}
              <div className="flex gap-6 p-6 items-start overflow-y-auto flex-1">
                {/* Video — bigger */}
                <div className="flex-shrink-0 w-72">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <video className="w-full h-auto object-contain" controls autoPlay muted>
                      <source src={PanindaDemo} type="video/mp4" />
                    </video>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 text-justify">
                    An all-in-one store assistant that simplifies business management and keeps operations organized for small to medium-sized retail stores.
                  </p>

                  <p className="text-xs font-medium text-gray-400 tracking-widest uppercase mb-2.5">Key Features</p>
                  <ul className="space-y-1.5 text-justify">
                    {[
                      'Real-time inventory tracking with low-stock alerts',
                      'Secure transaction logging and permanent sales history',
                      'Business insights and reports for data-driven decisions',
                      'Full operator control with strong data security',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between flex-wrap gap-3 px-6 py-4 border-t border-gray-100">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-400">Tech stack</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {['Kotlin', 'Spring Boot', 'PostgreSQL'].map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 border border-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="http://github.com/jamardines-dev/PanindaMobile_Frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3.5 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  View on GitHub ↗
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}