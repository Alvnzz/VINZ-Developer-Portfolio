import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CursorSpotlight from './components/CursorSpotlight';

// Lazy load below-the-fold components to slash "Unused Javascript"
const LazyParticles = lazy(() => import('./components/LazyParticles'));
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
  const [loadDeferred, setLoadDeferred] = useState(false);

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

    // Defer loading heavy chunks (Framer Motion, tsParticles, extra sections)
    // until after critical LCP finishes.
    const timer = setTimeout(() => {
      setLoadDeferred(true);
    }, 100); // 100ms is enough to let the browser paint the initial frame first
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loadDeferred && (
        <Suspense fallback={null}>
          <LazyParticles />
        </Suspense>
      )}
      <CursorSpotlight />
      <Header />
      <main className="relative z-10 w-full pt-16 bg-transparent">
        <div className="flex flex-col w-full">
          <Hero />
          
          {loadDeferred && (
            <Suspense fallback={null}>
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
      {loadDeferred && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  );
}
