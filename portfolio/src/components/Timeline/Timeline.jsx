import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiAward, FiBookOpen } from 'react-icons/fi';
import Embers from '../Embers/Embers';
import bgImage from '../../assets/ds1.png';

const timelineData = [
  { year: '2022', title: 'Primer contacto con el desarrollo de software', description: 'Tuve el primer acercamiento al mundo del desarrollo de software y nacio mi pasion por la programacion.', icon: FiAward },
  { year: '2023', title: 'Graduacion 3ro Basico', description: 'Fin de mis basicos e inicio mi trayectoria como Desarrollador Junior, construyendo aplicaciones web escalables.', icon: FiBriefcase },
  { year: '2024', title: 'Primer Rol Profesional', description: 'Transicion al desarrollo profesional, trabajando con tecnologias web modernas.', icon: FiBriefcase },
  { year: '2025', title: 'Contribuciones Open Source', description: 'Comence a contribuir a proyectos de codigo abierto y a desarrollar proyectos personales.', icon: FiAward },
  { year: '2026', title: 'Desarrollador Junior + Tencnico en Informatica', description: 'Comence el programa de Ingenieria en Sistemas, profundizando en los fundamentos de la ciencia de la computacion, tambien fue el año de mi graduacion de perito en informatica', icon: FiBookOpen },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Timeline() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
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
    <section id="timeline" ref={sectionRef} onMouseMove={handleMouse} className="section-base">
      <div className="absolute inset-0 stone-texture" />
      <div className="spotlight-overlay" />
      <Embers />
      <div className="grid-pattern" />
      <div className="section-bg-image pos-right-top">
        <img src={bgImage} alt="" aria-hidden="true" />
        <div className="bg-overlay" />
      </div>
      <div className="light-rays" style={{ opacity: 0.15 }} />
      <div className="bottom-glow" />

      <div className="section-container">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={childVariants} className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">05</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Linea de Tiempo</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </motion.div>

          <motion.p variants={childVariants} className="body-text text-text-secondary mb-14 sm:mb-20" style={{ maxWidth: 'clamp(20rem, 40vw, 40rem)' }}>
            Un recorrido por los momentos clave de mi carrera y formacion.
          </motion.p>

          <div className="relative">
            <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold/25 via-gold/12 to-transparent" style={{ left: 'clamp(14px, 2vw, 23px)' }} />
            <div className="hidden md:block absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/10 to-transparent left-1/2 -translate-x-px" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3rem)' }}>
              {timelineData.map((item, i) => (
                <motion.div key={item.year + item.title} variants={childVariants}
                  className={`relative flex items-start md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>

                  <div className="flex-1 md:w-1/2 md:px-8 lg:px-14" style={{ paddingLeft: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                    <div className={`glass rounded-sm border border-gold/[0.06] hover:border-gold/18 transition-all duration-500 group relative overflow-hidden card-shine border-glow gradient-border ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`} style={{ padding: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <span className="heading-sm text-gold/40 block mb-2">{item.year}</span>
                        <h4 className="body-text font-medium text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">{item.title}</h4>
                        <p className="body-sm text-text-secondary">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute rounded-full border-2 border-gold/30 bg-bg-primary z-10 flex items-center justify-center pulse-dot"
                    style={{ left: 'clamp(8px, 1.2vw, 15px)', top: 'clamp(1rem, 2vw, 1.5rem)', width: 'clamp(14px, 2vw, 22px)', height: 'clamp(14px, 2vw, 22px)' }}>
                    <item.icon className="text-gold/50" style={{ fontSize: 'clamp(6px, 0.8vw, 8px)' }} />
                  </div>
                  <div className="hidden md:flex absolute top-5 left-1/2 -translate-x-1/2 w-[22px] h-[22px] rounded-full border-2 border-gold/30 bg-bg-primary z-10 items-center justify-center pulse-dot">
                    <item.icon className="text-gold/50 text-[8px]" />
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
