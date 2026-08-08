import { sharedStore } from './sharedStore';
import { supabase } from '../lib/supabase';

export const AdminRepository = {
  // ================= COURSES CRUD =================
  async getAllCourses() {
    try {
      const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        sharedStore.syncCoursesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch notice:', e.message);
    }
    return sharedStore.getCourses();
  },

  async saveCourse(courseData) {
    sharedStore.saveCourse(courseData);
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
      if (courseData.id) payload.id = courseData.id;

      const { error } = await supabase.from('courses').upsert([payload]);
      if (!error) console.log('Synced course with Supabase DB');
    } catch (e) {
      console.warn('Supabase sync notice:', e.message);
    }
    return { success: true };
  },

  async deleteCourse(id) {
    sharedStore.deleteCourse(id);
    try {
      await supabase.from('courses').delete().or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Supabase delete notice:', e.message);
    }
    return { success: true };
  },

  // ================= CSC SERVICES CRUD =================
  async getAllCSCServices() {
    try {
      const { data, error } = await supabase.from('csc_services').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        sharedStore.syncCSCServicesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch notice:', e.message);
    }
    return sharedStore.getCSCServices();
  },

  async saveCSCService(serviceData) {
    sharedStore.saveCSCService(serviceData);
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
      if (serviceData.id) payload.id = serviceData.id;

      await supabase.from('csc_services').upsert([payload]);
    } catch (e) {
      console.warn('Supabase sync notice:', e.message);
    }
    return { success: true };
  },

  async deleteCSCService(id) {
    sharedStore.deleteCSCService(id);
    try {
      await supabase.from('csc_services').delete().or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Supabase delete notice:', e.message);
    }
    return { success: true };
  },

  // ================= GOVT SERVICES CRUD =================
  async getAllGovtServices() {
    try {
      const { data, error } = await supabase.from('govt_services').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        sharedStore.syncGovtServicesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch notice:', e.message);
    }
    return sharedStore.getGovtServices();
  },

  async saveGovtService(serviceData) {
    sharedStore.saveGovtService(serviceData);
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
      if (serviceData.id) payload.id = serviceData.id;

      await supabase.from('govt_services').upsert([payload]);
    } catch (e) {
      console.warn('Supabase sync notice:', e.message);
    }
    return { success: true };
  },

  async deleteGovtService(id) {
    sharedStore.deleteGovtService(id);
    try {
      await supabase.from('govt_services').delete().or(`id.eq.${id},slug.eq.${id}`);
    } catch (e) {
      console.warn('Supabase delete notice:', e.message);
    }
    return { success: true };
  },

  // ================= INQUIRIES & LEADS MANAGEMENT =================
  async getAllInquiries() {
    try {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        sharedStore.syncInquiriesFromRemote(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch notice:', e.message);
    }
    return sharedStore.getInquiries();
  },

  async updateInquiryStatus(id, newStatus) {
    sharedStore.updateInquiryStatus(id, newStatus);
    try {
      await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    } catch (e) {
      console.warn('Supabase update notice:', e.message);
    }
    return { success: true };
  },

  async deleteInquiry(id) {
    sharedStore.deleteInquiry(id);
    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete notice:', e.message);
    }
    return { success: true };
  },





  // ================= SITE GALLERY & ABOUT IMAGES CRUD =================
  async getAllSiteGallery() {
    try {
      const { data, error } = await supabase.from('site_gallery').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        sharedStore.syncGalleryFromRemote(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase gallery fetch notice:', e.message);
    }
    return sharedStore.getSiteGallery();
  },

  async saveSiteGalleryItem(itemData) {
    sharedStore.saveSiteGalleryItem(itemData);
    try {
      const payload = {
        title_mr: itemData.titleMr || itemData.title_mr || itemData.titleEn || itemData.title_en,
        title_en: itemData.titleEn || itemData.title_en || itemData.titleMr || itemData.title_mr,
        desc_mr: itemData.descMr || itemData.desc_mr || itemData.descEn || itemData.desc_en,
        desc_en: itemData.descEn || itemData.desc_en || itemData.descMr || itemData.desc_mr,
        category: itemData.category || 'Campus',
        image_url: itemData.imageUrl || itemData.image_url
      };
      if (itemData.id && !itemData.id.startsWith('gal-')) payload.id = itemData.id;

      await supabase.from('site_gallery').upsert([payload]);
    } catch (e) {
      console.warn('Supabase gallery sync notice:', e.message);
    }
    return { success: true };
  },

  async deleteSiteGalleryItem(id) {
    sharedStore.deleteSiteGalleryItem(id);
    try {
      await supabase.from('site_gallery').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase gallery delete notice:', e.message);
    }
    return { success: true };
  },

  // ================= FACULTY MANAGEMENT CRUD =================
  async getAllFaculty() {
    try {
      const { data, error } = await supabase.from('faculties').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        sharedStore.syncFacultyFromRemote(data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase faculty fetch notice:', e.message);
    }
    return sharedStore.getFaculty();
  },

  async saveFacultyItem(itemData) {
    sharedStore.saveFacultyItem(itemData);
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
      if (itemData.id && !itemData.id.startsWith('fac-')) payload.id = itemData.id;

      const { data, error } = await supabase.from('faculties').upsert([payload]).select();
      if (!error && data && data.length > 0) {
        sharedStore.saveFacultyItem({ ...itemData, id: data[0].id });
      }
    } catch (e) {
      console.warn('Supabase faculty sync notice:', e.message);
    }
    return { success: true };
  },

  async deleteFacultyItem(id) {
    sharedStore.deleteFacultyItem(id);
    try {
      await supabase.from('faculties').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase faculty delete notice:', e.message);
    }
    return { success: true };
  }
};

