# FairwayPilot – Arbeitsanweisung für Claude Code

## Was das hier ist

Golf-Handicap- und Rundentracking-PWA, betrieben als **einzelner Cloudflare Worker** (`worker.js`) mit eingebettetem HTML/JS, Supabase als Backend. Live unter fairwaypilot.com, Auto-Deploy aus diesem Repo (Branch `main`). Betreiberin: Mätschke Media & Consulting GmbH.

Produktiv genutzt von Mark, Eva (HCP 54) und Carsten. **Es gibt keine Staging-Umgebung – jeder Commit auf `main` geht live.**

## Projektwissen zuerst lesen

Vor jeder inhaltlichen Arbeit die vier Dateien in `docs/` lesen:

| Datei | Inhalt |
|---|---|
| `docs/01_FairwayPilot_Projektkontext.md` | Infrastruktur, Stand der App, Lernpunkte, Validierungspipeline |
| `docs/02_FairwayPilot_Offene_Punkte.md` | Backlog mit Status. **Erledigte Punkte nie erneut als offen behandeln.** |
| `docs/03_FairwayPilot_Referenzdaten.md` | WHS-Formeln, Platzdaten, Wind, Höhendaten, bereits behobene Datenfehler |
| `docs/04_FairwayPilot_Roadmap_Premium.md` | Modulplan M0–M9, getroffene Leitentscheidungen E1–E5 |

Am Ende jeder Session alle vier aktualisieren.

## Sprache

Mark kommuniziert auf Deutsch, die UI ist durchgängig deutsch. Code-Kommentare auf Deutsch ohne Umlaute (der Code liegt in einem JSON-String, Umlaute dort als `\uXXXX`). Antworten auf Deutsch, keine Floskeln, konkrete Empfehlungen statt Optionslisten.

## Arbeitsweise

- **Root-Cause-Fixes, keine Oberflächenpflaster.** Mark erkennt den Unterschied und fragt nach.
- **Vor größeren Features: echte Rückfragen mit Empfehlung**, nicht sofort umsetzen.
- **Ein Modul, ein Testlauf, eine Freigabe.** Erst danach das nächste.
- **Keine bestehende Funktion darf verschwinden oder schlechter werden.** Nach jedem Modul die Regressionsliste aus `docs/04` durchgehen – konkret nachsehen, nicht zusichern.

## Vor jedem Deploy (Pflicht)

1. `node --check worker.js` – äußere Syntax
2. HTML-Konstante extrahieren, `<script>`-Block isolieren, `node --check` darauf – **fängt Escape- und Ankerfehler zuverlässig**
3. Geänderte Logik mit Stubs in Node testen; Render-Funktionen über `vm.createContext` mit Stub-Globals
4. `npx --yes esbuild worker.js --bundle --format=esm` (aus `/tmp` ausführen, sonst kollidiert `.npmrc`)
5. Nach dem Deploy live verifizieren und prüfen, dass **alter Code verschwunden** ist. Nach eindeutigen Mustern suchen – kurze Strings kommen zufällig in den Base64-Icons vor.

## ⭐ Änderungen an der HTML-Konstante

Der gesamte App-Code liegt als JSON-String im Worker. **Niemals mit doppelt escapten Suchmustern im rohen `worker.js` arbeiten.** Stattdessen:

```python
dec = json.JSONDecoder()
j = w.find('function RT_markShot')
for p in range(j, 0, -1):
    if w[p] == '"' and w[p-1] != '\\':
        try: a, end = dec.raw_decode(w[p:])
        except Exception: continue
        if isinstance(a, str) and 'RT_markShot' in a:
            start, stop = p, p+end; break
a = a.replace(alt, neu)          # Klartext, kein Escaping
w = w[:start] + json.dumps(a) + w[stop:]
```

Rückprobe: `json.loads` der neuen Konstante muss zeichengleich mit dem geänderten Klartext sein.

## Fallen, die schon Zeit gekostet haben

- **Leaflet kennt keine CSS-Rotation.** In der gedrehten Vollbildkarte sind `divIcon`-Marker mit Inline-SVG die einzige verlässliche Zeichenprimitive. Panning über Differenzen, Marker-Dragging absolut – beides über `RT_correctedLatLng`, das **beide Achsen** rechnen muss.
- **Supabase `courses` hat Composite-PK `(id, user_id)`.** Upserts brauchen `user_id` und `onConflict:'id,user_id'`.
- **RLS-Policies dürfen sich nie selbst auf ihre eigene Tabelle beziehen** – `SECURITY DEFINER`-Funktion verwenden. RLS-Tests nur mit gesetzter Rolle in einer Transaktion.
- **`RT_myPlayerIndex()` statt `players[0]`**, sobald „mein Spieler" gemeint ist.
- **Eine 9-Loch-CR darf nie gegen einen 18-Loch-Par gerechnet werden.**
- **Runden speichern Snapshots** von Platzdaten. Korrekturen an `courses` wirken nie rückwirkend – gespeicherte Runden brauchen immer eigenes SQL.
- **`pointer-events:none` in einer Klasse schlägt jeden z-index.**
- Vor jeder Recherche im Code nach vorhandenen `RT_fix...`-Funktionen greppen.

## Deploy

Push auf `main` löst den Cloudflare-Build aus. Danach 45–60 s warten, dann verifizieren. Mehrere Änderungen in einen Commit bündeln.

Rollback-Punkt vor dem Premium-Umbau: Git-Tag **`pre-premium`** (Commit `0c65ae63`).

## Nächster Schritt

**M0 – Fundament.** Siehe `docs/04_Roadmap_Premium.md`. Kurz:

- `src/`-Struktur mit echten ES-Modulen, esbuild-Build zu `worker.js`
- Bestehender Code wandert **unverändert** als `src/legacy/app.js` hinüber – reine Verschiebung, kein Refactoring
- 487 KB Base64-Icons raus nach `assets/icons/`; **`capacitor/scripts/build-www.js` mitziehen**, es extrahiert die Icons per Regex
- `showTab()` → **Tab-Registry plus View-Registry** (fünf Tabs; Green View und Tracer-Recorder sind kontextuelle Vollbildansichten ohne Tab-Eintrag)
- Design-Tokens, Service-Worker-Strategie
- Mitnehmen: Startseite auf 20 Runden begrenzen

Abnahme: gebauter `worker.js` verhält sich identisch zum Live-Stand, Regressionsliste vollständig grün.
