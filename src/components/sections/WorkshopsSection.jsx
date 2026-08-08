import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket, Sparkles, ArrowRight } from 'lucide-react';

/**
 * WorkshopsSection Component - Google Stitch Design
 * Combined Hub for Free Workshops, Seminars, Center News, and Exam Timetables.
 */
export default function WorkshopsSection({ lang = 'mr' }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const isMarathi = lang === 'mr';

  const workshops = [
    {
      type: 'workshop',
      date: "20 AUG 2026",
      titleMr: "मोफत टॅली प्राइम & GST फायलिंग सेमिनार",
      titleEn: "Free Tally Prime & GST Filing Seminar",
      speakerMr: "सी.ए. मार्गदर्शक & टॅली एक्स्पर्ट",
      speakerEn: "Chartered Accountant & Tally Expert",
      time: "11:00 AM - 01:00 PM",
      seatsLeft: 8,
      categoryMr: "मोफत सेमिनार",
      categoryEn: "Free Seminar"
    },
    {
      type: 'workshop',
      date: "28 AUG 2026",
      titleMr: "विद्यार्थ्यांसाठी AI & सायबर सिक्युरिटी कार्यशाळा",
      titleEn: "AI & Cyber Security Workshop for Students",
      speakerMr: "सिनियर आयटी इंजिनिअर",
      speakerEn: "Senior IT Engineer",
      time: "02:00 PM - 04:00 PM",
      seatsLeft: 12,
      categoryMr: "आयटी वर्कशॉप",
      categoryEn: "IT Workshop"
    }
  ];

  const newsArticles = [
    {
      type: 'news',
      date: "15 AUG 2026",
      titleMr: "MS-CIT नवीन बॅच प्रवेश खंडाळा केंद्रात सुरू - मर्यादित जागा",
      titleEn: "MS-CIT New Batch Admissions Open in Khandala Center",
      categoryMr: "प्रवेश अपडेट",
      categoryEn: "Admissions",
      descMr: "नवीन बॅच सोमवारपासून सुरू होत आहे. प्रथम येणाऱ्यास प्राधान्य देण्यात येईल.",
      descEn: "New batch starting this Monday. Limited seats available on first-come-first-serve basis."
    },
    {
      type: 'news',
      date: "20 AUG 2026",
      titleMr: "GCC-TBC टायपिंग परीक्षा हॉल तिकीट व सराव मॉक टेस्ट",
      titleEn: "GCC-TBC Typing Exam Timetable & Mock Test Series",
      categoryMr: "परीक्षा अपडेट",
      categoryEn: "Exam Alerts",
      descMr: "टायपिंग परीक्षेचे वेळापत्रक प्रसिद्ध झाले आहे. लॅबमध्ये सराव चाचण्या सुरू आहेत.",
      descEn: "Typing exam schedule published. Practice mock tests ongoing in computer lab."
    },
    {
      type: 'news',
      date: "25 AUG 2026",
      titleMr: "उत्पन्न दाखला व राजपत्र ऑनलाइन अर्जासाठी आवश्यक कागदपत्रे",
      titleEn: "Documents Checklist for Income Certificate & Gazette 2026",
      categoryMr: "शासकीय सेवा",
      categoryEn: "Govt Portal",
      descMr: "नवीन नियमानुसार उत्पन्नाचा दाखला काढण्यासाठी लागणारी कागदपत्रे तपासा.",
      descEn: "Check latest documents required for Tehsildar Income Certificate application."
    }
  ];

  const allMedia = [...workshops, ...newsArticles];

  const filteredItems = allMedia.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'workshops') return item.type === 'workshop';
    if (activeFilter === 'news') return item.type === 'news';
    return true;
  });

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
                { id: 'workshops', labelMr: 'मोफत वर्कशॉप्स', labelEn: 'Free Workshops' },
                { id: 'news', labelMr: 'ताजी बातमी & सूचना', labelEn: 'News & Alerts' }
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
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, idx) => {
            const isWorkshop = item.type === 'workshop';
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200/90 p-6 rounded-3xl shadow-stitch-md hover:shadow-stitch-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${
                      isWorkshop
                        ? 'bg-stitch-red-light text-stitch-red border-stitch-red-border'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {isWorkshop 
                        ? (isMarathi ? item.categoryMr : item.categoryEn) 
                        : (isMarathi ? item.categoryMr : item.categoryEn)}
                    </span>

                    <span className="text-xs text-slate-500 font-mono font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stitch-red" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className={`font-black text-base text-stitch-slate-dark group-hover:text-stitch-red transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? item.titleMr : item.titleEn}
                  </h3>

                  {isWorkshop ? (
                    <div className="space-y-1.5 pt-2 text-xs text-slate-500 font-medium border-t border-slate-100">
                      <div>👨‍🏫 <span className="font-bold text-stitch-slate-dark">{isMarathi ? item.speakerMr : item.speakerEn}</span></div>
                      <div>⏰ <span className="font-mono text-slate-500">{item.time}</span></div>
                      <div className="text-stitch-red font-extrabold text-[11px]">
                        🔥 {isMarathi ? `फक्त ${item.seatsLeft} मोफत सीट्स शिल्लक` : `Only ${item.seatsLeft} Free Seats Left`}
                      </div>
                    </div>
                  ) : (
                    <p className={`text-xs text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100 ${isMarathi ? 'marathi-text' : ''}`}>
                      {isMarathi ? item.descMr : item.descEn}
                    </p>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-100">
                  {isWorkshop ? (
                    <a
                      href="#inquiry-form"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-black text-xs py-3 rounded-2xl shadow-stitch-sm transition-all"
                    >
                      <Ticket className="w-4 h-4 text-red-200" />
                      <span>{isMarathi ? 'मोफत तिकीट बुक करा' : 'Register Free Spot'}</span>
                    </a>
                  ) : (
                    <a
                      href="#inquiry-form"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-stitch-red hover:text-stitch-red-dark transition-colors"
                    >
                      <span>{isMarathi ? 'सविस्तर सूचना पाहा' : 'Read Full Notice'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}



