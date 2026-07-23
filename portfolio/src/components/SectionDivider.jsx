import { useInView } from 'react-intersection-observer';

export default function SectionDivider() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref} className="section-divider-wave">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ opacity: inView ? 0.4 : 0, transition: 'opacity 1s ease' }}
      >
        <defs>
          <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(200,169,106,0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
          fill="url(#wave-grad)"
          opacity="0.3"
        />
        <path
          d="M0,40 C240,20 480,60 720,40 C960,20 1200,60 1440,40"
          fill="none"
          stroke="rgba(200,169,106,0.08)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
