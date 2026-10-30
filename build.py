"""Baut aus dino-memory.html die iPad-Web-App in docs/index.html.

Aufruf: python3 build.py
Danach in docs/sw.js die VERSION hochzählen, damit das iPad die neue Fassung lädt.
"""
from pathlib import Path

here = Path(__file__).parent
src = (here / "dino-memory.html").read_text(encoding="utf-8")
head, body = src.split("</style>\n", 1)

page = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Dino-Memory">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#2e7d5b">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
{head}
:root {{ padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); box-sizing: border-box; height: 100%; }}
</style>
</head>
<body>
{body}
<script>
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {{}});
</script>
</body>
</html>
"""
(here / "docs" / "index.html").write_text(page, encoding="utf-8")
print("docs/index.html geschrieben")
