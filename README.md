# meaghan-evans-site

Static academic site for Meaghan N. Evans (GitHub Pages).

## Editing the text

Open https://meaghanevans.science/admin/ and sign in with GitHub. Each page's
text is in a form; Publish saves it to the repository and the site rebuilds
itself within a few minutes.

Behind the scenes the words live in `content/*.yml`, the page layouts in
`templates/`, and `scripts/build_site.py` renders them into the HTML pages
(the "Build site pages" GitHub Action runs it on every content change). Do not
edit `index.html`, `research.html`, `teaching.html` or `publications.html` by
hand; they are generated. Change `templates/` for layout and `content/` for words.

- `content/`: the editable text, one file per page plus `site.yml`
- `templates/`: page layouts (Jinja2)
- `admin/`: the browser editor (Sveltia CMS) and its field configuration
- `style.css`, `script.js`: shared styles and behaviour
- `publications.json`: refreshed weekly from Google Scholar by `.github/workflows/update-publications.yml`
  (needs a `SERPAPI_KEY` repository secret). The home page lists every publication, newest first.

## Before launch
- [ ] Add an up-to-date CV as `assets/Evans_MN_CV.pdf` (without phone number or references)
- [x] Add email address
- [ ] Replace placeholder photos with her own (search `TODO`). The civet photo is CC0 (James Eaton, Wikimedia Commons); the clouded leopard came from Luke's site
- [ ] Check FWC role wording (index.html, research.html)
- [ ] Add post-2021 grants, mentoring, service and publications-in-prep (CV used was ~2021)
- [x] Add a `CNAME` file (meaghanevans.science)
