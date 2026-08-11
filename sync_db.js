import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are required.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Connecting to Supabase...');

  const mainLogoUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/logos/samarth-main-logo.png';
  const mscitLogoUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/logos/mscit-logo.png';
  const excelLogoUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/logos/excel-logo.png';
  const tallyLogoUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/logos/tally-logo.png';
  const swatiImageUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/faculty/swati-bhosale.jpg';
  const sagarImageUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co/storage/v1/object/public/samarth-media/faculty/sagar-bhosale.jpg';

  // 1. Update site_settings
  console.log('Upserting site_settings...');
  const { error: settingsErr } = await supabase
    .from('site_settings')
    .upsert({
      id: 'main_settings',
      logo_url: mainLogoUrl,
      hero_bg_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      hero_title_mr: 'समर्थ कॉम्प्युटर्स खंडाळा — तुमच्या करिअरचा स्मार्ट निर्णय!',
      hero_title_en: 'Samarth Computers Khandala — Smart Decision for Your Career!'
    });
  if (settingsErr) console.warn('site_settings error:', settingsErr.message);
  else console.log('site_settings updated successfully!');

  // 2. Update Course logos
  console.log('Updating courses logos...');
  await supabase.from('courses').update({ logo_url: mscitLogoUrl }).eq('slug', 'mscit');
  await supabase.from('courses').update({ logo_url: tallyLogoUrl }).eq('slug', 'tally-prime-gst');
  await supabase.from('courses').update({ logo_url: excelLogoUrl }).eq('slug', 'advanced-excel');
  console.log('Course logos updated!');

  // 3. Clean up and Update Faculties table
  console.log('Cleaning up faculties table...');
  await supabase.from('faculties').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Inserting primary faculty members with Swati Bhosale as Center Head...');
  const { data: facData, error: facErr } = await supabase.from('faculties').insert([
    {
      name: 'Prof. Sagar Bhosale (MBA)',
      role_mr: 'सेंटर हेड & लीड इन्स्ट्रक्टर',
      role_en: 'Lead Instructor & Center Head',
      exp_mr: '१२+ वर्षांचा प्रॅक्टिकल टीचिंग अनुभव',
      exp_en: 'Over 12 years of teaching experience',
      spec_mr: 'MS-CIT, Advanced Excel, Tally Prime (GST), बँकिंग, फायनान्स आणि शेअर मार्केट तज्ज्ञ.',
      spec_en: 'Specializes in MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, and Share Market with real-world case studies.',
      badge: 'Center Head',
      image_url: sagarImageUrl
    },
    {
      name: 'Swati Bhosale (M.A. B.Ed)',
      role_mr: 'सेंटर हेड & टॅली एक्स्पर्ट',
      role_en: 'Center Head & Tally Specialist',
      exp_mr: '१०+ वर्षांचा टीचिंग अनुभव',
      exp_en: 'Over 10 years of teaching experience',
      spec_mr: 'M.A. B.Ed पदवीधर. टॅली प्राइम (GST), अकाउंटिंग फंडामेंटल्स आणि फायनान्शियल मॅनेजमेंट तज्ज्ञ.',
      spec_en: 'B.Ed qualified with specialized expertise in Tally Prime (GST), accounting fundamentals, and financial management.',
      badge: 'Center Head',
      image_url: swatiImageUrl
    }
  ]).select();

  if (facErr) console.warn('Faculty insert error:', facErr.message);
  else console.log('Faculties updated successfully!', facData?.length);

  console.log('All DB sync operations completed!');
}

main().catch(console.error);
