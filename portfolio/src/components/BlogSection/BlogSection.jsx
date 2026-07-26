import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import Embers from '../Embers/Embers';

const articles = [
  { title: 'Arquitectura Limpia en React', date: 'Mar 2024', tag: 'Arquitectura', excerpt: 'Principios de diseno para mantener tu codigo escalable y mantenible en proyectos de React a gran escala.', link: '#' },
  { title: 'Optimizacion de Base de Datos', date: 'Feb 2024', tag: 'Backend', excerpt: 'Estrategias avanzadas para mejorar el rendimiento de consultas SQL y optimizar el uso de indices.', link: '#' },
  { title: 'Microservicios con Docker', date: 'Ene 2024', tag: 'DevOps', excerpt: 'Guia practica para contenerizar y orquestar microservicios utilizando Docker y docker-compose.', link: '#' },
];

export default function BlogSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="section-base">
      <div className="absolute inset-0 stone-texture" />
      <Embers />
      <div className="grid-pattern" />
      <div className="light-rays" style={{ opacity: 0.15 }} />
      <div className="bottom-glow" />

      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
          <div className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">—</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Articulos</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </div>

          <p className="body-text text-text-secondary mb-14 sm:mb-20" style={{ maxWidth: 'clamp(20rem, 40vw, 40rem)' }}>
            Notas y articulos sobre desarrollo de software, arquitectura y mejores practicas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 30vw, 380px), 1fr))', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
            {articles.map((article, i) => (
              <motion.a key={article.title} href={article.link}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.35 } }}
                className="blog-card rounded-sm group block gradient-border"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="blog-card-tag rounded-sm">{article.tag}</span>
                    <span className="flex items-center gap-1.5 label-text text-text-secondary/30">
                      <FiCalendar size={10} />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="body-text font-medium text-text-primary mb-3 group-hover:text-gold transition-colors duration-300 flex items-center gap-2">
                    {article.title}
                    <FiArrowUpRight className="text-gold/20 group-hover:text-gold/50 transition-colors duration-300 shrink-0" size={14} />
                  </h3>
                  <p className="body-sm text-text-secondary">{article.excerpt}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
