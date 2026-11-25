from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.pdfgen.canvas import Canvas

OUT = Path("output/pdf/Cosmic-Cap-Table.pdf")
PAPER, INK, MUTED, ACCENT, LINE = map(colors.HexColor, ("#F1F0E8", "#254A40", "#63766A", "#4D8269", "#CCD5C8"))

def txt(c, value, x, y, font="Helvetica", size=10, color=INK):
    c.setFont(font, size); c.setFillColor(color); c.drawString(x, y, value)

def line(c, x1, y1, x2, y2, color=LINE):
    c.setStrokeColor(color); c.setLineWidth(.6); c.line(x1, y1, x2, y2)

def panel(c, x, y, w, h, fill, stroke=LINE):
    c.setFillColor(fill); c.setStrokeColor(stroke); c.roundRect(x, y, w, h, 10, fill=1, stroke=1)

def percentage(c, value, x, y):
    txt(c, value, x, y, "Times-Roman", 26)
    txt(c, "%", x + (30 if len(value) < 3 else 42), y + 2, "Times-Roman", 13, ACCENT)

def founder_row(c, y, name, role, sweat, award, detail):
    txt(c, name, 78, y + 7, "Helvetica-Bold", 10)
    txt(c, role, 78, y - 9, "Helvetica", 7.5, MUTED)
    percentage(c, sweat, 280, y)
    if award == "-":
        txt(c, "-", 460, y + 4, "Times-Roman", 22)
    else:
        percentage(c, award, 460, y)
    for index, detail_line in enumerate(detail.split("|")):
        txt(c, detail_line, 460, y - 9 - index * 8, "Helvetica", 6.5, MUTED)
    line(c, 60, y - 22, 550, y - 22, colors.HexColor("#E0E5D9"))

def round(c, x, label, title, terms, pct, references=None, note=False):
    txt(c, label, x, 147, "Helvetica-Bold", 6.5, MUTED)
    txt(c, title, x, 129, "Helvetica-Bold", 12)
    txt(c, terms, x, 114, "Helvetica", 7.1, MUTED)
    percentage(c, pct, x, 76)
    if note: txt(c, "*", x + 50, 91, "Times-Roman", 14, ACCENT)
    txt(c, "External investors", x, 57, "Helvetica", 8, MUTED)
    if references:
        line(c, x, 43, x + 180, 43, colors.HexColor("#C7D4BD"))
        txt(c, "SELECTED SEED ROUND FUNDING REFERENCES", x, 31, "Helvetica-Bold", 5.5, MUTED)
        for offset, reference in enumerate(references): txt(c, reference, x, 20 - offset * 8, "Helvetica", 6.2, MUTED)

def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = Canvas(str(OUT), pagesize=landscape(letter)); c.setTitle("Cosmic - Proposed Cap Table")
    c.setFillColor(PAPER); c.rect(0, 0, 792, 612, fill=1, stroke=0)
    txt(c, "COSMIC / FOUNDER WORKSPACE", 48, 556, "Helvetica-Bold", 7, ACCENT)
    txt(c, "Proposed cap table", 48, 518, "Times-Roman", 30)
    txt(c, "4-year vesting · 1-year cliff", 610, 521, "Helvetica-Bold", 8.5)
    txt(c, "Applies to all founders", 610, 506, "Helvetica", 7.5, MUTED); line(c, 48, 487, 744, 487)

    panel(c, 48, 247, 515, 215, colors.HexColor("#FAFAF5"))
    txt(c, "01", 68, 435, "Times-Italic", 19, ACCENT); txt(c, "The founding team", 100, 439, "Helvetica-Bold", 13)
    txt(c, "Sweat equity and contribution awards.", 100, 423, "Helvetica", 8.5, MUTED); line(c, 60, 405, 550, 405)
    txt(c, "SHAREHOLDER", 60, 389, "Helvetica-Bold", 7, MUTED); txt(c, "SWEAT EQUITY", 280, 389, "Helvetica-Bold", 7, MUTED); txt(c, "CONTRIBUTION AWARD", 460, 389, "Helvetica-Bold", 7, MUTED)
    founder_row(c, 354, "Primary founder", "Founder", "40", "11", "Pre-incorporation R&D, IP and|early capital contribution")
    founder_row(c, 306, "Co-founder", "Founding partner", "7.5", "8", "Up to @ $1.79M Post Money Valuation")
    founder_row(c, 258, "Second co-founder", "Optional allocation", "2.5", "-", "No contribution award specified")

    panel(c, 582, 247, 162, 215, INK, INK)
    txt(c, "02 / RESERVED FOR THE TEAM", 599, 435, "Helvetica-Bold", 6, colors.HexColor("#C2D1B8"))
    txt(c, "Room for", 599, 398, "Times-Roman", 22, PAPER); txt(c, "exceptional people.", 599, 374, "Times-Italic", 19, colors.HexColor("#BED0AB"))
    txt(c, "5", 599, 320, "Times-Roman", 42, PAPER); txt(c, "%", 628, 324, "Times-Roman", 18, colors.HexColor("#BED0AB"))
    txt(c, "ESOP pool · Reserved", 599, 297, "Helvetica", 7.5, colors.HexColor("#D4E1CB")); line(c, 599, 283, 727, 283, colors.HexColor("#628071"))
    txt(c, "Core tech team  2%", 599, 270, "Helvetica", 6.7, colors.HexColor("#D4E1CB")); txt(c, "Legal team  1%", 599, 259, "Helvetica", 6.7, colors.HexColor("#D4E1CB")); txt(c, "Management  2%", 599, 250, "Helvetica", 6.7, colors.HexColor("#D4E1CB"))

    panel(c, 48, 24, 696, 190, colors.HexColor("#E9EEE1"))
    txt(c, "03", 68, 179, "Times-Italic", 19, ACCENT); txt(c, "The capital roadmap", 100, 183, "Helvetica-Bold", 13); txt(c, "Proposed allocations for external investors.", 100, 167, "Helvetica", 8.5, MUTED); line(c, 60, 151, 732, 151, colors.HexColor("#C7D4BD"))
    round(c, 60, "ROUND 01", "Pre-seed", "$125k @ 7% & $350k uncapped SAFE", "11", ["Wordware - $30M @ $150M", "Slingshot AI - $30M @ $220M", "Collate - $30M @ uncapped"])
    line(c, 285, 52, 285, 145, colors.HexColor("#C7D4BD")); round(c, 310, "ROUND 02", "Pre-Series A", "$25m @ $166m post-money", "15")
    line(c, 510, 52, 510, 145, colors.HexColor("#C7D4BD")); round(c, 535, "ROUND 03", "Series A", "$60m @ $600m post-money", "10", note=True)
    txt(c, "* Series A dilution is contributed by the existing board at that time, in line with the company’s then-current ownership structure.", 310, 8, "Helvetica", 5.4, MUTED)
    c.save()

if __name__ == "__main__": main()
