import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Clock, Award, Check, FileText, Sparkles } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';
import AdmissionModal from '../../components/forms/AdmissionModal';
import SyllabusModal from '../../components/forms/SyllabusModal';

/**
 * CoursesPage Component - Google Stitch Design System
 * Complete Courses Catalog Listing view with category filter pills, search bar, and enrollment triggers.
 */
export default function CoursesPage({ lang = 'mr' }) {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState(null);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function loadCourses() {
      const data = await CourseRepository.getCourses(filter);
      setCourses(data);
    }
    loadCourses();

    const unsubscribe = sharedStore.subscribe(() => {
      loadCourses();
    });
    return unsubscribe;
  }, [filter]);

  const filteredCourses = courses.filter((c) => 
    (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.overviewEn || c.overview_en || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAdmission = (courseId) => {
    setSelectedCourseForModal(courseId);
    setIsAdmissionModalOpen(true);
  };

  const openSyllabus = (courseObj) => {
    setSelectedCourseForModal(courseObj);
    setIsSyllabusModalOpen(true);
  };

  return (
    <div className="bg-stitch-ivory min-h-screen pb-20">
      
      {/* Hero Banner Header */}
      <section className="bg-stitch-slate-dark text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-stitch-amber text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-stitch-sm">
            <BookOpen className="w-4 h-4 text-slate-950" />
            <span>{isMarathi ? 'अभ्यासक्रम कॅटलॉग २०२६' : 'Course Catalog 2026'}</span>
          </span>

          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'महाराष्ट्र शासन व MKCL मान्यताप्राप्त संगणक कोर्सेस' : 'Govt & MKCL Recognized Computer Courses'}
          </h1>

          <p className={`text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? '१-ऑन-१ प्रॅक्टिकल लॅब, अनुभवी शिक्षक, हप्त्याने फी भरण्याची सोय आणि १००% परीक्षा व नोकरी मार्गदर्शन.'
              : 'Hands-on practical computer lab, expert instructors, easy instalment payment options, and 100% placement guidance.'}
          </p>
        </div>
      </section>

      {/* Filter Bar & Search Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-stitch-md border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', labelMr: 'सर्व कोर्सेस', labelEn: 'All Courses' },
              { id: 'govt', labelMr: 'शासकीय मान्यताप्राप्त', labelEn: 'Govt Certified' },
              { id: 'job', labelMr: 'नोकरी-ओरिएंटेड', labelEn: 'Job-Oriented' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm ${
                  filter === btn.id
                    ? 'bg-stitch-red text-white'
                    : 'bg-slate-100 text-stitch-slate-dark hover:bg-slate-200'
                }`}
              >
                <span className={isMarathi ? 'marathi-text' : ''}>
                  {isMarathi ? btn.labelMr : btn.labelEn}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isMarathi ? 'कोर्सचे नाव शोधा...' : 'Search course name...'}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-stitch-slate-dark focus:outline-none focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((c) => (
            <div
              key={c.id || c.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-stitch-md hover:shadow-stitch-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {(c.image_url || c.imageUrl) && (
                <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
                  <img 
                    src={c.image_url || c.imageUrl} 
                    alt={c.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-50 text-stitch-amber border border-amber-200 font-black text-[10px] uppercase px-3 py-1 rounded-full">
                    {c.tag || 'न्यू'}
                  </span>
                </div>

                <h2 className="font-black text-xl text-stitch-slate-dark group-hover:text-stitch-red transition-colors">
                  {c.title}
                </h2>

                <p className={`text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? (c.subtitleMr || c.subtitle_mr) : (c.subtitleEn || c.subtitle_en)}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 border-y border-slate-100 py-3 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-stitch-red shrink-0" />
                    <span>{isMarathi ? (c.durationMr || c.duration_mr) : (c.durationEn || c.duration_en)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-stitch-amber shrink-0" />
                    <span className="truncate">{isMarathi ? (c.certificationMr || c.certification_mr || 'MKCL') : (c.certificationEn || c.certification_en || 'MKCL')}</span>
                  </div>
                </div>

                {/* Modules Summary */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    {isMarathi ? 'मुख्य विषय:' : 'Core Modules:'}
                  </div>
                  <ul className="space-y-1 text-xs text-slate-600 font-medium">
                    {((isMarathi ? c.modulesMr : c.modulesEn) || []).slice(0, 3).map((m, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-stitch-emerald shrink-0 mt-0.5" />
                        <span className="truncate">{m.name || m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => openSyllabus(c)}
                  className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-stitch-slate-dark font-extrabold text-xs py-3 rounded-2xl border border-slate-200 shadow-stitch-sm transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isMarathi ? 'सिलॅबस PDF' : 'Syllabus PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openAdmission(c.id || c.slug)}
                  className="flex items-center justify-center gap-1 bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-extrabold text-xs py-3 rounded-2xl shadow-stitch-sm transition-all hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isMarathi ? 'प्रवेश घ्या' : 'Book Demo'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        defaultCourse={selectedCourseForModal || 'mscit'}
        lang={lang}
      />

      <SyllabusModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        courseTitle={selectedCourseForModal ? String(selectedCourseForModal).toUpperCase() : 'MS-CIT'}
        lang={lang}
      />
    </div>
  );
}

