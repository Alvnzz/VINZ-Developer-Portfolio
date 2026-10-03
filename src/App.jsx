import { useEffect, useCallback } from 'react';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Qualification from './components/Qualification';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorSpotlight from './components/CursorSpotlight';


const SectionDivider = () => (
  <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-24">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

const particlesInit = async (engine) => {
  try {
    await loadSlim(engine);
  } catch (err) {
    console.warn('Particles init failed:', err);
  }
};

export default function App() {
  useEffect(() => {
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Remove hash from URL without reloading the page
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    // Force scroll to top on fresh load
    window.scrollTo(0, 0);
  }, []);

  return (
    <ParticlesProvider init={particlesInit}>
      <ParticleBackground />
      <CursorSpotlight />
      <Header />
      <main className="relative z-10 w-full pt-16 bg-transparent">
        <div className="flex flex-col w-full">
          <Hero />
          <SectionDivider />
          <Profile />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Qualification />
          <SectionDivider />
          <Contact />
        </div>
      </main>
      <Footer />
    </ParticlesProvider>
  );
}
