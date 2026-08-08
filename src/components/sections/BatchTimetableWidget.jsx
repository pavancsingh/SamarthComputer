import React, { useState, useEffect } from 'react';
import { Clock, CalendarCheck } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';
import { AdminRepository } from '../../repositories/AdminRepository';

/**
 * BatchTimetableWidget Component - Google Stitch Design
 * Interactive daily timetable schedule showing morning, afternoon, and evening batch timings.
 * Subscribes dynamically to sharedStore & AdminRepository for live updates.
 */
export default function BatchTimetableWidget({ lang = 'mr' }) {
  const [activeTab, setActiveTab] = useState('morning');
  const [batchList, setBatchList] = useState(sharedStore.getBatches());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    AdminRepository.getAllBatches().then((res) => {
      if (res && res.length > 0) setBatchList(res);
    });

    const unsubscribe = sharedStore.subscribe(() => {
      setBatchList(sharedStore.getBatches());
    });
    return unsubscribe;
  }, []);

  const activeBatches = batchList.filter((b) => b.category === activeTab);

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-stitch-amber font-extrabold text-xs px-4 py-1.5 rounded-full border border-amber-200 shadow-stitch-sm">
            <Clock className="w-3.5 h-3.5 text-stitch-amber" />
            <span className={isMarathi ? 'marathi-text' : ''}>
              {isMarathi ? 'दैनिक बॅच वेळापत्रक 2026' : 'Daily Batch Timetable 2026'}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'तुमच्या वेळेनुसार बॅच निवडा' : 'Choose a Batch Suiting Your Schedule'}
          </h2>

          <p className={`text-sm text-slate-500 font-medium ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'सकाळ, दुपार आणि संध्याकाळच्या बॅचेस उपलब्ध. सोयीनुसार वेळ निवडून जागा निश्चित करा.'
              : 'Flexible Morning, Afternoon & Evening batches available for students, workers, and professionals.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100/90 p-1.5 rounded-full flex items-center gap-1.5 border border-slate-200 shadow-stitch-sm">
            <button
              type="button"
              onClick={() => setActiveTab('morning')}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'morning'
                  ? 'bg-stitch-red text-white shadow-stitch-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isMarathi ? '🌅 सकाळच्या बॅचेस' : '🌅 Morning Batches'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('afternoon')}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'afternoon'
                  ? 'bg-stitch-red text-white shadow-stitch-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isMarathi ? '☀️ दुपारच्या बॅचेस' : '☀️ Afternoon Batches'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('evening')}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'evening'
                  ? 'bg-stitch-red text-white shadow-stitch-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isMarathi ? '🌙 संध्याकाळच्या बॅचेस' : '🌙 Evening Batches'}
            </button>
          </div>
        </div>

        {/* Batch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeBatches.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-slate-500 font-semibold text-xs">
              {isMarathi ? 'या वेळेत सध्या कोणतीही नवीन बॅच उपलब्ध नाही.' : 'No active batches currently listed for this time slot.'}
            </div>
          ) : (
            activeBatches.map((item, idx) => {
              return (
                <div 
                  key={item.id || idx} 
                  className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 hover:bg-white hover:shadow-stitch-md transition-all border-l-4 border-l-stitch-amber flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-white border border-slate-200 text-stitch-slate-dark font-extrabold text-xs px-3 py-1 rounded-xl shadow-stitch-sm">
                        {item.time}
                      </span>
                      <span className="text-[10px] font-extrabold text-stitch-red bg-stitch-red-light border border-stitch-red-border px-2.5 py-0.5 rounded-full">
                        {isMarathi ? (item.seatsMr || item.statusMr || 'प्रवेश सुरू') : (item.seatsEn || item.statusEn || 'Admission Open')}
                      </span>
                    </div>

                    <h3 className="font-black text-lg text-stitch-slate-dark mb-2">
                      {isMarathi ? (item.courseMr || item.courseEn) : (item.courseEn || item.courseMr)}
                    </h3>
                  </div>

                  <a
                    href="#inquiry-form"
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-white hover:bg-stitch-slate-dark text-stitch-slate-dark hover:text-white font-extrabold text-xs py-3 rounded-2xl border border-slate-300 shadow-stitch-sm transition-all"
                  >
                    <CalendarCheck className="w-4 h-4 text-stitch-amber" />
                    <span>{isMarathi ? 'ही वेळ आरक्षित करा' : 'Reserve This Batch'}</span>
                  </a>
                </div>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}

