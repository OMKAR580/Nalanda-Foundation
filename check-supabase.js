// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// Manually parse .env.local
const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const rawUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

async function fetchSchema() {
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });
    
    if (!res.ok) {
      console.error('Fetch failed:', res.status, await res.text());
      return;
    }
    
    const schema = await res.json();
    console.log('API Description Info:', schema.info);
    console.log('Exposed Tables/Views:', Object.keys(schema.definitions || {}));
    
    const paths = Object.keys(schema.paths || {});
    console.log('RPC / Function Paths:');
    paths.filter(p => p.startsWith('/rpc/')).forEach(p => console.log(' -', p));
  } catch (err) {
    console.error('Error fetching schema:', err);
  }
}

fetchSchema();
