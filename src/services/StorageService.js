import { supabase } from '../lib/supabase';

/**
 * StorageService
 * Handles media uploads to Supabase Storage bucket ('samarth-media')
 * with automatic fallback to Data URLs for instant client responsiveness.
 */
export const StorageService = {
  /**
   * Upload an image file to Supabase storage bucket 'samarth-media'
   * @param {File} file - File instance selected from file input
   * @param {string} folder - Destination subfolder (e.g. 'courses', 'laptops', 'gallery', 'about')
   * @returns {Promise<string>} Public image URL or Base64 fallback string
   */
  async uploadImage(file, folder = 'general') {
    if (!file) return null;

    // Generate unique filename
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    try {
      // 1. Attempt upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('samarth-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (!error && data) {
        // Retrieve public URL
        const { data: urlData } = supabase.storage
          .from('samarth-media')
          .getPublicUrl(fileName);

        if (urlData && urlData.publicUrl) {
          return urlData.publicUrl;
        }
      } else {
        console.warn('Supabase storage upload notice (using fallback):', error?.message);
      }
    } catch (err) {
      console.warn('Supabase storage error (using fallback):', err.message);
    }

    // 2. Client-side Base64 Data URL Fallback
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        resolve(null);
      };
      reader.readAsDataURL(file);
    });
  }
};
