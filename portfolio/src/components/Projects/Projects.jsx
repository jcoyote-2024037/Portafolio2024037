import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import TiltCard from '../TiltCard/TiltCard';
import Embers from '../Embers/Embers';
import bgImage from '../../assets/omega.png';
import bancoImg from '../../assets/banco1.png';
import toysImg from '../../assets/Toys.png';
import ahorcadoImg from '../../assets/ahorcado.png';
import repuestosImg from '../../assets/automotriz.jfif';
import restauranteImg from '../../assets/res1.png';

const projects = [
  {
    title: 'Restaurante App',
    description: 'Aplicacion completa de restaurante con panel de administracion en React y app movil en React Native. Incluye menu digital, sistema de pedidos en tiempo real, reservaciones, gestion de mesas y pasarela de pagos.',
    image: restauranteImg,
    technologies: ['React', 'React Native', 'Node.js', 'Express', 'MongoDB'],
    category: 'fullstack',
    github: 'https://github.com/pcalderon-2021547/Restaurante',
    demo: '#',
  },
  {
    title: 'Gestion Bancario (OvaBank)',
    description: 'Aplicacion bancaria completa con panel de administracion en React y movil en React Native. Incluye gestion de cuentas, transferencias, autenticacion y control de usuarios.',
    image: bancoImg,
    technologies: ['React', 'React Native', 'Node.js', 'Express', 'MySQL'],
    category: 'fullstack',
    github: 'https://github.com/pdeleon2021364/GestionBancario.git',
    demo: '#',
  },
  {
    title: 'Pagina de Juguetes',
    description: 'Catalogo interactivo de juguetes con interfaz dinamica, filtros por categorias y diseño responsivo. Desarrollado con HTML y JavaScript puro.',
    image: toysImg,
    technologies: ['HTML', 'JavaScript', 'CSS'],
    category: 'frontend',
    github: '#',
    demo: '#',
  },
  {
    title: 'Ahorcado',
    description: 'Juego clasico del ahorcado con interfaz interactiva, sistema de puntos, animaciones y multiples categorias de palabras. Frontend puro sin dependencias de servidor.',
    image: ahorcadoImg,
    technologies: ['HTML', 'JavaScript', 'CSS'],
    category: 'frontend',
    github: 'https://github.com/jcoyote-2024037/Ahorcado-2024037.git',
    demo: '#',
  },
  {
    title: 'Repuestos Auto',
    description: 'Sistema de gestion de repuestos automotrices con base de datos relacional en MySQL. Incluye CRUD de productos, busqueda avanzada y reportes de inventario.',
    image: repuestosImg,
    technologies: ['MySQL', 'Node.js', 'Express', 'SQL'],
    category: 'backend',
    github: 'https://github.com/jcoyote-2024037/RepuestosAuto-2024037.git',
    demo: '#',
  },
];

const categories = ['todos', 'frontend', 'backend', 'fullstack'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState('todos');
  const sectionRef = useRef(null);

  const handleMouse = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--mx', x + '%');
    sectionRef.current.style.setProperty('--my', y + '%');
  };

  const filtered = activeFilter === 'todos'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" ref={sectionRef} onMouseMove={handleMouse} className="section-base bg-bg-secondary">
      <div className="absolute inset-0 stone-texture" />
      <div className="spotlight-overlay" />
      <Embers />
      <div className="grid-pattern" />
      <div className="section-bg-image pos-left">
        <img src={bgImage} alt="" aria-hidden="true" />
        <div className="bg-overlay" />
      </div>
      <div className="light-rays" style={{ opacity: 0.2 }} />
      <div className="bottom-glow" />

      <div className="section-container">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={childVariants} className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">04</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Proyectos</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </motion.div>

          <motion.div variants={childVariants}>
            <p className="body-text text-text-secondary mb-6 sm:mb-8" style={{ maxWidth: 'clamp(20rem, 40vw, 40rem)' }}>
              Proyectos que demuestran mis capacidades tecnicas y mi enfoque para resolver problemas del mundo real.
            </p>
            <div className="filter-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                >
                  {cat === 'todos' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 30vw, 380px), 1fr))', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TiltCard className="group glass rounded-sm border border-gold/[0.06] hover:border-gold/20 gold-glow-hover transition-all duration-600 overflow-hidden card-shine border-glow gradient-border">
                    <div className="aspect-video bg-bg-tertiary relative overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] via-transparent to-gold/[0.01]" />
                          <div className="border border-gold/10 rounded-sm flex items-center justify-center group-hover:border-gold/20 transition-all duration-500 relative"
                            style={{ width: 'clamp(3rem, 6vw, 5rem)', height: 'clamp(3rem, 6vw, 5rem)' }}>
                            <span className="label-text text-gold/20">VISTA PREVIA</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                      <div className="absolute bottom-4 right-4 flex gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        {project.github && project.github !== '#' && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 glass rounded-sm flex items-center justify-center border border-gold/15 hover:border-gold/40 hover:bg-gold/[0.08] transition-all duration-300" aria-label="GitHub">
                            <FiGithub className="text-gold/60 text-sm" />
                          </a>
                        )}
                        {project.demo && project.demo !== '#' && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-9 h-9 glass rounded-sm flex items-center justify-center border border-gold/15 hover:border-gold/40 hover:bg-gold/[0.08] transition-all duration-300" aria-label="Demo">
                            <FiExternalLink className="text-gold/60 text-sm" />
                          </a>
                        )}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <FiArrowUpRight className="text-gold/30 text-lg" />
                      </div>
                    </div>
                    <div className="p-5 sm:p-7">
                      <h3 className="body-text font-medium text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">{project.title}</h3>
                      <p className="body-sm text-text-secondary mb-4 sm:mb-5">{project.description}</p>
                      <div className="flex flex-wrap" style={{ gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
                        {project.technologies.map((tech) => (
                          <span key={tech} className="label-text text-gold/35 border border-gold/8 rounded-sm hover:border-gold/20 hover:text-gold/55 transition-all duration-300" style={{ padding: 'clamp(0.125rem, 0.3vw, 0.25rem) clamp(0.375rem, 0.7vw, 0.625rem)' }}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
