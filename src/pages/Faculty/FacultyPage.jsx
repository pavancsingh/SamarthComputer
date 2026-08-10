import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminRepository } from '../../repositories/AdminRepository';

/**
 * FacultyPage — Stitch Design System (04_meet_our_faculty.html)
 * Centered hero + 12-col bento: Lead Instructor (8 col) + Philosophy (4 col) + 2 instructors + Ask Mentor
 * Direct Supabase DB integration.
 */

const FALLBACK_FACULTY = [
  {
    id: 'fac-1',
    name: 'Prof. Sagar Bhosale (MBA)',
    nameEn: 'Prof. Sagar Bhosale (MBA)',
    nameMr: 'प्रा. सागर भोसले (MBA)',
    roleEn: 'Lead Instructor & Center Head',
    roleMr: 'सेंटर हेड & लीड इन्स्ट्रक्टर',
    expEn: '12+ Years Experience • MKCL Certified',
    expMr: '१२+ वर्षांचा अनुभव • MKCL प्रमाणित',
    bioEn: 'Specializes in MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, and Share Market. Brings practical training methodology with real-world case studies and discipline. Over 12 years of teaching experience.',
    bioMr: 'MS-CIT, ॲडव्हान्स एक्सल, टॅली प्राइम (GST), बँकिंग व शेअर मार्केटमध्ये तज्ज्ञ. प्रात्यक्षिक आणि केस स्टडीजद्वारे १२ हून अधिक वर्षांचा अध्यापनाचा समृद्ध अनुभव.',
    specEn: 'MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, Share Market',
    specMr: 'MS-CIT, ॲडव्हान्स एक्सल, टॅली प्राइम (GST), बँकिंग व फायनान्स, शेअर मार्केट',
    skills: ['MS-CIT', 'Tally Prime', 'Advanced Excel', 'Banking & Finance'],
    image: 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/faculty/sagar-bhosale.jpg',
    badge: 'Center Head',
    lead: true
  },
  {
    id: 'fac-2',
    name: 'Swati Bhosale (M.A. B.Ed)',
    nameEn: 'Swati Bhosale (M.A. B.Ed)',
    nameMr: 'स्वाती भोसले (M.A. B.Ed)',
    roleEn: 'Center Head & Tally Specialist',
    roleMr: 'सेंटर हेड & टॅली एक्स्पर्ट',
    expEn: '10+ Years Experience • B.Ed Qualified',
    expMr: '१०+ वर्षांचा अनुभव • B.Ed पदवीधर',
    bioEn: 'B.Ed qualified with specialized expertise in Tally Prime (GST), accounting fundamentals, and financial management. Dedicated to making complex concepts simple and achievable for learners. Over 10 years of teaching experience.',
    bioMr: 'टॅली प्राइम (GST), अकाउंटिंग तत्त्वे आणि आर्थिक व्यवस्थापनात विशेष प्राविण्य. अवघड संकल्पना सोप्या करून शिकवण्यात १० हून अधिक वर्षांचा अध्यापनाचा अनुभव.',
    specEn: 'Tally Prime (GST), Accounting Fundamentals, Financial Management',
    specMr: 'टॅली प्राइम (GST), अकाउंटिंग तत्त्वे, फायनान्शियल मॅनेजमेंट',
    skills: ['Tally Prime GST', 'Accounting Fundamentals', 'Financial Management'],
    image: 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/faculty/swati-bhosale.jpg',
    badge: 'Center Head',
    lead: true
  }
];

export default function FacultyPage({ lang = 'mr', onNavigate }) {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    let isMounted = true;
    AdminRepository.getAllFaculty().then((data) => {
      if (isMounted) {
        if (data && data.length > 0) {
          setFaculty(data);
        } else {
          setFaculty(FALLBACK_FACULTY);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setFaculty(FALLBACK_FACULTY);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, []);

  const displayFaculty = faculty.length > 0 ? faculty : FALLBACK_FACULTY;
  const lead = displayFaculty.find((f) => f.lead || f.isLead || f.badge === 'Center Head') || displayFaculty[0];
  const others = displayFaculty.filter((f) => (f.id || f.name) !== (lead?.id || lead?.name));

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-xl flex flex-col gap-2xl">

        {/* ── Hero ── */}
        <section className="text-center max-w-3xl mx-auto space-y-md">
          <motion.h1
            className="text-display-hero-mobile md:text-display-hero font-display-hero-mobile md:font-display-hero text-on-background"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {isMarathi ? 'तुमच्या डिजिटल भविष्यासाठी तज्ञ मार्गदर्शन' : 'Expert Guidance for Your Digital Future'}
          </motion.h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            {isMarathi
              ? 'व्यावहारिक, उद्योग-सुसंगत मार्गदर्शनाद्वारे शिक्षण आणि रोजगारातील अंतर भरून काढणारे आमचे प्रमाणित प्रशिक्षक भेटा.'
              : 'Meet our certified instructors bridging the gap between education and employment through practical, industry-aligned mentorship.'}
          </p>
        </section>

        {/* ── Faculty Cards Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {displayFaculty.map((fac, idx) => {
            const imgSrc = fac.image_url || fac.imageUrl || fac.image || fac.photoUrl || fac.photo_url;
            const name = fac.name || (isMarathi ? fac.nameMr : fac.nameEn);
            const role = isMarathi ? (fac.role_mr || fac.roleMr || fac.exp_mr || fac.expMr) : (fac.role_en || fac.roleEn || fac.exp_en || fac.expEn);
            const exp = isMarathi ? (fac.exp_mr || fac.expMr || fac.exp_en || fac.expEn) : (fac.exp_en || fac.expEn || fac.exp_mr || fac.expMr);
            const spec = isMarathi ? (fac.spec_mr || fac.specMr || fac.bioMr) : (fac.spec_en || fac.specEn || fac.bioEn);
            const badge = fac.badge || 'Center Head';

            return (
              <div
                key={fac.id || idx}
                className="bg-surface-container-lowest rounded-2xl border border-surface-variant/80 p-lg flex flex-col sm:flex-row gap-lg group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="w-full sm:w-44 h-56 sm:h-auto relative rounded-xl overflow-hidden bg-surface-variant shrink-0">
                  <img
                    src={imgSrc}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-3 py-1 bg-primary text-white text-[11px] font-bold uppercase rounded-full shadow-sm">
                    {badge}
                  </span>
                </div>
                <div className="flex flex-col justify-center space-y-sm flex-1">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-on-background tracking-tight">
                      {name}
                    </h2>
                    <div className="text-sm font-bold text-primary mt-1">
                      {role}
                    </div>
                  </div>
                  {exp && (
                    <div className="text-xs font-semibold text-stitch-emerald flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>{exp}</span>
                    </div>
                  )}
                  {spec && (
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {spec}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* ── Teaching Philosophy & Mentorship CTA ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          {/* Teaching Philosophy Card — 8 cols */}
          <div className="md:col-span-8 bg-primary rounded-2xl p-lg text-on-primary flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-50" />
            <div className="relative z-10 space-y-md">
              <span className="material-symbols-outlined text-4xl mb-sm fill block text-amber-300">lightbulb</span>
              <h3 className="text-headline-md font-headline-md text-white">
                {isMarathi ? 'आमचे शैक्षणिक तत्त्वज्ञान' : 'Our Educational Philosophy'}
              </h3>
              <p className="text-body-md font-body-md text-on-primary/95 text-base italic">
                {isMarathi
                  ? '"पारंपरिक शिक्षण आणि आधुनिक तंत्रज्ञान रोजगारातील अंतर भरून काढणे."'
                  : '"Bridging the gap between traditional education and modern tech employment."'}
              </p>
              <p className="text-body-md font-body-md text-on-primary/85 leading-relaxed">
                {isMarathi
                  ? 'आम्ही प्रॅक्टिकल आणि केस-स्टडी आधारित शिक्षणावर भर देतो. प्रत्येक विद्यार्थ्याला वैयक्तिक कॉम्प्युटर व तंत्रज्ञान वातावरणात प्रत्यक्ष काम करण्याचा अनुभव मिळतो.'
                  : 'We believe in hands-on, project-based learning. Every student gets dedicated practical computer access and real-world project guidance.'}
              </p>
            </div>
          </div>

          {/* Ask a Mentor CTA — 4 cols */}
          <div className="md:col-span-4 bg-surface-container-low rounded-2xl border border-surface-variant p-lg flex flex-col justify-center items-center text-center space-y-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-5xl">forum</span>
            <h3 className="text-headline-md font-headline-md text-on-background">
              {isMarathi ? 'मार्गदर्शन हवे आहे?' : 'Need Guidance?'}
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {isMarathi
                ? 'कोणता कोर्स तुमच्या करिअरसाठी योग्य आहे? सेंटर हेडशी थेट संपर्क साधा.'
                : 'Not sure which course fits your career goals? Talk directly to our Center Heads.'}
            </p>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('contact')}
              className="w-full py-sm rounded-xl bg-primary text-white font-label-bold hover:bg-stitch-red-dark transition-colors shadow-sm text-sm"
            >
              {isMarathi ? 'मार्गदर्शकांशी संपर्क साधा' : 'Contact Center Heads'}
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
