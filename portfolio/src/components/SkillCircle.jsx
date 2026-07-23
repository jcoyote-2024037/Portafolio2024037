import { useInView } from 'react-intersection-observer';

export default function SkillCircle({ name, level, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center" style={{ gap: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
      <div className="skill-circle">
        <svg viewBox="0 0 120 120">
          <circle className="track" cx="60" cy="60" r="48" strokeWidth="3" />
          <circle className="fill-ring" cx="60" cy="60" r="48" strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={inView ? offset : circumference}
            style={{ transitionDelay: `${delay}ms` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="stat-number font-medium" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}>{inView ? level : 0}%</span>
        </div>
      </div>
      <span className="caption text-text-secondary">{name}</span>
    </div>
  );
}
