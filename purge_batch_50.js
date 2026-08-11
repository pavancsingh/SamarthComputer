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

// The 4 Canonical Unique Gallery IDs created in the last step:
const canonicalIds = new Set([
  'a384b6f0-03d5-4f60-836a-ccd806d586d1',
  '0ba3a4a7-3b63-4cc0-b7de-0cf5879b9e1a',
  '3caed2e7-0503-4b61-821a-096a2cbca688',
  'a1bfa0b2-3de5-4b80-bd0e-59a756cf1673'
]);

async function purge50() {
  console.log('=== PURGING ALL DUPLICATE GALLERY ROWS (BATCH SIZE = 50) ===\n');

  let totalDeleted = 0;
  let hasMore = true;

  while (hasMore) {
    const { data: rows, error } = await supabase
      .from('site_gallery')
      .select('id')
      .limit(500);

    if (error) {
      console.error('Fetch error:', error.message);
      break;
    }

    if (!rows || rows.length === 0) {
      console.log('No rows returned.');
      break;
    }

    const deleteIds = rows.map((r) => r.id).filter((id) => !canonicalIds.has(id));

    if (deleteIds.length === 0) {
      console.log('All remaining rows match canonical IDs or no rows to delete.');
      break;
    }

    // Delete in sub-batches of 50 to avoid URL length overflow
    for (let i = 0; i < deleteIds.length; i += 50) {
      const chunk = deleteIds.slice(i, i + 50);
      const { error: delErr } = await supabase
        .from('site_gallery')
        .delete()
        .in('id', chunk);

      if (delErr) {
        console.error('Sub-batch delete error:', delErr.message);
      } else {
        totalDeleted += chunk.length;
        process.stdout.write(`Deleted ${chunk.length} rows (Total Purged: ${totalDeleted})\r`);
      }
    }
  }

  console.log(`\n\n=== PURGE FINISHED: Deleted ${totalDeleted} duplicate rows ===`);

  const { data: finalRows } = await supabase.from('site_gallery').select('id, title_en, category');
  console.log(`\n🎉 FINAL SITE_GALLERY ROW COUNT: ${finalRows?.length}`);
  console.log('Final rows in site_gallery:');
  for (const r of finalRows || []) {
    console.log(`  - [${r.category}] ${r.title_en} (ID: ${r.id})`);
  }
}

purge50().catch(console.error);
