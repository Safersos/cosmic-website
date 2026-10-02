import { writeFileSync } from 'fs';

const navDropdown = `<a href="intelligence.html">Intelligence</a><a href="infrastructure.html">Infrastructure</a><div class="nav-dropdown"><a href="automotive.html" class="dropdown-trigger">Implementation <span class="nav-chevron">▾</span></a><div class="dropdown-menu"><a href="automotive.html">Automotive</a><a href="robotics.html">Robotics</a></div></div>`;

const head = (title, desc, mode) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cosmic — ${title}</title><meta name="description" content="${desc}"><meta property="og:type" content="website"><meta property="og:site_name" content="Cosmic"><meta property="og:title" content="Cosmic — ${title}"><meta property="og:description" content="${desc}"><meta name="twitter:card" content="summary"><link rel="icon" href="assets/Cosmic%20icon.png"><link rel="stylesheet" href="assets/site.css"><script type="importmap">{"imports":{"three":"./assets/three.module.js"}}</script></head><body data-scene="${mode}">`;

const header = `<header><a class="brand" href="index.html" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic"></a><nav aria-label="Main navigation">${navDropdown}</nav><a class="nav-end" href="infrastructure.html">Explore the system →</a></header>`;

const footer = `<footer><div class="footer-brand"><img src="assets/Cosmic%20logo.png" alt="Cosmic"><p>Radio-frequency perception infrastructure.</p></div><nav class="footer-nav">${navDropdown}</nav><small>© 2026 Cosmic · Concept visualization</small></footer>`;

const index = head('Perception as Infrastructure', 'Cosmic is developing radio-frequency perception infrastructure: an AI-generated, real-time world perception model that gives machines and software a shared understanding of physical space.', 'network') + `
<link rel="stylesheet" href="assets/experience.css">
<a class="home-wordmark" href="#top" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic" fetchpriority="high"></a>
<header class="experience-nav"><nav class="home-navigation" aria-label="Explore Cosmic"><a href="intelligence.html">Intelligence</a><a href="infrastructure.html">Infrastructure</a><div class="nav-dropdown"><a href="automotive.html" class="dropdown-trigger">Implementation <span class="nav-chevron">▾</span></a><div class="dropdown-menu"><a href="automotive.html">Automotive</a><a href="robotics.html">Robotics</a></div></div></nav></header>
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
      <h2>Every viewpoint<br>has <em>a boundary.</em></h2>
      <p>A corner, a structure, another vehicle. Physical geometry limits the evidence available from one position.</p>
    </div>
  </section>

  <section class="experience-chapter" data-scene-step="2">
    <div class="chapter-copy">
      <h2>Let the environment<br><em>contribute.</em></h2>
      <p>Spatially distributed RF nodes observe from different locations. Their observations can add context that a moving machine cannot gather alone.</p>
    </div>
  </section>

  <section class="experience-chapter align-right rf-chapter" data-scene-step="3">
    <div class="chapter-copy">
      <h2>From observations<br>to <em>understanding.</em></h2>
      <p>This conceptual display brings estimated surroundings into a common spatial frame. A vehicle can use that context alongside its own observations.</p>
    </div>
  </section>

  <section class="experience-chapter" data-scene-step="4">
    <div class="chapter-copy">
      <h2>Context includes<br><em>what is uncertain.</em></h2>
      <p>The model is designed to retain confidence and the evidence behind its estimates. Where an interpretation is uncertain, further observations can help refine it.</p>
      
    </div>
  </section>

  <section class="experience-chapter experience-final align-right" data-scene-step="5">
    <div class="chapter-copy">
      <h2>Built around places.<br><em>Useful across systems.</em></h2>
      <p>Mobility is one application. The wider idea is a physical-world perception layer that robotics, industrial operations, digital twins and AI can share.</p>
      <div class="final-actions"><a href="intelligence.html">Explore the intelligence <span>↗</span></a><a href="infrastructure.html">View infrastructure <span>↗</span></a></div>
    </div>
    <div class="experience-footer"><span>© 2026 Cosmic</span><span>RADIO-FREQUENCY PERCEPTION AS INFRASTRUCTURE</span></div>
  </section>
</main>
<script src="assets/home-intro.js"></script><script type="module" src="assets/experience.js"></script>
</body></html>`;

const pages = [
  {
    file: 'intelligence.html', title: 'Intelligence', mode: 'model',
    desc: 'An RF-derived spatial world model that preserves geometry, motion, uncertainty and the evidence behind its estimates.',
    heroTitle: 'Physical space.<br><span class="accent">Shared intelligence.</span>',
    heroCopy: 'Cosmic is developing an RF Spatial World Perception Model: a machine-readable representation of the physical world, built from distributed radio-frequency observations.',
    sceneLabel: 'Conceptual spatial reconstruction with observed surfaces, candidate objects and a moving scan plane',
    content: `
 <section class="invention-thesis content-reveal">
  <p class="thesis-lead">A physical-world perception layer<br>for machines and software.</p>
  <p>Places are shared. Their spatial understanding can be, too. The architecture brings observations from the environment into a model that multiple systems can use, each for a different purpose.</p>
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
 <section class="model-anatomy content-reveal">
  <div class="section-intro"><h2>Continuous awareness<br><em>across the facility.</em></h2><p>A unified perception field for fleet navigation, safety zones, and automated material handling.</p></div>
  <dl class="model-fields">
   <div><dt>Non-Optical</dt><dd>Operates seamlessly through dust, steam, smoke, darkness, and non-metallic obstructions.</dd></div>
   <div><dt>Coordinated</dt><dd>Shared spatial map across autonomous mobile robots (AMRs) and stationary automation.</dd></div>
   <div><dt>Predictive</dt><dd>Tracks human workers and material movement around blind corners before entry.</dd></div>
   <div><dt>Zero-Latency</dt><dd>Delivers continuous occupancy grid updates directly to edge controllers.</dd></div>
  </dl>
 </section>
 <section class="applications-section content-reveal"><h2>Robotics applications.<br><em>Built for scale.</em></h2><p>From smart warehouses to automated manufacturing and hazardous site inspection, RF perception extends robotic autonomy.</p><div class="application-types"><span>Warehouse AMRs</span><span>Industrial Co-bots</span><span>Port Automation</span><span>Hazardous Inspection</span></div></section>
 `,
    nextTitle: 'Explore the automotive<br><em>implementation.</em>', nextText: 'See how RF perception infrastructure complements vehicle onboard sensing.', nextHref: 'automotive.html', nextLink: 'Automotive implementation'
  }
];

function subPage(p) {
  const isImplActive = p.file === 'automotive.html' || p.file === 'robotics.html';
  const localNav = `
    <a href="intelligence.html"${p.file === 'intelligence.html' ? ' class="is-active" aria-current="page"' : ''}>Intelligence</a>
    <a href="infrastructure.html"${p.file === 'infrastructure.html' ? ' class="is-active" aria-current="page"' : ''}>Infrastructure</a>
    <div class="nav-dropdown">
      <a href="automotive.html" class="dropdown-trigger${isImplActive ? ' is-active' : ''}">Implementation <span class="nav-chevron">▾</span></a>
      <div class="dropdown-menu">
        <a href="automotive.html"${p.file === 'automotive.html' ? ' class="is-active"' : ''}>Automotive</a>
        <a href="robotics.html"${p.file === 'robotics.html' ? ' class="is-active"' : ''}>Robotics</a>
      </div>
    </div>
  `;
  return head(p.title, p.desc, p.mode) + `
<link rel="stylesheet" href="assets/subsite.css">
<a class="skip-link" href="#page-content">Skip to content</a>
<header class="subsite-nav">
 <a class="brand" href="index.html" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic"></a>
 <nav aria-label="Explore Cosmic">${localNav}</nav>
 <a class="subsite-home" href="invention.html">The journey <span>↗</span></a>
</header>
<main class="subsite" id="page-content">
 <section class="subsite-hero">
  <div class="subsite-scene"><canvas id="rf-scene" role="img" aria-label="${p.sceneLabel}"></canvas></div>
  <div class="subsite-hero-copy"><h1>${p.heroTitle}</h1><p>${p.heroCopy}</p></div>
  ${p.mode === 'vehicle' ? '<div class="auto-view-control"><div class="auto-view-buttons" role="group" aria-label="Compare sensing viewpoints"><button type="button" data-view="onboard" aria-pressed="false">Onboard view</button><button type="button" data-view="shared" aria-pressed="true">With infrastructure</button></div><p id="view-caption" aria-live="polite">RF spatial view — geometry and observation lines.</p></div><div class="auto-scene-legend"><span><i></i>Environmental observation</span><small>Concept study</small></div>' : ''}
 </section>
 ${p.content}
 <section class="subsite-next content-reveal"><h2>${p.nextTitle}</h2><p>${p.nextText}</p><div><a href="${p.nextHref}">${p.nextLink}<b aria-hidden="true">↗</b></a></div></section>
</main>
<footer class="subsite-footer"><div><img src="assets/Cosmic%20logo.png" alt="Cosmic"><span>RADIO-FREQUENCY PERCEPTION AS INFRASTRUCTURE</span></div><span>© 2026 Cosmic</span></footer>
<script type="module" src="assets/scene.js"></script>
<script type="module" src="assets/subsite-fx.js"></script>
</body></html>`;
}

writeFileSync('dist/index.html', index);
for (const page of pages) writeFileSync('dist/' + page.file, subPage(page));
console.log('Built distinct Cosmic pages.');
