import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

import { AnimatedHeader, AnimatedElement, StaggerParent, scaleTilt, fadeUp, popIn } from '../utils/animations';

const projectTags = [
  { name: 'Flutter', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter" className="w-4 h-4 object-contain" /> },
  { name: 'Dart', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" alt="Dart" className="w-4 h-4 object-contain" /> },
  { name: 'Firebase', icon: <img src="/icons/firebase.svg" alt="Firebase" className="w-4 h-4 object-contain" /> },
  { name: 'Firestore', icon: <img src="/icons/firestore.webp" alt="Firestore" className="w-4 h-4 object-contain" /> },
  { name: 'Visual Studio Code', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" className="w-4 h-4 object-contain" /> },
  { name: 'Antigravity', icon: <img src="/icons/antigravity.webp" alt="Antigravity" className="w-4 h-4 object-contain" /> },
  { name: 'Android Studio', icon: <img src="/icons/android-studio.svg" alt="Android Studio" className="w-4 h-4 object-contain" /> },
];

const carouselImages = [
  "/images/alvins-project-1.webp",
  "/images/alvins-project-2.webp",
  "/images/alvins-project-3.webp",
];

export default function Projects() {
  const { t } = useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <>
      <section id="projects" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-6 lg:py-8 scroll-mt-24">
        <div className="flex flex-col gap-8">
          <AnimatedHeader className="flex items-center gap-3">
            <span className="font-code text-[11px] lg:text-code text-primary shrink-0">
              03 //
            </span>
            <h2 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">
              {t('proj_heading')}
            </h2>
          </AnimatedHeader>

          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            {/* Invisible spacer to perfectly align with the text above */}
            <div className="font-code text-[11px] lg:text-code opacity-0 pointer-events-none select-none" aria-hidden="true">
              03 //
            </div>

            {/* 1 Project Data */}
            <div className="col-start-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[52px] gap-y-6 lg:gap-y-0 items-stretch">
            
            {/* LEFT COLUMN (Desktop Grouping) */}
            <div className="contents lg:flex lg:flex-col lg:h-full lg:min-w-0">
              
              {/* Carousel (Mobile: 1, Desktop: Top of Left Col) */}
              <AnimatedElement variants={scaleTilt} className="order-1 lg:order-none relative rounded-2xl bg-surface-container-low/80 p-3 lg:p-4 shadow-md border border-outline-variant/10 flex-1 flex flex-col min-h-[220px] lg:min-h-[300px]">
                {/* The 3D container */}
                <div className="relative w-full flex-1 perspective-[1200px] flex items-center justify-center overflow-hidden rounded-xl group/carousel">
                  {carouselImages.map((src, idx) => {
                    let offset = idx - currentIndex;
                    
                    // Wrap-around logic for 3 images
                    if (offset < -1) offset += carouselImages.length;
                    if (offset > 1) offset -= carouselImages.length;

                    let zIndex = 30;
                    let transformStr = "translateX(0) translateZ(0) rotateY(0) scale(1)";
                    let opacity = 1;

                    if (offset === -1) {
                      zIndex = 20;
                      transformStr = "translateX(-25%) translateZ(-150px) rotateY(20deg) scale(0.85)";
                      opacity = 0;
                    } else if (offset === 1) {
                      zIndex = 20;
                      transformStr = "translateX(25%) translateZ(-150px) rotateY(-20deg) scale(0.85)";
                      opacity = 0;
                    }

                    return (
                      <div
                        key={src}
                        className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out cursor-pointer border border-outline-variant/20"
                        style={{
                          transform: transformStr,
                          zIndex,
                          opacity,
                          transformStyle: 'preserve-3d',
                        }}
                        onClick={() => {
                          if (offset === -1) handlePrev();
                          if (offset === 1) handleNext();
                        }}
                      >
                        <img 
                          src={src} 
                          alt={`Project Screenshot ${idx + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        {offset !== 0 && (
                          <div className="absolute inset-0 bg-surface-container-highest/40 backdrop-blur-[1px] transition-all duration-700" />
                        )}
                        {/* Interactive Shine Effect on Active Image */}
                        {offset === 0 && (
                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows with Hover Pulse */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 lg:w-12 lg:h-12 text-white/70 hover:text-white flex items-center justify-center transition-all hover:-translate-x-1 hover:scale-110 active:scale-95 group/btn"
                  aria-label="Previous Image"
                >
                  <span className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="material-symbols-outlined text-3xl lg:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10">chevron_left</span>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-40 w-8 h-8 lg:w-12 lg:h-12 text-white/70 hover:text-white flex items-center justify-center transition-all hover:translate-x-1 hover:scale-110 active:scale-95 group/btn"
                  aria-label="Next Image"
                >
                  <span className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="material-symbols-outlined text-3xl lg:text-4xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] relative z-10">chevron_right</span>
                </button>
              </AnimatedElement>

              {/* Tags (Mobile: 4, Desktop: Bottom of Left Col) */}
              <StaggerParent className="order-4 lg:order-none flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-container-high/60 mt-4 lg:mt-6" staggerDelay={0.06}>
                <div className="flex flex-wrap gap-2">
                  {projectTags.map((tag, idx) => (
                    <AnimatedElement key={tag.name} variants={popIn} className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-code text-code border border-outline-variant/10 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] float-tag tag-${idx % 3}`}>
                      <span className="text-[16px] flex items-center justify-center transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{tag.icon}</span>
                      <span>{tag.name}</span>
                    </AnimatedElement>
                  ))}
                </div>
              </StaggerParent>

            </div>

            {/* RIGHT COLUMN (Desktop Grouping - STAGGERED REVEAL) */}
            <StaggerParent staggerDelay={0.15} className="contents lg:flex lg:flex-col lg:h-full lg:min-w-0">
              
              {/* Label & Date (Mobile: 2, Desktop: Top of Right Col) */}
              <AnimatedElement variants={fadeUp} className="order-2 lg:order-none flex items-center gap-3 lg:mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase">{t('proj_1_label')}</span>
                <span className="font-code text-code text-outline">{t('proj_1_date')}</span>
              </AnimatedElement>

              {/* Main Text (Mobile: 3, Desktop: Bottom of Right Col) */}
              <div className="order-3 lg:order-none flex flex-col gap-6">
                
                <AnimatedElement variants={fadeUp} className="flex flex-col gap-3">
                  <div className="flex items-center gap-4 lg:gap-5">
                    <div className="relative cursor-default group shrink-0">
                      {/* Continuous Ripple Ring */}
                      <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping opacity-40 group-hover:animate-none group-hover:scale-110 transition-transform duration-300" style={{ animationDuration: '2.5s' }} />
                      <img src="/images/alvins-bakery.webp" alt="ALVIN'S Bakery Logo" className="relative z-10 w-14 h-14 lg:w-16 lg:h-16 object-contain bg-white rounded-full p-1.5 border border-outline-variant/20 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-shadow duration-300" />
                    </div>
                    <h4 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface">{t('proj_1_title')}</h4>
                  </div>
                  <div className="flex items-center">
                    <span className="font-code text-code text-primary font-medium animate-pulse drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">{t('proj_dev_stage')}</span>
                  </div>
                </AnimatedElement>

                <AnimatedElement variants={fadeUp} className="font-body-md text-body-md text-on-surface-variant text-justify leading-relaxed">
                  {t('proj_1_desc')}
                </AnimatedElement>

                <div className="flex flex-col gap-4">
                  <AnimatedElement variants={fadeUp} className="flex flex-col gap-1 group">
                    <span className="font-label-sm text-label-sm uppercase text-outline group-hover:text-on-surface transition-colors">01 / {t('proj_problem_label')}</span>
                    <p className="font-body-sm text-body-sm text-on-surface text-justify">{t('proj_1_challenge')}</p>
                  </AnimatedElement>
                  <AnimatedElement variants={fadeUp} className="flex flex-col gap-1 group">
                    <span className="font-label-sm text-label-sm uppercase text-primary group-hover:text-primary-container transition-colors">02 / {t('proj_solution_label')}</span>
                    <p className="font-body-sm text-body-sm text-on-surface text-justify">{t('proj_1_engineering')}</p>
                  </AnimatedElement>
                  <AnimatedElement variants={fadeUp} className="flex flex-col gap-1 group">
                    <span className="font-label-sm text-label-sm uppercase text-primary-container group-hover:text-white transition-colors">03 / {t('proj_result_label')}</span>
                    <p className="font-body-sm text-body-sm text-on-surface font-medium text-justify group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all">{t('proj_1_impact')}</p>
                  </AnimatedElement>
                </div>
              </div>

            </StaggerParent>

          </div>
        </div>
        </div>
      </section>

      {/* ── Magnetic Floating Animation for Tags ── */}
      <style>{`
        .float-tag {
          animation: floatY 6s ease-in-out infinite;
        }
        /* Offset the animation start times to make it look organic */
        .tag-0 { animation-delay: 0s; }
        .tag-1 { animation-delay: -2s; }
        .tag-2 { animation-delay: -4s; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        /* Stop floating when hovered so the user can click/read easily */
        .float-tag:hover {
          animation-play-state: paused;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
