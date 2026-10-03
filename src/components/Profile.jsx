import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeader, AnimatedElement, StaggerParent, slideInLeft, fadeUp } from '../utils/animations';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const PORTRAIT_URL = '/images/profile.webp';

// Unique Animation for Borders
const expandLine = {
  hidden: { scaleX: 0, originX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Image Curtain Reveal
const imageReveal = {
  hidden: { scale: 1.2, filter: 'brightness(0.5)' },
  visible: { scale: 1, filter: 'brightness(1)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
};

export default function Profile() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="profile" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-6 lg:py-8 scroll-mt-24">
      <div className="flex flex-col gap-space-lg">
        {/* Section Header */}
        <AnimatedHeader className="flex items-center gap-3">
          <span className="font-code text-[11px] lg:text-code text-primary">01 //</span>
          <h2 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">{t('profile_heading')}</h2>
        </AnimatedHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          
          {/* Left: Portrait Card (Curtain Reveal + Parallax Hover) */}
          <TiltCard maxTilt={2} glowOpacity={0.1} scale={1.01} className="lg:col-span-5 rounded-3xl bg-surface-container-low/80 hover:bg-surface-container-low p-3 lg:p-space-md shadow-md group/portrait border border-outline-variant/10 hover:border-primary/30 transition-colors duration-500 h-full">
            <AnimatedElement variants={slideInLeft} className="flex flex-col justify-between gap-3 lg:gap-space-md h-full w-full">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-container-highest shadow-inner">
                {/* Image with framer-motion reveal */}
                <motion.img 
                  alt="Alvnzz Editorial Portrait" 
                  className="w-full h-full object-cover group-hover/portrait:scale-105 transition-transform duration-[1500ms] ease-out" 
                  src={PORTRAIT_URL} 
                  variants={imageReveal}
                />
                
                {/* Overlay Glass Shine on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* Status with Pulsing Dot */}
              <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center justify-between gap-1 py-2.5 bg-surface-container-high/50 px-2 sm:px-4 rounded-xl border border-outline-variant/10 overflow-hidden">
                  <span className="uppercase tracking-widest text-[9px] sm:text-[10px] font-bold text-outline whitespace-nowrap">{t('profile_status')}</span>
                  <div className="flex items-center">
                    <span className="font-label-sm text-[9px] sm:text-[10px] lg:text-label-sm uppercase tracking-wider text-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] whitespace-nowrap">
                      {t('profile_status_value')}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </TiltCard>

          {/* Right: Biodata (Staggered Text + Animated Borders) */}
          <TiltCard maxTilt={1} glowOpacity={0.05} scale={1.005} className="lg:col-span-7 rounded-3xl bg-surface-container-low/80 hover:bg-surface-container-low p-5 lg:p-space-lg shadow-sm border border-outline-variant/5 hover:border-outline-variant/20 transition-colors duration-500 h-full">
            <StaggerParent staggerDelay={0.15} className="flex flex-col justify-center gap-6 h-full">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 relative pb-4">
                <AnimatedElement variants={fadeUp} className="font-label-sm text-[11px] uppercase text-primary tracking-widest">{t('profile_fullname')}</AnimatedElement>
                <AnimatedElement variants={fadeUp} className="font-headline-sm text-[20px] leading-[26px] lg:text-[24px] text-on-surface font-semibold tracking-wide">Alfian Setya Dwi Saputra</AnimatedElement>
                <AnimatedElement variants={expandLine} className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-surface-container-highest via-surface-container-highest to-transparent" />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5 relative pb-4">
                <AnimatedElement variants={fadeUp} className="font-label-sm text-[11px] uppercase text-primary tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {t('profile_location')}
                </AnimatedElement>
                <AnimatedElement variants={fadeUp} className="font-body-md text-body-sm lg:text-body-lg text-on-surface-variant">Rejosari, Kawedanan, Magetan, Indonesia</AnimatedElement>
                <AnimatedElement variants={expandLine} className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-surface-container-highest via-surface-container-highest to-transparent" />
              </div>

              {/* Language */}
              <div className="flex flex-col gap-1.5 relative pb-4">
                <AnimatedElement variants={fadeUp} className="font-label-sm text-[11px] uppercase text-primary tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">language</span>
                  {t('profile_language')}
                </AnimatedElement>
                <AnimatedElement variants={fadeUp} className="font-body-md text-body-sm lg:text-body-lg text-on-surface-variant flex flex-col md:flex-row md:items-center gap-1 md:gap-0">
                  <span><span className="text-on-surface font-medium">Indonesia</span> (Native)</span>
                  <span className="hidden md:inline mx-2 text-surface-container-highest">|</span>
                  <span><span className="text-on-surface font-medium">Inggris</span> (Intermediate - Passive)</span>
                </AnimatedElement>
                <AnimatedElement variants={expandLine} className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-surface-container-highest via-surface-container-highest to-transparent" />
              </div>

              {/* About Me */}
              <div className="flex flex-col gap-2 pt-2">
                <AnimatedElement variants={fadeUp} className="font-label-sm text-[11px] uppercase text-primary tracking-widest flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">person</span>
                  {t('profile_about')}
                </AnimatedElement>
                <AnimatedElement variants={fadeUp} className="flex flex-col gap-1 items-start">
                  <span className={`font-body-md text-body-md text-on-surface-variant leading-relaxed text-justify transition-all duration-300 ${!isExpanded ? 'line-clamp-4 lg:line-clamp-none' : ''}`}>
                    {t('profile_summary')}
                  </span>
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="lg:hidden font-label-sm text-[12px] text-primary hover:text-primary-fixed uppercase tracking-wider mt-1 border-b border-primary/30 pb-0.5"
                  >
                    {isExpanded ? t('read_less') : t('read_more')}
                  </button>
                </AnimatedElement>
              </div>
            </StaggerParent>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
