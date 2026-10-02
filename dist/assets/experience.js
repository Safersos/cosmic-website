import * as T from './three.module.js';
import { vehicle } from './vehicle.js?v=20261002-unbranded';
import { TravelMotion } from './travel-motion.js';
import { RoomEnvironment } from './addons/environments/RoomEnvironment.js';
import { GLTFLoader } from './addons/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from './addons/utils/SkeletonUtils.js';

const canvas = document.querySelector('#experience-canvas');
const experience = document.querySelector('#experience');
const loader = document.querySelector('#experience-loader');
if (!canvas || !experience) throw new Error('Experience canvas is missing');

const isMobile = matchMedia('(max-width: 760px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const renderer = new T.WebGLRenderer({canvas, antialias: !isMobile, powerPreference:'high-performance'});
renderer.setPixelRatio(isMobile ? 1 : Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight, false);
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.04;
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = T.PCFSoftShadowMap;

const scene = new T.Scene();
scene.background = new T.Color(0x264b55);
scene.fog = new T.FogExp2(0x264b55, .012);
const camera = new T.PerspectiveCamera(isMobile ? 54 : 44, innerWidth/innerHeight, .08, 170);

const room = new RoomEnvironment();
const pmrem = new T.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(room, .04).texture;
room.dispose(); pmrem.dispose();
scene.add(new T.HemisphereLight(0xd8f4ee, 0x17343c, .95));
const moon = new T.DirectionalLight(0xffefd0, 3.15);
moon.position.set(-9,17,12); moon.castShadow=!isMobile; scene.add(moon);
const cyanLight = new T.PointLight(0x45eaff, 10, 24, 2);
scene.add(cyanLight);

const world = new T.Group(); scene.add(world);
const roadLength = 520;
const ground = new T.Mesh(new T.PlaneGeometry(130,roadLength),new T.MeshStandardMaterial({color:0x31565a,roughness:.98}));
ground.rotation.x=-Math.PI/2; ground.position.set(0,-.13,-190); ground.receiveShadow=true; world.add(ground);
const road = new T.Mesh(new T.PlaneGeometry(10.5,roadLength),new T.MeshStandardMaterial({color:0x17353f,roughness:.88,metalness:.14}));
road.rotation.x=-Math.PI/2; road.position.set(0,-.1,-190); road.receiveShadow=true; world.add(road);

const edgeMat = new T.MeshBasicMaterial({color:0x8fdbe6,transparent:true,opacity:.26});
[-5.1,5.1].forEach(x=>{const edge=new T.Mesh(new T.BoxGeometry(.055,.025,roadLength),edgeMat);edge.position.set(x,-.055,-190);world.add(edge)});
const dashGeo=new T.BoxGeometry(.08,.028,1.85), dashMat=new T.MeshBasicMaterial({color:0xe7fbff,transparent:true,opacity:.62});
const dashCount=130, dashes=new T.InstancedMesh(dashGeo,dashMat,dashCount), dummy=new T.Object3D();
for(let i=0;i<dashCount;i++){dummy.position.set(0,-.05,65-i*4);dummy.updateMatrix();dashes.setMatrixAt(i,dummy.matrix)} world.add(dashes);

const car=vehicle(); car.scale.setScalar(1.02); car.position.set(0,0,34); world.add(car);
const underglow=new T.PointLight(0x31dfff,4.5,9,2); underglow.position.set(0,.35,1); car.add(underglow);

const nodeGroup=new T.Group(), rfGroup=new T.Group(), architecture=new T.Group(), radarArchitecture=new T.Group(); world.add(nodeGroup,rfGroup,architecture,radarArchitecture);
const radarLineMat=new T.LineBasicMaterial({color:0x6ef4ff,transparent:true,opacity:.24,blending:T.AdditiveBlending,depthWrite:false});
radarArchitecture.visible=false;
const postMat=new T.MeshStandardMaterial({color:0x365965,emissive:0x0b5363,emissiveIntensity:.65,metalness:.82,roughness:.26});
const beaconMat=new T.MeshBasicMaterial({color:0x7af6ff,transparent:true,opacity:.86});
const waveMat=new T.MeshBasicMaterial({color:0x55eaff,transparent:true,opacity:0,side:T.DoubleSide,blending:T.AdditiveBlending,depthWrite:false});
for(let i=0;i<14;i++){
  const z=20-i*32, side=i%2?1:-1, x=side*6.9;
  const post=new T.Mesh(new T.CylinderGeometry(.045,.075,4.7,9),postMat);post.position.set(x,2.2,z);nodeGroup.add(post);
  const arm=new T.Mesh(new T.BoxGeometry(1.25,.055,.055),postMat);arm.position.set(x-side*.57,4.25,z);nodeGroup.add(arm);
  const beacon=new T.Mesh(new T.SphereGeometry(.2,16,16),beaconMat.clone());beacon.position.set(x-side*1.15,4.22,z);nodeGroup.add(beacon);
  for(let j=0;j<3;j++){const ring=new T.Mesh(new T.RingGeometry(2.4+j*2.1,2.43+j*2.1,52),waveMat.clone());ring.rotation.x=-Math.PI/2;ring.position.set(x-side*1.1,.04+j*.025,z);ring.userData={phase:i*.47+j*.8};rfGroup.add(ring)}
}

const buildingMat=new T.MeshStandardMaterial({color:0x294b52,roughness:.92,metalness:.08});
for(let i=0;i<56;i++){
  const side=i%2?1:-1,h=3+((i*17)%12),w=3+((i*11)%5),depth=4+((i*7)%7);
  const geometry=new T.BoxGeometry(w,h,depth);
  const box=new T.Mesh(geometry,buildingMat);box.position.set(side*(10+((i*13)%18)),h/2-.1,52-i*9.1);architecture.add(box);
  const outline=new T.LineSegments(new T.EdgesGeometry(geometry),radarLineMat);outline.position.copy(box.position);radarArchitecture.add(outline);
}

const sceneActors=new T.Group(),radarActors=new T.Group();world.add(sceneActors,radarActors);radarActors.visible=false;
const trafficMat=new T.MeshStandardMaterial({color:0x283f49,metalness:.35,roughness:.55});
function addBox(parent,size,position,material){const mesh=new T.Mesh(new T.BoxGeometry(...size),material);mesh.position.set(...position);parent.add(mesh);return mesh}
function addRadarBox(size,position,color=0x79f4ff){const geometry=new T.BoxGeometry(...size);const line=new T.LineSegments(new T.EdgesGeometry(geometry),new T.LineBasicMaterial({color,transparent:true,opacity:.88,blending:T.AdditiveBlending}));line.position.set(...position);radarActors.add(line)}
function addTraffic(x,z,color=0x294a59){const material=trafficMat.clone();material.color.setHex(color);addBox(sceneActors,[2.15,.62,4.1],[x,.42,z],material);addBox(sceneActors,[1.75,.52,1.85],[x,.96,z-.25],material);addRadarBox([2.15,.62,4.1],[x,.42,z]);addRadarBox([1.75,.52,1.85],[x,.96,z-.25])}
addTraffic(2.55,-187,0x415b67);addTraffic(-2.45,-215,0x6c3437);addTraffic(2.45,-248,0x334455);

// A continuous footpath keeps every encounter visibly outside the carriageway.
const footpathMaterial=new T.MeshStandardMaterial({color:0x617577,roughness:.95});
for(const x of [-6.65,6.65])addBox(sceneActors,[2.7,.16,roadLength],[x,-.035,-190],footpathMaterial);
const junctionProps=new T.Group(),junctionRfProps=new T.Group();
sceneActors.add(junctionProps);radarActors.add(junctionRfProps);
function junctionProp(geometry,position,material){
 const solid=new T.Mesh(geometry,material);solid.position.set(...position);solid.castShadow=!isMobile;junctionProps.add(solid);
 const lines=new T.LineSegments(new T.EdgesGeometry(geometry,30),new T.LineBasicMaterial({color:0x79f4ff,transparent:true,opacity:.7,depthWrite:false}));
 lines.position.copy(solid.position);junctionRfProps.add(lines);
}
const cabinetMaterial=new T.MeshStandardMaterial({color:0x57747b,metalness:.7,roughness:.4});
junctionProp(new T.BoxGeometry(.8,1.3,.65),[7.1,.65,-28],cabinetMaterial);
junctionProp(new T.BoxGeometry(.45,.18,.025),[7.1,1,-27.66],new T.MeshStandardMaterial({color:0x65dad2,emissive:0x184e4b,emissiveIntensity:.65}));
junctionProp(new T.CylinderGeometry(.13,.19,2.7,12),[8.2,1.35,-38],new T.MeshStandardMaterial({color:0x4b5148,roughness:1}));
const canopyMaterial=new T.MeshStandardMaterial({color:0x3e6559,roughness:1});
junctionProp(new T.SphereGeometry(1.3,24,16),[8.2,3.3,-38],canopyMaterial);
junctionProp(new T.SphereGeometry(.85,20,12),[7.6,3,-38.4],canopyMaterial);

const animatedActors=[];
const actorLoader=new GLTFLoader();
let actorLoadsPending=4;
function addRiggedActor(gltf,{x,z,height,phase,kind,tint,role='',clip='Walk',heading=0,rfOnly=false}){
 const walk=gltf.animations.find(animation=>animation.name.endsWith(clip))||gltf.animations.find(animation=>animation.name.endsWith('Idle'))||gltf.animations[0];
 const instances=[];
 for(const rf of (rfOnly?[true]:[false,true])){
  const root=new T.Group();
  root.name=role||kind;
  root.position.set(x,0,z);root.rotation.y=Math.PI;
  const model=cloneSkinned(gltf.scene);
  const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3());
  // Use animated visual height: the dog bind pose is much smaller than its walk pose.
  const scale=height/(kind==='dog'?3.4:kind==='person'?1.83:5.54);
  model.scale.multiplyScalar(scale);model.position.y=kind==='dog'?-bounds.min.y*scale:0;
  model.traverse(part=>{
   if(!part.isMesh)return;
   const original=Array.isArray(part.material)?part.material:[part.material];
   const materials=original.map(material=>{
    if(rf)return new T.MeshBasicMaterial({color:kind==='dog'?0xb8ffd8:0x8ceeff,wireframe:true,transparent:true,opacity:.92,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide});
    if(kind==='robot')return new T.MeshStandardMaterial({color:0x8bb8ad,metalness:.78,roughness:.29,side:T.DoubleSide});
    const copy=material.clone();
    if(kind==='person'&&tint)copy.color.multiply(new T.Color(tint));
    copy.side=T.DoubleSide;return copy;
   });
   part.material=Array.isArray(part.material)?materials:materials[0];
   part.castShadow=!isMobile&&!rf;
   part.frustumCulled=false;
  });
  root.add(model);
  (rf?radarActors:sceneActors).add(root);
  registerFade(root,rf?radarFadeMaterials:opticalFadeMaterials);
  const mixer=new T.AnimationMixer(model);
  mixer.clipAction(walk).play();
  const materials=[];
  root.traverse(part=>{if(part.material)materials.push(...(Array.isArray(part.material)?part.material:[part.material]))});
  instances.push({root,mixer,materials,rf});
 }
 animatedActors.push({instances,walk,phase,z,x,kind,role,heading});
}
actorLoader.load(new URL('./actors/human.glb',import.meta.url).href,gltf=>{
 addRiggedActor(gltf,{x:6.2,z:0,height:1.84,phase:.37,kind:'robot',role:'junction-robot',clip:'Idle',heading:Math.PI/2});
 addRiggedActor(gltf,{x:-6.2,z:-50,height:1.84,phase:.7,kind:'robot',role:'sidewalk-walker'});
 addRiggedActor(gltf,{x:-6.2,z:0,height:1.84,phase:.7,kind:'robot',role:'final-robot',rfOnly:true});
 actorLoadsPending--;
},undefined,error=>{console.error('Robot rig unavailable',error);actorLoadsPending--});
actorLoader.load(new URL('./actors/casual-hoodie.gltf',import.meta.url).href,gltf=>{
 addRiggedActor(gltf,{x:5.8,z:-34,height:1.75,phase:.15,kind:'person'});
 addRiggedActor(gltf,{x:5.8,z:-181,height:1.75,phase:.38,kind:'person'});
 addRiggedActor(gltf,{x:-5.9,z:-280,height:1.72,phase:.24,kind:'person'});
 addRiggedActor(gltf,{x:-5.9,z:-334,height:1.68,phase:.86,kind:'person'});
 addRiggedActor(gltf,{x:7.5,z:-.9,height:1.75,phase:.15,kind:'person',role:'junction-human-one',clip:'Interact',heading:-Math.PI/2+.35});
 actorLoadsPending--;
},undefined,error=>{console.error('Clothed pedestrian rig unavailable',error);actorLoadsPending--});
actorLoader.load(new URL('./actors/casual-woman.gltf',import.meta.url).href,gltf=>{
 addRiggedActor(gltf,{x:-6.1,z:-226,height:1.67,phase:.58,kind:'person'});
 addRiggedActor(gltf,{x:5.9,z:-306,height:1.78,phase:.63,kind:'person'});
 addRiggedActor(gltf,{x:5.9,z:-340,height:1.74,phase:.41,kind:'person'});
 addRiggedActor(gltf,{x:7.5,z:.9,height:1.67,phase:.58,kind:'person',role:'junction-human-two',clip:'Wave',heading:-Math.PI/2-.35});
 actorLoadsPending--;
},undefined,error=>{console.error('Clothed pedestrian rig unavailable',error);actorLoadsPending--});
actorLoader.load(new URL('./actors/husky.gltf',import.meta.url).href,gltf=>{
 addRiggedActor(gltf,{x:-6,z:-58,height:.74,phase:.08,kind:'dog'});
 addRiggedActor(gltf,{x:-6,z:-173,height:.74,phase:.35,kind:'dog'});
 addRiggedActor(gltf,{x:6,z:-196,height:.78,phase:.62,kind:'dog'});
 actorLoadsPending--;
},undefined,error=>{console.error('Dog rig unavailable',error);actorLoadsPending--});
const vehicleScan=new T.Group();world.add(vehicleScan);vehicleScan.visible=false;for(let i=0;i<5;i++){const ring=new T.Mesh(new T.RingGeometry(1.8+i*1.55,1.835+i*1.55,84),new T.MeshBasicMaterial({color:i===4?0xffcf86:0x7af5ff,side:T.DoubleSide,transparent:true,opacity:.35,blending:T.AdditiveBlending,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.07+i*.018;ring.userData.phase=i*.23;vehicleScan.add(ring)}
const pointCount=isMobile?480:1100, pts=new Float32Array(pointCount*3);
for(let i=0;i<pointCount;i++){pts[i*3]=(Math.random()-.5)*25;pts[i*3+1]=Math.random()*7;pts[i*3+2]=45-Math.random()*450}
const pointsGeo=new T.BufferGeometry();pointsGeo.setAttribute('position',new T.BufferAttribute(pts,3));
const pointsMat=new T.PointsMaterial({color:0x80efff,size:.045,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false});
const fieldPoints=new T.Points(pointsGeo,pointsMat);world.add(fieldPoints);

const grid=new T.GridHelper(520,130,0x42e7ff,0x153e49);grid.rotation.z=0;grid.position.set(0,.02,-190);grid.material.transparent=true;grid.material.opacity=0;world.add(grid);
const opticalFadeMaterials=new Map(),radarFadeMaterials=new Map();
function registerFade(root,map){root.traverse(object=>{if(!object.material)return;const materials=Array.isArray(object.material)?object.material:[object.material];materials.filter(Boolean).forEach(material=>{if(!map.has(material)){map.set(material,material.opacity);material.transparent=true}})})}
[ground,road,dashes,architecture,nodeGroup,sceneActors].forEach(root=>registerFade(root,opticalFadeMaterials));
[radarArchitecture,radarActors,vehicleScan].forEach(root=>registerFade(root,radarFadeMaterials));
function applyFade(map,alpha){map.forEach((base,material)=>{material.opacity=base*alpha;material.visible=alpha>.006})}
const radarCarMat=new T.LineBasicMaterial({color:0xa5f9ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false});
const carSolidMaterials=new Set(),carWheelMaterials=new Set();
let radarCarPrepared=false;
function prepareRadarCar(){
  if(radarCarPrepared)return;
  radarCarPrepared=true;
  car.traverseVisible(object=>{
    if(object.userData.wheelAxle){
      const {radius,side}=object.userData.wheelAxle;
      for(const r of [radius,radius*.72]){
        const points=Array.from({length:64},(_,i)=>new T.Vector3(side*.145,Math.cos(i*Math.PI/32)*r,Math.sin(i*Math.PI/32)*r));
        const outline=new T.LineLoop(new T.BufferGeometry().setFromPoints(points),radarCarMat);outline.renderOrder=8;object.add(outline);
      }
    }
    if(!object.isMesh||!object.geometry)return;
    const materials=Array.isArray(object.material)?object.material:[object.material];
    materials.filter(Boolean).forEach(material=>{
      if(object.userData.wheelSurface&&!object.userData.wheelBlurRing)carWheelMaterials.add(material);
      else if(!object.userData.wheelSurface)carSolidMaterials.add(material);
    });
    // RF silhouette only: interior, trim and hidden branding are not world data.
    if(object.name!=='body')return;
    const outline=new T.LineSegments(new T.EdgesGeometry(object.geometry,55),radarCarMat);
    outline.renderOrder=8;
    object.add(outline);
  });
}

let target=0, progress=0, previousCarZ=34,previousCarX=0,previousTime=0;
const drivingMotion=new TravelMotion(0,{maxSpeed:1600,acceleration:12000,braking:14000,response:24});
const railProgress=document.querySelector('#rail-progress'),railIndex=document.querySelector('#rail-index'),mode=document.querySelector('#telemetry-mode'),distance=document.querySelector('#telemetry-distance'),viewIndex=document.querySelector('#view-sequence-index'),viewLabel=document.querySelector('#view-sequence-label');
const chapters=[...document.querySelectorAll('[data-scene-step]')];
const encounterHeading=document.querySelector('[data-scene-step="2"] h2');
let junctionReady=false,junctionTrigger=0,junctionAnchorZ=null;
const radarSweep=document.querySelector('.radar-sweep');
const radarReturns=[...document.querySelectorAll('.radar-blip')];
const radarPositions={'dog-one':[28,62],'dog-two':[68,27],'traffic-one':[54,17],'traffic-two':[77,57],person:[38,34],building:[14,23],'robot-one':[67,32],'machine-one':[30,66],'tree-one':[76,72]};
if(radarSweep)radarSweep.style.animation='none';
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=(a,b,t)=>a+(b-a)*(t*t*t*(t*(t*6-15)+10));
function updateScroll(){
 const intro=document.querySelector('.brand-intro')?.offsetHeight||0;
 const total=document.documentElement.scrollHeight-innerHeight-intro;
 target=total>0?clamp((scrollY-intro)/total):0;
 if(encounterHeading){
  const rect=encounterHeading.getBoundingClientRect();
  junctionTrigger=total>0?clamp((scrollY+rect.bottom-innerHeight-intro)/total):0;
  // Trigger at the first frame where the complete heading fits in the viewport.
  // Keep the encounter in the world after the heading has passed above it.
  junctionReady=rect.bottom<=innerHeight;
  if(!junctionReady)junctionAnchorZ=null;
 }
} addEventListener('scroll',updateScroll,{passive:true});updateScroll();
function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.fov=isMobile?54:44;camera.updateProjectionMatrix()} addEventListener('resize',()=>{resize();updateScroll()},{passive:true});

function frame(now){const dt=Math.max(0,Math.min((now-previousTime)/1000,.25))||.016;previousTime=now;
  if(car.userData.loaded&&!radarCarPrepared)prepareRadarCar();
  if(reducedMotion||target===0){drivingMotion.position=target*414;drivingMotion.velocity=0;}else drivingMotion.advance(target*414,dt);
  progress=clamp(drivingMotion.position/414);
  const carZ=34-progress*414, laneDrift=Math.sin(progress*Math.PI*3.1)*.5;
  // While the camera catches up after a large scroll, keep the encounter in
  // view; settle it at the junction as soon as the car reaches that section.
  if(junctionReady)junctionAnchorZ=34-Math.min(progress,junctionTrigger)*414-15;
  junctionProps.position.z=junctionRfProps.position.z=junctionAnchorZ??-173;
  junctionProps.visible=junctionRfProps.visible=junctionReady;
  animatedActors.forEach(actor=>{
    const seconds=now*.001,phase=actor.phase;
    const clipTime=(seconds*(actor.kind==='dog'?.88:actor.kind==='robot'?.85:1.07)+phase)%actor.walk.duration;
    const stride=seconds*(actor.kind==='dog'?.22:.18)+phase*3;
    const interacting=actor.role.startsWith('junction-');
    const displacement=interacting||reducedMotion?0:4.5*Math.sin(stride);
    const heading=interacting?actor.heading:smooth(0,1,clamp((Math.cos(stride)+.18)/.36))*Math.PI;
    const finalRobot=actor.role==='final-robot';
    const walker=actor.role==='sidewalk-walker';
    const active=finalRobot?target>=.86:interacting?junctionReady:walker?junctionReady&&target>=junctionTrigger+.1:true;
    const anchor=finalRobot?carZ-12:interacting||walker?(junctionAnchorZ??-173):0;
    actor.instances.forEach(({root,mixer})=>{
      root.visible=active;
      root.position.z=anchor+actor.z-displacement;
      root.rotation.y=heading;
      mixer.setTime(reducedMotion?0:clipTime);
    });
  });
  car.position.set(laneDrift,0,carZ);
  car.rotation.y=-Math.atan(.5*Math.PI*3.1/414*Math.cos(progress*Math.PI*3.1));
  const traveled=Math.sign(carZ-previousCarZ)*Math.hypot(carZ-previousCarZ,laneDrift-previousCarX);
  car.updateVehicle(reducedMotion?0:traveled,dt);
  previousCarZ=carZ;previousCarX=laneDrift;underglow.intensity=3+Math.sin(now*.004)*.7;
  const zoom=smooth(0,1,clamp((progress-.2)/.22)),pov=smooth(0,1,clamp((progress-.36)/.22)),aerial=smooth(0,1,clamp((progress-.82)/.15));
  // One accelerated travel state drives camera, materials and radar together.
  // Returning to the intro resets this state immediately above.
  const stateProgress=progress;
  const cockpitReveal=smooth(0,1,clamp((stateProgress-.455)/.125))*(1-smooth(0,1,clamp((stateProgress-.81)/.11)));
  const chase=new T.Vector3(laneDrift-(isMobile?3.2:5.8),isMobile?4.1:3.35,carZ+(isMobile?13.5:10.5)),closeView=new T.Vector3(laneDrift-2.65,1.95,carZ+6.2),cockpit=new T.Vector3(laneDrift,1.08,carZ-1.15),drone=new T.Vector3(laneDrift+10,13.5,carZ+13);
  const camPos=new T.Vector3().lerpVectors(chase,closeView,zoom).lerp(cockpit,pov).lerp(drone,aerial);
  camera.position.copy(camPos); // Progress is damped once; camera and car stay in the same moving frame.
  const exteriorLook=new T.Vector3(laneDrift,.85,carZ-(isMobile?1.5:5.8)),povLook=new T.Vector3(laneDrift,.72,carZ-22),droneLook=new T.Vector3(laneDrift,0,carZ-9);const look=new T.Vector3().lerpVectors(exteriorLook,povLook,pov).lerp(droneLook,aerial);camera.lookAt(look);
  cyanLight.position.set(laneDrift,3,carZ-4);
  const radarBlend=smooth(0,1,clamp((stateProgress-.46)/.18));
  const rfActive=radarBlend>.5;
  const radarMix=rfActive?1:0;
  const opticalMix=rfActive?0:1;
  const cockpitActive=cockpitReveal>.025;
  applyFade(opticalFadeMaterials,opticalMix);
  applyFade(radarFadeMaterials,radarMix);
  // Distant walkers blend into the corridor instead of appearing at its draw boundary.
  animatedActors.forEach(actor=>actor.instances.forEach(({root,materials,rf})=>{
    const distance=Math.abs(root.position.z-carZ);
    const proximity=1-smooth(0,1,clamp((distance-68)/38));
    const baseMap=rf?radarFadeMaterials:opticalFadeMaterials;
    const modeAlpha=rf?radarMix:opticalMix;
    materials.forEach(material=>{
      material.opacity=(baseMap.get(material)??1)*modeAlpha*proximity;
      material.visible=material.opacity>.006;
    });
  }));
  radarArchitecture.visible=radarActors.visible=vehicleScan.visible=radarMix>.006;
  sceneActors.visible=architecture.visible=nodeGroup.visible=road.visible=ground.visible=dashes.visible=opticalMix>.006;
  vehicleScan.position.set(laneDrift,0,carZ);
  vehicleScan.children.forEach((ring,index)=>{const pulse=1+Math.sin(now*.0018-index*.52)*.035;ring.scale.setScalar(pulse)});
  underglow.visible=opticalMix*(1-cockpitReveal)>.02;
  underglow.intensity=(3+Math.sin(now*.004)*.7)*opticalMix*(1-cockpitReveal);
  carSolidMaterials.forEach(material=>{if(material.userData.cosmicBaseOpacity===undefined)material.userData.cosmicBaseOpacity=material.userData.motionBaseOpacity??material.opacity;const visible=pov<.35&&!rfActive;material.opacity=material.userData.cosmicBaseOpacity;material.visible=visible});
  carWheelMaterials.forEach(material=>{if(material.userData.cosmicWheelBaseOpacity===undefined)material.userData.cosmicWheelBaseOpacity=material.userData.motionBaseOpacity??material.opacity;material.transparent=true;material.opacity=material.userData.cosmicWheelBaseOpacity*(1-radarMix*.55);material.visible=true});
  // The ego vehicle is outside the cockpit view, returning as a restrained
  // exterior outline only when the camera rises above it.
  car.visible=pov<.35||aerial>.18;
  radarCarMat.opacity=radarMix*.55*aerial;
  edgeMat.opacity=.26+radarMix*.46;
  document.documentElement.style.setProperty('--radar-reveal',cockpitReveal.toFixed(3));
  document.documentElement.style.setProperty('--radar-y','0px');
  document.documentElement.style.setProperty('--radar-scale',(.54+cockpitReveal*.46).toFixed(4));
  document.documentElement.style.setProperty('--radar-bottom','5vh');
  document.documentElement.style.setProperty('--radar-y',(-(1-cockpitReveal)*innerHeight*.22).toFixed(2)+'px');
  document.documentElement.style.setProperty('--rf-mix',radarMix.toFixed(3));
  // Returns brighten behind the same sweep angle, then decay until the next pass.
  const scanAngle=(now*.001/5*Math.PI*2)%(Math.PI*2);
  if(radarSweep)radarSweep.style.transform=`rotate(${scanAngle}rad)`;
  const liveRobot=animatedActors.find(actor=>actor.role===(target>=.86?'final-robot':'sidewalk-walker'));
  const robotRoot=liveRobot?.instances.find(instance=>instance.root.visible)?.root;
  radarReturns.forEach(blip=>{
    const position=radarPositions[Object.keys(radarPositions).find(name=>blip.classList.contains(name))]||[50,50];
    let x=position[0]-50,y=position[1]-50;
    let contact=null;
    if(blip.classList.contains('robot-one'))contact=robotRoot?.position;
    if(blip.classList.contains('machine-one'))contact={x:7.1,z:(junctionAnchorZ??carZ)-28};
    if(blip.classList.contains('tree-one'))contact={x:8.2,z:(junctionAnchorZ??carZ)-38};
    if(contact){
      const dx=contact.x-laneDrift,dz=contact.z-carZ;
      const range=Math.max(32,Math.hypot(dx,dz)/.88);
      x=dx/range*42;y=dz/range*42;
      blip.style.left=`${50+x}%`;blip.style.top=`${50+y}%`;
    }
    const bearing=(Math.atan2(x,-y)+Math.PI*2)%(Math.PI*2);
    const age=(scanAngle-bearing+Math.PI*2)%(Math.PI*2);
    blip.style.setProperty('--scan-return',reducedMotion?'.8':(.16+.84*Math.exp(-age*1.4)).toFixed(3));
  });
  rfGroup.children.forEach(ring=>{
    ring.material.opacity=(.075+radarMix*.125)+(.025+radarMix*.075)*Math.sin(now*.0025+ring.userData.phase);
    const pulse=1+(.5-.5*Math.cos(now*.0011+ring.userData.phase))*.22;
    ring.scale.setScalar(pulse);
  });
  pointsMat.opacity=radarMix*.38;
  grid.material.opacity=radarMix*.2;
  document.body.classList.toggle('rf-only',radarMix>.5);
  document.body.classList.toggle('cockpit-view',cockpitActive);
  document.body.classList.toggle('final-view',progress>=.88);
  const viewStage=progress<.24?['01','NORMAL VIEW']:progress<.43?['02','ZOOM / VEHICLE PERSPECTIVE']:progress<.88?['03','IN-CAR 360° RF SCREEN']:['',''];
  if(viewIndex)viewIndex.textContent=viewStage[0];if(viewLabel)viewLabel.textContent=viewStage[1];
  const current=Math.min(5,Math.floor(progress*6));chapters.forEach((el,i)=>el.classList.toggle('is-current',i===current));if(railProgress)railProgress.style.height=`${progress*100}%`;if(railIndex)railIndex.textContent=String(current+1).padStart(2,'0');if(distance)distance.textContent=`${Math.round(progress*414).toString().padStart(3,'0')} M`;if(mode)mode.textContent=aerial>.45?'NETWORK / LIVE':pov>.5?'VEHICLE / RF POV':'CHASE / OPTICAL';
  renderer.render(scene,camera);requestAnimationFrame(frame)}

const loadStartedAt=performance.now();
const readyTimer=setInterval(()=>{
  if((car.userData.loaded&&actorLoadsPending===0)||performance.now()-loadStartedAt>15000){
    clearInterval(readyTimer);
    if(car.userData.loaded)prepareRadarCar();
    loader?.classList.add('is-ready');
  }
},80);
requestAnimationFrame(frame);
























