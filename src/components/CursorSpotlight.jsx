import { useEffect, useRef } from 'react';

/**
 * CursorSpotlight — renders a subtle radial gradient that follows the cursor,
 * creating a "flashlight" effect over the dark background.
 * Uses raw DOM for maximum performance (no React re-renders).
 */
export default function CursorSpotlight() {
  const spotlightRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // Smoothly interpolate spotlight position for a fluid feel
    let currentX = 0;
    let currentY = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const animate = () => {
      currentX = lerp(currentX, posRef.current.x, 0.08);
      currentY = lerp(currentY, posRef.current.y, 0.08);

      el.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(56, 189, 248, 0.06), rgba(129, 140, 248, 0.03) 40%, transparent 70%)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
