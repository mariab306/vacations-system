import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
}
export const sql = neon(databaseUrl);