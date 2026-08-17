import React, { useState, useEffect } from 'react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';
import CourseEnquiryModal from '../../components/forms/CourseEnquiryModal';
import SyllabusModal from '../../components/forms/SyllabusModal';

/**
 * CoursesPage — Stitch Design System (07_all_courses.html)
 * Light bg + ambient glows + hero with search bar + category chips + bento course grid + CTA section
 */

const COURSE_CHIPS = [
  { id: 'all',         labelEn: 'All Courses',       labelMr: 'सर्व कोर्सेस' },
  { id: 'primary',     labelEn: 'Primary Courses',   labelMr: 'प्रमुख कोर्सेस' },
  { id: 'klic',        labelEn: 'KLiC Courses',      labelMr: 'KLiC कोर्सेस' },
  { id: 'job',         labelEn: 'Job Oriented',      labelMr: 'नोकरीपूरक' },
  { id: 'govt',        labelEn: 'Govt Certified',    labelMr: 'शासकीय' },
  { id: 'design',      labelEn: 'Design & CAD',      labelMr: 'डिझायनिंग' },
];

const FALLBACK_COURSES = [
  {
    slug: 'mscit', title: 'MS-CIT (MKCL Certified)', tag: 'Primary', tagColor: 'bg-stitch-red-light text-primary border border-stitch-red-border',
    subtitleEn: 'Maharashtra State Certificate in Information Technology. Fundamental computer concepts, Windows 11, MS Office 2021, and internet life skills.',
    durationEn: '2 Months', isPrimary: true,
    modulesEn: [{ name: 'Computer Operating & Windows 11' }, { name: 'MS Word & Excel 2021' }, { name: 'AI & Digital Life Tools' }]
  },
  {
    slug: 'tally-prime-gst', title: 'Tally Prime with GST', tag: 'Primary', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'Master computerized accounting, inventory management, GST invoicing, E-Way bills, and financial auditing.',
    durationEn: '2 Months', isPrimary: true,
    modulesEn: [{ name: 'Accounting Principles' }, { name: 'Tally Prime Setup' }, { name: 'GST Billing & E-Way Bills' }]
  },
  {
    slug: 'advanced-excel', title: 'Advanced EXCEL', tag: 'Primary', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'Data management, VLOOKUP, XLOOKUP, Pivot Tables, Conditional Formatting, and Dynamic KPI Dashboards.',
    durationEn: '1.5 Months', isPrimary: true,
    modulesEn: [{ name: 'Advanced Lookup Formulas' }, { name: 'Pivot Tables & Slicers' }, { name: 'Executive Dashboards' }]
  },
  {
    slug: 'klic-graphic-design', title: 'MKCL KLiC Graphic Design', tag: 'KLiC', tagColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    subtitleEn: 'Adobe Photoshop, CorelDRAW, and Illustrator for logo design, flex banner printing, and digital media graphics.',
    durationEn: '2 Months', isPrimary: false,
    modulesEn: [{ name: 'Adobe Photoshop' }, { name: 'CorelDRAW' }, { name: 'Adobe Illustrator' }]
  },
  {
    slug: 'klic-web-design', title: 'MKCL KLiC Web Design', tag: 'KLiC', tagColor: 'bg-stitch-indigo/10 text-tertiary border border-tertiary-fixed-dim',
    subtitleEn: 'HTML5, CSS3, Flexbox, Bootstrap 5, and JavaScript for modern responsive mobile-first websites.',
    durationEn: '2 Months', isPrimary: false,
    modulesEn: [{ name: 'HTML5 & CSS3' }, { name: 'Bootstrap 5' }, { name: 'JavaScript Basics' }]
  },
  {
    slug: 'klic-hardware-networking', title: 'MKCL KLiC Hardware & Networking', tag: 'KLiC', tagColor: 'bg-secondary-container text-on-secondary-container',
    subtitleEn: 'PC assembly, BIOS, OS formatting, CAT6 cable crimping, router setup, and network troubleshooting.',
    durationEn: '2 Months', isPrimary: false,
    modulesEn: [{ name: 'PC Components' }, { name: 'Windows Formatting' }, { name: 'LAN & Wi-Fi Setup' }]
  },
  {
    slug: 'klic-autocad', title: 'MKCL KLiC AutoCAD', tag: 'KLiC', tagColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    subtitleEn: '2D & 3D AutoCAD drafting for civil engineering floor plans, house layouts, and architectural elevations.',
    durationEn: '2 Months', isPrimary: false,
    modulesEn: [{ name: 'AutoCAD 2D Commands' }, { name: 'Building Floor Plans' }, { name: 'Elevations & Blueprints' }]
  },
  {
    slug: 'diploma-financial-accounting', title: 'Diploma in Financial Accounting', tag: 'Primary', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'Journal, Ledger, Final Accounts (P&L, Balance Sheet), GST Billing, Tally Prime and Financial Ratio Analysis.',
    durationEn: '3 Months', isPrimary: true,
    modulesEn: [{ name: 'Accounting Fundamentals' }, { name: 'GST Billing & Returns' }, { name: 'Tally Prime Integration' }]
  },
  {
    slug: 'share-market-banking', title: 'Share Market / Banking & Finance', tag: 'Primary', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'NSE/BSE Stock Market, Demat Account, Mutual Funds, SIP, Banking and Personal Financial Planning.',
    durationEn: '2 Months', isPrimary: true,
    modulesEn: [{ name: 'Stock Market Basics' }, { name: 'Mutual Funds & SIP' }, { name: 'Personal Financial Planning' }]
  },
  {
    slug: 'work-from-home-tools', title: 'Work From Home Tools', tag: 'Primary', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'Zoom, Google Workspace, Canva Design, ChatGPT AI, Fiverr/Upwork Freelancing and Online Income setup.',
    durationEn: '1.5 Months', isPrimary: true,
    modulesEn: [{ name: 'Google Workspace & Zoom' }, { name: 'Canva & ChatGPT' }, { name: 'Freelancing & Online Income' }]
  },
];


export default function CoursesPage({ lang = 'mr', onNavigate }) {
  const [courses, setCourses] = useState(() => {
    const cached = sharedStore.getCourses();
    return cached && cached.length > 0 ? cached : FALLBACK_COURSES;
  });
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [admissionCourse, setAdmissionCourse] = useState(null);
  const [isCourseEnquiryOpen, setIsCourseEnquiryOpen] = useState(false);
  const [syllabusSlug, setSyllabusSlug] = useState(null);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await CourseRepository.getCourses(filter === 'all' ? 'all' : filter);
        if (isMounted && data && data.length > 0) {
          setCourses(data);
        }
      } catch (err) {
        console.warn('Notice loading courses:', err.message);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      if (isMounted) {
        const updated = sharedStore.getCourses();
        if (updated && updated.length > 0) setCourses(updated);
      }
    });

    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [filter]);

  const filtered = courses.filter((c) => {
    // Filter by chip category first if specific
    if (filter === 'primary' && !c.isPrimary && c.slug !== 'mscit' && c.slug !== 'tally-prime-gst' && c.slug !== 'advanced-excel') {
      return false;
    }
    if (filter === 'klic' && c.category !== 'klic' && !c.title?.toLowerCase().includes('klic') && !c.slug?.toLowerCase().includes('klic')) {
      return false;
    }

    const q = searchTerm.toLowerCase();
    return !q ||
      (c.title || '').toLowerCase().includes(q) ||
      (c.subtitleEn || c.subtitle_en || c.overviewEn || c.overview_en || '').toLowerCase().includes(q);
  });

  return (
    <div className="bg-slate-50/70 min-h-screen relative overflow-x-hidden pb-20 md:pb-0">
      {/* Ambient Background Orbs */}
      <div className="ambient-glow glow-orb-red w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="ambient-glow glow-orb-slate w-[500px] h-[500px] top-[40%] right-[-100px]" style={{ opacity: 0.08 }} />

      <main className="relative z-10 pb-16 md:pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12 flex flex-col items-center text-center">
          {/* Official Badge Tag */}
          <span className="bg-rose-50 text-primary border border-rose-200/80 px-4 py-1.5 rounded-full font-black text-xs mb-4 inline-flex items-center gap-1.5 shadow-xs">
            <span className="material-symbols-outlined text-[18px] text-primary">school</span>
            <span>{isMarathi ? 'सर्व संगणक अभ्यासक्रम' : 'All Computer Courses'}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-4 max-w-4xl">
            {isMarathi ? 'डिजिटल जगात प्रभुत्व मिळवा' : 'Master the Digital World'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mb-8 leading-relaxed">
            {isMarathi
              ? 'MS-CIT, टॅली प्राइम, ॲडव्हान्स एक्सल आणि MKCL KLiC करिअर कोर्सेससह तुमचे उज्ज्वल भविष्य घडवा.'
              : 'Explore government-certified MS-CIT, Tally Prime, Advanced Excel, and MKCL KLiC career skill courses.'}
          </p>

          {/* Search & Filter Bar */}
          <div className="w-full max-w-3xl bg-white p-2 md:p-3 rounded-2xl border border-slate-200/90 shadow-md flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isMarathi ? 'कोर्स शोधा (उदा. Tally, MS-CIT, KLiC)...' : 'Search courses (e.g. Tally, MS-CIT, KLiC)...'}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-sm text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-3.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors flex-1 md:flex-none"
                onClick={() => { setSearchTerm(''); setFilter('all'); }}
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>{isMarathi ? 'पुन्हा शोधा' : 'Reset'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Category Chips */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2.5 pb-2 min-w-max">
            {COURSE_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={`font-black text-xs px-5 py-2.5 rounded-full border transition-all ${
                  filter === chip.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                }`}
              >
                {isMarathi ? chip.labelMr : chip.labelEn}
              </button>
            ))}
          </div>
        </section>

        {/* Course Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200/90 rounded-3xl p-10 text-center space-y-4 shadow-sm">
              <span className="material-symbols-outlined text-5xl text-slate-400">search_off</span>
              <h3 className="font-black text-xl text-slate-900">
                {isMarathi ? 'कोणताही अभ्यासक्रम सापडला नाही' : 'No matching courses found'}
              </h3>
              <p className="text-slate-600 text-sm font-medium max-w-md mx-auto">
                {isMarathi ? 'कृपया इतर कीवर्ड वापरून शोधा किंवा फिल्टर बदला.' : 'Try searching with another keyword or reset category filters.'}
              </p>
              <button
                type="button"
                onClick={() => { setFilter('all'); setSearchTerm(''); }}
                className="bg-primary hover:bg-stitch-red-dark text-white px-6 py-3 rounded-xl font-extrabold text-xs inline-block mt-2 shadow-sm"
              >
                {isMarathi ? 'सर्व कोर्सेस दाखवा' : 'Show All Courses'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((course, idx) => {
              const tag = course.tag || (course.isPrimary ? 'Primary' : course.category?.toUpperCase() || 'Course');
              const tagColor = course.tagColor || (course.isPrimary ? 'bg-primary text-white' : 'bg-slate-100 text-slate-800 border border-slate-200');
              const desc = (isMarathi
                ? course.subtitleMr || course.subtitle_mr || course.overviewMr || course.overview_mr
                : course.subtitleEn || course.subtitle_en || course.overviewEn || course.overview_en
              ) || '';
              const duration = (isMarathi ? course.durationMr || course.duration_mr : course.durationEn || course.duration_en) || '';
              const modules = (isMarathi ? course.modulesMr || course.modules_mr : course.modulesEn || course.modules_en) || [];
              const keyTopics = Array.isArray(modules) ? modules.slice(0, 4) : [];

              return (
                <div
                  key={course.id || course.slug || idx}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-7 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div>
                    {/* Course Image */}
                    {(course.image_url || course.imageUrl) && (
                      <div className="w-full h-48 overflow-hidden rounded-2xl mb-5 relative bg-slate-100 border border-slate-100">
                        <img
                          src={course.image_url || course.imageUrl}
                          alt={course.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <span className={`absolute top-3 left-3 font-black text-[11px] px-3 py-1 rounded-full shadow-sm ${tagColor}`}>
                          {tag}
                        </span>
                        {(course.logoUrl || course.logo_url) && (
                          <div className="absolute top-3 right-3 bg-white p-1.5 rounded-2xl shadow-md border border-slate-200/90 w-12 h-12 flex items-center justify-center shrink-0">
                            <img
                              src={course.logoUrl || course.logo_url}
                              alt={`${course.title} logo`}
                              loading="lazy"
                              decoding="async"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      {!course.image_url && !course.imageUrl && (
                        <span className={`font-black text-[11px] px-3 py-1 rounded-full ${tagColor}`}>
                          {tag}
                        </span>
                      )}
                      {(course.logoUrl || course.logo_url) && (!course.image_url && !course.imageUrl) && (
                        <div className="bg-white p-1.5 rounded-2xl shadow-md border border-slate-200/90 w-12 h-12 flex items-center justify-center shrink-0">
                          <img
                            src={course.logoUrl || course.logo_url}
                            alt={`${course.title} logo`}
                            loading="lazy"
                            decoding="async"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    
                    {duration && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-3">
                        <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                        <span>{duration}</span>
                      </div>
                    )}

                    <p className="text-slate-600 text-xs sm:text-sm font-medium mb-4 line-clamp-3 leading-relaxed">{desc}</p>

                    {/* Key Topics */}
                    {keyTopics.length > 0 && (
                      <div className="mb-5 pt-3.5 border-t border-slate-100">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                          {isMarathi ? 'मुख्य विषय (Key Topics):' : 'Key Topics:'}
                        </h4>
                        <ul className="space-y-1.5">
                          {keyTopics.map((topic, tidx) => {
                            const topicName = typeof topic === 'string' ? topic : (topic.name || topic.title || '');
                            return (
                              <li key={tidx} className="text-xs text-slate-700 font-medium flex items-start gap-1.5">
                                <span className="material-symbols-outlined text-[15px] text-emerald-500 mt-0.5 shrink-0">check_circle</span>
                                <span className="line-clamp-1">{topicName}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto w-full">
                    <a
                      href="tel:+919552345061"
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-black text-xs py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs shrink-0"
                      title="Call Now: +91 95523 45061"
                    >
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">call</span>
                      <span>{isMarathi ? 'कॉल' : 'Call'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate('details', course.slug || course.id);
                        }
                      }}
                      className="flex-1 bg-white text-slate-800 border border-slate-300 font-extrabold text-xs py-3 px-3 rounded-xl hover:bg-slate-50 transition-colors text-center"
                    >
                      {isMarathi ? 'तपशील' : 'Details'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAdmissionCourse(course.id || course.slug || ''); setIsCourseEnquiryOpen(true); }}
                      className="flex-1 bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-3 px-3 rounded-xl transition-all shadow-sm text-center"
                    >
                      {isMarathi ? 'प्रवेश' : 'Enroll'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </section>

        {/* Counseling CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
            <div className="max-w-2xl text-center md:text-left space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isMarathi ? 'कोणता कोर्स योग्य आहे हे ठरवत नाही?' : "Not sure which course is right for you?"}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                {isMarathi
                  ? 'आमचे तज्ञ समुपदेशक तुम्हाला तुमच्या कौशल्यांनुसार योग्य करिअर मार्ग शोधण्यात मदत करतील.'
                  : 'Our expert counselors can help you chart a career path based on your current skills and future goals. Book a free consultation today.'}
              </p>
            </div>
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="bg-primary hover:bg-stitch-red-dark text-white font-black text-xs sm:text-sm px-7 py-4 rounded-2xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
              >
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                <span>{isMarathi ? 'मोफत समुपदेशन बुक करा' : 'Book Counseling'}</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modals — COURSES WORKFLOW ONLY */}
      <CourseEnquiryModal
        isOpen={isCourseEnquiryOpen}
        onClose={() => setIsCourseEnquiryOpen(false)}
        defaultCourse={admissionCourse || ''}
        lang={lang}
      />
      <SyllabusModal
        isOpen={!!syllabusSlug}
        onClose={() => setSyllabusSlug(null)}
        courseTitle={syllabusSlug ? String(syllabusSlug).toUpperCase() : 'MS-CIT'}
        lang={lang}
      />
    </div>
  );
}
