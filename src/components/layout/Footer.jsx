import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUp, Globe, Share2, ShieldCheck, Lock } from 'lucide-react';

/**
 * Footer Component - Google Stitch Design
 * Midnight slate dark footer with official accreditation badges, course links, contact info, and admin portal launcher.
 */
export default function Footer({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stitch-slate-dark text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-stitch-slate-card/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-stitch-red text-white flex items-center justify-center font-extrabold text-xl shadow-stitch-sm">
                S
              </div>
              <div>
                <div className="font-extrabold text-white text-lg leading-tight tracking-tight">समर्थ कॉम्प्युटर्स</div>
                <div className="text-xs text-slate-400 font-semibold">Samarth Computers, Khandala</div>
              </div>
            </div>

            <p className={`text-xs text-slate-400 leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? 'नव्या जनरेशनसाठी... नव्या डिजिटल स्किल्ससाठी! तुमच्या करिअरचा स्मार्ट निर्णय.'
                : 'Learn • Practice • Grow • Succeed. Digital Skills for a Smart Future!'}
            </p>

            {/* Accreditation Badge Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 bg-slate-800/90 border border-slate-700/80 text-stitch-red-border text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3 text-stitch-red" />
                MKCL Authorized Center
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-800/90 border border-slate-700/80 text-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3 h-3 text-stitch-emerald" />
                CSC Digital India Hub
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/samarthcomputerskhandala" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-stitch-red transition-all" title="Instagram">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919552345061" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-stitch-whatsapp transition-all" title="WhatsApp">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Computer Courses */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black text-white uppercase tracking-widest ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'अधिकृत कोर्सेस' : 'Featured Courses'}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#mscit" className="hover:text-white transition-colors">MS-CIT (MKCL Govt Certificate)</a></li>
              <li><a href="#tally" className="hover:text-white transition-colors">Tally Prime - GST & Accounting</a></li>
              <li><a href="#excel" className="hover:text-white transition-colors">Advanced EXCEL & Data Analytics</a></li>
              <li><a href="#klic" className="hover:text-white transition-colors">MKCL KLiC Job-Oriented Skills</a></li>
              <li><a href="#typing" className="hover:text-white transition-colors">English & Marathi Govt Typing</a></li>
            </ul>
          </div>

          {/* Column 3: CSC & Government Services */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black text-white uppercase tracking-widest ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'शासकीय व सीएससी सेवा' : 'Govt & CSC Services'}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#pan" className="hover:text-white transition-colors">Instant PAN Card Application</a></li>
              <li><a href="#income" className="hover:text-white transition-colors">Income & Caste Certificate</a></li>
              <li><a href="#domicile" className="hover:text-white transition-colors">Domicile & Nationality Cert</a></li>
              <li><a href="#gazette" className="hover:text-white transition-colors">Maharashtra Gazette (Name Change)</a></li>
              <li><a href="#shopact" className="hover:text-white transition-colors">Shop Act License (Gumasta)</a></li>
            </ul>
          </div>

          {/* Column 4: Address & Contact */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black text-white uppercase tracking-widest ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'केंद्राचा पत्ता व संपर्क' : 'Contact & Address'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stitch-red shrink-0 mt-0.5" />
                <span className={isMarathi ? 'marathi-text' : ''}>
                  {isMarathi
                    ? 'राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा - ४१२८०२'
                    : 'Near Rajendra Vidhalya Khandala, Tal Khandala Dist Satara 412802'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stitch-emerald shrink-0" />
                <a href="tel:+919552345061" className="hover:text-white font-bold">+91 95523 45061 / 98502 83664</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stitch-amber shrink-0" />
                <span>samarthcomputerskhandala@gmail.com</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{isMarathi ? 'सकाळी ८:०० ते रात्री ८:०० (सोम-शनि)' : 'Mon-Sat: 8:00 AM - 8:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Admin Launcher */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div>
            © 2026 Samarth Computers, Khandala. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('admin');
                window.dispatchEvent(new CustomEvent('openAdminPortal'));
              }}
              className="inline-flex items-center gap-1.5 bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700/80 font-bold transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-stitch-amber" />
              <span>{isMarathi ? 'ॲडमिन पोर्टल' : 'Admin Portal'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800/90 px-3.5 py-1.5 rounded-full border border-slate-700/80 transition-all"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}



