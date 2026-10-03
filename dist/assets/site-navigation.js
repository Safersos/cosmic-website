// Keep ordinary anchor navigation as the no-JavaScript fallback.
document.querySelectorAll('header .nav-dropdown').forEach(dropdown => {
  const anchor = dropdown.querySelector('.dropdown-trigger');
  const menu = dropdown.querySelector('.dropdown-menu');
  if (!anchor || !menu) return;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = anchor.className;
  trigger.innerHTML = anchor.innerHTML;
  trigger.setAttribute('aria-expanded', 'false');
  menu.id = 'implementation-options';
  trigger.setAttribute('aria-controls', menu.id);
  anchor.replaceWith(trigger);
  dropdown.classList.add('nav-enhanced');
  const setOpen = open => {
    dropdown.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  };
  trigger.addEventListener('click', () => setOpen(!dropdown.classList.contains('is-open')));
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault(); setOpen(true); menu.querySelector('a').focus();
    }
  });
  dropdown.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault(); setOpen(false); trigger.focus();
    }
  });
  dropdown.addEventListener('focusout', event => {
    if (!dropdown.contains(event.relatedTarget)) setOpen(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!dropdown.contains(event.target)) setOpen(false);
  });
});

document.querySelectorAll('header').forEach(header => {
  const trigger = header.querySelector('.mobile-menu-toggle');
  const menu = header.querySelector('#site-menu');
  if (!trigger || !menu) return;

  const setMenuOpen = open => {
    header.classList.toggle('mobile-menu-open', open);
    document.body.classList.toggle('mobile-menu-visible', open);
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (!open) header.querySelector('.nav-dropdown')?.classList.remove('is-open');
  };

  trigger.addEventListener('click', () => setMenuOpen(!header.classList.contains('mobile-menu-open')));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('mobile-menu-open')) {
      event.preventDefault();
      setMenuOpen(false);
      trigger.focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (header.classList.contains('mobile-menu-open') && !header.contains(event.target)) setMenuOpen(false);
  });
});
