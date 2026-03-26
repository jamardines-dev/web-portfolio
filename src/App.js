import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfilePic from './assets/pp.jpeg';
import javaLogo from './assets/java.png';
import kotlinLogo from './assets/kotlin.png';
import aspLogo from './assets/aps.png';
import reactLogo from './assets/react.png';
import githubLogo from './assets/github.png';
import linkedinLogo from './assets/linkedin.png';
import PanindaDemo from './assets/projects/panindamobile.mp4';

export default function CleanMinimalPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [showPanindaModal, setShowPanindaModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPanindaModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPanindaModal]);

  const skills = [
    { logo: javaLogo, name: 'Java' },
    { logo: kotlinLogo, name: 'Kotlin' },
    { logo: aspLogo, name: 'ASP.NET' },
    { logo: reactLogo, name: 'React' },
  ];

  const projects = [
    { id: 1, title: 'Paninda Mobile', year: '2025', role: 'Frontend Developer' },
    { id: 2, title: 'AlgoSensei', year: '2025', role: 'Full-Stack Developer' },
    { id: 3, title: 'Masala Restaurant', year: '2025', role: 'Full-Stack Developer' },
    { id: 4, title: 'Portfolio CMS', year: '2025', role: 'Solo Developer' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 scroll-smooth">

      {/* Glass Header */}
      <header
        className={`fixed w-full top-0 left-0 z-50 flex justify-center transition-all duration-300 ${
          scrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
      >
        <div className="w-full max-w-[928px] px-6 py-6 flex items-center justify-between">
          <div className="text-sm font-medium tracking-wide">Jam Ardines</div>
          <nav className="flex gap-8 text-sm">
            <a href="#home" className="hover:text-gray-600 transition">Home</a>
            <a href="#techstack" className="hover:text-gray-600 transition">Tech Stack</a>
            <a href="#projects" className="hover:text-gray-600 transition">Projects</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[992px] w-full max-w-[928px] flex items-center justify-center bg-white mx-auto px-6 py-20">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
            <div className="flex-shrink-0">
              <img
                src={ProfilePic}
                alt="Jam Ardines"
                className="w-80 h-90 object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-5xl font-light mb-8 leading-tight">
                Hi, I'm Jam<br />
                <span className="font-light">A</span>
                <span className="text-blue-600"> Software Developer</span>
              </h1>
              <p className="text-lg md:text-lg text-gray-600 leading-relaxed">
                I am a third-year BSCS student at the University of Cebu and an aspiring
                Software Developer, passionate about building reliable and user-friendly applications.
                I focus on creating well-structured systems and intuitive interfaces that provide
                meaningful solutions to real-world problems.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="techstack" className="relative min-h-[992px] w-full max-w-[928px] flex items-center justify-center bg-white border-t border-gray-200 mx-auto px-6 py-20">
        <div className="w-full text-center">
          <h2 className="text-sm font-medium tracking-wide mb-8 text-gray-500">SKILLS</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className="flex flex-row items-center gap-6 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <span className="text-2xl font-medium">{skill.name}</span>
                <img src={skill.logo} alt={skill.name} className="w-16 h-16 object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-[992px] w-full max-w-[928px] flex items-center justify-center bg-white border-t border-gray-200 mx-auto px-6 py-20">
        <div className="w-full text-center">
          <h2 className="text-sm font-medium tracking-wide mb-12 text-gray-500">PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="p-6 border rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => project.id === 1 && setShowPanindaModal(true)}
              >
                <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                <p className="text-gray-500 mb-2">{project.role}</p>
                <p className="text-gray-400 text-sm">{project.year}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <motion.a href="https://www.linkedin.com/in/jam-ardines-33407b392/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
              <img src={linkedinLogo} alt="LinkedIn" className="w-10 h-10" />
            </motion.a>
            <motion.a href="https://github.com/jamardines" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }}>
              <img src={githubLogo} alt="GitHub" className="w-10 h-10" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="w-full max-w-[928px] mx-auto px-6 py-8 flex items-center justify-center text-sm text-gray-500">
          <p>© 2026 Jam Ardines. All rights reserved</p>
        </div>
      </footer>

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