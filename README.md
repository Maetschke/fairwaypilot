# Marks GolfPilot

Cloudflare Worker, der die GolfPilot-WebApp ausliefert.

- Live: https://golfpilot.mark-maetschke.de (und golfpilot.mark-maetschke.workers.dev)
- Datenbank: Supabase (Projekt GolfPilot)

## Deployment

Automatisch: Jeder Push auf `main` wird von Cloudflare Workers Builds
gebaut und deployt (Git-Integration im Cloudflare-Dashboard).

Aenderungen einspielen: `worker.js` im GitHub-Webinterface ersetzen
("Add file" -> "Upload files" -> alte Datei wird ueberschrieben -> Commit).
