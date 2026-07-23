import { useState, useEffect } from 'react';

const logoText = 'Portafolio  ';

export default function ForgedLogo() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [done, setDone] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const hasPlayed = localStorage.getItem('logoForged');
    if (hasPlayed) {
      setRevealedCount(logoText.length);
      setDone(true);
      return;
    }

    if (revealedCount < logoText.length) {
      const timer = setTimeout(() => setRevealedCount(revealedCount + 1), 120);
      return () => clearTimeout(timer);
    } else {
      setFlash(true);
      const timer = setTimeout(() => {
        setDone(true);
        localStorage.setItem('logoForged', 'true');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [revealedCount]);

  return (
    <span className={`navbar-logo ${done ? 'done' : ''} ${flash ? 'flash' : ''}`}>
      {logoText.split('').map((char, i) => {
        const isRevealed = i < revealedCount;
        const justRevealed = i === revealedCount - 1;
        return (
          <span
            key={i}
            className="navbar-forged-char"
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.8)',
              filter: justRevealed ? 'brightness(1.4)' : isRevealed ? 'brightness(1)' : 'brightness(0)',
              textShadow: justRevealed
                ? '0 0 20px rgba(200,169,106,0.8), 0 0 40px rgba(200,169,106,0.4)'
                : isRevealed
                ? '0 0 8px rgba(200,169,106,0.2)'
                : 'none',
              transition: 'opacity 0.15s ease, transform 0.15s ease, filter 0.3s ease, text-shadow 0.3s ease',
              transitionDelay: justRevealed ? '0ms' : `${(revealedCount - i) * 30}ms`,
            }}
          >
            {char}
          </span>
        );
      })}
      {!done && (
        <span className="navbar-forged-sweep" style={{
          left: `${(revealedCount / logoText.length) * 100}%`,
          transition: 'left 0.15s ease',
        }} />
      )}
    </span>
  );
}
