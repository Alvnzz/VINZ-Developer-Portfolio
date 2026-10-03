import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { AnimatedHeader, AnimatedElement, softScale, slideInLeft, StaggerParent, popIn } from '../utils/animations';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToastError(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'c1976620-77e7-4ba6-8821-00d97ad741e1',
          from_name: formData.name,
          email: formData.email,
          subject: `[Portfolio] ${formData.subject}`,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowToast(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setToastError(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    } catch {
      setToastError(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <section id="contact" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin pt-6 pb-24 lg:pt-8 lg:pb-32 scroll-mt-24">
      <div className="flex flex-col gap-space-lg">
        <AnimatedHeader className="flex items-center gap-3">
          <span className="font-code text-[11px] lg:text-code text-primary">09 //</span>
          <h3 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">{t('contact_heading')}</h3>
        </AnimatedHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          {/* Left: Info */}
          <AnimatedElement variants={slideInLeft} className="lg:col-span-5 rounded-3xl bg-surface-container-low/80 hover:bg-surface-container-low transition-all duration-500 p-4 lg:p-space-lg flex flex-col justify-between gap-4 lg:gap-space-lg shadow-sm border border-transparent hover:border-outline-variant/20 hover:shadow-md">
            <div className="flex flex-col gap-space-md">
              <h4 className="font-headline-sm text-[18px] leading-[24px] lg:text-[20px] text-on-surface">{t('contact_info_title')}</h4>
              
              <div className="flex flex-col gap-3 font-code text-[13px] mt-2">
                {/* Address */}
                <div className="group flex items-start gap-3 p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden border border-transparent hover:border-primary/20">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 ease-out" />
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">location_on</span>
                  <span className="text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors">
                    {t('contact_address')}, {t('contact_country')}
                  </span>
                </div>
                
                {/* Email */}
                <div className="group flex items-center gap-3 p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden border border-transparent hover:border-primary/20">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 ease-out" />
                  <span className="material-symbols-outlined text-primary text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">alternate_email</span>
                  <a className="text-on-surface-variant group-hover:text-primary transition-colors" href="mailto:alfiansetyads@gmail.com">alfiansetyads@gmail.com</a>
                </div>
                
                {/* Timezone */}
                <div className="group flex items-center gap-3 p-3.5 rounded-xl bg-surface-container/60 hover:bg-surface-container hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden border border-transparent hover:border-primary/20">
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300 ease-out" />
                  <span className="material-symbols-outlined text-primary text-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">schedule</span>
                  <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">{t('contact_timezone')}</span>
                </div>
              </div>
            </div>

            {/* Social Links (Staggered Entrance) */}
            <div className="flex flex-col gap-3 pt-4 border-t border-surface-container-high/40 mt-2">
              <span className="font-label-sm text-[11px] uppercase text-primary tracking-widest">{t('contact_social_title')}</span>
              <StaggerParent staggerDelay={0.1} className="flex items-center gap-3">
                {[
                  { icon: <FaLinkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/in/alfiansds' },
                  { icon: <FaInstagram size={18} />, label: 'Instagram', href: 'https://www.instagram.com/alvnzz._' },
                  { icon: <FaGithub size={18} />, label: 'GitHub', href: 'https://github.com/Alvnzz' },
                ].map((social) => (
                  <AnimatedElement key={social.label} variants={popIn}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-1 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  </AnimatedElement>
                ))}
              </StaggerParent>
            </div>
          </AnimatedElement>

          {/* Right: Form */}
          <AnimatedElement variants={softScale} delay={0.15} className="lg:col-span-7 rounded-3xl bg-surface-container-low/80 hover:bg-surface-container-low transition-all duration-500 p-5 lg:p-space-lg shadow-sm flex flex-col border border-transparent hover:border-outline-variant/20 hover:shadow-md">
            <form className="flex flex-col gap-5 flex-1" id="portfolio-contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2 group/input">
                  <label className="font-label-sm text-[11px] uppercase text-on-surface-variant tracking-widest group-focus-within/input:text-primary transition-colors" htmlFor="contact-name">{t('form_name')}</label>
                  <input className="w-full h-[46px] px-4 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-transparent focus:border-primary/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.1)] placeholder:text-outline transition-all duration-300" id="contact-name" name="name" placeholder={t('form_placeholder_name')} required type="text" value={formData.name} onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-2 group/input">
                  <label className="font-label-sm text-[11px] uppercase text-on-surface-variant tracking-widest group-focus-within/input:text-primary transition-colors" htmlFor="contact-email">{t('form_email')}</label>
                  <input className="w-full h-[46px] px-4 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-transparent focus:border-primary/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.1)] placeholder:text-outline transition-all duration-300" id="contact-email" name="email" placeholder={t('form_placeholder_email')} required type="email" value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="flex flex-col gap-2 group/input">
                <label className="font-label-sm text-[11px] uppercase text-on-surface-variant tracking-widest group-focus-within/input:text-primary transition-colors" htmlFor="contact-subject">{t('form_subject')}</label>
                <input className="w-full h-[46px] px-4 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-transparent focus:border-primary/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.1)] placeholder:text-outline transition-all duration-300" id="contact-subject" name="subject" placeholder={t('form_placeholder_subject')} required type="text" value={formData.subject} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-2 flex-1 group/input">
                <label className="font-label-sm text-[11px] uppercase text-on-surface-variant tracking-widest group-focus-within/input:text-primary transition-colors" htmlFor="contact-message">{t('form_message')}</label>
                <textarea className="w-full p-4 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-high border border-transparent focus:border-primary/50 focus:shadow-[0_0_10px_rgba(56,189,248,0.1)] placeholder:text-outline resize-none transition-all duration-300 flex-1" id="contact-message" name="message" placeholder={t('form_placeholder_message')} required value={formData.message} onChange={handleChange} />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-3">
                <button
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider hover:bg-primary-fixed hover:text-on-primary hover:shadow-[0_4px_20px_rgba(56,189,248,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 group/btn ${submitting ? 'opacity-70 cursor-wait' : ''}`}
                  type="submit"
                  disabled={submitting}
                >
                  <span>{submitting ? t('form_submitting') : t('form_submit')}</span>
                  <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${submitting ? 'animate-spin' : 'group-hover/btn:translate-x-1'}`}>
                    {submitting ? 'progress_activity' : 'send'}
                  </span>
                </button>
              </div>
            </form>
          </AnimatedElement>
        </div>
      </div>
    </section>

    {/* Fixed Toast Notification - Top Right */}
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 60, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-24 right-6 z-[100] w-auto max-w-[200px]"
        >
          <div className={`relative flex items-start gap-2.5 p-3 rounded-2xl backdrop-blur-2xl shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)] border ${
            toastError
              ? 'bg-[#3d1212]/90 border-red-500/40'
              : 'bg-[#0a2e1a]/90 border-emerald-500/40'
          }`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
              toastError
                ? 'bg-red-500/20 text-red-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              <span className="material-symbols-outlined text-[18px]">
                {toastError ? 'error' : 'check_circle'}
              </span>
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <p className={`font-label-md text-label-md font-semibold leading-none pt-0.5 ${
                toastError ? 'text-red-300' : 'text-emerald-300'
              }`}>
                {toastError ? 'Gagal!' : 'Berhasil!'}
              </p>
              <p className="text-[12px] leading-snug text-on-surface-variant mt-1.5">
                {toastError ? t('form_error') : t('form_success')}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50 transition-colors"
              aria-label="Tutup notifikasi"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
