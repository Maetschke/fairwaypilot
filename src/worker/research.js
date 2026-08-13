// Platzdaten-Recherche: Anthropic (Sonnet 5) mit web_search + web_fetch.
// Verbesserungen ggü. der ersten Fassung:
//  - web_fetch: die gefundene Scorecard-/Bahnenverzeichnis-Seite (auch PDF) wird wirklich
//    geoeffnet und die exakten Zahlen daraus gelesen, statt nur Suchtreffer zu ueberfliegen.
//  - Strukturierter Tool-Output (submit_course_data mit JSON-Schema): das Ergebnis kommt als
//    validiertes Tool-Argument zurueck, nicht mehr als Freitext-JSON -> keine Parse-/Abschneide-
//    Fehler mehr. Freitext-Parsing bleibt als Fallback.
//  - Hoeheres max_tokens gegen Abschneiden; mehr Tool-Nutzungen.
//  - Optionaler Standort-Hinweis (Adresse/Koordinaten) zur Disambiguierung.
//  - Eine automatische Eskalations-Wiederholung, falls die Par-Liste unvollstaendig bleibt.

const SUBMIT_TOOL = {
  name: "submit_course_data",
  description: "Meldet die final ermittelten, gesicherten Platzdaten strukturiert zurueck. Erst aufrufen, wenn die Recherche (inkl. Oeffnen der Scorecard-Seite) abgeschlossen ist.",
  input_schema: {
    type: "object",
    properties: {
      name: { type: "string", description: "Offizieller Platz-/Clubname" },
      holes: { type: "integer", enum: [9, 18], description: "Anzahl der Loecher der Runde" },
      par: { type: "array", items: { type: "integer" }, description: "Par je Loch in Spielreihenfolge; genau so viele Werte wie holes" },
      si: { type: "array", items: { type: "integer" }, description: "Stroke-Index je Loch als Permutation von 1..holes; leer lassen wenn unsicher" },
      tees: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            cr: { type: "number" },
            slope: { type: "number" }
          },
          required: ["name", "cr", "slope"]
        }
      },
      address: { type: "string", description: "Strasse Hausnummer, PLZ Ort" }
    },
    required: ["name", "holes", "par", "tees", "address"]
  }
};

function buildPrompt(name, hint, stricter) {
  let p = 'Recherchiere die offiziellen Platzdaten des Golfplatzes "' + name + '"';
  if (hint) p += ' (' + hint + ')';
  p += ': Par je Loch in Spielreihenfolge, HCP/Stroke-Index je Loch, sowie die Abschlaege (Tees) mit Course Rating (CR) und Slope fuer die uebliche 18-Loch- bzw. 9-Loch-Runde, ausserdem die vollstaendige postalische Adresse des Clubs (Strasse, Hausnummer, PLZ, Ort).';
  p += ' Vorgehen: (1) Suche gezielt nach dem Platz und seiner Scorecard/HCP-Tabelle, z.B. "Scorecard ' + name + '", "HCP Tabelle ' + name + '", "PC Caddie Bahnenverzeichnis ' + name + '", "DGV Platzdatenbank ' + name + '". (2) OEFFNE die vielversprechendste gefundene Seite mit dem web_fetch-Tool - besonders die offizielle Scorecard bzw. das Bahnenverzeichnis (haeufig eine PDF-Datei oder eine PC-Caddie-/DGV-Seite) - und LIES die exakten Zahlen direkt daraus ab, statt sie aus Suchsnippets zu schaetzen. Fetche notfalls mehrere Kandidatenseiten.';
  p += ' Erkennungshinweis Stroke-Index: die SI-Werte einer Bahn (9 oder 18 Loch) sind IMMER eine Permutation von 1..9 bzw. 1..18 - jede Zahl genau einmal, keine Wiederholung, keine Luecke. Findest du eine je-Loch-Zahlenreihe, die exakt dieses Muster erfuellt (auch ohne Beschriftung "Stroke Index"/"SI"), ist das mit hoher Sicherheit die SI-Tabelle.';
  p += ' Regeln fuer das Ergebnis: Das par-Array MUSS genau so viele Werte enthalten wie holes (9 oder 18) - findest du fuer ein einzelnes Loch keinen gesicherten Wert, schaetze anhand der Bahnlaenge plausibel (3/4/5), lasse aber NIE ein Loch weg. Das si-Array MUSS - falls angegeben - eine vollstaendige Permutation von 1..holes sein; im Zweifel lieber leer lassen.';
  if (stricter) {
    p += ' WICHTIG: Der vorige Versuch lieferte eine unvollstaendige Par-Liste. Diesmal unbedingt die offizielle Scorecard per web_fetch oeffnen und ALLE ' + '9 bzw. 18' + ' Par-Werte vollstaendig ablesen, bevor du das Ergebnis meldest.';
  }
  p += ' Wenn du fertig bist, rufe das Tool submit_course_data mit dem Ergebnis auf. Falls du das Tool nicht nutzt, antworte AUSSCHLIESSLICH mit einem JSON-Objekt ohne Markdown im selben Schema.';
  return p;
}

// Extrahiert das Ergebnisobjekt: bevorzugt aus dem submit_course_data-Tool-Aufruf,
// sonst aus Freitext-JSON.
function extractResult(data) {
  const blocks = data.content || [];
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    if (b && b.type === "tool_use" && b.name === "submit_course_data" && b.input && typeof b.input === "object") {
      return { parsed: b.input, via: "tool" };
    }
  }
  const txt = blocks.filter(function (b) { return b.type === "text"; }).map(function (b) { return b.text; }).join("\n").replace(/```json|```/g, "").trim();
  const s = txt.indexOf("{"), e = txt.lastIndexOf("}");
  if (s >= 0 && e >= 0) {
    try { return { parsed: JSON.parse(txt.slice(s, e + 1)), via: "text" }; } catch (err) { /* fallthrough */ }
  }
  return { parsed: null, via: null, stop: data.stop_reason };
}

async function callAnthropic(apiKey, name, hint, stricter) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 12000,
      tools: [
        { type: "web_search_20250305", name: "web_search", max_uses: 8 },
        { type: "web_fetch_20250910", name: "web_fetch", max_uses: 8 },
        SUBMIT_TOOL
      ],
      tool_choice: { type: "auto" },
      messages: [{ role: "user", content: buildPrompt(name, hint, stricter) }]
    })
  });
  return resp;
}

function validate(parsed) {
  const parLen = Array.isArray(parsed.par) ? parsed.par.length : 0;
  if (parLen !== 9 && parLen !== 18) {
    return { ok: false, parLen };
  }
  if (Array.isArray(parsed.si) && parsed.si.length > 0) {
    const siNums = parsed.si.map(Number);
    const isPerm = siNums.length === parLen && siNums.slice().sort((a, b) => a - b).every((v, i) => v === i + 1);
    if (!isPerm) { parsed.si = []; parsed.siRejected = true; }
  }
  return { ok: true, parLen };
}

async function handleResearch(request, env) {
  const cors = { "content-type": "application/json; charset=utf-8" };
  let name, hint;
  try {
    const body = await request.json();
    name = (body && body.name || "").trim();
    // Optionaler Standort-Hinweis (Adresse und/oder Koordinaten) zur Disambiguierung.
    const parts = [];
    if (body && body.address) parts.push(String(body.address).trim());
    if (body && body.lat != null && body.lon != null) parts.push("Koordinaten ca. " + Number(body.lat).toFixed(4) + ", " + Number(body.lon).toFixed(4) + ", Deutschland");
    hint = parts.join("; ") || null;
  } catch (e) {
    return new Response(JSON.stringify({ error: "Ungueltige Anfrage." }), { status: 400, headers: cors });
  }
  if (!name) {
    return new Response(JSON.stringify({ error: "Bitte zuerst einen Platznamen eingeben." }), { status: 400, headers: cors });
  }
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server ist nicht fuer die Recherche konfiguriert (kein API-Key hinterlegt)." }), { status: 500, headers: cors });
  }

  try {
    let lastErr = null;
    // Bis zu zwei Versuche: normal, dann strenger (falls Par unvollstaendig blieb).
    for (let attempt = 0; attempt < 2; attempt++) {
      const anthResp = await callAnthropic(apiKey, name, hint, attempt === 1);
      if (!anthResp.ok) {
        const errText = await anthResp.text();
        return new Response(JSON.stringify({ error: "Anthropic API Fehler (" + anthResp.status + "): " + errText.slice(0, 300) }), { status: 502, headers: cors });
      }
      const data = await anthResp.json();
      const ex = extractResult(data);
      if (!ex.parsed) {
        const stopInfo = ex.stop === "max_tokens" ? " (Antwort wurde wegen Token-Limit abgeschnitten)" : (ex.stop ? " (stop_reason: " + ex.stop + ")" : "");
        lastErr = "Konnte keine strukturierten Platzdaten aus der Antwort lesen." + stopInfo;
        continue; // erneut versuchen
      }
      const v = validate(ex.parsed);
      if (!v.ok) {
        lastErr = "Unvollstaendige Par-Liste erhalten (" + v.parLen + " statt 9 oder 18 Werte, holes-Feld meldete " + ex.parsed.holes + "). Bitte erneut versuchen oder Par manuell eintragen.";
        continue; // strenger erneut versuchen
      }
      return new Response(JSON.stringify({ result: ex.parsed }), { headers: cors });
    }
    return new Response(JSON.stringify({ error: lastErr || "Recherche ohne verwertbares Ergebnis." }), { status: 502, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Recherche fehlgeschlagen: " + (e && e.message ? e.message : String(e)) }), { status: 500, headers: cors });
  }
}

export { handleResearch };
