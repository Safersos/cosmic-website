import * as T from './three.module.js';
import {intelligenceScene} from './intelligence-scene.js';

// Architectural studies: each page gets a distinct, scaled subject.
const C={chalk:0xe5e7da,stone:0xc4cbbd,graphite:0x203833,steel:0x667d73,copper:0x977952,glass:0x71998e,signal:0x477b67};
const material=(color,roughness=.68,metalness=.08,extra={})=>new T.MeshPhysicalMaterial({color,roughness,metalness,...extra});
const M={chalk:material(C.chalk),stone:material(C.stone),dark:material(C.graphite,.42,.38),steel:material(C.steel,.32,.65),copper:material(C.copper,.36,.62),glass:material(C.glass,.17,.15,{transparent:true,opacity:.33,depthWrite:false,side:T.DoubleSide}),ghost:material(C.signal,.5,.05,{transparent:true,opacity:.16,depthWrite:false,side:T.DoubleSide})};
const v=(x,y,z)=>new T.Vector3(x,y,z);

export function pageScene(page,root){
 const animated=[];
 const mesh=(g,m,x=0,y=0,z=0,parent=root)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=!m.transparent;o.receiveShadow=true;parent.add(o);return o;};
 const box=(w,h,d,x,y,z,m=M.stone,parent=root)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,parent);
 const cylinder=(rt,rb,h,x,y,z,m=M.steel,parent=root,n=32)=>mesh(new T.CylinderGeometry(rt,rb,h,n),m,x,y,z,parent);
 const line=(points,color=C.signal,opacity=.52,parent=root)=>{const o=new T.Line(new T.BufferGeometry().setFromPoints(points.map(p=>Array.isArray(p)?v(...p):p)),new T.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}));parent.add(o);return o;};
 const outline=(g,x,y,z,color=C.graphite,opacity=.18,parent=root)=>{const o=new T.LineSegments(new T.EdgesGeometry(g),new T.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}));o.position.set(x,y,z);parent.add(o);return o;};
 const slab=(w,d)=>{box(w,.14,d,0,-1.85,0,M.chalk);box(w-.1,.02,d-.1,0,-1.76,0,M.stone);};
 const pin=(x,z,height=1.2)=>{cylinder(.035,.04,height,x,-1.75+height/2,z,M.dark);cylinder(.15,.15,.23,x,-1.75+height+.11,z,M.steel);cylinder(.155,.155,.015,x,-1.75+height+.23,z,M.copper);};
 const dots=(points,size=.038,color=C.signal,opacity=.68)=>{const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points.flat(),3));return root.add(new T.Points(g,new T.PointsMaterial({color,size,transparent:true,opacity,depthWrite:false})));};
 const curve=(points,color=C.signal,opacity=.4)=>line(new T.CatmullRomCurve3(points.map(p=>v(...p))).getPoints(48),color,opacity);
 const building=(x,z,w,d,h,m=M.stone)=>{
  box(w,h,d,x,-1.72+h/2,z,m);outline(new T.BoxGeometry(w,h,d),x,-1.72+h/2,z,C.graphite,.13);
  box(w+.08,.075,d+.08,x,-1.68+h,z,M.chalk);box(w+.12,.08,d+.12,x,-1.67,z,M.dark);
  for(let row=0;row<Math.max(1,Math.floor(h/.58));row++){
   const wy=-1.43+row*.58;
   for(let col=0;col<Math.max(1,Math.floor(w/.48));col++){
    const wx=x-w/2+.3+col*.48;
    if(wx<x+w/2-.1)box(.22,.31,.018,wx,wy,z+d/2+.012,M.glass);
   }
   for(let col=0;col<Math.max(1,Math.floor(d/.5));col++){
    const wz=z-d/2+.28+col*.5;
    if(wz<z+d/2-.1)box(.018,.31,.22,x+w/2+.012,wy,wz,M.glass);
   }
  }
  box(w*.35,.055,d*.22,x-w*.19,-1.6+h+.08,z-d*.19,M.steel);
 };

 if(page==='intelligence'){
  return intelligenceScene(root);
 } else if(page==='world-model'){
  // Physical city geometry with occupancy, target and motion on one coordinate frame.
  slab(8.2,6.2);
  box(8,.025,.78,0,-1.73,-.15,M.steel);box(.83,.025,6,1.35,-1.72,0,M.steel);
  [[-2.4,-1.5,1.15,1.35,1.9],[-.45,-1.5,1.55,1.35,1.3],[2.55,-1.45,1.2,1.2,1.5],[-2.25,1.65,1.35,1.2,1.1],[.15,1.45,1.2,1.4,1.7],[2.7,1.6,.9,1,1.15]].forEach(([x,z,w,d,h],i)=>building(x,z,w,d,h,i===4?M.dark:M.stone));
  const occupancy=[];for(let x=-3.5;x<3.6;x+=.17)for(let z=-2.6;z<2.7;z+=.17)if(Math.sin(x*3.1+z*5.4)>.82)occupancy.push([x,-1.65,z]);dots(occupancy,.035,C.signal,.4);
  const route=[[-3.5,-1.67,-.15],[-1.5,-1.67,-.15],[1.34,-1.67,-.15],[1.34,-1.67,2.35]];curve(route,C.copper,.85);
  const marker=cylinder(.14,.14,.055,0,-1.62,0,M.copper);animated.push(t=>{const q=(t*.38)%3,u=q%1,a=route[Math.floor(q)],b=route[Math.floor(q)+1];marker.position.set(a[0]+(b[0]-a[0])*u,-1.62,a[2]+(b[2]-a[2])*u)});
  const target=outline(new T.BoxGeometry(1.3,1.2,1.3),-2.4,-.77,-1.5,C.signal,.78);animated.push(t=>target.material.opacity=.52+Math.sin(t*.8)*.18);
 } else if(page==='applications'){
  // Three visibly different assets consume the same site's context.
  slab(8.5,6.3);box(8.15,.025,.95,0,-1.74,.1,M.steel);box(.9,.025,6.1,.5,-1.73,0,M.steel);
  [[-2.6,-1.65,1.6,1.25,1.25],[2.7,-1.6,1.15,1.35,2],[-2.75,1.75,1.3,1,1.55],[2.6,1.72,1.35,1.2,1.2]].forEach(([x,z,w,d,h])=>building(x,z,w,d,h));
  const car=new T.Group();root.add(car);car.position.set(-1.65,-1.56,.1);box(.95,.21,.55,0,0,0,M.dark,car);box(.46,.18,.48,-.05,.18,0,M.glass,car);
  for(const x of [-.31,.3])for(const z of [-.29,.29]){const wheel=cylinder(.1,.1,.06,x,-.08,z,M.dark,car,20);wheel.rotation.x=Math.PI/2;}
  const robot=new T.Group();root.add(robot);robot.position.set(1.8,-1.58,1.0);cylinder(.29,.31,.26,0,.15,0,M.dark,robot);box(.4,.16,.25,0,.34,0,M.steel,robot);
  pin(-3,1,1.85);pin(3,-1,1.85);
  [[-1.65,-1.25,.1],[1.8,-1.25,1],[3,.2,-1]].forEach(p=>curve([[.5,1,.1],[p[0],.7,p[2]],p],C.signal,.4));
  cylinder(.42,.42,.06,.5,-1.65,.1,M.copper);
 } else if(page==='invention'){
  // Instrument study: an aperture with antenna patches, traces and field arcs.
  slab(8.3,5.5);box(6.8,.22,3.55,0,-1.43,0,M.dark);box(6.55,.045,3.3,0,-1.29,0,M.steel);
  for(let j=0;j<2;j++)for(let i=0;i<7;i++){const x=-2.7+i*.9,z=-.8+j*1.6;box(.64,.012,.8,x,-1.25,z,M.copper);box(.055,.008,.45,x,-1.245,z-.62,M.copper);line([[x,-1.24,z-.84],[x,-1.24,-1.44],[x*.5,-1.24,-1.55]],C.copper,.66);}
  box(2.7,.15,.46,0,-1.17,-1.48,M.dark);for(let i=0;i<4;i++)cylinder(.065,.065,.06,-.85+i*.55,-1.05,-1.48,M.copper);
  const fields=[];for(let i=0;i<4;i++){const points=[];for(let s=0;s<=56;s++){const a=s/56*Math.PI;points.push([Math.cos(a)*(1.55+i*.45),-1.12+Math.sin(a)*(1.7+i*.2),.5+i*.19]);}fields.push(line(points,C.signal,.13+i*.035));}
  animated.push(t=>fields.forEach((f,i)=>{f.material.opacity=.09+i*.025+(Math.sin(t*.9-i*.7)+1)*.045}));
 } else if(page==='research'){
  // Reference and reconstruction of the same test object, with residual lines.
  slab(8.8,5.5);
  [-2.15,2.15].forEach((cx,side)=>{box(3.6,.12,3.4,cx,-1.53,0,side?M.dark:M.chalk);const m=side?M.glass:M.stone;box(1.9,1.7,.2,cx,-.6,-.55,m);box(.2,1.7,1.65,cx-.85,-.6,.25,m);box(.85,.65,.85,cx+.45,-1.13,.72,side?M.ghost:M.steel);outline(new T.BoxGeometry(.85,.65,.85),cx+.45,-1.13,.72,side?C.copper:C.graphite,.7);});
  for(let i=0;i<8;i++){const y=-1.1+i*.21;line([[-1.7,y,-.45],[1.55,y,-.45]],C.copper,.16);}
  const points=[];for(let i=0;i<220;i++){const a=i*2.39996,r=Math.sqrt(i/220);points.push([2.6+Math.cos(a)*r*.62,-1.45+(i%31)/31*.85,.7+Math.sin(a)*r*.56]);}dots(points,.028,C.copper,.65);
  const comparison=line([[0,-1.4,-1.25],[0,.55,-1.25]],C.signal,.48);animated.push(t=>comparison.material.opacity=.3+(Math.sin(t*.65)+1)*.15);
 } else if(page==='robotics'){
  // Industrial cell with racking, conveyor, sensing mast and articulated arm.
  slab(8.6,6);
  for(const x of [-3.6,-1.8])for(const z of [-2.35,-.65])box(.09,2.9,.09,x,-.35,z,M.dark);
  for(const y of [-1.42,-.35,.65])box(1.95,.085,1.9,-2.7,y,-1.5,M.steel);
  for(let i=0;i<3;i++){box(.65,.45,.6,-3.25+i*.52,-1.1,-1.45,M.stone);box(.65,.42,.6,-3.25+i*.52,-.04,-1.45,M.chalk);}
  box(4.1,.3,1.35,1.4,-1.17,.8,M.dark);box(4.15,.035,1.38,1.4,-.99,.8,M.steel);
  for(let i=0;i<8;i++){const roller=cylinder(.045,.045,1.2,-.45+i*.52,-.94,.8,M.copper,root,12);roller.rotation.x=Math.PI/2;}
  const arm=new T.Group();root.add(arm);arm.position.set(-.8,-1.55,1.8);cylinder(.43,.48,.22,0,.11,0,M.dark,arm);
  const axis=new T.Group();axis.position.y=.3;arm.add(axis);cylinder(.22,.22,.33,0,0,0,M.copper,axis);const upper=cylinder(.14,.17,1.35,.1,.78,0,M.steel,axis);upper.rotation.z=-.12;cylinder(.22,.22,.3,.2,1.5,0,M.dark,axis);
  const fore=new T.Group();fore.position.set(.2,1.5,0);axis.add(fore);box(1.65,.25,.28,.8,-.12,0,M.steel,fore);cylinder(.16,.16,.25,1.65,-.18,0,M.copper,fore);for(const z of [-.18,.18])box(.09,.45,.08,1.72,-.47,z,M.dark,fore);
  pin(3.3,-2,2.15);const pallet=box(.7,.48,.68,1.7,-.69,.8,M.chalk);
  animated.push(t=>{axis.rotation.y=Math.sin(t*.33)*.17;fore.rotation.z=Math.sin(t*.48)*.14;pallet.position.x=1.7+Math.sin(t*.3)*.28;});
 } else if(page==='company'){
  // Deployment context: three structures and a shared receiving point.
  slab(8.4,6.2);box(8.2,.018,.84,0,-1.73,.75,M.steel);
  building(-2,-1.1,2.15,2.1,1.45,M.stone);building(2,-1.55,1.8,1.4,2.05,M.chalk);building(1.8,1.78,1.5,1.2,1.25,M.dark);
  [[-3.1,1.8],[.2,-1.85],[3.3,-.2]].forEach(([x,z],i)=>pin(x,z,1.35+i*.25));
  cylinder(.72,.72,.07,-.15,-1.6,.85,M.dark);cylinder(.48,.48,.025,-.15,-1.54,.85,M.copper);
  for(const [x,z] of [[-3.1,1.8],[.2,-1.85],[3.3,-.2]])curve([[x,.05,z],[x*.4,.8,z*.4],[-.15,-1.25,.85]],C.signal,.32);
  const arc=mesh(new T.RingGeometry(1.05,1.065,80),new T.MeshBasicMaterial({color:C.signal,side:T.DoubleSide,transparent:true,opacity:.4,depthWrite:false}),-.15,-1.5,.85);arc.rotation.x=-Math.PI/2;
  animated.push(t=>{const q=(t*.15)%1;arc.scale.setScalar(.6+q*.7);arc.material.opacity=.32*(1-q)});
 } else return null;

 root.rotation.y=-.13;
 return {camera:page==='company'||page==='applications'?[9,7,10]:[7.6,5.8,8.9],look:[0,-.42,0],update(t){for(const fn of animated)fn(t);}};
}
