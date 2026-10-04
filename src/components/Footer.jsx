import { useLanguage } from '../context/LanguageContext';

const navLinks = [
  { key: 'nav_home', href: '#hero' },
  { key: 'nav_profile', href: '#profile' },
  { key: 'nav_experience', href: '#experience' },
  { key: 'nav_projects', href: '#projects' },
  { key: 'nav_education', href: '#education' },
  { key: 'nav_skills', href: '#skills' },
  { key: 'nav_training', href: '#training' },
  { key: 'nav_contact', href: '#contact' },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-space-lg py-6 lg:py-8 border-b border-surface-container-high/40">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <img alt="Logo" className="w-8 h-8 rounded-full object-cover border-2 border-surface-variant shadow-sm" src="./images/av.webp" />
                <span className="font-headline-sm text-[16px] leading-[22px] lg:text-headline-sm text-on-surface font-semibold pt-1 uppercase tracking-wider">
                  VINZ DEVELOPER
                </span>
              </div>
              
              {/* Scroll to Top (Mobile) */}
              <a
                href="#hero"
                aria-label={t('footer_scroll_top')}
                className="w-10 h-10 md:hidden rounded-full flex items-center justify-center bg-surface-container-high text-on-surface hover:text-primary hover:bg-primary/10 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
              </a>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
              {t('footer_desc')}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4 md:col-start-7 flex flex-col gap-3">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">{t('footer_nav_heading')}</span>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-0.5"
                >
                  {t(link.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Scroll to Top (Desktop) */}
          <div className="hidden md:flex md:col-span-1 md:col-start-12 md:justify-end items-start">
            <a
              href="#hero"
              aria-label={t('footer_scroll_top')}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface hover:text-primary hover:bg-primary/10 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_upward</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm py-space-md text-on-surface-variant">
          <p className="font-body-sm text-body-sm">
            © {CURRENT_YEAR} VINZ DEVELOPER
          </p>
          <p className="font-code text-code text-outline text-xs">
            {t('footer_built_with')}
          </p>
        </div>
      </div>
    </footer>
  );
}
