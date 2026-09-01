import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';

const dataFile = path.join(process.cwd(), 'data_storage.json');
const uploadsDir = path.join(process.cwd(), 'uploads');

const STATE_KEYS = [
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
];

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

if (!process.env.SUPABASE_DATABASE_URL && !process.env.DATABASE_URL) {
  console.error('[import-local] Variável SUPABASE_DATABASE_URL não definida. Configure o .env (como na máquina principal).');
  process.exit(1);
}
if (!fs.existsSync(dataFile)) {
  console.error('[import-local] data_storage.json não encontrado neste diretório.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));

  const entries = [];
  for (const key of STATE_KEYS) {
    if (data[key] !== undefined) entries.push([key, JSON.stringify(data[key])]);
  }

  for (let i = 0; i < entries.length; i += 5) {
    const batch = entries.slice(i, i + 5);
    const placeholders = batch.map((_, j) => `($${j * 2 + 1}, $${j * 2 + 2})`).join(', ');
    const params = batch.flat();
    await pool.query(
      `INSERT INTO app_state (key, value) VALUES ${placeholders}
       ON CONFLICT(key) DO UPDATE SET value = EXCLUDED.value`,
      params
    );
  }
  console.log(`[import-local] app_state atualizado: ${entries.map(([k]) => k).join(', ')} (${data.services?.length ?? 0} serviços)`);

  let images = 0;
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir).filter((f) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f));
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const ext = path.extname(file).toLowerCase();
      const isBig = fs.statSync(filePath).size > 1024 * 1024;
      if (isBig) {
        console.warn(`[import-local] Pulando ${file} (maior que 1MB, verifique manualmente).`);
        continue;
      }
      const base64 = fs.readFileSync(filePath).toString('base64');
      await pool.query(
        `INSERT INTO uploaded_files (id, mime, data) VALUES ($1, $2, $3)
         ON CONFLICT(id) DO UPDATE SET mime = EXCLUDED.mime, data = EXCLUDED.data`,
        [file, MIME[ext] || 'image/jpeg', base64]
      );
      images += 1;
    }
  }
  console.log(`[import-local] uploads/ sincronizados: ${images} imagens em uploaded_files.`);

  await pool.end();
  console.log('[import-local] Concluído. A máquina ADM precisa agora rodar o código novo (v1.0 com Supabase) para as próximas alterações irem direto ao banco compartilhado.');
}

main().catch((err) => {
  console.error('[import-local] Erro:', err.message);
  process.exit(1);
});