import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

/**
 * RequirementsAccordion Component
 * Accordion displaying detailed document guidelines, affidavit stamp duty rules, and Tehsil approval timelines.
 */
export default function RequirementsAccordion({ requirements = [], steps = [], lang = 'mr' }) {
  const [openSection, setOpenSection] = useState('docs');
  const isMarathi = lang === 'mr';

  return (
    <div className="space-y-4">
      {/* Section 1: Required Documents Checklist */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setOpenSection(openSection === 'docs' ? '' : 'docs')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-slate-900 text-sm bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span>{isMarathi ? '१. आवश्यक मूळ कागदपत्रे (Mandatory Documents)' : '1. Mandatory Documents Checklist'}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'docs' ? 'rotate-180' : ''}`} />
        </button>

        {openSection === 'docs' && (
          <div className="p-4 space-y-2 border-t border-slate-100 bg-white">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Application Process Steps */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setOpenSection(openSection === 'steps' ? '' : 'steps')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-slate-900 text-sm bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>{isMarathi ? '२. सेतू केंद्रातील ऑनलाईन अर्ज प्रक्रिया' : '2. Online Application Step-by-Step'}</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === 'steps' ? 'rotate-180' : ''}`} />
        </button>

        {openSection === 'steps' && (
          <div className="p-4 space-y-2 border-t border-slate-100 bg-white">
            <ol className="space-y-2 text-xs text-slate-700 list-decimal pl-4">
              {steps.map((st, sIdx) => (
                <li key={sIdx} className="leading-relaxed">{st}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Section 3: Important Rules & Stamp Duty */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className={isMarathi ? 'marathi-text' : ''}>
          <strong>{isMarathi ? 'महत्त्वाची टीप:' : 'Important Notice:'}</strong>{' '}
          {isMarathi
            ? 'सर्व अर्ज "आपले सरकार" व अधिकृत शासकीय पोर्टलद्वारे सादर केले जातात. अर्जदाराने आधार जोडलेला मोबाईल नंबर सोबत ठेवावा.'
            : 'All applications are filed through official government portals. Applicants must bring Aadhaar linked active mobile phones.'}
        </div>
      </div>
    </div>
  );
}
