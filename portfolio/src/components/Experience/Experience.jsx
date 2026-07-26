import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Embers from '../Embers/Embers';
import bgImage from '../../assets/experiencia.png';

const experiences = [
  { title: 'Desarrollador de Aplicaciones con React y React Native', company: 'Fundación Kinal', period: '2026', description: 'Desarrollo de aplicaciones móviles y web utilizando React y React Native, implementando interfaces responsivas y conectando con APIs RESTful.', tags: ['React', 'React Native', 'JavaScript', 'APIs'] },
  { title: 'Desarrollador Backend', company: 'Fundación Kinal', period: '2024 - 2026', description: 'Desarrollo y mantenimiento de servicios backend utilizando Node.js, Express y bases de datos. Implementación de APIs RESTful y lógica de negocio.', tags: ['Node.js', 'Express', 'PostgreSQL', 'REST API'] },
  { title: 'Desarrollador Frontend', company: 'Fundación Kinal', period: '2024 - 2026', description: 'Construcción de interfaces de usuario responsivas e implementación de integraciones con APIs. Colaboración con equipos de diseño para entregar componentes de alta calidad.', tags: ['React', 'JavaScript', 'CSS3', 'Git'] },
];

const education = [
  { degree: 'Graduando de Tercero Básico', institution: 'Colegio San Bernardino', period: '2023', description: 'Formación académica con enfoque en ciencias y tecnología.' },
  { degree: 'Certificado Cisco Packet Tracer', institution: 'Cisco Networking Academy', period: '2024', description: 'Certificación en fundamentos de redes, configuración de dispositivos y conceptos básicos de infraestructura de redes con Cisco Packet Tracer.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Experience() {
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
    <section id="experience" ref={sectionRef} onMouseMove={handleMouse} className="section-base">
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
            <span className="heading-sm text-gold/70 shrink-0">03</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Experiencia</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </motion.div>

          <motion.p variants={childVariants} className="body-text text-text-secondary mb-14 sm:mb-20" style={{ maxWidth: 'clamp(20rem, 40vw, 40rem)' }}>
            Mi trayectoria profesional y formacion academica en el ambito del desarrollo de software.
          </motion.p>

          <div className="grid-2col-equal">
            <div>
              <h3 className="heading-sm text-gold/70 mb-8 sm:mb-12 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/25" />
                Experiencia Laboral
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                {experiences.map((exp, i) => (
                  <motion.div key={exp.title} initial={{ opacity: 0, x: -25 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 + i * 0.15 }}
                    className="glass rounded-sm border border-gold/[0.06] hover:border-gold/18 transition-all duration-500 group relative overflow-hidden card-shine border-glow gradient-border" style={{ padding: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-gold/30 via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start" style={{ gap: 'clamp(0.25rem, 0.5vw, 1rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                      <div>
                        <h4 className="body-text font-medium text-text-primary group-hover:text-gold transition-colors duration-300">{exp.title}</h4>
                        <p className="body-sm text-text-secondary/60 mt-1">{exp.company}</p>
                      </div>
                      <span className="label-text text-gold/45 tracking-wider shrink-0">{exp.period}</span>
                    </div>
                    <p className="body-sm text-text-secondary mb-4 sm:mb-5">{exp.description}</p>
                    <div className="flex flex-wrap" style={{ gap: 'clamp(0.375rem, 0.8vw, 0.5rem)' }}>
                      {exp.tags.map((tag) => (
                        <span key={tag} className="label-text text-gold/40 border border-gold/8 rounded-sm" style={{ padding: 'clamp(0.125rem, 0.3vw, 0.25rem) clamp(0.375rem, 0.7vw, 0.625rem)' }}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="heading-sm text-gold/70 mb-8 sm:mb-12 flex items-center gap-3">
                <span className="w-8 h-px bg-gold/25" />
                Formacion Academica
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                {education.map((edu, i) => (
                  <motion.div key={edu.degree} initial={{ opacity: 0, x: 25 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 + i * 0.15 }}
                    className="glass rounded-sm border border-gold/[0.06] hover:border-gold/18 transition-all duration-500 group relative overflow-hidden card-shine border-glow gradient-border" style={{ padding: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-gold/30 via-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start" style={{ gap: 'clamp(0.25rem, 0.5vw, 1rem)', marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                      <div>
                        <h4 className="body-text font-medium text-text-primary group-hover:text-gold transition-colors duration-300">{edu.degree}</h4>
                        <p className="body-sm text-text-secondary/60 mt-1">{edu.institution}</p>
                      </div>
                      <span className="label-text text-gold/45 tracking-wider shrink-0">{edu.period}</span>
                    </div>
                    <p className="body-sm text-text-secondary">{edu.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
