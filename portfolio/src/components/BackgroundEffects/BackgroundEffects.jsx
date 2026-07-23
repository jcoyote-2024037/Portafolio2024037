import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);
  const smokeRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let stars = [];
    let sparks = [];
    let mouseX = -1000, mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // === DUST & EMBER particles (existing style enhanced) ===
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2.2 + 0.3;
        this.speedY = -(Math.random() * 0.3 + 0.06);
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.3 + 0.06;
        this.fadeIn = true;
        this.life = 0;
        this.maxLife = Math.random() * 800 + 400;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.008 + 0.004;
        this.type = Math.random() > 0.7 ? 'spark' : 'dust';
        this.brightness = Math.random();
      }
      update() {
        this.wobble += this.wobbleSpeed;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.12;
        this.life++;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x += (dx / dist) * force * 0.6;
          this.y += (dy / dist) * force * 0.6;
        }

        if (this.fadeIn && this.opacity < this.maxOpacity) {
          this.opacity += 0.003;
          if (this.opacity >= this.maxOpacity) this.fadeIn = false;
        }
        if (this.life > this.maxLife * 0.7) this.opacity -= 0.002;
        if (this.opacity <= 0 || this.y < -20) this.reset();
      }
      draw() {
        const r = this.type === 'spark' ? 226 : 200;
        const g = this.type === 'spark' ? 194 : 169;
        const b = this.type === 'spark' ? 123 : 106;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.fill();

        if (this.type === 'spark' && this.size > 1) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 230, ${this.opacity * 0.3})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.06})`;
          ctx.fill();
        }
      }
    }

    // === STARS ===
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.7;
        this.size = Math.random() * 1.2 + 0.3;
        this.baseOpacity = Math.random() * 0.15 + 0.02;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }
      update() {
        this.twinklePhase += this.twinkleSpeed;
      }
      draw() {
        const opacity = this.baseOpacity + Math.sin(this.twinklePhase) * this.baseOpacity * 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, opacity)})`;
        ctx.fill();
      }
    }

    // === SPARKS (fast bright ones) ===
    class Spark {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 1.2 + 0.4);
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 30;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.speedY *= 0.99;
        this.life++;
        if (this.life > this.maxLife * 0.6) this.opacity -= 0.005;
        if (this.opacity <= 0 || this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 194, 123, ${Math.max(0, this.opacity)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 106, ${Math.max(0, this.opacity * 0.08)})`;
        ctx.fill();
      }
    }

    // === Geometric lines ===
    let lines = [];
    class GeoLine {
      constructor() {
        this.reset();
      }
      reset() {
        this.x1 = Math.random() * canvas.width;
        this.y1 = Math.random() * canvas.height;
        this.x2 = this.x1 + (Math.random() - 0.5) * 300;
        this.y2 = this.y1 + (Math.random() - 0.5) * 300;
        this.opacity = Math.random() * 0.02 + 0.005;
        this.speed = (Math.random() - 0.5) * 0.15;
        this.angle = Math.random() * Math.PI * 2;
        this.life = 0;
        this.maxLife = Math.random() * 600 + 400;
      }
      update() {
        this.angle += this.speed * 0.01;
        this.x1 += Math.cos(this.angle) * 0.05;
        this.y1 += Math.sin(this.angle) * 0.05;
        this.x2 += Math.cos(this.angle + 0.5) * 0.05;
        this.y2 += Math.sin(this.angle + 0.5) * 0.05;
        this.life++;
        if (this.life > this.maxLife) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.strokeStyle = `rgba(200, 169, 106, ${this.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    const handleMouse = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };

    const init = () => {
      resize();
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80);
      particles = [];
      for (let i = 0; i < count; i++) {
        const p = new Particle();
        p.y = Math.random() * canvas.height;
        p.life = Math.random() * p.maxLife;
        p.opacity = Math.random() * p.maxOpacity;
        p.fadeIn = false;
        particles.push(p);
      }

      stars = [];
      const starCount = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      for (let i = 0; i < starCount; i++) stars.push(new Star());

      sparks = [];
      for (let i = 0; i < 6; i++) sparks.push(new Spark());

      lines = [];
      for (let i = 0; i < 8; i++) lines.push(new GeoLine());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => { s.update(); s.draw(); });
      lines.forEach(l => { l.update(); l.draw(); });
      particles.forEach(p => { p.update(); p.draw(); });
      sparks.forEach(s => { s.update(); s.draw(); });

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
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0, opacity: 0.8 }}
      />
      <div className="smoke-container" ref={smokeRef} aria-hidden="true">
        <div className="smoke-wisp smoke-wisp-1" />
        <div className="smoke-wisp smoke-wisp-2" />
        <div className="smoke-wisp smoke-wisp-3" />
      </div>
    </>
  );
}
