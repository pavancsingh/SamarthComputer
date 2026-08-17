import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
import { AdminRepository } from '../../repositories/AdminRepository';

/**
 * Faculty Component - Google Stitch Design
 * Leadership & Instructors showcase: Dynamic rendering directly from Supabase DB.
 */
const DEFAULT_FACULTY = [
  {
    id: 'fac-1',
    name: 'पवन सिंग (Pavan Singh)',
    role_mr: 'केंद्र संचालक व मुख्य ट्रेनर',
    role_en: 'Center Director & Lead Trainer',
    exp_mr: '१२+ वर्षे संगणक व आयटी अध्यापनाचा अनुभव',
    exp_en: '12+ Years IT Training & Management Experience',
    spec_mr: 'MS-CIT, टॅली प्राईम जीएसटी व कॉम्प्युटर हार्डवेअर तज्ज्ञ',
    spec_en: 'MS-CIT, Tally Prime GST & Hardware Expert',
    badge: 'Center Director'
  },
  {
    id: 'fac-2',
    name: 'सागर भोसले (Sagar Bhosale)',
    role_mr: 'वरिष्ठ संगणक शिक्षक',
    role_en: 'Senior Computer Instructor',
    exp_mr: '१०+ वर्षे प्रॅक्टिकल लॅब व टायपिंग मार्गदर्शन',
    exp_en: '10+ Years Practical Lab & Typing Guidance',
    spec_mr: 'ॲडव्हान्स एक्सल, टायपिंग (30/40 wpm) व सीएससी ऑनलाईन सेतू',
    spec_en: 'Advanced Excel, GCC-TBC Typing & CSC Online Services',
    badge: 'Senior Faculty'
  }
];

export default function Faculty({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const [facultyList, setFacultyList] = useState(DEFAULT_FACULTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    AdminRepository.getAllFaculty().then((res) => {
      if (isMounted && res && res.length > 0) {
        setFacultyList(res);
      }
    }).catch(() => {});

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-20 bg-stitch-ivory border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-stitch-red-light text-stitch-red font-bold text-xs px-4 py-1.5 rounded-full border border-stitch-red-border shadow-xs">
            <GraduationCap className="w-4 h-4 text-stitch-red" />
            <span className={isMarathi ? 'marathi-text' : ''}>{isMarathi ? 'अनुभवी व प्रमाणित शिक्षक वृंद' : 'Lead Instructors & Leadership'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stitch-slate-dark ${isMarathi ? 'marathi-heading leading-[1.3] md:leading-[1.25]' : 'tracking-tight'}`}>
            {isMarathi ? 'अनुभवी मार्गदर्शकांचे वैयक्तिक लक्ष व प्रशिक्षण' : 'Learn Under Experienced & Qualified Center Leadership'}
          </h2>

          <p className={`text-slate-500 text-sm font-medium max-w-2xl mx-auto ${isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}`}>
            {isMarathi
              ? '१० ते १२ वर्षांहून अधिक काळ खंडाळा परिसरातील हजारो विद्यार्थ्यांना आयटी व अकाउंटिंग क्षेत्रात घडवणारे तज्ज्ञ शिक्षक.'
              : 'Over 10 to 12 years of dedicated excellence in IT training and accounting education in Khandala.'}
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {facultyList.map((item, idx) => {
            const imgSrc = item.image_url || item.imageUrl;
            const role = isMarathi ? (item.role_mr || item.roleMr || item.role_en || item.roleEn) : (item.role_en || item.roleEn || item.role_mr || item.roleMr);
            const exp = isMarathi ? (item.exp_mr || item.expMr || item.exp_en || item.expEn) : (item.exp_en || item.expEn || item.exp_mr || item.expMr);
            const spec = isMarathi ? (item.spec_mr || item.specMr || item.spec_en || item.specEn) : (item.spec_en || item.specEn || item.spec_mr || item.specMr);

            return (
              <div 
                key={item.id || idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 space-y-5 shadow-xs hover:shadow-md transition-all group hover:-translate-y-0.5 relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
                    {imgSrc ? (
                      <img 
                        src={imgSrc} 
                        alt={item.name} 
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                        <GraduationCap className="w-8 h-8 text-amber-400" />
                      </div>
                    )}

                    <div>
                      <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 uppercase">
                        {item.badge || 'Faculty'}
                      </span>
                      <h3 className={`font-extrabold text-xl text-slate-900 mt-1.5 ${isMarathi ? 'marathi-heading' : ''}`}>
                        {item.name}
                      </h3>
                      <div className={`text-xs text-primary font-bold ${isMarathi ? 'marathi-text' : ''}`}>
                        {role}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {exp && (
                      <div className={`flex items-center gap-2 text-emerald-700 font-bold ${isMarathi ? 'marathi-text' : ''}`}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{exp}</span>
                      </div>
                    )}

                    {spec && (
                      <p className={`text-slate-500 font-medium pt-1 ${isMarathi ? 'marathi-text leading-[1.7]' : 'leading-relaxed'}`}>
                        {spec}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
