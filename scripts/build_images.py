#!/usr/bin/env python3
"""Builds the web-sized images in public/images from the full-size originals
in source-images/ (not committed, not deployed).

    python3 scripts/build_images.py

public/images/
  hero/hero.jpg
  professional/NN.jpg + thumb/NN.jpg  (NN = position in the original portfolio numbering)
  polas/YYYY-MM/NN.jpg          (+ src/data/polas.json manifest)

HEIC files are converted with macOS `sips`.
New Polas month: add source-images/polas/<YYYY>/<MM Monat>/..., re-run.
"""
import json, os, re, subprocess, tempfile
from pathlib import Path
from PIL import Image, ImageOps

Image.MAX_IMAGE_PIXELS = None
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source-images"
OUT = ROOT / "public" / "images"

PRO_LONG_EDGE, PRO_THUMB_EDGE, POLA_LONG_EDGE = 1600, 800, 1400

# original file name -> professional number (keeps the portfolio numbering stable)
PRO = {
    "Annkathrin-Larision-26-05-29-2.jpg": 1, "Annkathrin-Larision-26-05-35-2.jpg": 2,
    "Annkathrin-Larision-26-05-54-2.jpg": 3, "Annkathrin-Larision-26-05-121-2.jpg": 4,
    "Annkathrin-Larision-26-05-151-2.jpg": 5, "IMG_6085.JPG": 6, "IMG_6086.JPG": 7,
    "IMG_6087.JPG": 8, "IMG_6089.JPG": 9, "IMG_6092.JPG": 10, "IMG_6094.JPG": 11,
    "IMG_7722.JPG": 12, "IMG_7723.JPG": 13, "IMG_7724.JPG": 14, "IMG_7725.JPG": 15,
    "IMG_7726.JPG": 16, "IMG_7727.JPG": 17, "👍🏼 Temptation (1).png": 18,
    "Power bearbeitet.jpg": 19, "Passion (bearbeitet).jpg": 20,
    "234A0209-Bearbeitet.jpg": 21, "234A0255-Bearbeitet.jpg": 22,
    "234A0355-Bearbeitet.jpg": 23, "234A0520-Bearbeitet.jpg": 24,
    "234A0599-Bearbeitet.jpg": 25, "234A0675-Bearbeitet-1.jpg": 26,
    "234A0694-Bearbeitet-1.jpg": 27, "234A0743-Bearbeitet-1.jpg": 28,
    "234A1161-Bearbeitet-2.jpg": 29, "234A1303-Bearbeitet.jpg": 30,
    "234A1459-Bearbeitet.jpg": 31, "234A1519-Bearbeitet-2.jpg": 32,
}

# Order inside a month: close-up -> full body, so months are easy to compare.
# Anything not listed is ordered by EXIF capture time, then file name.
POLA_ORDER = {
    "2026-07": ["oben", "middle", "halb seite", "ganz"],
    "2026-08": ["weiß 1", "weiß 2", "weiß 3", "weiß 4"],
    "2026-09": ["close", "middle", "full"],
}


def load(path: Path) -> Image.Image:
    if path.suffix.lower() == ".heic":
        tmp = Path(tempfile.mkdtemp()) / (path.stem + ".jpg")
        subprocess.run(["sips", "-s", "format", "jpeg", str(path), "--out", str(tmp)],
                       check=True, capture_output=True)
        path = tmp
    im = Image.open(path)
    taken = None
    try:
        taken = im.getexif().get_ifd(0x8769).get(36867)
    except Exception:
        pass
    im = ImageOps.exif_transpose(im)
    return im.convert("RGB"), taken


def save(im: Image.Image, dest: Path, long_edge: int, quality=82):
    im = im.copy()
    im.thumbnail((long_edge, long_edge), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    return im.size


def build_professional():
    d = OUT / "professional"
    for old in list(d.glob("*.jpg")) + list(d.glob("thumb/*.jpg")):
        old.unlink()
    for name, n in sorted(PRO.items(), key=lambda kv: kv[1]):
        p = SRC / "professional" / name
        if not p.exists():
            print("missing", name); continue
        im, _ = load(p)
        w, h = save(im, d / f"{n:02d}.jpg", PRO_LONG_EDGE)
        save(im, d / "thumb" / f"{n:02d}.jpg", PRO_THUMB_EDGE, 78)
        print(f"professional/{n:02d}.jpg  {w}x{h}  {(d / f'{n:02d}.jpg').stat().st_size // 1024} KB")


def sort_key(month_id, path, taken):
    for i, token in enumerate(POLA_ORDER.get(month_id, [])):
        if token in path.stem.lower():
            return (0, i, "")
    return (1, 0, f"{taken or ''}|{path.name}")


def build_polas():
    manifest = {}
    for year_dir in sorted(p for p in (SRC / "polas").iterdir() if p.is_dir()):
        for month_dir in sorted(p for p in year_dir.iterdir() if p.is_dir()):
            m = re.match(r"(\d{2})?\s*(.*)", month_dir.name)
            files = [f for f in month_dir.iterdir()
                     if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".heic")]
            if not files:
                continue
            loaded = {f: load(f) for f in files}
            # month number: from folder prefix ("07 Juli") or from EXIF date
            month_num = m.group(1) or (next((t for _, t in loaded.values() if t), "0000:00")[5:7])
            month_id = f"{year_dir.name}-{month_num}"
            ordered = sorted(files, key=lambda f: sort_key(month_id, f, loaded[f][1]))
            dest = OUT / "polas" / month_id
            for old in dest.glob("*.jpg") if dest.exists() else []:
                old.unlink()
            items = []
            for i, f in enumerate(ordered, 1):
                w, h = save(loaded[f][0], dest / f"{i:02d}.jpg", POLA_LONG_EDGE, 80)
                items.append({"file": f"{i:02d}.jpg", "width": w, "height": h})
                print(f"polas/{month_id}/{i:02d}.jpg  {w}x{h}  <- {f.name}")
            manifest[month_id] = items
    (ROOT / "src" / "data").mkdir(exist_ok=True)
    (ROOT / "src" / "data" / "polas.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    build_professional()
    build_polas()
