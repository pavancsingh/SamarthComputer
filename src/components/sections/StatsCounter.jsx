import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FileCheck, Calendar, Trophy } from 'lucide-react';

/**
 * StatsCounter Component - Google Stitch Design
 * Showcase key metrics in Stitch elevated cards with Framer Motion hover elevation.
 */
export default function StatsCounter({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const stats = [
    {
      icon: GraduationCap,
      value: "5,000+",
      labelMr: "प्रमाणित विद्यार्थी",
      labelEn: "Certified Students",
      descMr: "MS-CIT, टॅली व टायपिंग",
      descEn: "MS-CIT, Tally & Typing",
      accent: "text-stitch-red bg-stitch-red-light border-stitch-red-border"
    },
    {
      icon: FileCheck,
      value: "15,000+",
      labelMr: "सीएससी शासकीय सेवा",
      labelEn: "CSC Services Delivered",
      descMr: "दाखले, पॅन व राजपत्र",
      descEn: "PAN, Income & Gazette",
      accent: "text-stitch-emerald bg-emerald-50 border-emerald-200"
    },
    {
      icon: Calendar,
      value: "15+ वर्ष",
      labelMr: "खंडाळ्यात यशस्वी सेवा",
      labelEn: "Years of Trust",
      descMr: "२०१० सालापासून विश्वास",
      descEn: "Serving Since 2010",
      accent: "text-stitch-indigo bg-indigo-50 border-indigo-200"
    },
    {
      icon: Trophy,
      value: "98%",
      labelMr: "परीक्षा उत्तीर्ण निकाल",
      labelEn: "Exam Pass Rate",
      descMr: "पहिल्याच प्रयत्नात यश",
      descEn: "First-Attempt Pass Record",
      accent: "text-stitch-amber bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section className="py-12 bg-stitch-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-stitch-md border border-slate-200/90 relative overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center space-y-3 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-stitch-sm transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border ${stat.accent} shadow-stitch-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-stitch-slate-dark tracking-tight">
                    {stat.value}
                  </div>
                  <div className={`font-extrabold text-sm text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? stat.labelMr : stat.labelEn}
                  </div>
                  <div className={`text-xs text-slate-500 font-medium ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? stat.descMr : stat.descEn}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



