import { useLanguage } from '../context/LanguageContext';
import { useInView } from '../hooks/useInView';

// ─── Animation Config ───
// The Hero uses pure-CSS reveal transitions (see `.hero-reveal` in index.css) instead of
// framer-motion. Hero animates during first load, when the main thread is busiest
// (React render + tsParticles init); JS-driven per-frame animation stuttered there,
// whereas CSS transform/opacity transitions run on the GPU compositor thread.
// Stable module-level object → the IntersectionObserver is created only once.
const VIEWPORT_OPTIONS = { threshold: 0.1, rootMargin: '-20px' };

// Split once at module level instead of on every render.
const NAME_WORDS = 'ALFIAN SETYA DWI SAPUTRA'.split(' ');

/** Builds the inline CSS variable used as per-element stagger delay (seconds). */
const delay = (seconds) => ({ '--hero-d': `${seconds}s` });

// ─── Hero Component ───
export default function Hero() {
  const { t } = useLanguage();
  const [sectionRef, inView] = useInView(VIEWPORT_OPTIONS);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-inview={inView}
      className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin min-h-screen flex flex-col justify-center pt-2 pb-48 lg:pt-0 lg:pb-24 scroll-mt-24"
    >
      <div className="flex flex-col items-center text-center gap-6 lg:gap-16">

        {/* ① Status Pill — elastic drop */}
        <div className="hero-reveal hero-reveal--drop">
          <div className="inline-flex items-center justify-center px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-sm">
            <span className="font-label-sm text-[9px] lg:text-label-sm uppercase tracking-wider text-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">{t('hero_status')}</span>
          </div>
        </div>

        {/* ② Name — per-word clip slide up */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
          <h1 className="font-display text-display-mobile lg:text-display text-on-surface tracking-tight uppercase select-none flex flex-wrap justify-center gap-x-[0.25em]">
            {NAME_WORDS.map((word, wi) => (
              <span key={word} className="inline-flex overflow-hidden pb-2">
                <span className="inline-block hero-reveal hero-reveal--clip" style={delay(0.1 + wi * 0.07)}>
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* ③ Subtitle — rise fade (LCP ELEMENT, so kept early) */}
          <h2
            className="hero-reveal font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-medium tracking-tight text-center"
            style={delay(0.25)}
          >
            {t('hero_subtitle')}
          </h2>

          {/* ④ Description — rise fade */}
          <p
            className="hero-reveal max-w-2xl font-body-md text-body-md lg:font-body-lg lg:text-body-lg text-on-surface-variant text-center"
            style={delay(0.4)}
          >
            {t('hero_desc')}
          </p>
        </div>

        {/* ⑤ CTA Buttons — spring pop.
            Reveal lives on a wrapper so its `transition` doesn't override the buttons' own hover transitions. */}
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-space-md mt-4 lg:mt-0">
          <div className="hero-reveal hero-reveal--pop" style={delay(0.55)}>
            <a
              href="#projects"
              className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-on-surface text-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-shadow duration-300 flex items-center gap-2 group"
            >
              <span>{t('hero_cta_projects')}</span>
              <span className="material-symbols-outlined text-[14px] lg:text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          <div className="hero-reveal hero-reveal--pop" style={delay(0.65)}>
            <a
              href="#contact"
              className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:text-primary transition-colors duration-300 flex items-center gap-2"
            >
              <span>{t('hero_cta_contact')}</span>
              <span className="material-symbols-outlined text-[14px] lg:text-[16px]">mail</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
