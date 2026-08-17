import React, { useState, useEffect } from 'react';
import { sharedStore } from '../../repositories/sharedStore';
import { ArrowRight, Award, ShieldCheck } from 'lucide-react';

/**
 * HomeAboutSection Component
 * Concise homepage introduction for Samarth Computers using Admin siteSettings data.
 */
export default function HomeAboutSection({ lang = 'mr', onNavigate, embedded = false }) {
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  const heading = isMarathi
    ? (settings.aboutHeadingMr || 'खंडाळ्यात संगणक शिक्षण आणि डिजिटल सेवांसाठी आपले केंद्र')
    : (settings.aboutHeadingEn || 'Your Centre for Computer Education and Digital Services in Khandala');

  const desc = isMarathi
    ? (settings.aboutDescMr || 'समर्थ कॉम्प्युटर्स खंडाळा येथे MS-CIT, टॅली प्राइम, ॲडव्हान्स एक्सेल आणि इतर संगणक अभ्यासक्रमांसह CSC व ऑनलाइन शासकीय सेवा उपलब्ध आहेत. विद्यार्थ्यांना प्रात्यक्षिक सराव आणि मार्गदर्शन दिले जाते.')
    : (settings.aboutDescEn || 'Samarth Computers, Khandala offers MS-CIT, Tally Prime, Advanced Excel, and other computer courses alongside CSC and online government services, with practical lab work and guidance for learners.');

  const imgUrl = settings.aboutImageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80';

  const content = (
    <div className={embedded ? 'pb-6' : 'py-16 md:py-24 bg-white border-b border-slate-200/60'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Image Visual */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 p-2.5">
              <img
                src={imgUrl}
                alt="About Samarth Computers Institute"
                className="w-full h-auto rounded-2xl object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-5 -right-2 sm:right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-lg border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg">
                15+
              </div>
              <div className="text-xs font-bold leading-tight">
                <span>{isMarathi ? 'वर्षे शिक्षणाची परंपरा' : 'Years Educational Experience'}</span>
                <span className="block text-slate-400 text-[10px]">(2010 - 2026)</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-rose-50 text-primary font-black text-xs px-4 py-1.5 rounded-full border border-rose-200">
              <Award className="w-4 h-4 text-primary" />
              <span>{isMarathi ? 'संस्थेविषयी परिचय' : 'About Samarth Computers'}</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight ${isMarathi ? 'marathi-heading' : ''}`}>
              {heading}
            </h2>

            <p className={`text-slate-600 text-sm sm:text-base font-medium leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
              {desc}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-extrabold text-slate-800">
                  {isMarathi ? 'MKCL ALC: 13210399 / 13210273' : 'MKCL ALC: 13210399 / 13210273'}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-extrabold text-slate-800">
                  {isMarathi ? 'CSC डिजिटल सेवा केंद्र' : 'CSC Digital Seva'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('about')}
                className="inline-flex items-center gap-2 bg-primary hover:bg-stitch-red-dark text-white px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 group"
              >
                <span>{isMarathi ? 'संस्थेविषयी अधिक जाणून घ्या' : 'Learn More About Samarth Computers'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );

  return embedded ? content : <section className="relative">{content}</section>;
}
