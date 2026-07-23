import { useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle('light');
    const isLight = root.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle rounded-sm"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <FiSun size={14} />
    </button>
  );
}
