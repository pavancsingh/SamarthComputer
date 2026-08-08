import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket, Sparkles, ArrowRight } from 'lucide-react';
import { AdminRepository } from '../../repositories/AdminRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * WorkshopsSection Component - Google Stitch Design
 * Combined Hub for Free Workshops, Seminars, Center News, and Exam Timetables.
 * Subscribes to live Supabase DB updates.
 */
export default function WorkshopsSection({ lang = 'mr' }) {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function load() {
      try {
        const data = await AdminRepository.getAllNews();
        setNewsArticles(data || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      load();
    });
    return unsubscribe;
  }, []);

  return (
    <section className="py-20 bg-stitch-ivory border-b border-slate-200/80 text-stitch-slate-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200/90 p-8 sm:p-10 rounded-3xl shadow-stitch-md space-y-6"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-stitch-red-light text-stitch-red font-black text-xs px-4 py-1.5 rounded-full border border-stitch-red-border shadow-stitch-sm">
                <Sparkles className="w-4 h-4 text-stitch-red" />
                <span className={isMarathi ? 'marathi-text font-bold' : ''}>
                  {isMarathi ? 'कार्यक्रम व अपडेट्स' : 'Programs & Updates'}
                </span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight leading-tight ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi
                  ? 'कार्यक्रम व अपडेट्स'
                  : 'Programs & Center Updates'}
              </h2>

              <p className={`text-slate-500 text-sm sm:text-base font-medium leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi
                  ? 'मोफत टॅली जीएसटी सेमिनार, AI वर्कशॉप्स, MS-CIT परीक्षा वेळापत्रक आणि प्रवेश सूचना एकाच ठिकाणी पाहा.'
                  : 'Stay ahead with free skill workshops, expert tech seminars, exam timetables, and official center announcements.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {[
                { id: 'all', labelMr: 'सर्व अपडेट्स', labelEn: 'All Updates' },
                { id: 'admissions', labelMr: 'प्रवेश सूचना', labelEn: 'Admissions' },
                { id: 'exams', labelMr: 'परीक्षा वेळापत्रक', labelEn: 'Exams & Results' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm border ${
                    activeFilter === tab.id
                      ? 'bg-stitch-red text-white border-stitch-red shadow-stitch-glow'
                      : 'bg-white text-stitch-slate-dark hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className={isMarathi ? 'marathi-text' : ''}>
                    {isMarathi ? tab.labelMr : tab.labelEn}
                  </span>
                </button>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Cards Grid */}
        {newsArticles.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium">
            {isMarathi ? 'सध्या कोणत्याही नवीन सूचना उपलब्ध नाहीत.' : 'No current updates available.'}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {newsArticles.map((item, idx) => {
              const categoryName = isMarathi 
                ? (item.categoryMr || item.category_mr || 'अपडेट') 
                : (item.categoryEn || item.category_en || 'Update');

              const title = isMarathi
                ? (item.titleMr || item.title_mr || item.titleEn || item.title_en)
                : (item.titleEn || item.title_en || item.titleMr || item.title_mr);

              const desc = isMarathi
                ? (item.descMr || item.desc_mr || item.descEn || item.desc_en)
                : (item.descEn || item.desc_en || item.descMr || item.desc_mr);

              const dateDisplay = item.dateStr || item.date_str || '2026';

              return (
                <motion.div
                  key={item.id || idx}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-stitch-md hover:shadow-stitch-lg transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase border bg-stitch-red-light text-stitch-red border-stitch-red-border">
                        {categoryName}
                      </span>

                      <span className="text-xs text-slate-500 font-mono font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stitch-red" />
                        <span>{dateDisplay}</span>
                      </span>
                    </div>

                    <h3 className={`font-black text-base text-stitch-slate-dark group-hover:text-stitch-red transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                      {title}
                    </h3>

                    <p className={`text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100 ${isMarathi ? 'marathi-text' : ''}`}>
                      {desc}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href="#inquiry-form"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-stitch-red hover:text-stitch-red-dark transition-colors"
                    >
                      <span>{isMarathi ? 'सविस्तर माहिती / चौकशी करा' : 'Inquire Now'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
