import { supabase } from '../lib/supabase';

/**
 * InquiryRepository
 * Data Access Layer for CSC & Government Portal services and lead submissions with direct Supabase DB access.
 */
export const InquiryRepository = {
  /**
   * Fetch all CSC services with optional category filtering from Supabase DB.
   */
  async getCSCServices(category = 'all') {
    try {
      let query = supabase.from('csc_services').select('*').order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Supabase CSC service fetch error:', error.message);
        return [];
      }
      return (data || []).map((s) => ({
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
    } catch (e) {
      console.error('Supabase CSC service fetch exception:', e.message);
      return [];
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
      if (error) {
        console.error('Supabase Govt service fetch error:', error.message);
        return [];
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
        requirementsMr: g.requirements_mr || g.requirementsMr || [],
        requirementsEn: g.requirements_en || g.requirementsEn || [],
        stepsMr: g.steps_mr || g.stepsMr || [],
        stepsEn: g.steps_en || g.stepsEn || []
      }));
    } catch (e) {
      console.error('Supabase Govt service fetch exception:', e.message);
      return [];
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
  }
};
