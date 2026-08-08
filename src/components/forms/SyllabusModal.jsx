import React from 'react';
import { X, Download, BookOpen, CheckCircle2, Award, Clock, FileText, Send, Sparkles } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';

/**
 * SyllabusModal Component
 * Interactive modal displaying complete course curriculum, exam pattern, and instant PDF download triggers.
 */
export default function SyllabusModal({ isOpen, onClose, course, lang = 'mr' }) {
  if (!isOpen || !course) return null;

  const isMarathi = lang === 'mr';
  const modules = isMarathi ? (course.modulesMr || course.modules_mr || []) : (course.modulesEn || course.modules_en || []);
  const careers = isMarathi ? (course.careersMr || course.careers_mr || []) : (course.careersEn || course.careers_en || []);

  const handleWhatsAppSyllabus = () => {
    const text = encodeURIComponent(`Hello Samarth Computers, please send me the official Syllabus PDF brochure for ${course.title}.`);
    window.open(`https://wa.me/919552345061?text=${text}`, '_blank');
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-charcoal/70 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-rose-red-light rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-soft-lg p-6 sm:p-8 space-y-6 text-charcoal relative print:max-h-none print:shadow-none print:border-none print:p-0">
        
        {/* Printable Official Letterhead Header */}
        <div className="flex items-start justify-between border-b border-rose-red-light/40 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-red text-white flex items-center justify-center font-extrabold text-2xl shadow-sm shrink-0">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-charcoal leading-tight">समर्थ कॉम्प्युटर्स खंडाळा</span>
                <span className="bg-rose-red-soft text-rose-red-deep border border-rose-red-light text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  MKCL #412802
                </span>
              </div>
              <p className="text-xs text-charcoal-muted font-bold mt-0.5">
                {isMarathi
                  ? 'अधिकृत एमकेसीएल संगणक शिक्षण व सीएससी सुविधा केंद्र'
                  : 'MKCL Authorized IT Training & Government Registration Center'}
              </p>
              <p className="text-[11px] text-rose-red font-semibold">
                📍 राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा • 📞 9552345061
              </p>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 rounded-2xl text-charcoal-muted hover:text-charcoal bg-ivory-warm hover:bg-rose-red-soft border border-rose-red-light transition-all print:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Course Prospectus Banner */}
        <div className="bg-gradient-to-r from-rose-red-deep via-rose-red to-rose-red-accent text-white p-5 rounded-2xl space-y-2 shadow-soft">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-white/30">
              {course.tag || 'Official Prospectus 2026'}
            </span>
            <span className="text-xs font-bold text-rose-red-soft">
              {isMarathi ? '१००% प्रॅक्टिकल + AI पॉवर्ड लर्निंग' : '100% Practical + AI Powered Learning'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">{course.title}</h2>
          <p className="text-xs text-ivory/90 font-medium">
            {isMarathi ? (course.subtitleMr || course.overviewMr) : (course.subtitleEn || course.overviewEn)}
          </p>
        </div>

        {/* Key Course Specifications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ivory-warm p-4 rounded-2xl border border-rose-red-light text-xs font-medium">
          <div>
            <span className="text-charcoal-muted block text-[10px] uppercase tracking-wider font-bold">{isMarathi ? 'कालावधी:' : 'Duration:'}</span>
            <span className="font-extrabold text-charcoal">{isMarathi ? (course.durationMr || course.duration_mr) : (course.durationEn || course.duration_en)}</span>
          </div>
          <div>
            <span className="text-charcoal-muted block text-[10px] uppercase tracking-wider font-bold">{isMarathi ? 'प्रमाणपत्र:' : 'Certification:'}</span>
            <span className="font-extrabold text-rose-red truncate block">{isMarathi ? (course.certificationMr || 'MKCL & Govt Certified') : (course.certificationEn || 'MKCL & Govt Certified')}</span>
          </div>
          <div>
            <span className="text-charcoal-muted block text-[10px] uppercase tracking-wider font-bold">{isMarathi ? 'पात्रता:' : 'Eligibility:'}</span>
            <span className="font-extrabold text-charcoal truncate block">{isMarathi ? (course.eligibilityMr || '५ वी पुढील सर्व विद्यार्थी') : (course.eligibilityEn || '5th Pass & Above')}</span>
          </div>
          <div>
            <span className="text-charcoal-muted block text-[10px] uppercase tracking-wider font-bold">{isMarathi ? 'लॅब सराव:' : 'Lab Practical:'}</span>
            <span className="font-extrabold text-emerald-700 block">{isMarathi ? 'रोज १-ऑन-१ लॅब पीसी' : 'Daily 1-on-1 Lab PC'}</span>
          </div>
        </div>

        {/* Full Overview */}
        <div className="space-y-2">
          <h4 className="font-black text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-red" />
            <span>{isMarathi ? 'अभ्यासक्रम सविस्तर परिचय (Course Overview):' : 'Detailed Course Overview:'}</span>
          </h4>
          <p className="text-xs text-charcoal-muted font-medium leading-relaxed bg-white p-3.5 rounded-2xl border border-rose-red-light/40">
            {isMarathi ? (course.overviewMr || course.overview_mr) : (course.overviewEn || course.overview_en)}
          </p>
        </div>

        {/* Full Detailed Curriculum Modules List */}
        <div className="space-y-3">
          <h4 className="font-black text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-red" />
            <span>{isMarathi ? 'परिपूर्ण अभ्यासक्रम मॉड्यूल्स व प्रात्यक्षिक विषय:' : 'Complete Curriculum Modules & Practical Topics:'}</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {modules.map((mod, idx) => (
              <div key={idx} className="bg-white border border-rose-red-light p-4 rounded-2xl space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-extrabold text-charcoal text-xs">
                  <div className="w-6 h-6 rounded-lg bg-rose-red-soft text-rose-red-deep flex items-center justify-center text-xs font-black shrink-0">
                    {idx + 1}
                  </div>
                  <span>{mod.name}</span>
                </div>
                <p className="text-[11px] text-charcoal-muted font-medium pl-8 leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exam & Assessment Structure */}
        <div className="bg-rose-red-soft/60 border border-rose-red-light p-4 rounded-2xl space-y-2 text-xs">
          <h4 className="font-black text-charcoal uppercase tracking-wider flex items-center gap-2 text-xs">
            <Award className="w-4 h-4 text-rose-red" />
            <span>{isMarathi ? 'परीक्षा पद्धती व गुण विभाजन (Exam & Assessment Scheme):' : 'Exam & Marks Assessment Pattern:'}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
            <div className="bg-white p-2.5 rounded-xl border border-rose-red-light">
              <span className="font-bold block text-charcoal">{isMarathi ? '१. अंतर्गत मूल्यमापन (50 Marks)' : '1. Internal Assessment (50 Marks)'}</span>
              <span className="text-charcoal-muted">{isMarathi ? 'दैनिक सराव चाचण्या & असाइनमेंट्स' : 'Daily Lab Tests & Course Assignments'}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-rose-red-light">
              <span className="font-bold block text-charcoal">{isMarathi ? '२. अंतिम ऑनलाइन परीक्षा (50 Marks)' : '2. Final Online Exam (50 Marks)'}</span>
              <span className="text-charcoal-muted">{isMarathi ? 'ऑब्जेक्टिव्ह & प्रॅक्टिकल प्रश्न' : 'MKCL Online Examination Center'}</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-rose-red-light">
              <span className="font-bold block text-emerald-700">{isMarathi ? '३. अधिकृत उत्तीर्ण गुण (40 Marks)' : '3. Passing Criteria (40 Marks)'}</span>
              <span className="text-charcoal-muted">{isMarathi ? 'प्रमाणपत्र & ग्रेड मिळवण्यासाठी' : 'For Authorized Govt Certificate'}</span>
            </div>
          </div>
        </div>

        {/* Career Opportunities */}
        {careers.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-black text-xs text-charcoal uppercase tracking-wider">
              {isMarathi ? '💼 हा कोर्स पूर्ण केल्यानंतर नोकरीच्या संधी:' : '💼 Career Opportunities After Course:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {careers.map((car, idx) => (
                <span key={idx} className="bg-white border border-rose-red-light text-rose-red-deep font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                  ✓ {car}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons & Print Triggers */}
        <div className="pt-4 border-t border-rose-red-light/40 flex flex-col sm:flex-row items-center gap-3 print:hidden">
          <button
            type="button"
            onClick={handleWhatsAppSyllabus}
            className="w-full sm:w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Send className="w-4 h-4 text-white" />
            <span>{isMarathi ? 'व्हाट्सॲपवर ब्रोशर PDF मागवा' : 'Request PDF on WhatsApp'}</span>
          </button>
          
          <button
            type="button"
            onClick={handlePrintPDF}
            className="w-full sm:w-1/2 bg-rose-red hover:bg-rose-red-deep text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4 text-rose-red-soft" />
            <span>{isMarathi ? 'संपूर्ण सिलॅबस PDF डाऊनलोड / प्रिंट' : 'Print / Save Full Syllabus PDF'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

