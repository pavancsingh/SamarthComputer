import React from 'react';
import { Award, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

/**
 * AboutPage Component - Google Stitch Design System
 * Institutional Overview, Mission, Vision, MKCL & CSC Recognition details.
 */
export default function AboutPage({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const stats = [
    { number: '15+', labelMr: 'वर्षांची प्रदीर्घ परंपरा', labelEn: 'Years of Excellence' },
    { number: '5,000+', labelMr: 'यशस्वी विद्यार्थी', labelEn: 'Students Trained' },
    { number: '100%', labelMr: 'प्रॅक्टिकल कॉम्प्युटर लॅब', labelEn: 'Practical Lab Experience' },
    { number: '20+', labelMr: 'हाय-स्पीड i5/i7 पीसी', labelEn: 'High-Spec Workstations' },
  ];

  return (
    <div className="bg-stitch-ivory py-12 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-stitch-red-light border border-stitch-red-border px-4 py-1.5 rounded-full text-xs font-bold text-stitch-red shadow-stitch-sm">
            <Award className="w-4 h-4 text-stitch-red" />
            <span>{isMarathi ? 'अधिकृत MKCL & महाऑनलाइन CSC केंद्र' : 'Official MKCL & MahaOnline CSC Center'}</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'समर्थ कॉम्प्युटर्स, खंडाळा बद्दल' : 'About Samarth Computers Khandala'}
          </h1>

          <p className={`text-slate-600 text-base sm:text-lg font-medium max-w-3xl mx-auto leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'खंडाळा परिसरातील विद्यार्थ्यांमध्ये संगणक साक्षरता वाढवणे आणि ग्रामीण तरुणांना अद्ययावत डिजिटल कौशल्यांनी समृद्ध करून स्वावलंबी बनवणे हे आमचे ध्येय आहे.'
              : 'Empowering students and citizens in Khandala with world-class computer education, IT skill certifications, and digital government services.'}
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-stitch-md text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-stitch-red">{s.number}</div>
              <div className={`text-xs font-bold text-slate-600 ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? s.labelMr : s.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-stitch-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-stitch-red-light text-stitch-red flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className={`text-2xl font-black text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'आमचे ध्येय (Mission)' : 'Our Mission'}
            </h3>
            <p className={`text-slate-600 text-sm leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? 'प्रत्येक विद्यार्थ्याला प्रॅक्टिकल ज्ञान मिळवून देणे, जेणेकरून ते स्पर्धा परीक्षा, कॉम्प्युटर जॉब्स आणि रोजगारासाठी पूर्णपणे तयार होतील.'
                : 'To deliver quality IT education and vocational skills with hands-on practice, ensuring high employability and confidence.'}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-stitch-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-stitch-indigo flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className={`text-2xl font-black text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'आमचे व्हिजन (Vision)' : 'Our Vision'}
            </h3>
            <p className={`text-slate-600 text-sm leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? 'खंडाळा तालुक्यातील अग्रगण्य आणि विश्वासू तंत्रज्ञान शिक्षण केंद्र म्हणून ओळख निर्माण करणे.'
                : 'To remain the most trusted institution for digital empowerment, technical excellence, and citizen services in Khandala region.'}
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="bg-stitch-slate-card text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-6">
          <h2 className={`text-3xl font-black ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'आजच आमच्या केंद्राला भेट द्या' : 'Visit Samarth Computers Center Today'}
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            📍 राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा ४१२८०२ | 📞 9552345061 / 9850283664
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href="https://wa.me/919552345061"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stitch-red hover:bg-stitch-red-dark text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-stitch-glow transition-all"
            >
              <MessageCircle className="w-4 h-4 text-stitch-whatsapp" />
              <span>{isMarathi ? 'व्हाट्सॲपवर संपर्क करा' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
