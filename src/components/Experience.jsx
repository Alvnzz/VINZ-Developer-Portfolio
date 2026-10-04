import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeader, AnimatedElement, StaggerParent, fadeUp, popIn, slideInRight } from '../utils/animations';
import { motion } from 'framer-motion';

const roles = [
  {
    titleKey: 'exp_1_title', descKey: 'exp_1_desc', company: 'Badan Pertanahan Nasional (Satuan Tugas Pendaftaran Tanah Sistematis Lengkap Desa Dungus)',
    logo: '/images/bpn.webp',
    periodKey: 'exp_1_period', locationKey: 'exp_1_location', typeKey: 'exp_1_type',
    docKey: 'exp_1_doc',
    pdfLink: '/documents/Portofolio_Dokumentasi_Kerja_PTSL_-_Alfian_Setya_Dwi_Saputra.pdf',
    isCurrent: false,
    tags: ['Administrasi Operasional', 'Entri Data', 'Analisis Data', 'Verifikasi Dokumen', 'Microsoft Word', 'Microsoft Excel', 'Manajemen Waktu', 'Ketelitian Tinggi', 'Kerja Sama Tim', 'Koordinasi Lapangan'],
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const [expandedRoles, setExpandedRoles] = useState({});

  const toggleRole = (titleKey) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [titleKey]: !prev[titleKey],
    }));
  };

  return (
    <>
      <section id="experience" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-6 lg:py-8 scroll-mt-24">
        <div className="flex flex-col gap-8">
          <AnimatedHeader className="flex items-center gap-3">
            <span className="font-code text-[11px] lg:text-code text-primary shrink-0">
              02 //
            </span>
            <h2 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">
              {t('exp_heading')}
            </h2>
          </AnimatedHeader>

          <div className="grid grid-cols-[auto_1fr] gap-x-3">
            {/* Invisible spacer to perfectly align the timeline with the text above */}
            <div className="font-code text-[11px] lg:text-code opacity-0 pointer-events-none select-none" aria-hidden="true">
              02 //
            </div>

            {/* Timeline */}
            <div className="col-start-2 flex flex-col gap-space-md relative mt-2">
            
            {/* Animated Glowing Timeline Line */}
            <div className="absolute -left-[19px] top-4 bottom-4 w-0.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-scan-vertical" />
            </div>

            {roles.map((role, index) => (
              <AnimatedElement key={role.titleKey} variants={fadeUp} delay={index * 0.15} className="group/card relative flex flex-col gap-2 lg:gap-3 p-4 lg:p-space-lg rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-low transition-all duration-500 shadow-sm border border-transparent hover:border-outline-variant/20 hover:shadow-md">
                
                {/* Timeline Dot with Pulse/Ping effect */}
                <div
                  className={`absolute -left-[42px] top-6 w-3.5 h-3.5 rounded-full z-10 transition-colors duration-300 ${
                    role.isCurrent 
                      ? 'bg-primary-container shadow-[0_0_12px_rgba(56,189,248,0.8)]' 
                      : 'bg-surface-variant group-hover/card:bg-primary/80'
                  }`}
                >
                  <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-0 group-hover/card:opacity-40 transition-opacity" style={{ animationDuration: '2s' }} />
                </div>

                <StaggerParent staggerDelay={0.15} className="flex flex-col gap-2 lg:gap-3 w-full">
                  <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                  <div>
                    <h3 className="font-headline-sm text-[18px] leading-[24px] lg:text-[20px] text-on-surface group-hover/card:text-primary transition-colors duration-300">{t(role.titleKey)}</h3>
                    <div className="flex items-center gap-2.5 mt-2 mb-1">
                      {role.logo && (
                        <div className="bg-white rounded p-0.5 shrink-0">
                          <img src={role.logo} alt={role.company} className="w-6 h-6 object-contain" />
                        </div>
                      )}
                      <span className="font-body-md text-body-md text-primary font-medium">{role.company}</span>
                    </div>
                    {role.subCompany && (
                      <span className="block font-body-sm text-body-sm text-on-surface-variant">{role.subCompany}</span>
                    )}
                    {(role.locationKey || role.typeKey) && (
                      <span className="block font-body-sm text-body-sm text-outline mt-0.5">
                        {role.locationKey && t(role.locationKey)}{role.locationKey && role.typeKey ? ' · ' : ''}{role.typeKey && t(role.typeKey)}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-code text-[12px] px-3 py-1.5 rounded-full w-fit shrink-0 whitespace-nowrap self-center sm:self-start mt-2 sm:mt-0 transition-colors ${
                      role.isCurrent 
                        ? 'text-primary-container bg-surface-container-high' 
                        : 'text-on-surface-variant bg-surface-container-highest group-hover/card:text-on-surface group-hover/card:bg-primary/10'
                    }`}
                  >
                    {t(role.periodKey)}{role.periodEndKey ? ` - ${t(role.periodEndKey)}` : ''}
                  </span>
                  </motion.div>

                  <motion.div variants={fadeUp} className="flex flex-col gap-6 mt-3">
                    {/* Main Content Row: Description, PDF, and Images */}
                  <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 xl:gap-[52px]">
                    {/* Left Column: Description, Attachment */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1 items-start">
                        <div 
                          className={`font-body-md text-body-md text-on-surface-variant text-justify transition-all duration-300 ${!expandedRoles[role.titleKey] ? 'line-clamp-4 lg:line-clamp-none' : ''}`} 
                          dangerouslySetInnerHTML={{ __html: t(role.descKey) }} 
                        />
                        <button 
                          onClick={() => toggleRole(role.titleKey)}
                          className="lg:hidden font-label-sm text-[12px] text-primary hover:text-primary-fixed uppercase tracking-wider mt-1 border-b border-primary/30 pb-0.5 transition-colors"
                        >
                          {expandedRoles[role.titleKey] ? t('read_less') : t('read_more')}
                        </button>
                      </div>

                      {/* Evidence / Attachment Box */}
                      {role.docKey && (
                        <AnimatedElement variants={slideInRight} delay={0.1} className="mt-2 w-full lg:w-fit">
                          <a href={role.pdfLink || '#'} target="_blank" rel="noopener noreferrer" className="relative flex items-center gap-4 p-3 pr-6 rounded-xl border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container-high/60 transition-all cursor-pointer group max-w-lg shadow-sm hover:shadow-md hover:-translate-y-1 overflow-hidden">
                            {/* Shiny sweep effect on hover */}
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-sweep pointer-events-none" />
                            
                            <div className="w-14 h-14 flex-shrink-0 bg-surface-container-high/80 rounded-lg overflow-hidden shadow-sm flex items-center justify-center relative">
                              <img src="/images/pdf-preview.webp" alt="Document Preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            </div>
                            <div className="flex flex-col flex-1 justify-center z-10">
                              <span className="font-label-md text-label-md text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-tight">{t(role.docKey)}</span>
                              <span className="font-code text-[11px] text-on-surface-variant mt-1.5 opacity-80 uppercase tracking-widest">{t('doc_type_pdf')}</span>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-300">arrow_forward</span>
                          </a>
                        </AnimatedElement>
                      )}
                    </div>

                    {/* Right Column: 2 Preview Images */}
                    <div className="flex flex-col gap-4">
                      <div className="flex-1 w-full rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm relative min-h-[140px] group/img bg-surface-container-high">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                        <img src="/images/penyuluhan-ptsl.webp" alt="Penyuluhan PTSL 1" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition-all duration-700 cursor-pointer" />
                        <span className="absolute bottom-3 left-3 text-white font-label-sm text-xs opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-20 translate-y-2 group-hover/img:translate-y-0">Penyuluhan Warga</span>
                      </div>
                      
                      <div className="flex-1 w-full rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm relative min-h-[140px] group/img bg-surface-container-high">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                        <img src="/images/penyuluhan-ptsl-2.webp" alt="Penyuluhan PTSL 2" className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-110 transition-all duration-700 cursor-pointer" />
                        <span className="absolute bottom-3 left-3 text-white font-label-sm text-xs opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-20 translate-y-2 group-hover/img:translate-y-0">Sosialisasi Lapangan</span>
                      </div>
                    </div>
                  </div>
                  </motion.div>

                  {/* Tags Row */}
                  <motion.div variants={fadeUp} className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 xl:gap-[52px]">
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-container-high/60">
                      {role.tags.map((tag) => (
                        <div key={tag} className="px-3 py-1 rounded-md bg-surface-container-highest/50 text-on-surface-variant font-code text-[11px] hover:bg-primary/10 hover:text-primary transition-colors cursor-default border border-transparent hover:border-primary/20 shadow-sm">
                          {t(tag)}
                        </div>
                      ))}
                    </div>
                    <div className="hidden xl:block"></div>
                  </motion.div>
                </StaggerParent>
              </AnimatedElement>
            ))}
          </div>
        </div>
        </div>
      </section>

      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }
        .animate-scan-vertical {
          animation: scan-vertical 3s linear infinite;
        }
        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-sweep {
          animation: sweep 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
