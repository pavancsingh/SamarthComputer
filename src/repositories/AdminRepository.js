import { sharedStore } from './sharedStore';
import { supabase } from '../lib/supabase';

export const AdminRepository = {
  // ================= COURSES CRUD =================
  async getAllCourses() {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch courses error:', error.message);
        return sharedStore.getCourses();
      }

      if (data) {
        sharedStore.syncCoursesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase fetch courses exception:', e.message);
    }
    return sharedStore.getCourses();
  },

  async saveCourse(courseData) {
    try {
      const payload = {
        slug: courseData.slug || `course-${Date.now()}`,
        title: courseData.title,
        subtitle_mr: courseData.subtitleMr || courseData.subtitle_mr || courseData.title,
        subtitle_en: courseData.subtitleEn || courseData.subtitle_en || courseData.title,
        category: courseData.category || 'govt',
        tag: courseData.tag || 'New',
        duration_mr: courseData.durationMr || courseData.duration_mr || courseData.durationEn,
        duration_en: courseData.durationEn || courseData.duration_en,
        fee_mr: courseData.feeMr || courseData.fee_mr || courseData.feeEn,
        fee_en: courseData.feeEn || courseData.fee_en,
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

      const { data, error } = await supabase
        .from('courses')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase course save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveCourse({ ...courseData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase course save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteCourse(id) {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .or(`id.eq.${id},slug.eq.${id}`);

      if (error) {
        console.error('Supabase course delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteCourse(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase course delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= CSC SERVICES CRUD =================
  async getAllCSCServices() {
    try {
      const { data, error } = await supabase
        .from('csc_services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch CSC error:', error.message);
        return sharedStore.getCSCServices();
      }

      if (data) {
        sharedStore.syncCSCServicesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase fetch CSC exception:', e.message);
    }
    return sharedStore.getCSCServices();
  },

  async saveCSCService(serviceData) {
    try {
      const payload = {
        slug: serviceData.slug || `csc-${Date.now()}`,
        title_mr: serviceData.titleMr || serviceData.title_mr || serviceData.titleEn,
        title_en: serviceData.titleEn || serviceData.title_en || serviceData.titleMr,
        category: serviceData.category || 'identity',
        badge: serviceData.badge || 'Govt Service',
        timeline_mr: serviceData.timelineMr || serviceData.timeline_mr || serviceData.timelineEn,
        timeline_en: serviceData.timelineEn || serviceData.timeline_en,
        govt_fee_mr: serviceData.govtFeeMr || serviceData.govt_fee_mr || serviceData.govtFeeEn,
        govt_fee_en: serviceData.govtFeeEn || serviceData.govt_fee_en,
        overview_mr: serviceData.overviewMr || serviceData.overview_mr || serviceData.overviewEn,
        overview_en: serviceData.overviewEn || serviceData.overview_en,
        required_docs_mr: serviceData.requiredDocsMr || serviceData.required_docs_mr || [],
        required_docs_en: serviceData.requiredDocsEn || serviceData.required_docs_en || [],
        steps_mr: serviceData.stepsMr || serviceData.steps_mr || [],
        steps_en: serviceData.stepsEn || serviceData.steps_en || [],
        image_url: serviceData.imageUrl || serviceData.image_url || null
      };

      if (serviceData.id && !serviceData.id.toString().startsWith('csc-')) {
        payload.id = serviceData.id;
      }

      const { data, error } = await supabase
        .from('csc_services')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase CSC save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveCSCService({ ...serviceData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase CSC save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteCSCService(id) {
    try {
      const { error } = await supabase
        .from('csc_services')
        .delete()
        .or(`id.eq.${id},slug.eq.${id}`);

      if (error) {
        console.error('Supabase CSC delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteCSCService(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase CSC delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= GOVT SERVICES CRUD =================
  async getAllGovtServices() {
    try {
      const { data, error } = await supabase
        .from('govt_services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch Govt services error:', error.message);
        return sharedStore.getGovtServices();
      }

      if (data) {
        sharedStore.syncGovtServicesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase fetch Govt services exception:', e.message);
    }
    return sharedStore.getGovtServices();
  },

  async saveGovtService(serviceData) {
    try {
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
        requirements_mr: serviceData.requirementsMr || serviceData.requirements_mr || [],
        requirements_en: serviceData.requirementsEn || serviceData.requirements_en || [],
        image_url: serviceData.imageUrl || serviceData.image_url || null
      };

      if (serviceData.id && !serviceData.id.toString().startsWith('govt-')) {
        payload.id = serviceData.id;
      }

      const { data, error } = await supabase
        .from('govt_services')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase Govt service save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveGovtService({ ...serviceData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase Govt service save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteGovtService(id) {
    try {
      const { error } = await supabase
        .from('govt_services')
        .delete()
        .or(`id.eq.${id},slug.eq.${id}`);

      if (error) {
        console.error('Supabase Govt service delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteGovtService(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase Govt service delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= INQUIRIES & LEADS MANAGEMENT =================
  async getAllInquiries() {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch inquiries error:', error.message);
        return sharedStore.getInquiries();
      }

      if (data) {
        sharedStore.syncInquiriesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase fetch inquiries exception:', e.message);
    }
    return sharedStore.getInquiries();
  },

  async updateInquiryStatus(id, newStatus) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Supabase inquiry update error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.updateInquiryStatus(id, newStatus);
      return { success: true };
    } catch (e) {
      console.error('Supabase inquiry update exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteInquiry(id) {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase inquiry delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteInquiry(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase inquiry delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= SITE GALLERY CRUD =================
  async getAllSiteGallery() {
    try {
      const { data, error } = await supabase
        .from('site_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase gallery fetch error:', error.message);
        return sharedStore.getSiteGallery();
      }

      if (data) {
        sharedStore.syncGalleryFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase gallery fetch exception:', e.message);
    }
    return sharedStore.getSiteGallery();
  },

  async saveSiteGalleryItem(itemData) {
    try {
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

      const { data, error } = await supabase
        .from('site_gallery')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase gallery save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveSiteGalleryItem({ ...itemData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase gallery save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteSiteGalleryItem(id) {
    try {
      const { error } = await supabase
        .from('site_gallery')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase gallery delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteSiteGalleryItem(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase gallery delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= FACULTY MANAGEMENT CRUD =================
  async getAllFaculty() {
    try {
      const { data, error } = await supabase
        .from('faculties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase faculty fetch error:', error.message);
        return sharedStore.getFaculty();
      }

      if (data) {
        sharedStore.syncFacultyFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase faculty fetch exception:', e.message);
    }
    return sharedStore.getFaculty();
  },

  async saveFacultyItem(itemData) {
    try {
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

      if (itemData.id && !itemData.id.toString().startsWith('fac-')) {
        payload.id = itemData.id;
      }

      const { data, error } = await supabase
        .from('faculties')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase faculty save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveFacultyItem({ ...itemData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase faculty save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteFacultyItem(id) {
    try {
      const { error } = await supabase
        .from('faculties')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase faculty delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteFacultyItem(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase faculty delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= BATCH TIMETABLE CRUD =================
  async getAllBatches() {
    try {
      const { data, error } = await supabase
        .from('batch_timetable')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Supabase batch fetch error:', error.message);
        return sharedStore.getBatches();
      }

      if (data) {
        sharedStore.syncBatchesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase batch fetch exception:', e.message);
    }
    return sharedStore.getBatches();
  },

  async saveBatchItem(itemData) {
    try {
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

      const { data, error } = await supabase
        .from('batch_timetable')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase batch save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveBatchItem({ ...itemData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase batch save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteBatchItem(id) {
    try {
      const { error } = await supabase
        .from('batch_timetable')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase batch delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteBatchItem(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase batch delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= NEWS & ANNOUNCEMENTS CRUD =================
  async getAllNews() {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase news fetch error:', error.message);
        return sharedStore.getNews();
      }

      if (data) {
        sharedStore.syncNewsFromRemote(data);
        return data;
      }
    } catch (e) {
      console.error('Supabase news fetch exception:', e.message);
    }
    return sharedStore.getNews();
  },

  async saveNewsItem(itemData) {
    try {
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

      const { data, error } = await supabase
        .from('news')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase news save error:', error.message);
        return { success: false, error: error.message };
      }

      const savedItem = data && data[0] ? data[0] : payload;
      sharedStore.saveNewsItem({ ...itemData, ...savedItem, id: savedItem.id });
      return { success: true, data: savedItem };
    } catch (e) {
      console.error('Supabase news save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  async deleteNewsItem(id) {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase news delete error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.deleteNewsItem(id);
      return { success: true };
    } catch (e) {
      console.error('Supabase news delete exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= SITE SETTINGS CRUD =================
  async getSiteSettings() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'main_settings')
        .maybeSingle();

      if (!error && data) {
        const settings = {
          logoUrl: data.logo_url,
          heroBgUrl: data.hero_bg_url,
          heroTitleMr: data.hero_title_mr,
          heroTitleEn: data.hero_title_en
        };
        sharedStore.saveSiteSettings(settings);
        return settings;
      }
    } catch (e) {
      console.error('Supabase settings fetch exception:', e.message);
    }
    return sharedStore.getSiteSettings();
  },

  async saveSiteSettings(settings) {
    try {
      const payload = {
        id: 'main_settings',
        logo_url: settings.logoUrl || null,
        hero_bg_url: settings.heroBgUrl || null,
        hero_title_mr: settings.heroTitleMr || null,
        hero_title_en: settings.heroTitleEn || null
      };

      const { data, error } = await supabase
        .from('site_settings')
        .upsert([payload])
        .select();

      if (error) {
        console.error('Supabase settings save error:', error.message);
        return { success: false, error: error.message };
      }

      sharedStore.saveSiteSettings(settings);
      return { success: true, data };
    } catch (e) {
      console.error('Supabase settings save exception:', e.message);
      return { success: false, error: e.message };
    }
  },

  // ================= BULK SUPABASE SYNC =================
  async syncAllLocalDataToSupabase() {
    let syncedCount = 0;
    try {
      // 1. Sync Courses
      const courses = sharedStore.getCourses();
      for (const c of courses) {
        const payload = {
          slug: c.slug || `course-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: c.title,
          subtitle_mr: c.subtitleMr || c.subtitle_mr,
          subtitle_en: c.subtitleEn || c.subtitle_en,
          category: c.category || 'govt',
          tag: c.tag || 'न्यू',
          duration_mr: c.durationMr || c.duration_mr,
          duration_en: c.durationEn || c.duration_en,
          fee_mr: c.feeMr || c.fee_mr,
          fee_en: c.feeEn || c.fee_en,
          certification_mr: c.certificationMr || c.certification_mr,
          certification_en: c.certificationEn || c.certification_en,
          eligibility_mr: c.eligibilityMr || c.eligibility_mr,
          eligibility_en: c.eligibilityEn || c.eligibility_en,
          overview_mr: c.overviewMr || c.overview_mr,
          overview_en: c.overviewEn || c.overview_en,
          image_url: c.imageUrl || c.image_url
        };
        await supabase.from('courses').upsert([payload], { onConflict: 'slug' });
        syncedCount++;
      }

      // 2. Sync CSC Services
      const csc = sharedStore.getCSCServices();
      for (const item of csc) {
        const payload = {
          slug: item.slug || `csc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title_mr: item.titleMr || item.title_mr || item.titleEn,
          title_en: item.titleEn || item.title_en,
          category: item.category || 'identity',
          badge: item.badge || 'शासकीय सेवा',
          timeline_mr: item.timelineMr || item.timeline_mr,
          timeline_en: item.timelineEn || item.timeline_en,
          govt_fee_mr: item.govtFeeMr || item.govt_fee_mr,
          govt_fee_en: item.govtFeeEn || item.govt_fee_en,
          overview_mr: item.overviewMr || item.overview_mr,
          overview_en: item.overviewEn || item.overview_en,
          image_url: item.imageUrl || item.image_url
        };
        await supabase.from('csc_services').upsert([payload], { onConflict: 'slug' });
        syncedCount++;
      }

      // 3. Sync Govt Services
      const govt = sharedStore.getGovtServices();
      for (const item of govt) {
        const payload = {
          slug: item.slug || `govt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title_mr: item.titleMr || item.title_mr || item.titleEn,
          title_en: item.titleEn || item.title_en,
          category: item.category || 'revenue',
          badge: item.badge || 'तहसीलदार प्रमाणपत्र',
          timeline_mr: item.timelineMr || item.timeline_mr,
          timeline_en: item.timelineEn || item.timeline_en,
          govt_fee_mr: item.govtFeeMr || item.govt_fee_mr,
          govt_fee_en: item.govtFeeEn || item.govt_fee_en,
          overview_mr: item.overviewMr || item.overview_mr,
          overview_en: item.overviewEn || item.overview_en,
          image_url: item.imageUrl || item.image_url
        };
        await supabase.from('govt_services').upsert([payload], { onConflict: 'slug' });
        syncedCount++;
      }

      // 4. Sync Site Gallery
      const gallery = sharedStore.getSiteGallery();
      for (const item of gallery) {
        const payload = {
          title_mr: item.titleMr || item.title_mr || item.titleEn,
          title_en: item.titleEn || item.title_en,
          desc_mr: item.descMr || item.desc_mr,
          desc_en: item.descEn || item.desc_en,
          category: item.category || 'Campus',
          image_url: item.imageUrl || item.image_url
        };
        if (item.id && !item.id.toString().startsWith('gal-')) payload.id = item.id;
        await supabase.from('site_gallery').upsert([payload]);
        syncedCount++;
      }

      // 5. Sync Faculty
      const faculty = sharedStore.getFaculty();
      for (const item of faculty) {
        const payload = {
          name: item.name,
          role_mr: item.roleMr || item.role_mr,
          role_en: item.roleEn || item.role_en,
          exp_mr: item.expMr || item.exp_mr,
          exp_en: item.expEn || item.exp_en,
          spec_mr: item.specMr || item.spec_mr,
          spec_en: item.specEn || item.spec_en,
          badge: item.badge || 'Faculty',
          image_url: item.imageUrl || item.image_url
        };
        if (item.id && !item.id.toString().startsWith('fac-')) payload.id = item.id;
        await supabase.from('faculties').upsert([payload]);
        syncedCount++;
      }

      // 6. Sync Batches
      const batches = sharedStore.getBatches();
      for (const item of batches) {
        const payload = {
          category: item.category || 'morning',
          time: item.time,
          course_mr: item.courseMr || item.course_mr,
          course_en: item.courseEn || item.course_en,
          status_mr: item.statusMr || item.status_mr,
          status_en: item.statusEn || item.status_en,
          seats_mr: item.seatsMr || item.seats_mr,
          seats_en: item.seatsEn || item.seats_en
        };
        if (item.id && !item.id.toString().startsWith('b-')) payload.id = item.id;
        await supabase.from('batch_timetable').upsert([payload]);
        syncedCount++;
      }

      // 7. Sync News
      const news = sharedStore.getNews();
      for (const item of news) {
        const payload = {
          title_mr: item.titleMr || item.title_mr,
          title_en: item.titleEn || item.title_en,
          category_mr: item.categoryMr || item.category_mr,
          category_en: item.categoryEn || item.category_en,
          date_str: item.dateStr || item.date_str,
          desc_mr: item.descMr || item.desc_mr,
          desc_en: item.descEn || item.desc_en
        };
        if (item.id && !item.id.toString().startsWith('n-')) payload.id = item.id;
        await supabase.from('news').upsert([payload]);
        syncedCount++;
      }

      return { success: true, count: syncedCount };
    } catch (err) {
      console.error('Sync all to Supabase error:', err.message);
      return { success: false, error: err.message };
    }
  }
};
