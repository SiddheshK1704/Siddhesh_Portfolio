"""Repack reference/me-sheet.png into an even 3x3 transparent WebP.

Usage:
  python scripts/repack-mascot-sheet.py reference/me-sheet.png \
      public/mascots/me-sheet-transparent.webp preview-on-blue.png

The source is already transparent but its figures sit on an uneven grid
(row-3 hair crosses the 418px slice line; wave/peek touch cell borders).
Each figure is cut out by its real gutters, centred on its head and
bottom-aligned in a uniform cell. Faint alpha haze is dropped.
"""
import sys
import numpy as np
from PIL import Image

SRC, OUT, PREVIEW = sys.argv[1], sys.argv[2], sys.argv[3]
CELL = 440
HAZE = 8  # alpha below this is cleared

im = np.array(Image.open(SRC).convert("RGBA"))
alpha = im[..., 3]
occ = alpha > 24


def runs(mask):
    out, s = [], None
    for i, v in enumerate(mask):
        if v and s is None:
            s = i
        if not v and s is not None:
            out.append((s, i - 1))
            s = None
    if s is not None:
        out.append((s, len(mask) - 1))
    return out


rows = runs(occ.any(1))
assert len(rows) == 3, rows
sheet = Image.new("RGBA", (CELL * 3, CELL * 3), (0, 0, 0, 0))
for r, (y0, y1) in enumerate(rows):
    cols = runs(occ[y0 : y1 + 1].any(0))
    assert len(cols) == 3, cols
    for c, (x0, x1) in enumerate(cols):
        ys, xs = np.where(occ[y0 : y1 + 1, x0 : x1 + 1])
        top, bot = ys.min(), ys.max()
        crop = im[y0 + top : y0 + bot + 1, x0 : x1 + 1].copy()
        crop[crop[..., 3] < HAZE] = 0
        h, w = crop.shape[:2]
        # Head anchor: horizontal centroid of the top 40% of the figure
        head = crop[: int(h * 0.4), :, 3] > 128
        hx = np.where(head)[1].mean()
        dx = int(round(CELL / 2 - hx))
        dx = max(min(dx, CELL - w), 0) if w <= CELL else 0
        sheet.alpha_composite(Image.fromarray(crop), (c * CELL + dx, r * CELL + CELL - h))
        print(f"cell {r*3+c}: src x{x0}-{x1} y{y0+top}-{y0+bot} ({w}x{h}) head_x={hx:.0f} placed dx={dx}")

sheet.save(OUT, "WEBP", quality=90, alpha_quality=100, method=6)
prev = Image.new("RGBA", sheet.size, (51, 85, 255, 255))
prev.alpha_composite(Image.open(OUT).convert("RGBA"))
prev.convert("RGB").save(PREVIEW)
print("saved", OUT)
