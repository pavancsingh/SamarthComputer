import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2, Share2, PlayCircle, Video, X, Sparkles } from 'lucide-react';
import { AdminRepository } from '../../repositories/AdminRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * GallerySection Component - Google Stitch Design
 * Campus Photos & Social Media Reels showcase with lightbox modal.
 */
export default function GallerySection({ lang = 'mr' }) {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const isMarathi = lang === 'mr';

  const defaultCombinedMedia = [
    {
      id: 'gal-1',
      type: 'photo',
      title_mr: 'अद्ययावत कॉम्प्युटर लॅब',
      title_en: 'Modern Computer Lab',
      desc_mr: '२०+ हाय-स्पीड i5/i7 पीसी आणि एसी क्लासरूम',
      desc_en: '20+ High-Spec i5/i7 PCs in AC Room',
      category: 'Campus',
      image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'reel-1',
      type: 'video',
      platform: 'Instagram Reel',
      views: '2.4K Views',
      title_mr: 'MS-CIT ERA ॲप लॅब प्रॅक्टिस व्हिडिओ',
      title_en: 'MS-CIT ERA App Practical Reel',
      desc_mr: 'विद्यार्थ्यांचा प्रत्यक्ष संगणक सराव आणि डिजिटल टायपिंग',
      desc_en: 'Live student practical keyboard typing and computer lab practice',
      category: 'Reels',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'gal-2',
      type: 'photo',
      title_mr: 'प्रमाणपत्र वाटप सोहळा',
      title_en: 'Certificate Award Ceremony',
      desc_mr: 'MS-CIT टॉपर विद्यार्थ्यांचा अधिकृत गौरव',
      desc_en: 'Honoring Top MS-CIT & Tally Achievers',
      category: 'Events',
      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'reel-2',
      type: 'video',
      platform: 'YouTube Video',
      views: '1.8K Views',
      title_mr: 'टॅली प्राइम प्रॅक्टिकल GST इन्व्हॉईस',
      title_en: 'Tally Prime Live Invoice Practice',
      desc_mr: 'शिरवळ MIDC कंपन्यांसाठी प्रॅक्टिकल जीएसटी बिलिंग शिक्षण',
      desc_en: 'Real business GST billing session for Shirwal MIDC accounting',
      category: 'Reels',
      image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'gal-3',
      type: 'photo',
      title_mr: 'प्रॅक्टिकल कॉम्प्युटर क्लास',
      title_en: 'Practical Training Sessions',
      desc_mr: '१-ऑन-१ वैयक्तिक कॉम्प्युटर सराव व मार्गदर्शन',
      desc_en: '1-on-1 Hands-On Computer Practice & Guidance',
      category: 'Campus',
      image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'reel-3',
      type: 'video',
      platform: 'Instagram Reel',
      views: '4.1K Views',
      title_mr: 'प्रमाणपत्र वाटप सोहळा २०२६ हायलाईट्स',
      title_en: 'Student Certificate Award Highlights',
      desc_mr: 'एमकेसीएल अधिकृत प्रमाणपत्र वाटप सोहळ्याची झलक',
      desc_en: 'Grand MKCL certificate distribution ceremony highlights',
      category: 'Reels',
      image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'gal-4',
      type: 'photo',
      title_mr: 'सीएससी व हार्डवेअर काउंटर',
      title_en: 'CSC & Hardware Repair Station',
      desc_mr: 'झटपट शासकीय सेवा व लॅपटॉप दुरुस्ती डेस्क',
      desc_en: 'Fast-Track CSC & Laptop Repair Desk',
      category: 'Campus',
      image_url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80'
    }
  ];

  useEffect(() => {
    async function load() {
      const dbItems = await AdminRepository.getAllSiteGallery();
      if (dbItems && dbItems.length > 0) {
        const merged = [...dbItems];
        defaultCombinedMedia.forEach(def => {
          if (!merged.some(m => m.id === def.id || m.title_en === def.title_en)) {
            merged.push(def);
          }
        });
        setItems(merged);
      } else {
        setItems(defaultCombinedMedia);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      load();
    });
    return unsubscribe;
  }, []);

  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'campus') return item.category === 'Campus' || item.type === 'photo';
    if (activeFilter === 'events') return item.category === 'Events';
    if (activeFilter === 'reels') return item.category === 'Reels' || item.type === 'video';
    return true;
  });

  return (
    <section className="py-20 bg-stitch-ivory text-stitch-slate-dark border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200/90 p-8 sm:p-10 rounded-3xl shadow-stitch-md space-y-6"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-stitch-red-light text-stitch-red font-bold text-xs px-4 py-1.5 rounded-full border border-stitch-red-border shadow-xs">
                <Camera className="w-4 h-4 text-stitch-red shrink-0" />
                <span className={isMarathi ? 'marathi-text font-bold' : ''}>
                  {isMarathi ? 'गॅलरी व रील्स' : 'Gallery & Reels'}
                </span>
              </div>

              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stitch-slate-dark ${isMarathi ? 'marathi-heading leading-[1.3] md:leading-[1.25]' : 'tracking-tight'}`}>
                {isMarathi
                  ? 'कॅम्पस फोटो आणि सोशल मीडिया रील्स'
                  : 'Campus Life & Social Media Reels'}
              </h2>

              <p className={`text-slate-500 text-sm sm:text-base font-medium ${isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}`}>
                {isMarathi
                  ? 'अद्ययावत संगणक लॅब, प्रात्यक्षिक वर्ग, प्रमाणपत्र वाटप सोहळा आणि विद्यार्थ्यांच्या दैनिक सोशियल मीडिया रील्स पाहा.'
                  : 'Explore state-of-the-art computer lab facilities, 1-on-1 practical training sessions, student achievers, and trending campus reels.'}
              </p>
            </div>

            {/* Social Media Follow CTAs */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={sharedStore.getSiteSettings()?.socialInstagram || 'https://instagram.com/samarthcomputers'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-stitch-red hover:bg-stitch-red-dark text-white font-bold text-xs px-4.5 py-3.5 rounded-2xl transition-all shadow-xs hover:scale-105"
              >
                <Share2 className="w-4 h-4 text-red-200 shrink-0" />
                <span>Instagram Profile</span>
              </a>
              <a
                href={sharedStore.getSiteSettings()?.socialYoutube || 'https://youtube.com/@samarthcomputers'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-stitch-slate-dark hover:bg-slate-900 text-white font-bold text-xs px-4.5 py-3.5 rounded-2xl transition-all shadow-xs hover:scale-105"
              >
                <Video className="w-4 h-4 text-stitch-amber shrink-0" />
                <span>YouTube Channel</span>
              </a>
            </div>

          </div>

          {/* Filter Tabs */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-start gap-2">
            {[
              { id: 'all', labelMr: 'सर्व फोटो व रील्स', labelEn: 'All Photos & Reels' },
              { id: 'campus', labelMr: 'कॅम्पस व कॉम्प्युटर लॅब', labelEn: 'Campus & Lab' },
              { id: 'events', labelMr: 'विद्यार्थी उपक्रम', labelEn: 'Student Events' },
              { id: 'reels', labelMr: 'सोशल मीडिया रील्स व व्हिडियो', labelEn: 'Social Reels & Videos' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  activeFilter === tab.id
                    ? 'bg-stitch-red text-white border-stitch-red shadow-xs'
                    : 'bg-white text-stitch-slate-dark hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className={isMarathi ? 'marathi-text font-bold' : ''}>
                  {isMarathi ? tab.labelMr : tab.labelEn}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Media Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
        >
          {filteredItems.map((item, idx) => {
            const isVideo = item.type === 'video' || item.category === 'Reels';
            return (
              <div
                key={item.id || `gal-${idx}-${item.title_en || item.titleEn}`}
                onClick={() => setSelectedMedia(item)}
                className="group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white aspect-[4/3] flex flex-col justify-end p-5 shadow-stitch-md hover:shadow-stitch-lg hover:-translate-y-1 cursor-pointer transition-all duration-300"
              >
                {/* Media Image */}
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title_en || item.titleEn}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-200" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stitch-slate-dark via-stitch-slate-dark/40 to-transparent z-10" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  {isVideo ? (
                    <span className="bg-stitch-red text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-stitch-sm flex items-center gap-1">
                      <PlayCircle className="w-3 h-3 text-red-200" />
                      <span>{item.platform || 'Social Reel'}</span>
                    </span>
                  ) : (
                    <span className="bg-white/90 text-stitch-slate-dark font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-stitch-sm flex items-center gap-1 border border-slate-200">
                      <Camera className="w-3 h-3 text-stitch-red" />
                      <span>{item.category || 'Photo'}</span>
                    </span>
                  )}

                  <div className="w-8 h-8 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-stitch-red opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Center Play Icon for Reels */}
                {isVideo && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-stitch-red text-white flex items-center justify-center shadow-stitch-glow group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                )}

                {/* Bottom Metadata */}
                <div className="relative z-20 space-y-1">
                  {item.views && (
                    <div className="text-[10px] font-extrabold text-stitch-amber uppercase tracking-widest">
                      {item.views}
                    </div>
                  )}

                  <h3 className={`font-black text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1 ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? (item.title_mr || item.titleMr || item.title_en || item.titleEn) : (item.title_en || item.titleEn)}
                  </h3>

                  <p className={`text-xs text-slate-200 font-medium line-clamp-2 ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? (item.desc_mr || item.descMr || item.desc_en || item.descEn) : (item.desc_en || item.descEn)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox / Video Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-4 text-stitch-slate-dark shadow-stitch-lg relative overflow-hidden">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-slate-600 hover:text-slate-900 bg-slate-100 p-2 rounded-full border border-slate-200 z-30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden relative bg-slate-100">
              <img src={selectedMedia.image_url} alt={selectedMedia.title_en} className="w-full h-full object-cover" />
              {selectedMedia.type === 'video' && (
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-stitch-red text-white flex items-center justify-center shadow-stitch-glow">
                    <PlayCircle className="w-10 h-10 text-white" />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-stitch-red-light text-stitch-red text-[10px] font-black px-3 py-0.5 rounded-full uppercase border border-stitch-red-border">
                  {selectedMedia.category || selectedMedia.platform || 'Media'}
                </span>
                {selectedMedia.views && (
                  <span className="text-xs text-stitch-red font-mono font-bold">{selectedMedia.views}</span>
                )}
              </div>

              <h3 className="font-black text-xl text-stitch-slate-dark">
                {isMarathi ? (selectedMedia.title_mr || selectedMedia.titleMr) : (selectedMedia.title_en || selectedMedia.titleEn)}
              </h3>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {isMarathi ? (selectedMedia.desc_mr || selectedMedia.descMr) : (selectedMedia.desc_en || selectedMedia.descEn)}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedMedia(null)}
                className="bg-slate-100 hover:bg-slate-200 text-stitch-slate-dark font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200"
              >
                Close
              </button>
              <a
                href={selectedMedia.type === 'video' ? 'https://instagram.com' : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stitch-red hover:bg-stitch-red-dark text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-stitch-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-red-200" />
                <span>{selectedMedia.type === 'video' ? 'Watch Full Reel' : 'View Full Image'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}



