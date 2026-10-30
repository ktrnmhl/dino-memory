# Dino-Memory

Memory-Spiel für Kinder ab 5 Jahren, gemacht fürs iPad. 12 gezeichnete Dinos, beim Umdrehen wird der Name vorgelesen. Läuft nach dem ersten Öffnen auch offline.

**Spielen:** https://ktrnmhl.github.io/dino-memory/

Aufs iPad: Link in Safari öffnen → Teilen → „Zum Home-Bildschirm“.

## Aufbau
- `dino-memory.html`: das Spiel (Quelle)
- `build.py`: baut daraus die Web-App in `docs/`
- `docs/`: was GitHub Pages ausliefert (Seite, Manifest, Offline-Speicher `sw.js`, Icons)

Nach einer Änderung: `python3 build.py`, dann in `docs/sw.js` die `VERSION` hochzählen.
