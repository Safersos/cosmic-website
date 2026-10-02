import * as T from './three.module.js';
import {GLTFLoader} from './addons/loaders/GLTFLoader.js';
import {DRACOLoader} from './addons/loaders/DRACOLoader.js';

export function vehicle() {
  const group = new T.Group();
  group.userData.loaded = false;
  const decoder = new DRACOLoader();
  decoder.setDecoderPath(new URL('./draco/', import.meta.url).href);
  decoder.setWorkerLimit(2);
  const loader = new GLTFLoader();
  loader.setDRACOLoader(decoder);

  loader.load(new URL('./ferrari.glb', import.meta.url).href, gltf => {
    const model = gltf.scene.children[0];
    const paint = new T.MeshPhysicalMaterial({color:0x307981, metalness:0.85, roughness:0.27, clearcoat:1, clearcoatRoughness:0.065});

    for (const [name, material] of [['body',paint]]) {
      const part = model.getObjectByName(name);
      if (part) part.material = material;
    }

    const malformedCabinHighlight = model.getObjectByName('interior_light');
    if (malformedCabinHighlight) malformedCabinHighlight.visible = false;

    // The model's crest is split across generic blue/yellow/centre nodes rather
    // than exported with logo names. Remove those mark-bearing pieces entirely.
    const brandingPattern=/porsche|logo|badge|emblem|crest|manufacturer/i;
    model.traverse(object => {
      // Chrome includes the rear manufacturer's horse, merged with decorative
      // accents. Omit that decorative mesh, not the body, lights or wheel rims.
      if(/^(chrome|blue|yellow_trim|steering_centre|centre)(?:_|$)/i.test(object.name||'')||brandingPattern.test(object.name||'')) object.visible=false;
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      if (object.material) object.material.envMapIntensity = 1.4;
    });

    const bounds = new T.Box3().setFromObject(model);
    const size = bounds.getSize(new T.Vector3());
    const center = bounds.getCenter(new T.Vector3());
    const scale = 4.55 / Math.max(size.x, size.z);
    model.scale.multiplyScalar(scale);
    model.position.set(-center.x * scale, -bounds.min.y * scale + 0.055, -center.z * scale);
    group.add(model);
    const wheelNodes=['wheel_fl','wheel_fr','wheel_rl','wheel_rr']
      .map(name=>model.getObjectByName(name)).filter(Boolean);
    const spinPivots=[],detailMaterials=[],blurMaterials=[];
    let sourceRadius=.358;
    for(const wheel of wheelNodes){
      const tire=wheel.getObjectByName('tire');
      if(tire?.geometry){tire.geometry.computeBoundingBox();const size=tire.geometry.boundingBox.getSize(new T.Vector3());sourceRadius=Math.max(size.y,size.z)/2;}
      const side=wheel.name.endsWith('l')?-1:1;
      wheel.userData.wheelAxle={radius:sourceRadius,side};
      const parts=wheel.children.filter(part=>part.name!=='brake');
      const pivot=new T.Group();pivot.name=wheel.name+'_spin';wheel.add(pivot);spinPivots.push(pivot);
      for(const part of parts){
        pivot.add(part);part.userData.wheelSurface=true;
        if(!part.isMesh||part.name==='tire')continue;
        const originals=Array.isArray(part.material)?part.material:[part.material];
        const copies=originals.map(m=>{const copy=m.clone();copy.transparent=true;copy.userData.motionBaseOpacity=1;detailMaterials.push(copy);return copy;});
        part.material=Array.isArray(part.material)?copies:copies[0];
      }
      // Concentric metal bands represent shutter blur without a false spoke direction.
      for(const [inner,outer,color] of [[.075,.21,0x5e7169],[.21,.255,0x899b90],[.255,.285,0x40564d]]){
        const material=new T.MeshStandardMaterial({color,metalness:.7,roughness:.36,transparent:true,opacity:0,side:T.DoubleSide,depthWrite:false});
        material.userData.motionBaseOpacity=1;material.userData.motionOpacity=0;blurMaterials.push(material);
        const ring=new T.Mesh(new T.RingGeometry(inner,outer,64),material);
        ring.rotation.y=Math.PI/2;ring.position.x=side*.145;ring.userData.wheelSurface=true;ring.userData.wheelBlurRing=true;wheel.add(ring);
      }
    }
    let previousVelocity=0;
    group.updateVehicle=(distance,dt=1/60)=>{
      const step=Math.max(dt,1/120),velocity=distance/step;
      group.userData.velocity=velocity;
      group.userData.acceleration=(velocity-previousVelocity)/step;
      previousVelocity=velocity;
      const radius=sourceRadius*scale*group.scale.x;
      // The source model is scaled for the scene, so use a conservative rolling
      // ratio to keep the spokes readable at the site's slow visual pace.
      const wheelDistance=distance*.28;
      // Chapter jumps are camera transitions, not high-speed driving. Bound
      // the displayed angular step so spokes cannot alias into reverse motion.
      const angleLimit=Math.min(.18,step*4);
      const angle=Math.max(-angleLimit,Math.min(angleLimit,wheelDistance/radius));
      for(const pivot of spinPivots)pivot.rotation.x=(pivot.rotation.x+angle)%(Math.PI*2);
      const shutterAngle=Math.abs(velocity*.28)/radius*Math.max(step,1/60);
      // Do not fade the wheel geometry: that made tires and spokes disappear
      // at ordinary scroll velocities. A restrained ring hint carries motion.
      const blur=Math.min(.14,Math.max(0,(shutterAngle-.45)*.12));
      for(const material of detailMaterials){material.userData.motionOpacity=1;material.opacity=1;}
      for(const material of blurMaterials){material.userData.motionOpacity=blur;material.opacity=blur;}
    };

    // Neutralize manufacturer branding without removing the body geometry.
    model.traverse(object => {
      if (/^(chrome|blue|yellow_trim|steering_centre|centre)(?:_|$)/i.test(object.name) || brandingPattern.test(object.name||'')) object.visible = false;
    });

    // Use scene lighting; a rectangular baked AO plane shows against the road.
    group.userData.loaded = true;
    decoder.dispose();
  }, undefined, error => {
    console.error('Vehicle model failed to load', error);
    decoder.dispose();
  });

  // Replaced when the model loads; the home scene can call this during loading.
  group.updateVehicle = function() {};
  return group;
}







