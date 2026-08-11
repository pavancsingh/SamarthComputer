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

async function cleanDuplicates() {
  console.log('=== STARTING SUPABASE DUPLICATE ROW CLEANUP ===\n');

  const keepId = '000572b9-6ed7-47b9-b8fb-bf8feef922be';

  // 1. Fetch all site_gallery IDs
  const { data: rows, error } = await supabase
    .from('site_gallery')
    .select('id, created_at');

  if (error) {
    console.error('Error fetching site_gallery rows:', error.message);
    process.exit(1);
  }

  console.log(`Total site_gallery rows in database: ${rows.length}`);

  const deleteIds = rows.map((r) => r.id).filter((id) => id !== keepId);

  console.log(`Keep Target UUID : ${keepId}`);
  console.log(`Delete Target count: ${deleteIds.length} duplicate rows`);

  if (deleteIds.length === 0) {
    console.log('No duplicates to delete.');
    return;
  }

  // Delete in batches of 100
  const BATCH_SIZE = 100;
  let deletedCount = 0;

  for (let i = 0; i < deleteIds.length; i += BATCH_SIZE) {
    const batch = deleteIds.slice(i, i + BATCH_SIZE);
    const { error: delErr } = await supabase
      .from('site_gallery')
      .delete()
      .in('id', batch);

    if (delErr) {
      console.warn(`Batch delete error (offset ${i}):`, delErr.message);
    } else {
      deletedCount += batch.length;
      console.log(`Deleted batch ${Math.floor(i / BATCH_SIZE) + 1} (${deletedCount}/${deleteIds.length})`);
    }
  }

  console.log(`\n=== CLEANUP COMPLETED: Deleted ${deletedCount} duplicate rows ===`);
}

cleanDuplicates().catch(console.error);
