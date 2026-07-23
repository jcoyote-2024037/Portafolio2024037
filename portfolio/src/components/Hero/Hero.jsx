import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Embers from '../Embers/Embers';
import heroImage from '../../assets/hero.png';

const phrases = [
  'Full Stack Developer',
  'Software Engineer',
  'Arquitecto Digital',
  'UI Innovator'
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, 40);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 80);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-bg-primary" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full"
          style={{
            width: 'min(50vw, 600px)', height: 'min(80vh, 700px)',
            background: 'radial-gradient(ellipse, rgba(var(--gold-rgb),0.07) 0%, rgba(var(--gold-rgb),0.02) 40%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="light-rays" style={{ opacity: 0.25 }} />
        <div className="glow-orb" style={{ top: '20%', left: '8%', width: '200px', height: '200px', animation: 'float-slow 8s ease-in-out infinite' }} />
        <div className="glow-orb" style={{ bottom: '15%', right: '15%', width: '150px', height: '150px', animation: 'float-slow 12s ease-in-out infinite reverse' }} />
      </div>

      <ConstellationLines />

      <div className="absolute inset-0 stone-texture" />
      <Embers />
      <div className="bottom-glow" />

      <div className="relative z-10 w-full section-container" style={{ paddingTop: 'clamp(4rem, 6vh, 6rem)', paddingBottom: 0 }}>
        <motion.div
          className="hero-grid"
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          <div className="hero-left flex flex-col justify-center" style={{ gap: 'clamp(1.5rem, 2.5vh, 2.5rem)' }}>
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2.5 caption text-gold/60 border border-gold/12 px-5 py-2.5 rounded-full backdrop-blur-sm bg-gold/[0.02]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold/60" />
                </span>
                <span>{displayText}<span className="animate-pulse">|</span></span>
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="subheading text-text-secondary/60 tracking-[0.15em]"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.35rem)' }}>
              [Tu Nombre]
            </motion.div>

            <motion.h1 variants={itemVariants} className="heading-xl"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.75rem)' }}>
              <span className="text-text-primary block">Construyendo</span>
              <span className="text-gradient-gold-shine block mt-1 sm:mt-2">Experiencias Digitales</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="body-text text-text-secondary leading-relaxed"
              style={{ maxWidth: 'clamp(20rem, 28vw, 32rem)' }}>
              Creando soluciones robustas y elegantes donde la tecnologia moderna
              se encuentra con principios de diseno atemporales.
            </motion.p>

            <motion.div variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <a href="#projects" className="hero-btn-primary group relative caption tracking-[0.2em] overflow-hidden rounded-sm border-glow"
                style={{ padding: 'clamp(0.7rem, 1.2vh, 1rem) clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                <span className="absolute inset-0 bg-gradient-to-r from-gold/[0.06] via-gold/[0.15] to-gold/[0.06] border border-gold/20 transition-all duration-700 group-hover:border-gold/40 group-hover:shadow-[0_0_40px_rgba(var(--gold-rgb),0.12)]" />
                <span className="relative text-gold group-hover:text-gold-hover transition-colors duration-300 font-medium">Ver Proyectos</span>
              </a>
              <a href="#contact" className="hero-btn-secondary group relative caption tracking-[0.2em] overflow-hidden rounded-sm"
                style={{ padding: 'clamp(0.7rem, 1.2vh, 1rem) clamp(1.5rem, 2.5vw, 2.5rem)' }}>
                <span className="absolute inset-0 border border-text-secondary/12 transition-all duration-700 group-hover:border-gold/20 group-hover:bg-gold/[0.03]" />
                <span className="relative text-text-secondary group-hover:text-text-primary transition-colors duration-300">Contactame</span>
              </a>
            </motion.div>
          </div>

          <div className="hero-right flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hero-image-wrapper"
            >
              <motion.img
                src={heroImage}
                alt="Developer"
                className="hero-image"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="label-text text-text-secondary/30">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} className="w-[14px] h-[24px] border border-gold/15 rounded-full flex justify-center pt-1.5">
          <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-px h-1.5 bg-gold/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function ConstellationLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}>
        <line x1="200" y1="100" x2="380" y2="250" stroke="rgba(var(--gold-rgb),0.06)" strokeWidth="0.5" />
        <line x1="380" y1="250" x2="500" y2="180" stroke="rgba(var(--gold-rgb),0.04)" strokeWidth="0.5" />
        <line x1="500" y1="180" x2="650" y2="300" stroke="rgba(var(--gold-rgb),0.05)" strokeWidth="0.5" />
        <line x1="650" y1="300" x2="800" y2="220" stroke="rgba(var(--gold-rgb),0.04)" strokeWidth="0.5" />
        <line x1="800" y1="220" x2="950" y2="350" stroke="rgba(var(--gold-rgb),0.06)" strokeWidth="0.5" />
        <line x1="950" y1="350" x2="1100" y2="280" stroke="rgba(var(--gold-rgb),0.04)" strokeWidth="0.5" />
        <line x1="1100" y1="280" x2="1250" y2="400" stroke="rgba(var(--gold-rgb),0.05)" strokeWidth="0.5" />
        <line x1="1250" y1="400" x2="1350" y2="320" stroke="rgba(var(--gold-rgb),0.03)" strokeWidth="0.5" />
        <circle cx="200" cy="100" r="1.5" fill="rgba(var(--gold-rgb),0.15)" />
        <circle cx="380" cy="250" r="1" fill="rgba(var(--gold-rgb),0.12)" />
        <circle cx="500" cy="180" r="1.2" fill="rgba(var(--gold-rgb),0.1)" />
        <circle cx="650" cy="300" r="1.5" fill="rgba(var(--gold-rgb),0.15)" />
        <circle cx="800" cy="220" r="1" fill="rgba(var(--gold-rgb),0.1)" />
        <circle cx="950" cy="350" r="1.3" fill="rgba(var(--gold-rgb),0.12)" />
        <circle cx="1100" cy="280" r="1" fill="rgba(var(--gold-rgb),0.1)" />
        <circle cx="1250" cy="400" r="1.5" fill="rgba(var(--gold-rgb),0.15)" />
        <circle cx="1350" cy="320" r="1" fill="rgba(var(--gold-rgb),0.08)" />
      </motion.g>
    </svg>
  );
}
