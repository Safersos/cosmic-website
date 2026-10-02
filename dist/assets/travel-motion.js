// One signed displacement drives both translation and wheel rotation.
export class TravelMotion {
 constructor(position=0,{maxSpeed=90,acceleration=110,braking=140,response=7}={}){
  Object.assign(this,{position,velocity:0,acceleration:0,maxSpeed,accelerationLimit:acceleration,braking,response});
 }
 advance(target,dt){
  const start=this.position;
  // Integrate elapsed time in small physics steps, including a delayed frame.
  let remaining=Math.max(0,Math.min(dt,.25));
  while(remaining>1e-8){
   const h=Math.min(remaining,1/120);remaining-=h;
   const error=target-this.position;
   const desired=Math.sign(error)*Math.min(this.maxSpeed,Math.sqrt(2*this.braking*Math.abs(error)),Math.abs(error)*this.response);
   const slowing=this.velocity*desired<0||Math.abs(desired)<Math.abs(this.velocity);
   const limit=slowing?this.braking:this.accelerationLimit;
   const a=Math.max(-limit,Math.min(limit,(desired-this.velocity)*this.response));
   const nextVelocity=this.velocity+a*h;
   const step=(this.velocity+nextVelocity)*.5*h;
   if(step*error>0&&Math.abs(step)>=Math.abs(error)){
    this.position=target;this.velocity=0;this.acceleration=0;
   }else{
    this.position+=step;this.velocity=nextVelocity;this.acceleration=a;
   }
   if(Math.abs(target-this.position)<1e-5&&Math.abs(this.velocity)<1e-4){this.position=target;this.velocity=0;this.acceleration=0;}
  }
  return this.position-start;
 }
}
