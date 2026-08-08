# FairwayPilot – Golf-Referenzdaten & Domänenwissen

> Diese Datei als Projektwissen hinterlegen. Enthält verifizierte Formeln, Platzdaten und Interpretationsregeln, damit diese nicht in jedem neuen Chat neu recherchiert oder falsch angenommen werden.
> Stand: 08.08.2026 – neu in dieser Version: Windberechnung, iOS-Videosteuerung (C1), NRW-Höhendaten (C2), Bestätigung Bahn 15.

## WHS/DGV-Grundbegriffe

- **CR** = Course Rating, **Slope** = Slope Rating, **SI** = Stroke Index, **HI** = Handicap Index, **CH** = Course Handicap, **SV** = Spielvorgabe, **NDB** = Net Double Bogey.
- **Playing-Handicap-Formel:** `Spielvorgabe = HCP × Slope/113 + CR − Par`
- **Netto-Stableford:** `Stbf = max(0, 2 − (Score − NetPar))`
  - 18 Loch: `NetPar = Par + floor(CH/18) + (1, falls SI ≤ CH % 18)`
  - 9 Loch: `NetPar = Par + floor(CH/9) + (1, falls SI ≤ CH % 9)`
- **9-Loch-Runden:** HI wird halbiert (`h = hi/2`), und es MUSS die 9-Loch-CR gegen den 9-Loch-Par gerechnet werden.
- **Platzreife-Standard:** 12 Stableford-Nettopunkte aus den besten 6 von 9 Löchern bei fiktivem HCP 54.
- **Max. Schläge vor Pickup (NDB):** bei SV 54 erhält der Spieler 3 Schläge/Loch → Maximum = Par + 5.
- **Standard-SI-Verteilung (DGV/USGA):** Bei 18-Loch-Plätzen ungerade SI (1,3,…,17) auf der einen Neun, gerade (2,4,…,18) auf der anderen.

### Zwei legitime Schlagsummen

| Größe | Bedeutung | Verwendung | Feld |
|---|---|---|---|
| **Brutto** | tatsächlich gespielte Schläge | Zählspiel-Scorecard, „Gesamtanzahl Schläge" | `t.brRaw` |
| **NDB-gedeckelt** | jeder Lochscore auf Netto-Doppel-Bogey begrenzt | Handicap-Fortschreibung, Rundenkarte, Kennzahl in der Detailansicht | `t.br` |

Beispiel Runde 07.08.2026, Georghausen, Mark (HI 54, SV 64): **144 brutto, 141 gedeckelt.** Die Differenz von 3 stammt aus den Löchern 7, 11 und 13.

Deckel je Loch bei SV 64: `Par + floor(64/18) + (1 falls SI ≤ 64%18=10) + 2` → Par + 3 + evtl. 1 + 2.

**Wo welcher Wert steht (seit 08.08.2026):**
- Rundenkarte auf der Startseite: **gedeckelt** (`t.br`)
- Distanzen-Box während des Spiels: brutto, mit „(gew. N)" wenn abweichend
- Detailansicht „Gesamtanzahl Schläge": brutto

### ⚠️ Rechenfalle: 9-Loch-CR gegen 18-Loch-Par (behoben 07.08.2026)

Bei einer 18-Loch-Runde wurde durch das `teeHalf`-Override eine **halbe CR** (35,4) gegen den **ganzen Par** (72) gerechnet:

```
falsch:   54 × 130/113 + (35,4 − 72) = 26
richtig:  54 × 135/113 + (71,1 − 72) = 64
```

**Merkregel:** CR und Par müssen immer aus derselben Lochzahl stammen.

## SC_PAR (Referenz-Par-Arrays, Georghausen)

- Front 9: `[4,4,5,4,3,4,4,4,5]`
- Back 9: `[3,5,4,4,3,4,3,5,4]`

## Golfclub Georghausen (Heimatplatz, `courses.id = georg`)

- **Platzname ist seit 07.08.2026 „Georghausen"** (vorher „Schloss Georghausen"). In den Runden existieren beide Schreibweisen historisch nebeneinander – wird über `RT_courseKeyFromName()` aufgelöst.
- Course Handicap bei HCP 54.0: Front 9 = **32**, Back 9 = **31**, 18 Löcher = **64**.
- Stroke Index (Hole19, 9-Loch-Variante): Front `[2,7,1,4,8,6,3,9,5]`, Back `[8,6,5,4,7,3,9,2,1]`.
- 18-Loch-SI: Front `[3,9,1,7,15,13,5,17,11]`, Back `[16,10,14,8,12,6,18,4,2]`.
- **Tee-Farben:**
  - Gelb (Herren): 18-Loch CR 71,1 / Slope 135; Halbe: F 35,7 / B 35,4
  - Rot (L, Damen): 18-Loch CR 73,4 / Slope 132; 9-Loch F 36,5 / Slope 130
  - Rot (M): kürzer/leichter, CR 33,9 / Slope 125
  - Zusätzlich: Rot (Herren), Grün (Herren), Grün (Damen)
  - Hinweis: Rot (L) ergibt unter der WHS-Formel **mehr** Nettoschläge als Rot (M).
- **Referenzpunkte vollständig:** alle 18 Bahnen mit Loch-GPS und Bildposition, je zwei kalibrierte Abschläge, `pxAspect: 1.911`. **Einziger Platz mit `refs`.**

### Pin-Koordinaten Back 9 (für Geo-Auswertungen)

| Bahn | lat | lng | UTM32 Ost | UTM32 Nord |
|---|---|---|---|---|
| 10 | 50.9942355 | 7.2688781 | 378516,6 | 5650610,2 |
| 11 | 50.9920233 | 7.2625680 | 378068,1 | 5650374,6 |
| 12 | 50.9907082 | 7.2582696 | 377763,0 | 5650235,5 |
| 13 | 50.9925179 | 7.2617569 | 378012,4 | 5650431,0 |
| 14 | 50.9937576 | 7.2635348 | 378140,4 | 5650565,9 |
| 15 | 50.9948719 | 7.2673175 | 378408,8 | 5650683,5 |
| 16 | 50.9933704 | 7.2686578 | 378498,9 | 5650514,3 |
| 17 | 50.9915353 | 7.2628935 | 378089,6 | 5650319,8 |
| 18 | 50.9922547 | 7.2680365 | 378452,4 | 5650391,3 |

### Verifizierte Bahnlängen (aus Referenzpunkten)

| Bahn | Gelb → Pin | Rot → Pin | Abstand Gelb–Rot |
|---|---|---|---|
| 13 | 304 m | 259 m | 45 m |
| 14 | 189 m | 164 m | 25 m |
| **15** | **369 m** | **328 m** | **42 m** |
| 16 | 104 m | 107 m | 5 m |

**Bahn 15 abschließend bestätigt (08.08.2026):** Nach der Korrektur des Gelb-Tees auf `50.9927807930737 / 7.26322159390912` liefern beide Tees denselben Rotationswinkel (37,6° und 36,4°, Differenz 1,2°) und denselben Bildmaßstab (483,9 und 484,9 m je Bildeinheit, Abweichung 0,2 %). Damit sind `px` und `lat`/`lng` nachweislich konsistent – die reine GPS-Korrektur war richtig, der Bildpunkt blieb unangetastet.

## Plausibilitätsprüfung für Referenzpunkte

Vor jeder Korrektur an Referenzpunkten diese vier Prüfungen rechnen:

1. **Tee → Pin gegen die Par-Erwartung.** Par 3 unter ~200 m, Par 4 grob 250–420 m, Par 5 darüber.
2. **Abstand zwischen den Abschlägen derselben Bahn.** Bei Georghausen 5–45 m. Über 100 m bedeutet, dass ein Tee auf einer anderen Bahn gesetzt wurde.
3. **Reihenfolge der Tees.** Rot muss näher am Pin liegen als Gelb.
4. **Gespielte Marker als Gegenprobe.** Die Balllagen einer echten Runde sind die verlässlichste Quelle.

**Fünfte Prüfung (neu, 08.08.2026): Rotationswinkel und Maßstab je Tee vergleichen.** Beide Tees einer Bahn müssen gegen den Pin denselben Rotationswinkel (± ~2°) und denselben Maßstab (± ~1 %) ergeben. Weichen sie ab, stimmt bei einem der beiden die Zuordnung `px` ↔ `lat/lng` nicht. Das ist die einzige Prüfung, die **ohne** externe Referenz entscheidet, ob GPS oder Bildpunkt falsch ist.

**⚠️ Zahlenpaare auf Birdiekarten sind Hindernisdistanzen, keine Bahnlängen.**

**Bei GPS-falsch, Bild-richtig immer nur `lat`/`lng` ändern.** Wird `px` mitgeändert, bricht die Bildkalibrierung.

## Golf-Club Kürten – vollständig, verifiziert

**Quelle:** offizielle Klub-Website, `golfclubkuerten.de/platz/18-loch-platz/bahn-1` bis `bahn-18`.

| Bahn | Par | SI | Bahn | Par | SI |
|---|---|---|---|---|---|
| 1 | 4 | 13 | 10 | 5 | 12 |
| 2 | 4 | 7 | 11 | 4 | 4 |
| 3 | 3 | 17 | 12 | 3 | 18 |
| 4 | 5 | 5 | 13 | 5 | 8 |
| 5 | 5 | 11 | 14 | 4 | 10 |
| 6 | 4 | 1 | 15 | 4 | 16 |
| 7 | 4 | 9 | 16 | 4 | 2 |
| 8 | 4 | 3 | 17 | 3 | 14 |
| 9 | 3 | 15 | 18 | 4 | 6 |

Als Arrays:
- Par Front: `[4,4,3,5,5,4,4,4,3]` · Par Back: `[5,4,3,5,4,4,4,3,4]`
- SI Front: `[13,7,17,5,11,1,9,3,15]` · SI Back: `[12,4,18,8,10,16,2,14,6]`

**Tee-Daten (18 Loch):** Herren Weiß Par 72 / 6094 m / Slope 137 / CR 72,9 · Herren Gelb Par 72 / 6059 m / Slope 136 / CR 72,6 · Herren Blau Par 71 / 5632 m / Slope 126 / CR 70,3 · Damen Rot Par 72 / 5297 m / Slope 133 / CR 73,9 · Damen Orange Par 72 / 4971 m / Slope 128 / CR 72,0.

**Code:** vollständig in `RT_fixKuertenSI()`, läuft bei jedem App-Start.

**Bestätigte Sackgasse:** `pccaddie.net/clubs/0494506/app.php?cat=scorecard` ist JS-gerendert und login-gated. Nicht erneut versuchen.

## Hole19-Scorecard-Interpretation (maßgeblich)

- Wert in der Loch-Box = **Brutto-Schläge für dieses Loch**
- Große summierte Zahl = **Brutto-Gesamtschläge der Runde**
- Hochgestellte Zahl daneben = **Stableford-Nettopunkte der Runde**
- Löcher **ohne** Box-Rahmen = exakt Par gespielt
- **Gestrichene Löcher** = von der Handicap-Berechnung ausgeschlossen

Hole19 dient zusätzlich als **optisches Vorbild** für die Rundenkarten.

## Markierungs-Semantik im Spielbetrieb

Jeder Spieler führt eine eigene Markierungsspur (`RT_pinsOf(rd,pi,c)`):

| Marker | Bedeutung | Farbe | Ausgelöst durch |
|---|---|---|---|
| `A` | Abschlag (Schlag 1) | schwarz | erster Klick auf „Markieren" |
| `2`…`n` | Balllage nach Schlag n | dunkelgrün | weitere Klicks, `+` bei Schläge |
| `⛳` | eingelocht | schwarz | „Markieren" innerhalb 8 m zum Loch-Referenzpunkt |
| `S` | Strafschlag | rot | `+` bei Straf |
| `B` | Bunker/Sand | gelb | `+` bei Sand |
| `P` | Putt | grün | `+` bei Putts |

- **Seit 08.08.2026 erhöht der Markieren-Button den Schlagzähler NICHT mehr** (Backlog A2 umgesetzt). Gezählt wird allein über `+`/`−`.
- **Die Marker-Nummerierung hängt an den vorhandenen Pins, nicht am Schlagzähler** (`RT_ballShotSuggest` nimmt `max(shot)+1`). Deshalb war die Entkopplung ohne Nebenwirkung möglich.
- In der Schlagliste erscheinen nur `A`, Nummern, `B` und `⛳`.
- **8-m-Schwelle** (`RT_HOLED_RADIUS_M`) ist der wackeligste Teil: bei ±5 m GPS kann ein Chip aus kurzer Distanz als eingelocht durchgehen.
- **Zwei parallele Systeme:** Das ältere Karten-Pin-System setzt Marker **ohne** Schlagzähler. Daher kann ein Loch mehr Marker als Schläge haben.

### Diagnose-Rezept „stimmt die Schlagzahl?"

```sql
select (nums->>(g-1))::int as bahn,
       (pl->'sc'->>(g-1))::int as schlaege,
       coalesce(jsonb_array_length(pl->'pins'->(g-1)),0) as marker
from ... generate_series(1, jsonb_array_length(pl->'sc')) g;
```

## Wind (seit 08.08.2026)

**Quelle:** Open-Meteo, ausschließlich über die Worker-Route `/api/wind?lat=&lng=`. Kein Schlüssel, keine Registrierung. Der Worker rundet die Koordinaten auf drei Nachkommastellen (~110 m) und cached 600 s am Edge – Open-Meteo sieht damit weder die IP des Spielers noch eine identifizierbare Position.

Abgefragte Felder: `wind_speed_10m`, `wind_direction_10m`, `wind_gusts_10m`, `temperature_2m`, `wind_speed_unit=kmh`.

**Bezugspunkt** ist die Bahn, nicht der Spieler: Loch → Bahnmitte → Abschlag → GPS. Damit steht der Wert auch ohne GPS-Signal.

### Berechnung der Relativrichtung

`wind_direction_10m` ist die Richtung, **aus der** der Wind kommt. Er weht also nach `dir + 180`.

```
Spielrichtung b = Peilung von letzter Balllage (sonst Abschlag) zum Loch
Relativwinkel d = ((dir + 180) − b + 540) mod 360 − 180      → −180 … +180
```

| d | Bedeutung |
|---|---|
| 0 | Rückenwind |
| ±180 | Gegenwind |
| +90 | Seitenwind **von links** (weht nach rechts) |
| −90 | Seitenwind **von rechts** |

Beschriftung: `|d| ≤ 35` → Rückenwind · `|d| ≥ 145` → Gegenwind · sonst „schräg" bzw. Seitenwind, jeweils mit Seitenangabe wenn `12 < |d| < 168`.

Stärketext: <2 windstill · <8 kaum spürbar · <16 leicht · <25 spürbar · <35 stark · sonst sehr stark (km/h).
Böen werden nur angezeigt, wenn sie mindestens 8 km/h über dem Mittelwert liegen.

**Nadel:** oben ist immer die Spielrichtung, der Pfeil zeigt, wohin der Wind weht. Farbe ab 12 km/h gelb, ab 25 km/h rot.

## Videosteuerung auf iOS – Messergebnisse C1 (08.08.2026)

Gemessen auf iPhone, **iOS 18.7 / Safari 27**, mit einem 1206×2622-Video, 60 fps, 19,7 s, MP4.

| Fähigkeit | Ergebnis |
|---|---|
| `requestVideoFrameCallback` | vorhanden |
| `MediaRecorder` | vorhanden |
| Aufnahmeformate | `video/mp4`, `video/mp4;codecs=avc1`, `video/webm`, `webm;vp8`, `webm;vp9` |
| Kamera, `canvas.captureStream`, `OffscreenCanvas` | alle vorhanden |
| Sprungdauer vor/zurück | 10 bzw. 12 ms |
| Zeitlupe `playbackRate=0.25` | exakt 0,25× |

### Sub-Frame-Verhalten – der entscheidende Befund

| Zielposition im Bild | Fehler vorwärts | Fehler rückwärts |
|---|---|---|
| 0,00 (Bildgrenze) | −0,40 Bilder | −1,00 Bilder |
| **0,25** | **0,00** | **0,00** |
| **0,50** | **0,00** | **0,00** |
| **0,75** | **0,00** | **0,00** |

**Regel für M5:** Zielzeit immer `(bildnummer + 0,5) / fps` – nie auf die Bildgrenze. Dort entsteht ein Rundungsfehler von bis zu einem Bild, weil Safari dem Zeitpunkt den Frame zuordnet, der ihn enthält.

### Zweiter Befund: rVFC nur bei laufender Wiedergabe

Der Messlauf zählte **55 Zeitüberschreitungen**, alle im pausierten Zustand nach einem Sprung. `requestVideoFrameCallback` hängt an der Frame-Präsentation; nach einem Seek gibt es genau eine, und die passiert oft, bevor der Callback registriert ist.

**Regel für M5:** Im pausierten Zustand auf `seeked` warten, `requestVideoFrameCallback` nur während laufender Wiedergabe.

### Dritter Befund: Overlay in Anzeigegröße rendern

Bei Canvas in voller Videoauflösung (3,2 MP) und pro Frame neu aufgebautem Pfad: 21 fps. In Anzeigegröße mit gedeckeltem Pixelverhältnis (max. 2) und vorgerechnetem Pfad: 37,7 fps bei 5 ausgelassenen Bildern in 3 s.

Nebenbefund: In 3 s wurden nur rund 118 statt 180 Bilder präsentiert – das Gerät dekodiert dieses hochauflösende Video mit etwa 39 statt 60 fps. Für M5 unkritisch (Analyse läuft in Zeitlupe/Einzelbild), für M6 heißt es: vor dem Export herunterskalieren.

## Höhendaten NRW – Bewertung C2 (08.08.2026)

**Quelle:** Geobasis NRW, DGM1, Rasterweite 1 m.
- Download: `https://www.opengeodata.nrw.de/produkte/geobasis/hm/dgm1_tiff/dgm1_tiff/`
- WCS: `https://www.wcs.nrw.de/geobasis/wcs_nw_dgm`
- Lage ETRS89/UTM32 (EPSG 25832), Höhe DHHN2016 (EPSG 7837)
- **Lizenz: Datenlizenz Deutschland Zero 2.0** – keine Namensnennung, kommerzielle Nutzung erlaubt. Für die GmbH unproblematisch.

**Dateinamensschema:** `dgm1_32_{Ost}_{Nord}_1_nw_{Erhebungsjahr}.tif`. **Das Jahressuffix ist Pflichtbestandteil** und je Gebiet verschieden – ohne es gibt es keinen Treffer. Georghausen liegt in `378_5650` (acht Bahnen) und `377_5650` (nur Bahn 12).

**Genauigkeit:** ±10 cm + 5 % der Rasterweite bei flachem, offenem Gelände; ±10 cm + 20 % bei stark geneigtem Gelände mit dichter Vegetation. **Diese Angaben beziehen sich auf 2σ (95 %)** – die Standardabweichung auf einem Grün liegt damit bei rund **5,25 cm**, nicht bei 10,5.

**Fortführung:** 5-Jahresturnus, ein Fünftel der Landesfläche pro Jahr. Erhebung Ende 2025 – Anfang 2026 ausgesetzt; ab Ende 2026 – Anfang 2027 mit mindestens 8 Punkten/m².

### Simulationsergebnis (25×25-m-Grün, 1-m-Raster, 600 Durchläufe je Zeile)

| Auswertung | σ = 5,25 cm (heute) | σ = 3,5 cm (künftig) |
|---|---|---|
| Falllinie über das ganze Grün | 0,3–0,8° Median, bis 2,0° im 90. Perzentil | 0,2–0,5° |
| lokale Neigung über 8 m | 4–6 % Median | 3–4 % |
| lokale Neigung über 4 m (Puttlänge) | 11–14 % Median, bis 34 % | 7–9 % |

**Konsequenz:**
- **Falllinie ist exzellent bestimmbar.** Unter einem Grad Winkelfehler ist genauer, als ein Golfer ein Grün mit dem Auge liest. → M9a und M9b machbar.
- **Break auf Puttlänge nicht.** 14 % Fehler bedeuten bei einem 3-m-Putt mit 40 cm Break rund ±5 cm Median, im ungünstigen Zehntel ±13 cm. Das Loch ist 10,8 cm breit.

**Die harte Grenze ist aber nicht das Rauschen, sondern die Rasterweite.** Konturen mit einer Wellenlänge unter zwei bis drei Metern erscheinen im DGM1 überhaupt nicht – genau die entscheiden über den Ballauf auf den letzten Metern. Mehr Punktdichte ab 2027 verbessert die Höhengenauigkeit, ändert aber nichts an der Rasterweite des abgeleiteten Produkts. **M9c ist damit mit offenen Daten grundsätzlich nicht machbar**, nicht nur „noch nicht".

## Platz-Identität: Name, ID, Code, Farbe

| Ebene | Beispiel | Wo |
|---|---|---|
| **Platzname** | „Georghausen" | `courses.data.name`, `rounds.data.courseName` |
| **Platz-ID** | `georg` | `courses.id`, `rounds.data.courseKey`, localStorage-Stores |
| **Serien-Code** | `Front` / `Back` | `HV_COURSE_META`, Chart/Legende |
| **Farbe** | `#0A84FF` | `HV_COURSE_META[code].color` |

**Regeln:**
- Rundenname → Platz-ID immer über `RT_courseKeyFromName(name, rd)` (dreistufig).
- Platz-ID → Serien-Code über `RT_slugCourseCode(name, isFront)`; **normalisiert den Namen zuerst**.
- Farben: acht feste Töne, alles andere deterministisch aus dem Basisnamen (`RT_colorForCode`), ≥ 28° Abstand zu `RT_RESERVED_HUES`.
- Anzeigereihenfolge: `RT_sortHalfCodes()` stellt pro Platz **Front vor Back**.
- **Neue Platz-IDs:** `custom-<platzname>`, Umlaute transliteriert, Kollisionen mit `-2`/`-3`.

## Rotationswinkel-Berechnung für Kartenausrichtung

1. Peilung in der Realität aus GPS: `atan2(Ost-Meter, Nord-Meter)`
2. Peilung im Bild aus Pixelkoordinaten, „oben" = 0°: `atan2(Δx, −Δy)`
3. `rotDeg = bearingImg − bearingReal`

**Isotropie:** Die Bildpeilung muss in isotropen Koordinaten gerechnet werden. Da `px` als Fraktion einer ~1,9:1-Box gespeichert ist, muss `Δy` vor `atan2` durch das Seitenverhältnis geteilt werden.

**Anzeigedrehung:** Die Vollbild-Birdiekarte wird per CSS um `RT_FULL_IMG_ROT = -90°` gedreht. Satellitenkarte dreht `rotDeg + RT_FULL_IMG_ROT`, Marker gegen `-RT_FULL_IMG_ROT`.

**Containergröße bei Rotation:**

```
Breite = W·|cos θ| + H·|sin θ|
Höhe   = W·|sin θ| + H·|cos θ|
```

Ein fester Faktor reicht nicht: Bei H/W ≈ 2,9 verlangt schon 15° Drehung Faktor 1,72. Umgesetzt in `RT_sizeRotatedMap`.

**Container-Mittelpunkt braucht beide Achsen.** `RT_correctedLatLng` nutzte die Breite auch als Höhe – auf der Vollbildkarte 244 px Versatz. Behoben.

## Datenquellen für Lochkartographie

1. **Statische Birdie-Bilder (umgesetzt):** `assets/course-images/{platz}/hole-XX.jpg` über `raw.githubusercontent.com`. Bekannte Einschränkung Georghausen Bahn 3: Quellbild links unvollständig – akzeptiert.
2. **Satellitenbilder (produktiv):** Esri World Imagery, mit Rotations-Automatik, Referenzpunkt-Markern und Distanzring-Werkzeug.
3. **Rundenkarten-Hintergründe:** `assets/round-bg/course-1..5.jpg`, 1200×675.
4. **OpenStreetMap Golf-Tagging** über Overpass API – crowdsourced, bei kleinen Vereinen lückenhaft.
5. **Golf-Datenanbieter** – meist kostenpflichtig, US-fokussiert.
6. **Höhendaten:** DGM1 NRW, siehe C2-Abschnitt oben. Für Relief und Falllinie geeignet, für Break nicht.

## Externe Schnittstellen – Stand und Sackgassen

| Dienst | Status |
|---|---|
| **Garmin Connect Developer Program** | **Gesperrt** für Neuanträge seit ca. März 2026, Formular entfernt, keine Wiedereröffnung terminiert |
| **Garmin Golf Premium API** | Getrenntes Programm, Bewerbung per Mail an `eng.busdev@garmin.com`, Lizenzgebühr, kuratierte Partnerauswahl. Liefert Scorecard pro Loch, GPS-Schlagdaten, Launch-Monitor-Daten |
| **Open-Meteo** | **Produktiv seit 08.08.2026** über `/api/wind`. Kostenlos, kein Schlüssel, keine Registrierung |
| **Geobasis NRW DGM1** | Open Data, DL-DE Zero 2.0, kostenfrei. Download über opengeodata.nrw.de, zusätzlich WCS |
| **YouTube** | Nur offizieller Embed-Player erlaubt. DSGVO: Zwei-Klick-Lösung mit `youtube-nocookie.com` Pflicht. Data API v3 mit 10.000 Einheiten Tagesquote |
| **Strato Mail** | MX `smtpin.rzone.de`, SPF `v=spf1 redirect=_spf.strato.com`, DKIM über zwei CNAMEs auf `rzone.de` |

## Bereits behobene Datenfehler (nicht erneut „entdecken")

- Duplikater hardcodierter „kuerten"-Preset – entfernt.
- Korrupte 9-Loch-relative SI-Felder bei Kürten-Back und Kaanapali-Back – korrigiert.
- `RT_halfCrSl`-Fallback-Bug (voller 18-Loch-CR beim Splitten) – korrigiert.
- `SC_label()` mit hartkodierter Liste von nur vier Platz-Codes – korrigiert.
- Runde 25.07-Front: Loch 9 als 8 statt 7 gespeichert – korrigiert.
- Runde 19.07-Back: fälschlich als reine 9-Loch-Runde behandelt – korrigiert.
- GC Kürten Front-9 SI Löcher 8+9: über `RT_fixKuertenSI()` gelöst. **Lehre: vor jeder Recherche im Code nach vorhandenen `RT_fix...`-Funktionen greppen.**
- `sbPushCourse()` ohne `user_id` bei Composite-PK – korrigiert.
- Verdrehte Marker auf der Vollbild-Satellitenkarte – korrigiert.
- **Spielvorgabe 26 statt 64 bei 18-Loch-Runden** – siehe Rechenfalle oben.
- **Zwei Chart-Serien für Georghausen** durch zwei Namens-Schreibweisen – über Normalisierung gelöst.
- **Alle Satellitenkarten zeigten das Clubhaus** – Zentrierung nutzte die Platzkoordinate statt der Bahn-Referenzpunkte.
- **Leere Ecken auf der Vollbildkarte** (07.08.) – fester 160 %-Faktor durch Berechnung ersetzt.
- **Grabber driftete unter dem Finger** (07.08.) – Achsenfehler in `RT_correctedLatLng`.
- **Bahn 15 Gelb-Tee falsch georeferenziert** (07.08.) – korrigiert, am 08.08. rechnerisch bestätigt.
- **Eva und Carsten sahen nur einen Platz** (07.08.) – Policy `courses_select_linked`.
- **Rundenkarte zeigte die Bruttosumme statt der gedeckelten** (08.08.) – `t.br` statt `t.brRaw`.
- **Markieren erhöhte den Schlagzähler mit** (08.08.) – entkoppelt.
- Testrunde „Testplatz" (01.08.) gelöscht.

## „Velbert" (aufgeklärt)

War kein Bug, sondern ein am 27.07.2026 bewusst hinzugefügtes Preset (`velbertp3`, GC Velbert – Gut Kuhlendahl Par 3), das im heutigen Code nicht mehr existiert.

## Multi-User-Identität

Ein Mitspieler kann zunächst ohne Account mitspielen und wird per Invite zu einem vollwertigen, rückwirkend historiensehenden Nutzer. Mechanismus: Name in der lokalen Mitspieler-Liste → `player_links`-Eintrag → RLS-Policy `rounds_select_shared` prüft case-/whitespace-insensitiven Namensabgleich.

**Einschränkung:** reiner String-Abgleich, keine Tippfehlertoleranz, keine stabile Personen-ID.

**Platzdaten seit 07.08.2026 gelöst:** `courses_select_linked` gibt verknüpften Accounts Lesezugriff auf alle Plätze des Owners, unabhängig von gemeinsamen Runden.
