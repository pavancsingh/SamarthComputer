import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * CoursesSection (Homepage) — Stitch Design System
 * Displays live Supabase computer courses with hover animation and detail view navigation.
 */

const CATEGORY_ICONS = {
  govt: { icon: 'school', bg: 'bg-stitch-red-light', color: 'text-primary' },
  job: { icon: 'calculate', bg: 'bg-secondary-fixed', color: 'text-on-secondary-fixed-variant' },
  design: { icon: 'design_services', bg: 'bg-tertiary-fixed', color: 'text-on-tertiary-fixed-variant' },
  default: { icon: 'computer', bg: 'bg-stitch-red-light', color: 'text-primary' }
};

export default function CoursesSection({ lang = 'mr', onNavigate }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await CourseRepository.getCourses('all');
        setCourses(data || []);
      } catch (err) {
        console.error('Error loading homepage courses:', err);
      } finally {
        setLoading(false);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      load();
    });
    return unsubscribe;
  }, []);

  const displayCourses = courses.slice(0, 6);

  return (
    <section className="py-2xl relative px-4 md:px-8 max-w-7xl mx-auto" id="courses">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="text-primary font-label-caps tracking-widest uppercase mb-sm block">
          Our Programs
        </span>
        <h2 className="text-headline-lg font-headline-lg text-text-primary mb-md">
          {isMarathi ? 'व्यावसायिक संगणक कोर्सेस' : 'Professional Computer Courses'}
        </h2>
        <p className="text-body-md font-body-md text-secondary max-w-2xl mx-auto">
          {isMarathi
            ? 'उद्योगासाठी तयार अभ्यासक्रम, अनुभवी शिक्षक आणि प्रत्यक्ष प्रयोगशाळा सुविधा.'
            : 'Industry-relevant curriculum designed to make you job-ready. From basic literacy to advanced programming.'}
        </p>
      </div>

      {/* Course Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-secondary font-medium">
          {isMarathi ? 'कोर्सेस लोड होत आहेत...' : 'Loading courses from Supabase...'}
        </div>
      ) : displayCourses.length === 0 ? (
        <div className="text-center py-12 text-secondary font-medium">
          {isMarathi ? 'सध्या कोणतेही कोर्सेस उपलब्ध नाहीत.' : 'No courses available right now.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course, idx) => {
            const iconConfig = CATEGORY_ICONS[course.category] || CATEGORY_ICONS.default;
            const iconBg = iconConfig.bg;
            const iconColor = iconConfig.color;
            const icon = iconConfig.icon;
            const tag = course.tag || (course.category ? course.category.toUpperCase() : 'COURSE');
            
            const desc = isMarathi 
              ? (course.subtitleMr || course.subtitle_mr || course.overviewMr || course.overview_mr || '')
              : (course.subtitleEn || course.subtitle_en || course.overviewEn || course.overview_en || '');

            const duration = isMarathi
              ? (course.durationMr || course.duration_mr || course.durationEn || course.duration_en || '२ महिने')
              : (course.durationEn || course.duration_en || course.durationMr || course.duration_mr || '2 Months');

            return (
              <motion.div
                key={course.id || course.slug || idx}
                className="bg-white rounded-xl border border-surface-variant/50 p-6 group relative overflow-hidden stitch-card-hover cursor-pointer flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onNavigate && onNavigate('courses')}
              >
                <div>
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon or Image */}
                  {course.image_url || course.imageUrl ? (
                    <img 
                      src={course.image_url || course.imageUrl} 
                      alt={course.title} 
                      className="w-full h-40 object-cover rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300`}>
                      <span className={`material-symbols-outlined ${iconColor} group-hover:text-white transition-colors duration-300`}>
                        {icon}
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="inline-block px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant text-label-caps font-label-caps rounded mb-sm">
                    {tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-headline-md font-headline-md text-text-primary mb-sm group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary text-sm mb-md line-clamp-2">{desc}</p>
                </div>

                {/* Footer: Duration + Link */}
                <div className="flex justify-between items-center pt-md border-t border-surface-variant/30 mt-4">
                  <span className="text-sm font-label-bold text-text-primary flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                    {duration}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNavigate && onNavigate('courses'); }}
                    className="text-primary font-label-bold text-sm flex items-center gap-xs group-hover:underline"
                  >
                    View Details
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('courses')}
          className="inline-block bg-white border border-surface-variant text-text-primary px-lg py-md rounded-lg font-label-bold shadow-sm hover:shadow-md transition-all active:scale-95 group btn-interactive"
        >
          <span className="inline-block group-hover:scale-105 transition-transform">
            {isMarathi ? 'सर्व कोर्सेस पहा' : 'View All Courses'}
          </span>
        </button>
      </div>
    </section>
  );
}
