import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket, Eye, Award, ShieldCheck, Lightbulb, Users,
  CheckCircle2, Building2, Sparkles, Clock, ArrowRight,
  Phone, GraduationCap, Star, Shield, HeartHandshake,
  Target, MapPin
} from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * AboutPage — Samarth Computers Khandala
 * Premium Institute Overview with fixed timeline alignment, Lucide icons, stats, mission/vision bento, and CTA.
 */

const CORE_VALUES = [
  {
    icon: Award,
    titleEn: 'Excellence in Training',
    titleMr: 'उत्कृष्ट शिक्षण',
    descEn: 'Commitment to high-quality practical computer education with updated course syllabus.',
    descMr: 'अद्ययावत अभ्यासक्रमासह उच्च-दर्जाच्या प्रात्यक्षिक संगणक शिक्षणाची हमी.'
  },
  {
    icon: ShieldCheck,
    titleEn: '100% Transparency',
    titleMr: 'पूर्ण प्रामाणिकता',
    descEn: 'Honest guidance, clear fee structure, and government recognized certification.',
    descMr: 'प्रामाणिक मार्गदर्शन, स्पष्ट फी रचना आणि शासकीय मान्यताप्राप्त प्रमाणपत्रे.'
  },
  {
    icon: Lightbulb,
    titleEn: 'Modern Innovation',
    titleMr: 'नावीन्यपूर्ण पद्धती',
    descEn: 'Incorporating AI tools, real-world accounting software, and practical work.',
    descMr: 'AI टूल, प्रत्यक्ष टॅली व कॉम्प्युटर सॉफ्टवेअरचा सराव.'
  },
  {
    icon: HeartHandshake,
    titleEn: 'Student First Policy',
    titleMr: 'विद्यार्थी-केंद्रित धोरण',
    descEn: '1-on-1 personal guidance, flexible batch timings, and career counseling.',
    descMr: 'वैयक्तिक मार्गदर्शन, लवचिक बॅच वेळ आणि करिअर समुपदेशन.'
  }
];

const TIMELINE = [
  {
    year: '2010',
    titleEn: 'Institute Foundation',
    titleMr: 'संस्थेची स्थापना',
    descEn: 'Samarth Computers was established in Khandala with a mission to spread digital literacy and basic computer education.',
    descMr: 'ग्रामीण भागातील विद्यार्थ्यांना संगणक साक्षर बनवण्याच्या ध्येयाने खंडाळा येथे समर्थ कॉम्प्युटर्सची स्थापना.'
  },
  {
    year: '2015',
    titleEn: 'MKCL & CSC Authorization',
    titleMr: 'MKCL व CSC अधिकृतता',
    descEn: 'Achieved official MKCL ALC status for MS-CIT courses and launched online government service operations.',
    descMr: 'MS-CIT साठी अधिकृत MKCL केंद्र व शासकीय सेतू/CSC केंद्र म्हणून मान्यता प्राप्त केली.'
  },
  {
    year: '2020',
    titleEn: 'Advanced Course Expansion',
    titleMr: 'प्रगत अभ्यासक्रम विस्तार',
    descEn: 'Introduced Tally Prime GST, Advanced Excel, DTP Graphic Design, and MKCL KLiC career diploma programs.',
    descMr: 'टॅली प्राइम GST, ॲडव्हान्स एक्सल, DTP डिझायनिंग व KLiC करिअर कोर्सेसचा समावेश.'
  },
  {
    year: 'PRESENT',
    titleEn: 'Leading IT Education Center',
    titleMr: 'अग्रगण्य डिजिटल संस्था',
    descEn: 'Empowered over 10,000+ students and citizens with 20+ courses and instant online government services.',
    descMr: '१०,००० हून अधिक विद्यार्थ्यांना संगणक प्रशिक्षित करून आत्मनिर्भर बनवले.'
  }
];

const STATS = [
  { value: '15+', labelEn: 'Years Experience', labelMr: 'वर्षे अनुभव', icon: Clock },
  { value: '10,000+', labelEn: 'Students Trained', labelMr: 'प्रशिक्षित विद्यार्थी', icon: GraduationCap },
  { value: '20+', labelEn: 'Certified Courses', labelMr: 'प्रमाणित अभ्यासक्रम', icon: Award },
  { value: '100%', labelEn: 'Govt & MKCL Recognized', labelMr: 'शासकीय मान्यता', icon: ShieldCheck }
];

export default function AboutPage({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());

  useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  return (
    <div className="bg-slate-50/70 min-h-screen relative overflow-x-hidden pb-20 md:pb-12">
      {/* Background Orbs */}
      <div className="ambient-glow glow-orb-red w-[500px] h-[500px] top-[-150px] left-[-150px]" />
      <div className="ambient-glow glow-orb-slate w-[400px] h-[400px] top-[40%] right-[-100px]" style={{ opacity: 0.08 }} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-14 space-y-16 md:space-y-24">

        {/* ── 1. Hero Section ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            className="lg:col-span-7 space-y-5 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-primary text-xs font-black shadow-xs">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{isMarathi ? 'समर्थ कॉम्प्युटर्स खंडाळा' : 'Samarth Computers Khandala'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {isMarathi ? (
                <>{settings.aboutHeadingMr || '२०१० पासून खंडाळ्यात संगणक शिक्षणाची गुणवत्ता आणि विश्वास'}</>
              ) : (
                <>{settings.aboutHeadingEn || '15+ Years of Educational Excellence in Khandala'}</>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isMarathi
                ? (settings.aboutDescMr || 'समर्थ कॉम्प्युटर्स खंडाळा हे MKCL मान्यताप्राप्त अग्रगण्य संगणक प्रशिक्षण आणि सीएससी शासकीय सेवा केंद्र आहे. २०१० पासून आम्ही १०,००० हून अधिक विद्यार्थ्यांना व्यावहारिक संगणक कौशल्ये आणि प्रात्यक्षिक ज्ञान देवून सक्षम केले आहे.')
                : (settings.aboutDescEn || 'Samarth Computers is Khandala’s trusted MKCL-authorized training institute and CSC center. Since 2010, we have empowered over 10,000+ students with practical computer skills, industry certifications, and fast-track digital government services.')}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('courses')}
                className="bg-primary hover:bg-stitch-red-dark text-white font-black text-sm px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
              >
                <span>{isMarathi ? 'कोर्सेस पहा' : 'Explore Courses'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-black text-sm px-6 py-3.5 rounded-2xl shadow-xs transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{isMarathi ? 'केंद्राला भेट द्या' : 'Visit Center'}</span>
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-4/3 bg-slate-100 group">
              <img
                src={settings.aboutImageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80'}
                alt="Samarth Computers Institute"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="bg-primary/90 text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-1.5 inline-block">
                  {isMarathi ? 'अधिकृत संस्था' : 'MKCL Authorized'}
                </span>
                <p className="font-extrabold text-sm sm:text-base leading-snug">
                  {isMarathi ? 'राजेंद्र विद्यालयाजवळ, खंडाळा' : 'Near Rajendra Vidhalya, Khandala'}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── 2. Institute Highlights / Stats Bar ── */}
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-slate-100">
            {STATS.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="p-3 flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-primary flex items-center justify-center shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    {isMarathi ? stat.labelMr : stat.labelEn}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 3. Mission & Vision Bento Grid ── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-primary font-black text-xs tracking-widest uppercase block">
              {isMarathi ? 'उद्दिष्ट व दृष्टी' : 'Our Purpose'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isMarathi ? 'ध्येय आणि दृष्टी' : 'Mission & Vision'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <motion.div
              className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-rose-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-md">
                  <Rocket className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {isMarathi ? 'आमचे ध्येय (Mission)' : 'Our Mission'}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                  {isMarathi
                    ? (settings.aboutMissionMr || 'ग्रामीण भागातील विद्यार्थ्यांना परवडणारे, उच्च-दर्जाचे तांत्रिक व व्यावसायिक संगणक शिक्षण देवून त्यांना रोजगारक्षम व आत्मनिर्भर बनवणे.')
                    : (settings.aboutMissionEn || 'To deliver practical, high-quality IT education that empowers rural youth with industry-relevant digital skills, confidence, and career growth.')}
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              whileHover={{ y: -4 }}
            >
              <div className="absolute bottom-0 right-0 w-44 h-44 bg-slate-800/60 rounded-tl-full -mr-10 -mb-10 transition-transform group-hover:scale-110 duration-500 pointer-events-none" />
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 bg-white/10 text-rose-400 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-md">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  {isMarathi ? 'आमची दृष्टी (Vision)' : 'Our Vision'}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
                  {isMarathi
                    ? (settings.aboutVisionMr || 'डिजिटल तंत्रज्ञान, टॅली व कॉम्प्युटर शिक्षणातील नावीन्यपूर्ण प्रात्यक्षिक प्रशिक्षण पद्धतींनी खंडाळा तालुक्यातील सर्वात विश्वासू संस्था बनणे.')
                    : (settings.aboutVisionEn || 'To remain Khandala’s most trusted center for technical education and online government services, empowering every student with career-ready IT capabilities.')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4. Core Values ── */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-primary font-black text-xs tracking-widest uppercase block">
              {isMarathi ? 'नैतिकता व तत्त्वे' : 'Our Principles'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isMarathi ? 'मूलभूत मूल्ये (Core Values)' : 'Core Values'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-primary flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-lg text-slate-900">
                      {isMarathi ? val.titleMr : val.titleEn}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                      {isMarathi ? val.descMr : val.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 5. History Timeline ("Our Journey") — FIXED PERFECT ALTERNATING LAYOUT ── */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-primary font-black text-xs tracking-widest uppercase block">
              {isMarathi ? 'प्रगतीचा प्रवास' : 'Milestones'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {isMarathi ? 'आमचा प्रवास (Our Journey)' : 'Our Journey'}
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto px-4">
            {/* Central Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Center Node Dot */}
                    <div className="absolute left-6 md:left-1/2 top-5 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10 -translate-x-1/2" />

                    {/* Content Card */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-2">
                        <span className="bg-rose-50 text-primary border border-rose-200/80 font-black text-xs px-3 py-1 rounded-full inline-block">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900">
                          {isMarathi ? item.titleMr : item.titleEn}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                          {isMarathi ? item.descMr : item.descEn}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. High-Converting CTA Banner ── */}
        <section className="pb-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl border border-slate-800">
            <div className="max-w-2xl text-center md:text-left space-y-3">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {isMarathi ? 'करिअरला उंचावण्यासाठी आजच प्रवेश घ्या!' : 'Transform Your Future Today'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                {isMarathi
                  ? 'MS-CIT, टॅली प्राइम, ॲडव्हान्स एक्सल आणि करिअर कोर्सेसमध्ये प्रवेश घेऊन तुमचे भवितव्य उज्ज्वल करा.'
                  : 'Join 10,000+ successful alumni. Book a free career counseling session or visit our institute today.'}
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="bg-primary hover:bg-stitch-red-dark text-white font-black text-xs sm:text-sm px-6 py-4 rounded-2xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>{isMarathi ? 'संपर्क साधा' : 'Contact Center'}</span>
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
