import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';
import AdmissionModal from '../forms/AdmissionModal';

/**
 * CoursesSection (Homepage) — Samarth Computers Khandala
 * Displays the 3 primary courses: MS-CIT, Tally Prime, and Advanced Excel.
 * Cards show ONLY: Course name, Short description, Duration (if available), Key topics, Course image, View Details / Enroll button.
 * NO COURSE FEES DISPLAYED. Includes "View More Courses" CTA.
 */

const CATEGORY_ICONS = {
  govt: { icon: 'school', bg: 'bg-stitch-red-light', color: 'text-primary' },
  job: { icon: 'calculate', bg: 'bg-secondary-fixed', color: 'text-on-secondary-fixed-variant' },
  design: { icon: 'design_services', bg: 'bg-tertiary-fixed', color: 'text-on-tertiary-fixed-variant' },
  default: { icon: 'computer', bg: 'bg-stitch-red-light', color: 'text-primary' }
};

// Target primary course identifiers
const PRIMARY_SLUGS = ['mscit', 'tally-prime-gst', 'advanced-excel'];

export default function CoursesSection({ lang = 'mr', onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState(null);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await CourseRepository.getCourses('all');
        if (isMounted) setCourses(data || []);
      } catch (err) {
        console.warn('Notice loading courses:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      if (isMounted) {
        setCourses(sharedStore.getCourses());
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Ensure exact order: MS-CIT, Tally Prime, Advanced Excel
  const primaryCourses = PRIMARY_SLUGS.map((slug) =>
    courses.find((c) => c.slug === slug || c.id === slug)
  ).filter(Boolean);

  // Fallback to courses with isPrimary or top 3 if specific slugs not matched
  const displayCourses = primaryCourses.length === 3
    ? primaryCourses
    : [...primaryCourses, ...courses.filter((c) => !primaryCourses.includes(c))].slice(0, 3);

  const handleEnrollClick = (e, course) => {
    e.stopPropagation();
    setSelectedCourseSlug(course.slug || course.id);
    setIsAdmissionOpen(true);
  };

  const handleViewDetailsClick = (e, course) => {
    e.stopPropagation();
    if (onNavigate) {
      onNavigate('details', course.slug || course.id);
    }
  };

  return (
    <section className="py-2xl relative px-4 md:px-8 max-w-7xl mx-auto" id="courses">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-primary font-label-caps tracking-widest uppercase mb-sm block">
          {isMarathi ? 'मुख्य अभ्यासक्रम' : 'Primary Programs'}
        </span>
        <h2 className="text-headline-lg font-headline-lg text-text-primary mb-md">
          {isMarathi ? 'प्रमुख संगणक अभ्यासक्रम' : 'Featured Computer Courses'}
        </h2>
        <p className="text-body-md font-body-md text-secondary max-w-2xl mx-auto">
          {isMarathi
            ? 'उद्योगासाठी तयार अभ्यासक्रम, अनुभवी शिक्षक आणि प्रत्यक्ष प्रात्यक्षिक प्रशिक्षण.'
            : 'Industry-oriented training programs designed for students, job seekers, and working professionals.'}
        </p>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-secondary font-medium">
          {isMarathi ? 'कोर्सेस लोड होत आहेत...' : 'Loading courses...'}
        </div>
      ) : displayCourses.length === 0 ? (
        <div className="text-center py-12 text-secondary font-medium">
          {isMarathi ? 'सध्या कोणतेही कोर्सेस उपलब्ध नाहीत.' : 'No courses available right now.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayCourses.map((course, idx) => {
            const iconConfig = CATEGORY_ICONS[course.category] || CATEGORY_ICONS.default;
            const iconBg = iconConfig.bg;
            const iconColor = iconConfig.color;
            const icon = iconConfig.icon;
            const tag = course.tag || (isMarathi ? 'प्रमुख कोर्स' : 'Primary Course');
            
            const desc = isMarathi 
              ? (course.subtitleMr || course.subtitle_mr || course.overviewMr || course.overview_mr || '')
              : (course.subtitleEn || course.subtitle_en || course.overviewEn || course.overview_en || '');

            const duration = isMarathi
              ? (course.durationMr || course.duration_mr || course.durationEn || course.duration_en || '')
              : (course.durationEn || course.duration_en || course.durationMr || course.duration_mr || '');

            const modules = (isMarathi ? course.modulesMr || course.modules_mr : course.modulesEn || course.modules_en) || [];
            const keyTopics = Array.isArray(modules) ? modules.slice(0, 4) : [];

            return (
              <div
                key={course.slug || course.id || `course-${idx}`}
                className="bg-white rounded-xl border border-surface-variant/50 p-6 group relative overflow-hidden cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                onClick={(e) => handleViewDetailsClick(e, course)}
              >
                <div>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Course Image */}
                  {course.image_url || course.imageUrl ? (
                    <div className="w-full h-48 overflow-hidden rounded-lg mb-6 relative bg-slate-100">
                      <img 
                        src={course.image_url || course.imageUrl} 
                        alt={course.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-sm py-xs bg-primary text-white text-label-caps font-label-caps rounded-full shadow-sm">
                        {tag}
                      </span>
                      {(course.logoUrl || course.logo_url) && (
                        <div className="absolute top-3 right-3 bg-white p-1.5 rounded-xl shadow-stitch-md border border-slate-200/90 w-14 h-14 flex items-center justify-center shrink-0">
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
                  ) : (
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center group-hover:scale-105 group-hover:bg-primary transition-all duration-300`}>
                        <span className={`material-symbols-outlined ${iconColor} group-hover:text-white transition-colors duration-300`}>
                          {icon}
                        </span>
                      </div>
                      {(course.logoUrl || course.logo_url) && (
                        <div className="bg-white p-1.5 rounded-xl shadow-stitch-md border border-slate-200/90 w-14 h-14 flex items-center justify-center shrink-0">
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

                  {/* Title */}
                  <h3 className="text-headline-md font-headline-md text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  {/* Duration (only if available) */}
                  {duration && (
                    <div className="flex items-center gap-xs text-xs font-label-bold text-secondary mb-3">
                      <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                      <span>{duration}</span>
                    </div>
                  )}

                  {/* Short Description */}
                  <p className="text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">{desc}</p>

                  {/* Key Topics */}
                  {keyTopics.length > 0 && (
                    <div className="mb-6 pt-3 border-t border-surface-variant/30">
                      <h4 className="text-xs font-label-bold text-text-primary uppercase tracking-wider mb-2">
                        {isMarathi ? 'मुख्य विषय (Key Topics):' : 'Key Topics:'}
                      </h4>
                      <ul className="space-y-1">
                        {keyTopics.map((topic, tidx) => {
                          const topicName = typeof topic === 'string' ? topic : (topic.name || topic.title || '');
                          return (
                            <li key={`topic-${tidx}-${topicName}`} className="text-xs text-secondary flex items-start gap-1.5">
                              <span className="material-symbols-outlined text-[14px] text-stitch-emerald mt-0.5 shrink-0">check_circle</span>
                              <span className="line-clamp-1">{topicName}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-4 border-t border-surface-variant/30 mt-auto">
                  <a
                    href="tel:+919552345061"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-black text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs shrink-0"
                    title="Call Now: +91 95523 45061"
                  >
                    <span className="material-symbols-outlined text-[15px] text-emerald-600">call</span>
                    <span>{isMarathi ? 'कॉल' : 'Call'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => handleViewDetailsClick(e, course)}
                    className="flex-1 bg-white text-text-primary border border-surface-variant font-label-bold text-xs py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{isMarathi ? 'तपशील पहा' : 'View Details'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleEnrollClick(e, course)}
                    className="flex-1 bg-primary text-white font-label-bold text-xs py-2.5 px-3 rounded-xl hover:bg-stitch-red-dark transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>{isMarathi ? 'प्रवेश घ्या' : 'Enroll Now'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View More Courses CTA */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('courses')}
          className="inline-flex items-center gap-2 bg-primary text-white px-xl py-md rounded-xl font-label-bold shadow-md hover:shadow-lg hover:bg-stitch-red-dark transition-all active:scale-95 group btn-interactive"
        >
          <span>{isMarathi ? 'अधिक कोर्सेस पहा (View More Courses)' : 'View More Courses'}</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      <AdmissionModal
        isOpen={isAdmissionOpen}
        onClose={() => setIsAdmissionOpen(false)}
        defaultCourse={selectedCourseSlug || 'mscit'}
        lang={lang}
      />
    </section>
  );
}

