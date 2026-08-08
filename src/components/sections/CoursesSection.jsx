import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Award, Sparkles, FileText } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';
import SyllabusModal from '../forms/SyllabusModal';

/**
 * CoursesSection Component - Google Stitch Design System
 * Job-oriented computer courses showcase with Stitch cards, category filter pills,
 * Framer Motion entrance animations, and syllabus PDF viewer modal trigger.
 */
export default function CoursesSection({ lang = 'mr' }) {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function load() {
      const data = await CourseRepository.getCourses('all');
      setCourses(data);
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      load();
    });
    return unsubscribe;
  }, []);

  const filteredCourses = filter === 'all' ? courses : courses.filter(c => c.category === filter);

  const openSyllabus = (c) => {
    setSelectedCourse(c);
    setIsSyllabusOpen(true);
  };

  return (
    <section id="courses" className="py-20 bg-stitch-ivory border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 bg-stitch-red-light text-stitch-red font-extrabold text-xs px-4 py-1.5 rounded-full border border-stitch-red-border shadow-stitch-sm">
            <BookOpen className="w-4 h-4 text-stitch-red" />
            <span className={isMarathi ? 'marathi-text font-bold' : ''}>
              {isMarathi ? 'जॉब-ओरिएंटेड संगणक अभ्यासक्रम' : 'Job-Oriented Computer Courses'}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'भविष्यासाठी आवश्यक कॉम्प्युटर स्किल्स शिका' : 'Learn In-Demand Computer Skills for a Bright Career'}
          </h2>

          <p className={`text-slate-500 text-sm sm:text-base font-medium ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'महाराष्ट्र शासन व एमकेसीएल मान्यताप्राप्त कोर्सेस. प्रॅक्टिकल कॉम्प्युटर लॅब आणि नोकरीसाठी १००% मदत.'
              : 'Govt of Maharashtra & MKCL recognized programs with 1-on-1 practical lab training and job placement support.'}
          </p>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', labelMr: 'सर्व कोर्सेस', labelEn: 'All Courses' },
            { id: 'govt', labelMr: 'शासकीय मान्यताप्राप्त', labelEn: 'Govt Certified' },
            { id: 'job', labelMr: 'नोकरी-ओरिएंटेड', labelEn: 'Job-Oriented' },
            { id: 'design', labelMr: 'डिझायनिंग', labelEn: 'Designing' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm ${
                filter === btn.id
                  ? 'bg-stitch-red text-white font-extrabold shadow-stitch-glow'
                  : 'bg-white text-stitch-slate-dark hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span className={isMarathi ? 'marathi-text' : ''}>
                {isMarathi ? btn.labelMr : btn.labelEn}
              </span>
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.map(course => (
            <motion.div 
              key={course.id || course.slug}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-stitch-md hover:shadow-stitch-lg transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Thumbnail */}
              {(course.image_url || course.imageUrl) && (
                <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                  <img 
                    src={course.image_url || course.imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              )}

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-stitch-red-light text-stitch-red border border-stitch-red-border font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                    {course.tag || 'सर्टिफाइड'}
                  </span>
                </div>

                <h3 className="font-black text-xl text-stitch-slate-dark group-hover:text-stitch-red transition-colors">
                  {course.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 font-medium border-y border-slate-100 py-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-stitch-red shrink-0" />
                    <span>{isMarathi ? (course.durationMr || course.duration_mr) : (course.durationEn || course.duration_en)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-stitch-amber shrink-0" />
                    <span className="truncate">{isMarathi ? (course.certificationMr || course.certification_mr || 'MKCL') : (course.certificationEn || course.certification_en || 'MKCL')}</span>
                  </div>
                </div>

                {/* Overview */}
                <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed">
                  {isMarathi ? (course.overviewMr || course.overview_mr) : (course.overviewEn || course.overview_en)}
                </p>
              </div>

              {/* Card Actions */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => openSyllabus(course)}
                  className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-stitch-slate-dark font-bold text-xs py-3 rounded-2xl border border-slate-200 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-stitch-red" />
                  <span>{isMarathi ? 'सिलॅबस PDF' : 'Syllabus'}</span>
                </button>

                <a
                  href="#inquiry-form"
                  className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-extrabold text-xs py-3 rounded-2xl shadow-stitch-sm transition-all hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-200" />
                  <span>{isMarathi ? 'प्रवेश घ्या' : 'Book Demo'}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Syllabus Modal */}
      <SyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
        course={selectedCourse}
        lang={lang}
      />
    </section>
  );
}



