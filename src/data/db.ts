import pg from 'pg';
import { env } from '@/lib/env.js';

const { Pool } = pg;

export const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
});