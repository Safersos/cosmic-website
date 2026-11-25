import { neon } from '@neondatabase/serverless';
import { randomBytes, createHash, scryptSync, timingSafeEqual } from 'node:crypto';
const hash = value => createHash('sha256').update(value).digest('hex');
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const reply = (status, data) => { res.statusCode=status; res.setHeader('Content-Type','application/json'); res.end(JSON.stringify(data)); };
  try {
    const sql = neon(process.env.DATABASE_URL);
    const url = new URL(req.url, 'http://localhost');
    const action = url.searchParams.get('action');
    if (!['GET','POST','PUT'].includes(req.method)) return reply(405,{error:'Method not allowed'});
    if (req.method !== 'GET') {
      if (req.headers.origin && new URL(req.headers.origin).host !== req.headers.host) return reply(403,{error:'Invalid origin'});
      if (!req.headers['content-type']?.startsWith('application/json')) return reply(415,{error:'JSON required'});
    }
    let body=req.body;
    if (body === undefined && req.method !== 'GET') {
      let raw=''; for await (const chunk of req) { raw+=chunk; if(raw.length>64000) return reply(413,{error:'Profile too large'}); }
      body=JSON.parse(raw || '{}');
    } else if (typeof body === 'string') body=JSON.parse(body);
    if (JSON.stringify(body || {}).length>64000) return reply(413,{error:'Profile too large'});
    const cookie = value => res.setHeader('Set-Cookie',`cosmic_session=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${value?28800:0}${process.env.VERCEL ? '; Secure' : ''}`);
    if(action==='login' && req.method==='POST') {
      const id=String(body.username||'').trim().toLowerCase();
      const key=hash(id);
      const [limit]=await sql`INSERT INTO cosmic_login_attempts(key) VALUES (${key}) ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN cosmic_login_attempts.window_start < now()-interval '15 minutes' THEN 1 ELSE cosmic_login_attempts.attempts+1 END, window_start=CASE WHEN cosmic_login_attempts.window_start < now()-interval '15 minutes' THEN now() ELSE cosmic_login_attempts.window_start END RETURNING attempts`;
      if(limit.attempts>10) return reply(429,{error:'Too many attempts. Try again in 15 minutes.'});
      const [user]=await sql`SELECT * FROM cosmic_users WHERE id=${id}`;
      const [salt, expected]=(user?.password_hash || 'dummy:'+ '0'.repeat(128)).split(':');
      const actual=scryptSync(String(body.password||''),salt,64);
      if(!user || !timingSafeEqual(actual,Buffer.from(expected,'hex'))) return reply(401,{error:'Incorrect ID or password.'});
      const token=randomBytes(32).toString('hex');
      await sql`INSERT INTO cosmic_sessions(token_hash,user_id,expires_at) VALUES (${hash(token)},${id},now()+interval '8 hours')`;
      await sql`DELETE FROM cosmic_login_attempts WHERE key=${key}`;
      cookie(token); return reply(200,{profileId:user.profile_id});
    }
    const token=(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith('cosmic_session='))?.slice(15)||'';
    const [user]=await sql`SELECT u.id,u.profile_id FROM cosmic_sessions s JOIN cosmic_users u ON u.id=s.user_id WHERE s.token_hash=${hash(token)} AND s.expires_at>now()`;
    if(!user) return reply(401,{error:'Please sign in.'});
    if(action==='logout' && req.method==='POST') { await sql`DELETE FROM cosmic_sessions WHERE token_hash=${hash(token)}`; cookie(''); return reply(200,{ok:true}); }
    if(req.method==='GET') { const profiles=await sql`SELECT id,data FROM cosmic_profiles ORDER BY id`; return reply(200,{user:{id:user.id,profileId:user.profile_id},profiles}); }
    if(req.method==='PUT') {
      if(body.id!==user.profile_id) return reply(403,{error:'You can edit only your own profile.'});
      if(!body.data || typeof body.data!=='object' || Array.isArray(body.data)) return reply(400,{error:'Invalid profile'});
      const textFields=['name','email','phone','address','emergencyRelation','emergencyName','emergencyPhone','nationality','taxResidency','filingStatus','linkedin'];
      const lists={education:['qualification','institution','field','year','status'],experience:['organization','role','start','end','details'],contributions:['category','title','date','url','details']};
      const validText=value=>typeof value==='string' && value.length<=2000;
      if(Object.keys(body.data).some(key=>!textFields.includes(key)&&!Object.hasOwn(lists,key))) return reply(400,{error:'Unknown profile field'});
      for(const key of textFields) if(body.data[key]!==undefined && !validText(body.data[key])) return reply(400,{error:'Invalid profile field'});
      if(body.data.filingStatus && !['Filed','Pending'].includes(body.data.filingStatus)) return reply(400,{error:'Choose Filed or Pending'});
      for(const [key,allowed] of Object.entries(lists)) {
        const rows=body.data[key]||[];
        if(!Array.isArray(rows)||rows.length>50||rows.some(row=>!row||typeof row!=='object'||Array.isArray(row)||Object.entries(row).some(([name,value])=>!allowed.includes(name)||!validText(value)))) return reply(400,{error:'Invalid history entries (maximum 50 per section)'});
        for(const row of rows) if(row.start&&row.end&&row.end<row.start) return reply(400,{error:'End date must follow start date'});
      }
      await sql`UPDATE cosmic_profiles SET data=${JSON.stringify(body.data)}::jsonb,updated_at=now() WHERE id=${user.profile_id}`;
      return reply(200,{ok:true});
    }
    return reply(404,{error:'Unknown action'});
  } catch { reply(500,{error:'Workspace unavailable. Please try again.'}); }
}
