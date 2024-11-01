import { z } from 'zod';

import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: envFile });

const envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production', 'debug']),
  API_PORT: z.coerce.number().positive(),
});

export const parsedEnvs = Object.freeze(envSchema.parse(process.env));
