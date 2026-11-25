import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
await sql`CREATE TABLE IF NOT EXISTS cosmic_users (id text PRIMARY KEY, password_hash text NOT NULL, profile_id text UNIQUE NOT NULL)`;
await sql`CREATE TABLE IF NOT EXISTS cosmic_profiles (id text PRIMARY KEY, data jsonb NOT NULL DEFAULT '{}', updated_at timestamptz NOT NULL DEFAULT now())`;
await sql`CREATE TABLE IF NOT EXISTS cosmic_sessions (token_hash text PRIMARY KEY, user_id text REFERENCES cosmic_users(id), expires_at timestamptz NOT NULL)`;
await sql`CREATE TABLE IF NOT EXISTS cosmic_login_attempts (key text PRIMARY KEY, attempts integer NOT NULL DEFAULT 1, window_start timestamptz NOT NULL DEFAULT now())`;
await sql`INSERT INTO cosmic_profiles(id) VALUES ('founder'), ('cofounder') ON CONFLICT DO NOTHING`;
console.log('Profile, account, session and login-limit tables ready.');
