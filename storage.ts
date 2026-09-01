import path from 'path';
import { createClient } from '@libsql/client';

// DATABASE_URL (por padrão usa um arquivo SQLite local no diretório do projeto)
// - Local (deploy único):   file:./fpstudio.db         (ou DATABASE_URL vazio)
// - Compartilhado (multi-máquina): libsql://<db>.turso.io + DATABASE_AUTH_TOKEN
const DEFAULT_DB_PATH = path.join(process.cwd(), 'fpstudio.db');
const dbUrl = process.env.DATABASE_URL || `file:${DEFAULT_DB_PATH}`;

export const db = createClient({
  url: dbUrl,
  ...(process.env.DATABASE_AUTH_TOKEN
    ? { authToken: process.env.DATABASE_AUTH_TOKEN }
    : {}),
});

export const STATE_KEYS = [
  'studioInfo',
  'adminCredentials',
  'rooms',
  'services',
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
  await db.execute(
    'CREATE TABLE IF NOT EXISTS app_state (key TEXT PRIMARY KEY, value TEXT NOT NULL)'
  );
}

export async function loadState(): Promise<StateSnapshot> {
  const rs = await db.execute('SELECT key, value FROM app_state');
  const out: StateSnapshot = {};
  for (const row of rs.rows) {
    const key = String(row.key) as (typeof STATE_KEYS)[number];
    if (!STATE_KEYS.includes(key)) continue;
    try {
      out[key] = JSON.parse(String(row.value));
    } catch {
      // ignore invalid row
    }
  }
  return out;
}

export async function saveState(state: StateSnapshot) {
  const entries = Object.entries(state).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;
  const values: string[] = [];
  for (const [k, v] of entries) values.push(k, JSON.stringify(v));
  const placeholders = entries.map(() => '(?, ?)').join(', ');
  await db.execute(
    `INSERT INTO app_state (key, value) VALUES ${placeholders}
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    values
  );
}

export async function wipeState() {
  await db.execute('DELETE FROM app_state');
}