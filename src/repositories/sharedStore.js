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
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'fac-2',
    name: 'Swati Bhosale (M.A. B.Ed)',
    roleMr: 'टॅली एक्स्पर्ट & सिनियर ट्रेनर',
    roleEn: 'Tally Expert & Trainer',
    expMr: '१०+ वर्षांचा टीचिंग अनुभव',
    expEn: 'Over 10 years of teaching experience',
    specMr: 'M.A. B.Ed पदवीधर. टॅली प्राइम (GST), अकाउंटिंग फंडामेंटल्स आणि फायनान्शियल मॅनेजमेंट तज्ज्ञ.',
    specEn: 'B.Ed qualified with specialized expertise in Tally Prime (GST), accounting fundamentals, and financial management.',
    badge: 'Tally Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

const DEFAULT_SETTINGS = {
  logoUrl: '',
  heroBgUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  heroTitleMr: 'समर्थ कॉम्प्युटर्स खंडाळा — तुमच्या करिअरचा स्मार्ट निर्णय!',
  heroTitleEn: 'Samarth Computers Khandala — Smart Decision for Your Career!'
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
    if (saved) return JSON.parse(saved);
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
  syncCoursesFromRemote(remoteCourses) {
    if (Array.isArray(remoteCourses) && remoteCourses.length > 0) {
      this.courses = remoteCourses.map((c) => ({
        ...c,
        title: c.title,
        subtitleMr: c.subtitle_mr || c.subtitleMr,
        subtitleEn: c.subtitle_en || c.subtitleEn,
        durationMr: c.duration_mr || c.durationMr,
        durationEn: c.duration_en || c.durationEn,
        feeMr: c.fee_mr || c.feeMr,
        feeEn: c.fee_en || c.feeEn,
        certificationMr: c.certification_mr || c.certificationMr,
        certificationEn: c.certification_en || c.certificationEn,
        eligibilityMr: c.eligibility_mr || c.eligibilityMr,
        eligibilityEn: c.eligibility_en || c.eligibilityEn,
        overviewMr: c.overview_mr || c.overviewMr,
        overviewEn: c.overview_en || c.overviewEn,
        modulesMr: c.modules_mr || c.modulesMr || [],
        modulesEn: c.modules_en || c.modulesEn || [],
        careersMr: c.careers_mr || c.careersMr || [],
        careersEn: c.careers_en || c.careersEn || []
      }));
      saveStorage(STORAGE_KEY_COURSES, this.courses);
      this.notify();
    }
  }

  syncCSCServicesFromRemote(remoteCSC) {
    if (Array.isArray(remoteCSC) && remoteCSC.length > 0) {
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
  }

  syncGovtServicesFromRemote(remoteGovt) {
    if (Array.isArray(remoteGovt) && remoteGovt.length > 0) {
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
        requirementsMr: g.requirements_mr || g.requirementsMr || [],
        requirementsEn: g.requirements_en || g.requirementsEn || [],
        stepsMr: g.steps_mr || g.stepsMr || [],
        stepsEn: g.steps_en || g.stepsEn || []
      }));
      saveStorage(STORAGE_KEY_GOVT, this.govtServices);
      this.notify();
    }
  }

  syncGalleryFromRemote(remoteGallery) {
    if (Array.isArray(remoteGallery) && remoteGallery.length > 0) {
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
    if (Array.isArray(remoteInquiries) && remoteInquiries.length > 0) {
      this.inquiries = remoteInquiries;
      saveStorage(STORAGE_KEY_INQUIRIES, this.inquiries);
      this.notify();
    }
  }

  syncFacultyFromRemote(remoteFaculty) {
    if (Array.isArray(remoteFaculty) && remoteFaculty.length > 0) {
      this.faculty = remoteFaculty.map((item) => ({
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
      }));
      saveStorage(STORAGE_KEY_FACULTY, this.faculty);
      this.notify();
    }
  }

  // --- Faculty Management ---
  getFaculty() { return this.faculty; }
  saveFacultyItem(item) {
    const idx = this.faculty.findIndex((f) => f.id === item.id);
    if (idx >= 0) {
      this.faculty[idx] = { ...this.faculty[idx], ...item };
    } else {
      this.faculty.unshift({ id: `fac-${Date.now()}`, ...item });
    }
    saveStorage(STORAGE_KEY_FACULTY, this.faculty);
    this.notify();
  }
  deleteFacultyItem(id) {
    this.faculty = this.faculty.filter((f) => f.id !== id);
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
    const idx = this.siteGallery.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      this.siteGallery[idx] = { ...this.siteGallery[idx], ...item };
    } else {
      this.siteGallery.unshift({ id: `gal-${Date.now()}`, ...item });
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
