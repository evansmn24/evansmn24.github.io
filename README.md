# meaghan-evans-site

Static academic site for Meaghan N. Evans (GitHub Pages). No build step: edit the HTML directly.

- `index.html`, `research.html`, `publications.html`, `teaching.html`: pages
- `style.css`, `script.js`: shared styles and behaviour
- `publications.json`: refreshed weekly from Google Scholar by `.github/workflows/update-publications.yml`
  (needs a `SERPAPI_KEY` repository secret). Set `"featured": true` on a paper to show it on the home page.

## Before launch
- [ ] Add CV as `assets/Evans_MN_CV.pdf`
- [x] Add email address
- [ ] Replace placeholder photos (search `TODO` in the HTML)
- [ ] Check every `VERIFY` comment, especially the teaching & mentoring page and FWC role
- [ ] Add earlier degrees under Education (index.html)
- [ ] Add a `CNAME` file if using a custom domain
