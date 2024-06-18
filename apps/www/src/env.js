// @ts-nocheck
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  client: {
    NEXT_PUBLIC_DYNAMIC_ENV_ID: z.string().min(1),
    NEXT_PUBLIC_LIVEBLOCKS_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_DYNAMIC_ENV_ID: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID,
    NEXT_PUBLIC_LIVEBLOCKS_API_KEY: process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY,
  },
  skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
  emptyStringAsUndefined: true,
});
