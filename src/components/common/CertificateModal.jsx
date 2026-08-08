import React, { useState } from 'react';
import { ShieldCheck, Search, X, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * CertificateModal Component
 * Interactive modal for quick verification of student certificates.
 */
export default function CertificateModal({ isOpen, onClose, lang = 'mr' }) {
  const [certNo, setCertNo] = useState('');
  const [result, setResult] = useState(null);
  const isMarathi = lang === 'mr';

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certNo.trim()) return;

    // Mock search logic for demonstration
    if (certNo.toLowerCase().includes('mkcl') || certNo.length >= 6) {
      setResult({
        status: 'valid',
        studentName: 'राहुल सूर्यवंशी (Rahul Suryavanshi)',
        course: 'MS-CIT (MKCL Certified)',
        completionYear: '2025',
        marks: '94 / 100',
        grade: 'A+ (Distinction)'
      });
    } else {
      setResult({
        status: 'not_found',
        message: isMarathi 
          ? 'प्रमाणपत्र क्रमांक सापडला नाही. कृपया सही नंबर टाका किंवा केंद्राशी संपर्क साधा.' 
          : 'Certificate number not found. Please check your roll number or contact the center.'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 relative">
        {/* Modal Header */}
        <div className="bg-navy-dark text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-accent-gold" />
            <h3 className={`font-bold text-base ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'विद्यार्थी प्रमाणपत्र पडताळणी' : 'Student Certificate Verification'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className={`text-xs text-slate-600 ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'तुमचा MS-CIT / टॅली प्रमाणपत्र रोल नंबर किंवा स्टुडंट आयडी टाका.'
              : 'Enter your official MS-CIT / Tally Certificate Roll Number or Student ID.'}
          </p>

          <form onSubmit={handleVerify} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                placeholder={isMarathi ? 'उदा. MKCL-2025-9822' : 'e.g. MKCL-2025-9822'}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-sm py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-accent-gold" />
              <span>{isMarathi ? 'पडताळणी करा (Verify)' : 'Verify Certificate'}</span>
            </button>
          </form>

          {/* Verification Results */}
          {result && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              {result.status === 'valid' ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isMarathi ? 'अधिकृत प्रमाणित रेकॉर्ड सापडला' : 'Official Certificate Verified'}</span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-700">
                    <div><strong>विद्यार्थी:</strong> {result.studentName}</div>
                    <div><strong>कोर्स:</strong> {result.course}</div>
                    <div><strong>गुण:</strong> {result.marks} ({result.grade})</div>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-2.5 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>{result.message}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
