import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import 'dotenv/config';

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
        PORT: z.coerce.number().default(3000),
        DATABASE_URL: z.string().url('Invalid Postgres Connection String'),
    },

    runtimeEnv: process.env,

    emptyStringAsUndefined: true,
});