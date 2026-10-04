import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const LOGO_URL = './images/av.webp';
const AVATAR_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzoL141KWv5zvCL1Bzxy2p9dAH3Fjr9bFA7STzPt--FpkDaNjT3AY_eu6SjHm0r3bFzKaQAwDLueR-E48sXGjgzZL_l5p6hN2f_QFfaVDM8Q2kgutwfJjQYQnhLSyIqk7v1Yy8mX64VXFRnRXk7KZVKDuasu_LghoI9TOppEQVzxZfxcBoDo2UFsMWxIJ08l78zpjqrqKIhmdRmuaCBrpz9HqPUh8DXODPwx4c8zdJRhm_InSfRAXq';

const mainNavItems = [
  { key: 'nav_home', href: '#hero', path: 'home' },
  { key: 'nav_profile', href: '#profile', path: 'profile' },
  { key: 'nav_experience', href: '#experience', path: 'experience' },
  { key: 'nav_projects', href: '#projects', path: 'projects' },
];

const moreNavItems = [
  { key: 'nav_education', href: '#education', path: 'education' },
  { key: 'nav_skills', href: '#skills', path: 'skills' },
  { key: 'nav_training', href: '#training', path: 'training' },
];

export default function Header() {
  const { t, lang, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Update browser URL hash when active section changes
  useEffect(() => {
    const allItems = [...mainNavItems, ...moreNavItems, { path: 'contact', href: '#contact' }, { path: 'home', href: '#hero' }];
    const currentItem = allItems.find(i => i.path === activeSection);
    
    if (currentItem && window.location.hash !== currentItem.href) {
      window.history.replaceState(null, null, currentItem.href);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [...mainNavItems, ...moreNavItems, { path: 'contact', href: '#contact' }]
        .map(item => ({
          path: item.path,
          element: document.getElementById(item.href.replace('#', ''))
        }))
        .filter(sec => sec.element);
      
      let current = 'home';
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        if (section.element.offsetTop <= scrollPosition) {
          current = section.path;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-space-sm px-margin-mobile lg:px-margin pointer-events-none">
      <div className="max-w-7xl mx-auto w-full h-14 lg:h-16 flex items-center justify-between px-3 lg:px-space-md rounded-full bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.8)] pointer-events-auto">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          {/* Avatar (Links to Contact) */}
          <a href="#contact" aria-label="Go to contact section" className="relative flex items-center group transition-transform hover:scale-105">
            <img alt="Profile" className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover border-2 border-surface-variant shadow-sm group-hover:border-primary/50 transition-colors" src={LOGO_URL} />
          </a>
          {/* Name (Links to Hero) */}
          <a href="#hero" className="flex items-center gap-1.5 group">
            <span className="font-label-md text-[11px] lg:text-label-md uppercase tracking-wider text-on-surface font-semibold group-hover:text-primary transition-colors truncate">VINZ DEVELOPER</span>
          </a>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface-container-low/70 border border-surface-container-high/60">
          {mainNavItems.map((item) => (
            <a
              key={item.path}
              href={item.href}
              className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors ${
                activeSection === item.path
                  ? 'text-on-surface bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {t(item.key)}
            </a>
          ))}

          {/* More Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors ${
                moreNavItems.some((item) => item.path === activeSection)
                  ? 'text-on-surface bg-surface-container-high'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {t('nav_more')}
              <span className="material-symbols-outlined text-[14px] transition-transform group-hover:rotate-180">expand_more</span>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:flex flex-col z-50">
              <div className="w-44 p-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-2xl border border-surface-container-high/80 shadow-2xl flex flex-col gap-0.5">
                {moreNavItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg font-label-md text-label-md transition-colors ${
                      activeSection === item.path
                        ? 'text-primary bg-surface-container'
                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                    }`}
                  >
                    {t(item.key)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#contact"
            className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-colors ${
              activeSection === 'contact'
                ? 'text-on-surface bg-surface-container-high'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            {t('nav_contact')}
          </a>
        </nav>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 lg:gap-3 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center h-8 p-0.5 rounded-full bg-surface-container-low/90 border border-surface-container-high/60">
            <button
              onClick={() => setLanguage('id')}
              className={`h-full px-2.5 flex items-center justify-center gap-1 rounded-full font-label-sm text-label-sm uppercase transition-all ${
                lang === 'id' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <img src="https://flagcdn.com/w20/id.png" alt="ID Flag" className="w-[14px] h-[10px] object-cover rounded-[1px]" />
              <span className="mt-[1px]">ID</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`h-full px-2.5 flex items-center justify-center gap-1 rounded-full font-label-sm text-label-sm uppercase transition-all ${
                lang === 'en' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <img src="https://flagcdn.com/w20/gb.png" alt="UK Flag" className="w-[14px] h-[10px] object-cover rounded-[1px]" />
              <span className="mt-[1px]">EN</span>
            </button>
          </div>

          <div className="w-0.5 h-5 bg-surface-container-high/80 hidden sm:block" />

          {/* Theme Toggle — temporarily hidden
          <button
            onClick={toggleTheme}
            aria-label="Toggle appearance theme"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-low border border-surface-container-high/60 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] leading-none mt-[1px]">{isDark ? 'dark_mode' : 'light_mode'}</span>
          </button>
          */}

          {/* Download CV */}
          <a
            href="/documents/CV_Alfian_Setya_Dwi_Saputra.pdf"
            download="CV_Alfian_Setya_Dwi_Saputra.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
            className="hidden sm:flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-surface-container-low border border-surface-container-high/60 text-on-surface-variant hover:text-primary hover:border-primary/50 hover:bg-surface-container transition-all group"
          >
            <span className="font-label-sm text-label-sm uppercase tracking-wider">{t('nav_download_cv')}</span>
            <span className="material-symbols-outlined text-[16px] leading-none group-hover:-translate-y-0.5 transition-transform">download</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-low border border-surface-container-high/60 text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[18px]">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-auto max-w-7xl rounded-2xl bg-surface-container-lowest/95 backdrop-blur-2xl border border-surface-container-high/60 shadow-2xl p-4 pointer-events-auto flex flex-col gap-3">
          <nav className="flex flex-col gap-1">
            {[...mainNavItems, ...moreNavItems, { key: 'nav_contact', href: '#contact', path: 'contact' }].map((item) => (
              <a
                key={item.path}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-lg font-label-md text-[11px] lg:text-label-md transition-colors ${
                  activeSection === item.path
                    ? 'text-primary bg-surface-container'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>
          
          <div className="border-t border-surface-container-high/60 pt-3 mt-1">
            <a
              href="/documents/CV_Alfian_Setya_Dwi_Saputra.pdf"
              download="CV_Alfian_Setya_Dwi_Saputra.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download CV"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-[11px] uppercase tracking-wider hover:shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              {t('nav_download_cv')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
