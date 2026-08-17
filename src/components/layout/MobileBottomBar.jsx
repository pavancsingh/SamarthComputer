import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * MobileBottomBar Component — Fixed Mobile Action Bar
 * md:hidden fixed bar offering instant 1-tap Call Now and WhatsApp Inquiry.
 * Subscribes to sharedStore site settings so configured phone numbers are used automatically.
 */
export default function MobileBottomBar({ lang = 'mr' }) {
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    const unsubscribe = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsubscribe();
  }, []);

  const phone = settings.callCtaPhone || settings.contactPhone || '+919552345061';
  const rawWhatsapp = settings.contactWhatsapp || '919552345061';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-2.5 shadow-lg flex items-center gap-2">
      {/* Call Now Primary CTA */}
      <a
        href={`tel:${phone}`}
        className="flex-1 bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
        title={`Call Samarth Computers: ${phone}`}
      >
        <Phone className="w-4 h-4 text-white fill-white/20 shrink-0" />
        <span className="truncate">{isMarathi ? '📞 कॉल करा' : 'Call Now'}</span>
      </a>

      {/* WhatsApp Inquiry CTA */}
      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(isMarathi ? 'नमस्कार, मला समर्थ कॉम्प्युटर्स मधील कोर्स व ऑनलाईन सेवेबद्दल माहिती हवी आहे.' : 'Hello, I want information about computer courses and online services at Samarth Computers.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-slate-900 active:bg-emerald-600 text-white font-extrabold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all text-center"
        title="WhatsApp Samarth Computers"
      >
        <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20 shrink-0" />
        <span className="truncate">{isMarathi ? '💬 व्हॉट्सॲप' : 'WhatsApp'}</span>
      </a>
    </div>
  );
}
