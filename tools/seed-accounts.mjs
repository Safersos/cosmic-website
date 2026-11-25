import { neon } from '@neondatabase/serverless';
import { randomBytes,scryptSync } from 'node:crypto';
const sql=neon(process.env.DATABASE_URL);
for(const [id,profile,key] of [['founder@cosmic','founder','COSMIC_FOUNDER_PASSWORD'],['rajeev@cosmic','cofounder','COSMIC_RAJEEV_PASSWORD']]) {
  if(!process.env[key]) throw Error(`Missing ${key}`);
  const salt=randomBytes(16).toString('hex');
  const passwordHash=salt+':'+scryptSync(process.env[key],salt,64).toString('hex');
  await sql`INSERT INTO cosmic_users(id,profile_id,password_hash) VALUES (${id},${profile},${passwordHash}) ON CONFLICT(id) DO UPDATE SET password_hash=excluded.password_hash`;
  await sql`DELETE FROM cosmic_sessions WHERE user_id=${id}`;
}
console.log('Both accounts configured with salted password hashes.');
