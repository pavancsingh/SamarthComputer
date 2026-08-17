import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sharedStore } from '../../repositories/sharedStore';
import { AdminRepository } from '../../repositories/AdminRepository';

/**
 * HeroSection Component — Stitch Design System (08_immersive_animated_experience.html)
 * Hero with ambient glow orbs, 12-column grid, floating glass card, and stagger reveal.
 */
export default function HeroSection({ lang = 'mr', onNavigate }) {
  const [settings, setSettings] = React.useState(sharedStore.getSiteSettings());
  const heroImgUrl = settings.heroBgUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
  const isMarathi = lang === 'mr';

  useEffect(() => {
    let isMounted = true;
    AdminRepository.getSiteSettings().then((res) => {
      if (isMounted && res && res.heroBgUrl) {
        setSettings((prev) => (prev.heroBgUrl === res.heroBgUrl && prev.heroTitleMr === res.heroTitleMr ? prev : { ...prev, ...res }));
      }
    }).catch(() => {});

    const unsubscribe = sharedStore.subscribe(() => {
      if (isMounted) setSettings(sharedStore.getSiteSettings());
    });
    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);


  return (
    <section
      className="relative pt-8 pb-16 md:pt-20 md:pb-28 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="home"
    >
      {/* Ambient Radial Glow */}
      <div
        className="absolute top-0 -left-20 pointer-events-none -z-10"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(183,0,14,0.07) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">

        {/* Left Content */}
        <motion.div
          className="lg:col-span-6 z-10 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Official Badge Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-primary font-black text-xs shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              {isMarathi
                ? (settings.heroBadgeMr || 'महाराष्ट्र शासन व MKCL अधिकृत केंद्र')
                : (settings.heroBadgeEn || 'Govt. Recognized Institute')}
            </span>
          </div>

          {/* Headline */}
          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] ${isMarathi ? 'marathi-heading' : ''}`}>
            {isMarathi ? (
              <>{settings.heroTitleMr || 'संगणक कौशल्ये शिका. आत्मविश्वासाने पुढे जा.'}</>
            ) : (
              <>{settings.heroTitleEn || 'Learn Computer Skills. Move Forward with Confidence.'}</>
            )}
          </h1>

          {/* Subtitle Body */}
          <p className={`text-base sm:text-lg text-slate-600 font-medium max-w-xl leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? (settings.heroSubtitleMr || 'MS-CIT, टॅली प्राइम, ॲडव्हान्स एक्सेल आणि प्रात्यक्षिक संगणक प्रशिक्षणासाठी खंडाळ्यातील आपले केंद्र.')
              : (settings.heroSubtitleEn || 'Your Khandala centre for MS-CIT, Tally Prime, Advanced Excel, and practical computer training.')}
          </p>

          {/* Address Highlight */}
          <div className={`p-3.5 bg-slate-100/80 border-l-4 border-primary rounded-r-xl text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed shadow-xs ${isMarathi ? 'marathi-text' : ''}`}>
            📍 {isMarathi ? (settings.contactAddressMr || 'राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा - ४१२८०२') : (settings.contactAddressEn || 'Near Rajendra Vidhalya, Khandala, Dist. Satara - 412802')} {isMarathi ? '— मार्गदर्शन व लॅब सरावासाठी भेट द्या.' : '— Visit for guidance and lab practice.'}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`tel:${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base px-7 py-4 rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 group"
              title={`Call Samarth Computers: ${settings.callCtaPhone || settings.contactPhone || '+91 95523 45061'}`}
            >
              <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">call</span>
              <span>{isMarathi ? (settings.callCtaTextMr || '📞 थेट कॉल करा (Call Now)') : (settings.callCtaTextEn || `Call Now (${settings.callCtaPhone || '+91 95523 45061'})`)}</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate(settings.heroCtaDest || 'courses')}
              className="bg-primary hover:bg-stitch-red-dark text-white font-black text-sm sm:text-base px-7 py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 group border border-primary/20 hover:scale-[1.02]"
            >
              <span>{isMarathi ? (settings.heroCtaTextMr || 'कोर्सेसची यादी पहा') : (settings.heroCtaTextEn || 'Explore Courses')}</span>
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right Image Feature */}
        <motion.div
          className="lg:col-span-6 relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl bg-white p-2.5 group">
            <div className="overflow-hidden rounded-2xl">
              <img
                key={heroImgUrl}
                src={heroImgUrl}
                alt="Samarth Computers Modern Computer Lab"
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-2xl object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>

            {/* Floating Glass Badge Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 glass-panel p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/80 bg-white/95 backdrop-blur-md">
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl shrink-0 shadow-sm border border-emerald-100">
                <span className="material-symbols-outlined text-2xl fill">school</span>
              </div>
              <div>
                <p className="font-extrabold text-xs sm:text-sm text-slate-900">MKCL &amp; CSC Centre</p>
                <p className="text-xs text-slate-600 font-medium">Practical lab and exam guidance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
