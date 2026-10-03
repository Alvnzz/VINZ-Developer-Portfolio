import { useEffect, useState, lazy, Suspense } from 'react';
import Header from './components/Header';
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

// Lazy load the heavy particles library to unblock critical rendering path
const LazyParticles = lazy(() => import('./components/LazyParticles'));

const SectionDivider = () => (
  <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-24">
    <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
  </div>
);

export default function App() {
  const [loadParticles, setLoadParticles] = useState(false);

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

    // Defer loading particles network chunks until after LCP paints
    const timer = setTimeout(() => {
      setLoadParticles(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loadParticles && (
        <Suspense fallback={null}>
          <LazyParticles />
        </Suspense>
      )}
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
    </>
  );
}
