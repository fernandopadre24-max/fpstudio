import app, { ensureStarted } from '../server';

export default async function handler(req, res) {
  await ensureStarted();
  return app(req, res);
}