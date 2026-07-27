// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Rotating hero title =====
(function rotate() {
  const el = document.getElementById('rotator');
  if (!el) return;
  const words = ['Marketer', 'Strategist', 'Writer', 'Cyclist', 'Problem-Solver', 'Pro Claude User'];
  let i = 0;
  setInterval(() => {
    el.classList.add('swap');
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove('swap');
    }, 400);
  }, 2600);
})();

// ===== Theme toggle (persisted) =====
(function theme() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  // Midnight & Gold: default to the signature dark look unless the visitor chose otherwise
  root.setAttribute('data-theme', saved || 'dark');
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// ===== Active section highlight in sidebar =====
(function activeNav() {
  const links = [...document.querySelectorAll('.sidebar__link')];
  const map = new Map(links.map(l => [l.getAttribute('href').slice(1), l]));
  const sections = [...map.keys()].map(id => document.getElementById(id)).filter(Boolean);

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('is-active'));
        map.get(e.target.id)?.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
})();

// ===== Reveal on scroll =====
(function reveal() {
  const items = document.querySelectorAll('.card, .tl-item, .proj, .skills__group, .section__title, .contact__lede');
  items.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => obs.observe(el));
})();
