import { useMemo, useState, useEffect } from 'react';
import { Particles } from '@tsparticles/react';

export default function ParticleBackground() {

  const options = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 150, links: { opacity: 0.4 } },
        push: { quantity: 2 },
      },
    },
    particles: {
      color: { value: '#38bdf8' },
      links: { color: '#38bdf8', distance: 160, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 0.6, direction: 'none', random: true, straight: false, outModes: { default: 'out' } },
      number: { density: { enable: true, area: 700 }, value: 80, limit: { value: 120 } },
      opacity: { value: { min: 0.15, max: 0.5 }, animation: { enable: true, speed: 0.8, minimumValue: 0.15 } },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0 pointer-events-none"
      options={options}
    />
  );
}
