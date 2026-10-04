import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const viewport = { once: false, amount: 0.1, margin: '-20px' };
const exitTransition = { duration: 0.4, ease: 'easeIn' };

const heroDrop = {
  hidden: { opacity: 0, y: -40, scale: 0.8, transition: exitTransition },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.0 } }
};

const clipUp = {
  hidden: { y: '110%', transition: exitTransition },
  visible: (custom) => ({ y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 + custom * 0.08 } })
};

const sweep = {
  hidden: { filter: 'blur(8px)', letterSpacing: '0.15em', opacity: 0, transition: exitTransition },
  visible: { 
    filter: ['blur(8px)', 'blur(2px)', 'blur(0px)'], 
    letterSpacing: ['0.15em', '0.02em', '-0.03em'], 
    opacity: [0, 0.8, 1], 
    transition: { duration: 1.5, times: [0, 0.5, 1], ease: 'easeOut', delay: 0.4 } 
  }
};

const fadeScale = {
  hidden: { opacity: 0, y: 20, scale: 0.97, filter: 'blur(4px)', transition: exitTransition },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 } }
};

const springCTA = {
  hidden: { opacity: 0, scale: 0.5, y: 15, transition: exitTransition },
  visible: (custom) => ({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: custom } })
};

// ─── Hero Component ───
export default function Hero() {
  const { t } = useLanguage();
  const nameText = 'ALFIAN SETYA DWI SAPUTRA';

  return (
    <motion.section 
      id="hero" 
      className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin min-h-screen flex flex-col justify-center pt-2 pb-48 lg:pt-0 lg:pb-24 scroll-mt-24"
      initial="hidden"
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
            {nameText.split(' ').map((word, wi) => (
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

          {/* ③ Subtitle — blur sweep (LCP ELEMENT) */}
          <motion.h2
            className="font-headline-xl text-headline-xl-mobile lg:text-headline-xl text-primary font-medium tracking-tight text-center"
            variants={sweep}
          >
            {t('hero_subtitle')}
          </motion.h2>

          {/* ④ Description — fade scale */}
          <motion.p
            className="max-w-2xl font-body-md text-body-md lg:font-body-lg lg:text-body-lg text-on-surface-variant text-center"
            variants={fadeScale}
          >
            {t('hero_desc')}
          </motion.p>
        </div>

        {/* ⑤ CTA Buttons — spring pop */}
        <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-space-md mt-4 lg:mt-0">
          <motion.a
            href="#projects"
            className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-on-surface text-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all duration-300 flex items-center gap-2 group"
            custom={0.8}
            variants={springCTA}
          >
            <span>{t('hero_cta_projects')}</span>
            <span className="material-symbols-outlined text-[14px] lg:text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="px-5 py-3 lg:px-6 lg:py-3.5 rounded-full bg-surface-container-high/80 backdrop-blur-md text-on-surface font-label-md text-[11px] lg:text-label-md uppercase tracking-wider hover:text-primary transition-all duration-300 flex items-center gap-2"
            custom={0.9}
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
