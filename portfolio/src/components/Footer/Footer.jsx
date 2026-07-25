import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import MagneticButton from '../MagneticButton/MagneticButton';

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/[0.06]" style={{ paddingTop: 'clamp(2rem, 4vw, 4rem)', paddingBottom: 'clamp(2rem, 4vw, 4rem)' }}>
      <div className="absolute inset-0 stone-texture" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 golden-line" style={{ width: 'clamp(200px, 25vw, 300px)' }} />

      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between" style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="heading-sm text-gold/40" style={{ fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)' }}>PORTFOLIO</span>
            <span className="hidden sm:inline text-gold/10">|</span>
            <span className="caption text-text-secondary/40">
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
            <MagneticButton as="a" href="https://github.com/jcoyote-2024037" target="_blank" rel="noopener noreferrer" className="glass rounded-sm flex items-center justify-center border border-gold/[0.06] hover:border-gold/20 hover:bg-gold/[0.03] transition-all duration-300 group"
              style={{ width: 'clamp(2rem, 3vw, 2.5rem)', height: 'clamp(2rem, 3vw, 2.5rem)' }} aria-label="GitHub">
              <FiGithub className="text-text-secondary/40 group-hover:text-gold text-xs sm:text-sm transition-colors duration-300" />
            </MagneticButton>
            <MagneticButton as="a" href="#" className="glass rounded-sm flex items-center justify-center border border-gold/[0.06] hover:border-gold/20 hover:bg-gold/[0.03] transition-all duration-300 group"
              style={{ width: 'clamp(2rem, 3vw, 2.5rem)', height: 'clamp(2rem, 3vw, 2.5rem)' }} aria-label="LinkedIn">
              <FiLinkedin className="text-text-secondary/40 group-hover:text-gold text-xs sm:text-sm transition-colors duration-300" />
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <a href="#home" className="caption text-text-secondary/30 hover:text-gold/60 transition-colors duration-300">Volver arriba &uarr;</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
