import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import 'dotenv/config';

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
        PORT: z.coerce.number().default(3000),
        DB_USER: z.string().min(1, 'Database user is required'),
        DB_PASSWORD: z.string().min(1, 'Database password is required'),
        DB_HOST: z.string().default('localhost'),
        DB_PORT: z.coerce.number().default(5432),
        DB_NAME: z.string().min(1, 'Database name is required'),
    },

    runtimeEnv: process.env,

    emptyStringAsUndefined: true,
});