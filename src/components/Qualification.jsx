import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeader, AnimatedElement, StaggerParent, scaleTilt } from '../utils/animations';
import TiltCard from './TiltCard';

const items = [
  // Trainings
  {
    titleKey: 'train_1_title', descKey: 'train_1_desc',
    dateKey: 'train_1_date', institution: 'Digital Talent Academy',
    categoryKey: 'train_1_category',
    btnKey: 'btn_train_doc',
    image: '/images/komdigi-1.webp',
    images: ['/images/komdigi-1.webp', '/images/komdigi-2.webp'],
    logo: 'https://mobile.sdmdigital.id/assets/img/dts-mono.png',
    logoClass: 'object-contain scale-[70%]',
    bgClass: 'bg-white shadow-sm'
  },
  {
    titleKey: 'train_2_title', descKey: 'train_2_desc',
    dateKey: 'train_2_date', institution: 'freeCodeCamp',
    categoryKey: 'train_2_category',
    btnKey: 'btn_train_doc',
    image: '/images/freecodecamp.webp',
    logo: 'https://avatars.githubusercontent.com/u/9892522?v=4&s=80',
    logoClass: 'object-cover scale-110',
    bgClass: 'bg-transparent'
  },
  {
    titleKey: 'train_3_title', descKey: 'train_3_desc',
    dateKey: 'train_3_date', institution: 'RevoU',
    categoryKey: 'train_3_category',
    btnKey: 'btn_train_doc',
    image: '/images/revou.webp',
    logo: 'https://www.google.com/s2/favicons?domain=revou.co&sz=128'
  },
  
  // Certifications
  {
    titleKey: 'cert_1_title', descKey: null,
    dateKey: 'cert_1_date', institution: 'HackerRank',
    categoryKey: 'cert_1_category',
    btnKey: 'btn_cert_doc',
    image: '/images/hackerrank.webp',
    logo: 'https://www.google.com/s2/favicons?domain=hackerrank.com&sz=128'
  },
  {
    titleKey: 'cert_2_title', descKey: null,
    dateKey: 'cert_2_date', institution: 'Google Analytics',
    categoryKey: 'cert_2_category',
    btnKey: 'btn_cert_doc',
    image: '/images/google-analytics.webp',
    logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128'
  },
  {
    titleKey: 'cert_5_title', descKey: null,
    dateKey: 'cert_5_date', institution: 'Altair RapidMiner',
    categoryKey: 'cert_5_category',
    btnKey: 'btn_cert_doc',
    image: '/images/rapidminer.webp',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQFK5k_r2gO70Q/company-logo_200_200/company-logo_200_200/0/1651579826463/rapidminer_logo?e=2147483647&v=beta&t=VuUCVCPWatWXrjBhIiRGgm6IvBf9JC4aJeYfsQg2wDE',
    logoClass: 'object-contain scale-[70%]',
    bgClass: 'bg-white shadow-sm'
  },
  {
    titleKey: 'cert_3_title', descKey: null,
    dateKey: 'cert_3_date', institution: 'Center for Digital Society (CfDS)',
    categoryKey: 'cert_3_category',
    btnKey: 'btn_cert_doc',
    image: '/images/cfds.webp',
    logo: 'https://digitalsociety.id/wp-content/uploads/2024/01/Logo-Mini-YouTube.png',
    logoClass: 'object-cover scale-100',
    bgClass: 'bg-white shadow-sm'
  },
  {
    titleKey: 'cert_4_title', descKey: null,
    dateKey: 'cert_4_date', institution: 'Devcode.ai',
    categoryKey: 'cert_4_category',
    btnKey: 'btn_cert_doc',
    image: '/images/devcode.webp',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0wH_zLtCHIaroHCJw7XU_wFaHjt6juQ_vgrsO37_jlg&s'
  },
];

function DescriptionToggle({ text }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="mt-2">
      <p className={`font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify ${!expanded ? 'line-clamp-3' : ''}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-1.5 font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors flex items-center gap-0.5"
      >
        {expanded ? t('show_less') : t('show_more')}
        <span className={`material-symbols-outlined text-[14px] transition-transform ${expanded ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
    </div>
  );
}

export default function Qualification() {
  const { t } = useLanguage();
  const [previewImages, setPreviewImages] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const getItemVisibility = (index) => {
    if (showAll) return 'flex';
    if (index >= 6) return 'hidden';
    if (index >= 3) return 'hidden md:flex';
    return 'flex';
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setPreviewIndex((prev) => (prev + 1) % previewImages.length);
  };
  
  const handlePrev = (e) => {
    e.stopPropagation();
    setPreviewIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length);
  };

  return (
    <>
      <section id="training" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-6 lg:py-8 scroll-mt-24">
        <div className="flex flex-col gap-space-lg">
          <AnimatedHeader className="flex items-center gap-3">
            <span className="font-code text-[11px] lg:text-code text-primary">07 //</span>
            <h3 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">{t('train_heading')}</h3>
          </AnimatedHeader>

          <StaggerParent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md" staggerDelay={0.1}>
            {items.map((tr, index) => (
              <TiltCard key={tr.titleKey} maxTilt={5} glowOpacity={0.1} className={`${getItemVisibility(index)} flex-col rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-low transition-all duration-500 overflow-hidden shadow-sm border border-transparent hover:border-outline-variant/20 hover:shadow-md`}>
              <AnimatedElement variants={scaleTilt} className="flex flex-col h-full">
                
                {/* Image Box */}
                <div 
                  className="relative group w-full h-36 sm:h-48 lg:h-56 overflow-hidden cursor-pointer bg-surface-container-high"
                  onClick={() => {
                    setPreviewImages(tr.images || [tr.image]);
                    setPreviewIndex(0);
                  }}
                >
                  <img 
                    src={tr.image} 
                    alt={t(tr.titleKey)} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-surface/0 group-hover:bg-surface/20 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100 duration-300 drop-shadow-md text-4xl">zoom_in</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 lg:p-space-lg gap-2 lg:gap-space-md">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase text-primary tracking-wider">{t(tr.categoryKey)}</span>
                    </div>
                    <h4 className="font-headline-sm text-[16px] leading-[22px] lg:text-headline-sm text-on-surface">{t(tr.titleKey)}</h4>
                    
                    <div className="flex flex-col gap-0.5 mt-1">
                      <div className="flex items-center gap-2">
                        {tr.logo && (
                          <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden ${tr.bgClass || 'bg-transparent'}`}>
                            <img src={tr.logo} alt={tr.institution} className={`w-full h-full ${tr.logoClass || 'object-cover scale-110'}`} onError={(e) => e.target.style.display = 'none'} />
                          </div>
                        )}
                        <span className="font-body-md text-body-md text-primary font-medium">{tr.institution}</span>
                      </div>
                      <span className="font-code text-code text-on-surface-variant/80">{t(tr.dateKey)}</span>
                    </div>

                    {tr.descKey && (
                      <DescriptionToggle text={t(tr.descKey)} />
                    )}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-surface-container-high/60">
                    <a 
                      href={tr.image.replace('/images/', '/images/downloads/').replace('.webp', '.png')} 
                      download 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex w-fit items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors group/btn"
                    >
                      <span className="material-symbols-outlined text-[18px]">description</span>
                      {t(tr.btnKey)}
                      <span className="material-symbols-outlined text-[16px] opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </AnimatedElement>
              </TiltCard>
            ))}
          </StaggerParent>

          <div className="flex justify-center mt-2">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full border border-surface-container-high/60 text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface-container-low font-label-md text-[12px] uppercase tracking-wider transition-all flex items-center gap-2"
            >
              {showAll ? t('show_less') || 'Lebih Sedikit' : t('show_more') || 'Selengkapnya'}
              <span className={`material-symbols-outlined text-[16px] transition-transform ${showAll ? 'rotate-180' : ''}`}>expand_more</span>
            </button>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {previewImages && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewImages(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex items-center justify-center group">
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-container border border-surface-container-high flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high transition-colors z-20"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImages(null);
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {previewImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 text-white/70 hover:text-white bg-surface-container-high/50 hover:bg-surface-container-highest/80 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:-translate-x-1"
                  aria-label="Previous Image"
                >
                  <span className="material-symbols-outlined text-3xl">chevron_left</span>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 text-white/70 hover:text-white bg-surface-container-high/50 hover:bg-surface-container-highest/80 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:translate-x-1"
                  aria-label="Next Image"
                >
                  <span className="material-symbols-outlined text-3xl">chevron_right</span>
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <img 
                src={previewImages[previewIndex]} 
                alt={`Certificate Preview ${previewIndex + 1}`} 
                className="max-w-full max-h-[90vh] object-contain transition-all duration-300"
              />
              
              {/* Indicators */}
              {previewImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-full bg-surface-container-highest/80 backdrop-blur-md">
                  {previewImages.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`w-2 h-2 rounded-full transition-all ${idx === previewIndex ? 'bg-primary w-4' : 'bg-on-surface-variant'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
