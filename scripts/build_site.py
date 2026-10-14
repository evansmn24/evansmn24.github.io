#!/usr/bin/env python3
"""Render the site's HTML pages from templates/ and content/*.yml.

Run from the repository root:  python scripts/build_site.py
The GitHub Action in .github/workflows/build-site.yml runs this whenever a
content or template file changes and commits the regenerated pages.
"""
import re
from pathlib import Path

import markdown
import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent.parent
PAGES = {
    "index.html": "home.yml",
    "research.html": "research.yml",
    "teaching.html": "teaching.yml",
    "publications.html": "publications.yml",
}

_md = markdown.Markdown(output_format="html")


def md(text):
    """Block markdown: paragraphs, emphasis, links, lists."""
    if not text:
        return ""
    _md.reset()
    html = _md.convert(str(text).strip())
    # external links open in a new tab
    html = re.sub(r'<a href="(https?://[^"]+)"', r'<a href="\1" target="_blank" rel="noopener"', html)
    return html


def mdi(text):
    """Inline markdown: emphasis and links, but no wrapping <p>."""
    if text is None:
        return ""
    html = md(str(text))
    if html.startswith("<p>") and html.endswith("</p>") and html.count("<p>") == 1:
        html = html[3:-4]
    return html


def load(name):
    with open(ROOT / "content" / name, encoding="utf-8") as fh:
        return yaml.safe_load(fh)


def main():
    env = Environment(loader=FileSystemLoader(str(ROOT / "templates")),
                      autoescape=False, trim_blocks=False, lstrip_blocks=False,
                      keep_trailing_newline=True)
    env.filters["md"] = md
    env.filters["mdi"] = mdi
    site = load("site.yml")
    for out_name, content_name in PAGES.items():
        tpl = env.get_template(out_name)
        html = tpl.render(site=site, c=load(content_name))
        (ROOT / out_name).write_text(html, encoding="utf-8", newline="\n")
        print("wrote", out_name)


if __name__ == "__main__":
    main()
