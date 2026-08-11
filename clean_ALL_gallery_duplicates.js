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

// The 4 Canonical Unique Gallery Items
const CANONICAL_GALLERY = [
  {
    title_mr: 'अद्ययावत कॉम्प्युटर लॅब',
    title_en: 'Modern Computer Lab',
    desc_mr: '२०+ हाय-स्पीड i5/i7 पीसी आणि एसी क्लासरूम',
    desc_en: '20+ High-Spec i5/i7 PCs in AC Room',
    category: 'Campus',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  {
    title_mr: 'प्रमाणपत्र वाटप सोहळा',
    title_en: 'Certificate Award Ceremony',
    desc_mr: 'MS-CIT टॉपर विद्यार्थ्यांचा गौरव',
    desc_en: 'Honoring Top MS-CIT Achievers',
    category: 'Events',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    title_mr: 'प्रॅक्टिकल कॉम्प्युटर क्लास',
    title_en: 'Practical Training Sessions',
    desc_mr: '१-ऑन-१ वैयक्तिक कॉम्प्युटर सराव',
    desc_en: '1-on-1 Hands-On Computer Practice',
    category: 'Classroom',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    title_mr: 'सीएससी सेंटर काउंटर',
    title_en: 'CSC Services Station',
    desc_mr: 'झटपट शासकीय सेवा व अर्ज प्रक्रिया',
    desc_en: 'Fast-Track CSC Services Desk',
    category: 'Facilities',
    image_url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80'
  }
];

async function purgeAllDuplicates() {
  console.log('=== PURGING ALL DUPLICATE GALLERY ROWS FROM SUPABASE ===\n');

  let loopCount = 0;
  let totalDeleted = 0;

  // 1. Loop until site_gallery table has 0 rows
  while (true) {
    loopCount++;
    const { data: rows, error } = await supabase
      .from('site_gallery')
      .select('id')
      .limit(1000);

    if (error) {
      console.error('Fetch error:', error.message);
      break;
    }

    if (!rows || rows.length === 0) {
      console.log(`Table site_gallery cleared completely after ${loopCount - 1} purge iteration(s).`);
      break;
    }

    const idsToDelete = rows.map((r) => r.id);
    const { error: delErr } = await supabase
      .from('site_gallery')
      .delete()
      .in('id', idsToDelete);

    if (delErr) {
      console.error('Delete error:', delErr.message);
      break;
    } else {
      totalDeleted += idsToDelete.length;
      console.log(`Iteration ${loopCount}: Purged ${idsToDelete.length} rows (Cumulative Deleted: ${totalDeleted})`);
    }
  }

  console.log('\n=== INSERTING THE 4 CANONICAL UNIQUE GALLERY ITEMS ===');
  const { data: inserted, error: insertErr } = await supabase
    .from('site_gallery')
    .insert(CANONICAL_GALLERY)
    .select();

  if (insertErr) {
    console.error('Insert canonical gallery error:', insertErr.message);
  } else {
    console.log(`✅ Successfully inserted ${inserted.length} canonical gallery items!`);
    for (const item of inserted) {
      console.log(`   - [${item.category}] ${item.title_en} (ID: ${item.id})`);
    }
  }

  // Final count check
  const { data: finalRows } = await supabase.from('site_gallery').select('id, title_en');
  console.log(`\n🎉 FINAL SITE_GALLERY ROW COUNT: ${finalRows?.length}`);
}

purgeAllDuplicates().catch(console.error);
