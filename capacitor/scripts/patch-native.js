#!/usr/bin/env node
/*
 * patch-native.js
 *
 * Traegt die Standortberechtigungen in die nativen Projekte ein.
 *
 * Warum ueberhaupt noetig:
 *   Capacitor legt bei `cap add` ein Standardprojekt an, das AUSSCHLIESSLICH
 *   die INTERNET-Permission enthaelt. Auch @capacitor/geolocation bringt keine
 *   Permissions mit - dessen AndroidManifest.xml ist leer. Ohne diesen Patch:
 *     - Android: navigator.geolocation liefert dauerhaft einen Fehler
 *     - iOS:     das System beendet die App beim ersten Standortzugriff hart,
 *                weil NSLocationWhenInUseUsageDescription fehlt
 *   Beides faellt erst auf dem Geraet auf, nicht beim Bauen.
 *
 * Das Skript ist idempotent: Mehrfaches Ausfuehren aendert nichts. Es laeuft
 * automatisch als Teil von `npm run sync`, kann aber auch einzeln aufgerufen
 * werden. Fehlt eine Plattform (ios/ oder android/ nicht angelegt), wird sie
 * uebersprungen statt einen Fehler zu werfen.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
let changed = 0;

/* ---------- Android ---------- */
const manifestPath = path.join(ROOT, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
if (!fs.existsSync(manifestPath)) {
  console.log('android/ nicht vorhanden - uebersprungen.');
} else {
  let m = fs.readFileSync(manifestPath, 'utf8');
  if (m.indexOf('ACCESS_FINE_LOCATION') !== -1) {
    console.log('Android: Standortberechtigungen bereits vorhanden.');
  } else {
    const block = [
      '',
      '    <!-- Standort: FairwayPilot misst Entfernungen zur Fahne und zeichnet',
      '         Schlagpositionen auf. Beides laeuft ausschliesslich im Vordergrund,',
      '         waehrend die Runde geoeffnet ist - deshalb bewusst KEIN',
      '         ACCESS_BACKGROUND_LOCATION (loest bei Google eine gesonderte',
      '         Pruefung aus und waere hier nicht zu rechtfertigen). -->',
      '    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />',
      '    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />',
      '',
      '    <!-- required=false: App bleibt auch auf Geraeten ohne GPS-Chip',
      '         installierbar, sonst filtert der Play Store sie dort aus. -->',
      '    <uses-feature android:name="android.hardware.location.gps" android:required="false" />',
      '</manifest>'
    ].join('\n');
    if (m.indexOf('</manifest>') === -1) {
      console.error('Android: </manifest> nicht gefunden - Struktur unerwartet, nichts geaendert.');
    } else {
      m = m.replace('</manifest>', block);
      fs.writeFileSync(manifestPath, m, 'utf8');
      console.log('Android: Standortberechtigungen eingetragen.');
      changed++;
    }
  }
}

/* ---------- iOS ---------- */
const plistPath = path.join(ROOT, 'ios', 'App', 'App', 'Info.plist');
if (!fs.existsSync(plistPath)) {
  console.log('ios/ nicht vorhanden - uebersprungen.');
} else {
  let p = fs.readFileSync(plistPath, 'utf8');
  if (p.indexOf('NSLocationWhenInUseUsageDescription') !== -1) {
    console.log('iOS: Standort-Beschreibung bereits vorhanden.');
  } else {
    const anchor = '\t<key>UIViewControllerBasedStatusBarAppearance</key>';
    if (p.indexOf(anchor) === -1) {
      console.error('iOS: Ankerschluessel nicht gefunden - Struktur unerwartet, nichts geaendert.');
    } else {
      const add =
        '\t<key>NSLocationWhenInUseUsageDescription</key>\n' +
        '\t<string>FairwayPilot nutzt deinen Standort, um Entfernungen zur Fahne zu messen ' +
        'und deine Schlagpositionen auf der Bahn zu markieren. Der Standort wird nur ' +
        'waehrend einer laufenden Runde verwendet.</string>\n';
      p = p.replace(anchor, add + anchor);
      fs.writeFileSync(plistPath, p, 'utf8');
      console.log('iOS: Standort-Beschreibung eingetragen.');
      changed++;
    }
  }
}

console.log(changed === 0 ? '\nNichts zu tun - beide Plattformen sind aktuell.' : '\n' + changed + ' Projekt(e) gepatcht.');
