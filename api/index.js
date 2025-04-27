let cachedHandler;

export default async function handler(req, res) {
  if (!cachedHandler) {
    const appModule = await import('../dist/sonica/server/server.mjs');
    cachedHandler = appModule.reqHandler;
  }
  return cachedHandler(req, res);
}
