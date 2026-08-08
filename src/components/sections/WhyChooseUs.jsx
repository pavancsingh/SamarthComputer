import React from 'react';
import { Award, Target, Check, ShieldCheck } from 'lucide-react';

/**
 * WhyChooseUs Component - Google Stitch Design
 * Showcase Institute Mission & Key Highlights from official center accreditation.
 */
export default function WhyChooseUs({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const highlights = [
    {
      mr: "एम. के. सी. एल. अधिकृत प्रशिक्षण केंद्र (MKCL Authorized Center)",
      en: "MKCL Authorized Training Center"
    },
    {
      mr: "अनुभवी व कुशल प्रशिक्षकांचे मार्गदर्शन (Expert Trainers)",
      en: "Expert & Qualified Instructors Guidance"
    },
    {
      mr: "प्रात्यक्षिक आधारित आणि गुणवत्तापूर्ण प्रशिक्षण (100% Practical Training)",
      en: "100% Practical-Based Quality Training"
    },
    {
      mr: "प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष (Personal Attention)",
      en: "Personalized Attention to Every Student"
    },
    {
      mr: "करिअर मार्गदर्शन व प्लेसमेंट सहाय्य (Career & Placement Support)",
      en: "Career Guidance & Placement Assistance"
    },
    {
      mr: "परवडणारी फी आणि सोयीस्कर वेळा (Flexible Timings)",
      en: "Affordable Fees & Convenient Batch Timings"
    }
  ];

  const missionPoints = [
    {
      mr: "विद्यार्थ्यांना आधुनिक व रोजगाराभिमुख संगणक शिक्षण उपलब्ध करून देणे.",
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
      mr: "प्रत्येक विद्यार्थ्याला गुणवत्तापूर्ण शिक्षण, वैयक्तिक मार्गदर्शन संधींसाठी सक्षम बनवणे.",
      en: "Empowering every learner with quality education and personal guidance."
    },
    {
      mr: "शिक्षण, तंत्रज्ञान आणि नैतिक मूल्यांचा समतोल साधून जबाबदार व यशस्वी व्यावसायिक घडवणे.",
      en: "Creating responsible and successful professionals through ethical values."
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 font-extrabold text-xs px-4 py-1.5 rounded-full border border-amber-200 shadow-stitch-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-stitch-amber" />
            <span>{isMarathi ? 'यशस्वी करिअरसाठी योग्य पर्याय' : 'Right Choice for a Successful Career'}</span>
          </span>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'समर्थ कॉम्प्युटर्स खंडाळा — आमचे वैशिष्ट्ये' : 'Why Choose Samarth Computers, Khandala'}
          </h2>
        </div>

        {/* 2-Column Split: Highlights vs Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Why Choose Us */}
          <div className="bg-slate-50/80 border border-slate-200/90 p-8 rounded-3xl space-y-6 shadow-stitch-sm hover:shadow-stitch-md transition-all">
            <div className="flex items-center gap-3.5 border-b border-slate-200 pb-5">
              <div className="w-11 h-11 rounded-2xl bg-stitch-red text-white flex items-center justify-center font-bold shadow-stitch-sm">
                <Award className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="font-black text-xl text-stitch-slate-dark">
                  {isMarathi ? 'यशस्वी करिअरसाठी योग्य पर्याय' : 'Key Highlights'}
                </h3>
                <div className="text-xs text-stitch-red font-bold">MKCL Authorized • 5,000+ Learners Trained</div>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-stitch-slate-dark font-semibold">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-stitch-emerald flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <span className="leading-relaxed">{isMarathi ? item.mr : item.en}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Our Mission */}
          <div className="bg-stitch-slate-dark text-white p-8 rounded-3xl space-y-6 shadow-stitch-lg border border-slate-700/80">
            <div className="flex items-center gap-3.5 border-b border-slate-800 pb-5">
              <div className="w-11 h-11 rounded-2xl bg-stitch-indigo/20 border border-stitch-indigo/40 text-stitch-indigo flex items-center justify-center font-bold">
                <Target className="w-6 h-6 text-stitch-indigo" />
              </div>
              <div>
                <h3 className="font-black text-xl text-white">
                  {isMarathi ? 'आमचे ध्येय (Our Mission)' : 'Our Mission'}
                </h3>
                <div className="text-xs text-slate-400 font-semibold">आयटी प्रोफेशनल लॅब & कॉम्प्युटर अकॅडमी</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
              {isMarathi
                ? 'आयटी प्रोफेशनल लॅबमध्ये आम्ही केवळ संगणक शिक्षण देत नाही, तर विद्यार्थ्यांच्या उज्ज्वल करिअरची भक्कम पायाभरणी करतो.'
                : 'At IT Professional Lab, we don’t just teach computers — we build a solid foundation for bright student careers.'}
            </p>

            <ul className="space-y-3.5 text-xs text-slate-200">
              {missionPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-stitch-amber flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold text-stitch-amber" />
                  </div>
                  <span className="leading-relaxed">{isMarathi ? item.mr : item.en}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

