export default function Embers() {
  return (
    <div className="ember-container" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="ember" style={{
          left: `${10 + i * 10}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${5 + i * 0.4}s`,
        }} />
      ))}
    </div>
  );
}
