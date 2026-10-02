# Cosmic Website — Design and Content Plan

## 1. Strategic direction

### The idea the website must make clear

Cosmic is developing **RF Perception-as-Infrastructure**: a distributed network of radio-frequency perception nodes, synchronization and calibration systems, reconstruction intelligence, and application interfaces that maintain a persistent, machine-readable three-dimensional model of physical space.

The site should not position Cosmic as:

- another radar company;
- a camera replacement with a single dramatic claim;
- a finished autonomous-driving product;
- a surveillance product; or
- a collection of unrelated automotive, robotics, and smart-city ideas.

The unifying product is the **RF Spatial World Model**. Vehicles, robots, city systems, digital twins, industrial software, and other AI systems are downstream consumers of that shared model.

### Core positioning sentence

> Cosmic is building a shared perception layer for the physical world—generated from distributed RF observations and delivered as infrastructure to machines and software.

### Short product explanation

> Spatially distributed RF nodes observe the same environment from different positions. Cosmic synchronizes and calibrates those observations, evaluates possible physical and propagation explanations, and maintains an uncertainty-aware 3D world model that downstream systems can query.

### Message hierarchy

1. **Outcome:** machines gain a wider, shared understanding of physical space.
2. **Architectural shift:** perception moves from individual machines into the environment.
3. **Mechanism:** distributed, multi-spectral RF observations are reconstructed into a persistent world model.
4. **Differentiation:** the system retains competing hypotheses, uncertainty, provenance, and actively chooses the next useful observation.
5. **Value:** many applications can consume one perception infrastructure.
6. **Current reality:** the proof of concept and model-development programme are in progress; deployed performance is not yet claimed.

## 2. Source-grounded product model

The public narrative should use five layers. These correspond closely to the full specification and its drawings.

### Layer 1 — Distributed observation

- Infrastructure-installed RF perception nodes.
- Active, passive, bistatic, multistatic, and hybrid sensing modes.
- Multi-spectral operation: lower frequencies for broader constraints and higher frequencies for finer spatial discrimination.
- Overlapping perception volumes and multiple transmitter–receiver geometries.

### Layer 2 — Trustworthy alignment

- Time, frequency, and phase relationships between nodes.
- Physical reference paths plus reciprocal over-the-air calibration.
- Local coherent subdomains combined through wider spatial/non-coherent fusion.
- Calibration state separated from physical-environment state.

### Layer 3 — Reconstruction intelligence

- Spatiotemporal RF Observation Graph.
- Candidate physical spatial hypotheses and candidate electromagnetic propagation hypotheses.
- Learned inverse models propose candidate states.
- Electromagnetic forward models predict what each candidate should produce.
- Residuals and physical constraints strengthen, weaken, split, merge, or eliminate candidates.

### Layer 4 — RF Spatial World Model

- Geometry and occupancy.
- Material/scattering state.
- Objects and kinematics.
- Confidence and uncertainty.
- Temporal state and persistence.
- Observation and calibration provenance.

### Layer 5 — Perception service

- APIs, spatial queries, event streams, local edge projections, and task-specific views.
- One underlying world model serving multiple independent downstream systems.
- Applications retain responsibility for task-specific planning, control, policy, and safety.

## 3. Audiences and the question each page must answer

| Audience | Primary question | Desired response |
|---|---|---|
| City and infrastructure partners | What would be installed, and how could it scale? | Request a deployment conversation |
| Automotive and autonomy teams | What context can infrastructure provide beyond onboard sensing? | Explore a POC/integration |
| Robotics and industrial teams | How does shared spatial context help fleets and facilities? | Discuss a pilot |
| RF, telecom, and hardware partners | Is the architecture technically serious and manufacturable? | Become a technical partner |
| Researchers | What is technically novel and what is being tested? | Review the invention and research programme |
| Investors and strategic partners | What is the platform, moat, and path to adoption? | Start a strategic conversation |
| Talent | Is this an ambitious, credible technical mission? | Contact the founder |
| General visitors and press | What is Cosmic in plain language? | Understand and remember the category |

## 4. Information architecture

### Primary navigation

- **Technology**
  - Intelligence
  - RF World Model
- **Infrastructure**
- **Applications**
  - Automotive
  - Robotics & Industry
  - Cities & Digital Twins
- **Research**
  - The Invention
  - Patent & Publications
- **Company**
  - Journey
  - Contact

On small screens, Technology, Applications, and Research become expandable groups. The primary header CTA is **Discuss a pilot**.

### Recommended public pages

1. `/` — Home
2. `/technology` — Intelligence / how reconstruction works
3. `/world-model` — what the shared model contains and exposes
4. `/infrastructure` — nodes, synchronization, calibration, deployment, compute
5. `/applications` — application overview and shared-platform thesis
6. `/automotive` — infrastructure-assisted mobility
7. `/robotics` — public-space robotics and industrial automation
8. `/cities-digital-twins` — smart infrastructure, operations, spatial analytics, digital twins
9. `/invention` — founder journey and evolution of the invention
10. `/research` — patent record, drawings, technical briefs, POC programme
11. `/company` — mission, current stage, principles, partnership types
12. `/contact` — structured enquiry routes

This is a full multi-page site. Pages share one design system and visual language, but each has a distinct narrative and visual mechanism.

## 5. Page-by-page content and experience plan

### 5.1 Home — “Perception, built into place”

**Job:** establish the category and route visitors to the right depth.

**Hero**

- Eyebrow: `RF PERCEPTION AS INFRASTRUCTURE`
- Headline: `A shared perception layer for the physical world.`
- Supporting copy: explain that distributed RF observations become a persistent 3D model for machines and software.
- CTAs: `See how it works` and `Explore applications`.

**Scroll experience**

1. A vehicle or robot enters a visually constrained scene.
2. Local perception reaches the edge of sight.
3. Infrastructure nodes illuminate complementary paths, including non-line-of-sight relationships.
4. Observations appear as distinct evidence edges, not generic radar waves.
5. Two competing scene hypotheses appear.
6. The system selects another node/frequency/viewpoint.
7. One hypothesis strengthens; uncertainty contracts.
8. The final scene becomes a layered RF Spatial World Model consumed by a car, robot, and digital twin.

The visual should introduce robots, people, vehicles, machinery, structures, and vegetation as world-model entities. It should avoid implying verified semantic recognition or safety performance unless test evidence exists.

**Content sections**

- The shift: perception moves from individual machines into shared infrastructure.
- Five-layer architecture overview.
- “One world model, many applications” cards.
- Current development status: simulation, RF ray tracing, LiDAR ground truth, model iteration.
- Research and patent CTA.
- Partnership CTA.

### 5.2 Technology — “From RF evidence to spatial understanding”

**Job:** explain the reconstruction loop without requiring RF expertise.

**Hero visual:** replace a closed-room scanning scene with an open urban scene that continuously transitions between:

1. measured RF observations;
2. the Spatiotemporal RF Observation Graph;
3. competing physical and propagation hypotheses;
4. predicted responses from the forward model;
5. residual comparison;
6. updated confidence and world state.

**Sections**

- RF is evidence, not a picture.
- Multipath becomes information: direct, reflected, scattered, diffracted.
- Inverse model proposes; forward model tests.
- Physics-informed and domain-aware constraints.
- Uncertainty drives the next observation.
- Experience memory: the network learns which experiments resolved similar ambiguity before.

**Signature diagram:** an interactive version of patent Figure 3, simplified into a six-stage horizontal pipeline. Clicking a stage reveals a technically accurate explanation and the associated data retained.

### 5.3 RF World Model — “A model with memory, uncertainty, and provenance”

**Job:** turn the output of the system into a tangible product.

**Hero visual:** a layered city model inspired by Figure 7. Visitors toggle layers:

- geometry;
- occupancy;
- materials/scattering;
- objects and motion;
- confidence;
- uncertainty;
- provenance;
- temporal history.

**Sections**

- What the world model contains: `W(x,t) = {G, M, O, K, C, U, P, H}` explained in plain language.
- Persistent entities across overlapping node regions.
- Resolved vs provisional vs stale state.
- Multi-resolution reconstruction: coarse everywhere, detail where needed.
- Historical reconstruction and virtual viewpoints.
- Application interface: query, stream, event, local edge projection.

**CTA:** `Explore the infrastructure that maintains the model`.

### 5.4 Infrastructure — “Different positions. One spatial frame.”

**Job:** explain physical deployment and systems engineering.

**Hero visual:** an urban corridor with overlapping perception volumes and coherence subdomains, based on Figures 1 and 2.

**Sections**

- The RF perception node: RF front end, antenna system, local processing, synchronization, calibration, network interface.
- Dual-aperture concept: transmission and reception paths with isolation/decoupling.
- Active, passive, bistatic, multistatic, and hybrid modes.
- Multi-spectral perception.
- Synchronization and calibration: physical reference plus reciprocal OTA calibration.
- Coherence subdomains: local phase-sensitive processing; wider spatial fusion.
- Overlapping deployment geometry and graceful degradation.
- Compute placement: node, regional, central.
- Deployment patterns: road corridor, campus, factory, port, building, tunnel.

**Design rule:** distances and overlap figures may be presented as embodiments from the patent, not universal deployment promises. Label examples such as `Representative embodiment: 50–500 m spacing` and `Representative overlap criterion: 30–60%`.

### 5.5 Applications overview — “One layer. Many systems.”

**Job:** make the platform economics and reuse story obvious.

**Visual:** one shared world-model core with independent application interfaces around it. Avoid a generic icon grid; use a spatial map where the same physical entity is interpreted differently by mobility, robotics, operations, and simulation.

**Sections**

- Shared sensing and reconstruction; application-specific decisions.
- Application cards: Automotive, Robotics & Industry, Cities & Digital Twins.
- Additional research directions: logistics, facilities, simulation, incident reconstruction.
- Clear statement: downstream applications remain responsible for control and safety decisions.

### 5.6 Automotive — “The road beyond the edge of sight”

**Job:** show why infrastructure-derived context matters to mobility.

**Hero visual:** junction scene with selectable views:

- onboard optical/local view;
- infrastructure observations;
- fused world-model view;
- uncertainty/provenance view.

**Narrative**

1. Onboard perception travels with the vehicle and is constrained by its current viewpoint.
2. Distributed infrastructure can observe the same road region from other positions.
3. The shared model can provide geometry, occupancy, trajectories, confidence, and uncertainty for the road ahead.
4. The vehicle evaluates that information alongside onboard systems.

**Sections**

- Non-line-of-sight context at corners and around occluders.
- Persistent object continuity across node regions.
- Ego-motion and local-frame limitations, explained carefully without claiming elimination of all localization problems.
- “Awareness before departure”: kilometres of model context can be available where infrastructure coverage exists.
- Compute offload thesis: explore how infrastructure may reduce duplicated sensing/reconstruction workload.
- Retrofit/fleet possibility: frame as a long-term product hypothesis requiring actuation, certification, integration, connectivity, and fail-safe systems—not an immediately available subscription.
- Vision Zero alignment: present as a potential contribution to safer-system design, not an endorsement or proven safety outcome.

**CTA:** `Discuss an automotive research or simulation partnership`.

### 5.7 Robotics & Industry — “Perception integrated into the workspace”

**Job:** cover both public-space robots and industrial automation without conflating them.

**Hero scroll story**

1. A sidewalk robot carries luggage while people and a dog cross its path.
2. A visual obstruction hides a road user from the robot.
3. Environmental nodes supply complementary evidence.
4. The robot receives a task-specific projection of the shared model.
5. The scene transitions into a factory/warehouse, retaining the same architecture.

**Sections**

- Public-space service robots.
- Warehouse AMRs and industrial co-bots.
- Workers, machinery, equipment, occupancy, and trajectories in one spatial representation.
- Shared fleet context and continuity across a facility.
- Conditions where non-optical sensing can complement local sensors.
- Edge delivery for low-latency task-specific state.

Avoid absolute phrases such as “zero latency,” “works seamlessly through all walls,” or “100% awareness.”

### 5.8 Cities & Digital Twins — “A living model of place”

**Job:** show the larger infrastructure platform beyond vehicles and robots.

**Sections**

- Urban corridors and shared physical context.
- Infrastructure and facility monitoring.
- Spatial analytics without exposing conventional RGB imagery as the primary representation.
- Digital-twin state that updates from distributed observations.
- Historical spatial reconstruction for authorized use.
- Simulation and AI training interfaces.
- Privacy by representation and access control, not by claiming RF is inherently anonymous.

**Visual:** a city block switching between current model, uncertainty, temporal history, and application overlays.

### 5.9 The Invention — “From a sensing idea to a perception layer”

**Job:** tell the founder and invention story without turning the page into a patent dump.

**Timeline**

- Initial question: can physical environments contribute perception without placing a camera on every machine?
- Research into RF physics, spatial computing, and distributed architecture.
- Provisional filing: Indian Provisional Patent Application No. **202641045220**, filed **8 April 2026**.
- Evolution from variable-geometry MIMO/SecureTower and SOS-oriented reconstruction into a general RF Perception-as-Infrastructure architecture.
- Full specification: distributed nodes, world model, hypothesis-driven sensing, adaptive compute, and multi-application interfaces.
- Current development: CARLA, NVIDIA Sionna, RF ray tracing, LiDAR ground truth, and model iteration.
- Next: RF-to-3D POC, digital-twin benchmark, hardware prototypes, and real-world deployment.

**Critical content distinction**

The provisional document described a narrower SecureTower concept with variable antenna gaps, biological dielectric signatures, edge/cloud processing, and SOS response. The full specification generalizes and strengthens the architecture around distributed multi-spectral sensing, synchronization, calibration, hypothesis management, forward/inverse reconstruction, uncertainty, provenance, dynamic sensing, and a shared world model. This evolution is the story.

**Visual:** a left-to-right morph from one tower and a probability cloud into a distributed network, observation graph, layered world model, and application ecosystem.

### 5.10 Research — “The technical record”

**Job:** provide credibility, source access, and transparent status.

**Sections**

- Full invention title.
- Patent record with a precise distinction between provisional application number and complete-specification filing details.
- Patent PDF download.
- Separate drawings viewer for Figures 1–7.
- Figure summaries:
  1. overall architecture;
  2. coherence subdomains and fusion;
  3. observation graph and hypothesis reconstruction;
  4. closed-loop dynamic perception;
  5. multi-spectral, multi-resolution reconstruction;
  6. canonical uncertainty-driven sensing loop;
  7. physical environment to layered world model.
- Technical briefs derived from the filing: synchronization, multi-spectral reconstruction, dynamic interrogation, uncertainty/provenance, historical reconstruction.
- Indian Patent Search portal link with clear instructions.
- Development status and future benchmark methodology.

Do not publish a complete-application number until it is verified from the filing receipt or public record. The supplied full specification establishes priority to provisional application `202641045220`, but does not display a separate complete-application number in the extracted text.

### 5.11 Company — “Building infrastructure for machine perception”

**Job:** make the business and current stage legible.

**Sections**

- Mission.
- Founder story in concise third-person form.
- Current stage: research and POC development.
- Partnership needs: RF hardware, telecom infrastructure, simulation, automotive, robotics, municipalities/campuses, academic validation.
- Principles: uncertainty-aware, provenance-preserving, privacy-oriented, application-neutral.
- Contact CTA.

### 5.12 Contact — “Build the first deployments with us”

**Job:** qualify serious conversations.

**Form routes**

- Research collaboration.
- RF hardware/manufacturing.
- Automotive or robotics integration.
- Infrastructure/site pilot.
- Investment/strategic partnership.
- Media/general.

Required fields: name, work email, organization, role, area of interest, message. Optional: deployment geography and timeline. Include direct email and WhatsApp only if the founder wants public inbound through those channels.

## 6. Design system and visual language

### Preserve from the current site

- restrained mineral/teal palette;
- editorial typography;
- generous whitespace;
- technical linework;
- cinematic scroll pacing;
- subtle grain and luminous RF accents;
- quiet, serious tone rather than conventional SaaS gradients.

### Extend the system

- **Evidence lines:** thin directed paths for transmitter–receiver observations.
- **Hypothesis states:** multiple translucent geometries with visible confidence weights.
- **Uncertainty:** volumetric haze, contour density, or voxel opacity—not red warning graphics everywhere.
- **Provenance:** selectable evidence paths back to nodes and timestamps.
- **Coherence subdomains:** softly bounded geographic regions with local phase-linked nodes.
- **World-model layers:** stacked transparent planes inspired by Figure 7.
- **Technical annotations:** small monospaced labels, coordinates, confidence, frequency, and state.

### Page distinction

| Page family | Dominant visual motif |
|---|---|
| Home | cinematic journey from local view to shared model |
| Technology | observation graph and hypothesis loop |
| World Model | layered spatial state and toggles |
| Infrastructure | nodes, coverage, coherence domains, deployment |
| Applications | task-specific projections from one shared core |
| Invention | timeline and architectural evolution |
| Research | drawings, equations, evidence, benchmark status |

### 3D implementation guidance

- Keep the existing vanilla Three.js stack unless a broader frontend rewrite is separately approved.
- Use a shared scene framework with page-specific scene modules.
- Target approximately 60 fps desktop and 30–60 fps mobile.
- Keep active desktop geometry below roughly 500k triangles and mobile below 100k.
- Compress GLB assets and lazy-load scenes below the fold.
- Provide static poster frames for reduced-motion, low-power, and no-WebGL conditions.
- Every canvas needs a meaningful text alternative; core content must remain available without WebGL.
- 3D should explain architecture or state change. Pure decoration should be CSS/SVG.

## 7. Content voice

### Voice attributes

- precise;
- ambitious;
- calm;
- systems-oriented;
- transparent about current maturity;
- accessible without diluting technical depth.

### Preferred language

- `is developing`, `is designed to`, `the architecture supports`, `the research explores`;
- `shared perception layer`, `RF Spatial World Model`, `distributed observations`;
- `confidence, uncertainty, and provenance`;
- `complements onboard or local sensing`;
- `candidate hypotheses are evaluated and updated`.

### Avoid until independently validated

- `100% awareness`;
- `zero latency`;
- `completely occlusion-free`;
- `works through any wall`;
- `forensic-grade`;
- `full AV capabilities through a subscription` as a present product;
- `privacy guaranteed`;
- `replaces cameras/LiDAR`;
- specific detection range, resolution, accuracy, or safety-improvement claims without test evidence.

## 8. Patent, privacy, and claim-handling rules

- Label patent-derived descriptions as architecture, embodiments, or filed concepts.
- Distinguish the provisional application from the later complete specification.
- Publish only verified application/publication numbers.
- State that patent publication is not the same as patent grant.
- Do not expose residential addresses from the filings on the public website.
- Do not imply every embodiment will be included in the first product.
- Describe privacy as a design approach: non-optical primary representation, controlled output fields, access control, retention policy, and application-layer governance.
- Acknowledge that RF data can contain sensitive information; avoid claiming inherent anonymity.
- Historical reconstruction should be presented with authorization, governance, integrity, retention, and legal controls.

## 9. Conversion architecture

Each page should end with one primary next action and one contextual next read.

| Page | Primary CTA | Secondary route |
|---|---|---|
| Home | Discuss a pilot | See how it works |
| Technology | Explore the world model | Read the invention |
| World Model | View infrastructure | Explore applications |
| Infrastructure | Discuss a deployment | Read technical briefs |
| Applications | Select an application | Discuss integration |
| Automotive | Discuss a simulation/POC | View infrastructure |
| Robotics | Discuss a facility or fleet pilot | Explore the world model |
| Cities & Digital Twins | Discuss a site pilot | View privacy approach |
| Invention | Read the patent record | Contact the founder |
| Research | Download specification | Propose collaboration |
| Company | Partner with Cosmic | View research |

## 10. SEO and public discoverability

### Core topic clusters

- RF perception infrastructure;
- distributed RF sensing;
- RF spatial world model;
- radio-frequency 3D reconstruction;
- infrastructure-assisted autonomous perception;
- non-line-of-sight spatial sensing;
- RF perception for robotics;
- privacy-oriented physical-world perception;
- dynamic RF interrogation;
- physics-informed RF reconstruction.

Each page needs a unique title, meta description, canonical URL, Open Graph image, and meaningful heading structure. Add Organization, WebSite, BreadcrumbList, and TechArticle structured data where appropriate. Patent and research pages should expose downloadable documents through descriptive links rather than generic “download” labels.

## 11. Accessibility and performance requirements

- WCAG 2.2 AA target.
- Full keyboard navigation and visible focus states.
- `prefers-reduced-motion` mode with no loss of information.
- No essential message only inside canvas animation.
- Text contrast of at least 4.5:1 for body copy.
- Captions/transcripts for motion sequences.
- Lazy-load 3D page experiences; prioritize text and navigation.
- LCP target below 2.5 seconds on a representative mid-range mobile connection.
- Static poster image shown immediately while 3D assets load.
- Mobile DPR capped at 1 where needed; adaptive quality for particle count, shadows, and model complexity.

## 12. Analytics and learning plan

Track:

- audience-path selection from Home;
- Technology → Research progression;
- Application page engagement;
- patent/drawing downloads;
- CTA conversions by partnership type;
- 3D scene completion and reduced-motion usage;
- device performance and scene fallback rate;
- contact-form completion and qualified enquiry source.

Do not use invasive session replay by default. Analytics choices should align with the privacy-oriented positioning.

## 13. Required content and assets before final build

### Required from the founder

- verified complete-specification application/publication number;
- permission and preferred filename for public patent PDFs;
- confirmation that patent publication status may be stated publicly;
- approved founder biography and portrait, if desired;
- current POC status and exactly what can be demonstrated today;
- benchmark plan and which metrics may be published;
- public contact channels;
- partnership categories and geographic focus;
- legal entity name and registered business details for footer/privacy pages.

### Visual assets to produce

- clean redraws of Figures 1–7 for web use, preserving technical meaning;
- RF perception node concept renders clearly labelled as concepts;
- observation-graph animation;
- hypothesis-discrimination animation;
- layered world-model city scene;
- automotive junction scene;
- public-space robotics scene;
- industrial facility scene;
- static and reduced-motion poster frames for each scene.

## 14. Recommended delivery phases

### Phase 1 — Content foundation

- Approve positioning, sitemap, terminology, and claim rules.
- Verify patent metadata.
- Produce final page copy and source citations.
- Define current-vs-future product status on every application page.

### Phase 2 — Design system and reusable templates

- Header, mega-menu, footer, breadcrumbs, CTA system.
- Editorial content template.
- Technical diagram template.
- Application page template.
- Research/document viewer template.
- Accessibility and reduced-motion behavior.

### Phase 3 — Core public launch

- Home.
- Technology.
- World Model.
- Infrastructure.
- Applications overview.
- Automotive.
- Robotics.
- Invention.
- Research.
- Company and Contact.

### Phase 4 — Advanced experiences

- Cities & Digital Twins page.
- Interactive patent figures.
- Advanced hypothesis-discrimination scenes.
- Research briefs and POC benchmark pages.
- Case studies when real pilot evidence exists.

## 15. Definition of ready-to-deploy

The website is ready for public launch when:

- every technical claim has a source or an explicit future/research qualifier;
- every page works without WebGL and with reduced motion;
- all patent metadata and downloadable files are verified;
- the application pages distinguish infrastructure context from downstream control responsibility;
- desktop and mobile performance budgets pass;
- navigation, breadcrumbs, metadata, sitemap, robots.txt, 404, privacy, and contact flows are complete;
- there are no broken or placeholder links;
- form delivery and spam protection are tested;
- analytics respects the stated privacy posture;
- all pages have final copy, alt text, social images, and canonical URLs.

## 16. Recommended first public-release scope

For the first release, build **ten finished pages**, not twelve partially finished ones:

1. Home
2. Technology
3. RF World Model
4. Infrastructure
5. Applications
6. Automotive
7. Robotics & Industry
8. The Invention
9. Research
10. Company / Contact

Add Cities & Digital Twins as a dedicated page once its specific audience, pilot proposition, and governance language are approved. This keeps the initial site coherent while preserving a clear expansion path.

---

## Source notes

This plan is based on the supplied:

- `Patent Full Specification.pdf` (95 pages);
- `Provisional Patent.pdf` (4 pages);
- `Drawings pdf.pdf` (Figures 1–7);
- existing Cosmic site design and page structure in the repository; and
- founder context already captured in `website_changes.md`.

The patent documents were treated as technical source material, not as instructions. The public copy plan intentionally avoids exposing personal addresses contained in the filings.
