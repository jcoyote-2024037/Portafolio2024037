import { useEffect, useRef } from 'react';

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouseX = -1000, mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedY = -(Math.random() * 0.25 + 0.08);
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.35 + 0.08;
        this.fadeIn = true;
        this.life = 0;
        this.maxLife = Math.random() * 700 + 500;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.01 + 0.005;
        this.brightness = Math.random();
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.15;
        this.life++;

        // Mouse interaction
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 0.8;
          this.y += (dy / dist) * force * 0.8;
        }

        if (this.fadeIn && this.opacity < this.maxOpacity) {
          this.opacity += 0.004;
          if (this.opacity >= this.maxOpacity) this.fadeIn = false;
        }
        if (this.life > this.maxLife * 0.7) this.opacity -= 0.002;
        if (this.opacity <= 0 || this.y < -20) this.reset();
      }

      draw() {
        const r = this.brightness > 0.7 ? 226 : 200;
        const g = this.brightness > 0.7 ? 194 : 169;
        const b = this.brightness > 0.7 ? 123 : 106;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.fill();

        // Subtle glow
        if (this.size > 1.2) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.08})`;
          ctx.fill();
        }
      }
    }

    const handleMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    const init = () => {
      resize();
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 70);
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height;
        p.life = Math.random() * p.maxLife;
        p.opacity = Math.random() * p.maxOpacity;
        p.fadeIn = false;
        particles.push(p);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
