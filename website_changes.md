# Cosmic Website Changes Specification

This document outlines the requested updates to the Cosmic website. It is organized page by page and section by section to facilitate straightforward implementation by the web developer.

## 1. Home Page (`index.html`)

### (i) Scene / Animation Changes (Scroll Experience)
- **Junction Scene Addition 1:** As the car approaches the junction where the dog and other objects appear, add a **robot on the sidewalk interacting with two humans** (e.g., talking or carrying items for them). 
  - *Timing trigger:* This robot should appear exactly when the text *"Let the Environment Contribute."* fully appears on screen.
- **Junction Scene Addition 2:** As the car and environment move further forward, add **another robot walking on the sidewalk** (footpath).
- **End Scene Transition:** Towards the end frames of the animation, the robot should return to the scene styled as a **wireframe** (or similar visual representation).

### (ii) UI Component Updates
- **Radar UI Updates:** Currently, the radar shows labels like `Vehicle`, `Dog`, `Pedestrian`, and `Structure`. 
  - **Action Required:** Add new labels for `Robot`, `Machine`, and `Tree`. Ensure the radar continues to accurately animate and seamlessly cycle through these new labels as if performing active, real-time sensing.

*(Note: All other textual copy changes for the Home Page have already been completed directly in the HTML).*

---

## 2. Intelligence Page (`intelligence.html`)

### (i) Hero Section Animation
- **Redo Animation:** Currently, the animation shows a closed room with an object being scanned. This needs to be replaced with a more relevant "Intelligence" related animation derived from the Cosmic Patent specification.
- **Action Required:** Please refer to the full patent specification document you have on file and redo this hero section animation to visually represent those concepts accurately.

*(Note: The link for "Explore the Invention" has already been added in the HTML, and the footer text has been corrected to match the Home page).*

---

## 3. New Page Creation: Invention Page (`invention.html`)

- **Page Purpose:** This page tells the full story of Cosmic's evolution from non-invasive public surveillance tech to a world perception layer. It will not be in the main footer or nav menu, but is accessible via specific contextual links.
- **Content & Copy Requirements:**
  - Utilize the provisional patent and the full patent specification (provided separately) to detail the evolution of the technology.
  - **Analyze and Extract the Founder's Story:** Use the following background information provided by the founder to design visual storytelling elements (like timelines, diagrams, or milestone markers). Do *not* paste this text verbatim in the first person; instead, distill this narrative into an engaging visual journey:
    > "I’ve been working full-time on Cosmic for over 18 months. I spent roughly the first year researching the underlying physics and system architecture and discussing the approach with senior academics and researchers with relevant telecom, aerospace and RF experience.
    > 
    > I filed a provisional patent in April 2026, followed by the full patent specification in September 2026; the patent application has now been published in the Indian Patent Journal. I have also worked with specialized RF hardware manufacturers in China and Taiwan to evaluate the manufacturability and production requirements for the custom RF, synchronization and distributed-compute infrastructure.
    > 
    > In parallel, I’m building our first end-to-end proof of concept using CARLA and NVIDIA Sionna, with RF ray-tracing and LiDAR ground truth. I’ve built the core AI/physics inference architecture and am currently generating training data and iterating the core AI models.
    > 
    > The immediate milestone is completing the POC and demonstrating RF observations being converted into a reconstructed 3D world model, then benchmarking the reconstruction against an NVIDIA-Omniverse-based digital-twin pipeline. This will be followed by physical hardware prototypes and a real-world deployment."
  - **Mathematical & Visual Deep Dive:** The page must be very compelling visually. Deep dive into the full patent specification to extract important mathematics and formulas related to the core AI/physics inference architecture. Ensure these mathematical concepts are included cleanly and visually (e.g., stylized equations, geometric overlays, or diagrams) to highlight the technical rigor behind the invention.
- **Resources & Links to Include:**
  - Provide a prominent option/button for visitors to **download the full patent specification document as a PDF**.
  - Display the **patent application number**.
  - Include a link to the Indian Patent Search portal (`https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus`). Add instructions encouraging visitors to enter the application number there to verify the filing and stay updated with the patent grant journey.

---

## 4. Implementation Page -> Automotive (`automotive.html`)

- **New Content Section:** Add a new section to this page that communicates the following narrative and research:
  - **Research & Context:** Investigate and explain why most current Autonomous Vehicles (AVs) are Electric Vehicles (EVs) (i.e., the requirement of heavy battery packs to support power-hungry on-board compute).
  - **Cosmic's Value Proposition:** Draw a narrative explaining that with Cosmic's smart city infrastructure implemented, this heavy compute is moved off the vehicle and into the infrastructure.
  - **The Vision (AV for Gas-Powered Vehicles):** Because of this offloading, even non-EV (fading gas-powered) vehicles can attain AV capabilities. Vehicle owners will simply need to install OEM or aftermarket drive-by-wire and actuation hardware in their existing cars and subscribe to Cosmic's infrastructure (as easily as subscribing to Netflix) to get full AV capabilities. This preserves gas-powered vehicles and halts the forced adaptation of EVs.

  - **Ego-Motion & NLOS Capabilities:** Discuss the problems with ego-motion in existing AVs and contrast it with the Non-Line-of-Sight (NLOS) capabilities of Cosmic's distributed RF-based world perception model.
  - **Scenario Visualization/Description:** Include a scenario where a car starting at home instantly receives kilometers of road spatial awareness and real-time updates as it moves. Explain how the distributed nodes across the city combine their observations to recreate the world perception model, preparing the vehicle for every possible hindrance on the road, completely occlusion-free.
  - **Vision Zero Alignment:** Mention that safety initiatives like "VISION ZERO" in Texas can benefit greatly from Cosmic's infrastructure and AI World Recreation Engine.

*(Note: The text update for "The road does not end at the edge of sight" section, the removal of the disclaimer, and the footer update have already been completed directly in the HTML).*

---

## 5. Implementation Page -> Robotics (`robotics.html`)

- **Hero Section Animation:** Replace the current hero animation (which is a duplicate from the Intelligence page) with a new, scrollable animation experience similar to the Home page.
  - **Scenario Visualization:** The animation must show a real-world scenario where robots and humans are actively interacting on the road (e.g., robots walking dogs, carrying luggage, or assisting at a gym).
- **Industrial Robotic Automation Section:** Maintain the current text regarding industrial robotics and automation (as the messaging is already solid), but pair it with a simpler, highly impressive visualization.
- **Content Expansion:** This page majorly needs graphics and animation additions to be highly impressive. Derive more content and text as necessary and relevant from the patent specification document to support these visuals.

*(Note: The footer update has already been completed directly in the HTML).*

---

## 6. Global Site Changes (All Pages)

- **Header Link Update ("The Journey"):** In the top navigation header on all non-home pages, there is an existing link called "The Journey" (which currently points to the Home page). Update this link so it points to the new `invention.html` page instead. Ensure its visibility behavior remains exactly as is (visible only on non-home pages).
- **Footer Standardization:** Ensure that the exact footer currently implemented on the Home page (`© 2026 Cosmic` and `RADIO-FREQUENCY PERCEPTION AS INFRASTRUCTURE`) is universally applied to all other pages across the website without any variations or further changes.
- **Footer Contact Icons:** In the center of the footer (on all pages), add an Email icon/logo and a WhatsApp icon/logo. 
  - The Email icon must link to `mailto:founder@cosmicperception.com?subject=Contact%20Cosmic`.
  - The WhatsApp icon must link to `https://wa.me/krishnaprasad03`.
- **Design Consistency:** Maintain the exact same design language, central theme, color palette, and typography across all new pages (`invention.html`) and all additions to existing pages. The current aesthetic must be strictly preserved.

---

*Note: More changes to be added to this document based on pending requirements.*

## Implementation record — 2 October 2026: Global header and footer

- “The Journey” links to `invention.html` from the main navigation and footer on all non-home pages. Home's 3D walkthrough has no Journey navigation or footer link.
- All six pages share the Home wording: `© 2026 Cosmic` and `RADIO-FREQUENCY PERCEPTION AS INFRASTRUCTURE`, with centered email and WhatsApp SVG icons using the exact requested URLs.
- Shared source: `site-chrome.mjs`; styling: `dist/assets/site-chrome.css`. Current HTML and build templates are synchronized without rewriting page bodies.
- Verified desktop/mobile layout, icon click targets (including Home's animation overlay), identical footer markup across all pages and the Journey destination.

## Implementation record — 2 October 2026: Automotive research

- Expanded the compute, retrofit, ego-motion/NLOS and Vision Zero draft sections into a research-backed narrative and interactive home / blind-turn / node-handoff diagram. Preserved the existing perspective section, hero and footer.
- Sources: NVIDIA DRIVE documentation, Waymo's vehicle history, collaborative-perception research, Austin Vision Zero and NHTSA safety guidance; links appear beside the relevant claims.
- Corrected the unsupported battery prerequisite claim. Shared RF reconstruction, powertrain-neutral integration and subscription access are presented as the vision; no guaranteed retrofit autonomy, universal NLOS visibility, crash reduction or municipal partnership is asserted.
- Source: `automotive-research.mjs`, shared with the build template and current deployed-folder HTML. New visual assets: `dist/assets/automotive-research.css` and `.js`. No additional WebGL scene or dependency.
- Chrome validation passed: desktop, 390px/320px layouts, keyboard interaction, three diagram stages, marker positions, mobile map navigation, reduced motion, hero rendering, source/HTML parity and runtime/asset checks.

## Implementation record — 2 October 2026: Invention page

- Added `dist/invention.html`: SecureTower origins, evolution into shared RF perception, a founder-story timeline, an interactive observation/inference/physics/adaptation diagram, source-linked patent equations, and the current CARLA/Sionna proof-of-concept pipeline.
- Included the original 95-page complete specification at `dist/assets/documents/Cosmic-Full-Specification.pdf`, application number `202641045220`, a copy-number control, and the requested Indian Patent Search link and verification instructions.
- Added contextual access from Intelligence and Journey links in the non-home navigation and footers. Home's 3D walkthrough remains excluded.
- Publication milestones are attributed to the founder's account; future proof-of-concept, benchmarking and hardware work are distinguished from completed milestones.
- Page source: `invention-content.mjs`; scoped regeneration: `node build-pages.mjs --page=invention.html`. This avoids rewriting existing pages edited directly in HTML.
- Verified in Chrome: desktop/mobile layout, reduced motion, diagram controls, clipboard, contextual navigation, PDF MIME type and byte-for-byte matching against the supplied document. No runtime or asset-loading errors.

## Implementation record — 2 October 2026: High-priority design audit fixes

- Restored Home navigation on mobile and removed dropdown clipping on all non-home pages. Shared Implementation controls now support touch, keyboard opening, Escape, focus departure and outside-click dismissal; ordinary links remain the no-JavaScript fallback.
- Removed the decorative chrome mesh containing the rear manufacturer badge, plus numbered wheel-center branding nodes. Body, lights and wheel rims remain intact.
- Accelerated Home's scroll-following controller and integrated elapsed time in bounded physics substeps. Camera, material visibility and radar use the same travel state; returning to the intro immediately resets the radar. Wheel angular steps remain restrained during large chapter jumps.
- Simplified the RF car to body edges and wheel outlines, excluded invisible geometry and removed the ego vehicle from the cockpit view. The exterior outline returns only during the aerial transition; optical body fading no longer produces ghost surfaces.
- Updated current HTML and scoped build templates without regenerating or rewriting page copy. No new rendering library or model asset was added, following the 3D experience guidance to reduce geometry overhead.
- Chrome checks passed for all six pages at 320, 390, 768 and 1440px: navigation visibility, dropdown hit targets, keyboard behavior and horizontal overflow. Home rendering passed optical, junction, cockpit and aerial stages, with no runtime errors; reversing to the intro cleared radar opacity to zero. Controller tests settle a full-page jump in approximately 0.35–0.5 seconds at tested frame intervals.
- Medium-priority audit findings remain outside this fix pass. These changes are local; no Git push or public deployment was performed.
