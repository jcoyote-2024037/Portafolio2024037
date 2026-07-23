import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCircle from '../SkillCircle';
import TiltCard from '../TiltCard/TiltCard';
import Embers from '../Embers/Embers';
import bgImage from '../../assets/ds1.png';

const skills = [
  { name: 'Frontend', level: 90 },
  { name: 'Backend', level: 85 },
  { name: 'Base de Datos', level: 80 },
  { name: 'DevOps', level: 75 },
];

const personalInfo = [
  { label: 'Nombre', value: '[Tu Nombre]' },
  { label: 'Ubicacion', value: '[Tu Ciudad]' },
  { label: 'Experiencia', value: '[X] Anos' },
  { label: 'Formacion', value: 'Ingenieria de Software' },
  { label: 'Disponibilidad', value: 'Abierto a trabajar' },
  { label: 'Correo', value: 'tu@email.com' },
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
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.3) 50%, rgba(200,169,106,0.05) 80%, transparent)' }} />
          </motion.div>

          <div className="grid-2col">
            <div className="flex flex-col justify-center" style={{ gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <motion.h3 variants={childVariants} className="subheading text-text-primary">
                Desarrollador apasionado por crear{' '}
                <span className="text-gradient-gold-shine">soluciones significativas</span>
              </motion.h3>

              <motion.div variants={childVariants} className="body-text text-text-secondary" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
                <p>Soy un Desarrollador Full Stack con una profunda pasion por construir soluciones digitales elegantes y eficientes. Mi enfoque combina precision tecnica con resolucion creativa de problemas para entregar software de alta calidad.</p>
                <p>Mi objetivo es crecer continuamente como desarrollador, asumiendo proyectos desafiantes que amplien los limites de lo posible con las tecnologias web modernas. Creo en escribir codigo limpio, mantenible y que resista el paso del tiempo.</p>
                <p>Cuando no estoy programando, me encontraras explorando nuevas tecnologias, contribuyendo a proyectos de codigo abierto o profundizando en patrones de arquitectura de sistemas.</p>
              </motion.div>

              <motion.div variants={childVariants} className="flex flex-wrap" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                {['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Git'].map((skill) => (
                  <span key={skill} className="caption text-gold/50 border border-gold/10 rounded-sm hover:border-gold/25 hover:text-gold/70 hover:bg-gold/[0.03] transition-all duration-300 cursor-default" style={{ padding: 'clamp(0.375rem, 0.8vw, 0.5rem) clamp(0.625rem, 1.2vw, 0.875rem)' }}>
                    {skill}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={childVariants} className="flex flex-wrap justify-start" style={{ gap: 'clamp(1.5rem, 3vw, 2rem)', paddingTop: 'clamp(0.5rem, 1vw, 1rem)' }}>
                {skills.map((skill, i) => (
                  <SkillCircle key={skill.name} name={skill.name} level={skill.level} delay={i * 200} />
                ))}
              </motion.div>
            </div>

            <motion.div variants={childVariants}>
              <TiltCard className="glass rounded-sm gold-glow border border-gold/[0.06] relative overflow-hidden w-full card-shine gradient-border" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/[0.03] rounded-full blur-[60px]" />
                <h4 className="heading-sm text-gold/60 mb-8 sm:mb-10 relative">Informacion Personal</h4>
                <div className="space-y-0 relative">
                  {personalInfo.map((info, i) => (
                    <motion.div key={info.label} initial={{ opacity: 0, x: 15 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gold/[0.06] last:border-0" style={{ gap: '0.25rem', paddingTop: 'clamp(0.75rem, 1.5vw, 1rem)', paddingBottom: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                      <span className="label-text text-text-secondary/50">{info.label}</span>
                      <span className="body-sm text-text-primary/85">{info.value}</span>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
