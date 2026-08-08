import React, { useState, useEffect } from 'react';
import { Download, FileDown, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

/**
 * DownloadedFormsSection Component - Google Stitch Design
 * Direct download hub for official affidavit formats, income certificate declarations, and PAN forms.
 */
export default function DownloadedFormsSection({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const [forms, setForms] = useState([
    {
      nameMr: "उत्पन्न दाखला स्वयंघोषणा पत्र",
      nameEn: "Income Cert Self-Declaration Form",
      size: "240 KB",
      type: "PDF",
      fileUrl: "#brochure"
    },
    {
      nameMr: "महाराष्ट्राचे रहिवासी प्रमाणपत्र अर्ज",
      nameEn: "Domicile Certificate Application",
      size: "310 KB",
      type: "PDF",
      fileUrl: "#brochure"
    },
    {
      nameMr: "राजपत्र (गॅझेट) नाव बदल शपथपत्र",
      nameEn: "Gazette Name Change Affidavit",
      size: "180 KB",
      type: "PDF / DOC",
      fileUrl: "#brochure"
    },
    {
      nameMr: "नवीन पॅन कार्ड अर्ज फॉर्म ४९A",
      nameEn: "New PAN Card Form 49A",
      size: "420 KB",
      type: "PDF",
      fileUrl: "#brochure"
    }
  ]);

  useEffect(() => {
    async function loadForms() {
      try {
        const { data, error } = await supabase.from('downloadable_forms').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setForms(data.map(f => ({
            nameMr: f.name_mr || f.nameMr,
            nameEn: f.name_en || f.nameEn,
            size: f.size || '250 KB',
            type: f.type || 'PDF',
            fileUrl: f.file_url || '#brochure'
          })));
        }
      } catch (e) {
        console.warn('Supabase forms fetch notice:', e.message);
      }
    }
    loadForms();
  }, []);

  return (
    <section className="py-16 bg-stitch-ivory border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 bg-stitch-red-light text-stitch-red text-xs font-extrabold px-4 py-1.5 rounded-full border border-stitch-red-border shadow-stitch-sm">
              <FileDown className="w-4 h-4 text-stitch-red" />
              <span>{isMarathi ? '✨ मोफत डाऊनलोड हब (Aaple Sarkar Formats)' : '✨ Official PDF Downloads Hub'}</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'अधिकृत शासकीय अर्ज, शपथपत्र व स्व-घोषणापत्रे डाऊनलोड करा' : 'Download Official Verified Govt Forms, Affidavits & Declarations'}
            </h2>
            <p className={`text-xs sm:text-sm text-slate-500 font-medium ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? 'सरकारी दाखले, पॅन कार्ड व गॅझेट अर्जासाठी लागणारे सर्व कोरे फॉर्म्स १-क्लिकमध्ये मोफत डाऊनलोड करा.'
                : 'Access 100% Aaple Sarkar portal compliant blank forms, affidavits, and application PDF templates.'}
            </p>
          </div>

          <div className="text-xs font-bold text-stitch-emerald bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl flex items-center gap-2 shrink-0 shadow-stitch-sm">
            <ShieldCheck className="w-4 h-4 text-stitch-emerald shrink-0" />
            <span>{isMarathi ? 'आपले सरकार पोर्टल मान्यताप्राप्त फॉरमॅट' : 'Aaple Sarkar Approved Formats'}</span>
          </div>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {forms.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200/90 p-5 rounded-3xl flex items-center justify-between hover:shadow-stitch-md transition-all group shadow-stitch-sm"
            >
              <div className="space-y-1 pr-2">
                <div className={`font-black text-xs text-stitch-slate-dark line-clamp-1 group-hover:text-stitch-red transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.nameMr : item.nameEn}
                </div>
                <div className="text-[10px] text-slate-400 font-mono font-bold">
                  {item.type} • {item.size}
                </div>
              </div>

              <a
                href={item.fileUrl || '#brochure'}
                className="w-9 h-9 rounded-2xl bg-stitch-red-light border border-stitch-red-border flex items-center justify-center text-stitch-red hover:bg-stitch-red hover:text-white transition-colors shrink-0 shadow-stitch-sm"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

