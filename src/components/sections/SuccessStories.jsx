import React from 'react';
import { Quote, Award, CheckCircle2 } from 'lucide-react';
import Reviews from './Reviews';

/**
 * SuccessStories Component - Google Stitch Design
 * Combined student outcome cards and Google reviews.
 */
export default function SuccessStories({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const stories = [
    {
      name: "पूजा सूर्यवंशी (Pooja Suryavanshi)",
      courseMr: "Tally Prime + GST Advanced",
      courseEn: "Tally Prime + GST Advanced",
      outcomeMr: "शिरवळ MIDC मध्ये अकाउंटंट नोकरी (₹१८,००० पगार)",
      outcomeEn: "Accountant Job in Shirwal MIDC (₹18,000 Salary)",
      quoteMr: "समर्थ कॉम्प्युटर्समधील प्रॅक्टिकल टॅली शिक्षणामुळे मला शिरवळ मधील कंपनीत पहिल्याच मुलाखतीत नोकरी मिळाली.",
      quoteEn: "The practical Tally invoices training helped me crack my first interview at Shirwal MIDC seamlessly.",
      badge: "शिरवळ MIDC प्लेसमेंट"
    },
    {
      name: "रोहन कदम (Rohan Kadam)",
      courseMr: "MS-CIT (MKCL Certified)",
      courseEn: "MS-CIT (MKCL Certified)",
      outcomeMr: "MS-CIT परीक्षेत ९६% गुण & सरकारी लिपिक परीक्षा पात्र",
      outcomeEn: "96% Marks in MS-CIT & Govt Clerk Exam Cleared",
      quoteMr: "ERA लर्निंग ॲपवरील सराव आणि शिक्षकांचे मार्गदर्शन यामुळे मला ९६% गुण मिळाले.",
      quoteEn: "ERA App mock exams and 1-on-1 teacher support enabled me to score 96% in final MS-CIT online exam.",
      badge: "९६% गुण टॉपर"
    },
    {
      name: "अमित पवार (Amit Pawar)",
      courseMr: "GCC-TBC Typing 40 wpm",
      courseEn: "GCC-TBC Typing 40 wpm",
      outcomeMr: "स्वतःचे इंटरनेट कॅफे व सीएससी सेंटर सुरू केले",
      outcomeEn: "Launched Own Internet Cafe & CSC Center",
      quoteMr: "टायपिंग आणि सीएससी ट्रेनिंग पूर्ण करून मी स्वतःचा व्यवसाय सुरू केला.",
      quoteEn: "After typing and CSC portal training, I opened my own profitable digital center in Lonand.",
      badge: "यशस्वी व्यावसायिक"
    }
  ];

  return (
    <section className="py-20 bg-stitch-ivory border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-stitch-emerald font-bold text-xs px-4 py-1.5 rounded-full border border-emerald-200 shadow-xs">
            <Award className="w-4 h-4 text-stitch-emerald" />
            <span className={isMarathi ? 'marathi-text' : ''}>{isMarathi ? 'विद्यार्थी यशोगाथा व अभिप्राय' : 'Student Success Stories & Reviews'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stitch-slate-dark ${isMarathi ? 'marathi-heading leading-[1.3] md:leading-[1.25]' : 'tracking-tight'}`}>
            {isMarathi ? 'विद्यार्थ्यांचे यश हीच आमची खरी ओळख' : 'Real Transformations & Local Career Success'}
          </h2>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {stories.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between group hover:-translate-y-0.5 relative"
            >
              <Quote className="w-10 h-10 text-slate-100 absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <span className={`inline-block bg-stitch-red-light text-stitch-red border border-stitch-red-border text-[10px] font-bold px-3 py-1 rounded-full uppercase ${isMarathi ? 'marathi-text' : ''}`}>
                  {item.badge}
                </span>

                <p className={`text-xs text-slate-600 italic font-medium ${isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}`}>
                  "{isMarathi ? item.quoteMr : item.quoteEn}"
                </p>

                <div className="bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-2xl flex items-start gap-2.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-stitch-emerald shrink-0 mt-0.5" />
                  <span className={`text-[11px] font-bold text-emerald-950 ${isMarathi ? 'marathi-text leading-[1.6]' : ''}`}>
                    {isMarathi ? item.outcomeMr : item.outcomeEn}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between">
                <div>
                  <div className={`font-bold text-sm text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>{item.name}</div>
                  <div className={`text-[11px] text-slate-500 font-semibold ${isMarathi ? 'marathi-text' : ''}`}>{isMarathi ? item.courseMr : item.courseEn}</div>
                </div>

                <div className="w-9 h-9 rounded-2xl bg-stitch-red-light border border-stitch-red-border flex items-center justify-center text-stitch-red shadow-xs shrink-0">
                  <Award className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews stay on the page as part of the student-success section. */}
        <Reviews lang={lang} embedded />

      </div>
    </section>
  );
}
