import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CustomCursor from '../CustomCursor/CustomCursor';
import ScrollProgress from '../ScrollProgress/ScrollProgress';
import BackToTop from '../BackToTop/BackToTop';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Footer from '../Footer/Footer';
import BackgroundEffects from '../BackgroundEffects/BackgroundEffects';

export default function Layout() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handle = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <>
      <CustomCursor />
      <div
        className="ambient-glow"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="relative min-h-screen bg-bg-primary text-text-primary font-inter">
        <BackgroundEffects />
        <div className="noise-overlay" />
        <Navbar />
        <ThemeToggle />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollProgress />
        <BackToTop />
      </div>
    </>
  );
}
