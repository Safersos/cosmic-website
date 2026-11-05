import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { inventionPage } from './invention-content.mjs';
import { automotiveResearch } from './automotive-research.mjs';

const emailIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>';
const whatsappIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.2 7.5c-.8.5-1 1.5-.5 2.8 1 2.5 3.5 4.8 5.9 5.5 1.2.4 2.2.1 2.7-.8l.4-.8-2.7-1.3-.9 1c-1.5-.6-2.8-1.9-3.5-3.4l1-.8-1.3-2.6Z"/></svg>';
const siteFooter=(className='subsite-footer', includeAccess=true)=>`<footer class="${className} cosmic-footer"><span class="footer-copyright">© 2026 Cosmic${includeAccess?' <span class="footer-divider" aria-hidden="true">|</span> <button class="footer-login" type="button" data-login-open><span>Access Board</span><i aria-hidden="true">↗</i></button>':''}</span><nav class="footer-contact-icons" aria-label="Contact Cosmic"><a href="mailto:founder@cosmicperception.com?subject=Contact%20Cosmic" aria-label="Email Cosmic" title="Email Cosmic">${emailIcon}</a><a href="https://wa.me/krishnaprasad03" aria-label="Contact Cosmic on WhatsApp" title="WhatsApp" target="_blank" rel="noopener noreferrer">${whatsappIcon}</a></nav><span class="footer-tagline">RADIO-FREQUENCY PERCEPTION AS INFRASTRUCTURE</span></footer>`;

const active = (current, files) => files.includes(current) ? ' is-active' : '';
const currentLink = (current, file) => current === file ? ' class="is-active" aria-current="page"' : '';
const siteNav = (current = '') => `<a href="intelligence.html"${currentLink(current,'intelligence.html')}>Intelligence</a><a href="infrastructure.html"${currentLink(current,'infrastructure.html')}>Infrastructure</a><div class="nav-dropdown"><a href="automotive.html" class="dropdown-trigger${active(current, ['automotive.html','robotics.html'])}">Implementation <span class="nav-chevron">▾</span></a><div class="dropdown-menu"><a href="automotive.html"${currentLink(current,'automotive.html')}>Automotive</a><a href="robotics.html"${currentLink(current,'robotics.html')}>Robotics</a></div></div><a class="mobile-journey-link" href="invention.html"${currentLink(current,'invention.html')}>The Journey</a>`;
const mobileMenuButton = '<button class="mobile-menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open navigation"><span></span><span></span><span></span></button>';

const head = (title, desc, mode) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cosmic — ${title}</title><meta name="description" content="${desc}"><meta property="og:type" content="website"><meta property="og:site_name" content="Cosmic"><meta property="og:title" content="Cosmic — ${title}"><meta property="og:description" content="${desc}"><meta name="twitter:card" content="summary"><link rel="icon" href="assets/Cosmic%20icon.png"><link rel="stylesheet" href="assets/site.css"><script type="importmap">{"imports":{"three":"./assets/three.module.js"}}</script><link rel="stylesheet" href="assets/site-chrome.css?v=20261105-login2"><script src="assets/page-transition.js?v=20261003" defer></script><script src="assets/login.js?v=20261105" defer></script></head><body data-scene="${mode}">`;

const index = head('Perception as Infrastructure', 'Cosmic is developing radio-frequency perception infrastructure: an AI-generated, real-time world perception model that gives machines and software a shared understanding of physical space.', 'network') + `
<link rel="stylesheet" href="assets/experience.css?v=20261003-mobile-footer2">
<script src="assets/site-navigation.js?v=20261003-mobile-menu" defer></script>
<a class="home-wordmark" href="#top" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic" width="1280" height="480" fetchpriority="high"></a>
<header class="experience-nav">${mobileMenuButton}<nav class="home-navigation" id="site-menu" aria-label="Explore Cosmic">${siteNav()}</nav></header>
<main class="experience-shell" id="experience">
  <section class="brand-intro" id="top" aria-labelledby="intro-title">
    <div class="intro-copy">
      <h1 id="intro-title">RF Perception<br><em>As Infrastructure.</em></h1>
      <p>An AI-generated, real-time world perception model that gives machines and software a shared understanding of physical space.</p>
      <a href="intelligence.html">Discover the thinking <span aria-hidden="true">↗</span></a>
    </div>
    <div class="intro-baseline"><span>Spatial intelligence, from the environment.</span><span>Built around a wider view.</span></div>
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
<script src="assets/home-intro.js"></script><script type="module" src="assets/experience-bootstrap.js?v=20261003-preload"></script>
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
  <p style="text-align: justify;">Places are shared. Their spatial understanding can be, too. The architecture brings observations from the environment into a model that multiple systems can use, each for a different purpose.</p>
 </section>
 <section class="model-anatomy content-reveal">
  <div class="section-intro"><h2>More than<br><em>a shape in space.</em></h2><p style="text-align: justify;">A useful model must describe what may be present, how it is changing, and how much the evidence supports that interpretation.</p><div class="final-actions" style="margin-top: 1.5rem;"><a href="invention.html" style="text-decoration: underline;">Explore the Invention <span>↗</span></a></div></div>
  <dl class="model-fields">
   <div><dt>Geometry</dt><dd>Occupancy, surfaces and object extent describe the structure of a region.</dd></div>
   <div><dt>Motion</dt><dd>Position and movement give the model a history, rather than a single frozen frame.</dd></div>
   <div><dt>Confidence</dt><dd>Competing interpretations can remain open when the available evidence is ambiguous.</dd></div>
   <div><dt>Provenance</dt><dd>Estimates retain a connection to the observations that support them.</dd></div>
  </dl>
 </section>
 <section class="adaptive-section content-reveal">
  <div><h2>What is uncertain<br><em>guides what comes next.</em></h2><p style="text-align: justify;">Uncertainty is part of the model. It can inform where the infrastructure gathers additional evidence, allowing subsequent observations to refine an estimate or challenge an earlier interpretation.</p></div>
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
 <section class="network-principle content-reveal"><h2>Different positions.<br><em>Complementary evidence.</em></h2><p style="text-align: justify;">No observation contains the whole picture. Spatially distributed nodes contribute different views of a region, creating opportunities to resolve ambiguity and maintain context between neighbouring areas.</p></section>
 <section class="network-map-section content-reveal">
  <div class="network-map" aria-hidden="true">
   <svg viewBox="0 0 860 330" fill="none"><defs><pattern id="network-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="currentColor" opacity=".07"/></pattern></defs><rect width="860" height="330" fill="url(#network-grid)"/><g stroke="currentColor"><ellipse cx="190" cy="170" rx="140" ry="108" opacity=".25"/><ellipse cx="430" cy="160" rx="170" ry="128" opacity=".35"/><ellipse cx="680" cy="170" rx="140" ry="108" opacity=".25"/><path d="M190 170 430 160 680 170" stroke-dasharray="4 7"/><path d="M190 170Q300 25 430 160Q560 25 680 170" opacity=".5"/></g><g fill="currentColor"><circle cx="190" cy="170" r="6"/><circle cx="430" cy="160" r="6"/><circle cx="680" cy="170" r="6"/></g></svg>
  </div>
  <div class="network-notes"><article><h3>Observe locally</h3><p>Each node contributes RF observations from its position within the environment.</p></article><article><h3>Establish relationships</h3><p>Coordination and calibration help observations from different nodes remain meaningful together.</p></article><article><h3>Combine spatially</h3><p>Processing connects the available evidence across regions, retaining its origin and uncertainty.</p></article></div>
 </section>
 <section class="deployment-section content-reveal">
  <div><h2>The place shapes<br><em>the deployment.</em></h2><p style="text-align: justify;">A corridor, industrial site and complex public space have different geometries and observation needs. The architecture is intended to accommodate those differences rather than assume one universal sensing arrangement.</p></div>
  <div class="deployment-details"><article><h3>Coverage as a relationship</h3><p style="text-align: justify;">Overlapping observation regions provide shared evidence. Their value depends on the physical environment and the reconstruction task.</p></article><article><h3>Processing as a system</h3><p style="text-align: justify;">Local and wider processing can contribute to a common spatial view. Application interfaces make that information available to consuming systems.</p></article></div>
 </section>
 <section class="network-closing content-reveal"><p>The infrastructure carries the burden of observation.<br><em>Applications work with the resulting context.</em></p></section>
 `,
    nextTitle: 'A wider view<br>for <em>mobility.</em>', nextText: 'See how environmental perception could complement a vehicle’s own sensors.', nextHref: 'automotive.html', nextLink: 'The automotive application'
  },
  inventionPage,
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
 <section class="auto-responsibility content-reveal"><div><span class="auto-eyebrow">Built to complement</span><h2>A broader view.<br><em>The same responsibility.</em></h2></div><div><p>Infrastructure supplies spatial context. The vehicle evaluates that context alongside onboard perception. Planning, control and safety decisions remain with the consuming system.</p></div></section>
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
 <p style="text-align: justify;">Local robot sensors can be obstructed by machinery, materials, and structural obstacles. Infrastructure-based RF perception projects situational context into robot motion planning.</p>
 </section>
 <section class="robot-road content-reveal"><div class="robot-road-visual" aria-hidden="true"><span class="road-line"></span><span class="robot-orb orb-a">BOT</span><span class="robot-orb orb-b">BOT</span><span class="human-orb human-a">HUMAN</span><span class="human-orb human-b">HUMAN</span><span class="signal-arc"></span></div><div><span class="auto-eyebrow">Shared scene</span><h2>Robots and people<br><em>in the same frame.</em></h2><p style="text-align: justify;">On a public road, a robot can walk a dog, carry luggage or assist a person while nearby infrastructure observes the changing geometry. The robot receives context about what it cannot currently see and humans remain part of the model, not obstacles outside it.</p></div></section>
 <section class="robot-automation content-reveal"><div><span class="auto-eyebrow">Industrial automation</span><h2>Perception at the<br><em>workspace scale.</em></h2><p style="text-align: justify;">Stationary nodes and mobile machines share occupancy, motion and confidence. Fleets can coordinate around blind corners, changing materials and human workers without requiring every robot to carry the full sensing burden.</p></div><div class="automation-grid"><span>WAREHOUSE</span><span>CO-BOTS</span><span>PORTS</span><span>INSPECTION</span></div></section>
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
  }
];

function subPage(p) {
  return head(p.title, p.desc, p.mode) + `
<link rel="stylesheet" href="assets/subsite.css?v=20261003-mobile-menu">
<script src="assets/site-navigation.js?v=20261003-mobile-menu" defer></script>
<link rel="stylesheet" href="assets/scene-polish.css?v=20261002-intelligence">
<a class="skip-link" href="#page-content">Skip to content</a>
<header class="subsite-nav">
 <a class="brand" href="index.html" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic" width="1280" height="480"></a>
 ${mobileMenuButton}<nav id="site-menu" aria-label="Explore Cosmic">${siteNav(p.file)}</nav>
 <a class="subsite-home" href="invention.html">The Journey <span>↗</span></a>
</header>
<main class="subsite${p.file==='invention.html'?' invention-page':''}" id="page-content">
 <section class="subsite-hero">
  <div class="subsite-scene"><div class="scene-fallback" role="img" aria-label="${p.sceneLabel}"><span>RF / SPATIAL MODEL</span></div><canvas id="rf-scene" role="img" aria-label="${p.sceneLabel}"></canvas></div>
  <div class="subsite-hero-copy"><h1>${p.heroTitle}</h1><p>${p.heroCopy}</p>${p.heroActions||''}</div>
  ${p.mode === 'vehicle' ? '<div class="auto-view-control"><div class="auto-view-buttons" role="group" aria-label="Compare sensing viewpoints"><button type="button" data-view="onboard" aria-pressed="false">Onboard view</button><button type="button" data-view="shared" aria-pressed="true">With infrastructure</button></div><p id="view-caption" aria-live="polite">RF spatial view — geometry and observation lines.</p></div>' : ''}
 </section>
 ${p.content}
 <section class="subsite-next content-reveal"><h2>${p.nextTitle}</h2><p>${p.nextText}</p><div><a href="${p.nextHref}">${p.nextLink}<b aria-hidden="true">↗</b></a></div></section>
</main>
${siteFooter()}
<script type="module" src="assets/scene.js?v=20261002-intelligence"></script>
<script type="module" src="assets/subsite-fx.js?v=20261003-transition"></script>
</body></html>`;
}

const boardPage = head('Founder Access', 'Private founder workspace for Cosmic.', 'founders') + `
<link rel="stylesheet" href="assets/subsite.css?v=20261105-login">
<link rel="stylesheet" href="assets/founders.css?v=20261105-cofounder">
<script src="assets/founders.js?v=20261105-profile" defer></script>
<a class="skip-link" href="#page-content">Skip to content</a>
<header class="subsite-nav">
 <a class="brand" href="index.html" aria-label="Cosmic home"><img src="assets/Cosmic%20logo.png" alt="Cosmic" width="1280" height="480"></a>
 <div class="founders-header-actions"><button class="founders-signout" type="button" data-sign-out>Sign out <span aria-hidden="true">↗</span></button></div>
</header>
<main class="founders-page" id="page-content" data-protected-content hidden>
 <div class="founders-shell">
  <section class="founders-intro">
   <div><span class="auto-eyebrow">COSMIC / FOUNDER WORKSPACE</span><h1>Built together.<br><em>Owned with purpose.</em></h1><p>Ownership, capital and the next chapter of Cosmic.</p></div>
   <div class="founders-orbit" aria-hidden="true"><i></i><i></i><i></i><span>C</span><b></b></div>
  </section>
  <div class="founders-tabs" role="tablist" aria-label="Founder workspace">
   <button type="button" role="tab" id="cap-table-tab" aria-controls="cap-table-panel" aria-selected="true" data-workspace-tab="cap-table">Cap table</button>
   <button type="button" role="tab" id="fund-raises-tab" aria-controls="fund-raises-panel" aria-selected="false" tabindex="-1" data-workspace-tab="fund-raises">Fund raises</button>
   <button type="button" role="tab" id="due-diligence-tab" aria-controls="due-diligence-panel" aria-selected="false" tabindex="-1" data-workspace-tab="due-diligence">Due diligence</button>
   <button type="button" role="tab" id="accounts-tab" aria-controls="accounts-panel" aria-selected="false" tabindex="-1" data-workspace-tab="accounts">Books of accounts</button>
  </div>
  <section class="workspace-panel cap-table-panel" id="cap-table-panel" role="tabpanel" aria-labelledby="cap-table-tab" data-workspace-panel="cap-table">
   <div class="workspace-heading"><div><span class="auto-eyebrow">01 / OWNERSHIP</span><h2>Proposed cap table<button type="button" class="proposal-badge admin-edit" data-admin-message="cap-edit-status">Edit</button></h2><p id="cap-edit-status" class="admin-status" role="status"></p></div></div>
   <div class="ownership-ledger">
    <section class="founder-schedule" aria-labelledby="founder-schedule-title">
     <div class="ledger-heading founder-heading"><span class="ledger-number">01</span><div><h3 id="founder-schedule-title">The founding team</h3><p>Sweat equity and contribution awards.</p></div><p class="vesting-note"><strong>4-year vesting · 1-year cliff</strong><span>Applies to all founders</span></p></div>
     <div class="ledger-scroll"><table class="ownership-table"><thead><tr><th scope="col">Shareholder</th><th scope="col">Sweat equity</th><th scope="col">Contribution award</th></tr></thead><tbody>
      <tr><th scope="row"><span class="holder-icon">F</span><span>Primary founder<small>Founder</small></span></th><td>40<span>%</span></td><td>11<span>%</span><small>Pre-incorporation R&amp;D, IP and early capital contribution</small></td></tr>
      <tr><th scope="row"><span class="holder-icon">C</span><span>Co-founder<small>Founding partner</small></span></th><td>7.5<span>%</span></td><td><span class="award-qualifier">upto</span> 8<span>%</span><small>@$1.79M Post Money Valuation</small></td></tr>
      <tr><th scope="row"><span class="holder-icon optional">+</span><span>Second co-founder<small>Optional allocation</small></span></th><td>2.5<span>%</span></td><td class="allocation-empty">—<small>No contribution award specified</small></td></tr>
     </tbody></table></div>
     <div class="ledger-footnote"><span>Contribution basis</span><p>Founders and co-founders may be subject to additional shares that recognize IP, discounted capital, pre-incorporation expenses among other notable recorded contributions.</p></div>
    </section>
    <aside class="esop-reserve" aria-labelledby="reserve-title"><span class="reserve-label">02 / RESERVED FOR THE TEAM</span><h3 id="reserve-title">Room for<br><em>exceptional people.</em></h3><div class="reserve-value">5<span>%</span></div><p>ESOP pool · Reserved</p><button class="cap-table-expand" type="button" aria-expanded="false" aria-controls="esop-breakdown">Explore allocation <span aria-hidden="true">+</span></button><div class="esop-breakdown" id="esop-breakdown" hidden><div><span>Core tech team</span><strong>2%</strong></div><div><span>Legal team</span><strong>1%</strong></div><div><span>Management</span><strong>2%</strong></div></div></aside>
   </div>
   <section class="funding-schedule" aria-labelledby="funding-title"><div class="ledger-heading"><span class="ledger-number">03</span><div><h3 id="funding-title">The capital roadmap</h3><p>Proposed allocations for external investors.</p></div></div><div class="funding-rounds">
    <article><span class="round-step">ROUND 01</span><div class="round-title"><h4>Pre-seed</h4><span class="round-terms">$125k @ 7% &amp; $350k uncapped SAFE</span></div><strong>11<span>%</span></strong><p>External investors</p><div class="funding-references"><h5>Selected seed round funding references</h5><ul><li><b>Wordware</b><span>$30M raised · $150M valuation</span></li><li><b>Slingshot AI</b><span>$30M raised · $220M valuation</span></li><li><b>Collate</b><span>$30M raised · Uncapped</span></li></ul></div></article>
    <article><span class="round-step">ROUND 02</span><div class="round-title"><h4>Pre-Series A</h4><span class="round-terms">$25m @ $166m post-money</span></div><strong>15<span>%</span></strong><p>External investors</p></article>
    <article><span class="round-step">ROUND 03</span><div class="round-title"><h4>Series A</h4><span class="round-terms">$60m @ $600m post-money</span></div><div class="round-percentage"><strong>10<span>%</span></strong><details class="dilution-note"><summary aria-label="Read Series A dilution note">*</summary><p>Series A dilution is contributed by the existing board at that time, in line with the company’s then-current ownership structure.</p></details></div><p>External investors</p></article>
   </div></section>
  </section>
  <section class="workspace-panel workspace-empty" id="fund-raises-panel" role="tabpanel" aria-labelledby="fund-raises-tab" data-workspace-panel="fund-raises" hidden><span class="auto-eyebrow">Founder workspace</span><h2>Fund raises</h2><p>Data unavailable.</p></section>
  <section class="workspace-panel" id="due-diligence-panel" role="tabpanel" aria-labelledby="due-diligence-tab" data-workspace-panel="due-diligence" hidden>
   <div class="workspace-heading"><div><span class="auto-eyebrow">DUE DILIGENCE / PEOPLE</span><h2>Founders KYC</h2></div></div>
   <article class="founder-profile" aria-labelledby="founder-profile-title">
    <div class="ledger-heading"><span class="ledger-number">01</span><h3 id="founder-profile-title">Founder Profile</h3></div>
    <div class="profile-content"><img class="profile-portrait" src="assets/founder-profile.jpg" alt="Krishna Prasad Sidheeshwaran" width="180" height="180"><div class="profile-name-row"><h4>KRISHNA PRASAD SIDHEESHWARAN</h4><button type="button" class="proposal-badge admin-edit" data-admin-message="profile-edit-status">Edit Profile</button></div><p id="profile-edit-status" class="admin-status" role="status"></p></div>
   </article>
   <article class="founder-profile" aria-labelledby="cofounder-profile-title">
    <div class="ledger-heading"><span class="ledger-number">02</span><h3 id="cofounder-profile-title">Co-founder Profile</h3></div>
    <div class="profile-content"><div class="profile-portrait profile-portrait-empty" role="img" aria-label="Co-founder photo placeholder"></div><div class="profile-name-row"><h4>Full Name</h4><button type="button" class="proposal-badge admin-edit" data-admin-message="cofounder-edit-status">Edit Profile</button></div><p id="cofounder-edit-status" class="admin-status" role="status"></p></div>
   </article>
  </section>
  <section class="workspace-panel workspace-empty" id="accounts-panel" role="tabpanel" aria-labelledby="accounts-tab" data-workspace-panel="accounts" hidden><span class="auto-eyebrow">Founder workspace</span><h2>Books of accounts</h2><p>Data unavailable.</p></section>
 </div>
</main>
${siteFooter('subsite-footer', false)}
</body></html>`;

const selectedPage=process.argv.find(arg=>arg.startsWith('--page='))?.slice(7);
const publicPages = new Set(['intelligence.html','infrastructure.html','automotive.html','robotics.html','invention.html','login.html','board.html']);
if(selectedPage&&selectedPage!=='index.html'&&!publicPages.has(selectedPage))throw new Error('Unknown page: '+selectedPage);
mkdirSync('dist', {recursive:true});
const output = new Map();
if(!selectedPage||selectedPage==='index.html')output.set('index.html', index);
if(!selectedPage||selectedPage==='login.html')output.set('login.html', index);
for (const page of pages) if (publicPages.has(page.file)&&(!selectedPage||selectedPage===page.file)) output.set(page.file, subPage(page));
if ((!selectedPage || selectedPage === 'board.html')) output.set('board.html', boardPage);

for (const [file, html] of output) writeFileSync(`dist/${file}`, html);
for (const [file, html] of output) {
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:#|https?:|mailto:|tel:)/.test(url)) continue;
    const assetPath=decodeURIComponent(url.split(/[?#]/)[0]);
    if (!existsSync(resolve('dist', assetPath))) throw new Error(`${file} references missing file: ${assetPath}`);
  }
}
console.log(`Built and validated ${output.size} Cosmic page${output.size===1?'':'s'}.`);
