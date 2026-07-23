import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ForgedLogo from './ForgedLogo';

const navLinks = [
  { name: 'Inicio', to: '/' },
  { name: 'Stack', to: '/stack' },
  { name: 'Trayectoria', to: '/trayectoria' },
  { name: 'Blog', to: '/blog' },
  { name: 'Stats', to: '/stats' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 navbar-epic ${
          scrolled ? 'navbar-scrolled' : ''
        }`}
      >
        <div className="navbar-glow-bar" />

        <div className="max-w-[clamp(64rem,92vw,100rem)] mx-auto" style={{ paddingLeft: 'clamp(1.25rem, 3vw, 4rem)', paddingRight: 'clamp(1.25rem, 3vw, 4rem)' }}>
          <div className="flex items-center justify-between navbar-height">
            <motion.a
              href="/"
              className="relative shrink-0 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <ForgedLogo />
              <span className="navbar-logo-underline" />
            </motion.a>

            <div className="hidden lg:flex items-center navbar-links-container">
              <div className="navbar-links-left" />
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`navbar-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="navbar-link-text">{link.name}</span>
                    <span className={`navbar-link-indicator ${isActive ? 'active' : ''}`}>
                      <span className="navbar-link-diamond" />
                    </span>
                    <span className="navbar-link-hover-bg" />
                  </Link>
                );
              })}
              <div className="navbar-links-right" />
            </div>

            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative navbar-hamburger-btn flex flex-col items-center justify-center navbar-hamburger"
              aria-label="Menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="navbar-hamburger-ring">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="navbar-hamburger-line"
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="navbar-hamburger-line"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="navbar-hamburger-line"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 navbar-mobile-overlay flex flex-col items-center justify-center lg:hidden"
          >
            <div className="navbar-mobile-glow" />
            <div className="navbar-mobile-grid" />
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link
                    to={link.to}
                    className={`navbar-mobile-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="navbar-mobile-bracket">[</span>
                    <span>{link.name}</span>
                    <span className="navbar-mobile-bracket">]</span>
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
               className="absolute left-1/2 -translate-x-1/2 navbar-mobile-footer-pos"
            >
              <span className="navbar-mobile-footer">✦ NAVEGAR ✦</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
