import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data_storage.json');
const seedFile = path.join(process.cwd(), 'seed_state.json');

if (!fs.existsSync(dataFile)) {
  console.error('[seed:sync] data_storage.json não encontrado. Rode o app uma vez para gerá-lo.');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
delete data.adminCredentials;
delete data.backupPins;

fs.writeFileSync(seedFile, JSON.stringify(data, null, 2), 'utf-8');
console.log(`[seed:sync] seed_state.json atualizado com ${data.clients?.length ?? 0} clientes e ${data.services?.length ?? 0} serviços.`);