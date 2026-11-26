const fields={name:'Full name',email:'Email',phone:'Phone',address:'Address for service',emergencyRelation:'Emergency contact relation',emergencyName:'Emergency contact name',emergencyPhone:'Emergency contact phone',nationality:'Nationality',taxResidency:'Tax residency',filingStatus:'30(b) filing status',linkedin:'LinkedIn profile link'};
const groups={education:{title:'Education history',fields:{qualification:['Bachelor’s','Master’s','Doctorate','Other degree','Professional qualification','Certification course'],institution:'Institution / awarding organization',field:'Degree field / course',year:'Graduation / completion year',status:['Completed','In progress','Drop out']}},experience:{title:'Work experience',fields:{organization:'Organization',role:'Role',start:'Start date',end:'End date (blank if current)',details:'Responsibilities'}},contributions:{title:'Achievements & contributions',fields:{category:['Achievement','Publication','Open source contribution','GitHub history','Other'],title:'Title',date:'Date',url:'Link',githubUsername:'GitHub username (for contribution heatmap)',details:'Details'}}};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const githubUsername=value=>{try{const url=new URL(value);return url.hostname.toLowerCase()==='github.com'?url.pathname.split('/').filter(Boolean)[0]:'';}catch{return String(value||'').replace(/^@/,'').trim();}};
async function renderGitHubHeatmap(panel) {
  const username=panel.dataset.githubUser;
  try {
    const response=await fetch(`/api/workspace?action=github&username=${encodeURIComponent(username)}`);
    const activity=await response.json(); if(!response.ok) throw Error(activity.error);
    const earliest=new Date(`${activity.days[0].date}T00:00:00Z`);
    const start=new Date(earliest); start.setUTCDate(start.getUTCDate()-start.getUTCDay());
    panel.innerHTML=`<div class="github-heatmap-heading"><a href="https://github.com/${esc(activity.username)}" target="_blank" rel="noopener noreferrer">GitHub contribution activity · ${activity.year} ↗</a><span>Less <i></i><i></i><i></i><i></i><i></i> More</span></div><div class="github-heatmap-grid" role="img" aria-label="${esc(activity.username)} GitHub contribution activity for ${activity.year}"></div>`;
    const grid=panel.querySelector('.github-heatmap-grid');
    activity.days.forEach(({date,level})=>{const day=new Date(`${date}T00:00:00Z`);const week=Math.floor((day-start)/604800000);const cell=document.createElement('i');cell.className=`level-${level}`;cell.style.gridColumn=week+1;cell.style.gridRow=day.getUTCDay()+1;cell.title=`${date} · contribution level ${level}`;grid.append(cell);});
  } catch { panel.textContent=`GitHub contribution activity for ${username} is unavailable.`; panel.classList.add('github-heatmap-error'); }
}
function initializeProfiles(session) {
  document.querySelector('[data-admin-message="cap-edit-status"]').onclick=()=>{document.querySelector('#cap-edit-status').textContent='Cap table editing is not available yet.';};
  for(const [index,id] of ['founder','cofounder'].entries()) {
    const card=document.querySelectorAll('.founder-profile')[index];
    const originalName=id==='founder'?card.querySelector('h4').textContent:'Rajeev';
    let data=session.profiles.find(p=>p.id===id)?.data||{};
    if(!data.name) data.name=originalName;
    const button=card.querySelector('button'); button.hidden=session.user.profileId!==id;
    const summary=document.createElement('div'); summary.className='profile-details'; card.querySelector('.profile-content').append(summary);
    const overview=document.createElement('dl'); overview.className='profile-overview';
    overview.setAttribute('aria-label','Profile highlights');
    card.querySelector('.profile-content').insertBefore(overview,summary);
    summary.id=`${id}-details`;
    summary.hidden=true;
    const toggle=document.createElement('button');
    toggle.type='button'; toggle.className='profile-expand';
    toggle.setAttribute('aria-controls',summary.id);
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label',`Expand ${id==='founder'?'founder':'co-founder'} profile`);
    toggle.textContent='View details +';
    card.querySelector('.ledger-heading').append(toggle);
    const setExpanded=expanded=>{
      summary.hidden=!expanded;
      overview.hidden=expanded;
      toggle.setAttribute('aria-expanded',String(expanded));
      toggle.setAttribute('aria-label',`${expanded?'Collapse':'Expand'} ${id==='founder'?'founder':'co-founder'} profile`);
      toggle.textContent=expanded?'Hide details −':'View details +';
      card.classList.toggle('is-expanded',expanded);
    };
    card.addEventListener('click',event=>{
      if(event.target.closest('.profile-details') || event.target.closest('a,input,select,textarea') || (event.target.closest('button') && !toggle.contains(event.target))) return;
      setExpanded(summary.hidden);
    });
    function render() {
      card.querySelector('h4').textContent=data.name||originalName;
      const completedEducation=[...(data.education||[])].filter(row=>row.status==='Completed'&&Object.values(row).some(Boolean)).sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0));
      const education=completedEducation.at(0);
      const experience=[...(data.experience||[])].filter(row=>Object.values(row).some(Boolean)).sort((a,b)=>{
        const current=row=>Boolean(row.start&&!row.end);
        return Number(current(b))-Number(current(a)) || (b.end||b.start||'').localeCompare(a.end||a.start||'') || (b.start||'').localeCompare(a.start||'');
      }).at(0);
      const join=values=>values.filter(Boolean).join(' · ');
      const educationLabel=row=>{
        if(!row) return '';
        const degree=[row.qualification,row.field&&`in ${row.field}`].filter(Boolean).join(' ');
        return [degree,row.status,row.year].filter(Boolean).join(' · ');
      };
      const highlight=(label,value)=>`<div><dt>${label}</dt><dd>${esc(value||'Not added')}</dd></div>`;
      let linkedin=esc(data.linkedin||'Not added');
      try { const url=new URL(data.linkedin); if(['https:','http:'].includes(url.protocol)) linkedin=`<a href="${esc(url.href)}" target="_blank" rel="noopener noreferrer">${esc(data.linkedin)} ↗</a>`; } catch {}
      overview.innerHTML=highlight('Email',data.email)+highlight('Phone',data.phone)+`<div><dt>LinkedIn</dt><dd>${linkedin}</dd></div>`+highlight('Address for service',data.address)+highlight('Tax residency',data.taxResidency)+highlight('Latest completed education',educationLabel(education))+highlight('Latest work experience',experience?join([experience.role,experience.organization,experience.start,experience.end||(experience.start?'Present':'' )]):'');
      const githubUsers=[...new Set((data.contributions||[]).filter(row=>row.category==='GitHub history').map(row=>githubUsername(row.githubUsername||row.url)).filter(Boolean))];
      const educationHistory=(data.education||[]).map(row=>{const degree=[row.qualification,row.field&&`in ${row.field}`].filter(Boolean).join(' ');return `<p>${esc([degree,row.status,row.year,row.institution].filter(Boolean).join(' · '))}</p>`;}).join('')||'<p>No entries yet.</p>';
      summary.innerHTML='<dl>'+Object.entries(fields).filter(([key])=>key!=='name').map(([key,label])=>`<div><dt>${label}</dt><dd>${esc(data[key]||'Not added')}</dd></div>`).join('')+'</dl>'+Object.entries(groups).map(([key,g])=>`<section><h4>${g.title}</h4>${key==='education'?educationHistory:(data[key]||[]).map(row=>`<p>${Object.values(row).filter(Boolean).map(esc).join(' · ')}</p>`).join('')||'<p>No entries yet.</p>'}${key==='contributions'?githubUsers.map(username=>`<div class="github-heatmap" data-github-user="${esc(username)}">Loading GitHub contribution activity…</div>`).join(''):''}</section>`).join('');
      summary.querySelectorAll('.github-heatmap').forEach(renderGitHubHeatmap);
    }
    render();
    button.onclick=()=>{
      const dialog=document.createElement('dialog'); dialog.className='profile-editor'; dialog.setAttribute('aria-label','Edit profile'); dialog.style.margin='auto'; dialog.style.boxSizing='border-box';
      const input=(key,label,value='')=>`<label>${esc(Array.isArray(label)?(fields[key]||key):label)}${Array.isArray(label)?`<select name="${key}"><option value="">Select</option>${label.map(o=>`<option ${value===o?'selected':''}>${esc(o)}</option>`).join('')}</select>`:`<input name="${key}" value="${esc(value)}" maxlength="2000" type="${key==='email'?'email':['url','linkedin'].includes(key)?'url':['start','end','date'].includes(key)?'date':'text'}">`}</label>`;
      dialog.innerHTML=`<form><h2>Edit ${id==='founder'?'founder':'co-founder'} profile</h2><div class="profile-form-grid">${Object.entries(fields).map(([k,v])=>input(k,k==='filingStatus'?['Filed','Pending']:v,data[k])).join('')}</div>${Object.entries(groups).map(([k,g])=>`<section data-group="${k}"><h3>${g.title}</h3><div class="entries"></div><button type="button" data-add="${k}">Add entry</button></section>`).join('')}<p role="status"></p><div class="profile-form-actions"><button type="button" data-cancel>Cancel</button><button type="submit">Save profile</button></div></form>`;
      const add=(key,row={})=>{ const entry=document.createElement('fieldset'); entry.innerHTML=`<legend>${groups[key].title} entry</legend><div class="profile-form-grid">${Object.entries(groups[key].fields).map(([k,v])=>input(k,v,row[k])).join('')}</div><button type="button">Remove entry</button>`; entry.querySelector('button').onclick=()=>entry.remove(); dialog.querySelector(`[data-group="${key}"] .entries`).append(entry); };
      for(const key of Object.keys(groups)) { for(const row of data[key]||[]) add(key,row); dialog.querySelector(`[data-add="${key}"]`).onclick=()=>add(key); }
      dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();
      dialog.addEventListener('click',event=>{
        const bounds=dialog.getBoundingClientRect();
        const clickedBackdrop=event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom;
        if(clickedBackdrop) dialog.close();
      });
      dialog.addEventListener('cancel',event=>{event.preventDefault();dialog.close();});
      dialog.addEventListener('close',()=>{dialog.remove();button.focus();});
      dialog.querySelector('form').onsubmit=async e=>{
        e.preventDefault(); const next={};
        for(const key of Object.keys(fields)) next[key]=dialog.querySelector(`[name="${key}"]`).value.trim();
        for(const key of Object.keys(groups)) next[key]=[...dialog.querySelectorAll(`[data-group="${key}"] fieldset`)].map(row=>Object.fromEntries([...row.querySelectorAll('input,select')].map(i=>[i.name,i.value.trim()])));
        const save=dialog.querySelector('[type="submit"]'); save.disabled=true;
        try { const response=await fetch('/api/workspace',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,data:next})}); const result=await response.json(); if(!response.ok) throw Error(result.error); data=next; render(); dialog.close(); } catch(error) { dialog.querySelector('[role="status"]').textContent=error.message; } finally {save.disabled=false;}
      };
      document.body.append(dialog); dialog.showModal();
    };
  }
}
if(window.cosmicSession) initializeProfiles(window.cosmicSession);
else window.addEventListener('workspace-ready',event=>initializeProfiles(event.detail),{once:true});
