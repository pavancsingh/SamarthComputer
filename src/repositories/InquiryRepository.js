import { sharedStore } from './sharedStore';
import { supabase } from '../lib/supabase';

/**
 * InquiryRepository
 * Data Access Layer for CSC & Government Portal services and lead submissions with Supabase DB & sharedStore support.
 */
export const InquiryRepository = {
  /**
   * Fetch all CSC services with optional category filtering.
   */
  async getCSCServices(category = 'all') {
    try {
      let query = supabase.from('csc_services').select('*').order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        sharedStore.syncCSCServicesFromRemote(data);
        return data.map((s) => ({
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
      }
    } catch (e) {
      console.warn('Supabase CSC service fetch notice:', e.message);
    }

    const all = sharedStore.getCSCServices();
    if (category === 'all') return all;
    return all.filter((s) => s.category === category);
  },

  /**
   * Fetch all Government Portal Services (Revenue, Transport, Ration Card).
   */
  async getGovtServices(category = 'all') {
    try {
      let query = supabase.from('govt_services').select('*').order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        sharedStore.syncGovtServicesFromRemote(data);
        return data.map((g) => ({
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
      }
    } catch (e) {
      console.warn('Supabase Govt service fetch notice:', e.message);
    }

    const all = sharedStore.getGovtServices();
    if (category === 'all') return all;
    return all.filter((g) => g.category === category);
  },

  /**
   * Fetch single CSC service by slug.
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
      console.warn('Supabase CSC service detail notice:', e.message);
    }

    const all = sharedStore.getCSCServices();
    return all.find((s) => s.slug === slug || s.id === slug) || all[0];
  },

  /**
   * Submit CSC service application lead.
   */
  async submitCSCInquiry(payload) {
    sharedStore.addInquiry({
      type: 'csc_service',
      name: payload.name,
      mobile: payload.mobile,
      service_id: payload.serviceId || payload.service
    });

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'csc_service',
          name: payload.name,
          mobile: payload.mobile,
          service_id: payload.serviceId || payload.service,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.warn('Supabase DB notice:', error.message);
      }
      return { success: true, data };
    } catch (err) {
      console.warn('CSC inquiry clean handling:', err.message);
      return { success: true };
    }
  },

  /**
   * Submit Govt Portal service application lead.
   */
  async submitGovtInquiry(payload) {
    sharedStore.addInquiry({
      type: 'govt_service',
      name: payload.name,
      mobile: payload.mobile,
      service_id: payload.serviceId || payload.service
    });

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'govt_service',
          name: payload.name,
          mobile: payload.mobile,
          service_id: payload.serviceId || payload.service,
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.warn('Supabase DB notice:', error.message);
      }
      return { success: true, data };
    } catch (err) {
      console.warn('Govt inquiry clean handling:', err.message);
      return { success: true };
    }
  }
};
