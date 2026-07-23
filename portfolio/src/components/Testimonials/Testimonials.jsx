import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import Embers from '../Embers/Embers';

const testimonials = [
  { text: 'Un desarrollador excepcional con una capacidad unica para transformar requisitos complejos en soluciones elegantes. Su atencion al detalle y calidad de codigo son impresionantes.', name: 'Carlos Mendez', role: 'CTO, TechCorp', rating: 5 },
  { text: 'Trabajar con el fue una experiencia increible. Entregó el proyecto antes de lo previsto con una calidad que superó nuestras expectativas. Altamente recomendado.', name: 'Ana Gutierrez', role: 'Product Manager, StartupX', rating: 5 },
  { text: 'Su conocimiento en arquitectura de software y mejores practicas es sobresaliente. Fue un pilar fundamental en la reestructuracion de nuestro sistema backend.', name: 'Roberto Silva', role: 'Lead Developer, DevStudio', rating: 5 },
  { text: 'La claridad de su codigo y su habilidad para explicar conceptos tecnicos complejos lo convierten en un colaborador invaluable para cualquier equipo.', name: 'Laura Castillo', role: 'Tech Lead, InnovateLab', rating: 5 },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  const next = () => { setDirection(1); setCurrent((prev) => (prev + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length); };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="section-base bg-bg-secondary">
      <div className="absolute inset-0 stone-texture" />
      <Embers />
      <div className="grid-pattern" />

      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
          <div className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">—</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Recomendaciones</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.3) 50%, rgba(200,169,106,0.05) 80%, transparent)' }} />
          </div>

          <div className="testimonials-container">
            <div className="relative" style={{ minHeight: 'clamp(200px, 30vh, 300px)' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="testimonial-card rounded-sm gradient-border"
                >
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <FiStar key={i} className="text-gold/40" size={14} />
                    ))}
                  </div>
                  <p className="testimonial-text">&ldquo;{testimonials[current].text}&rdquo;</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar glass flex items-center justify-center">
                      <span className="heading-sm text-gold/40">
                        {testimonials[current].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="testimonial-name">{testimonials[current].name}</div>
                      <div className="testimonial-role">{testimonials[current].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="carousel-controls">
              <button onClick={prev} className="carousel-btn rounded-sm" aria-label="Anterior">
                <FiChevronLeft size={16} />
              </button>
              <div className="carousel-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`carousel-dot ${i === current ? 'active' : ''}`}
                    aria-label={`Testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="carousel-btn rounded-sm" aria-label="Siguiente">
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
