import { useLanguage } from '../context/LanguageContext';
import { AnimatedHeader, AnimatedElement, StaggerParent, popIn } from '../utils/animations';
import TiltCard from './TiltCard';

const groups = [
  {
    icon: 'psychology', title: 'Core Competencies',
    tags: [
      'Pengembangan Web',
      'Pengembangan Aplikasi Mobile',
      'Pengembangan Front-End',
      'Pemrograman Antarmuka',
      'Perancangan Sistem',
      'Integrasi Sistem',
      'Pengelolaan Basis Data',
      'Administrasi Operasional',
      'Entri Data',
      'Analisis Data',
      'Verifikasi Dokumen',
      'Manajemen Proyek',
      'Manajemen Kode',
      'Manajemen Waktu',
      'Pemikiran Analitis',
      'Pemecahan Masalah',
      'Ketelitian Tinggi',
      'Kerja Sama Tim',
      'Koordinasi Lapangan'
    ],
  },
  {
    icon: 'terminal', title: 'Programming Languages',
    tags: [
      { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    ],
  },
  {
    icon: 'language', title: 'Frontend Development',
    tags: [
      { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' }
    ],
  },
  {
    icon: 'settings_suggest', title: 'Backend Development',
    tags: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true },
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
      { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg' },
      { name: 'Sequelize', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg' }
    ],
  },
  {
    icon: 'database', title: 'Database & Storage',
    tags: [
      { name: 'Firebase', icon: '/icons/firebase.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' }
    ],
  },
  {
    icon: 'build', title: 'Development Tools',
    tags: [
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
      { name: 'Antigravity', icon: '/icons/antigravity.webp' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
      { name: 'Android Studio', icon: '/icons/android-studio.svg' }
    ],
  },
  {
    icon: 'edit_document', title: 'Productivity Tools',
    tags: [
      { name: 'Microsoft Word', icon: '/icons/word.svg' },
      { name: 'Microsoft Excel', icon: '/icons/excel.svg' },
      { name: 'Microsoft PowerPoint', icon: '/icons/powerpoint.svg' }
    ],
  },
];

// ─── Animated Skill Tag ───
// Hover-only animations (lift + glow + icon spin/bounce). Zero load-time cost.
function SkillTag({ tag }) {
  const isObj = typeof tag === 'object';
  const tagName = isObj ? tag.name : tag;
  const { t } = useLanguage();

  return (
    <span
      className="group flex items-center gap-1 lg:gap-1.5 px-2 py-1 lg:py-1.5 rounded-lg bg-surface-container text-on-surface font-code text-[11px] lg:text-[11.5px] cursor-default
        hover:text-primary hover:bg-surface-container-high hover:shadow-[0_0_12px_rgba(56,189,248,0.15)] hover:-translate-y-0.5
        transition-all duration-300 ease-out"
    >
      {isObj && (
        typeof tag.icon === 'string'
          ? <img
              src={tag.icon}
              alt={tagName}
              className={`w-3.5 h-3.5 object-contain transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 ${tag.invert ? 'invert' : ''}`}
            />
          : tag.icon
      )}
      <span className="whitespace-nowrap">{t(tagName)}</span>
    </span>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-6 lg:py-8 scroll-mt-24">
      <div className="flex flex-col gap-space-lg">
        <AnimatedHeader className="flex items-center gap-3">
          <span className="font-code text-[11px] lg:text-code text-primary">05 //</span>
          <h3 className="font-headline-lg text-[22px] leading-[28px] lg:text-headline-lg text-on-surface uppercase tracking-tight">{t('skills_heading')}</h3>
        </AnimatedHeader>

        {/* 
          Using StaggerParent to pop in the 7 category cards.
          This is performant because it's only 7 elements.
        */}
        <StaggerParent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-space-md" staggerDelay={0.08}>
          {groups.map((group, index) => (
            <TiltCard
              key={group.title}
              maxTilt={4}
              glowOpacity={0.08}
              scale={1.01}
              className={`rounded-2xl bg-surface-container-low/80 hover:bg-surface-container-low transition-all duration-500 shadow-sm border border-transparent hover:border-outline-variant/20 hover:shadow-md h-full group/card ${
                index === 0 ? 'lg:col-span-6' : 'lg:col-span-2'
              }`}
            >
              <AnimatedElement
                variants={popIn}
                className="p-3 lg:p-space-md flex flex-col gap-2 lg:gap-space-md h-full"
              >
                {/* Category header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[20px]">{group.icon}</span>
                    <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface">{t(group.title)}</h4>
                  </div>
                  {/* Static counter (performant) */}
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-surface-container-high/50">
                    <span className="font-code text-[10px] text-primary/60">{group.tags.length}</span>
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5 lg:gap-1">
                  {group.tags.map((tag) => (
                    <SkillTag
                      key={typeof tag === 'object' ? tag.name : tag}
                      tag={tag}
                    />
                  ))}
                </div>
              </AnimatedElement>
            </TiltCard>
          ))}
        </StaggerParent>
      </div>
    </section>
  );
}
