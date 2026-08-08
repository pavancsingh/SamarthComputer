import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * GalleryPage Component - Google Stitch Design System
 * Campus photos, practical computer lab, and event gallery for Samarth Computers.
 */
export default function GalleryPage({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const [galleryItems, setGalleryItems] = useState(sharedStore.getSiteGallery());
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const unsubscribe = sharedStore.subscribe(() => {
      setGalleryItems(sharedStore.getSiteGallery());
    });
    return unsubscribe;
  }, []);

  const categories = ['All', 'Campus', 'Events', 'Classroom', 'Facilities'];

  const filtered = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(i => i.category === selectedCategory);

  return (
    <div className="bg-stitch-ivory py-12 lg:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-stitch-red-light border border-stitch-red-border px-4 py-1.5 rounded-full text-xs font-bold text-stitch-red shadow-stitch-sm">
            <Camera className="w-4 h-4 text-stitch-red" />
            <span>{isMarathi ? 'संगणक लॅब व कॅम्पस फोटो गॅलरी' : 'Campus & Lab Photo Gallery'}</span>
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'फोटो व व्हिडिओ गॅलरी' : 'Campus Photo Gallery'}
          </h1>

          <p className={`text-slate-600 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'अद्ययावत कॉम्प्युटर लॅब, एसी क्लासरूम, प्रमाणपत्र वाटप सोहळे आणि विद्यार्थी उपक्रमांची क्षणचित्रे.'
              : 'Take a visual tour of our modern computer lab, AC classrooms, certification events, and student activities.'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm ${
                selectedCategory === cat
                  ? 'bg-stitch-red text-white'
                  : 'bg-white text-stitch-slate-dark hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-stitch-md hover:shadow-stitch-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="h-56 w-full overflow-hidden bg-slate-100 relative">
                <img 
                  src={item.image_url || item.imageUrl} 
                  alt={item.title_en || item.titleEn || item.title_mr} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-stitch-slate-dark/80 text-white text-[10px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md">
                  {item.category}
                </span>
              </div>
              <div className="p-5 space-y-1">
                <h3 className={`font-black text-base text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? (item.title_mr || item.titleMr) : (item.title_en || item.titleEn)}
                </h3>
                <p className={`text-xs text-slate-500 font-medium ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? (item.desc_mr || item.descMr) : (item.desc_en || item.descEn)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
