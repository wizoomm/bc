(function () {
  const headerEl = document.querySelector('header');
  const burgerBtn = document.getElementById('burgerBtn');
  const navEl     = document.getElementById('siteNav');

  if (!headerEl || !burgerBtn || !navEl) return;

  burgerBtn.addEventListener('click', function () {
    const opened = headerEl.classList.toggle('nav-open');
    burgerBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });

  navEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      headerEl.classList.remove('nav-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      headerEl.classList.remove('nav-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();
