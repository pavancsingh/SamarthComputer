import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoY2ZqeWhvZ2hpeWxzdm94dnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzY5NTQsImV4cCI6MjEwMTY1Mjk1NH0.oDqifZJ5DIBvDuRYjE4tDYM0qELlUgJp12GVnVYBXmw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Connecting to Supabase...');
  
  const filesToUpload = [
    { localPath: 'public/assets/logos/samarth-main-logo.png', bucketPath: 'logos/samarth-main-logo.png', contentType: 'image/png' },
    { localPath: 'public/assets/logos/mscit-logo.png', bucketPath: 'logos/mscit-logo.png', contentType: 'image/png' },
    { localPath: 'public/assets/logos/excel-logo.png', bucketPath: 'logos/excel-logo.png', contentType: 'image/png' },
    { localPath: 'public/assets/logos/tally-logo.png', bucketPath: 'logos/tally-logo.png', contentType: 'image/png' },
    { localPath: 'public/assets/images/swati-bhosale.jpg', bucketPath: 'faculty/swati-bhosale.jpg', contentType: 'image/jpeg' },
    { localPath: 'public/assets/images/sagar-bhosale.jpg', bucketPath: 'faculty/sagar-bhosale.jpg', contentType: 'image/jpeg' },
    { localPath: 'public/assets/images/samarth-banner.jpg', bucketPath: 'gallery/samarth-banner.jpg', contentType: 'image/jpeg' },
  ];

  const uploadedUrls = {};

  for (const item of filesToUpload) {
    const filePath = path.resolve(item.localPath);
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    console.log(`Uploading ${item.bucketPath}...`);

    const { data, error } = await supabase.storage
      .from('samarth-media')
      .upload(item.bucketPath, fileBuffer, {
        contentType: item.contentType,
        upsert: true,
      });

    if (error) {
      console.warn(`Error uploading ${item.bucketPath}:`, error.message);
    } else {
      console.log(`Successfully uploaded ${item.bucketPath}`);
    }

    const { data: urlData } = supabase.storage
      .from('samarth-media')
      .getPublicUrl(item.bucketPath);

    uploadedUrls[item.bucketPath] = urlData.publicUrl;
    console.log(`Public URL: ${urlData.publicUrl}`);
  }

  console.log('\n--- Uploaded URLs Summary ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  // Update site_settings in Supabase DB
  console.log('\nUpdating site_settings in Supabase DB...');
  const mainLogoUrl = uploadedUrls['logos/samarth-main-logo.png'];

  const { data: settingsData, error: settingsError } = await supabase
    .from('site_settings')
    .upsert({
      id: 'main_settings',
      logo_url: mainLogoUrl,
      updated_at: new Date().toISOString()
    });

  if (settingsError) {
    console.warn('site_settings update error:', settingsError.message);
  } else {
    console.log('site_settings updated successfully!');
  }

  // Update Courses in DB with new course logos
  console.log('\nUpdating course logos in Supabase DB...');
  
  // 1. MS-CIT
  await supabase
    .from('courses')
    .update({ logo_url: uploadedUrls['logos/mscit-logo.png'] })
    .eq('slug', 'mscit');

  // 2. Tally Prime
  await supabase
    .from('courses')
    .update({ logo_url: uploadedUrls['logos/tally-logo.png'] })
    .eq('slug', 'tally-prime-gst');

  // 3. Advanced Excel
  await supabase
    .from('courses')
    .update({ logo_url: uploadedUrls['logos/excel-logo.png'] })
    .eq('slug', 'advanced-excel');

  // Update Faculty in DB
  console.log('\nUpdating faculties in Supabase DB...');
  
  // Update Swati Bhosale to Center Head
  const swatiUrl = uploadedUrls['faculty/swati-bhosale.jpg'];
  const sagarUrl = uploadedUrls['faculty/sagar-bhosale.jpg'];

  const { data: facCheck, error: facCheckErr } = await supabase.from('faculties').select('*');
  console.log('Current faculties in DB:', facCheck?.length || 0);

  if (facCheck && facCheck.length > 0) {
    for (const fac of facCheck) {
      if (fac.name && fac.name.includes('Swati')) {
        await supabase
          .from('faculties')
          .update({
            role_mr: 'सेंटर हेड & टॅली एक्स्पर्ट',
            role_en: 'Center Head & Tally Specialist',
            badge: 'Center Head',
            image_url: swatiUrl
          })
          .eq('id', fac.id);
        console.log('Updated Swati Bhosale in DB!');
      } else if (fac.name && fac.name.includes('Sagar')) {
        await supabase
          .from('faculties')
          .update({
            role_mr: 'सेंटर हेड & लीड इन्स्ट्रक्टर',
            role_en: 'Lead Instructor & Center Head',
            badge: 'Center Head',
            image_url: sagarUrl
          })
          .eq('id', fac.id);
        console.log('Updated Sagar Bhosale in DB!');
      }
    }
  } else {
    // Upsert default faculty
    await supabase.from('faculties').upsert([
      {
        id: 'fac-1',
        name: 'Prof. Sagar Bhosale (MBA)',
        role_mr: 'सेंटर हेड & लीड इन्स्ट्रक्टर',
        role_en: 'Lead Instructor & Center Head',
        exp_mr: '१२+ वर्षांचा प्रॅक्टिकल टीचिंग अनुभव',
        exp_en: 'Over 12 years of teaching experience',
        spec_mr: 'MS-CIT, Advanced Excel, Tally Prime (GST), बँकिंग, फायनान्स आणि शेअर मार्केट तज्ज्ञ.',
        spec_en: 'Specializes in MS-CIT, Advanced Excel, Tally Prime (GST), Banking & Finance, and Share Market with real-world case studies.',
        badge: 'Center Head',
        image_url: sagarUrl
      },
      {
        id: 'fac-2',
        name: 'Swati Bhosale (M.A. B.Ed)',
        role_mr: 'सेंटर हेड & टॅली एक्स्पर्ट',
        role_en: 'Center Head & Tally Specialist',
        exp_mr: '१०+ वर्षांचा टीचिंग अनुभव',
        exp_en: 'Over 10 years of teaching experience',
        spec_mr: 'M.A. B.Ed पदवीधर. टॅली प्राइम (GST), अकाउंटिंग फंडामेंटल्स आणि फायनान्शियल मॅनेजमेंट तज्ज्ञ.',
        spec_en: 'B.Ed qualified with specialized expertise in Tally Prime (GST), accounting fundamentals, and financial management.',
        badge: 'Center Head',
        image_url: swatiUrl
      }
    ]);
    console.log('Inserted default faculties into DB!');
  }

  console.log('\nScript execution complete!');
}

main().catch(console.error);
