import { useState, useEffect } from 'react';

export default function LoadingScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`loading-screen ${loading ? '' : 'hidden'}`}>
        <div className="loading-symbol">
          <span>P</span>
        </div>
        <div className="loading-bar">
          <div className="loading-bar-inner" />
        </div>
      </div>
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
        {children}
      </div>
    </>
  );
}
