#!/home/priyanka/anaconda3/bin/python3
"""
brochure.py – Inveh Lighting Solutions product brochure generator.

Reads product data hard-coded from products.ts and pairs each product with
its first available image from the public/ folder, then outputs a styled PDF.

Usage:
    python3.10 scripts/brochure.py
    # → inveh_brochure.pdf (created next to this script or in project root)

Dependencies:
    pip install reportlab Pillow   (Pillow for WEBP → JPEG conversion if needed)
"""

import os
import re
from datetime import datetime
import sys
from pathlib import Path
from io import BytesIO

# ── Attempt to import dependencies ──────────────────────────────────────────
try:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import cm, mm
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
    from reportlab.platypus import (
        BaseDocTemplate, PageTemplate, Frame,
        Paragraph, Spacer, Image as RLImage,
        Table, TableStyle, HRFlowable, PageBreak,
    )
    from reportlab.pdfgen import canvas
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.graphics.shapes import Drawing, Rect
    from reportlab.graphics import renderPDF
except ImportError as e:
    sys.exit(f"[ERROR] Missing dependency: {e}\n  Run: pip3.10 install reportlab")

try:
    from PIL import Image as PILImage
    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False
    print("[WARN] Pillow not found – WEBP images may not embed correctly.")

# ── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR  = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
PUBLIC_DIR  = PROJECT_DIR / "public"
OUTPUT_PDF  = PROJECT_DIR / "inveh_brochure.pdf"
LOGO_PATH   = PUBLIC_DIR / "inveh_logo.jpeg"

# ── Brand colours (matching the live website) ────────────────────────────────
BRAND_DARK   = colors.HexColor("#02163b")   # logo / navbar dark blue
BRAND_GOLD   = colors.HexColor("#fec955")   # logo yellow / gold
BRAND_CREAM  = colors.white                  # page background = white
BRAND_MID    = colors.HexColor("#02163b")   # secondary navy (same as dark)
BRAND_LIGHT  = colors.HexColor("#d0daea")   # light blue-grey divider
WHITE        = colors.white

PAGE_W, PAGE_H = A4

# ── Parse products.ts ─────────────────────────────────────────────────────────
def parse_products_ts(ts_path: Path) -> list[dict]:
    """
    Extract product records from products.ts by regex-parsing object literals.
    Returns a list of dicts with keys:
        title, model_name, model_num, model_price, discount, description, images
    where `images` is a list of relative public paths (strings).
    """
    text = ts_path.read_text(encoding="utf-8")

    # Strip JS/TS comments so regex is cleaner
    text = re.sub(r"//[^\n]*", "", text)

    # Split into individual product blocks (everything between { … } at top level)
    # We isolate each product entry inside the productCategories array.
    product_pattern = re.compile(
        r"\{(?P<body>[^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", re.DOTALL
    )

    products = []
    for m in product_pattern.finditer(text):
        body = m.group("body")

        # Skip very short matches (not a product block)
        if len(body.strip()) < 30:
            continue

        def extract(key: str) -> str | None:
            pat = re.compile(
                rf"""['"]?{re.escape(key)}['"]?\s*:\s*['"`](?P<val>[^'"`]*)['"`]""",
                re.DOTALL,
            )
            found = pat.search(body)
            return found.group("val").strip() if found else None

        def extract_num(key: str) -> float | None:
            pat = re.compile(rf"""['"]?{re.escape(key)}['"]?\s*:\s*(?P<val>[\d.]+)""")
            found = pat.search(body)
            return float(found.group("val")) if found else None

        # Extract image paths from getImagePath('…') calls
        img_matches = re.findall(r"""getImagePath\(['"`]([^'"`]+)['"`]\)""", body)

        model_name  = extract("model_name")
        model_num   = extract("model_num")
        description = extract("description")
        title       = extract("title") or ""
        price       = extract_num("model_price")
        discount    = extract_num("discount")

        if model_num and model_name:
            products.append({
                "title":       title,
                "model_name":  model_name,
                "model_num":   model_num,
                "model_price": price or 0,
                "discount":    discount or 0,
                "description": description or "",
                "images":      img_matches,
            })

    return products


# ── Image helpers ─────────────────────────────────────────────────────────────
PREFERRED_EXT = [".jpeg", ".jpg", ".png", ".webp"]

def find_image(relative_path: str) -> Path | None:
    """
    Given a relative path like 'INB001_Wave_Pendant_Lamp/INB001_Wave_Pendant_Lamp_1.webp',
    resolve it under PUBLIC_DIR and find the first available format.
    """
    base = PUBLIC_DIR / relative_path
    if base.exists():
        return base
    stem = base.with_suffix("")
    for ext in PREFERRED_EXT:
        candidate = stem.with_suffix(ext)
        if candidate.exists():
            return candidate
    return None


def webp_to_jpeg_bytes(path: Path) -> BytesIO | None:
    """Convert a WEBP (or any PIL-supported format) to JPEG bytes."""
    if not HAS_PILLOW:
        return None
    try:
        with PILImage.open(path) as im:
            im = im.convert("RGB")
            buf = BytesIO()
            im.save(buf, format="JPEG", quality=85)
            buf.seek(0)
            return buf
    except Exception as e:
        print(f"  [WARN] PIL conversion failed for {path}: {e}")
        return None


def rl_image(path: Path, width: float, height: float) -> RLImage | None:
    """Return a ReportLab Image flowable, handling WEBP via Pillow."""
    if path.suffix.lower() == ".webp" and HAS_PILLOW:
        buf = webp_to_jpeg_bytes(path)
        if buf:
            img = RLImage(buf, width=width, height=height, kind="proportional")
            return img
    try:
        img = RLImage(str(path), width=width, height=height, kind="proportional")
        return img
    except Exception as e:
        print(f"  [WARN] Could not load image {path}: {e}")
        return None


# ── PDF document helpers ──────────────────────────────────────────────────────
def make_styles() -> dict:
    return {
        "cover_title": ParagraphStyle(
            "cover_title",
            fontName="Helvetica-Bold",
            fontSize=36,
            textColor=BRAND_GOLD,
            leading=44,
            alignment=TA_CENTER,
        ),
        "cover_subtitle": ParagraphStyle(
            "cover_subtitle",
            fontName="Helvetica",
            fontSize=14,
            textColor=BRAND_CREAM,
            leading=20,
            alignment=TA_CENTER,
        ),
        "cover_tagline": ParagraphStyle(
            "cover_tagline",
            fontName="Helvetica-Oblique",
            fontSize=11,
            textColor=BRAND_LIGHT,
            leading=16,
            alignment=TA_CENTER,
        ),
        "section_heading": ParagraphStyle(
            "section_heading",
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=BRAND_GOLD,
            leading=14,
            spaceAfter=2,
        ),
        "product_name": ParagraphStyle(
            "product_name",
            fontName="Helvetica-Bold",
            fontSize=12,
            textColor=BRAND_DARK,
            leading=15,
        ),
        "product_sku": ParagraphStyle(
            "product_sku",
            fontName="Helvetica",
            fontSize=8,
            textColor=BRAND_MID,
            leading=11,
        ),
        "product_price": ParagraphStyle(
            "product_price",
            fontName="Helvetica-Bold",
            fontSize=12,
            textColor=BRAND_GOLD,
            leading=15,
        ),
        "product_desc": ParagraphStyle(
            "product_desc",
            fontName="Helvetica",
            fontSize=8,
            textColor=BRAND_DARK,
            leading=12,
            spaceAfter=0,
        ),
        "footer": ParagraphStyle(
            "footer",
            fontName="Helvetica",
            fontSize=7,
            textColor=BRAND_MID,
            alignment=TA_CENTER,
        ),
        "toc_item": ParagraphStyle(
            "toc_item",
            fontName="Helvetica",
            fontSize=10,
            textColor=BRAND_DARK,
            leading=16,
        ),
    }


# ── Cover page ────────────────────────────────────────────────────────────────
def draw_cover(c: canvas.Canvas, doc):
    w, h = PAGE_W, PAGE_H

    # White page background
    c.setFillColor(WHITE)
    c.rect(0, 0, w, h, fill=1, stroke=0)

    # Navy top bar (full-width header like the website navbar)
    c.setFillColor(BRAND_DARK)
    c.rect(0, h - 2.5 * cm, w, 2.5 * cm, fill=1, stroke=0)

    # Gold accent line under the top bar
    c.setFillColor(BRAND_GOLD)
    c.rect(0, h - 2.7 * cm, w, 0.2 * cm, fill=1, stroke=0)

    # Navy bottom bar
    c.setFillColor(BRAND_DARK)
    c.rect(0, 0, w, 1.0 * cm, fill=1, stroke=0)

    # Gold accent line above bottom bar
    c.setFillColor(BRAND_GOLD)
    c.rect(0, 1.0 * cm, w, 0.15 * cm, fill=1, stroke=0)

    # Decorative vertical stripe (left) in gold
    c.setFillColor(BRAND_GOLD)
    c.rect(1.5 * cm, 0, 0.3 * cm, h, fill=1, stroke=0)

    # Logo (if available)
    logo_y = h - 6.0 * cm
    if LOGO_PATH.exists():
        try:
            logo_buf = webp_to_jpeg_bytes(LOGO_PATH) if LOGO_PATH.suffix == ".webp" else None
            logo_src = logo_buf if logo_buf else str(LOGO_PATH)
            c.drawImage(logo_src, w / 2 - 2.5 * cm, logo_y,
                        width=5 * cm, height=3 * cm,
                        preserveAspectRatio=True, anchor="c",
                        mask="auto")
        except Exception:
            pass  # skip logo silently if it fails

    # Title (navy text on white background)
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 34)
    c.drawCentredString(w / 2, h - 9 * cm, "INVEH LIGHTING")

    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Bold", 22)
    c.drawCentredString(w / 2, h - 10.5 * cm, "SOLUTIONS")

    # Horizontal rule in gold
    c.setStrokeColor(BRAND_GOLD)
    c.setLineWidth(1.5)
    c.line(3 * cm, h - 11.2 * cm, w - 3 * cm, h - 11.2 * cm)

    # Tagline in dark navy
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica-Oblique", 12)
    c.drawCentredString(w / 2, h - 12.2 * cm, "Handcrafted Wooden Lamps & Décor")

    # Product count badge — navy background, white text, width fits the text
    _now = datetime.now()
    _badge_text = f"Exclusive Product Catalogue · {_now.strftime('%B %Y')}"
    _font_name, _font_size = "Helvetica", 10
    _pad_x = 0.5 * cm          # horizontal padding on each side
    _badge_h = 1.4 * cm
    _text_w = c.stringWidth(_badge_text, _font_name, _font_size)
    _badge_w = _text_w + 2 * _pad_x
    _badge_x = w / 2 - _badge_w / 2
    _badge_y = h - 14.5 * cm
    c.setFillColor(BRAND_DARK)
    c.roundRect(_badge_x, _badge_y, _badge_w, _badge_h, 0.4 * cm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont(_font_name, _font_size)
    c.drawCentredString(w / 2, _badge_y + 0.55 * cm, _badge_text)

    # Address block below the badge
    address_lines = [
        "Inveh Lighting Solutions,",
        "10A1, Poompugar nagar, Dhali road,",
        "Udumalpet - 642 154,",
        "Tamilnadu, India."
    ]
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica", 11)
    addr_y = _badge_y - 2.5 * cm
    for line in address_lines:
        c.drawCentredString(w / 2, addr_y, line)
        addr_y -= 0.6 * cm
    # Contact block at bottom (navy text on white)
    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, 3.5 * cm, "www.inveh.in  ·  info@inveh.in")
    c.setFont("Helvetica", 8)
    c.drawCentredString(w / 2, 2.5 * cm, "Whatsapp/ Call: +91 94877 41183")
    c.setFillColor(WHITE)
    c.setFont("Helvetica", 7)
    c.drawCentredString(w / 2, 0.35 * cm,
                        f"© {datetime.now().year} Inveh Lighting Solutions. All rights reserved.")


# ── Page header/footer callback ───────────────────────────────────────────────
def make_page_callback(title_text: str = "INVEH LIGHTING SOLUTIONS — Product Catalogue"):
    def on_page(c: canvas.Canvas, doc):
        w, h = PAGE_W, PAGE_H
        # White page background
        c.setFillColor(WHITE)
        c.rect(0, 0, w, h, fill=1, stroke=0)
        # Header bar — navy blue (same as website navbar)
        c.setFillColor(BRAND_DARK)
        c.rect(0, h - 1.1 * cm, w, 1.1 * cm, fill=1, stroke=0)
        # Gold accent line under header
        c.setFillColor(BRAND_GOLD)
        c.rect(0, h - 1.2 * cm, w, 0.1 * cm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(w / 2, h - 0.68 * cm, title_text)

        # Footer — navy blue
        c.setFillColor(BRAND_DARK)
        c.rect(0, 0, w, 0.7 * cm, fill=1, stroke=0)
        # Gold accent line above footer
        c.setFillColor(BRAND_GOLD)
        c.rect(0, 0.7 * cm, w, 0.08 * cm, fill=1, stroke=0)
        c.setFillColor(WHITE)
        
        # Center: Website
        c.setFont("Helvetica", 7)
        c.drawCentredString(w / 2, 0.22 * cm, "www.inveh.in")
        
        # Left: Email with Post icon
        c.saveState()
        c.setStrokeColor(WHITE)
        c.setLineWidth(0.8)
        x_env = 1.6 * cm
        y_env = 0.20 * cm
        w_env = 0.35 * cm
        h_env = 0.24 * cm
        c.rect(x_env, y_env, w_env, h_env, stroke=1, fill=0)
        c.line(x_env, y_env + h_env, x_env + w_env/2, y_env + h_env/2)
        c.line(x_env + w_env/2, y_env + h_env/2, x_env + w_env, y_env + h_env)
        c.restoreState()
        
        c.setFont("Helvetica", 7)
        c.drawString(1.6 * cm + 0.5 * cm, 0.22 * cm, "info@inveh.in")
        
        # Right: Phone number with WhatsApp/Phone icon
        phone_text = "+91 94877 41183"
        c.setFont("Helvetica", 7)
        c.drawRightString(w - 1.6 * cm, 0.22 * cm, phone_text)
        text_w = c.stringWidth(phone_text, "Helvetica", 7)
        
        c.saveState()
        c.setStrokeColor(WHITE)
        c.setLineWidth(0.8)
        x_wa = w - 1.6 * cm - text_w - 0.2 * cm
        y_wa = 0.20 * cm
        r_wa = 0.12 * cm
        cx = x_wa - r_wa
        cy = y_wa + r_wa
        c.circle(cx, cy, r_wa, stroke=1, fill=0)
        p = c.beginPath()
        p.moveTo(cx - 0.7 * r_wa, cy - 0.7 * r_wa)
        p.lineTo(cx - 1.3 * r_wa, cy - 1.3 * r_wa)
        p.lineTo(cx - 0.3 * r_wa, cy - 0.95 * r_wa)
        c.drawPath(p, stroke=1, fill=0)
        c.setLineWidth(0.6)
        c.arc(cx - 0.5*r_wa, cy - 0.5*r_wa, cx + 0.5*r_wa, cy + 0.5*r_wa, 135, 180)
        c.restoreState()

    return on_page


# ── Constants ─────────────────────────────────────────────────────────────────
# Usable area on a content page (header 1.1cm + gold strip 0.1cm + footer 0.7cm + strip 0.08cm)
LEFT_MARGIN   = 1.6 * cm
RIGHT_MARGIN  = 1.6 * cm
TOP_MARGIN    = 1.6 * cm      # doc top margin (header drawn separately)
BOTTOM_MARGIN = 1.4 * cm      # doc bottom margin (footer drawn separately)

HEADER_H  = 1.1 * cm          # navy bar height
FOOTER_H  = 0.7 * cm          # navy bar height
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN
CONTENT_H = PAGE_H - TOP_MARGIN - BOTTOM_MARGIN - HEADER_H - FOOTER_H - 0.3 * cm



# ── Per-product full-page layout ──────────────────────────────────────────────
HERO_W  = CONTENT_W * 0.52    # left column: hero image
INFO_W  = CONTENT_W * 0.44    # right column: text
THUMB_W = 3.2 * cm            # thumbnail width


def build_product_page(product: dict, styles: dict) -> list:
    """
    Returns flowables for one full content page.

    Layout:
      ┌──────────────────────────┬──────────────────────────┐
      │  Hero image (large)      │  Category badge          │
      │                          │  Product name            │
      │                          │  Model No / SKU          │
      │                          │  ──────────────────────  │
      │                          │  Price                   │
      │                          │  ──────────────────────  │
      │                          │  Description             │
      │                          │  More Views thumbnails   │
      └──────────────────────────┴──────────────────────────┘
    """
    # ── Resolve images ───────────────────────────────────────────────────────
    image_paths: list[Path] = []
    for rel_path in product["images"]:
        found = find_image(rel_path.lstrip("/"))
        if found:
            image_paths.append(found)

    # Hero: first image, scaled to fill left column height
    if image_paths:
        hero = rl_image(image_paths[0], HERO_W, CONTENT_H * 0.72)
    else:
        hero = Spacer(HERO_W, CONTENT_H * 0.72)

    # ── Price text ───────────────────────────────────────────────────────────
    price    = product["model_price"]
    discount = product["discount"]
    if discount > 0:
        final      = price * (1 - discount / 100)
        price_text = (
            f'<strike>₹{price:,.0f}</strike>  '
            f'<b>₹{final:,.0f}</b>  <font size="9">({discount:.0f}% off)</font>'
        )
    else:
        price_text = f"Rs. {price:,.0f}"

    # ── Category label ───────────────────────────────────────────────────────
    cat_label = product["title"].strip() or "Bulb Models"

    cat_style = ParagraphStyle(
        "cat_label",
        fontName="Helvetica",
        fontSize=8,
        textColor=WHITE,
        leading=10,
    )
    cat_pill = Table(
        [[Paragraph(cat_label.upper(), cat_style)]],
        colWidths=[INFO_W],
    )
    cat_pill.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, -1), BRAND_DARK),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
        ("TOPPADDING",    (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))

    name_style = ParagraphStyle(
        "prod_name_lg",
        fontName="Helvetica-Bold",
        fontSize=18,
        textColor=BRAND_DARK,
        leading=22,
        spaceAfter=2,
    )
    sku_style = ParagraphStyle(
        "prod_sku_lg",
        fontName="Helvetica",
        fontSize=9,
        textColor=colors.HexColor("#6b7a99"),
        leading=12,
    )
    price_style = ParagraphStyle(
        "prod_price_lg",
        fontName="Helvetica-Bold",
        fontSize=16,
        textColor=BRAND_DARK,
        leading=20,
    )
    desc_style = ParagraphStyle(
        "prod_desc_lg",
        fontName="Helvetica",
        fontSize=10,
        textColor=colors.HexColor("#333333"),
        leading=15,
        spaceAfter=0,
    )

    # ── Thumbnail strip (extra images after hero) ────────────────────────────
    thumbs_flowables: list = []
    for img_path in image_paths[1:4]:
        t = rl_image(img_path, THUMB_W, THUMB_W)
        if t:
            thumbs_flowables.append(t)
            thumbs_flowables.append(Spacer(1, 2 * mm))

    # ── Right-column info block ──────────────────────────────────────────────
    info: list = [
        cat_pill,
        Spacer(1, 4 * mm),
        Paragraph(product["model_name"], name_style),
        Spacer(1, 1 * mm),
        Paragraph(f"Model No: {product['model_num']}", sku_style),
        Spacer(1, 4 * mm),
        HRFlowable(width="100%", thickness=0.8, color=BRAND_GOLD, spaceAfter=4),
        Spacer(1, 2 * mm),
        Paragraph(f"Price: {price_text}", price_style),
        Spacer(1, 4 * mm),
        HRFlowable(width="100%", thickness=0.4, color=BRAND_LIGHT, spaceAfter=4),
        Spacer(1, 2 * mm),
        Paragraph(product["description"], desc_style),
    ]
    if thumbs_flowables:
        info.append(Spacer(1, 6 * mm))
        info.append(Paragraph("More Views", ParagraphStyle(
            "more_views",
            fontName="Helvetica-Bold",
            fontSize=8,
            textColor=BRAND_DARK,
            leading=11,
            spaceAfter=3,
        )))
        info.extend(thumbs_flowables)

    # ── Two-column table: [hero | info] ──────────────────────────────────────
    page_table = Table(
        [[hero, info]],
        colWidths=[HERO_W + 0.4 * cm, INFO_W],
        rowHeights=[CONTENT_H],
    )
    page_table.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
        ("VALIGN",        (1, 0), (1, 0),   "TOP"),
        ("LEFTPADDING",   (0, 0), (0, 0),   0),
        ("RIGHTPADDING",  (0, 0), (0, 0),   10),
        ("LEFTPADDING",   (1, 0), (1, 0),   10),
        ("RIGHTPADDING",  (1, 0), (1, 0),   0),
        ("TOPPADDING",    (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("LINEAFTER",     (0, 0), (0, -1),  0.6, BRAND_LIGHT),
    ]))

    return [page_table, PageBreak()]


# ── Main builder ──────────────────────────────────────────────────────────────
def build_brochure(products: list[dict]):
    from reportlab.platypus import SimpleDocTemplate, NextPageTemplate

    styles = make_styles()

    # ── Page 1: Cover — drawn entirely via canvas callbacks ──────────────────
    # We use a temporary single-page PDF for the cover, then a second PDF for
    # the content, and merge them — simpler than fighting BaseDocTemplate's
    # template-switching on page 1.
    # Actually, cleanest approach: use BaseDocTemplate with TWO templates but
    # ensure the cover template frame is empty (zero-size) so nothing reflowed
    # into it, and the cover is drawn 100% by draw_cover().

    doc = BaseDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
    )

    # Cover template: zero-size frame so no flowable content lands on it
    cover_frame = Frame(
        0, 0, 1, 1,             # effectively invisible / empty
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        id="cover_frame",
    )
    cover_template = PageTemplate(
        id="cover",
        frames=[cover_frame],
        onPage=draw_cover,
    )

    # Content template: full usable area between header and footer
    content_frame = Frame(
        LEFT_MARGIN,
        BOTTOM_MARGIN + FOOTER_H + 0.15 * cm,
        CONTENT_W,
        CONTENT_H,
        leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
        id="content_frame",
    )
    content_template = PageTemplate(
        id="content",
        frames=[content_frame],
        onPage=make_page_callback(),
    )

    doc.addPageTemplates([cover_template, content_template])

    # ── Story ────────────────────────────────────────────────────────────────
    story = []

    # The doc starts on page 1 using the first template ("cover") automatically.
    # We only need to tell it to switch to "content" for all subsequent pages.
    story.append(NextPageTemplate("content"))

    # ── About Us page ────────────────────────────────────────────────────────
    intro_style = ParagraphStyle(
        "intro",
        fontName="Helvetica",
        fontSize=11,
        textColor=BRAND_DARK,
        leading=17,
        spaceAfter=6,
    )
    about_heading_style = ParagraphStyle(
        "about_heading",
        fontName="Helvetica-Bold",
        fontSize=22,
        textColor=BRAND_DARK,
        leading=28,
        spaceAfter=4,
        alignment=TA_CENTER,
    )
    story.append(Spacer(1, 1.5 * cm))
    story.append(Paragraph("About Inveh Lighting Solutions", about_heading_style))
    story.append(Spacer(1, 0.3 * cm))
    story.append(HRFlowable(width="60%", thickness=2, color=BRAND_GOLD,
                             spaceAfter=10, hAlign="CENTER"))
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph(
        "Welcome to Inveh Lighting Solutions \u2014 where nature meets craftsmanship. "
        "Each piece in our collection is handcrafted from premium pine wood, engineered wood "
        "and acrylic using state-of-the-art techniques. We blend modern manufacturing with "
        "artisanal warmth to create lamps that don't just illuminate a room \u2014 they "
        "<i>transform</i> it.",
        intro_style,
    ))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph(
        "Customisation is available on most models. Reach us to discuss further!",
        intro_style,
    ))
    story.append(PageBreak())           # → page 2 done, next page = products

    # ── One page per product ──────────────────────────────────────────────────
    current_category = ""
    for product in products:
        title_text = product.get("title", "").strip()
        if title_text:
            current_category = title_text
            cat_title_style = ParagraphStyle(
                "cat_title",
                fontName="Helvetica-Bold",
                fontSize=36,
                textColor=BRAND_DARK,
                alignment=TA_CENTER,
            )
            story.append(Spacer(1, 9 * cm))
            story.append(Paragraph(title_text, cat_title_style))
            story.append(Spacer(1, 1 * cm))
            story.append(HRFlowable(width="15%", thickness=2, color=BRAND_GOLD, spaceAfter=8, hAlign="CENTER"))
            story.append(PageBreak())

        # Keep the title accurate for the badge on the product page
        product["title"] = current_category
        
        story.extend(build_product_page(product, styles))
        # build_product_page already appends a PageBreak at the end

    # Remove the trailing PageBreak after the last product so the closing page
    # doesn't have a blank page before it.
    if story and isinstance(story[-1], PageBreak):
        story.pop()

    # ── Closing page ──────────────────────────────────────────────────────────
    story.append(PageBreak())
    closing_style = ParagraphStyle(
        "closing",
        fontName="Helvetica-Bold",
        fontSize=22,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        leading=28,
    )
    sub_style = ParagraphStyle(
        "sub",
        fontName="Helvetica",
        fontSize=12,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        leading=20,
    )
    story.append(Spacer(1, 5 * cm))
    story.append(Paragraph("Thank you for choosing Inveh", closing_style))
    story.append(Spacer(1, 0.6 * cm))
    story.append(HRFlowable(width="50%", thickness=2, color=BRAND_GOLD,
                             spaceAfter=8, hAlign="CENTER"))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph(
        "Every lamp carries a piece of our craft into your home.<br/><br/>",
        sub_style,
    ))

    doc.build(story)
    print(f"✅  Brochure saved to: {OUTPUT_PDF}")


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    ts_path = PROJECT_DIR / "src" / "data" / "products.ts"
    if not ts_path.exists():
        sys.exit(f"[ERROR] products.ts not found at {ts_path}")

    print("📖  Parsing products.ts …")
    products = parse_products_ts(ts_path)
    print(f"    Found {len(products)} products.")

    if not products:
        sys.exit("[ERROR] No products parsed. Check the regex against products.ts.")

    print("🖨️   Building PDF brochure …")
    build_brochure(products)
