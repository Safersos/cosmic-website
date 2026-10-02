import { writeFileSync } from 'fs';
import { inventionPage } from './invention-content.mjs';
import { automotiveResearch } from './automotive-research.mjs';
import {siteFooter,journeyNavLink} from './site-chrome.mjs';

const active = (current, files) => files.includes(current) ? ' is-active' : '';
const currentLink = (current, file) => current === file ? ' class="is-active" aria-current="page"' : '';
const siteNav = (current = '') => `<a href="intelligence.html"${currentLink(current,'intelligence.html')}>Intelligence</a><a href="infrastructure.html"${currentLink(current,'infrastructure.html')}>Infrastructure</a><div class="nav-dropdown"><a href="automotive.html" class="dropdown-trigger${active(current, ['automotive.html','robotics.html'])}">Implementation <span class="nav-chevron">▾</span></a><div class="dropdown-menu"><a href="automotive.html"${currentLink(current,'automotive.html')}>Automotive</a><a href="robotics.html"${currentLink(current,'robotics.html')}>Robotics</a></div></div>${current?journeyNavLink(current):''}`;

const head = (title, desc, mode) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cosmic — ${title}</title><meta name="description" content="${desc}"><meta property="og:type" content="website"><meta property="og:site_name" content="Cosmic"><meta property="og:title" content="Cosmic — ${title}"><meta property="og:description" content="${desc}"><meta name="twitter:card" content="summary"><link rel="icon" href="assets/Cosmic%20icon.png"><link rel="stylesheet" href="assets/site.css"><script type="importmap">{"imports":{"three":"./assets/three.module.js"}}</script><link rel="stylesheet" href="assets/site-chrome.css?v=20261002-global"></head><body data-scene="${mode}">`;

const index = head('Perception as Infrastructure', 'Cosmic is developing radio-frequency perception infrastructure: an AI-generated, real-time world perception model that gives machines and software a shared understanding of physical space.', 'network') + `
<link rel="stylesheet" href="assets/experience.css?v=20261002-robot-scenes">
<script src="assets/site-navigation.js?v=20261002-priority" defer></script>
<a class="home-wordmark" href="#top" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic" fetchpriority="high"></a>
<header class="experience-nav"><nav class="home-navigation" aria-label="Explore Cosmic">${siteNav()}</nav></header>
<main class="experience-shell" id="experience">
  <section class="brand-intro" id="top" aria-labelledby="intro-title">
    <div class="intro-copy">
      <h1 id="intro-title">RF Perception<br><em>As Infrastructure.</em></h1>
      <p>An AI-generated, real-time world perception model that gives machines and software a shared understanding of physical space.</p>
      <a href="intelligence.html">Discover the thinking <span aria-hidden="true">↗</span></a>
    </div>
    <div class="intro-baseline"><span>Instead of making every vehicle on-road smart individually, Cosmic turns the road smarter</span><span>NLOS awareness, Traffic management, Accident audits, Critical alerts and more with 0-Identity capture.</span></div>
  </section>
  <div class="experience-canvas-wrap" aria-hidden="true">
    <canvas id="experience-canvas"></canvas>
    <div class="experience-grain"></div>
    <div class="experience-shade"></div>
    <div class="experience-loader" id="experience-loader"><span></span><em>Preparing the corridor</em></div>
  </div>
  
  
  
  <div class="cockpit-radar" id="cockpit-radar" aria-label="In-car 360 degree RF environment screen">
    <div class="radar-scope">
      <i class="radar-ring r1"></i><i class="radar-ring r2"></i><i class="radar-ring r3"></i><i class="radar-cross x"></i><i class="radar-cross y"></i><i class="radar-sweep"></i>
      <span class="radar-vehicle">▲</span>
      <span class="radar-blip dog-one" data-label="DOG"></span><span class="radar-blip dog-two" data-label="DOG"></span>
      <span class="radar-blip traffic-one" data-label="VEHICLE"></span><span class="radar-blip traffic-two" data-label="VEHICLE"></span>
      <span class="radar-blip person" data-label="PEDESTRIAN"></span><span class="radar-blip building" data-label="STRUCTURE"></span>
      <span class="radar-blip robot-one" data-label="ROBOT"></span><span class="radar-blip machine-one" data-label="MACHINE"></span><span class="radar-blip tree-one" data-label="TREE"></span>
    </div>
  </div>
  <section class="experience-chapter experience-hero" data-scene-step="0">
    <div class="chapter-copy chapter-copy-wide">
      <h2><span style="font-size: 0.8em;">RF Perception<br>as Infrastructure.</span></h2>
      <p>Whether its autonomous vehicles, robotics, industrial automation, non-invasive public safety monitoring, IOT devices or historic incedent audit.</p>
    </div>
  </section>

  <section class="experience-chapter align-right" id="blindspot" data-scene-step="1">
    <div class="chapter-copy">
      <h2>Infrastructure led Autonomy.</h2>
      <p>Instead of making every vehicle on-road smart individually, Cosmic turns the road smarter.</p>
    </div>
  </section>

  <section class="experience-chapter" data-scene-step="2">
    <div class="chapter-copy">
      <h2>Let the Environment Contribute.</h2>
      <p>Distributed RF nodes observe the infrastructure and our AI World Perception Model, reconstructs a machine readable realtime 3d spatial occupany grid at ULLC speeds.</p>
    </div>
  </section>

  <section class="experience-chapter align-right rf-chapter" data-scene-step="3">
    <div class="chapter-copy">
      <h2>Smart Cities arrive with Cosmic</h2>
      <p>NLOS awareness, Traffic management, Accident audits, Critical alerts and more with 0-Identity capture.</p>
    </div>
  </section>

  <section class="experience-chapter" data-scene-step="4">
    <div class="chapter-copy">
      <h2>Breaking the barriers of Interface</h2>
      <p>Our infrastructure is the only interface needed for AI, Software systems, and Machines to interact with humans.</p>
      
    </div>
  </section>

  <section class="experience-chapter experience-final align-right" data-scene-step="5">
    <div class="chapter-copy">
      <h2>The next era of Technological growth begins with Perception.</h2>
      <p>The world of super fast compute, Intelligent AI systems, Robotics and smart IOT learn to come together with Cosmic.</p>
      <div class="final-actions"><a href="intelligence.html">Explore the intelligence <span>↗</span></a><a href="infrastructure.html">View infrastructure <span>↗</span></a></div>
    </div>
    ${siteFooter('experience-footer')}
  </section>
</main>
<script src="assets/home-intro.js"></script><script type="module" src="assets/experience.js?v=20261002-robot-scenes"></script>
</body></html>`;

const pages = [
  {
    file: 'intelligence.html', title: 'Intelligence', mode: 'model',
    desc: 'An RF-derived spatial world model that preserves geometry, motion, uncertainty and the evidence behind its estimates.',
    heroTitle: 'Physical space.<br><span class="accent">Shared intelligence.</span>',
    heroCopy: 'Cosmic is developing an RF Spatial World Perception Model: a machine-readable representation of the physical world, built from distributed radio-frequency observations.',
    sceneLabel: 'Distributed RF observations form candidate spatial states, undergo physics consistency checks and refine an uncertainty-aware world model',
    content: `
 <section class="invention-thesis content-reveal">
  <p class="thesis-lead">A physical-world perception layer<br>for machines and software.</p>
  <p>Places are shared. Their spatial understanding can be, too. The architecture brings observations from the environment into a model that multiple systems can use, each for a different purpose.<br><a class="invention-context-link" href="invention.html">Explore the Invention ↗</a></p>
 </section>
 <section class="model-anatomy content-reveal">
  <div class="section-intro"><h2>More than<br><em>a shape in space.</em></h2><p>A useful model must describe what may be present, how it is changing, and how much the evidence supports that interpretation.</p><div class="final-actions" style="margin-top: 1.5rem;"><a href="invention.html" style="text-decoration: underline;">Explore the Invention <span>↗</span></a></div></div>
  <dl class="model-fields">
   <div><dt>Geometry</dt><dd>Occupancy, surfaces and object extent describe the structure of a region.</dd></div>
   <div><dt>Motion</dt><dd>Position and movement give the model a history, rather than a single frozen frame.</dd></div>
   <div><dt>Confidence</dt><dd>Competing interpretations can remain open when the available evidence is ambiguous.</dd></div>
   <div><dt>Provenance</dt><dd>Estimates retain a connection to the observations that support them.</dd></div>
  </dl>
 </section>
 <section class="adaptive-section content-reveal">
  <div><h2>What is uncertain<br><em>guides what comes next.</em></h2><p>Uncertainty is part of the model. It can inform where the infrastructure gathers additional evidence, allowing subsequent observations to refine an estimate or challenge an earlier interpretation.</p></div>
  <div class="inference-loop" aria-label="Observation informs interpretation, confidence assessment and further sensing">
   <span>Observe</span><i aria-hidden="true">→</i><span>Interpret</span><i aria-hidden="true">→</i><span>Assess</span><i aria-hidden="true">→</i><span>Adapt</span>
   <div class="loop-return" aria-hidden="true"></div>
  </div>
 </section>
 <section class="applications-section content-reveal"><h2>One perception layer.<br><em>Many ways to use it.</em></h2><p>Potential applications span autonomous machines, robotics, industrial operations, security, analytics and digital twins. Each consumes the spatial information relevant to its own task.</p><div class="application-types"><span>Robotics</span><span>Industrial systems</span><span>Digital twins</span><span>Spatial AI</span></div></section>
 `,
    nextTitle: 'From a model<br>to <em>infrastructure.</em>', nextText: 'Explore the network that brings environmental observations together.', nextHref: 'infrastructure.html', nextLink: 'The infrastructure'
  },
  {
    file: 'world-model.html', title: 'RF World Model', mode: 'model',
    desc: 'A persistent RF-derived representation of geometry, occupancy, motion, material state, confidence, uncertainty and observation provenance.',
    heroTitle: 'A world model<br><span class="accent">with evidence attached.</span>',
    heroCopy: 'Cosmic maintains more than geometry. The RF Spatial World Model keeps physical state, motion, confidence, uncertainty and provenance together in one machine-readable representation.',
    sceneLabel: 'Layered conceptual RF Spatial World Model containing geometry, occupancy, motion, uncertainty and provenance',
    content: `
 <section class="world-definition content-reveal"><div><span class="auto-eyebrow">State · Space · Time</span><h2>A model that knows<br><em>what it does not know.</em></h2><p>The model distinguishes resolved state from provisional, stale or hypothesis-dependent state. Downstream systems can inspect confidence and uncertainty rather than receiving an unexplained answer.</p></div><div class="world-equation" aria-label="World model state equation"><strong>W(x,t)</strong><span>{ G, M, O, K, C, U, P, H }</span><small>Geometry · Material · Occupancy · Kinematics · Confidence · Uncertainty · Provenance · Hypotheses</small></div></section>
 <section class="world-layers content-reveal"><div class="layer-stack" aria-hidden="true"><span>PROVENANCE</span><span>UNCERTAINTY</span><span>MOTION</span><span>OBJECTS</span><span>OCCUPANCY</span><span>GEOMETRY</span></div><div><h2>One place.<br><em>Several useful layers.</em></h2><p>Applications can request only the state relevant to their task while the underlying model preserves the relationships between observations, candidate interpretations and physical entities.</p><ul class="technical-list"><li>Persistent entities across overlapping node regions</li><li>Coarse state over wide areas; selective high-resolution refinement</li><li>Material and scattering characteristics represented probabilistically</li><li>Temporal history and virtual viewpoints where evidence supports reconstruction</li></ul></div></section>
 <section class="interface-section content-reveal"><div><span class="auto-eyebrow">Perception service</span><h2>Shared underneath.<br><em>Specific at the edge.</em></h2></div><div class="interface-grid"><article><b>QUERY</b><p>Ask for a spatial region, entity, confidence level or time.</p></article><article><b>STREAM</b><p>Receive changing occupancy, trajectories and environmental state.</p></article><article><b>EVENT</b><p>Subscribe to task-specific state transitions defined by an application.</p></article><article><b>PROJECT</b><p>Deliver a filtered local view to a vehicle, robot or controller.</p></article></div></section>
 `,
    nextTitle: 'The model is maintained<br>by <em>infrastructure.</em>', nextText: 'See how distributed nodes, calibration and computation establish one common spatial frame.', nextHref: 'infrastructure.html', nextLink: 'Explore infrastructure'
  },
  {
    file: 'infrastructure.html', title: 'Infrastructure', mode: 'network',
    desc: 'A distributed RF perception network that combines observations from multiple positions into a shared spatial understanding.',
    heroTitle: 'Perception,<br><span class="accent">built into place.</span>',
    heroCopy: 'A network of RF perception nodes turns separate observation points into a shared resource for a physical environment.',
    sceneLabel: 'Conceptual distributed network with overlapping observation regions and connections between sensing nodes',
    content: `
 <section class="network-principle content-reveal"><h2>Different positions.<br><em>Complementary evidence.</em></h2><p>No observation contains the whole picture. Spatially distributed nodes contribute different views of a region, creating opportunities to resolve ambiguity and maintain context between neighbouring areas.</p></section>
 <section class="network-map-section content-reveal">
  <div class="network-map" aria-hidden="true">
   <svg viewBox="0 0 860 330" fill="none"><defs><pattern id="network-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="currentColor" opacity=".07"/></pattern></defs><rect width="860" height="330" fill="url(#network-grid)"/><g stroke="currentColor"><ellipse cx="190" cy="170" rx="140" ry="108" opacity=".25"/><ellipse cx="430" cy="160" rx="170" ry="128" opacity=".35"/><ellipse cx="680" cy="170" rx="140" ry="108" opacity=".25"/><path d="M190 170 430 160 680 170" stroke-dasharray="4 7"/><path d="M190 170Q300 25 430 160Q560 25 680 170" opacity=".5"/></g><g fill="currentColor"><circle cx="190" cy="170" r="6"/><circle cx="430" cy="160" r="6"/><circle cx="680" cy="170" r="6"/></g></svg>
  </div>
  <div class="network-notes"><article><h3>Observe locally</h3><p>Each node contributes RF observations from its position within the environment.</p></article><article><h3>Establish relationships</h3><p>Coordination and calibration help observations from different nodes remain meaningful together.</p></article><article><h3>Combine spatially</h3><p>Processing connects the available evidence across regions, retaining its origin and uncertainty.</p></article></div>
 </section>
 <section class="deployment-section content-reveal">
  <div><h2>The place shapes<br><em>the deployment.</em></h2><p>A corridor, industrial site and complex public space have different geometries and observation needs. The architecture is intended to accommodate those differences rather than assume one universal sensing arrangement.</p></div>
  <div class="deployment-details"><article><h3>Coverage as a relationship</h3><p>Overlapping observation regions provide shared evidence. Their value depends on the physical environment and the reconstruction task.</p></article><article><h3>Processing as a system</h3><p>Local and wider processing can contribute to a common spatial view. Application interfaces make that information available to consuming systems.</p></article></div>
 </section>
 <section class="network-closing content-reveal"><p>The infrastructure carries the burden of observation.<br><em>Applications work with the resulting context.</em></p></section>
 `,
    nextTitle: 'A wider view<br>for <em>mobility.</em>', nextText: 'See how environmental perception could complement a vehicle’s own sensors.', nextHref: 'automotive.html', nextLink: 'The automotive application'
  },
  {
    file: 'applications.html', title: 'Applications', mode: 'network',
    desc: 'One shared RF Spatial World Model made useful to mobility, robotics, industrial systems and digital twins through application-specific interfaces.',
    heroTitle: 'One perception layer.<br><span class="accent">Many systems.</span>',
    heroCopy: 'Physical sensing and reconstruction can be shared. Each consuming system receives the spatial state it needs and remains responsible for its own decisions.',
    sceneLabel: 'Conceptual shared world model connected to vehicles, robots, industrial systems and digital twins',
    content: `
 <section class="application-core content-reveal"><div class="core-orbit" aria-hidden="true"><strong>RF WORLD<br>MODEL</strong><span class="orbit o1">MOBILITY</span><span class="orbit o2">ROBOTICS</span><span class="orbit o3">INDUSTRY</span><span class="orbit o4">DIGITAL TWINS</span></div><div><span class="auto-eyebrow">Shared foundation</span><h2>Observe once.<br><em>Use with purpose.</em></h2><p>The same underlying spatial representation can support independent applications. Cosmic supplies selected geometry, occupancy, motion, material, confidence and uncertainty; the application supplies task logic, policy and control.</p></div></section>
 <section class="application-cards content-reveal"><a href="automotive.html"><span>01</span><h2>Automotive</h2><p>Infrastructure-derived context beyond the vehicle’s immediate viewpoint.</p><b>Explore mobility ↗</b></a><a href="robotics.html"><span>02</span><h2>Robotics & Industry</h2><p>Shared spatial context for public-space robots, fleets and facilities.</p><b>Explore robotics ↗</b></a><a href="world-model.html"><span>03</span><h2>Cities & Digital Twins</h2><p>A living model of place for operations, simulation and spatial software.</p><b>Explore the world model ↗</b></a></section>
 <section class="responsibility-band content-reveal"><h2>Context is shared.<br><em>Responsibility is not.</em></h2><p>Planning, actuation, safety validation and policy remain with each consuming system. Infrastructure-derived perception is an additional source of evidence, not a substitute for application-specific engineering.</p></section>
 `,
    nextTitle: 'Start with a<br><em>specific environment.</em>', nextText: 'Cosmic is seeking simulation, hardware, infrastructure and application partners for proof-of-concept work.', nextHref: 'contact.html', nextLink: 'Discuss a pilot'
  },
  inventionPage,
  {
    file: 'research.html', title: 'Patent & Research', mode: 'model',
    desc: 'The technical record behind Cosmic RF Perception-as-Infrastructure, including the patent specification, drawings and current proof-of-concept programme.',
    heroTitle: 'The technical record.<br><span class="accent">Open for scrutiny.</span>',
    heroCopy: 'Explore the filed architecture, its seven technical figures, and the simulation-to-hardware programme being used to test RF-to-world-model reconstruction.',
    sceneLabel: 'Conceptual technical reconstruction showing RF evidence, candidate hypotheses and a layered spatial model',
    content: `
 <section class="research-record content-reveal"><div><span class="auto-eyebrow">Patent record</span><h2>RF Perception<br><em>as Infrastructure.</em></h2><p><strong>Complete title:</strong> A Radio-Frequency Perception-as-Infrastructure System and Method for Distributed Three-Dimensional Spatial World Model Generation.</p></div><div class="document-actions"><a href="mailto:founder@cosmicperception.com?subject=Request%20Cosmic%20patent%20documents">Request the specification <span>Redacted public copy pending ↗</span></a><a href="#figures">Review the figure guide <span>Figures 1–7 ↓</span></a><a href="https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus" target="_blank" rel="noreferrer">Indian Patent Search <span>Enter 202641045220 ↗</span></a></div></section>
 <section class="figure-index content-reveal" id="figures"><div class="section-intro"><span class="auto-eyebrow">Figures 1–7</span><h2>The architecture,<br><em>one figure at a time.</em></h2></div><div class="figure-grid"><article><b>01</b><h3>System architecture</h3><p>Synchronization, acquisition, reconstruction, world model, controller and applications.</p></article><article><b>02</b><h3>Coherence domains</h3><p>Local phase-sensitive processing with broader spatial fusion.</p></article><article><b>03</b><h3>Hypothesis engine</h3><p>Observation graph, inverse proposals, forward predictions and residual updates.</p></article><article><b>04</b><h3>Dynamic perception</h3><p>Ambiguity selects the next useful sensing configuration.</p></article><article><b>05</b><h3>Multi-spectral refinement</h3><p>Coarse low-frequency constraints guide fine reconstruction.</p></article><article><b>06</b><h3>Closed loop</h3><p>Uncertainty, resource selection, acquisition and model update.</p></article><article><b>07</b><h3>World-model layers</h3><p>Physical environment transformed into machine-readable spatial state.</p></article></div></section>
 <section class="poc-program content-reveal"><div><span class="auto-eyebrow">Current programme</span><h2>From simulation<br><em>to physical evidence.</em></h2></div><ol><li><b>01</b><span>Generate paired RF and ground-truth scenes using CARLA, NVIDIA Sionna and LiDAR reference data.</span></li><li><b>02</b><span>Train and evaluate candidate reconstruction models with physics and temporal constraints.</span></li><li><b>03</b><span>Benchmark reconstructed state against a digital-twin pipeline with explicit confidence and uncertainty.</span></li><li><b>04</b><span>Move to synchronized RF hardware prototypes and controlled real-world deployments.</span></li></ol></section>
 `,
    nextTitle: 'The record explains<br><em>the invention.</em>', nextText: 'Follow the evolution from the provisional SecureTower concept to a general world-perception layer.', nextHref: 'invention.html', nextLink: 'Read the invention story'
  },
  {
    file: 'automotive.html', title: 'Automotive', mode: 'vehicle',
    desc: 'An automotive implementation of RF perception infrastructure that complements onboard sensing with environmental spatial context.',
    heroTitle: 'The next turn.<br><span class="accent">A wider perspective.</span>',
    heroCopy: 'Onboard sensors travel with the vehicle. Cosmic explores what changes when the environment contributes a view of its own.',
    sceneLabel: 'Conceptual junction with a vehicle and roadside RF nodes',
    content: `
 <section class="auto-perspective content-reveal">
  <div><span class="auto-eyebrow">Implementation · Automotive</span><h2>The road does not end<br>at the <em>edge of sight.</em></h2></div>
  <div class="auto-explanation"><p>At a junction, a building can hide an approaching road user. A sensing position elsewhere may observe that same space differently.</p><p>The idea is to bring those environmental observations into a shared spatial model—giving a vehicle additional evidence to evaluate alongside its own sensors and eventually steer the vehicle autonomous through the infrastructure itself with only a fail safe mechanism on board.</p></div>
 </section>
 ${automotiveResearch}
 <section class="auto-context content-reveal">
  <div class="auto-context-heading"><h2>Useful context.<br><em>Not just a detection.</em></h2><p>A spatial estimate matters only when the consuming system can interpret it.</p></div>
  <div class="auto-evidence"><article><span class="evidence-mark position-mark" aria-hidden="true"></span><h3>Where things may be</h3><p>Geometry and position connect an observation to the physical road environment.</p></article><article><span class="evidence-mark motion-mark" aria-hidden="true"></span><h3>How they are changing</h3><p>Motion and temporal continuity help describe a developing situation.</p></article><article><span class="evidence-mark confidence-mark" aria-hidden="true"></span><h3>How much is known</h3><p>Confidence and provenance preserve the limits of the estimate and the evidence behind it.</p></article></div>
 </section>
 <section class="auto-responsibility content-reveal"><div><span class="auto-eyebrow">Built to complement</span><h2>A broader view.<br><em>The same responsibility.</em></h2></div><div><p>Infrastructure supplies spatial context. The vehicle evaluates that context alongside onboard perception.</p><p>Planning, control and safety decisions remain with the consuming system. An additional viewpoint is not a substitute for that responsibility.</p><a href="robotics.html">Explore Robotics implementation <span aria-hidden="true">↗</span></a></div></section>
 `,
    nextTitle: 'Robotic perception<br><em>in automation.</em>', nextText: 'See how RF perception infrastructure supports autonomous mobile robots and industrial co-bots.', nextHref: 'robotics.html', nextLink: 'Robotics implementation'
  },
  {
    file: 'robotics.html', title: 'Robotics', mode: 'model',
    desc: 'An RF perception layer for autonomous robots, industrial automation, and co-bot physical intelligence.',
    heroTitle: 'Spatial intelligence.<br><span class="accent">Built for robotics.</span>',
    heroCopy: 'Autonomous mobile robots and industrial systems require continuous awareness beyond local optical lines of sight. Cosmic provides an environment-integrated RF spatial model.',
    sceneLabel: 'Conceptual spatial reconstruction for robotics and automated systems',
    content: `
 <section class="invention-thesis content-reveal">
  <div><span class="auto-eyebrow">Implementation · Robotics</span><p class="thesis-lead">Perception integrated into the workspace,<br>not just the robot.</p></div>
 <p>Local robot sensors can be obstructed by machinery, materials, and structural obstacles. Infrastructure-based RF perception projects situational context into robot motion planning.</p>
 </section>
 <section class="robot-road content-reveal"><div class="robot-road-visual" aria-hidden="true"><span class="road-line"></span><span class="robot-orb orb-a">BOT</span><span class="robot-orb orb-b">BOT</span><span class="human-orb human-a">HUMAN</span><span class="human-orb human-b">HUMAN</span><span class="signal-arc"></span></div><div><span class="auto-eyebrow">Shared scene</span><h2>Robots and people<br><em>in the same frame.</em></h2><p>On a public road, a robot can walk a dog, carry luggage or assist a person while nearby infrastructure observes the changing geometry. The robot receives context about what it cannot currently see and humans remain part of the model, not obstacles outside it.</p></div></section>
 <section class="robot-automation content-reveal"><div><span class="auto-eyebrow">Industrial automation</span><h2>Perception at the<br><em>workspace scale.</em></h2><p>Stationary nodes and mobile machines share occupancy, motion and confidence. Fleets can coordinate around blind corners, changing materials and human workers without requiring every robot to carry the full sensing burden.</p></div><div class="automation-grid"><span>WAREHOUSE</span><span>CO-BOTS</span><span>PORTS</span><span>INSPECTION</span></div></section>
 <section class="model-anatomy content-reveal">
  <div class="section-intro"><h2>Continuous awareness<br><em>across the facility.</em></h2><p>A unified perception field for fleet navigation, safety zones, and automated material handling.</p></div>
  <dl class="model-fields">
   <div><dt>Non-Optical</dt><dd>Can complement optical sensing in darkness, dust, steam, smoke and selected occlusion conditions, subject to propagation and deployment.</dd></div>
   <div><dt>Coordinated</dt><dd>Shared spatial map across autonomous mobile robots (AMRs) and stationary automation.</dd></div>
   <div><dt>Continuous</dt><dd>Maintains candidate object continuity across overlapping observation regions.</dd></div>
   <div><dt>Edge-ready</dt><dd>Can provide task-specific world-model projections through local delivery points.</dd></div>
  </dl>
 </section>
 <section class="applications-section content-reveal"><h2>Robotics applications.<br><em>Built for scale.</em></h2><p>From smart warehouses to automated manufacturing and hazardous site inspection, RF perception extends robotic autonomy.</p><div class="application-types"><span>Warehouse AMRs</span><span>Industrial Co-bots</span><span>Port Automation</span><span>Hazardous Inspection</span></div></section>
 `,
    nextTitle: 'Explore the automotive<br><em>implementation.</em>', nextText: 'See how RF perception infrastructure complements vehicle onboard sensing.', nextHref: 'automotive.html', nextLink: 'Automotive implementation'
  },
  {
    file: 'company.html', title: 'Company', mode: 'network',
    desc: 'Cosmic is building RF Perception-as-Infrastructure and seeking research, hardware, simulation and deployment partners.',
    heroTitle: 'Building infrastructure<br><span class="accent">for machine perception.</span>',
    heroCopy: 'Cosmic is an early-stage research and product effort turning distributed RF evidence into a shared, uncertainty-aware model of physical space.',
    sceneLabel: 'Conceptual network of RF perception nodes forming a shared spatial model',
    content: `
 <section class="company-mission content-reveal"><p class="thesis-lead">Give machines a wider view<br>without making every machine rebuild the world alone.</p><p>The company is developing the sensing, synchronization, inference and interface layers required to make physical-world perception available as shared infrastructure.</p></section>
 <section class="company-stage content-reveal"><div><span class="auto-eyebrow">Current stage</span><h2>Research in motion.<br><em>Evidence next.</em></h2><p>The immediate milestone is an end-to-end proof of concept that converts simulated RF observations into a reconstructed 3D world model, benchmarks that reconstruction against ground truth, and establishes the path to synchronized hardware prototypes.</p></div><div class="stage-grid"><article><b>NOW</b><p>Architecture, simulation, training data and model iteration.</p></article><article><b>NEXT</b><p>RF-to-3D POC and digital-twin benchmark.</p></article><article><b>THEN</b><p>Hardware prototypes and controlled deployment.</p></article></div></section>
 <section class="partner-section content-reveal"><div><span class="auto-eyebrow">Build with Cosmic</span><h2>Partners for the<br><em>first proof points.</em></h2></div><div class="partner-grid"><span>RF hardware & manufacturing</span><span>Telecom & infrastructure</span><span>Simulation & digital twins</span><span>Automotive & robotics</span><span>Research & validation</span><span>Pilot environments</span></div></section>
 <section class="contact-panel content-reveal"><div><span class="auto-eyebrow">Contact</span><h2>Let’s explore<br><em>what’s possible.</em></h2><p>Tell us about your environment, application or research question.</p></div><div><a class="company-contact-link" href="contact.html">Go to the contact page <span aria-hidden="true">↗</span></a></div></section>
 `,
    nextTitle: 'Begin with<br><em>the technical record.</em>', nextText: 'Review the filed architecture, figures and current proof-of-concept programme.', nextHref: 'research.html', nextLink: 'Explore research'
  }
];

function subPage(p) {
  return head(p.title, p.desc, p.mode) + `
<link rel="stylesheet" href="assets/subsite.css">
<script src="assets/site-navigation.js?v=20261002-priority" defer></script>
<link rel="stylesheet" href="assets/scene-polish.css?v=20261002-intelligence">
<a class="skip-link" href="#page-content">Skip to content</a>
<header class="subsite-nav">
 <a class="brand" href="index.html" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic"></a>
 <nav aria-label="Explore Cosmic">${siteNav(p.file)}</nav>
 <span class="subsite-home">COSMIC / 2026</span>
</header>
<main class="subsite${p.file==='invention.html'?' invention-page':''}" id="page-content">
 <section class="subsite-hero">
  <div class="subsite-scene"><div class="scene-fallback" role="img" aria-label="${p.sceneLabel}"><span>RF / SPATIAL MODEL</span></div><canvas id="rf-scene" role="img" aria-label="${p.sceneLabel}"></canvas></div>
  <div class="subsite-hero-copy"><h1>${p.heroTitle}</h1><p>${p.heroCopy}</p>${p.heroActions||''}</div>
  ${p.mode === 'vehicle' ? '<div class="auto-view-control"><div class="auto-view-buttons" role="group" aria-label="Compare sensing viewpoints"><button type="button" data-view="onboard" aria-pressed="false">Onboard view</button><button type="button" data-view="shared" aria-pressed="true">With infrastructure</button></div><p id="view-caption" aria-live="polite">RF spatial view — geometry and observation lines.</p></div><div class="auto-scene-legend"><span><i></i>Environmental observation</span><small>Concept study</small></div>' : ''}
 </section>
 ${p.content}
 <section class="subsite-next content-reveal"><h2>${p.nextTitle}</h2><p>${p.nextText}</p><div><a href="${p.nextHref}">${p.nextLink}<b aria-hidden="true">↗</b></a></div></section>
</main>
${siteFooter()}
<script type="module" src="assets/scene.js?v=20261002-intelligence"></script>
<script type="module" src="assets/subsite-fx.js"></script>
</body></html>`;
}

function contactPage() {
 return head('Contact', 'Contact Cosmic about research, RF hardware, infrastructure pilots and applications.', 'contact') + `
<link rel="stylesheet" href="assets/subsite.css">
<script src="assets/site-navigation.js?v=20261002-priority" defer></script>
<link rel="stylesheet" href="assets/enquiry.css">
<link rel="stylesheet" href="assets/scene-polish.css">
<link rel="stylesheet" href="assets/contact-page.css">
<a class="skip-link" href="#page-content">Skip to content</a>
<header class="subsite-nav"><a class="brand" href="index.html" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic"></a><nav aria-label="Explore Cosmic">${siteNav('contact.html')}</nav><span class="subsite-home">COSMIC / 2026</span></header>
<main class="subsite contact-page" id="page-content">
 <div class="contact-heading"><span class="auto-eyebrow">CONTACT COSMIC</span><h1>Let’s discuss<br><em>your environment.</em></h1><p>Share your research question, proposed pilot or application. Give us enough context to understand where you would like to begin.</p></div>
 <section class="contact-page-layout" aria-label="Send an enquiry"><div class="contact-context"><span class="auto-eyebrow">BUILD WITH US</span><h2>A clear starting point<br><em>makes better work.</em></h2><p>We welcome enquiries about RF research, sensing hardware, simulation, infrastructure pilots, automotive and robotics.</p><div class="contact-context-lines"><span>01 / Your environment</span><span>02 / The question you want to test</span><span>03 / Your role or organization</span></div></div>
 <form id="contact-form" class="enquiry-form" action="/api/contact" method="post"><label>Your name<input name="name" autocomplete="name" maxlength="120" required></label><label>Work email<input name="email" type="email" autocomplete="email" maxlength="254" required></label><label>Organization<input name="organization" autocomplete="organization" maxlength="200"></label><label>Area of interest<select name="interest"><option>Research collaboration</option><option>Hardware and manufacturing</option><option>Automotive and robotics</option><option>Infrastructure pilot</option><option>Strategic partnership</option><option>General enquiry</option></select></label><label class="full">Your message<textarea name="message" rows="6" minlength="10" maxlength="4000" required></textarea></label><label class="form-trap" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><p class="full form-note">We’ll use your details to respond to this enquiry.</p><button type="submit">Send enquiry <span aria-hidden="true">↗</span></button><p class="full" role="status" aria-live="polite"></p></form></section>
</main>
${siteFooter()}
<script type="module" src="assets/contact.js"></script></body></html>`;
}

const selectedPage=process.argv.find(arg=>arg.startsWith('--page='))?.slice(7);
if(!selectedPage||selectedPage==='index.html')writeFileSync('dist/index.html', index);
const publicPages = new Set(['intelligence.html','infrastructure.html','automotive.html','robotics.html','invention.html']);
if(selectedPage&&selectedPage!=='index.html'&&!publicPages.has(selectedPage))throw new Error('Unknown page: '+selectedPage);
for (const page of pages) if (publicPages.has(page.file)&&(!selectedPage||selectedPage===page.file)) writeFileSync('dist/' + page.file, subPage(page));
// Only the public information architecture is emitted: Intelligence, Infrastructure and Implementation.
console.log('Built distinct Cosmic pages.');
