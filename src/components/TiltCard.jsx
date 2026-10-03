import { useRef, useCallback } from 'react';

/**
 * TiltCard — A wrapper component that adds a 3D perspective tilt effect
 * and a localized glow highlight on mouse hover.
 *
 * Simply wrap any card/element with <TiltCard> to enable the effect.
 * Works entirely with vanilla DOM manipulation for 60fps smoothness.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glowOpacity = 0.12,
  scale = 1.02,
  ...props
}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.transition = 'transform 0.1s ease-out';

    // Glow follows cursor
    if (glowRef.current) {
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(56, 189, 248, ${glowOpacity}), transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [maxTilt, glowOpacity, scale]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;

    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        willChange: 'transform',
      }}
      {...props}
    >
      {/* Glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
