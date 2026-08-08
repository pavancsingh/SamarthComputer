import React from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

/**
 * News Component
 * Admission alerts, MS-CIT exam timetables, and local career news.
 */
export default function News({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const articles = [
    {
      date: "१५ ऑगस्ट २०२६",
      titleMr: "MS-CIT नवीन बॅच प्रवेश खंडाळा केंद्रात सुरू - मर्यादित जागा",
      titleEn: "MS-CIT New Batch Admissions Open in Khandala Center",
      categoryMr: "प्रवेश अपडेट",
      categoryEn: "Admissions",
      descMr: "नवीन बॅच सोमवारपासून सुरू होत आहे. प्रथम येणाऱ्यास प्राधान्य देण्यात येईल."
    },
    {
      date: "२० ऑगस्ट २०२६",
      titleMr: "GCC-TBC टायपिंग परीक्षा हॉल तिकीट व सराव मॉक टेस्ट",
      titleEn: "GCC-TBC Typing Exam Timetable & Mock Test Series",
      categoryMr: "परीक्षा अपडेट",
      categoryEn: "Exam Alerts",
      descMr: "टायपिंग परीक्षेचे वेळापत्रक प्रसिद्ध झाले आहे. लॅबमध्ये सराव चाचण्या सुरू आहेत."
    },
    {
      date: "२५ ऑगस्ट २०२६",
      titleMr: "उत्पन्न दाखला व राजपत्र ऑनलाइन अर्जासाठी आवश्यक कागदपत्रे",
      titleEn: "Documents Checklist for Income Certificate & Gazette 2026",
      categoryMr: "शासकीय सेवा",
      categoryEn: "Govt Portal",
      descMr: "नवीन नियमानुसार उत्पन्नाचा दाखला काढण्यासाठी लागणारी कागदपत्रे तपासा."
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200 mb-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{isMarathi ? 'ताजी बातमी & परीक्षा अपडेट्स' : 'Latest News & Announcements'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'केंद्रातील महत्त्वाच्या सूचना व अपडेट्स' : 'Stay Updated with Admissions & Timetables'}
            </h2>
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-md">
                    {isMarathi ? item.categoryMr : item.categoryEn}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h3 className={`font-bold text-base text-slate-900 group-hover:text-primary transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.titleMr : item.titleEn}
                </h3>

                <p className={`text-xs text-slate-600 leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
                  {item.descMr}
                </p>
              </div>

              <a
                href="#inquiry-form"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-dark pt-3 border-t border-slate-200"
              >
                <span>{isMarathi ? 'सविस्तर वाचा' : 'Read Full Notice'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
