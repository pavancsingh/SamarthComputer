import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Award, GraduationCap, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * HeroSection Component - Stitch Design System
 * Master IT Skills. Build Your Future.
 * Handcrafted Stitch Hero Banner with glass panels and responsive badges.
 */
export default function HeroSection({ lang = 'mr' }) {
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    const unsubscribe = sharedStore.subscribe(() => {
      setSettings(sharedStore.getSiteSettings());
    });
    return unsubscribe;
  }, []);

  return (
    <section className="relative pt-8 pb-16 md:pt-20 md:pb-28 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto" id="home">
      {/* Ambient Radial Orbs */}
      <div className="absolute top-0 -left-20 w-[600px] h-[600px] bg-gradient-radial from-red-500/10 to-transparent rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline & CTAs */}
        <div className="lg:col-span-6 z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stitch-red-light border border-stitch-red-border text-stitch-red font-bold text-xs shadow-stitch-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-stitch-emerald animate-pulse"></span>
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-extrabold uppercase tracking-wider'}>
              {isMarathi ? 'महाराष्ट्र शासन व MKCL अधिकृत केंद्र' : 'Govt. Recognized MKCL Center'}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-stitch-slate-dark leading-[1.15] tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? (
              <>
                संगणक कौशल्यांमध्ये आत्मसात करा प्रभुत्व! <br />
                <span className="text-stitch-red">घडवा तुमचे उज्वल भविष्य.</span>
              </>
            ) : (
              <>
                Master IT Skills. <br />
                <span className="text-stitch-red">Build Your Future.</span>
              </>
            )}
          </h1>

          <p className={`text-base sm:text-lg text-slate-600 font-medium leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'समर्थ कॉम्प्युटर्स मध्ये आपले स्वागत आहे. MS-CIT, Tally Prime, Advanced EXCEL आणि MKCL KLiC कोर्सेस शिकून मिळवा AI पॉवर्ड प्रॅक्टिकल ज्ञान.'
              : 'Join thousands of successful students who have transformed their careers with our industry-aligned computer courses. Expert faculty, hands-on labs, and placement assistance.'}
          </p>

          <div className={`p-4 bg-slate-50 border-l-4 border-stitch-red rounded-r-2xl text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? '📍 राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा — मोफत मार्गदर्शन व लॅब पास उपलब्ध!'
              : '📍 Near Rajendra Vidhalya, Khandala — Free Career Counseling & Computer Lab Practice Pass Available!'}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="#courses"
              className="bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-900 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-stitch-glow hover:shadow-stitch-lg transition-all active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>{isMarathi ? 'कोर्सेसची यादी पहा' : 'Explore Courses'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="tel:+919552345061"
              className="bg-white border border-slate-200/90 text-stitch-slate-dark hover:bg-slate-50 font-bold text-sm px-7 py-3.5 rounded-2xl shadow-stitch-sm transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-stitch-emerald" />
              <span>{isMarathi ? 'मार्गदर्शकास कॉल करा' : 'Contact Counselor'}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Glass Banner */}
        <div className="lg:col-span-6 relative z-10">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-stitch-lg bg-white p-2.5">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden group">
              <img
                src={settings.heroBgUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'}
                alt="Samarth Computers Classroom Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="inline-flex items-center gap-1.5 bg-stitch-red text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-full self-start mb-2 shadow-stitch-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  AI POWERED LEARNING LAB
                </span>
                <h3 className={`text-xl font-extrabold text-white ${isMarathi ? 'marathi-text' : ''}`}>
                  समर्थ कॉम्प्युटर्स, खंडाळा
                </h3>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  Center Code: 64220078 • MKCL Authorized Learning Center
                </p>
              </div>
            </div>

            {/* Floating Glass Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/80 shadow-stitch-md flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-stitch-emerald" />
              </div>
              <div>
                <p className="font-extrabold text-xs text-stitch-slate-dark">MKCL & CSC Authorized</p>
                <p className="text-[11px] text-slate-500 font-semibold">100% Practical Exam Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


