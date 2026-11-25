import assert from 'node:assert/strict';
import http from 'node:http';
import handler from '../api/workspace.js';
const server=http.createServer(handler); await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const call=(method,body,cookie='',action='')=>fetch(base+'/?action='+action,{method,headers:{'Content-Type':'application/json',Cookie:cookie},body:body?JSON.stringify(body):undefined});
try {
  assert.equal((await call('GET')).status,401);
  for(const [id,profile,key] of [['founder@cosmic','founder','COSMIC_FOUNDER_PASSWORD'],['rajeev@cosmic','cofounder','COSMIC_RAJEEV_PASSWORD']]) {
    const login=await call('POST',{username:id,password:process.env[key]},'','login'); assert.equal(login.status,200);
    const cookie=login.headers.get('set-cookie').split(';')[0];
    const session=await (await call('GET',null,cookie)).json(); assert.equal(session.user.profileId,profile);
    const current=session.profiles.find(p=>p.id===profile).data;
    assert.equal((await call('PUT',{id:profile,data:current},cookie)).status,200);
    assert.equal((await call('PUT',{id:profile==='founder'?'cofounder':'founder',data:{}},cookie)).status,403);
    assert.equal((await call('POST',{},cookie,'logout')).status,200);
    assert.equal((await call('GET',null,cookie)).status,401);
  }
  assert.equal((await call('POST',{username:'founders@cosmic',password:'invalid'},'','login')).status,401);
  console.log('PASS: both logins, profile saves, cross-profile rejection, logout and anonymous rejection.');
} finally {server.close();}
