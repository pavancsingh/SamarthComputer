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
    roleMr: 'केंद्र प्रमुख व मुख्य मार्गदर्शक',
    expEn: '12+ Years Experience • MKCL Certified',
    expMr: '१२+ वर्षांचा अनुभव • MKCL प्रमाणित',
    bioEn: 'Specializes in MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, and Share Market. Brings practical training methodology with real-world case studies and discipline. Over 12 years of teaching experience.',
    bioMr: 'MS-CIT, ॲडव्हान्स एक्सल, टॅली प्राइम (GST), बँकिंग व शेअर मार्केटमध्ये तज्ज्ञ. प्रात्यक्षिक आणि केस स्टडीजद्वारे १२ हून अधिक वर्षांचा अध्यापनाचा समृद्ध अनुभव.',
    specEn: 'MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, Share Market',
    specMr: 'MS-CIT, ॲडव्हान्स एक्सल, टॅली प्राइम (GST), बँकिंग व फायनान्स, शेअर मार्केट',
    skills: ['MS-CIT', 'Tally Prime', 'Advanced Excel', 'Banking & Finance'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    badge: 'Center Head',
    lead: true
  },
  {
    id: 'fac-2',
    name: 'Swati Bhosale (M.A. B.Ed)',
    nameEn: 'Swati Bhosale (M.A. B.Ed)',
    nameMr: 'स्वाती भोसले (M.A. B.Ed)',
    roleEn: 'Tally Expert & Trainer',
    roleMr: 'टॅली तज्ज्ञ व ज्येष्ठ मार्गदर्शिका',
    expEn: '10+ Years Experience • B.Ed Qualified',
    expMr: '१०+ वर्षांचा अनुभव • B.Ed पदवीधर',
    bioEn: 'B.Ed qualified with specialized expertise in Tally Prime (GST), accounting fundamentals, and financial management. Dedicated to making complex concepts simple and achievable for learners. Over 10 years of teaching experience.',
    bioMr: 'टॅली प्राइम (GST), अकाउंटिंग तत्त्वे आणि आर्थिक व्यवस्थापनात विशेष प्राविण्य. अवघड संकल्पना सोप्या करून शिकवण्यात १० हून अधिक वर्षांचा अध्यापनाचा अनुभव.',
    specEn: 'Tally Prime (GST), Accounting Fundamentals, Financial Management',
    specMr: 'टॅली प्राइम (GST), अकाउंटिंग तत्त्वे, फायनान्शियल मॅनेजमेंट',
    skills: ['Tally Prime GST', 'Accounting Fundamentals', 'Financial Management'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    badge: 'Tally Expert',
    lead: false
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

        {/* ── Faculty Bento Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-md md:gap-lg">

          {/* Lead Instructor — 8 cols */}
          {lead && (
            <div className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-surface-variant p-lg flex flex-col md:flex-row gap-lg group hover:shadow-[0_4px_20px_-2px_rgba(183,0,14,0.15)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-full md:w-1/3 aspect-[3/4] relative rounded-lg overflow-hidden bg-surface-variant">
                <img
                  src={lead.image_url || lead.imageUrl || lead.image || lead.photoUrl || lead.photo_url}
                  alt={lead.name || (isMarathi ? lead.nameMr : lead.nameEn)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-center space-y-md">
                <div>
                  <span className="inline-block px-sm py-xs bg-[#dae2fd] text-[#131b2e] rounded-full text-label-caps font-label-caps mb-sm">
                    {lead.badge || (isMarathi ? (lead.role_mr || lead.roleMr || 'केंद्र प्रमुख व प्रमुख मार्गदर्शक') : (lead.role_en || lead.roleEn || 'Center Head & Lead Mentor'))}
                  </span>
                  <h2 className="text-headline-lg font-headline-lg text-on-background">
                    {lead.name || (isMarathi ? lead.nameMr : lead.nameEn)}
                  </h2>
                  <p className="text-primary font-label-bold mt-xs">
                    {isMarathi ? (lead.role_mr || lead.roleMr || lead.exp_mr || lead.expMr) : (lead.role_en || lead.roleEn || lead.exp_en || lead.expEn)}
                  </p>
                </div>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  {isMarathi ? (lead.spec_mr || lead.specMr || lead.exp_mr || lead.expMr || lead.bioMr) : (lead.spec_en || lead.specEn || lead.exp_en || lead.expEn || lead.bioEn)}
                </p>
                {lead.skills && lead.skills.length > 0 && (
                  <div className="flex flex-wrap gap-sm mt-md">
                    {lead.skills.map((skill, i) => (
                      <span key={i} className="px-sm py-xs border border-surface-variant rounded-md text-label-bold font-label-bold text-secondary">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Teaching Philosophy Card — 4 cols */}
          <div className="md:col-span-4 bg-primary rounded-xl p-lg text-on-primary flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-50" />
            <div className="relative z-10 space-y-md">
              <span className="material-symbols-outlined text-4xl mb-sm fill block">lightbulb</span>
              <h3 className="text-headline-md font-headline-md">
                {isMarathi ? 'आमचे तत्त्वज्ञान' : 'Our Philosophy'}
              </h3>
              <p className="text-body-md font-body-md text-on-primary/90">
                {isMarathi
                  ? '"पारंपरिक शिक्षण आणि आधुनिक रोजगारातील अंतर भरून काढणे."'
                  : '"Bridging the gap between traditional education and modern employment."'}
              </p>
              <p className="text-body-md font-body-md text-on-primary/80 mt-md">
                {isMarathi
                  ? 'आम्ही हात-ऑन, प्रोजेक्ट-आधारित शिक्षणावर विश्वास ठेवतो. सिद्धांत केवळ तेव्हाच चांगला असतो जेव्हा तो वास्तविक-जगाच्या तंत्रज्ञान वातावरणात व्यावहारिकपणे लागू केला जातो.'
                  : 'We believe in hands-on, project-based learning. Theory is only as good as its practical application in a real-world tech environment.'}
              </p>
            </div>
          </div>

          {/* Other Instructors */}
          {others.map((f, idx) => (
            <div
              key={f.id || idx}
              className="md:col-span-4 bg-surface-container-lowest rounded-xl border border-surface-variant p-md flex flex-col gap-md hover:shadow-[0_4px_20px_-2px_rgba(183,0,14,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-surface-variant">
                <img
                  src={f.image_url || f.imageUrl || f.image || f.photoUrl || f.photo_url}
                  alt={f.name || (isMarathi ? f.nameMr : f.nameEn)}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-headline-md font-headline-md text-on-background">
                  {f.name || (isMarathi ? f.nameMr : f.nameEn)}
                </h3>
                <p className="text-primary font-label-bold mt-xs">
                  {isMarathi ? (f.role_mr || f.roleMr || f.exp_mr || f.expMr) : (f.role_en || f.roleEn || f.exp_en || f.expEn)}
                </p>
                <p className="text-body-md font-body-md text-on-surface-variant mt-sm">
                  {isMarathi ? (f.spec_mr || f.specMr || f.exp_mr || f.expMr || f.bioMr) : (f.spec_en || f.specEn || f.exp_en || f.expEn || f.bioEn)}
                </p>
              </div>
            </div>
          ))}

          {/* Ask a Mentor CTA */}
          <div className="md:col-span-4 bg-surface-container-low rounded-xl border border-surface-variant p-lg flex flex-col justify-center items-center text-center space-y-md">
            <span className="material-symbols-outlined text-secondary text-5xl">forum</span>
            <h3 className="text-headline-md font-headline-md text-on-background">
              {isMarathi ? 'मार्गदर्शन हवे आहे?' : 'Need Guidance?'}
            </h3>
            <p className="text-body-md font-body-md text-on-surface-variant">
              {isMarathi
                ? 'कोणता कोर्स तुमच्या करिअरच्या उद्दिष्टांसाठी योग्य आहे हे माहित नाही? आमच्या मार्गदर्शकांशी थेट संवाद करा.'
                : "Not sure which course fits your career goals? Talk directly to our mentors."}
            </p>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('contact')}
              className="w-full py-md rounded bg-surface-container-highest text-on-surface font-label-bold hover:bg-primary hover:text-on-primary transition-colors border border-surface-variant hover:border-primary shadow-sm mt-md"
            >
              {isMarathi ? 'मार्गदर्शकास विचारा' : 'Ask a Mentor'}
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
