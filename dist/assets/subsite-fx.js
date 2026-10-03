const body=document.body;
const root=document.documentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.createElement('div');
progress.className='page-progress';progress.setAttribute('aria-hidden','true');
body.prepend(progress);
let ticking=false;
function update(){root.style.setProperty('--page-progress',Math.min(1,scrollY/Math.max(1,root.scrollHeight-innerHeight)));ticking=false}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}},{passive:true});update();
const sections=document.querySelectorAll('.content-reveal');
if(!reduced&&'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.06});
 sections.forEach(section=>observer.observe(section));body.classList.add('motion-ready');
}else sections.forEach(section=>section.classList.add('in-view'));
