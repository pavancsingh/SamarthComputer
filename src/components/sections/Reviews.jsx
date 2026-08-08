import React from 'react';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';

/**
 * Reviews Component - Google Stitch Design
 * 4.9/5-star Google reviews feed widget with verified local student & customer reviews.
 */
export default function Reviews({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const reviews = [
    {
      author: "सचिन कदम (Sachin Kadam)",
      rating: 5,
      date: "2 आठवड्यांपूर्वी",
      commentMr: "खंडाळ्यातील सर्वात उत्तम कॉम्प्युटर क्लास. शिक्षकांचे मार्गदर्शन खूप छान आहे. MS-CIT परीक्षेत ९२% गुण मिळाले.",
      commentEn: "Best computer class in Khandala. Staff is very supportive for MS-CIT exam prep. Scored 92% marks."
    },
    {
      author: "वैशाली देशपांडे (Vaishali Deshpande)",
      rating: 5,
      date: "१ महिन्यापूर्वी",
      commentMr: "माझा उत्पन्नाचा दाखला अवघ्या ३ दिवसात मिळाला. सीएससी केंद्रामध्ये खूप जलद आणि अचूक काम होते.",
      commentEn: "Got my Income Certificate within 3 days without any hassle. Very fast and reliable CSC service."
    },
    {
      author: "अभिजीत जगताप (Abhijit Jagtap)",
      rating: 5,
      date: "३ आठवड्यांपूर्वी",
      commentMr: "टॅली प्राईम आणि ॲडव्हान्स एक्सल कोर्स खूप सोप्या भाषेत शिकवला. प्रॅक्टिकल सरावामुळे मला खाजगी कंपनीत जॉब मिळाला.",
      commentEn: "Learned Tally Prime & Advanced Excel in very clear Marathi instruction. Excellent practical training that got me a job."
    }
  ];

  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Rating Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-extrabold text-stitch-slate-dark text-base ml-2">4.9 / 5.0</span>
            </div>

            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'Google वर ३२०+ स्थानिक नागरिकांचे ५-स्टार रिव्ह्यू' : '4.9 Star Rating on Google (320+ Verified Local Reviews)'}
            </h2>
          </div>

          <a
            href="https://maps.google.com/maps?q=Samarth+Computers+Khandala"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stitch-ivory hover:bg-slate-100 text-stitch-slate-dark font-extrabold text-xs px-5 py-3.5 rounded-2xl border border-slate-200 shadow-stitch-sm transition-all shrink-0"
          >
            <span>{isMarathi ? 'गूगलवर सर्व रिव्ह्यू पहा' : 'View All Google Reviews'}</span>
            <ExternalLink className="w-4 h-4 text-stitch-red" />
          </a>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-slate-50/80 border border-slate-200/90 p-6 rounded-3xl space-y-4 flex flex-col justify-between hover:bg-white hover:shadow-stitch-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{rev.date}</span>
                </div>

                <p className={`text-xs text-slate-600 leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
                  "{isMarathi ? rev.commentMr : rev.commentEn}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div className="font-extrabold text-xs text-stitch-slate-dark">{rev.author}</div>
                <span className="flex items-center gap-1 text-[10px] text-stitch-emerald font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-stitch-emerald" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

