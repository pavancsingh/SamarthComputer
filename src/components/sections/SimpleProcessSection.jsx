import React from 'react';
import { MessageSquare, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * SimpleProcessSection Component
 * Clear 3-step admission/service guidance flow: Enquire → Get Guidance → Start Course/Service.
 */
export default function SimpleProcessSection({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';

  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      titleMr: '१. चौकशी व नोंदणी (Enquire)',
      titleEn: '1. Submit Inquiry',
      descMr: 'वेबसाईटवरून ऑनलाइन अर्ज करा किंवा +91 95523 45061 या क्रमांकावर थेट कॉल करा.',
      descEn: 'Submit your inquiry online or call counselor directly at +91 95523 45061.'
    },
    {
      step: '02',
      icon: Compass,
      titleMr: '२. मोफत समुपदेशन (Get Guidance)',
      titleEn: '2. Free Counseling',
      descMr: 'आमच्या तज्ञांकडून कोर्सेस, बॅचच्या वेळा आणि करिअर संधींबद्दल मोफत मार्गदर्शन मिळवा.',
      descEn: 'Get expert counseling on course selection, batch timings, and career paths.'
    },
    {
      step: '03',
      icon: CheckCircle2,
      titleMr: '३. प्रवेश & सराव सुरू (Start Learning)',
      titleEn: '3. Start Course / Service',
      descMr: '१-ऑन-१ लॅब कॉम्प्युटरवर प्रॅक्टिकल सराव सुरू करा किंवा ऑनलाइन सेवा पूर्ण करून घ्या.',
      descEn: 'Begin hands-on 1-on-1 practical lab training or complete your online service.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/80 border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-black text-xs px-4 py-1.5 rounded-full border border-primary/20">
            {isMarathi ? 'सोपी व पारदर्शक पद्धत' : 'Simple & Transparent Process'}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {isMarathi ? 'प्रवेश व सेवेची सोपी प्रक्रिया' : 'How It Works (3 Easy Steps)'}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            {isMarathi
              ? 'चौकशीपासून ते अभ्यासक्रम पूर्ण होईपर्यंत आमची सोपी आणि विद्यार्थी-स्नेही प्रक्रिया.'
              : 'From your first inquiry to hands-on practical training — quick, easy, and transparent.'}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all relative overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-primary/30 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {isMarathi ? item.titleMr : item.titleEn}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                    {isMarathi ? item.descMr : item.descEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-primary text-xs font-black">
                  <span>{isMarathi ? 'पायरी ' + (idx + 1) : 'Step ' + (idx + 1)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
