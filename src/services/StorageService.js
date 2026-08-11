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
  },

  /**
   * Delete an image from Supabase Storage bucket 'samarth-media' by its public URL
   * @param {string} imageUrl - Public image URL to remove from storage
   * @returns {Promise<boolean>} True if deleted or ignored safely, false on error
   */
  async deleteImage(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') return false;
    // Skip external fallback images (Unsplash, local assets, base64)
    if (imageUrl.startsWith('data:') || imageUrl.startsWith('http://') || imageUrl.startsWith('/') || imageUrl.includes('unsplash.com')) {
      return true;
    }

    try {
      const bucketMarker = '/samarth-media/';
      const index = imageUrl.indexOf(bucketMarker);
      if (index !== -1) {
        const filePath = imageUrl.substring(index + bucketMarker.length);
        if (filePath) {
          const { error } = await supabase.storage
            .from('samarth-media')
            .remove([filePath]);
          if (error) {
            console.warn('[StorageService] Error deleting old storage image:', error.message);
            return false;
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('[StorageService] Storage delete exception:', err.message);
    }
    return false;
  }
};
