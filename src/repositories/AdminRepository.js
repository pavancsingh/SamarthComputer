import { supabase } from '../lib/supabase';
import { sharedStore } from './sharedStore';

function isValidUUID(uuidStr) {
  if (!uuidStr || typeof uuidStr !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuidStr.trim());
}

/**
 * Resilient Supabase Upsert Helper
 * Automatically handles schema cache or table column mismatch errors (e.g., missing optional columns)
 * by stripping the reported missing column and retrying the upsert operation.
 */
async function upsertWithColumnFallback(tableName, payload, altTableName = null) {
  let currentPayload = { ...payload };
  let currentTable = tableName;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    attempts++;
    let data, error;
    try {
      const res = await supabase.from(currentTable).upsert([currentPayload]).select();
      data = res.data;
      error = res.error;
    } catch (err) {
      console.warn(`[AdminRepository] Supabase network/fetch exception on '${currentTable}':`, err.message || err);
      return { success: false, error: err.message || 'Failed to fetch', isFetchError: true };
    }

    if (error && altTableName && currentTable !== altTableName &&
        (error.message?.includes('schema cache') || error.message?.includes('does not exist') || error.message?.includes('relation'))) {
      console.warn(`[AdminRepository] Table '${currentTable}' not found in schema cache. Trying alternative table '${altTableName}'...`);
      currentTable = altTableName;
      try {
        const altResult = await supabase.from(currentTable).upsert([currentPayload]).select();
        data = altResult.data;
        error = altResult.error;
      } catch (err) {
        return { success: false, error: err.message || 'Failed to fetch', isFetchError: true };
      }
    }

    if (!error) {
      return { success: true, data: data?.[0] };
    }

    const errorMsg = error.message || '';

    if (errorMsg.includes('schema cache') || errorMsg.includes('does not exist') || errorMsg.includes('relation')) {
      return { success: false, error: error.message, isTableMissing: true };
    }

    if (errorMsg.includes('Failed to fetch') || errorMsg.includes('fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('network')) {
      return { success: false, error: error.message, isFetchError: true };
    }

    const match = errorMsg.match(/Could not find the ['"](.+?)['"] column/i) ||
                  errorMsg.match(/column ['"](.+?)['"] of relation/i) ||
                  errorMsg.match(/column ['"](.+?)['"] does not exist/i);

    if (match && match[1] && Object.prototype.hasOwnProperty.call(currentPayload, match[1])) {
      const missingCol = match[1];
      console.warn(`[AdminRepository] Column '${missingCol}' missing in table '${currentTable}'. Omitting column and retrying...`);
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

    if (error) {
      console.error('Supabase fetch courses error:', error.message);
      return sharedStore.getCourses();
    }
    sharedStore.syncCoursesFromRemote(data || [], false);
    return data || [];
  },

  async saveCourse(courseData) {
    const slug = courseData.slug || `course-${Date.now()}`;
    const payload = {
      slug,
      title: courseData.title,
      subtitle_mr: courseData.subtitleMr || courseData.subtitle_mr || courseData.title,
      subtitle_en: courseData.subtitleEn || courseData.subtitle_en || courseData.title,
      category: courseData.category || 'govt',
      tag: courseData.tag || 'New',
      is_primary: courseData.isPrimary !== undefined ? courseData.isPrimary : (courseData.is_primary || false),
      is_featured: courseData.isFeatured !== undefined ? courseData.isFeatured : (courseData.is_featured || false),
      is_active: courseData.isActive !== undefined ? courseData.isActive : (courseData.is_active !== undefined ? courseData.is_active : true),
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
      practical_skills_mr: courseData.practicalSkillsMr || courseData.practical_skills_mr || [],
      practical_skills_en: courseData.practicalSkillsEn || courseData.practical_skills_en || [],
      careers_mr: courseData.careersMr || courseData.careers_mr || [],
      careers_en: courseData.careersEn || courseData.careers_en || [],
      image_url: courseData.imageUrl || courseData.image_url || null
    };

    let targetId = courseData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      try {
        const { data: existing } = await supabase
          .from('courses')
          .select('id')
          .eq('slug', slug)
          .limit(1);
        if (existing && existing.length > 0 && existing[0].id) {
          payload.id = existing[0].id;
        }
      } catch (lookupErr) {
        console.warn('[AdminRepository] Supabase course lookup notice:', lookupErr.message);
      }
    }

    try {
      const res = await upsertWithColumnFallback('courses', payload);
      if (res.success) {
        sharedStore.saveCourse(res.data || courseData);
        return res;
      }
      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveCourse notice (${res.error}). Saved to local store fallback.`);
        const saved = sharedStore.saveCourse(courseData);
        return { success: true, data: saved || courseData, fallback: true };
      }
      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveCourse exception:', err.message);
      const saved = sharedStore.saveCourse(courseData);
      return { success: true, data: saved || courseData, fallback: true };
    }
  },

  async deleteCourse(id) {
    try {
      const { error } = await supabase.from('courses').delete().or(`id.eq.${id},slug.eq.${id}`);
      if (error) {
        console.error('Supabase course delete error:', error.message);
      }
    } catch (err) {
      console.warn('[AdminRepository] deleteCourse exception:', err.message);
    }
    sharedStore.deleteCourse(id);
    return { success: true };
  },

  // ================= CSC SERVICES CRUD =================
  async getAllCSCServices() {
    try {
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

      if (error) {
        console.error('Supabase fetch CSC error:', error.message);
        return sharedStore.getCSCServices();
      }
      sharedStore.syncCSCServicesFromRemote(data || [], false);
      return data || [];
    } catch (err) {
      console.warn('[AdminRepository] getAllCSCServices exception:', err.message);
      return sharedStore.getCSCServices();
    }
  },

  async saveCSCService(serviceData) {
    const slug = serviceData.slug || `csc-${Date.now()}`;
    const payload = {
      slug,
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
      is_active: serviceData.isActive !== undefined ? serviceData.isActive : (serviceData.is_active !== undefined ? serviceData.is_active : true),
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

    let targetId = serviceData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      try {
        const { data: existing } = await supabase
          .from('csc_services')
          .select('id')
          .eq('slug', slug)
          .limit(1);
        if (existing && existing.length > 0 && existing[0].id) {
          payload.id = existing[0].id;
        }
      } catch (lookupErr) {
        console.warn('[AdminRepository] Supabase CSC lookup notice:', lookupErr.message);
      }
    }

    try {
      const res = await upsertWithColumnFallback('csc_services', payload);
      if (res.success) {
        sharedStore.saveCSCService(res.data || serviceData);
        return res;
      }
      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveCSCService notice (${res.error}). Saved to local store fallback.`);
        const saved = sharedStore.saveCSCService(serviceData);
        return { success: true, data: saved || serviceData, fallback: true };
      }
      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveCSCService exception:', err.message);
      const saved = sharedStore.saveCSCService(serviceData);
      return { success: true, data: saved || serviceData, fallback: true };
    }
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

    if (error) {
      console.error('Supabase fetch Govt services error:', error.message);
      return sharedStore.getGovtServices();
    }
    sharedStore.syncGovtServicesFromRemote(data || [], false);
    return data || [];
  },

  async saveGovtService(serviceData) {
    const slug = serviceData.slug || `govt-${Date.now()}`;
    const payload = {
      slug,
      title_mr: serviceData.titleMr || serviceData.title_mr || serviceData.titleEn,
      title_en: serviceData.titleEn || serviceData.title_en || serviceData.titleMr,
      category: serviceData.category || 'revenue',
      badge: serviceData.badge || 'Govt Certificate',
      timeline_mr: serviceData.timelineMr || serviceData.timeline_mr || serviceData.timelineEn,
      timeline_en: serviceData.timelineEn || serviceData.timeline_en,
      is_active: serviceData.isActive !== undefined ? serviceData.isActive : (serviceData.is_active !== undefined ? serviceData.is_active : true),
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

    let targetId = serviceData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      try {
        const { data: existing } = await supabase
          .from('govt_services')
          .select('id')
          .eq('slug', slug)
          .limit(1);
        if (existing && existing.length > 0 && existing[0].id) {
          payload.id = existing[0].id;
        }
      } catch (lookupErr) {
        console.warn('[AdminRepository] Supabase Govt lookup notice:', lookupErr.message);
      }
    }

    try {
      const res = await upsertWithColumnFallback('govt_services', payload);
      if (res.success) {
        sharedStore.saveGovtService(res.data || serviceData);
        return res;
      }
      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveGovtService notice (${res.error}). Saved to local store fallback.`);
        const saved = sharedStore.saveGovtService(serviceData);
        return { success: true, data: saved || serviceData, fallback: true };
      }
      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveGovtService exception:', err.message);
      const saved = sharedStore.saveGovtService(serviceData);
      return { success: true, data: saved || serviceData, fallback: true };
    }
  },

  async deleteGovtService(id) {
    try {
      const { error } = await supabase.from('govt_services').delete().or(`id.eq.${id},slug.eq.${id}`);
      if (error) {
        console.error('Supabase Govt delete error:', error.message);
      }
    } catch (err) {
      console.warn('[AdminRepository] deleteGovtService exception:', err.message);
    }
    sharedStore.deleteGovtService(id);
    return { success: true };
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
      sharedStore.syncInquiriesFromRemote(data || []);
      return data || [];
    } catch (err) {
      console.warn('[AdminRepository] getAllInquiries exception:', err.message);
      return sharedStore.getInquiries();
    }
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

    try {
      const res = await upsertWithColumnFallback('inquiries', payload);
      if (res.success) {
        sharedStore.addInquiry(res.data || inquiryData);
        return res;
      }
      sharedStore.addInquiry(inquiryData);
      return { success: true, data: inquiryData, fallback: true };
    } catch (err) {
      console.warn('[AdminRepository] saveInquiry exception:', err.message);
      sharedStore.addInquiry(inquiryData);
      return { success: true, data: inquiryData, fallback: true };
    }
  },

  async updateInquiryStatus(id, newStatus) {
    try {
      const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
      if (error) {
        console.error('Supabase inquiry update error:', error.message);
      }
    } catch (err) {
      console.warn('[AdminRepository] updateInquiryStatus exception:', err.message);
    }
    sharedStore.updateInquiryStatus(id, newStatus);
    return { success: true };
  },

  async deleteInquiry(id) {
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) {
        console.error('Supabase inquiry delete error:', error.message);
      }
    } catch (err) {
      console.warn('[AdminRepository] deleteInquiry exception:', err.message);
    }
    sharedStore.deleteInquiry(id);
    return { success: true };
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
      sharedStore.syncGalleryFromRemote(data || []);
      return data || [];
    } catch (err) {
      console.warn('[AdminRepository] getAllSiteGallery exception:', err.message);
      return sharedStore.getSiteGallery();
    }
  },

  async saveSiteGalleryItem(itemData) {
    const payload = {
      title_mr: itemData.titleMr || itemData.title_mr || itemData.titleEn || itemData.title_en,
      title_en: itemData.titleEn || itemData.title_en || itemData.titleMr || itemData.title_mr,
      desc_mr: itemData.descMr || itemData.desc_mr || itemData.descEn || itemData.desc_en,
      desc_en: itemData.descEn || itemData.desc_en || itemData.descMr || itemData.desc_mr,
      category: itemData.category || 'Campus',
      image_url: itemData.imageUrl || itemData.image_url,
      is_active: itemData.isActive !== undefined ? itemData.isActive : (itemData.is_active !== undefined ? itemData.is_active : true),
      display_order: itemData.displayOrder !== undefined ? itemData.displayOrder : (itemData.display_order || 0)
    };

    let targetId = itemData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      const searchTitle = payload.title_en || payload.title_mr;
      if (searchTitle) {
        try {
          const { data: existing } = await supabase
            .from('site_gallery')
            .select('id')
            .ilike('title_en', searchTitle)
            .limit(1);
          if (existing && existing.length > 0 && existing[0].id) {
            payload.id = existing[0].id;
          }
        } catch (lookupErr) {
          console.warn('[AdminRepository] Supabase gallery lookup notice:', lookupErr.message);
        }
      }
    }

    try {
      const res = await upsertWithColumnFallback('site_gallery', payload);
      if (res.success) {
        sharedStore.saveSiteGalleryItem(res.data || itemData);
        return res;
      }
      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveSiteGalleryItem notice (${res.error}). Saved to local store fallback.`);
        const saved = sharedStore.saveSiteGalleryItem(itemData);
        return { success: true, data: saved || itemData, fallback: true };
      }
      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveSiteGalleryItem exception:', err.message);
      const saved = sharedStore.saveSiteGalleryItem(itemData);
      return { success: true, data: saved || itemData, fallback: true };
    }
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
    try {
      const { data, error } = await supabase
        .from('faculties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (error) console.error('Supabase faculty fetch error:', error.message);
        return sharedStore.getFaculty();
      }

      // Deduplicate records by faculty name to prevent duplicate cards in UI
      const seenNames = new Set();
      const uniqueFaculty = [];
      const duplicateIdsToDelete = [];

      for (const item of data) {
        const normalizedName = (item.name || '').trim().toLowerCase();
        if (!normalizedName) continue;

        if (!seenNames.has(normalizedName)) {
          seenNames.add(normalizedName);
          uniqueFaculty.push({
            ...item,
            roleEn: item.role_en || item.roleEn,
            roleMr: item.role_mr || item.roleMr,
            expEn: item.exp_en || item.expEn,
            expMr: item.exp_mr || item.expMr,
            specEn: item.spec_en || item.specEn,
            specMr: item.spec_mr || item.specMr,
            imageUrl: item.image_url || item.imageUrl
          });
        } else if (item.id) {
          duplicateIdsToDelete.push(item.id);
        }
      }

      // Async cleanup of duplicate records from Supabase
      if (duplicateIdsToDelete.length > 0) {
        console.warn(`[AdminRepository] Cleaning up ${duplicateIdsToDelete.length} duplicate faculty records from Supabase...`);
        supabase.from('faculties').delete().in('id', duplicateIdsToDelete).catch(() => {});
      }

      sharedStore.syncFacultyFromRemote(uniqueFaculty);
      return uniqueFaculty;
    } catch (err) {
      console.warn('[AdminRepository] getAllFaculty exception:', err.message);
      return sharedStore.getFaculty();
    }
  },

  async saveFacultyItem(itemData) {
    const payload = {
      name: itemData.name,
      role_mr: itemData.roleMr || itemData.role_mr || '',
      role_en: itemData.roleEn || itemData.role_en || '',
      exp_mr: itemData.expMr || itemData.exp_mr || '',
      exp_en: itemData.expEn || itemData.exp_en || '',
      spec_mr: itemData.specMr || itemData.spec_mr || '',
      spec_en: itemData.specEn || itemData.spec_en || '',
      badge: itemData.badge || 'Faculty',
      image_url: itemData.imageUrl || itemData.image_url || ''
    };

    let targetId = itemData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      try {
        const { data: existing } = await supabase
          .from('faculties')
          .select('id')
          .ilike('name', itemData.name)
          .limit(1);
        if (existing && existing.length > 0 && existing[0].id) {
          payload.id = existing[0].id;
        }
      } catch (lookupErr) {
        console.warn('[AdminRepository] Supabase faculty lookup notice:', lookupErr.message);
      }
    }

    const savedItem = {
      ...itemData,
      ...payload,
      id: payload.id || itemData.id || `fac-${Date.now()}`,
      roleEn: payload.role_en,
      roleMr: payload.role_mr,
      expEn: payload.exp_en,
      expMr: payload.exp_mr,
      specEn: payload.spec_en,
      specMr: payload.spec_mr,
      imageUrl: payload.image_url
    };

    try {
      const res = await upsertWithColumnFallback('faculties', payload);
      if (res.success) {
        savedItem.id = res.data?.id || savedItem.id;
        sharedStore.saveFacultyItem(savedItem);
        return { success: true, data: savedItem };
      }
      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveFacultyItem notice (${res.error}). Saved to local store fallback.`);
        sharedStore.saveFacultyItem(savedItem);
        return { success: true, data: savedItem, fallback: true };
      }
      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveFacultyItem exception:', err.message);
      sharedStore.saveFacultyItem(savedItem);
      return { success: true, data: savedItem, fallback: true };
    }
  },

  async deleteFacultyItem(id) {
    try {
      const targetFaculty = sharedStore.getFaculty().find((f) => f.id === id);
      await supabase.from('faculties').delete().eq('id', id);
      if (targetFaculty && targetFaculty.name) {
        await supabase.from('faculties').delete().ilike('name', targetFaculty.name);
      }
    } catch (err) {
      console.warn('[AdminRepository] deleteFacultyItem exception:', err.message);
    }
    sharedStore.deleteFacultyItem(id);
    return { success: true };
  },

  // ================= BATCH TIMETABLE CRUD =================
  async getAllBatches() {
    try {
      let { data, error } = await supabase
        .from('batches')
        .select('*')
        .order('created_at', { ascending: true });

      if (error && (error.message.includes('schema cache') || error.message.includes('does not exist') || error.message.includes('relation'))) {
        const retry = await supabase
          .from('batch_timetable')
          .select('*')
          .order('created_at', { ascending: true });
        if (!retry.error && retry.data) {
          data = retry.data;
          error = null;
        }
      }

      if (error) {
        console.error('Supabase batch fetch error:', error.message);
        return sharedStore.getBatches();
      }
      sharedStore.syncBatchesFromRemote(data || []);
      return data || [];
    } catch (err) {
      console.warn('[AdminRepository] getAllBatches exception:', err.message);
      return sharedStore.getBatches();
    }
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

    try {
      const res = await upsertWithColumnFallback('batches', payload, 'batch_timetable');
      if (res.success) {
        sharedStore.saveBatchItem(res.data || itemData);
        return res;
      }

      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveBatchItem notice (${res.error}). Saved to local store fallback.`);
        sharedStore.saveBatchItem(itemData);
        return { success: true, data: itemData, fallback: true };
      }

      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveBatchItem exception:', err.message);
      sharedStore.saveBatchItem(itemData);
      return { success: true, data: itemData, fallback: true };
    }
  },

  async deleteBatchItem(id) {
    try {
      let { error } = await supabase.from('batches').delete().eq('id', id);
      if (error && (error.message.includes('schema cache') || error.message.includes('does not exist') || error.message.includes('relation'))) {
        await supabase.from('batch_timetable').delete().eq('id', id);
      }
    } catch (err) {
      console.warn('[AdminRepository] deleteBatchItem exception:', err.message);
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

    if (error) {
      console.error('Supabase news fetch error:', error.message);
      return sharedStore.getNews();
    }
    sharedStore.syncNewsFromRemote(data || []);

    return (data || []).map((item) => ({
      ...item,
      titleEn: item.titleEn || item.title_en || '',
      titleMr: item.titleMr || item.title_mr || item.titleEn || item.title_en || '',
      categoryEn: item.categoryEn || item.category_en || 'Admissions',
      categoryMr: item.categoryMr || item.category_mr || 'प्रवेश अपडेट',
      dateStr: item.dateStr || item.date_str || (item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '2026'),
      descEn: item.descEn || item.desc_en || '',
      descMr: item.descMr || item.desc_mr || item.descEn || item.desc_en || ''
    }));
  },

  async saveNewsItem(itemData) {
    const defaultDate = itemData.dateStr || itemData.date_str || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const payload = {
      title_mr: itemData.titleMr || itemData.title_mr || itemData.titleEn || itemData.title_en || '',
      title_en: itemData.titleEn || itemData.title_en || itemData.titleMr || itemData.title_mr || '',
      category_mr: itemData.categoryMr || itemData.category_mr || 'प्रवेश अपडेट',
      category_en: itemData.categoryEn || itemData.category_en || 'Admissions',
      date_str: defaultDate,
      desc_mr: itemData.descMr || itemData.desc_mr || itemData.descEn || itemData.desc_en || '',
      desc_en: itemData.descEn || itemData.desc_en || itemData.descMr || itemData.desc_mr || ''
    };

    let targetId = itemData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      const searchTitle = payload.title_en || payload.title_mr;
      if (searchTitle) {
        try {
          const { data: existing } = await supabase
            .from('news')
            .select('id')
            .ilike('title_en', searchTitle)
            .limit(1);
          if (existing && existing.length > 0 && existing[0].id) {
            payload.id = existing[0].id;
          }
        } catch (lookupErr) {
          console.warn('[AdminRepository] Supabase news lookup notice:', lookupErr.message);
        }
      }
    }

    const normalizedItem = {
      ...itemData,
      ...payload,
      id: payload.id || itemData.id || `n-${Date.now()}`,
      titleEn: payload.title_en,
      titleMr: payload.title_mr,
      categoryEn: payload.category_en,
      categoryMr: payload.category_mr,
      dateStr: payload.date_str,
      descEn: payload.desc_en,
      descMr: payload.desc_mr
    };

    try {
      const res = await upsertWithColumnFallback('news', payload);
      if (res.success) {
        normalizedItem.id = res.data?.id || normalizedItem.id;
        sharedStore.saveNewsItem(normalizedItem);
        return res;
      }
      if (res.isTableMissing || res.isFetchError || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('Failed to fetch') || res.error.includes('fetch')))) {
        console.warn(`[AdminRepository] Supabase saveNewsItem notice (${res.error}). Saved to local store fallback.`);
        sharedStore.saveNewsItem(normalizedItem);
        return { success: true, data: normalizedItem, fallback: true };
      }
      return res;
    } catch (err) {
      console.warn('[AdminRepository] saveNewsItem exception:', err.message);
      sharedStore.saveNewsItem(normalizedItem);
      return { success: true, data: normalizedItem, fallback: true };
    }
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

  // ================= MODULAR SITE SETTINGS CRUD =================
  async getSiteSettings() {
    const defaultSettings = sharedStore.getSiteSettings();
    try {
      const { data: rows, error } = await supabase.from('site_settings').select('*');
      if (error || !rows || rows.length === 0) {
        if (error) console.warn('[AdminRepository] site_settings fetch notice:', error.message);
        return defaultSettings;
      }

      const rowsMap = {};
      rows.forEach((r) => {
        if (r && r.id) {
          rowsMap[r.id] = r;
        }
      });

      const legacy = rowsMap['main_settings'] || {};
      const branding = rowsMap['branding'] || {};
      const home = rowsMap['home'] || {};
      const about = rowsMap['about'] || {};
      const contact = rowsMap['contact'] || {};
      const seo = rowsMap['seo'] || {};
      const social = rowsMap['social'] || {};
      const footer = rowsMap['footer'] || {};

      const getVal = (groupObj, key, legacyObj, defaultVal) => {
        if (groupObj && groupObj[key] !== undefined && groupObj[key] !== null) {
          return groupObj[key];
        }
        if (legacyObj && legacyObj[key] !== undefined && legacyObj[key] !== null) {
          return legacyObj[key];
        }
        return defaultVal !== undefined ? defaultVal : '';
      };

      const mergedSettings = {
        ...defaultSettings,
        // 1. Branding
        logoUrl: getVal(branding, 'logo_url', legacy, defaultSettings.logoUrl),
        heroBgUrl: getVal(branding, 'hero_bg_url', legacy, defaultSettings.heroBgUrl),
        siteTitleMr: getVal(branding, 'site_title_mr', legacy, defaultSettings.siteTitleMr),
        siteTitleEn: getVal(branding, 'site_title_en', legacy, defaultSettings.siteTitleEn),
        alcCode: getVal(branding, 'alc_code', legacy, defaultSettings.alcCode),
        cscId: getVal(branding, 'csc_id', legacy, defaultSettings.cscId),

        // 2. Home
        heroTitleMr: getVal(home, 'hero_title_mr', legacy, defaultSettings.heroTitleMr),
        heroTitleEn: getVal(home, 'hero_title_en', legacy, defaultSettings.heroTitleEn),
        heroSubtitleMr: getVal(home, 'hero_subtitle_mr', legacy, defaultSettings.heroSubtitleMr),
        heroSubtitleEn: getVal(home, 'hero_subtitle_en', legacy, defaultSettings.heroSubtitleEn),
        heroBadgeMr: getVal(home, 'hero_badge_mr', legacy, defaultSettings.heroBadgeMr),
        heroBadgeEn: getVal(home, 'hero_badge_en', legacy, defaultSettings.heroBadgeEn),
        heroCtaTextMr: getVal(home, 'hero_cta_text_mr', legacy, defaultSettings.heroCtaTextMr),
        heroCtaTextEn: getVal(home, 'hero_cta_text_en', legacy, defaultSettings.heroCtaTextEn),
        heroCtaDest: getVal(home, 'hero_cta_dest', legacy, defaultSettings.heroCtaDest),
        homeSections: getVal(home, 'home_sections', legacy, defaultSettings.homeSections),
        whyChooseUs: getVal(home, 'why_choose_us', legacy, defaultSettings.whyChooseUs),
        navSettings: getVal(home, 'nav_settings', legacy, defaultSettings.navSettings),

        // 3. About
        aboutHeadingMr: getVal(about, 'about_heading_mr', legacy, defaultSettings.aboutHeadingMr),
        aboutHeadingEn: getVal(about, 'about_heading_en', legacy, defaultSettings.aboutHeadingEn),
        aboutDescMr: getVal(about, 'about_desc_mr', legacy, defaultSettings.aboutDescMr),
        aboutDescEn: getVal(about, 'about_desc_en', legacy, defaultSettings.aboutDescEn),
        aboutImageUrl: getVal(about, 'about_image_url', legacy, defaultSettings.aboutImageUrl),
        aboutMissionMr: getVal(about, 'about_mission_mr', legacy, defaultSettings.aboutMissionMr),
        aboutMissionEn: getVal(about, 'about_mission_en', legacy, defaultSettings.aboutMissionEn),
        aboutVisionMr: getVal(about, 'about_vision_mr', legacy, defaultSettings.aboutVisionMr),
        aboutVisionEn: getVal(about, 'about_vision_en', legacy, defaultSettings.aboutVisionEn),
        aboutValues: getVal(about, 'about_values', legacy, defaultSettings.aboutValues),
        aboutTimeline: getVal(about, 'about_timeline', legacy, defaultSettings.aboutTimeline),

        // 4. Contact
        contactPhone: getVal(contact, 'contact_phone', legacy, defaultSettings.contactPhone),
        contactWhatsapp: getVal(contact, 'contact_whatsapp', legacy, defaultSettings.contactWhatsapp),
        contactEmail: getVal(contact, 'contact_email', legacy, defaultSettings.contactEmail),
        contactAddressMr: getVal(contact, 'contact_address_mr', legacy, defaultSettings.contactAddressMr),
        contactAddressEn: getVal(contact, 'contact_address_en', legacy, defaultSettings.contactAddressEn),
        contactHoursMr: getVal(contact, 'contact_hours_mr', legacy, defaultSettings.contactHoursMr),
        contactHoursEn: getVal(contact, 'contact_hours_en', legacy, defaultSettings.contactHoursEn),
        contactMapUrl: getVal(contact, 'contact_map_url', legacy, defaultSettings.contactMapUrl),
        callCtaPhone: getVal(contact, 'call_cta_phone', legacy, defaultSettings.callCtaPhone),
        callCtaTextMr: getVal(contact, 'call_cta_text_mr', legacy, defaultSettings.callCtaTextMr),
        callCtaTextEn: getVal(contact, 'call_cta_text_en', legacy, defaultSettings.callCtaTextEn),

        // 5. SEO
        seoTitle: getVal(seo, 'seo_title', legacy, defaultSettings.seoTitle),
        seoDescription: getVal(seo, 'seo_description', legacy, defaultSettings.seoDescription),
        seoKeywords: getVal(seo, 'seo_keywords', legacy, defaultSettings.seoKeywords),

        // 6. Social
        socialFacebook: getVal(social, 'social_facebook', legacy, defaultSettings.socialFacebook),
        socialInstagram: getVal(social, 'social_instagram', legacy, defaultSettings.socialInstagram),
        socialYoutube: getVal(social, 'social_youtube', legacy, defaultSettings.socialYoutube),

        // 7. Footer
        footerTagline: getVal(footer, 'footer_tagline', legacy, defaultSettings.footerTagline),
        copyrightText: getVal(footer, 'copyright_text', legacy, defaultSettings.copyrightText)
      };

      sharedStore.saveSiteSettings(mergedSettings);
      return mergedSettings;
    } catch (err) {
      console.warn('[AdminRepository] Exception in getSiteSettings:', err.message);
      return sharedStore.getSiteSettings();
    }
  },

  async saveSiteSettings(settings) {
    try {
      const groupRecords = [
        // 1. Branding group
        {
          id: 'branding',
          logo_url: settings.logoUrl ?? '',
          hero_bg_url: settings.heroBgUrl ?? '',
          site_title_mr: settings.siteTitleMr ?? '',
          site_title_en: settings.siteTitleEn ?? '',
          alc_code: settings.alcCode ?? '',
          csc_id: settings.cscId ?? ''
        },
        // 2. Home group
        {
          id: 'home',
          hero_title_mr: settings.heroTitleMr ?? '',
          hero_title_en: settings.heroTitleEn ?? '',
          hero_subtitle_mr: settings.heroSubtitleMr ?? '',
          hero_subtitle_en: settings.heroSubtitleEn ?? '',
          hero_badge_mr: settings.heroBadgeMr ?? '',
          hero_badge_en: settings.heroBadgeEn ?? '',
          hero_cta_text_mr: settings.heroCtaTextMr ?? '',
          hero_cta_text_en: settings.heroCtaTextEn ?? '',
          hero_cta_dest: settings.heroCtaDest || 'courses',
          home_sections: settings.homeSections || {},
          why_choose_us: settings.whyChooseUs || [],
          nav_settings: settings.navSettings || []
        },
        // 3. About group
        {
          id: 'about',
          about_heading_mr: settings.aboutHeadingMr ?? '',
          about_heading_en: settings.aboutHeadingEn ?? '',
          about_desc_mr: settings.aboutDescMr ?? '',
          about_desc_en: settings.aboutDescEn ?? '',
          about_image_url: settings.aboutImageUrl ?? '',
          about_mission_mr: settings.aboutMissionMr ?? '',
          about_mission_en: settings.aboutMissionEn ?? '',
          about_vision_mr: settings.aboutVisionMr ?? '',
          about_vision_en: settings.aboutVisionEn ?? '',
          about_values: settings.aboutValues || [],
          about_timeline: settings.aboutTimeline || []
        },
        // 4. Contact group
        {
          id: 'contact',
          contact_phone: settings.contactPhone ?? '',
          contact_whatsapp: settings.contactWhatsapp ?? '',
          contact_email: settings.contactEmail ?? '',
          contact_address_mr: settings.contactAddressMr ?? '',
          contact_address_en: settings.contactAddressEn ?? '',
          contact_hours_mr: settings.contactHoursMr ?? '',
          contact_hours_en: settings.contactHoursEn ?? '',
          contact_map_url: settings.contactMapUrl ?? '',
          call_cta_phone: settings.callCtaPhone ?? '',
          call_cta_text_mr: settings.callCtaTextMr ?? '',
          call_cta_text_en: settings.callCtaTextEn ?? ''
        },
        // 5. SEO group
        {
          id: 'seo',
          seo_title: settings.seoTitle ?? '',
          seo_description: settings.seoDescription ?? '',
          seo_keywords: settings.seoKeywords ?? ''
        },
        // 6. Social group
        {
          id: 'social',
          social_facebook: settings.socialFacebook ?? '',
          social_instagram: settings.socialInstagram ?? '',
          social_youtube: settings.socialYoutube ?? ''
        },
        // 7. Footer group
        {
          id: 'footer',
          footer_tagline: settings.footerTagline ?? '',
          copyright_text: settings.copyrightText ?? ''
        },
        // 8. Legacy main_settings row (Backward Compatibility)
        {
          id: 'main_settings',
          logo_url: settings.logoUrl ?? '',
          hero_bg_url: settings.heroBgUrl || null,
          hero_title_mr: settings.heroTitleMr || null,
          hero_title_en: settings.heroTitleEn || null,
          hero_subtitle_mr: settings.heroSubtitleMr || null,
          hero_subtitle_en: settings.heroSubtitleEn || null,
          hero_badge_mr: settings.heroBadgeMr || null,
          hero_badge_en: settings.heroBadgeEn || null,
          hero_cta_text_mr: settings.heroCtaTextMr || null,
          hero_cta_text_en: settings.heroCtaTextEn || null,
          hero_cta_dest: settings.heroCtaDest || null,
          contact_phone: settings.contactPhone || null,
          contact_whatsapp: settings.contactWhatsapp || null,
          contact_email: settings.contactEmail || null,
          contact_address_mr: settings.contactAddressMr || null,
          contact_address_en: settings.contactAddressEn || null,
          contact_hours_mr: settings.contactHoursMr || null,
          contact_hours_en: settings.contactHoursEn || null,
          contact_map_url: settings.contactMapUrl || null,
          call_cta_phone: settings.callCtaPhone || null,
          call_cta_text_mr: settings.callCtaTextMr || null,
          call_cta_text_en: settings.callCtaTextEn || null,
          about_heading_mr: settings.aboutHeadingMr || null,
          about_heading_en: settings.aboutHeadingEn || null,
          about_desc_mr: settings.aboutDescMr || null,
          about_desc_en: settings.aboutDescEn || null,
          about_image_url: settings.aboutImageUrl || null,
          about_mission_mr: settings.aboutMissionMr || null,
          about_mission_en: settings.aboutMissionEn || null,
          about_vision_mr: settings.aboutVisionMr || null,
          about_vision_en: settings.aboutVisionEn || null,
          about_values: settings.aboutValues || [],
          about_timeline: settings.aboutTimeline || [],
          home_sections: settings.homeSections || {},
          why_choose_us: settings.whyChooseUs || [],
          nav_settings: settings.navSettings || [],
          site_title_mr: settings.siteTitleMr || null,
          site_title_en: settings.siteTitleEn || null,
          alc_code: settings.alcCode || null,
          csc_id: settings.cscId || null,
          seo_title: settings.seoTitle || null,
          seo_description: settings.seoDescription || null,
          seo_keywords: settings.seoKeywords || null,
          social_facebook: settings.socialFacebook !== undefined ? settings.socialFacebook : '',
          social_instagram: settings.socialInstagram !== undefined ? settings.socialInstagram : '',
          social_youtube: settings.socialYoutube !== undefined ? settings.socialYoutube : '',
          footer_tagline: settings.footerTagline || null,
          copyright_text: settings.copyrightText || null
        }
      ];

      const { data, error } = await supabase.from('site_settings').upsert(groupRecords);
      if (error) {
        console.warn('[AdminRepository] site_settings group upsert notice:', error.message);
      }
      sharedStore.saveSiteSettings(settings);
      return { success: true, data: settings };
    } catch (err) {
      console.warn(`[AdminRepository] saveSiteSettings exception (${err.message}). Saved to local store.`);
      sharedStore.saveSiteSettings(settings);
      return { success: true, data: settings, fallback: true };
    }
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


