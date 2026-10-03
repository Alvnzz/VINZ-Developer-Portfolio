import { useLanguage } from '../context/LanguageContext';

// ─── Hero Component ───
export default function Hero() {
  const { t } = useLanguage();
  const nameText = 'ALFIAN SETYA DWI SAPUTRA';

  return (
    <>
      <section id="hero" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin min-h-screen flex flex-col justify-center pt-2 pb-48 lg:pt-0 lg:pb-24 scroll-mt-24">
        <div className="flex flex-col items-center text-center gap-6 lg:gap-16">

          {/* ① Status Pill — elastic drop */}
          <div className="hero-anim-drop" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center justify-center px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-sm">
              <span className="font-label-sm text-[9px] lg:text-label-sm uppercase tracking-wider text-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">{t('hero_status')}</span>
            </div>
          </div>

          {/* ② Name — per-word clip slide up */}
          <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
            <h1 className="font-display text-display-mobile lg:text-display text-on-surface tracking-tight uppercase select-none flex flex-wrap justify-center gap-x-[0.25em]">
              {nameText.split(' ').map((word, wi) => (
                <span key={wi} className="inline-flex overflow-hidden pb-2">
                  <span
                    className="inline-block hero-anim-clip-up"
                    style={{ animationDelay: `${0.3 + wi * 0.12}s` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* ③ Subtitle — blur sweep (LCP ELEMENT) */}
            <h2 className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-medium tracking-tight text-center hero-anim-gradient-sweep" style={{ animationDelay: '1.2s' }}>
              {t('hero_subtitle')}
            </h2>

            {/* ④ Description — fade scale */}
            <p className="max-w-2xl font-body-md text-body-md lg:font-body-lg lg:text-body-lg text-on-surface-variant text-center hero-anim-fade-scale" style={{ animationDelay: '1.8s' }}>
              {t('hero_desc')}
            </p>
          </div>

          {/* ⑤ CTA Buttons — spring pop */}
          <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-space-md mt-4 lg:mt-0">
            <a
              href="#projects"
              className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-on-surface text-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all duration-300 flex items-center gap-2 group hero-anim-spring"
              style={{ animationDelay: '2.4s' }}
            >
              <span>{t('hero_cta_projects')}</span>
              <span className="material-symbols-outlined text-[14px] lg:text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a
              href="#contact"
              className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:text-primary transition-all duration-300 flex items-center gap-2 hero-anim-spring"
              style={{ animationDelay: '2.55s' }}
            >
              <span>{t('hero_cta_contact')}</span>
              <span className="material-symbols-outlined text-[14px] lg:text-[16px]">mail</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Styles ── */}
      <style>{`
        /* ── Pure CSS Entrance Animations (Non-blocking) ── */
        .hero-anim-drop {
          opacity: 0;
          animation: heroDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes heroDrop {
          0% { opacity: 0; transform: translateY(-40px) scale(0.8); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .hero-anim-clip-up {
          transform: translateY(110%);
          animation: heroClipUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroClipUp {
          0% { transform: translateY(110%); }
          100% { transform: translateY(0); }
        }

        .hero-anim-gradient-sweep {
          opacity: 0;
          animation: heroSweep 1.5s ease forwards;
        }
        @keyframes heroSweep {
          0%   { filter: blur(8px); letter-spacing: 0.15em; opacity: 0; }
          50%  { filter: blur(2px); letter-spacing: 0.02em; opacity: 0.8; }
          100% { filter: blur(0px); letter-spacing: -0.03em; opacity: 1; }
        }

        .hero-anim-fade-scale {
          opacity: 0;
          animation: heroFadeScale 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroFadeScale {
          0% { opacity: 0; transform: translateY(20px) scale(0.97); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .hero-anim-spring {
          opacity: 0;
          animation: heroSpring 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes heroSpring {
          0% { opacity: 0; transform: scale(0.5) translateY(15px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
