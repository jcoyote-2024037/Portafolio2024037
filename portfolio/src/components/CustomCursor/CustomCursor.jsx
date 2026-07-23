import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    };

    const onHover = (e) => {
      if (e.target.closest('a, button, .group, [data-cursor]')) {
        dot.classList.add('hovering');
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursor.style.opacity = '0.5';
      } else {
        dot.classList.remove('hovering');
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursor.style.opacity = '0.3';
      }
    };

    window.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseover', onHover);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('mouseover', onHover);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"
        style={{
          width: '30px', height: '30px',
          background: 'radial-gradient(circle, rgba(200,169,106,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          left: '-100px', top: '-100px',
        }}
      />
      <div ref={dotRef} className="custom-cursor-dot" style={{ left: '-100px', top: '-100px' }} />
    </>
  );
}
