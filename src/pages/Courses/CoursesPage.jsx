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
  { id: 'foundation',  labelEn: 'Foundation',         labelMr: 'पायाभूत' },
  { id: 'accounting',  labelEn: 'Accounting',          labelMr: 'अकाउंटिंग' },
  { id: 'development', labelEn: 'Development',         labelMr: 'डेव्हलपमेंट' },
  { id: 'govt',        labelEn: 'Government Services', labelMr: 'शासकीय' },
  { id: 'typing',      labelEn: 'Typing',             labelMr: 'टायपिंग' },
];

const FALLBACK_COURSES = [
  {
    slug: 'mscit', title: 'MS-CIT', tag: 'Foundation', tagColor: 'bg-stitch-indigo/10 text-tertiary border border-tertiary-fixed-dim',
    subtitleEn: 'Maharashtra State Certificate in Information Technology. The most popular IT literacy course covering fundamental computer concepts, office productivity tools, and internet skills essential for modern workplaces.',
    durationEn: '2 Months', seatsLabel: 'Admissions Open', seatsColor: 'bg-stitch-emerald/10 text-stitch-emerald',
    featured: true,
    features: ['Practical Focus', 'MKCL Certified'],
  },
  {
    slug: 'tally', title: 'Tally Prime with GST', tag: 'Accounting', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'Master computerized accounting, inventory management, and GST taxation using the latest Tally Prime software.',
    durationEn: '3 Months', seatsLabel: 'Batch filling',
    featured: false,
  },
  {
    slug: 'webdev', title: 'Full Stack Web Dev', tag: 'Development', tagColor: 'bg-surface-container-highest text-on-surface',
    subtitleEn: 'Build modern, responsive websites from scratch using HTML, CSS, JavaScript, and backend frameworks.',
    durationEn: '6 Months', seatsLabel: 'Project-based',
    featured: false,
  },
  {
    slug: 'klic', title: 'KLiC Courses', tag: 'Govt Certified', tagColor: 'bg-stitch-red-light text-primary border border-stitch-red-border',
    subtitleEn: 'MKCL KLiC short-term skill development courses for quick government-certified qualifications.',
    durationEn: '1–3 Months', seatsLabel: 'Multiple batches',
    featured: false,
  },
  {
    slug: 'dtp', title: 'DTP & Graphic Design', tag: 'Creative', tagColor: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    subtitleEn: 'Desktop Publishing with CorelDRAW, Photoshop and InDesign for print and digital media production.',
    durationEn: '3 Months', seatsLabel: 'Seats Available',
    featured: false,
  },
  {
    slug: 'typing', title: 'English & Marathi Typing', tag: 'Skill', tagColor: 'bg-secondary-container text-on-secondary-container',
    subtitleEn: 'Government exam typing preparation with accuracy training and speed certification.',
    durationEn: '2 Months', seatsLabel: 'Open Enrollment',
    featured: false,
  },
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
        setCourses(data && data.length > 0 ? data : FALLBACK_COURSES);
      } catch {
        setCourses(FALLBACK_COURSES);
      }
    }
    load();
    const unsubscribe = sharedStore.subscribe(load);
    return unsubscribe;
  }, [filter]);

  const filtered = courses.filter((c) => {
    const q = searchTerm.toLowerCase();
    return !q ||
      (c.title || '').toLowerCase().includes(q) ||
      (c.subtitleEn || c.subtitle_en || c.overviewEn || '').toLowerCase().includes(q);
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
            {isMarathi ? 'आमचे अभ्यासक्रम' : 'Explore Our Programs'}
          </span>

          <h1 className="font-display-hero-mobile text-display-hero-mobile md:font-display-hero md:text-display-hero text-text-primary mb-md max-w-4xl">
            {isMarathi ? 'डिजिटल जगात प्रभुत्व मिळवा' : 'Master the Digital World'}
          </h1>

          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mb-xl">
            {isMarathi
              ? 'पायाभूत डिजिटल साक्षरतेपासून प्रगत सॉफ्टवेअर विकासापर्यंत उद्योग-तयार कौशल्ये आत्मसात करा.'
              : 'From foundational digital literacy to advanced software development, equip yourself with industry-ready skills.'}
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
                placeholder={isMarathi ? 'कोर्स शोधा (उदा. Tally, MS-CIT)...' : 'Search courses (e.g. Tally, MS-CIT)...'}
                className="w-full pl-xl pr-sm py-md bg-surface-container-lowest border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-primary font-body-md text-body-md text-text-primary placeholder:text-on-secondary-container"
              />
            </div>
            <div className="flex gap-sm">
              <button
                type="button"
                className="bg-surface-container-low text-text-primary px-md py-md rounded-lg font-label-bold text-label-bold flex items-center gap-xs hover:bg-surface-container-highest transition-colors flex-1 md:flex-none justify-center"
                onClick={() => setSearchTerm('')}
              >
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                Filters
              </button>
              <button
                type="button"
                className="bg-primary text-on-primary px-lg py-md rounded-lg font-label-bold text-label-bold btn-interactive flex-1 md:flex-none"
              >
                Search
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
                    ? 'bg-primary-container text-on-primary-container border-primary'
                    : 'bg-white text-secondary hover:bg-surface border border-surface-variant'
                }`}
              >
                {isMarathi ? chip.labelMr : chip.labelEn}
              </button>
            ))}
          </div>
        </section>

        {/* Course Grid — Stitch Bento */}
        <section className="max-w-7xl mx-auto px-4 md:px-gutter pb-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {displayCourses.map((course, idx) => {
              const isFeatured = idx === 0;
              const tag = course.tag || 'Course';
              const tagColor = course.tagColor || 'bg-surface-container-highest text-on-surface';
              const desc = (isMarathi
                ? course.subtitleMr || course.subtitle_mr || course.overviewMr
                : course.subtitleEn || course.subtitle_en || course.overviewEn
              ) || course.subtitleEn || '';
              const duration = (isMarathi ? course.durationMr || course.duration_mr : course.durationEn || course.duration_en) || course.durationEn || '2 Months';
              const seatsLabel = course.seatsLabel || '';

              if (isFeatured) {
                return (
                  <div
                    key={course.id || course.slug || idx}
                    className="bg-white rounded-xl border border-surface-variant/50 p-lg flex flex-col h-full stitch-card-hover md:col-span-2 lg:col-span-2 relative overflow-hidden"
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full -z-0" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-md">
                        <span className={`font-label-caps text-label-caps px-md py-xs rounded-full ${tagColor}`}>
                          {tag}
                        </span>
                        <span className="bg-stitch-emerald/10 text-stitch-emerald font-label-caps text-label-caps px-md py-xs rounded-full flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Admissions Open
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-text-primary mb-xs">{course.title}</h3>
                      <p className="font-body-md text-body-md text-secondary mb-lg flex-grow max-w-xl line-clamp-3">{desc}</p>
                      <div className="flex flex-wrap gap-md mb-lg text-sm text-on-secondary-container">
                        <div className="flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[18px]">schedule</span>
                          {duration}
                        </div>
                        <div className="flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[18px]">laptop_mac</span>
                          Practical Focus
                        </div>
                        <div className="flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                          MKCL Certified
                        </div>
                      </div>
                      <div className="flex gap-sm mt-auto">
                        <button
                          type="button"
                          onClick={() => { setSelectedCourse(course.id || course.slug); setIsAdmissionOpen(true); }}
                          className="bg-primary text-on-primary font-label-bold text-label-bold px-lg py-sm rounded btn-interactive flex-1 md:flex-none shadow-sm"
                        >
                          {isMarathi ? 'प्रवेश घ्या' : 'Enroll Now'}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSelectedCourse(course); setIsSyllabusOpen(true); }}
                          className="bg-white text-stitch-slate-card border border-surface-variant font-label-bold text-label-bold px-lg py-sm rounded btn-interactive hover:bg-slate-50 flex-1 md:flex-none"
                        >
                          {isMarathi ? 'सिलॅबस पहा' : 'Syllabus'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={course.id || course.slug || idx}
                  className="bg-white rounded-xl border border-surface-variant/50 p-lg flex flex-col h-full stitch-card-hover"
                >
                  <div className="flex justify-between items-start mb-md">
                    <span className={`font-label-caps text-label-caps px-md py-xs rounded-full ${tagColor}`}>
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-text-primary mb-xs">{course.title}</h3>
                  <p className="font-body-md text-body-md text-secondary mb-lg flex-grow line-clamp-3">{desc}</p>
                  <div className="flex gap-sm mt-auto flex-col w-full">
                    <div className="flex justify-between text-sm text-secondary mb-sm border-b border-surface-variant/50 pb-sm">
                      <span className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px]">timer</span>
                        {duration}
                      </span>
                      {seatsLabel && (
                        <span className="flex items-center gap-xs">
                          <span className="material-symbols-outlined text-[16px]">group</span>
                          {seatsLabel}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSelectedCourse(course.id || course.slug); setIsAdmissionOpen(true); }}
                      className="w-full bg-white text-primary border border-primary/30 font-label-bold text-label-bold px-lg py-sm rounded btn-interactive hover:bg-stitch-red-light"
                    >
                      {isMarathi ? 'अधिक माहिती' : 'View Details'}
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
