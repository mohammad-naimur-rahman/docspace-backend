import dotenv from 'dotenv'
import path from 'path'
import { z } from 'zod'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const envVarSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z
    .string()
    .default('5000')
    .refine(val => Number(val)),
  DATABASE_URL: z.string(),
  BCRYPT_SALT_ROUNDS: z.string(),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
  JWT_REFRESH_EXPIRES_IN: z.string(),
  FIREBASE_ADMIN_TYPE: z.string().nonempty(),
  FIREBASE_ADMIN_PROJECT_ID: z.string().nonempty(),
  FIREBASE_ADMIN_PRIVATE_KEY_ID: z.string().nonempty(),
  FIREBASE_ADMIN_PRIVATE_KEY: z.string().nonempty(),
  FIREBASE_ADMIN_CLIENT_EMAIL: z.string().nonempty(),
  FIREBASE_ADMIN_CLIENT_ID: z.string().nonempty(),
  FIREBASE_ADMIN_AUTH_URI: z.string().nonempty(),
  FIREBASE_ADMIN_TOKEN_URI: z.string().nonempty(),
  FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  FIREBASE_ADMIN_CLIENT_X509_CERT_URL: z.string(),
  FIREBASE_ADMIN_UNIVERSE_DOMAIN: z.string(),
})

export const envVars = envVarSchema.parse(process.env)
