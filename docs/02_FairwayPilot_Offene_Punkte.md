# FairwayPilot – Offene Punkte / Backlog

> Stand: 08.08.2026, nach der Aufräum- und Machbarkeitssession (A2, A3, A4, A5, B9 vorgebaut, C1 und C2 abgeschlossen, E5 entschieden, Google-Identitätsprüfung durch).
>
> **Hinweis für Claude beim Aktualisieren:** Vor jeder Aktualisierung den kompletten Chat-Verlauf durchgehen und explizit prüfen, welche Punkte als erledigt bestätigt wurden – auch beiläufig erwähnte. Ebenso prüfen, ob eine als „offene Entscheidung" geführte Position durch genaueres Code-/Schema-Nachschauen bereits gelöst ist. Lieber einmal zu viel im Code nachsehen, als eine gelöste Frage weiter als offen führen.
>
> **Namenshinweis:** Produktname „FairwayPilot" (Betreiberin: Mätschke Media & Consulting GmbH).

---

## Phasenplan

```
Phase A  Aufräumen              ✅ abgeschlossen
Phase B  In die Stores          Android frei, iOS wartet auf Apple
Phase C  Machbarkeitstests      ✅ abgeschlossen
Phase D  Fundament (M0)         6–9 h       nach Android-Testspur
Phase E  Learning (M1–M3)       36–48 h
Phase F  Visuelle Module (M4–M6, M9a/b)  49–71 h
Phase G  Abschluss (M7, M8)     14–20 h
```

**Gesamt rund 120–170 Stunden.** Neben LANXESS realistisch vier bis sechs Monate.

**Reihenfolge-Präzisierung (08.08.2026):** Die Roadmap sagt „Phase B vor M0 abschließen", weil ein Umbau der Deploy-Kette während laufender Einreichung vermeidbares Risiko ist. Das Argument gilt weiter – aber es hing an der Annahme, dass die Store-Phase überschaubar lange dauert. Apple kann sich unbegrenzt hinziehen. **Deshalb: M0 an Android koppeln, nicht an Apple.** Sobald der Android-Build in der Play-Testspur liegt, hat die Deploy-Kette einmal nachweislich funktioniert und das gemeinte Risiko ist abgedeckt. iOS zieht später nach.

---

## 🔴 Phase B – In die Stores

### B4. `cap add` und erste Builds
Status: **Android sofort möglich, iOS blockiert durch B3.** Nur auf Marks Mac.
```bash
cd capacitor
npm install
npx cap add android        # ios erst nach Apple-Freigabe
npm run sync
npm run open:android
```
Aufwand: 2–3 h, meist für Gradle-Versionen und Signing-Konfiguration.

### B5. Signing-Keystore
Status: **Offen, jetzt machbar.** In Android Studio anlegen und **sicher aufbewahren** – ohne ihn sind spätere Updates derselben App nicht mehr möglich. 30 min.

### B6. Store-Listing und Data Safety
Status: **Inhaltlich geklärt, noch nicht ausgefüllt.**
- Nutzer laden Fotos hoch (Platz-, Rundenbilder, Avatare → Bucket `course-photos`) → als „Fotos" deklarieren
- Standortdaten präzise, nur im Vordergrund
- **Kein Tracking:** Worker enthält nachweislich keine Analytics-Bibliothek (geprüft auf Cloudflare Insights, Google Analytics, Sentry, PostHog, Matomo). Cloudflare Web Analytics im Dashboard prüfen und ggf. deaktivieren.
- Kontaktadresse `info@fairwaypilot.com`
- Aufwand: 2–3 h

### B7. Screenshots
Status: **Offen.** Aus dem fertigen Build, für beide Stores. 1–2 h.

### B8. TestFlight und Play Closed Testing
Status: **Play sofort möglich, TestFlight blockiert durch B3.** Eva und Carsten als Tester. **Hinweis:** Die 12-Tester-über-14-Tage-Pflicht gilt nur für Personal Accounts nach Nov. 2023 – als Organisation seid ihr davon befreit. 2 h plus Wartezeit.

### B3. Apple-Enrollment
Status: **Wartet auf Apple.** Case 20000128893319, Enrollment-ID `HA96752FQT`. Am 08.08. nachgefasst. Blockiert B9-Verifikation, `cap add ios`, TestFlight.

### B9. iOS-Standortzugriff auf Hardware prüfen
Status: **Fix gebaut und deployed (08.08.), Verifikation am Gerät ausstehend.**
- `RT_startGeoWatch()` fordert die Freigabe über das Capacitor-Geolocation-Plugin an, bevor der Watch startet. Im Browser wirkungslos.
- Bei verweigerter Freigabe zeigt `RT_gpsAccText()` jetzt den Grund statt „Warte auf GPS-Signal" – damit ist der Fall am Gerät überhaupt erst diagnostizierbar.
- **Zu tun nach `cap add ios`:** App starten, prüfen ob der native Standortdialog erscheint und ob danach Distanzen kommen. Falls der Dialog ausbleibt, in Xcode die `Info.plist` auf die NSLocation-Keys prüfen (setzt `patch-native.js`).
- Aufwand: 20 min am Gerät

---

## 🟡 Offene Kleinigkeiten

### N8. Zweiter Button „Markieren + Schlag"
Status: **Vorgeschlagen, Entscheidung offen.**
- Seit A2 setzt „Markieren" nur noch die Position. Wer eine Balllage markiert *und* den Schlag zählen will, braucht zwei Tippvorgänge.
- Falls sich das auf dem Platz umständlich anfühlt: zweiter Button daneben, der beides macht. Erst nach echtem Spieltest entscheiden.
- Aufwand: 30 min

### N9. Datenschutzerklärung um Wetterdaten ergänzen
Status: **Offen, klein.**
- Seit A4 ruft der Worker Open-Meteo auf. Weil keine Nutzerdaten übertragen werden (nur gerundete Bahnkoordinaten, IP des Workers), ist Open-Meteo **kein** Auftragsverarbeiter – ein Satz zur Herkunft der Wetterdaten gehört trotzdem in die Erklärung.
- Aufwand: 15 min

### N10. DGM1-Kachel für Georghausen ziehen
Status: **Optional, Erkenntnisgewinn ohne Entscheidungsrelevanz.**
- C2 ist ohne die Datei entschieden. Die echte Kachel würde zusätzlich zeigen, wie stark die Daten real geglättet sind – das kann eine Simulation prinzipiell nicht beantworten und wäre für die Auslegung von M9a nützlich.
- Kacheln: `dgm1_32_378_5650_1_nw_JJJJ.tif` (acht Bahnen) und `dgm1_32_377_5650_1_nw_JJJJ.tif` (nur Bahn 12). **Jahressuffix ist Teil des Dateinamens** und je Gebiet verschieden – im Verzeichnis `https://www.opengeodata.nrw.de/produkte/geobasis/hm/dgm1_tiff/dgm1_tiff/` per Browsersuche nach `378_5650` ermitteln.
- Aufwand: 5 min Download, dann Auswertung im Chat

---

## 🟢 Niedrig / im Blick behalten

### N1. Zwei parallele Balllage-Systeme vereinheitlichen
Status: **Nach A2 neu zu bewerten.** Älteres Karten-Pin-System ohne Schlagzähler neben dem Markieren-System. Die Diskrepanz auf Bahn 12 stammt daher. Möglicherweise durch A2 erledigt – 20 min Prüfung, dann entscheiden. 2 h falls doch nötig.

### N2. Startseite bei vielen Runden
88 Runden = 88 Bildkarten. Falls träge: auf die letzten 20 begrenzen mit „Weitere laden". Wird in M0 mitgenommen. 45 min.

### N3. Einheitliche Platz-IDs
Status: **Bewusst zurückgestellt.** Bestand behält `georg`, `waldhof`, `custom-golf-club-k-rten-e-v-bergerh-h`, `custom-kaanapali-f`, `custom-leverkusen`. Die IDs hängen an vier Fronten: `courses.id`, `rounds.data.courseKey` (58 von 88 Runden), sechs Code-Konstanten, sechs localStorage-Stores plus Kartenausschnitte. **Falls doch: nur während M0**, mit `RT_migrateCourseIds()` und vorherigem JSON-Backup beider Tabellen. 3–4 h.

### N4. Garmin Golf Premium API
Status: **Zurückgestellt (Entscheidung Mark, 07.08.2026).**
- Antragsmail ist fertig formuliert und liegt bereit. Absenden erst, wenn **beide** Bedingungen erfüllt sind: (1) App im Apple App Store **und** Google Play veröffentlicht, (2) Absender auf `fairwaypilot.com`. Bedingung 2 ist seit 07.08. erfüllt.
- Grund: Garmin fragt die aktuelle Nutzerzahl ab und erhebt eine Lizenzgebühr – vor dem Store-Launch ist die Verhandlungsposition schlecht.
- **Wichtig:** Das Connect Developer Program (Health/Activity) nimmt seit ca. März 2026 **keine neuen Anträge** an. Die **Golf Premium API** ist ein davon getrenntes Programm, Bewerbung per Mail an `eng.busdev@garmin.com`.
- **Konsequenz für M7:** startet mit Apple Health und FIT-Import, nicht mit Garmin.

### N5. Farbtöne bei vielen Plätzen
Berechnete Platzfarben halten ≥ 28° Abstand zu den acht festen Tönen (`RT_RESERVED_HUES`). Bei deutlich mehr Plätzen zusätzlich Abstand zu bereits vergebenen berechneten Tönen prüfen.

### N6. Landingpage, Guthaben, Watch
- Screenshots und Testimonials auf der Landingpage sind noch Platzhalter (1 h)
- Anthropic-Guthaben für die automatische Platzrecherche (15 min, Fallback funktioniert)
- Apple-Watch-Companion, watchOS-Target mit WatchConnectivity (8–12 h, nach iOS-Einreichung)

### N7. DMARC schrittweise verschärfen
`.com` steht auf `p=none`, `.de` auf `p=reject`. In zwei bis drei Wochen, wenn die Zustellung stabil läuft, `.com` auf `p=quarantine` und später `p=reject` hochziehen. Kein Handlungsbedarf.

---

## Kürzlich abgeschlossen (nicht erneut als offen behandeln)

**Session 08.08.2026:**
- **A1 GitHub-Token** revoked und ersetzt.
- **B1 Google-Identitätsprüfung** abgeschlossen, **B2 Telefonnummern** verifiziert. Play-Konto vollständig frei.
- **B3** bei Apple nachgefasst.
- **A5 Bahn 15**: rechnerisch bestätigt (Rotationswinkel-Differenz 1,2°, Maßstabsabweichung 0,2 %) und optisch geprüft. Keine weitere Korrektur nötig.
- **A3 NDB-gedeckelte Schlagzahl** auf der Rundenkarte (`t.br` statt `t.brRaw`). Commit `198646b4`.
- **A2 Markieren und Zählen entkoppelt.** Marker-Nummerierung bleibt korrekt, weil sie an den Pins hängt. Commit `198646b4`.
- **A4 Wind** über die neue Worker-Route `/api/wind` (Open-Meteo), Nadel und Klartext relativ zur Spielrichtung in der Bahn-Kopfkarte. Commit `6f43c721`.
- **B9 Fix vorgebaut**: native Standortfreigabe vor dem GPS-Watch, mit Diagnosetext bei Verweigerung. Commit `7817f4a2`.
- **C1 Machbarkeitstest Videosteuerung** abgeschlossen, Testroute wieder entfernt. M5 bleibt bei 14–20 h.
- **C2 Höhendaten** bewertet. M9a/M9b machbar, M9c gestrichen.
- **E5 entschieden**: fünf Tabs, Green View kontextuell in der Bahn.

**Session 07.08.2026:**
- Platzdaten für verknüpfte Accounts (`courses_select_linked`); leere Ecken der Vollbildkarte (`RT_sizeRotatedMap`); Grabber-Achsenfehler in `RT_correctedLatLng`; Bahn 15 Gelb-Tee georeferenziert; Capacitor-Plattformpakete und `patch-native.js`; Git-Tag `pre-premium` auf `0c65ae63`; Mailkette für beide Domains; Google-Play-Organisationskonto; technische Roadmap (Datei 04).

**Session 06./07.08.2026 (Nacht):** Spielvorgabe-Fix bei 18-Loch-Runden (26 statt 64), isotrope Bildkalibrierung, Vollbild-Rotation, Kartenzentrierung auf die Bahn, rotationskorrigiertes Panning, Markierungen pro Spieler (`RT_pinsOf`), Distanzen-Box mit Schlagliste, Grabber ab eigenem Abschlag, Referenzpunkt-Marker per Drag, Platz-Farbcodierung, Rundenkarten im Scorecard-Look, neue Platz-ID-Regel.

**Frühere Sessions:** Satellitenkarten Phase 1, Distanzringe, Rotations-Automatik, Tee-Farben, positionsbasiertes Tracking, Koordinaten-Persistenz-Fix, GC Kürten SI/Par verifiziert, Ball-Positions-Tracking, Georghausen-Lochbilder, Geolocation-Distanzanzeige, Account-Löschfunktion, SSL/Custom Domain/Rechtstexte/Icon-Rebrand/Capacitor-Scaffold.

---

## Vorlage für neue offene Punkte

```
### N. Kurzer Titel
Status: **Nicht begonnen / In Arbeit / Blockiert durch X**
- Kontext/Problem in 1-2 Sätzen
- Konkret zu tun
- Abhängigkeiten zu anderen Punkten
- Aufwand
```
