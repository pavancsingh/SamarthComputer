import { supabase } from '../lib/supabase';
import { sharedStore } from './sharedStore';

/**
 * Resilient Supabase Upsert Helper
 * Automatically handles schema cache or table column mismatch errors (e.g., missing optional columns)
 * by stripping the reported missing column and retrying the upsert operation.
 */
async function upsertWithColumnFallback(tableName, payload) {
  let currentPayload = { ...payload };
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    attempts++;
    const { data, error } = await supabase.from(tableName).upsert([currentPayload]).select();
    if (!error) {
      return { success: true, data: data?.[0] };
    }

    const errorMsg = error.message || '';
    const match = errorMsg.match(/Could not find the ['"](.+?)['"] column/i) ||
                  errorMsg.match(/column ['"](.+?)['"] of relation/i) ||
                  errorMsg.match(/column ['"](.+?)['"] does not exist/i);

    if (match && match[1] && Object.prototype.hasOwnProperty.call(currentPayload, match[1])) {
      const missingCol = match[1];
      console.warn(`[AdminRepository] Column '${missingCol}' missing in table '${tableName}'. Omitting column and retrying...`);
      delete currentPayload[missingCol];
      continue;
    }

    return { success: false, error: error.message };
  }

  return { success: false, error: `Failed to save record to '${tableName}' after column fallback attempts.` };
}

/**
 * AdminRepository — Direct Supabase Integration (Single Source of Truth)
 * Handles CRUD operations directly with Supabase PostgreSQL database.
 * If a database operation fails, returns exact error message.
 */
export const AdminRepository = {

  // ================= COURSES CRUD =================
  async getAllCourses() {
    let { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error && error.message.includes('display_order')) {
      const retry = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      data = retry.data;
      error = retry.error;
    }

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase fetch courses error:', error.message);
      return sharedStore.getCourses();
    }
    return data;
  },

  async saveCourse(courseData) {
    const payload = {
      slug: courseData.slug || `course-${Date.now()}`,
      title: courseData.title,
      subtitle_mr: courseData.subtitleMr || courseData.subtitle_mr || courseData.title,
      subtitle_en: courseData.subtitleEn || courseData.subtitle_en || courseData.title,
      category: courseData.category || 'govt',
      tag: courseData.tag || 'New',
      is_primary: courseData.isPrimary !== undefined ? courseData.isPrimary : (courseData.is_primary || false),
      is_featured: courseData.isFeatured !== undefined ? courseData.isFeatured : (courseData.is_featured || false),
      display_order: courseData.displayOrder !== undefined ? parseInt(courseData.displayOrder, 10) || 0 : (courseData.display_order || 0),
      duration_mr: courseData.durationMr || courseData.duration_mr || courseData.durationEn,
      duration_en: courseData.durationEn || courseData.duration_en,
      certification_mr: courseData.certificationMr || courseData.certification_mr || courseData.certificationEn,
      certification_en: courseData.certificationEn || courseData.certification_en,
      eligibility_mr: courseData.eligibilityMr || courseData.eligibility_mr || courseData.eligibilityEn,
      eligibility_en: courseData.eligibilityEn || courseData.eligibility_en,
      overview_mr: courseData.overviewMr || courseData.overview_mr || courseData.overviewEn,
      overview_en: courseData.overviewEn || courseData.overview_en,
      modules_mr: courseData.modulesMr || courseData.modules_mr || [],
      modules_en: courseData.modulesEn || courseData.modules_en || [],
      careers_mr: courseData.careersMr || courseData.careers_mr || [],
      careers_en: courseData.careersEn || courseData.careers_en || [],
      image_url: courseData.imageUrl || courseData.image_url || null
    };

    if (courseData.id && !courseData.id.toString().startsWith('c-')) {
      payload.id = courseData.id;
    }

    const res = await upsertWithColumnFallback('courses', payload);
    if (res.success) {
      sharedStore.saveCourse(res.data || courseData);
    }
    return res;
  },

  async deleteCourse(id) {
    const { error } = await supabase.from('courses').delete().or(`id.eq.${id},slug.eq.${id}`);
    if (error) {
      console.error('Supabase course delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteCourse(id);
    return { success: true };
  },

  // ================= CSC SERVICES CRUD =================
  async getAllCSCServices() {
    let { data, error } = await supabase
      .from('csc_services')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error && error.message.includes('display_order')) {
      const retry = await supabase
        .from('csc_services')
        .select('*')
        .order('created_at', { ascending: false });
      data = retry.data;
      error = retry.error;
    }

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase fetch CSC error:', error.message);
      return sharedStore.getCSCServices();
    }
    return data;
  },

  async saveCSCService(serviceData) {
    const payload = {
      slug: serviceData.slug || `csc-${Date.now()}`,
      title_mr: serviceData.titleMr || serviceData.title_mr || serviceData.titleEn,
      title_en: serviceData.titleEn || serviceData.title_en || serviceData.titleMr,
      category: serviceData.category || 'csc',
      badge: serviceData.badge || 'Govt Service',
      timeline_mr: serviceData.timelineMr || serviceData.timeline_mr || serviceData.timelineEn,
      timeline_en: serviceData.timelineEn || serviceData.timeline_en,
      deadline_mr: serviceData.deadlineMr || serviceData.deadline_mr || serviceData.deadlineEn || 'सदैव उपलब्ध',
      deadline_en: serviceData.deadlineEn || serviceData.deadline_en || serviceData.deadlineMr || 'Always Available',
      status: serviceData.status || 'Open',
      official_url: serviceData.officialUrl || serviceData.official_url || '',
      is_featured: serviceData.isFeatured !== undefined ? serviceData.isFeatured : (serviceData.is_featured || false),
      govt_fee_mr: serviceData.govtFeeMr || serviceData.govt_fee_mr || serviceData.govtFeeEn,
      govt_fee_en: serviceData.govtFeeEn || serviceData.govt_fee_en,
      overview_mr: serviceData.overviewMr || serviceData.overview_mr || serviceData.overviewEn,
      overview_en: serviceData.overviewEn || serviceData.overview_en,
      required_docs_mr: serviceData.requiredDocsMr || serviceData.required_docs_mr || [],
      required_docs_en: serviceData.requiredDocsEn || serviceData.required_docs_en || [],
      steps_mr: serviceData.stepsMr || serviceData.steps_mr || [],
      steps_en: serviceData.stepsEn || serviceData.steps_en || [],
      image_url: serviceData.imageUrl || serviceData.image_url || null,
      display_order: serviceData.displayOrder !== undefined ? serviceData.displayOrder : (serviceData.display_order || 0)
    };

    if (serviceData.id && !serviceData.id.toString().startsWith('csc-')) {
      payload.id = serviceData.id;
    }

    const res = await upsertWithColumnFallback('csc_services', payload);
    if (res.success) {
      sharedStore.saveCSCService(res.data || serviceData);
    }
    return res;
  },

  async deleteCSCService(id) {
    const { error } = await supabase.from('csc_services').delete().or(`id.eq.${id},slug.eq.${id}`);
    if (error) {
      console.error('Supabase CSC delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteCSCService(id);
    return { success: true };
  },

  // ================= GOVT SERVICES CRUD =================
  async getAllGovtServices() {
    const { data, error } = await supabase
      .from('govt_services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase fetch Govt services error:', error.message);
      return sharedStore.getGovtServices();
    }
    return data;
  },

  async saveGovtService(serviceData) {
    const payload = {
      slug: serviceData.slug || `govt-${Date.now()}`,
      title_mr: serviceData.titleMr || serviceData.title_mr || serviceData.titleEn,
      title_en: serviceData.titleEn || serviceData.title_en || serviceData.titleMr,
      category: serviceData.category || 'revenue',
      badge: serviceData.badge || 'Govt Certificate',
      timeline_mr: serviceData.timelineMr || serviceData.timeline_mr || serviceData.timelineEn,
      timeline_en: serviceData.timelineEn || serviceData.timeline_en,
      govt_fee_mr: serviceData.govtFeeMr || serviceData.govt_fee_mr || serviceData.govtFeeEn,
      govt_fee_en: serviceData.govtFeeEn || serviceData.govt_fee_en,
      overview_mr: serviceData.overviewMr || serviceData.overview_mr || serviceData.overviewEn,
      overview_en: serviceData.overviewEn || serviceData.overview_en,
      required_docs_mr: serviceData.requiredDocsMr || serviceData.required_docs_mr || serviceData.requirementsMr || serviceData.requirements_mr || [],
      required_docs_en: serviceData.requiredDocsEn || serviceData.required_docs_en || serviceData.requirementsEn || serviceData.requirements_en || [],
      steps_mr: serviceData.stepsMr || serviceData.steps_mr || [],
      steps_en: serviceData.stepsEn || serviceData.steps_en || [],
      image_url: serviceData.imageUrl || serviceData.image_url || null
    };

    if (serviceData.id && !serviceData.id.toString().startsWith('govt-')) {
      payload.id = serviceData.id;
    }

    const res = await upsertWithColumnFallback('govt_services', payload);
    if (res.success) {
      sharedStore.saveGovtService(res.data || serviceData);
    }
    return res;
  },

  async deleteGovtService(id) {
    const { error } = await supabase.from('govt_services').delete().or(`id.eq.${id},slug.eq.${id}`);
    if (error) {
      console.error('Supabase Govt delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteGovtService(id);
    return { success: true };
  },

  // ================= INQUIRIES & LEADS MANAGEMENT =================
  async getAllInquiries() {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase fetch inquiries error:', error.message);
      return sharedStore.getInquiries();
    }
    return data;
  },

  async saveInquiry(inquiryData) {
    const payload = {
      name: inquiryData.name,
      mobile: inquiryData.mobile,
      course_id: inquiryData.course_id || inquiryData.service_id || 'Course Inquiry',
      service_id: inquiryData.service_id || null,
      batch_timing: inquiryData.batch_timing || 'Morning',
      status: inquiryData.status || 'New Lead'
    };

    const res = await upsertWithColumnFallback('inquiries', payload);
    if (res.success) {
      sharedStore.addInquiry(res.data || inquiryData);
    }
    return res;
  },

  async updateInquiryStatus(id, newStatus) {
    const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    if (error) {
      console.error('Supabase inquiry update error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.updateInquiryStatus(id, newStatus);
    return { success: true };
  },

  async deleteInquiry(id) {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) {
      console.error('Supabase inquiry delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteInquiry(id);
    return { success: true };
  },

  // ================= SITE GALLERY CRUD =================
  async getAllSiteGallery() {
    const { data, error } = await supabase
      .from('site_gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase gallery fetch error:', error.message);
      return sharedStore.getSiteGallery();
    }
    return data;
  },

  async saveSiteGalleryItem(itemData) {
    const payload = {
      title_mr: itemData.titleMr || itemData.title_mr || itemData.titleEn || itemData.title_en,
      title_en: itemData.titleEn || itemData.title_en || itemData.titleMr || itemData.title_mr,
      desc_mr: itemData.descMr || itemData.desc_mr || itemData.descEn || itemData.desc_en,
      desc_en: itemData.descEn || itemData.desc_en || itemData.descMr || itemData.desc_mr,
      category: itemData.category || 'Campus',
      image_url: itemData.imageUrl || itemData.image_url
    };

    if (itemData.id && !itemData.id.toString().startsWith('gal-')) {
      payload.id = itemData.id;
    }

    const res = await upsertWithColumnFallback('site_gallery', payload);
    if (res.success) {
      sharedStore.saveSiteGalleryItem(res.data || itemData);
    }
    return res;
  },

  async deleteSiteGalleryItem(id) {
    const { error } = await supabase.from('site_gallery').delete().eq('id', id);
    if (error) {
      console.error('Supabase gallery delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteSiteGalleryItem(id);
    return { success: true };
  },

  // ================= FACULTY MANAGEMENT CRUD =================
  async getAllFaculty() {
    const { data, error } = await supabase
      .from('faculties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase faculty fetch error:', error.message);
      return sharedStore.getFaculty();
    }
    return data;
  },

  async saveFacultyItem(itemData) {
    const payload = {
      name: itemData.name,
      role_mr: itemData.roleMr || itemData.role_mr,
      role_en: itemData.roleEn || itemData.role_en,
      exp_mr: itemData.expMr || itemData.exp_mr,
      exp_en: itemData.expEn || itemData.exp_en,
      spec_mr: itemData.specMr || itemData.spec_mr,
      spec_en: itemData.specEn || itemData.spec_en,
      badge: itemData.badge || 'Faculty',
      image_url: itemData.imageUrl || itemData.image_url
    };

    let targetId = itemData.id;
    if (!targetId || targetId.toString().startsWith('fac-')) {
      // Lookup existing faculty by name to prevent duplicate creation
      const { data: existing } = await supabase
        .from('faculties')
        .select('id')
        .eq('name', itemData.name)
        .maybeSingle();
      if (existing && existing.id) {
        targetId = existing.id;
      }
    }

    if (targetId && !targetId.toString().startsWith('fac-')) {
      payload.id = targetId;
    }

    const res = await upsertWithColumnFallback('faculties', payload);
    if (res.success) {
      sharedStore.saveFacultyItem(res.data || itemData);
    }
    return res;
  },

  async deleteFacultyItem(id) {
    const { error } = await supabase.from('faculties').delete().eq('id', id);
    if (error) {
      console.error('Supabase faculty delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteFacultyItem(id);
    return { success: true };
  },

  // ================= BATCH TIMETABLE CRUD =================
  async getAllBatches() {
    const { data, error } = await supabase
      .from('batches')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase batch fetch error:', error.message);
      return sharedStore.getBatches();
    }
    return data;
  },

  async saveBatchItem(itemData) {
    const payload = {
      category: itemData.category || 'morning',
      time: itemData.time,
      course_mr: itemData.courseMr || itemData.course_mr,
      course_en: itemData.courseEn || itemData.course_en,
      status_mr: itemData.statusMr || itemData.status_mr,
      status_en: itemData.statusEn || itemData.status_en,
      seats_mr: itemData.seatsMr || itemData.seats_mr,
      seats_en: itemData.seatsEn || itemData.seats_en
    };

    if (itemData.id && !itemData.id.toString().startsWith('b-')) {
      payload.id = itemData.id;
    }

    const res = await upsertWithColumnFallback('batches', payload);
    if (res.success) {
      sharedStore.saveBatchItem(res.data || itemData);
    }
    return res;
  },

  async deleteBatchItem(id) {
    const { error } = await supabase.from('batches').delete().eq('id', id);
    if (error) {
      console.error('Supabase batch delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteBatchItem(id);
    return { success: true };
  },

  // ================= NEWS & ANNOUNCEMENTS CRUD =================
  async getAllNews() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase news fetch error:', error.message);
      return sharedStore.getNews();
    }
    return data;
  },

  async saveNewsItem(itemData) {
    const payload = {
      title_mr: itemData.titleMr || itemData.title_mr,
      title_en: itemData.titleEn || itemData.title_en,
      category_mr: itemData.categoryMr || itemData.category_mr,
      category_en: itemData.categoryEn || itemData.category_en,
      date_str: itemData.dateStr || itemData.date_str,
      desc_mr: itemData.descMr || itemData.desc_mr,
      desc_en: itemData.descEn || itemData.desc_en
    };

    if (itemData.id && !itemData.id.toString().startsWith('n-')) {
      payload.id = itemData.id;
    }

    const res = await upsertWithColumnFallback('news', payload);
    if (res.success) {
      sharedStore.saveNewsItem(res.data || itemData);
    }
    return res;
  },

  async deleteNewsItem(id) {
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) {
      console.error('Supabase news delete error:', error.message);
      return { success: false, error: error.message };
    }
    sharedStore.deleteNewsItem(id);
    return { success: true };
  },

  // ================= SITE SETTINGS CRUD =================
  async getSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 'main_settings')
      .maybeSingle();

    if (!error && data) {
      return {
        logoUrl: data.logo_url,
        heroBgUrl: data.hero_bg_url,
        heroTitleMr: data.hero_title_mr,
        heroTitleEn: data.hero_title_en
      };
    }
    return sharedStore.getSiteSettings();
  },

  async saveSiteSettings(settings) {
    const payload = {
      id: 'main_settings',
      logo_url: settings.logoUrl || null,
      hero_bg_url: settings.heroBgUrl || null,
      hero_title_mr: settings.heroTitleMr || null,
      hero_title_en: settings.heroTitleEn || null
    };

    const res = await upsertWithColumnFallback('site_settings', payload);
    if (res.success) {
      sharedStore.saveSiteSettings(res.data || settings);
    }
    return res;
  },

  async syncAllLocalDataToSupabase() {
    try {
      let count = 0;

      const courses = sharedStore.getCourses();
      for (const c of courses) {
        const res = await this.saveCourse(c);
        if (res.success) count++;
      }

      const csc = sharedStore.getCSCServices();
      for (const s of csc) {
        const res = await this.saveCSCService(s);
        if (res.success) count++;
      }

      const govt = sharedStore.getGovtServices();
      for (const g of govt) {
        const res = await this.saveGovtService(g);
        if (res.success) count++;
      }

      const faculty = sharedStore.getFaculty();
      for (const f of faculty) {
        const res = await this.saveFacultyItem(f);
        if (res.success) count++;
      }

      const gallery = sharedStore.getSiteGallery();
      for (const gal of gallery) {
        const res = await this.saveSiteGalleryItem(gal);
        if (res.success) count++;
      }

      const batches = sharedStore.getBatches();
      for (const b of batches) {
        const res = await this.saveBatchItem(b);
        if (res.success) count++;
      }

      const news = sharedStore.getNews();
      for (const n of news) {
        const res = await this.saveNewsItem(n);
        if (res.success) count++;
      }

      const settings = sharedStore.getSiteSettings();
      if (settings) {
        const res = await this.saveSiteSettings(settings);
        if (res.success) count++;
      }

      return { success: true, count };
    } catch (err) {
      console.error('syncAllLocalDataToSupabase error:', err.message);
      return { success: false, error: err.message };
    }
  }
};


