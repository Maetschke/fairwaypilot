# FairwayPilot – Capacitor-Wrapper

Verpackt die bestehende Web-App (komplett eingebettet in `worker.js` im
Haupt-Repo) als native iOS-/Android-App für die Store-Einreichung.

**Wichtig:** Das ist bewusst kein Rewrite. Der komplette Funktionsumfang
bleibt in `worker.js`. Dieses Verzeichnis extrahiert bei jedem Build nur
den aktuellen HTML/CSS/JS-Stand von `main` in einen lokalen `www/`-Ordner
und lädt ihn als Datei ins native WebView – nicht als Remote-URL. Das ist
wegen Apple Guideline 4.2 nötig (reine Web-View-Wrapper auf eine
Remote-URL werden von Apple abgelehnt).

## Voraussetzungen auf deinem Mac

- Node.js (bereits vorhanden)
- Xcode (für iOS) – nur auf macOS installierbar
- Android Studio (für Android)
- CocoaPods (`sudo gem install cocoapods`) – für iOS-Abhängigkeiten

## Einmalig einrichten

```bash
npm install
npx cap add ios
npx cap add android
```

Das legt die Ordner `ios/` und `android/` an (native Projekte, werden
mit ins Repo committet – im Gegensatz zu `www/`, das generiert wird).

## Bei jeder Änderung an worker.js

```bash
npm run sync
```

Das macht zwei Dinge:
1. `scripts/build-www.js` lädt die aktuelle `worker.js` von GitHub
   (`main`), extrahiert die HTML-Konstante 1:1 sowie die Icons
   (`ICON_32/180/192/512`) und schreibt alles nach `www/`.
2. `npx cap sync` kopiert `www/` in die nativen `ios/`- und
   `android/`-Projekte.

Danach in Xcode bzw. Android Studio öffnen und normal bauen:

```bash
npm run open:ios       # oder
npm run open:android
```

## Nativer Mehrwert (Apple-Ablehnungsrisiko senken)

Ein reiner Wrapper ohne jede native Funktionalität wird von Apple
kritisch bewertet. Geplant (siehe Backlog Punkt „Garmin-artige
Pin-Distanzanzeige"): `@capacitor/geolocation` für die
Distanzanzeige zum Pin – das ist der vorgesehene erste echte
native Baustein.

## Bundle-ID / App-Name

Bereits final festgelegt und in `capacitor.config.ts` hinterlegt:
- App-Name: `FairwayPilot`
- Bundle-ID: `de.mmc.fairwaypilot`
