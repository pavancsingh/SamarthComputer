import React, { useState, useEffect } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';
import AdmissionModal from '../../components/forms/AdmissionModal';

/**
 * CourseDetailsPage Component - Google Stitch Design
 * Deep-dive single course view with detailed curriculum modules, ERA learning system overview,
 * certification specimen, batch timings, instructor profile, and sticky enrollment sidebar.
 */
export default function CourseDetailsPage({ slug = 'mscit', lang = 'mr' }) {
  const [course, setCourse] = useState(null);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function loadDetails() {
      const data = await CourseRepository.getCourseBySlug(slug);
      setCourse(data);
    }
    loadDetails();
  }, [slug]);

  if (!course) return null;

  const modules = isMarathi ? course.modulesMr : course.modulesEn;
  const careers = isMarathi ? course.careersMr : course.careersEn;

  return (
    <div className="bg-stitch-ivory min-h-screen pb-24 text-stitch-slate-dark">
      
      {/* Header Banner */}
      <section className="bg-stitch-slate-dark text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-stitch-amber text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-stitch-sm">
              {course.tag}
            </span>
            <span className="bg-slate-800 text-slate-300 text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-700">
              {isMarathi ? course.durationMr : course.durationEn}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            {course.title}
          </h1>

          <p className={`text-slate-300 text-sm sm:text-base font-medium max-w-3xl ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? course.subtitleMr : course.subtitleEn}
          </p>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Course Deep Dive */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-stitch-md space-y-3">
              <h2 className={`font-black text-xl text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'अभ्यासक्रम परिचय (Course Overview)' : 'Course Overview'}
              </h2>
              <p className={`text-slate-600 text-sm leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? course.overviewMr : course.overviewEn}
              </p>
            </div>

            {/* Curriculum Modules */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-stitch-md space-y-6">
              <h2 className={`font-black text-xl text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'मुख्य विषय आणि प्रॅक्टिकल मॉड्यूल' : 'Curriculum & Practical Modules'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modules.map((m, idx) => (
                  <div key={idx} className="bg-slate-50/80 border border-slate-200/80 p-4.5 rounded-2xl space-y-1">
                    <div className="flex items-center gap-2 font-black text-stitch-slate-dark text-sm">
                      <CheckCircle2 className="w-4 h-4 text-stitch-emerald shrink-0" />
                      <span>{m.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium pl-6">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-stitch-slate-dark text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-stitch-lg border border-slate-700/80">
              <h2 className={`font-black text-xl text-white ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'कोर्स पूर्ण केल्यानंतर रोजगाराच्या संधी' : 'Career Opportunities & Jobs'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {careers.map((c, idx) => (
                  <div key={idx} className="bg-slate-800/90 border border-slate-700/80 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-slate-200 shadow-stitch-sm">
                    <Sparkles className="w-4 h-4 text-stitch-amber shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Admission Box */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-stitch-lg space-y-6 sticky top-28">
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <span className="text-xs text-slate-400 font-extrabold">{isMarathi ? 'अधिकृत मान्यता' : 'Official Certification'}</span>
              <div className="text-sm font-black text-stitch-red">{isMarathi ? course.certificationMr : course.certificationEn}</div>
            </div>

            <div className="space-y-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center justify-between">
                <span>{isMarathi ? 'कालावधी:' : 'Duration:'}</span>
                <span className="font-extrabold text-stitch-slate-dark">{isMarathi ? course.durationMr : course.durationEn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isMarathi ? 'प्रमाणपत्र:' : 'Certification:'}</span>
                <span className="font-extrabold text-stitch-slate-dark truncate max-w-[180px]">{isMarathi ? course.certificationMr : course.certificationEn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isMarathi ? 'पात्रता:' : 'Eligibility:'}</span>
                <span className="font-extrabold text-stitch-slate-dark">{isMarathi ? course.eligibilityMr : course.eligibilityEn}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAdmissionOpen(true)}
              className="w-full bg-stitch-amber hover:bg-amber-400 text-slate-950 font-black text-sm py-4 rounded-2xl shadow-stitch-glow transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isMarathi ? 'मोफत डेमो क्लास बुक करा' : 'Book Free Demo Class'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* Admission Modal */}
      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
        defaultCourse={course.id}
        lang={lang}
      />
    </div>
  );
}

