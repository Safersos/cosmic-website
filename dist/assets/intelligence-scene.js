import * as T from './three.module.js';

// Conceptual sequence derived from the full specification: observation graph
// (pp. 32–35), inverse/forward consistency (pp. 39–45), persistent spatial state
// (pp. 46–47), and uncertainty-directed interrogation (pp. 48–49).
// Geometry and timings illustrate those relationships, not measured RF results.
export function intelligenceScene(root){
 const colors={ink:0x254a40,green:0x4d8269,mint:0xb3dbb7,copper:0xb28b58,paper:0xe8ece2};
 const solid=(color,metalness=.2)=>new T.MeshStandardMaterial({color,metalness,roughness:.52});
 const translucent=(color,opacity)=>new T.MeshBasicMaterial({color,transparent:true,opacity,depthWrite:false,side:T.DoubleSide});
 const mesh=(geometry,material,position,parent=root)=>{const m=new T.Mesh(geometry,material);m.position.set(...position);parent.add(m);return m};
 const segment=(points,color,opacity=.4,dashed=false,parent=root)=>{
  const material=dashed?new T.LineDashedMaterial({color,transparent:true,opacity,dashSize:.12,gapSize:.08,depthWrite:false}):new T.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false});
  const line=new T.Line(new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))),material);
  if(dashed)line.computeLineDistances();parent.add(line);return line;
 };
 const outline=(geometry,position,color,opacity,parent=root)=>{
  const line=new T.LineSegments(new T.EdgesGeometry(geometry),new T.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}));line.position.set(...position);parent.add(line);return line;
 };
 const smooth=u=>{u=T.MathUtils.clamp(u,0,1);return u*u*(3-2*u)};
 root.name='intelligence-inference-loop';root.rotation.y=-.16;

 // One open coordinate frame: no enclosing room and no scanning plane.
 mesh(new T.BoxGeometry(8.9,.08,5.6),solid(colors.paper),[0,-1.55,0]);
 const grid=new T.GridHelper(8.6,32,colors.ink,colors.green);grid.position.y=-1.5;grid.scale.z=.62;grid.material.transparent=true;grid.material.opacity=.12;root.add(grid);
 const datum=segment([[-4.35,-1.43,2.65],[4.35,-1.43,2.65]],colors.ink,.4);
 for(let i=0;i<18;i++)segment([[-4.25+i*.5,-1.43,2.65],[-4.25+i*.5,-1.43,2.52]],colors.ink,.25);

 // Persistent surfaces remain available while the dynamic state is updated.
 const structures=[{size:[1.7,1.6,1.35],p:[-1.8,-.68,-.8]},{size:[1.1,.65,1],p:[1.45,-1.13,-1.65]}];
 const occupancy=[];
 for(const structure of structures){
  const geometry=new T.BoxGeometry(...structure.size);
  mesh(geometry,translucent(colors.green,.035),structure.p);
  outline(geometry,structure.p,colors.green,.38);
  const [w,h,d]=structure.size,[cx,cy,cz]=structure.p;
  for(let x=-w/2;x<=w/2+.01;x+=.19)for(let y=-h/2;y<=h/2+.01;y+=.19){
   occupancy.push([cx+x,cy+y,cz+d/2]);
   occupancy.push([cx+x,cy+y,cz-d/2]);
  }
  for(let z=-d/2;z<=d/2+.01;z+=.19)for(let y=-h/2;y<=h/2+.01;y+=.19)occupancy.push([cx+w/2,cy+y,cz+z]);
 }
 const cells=new T.InstancedMesh(new T.BoxGeometry(.085,.085,.085),translucent(colors.green,.44),occupancy.length);
 const helper=new T.Object3D();
 occupancy.forEach((p,i)=>{helper.position.set(...p);helper.updateMatrix();cells.setMatrixAt(i,helper.matrix)});root.add(cells);

 // Four local observation sources; moving packets retain their source color.
 const positions=[[-3.65,-.18,1.75],[-3.45,-.18,-2.1],[3.5,-.18,-1.9],[3.55,-.18,1.75]];
 const nodeColors=[colors.green,colors.green,colors.copper,colors.copper];
 const nodes=positions.map((p,i)=>{
  const group=new T.Group();group.position.set(...p);root.add(group);
  mesh(new T.CylinderGeometry(.04,.05,1.1,16),solid(colors.ink,.6),[0,-.74,0],group);
  mesh(new T.BoxGeometry(.3,.38,.17),solid(colors.ink,.6),[0,0,0],group);
  for(let r=0;r<2;r++)for(let c=0;c<2;c++)mesh(new T.BoxGeometry(.055,.06,.008),solid(nodeColors[i],.65),[-.075+c*.15,-.09+r*.18,.092],group);
  const ring=mesh(new T.RingGeometry(.32,.335,64),translucent(nodeColors[i],.3),[0,-1.25,0],group);ring.rotation.x=-Math.PI/2;
  const beacon=mesh(new T.SphereGeometry(.065,16,12),translucent(nodeColors[i],.9),[0,.25,0],group);
  return {group,ring,beacon};
 });
 // Calibration references are local pair relationships, not a global lock.
 segment([positions[0],positions[1]],colors.green,.17,true);
 segment([positions[2],positions[3]],colors.copper,.17,true);

 const state=new T.Group();state.position.set(.75,-.68,.85);root.add(state);
 const targetGeometry=new T.CapsuleGeometry(.24,.65,5,16);
 const estimate=mesh(targetGeometry,translucent(colors.green,.13),[0,0,0],state);
 const estimateEdges=outline(new T.BoxGeometry(.65,1.25,.65),[0,0,0],colors.green,.65,state);
 const alternative=outline(new T.BoxGeometry(.65,1.25,.65),[.72,0,.35],colors.copper,.35,state);
 const uncertainty=mesh(new T.RingGeometry(.65,.67,64),translucent(colors.copper,.6),[0,-.76,0],state);uncertainty.rotation.x=-Math.PI/2;
 segment([[-.3,-1.4,.85],[.75,-1.4,.85],[2,-1.4,.85]],colors.green,.34,true);

 // Candidate state and propagation explanations are distinct. A reflected
 // observation stays a path relationship rather than becoming a ghost object.
 const reflection=segment([positions[1],[-1.8,.05,-.1],[.75,-.15,.85],positions[3]],colors.copper,.24,true);
 const graph=new T.Group();root.add(graph);
 const graphPositions=[[-.7,1.1,-.15],[0,1.45,.2],[.6,1.15,-.1],[.15,.7,.7],[-.5,.6,.3]];
 const vertices=graphPositions.map((p,i)=>mesh(new T.SphereGeometry(i===1?.08:.05,12,10),translucent(i===1?colors.copper:colors.green,.65),p,graph));
 [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]].forEach(([a,b])=>segment([graphPositions[a],graphPositions[b]],colors.green,.25,false,graph));
 const paths=positions.map((p,i)=>{
  const route=new T.CatmullRomCurve3([new T.Vector3(...p),new T.Vector3(p[0]*.45,.75,p[2]*.45),new T.Vector3(...graphPositions[i]),new T.Vector3(.75,-.1,.85)]);
  const line=new T.Line(new T.BufferGeometry().setFromPoints(route.getPoints(50)),new T.LineBasicMaterial({color:nodeColors[i],transparent:true,opacity:.26,depthWrite:false}));root.add(line);
  const packet=mesh(new T.SphereGeometry(.048,10,8),translucent(nodeColors[i],.8),p);
  const prediction=mesh(new T.SphereGeometry(.036,10,8),translucent(colors.copper,.7),p);
  return {route,line,packet,prediction};
 });
 const feedback=segment([[.75,-.1,.85],[2.5,1,.8],positions[3]],colors.copper,.15,true);
 const focused=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(...positions[3]),state.position.clone()]),new T.LineBasicMaterial({color:colors.copper,transparent:true,opacity:.15,depthWrite:false}));root.add(focused);

 const phases=[
  ['01 / DISTRIBUTED EVIDENCE','RF observations retain transmitter, receiver and spatial relationships.'],
  ['02 / CANDIDATE STATES','Several spatial and propagation explanations remain open.'],
  ['03 / PHYSICS CONSISTENCY','Predicted RF responses are checked against the observations.'],
  ['04 / PERSISTENT WORLD MODEL','Geometry, motion, confidence and provenance update together.'],
  ['05 / ADAPTIVE PERCEPTION','Uncertainty selects another observation to refine the spatial state.']
 ];
 const design={camera:[8.4,6.7,10.6],look:[0,-.3,0],status:phases[0],update(t){
  const cycle=t%24,stage=Math.min(4,Math.floor(cycle/4.8)),phase=(cycle-stage*4.8)/4.8;
  design.status=phases[stage];
  const refinement=stage<2?.2:stage===2?.2+smooth(phase)*.4:stage===3?.6+smooth(phase)*.2:.8+smooth(phase)*.1;
  state.position.x=.75+Math.sin(t*.23)*.36;
  estimate.material.opacity=.06+refinement*.16;
  estimateEdges.material.opacity=.28+refinement*.47;
  alternative.material.opacity=.08+(1-refinement)*.38;
  alternative.position.x=.72+(1-refinement)*.18;
  uncertainty.scale.setScalar(.54+(1-refinement)*.7);
  uncertainty.material.opacity=.25+(1-refinement)*.35;
  cells.material.opacity=.25+refinement*.32;
  vertices.forEach((vertex,i)=>vertex.material.opacity=.32+(Math.sin(t*1.2-i*.65)+1)*.16);
  nodes.forEach(({ring,beacon},i)=>{const q=(t*.3+i*.19)%1;ring.scale.setScalar(.9+q*2.2);ring.material.opacity=(1-q)*.24;beacon.material.opacity=stage===4&&i===3?.95:.45+(Math.sin(t*2-i)*.5+.5)*.3;});
  paths.forEach(({route,line,packet,prediction},i)=>{
   packet.position.copy(route.getPoint((t*.27+i*.23)%1));
   prediction.position.copy(route.getPoint(1-(t*.23+i*.23)%1));
   prediction.visible=stage===2;line.material.opacity=stage===0||stage===2?.38:.2;
  });
  reflection.material.opacity=stage===1||stage===2?.46:.2;
  const additional=stage===4?smooth(phase):0;
  feedback.material.opacity=.12+additional*.42;focused.material.opacity=.08+additional*.7;
  focused.geometry.attributes.position.setXYZ(1,state.position.x,state.position.y,state.position.z);
  focused.geometry.attributes.position.needsUpdate=true;
  datum.material.opacity=.3;
 }};
 return design;
}
