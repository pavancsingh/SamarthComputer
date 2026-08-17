import React from 'react';
import { Award, Target, Check, ShieldCheck } from 'lucide-react';
import HomeAboutSection from './HomeAboutSection';

/**
 * WhyChooseUs Component - Google Stitch Design
 * Combined About Samarth, key highlights, and mission content.
 */
export default function WhyChooseUs({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const highlights = [
    {
      mr: "एमकेसीएल (MKCL) अधिकृत संगणक प्रशिक्षण केंद्र",
      en: "MKCL Authorized Computer Training Center"
    },
    {
      mr: "अनुभवी व कुशल शिक्षकांचे वैयक्तिक मार्गदर्शन",
      en: "Expert & Qualified Instructors Guidance"
    },
    {
      mr: "१००% प्रात्यक्षिक आधारित व दर्जेदार शिक्षण",
      en: "100% Practical-Based Quality Training"
    },
    {
      mr: "प्रत्येक विद्यार्थ्यासाठी स्वतंत्र कॉम्प्युटर व लक्ष",
      en: "Personalized Attention & Dedicated Lab Setup"
    },
    {
      mr: "करिअर मार्गदर्शन व नोकरीसाठी सहाय्य",
      en: "Career Guidance & Placement Support"
    },
    {
      mr: "परवडणारी फी आणि सोयीस्कर बॅचच्या वेळा",
      en: "Affordable Fees & Convenient Batch Timings"
    }
  ];

  const missionPoints = [
    {
      mr: "विद्यार्थ्यांना अद्ययावत व रोजगाराभिमुख संगणक शिक्षण देणे.",
      en: "Providing modern and job-oriented computer education to all students."
    },
    {
      mr: "प्रात्यक्षिक आणि कौशल्याधारित प्रशिक्षणाद्वारे आत्मविश्वास वाढवणे.",
      en: "Boosting confidence through practical and skill-based hands-on training."
    },
    {
      mr: "उद्योगक्षेत्राच्या गरजेनुसार अद्ययावत ज्ञान व तंत्रज्ञानाची ओळख करून देणे.",
      en: "Introducing updated technology matching corporate and industrial demands."
    },
    {
      mr: "विद्यार्थ्यांमध्ये डिजिटल साक्षरता, नवोपक्रम आणि समस्या सोडवण्याची क्षमता विकसित करणे.",
      en: "Developing digital literacy, innovation, and problem-solving abilities."
    },
    {
      mr: "प्रत्येक विद्यार्थ्याला दर्जेदार शिक्षण व वैयक्तिक मार्गदर्शनाद्वारे सक्षम बनवणे.",
      en: "Empowering every learner with quality education and personal guidance."
    },
    {
      mr: "शिक्षण, तंत्रज्ञान आणि नैतिक मूल्यांचा समतोल साधून यशस्वी व्यावसायिक घडवणे.",
      en: "Creating responsible and successful professionals through ethical values."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 font-bold text-xs px-4 py-1.5 rounded-full border border-amber-200 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-stitch-amber" />
            <span className={isMarathi ? 'marathi-text font-bold' : ''}>{isMarathi ? 'संस्थेविषयी व आमची वैशिष्ट्ये' : 'About Samarth & Why Choose Us'}</span>
          </span>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stitch-slate-dark ${isMarathi ? 'marathi-heading leading-[1.3] md:leading-[1.25]' : 'tracking-tight'}`}>
            {isMarathi ? 'समर्थ कॉम्प्युटर्स खंडाळा' : 'Samarth Computers, Khandala'}
          </h2>
        </div>

        {/* Keeps the admin-controlled institute introduction and image in this combined section. */}
        <HomeAboutSection lang={lang} embedded />

        {/* Why Samarth and mission are presented together, not as separate homepage sections. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Column 1: Why Choose Us */}
          <div className="bg-slate-50/80 border border-slate-200/90 p-8 rounded-3xl space-y-6 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 border-b border-slate-200 pb-5 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-stitch-red text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                  <Award className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-xl text-stitch-slate-dark ${isMarathi ? 'marathi-heading' : ''}`}>
                    {isMarathi ? 'यशस्वी करिअरसाठी योग्य पर्याय' : 'Key Highlights'}
                  </h3>
                  <div className={`text-xs text-stitch-red font-bold ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? 'MKCL अधिकृत केंद्र • ५,०००+ यशस्वी विद्यार्थी' : 'MKCL Authorized • 5,000+ Learners Trained'}
                  </div>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-stitch-slate-dark font-medium">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-stitch-emerald flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </div>
                    <span className={isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}>{isMarathi ? item.mr : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Our Mission */}
          <div className="bg-stitch-slate-dark text-white p-8 rounded-3xl space-y-6 shadow-md border border-slate-700/80 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3.5 border-b border-slate-800 pb-5">
                <div className="w-11 h-11 rounded-2xl bg-stitch-indigo/20 border border-stitch-indigo/40 text-stitch-indigo flex items-center justify-center font-bold shrink-0">
                  <Target className="w-6 h-6 text-stitch-indigo" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-xl text-white ${isMarathi ? 'marathi-heading' : ''}`}>
                    {isMarathi ? 'आमचे ध्येय' : 'Our Mission'}
                  </h3>
                  <div className={`text-xs text-slate-400 font-semibold ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? 'समर्थ कॉम्प्युटर्स व सीएससी केंद्र, खंडाळा' : 'Samarth Computers & CSC Center, Khandala'}
                  </div>
                </div>
              </div>

              <p className={`text-xs text-slate-300 italic bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 ${isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}`}>
                {isMarathi
                  ? 'समर्थ कॉम्प्युटर्स खंडाळा येथे आम्ही केवळ संगणक शिक्षण देत नाही, तर विद्यार्थ्यांच्या उज्ज्वल करिअरची भक्कम पायाभरणी करतो.'
                  : 'At Samarth Computers, Khandala, we don’t just teach computers — we build a solid foundation for your career.'}
              </p>

              <ul className="space-y-3.5 text-xs text-slate-200">
                {missionPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-stitch-amber flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 font-bold text-stitch-amber" />
                    </div>
                    <span className={isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}>{isMarathi ? item.mr : item.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
