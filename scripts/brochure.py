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

# ── Brand colours ────────────────────────────────────────────────────────────
BRAND_DARK   = colors.HexColor("#1A120B")   # dark espresso
BRAND_GOLD   = colors.HexColor("#C8963E")   # warm amber / gold
BRAND_CREAM  = colors.HexColor("#F5EFE6")   # off-white cream
BRAND_MID    = colors.HexColor("#3D2314")   # medium wood brown
BRAND_LIGHT  = colors.HexColor("#E3CCB0")   # light tan
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

    # Dark background
    c.setFillColor(BRAND_DARK)
    c.rect(0, 0, w, h, fill=1, stroke=0)

    # Gold top bar
    c.setFillColor(BRAND_GOLD)
    c.rect(0, h - 1.2 * cm, w, 1.2 * cm, fill=1, stroke=0)

    # Gold bottom bar
    c.rect(0, 0, w, 0.8 * cm, fill=1, stroke=0)

    # Decorative vertical stripe (left)
    c.setFillColor(BRAND_MID)
    c.rect(1.5 * cm, 0, 0.3 * cm, h, fill=1, stroke=0)

    # Logo (if available)
    logo_y = h - 5.5 * cm
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

    # Title
    c.setFillColor(BRAND_GOLD)
    c.setFont("Helvetica-Bold", 34)
    c.drawCentredString(w / 2, h - 9 * cm, "INVEH LIGHTING")

    c.setFillColor(BRAND_CREAM)
    c.setFont("Helvetica-Bold", 22)
    c.drawCentredString(w / 2, h - 10.5 * cm, "SOLUTIONS")

    # Horizontal rule
    c.setStrokeColor(BRAND_GOLD)
    c.setLineWidth(1.5)
    c.line(3 * cm, h - 11.2 * cm, w - 3 * cm, h - 11.2 * cm)

    # Tagline
    c.setFillColor(BRAND_LIGHT)
    c.setFont("Helvetica-Oblique", 12)
    c.drawCentredString(w / 2, h - 12.2 * cm, "Handcrafted Wooden Lamps & Décor")

    # Product count badge
    c.setFillColor(BRAND_MID)
    c.roundRect(w / 2 - 3 * cm, h - 14.5 * cm, 6 * cm, 1.4 * cm, 0.4 * cm, fill=1, stroke=0)
    c.setFillColor(BRAND_CREAM)
    c.setFont("Helvetica", 10)
    c.drawCentredString(w / 2, h - 13.9 * cm, "Exclusive Product Catalogue · 2025")

    # Contact block at bottom
    c.setFillColor(BRAND_CREAM)
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, 3.5 * cm, "www.inveh.in  ·  inveh.in@gmail.com")
    c.setFont("Helvetica", 8)
    c.drawCentredString(w / 2, 2.5 * cm, "Instagram: @invehlighting")

    c.setFillColor(BRAND_DARK)
    c.setFont("Helvetica", 7)
    c.drawCentredString(w / 2, 1.2 * cm, "© 2025 Inveh Lighting Solutions. All rights reserved.")


# ── Page header/footer callback ───────────────────────────────────────────────
def make_page_callback(title_text: str = "INVEH LIGHTING SOLUTIONS — Product Catalogue"):
    def on_page(c: canvas.Canvas, doc):
        w, h = PAGE_W, PAGE_H
        # Header bar
        c.setFillColor(BRAND_DARK)
        c.rect(0, h - 1.1 * cm, w, 1.1 * cm, fill=1, stroke=0)
        c.setFillColor(BRAND_GOLD)
        c.setFont("Helvetica-Bold", 7)
        c.drawCentredString(w / 2, h - 0.65 * cm, title_text)

        # Footer
        c.setFillColor(BRAND_GOLD)
        c.rect(0, 0, w, 0.7 * cm, fill=1, stroke=0)
        c.setFillColor(BRAND_DARK)
        c.setFont("Helvetica", 7)
        c.drawCentredString(w / 2, 0.22 * cm, f"Page {doc.page}  ·  www.inveh.in")

    return on_page


# ── Product card (one row in the table grid) ──────────────────────────────────
IMG_W  = 5.8 * cm
IMG_H  = 5.8 * cm
CELL_W = 8.2 * cm   # width for text column next to image


def build_product_card(product: dict, styles: dict) -> list:
    """
    Returns a list of flowables that form one product card.
    Layout: [image | info block] side by side via a 2-column Table.
    """
    # ── Resolve first image ──
    img_flowable = None
    for rel_path in product["images"]:
        # Strip leading slash from paths like /INB001_…/…
        clean = rel_path.lstrip("/")
        found = find_image(clean)
        if found:
            img_flowable = rl_image(found, IMG_W, IMG_H)
            break

    if img_flowable is None:
        # Placeholder grey box
        img_flowable = Spacer(IMG_W, IMG_H)

    # ── Info block ──
    price = product["model_price"]
    discount = product["discount"]
    if discount > 0:
        final = price * (1 - discount / 100)
        price_text = (
            f'<strike>₹{price:,.0f}</strike>  '
            f'<b>₹{final:,.0f}</b> ({discount:.0f}% off)'
        )
    else:
        price_text = f"₹{price:,.0f}"

    info = [
        Paragraph(product["model_name"], styles["product_name"]),
        Spacer(1, 1 * mm),
        Paragraph(f"SKU: {product['model_num']}", styles["product_sku"]),
        Spacer(1, 2 * mm),
        Paragraph(price_text, styles["product_price"]),
        Spacer(1, 3 * mm),
        HRFlowable(width="100%", thickness=0.5, color=BRAND_LIGHT),
        Spacer(1, 3 * mm),
        Paragraph(product["description"], styles["product_desc"]),
    ]

    # 2-column inner table: [image | info]
    card_table = Table(
        [[img_flowable, info]],
        colWidths=[IMG_W + 0.3 * cm, CELL_W],
        rowHeights=None,
    )
    card_table.setStyle(TableStyle([
        ("VALIGN",      (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING",  (0, 0), (0, 0),  2),
        ("RIGHTPADDING", (0, 0), (0, 0),  8),
        ("LEFTPADDING",  (1, 0), (1, 0),  6),
        ("RIGHTPADDING", (1, 0), (1, 0),  2),
        ("TOPPADDING",   (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING",(0, 0), (-1, -1), 4),
    ]))

    return [card_table]


# ── Main builder ──────────────────────────────────────────────────────────────
def build_brochure(products: list[dict]):
    styles = make_styles()

    doc = BaseDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=1.8 * cm,
        rightMargin=1.8 * cm,
        topMargin=1.6 * cm,
        bottomMargin=1.4 * cm,
    )

    # Cover template (no header/footer)
    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0,
                        topPadding=0, bottomPadding=0)
    cover_template = PageTemplate(
        id="cover",
        frames=[cover_frame],
        onPage=draw_cover,
    )

    # Content template (with header/footer)
    content_frame = Frame(
        doc.leftMargin,
        doc.bottomMargin + 0.7 * cm,   # room for footer
        PAGE_W - doc.leftMargin - doc.rightMargin,
        PAGE_H - doc.topMargin - doc.bottomMargin - 1.1 * cm - 0.7 * cm,
    )
    content_template = PageTemplate(
        id="content",
        frames=[content_frame],
        onPage=make_page_callback(),
    )

    doc.addPageTemplates([cover_template, content_template])

    # ── Story ────────────────────────────────────────────────────────────────
    story = []

    # Cover page (handled entirely by draw_cover callback; we just push a page break)
    story.append(PageBreak())

    # Switch to content template
    from reportlab.platypus import NextPageTemplate
    story.insert(0, NextPageTemplate("cover"))
    story.append(NextPageTemplate("content"))

    # Group products by category title
    categories: dict[str, list] = {}
    for p in products:
        cat = p["title"].strip() if p["title"].strip() else "Bulb Models"
        categories.setdefault(cat, []).append(p)

    # Introduction page
    intro_text = (
        "Welcome to Inveh Lighting Solutions — where nature meets craftsmanship. "
        "Each piece in our collection is handcrafted from premium pine wood using "
        "precision laser-cutting techniques. We blend modern manufacturing with "
        "artisanal warmth to create lamps that don't just light a room — they "
        "transform it.<br/><br/>"
        "Browse our full range below. Customisation is available on most models. "
        "Contact us at <b>inveh.in@gmail.com</b> or visit <b>www.inveh.in</b>."
    )
    intro_style = ParagraphStyle(
        "intro",
        fontName="Helvetica",
        fontSize=10,
        textColor=BRAND_DARK,
        leading=16,
        spaceAfter=6,
    )
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph("About Us", styles["section_heading"]))
    story.append(HRFlowable(width="100%", thickness=1, color=BRAND_GOLD, spaceAfter=6))
    story.append(Paragraph(intro_text, intro_style))
    story.append(Spacer(1, 0.8 * cm))

    # Products section header
    story.append(Paragraph("Our Products", styles["section_heading"]))
    story.append(HRFlowable(width="100%", thickness=1, color=BRAND_GOLD, spaceAfter=8))
    story.append(Spacer(1, 0.3 * cm))

    # Render each category
    for cat_name, cat_products in categories.items():
        # Category heading row (full-width gold background)
        cat_heading_style = ParagraphStyle(
            "cat_heading",
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=WHITE,
            leading=14,
        )
        heading_table = Table(
            [[Paragraph(cat_name.upper(), cat_heading_style)]],
            colWidths=[PAGE_W - doc.leftMargin - doc.rightMargin],
        )
        heading_table.setStyle(TableStyle([
            ("BACKGROUND",   (0, 0), (-1, -1), BRAND_MID),
            ("LEFTPADDING",  (0, 0), (-1, -1), 8),
            ("TOPPADDING",   (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING",(0, 0), (-1, -1), 4),
            ("ROWBACKGROUNDS",(0, 0), (-1, -1), [BRAND_MID]),
        ]))
        story.append(heading_table)
        story.append(Spacer(1, 4 * mm))

        # 2-column grid of product cards
        # Pack cards into rows of 2
        for i in range(0, len(cat_products), 2):
            left_p  = cat_products[i]
            right_p = cat_products[i + 1] if i + 1 < len(cat_products) else None

            left_card  = build_product_card(left_p,  styles)
            right_card = build_product_card(right_p, styles) if right_p else [Spacer(1, 1)]

            col_w = (PAGE_W - doc.leftMargin - doc.rightMargin) / 2 - 0.4 * cm

            row_table = Table(
                [[left_card, right_card]],
                colWidths=[col_w, col_w],
            )
            row_table.setStyle(TableStyle([
                ("VALIGN",       (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING",  (0, 0), (-1, -1), 2),
                ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                ("TOPPADDING",   (0, 0), (-1, -1), 2),
                ("BOTTOMPADDING",(0, 0), (-1, -1), 2),
                # Light separator line between the two columns
                ("LINEAFTER", (0, 0), (0, -1), 0.5, BRAND_LIGHT),
            ]))
            story.append(row_table)

            # Thin divider between product rows
            story.append(HRFlowable(width="100%", thickness=0.3, color=BRAND_LIGHT, spaceAfter=4))

        story.append(Spacer(1, 6 * mm))

    # Back / closing page
    story.append(PageBreak())
    closing_style = ParagraphStyle(
        "closing",
        fontName="Helvetica-Bold",
        fontSize=18,
        textColor=BRAND_GOLD,
        alignment=TA_CENTER,
        leading=24,
    )
    story.append(Spacer(1, 5 * cm))
    story.append(Paragraph("Thank you for choosing Inveh", closing_style))
    story.append(Spacer(1, 0.5 * cm))
    sub_style = ParagraphStyle(
        "sub",
        fontName="Helvetica",
        fontSize=11,
        textColor=BRAND_DARK,
        alignment=TA_CENTER,
        leading=18,
    )
    story.append(Paragraph(
        "Every lamp carries a piece of our craft into your home.<br/><br/>"
        "<b>www.inveh.in</b><br/>"
        "inveh.in@gmail.com<br/>"
        "@invehlighting",
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
