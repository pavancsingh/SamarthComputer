import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

let supabaseUrl = process.env.VITE_SUPABASE_URL;
let supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  try {
    const envText = fs.readFileSync('.env', 'utf-8');
    for (const line of envText.split('\n')) {
      if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
      if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
    }
  } catch (e) {}
}

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tablesToAudit = [
  { table: 'courses', keyFields: ['slug'] },
  { table: 'faculties', keyFields: ['name'] },
  { table: 'site_gallery', keyFields: ['title_en', 'image_url'] },
  { table: 'csc_services', keyFields: ['slug'] },
  { table: 'govt_services', keyFields: ['slug'] },
  { table: 'news', keyFields: ['title_en'] },
  { table: 'batches', keyFields: ['course_name_en', 'time_slot'] },
  { table: 'site_settings', keyFields: ['id'] },
  { table: 'certificates', keyFields: ['reg_no'] }
];

async function audit() {
  console.log('=== SUPABASE DUPLICATE ROW AUDIT REPORT ===\n');
  const duplicatePlan = [];

  for (const item of tablesToAudit) {
    const { data, error } = await supabase.from(item.table).select('*');
    if (error) {
      console.log(`Table '${item.table}': Error - ${error.message}`);
      continue;
    }

    if (!data || data.length === 0) {
      console.log(`Table '${item.table}': 0 rows found.`);
      continue;
    }

    // Group rows by stable key combination
    const groups = {};
    for (const row of data) {
      const key = item.keyFields.map((f) => (row[f] || '').toString().trim().toLowerCase()).join('::');
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    }

    const dupGroups = Object.entries(groups).filter(([_, rows]) => rows.length > 1);

    console.log(`Table '${item.table}': Total ${data.length} rows | Duplicate groups: ${dupGroups.length}`);

    if (dupGroups.length > 0) {
      for (const [groupKey, rows] of dupGroups) {
        // Sort rows by created_at ascending (keep oldest / first valid UUID row)
        rows.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
        const keepRow = rows[0];
        const deleteRows = rows.slice(1);

        console.log(`  Group [${groupKey}]: Total ${rows.length} copies`);
        console.log(`    KEEP ID   : ${keepRow.id} (created: ${keepRow.created_at || 'N/A'})`);
        console.log(`    DELETE IDs: ${deleteRows.map((r) => r.id).join(', ')}`);

        duplicatePlan.push({
          table: item.table,
          groupKey,
          keepId: keepRow.id,
          deleteIds: deleteRows.map((r) => r.id)
        });
      }
    }
    console.log('');
  }

  console.log('=== AUDIT SUMMARY ===');
  console.log(`Total tables audited: ${tablesToAudit.length}`);
  console.log(`Total duplicate groups detected: ${duplicatePlan.length}`);
  console.log(`Total duplicate rows marked for deletion: ${duplicatePlan.reduce((acc, p) => acc + p.deleteIds.length, 0)}`);
}

audit().catch(console.error);
