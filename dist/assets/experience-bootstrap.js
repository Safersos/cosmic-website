const intro = document.querySelector('.brand-intro');
let started = false;
const assetVersion = '20261003';
const experienceUrl = new URL(`./experience.js?v=${assetVersion}-preload`, import.meta.url).href;
const modelUrls = [
  `./actors/human.glb?v=${assetVersion}`,
  `./actors/casual-hoodie.gltf?v=${assetVersion}`,
  `./actors/casual-woman.gltf?v=${assetVersion}`,
  `./actors/husky.gltf?v=${assetVersion}`,
  `./ferrari.glb?v=${assetVersion}`
].map((url) => new URL(url, import.meta.url).href);

function warmExperienceCache() {
  const moduleLink = document.createElement('link');
  moduleLink.rel = 'modulepreload';
  moduleLink.href = experienceUrl;
  document.head.append(moduleLink);

  for (const href of modelUrls) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.append(link);
  }
}

function scheduleCacheWarmup() {
  if ('requestIdleCallback' in window) requestIdleCallback(warmExperienceCache, { timeout: 800 });
  else setTimeout(warmExperienceCache, 200);
}

function startExperience() {
  if (started) return;
  started = true;
  removeEventListener('scroll', maybeStartExperience);
  removeEventListener('resize', maybeStartExperience);
  import(experienceUrl).catch((error) => {
    console.error('The interactive experience could not start.', error);
    document.querySelector('#experience-loader')?.classList.add('is-ready');
  });
}

function maybeStartExperience() {
  if (scrollY > 0) startExperience();
}

if (!intro) startExperience();
else {
  addEventListener('scroll', maybeStartExperience, { passive: true });
  addEventListener('wheel', startExperience, { passive: true, once: true });
  addEventListener('touchstart', startExperience, { passive: true, once: true });
  maybeStartExperience();
}

if (document.readyState === 'complete') scheduleCacheWarmup();
else addEventListener('load', scheduleCacheWarmup, { once: true });
