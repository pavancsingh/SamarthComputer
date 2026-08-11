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
      className="relative pt-12 pb-2xl md:pt-24 md:pb-32 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto"
      id="home"
    >
      {/* Ambient Glow Orbs */}
      <div
        className="absolute top-0 -left-20 pointer-events-none -z-10"
        style={{
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(183,0,14,0.08) 0%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          className="lg:col-span-6 z-10 space-y-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-sm px-sm py-xs rounded-full bg-stitch-red-light border border-stitch-red-border text-primary font-label-caps hover:shadow-md transition-shadow">
            <span className="w-2 h-2 rounded-full bg-stitch-emerald animate-pulse" />
            {isMarathi ? (settings.heroBadgeMr || 'महाराष्ट्र शासन व MKCL अधिकृत केंद्र') : (settings.heroBadgeEn || 'Govt. Recognized Institute')}
          </div>

          {/* Headline */}
          <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero-mobile md:font-display-hero text-text-primary">
            {isMarathi ? (
              <>{settings.heroTitleMr || 'संगणक कौशल्यांमध्ये प्रभुत्व मिळवा.'}</>
            ) : (
              <>{settings.heroTitleEn || 'Master IT Skills. Build Your Future.'}</>
            )}
          </h1>

          {/* Body */}
          <p className="text-body-lg font-body-lg text-secondary max-w-lg">
            {isMarathi
              ? (settings.heroSubtitleMr || 'समर्थ कॉम्प्युटर्स मध्ये आपले स्वागत आहे. तंत्रज्ञानाच्या जगात तुमचे करिअर घडवा.')
              : (settings.heroSubtitleEn || 'Join thousands of successful students who have transformed their careers with our industry-aligned computer courses. Expert faculty, hands-on labs, and placement assistance.')}
          </p>

          {/* Marathi Sub-text */}
          <p className="text-sm text-secondary border-l-4 border-primary pl-md font-marathi-body transition-all hover:pl-6 hover:border-l-8 duration-300">
            📍 {isMarathi ? (settings.contactAddressMr || 'राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा') : (settings.contactAddressEn || 'Near Rajendra Vidhalya, Khandala, Dist. Satara')} — मोफत मार्गदर्शन व लॅब पास उपलब्ध!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`tel:${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
              title={`Call Samarth Computers: ${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
            >
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">call</span>
              <span>{isMarathi ? (settings.callCtaTextMr || '📞 थेट कॉल करा (Call Now)') : (settings.callCtaTextEn || `Call Now (${settings.callCtaPhone || '+91 95523 45061'})`)}</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate(settings.heroCtaDest || 'courses')}
              className="bg-primary text-white px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-sm hover:bg-stitch-red-dark transition-all flex items-center justify-center gap-2 group border border-primary/20"
            >
              <span>{isMarathi ? (settings.heroCtaTextMr || 'कोर्सेसची यादी पहा') : (settings.heroCtaTextEn || 'Explore Courses')}</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="lg:col-span-6 relative z-10"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-surface-variant/50 shadow-xl bg-white p-2 group">
            <div className="overflow-hidden rounded-xl">
              <img
                key={heroImgUrl}
                src={heroImgUrl}
                alt="Samarth Computers Modern Computer Lab"
                loading="eager"
                decoding="async"
                className="w-full h-auto rounded-xl object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>

            {/* Floating Glass Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-72 glass-panel p-md rounded-xl shadow-lg flex items-center gap-md hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-stitch-emerald/10 p-3 rounded-full flex-shrink-0">
                <span className="material-symbols-outlined text-stitch-emerald fill">school</span>
              </div>
              <div>
                <p className="font-label-bold text-text-primary">MKCL &amp; CSC Authorized</p>
                <p className="text-sm text-secondary">100% Practical Exam Guidance</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
