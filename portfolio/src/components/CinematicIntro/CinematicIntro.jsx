import { useState, useEffect } from 'react';

const phrase = 'La paciencia es un virtud, a veces debes esperar para obtener lo que realmente deseas. Brent Faiyaz.';

export default function CinematicIntro({ children }) {
  const [showIntro, setShowIntro] = useState(true);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (displayedChars < phrase.length) {
      const timer = setTimeout(() => setDisplayedChars(displayedChars + 1), 45);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setFadeOut(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [displayedChars]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setShowIntro(false), 900);
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  return (
    <>
      <div
        className="cinematic-overlay"
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.9s ease',
          pointerEvents: showIntro ? 'auto' : 'none',
        }}
      >
        <div className="cinematic-vignette" />
        <div className="cinematic-content">
          <p className="cinematic-phrase">
            {phrase.split('').map((char, i) => (
              <span
                key={i}
                className="cinematic-char"
                style={{
                  opacity: i < displayedChars ? 1 : 0,
                  filter: i < displayedChars ? 'none' : 'blur(4px)',
                  transition: 'opacity 0.08s ease, filter 0.08s ease',
                }}
              >
                {char}
              </span>
            ))}
          </p>
          {displayedChars >= phrase.length && (
            <span className="cinematic-cursor">|</span>
          )}
        </div>
        <div className="cinematic-bar-top" />
        <div className="cinematic-bar-bottom" />
      </div>

      <div
        className="cinematic-main"
        style={{
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 0.9s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
