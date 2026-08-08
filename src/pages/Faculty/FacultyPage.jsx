import React from 'react';
import { Users, Award, MessageCircle } from 'lucide-react';

/**
 * FacultyPage Component - Google Stitch Design System
 * Instructors, Faculty profiles & certifications for Samarth Computers.
 */
export default function FacultyPage({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const facultyMembers = [
    {
      name: 'Prof. Prashant Patil',
      roleMr: 'संस्थापक व मुख्य संगणक मार्गदर्शक (Center Director)',
      roleEn: 'Center Director & Senior IT Faculty',
      expMr: '१५+ वर्षांचा प्रदीर्घ अध्यापन अनुभव',
      expEn: '15+ Years IT & Academic Experience',
      specialtyMr: 'MS-CIT, Tally Prime, Tally ERP, Advance Excel',
      specialtyEn: 'MS-CIT, Tally Prime, Advanced Excel, Hardware',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Mrs. S. P. Patil',
      roleMr: 'सीएससी & डिजिटल गव्हर्नन्स प्रमुख',
      roleEn: 'CSC Services Specialist & Trainer',
      expMr: '१०+ वर्षांचा शासकीय सेवा व अकाउंटिंग अनुभव',
      expEn: '10+ Years Accounting & CSC Expert',
      specialtyMr: 'MahaOnline Portal, E-Seva, Typing Speed Expert',
      specialtyEn: 'MahaOnline, CSC Portals, Typing Certification',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Er. Rahul Deshmukh',
      roleMr: 'वेब डेव्हलपमेंट व कोडिंग ट्रेनर',
      roleEn: 'Web Development & Coding Instructor',
      expMr: '६+ वर्षांचा सॉफ्टवेअर व पायथॉन अनुभव',
      expEn: '6+ Years Software Development Experience',
      specialtyMr: 'HTML, CSS, JavaScript, React, Python',
      specialtyEn: 'Full-Stack Web Dev, Python, Graphic Design',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="bg-stitch-ivory py-12 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-stitch-red-light border border-stitch-red-border px-4 py-1.5 rounded-full text-xs font-bold text-stitch-red shadow-stitch-sm">
            <Users className="w-4 h-4 text-stitch-red" />
            <span>{isMarathi ? 'अनुभवी मार्गदर्शक व शिक्षक वृंद' : 'Expert Certified Instructors'}</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'आमचे तज्ज्ञ शिक्षक (Faculty)' : 'Meet Our Expert Faculty'}
          </h1>

          <p className={`text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'प्रत्येक विद्यार्थ्याला १-ऑन-१ प्रॅक्टिकल मदत करणारे अनुभवी आणि प्रमाणित शिक्षक.'
              : 'Our dedicated team of certified IT instructors and industry experts dedicated to student success.'}
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-stitch-md hover:shadow-stitch-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="h-64 w-full bg-slate-100 relative overflow-hidden">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stitch-slate-dark/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xl font-black">{member.name}</div>
                    <div className="text-xs text-stitch-red-border font-bold">
                      {isMarathi ? member.roleMr : member.roleEn}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 bg-emerald-50 text-stitch-emerald p-3 rounded-2xl border border-emerald-200 text-xs font-bold">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>{isMarathi ? member.expMr : member.expEn}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      {isMarathi ? 'विशेष प्राविण्य:' : 'Specialization:'}
                    </div>
                    <div className="text-xs text-slate-700 font-semibold">
                      {isMarathi ? member.specialtyMr : member.specialtyEn}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/919552345061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-100 hover:bg-stitch-slate-card hover:text-white text-stitch-slate-dark font-extrabold text-xs rounded-2xl border border-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-stitch-whatsapp" />
                  <span>{isMarathi ? 'मार्गदर्शकांशी संपर्क करा' : 'Contact Instructor'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
