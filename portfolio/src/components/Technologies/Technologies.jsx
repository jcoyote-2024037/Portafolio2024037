import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGit, SiLinux, SiTypescript, SiJavascript } from 'react-icons/si';
import TiltCard from '../TiltCard/TiltCard';
import Embers from '../Embers/Embers';
import bgImage from '../../assets/ellie.png';

const technologies = [
  { name: 'React', icon: SiReact, level: 90, color: '#61DAFB' },
  { name: 'Node.js', icon: SiNodedotjs, level: 85, color: '#339933' },
  { name: 'Express', icon: SiExpress, level: 85, color: '#FFFFFF' },
  { name: 'MongoDB', icon: SiMongodb, level: 80, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, level: 80, color: '#4169E1' },
  { name: 'Docker', icon: SiDocker, level: 75, color: '#2496ED' },
  { name: 'Git', icon: SiGit, level: 90, color: '#F05032' },
  { name: 'Linux', icon: SiLinux, level: 80, color: '#FCC624' },
  { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, level: 95, color: '#F7DF1E' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

export default function Technologies() {
  const [ref, inView] = useInView({ threshold: 0.06, triggerOnce: true });
  const sectionRef = useRef(null);

  const handleMouse = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--mx', x + '%');
    sectionRef.current.style.setProperty('--my', y + '%');
  };

  return (
    <section id="technologies" ref={sectionRef} onMouseMove={handleMouse} className="section-base bg-bg-secondary">
      <div className="absolute inset-0 stone-texture" />
      <div className="spotlight-overlay" />
      <Embers />
      <div className="grid-pattern" />
      <div className="section-bg-image pos-left-bottom">
        <img src={bgImage} alt="" aria-hidden="true" />
        <div className="bg-overlay" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gold/[0.015] rounded-full blur-[130px] pointer-events-none" style={{ width: 'clamp(300px, 40vw, 600px)', height: 'clamp(200px, 25vw, 350px)' }} />
      <div className="bottom-glow" />
      <div className="light-rays" style={{ opacity: 0.2 }} />

      <div className="section-container">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">02</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Tecnologias</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </motion.div>

          <motion.p variants={itemVariants} className="body-text text-text-secondary mb-14 sm:mb-20" style={{ maxWidth: 'clamp(20rem, 40vw, 40rem)' }}>
            Herramientas y tecnologias que utilizo para construir aplicaciones modernas, escalables y de alto rendimiento.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 18vw, 180px), 1fr))', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
            {technologies.map((tech, i) => (
              <motion.div key={tech.name} variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.35 } }}
                className="group glass rounded-sm border border-gold/[0.06] hover:border-gold/25 gold-glow-hover transition-all duration-500 cursor-default relative overflow-hidden card-shine border-glow gradient-border"
                style={{ padding: 'clamp(1rem, 2vw, 1.75rem)' }}>
                <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/30 transition-all duration-700" />

                <div className="flex flex-col items-center relative" style={{ gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                  <div className="relative">
                    <tech.icon className="transition-all duration-500 group-hover:scale-110" style={{ color: tech.color, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }} />
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle, ${tech.color}15 0%, transparent 70%)`, filter: 'blur(10px)', transform: 'scale(2)' }} />
                  </div>
                  <span className="caption text-text-secondary group-hover:text-text-primary transition-colors duration-300">{tech.name}</span>
                  <div className="w-full bg-gold/[0.06] relative overflow-hidden rounded-full" style={{ height: '2px' }}>
                    <motion.div initial={{ width: 0 }} animate={inView ? { width: `${tech.level}%` } : {}} transition={{ duration: 1.3, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${tech.color}60, ${tech.color}AA)` }} />
                  </div>
                  <span className="label-text text-gold/35">{tech.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
