import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeader, AnimatedElement, StaggerParent, scaleTilt } from '../utils/animations';
import TiltCard from './TiltCard';

const items = [
  // Trainings
  {
    titleKey: 'train_0_title', descKey: 'train_0_desc',
    dateKey: 'train_0_date', institution: 'Digital Talent Academy',
    categoryKey: 'train_0_category',
    btnKey: 'btn_train_doc',
    downloadUrl: './downloads/Full-Stack Development (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf',
    downloadFiles: [
      {
        name: 'Programming Fundamental',
        url: './downloads/Programming Fundamental (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf'
      },
      {
        name: 'Front-End & Back-End Development',
        url: './downloads/Front-End & Back-End Development (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf'
      },
      {
        name: 'Full-Stack Development',
        url: './downloads/Full-Stack Development (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf'
      }
    ],
    image: './images/digitalent-fsd-1.webp',
    images: [
      './images/digitalent-fsd-1.webp',
      './images/digitalent-fsd-2.webp',
      './images/digitalent-fsd-3.webp',
      './images/digitalent-fsd-4.webp',
      './images/digitalent-fsd-5.webp',
      './images/digitalent-fsd-6.webp'
    ],
    logo: 'https://mobile.sdmdigital.id/assets/img/dts-mono.png',
    logoClass: 'object-contain scale-[70%]',
    bgClass: 'bg-white shadow-sm'
  },
  {
    titleKey: 'train_1_title', descKey: 'train_1_desc',
    dateKey: 'train_1_date', institution: 'Digital Talent Academy',
    categoryKey: 'train_1_category',
    btnKey: 'btn_train_doc',
    downloadUrl: './downloads/Intermediate Assistant Web Developer (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf',
    downloadFiles: [
      {
        name: 'Fundamental of Assistant Web Developer',
        url: './downloads/Fundamental of Assistant Web Developer (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf'
      },
      {
        name: 'Intermediate Assistant Web Developer',
        url: './downloads/Intermediate Assistant Web Developer (Digital Talent Academy) - Alfian Setya Dwi Saputra.pdf'
      }
    ],
    image: './images/digitalent-awd-1.webp',
    images: [
      './images/digitalent-awd-1.webp',
      './images/digitalent-awd-2.webp',
      './images/digitalent-awd-3.webp',
      './images/digitalent-awd-4.webp'
    ],
    logo: 'https://mobile.sdmdigital.id/assets/img/dts-mono.png',
    logoClass: 'object-contain scale-[70%]',
    bgClass: 'bg-white shadow-sm'
  },
  {
    titleKey: 'train_2_title', descKey: 'train_2_desc',
    dateKey: 'train_2_date', institution: 'freeCodeCamp',
    categoryKey: 'train_2_category',
    btnKey: 'btn_train_doc',
    downloadUrl: './downloads/freeCodeCamp Front-End Development Libraries V8 Developer Certification - Alfian Setya Dwi Saputra.png',
    image: './images/freecodecamp.webp',
    logo: 'https://avatars.githubusercontent.com/u/9892522?v=4&s=80',
    logoClass: 'object-cover scale-110',
    bgClass: 'bg-transparent'
  },
  {
    titleKey: 'train_3_title', descKey: 'train_3_desc',
    dateKey: 'train_3_date', institution: 'RevoU',
    categoryKey: 'train_3_category',
    btnKey: 'btn_train_doc',
    downloadUrl: './downloads/RevoU Intro to Software Engineering Fundamental Course - Alfian Setya Dwi Saputra.pdf',
    image: './images/revou.webp',
    logo: 'https://www.google.com/s2/favicons?domain=revou.co&sz=128'
  },
  
  // Certifications
  {
    titleKey: 'cert_1_title', descKey: null,
    dateKey: 'cert_1_date', institution: 'HackerRank',
    categoryKey: 'cert_1_category',
    btnKey: 'btn_cert_doc',
    downloadUrl: './downloads/HackerRank Software Engineer Certification - Alfian Setya Dwi Saputra.pdf',
    image: './images/hackerrank.webp',
    logo: 'https://www.google.com/s2/favicons?domain=hackerrank.com&sz=128'
  },
  {
    titleKey: 'cert_2_title', descKey: null,
    dateKey: 'cert_2_date', institution: 'Google Analytics',
    categoryKey: 'cert_2_category',
    btnKey: 'btn_cert_doc',
    downloadUrl: './downloads/Google Analytics Certification - Alfian Setya Dwi Saputra.png',
    image: './images/google-analytics.webp',
    logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128'
  },
  {
    titleKey: 'cert_5_title', descKey: null,
    dateKey: 'cert_5_date', institution: 'Altair RapidMiner',
    categoryKey: 'cert_5_category',
    btnKey: 'btn_cert_doc',
    downloadUrl: './downloads/RapidMiner Data Engineering Professional Certification - Alfian Setya Dwi Saputra.pdf',
    image: './images/rapidminer.webp',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQFK5k_r2gO70Q/company-logo_200_200/company-logo_200_200/0/1651579826463/rapidminer_logo?e=2147483647&v=beta&t=VuUCVCPWatWXrjBhIiRGgm6IvBf9JC4aJeYfsQg2wDE',
    logoClass: 'object-contain scale-[70%]',
    bgClass: 'bg-white shadow-sm'
  },
];

function DescriptionToggle({ text }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="mt-2">
      <div className={`font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-justify hyphens-auto text-pretty ${!expanded ? 'line-clamp-3' : ''}`}>
        {text}
      </div>
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

function DownloadMenu({ item }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  if (!item.downloadFiles || item.downloadFiles.length <= 1) {
    return (
      <a 
        href={item.downloadUrl} 
        download 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex w-fit items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors group/btn cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">description</span>
        {t(item.btnKey)}
        <span className="material-symbols-outlined text-[16px] opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all">arrow_forward</span>
      </a>
    );
  }

  const handleDownloadAll = () => {
    item.downloadFiles.forEach((file, idx) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = file.url;
        link.setAttribute('download', file.url.split('/').pop() || '');
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 400);
    });
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-fit items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors group/btn cursor-pointer"
      >
        <span className="material-symbols-outlined text-[18px]">description</span>
        <span>{t(item.btnKey)}</span>
        <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
          {item.downloadFiles.length} File
        </span>
        <span className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${open ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>

      {open && (
        <div className="absolute left-0 bottom-full mb-2 w-72 sm:w-80 max-w-[calc(100vw-3rem)] rounded-xl bg-surface-container-high/95 backdrop-blur-xl border border-outline-variant/40 shadow-2xl p-2.5 z-40 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 font-label-sm text-label-sm uppercase tracking-wider text-outline border-b border-surface-container-highest/60 mb-1.5 flex items-center justify-between">
            <span>{t('select_cert_to_download')}</span>
            <button 
              type="button" 
              onClick={() => setOpen(false)} 
              aria-label="Tutup"
              className="text-on-surface-variant hover:text-on-surface p-0.5 rounded transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] leading-none">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {item.downloadFiles.map((file, idx) => (
              <a
                key={idx}
                href={file.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg font-body-sm text-body-sm text-on-surface hover:text-primary hover:bg-surface-container-highest/80 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0 leading-none">article</span>
                  <span className="truncate">{file.name}</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary shrink-0 transition-colors leading-none">
                  download
                </span>
              </a>
            ))}
          </div>

          <div className="pt-2 mt-1.5 border-t border-surface-container-highest/60">
            <button
              type="button"
              onClick={handleDownloadAll}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-label-md text-label-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] shrink-0 leading-none">download_for_offline</span>
              <span className="truncate">{t('download_all')}</span>
            </button>
          </div>
        </div>
      )}
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
            <h2 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">{t('train_heading')}</h2>
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
                    <h3 className="font-headline-sm text-[16px] leading-[22px] lg:text-headline-sm text-on-surface">{t(tr.titleKey)}</h3>
                    
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
                    <DownloadMenu item={tr} />
                  </div>
                </div>
              </AnimatedElement>
              </TiltCard>
            ))}
          </StaggerParent>

          {items.length > 3 && (
            <div className={`justify-center mt-2 flex ${items.length <= 6 ? 'md:hidden' : ''}`}>
              <button 
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2.5 rounded-full border border-surface-container-high/60 text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface-container-low font-label-md text-[12px] uppercase tracking-wider transition-all flex items-center gap-2"
              >
                {showAll ? t('show_less') || 'Lebih Sedikit' : t('show_more') || 'Selengkapnya'}
                <span className={`material-symbols-outlined text-[16px] transition-transform ${showAll ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
            </div>
          )}
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
