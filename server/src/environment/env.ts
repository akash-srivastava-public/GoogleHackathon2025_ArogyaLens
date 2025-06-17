// server/src/config/env.ts
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { log } from 'console';

const envPath = path.resolve(__dirname, '../../../.env');

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('✅ Loaded .env from', envPath);
  log('🔧 Environment variables loaded from .env file') ;
} else {
  console.warn('⚠️ .env not found at', envPath);
}
