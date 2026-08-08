import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { useAuth, ADMIN_EMAIL } from '../../context/AuthContext';

/**
 * AdminLoginPage Component - Google Stitch Design System
 * Secure login portal for authorized single admin.
 */
export default function AdminLoginPage({ lang = 'en', onSuccess }) {
  const [email, setEmail] = useState('pawansingh3760@gmail.com');
  const [password, setPassword] = useState('Pavan@1137');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginAdmin } = useAuth();
  const isMarathi = lang === 'mr';

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await loginAdmin(email, password);
    setIsSubmitting(false);

    if (result.success) {
      if (onSuccess) onSuccess();
    } else {
      setErrorMsg(result.message || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = async () => {
    setEmail(ADMIN_EMAIL);
    setPassword('Pavan@1137');
    setIsSubmitting(true);
    const result = await loginAdmin(ADMIN_EMAIL, 'Pavan@1137');
    setIsSubmitting(false);

    if (result.success) {
      if (onSuccess) onSuccess();
    } else {
      setErrorMsg(result.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stitch-ivory px-4 py-16 text-stitch-slate-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-stitch-red-light rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-stitch-lg relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-stitch-red text-white flex items-center justify-center mx-auto shadow-stitch-sm">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-stitch-slate-dark tracking-tight">
            Samarth Master Admin Login
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Authorized Admin Access Only
          </p>
        </div>

        {/* Quick Admin Access Preset Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-stitch-slate-dark">
            <span className="flex items-center gap-1.5 text-slate-700">
              <KeyRound className="w-4 h-4 text-stitch-red" />
              Master Admin Credentials
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">Active</span>
          </div>
          <div className="text-slate-600 font-mono text-[11px] space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
            <div>Email: <strong className="text-slate-900">pawansingh3760@gmail.com</strong></div>
            <div>Pass: <strong className="text-slate-900">Pavan@1137</strong></div>
          </div>
          <button
            type="button"
            onClick={handleQuickLogin}
            className="w-full bg-stitch-red-light hover:bg-red-100 text-stitch-red font-extrabold text-xs py-2 rounded-xl border border-stitch-red-border/60 transition-all flex items-center justify-center gap-1.5 shadow-stitch-sm"
          >
            <ShieldCheck className="w-4 h-4 text-stitch-red" />
            <span>1-Click Auto Login as Admin</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs flex items-center gap-2 font-bold shadow-stitch-sm">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-black text-stitch-slate-dark mb-1">
              Admin Email Address or Username:
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pawansingh3760@gmail.com"
                required
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-stitch-slate-dark focus:outline-none focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-stitch-slate-dark mb-1">
              Master Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter master password..."
                required
                autoComplete="new-password"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-mono text-stitch-slate-dark focus:outline-none focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-stitch-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-400 pt-2 border-t border-slate-100 font-semibold">
          🔒 Protected by Supabase Auth & Row Level Security.
        </div>

      </div>
    </div>
  );
}

