import { supabase } from '../lib/supabase';
import { sharedStore } from './sharedStore';
import { CSC_SERVICES_DATA } from '../constants/cscData';
import { GOVT_SERVICES_DATA } from '../constants/govtServicesData';
import { AdminRepository } from './AdminRepository';

/**
 * InquiryRepository
 * Data Access Layer for CSC & Government Portal services and lead submissions with direct Supabase DB access.
 */
export const InquiryRepository = {
  /**
   * Duplicate-safe check to seed missing CSC services into Supabase
   */
  async ensureSeedCSCServices() {
    try {
      const { data: existing, error } = await supabase.from('csc_services').select('slug');
      if (error) return;
      const existingSlugs = new Set((existing || []).map((s) => s.slug));

      const missing = CSC_SERVICES_DATA.filter((s) => !existingSlugs.has(s.slug));
      if (missing.length > 0) {
        console.log(`[InquiryRepository] Seeding ${missing.length} missing CSC service(s) to Supabase...`);
        for (const service of missing) {
          await AdminRepository.saveCSCService(service);
        }
      }
    } catch (e) {
      console.warn('CSC seed check warning:', e.message);
    }
  },

  /**
   * Duplicate-safe check to seed missing Govt services into Supabase
   */
  async ensureSeedGovtServices() {
    try {
      const { data: existing, error } = await supabase.from('govt_services').select('slug');
      if (error) return;
      const existingSlugs = new Set((existing || []).map((g) => g.slug));

      const missing = GOVT_SERVICES_DATA.filter((g) => !existingSlugs.has(g.slug));
      if (missing.length > 0) {
        console.log(`[InquiryRepository] Seeding ${missing.length} missing Govt service(s) to Supabase...`);
        for (const service of missing) {
          await AdminRepository.saveGovtService(service);
        }
      }
    } catch (e) {
      console.warn('Govt seed check warning:', e.message);
    }
  },

  /**
   * Fetch all CSC services with optional category filtering from Supabase DB.
   */
  async getCSCServices(category = 'all') {
    try {
      let query = supabase.from('csc_services').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      let { data, error } = await query;
      if (error && error.message.includes('display_order')) {
        let fallbackQuery = supabase.from('csc_services').select('*').order('created_at', { ascending: false });
        if (category !== 'all') {
          fallbackQuery = fallbackQuery.eq('category', category);
        }
        const retry = await fallbackQuery;
        data = retry.data;
        error = retry.error;
      }
      if (error || !data || data.length === 0) {
        if (error) console.error('Supabase CSC service fetch error:', error.message);
        const local = sharedStore.getCSCServices();
        return category !== 'all' ? local.filter(s => s.category === category) : local;
      }
      return (data || []).map((s) => ({
        ...s,
        titleMr: s.title_mr || s.titleMr,
        titleEn: s.title_en || s.titleEn,
        timelineMr: s.timeline_mr || s.timelineMr,
        timelineEn: s.timeline_en || s.timelineEn,
        deadlineMr: s.deadline_mr || s.deadlineMr || 'सदैव उपलब्ध',
        deadlineEn: s.deadline_en || s.deadlineEn || 'Always Available',
        status: s.status || 'Open',
        officialUrl: s.official_url || s.officialUrl || '',
        isFeatured: s.is_featured !== undefined ? s.is_featured : (s.isFeatured || false),
        displayOrder: s.display_order !== undefined ? s.display_order : (s.displayOrder || 0),
        govtFeeMr: s.govt_fee_mr || s.govtFeeMr,
        govtFeeEn: s.govt_fee_en || s.govtFeeEn,
        overviewMr: s.overview_mr || s.overviewMr,
        overviewEn: s.overview_en || s.overviewEn,
        requiredDocsMr: s.required_docs_mr || s.requiredDocsMr || [],
        requiredDocsEn: s.required_docs_en || s.requiredDocsEn || [],
        stepsMr: s.steps_mr || s.stepsMr || [],
        stepsEn: s.steps_en || s.stepsEn || []
      }));
    } catch (e) {
      console.error('Supabase CSC service fetch exception:', e.message);
      const local = sharedStore.getCSCServices();
      return category !== 'all' ? local.filter(s => s.category === category) : local;
    }
  },

  /**
   * Fetch all Government Portal Services from Supabase DB.
   */
  async getGovtServices(category = 'all') {
    try {
      let query = supabase.from('govt_services').select('*').order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error || !data || data.length === 0) {
        if (error) console.error('Supabase Govt service fetch error:', error.message);
        const local = sharedStore.getGovtServices();
        return category !== 'all' ? local.filter(g => g.category === category) : local;
      }
      return (data || []).map((g) => ({
        ...g,
        titleMr: g.title_mr || g.titleMr,
        titleEn: g.title_en || g.titleEn,
        timelineMr: g.timeline_mr || g.timelineMr,
        timelineEn: g.timeline_en || g.timelineEn,
        govtFeeMr: g.govt_fee_mr || g.govtFeeMr,
        govtFeeEn: g.govt_fee_en || g.govtFeeEn,
        overviewMr: g.overview_mr || g.overviewMr,
        overviewEn: g.overview_en || g.overviewEn,
        requiredDocsMr: g.required_docs_mr || g.requiredDocsMr || g.requirementsMr || g.requirements_mr || [],
        requiredDocsEn: g.required_docs_en || g.requiredDocsEn || g.requirementsEn || g.requirements_en || [],
        stepsMr: g.steps_mr || g.stepsMr || [],
        stepsEn: g.steps_en || g.stepsEn || []
      }));
    } catch (e) {
      console.error('Supabase Govt service fetch exception:', e.message);
      const local = sharedStore.getGovtServices();
      return category !== 'all' ? local.filter(g => g.category === category) : local;
    }
  },

  /**
   * Fetch single CSC service by slug from Supabase DB.
   */
  async getCSCServiceBySlug(slug) {
    try {
      const { data, error } = await supabase.from('csc_services').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) {
        return {
          ...data,
          titleMr: data.title_mr || data.titleMr,
          titleEn: data.title_en || data.titleEn,
          timelineMr: data.timeline_mr || data.timelineMr,
          timelineEn: data.timeline_en || data.timelineEn,
          govtFeeMr: data.govt_fee_mr || data.govtFeeMr,
          govtFeeEn: data.govt_fee_en || data.govtFeeEn,
          overviewMr: data.overview_mr || data.overviewMr,
          overviewEn: data.overview_en || data.overviewEn,
          requiredDocsMr: data.required_docs_mr || data.requiredDocsMr || [],
          requiredDocsEn: data.required_docs_en || data.requiredDocsEn || [],
          stepsMr: data.steps_mr || data.stepsMr || [],
          stepsEn: data.steps_en || data.stepsEn || []
        };
      }
    } catch (e) {
      console.error('Supabase CSC service detail exception:', e.message);
    }
    return null;
  },

  /**
   * Submit CSC service application lead directly to Supabase DB.
   */
  async submitCSCInquiry(payload) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'csc_service',
          name: payload.name,
          mobile: payload.mobile,
          service_id: payload.serviceId || payload.service,
          status: 'New Lead'
        }])
        .select();

      if (error) {
        console.error('Supabase DB CSC inquiry error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data: data?.[0] };
    } catch (err) {
      console.error('CSC inquiry submission exception:', err.message);
      return { success: false, error: err.message };
    }
  },

  /**
   * Submit Govt Portal service application lead directly to Supabase DB.
   */
  async submitGovtInquiry(payload) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'govt_service',
          name: payload.name,
          mobile: payload.mobile,
          service_id: payload.serviceId || payload.service,
          status: 'New Lead'
        }])
        .select();

      if (error) {
        console.error('Supabase DB Govt inquiry error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data: data?.[0] };
    } catch (err) {
      console.error('Govt inquiry submission exception:', err.message);
      return { success: false, error: err.message };
    }
  },

  /**
   * Submit a service request lead directly to Supabase DB.
   * SERVICES Workflow only — type: 'service_request'.
   * Never used for course admissions.
   */
  async submitServiceRequest(payload) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'service_request',
          name: payload.name,
          mobile: payload.mobile,
          service_id: payload.serviceId || payload.service || '',
          status: 'New Lead',
          details: {
            serviceName: payload.serviceName || '',
            notes: payload.notes || '',
            preferredTime: payload.preferredTime || 'anytime'
          }
        }])
        .select();

      if (error) {
        console.error('Supabase DB service request error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data: data?.[0] };
    } catch (err) {
      console.error('Service request submission exception:', err.message);
      return { success: false, error: err.message };
    }
  },

  /**
   * Generic inquiry submission for contact form.
   */
  async submitInquiry(payload) {
    const type = payload.type === 'csc' ? 'csc_service' : payload.type === 'general' ? 'general_feedback' : 'course_admission';
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type,
          name: payload.name,
          mobile: payload.phone || payload.contact,
          course_id: payload.course,
          service_id: payload.service,
          status: 'New Lead',
          details: { message: payload.message, lang: payload.lang }
        }])
        .select();

      if (error) {
        console.error('Supabase DB inquiry error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data: data?.[0] };
    } catch (err) {
      console.error('Inquiry submission exception:', err.message);
      return { success: false, error: err.message };
    }
  }
};
