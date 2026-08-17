import React, { useState, useEffect } from 'react';
import { CourseRepository } from '../../repositories/CourseRepository';
import AdmissionModal from '../../components/forms/AdmissionModal';
import MSCIT3DCourseMap from '../../components/sections/MSCIT3DCourseMap';

/**
 * CourseDetailsPage — Stitch Design System (05_mscit_course_details.html)
 * Dark hero card with bg image + badges + curriculum grid + official certification card + sticky glass sidebar
 */
export default function CourseDetailsPage({ slug = 'mscit', lang = 'mr', onNavigate }) {
  const [course, setCourse] = useState(null);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantMobile, setApplicantMobile] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function loadDetails() {
      const data = await CourseRepository.getCourseBySlug(slug);
      setCourse(data);
    }
    loadDetails();
  }, [slug]);

  if (!course) return null;

  const overview = (isMarathi ? course.overviewMr || course.overview_mr : course.overviewEn || course.overview_en) || '';
  const modules = (isMarathi ? course.modulesMr || course.modules_mr : course.modulesEn || course.modules_en) || [];
  const practicalSkills = (isMarathi ? course.practicalSkillsMr || course.practical_skills_mr : course.practicalSkillsEn || course.practical_skills_en) || [];
  const eligibility = (isMarathi ? course.eligibilityMr || course.eligibility_mr : course.eligibilityEn || course.eligibility_en) || '';
  const careers = (isMarathi ? course.careersMr || course.careers_mr : course.careersEn || course.careers_en) || [];

  const handleSidebarSubmit = async (e) => {
    e.preventDefault();
    const cleanName = applicantName.trim();
    const cleanMobile = applicantMobile.trim().replace(/\D/g, '');
    if (!cleanName || !cleanMobile || cleanMobile.length < 10) return;

    try {
      await CourseRepository.submitAdmissionInquiry({
        name: cleanName,
        mobile: cleanMobile,
        courseId: course.id || course.slug || slug,
        batchTiming: 'Anytime'
      });
    } catch (err) {
      console.warn('Sidebar enrollment inquiry error:', err);
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setApplicantName('');
    setApplicantMobile('');
  };

  return (
    <div className="bg-background min-h-screen text-text-primary antialiased font-body-md pb-20 md:pb-0">
      <main className="w-full max-w-7xl mx-auto px-md md:px-gutter lg:px-lg py-xl">
        <div className="flex flex-col lg:flex-row gap-xl relative">

          {/* ── Left Content Area ── */}
          <div className="flex-1 space-y-2xl">

            {/* 1. Hero Card */}
            <section className="relative rounded-xl overflow-hidden bg-stitch-slate-card text-white p-xl shadow-md">
              <div className="absolute inset-0 z-0 opacity-40">
                <img
                  src={course.imageUrl || course.image_url || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stitch-slate-card via-stitch-slate-card/90 to-transparent" />
              </div>
              <div className="relative z-10 max-w-2xl space-y-md">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-sm">
                    <span className="bg-stitch-emerald text-white px-3 py-1 rounded-full text-label-caps font-label-caps">
                      Admissions Open
                    </span>
                    <span className="bg-stitch-indigo/20 text-stitch-indigo px-3 py-1 rounded-full text-label-caps font-label-caps backdrop-blur-sm border border-stitch-indigo/30">
                      MKCL Certified
                    </span>
                  </div>
                  {(course.logoUrl || course.logo_url) && (
                    <div className="bg-white p-2 rounded-xl shadow-lg border border-white/40 w-16 h-16 flex items-center justify-center shrink-0">
                      <img
                        src={course.logoUrl || course.logo_url}
                        alt={`${course.title} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </div>
                <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero-mobile md:font-display-hero text-white mb-xs">
                  {course.title}
                </h1>
                <p className="text-marathi-body font-marathi-body text-surface-dim opacity-90 text-lg">
                  {isMarathi ? course.subtitleMr : course.subtitleEn}
                </p>
                <div className="flex flex-wrap gap-md mt-lg">
                  <div className="flex items-center gap-xs text-surface-dim bg-white/10 px-4 py-2 rounded backdrop-blur-sm border border-white/20">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-label-bold font-label-bold">
                      {isMarathi ? course.durationMr : course.durationEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs text-surface-dim bg-white/10 px-4 py-2 rounded backdrop-blur-sm border border-white/20">
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    <span className="text-label-bold font-label-bold">
                      {modules.length > 0 ? `${modules.length} Modules` : '200+ Topics'}
                    </span>
                  </div>
                  <div className="flex items-center gap-xs text-surface-dim bg-white/10 px-4 py-2 rounded backdrop-blur-sm border border-white/20">
                    <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    <span className="text-label-bold font-label-bold">Govt. Recognized</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 1: Overview */}
            <section className="bg-white rounded-2xl p-lg border border-slate-200/80 shadow-sm space-y-md">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-sm">
                <span className="material-symbols-outlined text-primary text-2xl">info</span>
                <h2 className="text-headline-lg font-headline-lg text-text-primary">
                  {isMarathi ? 'कोर्स परिचय (Overview)' : 'Course Overview'}
                </h2>
              </div>
              <p className="text-body-lg font-body-md text-slate-700 leading-relaxed">
                {overview}
              </p>
            </section>

            {/* SECTION 2: What You'll Learn */}
            <section className="space-y-lg">
              <div className="flex items-center gap-2 border-b border-surface-variant/50 pb-sm">
                <span className="material-symbols-outlined text-primary text-2xl">school</span>
                <h2 className="text-headline-lg font-headline-lg text-text-primary">
                  {isMarathi ? 'तुम्ही काय शिकाल (What You\'ll Learn)' : 'What You\'ll Learn'}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {modules.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-md border border-slate-200/70 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 space-y-1.5"
                  >
                    <div className="flex items-start gap-md">
                      <div className="bg-primary/10 p-sm rounded-lg text-primary flex-shrink-0">
                        <span className="material-symbols-outlined text-2xl">
                          {idx === 0 ? 'laptop_chromebook' : idx === 1 ? 'article' : idx === 2 ? 'query_stats' : idx === 3 ? 'monitoring' : 'verified_user'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-headline-md font-headline-md text-slate-900 mb-xs">{m.name || m}</h3>
                        <p className="text-body-md font-body-md text-slate-600 leading-relaxed">{m.desc || ''}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: Practical Skills & Assignments */}
            {practicalSkills.length > 0 && (
              <section className="bg-emerald-50/60 rounded-2xl p-lg border border-emerald-200/80 shadow-sm space-y-md">
                <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-sm">
                  <span className="material-symbols-outlined text-emerald-700 text-2xl">handshake</span>
                  <h2 className="text-headline-lg font-headline-lg text-emerald-950">
                    {isMarathi ? 'प्रत्यक्ष प्रात्यक्षिक कौशल्ये (Practical Skills)' : 'Practical Skills & Exercises'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {practicalSkills.map((skill, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-emerald-200/60 flex items-center gap-3 shadow-xs">
                      <span className="material-symbols-outlined text-emerald-600 text-xl shrink-0">check_circle</span>
                      <span className="text-sm font-extrabold text-slate-800">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION 4: Who It's For & Career Opportunities */}
            <section className="bg-white rounded-2xl p-lg border border-slate-200/80 shadow-sm space-y-md">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-sm">
                <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                <h2 className="text-headline-lg font-headline-lg text-text-primary">
                  {isMarathi ? 'हा कोर्स कोणासाठी आहे (Who It\'s For)' : 'Who It\'s For & Career Scope'}
                </h2>
              </div>

              {eligibility && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-1">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                    {isMarathi ? 'पात्रता & प्रवेश घेणारे:' : 'Target Audience & Eligibility:'}
                  </span>
                  <p className="text-sm font-bold text-slate-900 leading-relaxed">{eligibility}</p>
                </div>
              )}

              {careers.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                    {isMarathi ? '💼 नोकरी व करिअरच्या संधी:' : '💼 Career Opportunities:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {careers.map((car, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary border border-primary/20 font-bold text-xs px-3.5 py-1.5 rounded-full">
                        ✓ {car}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 3D MS-CIT Interactive Learning Journey Course Map — Render only for MS-CIT course */}
            {(course.slug === 'mscit' || course.id === 'mscit' || slug === 'mscit') && (
              <MSCIT3DCourseMap course={course} lang={lang} onNavigate={onNavigate} />
            )}

            {/* Official Certification Section */}
            <section className="bg-surface-container-low rounded-xl p-lg border border-surface-variant/50 flex flex-col md:flex-row gap-lg items-center">
              <div className="flex-1 space-y-md">
                <h2 className="text-headline-lg font-headline-lg text-text-primary">
                  {isMarathi ? 'अधिकृत प्रमाणपत्र' : 'Official Certification'}
                </h2>
                <p className="text-body-md font-body-md text-secondary">
                  {isMarathi
                    ? 'यशस्वीरीत्या पूर्ण केल्यावर, विद्यार्थ्यांना अधिकृत मान्यताप्राप्त प्रमाणपत्र मिळते. हे प्रमाणपत्र महाराष्ट्रातील विविध नोकऱ्या व व्यवसायासाठी उपयुक्त आहे.'
                    : 'Upon successful completion, students receive a government-recognized authorized certificate recognized across Maharashtra.'}
                </p>
                <div className="flex items-center gap-sm text-primary font-label-bold">
                  <span className="material-symbols-outlined fill">verified</span>
                  <span>{isMarathi ? 'मान्यताप्राप्त संगणक केंद्र' : 'Government Recognized Institute'}</span>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-white rounded-lg border border-slate-200/50 flex items-center justify-center p-md shadow-sm">
                <div className="text-center space-y-2">
                  <span className="material-symbols-outlined text-primary text-5xl fill">workspace_premium</span>
                  <div className="font-headline-md text-sm text-text-primary">Samarth Computers</div>
                  <div className="text-xs text-secondary">Authorized Certificate</div>
                </div>
              </div>
            </section>

          </div>

          {/* ── Sticky Sidebar ── */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 glass-panel rounded-xl p-lg shadow-lg">
              <h3 className="text-headline-md font-headline-md mb-md text-text-primary">
                {isMarathi ? 'प्रवेश अर्ज' : 'Enroll Now'}
              </h3>
              <div className="space-y-sm mb-lg border-b border-surface-variant/50 pb-md">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-secondary">{isMarathi ? 'पुढील बॅच:' : 'Next Batch:'}</span>
                  <span className="font-label-bold text-stitch-emerald">Starting Soon</span>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-md space-y-sm">
                  <span className="material-symbols-outlined text-stitch-emerald text-4xl fill">check_circle</span>
                  <p className="text-sm font-label-bold text-text-primary">Inquiry Submitted!</p>
                </div>
              ) : (
                <form className="space-y-md" onSubmit={handleSidebarSubmit}>
                  <div>
                    <label className="block text-label-bold font-label-bold text-text-primary mb-xs">
                      {isMarathi ? 'पूर्ण नाव' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded border-slate-200 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-label-bold font-label-bold text-text-primary mb-xs">
                      {isMarathi ? 'मोबाइल नंबर' : 'Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      value={applicantMobile}
                      onChange={(e) => setApplicantMobile(e.target.value)}
                      placeholder="+91"
                      className="w-full rounded border-slate-200 bg-white focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md p-2"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-label-bold py-3 rounded shadow-sm hover:bg-stitch-red-dark transition-colors duration-200 flex items-center justify-center gap-sm mt-4 btn-interactive"
                  >
                    <span>{isMarathi ? 'प्रवेश अर्ज करा' : 'Apply For Admission'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </form>
              )}
              <div className="mt-4 pt-3 border-t border-surface-variant/40">
                <a
                  href="tel:+919552345061"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                  title="Call Counselor: +91 95523 45061"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{isMarathi ? '📞 थेट बोलण्यासाठी कॉल करा' : 'Call Counselor (+91 95523 45061)'}</span>
                </a>
              </div>
              <p className="text-label-caps font-label-caps text-secondary text-center mt-md">
                Limited seats available per batch
              </p>
            </div>
          </aside>

        </div>
      </main>

      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
        defaultCourse={course.id || slug}
        lang={lang}
      />
    </div>
  );
}
