# meaghan-evans-site

Static academic site for Meaghan N. Evans (GitHub Pages). No build step: edit the HTML directly.

- `index.html`, `research.html`, `publications.html`, `teaching.html`: pages
- `style.css`, `script.js`: shared styles and behaviour
- `publications.json`: refreshed weekly from Google Scholar by `.github/workflows/update-publications.yml`
  (needs a `SERPAPI_KEY` repository secret). Set `"featured": true` on a paper to show it on the home page.

## Before launch
- [ ] Add an up-to-date CV as `assets/Evans_MN_CV.pdf` (without phone number or references)
- [x] Add email address
- [ ] Replace placeholder photos with her own (search `TODO`). The civet photo is CC0 (James Eaton, Wikimedia Commons); the clouded leopard came from Luke's site
- [ ] Check FWC role wording (index.html, research.html)
- [ ] Add post-2021 grants, mentoring, service and publications-in-prep (CV used was ~2021)
- [x] Add a `CNAME` file (meaghanevans.science)
