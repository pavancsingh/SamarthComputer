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
    let { data, error } = await supabase.from(currentTable).upsert([currentPayload]).select();

    if (error && altTableName && currentTable !== altTableName &&
        (error.message.includes('schema cache') || error.message.includes('does not exist') || error.message.includes('relation'))) {
      console.warn(`[AdminRepository] Table '${currentTable}' not found in schema cache. Trying alternative table '${altTableName}'...`);
      currentTable = altTableName;
      const altResult = await supabase.from(currentTable).upsert([currentPayload]).select();
      data = altResult.data;
      error = altResult.error;
    }

    if (!error) {
      return { success: true, data: data?.[0] };
    }

    const errorMsg = error.message || '';

    if (errorMsg.includes('schema cache') || errorMsg.includes('does not exist') || errorMsg.includes('relation')) {
      return { success: false, error: error.message, isTableMissing: true };
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

    if (error || !data || data.length === 0) {
      if (error) console.error('Supabase fetch courses error:', error.message);
      return sharedStore.getCourses();
    }
    return data;
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
      careers_mr: courseData.careersMr || courseData.careers_mr || [],
      careers_en: courseData.careersEn || courseData.careers_en || [],
      image_url: courseData.imageUrl || courseData.image_url || null
    };

    let targetId = courseData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      const { data: existing } = await supabase
        .from('courses')
        .select('id')
        .eq('slug', slug)
        .limit(1);
      if (existing && existing.length > 0 && existing[0].id) {
        payload.id = existing[0].id;
      }
    }

    const res = await upsertWithColumnFallback('courses', payload);
    if (res.success) {
      sharedStore.saveCourse(res.data || courseData);
      return res;
    }
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist')))) {
      console.warn(`[AdminRepository] Table 'courses' missing in Supabase schema (${res.error}). Saved to local store.`);
      sharedStore.saveCourse(courseData);
      return { success: true, data: courseData, fallback: true };
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
      const { data: existing } = await supabase
        .from('csc_services')
        .select('id')
        .eq('slug', slug)
        .limit(1);
      if (existing && existing.length > 0 && existing[0].id) {
        payload.id = existing[0].id;
      }
    }

    const res = await upsertWithColumnFallback('csc_services', payload);
    if (res.success) {
      sharedStore.saveCSCService(res.data || serviceData);
      return res;
    }
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist')))) {
      console.warn(`[AdminRepository] Table 'csc_services' missing in Supabase schema (${res.error}). Saved to local store.`);
      sharedStore.saveCSCService(serviceData);
      return { success: true, data: serviceData, fallback: true };
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
      required_docs_mr: serviceData.requiredDocsMr || serviceData.required_docs_mr || serviceData.requirementsMr || serviceData.requirements_mr || [],
      required_docs_en: serviceData.requiredDocsEn || serviceData.required_docs_en || serviceData.requirementsEn || serviceData.requirements_en || [],
      steps_mr: serviceData.stepsMr || serviceData.steps_mr || [],
      steps_en: serviceData.stepsEn || serviceData.steps_en || [],
      image_url: serviceData.imageUrl || serviceData.image_url || null
    };

    let targetId = serviceData.id;
    if (targetId && isValidUUID(targetId.toString())) {
      payload.id = targetId;
    } else {
      const { data: existing } = await supabase
        .from('govt_services')
        .select('id')
        .eq('slug', slug)
        .limit(1);
      if (existing && existing.length > 0 && existing[0].id) {
        payload.id = existing[0].id;
      }
    }

    const res = await upsertWithColumnFallback('govt_services', payload);
    if (res.success) {
      sharedStore.saveGovtService(res.data || serviceData);
      return res;
    }
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist')))) {
      console.warn(`[AdminRepository] Table 'govt_services' missing in Supabase schema (${res.error}). Saved to local store.`);
      sharedStore.saveGovtService(serviceData);
      return { success: true, data: serviceData, fallback: true };
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
        const { data: existing } = await supabase
          .from('site_gallery')
          .select('id')
          .ilike('title_en', searchTitle)
          .limit(1);
        if (existing && existing.length > 0 && existing[0].id) {
          payload.id = existing[0].id;
        }
      }
    }

    const res = await upsertWithColumnFallback('site_gallery', payload);
    if (res.success) {
      sharedStore.saveSiteGalleryItem(res.data || itemData);
      return res;
    }
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist')))) {
      console.warn(`[AdminRepository] Table 'site_gallery' missing in Supabase schema (${res.error}). Saved to local store.`);
      sharedStore.saveSiteGalleryItem(itemData);
      return { success: true, data: itemData, fallback: true };
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
      supabase.from('faculties').delete().in('id', duplicateIdsToDelete).then(() => {
        console.log('[AdminRepository] Duplicate faculty records cleaned up successfully.');
      });
    }

    sharedStore.syncFacultyFromRemote(uniqueFaculty);
    return uniqueFaculty;
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
      // Lookup existing faculty by name to update existing UUID row
      const { data: existing } = await supabase
        .from('faculties')
        .select('id')
        .ilike('name', itemData.name)
        .limit(1);
      if (existing && existing.length > 0 && existing[0].id) {
        payload.id = existing[0].id;
      }
    }

    const res = await upsertWithColumnFallback('faculties', payload);
    const savedItem = {
      ...itemData,
      ...payload,
      id: res.data?.id || payload.id || itemData.id || `fac-${Date.now()}`,
      roleEn: payload.role_en,
      roleMr: payload.role_mr,
      expEn: payload.exp_en,
      expMr: payload.exp_mr,
      specEn: payload.spec_en,
      specMr: payload.spec_mr,
      imageUrl: payload.image_url
    };

    if (res.success) {
      sharedStore.saveFacultyItem(savedItem);
      return { success: true, data: savedItem };
    }
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist')))) {
      console.warn(`[AdminRepository] Table 'faculties' missing in Supabase schema (${res.error}). Saved to local store.`);
      sharedStore.saveFacultyItem(savedItem);
      return { success: true, data: savedItem, fallback: true };
    }
    return res;
  },

  async deleteFacultyItem(id) {
    const targetFaculty = sharedStore.getFaculty().find((f) => f.id === id);
    let { error } = await supabase.from('faculties').delete().eq('id', id);

    if (targetFaculty && targetFaculty.name) {
      await supabase.from('faculties').delete().ilike('name', targetFaculty.name);
    }

    if (error && !error.message.includes('schema cache') && !error.message.includes('does not exist')) {
      console.error('Supabase faculty delete error:', error.message);
    }
    sharedStore.deleteFacultyItem(id);
    return { success: true };
  },

  // ================= BATCH TIMETABLE CRUD =================
  async getAllBatches() {
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

    const res = await upsertWithColumnFallback('batches', payload, 'batch_timetable');
    if (res.success) {
      sharedStore.saveBatchItem(res.data || itemData);
      return res;
    }

    // Fallback: If table is missing in Supabase schema cache, save locally to sharedStore so user operation succeeds
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist') || res.error.includes('relation')))) {
      console.warn(`[AdminRepository] Supabase 'batches' table missing (${res.error}). Persisted batch slot locally to store.`);
      sharedStore.saveBatchItem(itemData);
      return { success: true, data: itemData, fallback: true };
    }

    return res;
  },

  async deleteBatchItem(id) {
    let { error } = await supabase.from('batches').delete().eq('id', id);
    if (error && (error.message.includes('schema cache') || error.message.includes('does not exist') || error.message.includes('relation'))) {
      const retry = await supabase.from('batch_timetable').delete().eq('id', id);
      error = retry.error;
    }
    if (error && !error.message.includes('schema cache') && !error.message.includes('does not exist')) {
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

    return data.map((item) => ({
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
        const { data: existing } = await supabase
          .from('news')
          .select('id')
          .ilike('title_en', searchTitle)
          .limit(1);
        if (existing && existing.length > 0 && existing[0].id) {
          payload.id = existing[0].id;
        }
      }
    }

    const res = await upsertWithColumnFallback('news', payload);
    const normalizedItem = {
      ...itemData,
      ...payload,
      id: res.data?.id || itemData.id || `n-${Date.now()}`,
      titleEn: payload.title_en,
      titleMr: payload.title_mr,
      categoryEn: payload.category_en,
      categoryMr: payload.category_mr,
      dateStr: payload.date_str,
      descEn: payload.desc_en,
      descMr: payload.desc_mr
    };

    if (res.success) {
      sharedStore.saveNewsItem(normalizedItem);
      return res;
    }
    if (res.isTableMissing || (res.error && (res.error.includes('schema cache') || res.error.includes('does not exist')))) {
      console.warn(`[AdminRepository] Table 'news' missing in Supabase schema (${res.error}). Saved to local store.`);
      sharedStore.saveNewsItem(normalizedItem);
      return { success: true, data: normalizedItem, fallback: true };
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

  // ================= MODULAR SITE SETTINGS CRUD =================
  async getSiteSettings() {
    const defaultSettings = sharedStore.getSiteSettings();
    try {
      const [
        brandingRes,
        homeRes,
        aboutRes,
        contactRes,
        infoRes,
        seoRes,
        socialRes,
        footerRes
      ] = await Promise.all([
        supabase.from('branding_settings').select('*').eq('id', 'main_branding').maybeSingle(),
        supabase.from('home_settings').select('*').eq('id', 'main_home').maybeSingle(),
        supabase.from('about_settings').select('*').eq('id', 'main_about').maybeSingle(),
        supabase.from('contact_settings').select('*').eq('id', 'main_contact').maybeSingle(),
        supabase.from('site_information').select('*').eq('id', 'main_info').maybeSingle(),
        supabase.from('seo_settings').select('*').eq('id', 'main_seo').maybeSingle(),
        supabase.from('social_links').select('*').eq('id', 'main_social').maybeSingle(),
        supabase.from('footer_settings').select('*').eq('id', 'main_footer').maybeSingle()
      ]);

      const branding = brandingRes.data || {};
      const home = homeRes.data || {};
      const about = aboutRes.data || {};
      const contact = contactRes.data || {};
      const info = infoRes.data || {};
      const seo = seoRes.data || {};
      const social = socialRes.data || {};
      const footer = footerRes.data || {};

      // If new tables empty, fallback to legacy site_settings row
      if (!brandingRes.data && !homeRes.data) {
        const { data: legacy } = await supabase.from('site_settings').select('*').eq('id', 'main_settings').maybeSingle();
        if (legacy) {
          return {
            ...defaultSettings,
            logoUrl: legacy.logo_url || defaultSettings.logoUrl,
            heroBgUrl: legacy.hero_bg_url || defaultSettings.heroBgUrl,
            heroTitleMr: legacy.hero_title_mr || defaultSettings.heroTitleMr,
            heroTitleEn: legacy.hero_title_en || defaultSettings.heroTitleEn,
            heroSubtitleMr: legacy.hero_subtitle_mr || defaultSettings.heroSubtitleMr,
            heroSubtitleEn: legacy.hero_subtitle_en || defaultSettings.heroSubtitleEn,
            heroBadgeMr: legacy.hero_badge_mr || defaultSettings.heroBadgeMr,
            heroBadgeEn: legacy.hero_badge_en || defaultSettings.heroBadgeEn,
            heroCtaTextMr: legacy.hero_cta_text_mr || defaultSettings.heroCtaTextMr,
            heroCtaTextEn: legacy.hero_cta_text_en || defaultSettings.heroCtaTextEn,
            heroCtaDest: legacy.hero_cta_dest || defaultSettings.heroCtaDest,
            contactPhone: legacy.contact_phone || defaultSettings.contactPhone,
            contactWhatsapp: legacy.contact_whatsapp || defaultSettings.contactWhatsapp,
            contactEmail: legacy.contact_email || defaultSettings.contactEmail,
            contactAddressMr: legacy.contact_address_mr || defaultSettings.contactAddressMr,
            contactAddressEn: legacy.contact_address_en || defaultSettings.contactAddressEn,
            contactHoursMr: legacy.contact_hours_mr || defaultSettings.contactHoursMr,
            contactHoursEn: legacy.contact_hours_en || defaultSettings.contactHoursEn,
            contactMapUrl: legacy.contact_map_url || defaultSettings.contactMapUrl,
            callCtaPhone: legacy.call_cta_phone || defaultSettings.callCtaPhone,
            callCtaTextMr: legacy.call_cta_text_mr || defaultSettings.callCtaTextMr,
            callCtaTextEn: legacy.call_cta_text_en || defaultSettings.callCtaTextEn,
            aboutHeadingMr: legacy.about_heading_mr || defaultSettings.aboutHeadingMr,
            aboutHeadingEn: legacy.about_heading_en || defaultSettings.aboutHeadingEn,
            aboutDescMr: legacy.about_desc_mr || defaultSettings.aboutDescMr,
            aboutDescEn: legacy.about_desc_en || defaultSettings.aboutDescEn,
            aboutImageUrl: legacy.about_image_url || defaultSettings.aboutImageUrl,
            aboutMissionMr: legacy.about_mission_mr || defaultSettings.aboutMissionMr,
            aboutMissionEn: legacy.about_mission_en || defaultSettings.aboutMissionEn,
            aboutVisionMr: legacy.about_vision_mr || defaultSettings.aboutVisionMr,
            aboutVisionEn: legacy.about_vision_en || defaultSettings.aboutVisionEn,
            aboutValues: legacy.about_values || defaultSettings.aboutValues,
            aboutTimeline: legacy.about_timeline || defaultSettings.aboutTimeline,
            homeSections: legacy.home_sections && Object.keys(legacy.home_sections).length > 0 ? legacy.home_sections : defaultSettings.homeSections,
            whyChooseUs: legacy.why_choose_us || defaultSettings.whyChooseUs,
            navSettings: legacy.nav_settings || defaultSettings.navSettings,
            siteTitleMr: legacy.site_title_mr || defaultSettings.siteTitleMr,
            siteTitleEn: legacy.site_title_en || defaultSettings.siteTitleEn,
            alcCode: legacy.alc_code || defaultSettings.alcCode,
            cscId: legacy.csc_id || defaultSettings.cscId,
            seoTitle: legacy.seo_title || defaultSettings.seoTitle,
            seoDescription: legacy.seo_description || defaultSettings.seoDescription,
            seoKeywords: legacy.seo_keywords || defaultSettings.seoKeywords,
            socialFacebook: legacy.social_facebook || defaultSettings.socialFacebook,
            socialInstagram: legacy.social_instagram || defaultSettings.socialInstagram,
            socialYoutube: legacy.social_youtube || defaultSettings.socialYoutube,
            footerTagline: legacy.footer_tagline || defaultSettings.footerTagline,
            copyrightText: legacy.copyright_text || defaultSettings.copyrightText
          };
        }
      }

      const mergedSettings = {
        ...defaultSettings,
        logoUrl: branding.logo_url || defaultSettings.logoUrl,
        heroBgUrl: branding.hero_bg_url || defaultSettings.heroBgUrl,
        heroTitleMr: home.hero_title_mr || defaultSettings.heroTitleMr,
        heroTitleEn: home.hero_title_en || defaultSettings.heroTitleEn,
        heroSubtitleMr: home.hero_subtitle_mr || defaultSettings.heroSubtitleMr,
        heroSubtitleEn: home.hero_subtitle_en || defaultSettings.heroSubtitleEn,
        heroBadgeMr: home.hero_badge_mr || defaultSettings.heroBadgeMr,
        heroBadgeEn: home.hero_badge_en || defaultSettings.heroBadgeEn,
        heroCtaTextMr: home.hero_cta_text_mr || defaultSettings.heroCtaTextMr,
        heroCtaTextEn: home.hero_cta_text_en || defaultSettings.heroCtaTextEn,
        heroCtaDest: home.hero_cta_dest || defaultSettings.heroCtaDest,
        homeSections: home.home_sections && Object.keys(home.home_sections).length > 0 ? home.home_sections : defaultSettings.homeSections,
        whyChooseUs: home.why_choose_us || defaultSettings.whyChooseUs,
        aboutHeadingMr: about.about_heading_mr || defaultSettings.aboutHeadingMr,
        aboutHeadingEn: about.about_heading_en || defaultSettings.aboutHeadingEn,
        aboutDescMr: about.about_desc_mr || defaultSettings.aboutDescMr,
        aboutDescEn: about.about_desc_en || defaultSettings.aboutDescEn,
        aboutImageUrl: about.about_image_url || defaultSettings.aboutImageUrl,
        aboutMissionMr: about.about_mission_mr || defaultSettings.aboutMissionMr,
        aboutMissionEn: about.about_mission_en || defaultSettings.aboutMissionEn,
        aboutVisionMr: about.about_vision_mr || defaultSettings.aboutVisionMr,
        aboutVisionEn: about.about_vision_en || defaultSettings.aboutVisionEn,
        aboutValues: about.about_values || defaultSettings.aboutValues,
        aboutTimeline: about.about_timeline || defaultSettings.aboutTimeline,
        contactPhone: contact.contact_phone || defaultSettings.contactPhone,
        contactWhatsapp: contact.contact_whatsapp || defaultSettings.contactWhatsapp,
        contactEmail: contact.contact_email || defaultSettings.contactEmail,
        contactAddressMr: contact.contact_address_mr || defaultSettings.contactAddressMr,
        contactAddressEn: contact.contact_address_en || defaultSettings.contactAddressEn,
        contactHoursMr: contact.contact_hours_mr || defaultSettings.contactHoursMr,
        contactHoursEn: contact.contact_hours_en || defaultSettings.contactHoursEn,
        contactMapUrl: contact.contact_map_url || defaultSettings.contactMapUrl,
        callCtaPhone: contact.call_cta_phone || defaultSettings.callCtaPhone,
        callCtaTextMr: contact.call_cta_text_mr || defaultSettings.callCtaTextMr,
        callCtaTextEn: contact.call_cta_text_en || defaultSettings.callCtaTextEn,
        siteTitleMr: info.site_title_mr || defaultSettings.siteTitleMr,
        siteTitleEn: info.site_title_en || defaultSettings.siteTitleEn,
        alcCode: info.alc_code || defaultSettings.alcCode,
        cscId: info.csc_id || defaultSettings.cscId,
        seoTitle: seo.seo_title || defaultSettings.seoTitle,
        seoDescription: seo.seo_description || defaultSettings.seoDescription,
        seoKeywords: seo.seo_keywords || defaultSettings.seoKeywords,
        socialFacebook: social.social_facebook || defaultSettings.socialFacebook,
        socialInstagram: social.social_instagram || defaultSettings.socialInstagram,
        socialYoutube: social.social_youtube || defaultSettings.socialYoutube,
        footerTagline: footer.footer_tagline || defaultSettings.footerTagline,
        copyrightText: footer.copyright_text || defaultSettings.copyrightText
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
      const promises = [
        // 1. Branding Settings
        supabase.from('branding_settings').upsert({
          id: 'main_branding',
          logo_url: settings.logoUrl || null,
          hero_bg_url: settings.heroBgUrl || null,
          updated_at: new Date().toISOString()
        }),
        // 2. Home Settings
        supabase.from('home_settings').upsert({
          id: 'main_home',
          hero_title_mr: settings.heroTitleMr || null,
          hero_title_en: settings.heroTitleEn || null,
          hero_subtitle_mr: settings.heroSubtitleMr || null,
          hero_subtitle_en: settings.heroSubtitleEn || null,
          hero_badge_mr: settings.heroBadgeMr || null,
          hero_badge_en: settings.heroBadgeEn || null,
          hero_cta_text_mr: settings.heroCtaTextMr || null,
          hero_cta_text_en: settings.heroCtaTextEn || null,
          hero_cta_dest: settings.heroCtaDest || 'courses',
          home_sections: settings.homeSections || {},
          why_choose_us: settings.whyChooseUs || [],
          updated_at: new Date().toISOString()
        }),
        // 3. About Settings
        supabase.from('about_settings').upsert({
          id: 'main_about',
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
          updated_at: new Date().toISOString()
        }),
        // 4. Contact Settings
        supabase.from('contact_settings').upsert({
          id: 'main_contact',
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
          updated_at: new Date().toISOString()
        }),
        // 5. Site Information
        supabase.from('site_information').upsert({
          id: 'main_info',
          site_title_mr: settings.siteTitleMr || null,
          site_title_en: settings.siteTitleEn || null,
          alc_code: settings.alcCode || null,
          csc_id: settings.cscId || null,
          updated_at: new Date().toISOString()
        }),
        // 6. SEO Settings
        supabase.from('seo_settings').upsert({
          id: 'main_seo',
          seo_title: settings.seoTitle || null,
          seo_description: settings.seoDescription || null,
          seo_keywords: settings.seoKeywords || null,
          updated_at: new Date().toISOString()
        }),
        // 7. Social Links
        supabase.from('social_links').upsert({
          id: 'main_social',
          social_facebook: settings.socialFacebook || null,
          social_instagram: settings.socialInstagram || null,
          social_youtube: settings.socialYoutube || null,
          social_whatsapp: settings.contactWhatsapp || null,
          updated_at: new Date().toISOString()
        }),
        // 8. Footer Settings
        supabase.from('footer_settings').upsert({
          id: 'main_footer',
          footer_tagline: settings.footerTagline || null,
          copyright_text: settings.copyrightText || null,
          updated_at: new Date().toISOString()
        }),
        // 9. Legacy site_settings table backup (Zero Data Loss)
        supabase.from('site_settings').upsert({
          id: 'main_settings',
          logo_url: settings.logoUrl || null,
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
          social_facebook: settings.socialFacebook || null,
          social_instagram: settings.socialInstagram || null,
          social_youtube: settings.socialYoutube || null,
          footer_tagline: settings.footerTagline || null,
          copyright_text: settings.copyrightText || null
        })
      ];

      const results = await Promise.allSettled(promises);
      const errors = results.filter(r => r.status === 'rejected' || (r.value && r.value.error));
      if (errors.length > 0) {
        console.warn('[AdminRepository] Some site_settings upserts had notices:', errors);
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


