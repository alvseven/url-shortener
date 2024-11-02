import { z } from 'zod';

import * as dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: envFile });

const envSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production', 'debug']),
  API_PORT: z.coerce.number().positive(),
  API_URL: z
    .string()
    .url()
    .transform((url) => {
      const urlHasTrailingSlash = url.endsWith('/');

      return urlHasTrailingSlash ? url.slice(0, -1) : url;
    }),
});

export const parsedEnvs = Object.freeze(envSchema.parse(process.env));
