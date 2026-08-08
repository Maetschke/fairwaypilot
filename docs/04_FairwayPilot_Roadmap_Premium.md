# FairwayPilot – Technische Roadmap „Premium-Ausbau"
**Erstellt 07.08.2026 · Aktualisiert 08.08.2026**
**Grundlage: Projektauftrag „Weiterentwicklung einer Premium-Golf-App" + Nachtrag „Interaktive 3D-Grünanalyse"**

> Vierte persistente Projektdatei. Ergänzt Projektkontext (01), Backlog (02), Referenzdaten (03).
> Regel für die gesamte Roadmap: **Keine bestehende Funktion wird entfernt oder verschlechtert.**
> Jedes Modul wird einzeln umgesetzt, getestet, dokumentiert – und erst nach Freigabe folgt das nächste.

**Stand 08.08.2026:** Alle drei Vorentscheidungen sind gefallen. E5 entschieden (fünf Tabs), C1 bestanden (M5 bleibt bei 14–20 h), C2 bewertet (M9a/b machbar, M9c gestrichen). Die Vorarbeit vor M0 ist damit vollständig.

---

## 1. Bestandsaufnahme (gemessen, nicht geschätzt)

| Kennzahl | Wert | Bedeutung |
|---|---|---|
| `worker.js` gesamt | **885 KB** | eine Datei, ~250 Zeilen |
| davon Base64-Icons | **487 KB (55 %)** | `ICON_512` allein 359 KB in *einer* Zeile |
| HTML-Konstante | **~342 KB** | als JSON-String im Worker |
| davon Inline-JS | **313 KB (91 %)** | der gesamte App-Code |
| Funktionen | **370+** | überwiegend mit Präfix `RT_` |
| Tabs aktuell | **3** | `runde`, `detail`, `hi` |

### Was daraus folgt

**a) Der Namespace ist ein Monolith.** Keine Modulgrenzen, keine Trennung von UI / Businesslogik / Datenzugriff, kein State Management außer globalen Variablen.

**b) Escaping war der Kostentreiber – ist aber entschärft.** Seit 08.08. werden Änderungen an der HTML-Konstante über Dekodieren → Klartext ändern → `json.dumps` zurückschreiben gemacht (Datei 01, Abschnitt „Escaping vollständig vermeiden"). Damit ist die Escape-Problematik praktisch beseitigt. Das senkt den Druck auf M0, hebt ihn aber nicht auf: Modulgrenzen, Tree-Shaking und Tab-Registry entstehen dadurch nicht.

**c) Die Icons sind toter Ballast.** 487 KB Base64 werden bei jedem `git diff`, Deploy und jeder Code-Suche mitgeschleppt.

**d) `showTab()` ist hartcodiert.** Drei `if`-Zweige plus `['hi','detail','runde'].forEach(...)`.

**e) Navigation:** Runde / Schlag-Detail / Handicap / Learning / Shot-Tracer sind die drei bestehenden Tabs plus zwei neue. **Kein bestehender Tab muss weichen.** Green View bekommt keinen Tab – siehe E5.

---

## 2. Leitentscheidungen

### E1 – Build-Schritt einführen, bevor neue Module entstehen
**Empfehlung: ja, als allererster Schritt.**

Neue Quellstruktur `src/` mit echten ES-Modulen, gebündelt per esbuild zu `worker.js`. Der bestehende Block wandert als **ein einziges Legacy-Modul** hinüber – unverändert, kein Refactoring, reine Verschiebung.

Abnahmekriterium: Der gebaute `worker.js` verhält sich identisch zum Live-Stand. Rollback-Punkt ist das Git-Tag **`pre-premium`** (Commit `0c65ae63`).

### E2 – Inhalte gehören nicht in den Worker
**Empfehlung: alle Lerninhalte als versionierte JSON-Bundles nach `assets/learning/`.**

Grobschätzung: 10 Platzreife-Kapitel, 300+ Fragen, 23 Golfwissen-Module, 16 Lexikoneinträge, Trainingspläne, Videokatalog → **400–800 KB Text**. Als Assets, per `fetch` nachgeladen und in der Cache API abgelegt, ist es offlinefähig, versionierbar und ohne Deploy aktualisierbar.

### E3 – Icons auslagern
487 KB Base64 raus, hinein nach `assets/icons/`. Der Worker halbiert sich. Ausnahme: kleines Favicon-Inline für den ersten Paint.

**Achtung:** `capacitor/scripts/build-www.js` extrahiert die Icons per Regex `const ICON_xxx = "…"` aus `worker.js`. Bei E3 muss das Skript mitgezogen werden, sonst bricht der Capacitor-Build.

### E4 – Datenhaltung
Neue Supabase-Tabellen, jeweils mit RLS `user_id = auth.uid()`. Lokaler Spiegel in IndexedDB (nicht localStorage – bei Videos und Reliefdaten zu klein), Sync nach dem `sbPull`/`sbPush`-Muster.

**Beachten:** `sbPull()` weiterhin nur bei echten Sign-in-Events. Bei allem, was „mein Spieler" meint, gilt `RT_myPlayerIndex()` statt `players[0]`. Bei mehreren Zeilen gleicher ID gewinnt die eigene.

### E5 – Fünf Tabs, Green View kontextuell ✅ **entschieden 08.08.2026 (Variante 1)**

Der Nachtrag forderte „Green View" zusätzlich in der Footer-Navigation. Das wären sechs Einträge gewesen.

**Das Platzargument, gemessen an der echten Tab-Bar** (`max-width:430px`, außen `padding:8px 16px`, innen `8px`, Buttons `padding:6px 16px`, Label `9px`):

| Gerät | nutzbare Breite | bei 5 Tabs | bei 6 Tabs | Label-Platz bei 6 |
|---|---|---|---|---|
| iPhone 16 Pro Max (430 px) | 382 px | 76 px | 64 px | 32 px |
| iPhone 15 (393 px) | 345 px | 69 px | 57 px | 25 px |
| iPhone SE (375 px) | 327 px | 65 px | 54 px | **22 px** |

„Handicap" braucht bei 9 px Inter rund 44 px, „Schlag-Detail" über 60. Bei sechs Tabs müsste man entweder das Button-Padding opfern (Touch-Ziele fallen unter die 44-px-Vorgabe aus M8) oder die Labels weglassen.

**Der inhaltliche Grund wiegt schwerer:** Ein Grün liest man, während man davorsteht. Als globaler Tab wäre der Einstieg Tab → Platz → Bahn → Grün. Aus der Bahn heraus ist es ein Schritt, und die Ballposition ist bereits gesetzt.

**Entschieden:**

| | |
|---|---|
| Tabs | Runde · Schlag-Detail · Handicap · Learning · Tracer |
| Green View | Ansicht in der Bahn, Modus-Umschalter Satellit / Birdiekarte / Green View |
| Trainingsmodus + Putt-Statistik | unter Learning (runden-unabhängig) |
| Tracer-Tab | Bibliothek und Historie |
| Tracer-Aufnahme | startet aus der Bahn, gekoppelt an die markierte Balllage |

**Konsequenz für M0 – die Registry braucht zwei Konzepte:**

- `registerTab({id,label,icon,mount,unmount})` – die fünf Navigationspunkte
- `registerView({id,mount,unmount})` – kontextuelle Vollbildansichten ohne Tab-Eintrag (Green View, Tracer-Recorder)

Ohne diese Trennung landet jede neue Vollbildansicht wieder als Sonderfall im `showTab()`-Nachfolger.

**Dokumentierte Abweichung vom Auftrag:** Der Nachtrag verlangt Green View in der Footer-Navigation. Diese Vorgabe wird bewusst nicht umgesetzt – Begründung oben. Nicht als offener Widerspruch behandeln.

---

## 3. Modulplan

### M0 · Fundament
*Kein sichtbares Feature außer der neuen Tab-Bar – aber die Voraussetzung für alles Weitere.*

- `src/`-Struktur, esbuild-Build, GitHub Action oder Cloudflare-Build-Konfiguration
- Legacy-Code als `src/legacy/app.js` (unverändert)
- Icons nach `assets/icons/`, `build-www.js` nachziehen
- `showTab()` → Tab-Registry **plus View-Registry** (siehe E5)
- Fünf Tabs sichtbar; Learning und Shot-Tracer als leere Shell
- Design-Tokens (`tokens.css`): Farben, Typo, Abstände, Radien, Schatten, Dark/Light
- Service-Worker-Strategie: App-Shell precache, Inhalte stale-while-revalidate
- Mitnehmen: Startseite auf 20 Runden begrenzen (Backlog N2)

**Risiko:** mittel (Deploy-Kette ändert sich). **Nutzen:** hoch, dauerhaft.
**Abnahme:** Regressionsliste vollständig grün; Deploy grün; Live-Verifikation über Cloudflare.
**Werkzeug: ab hier Claude Code, nicht Chat** – M0 legt viele Dateien an, die GitHub-Contents-API ist dafür der falsche Weg.
**Aufwand: 6–9 h**

---

### M1 · Learning – Shell + Platzreife-Kurs
- Kartenbasierte Navigation (Platzreife / Golfwissen / Videos / Trainingspläne / Lexikon)
- Content-Loader mit Cache API und Versionsstempel
- 10 Kapitel: Golfregeln, Etikette, Sicherheit, Verhalten auf dem Platz, Spielablauf, WHS, Stableford, Zählweisen, Ausrüstung, Golfbegriffe
- Je Kapitel: Erklärung, Beispiele, Merkkästen, Grafik-Platzhalter, Zusammenfassung
- Fortschritt je Kapitel (Supabase `learning_progress` + IndexedDB)

**Fachliche Basis:** WHS-Formeln, Stableford und NDB aus Datei 03, nicht neu recherchieren. Georghausen als durchgängiges Rechenbeispiel.

**Rechtlicher Hinweis, der in die App gehört:** Die Platzreife-Prüfung liegt beim jeweiligen Club, es gibt keinen bundesweit einheitlichen Fragenkatalog. Der Kurs ist Vorbereitung, keine Prüfungsgarantie – ein Disclaimer schützt die GmbH.

**Aufwand: 10–14 h**

---

### M2 · Fragenkatalog
- 300+ Fragen, vier Optionen, genau eine richtige, jeweils mit Erklärung
- Modi: Lernen, Prüfung, Zufall, Fehlerwiederholung
- Bestehenssimulation, Fortschritts- und Erfolgsstatistik
- Datenmodell: `{id, kapitel, frage, optionen[4], richtig, erklaerung, schwierigkeit}`

**Umsetzung in Chargen:** 10 Kapitel × ~30 Fragen, in drei bis vier Lieferungen. Qualität vor Menge.

**Aufwand: 12–16 h**

---

### M3 · Golfwissen + Schlaglexikon
- 23 Technikmodule (Griff bis Fehlerbilder), je mit Einführung, Schritt-für-Schritt, typischen Fehlern, Korrekturen, Übungen, Checkliste, Zusammenfassung
- Trainingspläne für vier HCP-Stufen mit Wochenplan und Fortschritt
- Schlaglexikon, alphabetisch, mit Suche
- Querverweise zwischen Lexikon, Technikmodulen und (ab M5) Shot-Tracer

**Aufwand: 14–18 h**

---

### M4 · Video-Akademie
- 13 Kategorien, Streaming-Optik: großes Vorschaubild, Titel, Kanal, Dauer, Beschreibung, „Ansehen"
- Adapter-Architektur für spätere API-Ergänzung

**Zwei Punkte, die vor der Umsetzung geklärt sein müssen:**

1. **Datenschutz.** YouTube-Einbettungen setzen Cookies. Zwei-Klick-Lösung ist Pflicht: Vorschaubild lokal, Einbettung über `youtube-nocookie.com` erst nach aktivem Klick, plus Ergänzung der Datenschutzerklärung.
2. **YouTube-Nutzungsbedingungen.** Erlaubt ist ausschließlich der offizielle Embed-Player. Kein Reupload, kein Herunterladen. Data API v3 mit 10.000 Einheiten Tagesquote – ausreichend bei nächtlicher statt Live-Abfrage.

**Aufwand: 5–7 h** (davon ~2 h Kuratierung von Hand)

---

### M5 · Shot-Tracer v1 ✅ **Machbarkeit bestätigt (C1, 08.08.2026)**
- Video aufnehmen (`MediaRecorder`) oder importieren
- Drei Markierungen: Ballposition, Treffmoment, Landepunkt
- Flugbahn als Canvas-Overlay über dem `<video>`, weich animiert; Formen Gerade / Fade / Draw / Slice / Hook
- Wiedergabe: Pause, Zeitlupe, Einzelbild, Flugbahn ein-/ausblenden

**C1-Ergebnis (iOS 18.7 / Safari 27, Messwerte in Datei 03):** `requestVideoFrameCallback` und `MediaRecorder` vorhanden, fünf Aufnahmeformate, Einzelbildsprünge in 10–12 ms, Zeitlupe exakt 0,25×. **Der Aufwand verdoppelt sich nicht – M5 bleibt bei 14–20 h.**

**Drei Konstruktionsvorgaben aus C1, die vor dem ersten Codezeile feststehen:**

1. **Zielzeit immer `(bildnummer + 0,5) / fps`**, nie auf die Bildgrenze. Bei Offset 0,25/0,50/0,75 ist der Fehler exakt null, bei 0,00 bis zu ein Bild.
2. **Im pausierten Zustand auf `seeked` warten, `requestVideoFrameCallback` nur bei laufender Wiedergabe.** rVFC hängt an der Frame-Präsentation; nach einem Seek gibt es genau eine, und die passiert oft vor der Registrierung des Callbacks. Im Test führte das zu 55 Zeitüberschreitungen.
3. **Overlay in Anzeigegröße rendern** (Pixelverhältnis auf 2 gedeckelt), Trajektorie in ein Offscreen-Canvas vorgerechnet, pro Frame nur der Fortschritt gezeichnet. In Videoauflösung mit Neuaufbau pro Frame: 21 fps; so: 37,7 fps.

**Aufwand: 14–20 h**

---

### M6 · Shot-Tracer – Analyse, Export, Historie
- Wiedergabe-Historie mit Schlägerfilter
- Export: Video, GIF, Link

**Zur Analyse eine klare Ansage:** Aus einem Handyvideo allein lässt sich **keine belastbare Schlaglänge** berechnen – ohne bekannten Maßstab wäre jede Meterangabe Pseudo-Präzision.

| Größe | Aus Video allein | Mit Zusatzinfo |
|---|---|---|
| Flugzeit | ✅ exakt (Frames) | – |
| Ballstartlinie | ✅ relativ | – |
| seitliche Abweichung | ✅ relativ (in Grad) | absolut, wenn Länge bekannt |
| Apex | ⚠️ nur relativ zur Flugbahn | absolut mit Maßstab |
| Schlaglänge | ❌ | ✅ aus den GPS-Balllagen der Runde |

**Das ist der eigentliche Hebel:** FairwayPilot kennt die GPS-Positionen jedes Schlags über `RT_pinsOf()`. Wird der Shot-Tracer an eine markierte Balllage gekoppelt, entsteht eine echte, gemessene Schlaglänge – etwas, das reine Tracer-Apps nicht können. Deshalb startet die Aufnahme aus der Bahn (siehe E5).

**Export-Hinweis:** „Link" bedeutet Upload in Supabase Storage plus signierte URL. Videos vorher herunterskalieren – C1 zeigte, dass das Gerät ein 1206×2622-Video nur mit rund 39 statt 60 fps dekodiert.

**Aufwand: 10–14 h**

---

### M9 · Green View ✅ **Zuschnitt entschieden (C2, 08.08.2026)**

*Bewusst ans Ende gestellt: teilt mit M5/M6 die 3D- und Datenthemen und profitiert davon, wenn Tab-Registry, Content-Loader und Renderer-Architektur stehen.*

**Umfang laut Auftrag:** sechs Ansichten, frei navigierbares 3D-Geländemodell, Break-Berechnung mit Puttlinie, Putt-Simulation, Trainingsmodus, Statistik, Community-Datenmodell, Offline-Fähigkeit.

**C2-Ergebnis (Details und Zahlen in Datei 03):**

Die Datenlage ist besser als in der ersten Fassung dieser Roadmap angenommen – die amtliche Angabe ±10,5 cm bezieht sich auf 2σ, die Standardabweichung liegt also bei rund 5,25 cm. Simulation über ein 25×25-m-Grün:

| Auswertung | Fehler Median | Fehler 90. Perzentil |
|---|---|---|
| Falllinie über das ganze Grün | 0,3–0,8° | 0,7–2,0° |
| lokale Neigung über 8 m | 4–6 % | 10–15 % |
| lokale Neigung über 4 m (Puttlänge) | 11–14 % | 25–34 % |

**Die Falllinie ist exzellent bestimmbar** – unter einem Grad ist genauer, als ein Golfer ein Grün mit dem Auge liest. **Der Break auf Puttlänge nicht:** 14 % Fehler bedeuten bei einem 3-m-Putt mit 40 cm Break rund ±5 cm, im ungünstigen Zehntel ±13 cm. Das Loch ist 10,8 cm breit.

**Die harte Grenze ist die Rasterweite, nicht das Rauschen.** Konturen unter zwei bis drei Metern Wellenlänge erscheinen im DGM1 überhaupt nicht – genau die entscheiden über die letzten Meter. Die höhere Punktdichte ab 2027 verbessert die Genauigkeit, nicht die Rasterweite.

**Entschiedener Zuschnitt:**

| Stufe | Inhalt | Status |
|---|---|---|
| **M9a** | Draufsicht, Relief, Höhenlinien, 3D-Modell, Neigungspfeile | ✅ bauen |
| **M9b** | Ball- und Fahnenposition, Distanz, Falllinie qualitativ („fällt nach links") | ✅ bauen |
| **M9c** | Break in Zentimetern, Puttlinie, Simulation | ❌ **gestrichen** – mit offenen Daten grundsätzlich nicht machbar |

M9c bleibt nur über eine andere Datenquelle erreichbar: Vermessungsdaten vom Club selbst oder eigene Aufnahme. **Das Community-Datenmodell mit Versionierung und Qualitätsbewertung ist genau dafür der Vorbau und wird in M9a bereits angelegt** – auch wenn es zunächst nichts einzusammeln gibt.

In der App gehört ein ehrlicher Hinweis dazu: Relief und Falllinie ja, Zentimeterangabe für die Puttlinie nein. Das entspricht der Auftragsvorgabe, dass keine scheinbar exakte Berechnung erfolgen soll, wenn die Daten sie nicht hergeben.

**Weitere Punkte:**
- Rendering-Engine austauschbar halten (Three.js als erste Implementierung, r128 im Projekt bekannt)
- Level-of-Detail und optimierte Datenstrukturen für Smartphone-Performance
- Offline über IndexedDB, nicht localStorage
- Datenbezug: DGM1-Kacheln von opengeodata.nrw.de, Namensschema und Kachel-IDs für Georghausen in Datei 03

**Aufwand: 20–30 h** für M9a und M9b.

---

### M7 · Verbundene Dienste
- Einstellungsbereich mit Verbinden / Trennen / Status / letzte Synchronisation / manuelle Synchronisation
- Ausdrückliche Einwilligung vor jeder Übertragung, jederzeit widerrufbar
- Adapter-Interface, sodass weitere Dienste nur ergänzt werden

**Startet nicht mit Garmin.** Das Connect Developer Program nimmt seit ca. März 2026 keine Neuanträge an; die Golf Premium API ist kostenpflichtig, kuratiert und erst nach dem Store-Launch sinnvoll zu beantragen (Backlog N4).

**Reihenfolge der Adapter:** Apple Health (Capacitor-Plugin, sofort machbar) → FIT-Import (Garmin stellt das FIT-SDK offen bereit; der GPX-Import existiert bereits als Vorarbeit) → Garmin Cloud, sobald die Antwort vorliegt.

OAuth-Zugangsdaten liegen serverseitig im Worker als Runtime-Secret, niemals im Client.

**Aufwand: 7–10 h**

---

### M8 · Premium-Design-Durchgang
- Dark Mode / Light Mode vollständig
- Barrierefreiheit: Kontraste, Fokus, Touch-Ziele ≥ 44 px, Screenreader-Beschriftungen
- Animationen vereinheitlichen, `prefers-reduced-motion` respektieren
- Bild- und Ladeoptimierung, Lighthouse-Durchlauf

**Aufwand: 7–10 h**

---

## 4. Reihenfolge und Begründung

```
Android in die Testspur  →  M0  →  M1 → M2 → M3  →  M4 → M5 → M6 → M9a/b  →  M7 → M8
                                    (iOS läuft parallel nach, sobald Apple freigibt)
```

**Warum Store vor M0 – präzisiert am 08.08.2026:** Das Argument der ersten Fassung („Umbau der Deploy-Kette während laufender Einreichung ist vermeidbares Risiko") gilt weiter, hing aber an der Annahme, dass die Store-Phase überschaubar lange dauert. Apple kann sich unbegrenzt hinziehen; hinge M0 daran, stünde der gesamte Premium-Ausbau still. **Deshalb ist M0 an Android gekoppelt, nicht an Apple.** Sobald der Android-Build in der Play-Testspur liegt, hat die Deploy-Kette einmal nachweislich funktioniert.

**Warum Learning vor Shot-Tracer:** geringeres technisches Risiko, schneller sichtbarer Wert, und die Platzreife-Inhalte sind für Eva bei HCP 54 unmittelbar nützlich.

**Alternative, falls der Reiz überwiegt:** M5 direkt nach M0 vorziehen. Nach dem C1-Ergebnis ist das Risiko deutlich kleiner als bei Erstellung dieser Roadmap – die drei Konstruktionsvorgaben stehen, die Plattform kann alles Nötige. Kostet mehr Testzyklen auf echter Hardware, liefert dafür früher das Feature mit der größten Außenwirkung.

**Wo gespart werden kann:** M1–M3 machen mit 36–48 h gut ein Drittel des Gesamtaufwands aus und sind technisch die einfachsten. Der Fragenkatalog funktioniert auch mit 120 sehr guten Fragen statt 300 mittelmäßigen; die 23 Technikmodule ließen sich auf die 10 wichtigsten eindampfen.

---

## 5. Werkzeug- und Modellwahl

**Ab M0 in Claude Code arbeiten**, nicht im Chat. M0 legt viele Dateien an; über die GitHub-Contents-API ist das mühsam. Nach M0 liegt der Code ohnehin in echten `.js`-Dateien.

| Modul | Modell | Warum |
|---|---|---|
| M0 | Opus 5 | Architekturumbau mit klarer Zielvorgabe |
| M1 | Opus 5 | Struktur und WHS-Fachinhalte müssen sitzen |
| M2 | Opus 5 (erste Charge), dann Sonnet 5 | Muster einmal setzen, Rest ist Fließarbeit |
| M3 | Sonnet 5 | etabliertes Format, viel Text |
| M4 | Sonnet 5 | Kuratierung und Standard-UI |
| M5/M6 | **Fable 5** | Frame-genaue Videosteuerung, Canvas-Encoding |
| M9a/b | **Fable 5** | 3D-Rendering, Geodaten, Performance |
| M7 | Opus 5 | Adapter-Architektur, OAuth, Consent |
| M8 | Sonnet 5 | Handwerk, kein Neuland |

Faustregel: Opus 5 als Standard; Fable 5, wenn Opus bei einer Aufgabe strauchelt. Bei 120–170 h Gesamtaufwand ist das Rate Limit ein realer Faktor – bei häufigem Ausbremsen ist der Max-Plan die pragmatischere Antwort als ein schwächeres Modell.

---

## 6. Qualitätssicherung je Modul

1. Build lokal grün (`esbuild`), keine Warnungen
2. Funktionstest der geänderten Logik mit Stubs in Node, wo möglich gegen eine Referenzimplementierung. Für Render-Funktionen `vm.createContext` mit Stub-Globals – hat sich bei A4 und B9 bewährt
3. **Regressionsliste bestehender Funktionen** – Runde anlegen, Schlag erfassen, Markieren, Satellitenkarte drehen und verschieben, Grabber ziehen, Handicap-Berechnung, Scorekarte, eigener Platz, Konto, Einstellungen, geteilte Runde mit Evas Account, **Windanzeige, GPS-Start**
4. Deploy → Live-Verifikation über Cloudflare, dabei auch prüfen, dass **alter Code verschwunden** ist. Nach eindeutigen Mustern suchen – kurze Strings kommen zufällig in Base64-Icons vor
5. Aktualisierung der Projektdateien 01–04
6. Freigabe durch Mark, dann erst das nächste Modul

Die Regressionsliste ist der wichtigste Punkt. Die Vorgabe „keine bestehende Funktion darf verschlechtert werden" ist nur einzuhalten, wenn nach jedem Modul konkret nachgesehen wird – nicht, wenn es nur zugesichert wird.
