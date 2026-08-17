import React, { useState, useEffect } from 'react';
import { Share2, Video, Globe, PlayCircle } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * SocialFeedSection Component
 * Live visual grid displaying recent Instagram reels of lab events and YouTube student interview videos.
 */
export default function SocialFeedSection({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());

  useEffect(() => {
    const unsub = sharedStore.subscribe(() => {
      setSettings(sharedStore.getSiteSettings());
    });
    return () => unsub();
  }, []);

  const reels = [
    {
      titleMr: "MS-CIT ERA ॲप लॅब प्रॅक्टिस व्हिडिओ",
      titleEn: "MS-CIT ERA App Practical Reel",
      views: "2.4K Views",
      platform: "Instagram Reel"
    },
    {
      titleMr: "टॅली प्राइम प्रॅक्टिकल GST इन्व्हॉईस",
      titleEn: "Tally Prime Live Invoice Practice",
      views: "1.8K Views",
      platform: "YouTube Video"
    },
    {
      titleMr: "प्रमाणपत्र वाटप सोहळा २०२६",
      titleEn: "Student Certificate Award Highlights",
      views: "4.1K Views",
      platform: "Instagram Reel"
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-900 font-bold text-xs px-3 py-1 rounded-full border border-pink-200 mb-1">
              <Share2 className="w-3.5 h-3.5 text-pink-700" />
              <span>{isMarathi ? 'सोशल मीडिया रिल्स & व्हिडिओ' : 'Social Media Reels & Videos'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'कॅम्पस मधील दैनिक घडामोडी व व्हिडिओ' : 'Watch Daily Campus Life & Student Reels'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={settings?.socialInstagram || 'https://instagram.com/samarthcomputers'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-transform hover:scale-105"
            >
              Instagram Follow
            </a>
            <a
              href={settings?.socialYoutube || 'https://youtube.com/@samarthcomputers'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-transform hover:scale-105"
            >
              YouTube Channel
            </a>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reels.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                  {item.platform} • {item.views}
                </span>
                <h3 className={`font-bold text-xs text-slate-900 group-hover:text-primary transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.titleMr : item.titleEn}
                </h3>
              </div>

              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-pink-600 group-hover:text-white transition-colors shrink-0">
                <PlayCircle className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
