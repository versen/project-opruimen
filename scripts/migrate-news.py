#!/usr/bin/env python3
"""Import news items and static assets from the Jekyll site (../versen.github.io).

Re-runnable: overwrites src/content/news/ and public/assets/ so news posted on the
old site can be pulled in again until the cut-over.

  python3 scripts/migrate-news.py
"""
import json
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OLD = ROOT.parent / "versen.github.io"
NEWS_OUT = ROOT / "src/content/news"
REDIRECTS = json.loads((ROOT / "src/data/redirects.json").read_text())

# Same filename-date regex Jekyll uses; when it doesn't match, Jekyll keeps the date in the slug.
JEKYLL_DATE = re.compile(r"^(\d{2,4}-\d{1,2}-\d{1,2})-(.*)$")
GALLERY_PREFIXES = ("honorary-members-", "thesis-awards-")
LENIENT_DATE = re.compile(r"^(\d{4})-(\d{2})-(\d{2})")


def slugify(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def rewrite_links(body: str) -> str:
    def sub(m):
        prefix, path, rest = m.group(1), m.group(2), m.group(3)
        target = REDIRECTS.get(path.rstrip("/")) or REDIRECTS.get(path)
        return f"{prefix}{target or path}{rest}"

    body = re.sub(r'(\]\(|href=")(/(?:contents|works|news|users)[^)"#\s]*)([)"#\s])', sub, body)
    body = body.replace("](/img/news/", "](/assets/img/news/")
    body = re.sub(r"\{:[^}]*\}", "", body)  # kramdown attribute lists
    return body


def parse(text: str):
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.S)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).splitlines():
        # the quoted form tolerates a stray character after the closing quote (seen in one item)
        kv = re.match(r'^(\w+):\s*(?:"(.*)"\s*\w?|(.*?))\s*$', line.strip())
        if kv:
            meta[kv.group(1)] = (kv.group(2) if kv.group(2) is not None else kv.group(3)).replace('\\"', '"')
    return meta, m.group(2)


def main():
    if NEWS_OUT.exists():
        shutil.rmtree(NEWS_OUT)
    NEWS_OUT.mkdir(parents=True)
    legacy = {}
    for src in sorted((OLD / "_news").glob("*.md")):
        stem = src.stem.removesuffix(" copy")
        meta, body = parse(src.read_text(encoding="utf-8"))
        d = LENIENT_DATE.match(stem)
        date = f"{d.group(1)}-{d.group(2)}-{d.group(3)}"
        new_id = slugify(stem)
        j = JEKYLL_DATE.match(src.stem)
        jekyll_slug = slugify(j.group(2) if j else src.stem)
        legacy[f"/news_items/{jekyll_slug}"] = f"/news/{new_id}/"  # later files win, as in Jekyll

        picture = meta.get("picture", "")
        image = "" if picture in ("", "default.png") else f"/assets/img/news/{picture}"
        title = meta.get("title", stem).replace('"', '\\"')
        fm = f'---\ntitle: "{title}"\ndate: {date}\n'
        if image:
            fm += f'image: "{image}"\n'
        fm += "---\n\n"
        (NEWS_OUT / f"{new_id}.md").write_text(fm + rewrite_links(body).strip() + "\n", encoding="utf-8")

    (ROOT / "src/data/news-redirects.json").write_text(json.dumps(legacy, indent=1, sort_keys=True))

    assets = ROOT / "public/assets"
    assets.mkdir(parents=True, exist_ok=True)
    # Photo galleries go through astro:assets (resized, lazy-loaded); everything else is served as-is.
    galleries = [p.name for p in (OLD / "assets/img").iterdir() if p.is_dir() and p.name.startswith(GALLERY_PREFIXES)]
    excludes = ["--exclude", "css/"] + [a for g in galleries for a in ("--exclude", f"img/{g}/")]
    subprocess.run(["rsync", "-a", "--delete", *excludes, f"{OLD}/assets/", f"{assets}/"], check=True)
    gal_out = ROOT / "src/assets/galleries"
    gal_out.mkdir(parents=True, exist_ok=True)
    for g in galleries:
        subprocess.run(["rsync", "-a", "--delete", f"{OLD}/assets/img/{g}/", f"{gal_out / g}/"], check=True)
    print(f"news: {len(list(NEWS_OUT.glob('*.md')))} items, {len(legacy)} legacy redirects; assets synced")


if __name__ == "__main__":
    main()
