import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiServer, FiDatabase, FiTerminal } from 'react-icons/fi';
import Embers from '../Embers/Embers';

const stats = [
  { icon: FiCode, label: 'Proyectos Completados', value: 15, suffix: '+' },
  { icon: FiServer, label: 'Tecnologias Aprendidas', value: 10, suffix: '+' },
  { icon: FiDatabase, label: 'Años de Experiencia', value: 3, suffix: '+' },
  { icon: FiTerminal, label: 'Commits Realizados', value: 500, suffix: '+' },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
}

export default function Statistics() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section-base">
      <div className="absolute inset-0 stone-texture" />
      <Embers />
      <div className="grid-pattern" />

      <div className="section-container">
        <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.9 }}>
          <div className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">—</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Estadisticas</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </div>

          <div className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="stat-item rounded-sm gradient-border"
              >
                <stat.icon className="stat-icon" size={24} />
                <div className="stat-number">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
