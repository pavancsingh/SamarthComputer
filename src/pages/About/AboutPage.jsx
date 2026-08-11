import React from 'react';
import { motion } from 'framer-motion';

/**
 * AboutPage — Stitch Design System (11_about_us.html)
 * Hero 12-col grid + Mission/Vision bento + Core Values 4-col + History Timeline
 */

const CORE_VALUES = [
  { icon: 'school',      titleEn: 'Excellence',  titleMr: 'उत्कृष्टता',  descEn: 'Commitment to the highest standards of education.', descMr: 'शिक्षणाच्या सर्वोच्च मानदंडांप्रती वचनबद्धता.' },
  { icon: 'handshake',   titleEn: 'Integrity',   titleMr: 'प्रामाणिकता', descEn: 'Honesty and transparency in all operations.', descMr: 'सर्व कार्यात प्रामाणिकता आणि पारदर्शकता.' },
  { icon: 'lightbulb',   titleEn: 'Innovation',  titleMr: 'नावीन्यता',   descEn: 'Continuously evolving our teaching methods.', descMr: 'आमच्या अध्यापन पद्धतींचे सतत उत्क्रांती.' },
  { icon: 'diversity_3', titleEn: 'Inclusivity', titleMr: 'समावेशकता',  descEn: 'Education accessible to all backgrounds.', descMr: 'सर्व पार्श्वभूमीतील विद्यार्थ्यांसाठी शिक्षण.' },
];

const TIMELINE = [
  { year: '2010', titleEn: 'Foundation', titleMr: 'स्थापना', descEn: 'Samarth Computers was established with a small batch of students, focusing on basic computer literacy programs.', descMr: 'समर्थ कॉम्प्युटर्सची स्थापना विद्यार्थ्यांच्या छोट्या गटासह, पायाभूत संगणक साक्षरता कार्यक्रमांवर लक्ष केंद्रित करून.', primary: true, right: false },
  { year: '2015', titleEn: 'Government Recognition', titleMr: 'शासकीय मान्यता', descEn: 'Achieved MKCL & CSC authorization, allowing us to offer certified diploma courses and government services.', descMr: 'MKCL आणि CSC अधिकृतता प्राप्त केली, ज्यामुळे प्रमाणपत्र अभ्यासक्रम आणि शासकीय सेवा उपलब्ध करण्यास सक्षम झालो.', primary: false, right: true },
  { year: '2020', titleEn: 'Digital Transformation', titleMr: 'डिजिटल रूपांतरण', descEn: 'Launched comprehensive online learning resources and advanced AI & programming workshops.', descMr: 'ऑनलाइन शिक्षण संसाधने आणि प्रगत AI व प्रोग्रामिंग कार्यशाळा सुरू केल्या.', primary: false, right: false },
  { year: 'TODAY', titleEn: 'Expanding Horizons', titleMr: 'विस्तारती क्षितिजे', descEn: 'Serving thousands of students annually with 20+ specialized courses and strong industry placement partnerships.', descMr: 'वार्षिक हजारो विद्यार्थ्यांना 20+ विशेष अभ्यासक्रमांसह आणि मजबूत उद्योग प्लेसमेंट भागीदारीसह सेवा.', primary: true, right: true },
];

import { sharedStore } from '../../repositories/sharedStore';

export default function AboutPage({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = React.useState(sharedStore.getSiteSettings());

  React.useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      <main className="flex-grow pt-lg pb-2xl">

        {/* ── Hero Section ── */}
        <section className="max-w-7xl mx-auto px-md lg:px-lg mb-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Left */}
            <motion.div
              className="lg:col-span-7 space-y-md"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block bg-stitch-red-light px-sm py-xs rounded-full">
                <span className="font-label-caps text-label-caps text-primary tracking-widest">
                  {isMarathi ? 'आमच्याबद्दल' : 'ABOUT US'}
                </span>
              </div>
              <h1 className="font-display-hero-mobile text-display-hero-mobile lg:font-display-hero lg:text-display-hero text-on-background">
                {isMarathi ? (
                  <>{settings.aboutHeadingMr || 'मनांना सक्षम करत आहोत २०१० पासून'}</>
                ) : (
                  <>{settings.aboutHeadingEn || 'Empowering Minds Since 2010'}</>
                )}
              </h1>
              <p className="font-body-lg text-body-lg text-secondary">
                {isMarathi
                  ? (settings.aboutDescMr || 'समर्थ कॉम्प्युटर्स हे खंडाळ्यातील अग्रगण्य संगणक प्रशिक्षण केंद्र आहे. आम्ही २०१० पासून विद्यार्थ्यांना उच्च दर्जाचे संगणक शिक्षण आणि शासकीय डिजिटल सेवा पुरवत आहोत.')
                  : (settings.aboutDescEn || 'Samarth Computers is a premier computer training institute in Khandala. Since 2010, we have been providing high-quality IT education and government digital services to students and citizens.')}
              </p>
            </motion.div>

            {/* Right: Institute Image */}
            <div className="lg:col-span-5 relative h-64 lg:h-96 rounded-xl overflow-hidden shadow-lg border border-slate-200">
              <div
                className="absolute inset-0 bg-cover bg-center w-full h-full"
                style={{
                  backgroundImage: `url('${settings.aboutImageUrl || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80'}')`,
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Mission & Vision Bento ── */}
        <section className="max-w-7xl mx-auto px-md lg:px-lg mb-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Mission */}
            <div className="bg-surface-container-lowest rounded-xl p-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-surface-variant relative overflow-hidden group hover:shadow-[0_15px_35px_-5px_rgba(183,0,14,0.15)] transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-stitch-red-light rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500" />
              <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-lg flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined fill">rocket_launch</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm relative z-10">
                {isMarathi ? 'आमचे ध्येय' : 'Our Mission'}
              </h2>
              <p className="font-body-md text-body-md text-secondary relative z-10">
                {isMarathi
                  ? 'सुलभ, उच्च-दर्जाचे व्यावसायिक आणि तांत्रिक शिक्षण प्रदान करणे जे व्यक्तींना आधुनिक कार्यबळात उत्कृष्टतेसाठी आवश्यक कौशल्ये सक्षम करते.'
                  : 'To provide accessible, high-quality vocational and technical education that equips individuals with the skills necessary to excel in the modern workforce, fostering economic growth and personal development.'}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-stitch-slate-card rounded-xl p-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] border border-slate-700 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-800 rounded-tr-full -ml-24 -mb-24 transition-transform group-hover:scale-110 duration-500" />
              <div className="w-12 h-12 bg-slate-700 text-on-secondary rounded-lg flex items-center justify-center mb-md relative z-10">
                <span className="material-symbols-outlined fill">visibility</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-secondary mb-sm relative z-10">
                {isMarathi ? 'आमची दृष्टी' : 'Our Vision'}
              </h2>
              <p className="font-body-md text-body-md text-slate-300 relative z-10">
                {isMarathi
                  ? 'प्रशिक्षण पद्धतींमधील नवकल्पनासाठी ओळखले जाणारे आणि उद्योग-तयार व्यावसायिक निर्माण करणारे अग्रणी शासकीय-मान्यताप्राप्त शैक्षणिक संस्था बनणे.'
                  : 'To be the leading government-recognized educational institute, recognized for innovation in training methodologies and generating industry-ready professionals.'}
              </p>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="max-w-7xl mx-auto px-md lg:px-lg mb-2xl">
          <h2 className="font-headline-lg text-headline-lg text-center mb-lg">
            {isMarathi ? 'मूलभूत मूल्ये' : 'Core Values'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
            {CORE_VALUES.map((v, idx) => (
              <motion.div
                key={idx}
                className="bg-surface-container-lowest p-md rounded-lg border border-surface-variant text-center hover:shadow-[0_0_15px_rgba(183,0,14,0.1)] transition-shadow"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="material-symbols-outlined fill text-primary text-4xl mb-sm block">
                  {v.icon}
                </span>
                <h3 className="font-headline-md text-headline-md text-on-background mb-xs">
                  {isMarathi ? v.titleMr : v.titleEn}
                </h3>
                <p className="font-body-md text-body-md text-secondary text-sm">
                  {isMarathi ? v.descMr : v.descEn}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── History Timeline ── */}
        <section className="max-w-7xl mx-auto px-md lg:px-lg">
          <h2 className="font-headline-lg text-headline-lg text-center mb-xl">
            {isMarathi ? 'आमचा प्रवास' : 'Our Journey'}
          </h2>
          <div className="relative border-l-2 border-surface-variant ml-4 md:ml-[50%]">
            {TIMELINE.map((item, idx) => {
              const rightClass = item.right ? 'md:w-1/2 md:pr-8 md:pl-0 md:-ml-[2px] md:text-right' : 'md:w-1/2 md:ml-auto md:pl-8';
              const dotPos = item.right ? 'md:left-auto md:-right-[9px]' : 'md:-left-[9px]';
              const cardBg = item.primary && item.right
                ? 'bg-primary-container border border-primary-fixed-dim text-on-primary-container'
                : 'bg-surface-container-lowest border border-surface-variant';

              return (
                <div key={idx} className={`mb-lg pl-8 relative ${rightClass}`}>
                  <div className={`absolute w-4 h-4 ${item.primary ? 'bg-primary' : 'bg-surface-variant'} rounded-full -left-[9px] ${dotPos} top-1 border-4 border-surface-container-lowest`} />
                  <div className={`p-md rounded-lg shadow-sm ${cardBg}`}>
                    <span className={`font-label-caps text-label-caps ${item.primary && item.right ? 'text-on-primary-container' : 'text-primary'}`}>
                      {item.year}
                    </span>
                    <h3 className={`font-headline-md text-headline-md mt-xs ${item.primary && item.right ? 'text-on-primary-container' : ''}`}>
                      {isMarathi ? item.titleMr : item.titleEn}
                    </h3>
                    <p className={`font-body-md text-body-md mt-sm ${item.primary && item.right ? 'text-on-primary-container/90' : 'text-secondary'}`}>
                      {isMarathi ? item.descMr : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
