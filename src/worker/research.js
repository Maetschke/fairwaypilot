async function handleResearch(request, env) {
  const cors = { "content-type": "application/json; charset=utf-8" };
  let name;
  try {
    const body = await request.json();
    name = (body && body.name || "").trim();
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
    const prompt = 'Recherchiere die offiziellen Platzdaten des Golfplatzes "' + name + '": Par je Loch in Spielreihenfolge, HCP/Stroke-Index je Loch, sowie die Abschlaege (Tees) mit Course Rating (CR) und Slope fuer die uebliche 18-Loch- bzw. 9-Loch-Runde. Fuehre dazu mehrere Suchen durch: zunaechst eine allgemeine Suche zum Platz, danach falls noetig eine gezielte zweite (und ggf. dritte) Suche speziell nach der offiziellen Scorecard bzw. HCP-/Stroke-Index-Tabelle, z.B. mit Suchbegriffen wie "Scorecard ' + name + '", "HCP Tabelle ' + name + '", "PC Caddie Bahnenverzeichnis ' + name + '" oder "DGV Platzdatenbank ' + name + '". Wichtiger Erkennungshinweis fuer den Stroke-Index: Die Stroke-Index-Werte einer Bahn (9 oder 18 Loch) sind IMMER eine Permutation der Zahlen 1 bis 9 bzw. 1 bis 18 - jede Zahl kommt genau einmal vor, keine Wiederholung, keine Luecke. Findest du in einer Quelle (auch ohne explizite Beschriftung "Stroke Index" oder "SI") eine Zahlenreihe je Loch, die exakt dieses Muster erfuellt, ist das mit hoher Sicherheit die gesuchte Stroke-Index-Tabelle - verwende sie dann. Gib erst auf, wenn mehrere gezielte Suchen keine solche Zahlenreihe liefern. Ermittle zudem die vollstaendige postalische Adresse des Golfclubs (Strasse, Hausnummer, PLZ, Ort) aus dem Impressum oder den Kontaktangaben der offiziellen Vereinsseite. Antworte AUSSCHLIESSLICH mit einem JSON-Objekt ohne Markdown, ohne Erklaerung: {"name":"...","holes":9 oder 18,"par":[Zahlen],"si":[Zahlen oder leeres Array falls unbekannt],"tees":[{"name":"z.B. Gelb","cr":Zahl,"slope":Zahl}],"address":"Strasse Hausnummer, PLZ Ort"} . Das par-Array MUSS GENAU so viele Zahlen enthalten wie im Feld holes angegeben (9 oder 18) - findest du fuer ein einzelnes Loch keinen gesicherten Wert, schaetze anhand der Bahnlaenge einen plausiblen Par-Wert (3, 4 oder 5) statt das Loch im Array wegzulassen; das Array darf niemals kuerzer als holes sein. Das si-Array MUSS, falls angegeben, eine vollstaendige Permutation von 1 bis holes sein (jede Zahl genau einmal) - gib niemals ein si-Array zurueck, das dieses Muster nicht erfuellt; im Zweifel lieber [] zurueckgeben.';
    const anthResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 6000,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 6 }],
        messages: [{ role: "user", content: prompt }]
      })
    });
    if (!anthResp.ok) {
      const errText = await anthResp.text();
      return new Response(JSON.stringify({ error: "Anthropic API Fehler (" + anthResp.status + "): " + errText.slice(0, 300) }), { status: 502, headers: cors });
    }
    const data = await anthResp.json();
    const textParts = (data.content || []).filter(function (b) { return b.type === "text"; }).map(function (b) { return b.text; });
    const txt = textParts.join("\n").replace(/```json|```/g, "").trim();
    const jsonStart = txt.indexOf("{");
    const jsonEnd = txt.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0) {
      const stopInfo = data.stop_reason === "max_tokens" ? " (Antwort wurde wegen Token-Limit abgeschnitten)" : (data.stop_reason ? " (stop_reason: " + data.stop_reason + ")" : "");
      return new Response(JSON.stringify({ error: "Konnte keine strukturierten Platzdaten aus der Antwort lesen." + stopInfo }), { status: 502, headers: cors });
    }
    const parsed = JSON.parse(txt.slice(jsonStart, jsonEnd + 1));
    const parLen = Array.isArray(parsed.par) ? parsed.par.length : 0;
    if (parLen !== 9 && parLen !== 18) {
      return new Response(JSON.stringify({ error: "Unvollstaendige Par-Liste erhalten (" + parLen + " statt 9 oder 18 Werte, holes-Feld meldete " + parsed.holes + "). Bitte erneut versuchen oder Par manuell eintragen." }), { status: 502, headers: cors });
    }
    if (Array.isArray(parsed.si) && parsed.si.length > 0) {
      const siNums = parsed.si.map(Number);
      const isValidPermutation = siNums.length === parLen && siNums.slice().sort((a, b) => a - b).every((v, i) => v === i + 1);
      if (!isValidPermutation) {
        parsed.si = [];
        parsed.siRejected = true;
      }
    }
    return new Response(JSON.stringify({ result: parsed }), { headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Recherche fehlgeschlagen: " + (e && e.message ? e.message : String(e)) }), { status: 500, headers: cors });
  }
}

export { handleResearch };
