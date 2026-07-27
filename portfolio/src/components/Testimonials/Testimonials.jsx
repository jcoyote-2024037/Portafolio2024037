import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiStar, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import Embers from '../Embers/Embers';

const API_URL = '/api/recommendations';

export default function Testimonials() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [recommendations, setRecommendations] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setRecommendations(Array.isArray(data) ? data : []))
      .catch(() => setRecommendations([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, text: message, rating }),
      });

      if (res.ok) {
        const newRec = await res.json();
        setRecommendations((prev) => [newRec, ...prev]);
        setName('');
        setRole('');
        setMessage('');
        setRating(5);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
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
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </div>

          <p className="body-text text-text-secondary mb-10" style={{ maxWidth: 'clamp(20rem, 40vw, 40rem)' }}>
            Si trabajaste conmigo y quieres dejar tu recomendación, hazlo aquí. ¡Te lo agradecería mucho!
          </p>

          <div className="flex justify-end mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="glass rounded-sm border border-gold/20 hover:border-gold/40 text-gold/70 hover:text-gold transition-all duration-300 caption flex items-center gap-2"
              style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)' }}
            >
              <FiSend size={14} />
              {showForm ? 'Cerrar' : 'Dejar recomendación'}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="glass rounded-sm border border-gold/[0.06] gradient-border mb-10 overflow-hidden"
                style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                  <div className="flex flex-col gap-2">
                    <label className="caption text-gold/50 flex items-center gap-2"><FiUser size={12} /> Nombre *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      maxLength={100}
                      placeholder="Tu nombre"
                      className="glass rounded-sm border border-gold/10 focus:border-gold/30 text-text-primary caption bg-transparent outline-none transition-colors duration-300"
                      style={{ padding: '0.75rem 1rem' }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="caption text-gold/50">Rol / Empresa</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Ej: CTO, TechCorp"
                      className="glass rounded-sm border border-gold/10 focus:border-gold/30 text-text-primary caption bg-transparent outline-none transition-colors duration-300"
                      style={{ padding: '0.75rem 1rem' }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-5">
                  <label className="caption text-gold/50 flex items-center gap-2"><FiMessageSquare size={12} /> Mensaje *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={1000}
                    rows={4}
                    placeholder="Escribe tu recomendación..."
                    className="glass rounded-sm border border-gold/10 focus:border-gold/30 text-text-primary caption bg-transparent outline-none transition-colors duration-300 resize-none"
                    style={{ padding: '0.75rem 1rem' }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="caption text-gold/50">Calificación</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform duration-200 hover:scale-110"
                        >
                          <FiStar
                            size={18}
                            className={`transition-colors duration-200 ${
                              star <= (hoverRating || rating) ? 'text-gold fill-gold' : 'text-gold/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="glass rounded-sm border border-gold/20 hover:border-gold/40 bg-gold/[0.05] hover:bg-gold/[0.1] text-gold/80 hover:text-gold transition-all duration-300 caption flex items-center gap-2 disabled:opacity-40"
                    style={{ padding: '0.75rem 2rem' }}
                  >
                    <FiSend size={14} />
                    {loading ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 caption text-green-400/80 text-center"
                    >
                      ¡Gracias por tu recomendación!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>

          {recommendations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FiMessageSquare className="mx-auto mb-4 text-gold/15" size={48} />
              <p className="caption text-gold/30">Aún no hay recomendaciones. ¡Sé el primero en dejar una!</p>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 35vw, 400px), 1fr))', gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <AnimatePresence>
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="glass rounded-sm border border-gold/[0.06] gradient-border card-shine group hover:border-gold/20 transition-all duration-500"
                    style={{ padding: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: rec.rating }).map((_, j) => (
                        <FiStar key={j} className="text-gold/40" size={12} />
                      ))}
                    </div>
                    <p className="body-text text-text-secondary mb-5" style={{ lineHeight: 1.7 }}>&ldquo;{rec.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="glass rounded-full flex items-center justify-center border border-gold/10" style={{ width: '36px', height: '36px' }}>
                        <span className="heading-sm text-gold/40" style={{ fontSize: '0.85rem' }}>{rec.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="caption text-text-primary">{rec.name}</div>
                        <div className="label-text text-gold/35">{rec.role} · {rec.date}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
