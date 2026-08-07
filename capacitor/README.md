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
- CocoaPods (`sudo gem install cocoapods`) – falls ein Plugin noch Pods nutzt

## Einmalig einrichten

```bash
npm install
npx cap add ios
npx cap add android
npm run patch:native
```

Das legt die Ordner `ios/` und `android/` an (native Projekte, werden
mit ins Repo committet – im Gegensatz zu `www/`, das generiert wird)
und trägt anschließend die Standortberechtigungen ein.

## Bei jeder Änderung an worker.js

```bash
npm run sync
```

Das macht drei Dinge:
1. `scripts/build-www.js` lädt die aktuelle `worker.js` von GitHub
   (`main`), extrahiert die HTML-Konstante 1:1 sowie die Icons
   (`ICON_32/180/192/512`) und schreibt alles nach `www/`.
2. `npx cap sync` kopiert `www/` in die nativen `ios/`- und
   `android/`-Projekte.
3. `scripts/patch-native.js` stellt sicher, dass die
   Standortberechtigungen gesetzt sind.

Danach in Xcode bzw. Android Studio öffnen und normal bauen:

```bash
npm run open:ios       # oder
npm run open:android
```

## Standortberechtigungen – warum ein eigenes Skript

Capacitor legt bei `cap add` ein Standardprojekt an, das **ausschließlich**
die `INTERNET`-Permission enthält. Auch `@capacitor/geolocation` bringt
keine Berechtigungen mit – dessen `AndroidManifest.xml` ist leer. Ohne
Nachbesserung heißt das:

- **Android:** `navigator.geolocation` liefert dauerhaft einen Fehler,
  Distanzanzeige und Schlagmarkierung funktionieren nicht.
- **iOS:** Das System beendet die App beim ersten Standortzugriff hart,
  weil `NSLocationWhenInUseUsageDescription` fehlt.

Beides fällt **erst auf dem Gerät** auf, nicht beim Bauen. Deshalb
erledigt `scripts/patch-native.js` das automatisch und idempotent. Es
läuft als Teil von `npm run sync` mit.

Gesetzt werden:

| Plattform | Eintrag |
|---|---|
| Android | `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` |
| Android | `uses-feature` GPS mit `required="false"` |
| iOS | `NSLocationWhenInUseUsageDescription` |

Bewusst **nicht** gesetzt wird `ACCESS_BACKGROUND_LOCATION`: FairwayPilot
nutzt den Standort nur im Vordergrund während einer laufenden Runde. Die
Berechtigung würde bei Google eine gesonderte Prüfung auslösen und wäre
inhaltlich nicht zu rechtfertigen.

`required="false"` beim GPS-Feature verhindert, dass der Play Store die
App auf Geräten ohne GPS-Chip herausfiltert.

## Nativer Mehrwert (Apple-Ablehnungsrisiko senken)

Ein reiner Wrapper ohne jede native Funktionalität wird von Apple
kritisch bewertet. `@capacitor/geolocation` ist als Abhängigkeit
eingebunden und bildet den ersten echten nativen Baustein.

**Noch offen:** Die App ruft im Web-Code durchgehend `navigator.geolocation`
auf, nicht die native Plugin-API. Auf Android genügt das, sobald die
Manifest-Berechtigungen stehen. Auf iOS ist es zuverlässiger, beim
App-Start einmalig `Geolocation.requestPermissions()` aufzurufen, damit
die native Berechtigung angefragt wird, bevor das WebView den Standort
anfordert. Das ist ein kleiner Eingriff in `worker.js` und sollte vor der
iOS-Einreichung auf echter Hardware geprüft werden.

## Bundle-ID / App-Name

Bereits final festgelegt und in `capacitor.config.ts` hinterlegt:
- App-Name: `FairwayPilot`
- Bundle-ID: `de.mmc.fairwaypilot`

## Play Store

- Entwicklerkonto: `FairwayPilot` (Organisation), Account-ID `5226782889511619003`
- Kontoinhaber: `info@fairwaypilot.com`
- Für den Upload wird ein signiertes AAB benötigt – Keystore in Android
  Studio anlegen und **sicher aufbewahren**; ohne ihn sind spätere Updates
  derselben App nicht mehr möglich.
