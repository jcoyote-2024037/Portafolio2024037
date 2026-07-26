import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCircle from '../SkillCircle';
import TiltCard from '../TiltCard/TiltCard';
import Embers from '../Embers/Embers';
import bgImage from '../../assets/ds1.png';
import yoImage from '../../assets/yo.jfif';

const skills = [
  { name: 'Frontend', level: 70 },
  { name: 'Backend', level: 60 },
  { name: 'Base de Datos', level: 65 },
  { name: 'DevOps', level: 37 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
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
    <section id="about" ref={sectionRef} onMouseMove={handleMouse} className="section-base">
      <div className="absolute inset-0 stone-texture" />
      <div className="spotlight-overlay" />
      <Embers />
      <div className="grid-pattern" />
      <div className="section-bg-image pos-right">
        <img src={bgImage} alt="" aria-hidden="true" />
        <div className="bg-overlay" />
      </div>
      <div className="light-rays" style={{ opacity: 0.3 }} />
      <div className="bottom-glow" />

      <div className="section-container">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={childVariants} className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">01</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Sobre Mi</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </motion.div>

          <div className="grid-2col">
            <div className="flex flex-col justify-center" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <motion.h3 variants={childVariants} className="subheading text-text-primary">
                Desarrollador apasionado por crear{' '}
                <span className="text-gradient-gold-shine">soluciones significativas</span>
              </motion.h3>

              <motion.div variants={childVariants} className="body-text text-text-secondary" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <p>Soy Diego, desarrollador Junior apasionado por crear aplicaciones web modernas, rápidas y visualmente atractivas. Disfruto transformar ideas en productos funcionales utilizando tecnologías como React, Next.js y Node.js.</p>
                <p>Me enfoco en escribir código limpio, desarrollar interfaces intuitivas y ofrecer una excelente experiencia de usuario. Siempre estoy aprendiendo nuevas herramientas y enfrentando desafíos que me permitan crecer tanto técnica como profesionalmente.</p>
                <p className="text-gold/60 mt-4" style={{ fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)' }}>
                  <span className="inline-flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/40"></span> Basado en Ciudad de Guatemala</span>
                  <span className="inline-flex items-center gap-2 ml-6"><span className="w-1 h-1 rounded-full bg-gold/40"></span> coyotediego999@icloud.com</span>
                </p>
              </motion.div>

              <motion.div variants={childVariants} className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                {[
                  { name: 'React', level: 70 },
                  { name: 'Node.js', level: 60 },
                  { name: 'TypeScript', level: 57 },
                  { name: 'PostgreSQL', level: 65 },
                  { name: 'Docker', level: 37 },
                  { name: 'Git', level: 70 },
                ].map((tech) => (
                  <span key={tech.name} className="caption text-gold/50 border border-gold/10 rounded-sm hover:border-gold/25 hover:text-gold/70 hover:bg-gold/[0.03] transition-all duration-300 cursor-default" style={{ padding: 'clamp(0.375rem, 0.8vw, 0.5rem) clamp(0.625rem, 1.2vw, 0.875rem)' }}>
                    {tech.name} <span className="text-gold/30">{tech.level}%</span>
                  </span>
                ))}
              </motion.div>

              <motion.div variants={childVariants} className="flex flex-wrap justify-start" style={{ gap: 'clamp(1.5rem, 3vw, 2rem)', paddingTop: 'clamp(0.5rem, 1vw, 1rem)' }}>
                {skills.map((skill, i) => (
                  <SkillCircle key={skill.name} name={skill.name} level={skill.level} delay={i * 200} />
                ))}
              </motion.div>
            </div>

            <motion.div variants={childVariants} className="flex items-center justify-center">
              <TiltCard className="glass rounded-sm gold-glow border border-gold/[0.06] relative overflow-hidden card-shine gradient-border" style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem)', maxWidth: '380px', width: '100%' }}>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/[0.03] rounded-full blur-[60px]" />
                <div className="relative">
                  <img
                    src={yoImage}
                    alt="Diego - Desarrollador Junior"
                    className="w-full h-auto rounded-sm object-cover"
                    style={{ aspectRatio: '3/4' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                    <h4 className="heading-sm text-white">Diego</h4>
                    <p className="caption text-gold/70">Desarrollador Junior</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
