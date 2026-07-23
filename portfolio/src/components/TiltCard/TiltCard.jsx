import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMouse = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease-out' }}
    >
      {children}
    </div>
  );
}
