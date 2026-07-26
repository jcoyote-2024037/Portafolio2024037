import { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [light, setLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const isLight = localStorage.getItem('theme') === 'light';
    root.classList.toggle('light', isLight);
    setLight(isLight);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !light;
    root.classList.toggle('light', next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
    setLight(next);
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={light ? 'Modo oscuro' : 'Modo claro'}
      title={light ? 'Modo oscuro' : 'Modo claro'}
    >
      {light ? <FiMoon size={14} /> : <FiSun size={14} />}
    </button>
  );
}
