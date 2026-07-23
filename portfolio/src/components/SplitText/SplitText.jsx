import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export default function SplitText({ text, as: Tag = 'h1', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.split-text-char');
    chars.forEach((char, i) => {
      setTimeout(() => char.classList.add('revealed'), i * 40);
    });
  }, [inView]);

  return (
    <Tag ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-text-char"
          style={{ transitionDelay: `${i * 40}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </Tag>
  );
}
