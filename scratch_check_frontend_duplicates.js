globalThis.import = { meta: { env: { VITE_SUPABASE_URL: 'https://vhcfjyhoghiylsvoxvxc.supabase.co' } } };

import { COURSES_DATA } from './src/constants/coursesData.js';
import { CSC_SERVICES_DATA } from './src/constants/cscData.js';
import { GOVT_SERVICES_DATA } from './src/constants/govtServicesData.js';

console.log('=== FRONTEND CONSTANTS DUPLICATE CHECK ===\n');

function checkList(name, list, keyField = 'slug') {
  const seen = new Map();
  let dupCount = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const key = (item[keyField] || item.id || '').toString().trim().toLowerCase();
    if (seen.has(key)) {
      dupCount++;
      console.log(`❌ Duplicate found in '${name}': Key "${key}" (Indices: ${seen.get(key)} and ${i})`);
    } else {
      seen.set(key, i);
    }
  }
  if (dupCount === 0) {
    console.log(`✅ '${name}': All ${list.length} items are unique by '${keyField}'.`);
  }
}

checkList('COURSES_DATA', COURSES_DATA, 'slug');
checkList('CSC_SERVICES_DATA', CSC_SERVICES_DATA, 'slug');
checkList('GOVT_SERVICES_DATA', GOVT_SERVICES_DATA, 'slug');
