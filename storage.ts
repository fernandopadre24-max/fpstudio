import { Pool } from 'pg';

// SUPABASE_DATABASE_URL: PostgreSQL connection string from Supabase (Settings → Database → URI)
// Format: postgresql://postgres.xxxxx:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const STATE_KEYS = [
  'studioInfo',
  'adminCredentials',
  'rooms',
  'services',
  'equipmentItems',
  'clients',
  'bookings',
  'quotes',
  'chatMessages',
  'notifications',
  'transactions',
  'reviews',
] as const;

export type StateSnapshot = Partial<Record<(typeof STATE_KEYS)[number], unknown>>;

export async function initStorage() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS uploaded_files (
      id TEXT PRIMARY KEY,
      mime TEXT NOT NULL,
      data TEXT NOT NULL
    )
  `);
}

export async function loadState(): Promise<StateSnapshot> {
  const rs = await pool.query('SELECT key, value FROM app_state');
  const out: StateSnapshot = {};
  for (const row of rs.rows) {
    const key = row.key as (typeof STATE_KEYS)[number];
    if (!STATE_KEYS.includes(key)) continue;
    try {
      out[key] = JSON.parse(row.value);
    } catch {
      // ignore invalid row
    }
  }
  return out;
}

export async function saveState(state: StateSnapshot) {
  const entries = Object.entries(state).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;

  const keys = entries.map(([k]) => k);
  const vals = entries.map(([, v]) => JSON.stringify(v));
  const placeholders = keys.map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`).join(', ');
  const params: string[] = [];
  for (let i = 0; i < keys.length; i++) {
    params.push(keys[i], vals[i]);
  }

  await pool.query(
    `INSERT INTO app_state (key, value) VALUES ${placeholders}
     ON CONFLICT(key) DO UPDATE SET value = EXCLUDED.value`,
    params
  );
}

export async function wipeState() {
  await pool.query('DELETE FROM app_state');
}

export async function saveUploadedFile(id: string, mime: string, base64: string) {
  await pool.query(
    `INSERT INTO uploaded_files (id, mime, data) VALUES ($1, $2, $3)
     ON CONFLICT(id) DO UPDATE SET mime = EXCLUDED.mime, data = EXCLUDED.data`,
    [id, mime, base64]
  );
}

export async function getUploadedFile(id: string): Promise<{ mime: string; base64: string } | null> {
  const rs = await pool.query('SELECT mime, data FROM uploaded_files WHERE id = $1', [id]);
  if (rs.rows.length === 0) return null;
  return { mime: rs.rows[0].mime, base64: rs.rows[0].data };
}