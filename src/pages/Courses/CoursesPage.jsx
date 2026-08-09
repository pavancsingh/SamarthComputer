import React, { useState, useEffect } from 'react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';
import AdmissionModal from '../../components/forms/AdmissionModal';
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
    modulesEn: [{ name: 'AutoCAD 2D Commands' }, { name: 'Building Floor Plans' }, { name: 'Plotting & Blueprints' }]
  }
];

export default function CoursesPage({ lang = 'mr', onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function load() {
      try {
        const data = await CourseRepository.getCourses(filter === 'all' ? 'all' : filter);
        if (data && data.length > 0) {
          setCourses(data);
        } else {
          setCourses(FALLBACK_COURSES);
        }
      } catch {
        setCourses(FALLBACK_COURSES);
      }
    }
    load();
    const unsubscribe = sharedStore.subscribe(load);
    return unsubscribe;
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

  const displayCourses = filtered.length > 0 ? filtered : FALLBACK_COURSES;

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden pb-20 md:pb-0">
      {/* Ambient Background */}
      <div className="ambient-glow glow-orb-red w-[600px] h-[600px] top-[-200px] left-[-200px]" />
      <div className="ambient-glow glow-orb-slate w-[500px] h-[500px] top-[40%] right-[-100px]" style={{ opacity: 0.1 }} />

      <main className="relative z-10 pb-2xl">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-gutter pt-xl pb-2xl flex flex-col items-center text-center">
          {/* Badge */}
          <span className="bg-stitch-red-light text-primary border border-stitch-red-border px-md py-xs rounded-full font-label-caps text-label-caps mb-lg inline-flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px] fill">school</span>
            {isMarathi ? 'सर्व संगणक अभ्यासक्रम' : 'All Computer Courses'}
          </span>

          <h1 className="font-display-hero-mobile text-display-hero-mobile md:font-display-hero md:text-display-hero text-text-primary mb-md max-w-4xl">
            {isMarathi ? 'डिजिटल जगात प्रभुत्व मिळवा' : 'Master the Digital World'}
          </h1>

          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mb-xl">
            {isMarathi
              ? 'MS-CIT, टॅली प्राइम, ॲडव्हान्स एक्सल आणि MKCL KLiC करिअर कोर्सेससह तुमचे उज्ज्वल भविष्य घडवा.'
              : 'Explore government-certified MS-CIT, Tally Prime, Advanced Excel, and MKCL KLiC career skill courses.'}
          </p>

          {/* Search & Filter Bar */}
          <div className="w-full max-w-3xl bg-white p-sm rounded-xl border border-surface-variant/50 shadow-md flex flex-col md:flex-row gap-sm">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isMarathi ? 'कोर्स शोधा (उदा. Tally, MS-CIT, KLiC)...' : 'Search courses (e.g. Tally, MS-CIT, KLiC)...'}
                className="w-full pl-xl pr-sm py-md bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-body-md text-body-md text-text-primary placeholder:text-on-secondary-container"
              />
            </div>
            <div className="flex gap-sm">
              <button
                type="button"
                className="bg-surface-container-low text-text-primary px-md py-md rounded-lg font-label-bold text-label-bold flex items-center gap-xs hover:bg-surface-container-highest transition-colors flex-1 md:flex-none justify-center"
                onClick={() => { setSearchTerm(''); setFilter('all'); }}
              >
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* Category Chips */}
        <section className="max-w-7xl mx-auto px-4 md:px-gutter mb-xl overflow-x-auto hide-scrollbar">
          <div className="flex gap-sm pb-sm min-w-max">
            {COURSE_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={`font-label-bold text-label-bold px-lg py-sm rounded-full border transition-colors btn-interactive ${
                  filter === chip.id
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-secondary hover:bg-surface border border-surface-variant'
                }`}
              >
                {isMarathi ? chip.labelMr : chip.labelEn}
              </button>
            ))}
          </div>
        </section>

        {/* Course Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-gutter pb-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {displayCourses.map((course, idx) => {
              const tag = course.tag || (course.isPrimary ? 'Primary' : course.category?.toUpperCase() || 'Course');
              const tagColor = course.tagColor || (course.isPrimary ? 'bg-stitch-red-light text-primary border border-stitch-red-border' : 'bg-surface-container-highest text-on-surface');
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
                  className="bg-white rounded-xl border border-surface-variant/50 p-lg flex flex-col h-full stitch-card-hover shadow-sm hover:shadow-md transition-all justify-between"
                >
                  <div>
                    {/* Image */}
                    {(course.image_url || course.imageUrl) && (
                      <div className="w-full h-44 overflow-hidden rounded-lg mb-md relative">
                        <img
                          src={course.image_url || course.imageUrl}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-2 left-2 font-label-caps text-label-caps px-md py-xs rounded-full ${tagColor}`}>
                          {tag}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-xs">
                      {!course.image_url && !course.imageUrl && (
                        <span className={`font-label-caps text-label-caps px-md py-xs rounded-full ${tagColor}`}>
                          {tag}
                        </span>
                      )}
                    </div>

                    <h3 className="font-headline-md text-headline-md text-text-primary mb-xs">{course.title}</h3>
                    
                    {duration && (
                      <div className="flex items-center gap-xs text-xs font-label-bold text-secondary mb-xs">
                        <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                        <span>{duration}</span>
                      </div>
                    )}

                    <p className="font-body-md text-body-md text-secondary mb-md line-clamp-3 leading-relaxed">{desc}</p>

                    {/* Key Topics */}
                    {keyTopics.length > 0 && (
                      <div className="mb-md pt-xs border-t border-surface-variant/40">
                        <h4 className="text-xs font-label-bold text-text-primary uppercase tracking-wider mb-xs">
                          {isMarathi ? 'मुख्य विषय (Key Topics):' : 'Key Topics:'}
                        </h4>
                        <ul className="space-y-1">
                          {keyTopics.map((topic, tidx) => {
                            const topicName = typeof topic === 'string' ? topic : (topic.name || topic.title || '');
                            return (
                              <li key={tidx} className="text-xs text-secondary flex items-start gap-1.5">
                                <span className="material-symbols-outlined text-[14px] text-stitch-emerald mt-0.5 shrink-0">check_circle</span>
                                <span className="line-clamp-1">{topicName}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-sm mt-auto pt-md border-t border-surface-variant/40 w-full">
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate('details', course.slug || course.id);
                        }
                      }}
                      className="flex-1 bg-white text-text-primary border border-surface-variant font-label-bold text-xs py-2.5 rounded-lg btn-interactive hover:bg-slate-50 text-center"
                    >
                      {isMarathi ? 'तपशील पहा' : 'View Details'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelectedCourse(course.id || course.slug); setIsAdmissionOpen(true); }}
                      className="flex-1 bg-primary text-white font-label-bold text-xs py-2.5 rounded-lg btn-interactive hover:bg-stitch-red-dark shadow-sm text-center"
                    >
                      {isMarathi ? 'प्रवेश घ्या' : 'Enroll Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-gutter pb-2xl">
          <div className="bg-stitch-slate-card rounded-xl p-xl flex flex-col md:flex-row items-center justify-between gap-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h2 className="font-headline-lg text-headline-lg text-on-secondary mb-md">
                {isMarathi ? 'कोणता कोर्स योग्य आहे हे ठरवत नाही?' : "Not sure which course is right for you?"}
              </h2>
              <p className="font-body-md text-body-md text-secondary-fixed-dim">
                {isMarathi
                  ? 'आमचे तज्ञ समुपदेशक तुम्हाला तुमच्या कौशल्यांनुसार योग्य करिअर मार्ग शोधण्यात मदत करतील.'
                  : 'Our expert counselors can help you chart a career path based on your current skills and future goals. Book a free consultation today.'}
              </p>
            </div>
            <div className="relative z-10 flex-shrink-0">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="bg-primary text-on-primary font-label-bold text-label-bold px-xl py-md rounded-lg btn-interactive shadow-lg flex items-center gap-sm"
              >
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                {isMarathi ? 'मोफत समुपदेशन बुक करा' : 'Book Counseling'}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
        defaultCourse={selectedCourse || 'mscit'}
        lang={lang}
      />
      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        courseTitle={selectedCourse ? String(selectedCourse.title || selectedCourse).toUpperCase() : 'MS-CIT'}
        lang={lang}
      />
    </div>
  );
}
