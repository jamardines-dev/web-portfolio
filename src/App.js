import React, { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProfilePic from './assets/profile.jpg';
import javaLogo from './assets/java.png';
import kotlinLogo from './assets/kotlin.png';
import aspLogo from './assets/aps.png';
import reactLogo from './assets/react.png';
import githubLogo from './assets/github.png';
import linkedinLogo from './assets/linkedin.png';

export default function CleanMinimalPortfolio() {
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for glass header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                className="w-64 h-65 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
                Hi, I'm Jam<br />
                <span>A </span>
                <span className="text-blue-600">Software Developer</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
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
              >
                <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                <p className="text-gray-500 mb-2">{project.role}</p>
                <p className="text-gray-400 text-sm">{project.year}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-12">
            <motion.a
              href="https://www.linkedin.com/in/jam-ardines-33407b392/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <img src={linkedinLogo} alt="LinkedIn" className="w-10 h-10" />
            </motion.a>

            <motion.a
              href="https://github.com/jamardines" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <img src={githubLogo} alt="GitHub" className="w-10 h-10" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="w-full max-w-[928px] mx-auto px-6 py-8 flex items-center justify-center text-sm text-gray-500">
          <p>© 2025 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}