import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const circumference = 2 * Math.PI * 20;

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? Math.min(winScroll / height, 1) : 0;
      setProgress(scrolled);
      setVisible(winScroll > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className={`scroll-progress-ring ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      title="Volver arriba"
    >
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle className="track-ring" cx="24" cy="24" r="20" strokeWidth="2" />
        <circle
          className="fill-ring"
          cx="24" cy="24" r="20" strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <span className="arrow-icon">&uarr;</span>
    </div>
  );
}
