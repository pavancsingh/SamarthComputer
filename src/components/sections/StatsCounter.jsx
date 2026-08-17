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
      labelMr: "प्रशिक्षित विद्यार्थी",
      labelEn: "Students Trained",
      descMr: "MS-CIT, टॅली व टायपिंग",
      descEn: "MS-CIT, Tally and Typing",
      accent: "text-stitch-red bg-stitch-red-light border-stitch-red-border"
    },
    {
      icon: FileCheck,
      value: "15,000+",
      labelMr: "सीएससी शासकीय सेवा",
      labelEn: "CSC Services Delivered",
      descMr: "दाखले, पॅन कार्ड व राजपत्र",
      descEn: "PAN, Income & Gazette",
      accent: "text-stitch-emerald bg-emerald-50 border-emerald-200"
    },
    {
      icon: Calendar,
      value: "15+ वर्षे",
      labelMr: "खंडाळ्यातील सेवा व विश्वास",
      labelEn: "Years Serving Khandala",
      descMr: "२०१० पासून सातत्यपूर्ण सेवा",
      descEn: "Serving Since 2010",
      accent: "text-stitch-indigo bg-indigo-50 border-indigo-200"
    },
    {
      icon: Trophy,
      value: "98%",
      labelMr: "परीक्षेतील उत्तीर्ण निकाल",
      labelEn: "Exam Pass Record",
      descMr: "उत्कृष्ट निकालाची परंपरा",
      descEn: "Based on student results",
      accent: "text-stitch-amber bg-amber-50 border-amber-200"
    }
  ];

  return (
    <section className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200/90 relative overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={`stat-${idx}-${stat.value}`}
                  className="text-center h-full flex flex-col items-center justify-center space-y-2 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border ${stat.accent} shadow-xs shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className={`font-bold text-sm text-slate-800 ${isMarathi ? 'marathi-heading leading-[1.3]' : ''}`}>
                    {isMarathi ? stat.labelMr : stat.labelEn}
                  </div>
                  <div className={`text-xs text-slate-500 font-medium ${isMarathi ? 'marathi-text leading-[1.6]' : ''}`}>
                    {isMarathi ? stat.descMr : stat.descEn}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


