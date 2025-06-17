import "./environment/env"
import { connectDB } from "./config/db";
import { startServer } from "./server";
(async () => {
  try {
    await connectDB();
    startServer();
  } catch (err) {
    console.error('❌ Failed to start application:', err);
    process.exit(1);
  }
})();
