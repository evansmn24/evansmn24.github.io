document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile nav ---
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // --- Reveal on scroll ---
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
        });
      }, { threshold: 0.12 })
    : null;
  const reveal = el => {
    el.classList.add('reveal');
    if (observer) observer.observe(el); else el.classList.add('in');
  };
  document.querySelectorAll('[data-reveal]').forEach(reveal);

  // --- Footer year ---
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // --- Publications (from publications.json, refreshed weekly from Google Scholar) ---
  const featuredEl = document.getElementById('featured-pubs');
  const allEl = document.getElementById('all-pubs');
  if (!featuredEl && !allEl) return;

  const scholarSearch = title =>
    'https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + title + '"');

  const pubHTML = (p, showYear = true) => `
    <li class="pub">
      ${showYear ? `<span class="pub-year">${p.year || ''}</span>` : ''}
      <div>
        <p class="pub-title"><a href="${p.url || scholarSearch(p.title)}" target="_blank" rel="noopener">${p.title}</a></p>
        <p class="pub-authors">${p.authors}</p>
        <p class="pub-venue">${p.journal || ''}${p.citations ? `<span class="pub-cites">${p.citations} cites</span>` : ''}</p>
      </div>
    </li>`;

  fetch('publications.json?' + Date.now())
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      const pubs = (data.publications || [])
        .filter(p => p.year > 0)
        .sort((a, b) => b.year - a.year || (b.citations || 0) - (a.citations || 0));

      // Home page: full list, newest first
      if (featuredEl) {
        featuredEl.innerHTML = pubs.map(p => pubHTML(p)).join('');
        featuredEl.querySelectorAll('.pub').forEach(reveal);
      }

      // Publications page: grouped by year, with search
      if (allEl) {
        const meta = document.getElementById('pub-meta');
        if (meta && data.profile) {
          meta.textContent = `${pubs.length} publications · ${data.profile.citations} citations · h-index ${data.profile.h_index}`;
        }
        const render = query => {
          const q = (query || '').toLowerCase().trim();
          const shown = q
            ? pubs.filter(p => (p.title + ' ' + p.authors + ' ' + p.journal).toLowerCase().includes(q))
            : pubs;
          const years = [...new Set(shown.map(p => p.year))];
          allEl.innerHTML = shown.length
            ? years.map(y => `
                <div class="year-group">
                  <h3>${y}</h3>
                  <ul class="pub-list">${shown.filter(p => p.year === y).map(p => pubHTML(p, false)).join('')}</ul>
                </div>`).join('')
            : '<p>No publications match that search.</p>';
        };
        render();
        const search = document.getElementById('pub-search');
        if (search) search.addEventListener('input', e => render(e.target.value));
      }
    })
    .catch(() => {
      const fallback = '<p>Publications are listed on <a href="https://scholar.google.com/citations?user=5Cn3dC0AAAAJ">Google Scholar</a>.</p>';
      if (featuredEl) featuredEl.outerHTML = fallback;
      if (allEl) allEl.innerHTML = fallback;
    });
});
