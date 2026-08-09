import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, CheckCircle2, AlertCircle, FileCheck, Award, GraduationCap, Building2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { StudentRepository } from '../../repositories/StudentRepository';

export default function StudentVerificationPage({ lang = 'mr' }) {
  const [regNo, setRegNo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMarathi = lang === 'mr';

  const handleVerify = async (e) => {
    e.preventDefault();
    const queryTerm = regNo.trim();
    if (!queryTerm) {
      setError(isMarathi ? 'कृपया नोंदणी क्रमांक किंवा नाव प्रविष्ट करा.' : 'Please enter a valid registration number or student name.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await StudentRepository.getCertificateByRegNo(queryTerm);

      if (data) {
        setResult(data);
      } else {
        setError(isMarathi ? 'प्रविष्ट केलेला नोंदणी क्रमांक / विद्यार्थी सापडला नाही.' : 'No certificate record found for the provided query.');
      }
    } catch (err) {
      console.error('Verification exception:', err);
      setError(isMarathi ? 'सर्व्हरशी संपर्क साधता आला नाही.' : 'Unable to connect to verification server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-5xl mx-auto min-h-[70vh]">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-extrabold text-xs px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{isMarathi ? 'अधिकृत संस्थात्मक प्रमाणपत्र पडताळणी' : 'Official Certificate Verification Portal'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          {isMarathi ? 'विद्यार्थी प्रमाणपत्र पडताळणी' : 'Student Certificate Verification'}
        </h1>

        <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
          {isMarathi
            ? 'समर्थ कॉम्प्युटर्स खंडाळा द्वारे जारी केलेल्या अधिकृत प्रमाणपत्रांचे ऑनलाईन पडताळणी पोर्टल.'
            : 'Verify authentic course certificates issued by Samarth Computers, Khandala instantly.'}
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto mb-10">
        <form onSubmit={handleVerify} className="space-y-4">
          <label className="block text-xs font-black uppercase text-slate-500 tracking-wider">
            {isMarathi ? 'नोंदणी क्रमांक / विद्यार्थी नाव दर्ज करा:' : 'Registration No. / Student Name:'}
          </label>

          <div className="relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder={isMarathi ? 'उदा. SAM-2026-101 किंवा विद्यार्थ्यांचे नाव' : 'e.g. SAM-2026-101 or Student Name'}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl font-bold text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs px-6 py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
            >
              {loading ? (
                <span>{isMarathi ? 'पडताळणी होत आहे...' : 'Verifying...'}</span>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{isMarathi ? 'पडताळणी करा' : 'Verify Now'}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Helper Note */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
          <Award className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{isMarathi ? 'टीप: प्रमाणपत्रावरील अधिकृत रजिस्ट्रेशन नंबर टाकून पडताळणी करा.' : 'Enter the Registration Number printed on your physical certificate.'}</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-3 shadow-sm"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Result Verification Card */}
      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-emerald-600 text-white font-black text-[10px] uppercase px-4 py-1.5 rounded-bl-2xl shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Authentic</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-widest">Official Record</span>
                <h3 className="text-xl font-black text-slate-900">
                  {isMarathi ? (result.student_name_mr || result.student_name_en) : (result.student_name_en || result.student_name_mr)}
                </h3>
                <div className="text-xs font-bold text-slate-500">
                  {isMarathi ? 'नोंदणी क्र:' : 'Reg No:'} <span className="font-mono text-slate-800">{result.reg_no}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Completed Course</div>
                <div className="font-black text-slate-900">{result.course_name || 'MS-CIT'}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Issue Date & Grade</div>
                <div className="font-black text-slate-900">{result.issue_date || '2026'} | Grade: {result.grade || 'A+'}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Center Code / Authority</div>
                <div className="font-black text-slate-900">{result.center_code || 'ALC 13210399'} ({result.authority || 'MKCL Authorized'})</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Verification Status</div>
                <div className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Valid & Authenticated</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}
