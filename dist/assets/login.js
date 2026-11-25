(async () => {
  const loginPath = '/login';
  const boardPath = '/board';
  let opener;

  const close = () => {
    const sheet = document.querySelector('.login-sheet');
    if (!sheet) return;
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('login-open');
    if (location.pathname === loginPath) history.replaceState({}, '', '/');
    opener?.focus();
  };

  const open = trigger => {
    const sheet = document.querySelector('.login-sheet');
    if (!sheet) return;
    opener = trigger || document.activeElement;
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    document.body.classList.add('login-open');
    sheet.querySelector('input')?.focus();
  };

  const render = () => {
    if (document.querySelector('.login-sheet')) return;
    const sheet = document.createElement('div');
    sheet.className = 'login-sheet';
    sheet.setAttribute('aria-hidden', 'true');
    sheet.innerHTML = `<section class="login-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="login-title"><div class="login-sheet__signal" aria-hidden="true"><i></i><i></i><i></i><b>C</b></div><div class="login-sheet__heading"><div><span class="login-sheet__eyebrow">Cosmic / Private workspace</span><h2 id="login-title">Enter the<br><em>boardroom.</em></h2><p>Your private view of Cosmic’s capital architecture and founder records.</p></div><button class="login-sheet__close" type="button" aria-label="Close access panel">×</button></div><form><label>Founder ID<input name="username" type="text" autocomplete="username" required></label><label>Password<span class="password-field"><input name="password" type="password" autocomplete="current-password" required><button class="password-toggle" type="button" aria-label="Show password" aria-pressed="false"><span aria-hidden="true">◉</span></button></span></label><button class="login-sheet__submit" type="submit"><span>Access workspace</span><i aria-hidden="true">↗</i></button><p class="login-sheet__error" aria-live="polite"></p></form></section>`;
    document.body.append(sheet);
    sheet.querySelector('.login-sheet__close').addEventListener('click', close);
    sheet.addEventListener('click', event => { if (event.target === sheet) close(); });
    const password = sheet.querySelector('input[name="password"]');
    const passwordToggle = sheet.querySelector('.password-toggle');
    passwordToggle.addEventListener('click', () => {
      const showing = password.type === 'text';
      password.type = showing ? 'password' : 'text';
      passwordToggle.setAttribute('aria-pressed', String(!showing));
      passwordToggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
      passwordToggle.querySelector('span').textContent = showing ? '◉' : '◉̸';
      password.focus();
    });
    sheet.querySelector('form').addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const values = new FormData(form);
      const error = form.querySelector('.login-sheet__error');
      try {
        const response=await fetch('/api/workspace?action=login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(values))});
        const result=await response.json();
        if(response.ok) { location.href=boardPath; return; }
        error.textContent=result.error;
      } catch { error.textContent='Unable to connect. Please try again.'; }
      form.elements.password.select();
    });
  };

  render();
  document.querySelectorAll('[data-login-open]').forEach(button => button.addEventListener('click', () => {
    const onHome = location.pathname === '/' || location.pathname.endsWith('/index.html');
    if (!onHome && location.pathname !== loginPath) {
      location.assign(loginPath);
      return;
    }
    if (onHome) history.pushState({}, '', loginPath);
    open(button);
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && document.querySelector('.login-sheet.is-open')) close(); });

  const protectedContent = document.querySelector('[data-protected-content]');
  if (protectedContent) {
    let session;
    try { const response=await fetch('/api/workspace'); if(response.ok) session=await response.json(); } catch {}
    if (!session) {
      location.replace(loginPath);
    } else {
      protectedContent.hidden = false;
      window.cosmicSession=session;
      window.dispatchEvent(new CustomEvent('workspace-ready',{detail:session}));
      const tabs = [...document.querySelectorAll('[data-workspace-tab]')];
      const panels = [...document.querySelectorAll('[data-workspace-panel]')];
      const selectTab = name => {
        tabs.forEach(tab => {
          const selected = tab.dataset.workspaceTab === name;
          tab.setAttribute('aria-selected', String(selected));
          tab.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(panel => { panel.hidden = panel.dataset.workspacePanel !== name; });
      };
      tabs.forEach(tab => tab.addEventListener('click', () => selectTab(tab.dataset.workspaceTab)));
      const esopButton = document.querySelector('.cap-table-expand');
      const esopBreakdown = document.querySelector('#esop-breakdown');
      esopButton?.addEventListener('click', () => {
        const expanded = esopButton.getAttribute('aria-expanded') === 'true';
        esopButton.setAttribute('aria-expanded', String(!expanded));
        esopBreakdown.hidden = expanded;
      });
      document.querySelector('[data-sign-out]')?.addEventListener('click', async () => {
        const response=await fetch('/api/workspace?action=logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
        if(response.ok) location.replace('/');
      });
    }
  }
  if (location.pathname === loginPath || location.hash === '#login') open();
})();
