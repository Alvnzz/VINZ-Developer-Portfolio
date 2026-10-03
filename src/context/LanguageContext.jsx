import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LanguageContext = createContext();

/** Complete bilingual dictionary for all ALVNZZ sections */
const dictionary = {
  // --- Header Nav ---
  nav_home: { id: 'Beranda', en: 'Home' },
  nav_profile: { id: 'Profil', en: 'Profile' },
  nav_experience: { id: 'Pengalaman', en: 'Experience' },
  nav_projects: { id: 'Proyek', en: 'Projects' },
  nav_more: { id: 'Lainnya', en: 'More' },
  nav_education: { id: 'Pendidikan', en: 'Education' },
  nav_skills: { id: 'Keahlian', en: 'Skills' },
  nav_achievements: { id: 'Pencapaian', en: 'Achievements' },
  nav_training: { id: 'Kualifikasi', en: 'Qualifications' },
  nav_certifications: { id: 'Sertifikasi', en: 'Certifications' },
  nav_contact: { id: 'Kontak', en: 'Contact' },
  nav_download_cv: { id: 'Unduh CV', en: 'Download CV' },
  show_more: { id: 'Selengkapnya', en: 'Show more' },
  show_less: { id: 'Lebih sedikit', en: 'Show less' },

  // --- Hero ---
  hero_status: { id: 'Tersedia untuk bekerja dan proyek', en: 'Available for work and projects' },
  hero_subtitle: { id: 'Web & Mobile App Developer', en: 'Web & Mobile App Developer' },
  hero_desc: { id: 'Berfokus pada pengembangan aplikasi web dan mobile modern, dengan ketertarikan dalam menciptakan pengalaman pengguna yang interaktif, responsif, dan fungsional.', en: 'Focusing on modern web and mobile application development, with an interest in creating interactive, responsive, and functional user experiences.' },
  hero_cta_projects: { id: 'Lihat Proyek', en: 'View Projects' },
  hero_cta_contact: { id: 'Hubungi Saya', en: 'Contact Me' },

  // --- Profile ---
  profile_fullname: { id: 'Nama Lengkap', en: 'Full Name' },
  profile_role: { id: 'Mobile Developer', en: 'Mobile Developer' },
  profile_summary: { id: 'Sebagai lulusan Sarjana Informatika dari Universitas Teknologi Yogyakarta yang dibekali kompetensi teknis dari Digital Talent Academy, freeCodeCamp, dan RevoU, saya memfokuskan keahlian secara mendalam pada bidang pengembangan website dan aplikasi seluler. Saya juga memiliki rekam jejak kedisiplinan dan akurasi data yang tinggi, terbangun dari pengalaman nyata sebagai Staf Administrasi pada program strategis Pendaftaran Tanah Sistematis Lengkap (PTSL) di Kediri. Berbekal perpaduan komprehensif antara ketelitian manajerial dari pengalaman lapangan dan kecakapan teknis, saya siap merancang solusi teknologi yang inovatif dan berdampak.', en: 'As an Informatics graduate from University of Technology Yogyakarta equipped with technical competencies from Digital Talent Academy, freeCodeCamp, and RevoU, I focus deeply on website and mobile application development. I also possess a track record of discipline and high data accuracy from my experience as an Administrative Assistant for the PTSL strategic program in Kediri. Armed with a comprehensive blend of managerial meticulousness and technical proficiency, I am ready to design innovative and impactful technology solutions.' },
  profile_heading: { id: 'Profil Diri', en: 'Personal Profile' },
  profile_location: { id: 'Alamat Domisili', en: 'Domicile Address' },
  profile_language: { id: 'Kemampuan Bahasa', en: 'Languages' },
  profile_status: { id: 'Status Kemitraan', en: 'Partnership Status' },
  profile_status_value: { id: 'Terbuka untuk Pekerjaan', en: 'Open to Work' },
  profile_about: { id: 'Tentang Saya', en: 'About Me' },
  profile_bio_1: { id: 'Saya memandang peramban web sebagai kanvas digital dengan kemungkinan performa tanpa batas. Berfokus pada titik temu antara desain komputasional berstandar kuratorial dan rekayasa perangkat lunak ultra-responsif, saya membangun produk yang tidak hanya berkesan secara emosional namun juga terukur secara teknis.', en: 'I view the web browser as an unbounded computational canvas. Focusing on the convergence between curatorial design standards and ultra-responsive software engineering, I craft digital ecosystems that leave emotional resonance while remaining mathematically sound and robust.' },
  profile_bio_2: { id: 'Selama 7 tahun terakhir, saya berkolaborasi dengan studio global dan startup Seri-A hingga IPO untuk menyederhanakan antarmuka yang kompleks, mereduksi latensi interaksi hingga batas persepsi manusiawi, dan membangun sistem desain multi-platform dengan modularitas mutlak.', en: 'Over the last 7 years, I have partnered with pioneering global studios and Series-A to IPO scale-ups to declutter high-density interfaces, compress interaction latency to imperceptible human thresholds, and construct tokenized multi-brand design systems with absolute modularity.' },
  profile_principles: { id: 'PRINSIP ARSITEKTUR UTAMA', en: 'CORE ARCHITECTURAL PRINCIPLES' },

  // --- Experience ---
  exp_heading: { id: 'Jejak Pengalaman', en: 'Career Trajectory' },
  exp_1_title: { id: 'Staf Administrasi', en: 'Administrative Assistant' },
  exp_1_desc: { id: 'Dipercaya sebagai Staf Administrasi pada Satuan Tugas Pendaftaran Tanah Sistematis Lengkap (PTSL) BPN Kediri untuk wilayah Desa Dungus, dengan fokus pada pengelolaan administrasi dan data yuridis. Saya terlibat dalam proses administrasi, verifikasi dokumen, serta kegiatan pelayanan dan koordinasi masyarakat untuk membantu memastikan pelaksanaan PTSL berjalan tertib dan terarah.<ul class="flex flex-col gap-2 mt-3"><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Mengelola dan memverifikasi 1.563 data pendaftar PTSL di Desa Dungus, meliputi inventarisasi, entri data, pemeriksaan kelengkapan, dan validasi dokumen.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Menangani dokumen administrasi PTSL menggunakan Microsoft Excel dan Word, termasuk formulir peserta, penguasaan fisik, riwayat tanah, batas bidang, dan penelitian data yuridis.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Berkoordinasi dengan 3 kelompok utama, yaitu masyarakat, perangkat desa, dan pihak pertanahan, dalam penyampaian prosedur serta kelengkapan persyaratan.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Memproses dan meninjau berkas pendaftar pada berbagai tahapan administrasi untuk menjaga ketertiban, kelengkapan, dan kesesuaian dokumen.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Turut dalam penyelesaian proses hingga 1.008 sertipikat tanah dibagikan kepada pendaftar yang memenuhi persyaratan dan menyelesaikan tahapan PTSL.</span></li></ul>', en: 'Entrusted as an Administrative Assistant on the Complete Systematic Land Registration (PTSL) Task Force of BPN Kediri for the Dungus Village area, focusing on administration and juridical data management. I was involved in the administration process, document verification, as well as community service and coordination activities to help ensure the PTSL implementation ran in an orderly and directed manner.<ul class="flex flex-col gap-2 mt-3"><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Managed and verified 1,563 PTSL applicant records in Dungus Village, covering data inventory, data entry, document review, and validation.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Handled PTSL administrative documentation using Microsoft Excel and Microsoft Word, including applicant records, physical possession statements, land history, boundary records, and juridical data.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Coordinated with 3 key stakeholder groups, namely residents, village officials, and land administration teams, to facilitate PTSL procedures and document requirements.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Processed and reviewed applicant files throughout the administrative stages, helping maintain accurate, complete, and organized documentation for further processing.</span></li><li class="flex items-start gap-3"><span class="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span><span>Contributed to the completion of the PTSL process resulting in 1,008 land certificates being distributed to applicants who fulfilled the required conditions and procedures.</span></li></ul>' },
  exp_1_location: { id: 'Kediri, Jawa Timur, Indonesia', en: 'Kediri, East Java, Indonesia' },
  exp_1_type: { id: 'Penuh Waktu · Hybrid', en: 'Full-time · Hybrid' },
  exp_1_period: { id: 'Juli 2021 - Agustus 2022', en: 'July 2021 - August 2022' },
  exp_1_doc: { id: 'Portofolio Dokumentasi Kerja PTSL Alfian Setya Dwi Saputra', en: 'PTSL Work Documentation Portfolio of Alfian Setya Dwi Saputra' },
  exp_now: { id: 'Sekarang', en: 'Present' },

  // --- Projects ---
  proj_heading: { id: 'Proyek Pilihan', en: 'Selected Case Studies' },
  proj_sub: { id: 'Studi kasus rekayasa antarmuka, arsitektur sistem, dan eksplorasi interaktif berkinerja tinggi dengan dampak terukur.', en: 'Interface engineering case studies, systems architecture, and high-performance computational artifacts with measured impact.' },
  proj_1_title: { id: 'ALVIN\'S Bakery - Sistem Point of Sale (POS)', en: 'ALVIN\'S Bakery - Point of Sale (POS) System' },
  proj_1_desc: { id: 'Aplikasi Point-of-Sale (POS) berbasis mobile yang dilengkapi dengan sistem pre-order real-time, pelaporan penjualan otomatis, dan alarm notifikasi untuk ALVIN\'S Bakery & Donat. Proyek ini saat ini masih dalam tahap pengembangan lebih lanjut.', en: 'A mobile-based Point-of-Sale (POS) application equipped with a real-time pre-order system, automated sales reporting, and alarm notifications for ALVIN\'S Bakery & Donat. This project is currently in the further development stage.' },
  proj_1_label: { id: 'Aplikasi Mobile', en: 'Mobile App' },
  proj_1_date: { id: 'September 2025 - Sekarang', en: 'September 2025 - Present' },
  proj_dev_stage: { id: 'Tahap Pengembangan Lanjutan', en: 'Further Development Stage' },
  proj_problem_label: { id: 'Permasalahan', en: 'Problem' },
  proj_solution_label: { id: 'Solusi', en: 'Solution' },
  proj_result_label: { id: 'Hasil', en: 'Result' },
  proj_1_challenge: { id: 'Pencatatan transaksi dan pengelolaan pesanan berjadwal yang masih manual menyebabkan risiko kesalahan data dan keterlambatan laporan.', en: 'Manual transaction recording and scheduled order management led to risks of data errors and delayed reports.' },
  proj_1_engineering: { id: 'Membangun sistem POS terintegrasi menggunakan Flutter (Dart) dan Firebase (Firestore) untuk sinkronisasi data secara real-time guna mencatat transaksi otomatis dan mempercepat pelaporan, dilengkapi fitur alarm notifikasi.', en: 'Building an integrated POS system using Flutter (Dart) and Firebase (Firestore) for real-time data synchronization to automatically record transactions and accelerate reporting, equipped with an alarm notification feature.' },
  proj_1_impact: { id: 'Meningkatkan efisiensi operasional, akurasi data transaksi, mempercepat penyusunan laporan penjualan, serta ketepatan waktu pelayanan pesanan pelanggan.', en: 'Improved operational efficiency, transaction data accuracy, accelerated sales reporting, and the timeliness of customer order fulfillment.' },
  proj_2_title: { id: 'Kroma — Tokenized Design Engine', en: 'Kroma — Tokenized Design Engine' },
  proj_2_desc: { id: 'Sistem desain multi-brand modular dengan arsitektur headless primitives, eliminasi runtime CSS overhead, dan sinkronisasi token otomatis.', en: 'Modular multi-brand design system with headless primitives architecture, zero runtime CSS overhead, and automatic token synchronization.' },
  proj_3_title: { id: 'Hyperion Trade Terminal', en: 'Hyperion Trade Terminal' },
  proj_3_desc: { id: 'Antarmuka eksekusi trading frekuensi tinggi untuk desktop dengan virtualized order-book dan streaming antrean memori ring-buffer FIFO.', en: 'High-frequency trading execution interface for desktop with virtualized order-book and ring-buffer FIFO memory queue streaming.' },
  proj_4_title: { id: 'Verve — Minimalist Audio Synthesizer', en: 'Verve — Minimalist Audio Synthesizer' },
  proj_4_desc: { id: 'Synthesizer polifonik ambient generatif di browser dengan visualizer fluida GLSL reaktif terhadap spektrum frekuensi harmonik audio.', en: 'Generative ambient polyphonic synthesizer in-browser with frequency-reactive GLSL fluid visualizer.' },
  proj_5_title: { id: 'Nexus Protocol CLI & Explorer', en: 'Nexus Protocol CLI & Explorer' },
  proj_5_desc: { id: 'Terminal suite pengindeksan event on-chain dengan ergonomi TUI (Terminal UI), low memory footprint, dan pipeline stream Node.js.', en: 'On-chain event indexing terminal suite with TUI ergonomics, low memory footprint, and Node.js stream pipelines.' },
  btn_case_study: { id: 'Detail Rekayasa', en: 'Case Study Details' },
  btn_view_solution: { id: 'Lihat Solusi', en: 'View Solution' },
  btn_demo_audio: { id: 'Demo Audio', en: 'Audio Demo' },
  btn_view_terminal: { id: 'Lihat Terminal', en: 'View Terminal' },

  // --- Education ---
  edu_heading: { id: 'Pendidikan Akademis', en: 'Academic Foundations' },
  edu_1_degree: { id: 'S1 Informatika', en: 'Bachelor of Informatics' },
  edu_1_label: { id: 'Gelar Sarjana Komputer (S.Kom.)', en: 'Bachelor of Computer Science (B.Comp.Sc.)' },
  edu_1_desc_1: { id: 'Fokus pada Pengembangan Aplikasi Mobile & Web (Front-End & Back-End), Integrasi Web Service, serta Sistem Basis Data.', en: 'Focused on Mobile & Web Application Development (Front-End & Back-End), Web Service Integration, and Database Systems.' },
  edu_1_desc_2: { id: 'Meraih Indeks Prestasi Kumulatif (IPK) 3.69 / 4.00.', en: 'Achieved a Cumulative Grade Point Average (GPA) of 3.69 / 4.00.' },

  edu_1_ach_heading: { id: 'Pencapaian Akademik', en: 'Academic Achievement' },
  edu_1_ach_title: { id: 'Publikasi Jurnal Ilmiah: Model Aplikasi Point of Sale Berbasis Mobile dengan Modul Pre Order Real Time', en: 'Scientific Journal Publication: Mobile-Based Point of Sale Application Model with Real Time Pre Order Module' },
  edu_1_ach_journal: { id: 'Jurnal Ilmiah Teknik Informatika dan Sistem Informasi (Jutisi)', en: 'Jurnal Ilmiah Teknik Informatika dan Sistem Informasi (Jutisi)' },
  edu_1_ach_date: { id: 'Desember 2025', en: 'December 2025' },
  edu_1_ach_desc: { id: 'Menerbitkan riset mengenai sistem kasir terpadu yang mengintegrasikan teori dengan penerapan praktis untuk memecahkan permasalahan operasional nyata. Karya ini membuktikan kesiapan analitis dan teknis saya untuk berkontribusi di dunia profesional.', en: 'Published research on an integrated cashier system that bridges theory with practical application to solve real operational problems. This work demonstrates my analytical and technical readiness to contribute to the professional world.' },
  edu_1_ach_doc: { id: 'Dokumen Publikasi Jurnal Ilmiah', en: 'Journal Publication Document' },
  doc_type_pdf: { id: 'Dokumen PDF', en: 'PDF Document' },

  edu_2_degree: { id: 'Interaksi Manusia & Komputer (HCI)', en: 'Human-Computer Interaction (HCI)' },
  edu_2_label: { id: 'Program Pertukaran Global', en: 'Global Exchange Program' },
  edu_2_desc: { id: 'Studi mendalam riset kognisi antarmuka, evaluasi ergonomi visual spasial, dan rekayasa aksesibilitas universal (WCAG AAA).', en: 'Immersive immersion in cognitive ergonomics, spatial UI perceptual models, and universal accessible interface systems (WCAG AAA standards).' },

  // --- Skills ---
  skills_heading: { id: 'Kompetensi Teknis', en: 'Technical Competencies' },
  'Administrasi Operasional': { id: 'Administrasi Operasional', en: 'Operational Administration' },
  'Entri Data': { id: 'Entri Data', en: 'Data Entry' },
  'Analisis Data': { id: 'Analisis Data', en: 'Data Analysis' },
  'Verifikasi Dokumen': { id: 'Verifikasi Dokumen', en: 'Document Verification' },
  'Microsoft Word': { id: 'Microsoft Word', en: 'Microsoft Word' },
  'Microsoft Excel': { id: 'Microsoft Excel', en: 'Microsoft Excel' },
  'Manajemen Waktu': { id: 'Manajemen Waktu', en: 'Time Management' },
  'Ketelitian Tinggi': { id: 'Ketelitian Tinggi', en: 'High Accuracy' },
  'Kerja Sama Tim': { id: 'Kerja Sama Tim', en: 'Teamwork' },
  'Koordinasi Lapangan': { id: 'Koordinasi Lapangan', en: 'Field Coordination' },
  'Time Management': { id: 'Manajemen Waktu', en: 'Time Management' },
  'Attention to Detail': { id: 'Ketelitian', en: 'Attention to Detail' },
  'Core Competencies': { id: 'Kemampuan Umum', en: 'General Skills' },
  'Pemrograman Antarmuka': { id: 'Pemrograman Antarmuka', en: 'Interface Programming' },
  'Perancangan Sistem': { id: 'Perancangan Sistem', en: 'Systems Design' },
  'Integrasi Sistem': { id: 'Integrasi Sistem', en: 'System Integration' },
  'Pengelolaan Basis Data': { id: 'Pengelolaan Basis Data', en: 'Database Management' },
  'Pemikiran Analitis': { id: 'Pemikiran Analitis', en: 'Analytical Thinking' },
  'Pemecahan Masalah': { id: 'Pemecahan Masalah', en: 'Problem Solving' },
  'Ketelitian Tinggi': { id: 'Ketelitian Tinggi', en: 'High Attention to Detail' },
  'Entri Data': { id: 'Entri Data', en: 'Data Entry' },
  'Administrasi Operasional': { id: 'Administrasi Operasional', en: 'Operational Administration' },
  'Analisis Data': { id: 'Analisis Data', en: 'Data Analysis' },
  'Manajemen Kode': { id: 'Manajemen Kode', en: 'Code Management' },
  'Koordinasi Lapangan': { id: 'Koordinasi Lapangan', en: 'Field Coordination' },
  'Verifikasi Dokumen': { id: 'Verifikasi Dokumen', en: 'Document Verification' },
  'Kerja Sama Tim': { id: 'Kerja Sama Tim', en: 'Teamwork' },
  'Manajemen Waktu': { id: 'Manajemen Waktu', en: 'Time Management' },
  'Komunikasi Efektif': { id: 'Komunikasi Efektif', en: 'Effective Communication' },
  'Berpikir Kritis': { id: 'Berpikir Kritis', en: 'Critical Thinking' },
  'Manajemen Proyek': { id: 'Manajemen Proyek', en: 'Project Management' },
  'Desain Antarmuka': { id: 'Desain Antarmuka', en: 'Interface Design' },
  'Literasi Digital': { id: 'Literasi Digital', en: 'Digital Literacy' },
  'Pengembangan Web': { id: 'Pengembangan Web', en: 'Web Development' },
  'Pengembangan Aplikasi Mobile': { id: 'Pengembangan Aplikasi Mobile', en: 'Mobile App Development' },
  'Pengembangan Front-End': { id: 'Pengembangan Front-End', en: 'Front-End Development' },
  'Programming Languages': { id: 'Bahasa Pemrograman', en: 'Programming Languages' },
  'Frontend Development': { id: 'Pengembangan Front-End', en: 'Frontend Development' },
  'Backend Development': { id: 'Pengembangan Back-End', en: 'Backend Development' },
  'Database & Storage': { id: 'Basis Data & Penyimpanan', en: 'Database & Storage' },
  'Development Tools': { id: 'Alat Pengembangan', en: 'Development Tools' },
  'Productivity Tools': { id: 'Alat Produktivitas', en: 'Productivity Tools' },

  // --- Achievements ---
  ach_heading: { id: 'Pencapaian', en: 'Key Achievements' },
  ach_sub: { id: 'Pengakuan industri, tonggak proyek open-source, dan dampak nyata dalam rekayasa grafika & antarmuka.', en: 'Recognition, open-source milestones, and community impact across graphics and interface engineering.' },
  ach_1_title: { id: 'Juara 1 – Global WebGL & Creative Dev Hackathon', en: '1st Place – Global WebGL & Creative Dev Hackathon' },
  ach_1_desc: { id: 'Penghargaan bergengsi implementasi shader komputasi partikel real-time dengan latensi sub-milidetik pada 120 FPS lintas platform.', en: 'Awarded for architecting a sub-millisecond particle compute shader engine running 120 FPS on mobile and desktop environments.' },
  ach_2_title: { id: 'Kontributor Inti – Open Source Design System Framework', en: 'Core Contributor – Open Source Design System Framework' },
  ach_2_desc: { id: 'Mengembangkan modul inti transformasi token arsitektur dan engine sinkronisasi Figma multi-platform dengan 80k+ unduhan mingguan.', en: 'Authored core token transformation pipeline and multi-platform Figma synchronization engine serving 80k+ active weekly developers.' },
  ach_3_title: { id: 'Pembicara – Southeast Asia Frontend Summit 2023', en: 'Speaker – Southeast Asia Frontend Summit 2023' },
  ach_3_desc: { id: 'Membawakan presentasi teknis: \'Bridging Micro-Interactions & Sub-millisecond Rendering Performance\' di hadapan 1,200+ rekayasawan senior.', en: 'Delivered keynote: \'Bridging Micro-Interactions & Sub-millisecond Rendering Performance\' to an audience of 1,200+ engineering leads.' },
  ach_4_title: { id: 'Awwwards Site of the Day (SOTD) & Developer Award', en: 'Awwwards Site of the Day (SOTD) & Developer Award' },
  ach_4_desc: { id: 'Pemenang pengakuan global atas perancangan web kinetik eksperimental, simulasi fisika kustom, dan zero layout shift accessibility.', en: 'Recognized globally for avant-garde kinetic typography, custom physics simulation, and zero layout shift accessibility execution.' },

  // --- Training & Certifications ---
  train_heading: { id: 'Pelatihan & Sertifikasi', en: 'Training & Certifications' },
  
  train_1_title: { id: 'Assistant Web Developer - Nasional', en: 'Assistant Web Developer - National' },
  train_1_date: { id: 'Maret 2026 - Desember 2026', en: 'Mar 2026 - Dec 2026' },
  train_1_category: { id: 'PENGEMBANGAN WEB', en: 'WEB DEVELOPMENT' },
  train_1_desc: { id: 'Menyelesaikan program pelatihan pengembangan antarmuka situs web dari Digital Talent Scholarship 2026. Melalui program intensif ini, saya menguasai berbagai kompetensi teknis krusial, di antaranya adalah kemampuan mengimplementasikan antarmuka pengguna secara efektif. Selain itu, saya juga dilatih untuk menerapkan perintah eksekusi bahasa pemrograman yang berbasis teks, grafik, serta multimedia secara akurat. Untuk melengkapi keahlian teknis tersebut, saya dibekali dengan kemampuan fundamental dalam menyusun fungsi, berkas, maupun sumber daya pemrograman lainnya ke dalam struktur tata letak organisasi yang rapi dan terstandardisasi.', en: 'Completed the web interface development training program from Digital Talent Scholarship 2026. Through this intensive program, I mastered various crucial technical competencies, including the ability to implement user interfaces effectively. Additionally, I was trained to apply execution commands for text, graphic, and multimedia-based programming languages accurately. To complement these technical skills, I was equipped with fundamental abilities in structuring functions, files, and other programming resources into a neat and standardized organizational layout.' },
  
  train_2_title: { id: 'Front End Development Libraries V8', en: 'Front End Development Libraries V8' },
  train_2_date: { id: 'Februari 2026 - Mei 2026', en: 'Feb 2026 - May 2026' },
  train_2_category: { id: 'PENGEMBANGAN FRONT-END', en: 'FRONT-END DEVELOPMENT' },
  train_2_desc: { id: 'Meraih pencapaian kompetensi dari program sertifikasi pengembangan pustaka antarmuka pengguna secara daring dari freeCodeCamp yang menuntut dedikasi penyelesaian sekitar 300 jam kerja praktik. Pencapaian dari pelatihan intensif ini menjadi fondasi kompetensi yang amat esensial bagi saya dalam merintis jalan karier setelah kelulusan. Melalui program ini, saya berhasil menguasai bahasa pemrograman dan kerangka kerja perancangan tampilan sistem yang interaktif serta responsif, secara khusus melalui penerapan JavaScript, React, Bootstrap, dan Sass.', en: 'Achieved competency milestones from the online user interface library development certification program by freeCodeCamp, which requires dedication to complete approximately 300 hours of practical work. The achievements from this intensive training serve as an highly essential competency foundation for me in pioneering my career path after graduation. Through this program, I successfully mastered programming languages and frameworks for designing interactive and responsive system interfaces, specifically through the application of JavaScript, React, Bootstrap, and Sass.' },
  
  train_3_title: { id: 'Intro to Software Engineering - Fundamental Course', en: 'Intro to Software Engineering - Fundamental Course' },
  train_3_date: { id: 'Februari 2025 - Maret 2025', en: 'Feb 2025 - Mar 2025' },
  train_3_category: { id: 'DASAR PEMROGRAMAN', en: 'PROGRAMMING BASICS' },
  train_3_desc: { id: 'Meningkatkan kapasitas teknis dengan menempuh program kursus tingkat dasar secara daring selama dua minggu penuh yang diselenggarakan oleh RevoU pada fase perkuliahan. Pelatihan intensif di bidang pengembangan sistem dan pemrograman ini difokuskan pada pembelajaran sekaligus praktik langsung merancang sebuah situs web menggunakan HTML, CSS, dan JavaScript. Pengalaman merakit proyek nyata ini tidak hanya mempertajam logika pemrograman saya, tetapi juga menjadi bukti kesiapan kompetensi teknis yang bagus untuk melangkah dan bersaing di lingkungan kerja profesional.', en: 'Enhanced technical capacity by undertaking a full two-week online foundational course program organized by RevoU during my university studies. This intensive training in system development and programming was focused on learning and directly practicing designing a website using HTML, CSS, and JavaScript. The experience of assembling this real project not only sharpened my programming logic but also served as evidence of good technical competency readiness to step forward and compete in a professional work environment.' },
  
  cert_1_title: { id: 'Software Engineer Role Certification', en: 'Software Engineer Role Certification' },
  cert_1_date: { id: 'Mei 2026', en: 'May 2026' },
  cert_1_category: { id: 'KOMPETENSI PEMROGRAMAN', en: 'PROGRAMMING COMPETENCY' },
  
  cert_2_title: { id: 'Google Analytics Certification', en: 'Google Analytics Certification' },
  cert_2_date: { id: 'Mei 2026 - Mei 2027', en: 'May 2026 - May 2027' },
  cert_2_category: { id: 'ANALISIS DATA', en: 'DATA ANALYSIS' },
  
  cert_3_title: { id: 'Difussion #134: AI, Rasionalitas Ilmiah, dan Operasi Informasi di Indonesia', en: 'Diffusion #134: AI, Scientific Rationality, and Information Operations in Indonesia' },
  cert_3_date: { id: 'April 2026', en: 'April 2026' },
  cert_3_category: { id: 'KECERDASAN BUATAN', en: 'ARTIFICIAL INTELLIGENCE' },
  
  cert_4_title: { id: 'Devcode AI Talks - No-Code & AI: Tips & Trik Buat Aplikasi Tanpa Coding', en: 'Devcode AI Talks - No-Code & AI: Tips & Tricks to Build Apps Without Coding' },
  cert_4_date: { id: 'Maret 2025', en: 'March 2025' },
  cert_4_category: { id: 'KECERDASAN BUATAN', en: 'ARTIFICIAL INTELLIGENCE' },
  
  cert_5_title: { id: 'Data Engineering Professional Certification', en: 'Data Engineering Professional Certification' },
  cert_5_date: { id: 'Desember 2023', en: 'December 2023' },
  cert_5_category: { id: 'REKAYASA DATA', en: 'DATA ENGINEERING' },
  
  btn_cert_doc: { id: 'Dokumen Sertifikasi', en: 'Certification Document' },
  btn_train_doc: { id: 'Sertifikat Pelatihan', en: 'Training Certificate' },

  // --- Contact ---
  contact_heading: { id: 'Inisiasi Kolaborasi', en: 'Initiate Dialogue' },
  contact_info_title: { id: 'Informasi Kontak', en: 'Contact Information' },
  contact_social_title: { id: 'Media Sosial', en: 'Social Media' },
  contact_address: { id: 'Rejosari, Kawedanan, Magetan', en: 'Rejosari, Kawedanan, Magetan' },
  contact_country: { id: 'Indonesia', en: 'Indonesia' },
  contact_timezone: { id: 'Jakarta (WIB / UTC+7) • Respon < 24 jam', en: 'Jakarta (WIB / UTC+7) • Response < 24 hrs' },
  form_name: { id: 'NAMA LENGKAP', en: 'FULL NAME' },
  form_email: { id: 'ALAMAT EMAIL', en: 'EMAIL ADDRESS' },
  form_subject: { id: 'SUBJEK INISIASI', en: 'SUBJECT' },
  form_message: { id: 'PESAN ATAU RANGKUMAN PROYEK', en: 'MESSAGE OR PROJECT SCOPE' },
  form_placeholder_name: { id: 'Budi Santoso', en: 'John Doe' },
  form_placeholder_email: { id: 'budisantoso@example.com', en: 'johndoe@example.com' },
  form_placeholder_subject: { id: 'Tawaran Pekerjaan / Proyek', en: 'Job / Project Offer' },
  form_placeholder_message: { id: 'Jelaskan detail proyek dan ekspektasi fungsionalitas teknisnya...', en: 'Explain the project details and technical functionality expectations...' },
  form_submitting: { id: 'MENGIRIM...', en: 'TRANSMITTING...' },
  form_submit: { id: 'Kirim Pesan', en: 'Transmit Message' },
  form_success: { id: 'Pesan terkirim dengan sukses.', en: 'Message transmitted successfully.' },
  form_error: { id: 'Gagal mengirim pesan. Silakan coba lagi.', en: 'Failed to send message. Please try again.' },

  // --- Footer ---
  footer_status: { id: 'Siap Berkolaborasi / Available for hire', en: 'Available for hire / Open to collaborate' },
  footer_desc: { id: 'Web & Mobile App Developer yang bersemangat membangun pengalaman digital modern, interaktif, dan responsif.', en: 'Passionate Web & Mobile App Developer building modern, interactive, and responsive digital experiences.' },
  footer_nav_heading: { id: 'Navigasi', en: 'Navigation' },
  footer_built_with: { id: 'Dibangun dengan React + Tailwind CSS', en: 'Built with React + Tailwind CSS' },
  footer_scroll_top: { id: 'Kembali ke atas', en: 'Back to top' },

  // --- Modal ---
  modal_title: { id: 'Detail Proyek', en: 'Project Details' },
  modal_close: { id: 'Tutup / Close', en: 'Close' },

  // --- Common ---
  read_more: { id: 'Selengkapnya', en: 'Read More' },
  read_less: { id: 'Lebih Sedikit', en: 'Show Less' },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id');

  const t = useCallback(
    (key) => {
      const entry = dictionary[key];
      if (!entry) return key;
      return entry[lang] || entry.id || key;
    },
    [lang],
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  }, []);

  const setLanguage = useCallback((l) => setLang(l), []);

  useEffect(() => {
    document.title = lang === 'en' ? 'VINZ Developer - Portfolio' : 'VINZ Developer - Portofolio';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
