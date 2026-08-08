# FairwayPilot – Projektkontext
**Stand: 08.08.2026**

---

## Zweck & Kontext

**FairwayPilot** (vormals GolfPilot) ist eine persönliche Golf-Handicap- und Rundentracking-PWA von Mark Mätschke, gebaut als einzelner selbstständiger Cloudflare Worker (`worker.js`) mit eingebettetem HTML/JS, mit Supabase als Backend für Auth und Daten. Die App läuft unter **fairwaypilot.com**, deployed automatisch via GitHub (`Maetschke/fairwaypilot`, Branch `main`), und bedient Mark sowie einen kleinen Kreis von Mitspielern. Rechtsträger: Mätschke Media & Consulting GmbH.

**Wichtige Personen:**
- **Eva** – Marks Frau und primäre Mitnutzerin (HCP ~54); verknüpfter Account, User-ID `2eeba426-fe19-4a48-b017-142111638dfa`
- **Carsten** – regelmäßiger Mitspieler; verknüpfter Account, User-ID `f96aba92-88ef-440d-9bae-8255552d44c3`
- **Olaf** – Beispiel-/gelegentlicher Mitspieler (Gästespieler-Mechanismus)
- **Mark selbst** – Pressesprecher bei LANXESS; Entwickler und Product Owner, User-ID `499a84d4-7ce0-43ab-bbcd-caa35d03b2da`

**Heimatplätze (genau 5 hinterlegte Plätze):**

| Platz | courses.id | Anmerkung |
|---|---|---|
| Georghausen | `georg` | primär; 18 Bahnen vollständig referenzpunkt-kalibriert (einziger Platz mit `refs`) |
| Gut Waldhof | `waldhof` | |
| Kürten | `custom-golf-club-k-rten-e-v-bergerh-h` | Alt-ID mit kaputtem Slug, bewusst belassen |
| Leverkusen | `custom-leverkusen` | |
| Kaanapali | `custom-kaanapali-f` | Par-70-Ausreißer, aus Trendanalysen ausschließen |

**Arbeitsstil:** Direkt und iterativ; testet sofort nach jedem Deploy; meldet präzise Abweichungen (oft mit Screenshots); erwartet Root-Cause-Fixes statt oberflächlicher Patches; bevorzugt deutschsprachige UI; korrigiert Claude sofort, wenn veraltete/erledigte Punkte wieder auftauchen; stellt gern die Frage „Hast Du Fragen?" vor größeren Features und erwartet dann echte, entscheidungsorientierte Rückfragen mit Empfehlung statt sofortiger Umsetzung; nutzt vier persistente Markdown-Projektdateien, um Sessions ohne erneute Erklärung zu starten.

---

## Betriebsinfrastruktur (Stand 08.08.2026)

### Domains und DNS

Beide Domains liegen mit den Nameservern bei **Cloudflare** (`grace.ns.cloudflare.com`, `john.ns.cloudflare.com`), registriert über Strato. Strato ist ausschließlich Mail-Host, hat also **keine** Kontrolle über das DNS – alle Mail-Records müssen bei Cloudflare gepflegt werden.

**`fairwaypilot.com`** (7 Einträge):

| Typ | Name | Inhalt |
|---|---|---|
| AAAA | `@` | `100::` (Worker, mit Proxy) |
| MX | `@` | `smtpin.rzone.de`, Priorität 10 |
| TXT | `@` | `v=spf1 redirect=_spf.strato.com` |
| TXT | `@` | `google-site-verification=…` (**nicht löschen**) |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |
| CNAME | `strato-dkim-0002._domainkey` | `…rzone.de`, nur DNS |
| CNAME | `strato-dkim-0003._domainkey` | `…rzone.de`, nur DNS |

**`fairwaypilot.de`** (10 Einträge): A/AAAA, `www`-CNAME, MX auf `@` und `*`, Autodiscover (SRV + CNAME), DMARC `p=reject`, DKIM-Policy, SPF. 301-Weiterleitung auf `.com`.

### E-Mail

- Postfach `info@fairwaypilot.com` bei Strato, Alias `mark.maetschke@fairwaypilot.com`
- `.de`-Adressen leiten auf `.com` weiter
- Client-Einstellungen: `imap.strato.de` / `smtp.strato.de`, Benutzername = vollständige Adresse, Ports 993 bzw. 465 (SSL). **SMTP-Zugangsdaten trotz „Optional"-Kennzeichnung eintragen**, sonst schlägt der Versand fehl.

### Google Play

- Entwicklerkonto **FairwayPilot**, Organisation, Account-ID `5226782889511619003`
- Inhaber: `info@fairwaypilot.com` mit 2FA, Authenticator und 10 Backup-Codes
- **Hinweis:** Bei Konten auf eigener Domain setzt Google die Kontoadresse zwangsweise als Recovery-Mail; eine abweichende Adresse ist nicht hinterlegbar. Der Rettungsweg sind daher die Backup-Codes.
- Website `fairwaypilot.com` über Search Console verifiziert (Methode „Domain name provider")
- **Identitätsprüfung abgeschlossen (08.08.2026).** Play-Konto damit vollständig freigeschaltet – Android-Weg ist unblockiert.

### Unternehmensdaten

- **D-U-N-S: `342905831`**
- Schreibweise laut D&B, exakt so in allen Store-Formularen zu verwenden: `Mätschke Media & Consulting GmbH`, `Niederstr. 18`, `40789 Monheim am Rhein`
- Handelsregister: Amtsgericht Köln, HRB 98736
- Apple: Enrollment-ID `HA96752FQT`, Case 20000128893319 – Organisationsprüfung läuft, am 08.08. nachgefasst

### Externe Dienste im Betrieb

| Dienst | Zweck | Bemerkung |
|---|---|---|
| Esri World Imagery | Satellitenkarten | über Leaflet |
| raw.githubusercontent.com | Bild-Assets (Lochkarten, Rundenhintergründe) | |
| **Open-Meteo** | **Wind, Temperatur (seit 08.08.2026)** | **ausschließlich über die Worker-Route `/api/wind`; sieht nie die IP des Spielers** |

---

## Aktueller Stand der App

- Live unter fairwaypilot.com, Custom Domain, SSL, Rechtstexte, Account-Löschung end-to-end getestet
- Evas und Carstens Accounts verknüpft über `player_links`; beide sehen alle fünf Plätze (Policy `courses_select_linked`)
- Multi-User-Invite-System mit `claim_by_email()`-RPC-Fallback; `copiedForPlayer` für Spielerindex-Auflösung
- Lochkarten-Bilder für Georghausen, Kürten, Gut Waldhof, Leverkusen
- Interaktive Charts: HI-Verlauf, Strafschläge/Bunker/Putts
- Satellitenkarten mit Rotations-Automatik, Grabber, rotationskorrigiertem Panning und Marker-Dragging
- **Wind auf der Bahn** mit Richtungsnadel relativ zur Spielrichtung (seit 08.08.)
- Capacitor-Scaffold vollständig konfiguriert; `cap add` auf Marks Mac ausstehend
- Git-Tag **`pre-premium`** auf Commit `0c65ae63` als Rollback-Punkt vor dem M0-Umbau

### Session 08.08.2026 – alle Teile deployed und live verifiziert

Commits dieser Session: `198646b4` (A2+A3), `58946c81` / `1e5147bc` / `04c95aa9` (C1-Testseite v1–v3), `6f43c721` (A4 Wind + C1-Aufräumen), `7817f4a2` (B9).

#### 1. A3 – Rundenkarte zeigt die handicaprelevante Schlagzahl

Die Kachel auf der Startseite rechnete mit `t.brRaw` (brutto) statt `t.br` (auf Netto-Doppel-Bogey gedeckelt). `RT_totals()` liefert beide Werte längst korrekt – es wurde nur der falsche abgegriffen. Eine Stelle geändert.

Gegenprobe an der Runde vom 07.08. (Georghausen, SV 64, Deckel = Par + 3 + 1 bei SI ≤ 10 + 2): Löcher 7, 11 und 13 liegen je einen Schlag über dem Deckel → 144 − 3 = **141**, exakt der Wert der Detailansicht.

Die Bruttosumme bleibt bewusst an zwei Stellen erhalten: in der Distanzen-Box („Runde: 144 Schläge, gew. 141") und in der Detailansicht unter „Gesamtanzahl Schläge".

#### 2. A2 – Markieren und Zählen entkoppelt

`RT_markShot()` erhöhte `p.sc[c]` mit. Die zwei Zeilen sind entfernt; gezählt wird jetzt allein über die `+`/`−`-Stepper.

**Der entscheidende Punkt vor dem Eingriff:** Ob die Marker-Nummerierung am Schlagzähler hängt. Sie tut es nicht – `RT_ballShotSuggest()` leitet die nächste Nummer aus den vorhandenen Pins ab. Die Nummerierung (A, 2..n, ⛳ beim Einlochen) bleibt daher unverändert korrekt.

Elf Stub-Tests grün, inklusive Gegenprobe „Schlagzähler steht auf 7, Marker zählt trotzdem pins-basiert weiter".

**Verhaltensänderung im Spielbetrieb:** Man muss ab jetzt bewusst mitzählen. Falls sich das auf dem Platz umständlich anfühlt, wäre ein zweiter Button „Markieren + Schlag" die naheliegende Ergänzung (rund 30 min) – steht als N8 im Backlog.

#### 3. A5 – Bahn 15 rechnerisch bestätigt

Statt reiner Sichtprüfung gegen die gespeicherten Referenzpunkte gerechnet:

| Prüfung | Gelb | Rot L | Bewertung |
|---|---|---|---|
| Distanz zum Pin | 369,1 m | 327,8 m | plausibel für Par 4 |
| Tee-Abstand | 42,3 m | | im Georghausen-Korridor (25–45 m) |
| errechneter Rotationswinkel | 37,6° | 36,4° | Differenz 1,2° |
| Maßstab (m je Bildeinheit) | 483,9 | 484,9 | Abweichung 0,2 % |

Die letzten beiden Zeilen sind der Beleg: Liefen `px` und `lat`/`lng` auseinander, müssten beide Tees deutlich unterschiedliche Rotationswinkel und Maßstäbe ergeben. Die reine GPS-Korrektur war also die richtige Behandlung, der Bildpunkt saß korrekt. Von Mark optisch bestätigt.

#### 4. A4 – Wind auf der Bahn

Drei Entscheidungen, die im Backlog offen standen:

**Abruf serverseitig über `/api/wind`, nicht direkt aus dem Client.** Bei einem Direktaufruf sähe Open-Meteo die IP jedes Spielers und müsste als Empfänger in der Datenschutzerklärung stehen. Über den Worker sieht der Dienst nur die Worker-IP. Koordinaten werden auf drei Nachkommastellen gerundet (~110 m), die Antwort 600 s am Edge zwischengespeichert (`cf: {cacheTtl:600, cacheEverything:true}`). Kein Schlüssel, keine Registrierung, kein weiterer Auftragsverarbeiter.

**Bezugspunkt ist die Bahn, nicht der Spieler.** Abgefragt wird für das Loch (ersatzweise Bahnmitte, dann Abschlag, dann GPS). Damit steht der Wert auch ohne GPS-Signal und springt nicht bei jedem Schritt.

**Anzeige sichtbar in der Bahn-Kopfkarte, nicht in der Distanzen-Box.** Die Distanzen-Box ist standardmäßig zugeklappt; Wind, den man erst aufklappen muss, sieht im Spiel niemand.

Dargestellt wird eine SVG-Nadel plus Klartext relativ zur Spielrichtung, z. B. „Rückenwind von links · 18 km/h", darunter Stärkeeinschätzung, Böen (nur ab 8 km/h Differenz) und Temperatur. Oben in der Nadel ist immer die Spielrichtung, der Pfeil zeigt, wohin der Wind weht. Farbwechsel ab 12 und ab 25 km/h. Clientseitiger Cache 10 min, manuelle Aktualisierung über den Pfeil.

Die Spielrichtung ist die Peilung von der letzten eigenen Balllage zum Loch, ersatzweise vom eigenen Abschlag – die Nadel dreht sich also mit, während man die Bahn hinunterspielt. Auf einem Dogleg wird aus Rückenwind am Tee unterwegs Seitenwind, und genau das ist die nützliche Information.

19 Logiktests und 11 Render-Tests gegen das gebaute Inline-JS, alle grün.

#### 5. B9 – native Standortfreigabe vorgebaut

B9 ist erst am Gerät endgültig zu prüfen, der Fix aber vorab einbaubar. `RT_startGeoWatch()` fordert die Freigabe jetzt einmalig über das Capacitor-Geolocation-Plugin an und startet den Watch erst danach:

- Im Browser wirkungslos – ohne `window.Capacitor` bzw. bei `isNativePlatform()===false` bleibt der Status `web`, der bisherige Pfad läuft unverändert
- `checkPermissions()` zuerst, damit eine bereits erteilte Freigabe keinen erneuten Dialog auslöst
- Bei Verweigerung kein Watch, und `RT_gpsAccText()` nennt den Grund statt dauerhaft „Warte auf GPS-Signal" anzuzeigen – **das war die eigentliche Falle:** ohne diesen Text wäre B9 auf dem Gerät nicht von einem schwachen GPS zu unterscheiden gewesen
- Ein Fehler in der Capacitor-Brücke blockiert das GPS nicht; der Watch wird trotzdem versucht
- `RT_geoStarting` verhindert, dass paralleles Rendern mehrere Dialoge oder Watches auslöst

13 Tests über alle Zustände (Browser, granted, prompt, denied, Brückenfehler, Doppelaufruf, Capacitor-im-Web), alle grün.

#### 6. C1 – Machbarkeitstest Videosteuerung abgeschlossen

Siehe Datei 03 für die Messwerte und Datei 04 für die Konsequenzen. Ergebnis: **M5 bleibt bei 14–20 h.** Die Testroute `/c1` ist nach der Auswertung wieder entfernt.

#### 7. C2 – Höhendaten bewertet

Siehe Datei 03. Ergebnis: **M9a und M9b machbar, M9c gestrichen.**

#### 8. E5 entschieden – fünf Tabs

Siehe Datei 04.

---

## Auf dem Radar

- `cap add android` auf Marks Mac, Keystore, Screenshots, Play Closed Testing – ohne Wartezeit möglich
- Apple-Enrollment abwarten, danach `cap add ios` und B9 am Gerät verifizieren
- Store-Listing und Data Safety für beide Stores
- Datenschutzerklärung um einen Satz zur Herkunft der Wetterdaten ergänzen
- M0 als Einstieg in den Premium-Ausbau, in Claude Code statt im Chat

---

## Wichtige Lernpunkte & Prinzipien

**Golf-Domäne:**
- **Hole19-Scorecard-Interpretation (maßgeblich):** Kästchenwerte = Brutto-Schläge pro Loch; große Summe = Brutto-Schlagsumme; hochgestellt = Stableford-Netto-Punkte; Löcher ohne Rahmen = exaktes Par; gestrichene Löcher aus HCP-Berechnung ausgeschlossen.
- **Zwei legitime Schlagsummen:** Brutto (tatsächlich gespielt) und NDB-gedeckelt (handicaprelevant). Beispiel Runde 07.08.: 144 brutto, 141 gedeckelt.
- WHS Rule 5.1b Expected-Score-Formel für 9-Loch: `nineDiff + (0.52 × playerHI + 1.2)`.
- Stableford: `max(0, 2 − (Score − NetPar))`, `NetPar = Par + floor(CH/18) + (1 wenn SI ≤ CH%18)`.
- **Eine 9-Loch-CR darf niemals gegen einen 18-Loch-Par gerechnet werden** – Ursache des 26-statt-64-Bugs.
- Georghausen CH bei HCP 54.0: Front 9 = 32, Back 9 = 31, 18-Loch = 64.
- **Zahlenpaare auf Birdiekarten sind Hindernisdistanzen, keine Bahnlängen.**

**Architektur & zu vermeidende Bugs:**
- RLS-Policies dürfen sich nie selbst auf `rounds` in einer SELECT-Policy beziehen – `SECURITY DEFINER` verwenden.
- **RLS-Tests nur mit gesetzter Rolle**, nie als Superuser nachgebaut.
- `sbPull()` nur bei echten Sign-in-Events, nicht bei Token-Refreshes.
- **Bei mehreren `courses`-Zeilen gleicher ID muss die eigene zuletzt angewendet werden.**
- `RT_myPlayerIndex()`: zuerst `copiedForPlayer` prüfen. `players[0]` ist bei geteilten Runden falsch.
- `RT_applyEdit()` muss `done` erhalten: `done:(src?!!src.done:false)`.
- **Supabase `courses` hat Composite-PK `(id, user_id)`** – Upserts brauchen `user_id` und `onConflict:'id,user_id'`.
- **Leaflet kennt CSS-Rotation nicht.** Karten-Panning über Differenzen, Marker-Dragging absolut – beides über `RT_correctedLatLng`, das **beide Achsen** rechnen muss.
- **Ein gedrehtes Rechteck deckt seinen Container nicht mehr ab.** Größe aus Winkel und Seitenverhältnis berechnen.
- `RT_applyMapLock()` gilt nur für die kleinen Karten; die Vollbildkarte braucht eigene Behandlung.
- **`pointer-events:none` in einer Klasse schlägt jeden z-index.**
- **Capacitor legt keine Standortberechtigungen an**, auch nicht mit installiertem Geolocation-Plugin.
- **Im WebView greift `navigator.geolocation` erst nach nativer Freigabe** (neu 08.08., siehe B9).
- **Marker-Nummerierung hängt an den Pins, nicht am Schlagzähler** (`RT_ballShotSuggest`) – deshalb war A2 ohne Nebenwirkung möglich.

**Eigener Testcode ist auch Code (neu, 08.08.):**
Die zweite Fassung der C1-Testseite lieferte unbrauchbare Werte, weil der `change`-Handler des Dateifelds beide Startknöpfe bedingungslos aktivierte – zwei asynchrone Messläufe arbeiteten gleichzeitig auf demselben `<video>`-Element. **Jede asynchrone Messung über mehrere Sekunden braucht einen Lock, eine Laufkennung und Zeitlimits auf jedes Warten.** Ohne die Zeitlimits wäre auch der eigentliche Befund (rVFC feuert bei pausiertem Video unzuverlässig) nicht sichtbar geworden, sondern hätte die Seite einfach hängen lassen.

---

## Ansatz & Muster

**Validierungspipeline (vor jedem Deploy):**
1. `node --check worker.js` (äußere Syntax).
2. HTML-Konstante extrahieren (`json.JSONDecoder().raw_decode()`), `<script>`-Block isolieren, `node --check` auf dem extrahierten Inline-JS. **Fängt zuverlässig Escape- und Anker-Fehler.** Anker immer mit Deklarationspräfix prüfen.
3. Bei Logik-Änderungen: Funktion per Klammerzähler extrahieren und in Node mit Stubs testen – für Render-Funktionen `vm.createContext` mit Stub-Globals.
4. `npx --yes esbuild worker.js --bundle --format=esm` (aus `/tmp` ausführen, sonst kollidiert `.npmrc`).
5. GitHub Contents API PUT → 60 s warten → via Cloudflare `workers_get_worker_code` verifizieren, dabei auch prüfen, dass **alter Code verschwunden** ist.

**⭐ Escaping vollständig vermeiden (neu, 08.08. – wichtigste Methodik-Änderung):**

Statt Ersetzungen mit doppelt escapten Suchmustern im rohen `worker.js` vorzunehmen:

```python
# 1) HTML-Konstante dekodieren
dec = json.JSONDecoder()
j = w.find('function RT_markShot')
for p in range(j, 0, -1):
    if w[p] == '"' and w[p-1] != '\\':
        try: a, end = dec.raw_decode(w[p:])
        except Exception: continue
        if isinstance(a, str) and 'RT_markShot' in a:
            start, stop = p, p+end; break
# 2) im Klartext ändern – normale Strings, kein Escaping
a = a.replace(alt, neu)
# 3) zurückschreiben
w = w[:start] + json.dumps(a) + w[stop:]
```

Damit entfällt die gesamte Escape-Problematik. Rückprobe: `json.loads` der neuen Konstante muss zeichengleich mit dem geänderten Klartext sein. So wurden A4 und B9 eingebaut – ohne einen einzigen Escape-Fehlversuch.

**⚠️ Backslash-Transport im bash_tool (neu, 08.08.):** Backslashes im `command`-Parameter können verdoppelt ankommen. Ein Python-Literal `"\\\\n"` wurde im Skript zu vier Backslashes. **Konsequenz:** In bash-Heredocs keine Backslash-Literale verwenden, sondern `chr(92)` konstruieren – oder besser die Klartext-Methode oben nutzen, bei der gar keine gebraucht werden. Bei fehlschlagenden Ersetzungen zuerst mit `[hex(ord(ch)) for ch in segment]` prüfen, wie viele Backslashes tatsächlich in der Datei stehen.

**GitHub-Workflow:**
- Immer frische SHA unmittelbar vor PUT. **In Bash `export SHA=$(…)`**, nicht als Inline-Zuweisung.
- `api.github.com/repos/Maetschke/fairwaypilot/contents/` für Lese-/Schreibzugriffe. Zum Lesen großer Dateien `Accept: application/vnd.github.raw` – die JSON-Variante scheitert an der 1-MB-Grenze.
- Python-Heredocs mit single-quoted Delimiter.
- Git-Tags: annotiert über `POST /git/tags` → `POST /git/refs`.
- **Mehrere Änderungen in einen Commit bündeln** – jeder Zyklus kostet SHA-Abruf, PUT, 60 s Wartezeit und Verifikation.

**Cloudflare-MCP:**
- `workers_get_worker_code` liefert Multipart; Output landet in `/mnt/user-data/tool_results/[id].json`. **Nie komplett einlesen** – gezielt `grep`/Slicing.
- Beim Verifizieren nach eindeutigen Mustern suchen. `"/c1"` kommt zufällig in Base64-Icons vor; `url.pathname === "/c1"` nicht.

**Supabase:**
- Projekt-ID: `qzeesflibjxkdorvxqyf`.
- `execute_sql` eignet sich hervorragend für Datendiagnosen: Schlagzahlen gegen Marker-Anzahl, Bahnlängen aus Referenzpunkten, RLS-Test mit gesetzter Rolle.
- **Sandbox hat keinen DNS-Zugriff** und erreicht nur eine Whitelist (GitHub, npm, PyPI, api.anthropic.com). Geoportale, NRW-Dienste und Open-Meteo sind aus `bash_tool` **nicht** erreichbar – dafür `web_search`/`web_fetch` nutzen.

---

## Tools & Ressourcen

- **Cloudflare Workers** – Hosting, Auto-Deploy von GitHub `main`; Cloudflare auch als DNS für beide Domains
- **Supabase** – Auth, `rounds`, `courses`, `player_links`; RLS; Storage-Bucket `course-photos`
- **GitHub** (`Maetschke/fairwaypilot`) – Source of Truth für Code UND Bild-Assets
- **Leaflet.js + Esri World Imagery** – Satellitenkarten
- **Open-Meteo** – Wind und Temperatur über `/api/wind`
- **Capacitor 8.5.0** – Mobile-Packaging, Plattformpakete und Geolocation eingebunden
- **Strato** – Mailhosting; **Google Play Console** – Store; **Search Console** – Domainverifizierung
- **Hole19-App** – Referenzdatenquelle und optisches Vorbild der Rundenkarten
- **golfclubkuerten.de** – bestätigte Quelle für Kürten-Platzdaten
- **pyproj** – WGS84 ↔ ETRS89/UTM32 (EPSG:25832) für die DGM-Kachelbestimmung
- **Cloudflare-Dashboard für Runtime-Secrets:** Compute → Workers und Pages → fairwaypilot → Einstellungen → Variablen und Geheimnisse
