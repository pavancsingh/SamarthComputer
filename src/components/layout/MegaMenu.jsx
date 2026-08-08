import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Shield, ChevronRight, Sparkles, Building2 } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * MegaMenu Component - Google Stitch Design
 * Rich multi-column dynamic dropdown menu for Courses & CSC/Govt Services.
 * Dynamically synchronized with Course & CSC Sections via Supabase & sharedStore.
 */
export default function MegaMenu({ type = 'courses', lang = 'mr', onClose, onNavigate }) {
  const isMarathi = lang === 'mr';
  const [courses, setCourses] = useState([]);
  const [cscServices, setCscServices] = useState([]);
  const [govtServices, setGovtServices] = useState([]);

  useEffect(() => {
    loadMenuData();
    const unsubscribe = sharedStore.subscribe(() => {
      loadMenuData();
    });
    return unsubscribe;
  }, []);

  async function loadMenuData() {
    const cData = await CourseRepository.getCourses('all');
    const cscData = await InquiryRepository.getCSCServices('all');
    const govtData = await InquiryRepository.getGovtServices('all');

    setCourses(cData || []);
    setCscServices(cscData || []);
    setGovtServices(govtData || []);
  }

  const handleItemClick = (view, slug) => {
    if (onClose) onClose();
    if (onNavigate) {
      onNavigate(view, slug);
    }
  };

  if (type === 'courses') {
    // Split courses dynamically across 2 columns
    const half = Math.ceil(courses.length / 2);
    const col1Courses = courses.slice(0, half);
    const col2Courses = courses.slice(half);

    return (
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 w-[860px] bg-white rounded-3xl shadow-stitch-lg border border-slate-200/90 p-6 mt-2 z-50 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 text-left backdrop-blur-2xl"
        onMouseLeave={onClose}
      >
        {/* Column 1: Computer Courses Part 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Award className="w-4 h-4 text-stitch-red shrink-0" />
            <h4 className={`font-extrabold text-stitch-slate-dark text-xs uppercase tracking-wider ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'शासनमान्य कोर्सेस' : 'Govt Recognized Courses'}
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs">
            {col1Courses.map((c) => (
              <li key={c.id || c.slug}>
                <button
                  type="button"
                  onClick={() => handleItemClick('details', c.slug)}
                  className="w-full group flex items-start gap-2.5 p-2 rounded-2xl hover:bg-stitch-red-light transition-colors text-left"
                >
                  <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0 group-hover:text-stitch-red transition-colors" />
                  <div>
                    <div className="font-bold text-slate-800 group-hover:text-stitch-red transition-colors">{c.title}</div>
                    <div className="text-slate-500 text-[11px] line-clamp-1">
                      {isMarathi ? (c.subtitleMr || c.durationMr || c.feeMr) : (c.subtitleEn || c.durationEn || c.feeEn)}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Computer Courses Part 2 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-stitch-indigo shrink-0" />
            <h4 className={`font-extrabold text-stitch-slate-dark text-xs uppercase tracking-wider ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'प्रोफेशनल आयटी कोर्सेस' : 'Professional IT Skills'}
            </h4>
          </div>
          <ul className="space-y-1.5 text-xs">
            {col2Courses.map((c) => (
              <li key={c.id || c.slug}>
                <button
                  type="button"
                  onClick={() => handleItemClick('details', c.slug)}
                  className="w-full group flex items-start gap-2.5 p-2 rounded-2xl hover:bg-slate-100/80 transition-colors text-left"
                >
                  <div className="w-2 h-2 rounded-full bg-stitch-indigo mt-1.5 shrink-0"></div>
                  <div>
                    <div className="font-bold text-slate-800 group-hover:text-stitch-indigo transition-colors">{c.title}</div>
                    <div className="text-slate-500 text-[11px] line-clamp-1">
                      {isMarathi ? (c.subtitleMr || c.durationMr || c.feeMr) : (c.subtitleEn || c.durationEn || c.feeEn)}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Featured Admission Offer Banner */}
        <div className="bg-gradient-to-br from-stitch-slate-dark via-stitch-navy to-slate-900 rounded-3xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-stitch-md border border-slate-700/60">
          <div className="space-y-2 relative z-10">
            <span className="inline-block bg-stitch-amber text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
              {isMarathi ? 'विशेष ऑफर 2026' : 'SPECIAL OFFER 2026'}
            </span>
            <h5 className={`font-extrabold text-base text-white ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'MS-CIT + टॅली कॉम्बो ॲडमिशन' : 'MS-CIT + Tally Combo Admission'}
            </h5>
            <p className="text-slate-300 text-xs leading-relaxed">
              {isMarathi ? 'मोफत स्टडी मटरेल आणि प्रात्यक्षिक लॅब पास सोबत मिळवा.' : 'Get Free Study Material & 1-on-1 Lab Practice Card.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleItemClick('courses')}
            className="mt-4 inline-flex items-center justify-center gap-1.5 bg-stitch-amber hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-2xl transition-all shadow-stitch-sm hover:scale-105"
          >
            <span>{isMarathi ? 'सर्व कोर्सेस पहा' : 'View All Courses'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    );
  }

  // Combined CSC & Govt Services Mega Menu
  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white rounded-3xl shadow-stitch-lg border border-slate-200/90 p-6 mt-2 z-50 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200 text-left backdrop-blur-2xl"
      onMouseLeave={onClose}
    >
      {/* CSC Online Services */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Shield className="w-4 h-4 text-stitch-red shrink-0" />
          <h4 className={`font-extrabold text-stitch-slate-dark text-xs uppercase tracking-wider ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'सीएससी ऑनलाइन सेवा' : 'Popular CSC Online Services'}
          </h4>
        </div>
        <ul className="space-y-1.5 text-xs">
          {cscServices.map((s) => (
            <li key={s.id || s.slug}>
              <button
                type="button"
                onClick={() => handleItemClick('csc')}
                className="w-full text-left p-2.5 rounded-2xl hover:bg-stitch-red-light transition-colors"
              >
                <div className="font-bold text-slate-800 hover:text-stitch-red transition-colors">
                  {isMarathi ? (s.titleMr || s.title_mr) : (s.titleEn || s.title_en || s.titleMr)}
                </div>
                <div className="text-slate-500 text-[11px] line-clamp-1">
                  {isMarathi ? (s.timelineMr || s.badge) : (s.timelineEn || s.badge)}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Govt Revenue Services */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Building2 className="w-4 h-4 text-stitch-emerald shrink-0" />
          <h4 className={`font-extrabold text-stitch-slate-dark text-xs uppercase tracking-wider ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'शासकीय दाखले (तहसीलदार / SDO)' : 'Government Revenue Certificates'}
          </h4>
        </div>
        <ul className="space-y-1.5 text-xs">
          {govtServices.map((g) => (
            <li key={g.id || g.slug}>
              <button
                type="button"
                onClick={() => handleItemClick('csc')}
                className="w-full text-left p-2.5 rounded-2xl hover:bg-emerald-50 transition-colors"
              >
                <div className="font-bold text-slate-800 hover:text-stitch-emerald transition-colors">
                  {isMarathi ? (g.titleMr || g.title_mr) : (g.titleEn || g.title_en || g.titleMr)}
                </div>
                <div className="text-slate-500 text-[11px] line-clamp-1">
                  {isMarathi ? (g.timelineMr || g.badge) : (g.timelineEn || g.badge)}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

