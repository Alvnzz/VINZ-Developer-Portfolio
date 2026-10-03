import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import ParticleBackground from './ParticleBackground';

const particlesInit = async (engine) => {
  try {
    await loadSlim(engine);
  } catch (err) {
    console.warn('Particles init failed:', err);
  }
};

export default function ParticlesContainer() {
  return (
    <ParticlesProvider init={particlesInit}>
      <ParticleBackground />
    </ParticlesProvider>
  );
}
