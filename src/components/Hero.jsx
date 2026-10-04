import { useLanguage } from '../context/LanguageContext';
import { motion, useReducedMotion } from 'framer-motion';

// ─── Animation Config ───
// PERFORMANCE: every variant below animates ONLY `transform` (x/y/scale) and `opacity`.
// These run on the GPU compositor thread. Previously we animated `filter: blur()`
// (full repaint every frame) and `letterSpacing` (full layout reflow every frame),
// which caused jank on low-end/mobile devices.
const viewport = { once: false, amount: 0.1, margin: '-20px' };
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];
const exitTransition = { duration: 0.3, ease: 'easeIn' };

const heroDrop = {
  hidden: { opacity: 0, y: -24, transition: exitTransition },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_BACK } }
};

const clipUp = {
  hidden: { y: '110%', transition: exitTransition },
  visible: (i) => ({ y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.07 } })
};

// Replaces the old blur + letter-spacing sweep with a cheap rise-and-fade.
// Delay kept short because this <h2> is the LCP element.
const riseFade = {
  hidden: { opacity: 0, y: 16, transition: exitTransition },
  visible: (delay) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay } })
};

const springCTA = {
  hidden: { opacity: 0, scale: 0.9, y: 12, transition: exitTransition },
  visible: (delay) => ({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE_BACK, delay } })
};

// Split once at module level instead of on every render.
const NAME_WORDS = 'ALFIAN SETYA DWI SAPUTRA'.split(' ');

// ─── Hero Component ───
export default function Hero() {
  const { t } = useLanguage();
  // Accessibility + perf: skip all entrance/exit motion if the OS requests reduced motion.
  const reduceMotion = useReducedMotion();

  return (
    <motion.section 
      id="hero" 
      className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin min-h-screen flex flex-col justify-center pt-2 pb-48 lg:pt-0 lg:pb-24 scroll-mt-24"
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={viewport}
    >
      <div className="flex flex-col items-center text-center gap-6 lg:gap-16">

        {/* ① Status Pill — elastic drop */}
        <motion.div variants={heroDrop}>
          <div className="inline-flex items-center justify-center px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-surface-container-high/70 backdrop-blur-md shadow-sm">
            <span className="font-label-sm text-[9px] lg:text-label-sm uppercase tracking-wider text-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">{t('hero_status')}</span>
          </div>
        </motion.div>

        {/* ② Name — per-word clip slide up */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
          <h1 className="font-display text-display-mobile lg:text-display text-on-surface tracking-tight uppercase select-none flex flex-wrap justify-center gap-x-[0.25em]">
            {NAME_WORDS.map((word, wi) => (
              <span key={wi} className="inline-flex overflow-hidden pb-2">
                <motion.span
                  className="inline-block"
                  custom={wi}
                  variants={clipUp}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* ③ Subtitle — rise fade (LCP ELEMENT) */}
          <motion.h2
            className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-medium tracking-tight text-center"
            custom={0.25}
            variants={riseFade}
          >
            {t('hero_subtitle')}
          </motion.h2>

          {/* ④ Description — rise fade */}
          <motion.p
            className="max-w-2xl font-body-md text-body-md lg:font-body-lg lg:text-body-lg text-on-surface-variant text-center"
            custom={0.4}
            variants={riseFade}
          >
            {t('hero_desc')}
          </motion.p>
        </div>

        {/* ⑤ CTA Buttons — spring pop */}
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-space-md mt-4 lg:mt-0">
          <motion.a
            href="#projects"
            className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-on-surface text-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-shadow duration-300 flex items-center gap-2 group"
            custom={0.55}
            variants={springCTA}
          >
            <span>{t('hero_cta_projects')}</span>
            <span className="material-symbols-outlined text-[14px] lg:text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:text-primary transition-colors duration-300 flex items-center gap-2"
            custom={0.65}
            variants={springCTA}
          >
            <span>{t('hero_cta_contact')}</span>
            <span className="material-symbols-outlined text-[14px] lg:text-[16px]">mail</span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}
