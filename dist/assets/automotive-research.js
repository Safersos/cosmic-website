const map=document.querySelector('.mobility-route-map');
const label=document.querySelector('#road-stage-label');
const description=document.querySelector('#road-stage-description');
const stages=[
 ['01 / Before departure','The vehicle registers its position in the shared spatial frame and requests route-relevant state. A view of the covered corridor can arrive before the vehicle has traversed it.'],
 ['02 / Before the blind turn','The building limits the car’s direct view of the crossing. Nodes B and C contribute observations from different positions; the shared model delivers candidate road-user motion with confidence, uncertainty and update timing.'],
 ['03 / Across the next node region','Overlapping node observations support persistent entity tracking. The vehicle receives a refreshed local projection of the same shared model, checks its freshness and combines it with onboard sensing before planning a response.']
];
const buttons=[...document.querySelectorAll('[data-road-stage]')];
buttons.forEach(button=>button.addEventListener('click',()=>{
 const stage=Number(button.dataset.roadStage);
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 map.dataset.roadState=String(stage);label.textContent=stages[stage][0];description.textContent=stages[stage][1];
 if(map.scrollWidth>map.clientWidth)map.scrollTo({left:(map.scrollWidth-map.clientWidth)*stage/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
