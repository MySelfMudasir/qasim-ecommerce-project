export default async (req, res) => {
    const { reqHandler } = await import('../dist/ecommerce/server/server.mjs');
    return reqHandler(req, res);
}