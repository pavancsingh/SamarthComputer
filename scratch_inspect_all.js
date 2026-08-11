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

async function inspectAll() {
  const tables = ['courses', 'faculties', 'site_gallery', 'csc_services', 'govt_services', 'news', 'site_settings'];

  console.log('================ DATABASE DUPLICATES AUDIT REPORT ================');

  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*');
    if (error) {
      console.log(`Table '${t}' fetch error: ${error.message}`);
      continue;
    }

    console.log(`\nTABLE: '${t}' (Total Rows: ${data.length})`);

    // Grouping criteria per table
    const groups = {};
    for (const r of data) {
      let groupKey = '';
      if (t === 'courses' || t === 'csc_services' || t === 'govt_services') {
        groupKey = (r.slug || r.title_en || r.title_mr || r.id).toLowerCase();
      } else if (t === 'faculties') {
        groupKey = (r.name || r.id).toLowerCase();
      } else if (t === 'site_gallery') {
        groupKey = (r.title_en || r.title_mr || r.image_url || r.id).toLowerCase();
      } else if (t === 'news') {
        groupKey = (r.title_en || r.title_mr || r.id).toLowerCase();
      } else if (t === 'site_settings') {
        groupKey = (r.id || 'main_settings').toLowerCase();
      }

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(r);
    }

    let dupCount = 0;
    for (const [key, rows] of Object.entries(groups)) {
      if (rows.length > 1) {
        dupCount++;
        rows.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
        const keep = rows[0];
        const deleteRows = rows.slice(1);
        console.log(`  🔍 Duplicate Group: "${key}" (${rows.length} copies)`);
        console.log(`     ✅ KEEP   UUID: ${keep.id} (Created: ${keep.created_at || 'N/A'})`);
        console.log(`     ❌ DELETE UUIDs (${deleteRows.length}): [ ${deleteRows.map(r => r.id).join(', ')} ]`);
      }
    }

    if (dupCount === 0) {
      console.log(`  ✅ No duplicate rows found in '${t}'. All ${data.length} records are unique.`);
    }
  }

  console.log('\n==================================================================');
}

inspectAll().catch(console.error);
