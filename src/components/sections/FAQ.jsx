import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

/**
 * FAQ Component - Google Stitch Design
 * Interactive accordion resolving top questions regarding course enrolment, instalments, document checklists, and repairs.
 */
export default function FAQ({ lang = 'mr' }) {
  const [openIndex, setOpenIndex] = useState(0);
  const isMarathi = lang === 'mr';

  const faqs = [
    {
      qMr: "MS-CIT आणि टॅली कोर्सची प्रवेश प्रक्रिया कशी आहे? हप्त्याने फी भरता येते का?",
      qEn: "How to enroll in MS-CIT & Tally Prime? Is instalment facility available?",
      aMr: "होय! आमच्या केंद्रामध्ये सर्व कोर्सेससाठी विद्यार्थ्या सोयीनुसार २ ते ३ सुलभ हप्त्यांमध्ये फी भरण्याची सवलत उपलब्ध आहे.",
      aEn: "Yes! Flexible 2 to 3 instalment payment options are available for all computer courses at our center."
    },
    {
      qMr: "उत्पन्नाचा दाखला काढण्यासाठी कोणती कागदपत्रे लागतात?",
      qEn: "What documents are required for an Income Certificate?",
      aMr: "उत्पन्नाच्या दाखल्यासाठी रेशन कार्ड, तलाठी उत्पन्नाचा दाखला, आधार कार्ड आणि पासपोर्ट फोटो आवश्यक असतात. अर्ज भरल्यापासून ३-५ दिवसात दाखला मिळतो.",
      aEn: "Ration Card, Talathi Income Proof, Aadhaar Card, and Passport Photo are required. Issued within 3-5 working days."
    },
    {
      qMr: "डिजिटल 7/12 उतारा आणि ई-फेअरफार ऑनलाइन कसे मिळवायचे?",
      qEn: "How to get digital 7/12 extract and E-Ferfar online?",
      aMr: "आमच्या केंद्रामध्ये महाभूलेख पोर्टलवरून अधिकृत डिजिटल स्वाक्षरी असलेला 7/12 व 8-अ उतारा झटपट प्रिंट करून दिला जातो.",
      aEn: "Digitally signed official 7/12 & 8-A land record extracts are instantly printed at our CSC counter."
    },
    {
      qMr: "नोकरदार किंवा कॉलेज विद्यार्थ्यांसाठी सोयीस्कर बॅच वेळेची सोय आहे का?",
      qEn: "Are morning and evening batches available for working professionals?",
      aMr: "होय! सकाळी ८:०० ते रात्री ८:०० वाजेपर्यंत वेगवेगळ्या बॅचेस उपलब्ध आहेत. तुमच्या सोयीनुसार वेळ निवडू शकता.",
      aEn: "Yes! We operate continuous batches from 8:00 AM to 8:00 PM. You can choose any batch matching your work or college schedule."
    },
    {
      qMr: "कॉम्प्युटर कोर्स पूर्ण केल्यानंतर शासनमान्य प्रमाणपत्र मिळते का?",
      qEn: "Is the course completion certificate government recognized?",
      aMr: "होय! MS-CIT प्रमाणपत्र महाराष्ट्र शासन (MKCL) कडून मिळते. टॅली प्रमाणपत्र टॅली एज्युकेशन कडून अधिकृत दिले जाते जे शासकीय व खाजगी नोकरीसाठी वैध आहे.",
      aEn: "Yes! MS-CIT certificates are issued directly by Govt of Maharashtra (MKCL). Tally certificates are officially authorized by Tally Education for jobs."
    }
  ];

  return (
    <section className="py-20 bg-stitch-ivory border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-stitch-amber font-extrabold text-xs px-4 py-1.5 rounded-full border border-amber-200 shadow-stitch-sm">
            <HelpCircle className="w-4 h-4 text-stitch-amber" />
            <span>{isMarathi ? 'सतत विचारले जाणारे प्रश्न (FAQ)' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'तुमच्या प्रश्नांची उत्तरे' : 'Got Questions? We Have Answers'}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden transition-all shadow-stitch-sm hover:shadow-stitch-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-black text-stitch-slate-dark text-sm sm:text-base hover:bg-slate-50 transition-colors"
                >
                  <span className={isMarathi ? 'marathi-text' : ''}>
                    {isMarathi ? item.qMr : item.qEn}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-stitch-red shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-500 font-medium border-t border-slate-100 pt-4 leading-relaxed">
                    <p className={isMarathi ? 'marathi-text' : ''}>
                      {isMarathi ? item.aMr : item.aEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Desk Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-stitch-slate-dark text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left border border-slate-700/80 shadow-stitch-lg">
          <div>
            <div className="font-black text-base text-white">प्रश्न सापडला नाही?</div>
            <div className="text-xs text-slate-400 font-medium">आमच्या हेल्पलाईन नंबरवर थेट व्हाट्सॲप संदेश पाठवा.</div>
          </div>
          <a
            href="https://wa.me/919552345061?text=I%20have%20a%20question%20about%20Samarth%20Computers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stitch-whatsapp hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-stitch-sm transition-all hover:scale-105"
          >
            <MessageSquare className="w-4 h-4" />
            <span>व्हाट्सॲपवर विचारा</span>
          </a>
        </div>

      </div>
    </section>
  );
}

