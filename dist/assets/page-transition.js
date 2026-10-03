(() => {
  const body = document.body;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wash = document.createElement('div');
  wash.className = 'page-wash';
  wash.setAttribute('aria-hidden', 'true');
  body.prepend(wash);

  document.querySelectorAll('a[href]').forEach((link) => link.addEventListener('click', (event) => {
    if (reduced || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== location.origin || url.pathname === location.pathname) return;
    event.preventDefault();
    body.classList.add('is-leaving');
    setTimeout(() => location.assign(url.href), 280);
  }));

  addEventListener('pageshow', () => body.classList.remove('is-leaving'));
})();
