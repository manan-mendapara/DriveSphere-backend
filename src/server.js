export const startServer = async () => {
  // Server starts via Hono's serve() in worker.js
  // No need for app.listen() in Cloudflare Workers
  console.log("🚀 DriveSphere backend is running on Cloudflare Workers");
};