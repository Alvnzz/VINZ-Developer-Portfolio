import { useEffect, useState, lazy, Suspense, startTransition } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

const ParticlesContainer = lazy(() => import('./components/ParticlesContainer'));
const CursorSpotlight = lazy(() => import('./components/CursorSpotlight'));
const Profile = lazy(() => import('./components/Profile'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Qualification = lazy(() => import('./components/Qualification'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const SectionDivider = () => (
  <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-24">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

export default function App() {
  const [mountBelowFold, setMountBelowFold] = useState(false);
  const [mountEffects, setMountEffects] = useState(false);

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

    // Mount below-the-fold sections right after Hero's first paint so LCP is never blocked
    const rafId = requestAnimationFrame(() => {
      startTransition(() => {
        setMountBelowFold(true);
      });
    });

    // Defer decorative canvas particles until main thread is idle after initial load
    const effectsTimer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => startTransition(() => setMountEffects(true)));
      } else {
        startTransition(() => setMountEffects(true));
      }
    }, 800);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(effectsTimer);
    };
  }, []);

  return (
    <>
      {mountEffects && (
        <Suspense fallback={null}>
          <ParticlesContainer />
          <CursorSpotlight />
        </Suspense>
      )}
      <Header />
      <main className="relative z-10 w-full pt-16 bg-transparent">
        <div className="flex flex-col w-full">
          <Hero />

          {mountBelowFold && (
            <Suspense fallback={<div className="min-h-screen" />}>
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
            </Suspense>
          )}
        </div>
      </main>
      {mountBelowFold && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  );
}
