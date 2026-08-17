import { COURSES_DATA } from '../constants/coursesData';
import { CSC_SERVICES_DATA } from '../constants/cscData';
import { GOVT_SERVICES_DATA } from '../constants/govtServicesData';

const STORAGE_KEY_COURSES = 'samarth_store_courses';
const STORAGE_KEY_CSC = 'samarth_store_csc';
const STORAGE_KEY_GOVT = 'samarth_store_govt';
const STORAGE_KEY_INQUIRIES = 'samarth_store_inquiries';
const STORAGE_KEY_GALLERY = 'samarth_store_gallery';
const STORAGE_KEY_SETTINGS = 'samarth_store_settings';
const STORAGE_KEY_FACULTY = 'samarth_store_faculty';
const STORAGE_KEY_BATCHES = 'samarth_store_batches';
const STORAGE_KEY_NEWS = 'samarth_store_news';

const DEFAULT_BATCHES = [
  { id: 'b-1', category: 'morning', time: '08:00 AM - 09:30 AM', courseEn: 'MS-CIT & Computer Basics', courseMr: 'MS-CIT व संगणक पायाभूत', statusEn: 'Admission Open', statusMr: 'प्रवेश सुरू', seatsEn: '5 Seats Left', seatsMr: '५ जागा शिल्लक' },
  { id: 'b-2', category: 'morning', time: '09:30 AM - 11:00 AM', courseEn: 'Tally Prime & GST Accounting', courseMr: 'टॅली प्राइम व GST अकाउंटिंग', statusEn: 'Filling Fast', statusMr: 'जलद भरणारे', seatsEn: '3 Seats Left', seatsMr: '३ जागा शिल्लक' },
  { id: 'b-3', category: 'afternoon', time: '01:00 PM - 02:30 PM', courseEn: 'GCC-TBC English & Marathi Typing', courseMr: 'GCC-TBC इंग्रजी व मराठी टायपिंग', statusEn: 'Admission Open', statusMr: 'प्रवेश सुरू', seatsEn: '8 Seats Left', seatsMr: '८ जागा शिल्लक' },
  { id: 'b-4', category: 'evening', time: '05:00 PM - 06:30 PM', courseEn: 'MS-CIT Professional Evening Batch', courseMr: 'MS-CIT व्यावसायिक संध्याकाळ बॅच', statusEn: 'Admission Open', statusMr: 'प्रवेश सुरू', seatsEn: '6 Seats Left', seatsMr: '६ जागा शिल्लक' }
];

const DEFAULT_NEWS = [
  { id: 'n-1', titleMr: 'MS-CIT नवीन बॅच प्रवेश सुरू 2026', titleEn: 'MS-CIT New Batch Admissions Open 2026', categoryMr: 'प्रवेश अपडेट', categoryEn: 'Admissions', dateStr: 'ऑगस्ट २०२६', descMr: 'नवीन बॅच सोमवारपासून सुरू होत आहे. मर्यादित जागा उपलब्ध.', descEn: 'New batch starting this Monday. Limited seats available on first-come-first-serve basis.' },
  { id: 'n-2', titleMr: 'Tally Prime GST विशेष सवलत स्कॉलरशिप', titleEn: 'Tally Prime GST Special Discount Scholarship', categoryMr: 'स्कॉलरशिप', categoryEn: 'Scholarship', dateStr: '२०२६', descMr: 'वाणिज्य (Commerce) विद्यार्थ्यांसाठी विशेष सवलत योजना.', descEn: 'Special fee concession scheme for commerce students and job seekers.' }
];

const getMediaUrl = (path) => {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  if (baseUrl && !baseUrl.includes('placeholder')) {
    return `${baseUrl}/storage/v1/object/public/samarth-media/${path}`;
  }
  return `/assets/${path}`;
};

const DEFAULT_FACULTY = [
  {
    id: 'fac-1',
    name: 'Prof. Sagar Bhosale (MBA)',
    roleMr: 'सेंटर हेड & लीड इन्स्ट्रक्टर',
    roleEn: 'Lead Instructor & Center Head',
    expMr: '१२+ वर्षांचा प्रॅक्टिकल टीचिंग अनुभव',
    expEn: 'Over 12 years of teaching experience',
    specMr: 'MS-CIT, Advanced Excel, Tally Prime (GST), बँकिंग, फायनान्स आणि शेअर मार्केट तज्ज्ञ.',
    specEn: 'Specializes in MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, and Share Market with real-world case studies.',
    badge: 'Center Head',
    imageUrl: getMediaUrl('faculty/sagar-bhosale.jpg')
  },
  {
    id: 'fac-2',
    name: 'Swati Bhosale (M.A. B.Ed)',
    roleMr: 'सेंटर हेड & टॅली एक्स्पर्ट',
    roleEn: 'Center Head & Tally Specialist',
    expMr: '१०+ वर्षांचा टीचिंग अनुभव',
    expEn: 'Over 10 years of teaching experience',
    specMr: 'M.A. B.Ed पदवीधर. टॅली प्राइम (GST), अकाउंटिंग फंडामेंटल्स आणि फायनान्शियल मॅनेजमेंट तज्ज्ञ.',
    specEn: 'B.Ed qualified with specialized expertise in Tally Prime (GST), accounting fundamentals, and financial management.',
    badge: 'Center Head',
    imageUrl: getMediaUrl('faculty/swati-bhosale.jpg')
  }
];

const DEFAULT_SETTINGS = {
  logoUrl: getMediaUrl('logos/samarth-main-logo.png'),
  heroBgUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  heroTitleMr: 'संगणक कौशल्ये शिका. आत्मविश्वासाने पुढे जा.',
  heroTitleEn: 'Learn Computer Skills. Move Forward with Confidence.',
  heroSubtitleMr: 'समर्थ कॉम्प्युटर्स खंडाळा येथे MKCL मान्यताप्राप्त कोर्सेस व महाऑनलाईन शासकीय सेवांचे विश्वसनीय केंद्र. आजच प्रवेश घ्या!',
  heroSubtitleEn: 'Khandala’s premier MKCL-authorized institute for MS-CIT, Tally Prime GST, Advanced Excel & online government services.',
  heroBadgeMr: 'महाराष्ट्र शासन व MKCL अधिकृत केंद्र',
  heroBadgeEn: 'Govt. Recognized & MKCL Authorized Institute',
  heroCtaTextMr: 'सर्व कोर्सेस पहा',
  heroCtaTextEn: 'Explore Courses',
  heroCtaDest: 'courses',

  contactPhone: '+91 95523 45061 / +91 98502 83664',
  contactWhatsapp: '919552345061',
  contactEmail: 'admin@samarthcomputers.in',
  contactAddressMr: 'राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा - ४१२८०२',
  contactAddressEn: 'Near Rajendra Vidhalya, Khandala, Dist. Satara - 412802',
  contactHoursMr: 'सोमवार - शनिवार: सकाळी ९:०० ते रात्री ७:०० (रविवार सुट्टी)',
  contactHoursEn: 'Monday - Saturday: 9:00 AM - 7:00 PM (Sunday Closed)',
  contactMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.0946052295697!2d74.06488181504043!3d18.04649018799785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2f7bf9d34c6f1%3A0xadf7d5d7d5e8e8e8!2sKhandala%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',

  callCtaPhone: '+919552345061',
  callCtaTextMr: '📞 थेट कॉल करा',
  callCtaTextEn: 'Call Now (+91 95523 45061)',

  aboutHeadingMr: 'खंडाळ्यात संगणक शिक्षण आणि डिजिटल सेवांसाठी आपले केंद्र',
  aboutHeadingEn: 'Your Centre for Computer Education and Digital Services in Khandala',
  aboutDescMr: 'समर्थ कॉम्प्युटर्स खंडाळा येथे MS-CIT, टॅली प्राइम, ॲडव्हान्स एक्सेल आणि इतर संगणक अभ्यासक्रमांसह CSC व ऑनलाइन शासकीय सेवा उपलब्ध आहेत. विद्यार्थ्यांना प्रात्यक्षिक सराव आणि मार्गदर्शन दिले जाते.',
  aboutDescEn: 'Samarth Computers, Khandala offers MS-CIT, Tally Prime, Advanced Excel, and other computer courses alongside CSC and online government services, with practical lab work and guidance for learners.',
  aboutImageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
  aboutMissionMr: 'ग्रामीण भागातील विद्यार्थ्यांना परवडणारे, उच्च-दर्जाचे तांत्रिक व व्यावसायिक संगणक शिक्षण देवून त्यांना रोजगारक्षम व आत्मनिर्भर बनवणे.',
  aboutMissionEn: 'To deliver practical, high-quality IT education that empowers rural youth with industry-relevant digital skills, confidence, and career growth.',
  aboutVisionMr: 'डिजिटल तंत्रज्ञान, टॅली व कॉम्प्युटर शिक्षणातील नावीन्यपूर्ण प्रात्यक्षिक प्रशिक्षण पद्धतींनी खंडाळा तालुक्यातील सर्वात विश्वासू संस्था बनणे.',
  aboutVisionEn: 'To remain Khandala’s most trusted center for technical education and online government services, empowering every student with career-ready IT capabilities.',

  homeSections: {
    hero: { visible: true, order: 1, titleMr: 'मुख्य', titleEn: 'Hero' },
    trust: { visible: true, order: 2, titleMr: 'मान्यता', titleEn: 'Trust Strip' },
    stats: { visible: true, order: 3, titleMr: 'संख्याशास्त्र', titleEn: 'Statistics' },
    courses: { visible: true, order: 4, titleMr: 'संगणक कोर्सेस', titleEn: 'Computer Courses' },
    whyChooseUs: { visible: true, order: 5, titleMr: 'आमची वैशिष्ट्ये', titleEn: 'Why Choose Us' },
    services: { visible: true, order: 6, titleMr: 'ऑनलाइन शासकीय सेवा', titleEn: 'Online Govt Services' },
    timetable: { visible: true, order: 7, titleMr: 'बॅच वेळापत्रक', titleEn: 'Batch Schedule' },
    workshops: { visible: true, order: 8, titleMr: 'कार्यशाळा व बातम्या', titleEn: 'Workshops & News' },
    counseling: { visible: true, order: 9, titleMr: 'मोफत मार्गदर्शन', titleEn: 'Career Counseling Banner' },
    stories: { visible: true, order: 10, titleMr: 'यशस्वी विद्यार्थी', titleEn: 'Success Stories' },
    reviews: { visible: true, order: 11, titleMr: 'विद्यार्थी अभिप्राय', titleEn: 'Reviews' },
    gallery: { visible: true, order: 12, titleMr: 'फोटो गॅलरी', titleEn: 'Photo Gallery' },
    faculty: { visible: true, order: 13, titleMr: 'शिक्षक वृंद', titleEn: 'Faculty' },
    faq: { visible: true, order: 14, titleMr: 'वारंवार विचारले जाणारे प्रश्न', titleEn: 'FAQ' },
    contact: { visible: true, order: 15, titleMr: 'संपर्क व नकाशा', titleEn: 'Contact & Map' }
  },

  navSettings: [
    { id: 'home', labelEn: 'Home', labelMr: 'मुख्यपृष्ठ', visible: true, order: 1 },
    { id: 'courses', labelEn: 'Courses', labelMr: 'कोर्सेस', visible: true, order: 2 },
    { id: 'services', labelEn: 'Services', labelMr: 'सेवा', visible: true, order: 3 },
    { id: 'timetable', labelEn: 'Timetable', labelMr: 'वेळापत्रक', visible: true, order: 4 },
    { id: 'about', labelEn: 'About Us', labelMr: 'आमच्याबद्दल', visible: true, order: 5 },
    { id: 'faculty', labelEn: 'Faculty', labelMr: 'शिक्षक वृंद', visible: true, order: 6 },
    { id: 'contact', labelEn: 'Contact', labelMr: 'संपर्क', visible: true, order: 7 }
  ],

  siteTitleMr: 'समर्थ कॉम्प्युटर्स खंडाळा',
  siteTitleEn: 'Samarth Computers Khandala',
  alcCode: '13210399 / 13210273',
  cscId: 'CSC-KHANDALA-412802',
  seoTitle: 'Samarth Computers Khandala | Best Computer Institute & CSC Center',
  seoDescription: 'Samarth Computers Khandala offers MKCL MS-CIT, Tally Prime GST, Advanced Excel, DTP, and online CSC Aadhaar & Pan Card government services.',
  seoKeywords: 'MS-CIT Khandala, Tally Prime, Computer Class Khandala, CSC Center Khandala, Samarth Computers',
  socialFacebook: 'https://facebook.com/samarthcomputers',
  socialInstagram: 'https://instagram.com/samarthcomputers',
  socialYoutube: 'https://youtube.com/@samarthcomputers',
  footerTagline: 'Empowering students and citizens with quality computer education and fast-track digital government services.',
  copyrightText: '© 2026 Samarth Computers Khandala. All rights reserved.'
};

const DEFAULT_GALLERY = [

  {
    id: 'gal-1',
    title_mr: 'अद्ययावत कॉम्प्युटर लॅब',
    title_en: 'Modern Computer Lab',
    desc_mr: '२०+ हाय-स्पीड i5/i7 पीसी आणि एसी क्लासरूम',
    desc_en: '20+ High-Spec i5/i7 PCs in AC Room',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-2',
    title_mr: 'प्रमाणपत्र वाटप सोहळा',
    title_en: 'Certificate Award Ceremony',
    desc_mr: 'MS-CIT टॉपर विद्यार्थ्यांचा गौरव',
    desc_en: 'Honoring Top MS-CIT Achievers',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-3',
    title_mr: 'प्रॅक्टिकल कॉम्प्युटर क्लास',
    title_en: 'Practical Training Sessions',
    desc_mr: '१-ऑन-१ वैयक्तिक कॉम्प्युटर सराव',
    desc_en: '1-on-1 Hands-On Computer Practice',
    category: 'Classroom',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-4',
    title_mr: 'सीएससी सेंटर काउंटर',
    title_en: 'CSC Services Station',
    desc_mr: 'झटपट शासकीय सेवा व अर्ज प्रक्रिया',
    desc_en: 'Fast-Track CSC Services Desk',
    category: 'Facilities',
    image_url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80'
  }
];

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Prevent poisoned empty array from overriding static fallbacks if fallback exists
      if (Array.isArray(parsed) && parsed.length === 0 && Array.isArray(fallback) && fallback.length > 0) {
        return fallback;
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return fallback;
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
}

class SharedStore {
  constructor() {
    this.courses = loadStorage(STORAGE_KEY_COURSES, COURSES_DATA);
    this.cscServices = loadStorage(STORAGE_KEY_CSC, CSC_SERVICES_DATA);
    this.govtServices = loadStorage(STORAGE_KEY_GOVT, GOVT_SERVICES_DATA);
    this.siteGallery = loadStorage(STORAGE_KEY_GALLERY, DEFAULT_GALLERY);
    this.siteSettings = loadStorage(STORAGE_KEY_SETTINGS, DEFAULT_SETTINGS);
    this.faculty = loadStorage(STORAGE_KEY_FACULTY, DEFAULT_FACULTY);
    this.batches = loadStorage(STORAGE_KEY_BATCHES, DEFAULT_BATCHES);
    this.news = loadStorage(STORAGE_KEY_NEWS, DEFAULT_NEWS);
    this.inquiries = loadStorage(STORAGE_KEY_INQUIRIES, []);
    this.listeners = [];
  }


  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((fn) => fn());
  }

  // --- Sync with Remote (Supabase) ---
  syncCoursesFromRemote(remoteCourses, isError = false) {
    if (isError || !Array.isArray(remoteCourses)) {
      return; // Never overwrite on failed/error Supabase requests
    }
    this.courses = remoteCourses.map((c) => ({
      ...c,
      title: c.title,
      isPrimary: c.is_primary !== undefined ? c.is_primary : (c.isPrimary || false),
      isFeatured: c.is_featured !== undefined ? c.is_featured : (c.isFeatured || false),
      displayOrder: c.display_order !== undefined ? c.display_order : (c.displayOrder || 0),
      subtitleMr: c.subtitle_mr || c.subtitleMr,
      subtitleEn: c.subtitle_en || c.subtitleEn,
      durationMr: c.duration_mr || c.durationMr,
      durationEn: c.duration_en || c.durationEn,
      certificationMr: c.certification_mr || c.certificationMr,
      certificationEn: c.certification_en || c.certificationEn,
      eligibilityMr: c.eligibility_mr || c.eligibilityMr,
      eligibilityEn: c.eligibility_en || c.eligibilityEn,
      overviewMr: c.overview_mr || c.overviewMr,
      overviewEn: c.overview_en || c.overviewEn,
      modulesMr: c.modules_mr || c.modulesMr || [],
      modulesEn: c.modules_en || c.modulesEn || [],
      practicalSkillsMr: c.practical_skills_mr || c.practicalSkillsMr || [],
      practicalSkillsEn: c.practical_skills_en || c.practicalSkillsEn || [],
      careersMr: c.careers_mr || c.careersMr || [],
      careersEn: c.careers_en || c.careersEn || []
    }));
    saveStorage(STORAGE_KEY_COURSES, this.courses);
    this.notify();
  }

  syncCSCServicesFromRemote(remoteCSC, isError = false) {
    if (isError || !Array.isArray(remoteCSC)) {
      return; // Never overwrite on failed/error Supabase requests
    }
    this.cscServices = remoteCSC.map((s) => ({
      ...s,
      titleMr: s.title_mr || s.titleMr,
      titleEn: s.title_en || s.titleEn,
      timelineMr: s.timeline_mr || s.timelineMr,
      timelineEn: s.timeline_en || s.timelineEn,
      govtFeeMr: s.govt_fee_mr || s.govtFeeMr,
      govtFeeEn: s.govt_fee_en || s.govtFeeEn,
      overviewMr: s.overview_mr || s.overviewMr,
      overviewEn: s.overview_en || s.overviewEn,
      requiredDocsMr: s.required_docs_mr || s.requiredDocsMr || [],
      requiredDocsEn: s.required_docs_en || s.requiredDocsEn || [],
      stepsMr: s.steps_mr || s.stepsMr || [],
      stepsEn: s.steps_en || s.stepsEn || []
    }));
    saveStorage(STORAGE_KEY_CSC, this.cscServices);
    this.notify();
  }

  syncGovtServicesFromRemote(remoteGovt, isError = false) {
    if (isError || !Array.isArray(remoteGovt)) {
      return; // Never overwrite on failed/error Supabase requests
    }
    this.govtServices = remoteGovt.map((g) => ({
      ...g,
      titleMr: g.title_mr || g.titleMr,
      titleEn: g.title_en || g.titleEn,
      timelineMr: g.timeline_mr || g.timelineMr,
      timelineEn: g.timeline_en || g.timelineEn,
      govtFeeMr: g.govt_fee_mr || g.govtFeeMr,
      govtFeeEn: g.govt_fee_en || g.govtFeeEn,
      overviewMr: g.overview_mr || g.overviewMr,
      overviewEn: g.overview_en || g.overviewEn,
      requiredDocsMr: g.required_docs_mr || g.requiredDocsMr || [],
      requiredDocsEn: g.required_docs_en || g.requiredDocsEn || [],
      stepsMr: g.steps_mr || g.stepsMr || [],
      stepsEn: g.steps_en || g.stepsEn || []
    }));
    saveStorage(STORAGE_KEY_GOVT, this.govtServices);
    this.notify();
  }

  syncGalleryFromRemote(remoteGallery) {
    if (Array.isArray(remoteGallery)) {
      this.siteGallery = remoteGallery.map((item) => ({
        id: item.id,
        title_mr: item.title_mr || item.titleMr,
        title_en: item.title_en || item.titleEn,
        desc_mr: item.desc_mr || item.descMr,
        desc_en: item.desc_en || item.descEn,
        category: item.category || 'Campus',
        image_url: item.image_url || item.imageUrl
      }));
      saveStorage(STORAGE_KEY_GALLERY, this.siteGallery);
      this.notify();
    }
  }

  syncInquiriesFromRemote(remoteInquiries) {
    if (Array.isArray(remoteInquiries)) {
      this.inquiries = remoteInquiries;
      saveStorage(STORAGE_KEY_INQUIRIES, this.inquiries);
      this.notify();
    }
  }

  syncFacultyFromRemote(remoteFaculty) {
    if (Array.isArray(remoteFaculty)) {
      const seenNames = new Set();
      const unique = [];
      for (const item of remoteFaculty) {
        const normName = (item.name || '').trim().toLowerCase();
        if (normName && !seenNames.has(normName)) {
          seenNames.add(normName);
          unique.push({
            id: item.id,
            name: item.name,
            roleMr: item.role_mr || item.roleMr,
            roleEn: item.role_en || item.roleEn,
            expMr: item.exp_mr || item.expMr,
            expEn: item.exp_en || item.expEn,
            specMr: item.spec_mr || item.specMr,
            specEn: item.spec_en || item.specEn,
            badge: item.badge || 'Faculty',
            imageUrl: item.image_url || item.imageUrl
          });
        }
      }
      this.faculty = unique;
      saveStorage(STORAGE_KEY_FACULTY, this.faculty);
      this.notify();
    }
  }

  syncBatchesFromRemote(remoteBatches) {
    if (Array.isArray(remoteBatches)) {
      this.batches = remoteBatches.map((item) => ({
        id: item.id,
        category: item.category || 'morning',
        time: item.time,
        courseMr: item.course_mr || item.courseMr,
        courseEn: item.course_en || item.courseEn,
        statusMr: item.status_mr || item.statusMr,
        statusEn: item.status_en || item.statusEn,
        seatsMr: item.seats_mr || item.seatsMr,
        seatsEn: item.seats_en || item.seatsEn
      }));
      saveStorage(STORAGE_KEY_BATCHES, this.batches);
      this.notify();
    }
  }

  syncNewsFromRemote(remoteNews) {
    if (Array.isArray(remoteNews)) {
      this.news = remoteNews.map((item) => ({
        id: item.id,
        titleMr: item.title_mr || item.titleMr,
        titleEn: item.title_en || item.titleEn,
        categoryMr: item.category_mr || item.categoryMr,
        categoryEn: item.category_en || item.categoryEn,
        dateStr: item.date_str || item.dateStr,
        descMr: item.desc_mr || item.descMr,
        descEn: item.desc_en || item.descEn
      }));
      saveStorage(STORAGE_KEY_NEWS, this.news);
      this.notify();
    }
  }

  // --- Batches Management ---
  getBatches() { return this.batches; }
  saveBatchItem(item) {
    const idx = this.batches.findIndex((b) => b.id === item.id);
    if (idx >= 0) {
      this.batches[idx] = { ...this.batches[idx], ...item };
    } else {
      this.batches.unshift({ id: `b-${Date.now()}`, ...item });
    }
    saveStorage(STORAGE_KEY_BATCHES, this.batches);
    this.notify();
  }
  deleteBatchItem(id) {
    this.batches = this.batches.filter((b) => b.id !== id);
    saveStorage(STORAGE_KEY_BATCHES, this.batches);
    this.notify();
  }

  // --- News & Announcements Management ---
  getNews() { return this.news; }
  saveNewsItem(item) {
    const idx = this.news.findIndex((n) => n.id === item.id);
    if (idx >= 0) {
      this.news[idx] = { ...this.news[idx], ...item };
    } else {
      this.news.unshift({ id: `n-${Date.now()}`, ...item });
    }
    saveStorage(STORAGE_KEY_NEWS, this.news);
    this.notify();
  }
  deleteNewsItem(id) {
    this.news = this.news.filter((n) => n.id !== id);
    saveStorage(STORAGE_KEY_NEWS, this.news);
    this.notify();
  }

  // --- Faculty Management ---
  getFaculty() { return this.faculty; }
  saveFacultyItem(item) {
    const normName = (item.name || '').trim().toLowerCase();
    const idx = this.faculty.findIndex((f) => 
      (item.id && f.id === item.id) || 
      (normName && (f.name || '').trim().toLowerCase() === normName)
    );
    if (idx >= 0) {
      this.faculty[idx] = { ...this.faculty[idx], ...item };
    } else {
      this.faculty.unshift({ id: item.id || `fac-${Date.now()}`, ...item });
    }

    const seen = new Set();
    this.faculty = this.faculty.filter((f) => {
      const n = (f.name || '').trim().toLowerCase();
      if (!n || seen.has(n)) return false;
      seen.add(n);
      return true;
    });

    saveStorage(STORAGE_KEY_FACULTY, this.faculty);
    this.notify();
  }
  deleteFacultyItem(id) {
    const target = this.faculty.find((f) => f.id === id);
    const targetName = target ? (target.name || '').trim().toLowerCase() : null;
    this.faculty = this.faculty.filter((f) => f.id !== id && ((!targetName) || (f.name || '').trim().toLowerCase() !== targetName));
    saveStorage(STORAGE_KEY_FACULTY, this.faculty);
    this.notify();
  }

  // --- Courses ---
  getCourses() { return this.courses; }
  saveCourse(courseData) {
    const idx = this.courses.findIndex((c) => c.id === courseData.id || c.slug === courseData.slug);
    if (idx >= 0) {
      this.courses[idx] = { ...this.courses[idx], ...courseData };
    } else {
      this.courses.unshift({ id: `c-${Date.now()}`, slug: courseData.slug || `c-${Date.now()}`, ...courseData });
    }
    saveStorage(STORAGE_KEY_COURSES, this.courses);
    this.notify();
  }
  deleteCourse(id) {
    this.courses = this.courses.filter((c) => c.id !== id && c.slug !== id);
    saveStorage(STORAGE_KEY_COURSES, this.courses);
    this.notify();
  }

  // --- CSC Services ---
  getCSCServices() { return this.cscServices; }
  saveCSCService(serviceData) {
    const idx = this.cscServices.findIndex((s) => s.id === serviceData.id || s.slug === serviceData.slug);
    if (idx >= 0) {
      this.cscServices[idx] = { ...this.cscServices[idx], ...serviceData };
    } else {
      this.cscServices.unshift({ id: `csc-${Date.now()}`, slug: serviceData.slug || `csc-${Date.now()}`, ...serviceData });
    }
    saveStorage(STORAGE_KEY_CSC, this.cscServices);
    this.notify();
  }
  deleteCSCService(id) {
    this.cscServices = this.cscServices.filter((s) => s.id !== id && s.slug !== id);
    saveStorage(STORAGE_KEY_CSC, this.cscServices);
    this.notify();
  }

  // --- Govt Services ---
  getGovtServices() { return this.govtServices; }
  saveGovtService(serviceData) {
    const idx = this.govtServices.findIndex((g) => g.id === serviceData.id || g.slug === serviceData.slug);
    if (idx >= 0) {
      this.govtServices[idx] = { ...this.govtServices[idx], ...serviceData };
    } else {
      this.govtServices.unshift({ id: `govt-${Date.now()}`, slug: serviceData.slug || `govt-${Date.now()}`, ...serviceData });
    }
    saveStorage(STORAGE_KEY_GOVT, this.govtServices);
    this.notify();
  }
  deleteGovtService(id) {
    this.govtServices = this.govtServices.filter((g) => g.id !== id && g.slug !== id);
    saveStorage(STORAGE_KEY_GOVT, this.govtServices);
    this.notify();
  }

  // --- Site Gallery & About Images ---
  getSiteGallery() { return this.siteGallery; }
  saveSiteGalleryItem(item) {
    const titleMatch = (item.title_en || item.titleEn || item.title_mr || item.titleMr || '').trim().toLowerCase();
    const idx = this.siteGallery.findIndex((g) => 
      (item.id && g.id === item.id) ||
      (titleMatch && (g.title_en || g.titleEn || g.title_mr || g.titleMr || '').trim().toLowerCase() === titleMatch)
    );
    if (idx >= 0) {
      this.siteGallery[idx] = { ...this.siteGallery[idx], ...item };
    } else {
      this.siteGallery.unshift({ id: item.id || `gal-${Date.now()}`, ...item });
    }
    saveStorage(STORAGE_KEY_GALLERY, this.siteGallery);
    this.notify();
  }
  deleteSiteGalleryItem(id) {
    this.siteGallery = this.siteGallery.filter((g) => g.id !== id);
    saveStorage(STORAGE_KEY_GALLERY, this.siteGallery);
    this.notify();
  }

  // --- Site Settings (Logo & Hero Background Image) ---
  getSiteSettings() { return this.siteSettings; }
  saveSiteSettings(settings) {
    this.siteSettings = { ...this.siteSettings, ...settings };
    saveStorage(STORAGE_KEY_SETTINGS, this.siteSettings);
    this.notify();
  }

  // --- Inquiries ---
  getInquiries() { return this.inquiries; }
  addInquiry(inq) {
    const item = { id: `inq-${Date.now()}`, created_at: new Date().toISOString(), status: 'New Lead', ...inq };
    this.inquiries.unshift(item);
    saveStorage(STORAGE_KEY_INQUIRIES, this.inquiries);
    this.notify();
    return item;
  }
  updateInquiryStatus(id, newStatus) {
    this.inquiries = this.inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
    saveStorage(STORAGE_KEY_INQUIRIES, this.inquiries);
    this.notify();
  }
  deleteInquiry(id) {
    this.inquiries = this.inquiries.filter((i) => i.id !== id);
    saveStorage(STORAGE_KEY_INQUIRIES, this.inquiries);
    this.notify();
  }
}

export const sharedStore = new SharedStore();
