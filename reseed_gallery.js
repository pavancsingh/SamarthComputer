import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  const envText = fs.readFileSync('.env', 'utf-8');
  for (const line of envText.split('\n')) {
    if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
  }
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedOneGallery() {
  const { data, error } = await supabase.from('site_gallery').insert([
    {
      title_mr: 'समर्थ कॉम्प्युटर्स खंडाळा फोटो गॅलरी',
      title_en: 'Samarth Computers Khandala Photo Gallery',
      category: 'campus',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      desc_mr: 'अद्ययावत कॉम्प्युटर लॅब, डिजिटल क्लासरूम व विद्यार्थी प्रात्यक्षिक प्रशिक्षण सेंटर.',
      desc_en: 'Modern computer lab, digital classroom, and practical student training center.'
    }
  ]).select();

  if (error) console.error('Seed error:', error.message);
  else console.log('Successfully inserted 1 clean gallery item! ID:', data[0]?.id);
}

seedOneGallery().catch(console.error);
