import React, { useState, useEffect } from 'react';
import { Award, GraduationCap, CheckCircle2, User } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';
import { AdminRepository } from '../../repositories/AdminRepository';

/**
 * Faculty Component - Google Stitch Design
 * Leadership & Instructors showcase: Dynamic rendering from Admin sharedStore.
 */
export default function Faculty({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const [facultyList, setFacultyList] = useState(sharedStore.getFaculty());

  useEffect(() => {
    AdminRepository.getAllFaculty().then((res) => {
      if (res && res.length > 0) setFacultyList(res);
    });

    const unsubscribe = sharedStore.subscribe(() => {
      setFacultyList(sharedStore.getFaculty());
    });
    return unsubscribe;
  }, []);

  return (
    <section className="py-20 bg-stitch-ivory border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-stitch-red-light text-stitch-red font-extrabold text-xs px-4 py-1.5 rounded-full border border-stitch-red-border shadow-stitch-sm">
            <GraduationCap className="w-4 h-4 text-stitch-red" />
            <span>{isMarathi ? 'अनुभवी व प्रमाणित संचालक वृंद' : 'Lead Instructors & Leadership'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'अनुभवी मार्गदर्शकांचे वैयक्तिक लक्ष व प्रशिक्षण' : 'Learn Under Experienced & Qualified Center Leadership'}
          </h2>

          <p className="text-slate-500 text-sm font-medium max-w-2xl mx-auto">
            {isMarathi
              ? '१० ते १२ वर्षांहून अधिक काळ खंडाळा परिसरातील हजारो विद्यार्थ्यांना आयटी व अकाउंटिंग क्षेत्रात घडवणारे तज्ज्ञ शिक्षक.'
              : 'Over 10 to 12 years of dedicated excellence in IT training and accounting education in Khandala.'}
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {facultyList.map((item, idx) => {
            return (
              <div 
                key={item.id || idx}
                className="bg-white rounded-3xl border border-slate-200/90 p-8 space-y-5 shadow-stitch-md hover:shadow-stitch-lg transition-all group hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-stitch-sm group-hover:scale-105 transition-transform shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-stitch-slate-dark text-white flex items-center justify-center shadow-stitch-sm group-hover:scale-105 transition-transform shrink-0">
                      <GraduationCap className="w-8 h-8 text-stitch-amber" />
                    </div>
                  )}

                  <div>
                    <span className="bg-amber-50 text-stitch-amber text-[10px] font-black px-3 py-1 rounded-full border border-amber-200 uppercase">
                      {item.badge || 'Faculty'}
                    </span>
                    <h3 className="font-black text-xl text-stitch-slate-dark mt-1.5">
                      {item.name}
                    </h3>
                    <div className="text-xs text-stitch-red font-bold">
                      {isMarathi ? item.roleMr : item.roleEn}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-stitch-emerald font-bold">
                    <CheckCircle2 className="w-4 h-4 text-stitch-emerald shrink-0" />
                    <span>{isMarathi ? item.expMr : item.expEn}</span>
                  </div>

                  <p className="text-slate-500 leading-relaxed font-medium pt-1">
                    {isMarathi ? item.specMr : item.specEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

