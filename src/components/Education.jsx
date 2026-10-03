import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeader, AnimatedElement, fadeUp, slideInRight } from '../utils/animations';
import TiltCard from './TiltCard';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-6 lg:py-8 scroll-mt-24">
      <div className="flex flex-col gap-space-lg">
        <AnimatedHeader className="flex items-center gap-3">
          <span className="font-code text-[11px] lg:text-code text-primary">04 //</span>
          <h2 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">{t('edu_heading')}</h2>
        </AnimatedHeader>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-space-md">
          {/* Left Column: Text Content (Box 1) */}
          <TiltCard maxTilt={1} glowOpacity={0.05} scale={1.005} className="order-2 lg:order-1 rounded-3xl bg-surface-container-low/80 hover:bg-surface-container-low transition-all duration-500 border border-transparent hover:border-outline-variant/20 hover:shadow-md h-full group/card">
            <AnimatedElement variants={fadeUp} className="p-4 lg:p-space-lg flex flex-col justify-between gap-4 lg:gap-6 h-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-start sm:items-center justify-between gap-4">
                <span className="font-label-sm text-label-sm uppercase text-primary tracking-wider">{t('edu_1_label')}</span>
                <span className="font-code text-code text-on-surface-variant bg-surface-container py-1 px-3 rounded-full shrink-0 whitespace-nowrap">2022 - 2026</span>
              </div>
              <div>
                <h3 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface">{t('edu_1_degree')}</h3>
                <div className="flex items-center gap-2 lg:gap-3 mt-2 w-fit group cursor-default">
                  <img 
                    src="/images/uty.webp" 
                    alt="Logo UTY" 
                    className="w-8 h-8 object-contain rounded-full transition-transform duration-700 group-hover:rotate-[360deg] group-hover:scale-110 shadow-sm" 
                  />
                  <span className="font-body-md text-body-sm lg:text-body-lg text-primary font-medium group-hover:text-primary-container transition-colors duration-300">Universitas Teknologi Yogyakarta</span>
                </div>
              </div>
              <ul className="flex flex-col gap-2 mt-2">
                <li className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-justify flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                  <span>{t('edu_1_desc_2')}</span>
                </li>
                <li className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-justify flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                  <span>{t('edu_1_desc_1')}</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4 pt-4 mt-2 border-t border-surface-container-high/60">
              <div className="flex items-center justify-between">
                <h4 className="font-headline-sm text-[18px] leading-[24px] lg:text-headline-sm text-on-surface">{t('edu_1_ach_heading')}</h4>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-headline-sm text-[16px] leading-[22px] lg:text-headline-sm text-primary">
                    {t('edu_1_ach_title')}
                  </span>
                  <a href="https://ojs.stmik-banjarbaru.ac.id/index.php/jutisi/article/view/3295" target="_blank" rel="noopener noreferrer" aria-label="Buka Jurnal" className="material-symbols-outlined text-[18px] text-on-surface-variant shrink-0 cursor-pointer hover:text-primary transition-colors mt-[7px]">open_in_new</a>
                </div>
                <span className="font-body-md text-body-md text-on-surface-variant">{t('edu_1_ach_journal')}</span>
                <span className="font-code text-code text-outline mt-0.5">{t('edu_1_ach_date')}</span>
              </div>
              
              <p className="font-body-sm text-body-sm text-on-surface-variant text-justify leading-relaxed">
                {t('edu_1_ach_desc')}
              </p>
              
              <a href="/documents/Jurnal Publikasi Ilmiah Jutisi - Alfian Setya Dwi Saputra.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 mt-0.5 w-full sm:w-fit rounded-xl border border-outline-variant/30 bg-surface-container-low/30 hover:bg-surface-container-high/50 hover:border-outline-variant/60 hover:shadow-[0_4px_15px_rgba(56,189,248,0.15)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                   <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors">description</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">{t('edu_1_ach_doc')}</span>
              </a>
            </div>
          </AnimatedElement>
          </TiltCard>
          
          {/* Right Column - Images */}
          <AnimatedElement variants={slideInRight} delay={0.2} className="order-1 lg:order-2 w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6">
            
            {/* Top Image - No Address */}
            <TiltCard maxTilt={5} glowOpacity={0.15} scale={1.02} className="relative flex-1 w-full min-h-[160px] lg:min-h-[200px] rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm group cursor-default">
              <img 
                src="/images/graduation.webp" 
                alt="Alfian Setya Dwi Saputra Graduation" 
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
              />
            </TiltCard>

            {/* Bottom Image - With Address */}
            <TiltCard maxTilt={5} glowOpacity={0.15} scale={1.02} className="relative flex-1 w-full min-h-[160px] lg:min-h-[200px] rounded-2xl overflow-hidden border border-outline-variant/20 shadow-sm group cursor-default">
              <img 
                src="/images/uty-campus.webp" 
                alt="Universitas Teknologi Yogyakarta Graduation" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-sm">location_on</span>
                <span className="text-white font-code text-xs font-medium tracking-wide">Yogyakarta, Indonesia</span>
              </div>
            </TiltCard>

          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
