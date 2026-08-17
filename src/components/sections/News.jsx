import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';
import { AdminRepository } from '../../repositories/AdminRepository';

/**
 * News Component
 * Admission alerts, MS-CIT exam timetables, and local career news.
 * Dynamic subscription to sharedStore & AdminRepository.
 */
export default function News({ lang = 'mr' }) {
  const [articles, setArticles] = useState(sharedStore.getNews());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    AdminRepository.getAllNews().then((res) => {
      if (res && res.length > 0) setArticles(res);
    });

    const unsubscribe = sharedStore.subscribe(() => {
      setArticles(sharedStore.getNews());
    });
    return unsubscribe;
  }, []);

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 mb-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span className={isMarathi ? 'marathi-text' : ''}>{isMarathi ? 'महत्त्वाच्या सूचना व परीक्षा अपडेट्स' : 'Latest News & Announcements'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 ${isMarathi ? 'marathi-heading leading-[1.3]' : ''}`}>
              {isMarathi ? 'प्रवेश सूचना व परीक्षा वेळापत्रक' : 'Stay Updated with Admissions & Timetables'}
            </h2>
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {articles.map((item, idx) => (
            <div 
              key={item.id || idx}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-md transition-all h-full flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className={`bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-md ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? (item.categoryMr || item.categoryEn) : (item.categoryEn || item.categoryMr)}
                  </span>
                  <span className={isMarathi ? 'marathi-text' : ''}>{item.dateStr || '२०२६'}</span>
                </div>

                <h3 className={`font-bold text-base text-slate-900 group-hover:text-primary transition-colors ${isMarathi ? 'marathi-heading leading-[1.3]' : ''}`}>
                  {isMarathi ? (item.titleMr || item.titleEn) : (item.titleEn || item.titleMr)}
                </h3>

                <p className={`text-xs text-slate-600 ${isMarathi ? 'marathi-text leading-[1.7]' : 'leading-relaxed'}`}>
                  {isMarathi ? (item.descMr || item.descEn) : (item.descEn || item.descMr)}
                </p>
              </div>

              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-dark pt-3 border-t border-slate-200"
              >
                <span className={isMarathi ? 'marathi-text font-bold' : ''}>{isMarathi ? 'सविस्तर वाचा' : 'Read Full Notice'}</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
