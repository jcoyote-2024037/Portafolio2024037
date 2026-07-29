import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend, FiCheck } from 'react-icons/fi';
import MagneticButton from '../MagneticButton/MagneticButton';
import Embers from '../Embers/Embers';

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const sectionRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleMouse = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--mx', x + '%');
    sectionRef.current.style.setProperty('--my', y + '%');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setSent(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setSent(false), 4000);
      } else {
        const data = await res.json();
        setError(data.error || 'Error al enviar.');
      }
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, label: 'Correo', value: 'coyotediego999@icloud.com' },
    { icon: FiMapPin, label: 'Ubicacion', value: 'Ciudad de Guatemala, Guatemala' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="contact" ref={sectionRef} onMouseMove={handleMouse} className="section-base bg-bg-secondary">
      <div className="absolute inset-0 stone-texture" />
      <div className="spotlight-overlay" />
      <Embers />
      <div className="grid-pattern" />
      <div className="light-rays" style={{ opacity: 0.2 }} />
      <div className="bottom-glow" />

      <div className="section-container">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="section-header">
            <span className="heading-sm text-gold/70 shrink-0">06</span>
            <div className="h-px flex-1 golden-line" />
            <h2>Contacto</h2>
            <div className="h-px flex-1 golden-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--gold-rgb),0.3) 50%, rgba(var(--gold-rgb),0.05) 80%, transparent)' }} />
          </motion.div>

          <div className="grid-2col">
            <div className="flex flex-col justify-center" style={{ gap: 'clamp(2rem, 4vw, 2.5rem)' }}>
              <div>
                <motion.h3 variants={itemVariants} className="subheading text-text-primary mb-5">
                  Trabajemos juntos
                </motion.h3>
                <motion.p variants={itemVariants} className="body-text text-text-secondary">
                  Estoy siempre abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión. No dudes en contactarme.
                </motion.p>
              </div>

              <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}>
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4 group">
                    <div className="glass rounded-sm flex items-center justify-center border border-gold/8 group-hover:border-gold/25 group-hover:bg-gold/[0.03] transition-all duration-300 shrink-0"
                      style={{ width: 'clamp(2.25rem, 3.5vw, 2.75rem)', height: 'clamp(2.25rem, 3.5vw, 2.75rem)' }}>
                      <info.icon className="text-gold/45 text-sm" />
                    </div>
                    <div>
                      <span className="label-text text-text-secondary/45 block mb-0.5">{info.label}</span>
                      <span className="body-sm text-text-primary/85">{info.value}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
                <span className="label-text text-text-secondary/45">Redes Profesionales</span>
                <div className="flex" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                  <MagneticButton as="a" href="https://gt.linkedin.com/" className="flex items-center gap-3 glass rounded-sm border border-gold/8 hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-300 group" style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}>
                    <FiLinkedin className="text-text-secondary/50 group-hover:text-gold text-sm transition-colors duration-300" />
                    <span className="body-sm text-text-secondary/60 group-hover:text-text-primary/80 transition-colors duration-300">LinkedIn</span>
                  </MagneticButton>
                  <MagneticButton as="a" href="https://github.com/jcoyote-2024037" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass rounded-sm border border-gold/8 hover:border-gold/25 hover:bg-gold/[0.03] transition-all duration-300 group" style={{ padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)' }}>
                    <FiGithub className="text-text-secondary/50 group-hover:text-gold text-sm transition-colors duration-300" />
                    <span className="body-sm text-text-secondary/60 group-hover:text-text-primary/80 transition-colors duration-300">GitHub</span>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <div className="glass rounded-sm border border-gold/[0.06] relative overflow-hidden card-shine gradient-border" style={{ padding: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/[0.02] rounded-full blur-[50px]" />
                <form className="space-y-5 relative" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
                    <div>
                      <label className="label-text text-text-secondary/45 block mb-3">Nombre *</label>
                      <input type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-bg-primary/30 border border-gold/8 rounded-sm font-inter text-sm text-text-primary placeholder-text-secondary/25 transition-all duration-400 focus:border-gold/25 outline-none" style={{ padding: 'clamp(0.625rem, 1.2vw, 0.875rem) 1rem' }} placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="label-text text-text-secondary/45 block mb-3">Correo *</label>
                      <input type="email" required maxLength={150} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-bg-primary/30 border border-gold/8 rounded-sm font-inter text-sm text-text-primary placeholder-text-secondary/25 transition-all duration-400 focus:border-gold/25 outline-none" style={{ padding: 'clamp(0.625rem, 1.2vw, 0.875rem) 1rem' }} placeholder="tu@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="label-text text-text-secondary/45 block mb-3">Asunto</label>
                    <input type="text" maxLength={200} value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-bg-primary/30 border border-gold/8 rounded-sm font-inter text-sm text-text-primary placeholder-text-secondary/25 transition-all duration-400 focus:border-gold/25 outline-none" style={{ padding: 'clamp(0.625rem, 1.2vw, 0.875rem) 1rem' }} placeholder="Consulta sobre un proyecto" />
                  </div>
                  <div>
                    <label className="label-text text-text-secondary/45 block mb-3">Mensaje *</label>
                    <textarea rows={5} required maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-bg-primary/30 border border-gold/8 rounded-sm font-inter text-sm text-text-primary placeholder-text-secondary/25 transition-all duration-400 resize-none focus:border-gold/25 outline-none" style={{ padding: 'clamp(0.625rem, 1.2vw, 0.875rem) 1rem' }} placeholder="Cuéntame sobre tu proyecto..." />
                  </div>

                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2 caption text-green-400/80"
                        style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem)' }}
                      >
                        <FiCheck size={16} />
                        ¡Mensaje enviado! Te responderé pronto.
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit"
                        type="submit"
                        disabled={sending}
                        className="group relative w-full caption tracking-[0.2em] overflow-hidden rounded-sm border-glow font-medium disabled:opacity-40"
                        style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem) 2.5rem' }}
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-gold/[0.04] via-gold/[0.1] to-gold/[0.04] border border-gold/20 transition-all duration-700 group-hover:border-gold/40" />
                        <span className="relative text-gold group-hover:text-gold-hover transition-colors duration-300 flex items-center justify-center gap-2">
                          {sending ? 'Enviando...' : 'Enviar Mensaje'}
                          {!sending && <FiSend size={14} />}
                        </span>
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="caption text-red-400/80 text-center"
                    >
                      {error}
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
