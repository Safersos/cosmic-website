const map=document.querySelector('.invention-evolution-map');
const description=document.querySelector('#invention-stage-description');
const stages=[
 'Observations retain transmitter, receiver, acquisition time and spatial relationships. Different positions contribute complementary evidence.',
 'The observation graph connects evidence with candidate physical states and propagation paths. Ambiguity can persist until another observation distinguishes the alternatives.',
 'An electromagnetic forward model predicts responses for candidate states. Measured-to-predicted residuals, geometry and temporal consistency guide the hypothesis update.',
 'The world-model uncertainty informs the next useful sensing configuration. Another node, spectral layer or transmitter–receiver relationship can contribute additional evidence.'
];
const buttons=[...document.querySelectorAll('[data-invention-stage]')];
buttons.forEach(button=>button.addEventListener('click',()=>{
 const stage=Number(button.dataset.inventionStage);
 buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 map.dataset.stage=String(stage);description.textContent=stages[stage];
 if(map.scrollWidth>map.clientWidth)map.scrollTo({left:(map.scrollWidth-map.clientWidth)*stage/3,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}));
const copyButton=document.querySelector('#copy-patent-number');
copyButton.addEventListener('click',async()=>{
 const number=document.querySelector('#patent-application-number').textContent;
 const status=document.querySelector('#patent-copy-status');
 try{await navigator.clipboard.writeText(number);status.textContent='Application number copied.'}
 catch{status.textContent='Select and copy '+number+' from the number above.'}
});
