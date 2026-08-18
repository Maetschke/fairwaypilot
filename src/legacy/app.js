var SC_PAR = {
  Front:[4,4,5,4,3,4,4,4,5],
  Back: [3,5,4,4,3,4,3,5,4],
  KawF: [4,4,3,4,4,3,4,5,4],
  KawB: [4,3,5,4,3,4,4,4,4],
  WalF: [4,4,3,4,4,3,4,5,4],
  WalB: [4,4,3,4,4,3,4,5,4]
};
var SC_SI = {
  Front:[2,7,1,4,8,6,3,9,5],
  Back: [8,6,5,4,7,3,9,2,1],
  KawF: [2,7,1,4,8,6,3,9,5],
  KawB: [8,6,5,4,7,3,9,2,1],
  WalF: [2,7,1,4,8,6,3,9,5],
  WalB: [8,6,5,4,7,3,9,2,1]
};
var SC_CH = { Front:32, Back:31, KawF:32, KawB:31, WalF:32, WalB:31 };
function SC_netPar(par, chval, si, holes){
  holes = holes || 9;
  var extra = Math.floor(chval/holes);
  var rem = chval%holes;
  if(si<=rem) extra+=1;
  return par+extra;
}
function SC_stbfHole(score, par, chval, si, holes){
  if(score===null||score===undefined) return null;
  var npar = SC_netPar(par, chval, si, holes);
  var pts = 2 - (score - npar);
  return Math.max(0, pts);
}
function SC_scoreClass(score, par){
  if(score===null||score===undefined) return null;
  var d = score - par;
  if(d<=-2) return 'eagle';
  if(d===-1) return 'birdie';
  if(d===0)  return 'par';
  if(d===1)  return 'bogey';
  return 'dbogey'; // >=2 über Par
}
/* Zeigt Tag.Monat.Jahr - keine F/B/?-Kennung mehr, da die Halbe direkt darunter als
   Platzname (z.B. "K\u00fcrten F") sichtbar ist und daher redundant war. Diese Funktion war
   bisher UNABHAENGIG von scEntry.lbl (siehe RT_convertHalf) und hatte nur eine feste Liste
   von vier bekannten Halbcodes - jeder andere Code (z.B. bei eigenen/recherchierten Plaetzen
   wie Kuerten) fiel auf "?" zurueck. Bei mehreren Runden derselben Halbe am selben Tag wird
   zur Unterscheidung eine Nummer in Klammern angehaengt. */
function SC_label(sc){
  var same = SC.filter(function(x){return x.date===sc.date && x.half===sc.half;})
   .sort(function(a,b){var at=a.time||'', bt=b.time||''; return at>bt?1:at<bt?-1:0;});
  var d = sc.date.slice(8,10)+'.'+sc.date.slice(5,7)+'.'+sc.date.slice(0,4);
  if(same.length>1){ return d+' ('+(same.indexOf(sc)+1)+')'; }
  return d;
}
var HV_D_STATIC=[
  {date:'2026-04-01',lbl:'01.04.',half:'KawF',s:94,cr:35.35,sl:135,hi:94.3,col:'#FF9F0A',stbf:15},
  {date:'2026-04-01',lbl:'01.04.',half:'KawB',s:87,cr:35.35,sl:135,hi:83.0,col:'#FFD60A',stbf:8},
  {date:'2026-04-18',lbl:'18.04.',half:'Back',s:84,cr:35.4,sl:130,hi:81.1,col:'#BF5AF2',stbf:7},
  {date:'2026-04-26',lbl:'26.04.',half:'Front',s:95,cr:36.2,sl:138,hi:92.4,col:'#0A84FF',stbf:4},
  {date:'2026-04-28',lbl:'28.04.',half:'Back',s:86,cr:35.4,sl:130,hi:84.4,col:'#BF5AF2',stbf:10},
  {date:'2026-05-02',lbl:'02.05.',half:'Back',s:90,cr:35.4,sl:130,hi:91.1,col:'#BF5AF2',stbf:4},
  {date:'2026-05-14',lbl:'14.05.',half:'Back',s:92,cr:35.4,sl:130,hi:94.5,col:'#BF5AF2',stbf:1},
  {date:'2026-05-15',lbl:'15.05.',half:'Back',s:80,cr:35.4,sl:130,hi:74.4,col:'#BF5AF2',stbf:4},
  {date:'2026-05-16',lbl:'16.05.',half:'Front',s:76,cr:36.2,sl:138,hi:62.6,col:'#0A84FF',stbf:12},
  {date:'2026-05-16',lbl:'16.05.',half:'Back',s:73,cr:35.4,sl:130,hi:62.8,col:'#BF5AF2',stbf:11},
  {date:'2026-05-24',lbl:'24.05.',half:'WalF',s:80,cr:36.2,sl:131,hi:72.5,col:'#5AC8FA',stbf:9},
  {date:'2026-05-24',lbl:'24.05.',half:'WalB',s:73,cr:36.2,sl:131,hi:60.9,col:'#0071B2',stbf:9},
  {date:'2026-05-25',lbl:'25.05.',half:'Front',s:80,cr:36.2,sl:138,hi:68.9,col:'#0A84FF',stbf:8},
  {date:'2026-05-25',lbl:'25.05.',half:'Back',s:76,cr:35.4,sl:130,hi:67.8,col:'#BF5AF2',stbf:8},
  {date:'2026-05-27',lbl:'27.05.',half:'Front',s:83,cr:36.2,sl:138,hi:73.6,col:'#0A84FF',stbf:4},
  {date:'2026-05-27',lbl:'27.05.',half:'Back',s:77,cr:35.4,sl:130,hi:69.4,col:'#BF5AF2',stbf:7},
  {date:'2026-06-22',lbl:'22.06.',half:'Back',s:75,cr:35.4,sl:130,hi:66.1,col:'#BF5AF2',stbf:10},
  {date:'2026-06-24',lbl:'24.06.',half:'Back',s:75,cr:35.4,sl:130,hi:66.1,col:'#BF5AF2',stbf:12},
  {date:'2026-06-26',lbl:'26.06.',half:'Back',s:71,cr:35.4,sl:130,hi:59.4,col:'#BF5AF2',stbf:13},
  {date:'2026-06-30',lbl:'30.06.',half:'Front',s:73,cr:36.2,sl:138,hi:57.9,col:'#0A84FF',stbf:14},
  {date:'2026-06-30',lbl:'30.06.',half:'Back',s:74,cr:35.4,sl:130,hi:64.4,col:'#BF5AF2',stbf:14},
  {date:'2026-07-01',lbl:'01.07.',half:'Front',s:84,cr:36.2,sl:138,hi:75.1,col:'#0A84FF',stbf:7},
  {date:'2026-07-01',lbl:'01.07.',half:'Back',s:87,cr:35.4,sl:130,hi:86.1,col:'#BF5AF2',stbf:7},
  {date:'2026-07-05',lbl:'05.07.',half:'Front',s:83,cr:36.2,sl:138,hi:73.6,col:'#0A84FF',stbf:8},
  {date:'2026-07-05',lbl:'05.07.',half:'Back',s:78,cr:35.4,sl:130,hi:71.1,col:'#BF5AF2',stbf:11},
  {date:'2026-07-06',lbl:'06.07.',half:'Front',s:83,cr:36.2,sl:138,hi:73.6,col:'#0A84FF',stbf:14},
  {date:'2026-07-06',lbl:'06.07.',half:'Back',s:72,cr:35.4,sl:130,hi:61.1,col:'#BF5AF2',stbf:13},
  {date:'2026-07-09',lbl:'09.07.',half:'Back',s:78,cr:35.4,sl:130,hi:71.1,col:'#BF5AF2',stbf:7},
  {date:'2026-07-16',lbl:'16.07.',half:'Back',s:72,cr:35.4,sl:130,hi:61.1,col:'#BF5AF2',stbf:15},
  {date:'2026-07-16',lbl:'16.07.',half:'Back',s:70,cr:35.4,sl:130,hi:57.7,col:'#BF5AF2',stbf:15},
  {date:'2026-07-17',lbl:'17.07.',half:'Back',s:67,cr:35.4,sl:130,hi:52.7,col:'#BF5AF2',stbf:17},
  {date:'2026-07-17',lbl:'17.07.',half:'Front',s:84,cr:36.2,sl:138,hi:75.1,col:'#0A84FF',stbf:5},
  {date:'2026-07-19',lbl:'19.07.',half:'Front',s:72,cr:36.2,sl:138,hi:56.3,col:'#0A84FF',stbf:14},
  {date:'2026-07-19',lbl:'19.07.',half:'Back',s:69,cr:35.4,sl:130,hi:56.1,col:'#BF5AF2',stbf:17},
  {date:'2026-07-19',lbl:'19.07.',half:'Back',s:72,cr:35.4,sl:130,hi:61.1,col:'#BF5AF2',stbf:13},
  {date:'2026-07-24',lbl:'24.07.',half:'Front',s:68,cr:36.2,sl:138,hi:50.0,col:'#0A84FF',stbf:19},
  {date:'2026-07-24',lbl:'24.07.',half:'Back',s:71,cr:35.4,sl:130,hi:59.4,col:'#BF5AF2',stbf:14},
  {date:'2026-07-25',lbl:'25.07.',half:'Front',s:75,cr:36.2,sl:138,hi:61.0,col:'#0A84FF',stbf:12},
  {date:'2026-07-25',lbl:'25.07.',half:'Back',s:75,cr:35.4,sl:130,hi:66.1,col:'#BF5AF2',stbf:10},
  {date:'2026-07-25',lbl:'25.07.',half:'Back',s:68,cr:35.4,sl:130,hi:54.4,col:'#BF5AF2',stbf:16}
];
/* HV_D startet bewusst LEER statt mit HV_D_STATIC.slice(): die Konstante enthaelt Marks echte
   Handicap-Historie im Klartext und diente frueher (vor dem Supabase-Konto-/Multi-User-System)
   als Default-Anzeige. Seit jeder Nutzer sein eigenes Konto hat, wuerde ein Default mit Marks
   echten Daten fuer JEDEN anderen Nutzer falsch/fremd sein, bis RT_hydrateHistoricalData() beim
   ersten Tab-Wechsel ueberschreibt. HV_D_STATIC bleibt nur noch als Altdaten-Quelle fuer den
   (nicht mehr automatisch aufgerufenen) manuellen Hole19-Reimport RT_seedHistoricalRounds()
   erhalten. */
var HV_D=[];
var HV_COURSE_META={
 Front:{label:'Georghausen F', color:'#0A84FF'},
 Back:{label:'Georghausen B', color:'#BF5AF2'},
 WalF:{label:'Waldhof F', color:'#5AC8FA'},
 WalB:{label:'Waldhof B', color:'#0071B2'},
 KawF:{label:'Kaanapali F', color:'#FF9F0A'},
 KawB:{label:'Kaanapali B', color:'#FFD60A'},
 KueF:{label:'K\u00fcrten F', color:'#34C759'},
 KueB:{label:'K\u00fcrten B', color:'#1F8A4D'}
};
var RT_COLOR_PALETTE=['#30B0C7','#8E8E93','#AC8E68','#66D4CF','#FF3B30','#5E5CE6','#FF9F0A','#34C759','#0071B2','#D46BB3'];
/* Farbe deterministisch aus dem Platzcode ableiten statt aus einem fortlaufenden Zaehler:
   der Zaehler haengt an der Reihenfolge, in der Plaetze erstmals auftauchen, und liefert
   damit je nach geladener Rundenmenge unterschiedliche Farben fuer denselben Platz. */
/* Farbtoene der fest hinterlegten Plaetze (HV_COURSE_META): Georghausen blau/violett,
   Waldhof zweimal blau, Kaanapali orange/gelb, Kuerten zweimal gruen. Berechnete Farben
   halten zu diesen Werten Abstand, damit z.B. Leverkusen nicht im selben Gruen landet
   wie Kuerten. */
var RT_RESERVED_HUES=[211,278,197,202,36,50,142,146];
function RT_hueDist(a,b){
 var d=Math.abs(a-b)%360;
 return d>180?360-d:d;
}
function RT_colorForCode(code){
 /* Farbton aus dem Platznamen OHNE F/B-Suffix, Helligkeit unterscheidet die beiden Haelften:
    so gehoeren Front und Back eines Platzes sichtbar zusammen. Anschliessend wird der Ton
    in 6-Grad-Schritten weitergedreht, bis er mindestens 28 Grad von jedem reservierten
    Farbton entfernt liegt - deterministisch, da der Startwert aus dem Namen kommt. */
 var base=String(code).replace(/[FB]$/,'');
 var h=0;
 for(var i=0;i<base.length;i++){ h=(h*31+base.charCodeAt(i))>>>0; }
 var hue=h%360;
 for(var step=0;step<360;step+=6){
  var cand=(hue+step)%360;
  var clash=false;
  for(var r=0;r<RT_RESERVED_HUES.length;r++){
   if(RT_hueDist(cand,RT_RESERVED_HUES[r])<28){ clash=true; break; }
  }
  if(!clash){ hue=cand; break; }
 }
 var isFront=/F$/.test(code);
 return 'hsl('+hue+',62%,'+(isFront?'52%':'34%')+')';
}

/* Fasst mehrere Halbcodes desselben Platzes (z.B. "Front"+"Back") zu EINEM Filter-Chip
   zusammen ("Georghausen" statt getrennt "Georghausen F"/"Georghausen B"). Betrifft NUR die
   Chip-Auswahl - Legende, Chart-Farben und Tabellen zeigen weiterhin jede Halbe einzeln wie
   bisher, da sie ueber HV_D/SC.half (die einzelnen Codes) und nicht ueber die Gruppen gehen. */
function RT_groupCodes(codes){
 var groups=[], byBase={};
 codes.forEach(function(code){
  var m=HV_COURSE_META[code]||{label:code,color:'#8E8E93'};
  var base=m.label.replace(/\s+[FB]$/,'');
  if(!byBase[base]){ byBase[base]={label:base, codes:[code]}; groups.push(byBase[base]); }
  else byBase[base].codes.push(code);
 });
 return groups;
}

function HV_hn(h){return (HV_COURSE_META[h]&&HV_COURSE_META[h].label)||h;}
var RT_hiRange='all', RT_gdRange='all';
function RT_rangeCutoff(range){
 if(!range||range==='all') return null;
 var days=parseInt(range,10);
 if(isNaN(days)) return null;
 var d=new Date(); d.setDate(d.getDate()-days);
 return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
}
function HV_filt(v){
 var base;
 if(v==='all') base=HV_D;
 else{ var codes=v.split(','); base=HV_D.filter(function(d){return codes.indexOf(d.half)>=0;}); }
 var cutoff=RT_rangeCutoff(RT_hiRange);
 if(cutoff) base=base.filter(function(d){return d.date>=cutoff;});
 return base;
}
var HV_W=360,HV_H=292,HV_P={t:28,r:30,b:52,l:44};
var HV_cW=HV_W-HV_P.l-HV_P.r,HV_cH=HV_H-HV_P.t-HV_P.b;
var HV_curV='all';
function HV_hiCol(hi){
  if(hi>=95)return{bg:'rgba(139,0,0,.35)',tc:'#CC0000'};
  if(hi>=90)return{bg:'rgba(160,0,30,.35)',tc:'#E0001E'};
  if(hi>=85)return{bg:'rgba(180,30,0,.35)',tc:'#E83000'};
  if(hi>=80)return{bg:'rgba(190,70,0,.35)',tc:'#E86000'};
  if(hi>=75)return{bg:'rgba(180,100,0,.35)',tc:'#D47800'};
  if(hi>=70)return{bg:'rgba(160,120,0,.35)',tc:'#C09000'};
  if(hi>=65)return{bg:'rgba(120,120,0,.35)',tc:'#909000'};
  if(hi>=60)return{bg:'rgba(80,110,0,.35)',tc:'#608000'};
  if(hi>=55)return{bg:'rgba(50,120,0,.35)',tc:'#409000'};
  if(hi>54) return{bg:'rgba(30,150,0,.35)',tc:'#20AA00'};
  return{bg:'rgba(52,199,89,.15)',tc:'#34C759'};
}
/* Die Codes fallen in der Reihenfolge an, in der sie in den Runden vorkommen - dadurch
   stand je nach Datenlage mal die Back-, mal die Front-Neun vorn. Hier wird pro Platz
   fest Front vor Back gestellt; die Plaetze selbst behalten die Reihenfolge ihres ersten
   Auftretens. Wirkt zugleich auf Legende, Filter-Chips und Tabellen, da alle darauf
   aufbauen. */
function RT_sortHalfCodes(codes){
 var order=[], byBase={};
 codes.forEach(function(code){
  var m=HV_COURSE_META[code]||{label:code};
  var lbl=String(m.label);
  var base=lbl.replace(/\s+[FB]$/,'');
  if(!byBase[base]){ byBase[base]={F:null,B:null,rest:[]}; order.push(base); }
  var g=byBase[base];
  if(/\s+F$/.test(lbl)&&!g.F) g.F=code;
  else if(/\s+B$/.test(lbl)&&!g.B) g.B=code;
  else g.rest.push(code);
 });
 var out=[];
 order.forEach(function(b){
  var g=byBase[b];
  if(g.F) out.push(g.F);
  if(g.B) out.push(g.B);
  g.rest.forEach(function(c){ out.push(c); });
 });
 return out;
}
function HV_usedCodes(){
 var seen={}, codes=[];
 HV_D.forEach(function(d){ if(!seen[d.half]){ seen[d.half]=true; codes.push(d.half); } });
 return RT_sortHalfCodes(codes);
}
function SC_usedCodes(){
 var seen={}, codes=[];
 SC.forEach(function(sc){ if(!seen[sc.half]){ seen[sc.half]=true; codes.push(sc.half); } });
 return RT_sortHalfCodes(codes);
}
function HV_renderLegend(){
 var html=HV_usedCodes().map(function(code){
  var m=HV_COURSE_META[code]||{label:code,color:'#8E8E93'};
  return '<div class="li"><div class="lc" style="background:'+m.color+'"></div>'+m.label+'</div>';
 }).join('');
 document.getElementById('legend').innerHTML=html;
 var hiHint='<div class="ld" style="border-color:rgba(255,69,58,.7)"></div>HI '+rtDe(RT_ownHandicap());
 var hiEl=document.getElementById('hi-hint');
 if(hiEl) hiEl.innerHTML=hiHint;
}
function HV_renderSegButtons(){
 var opts='<option value="all"'+(HV_curV==='all'?' selected':'')+'>Alle Plätze</option>';
 opts+=RT_groupCodes(HV_usedCodes()).map(function(g){
  var v=g.codes.join(',');
  return '<option value="'+v+'"'+(HV_curV===v?' selected':'')+'>'+g.label+'</option>';
 }).join('');
 var el=document.getElementById('seg'); if(!el) return;
 el.style.background='none'; el.style.padding='0';
 el.innerHTML='<select id="seg-sel" style="width:100%;box-sizing:border-box;padding:9px 12px;border-radius:9px;border:1px solid #DCE7D4;background:#fff;color:#143522;font-size:13px;font-weight:600;font-family:inherit;">'+opts+'</select>';
 var sel=document.getElementById('seg-sel');
 if(sel) sel.onchange=function(){ HV_curV=sel.value; HV_renderChart(); HV_renderWhsChart(); HV_renderStbfChart(); };
}
function RD_renderSegButtons(){
 var opts='<option value="all"'+(curRoFilter==='all'?' selected':'')+'>Alle Plätze</option>';
 opts+=RT_groupCodes(SC_usedCodes()).map(function(g){
  var v=g.codes.join(',');
  return '<option value="'+v+'"'+(curRoFilter===v?' selected':'')+'>'+g.label+'</option>';
 }).join('');
 var el=document.getElementById('seg-ro'); if(!el) return;
 el.style.background='none'; el.style.padding='0';
 el.innerHTML='<select id="seg-ro-sel" style="width:100%;box-sizing:border-box;padding:9px 12px;border-radius:9px;border:1px solid #DCE7D4;background:#fff;color:#143522;font-size:13px;font-weight:600;font-family:inherit;">'+opts+'</select>';
 var sel=document.getElementById('seg-ro-sel');
 if(sel) sel.onchange=function(){ renderRounds(sel.value); GD_renderKPIs(); renderPenChart(); renderFW(); renderSandChart(); renderPuttsChart(); renderMetrics(); renderPerf(); };
}
function GD_renderRangeButtons(){
 var opts=[['all','Alle'],['30','30 Tage'],['90','90 Tage'],['180','6 Monate'],['365','1 Jahr']];
 var html=opts.map(function(o){return '<button class="sb'+(RT_gdRange===o[0]?' on':'')+'" data-v="'+o[0]+'">'+o[1]+'</button>';}).join('');
 var el=document.getElementById('seg-gdrange'); if(el) el.innerHTML=html;
}
document.getElementById('seg-gdrange').addEventListener('click',function(e){
  var btn=e.target.closest('.sb'); if(!btn)return;
  RT_gdRange=btn.dataset.v;
  document.querySelectorAll('#seg-gdrange .sb').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  renderPenChart(); renderSandChart(); renderPuttsChart();
});
var RT_WHS_TABLE=[
 {min:3,max:3,use:1,adj:-2.0},
 {min:4,max:4,use:1,adj:-1.0},
 {min:5,max:5,use:1,adj:0},
 {min:6,max:6,use:2,adj:-1.0},
 {min:7,max:8,use:2,adj:0},
 {min:9,max:11,use:3,adj:0},
 {min:12,max:14,use:4,adj:0},
 {min:15,max:16,use:5,adj:0},
 {min:17,max:18,use:6,adj:0},
 {min:19,max:19,use:7,adj:0},
 {min:20,max:9999,use:8,adj:0}
];
function RT_whsRule(cnt){ for(var i=0;i<RT_WHS_TABLE.length;i++){ if(cnt>=RT_WHS_TABLE[i].min&&cnt<=RT_WHS_TABLE[i].max) return RT_WHS_TABLE[i]; } return null; }
/* Mittelt aus einer Liste von Score-Differenzialen (auf max. 20 begrenzt) die besten N gemaess
   WHS-Tabelle inkl. Anpassung. Weniger als 3 -> null. */
function RT_whsCalc(arr){
 if(!arr||arr.length<3) return null;
 var cnt=Math.min(arr.length,20);
 var rule=RT_whsRule(cnt); if(!rule) return null;
 var s=arr.slice(0,20).sort(function(a,b){return a-b;});
 var use=Math.min(rule.use,s.length), sum=0;
 for(var j=0;j<use;j++) sum+=s[j];
 return sum/use+rule.adj;
}
/* Ein Score-Differenzial pro RUNDE (nicht pro Neun): Eine 18-Loch-Runde ergibt EIN 18-Loch-
   Differenzial aus dem tatsaechlichen Adjusted Gross (Netto-Doppelbogey-Deckel je Loch;
   gestrichene/ungespielte Loecher = Netto-Doppelbogey), Formel (113/Slope)*(AdjGross-CR).
   9-Loch-Runden oder Runden ohne CR/Slope fallen auf die 9->18-Hochrechnung (RT_convertRound,
   Mittel der Haelften) zurueck. */
function RT_whsRoundDiff(rd){
 var idx=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(rd):0; if(idx<0) return null;
 var p=rd.players&&rd.players[idx]; if(!p) return null;
 var cnt=rd.cnt||18;
 var codeF=(typeof RT_slugCourseCode==='function')?RT_slugCourseCode(rd.courseName,true):null;
 var codeB=(typeof RT_slugCourseCode==='function')?RT_slugCourseCode(rd.courseName,false):null;
 var col=(codeF&&HV_COURSE_META[codeF]&&HV_COURSE_META[codeF].color)||((typeof RT_colorForCode==='function'&&codeF)?RT_colorForCode(codeF):'#8E8E93');
 function out(diff){ return {date:rd.date, time:rd.time, diff:diff, course:rd.courseName||'', codeF:codeF, codeB:codeB, col:col, cnt:cnt}; }
 var sl=parseFloat(p.sl), cr=parseFloat(p.cr), ph=parseFloat(p.ph);
 if(cnt===18 && !isNaN(sl)&&!isNaN(cr)&&!isNaN(ph) && rd.par && rd.si && p.sc && p.sc.length>=18){
  var cx=p.cx||[]; var adj=0, unplayed=0;
  for(var i=0;i<18;i++){
   var np=SC_netPar(rd.par[i], ph, rd.si[i], 18); var cap=np+2; var sv=p.sc[i];
   if(cx[i]){ adj+=cap; }
   else if(sv===null||sv===undefined){ adj+=cap; unplayed++; }
   else { adj+=Math.min(sv,cap); }
  }
  if(unplayed<=4) return out(Math.round(((113/sl)*(adj-cr))*10)/10);
 }
 var conv=RT_convertRound(rd);
 if(conv&&conv.hv&&conv.hv.length){
  var sum=0,n=0; conv.hv.forEach(function(h){ if(h&&!isNaN(h.hi)){sum+=h.hi;n++;} });
  if(n) return out(Math.round((sum/n)*10)/10);
 }
 return null;
}
function RT_whsAllDiffs(){
 var rounds=(rtGet(RT_KEY)||[]).filter(function(r){ return r && !r.hidden && (r.historical||r.promoted); });
 var out=[];
 rounds.forEach(function(rd){ try{ var d=RT_whsRoundDiff(rd); if(d&&!isNaN(d.diff)) out.push(d); }catch(e){} });
 out.sort(function(a,b){ var ka=(a.date||'')+'T'+(a.time||'00:00'), kb=(b.date||'')+'T'+(b.time||'00:00'); return ka<kb?1:(ka>kb?-1:0); });
 return out;
}
/* Wertbare Runden fuer den WHS-Verlauf, gefiltert nach Zeitraum (RT_hiRange) und Platz-Auswahl
   (HV_curV), aufsteigend nach Datum. */
function RT_whsSeries(){
 var all=RT_whsAllDiffs();
 var cut=(RT_hiRange&&RT_hiRange!=='all'&&typeof RT_rangeCutoff==='function')?RT_rangeCutoff(RT_hiRange):null;
 var codes=(HV_curV&&HV_curV!=='all')?HV_curV.split(','):null;
 var arr=all.filter(function(d){
  if(cut && d.date<cut) return false;
  if(codes){ if(codes.indexOf(d.codeF)<0 && codes.indexOf(d.codeB)<0) return false; }
  return true;
 });
 arr.sort(function(a,b){ var ka=(a.date||'')+'T'+(a.time||'00:00'), kb=(b.date||'')+'T'+(b.time||'00:00'); return ka<kb?-1:(ka>kb?1:0); });
 return arr;
}
/* Automatischer WHS-Handicap-Index inkl. Soft-/Hard-Cap ueber die Low HI (niedrigster berechneter
   Index der letzten 365 Tage). PCC (Platz-/Wetter-Korrektur) ist im Einzelspieler-Betrieb nicht
   ermittelbar und daher 0. */
function RT_whsIndex(){
 var desc=RT_whsAllDiffs();
 if(desc.length<3) return null;
 var asc=desc.slice().reverse();
 /* Uncapped Index eines Fensters (letzte 20 bis Position i) inkl. aktiver Exceptional-Score-
    Reduction: WHS-Rule 5.9 senkt bei aussergewoehnlich guten Runden den Index (-1,0 bei 7,0-9,9
    unter dem Index zum Spielzeitpunkt, -2,0 ab 10,0) fuer die naechsten bis zu 20 Wertungen. */
 function asOf(i){
  var st=Math.max(0,i-19);
  var win=asc.slice(st,i+1);
  var base=RT_whsCalc(win.map(function(d){return d.diff;}));
  if(base===null) return null;
  var esr=0; win.forEach(function(d){ if(d._esr) esr+=d._esr; });
  return base-esr;
 }
 asc.forEach(function(d,i){
  d._esr=0;
  if(i>=1){
   var ref=asOf(i-1);
   if(ref!==null){
    var delta=ref-d.diff;
    if(delta>=10.0) d._esr=2.0;
    else if(delta>=7.0) d._esr=1.0;
   }
  }
 });
 var n=asc.length;
 var raw=asOf(n-1);
 if(raw===null) return null;
 var cut=(typeof RT_rangeCutoff==='function')?RT_rangeCutoff('365'):null;
 var lows=[];
 asc.forEach(function(d,i){ if(!cut || d.date>=cut){ var v=asOf(i); if(v!==null) lows.push(v); } });
 var lowHi=lows.length?Math.min.apply(null,lows):raw;
 var fin=raw, capped=false;
 if(raw-lowHi>3.0){ fin=lowHi+3.0+(raw-lowHi-3.0)*0.5; capped=true; }
 if(fin-lowHi>5.0){ fin=lowHi+5.0; capped=true; }
 fin=Math.round(fin*10)/10; if(fin>54) fin=54; if(fin<-10) fin=-10;
 var winStart=Math.max(0,n-20); var esrTotal=0, esrCount=0;
 asc.slice(winStart).forEach(function(d){ if(d._esr){ esrTotal+=d._esr; esrCount++; } });
 var cnt=Math.min(n,20); var rule=RT_whsRule(cnt);
 return {value:fin, raw:Math.round(raw*10)/10, lowHi:Math.round(lowHi*10)/10, capped:capped,
  count:cnt, use:rule?Math.min(rule.use,cnt):0, total:n,
  esr:Math.round(esrTotal*10)/10, esrCount:esrCount};
}
/* Repraesentativer Wert des bisherigen (groeberen) theoretischen 9L×2-Verlaufs: dieselbe
   Bestenauswahl wie beim WHS-Index (beste N der 20 juengsten), aber auf die PRO-NEUN hochge-
   rechneten Differenziale (HV_D.hi) angewendet - so unterscheidet sich nur die Methode, nicht
   die Aggregation. */
function RT_theoIndex(){
 var arr=(typeof HV_D!=='undefined'&&HV_D)?HV_D.filter(function(d){return d&&d.hi!==null&&d.hi!==undefined&&!isNaN(d.hi);}).slice():[];
 if(arr.length<3) return null;
 arr.sort(function(a,b){ var ka=(a.date||'')+'T'+(a.time||'00:00'), kb=(b.date||'')+'T'+(b.time||'00:00'); return ka<kb?1:(ka>kb?-1:0); });
 var win=arr.slice(0,20).map(function(d){return d.hi;});
 var v=RT_whsCalc(win);
 if(v===null) return null;
 return {value:Math.round(v*10)/10, count:Math.min(win.length,20)};
}
function HV_renderWhsIndex(){
 var el=document.getElementById('whs-index'); if(!el) return;
 var w=RT_whsIndex();
 var t=RT_theoIndex();
 if(!w && !t){
  el.innerHTML='<div style="font-size:13px;font-weight:700;color:#143522;margin-bottom:2px;">Handicap-Index</div>'+
   '<div style="font-size:11px;color:rgba(93,112,96,.95);">Noch nicht genug gewertete Runden \u2013 ab 3 gewerteten Runden erscheint hier ein Index nach WHS-Schema.</div>';
  return;
 }
 function box(label, val, colObj, sub){
  return '<div style="flex:1;min-width:0;text-align:center;background:'+colObj.bg+';border-radius:12px;padding:12px 8px;">'+
   '<div style="font-size:26px;font-weight:800;line-height:1;color:'+colObj.tc+';">'+(val===null||val===undefined?'\u2013':rtDe(val))+'</div>'+
   '<div style="font-size:9px;font-weight:700;color:rgba(84,104,88,.95);margin-top:4px;letter-spacing:.2px;">'+label+'</div>'+
   '<div style="font-size:8.5px;color:rgba(84,104,88,.75);margin-top:2px;">'+sub+'</div>'+
  '</div>';
 }
 var neutral={bg:'rgba(120,120,0,.12)',tc:'#8A7A00'};
 var tCol=t?HV_hiCol(t.value):neutral;
 var wCol=w?HV_hiCol(w.value):neutral;
 var h='<div style="display:flex;gap:10px;">'+
  box('THEORETISCH', t?t.value:null, tCol, '9L\u00d72-Verlauf')+
  box('WHS-INDEX', w?w.value:null, wCol, w&&w.capped?'amtlich \u00b7 gedeckelt':'amtlich')+
  '</div>';
 if(w){
  var stored=RT_ownHandicap(); var same=Math.abs(stored-w.value)<0.05;
  h+='<div style="font-size:11px;color:rgba(93,112,96,.95);margin-top:10px;line-height:1.45;">Der <b>WHS-Index</b> ist die amtliche Rechnung: beste '+w.use+' von '+w.count+' j\u00fcngsten Runden (je Runde ein Differenzial)'+(w.esr>0?(', inkl. Sonderreduzierung −'+rtDe(w.esr)+' für außergewöhnliche Runden'):'')+(w.capped?(', gedeckelt \u00fcber Low HI '+rtDe(w.lowHi)):'')+'. Der <b>theoretische</b> Wert stammt aus dem gr\u00f6beren 9L\u00d72-Verlauf im Diagramm.</div>';
  if(same){
   h+='<div style="font-size:11px;color:#187040;font-weight:700;margin-top:8px;">WHS-Index entspricht deinem eingetragenen Handicap.</div>';
  }else{
   h+='<div style="font-size:11px;color:rgba(93,112,96,.95);margin-top:8px;">Eingetragenes Handicap: '+rtDe(stored)+'</div>'+
    '<button class="rt-btn2" style="width:auto;margin-top:8px;padding:9px 14px;font-size:12px;" onclick="RT_whsAdopt()">WHS-Index als mein Handicap \u00fcbernehmen</button>';
  }
  h+='<div style="font-size:10px;color:rgba(84,104,88,.7);margin-top:8px;">Ohne Platz-/Wetter-Korrektur (PCC) \u2013 im Einzelspieler-Betrieb nicht ermittelbar.</div>';
 }
 el.innerHTML=h;
}
function RT_whsAdopt(){
 var w=RT_whsIndex(); if(!w) return;
 var val=w.value;
 rtSet(RT_OWNHI_KEY,val);
 if(sb&&sbUser){ try{ sb.auth.updateUser({data:{handicap:val}}).then(function(r){ if(r&&r.data&&r.data.user) sbUser=r.data.user; }); }catch(e){} }
 try{ HV_renderWhsIndex(); }catch(e){}
 try{ HV_renderChart(); }catch(e){}
 try{ HV_renderWhsChart(); }catch(e){}
 try{ RT_render(); }catch(e){}
}
function HV_renderKPIs(){
  var hi=HV_D.map(function(d){return d.hi;});
  var best=Math.min.apply(null,hi).toFixed(1);
  var worst=Math.max.apply(null,hi).toFixed(1);
  var f4=HV_D.slice(0,4).reduce(function(s,d){return s+d.hi;},0)/4;
  var l4=HV_D.slice(-4).reduce(function(s,d){return s+d.hi;},0)/4;
  var tr=(l4-f4).toFixed(1);
  document.getElementById('kpis').innerHTML=
   '<div class="kpi"><div class="kv cg">'+best+'</div><div class="kl">Bestes HI</div></div>'+
   '<div class="kpi"><div class="kv ca">'+worst+'</div><div class="kl">Schlechtestes</div></div>'+
   '<div class="kpi"><div class="kv '+(parseFloat(tr)<0?'cg':'cb')+'">'+(parseFloat(tr)<0?'':'+')+tr+'</div><div class="kl">Trend</div></div>';
}
function HV_renderChart(){
  var svg=document.getElementById('svg');
  var pts=HV_filt(HV_curV);
  var n=pts.length;
  if(!n){svg.innerHTML='<text x="180" y="130" text-anchor="middle" font-size="12" fill="rgba(100,118,102,.95)">Keine Daten</text>';return;}
  var ms=function(s){return new Date(s).getTime();};
  var ts=pts.map(function(d){return ms(d.date);});
  var t0=Math.min.apply(null,ts),t1=Math.max.apply(null,ts),tSpan=Math.max(1,t1-t0);
  var xS=function(i){return HV_P.l+(t1===t0?HV_cW/2:(ms(pts[i].date)-t0)/tSpan*HV_cW);};
  var hiA=pts.map(function(d){return d.hi;});
  var hiMn=Math.floor((Math.min.apply(null,hiA)-10)/10)*10;
  var hiMx=Math.ceil((Math.max.apply(null,hiA)+10)/10)*10;
  var yS=function(v){return HV_P.t+HV_cH-(v-hiMn)/(hiMx-hiMn)*HV_cH;};
  var g='';
  for(var v=hiMn;v<=hiMx;v+=10){
    var gy=yS(v).toFixed(1);
    g+='<line x1="'+HV_P.l+'" y1="'+gy+'" x2="'+(HV_W-HV_P.r)+'" y2="'+gy+'" stroke="rgba(27,46,32,'+(v%20===0?.12:.06)+')"/>';
    g+='<text x="'+(HV_P.l-5)+'" y="'+(parseFloat(gy)+3.5).toFixed(1)+'" text-anchor="end" font-size="9" fill="rgba(96,115,99,.95)" font-family="Inter,sans-serif">'+v+'</text>';
  }
  var ownHi=RT_ownHandicap();
  if(ownHi>=hiMn&&ownHi<=hiMx){
    var y54=yS(ownHi).toFixed(1);
    g+='<rect x="'+HV_P.l+'" y="'+HV_P.t+'" width="'+HV_cW+'" height="'+(parseFloat(y54)-HV_P.t).toFixed(1)+'" fill="rgba(255,69,58,.04)"/>';
    g+='<line x1="'+HV_P.l+'" y1="'+y54+'" x2="'+(HV_W-HV_P.r)+'" y2="'+y54+'" stroke="rgba(255,69,58,.75)" stroke-width="2" stroke-dasharray="6,4"/>';
    g+='<text x="'+(HV_W-HV_P.r+4)+'" y="'+(parseFloat(y54)+3.5).toFixed(1)+'" font-size="8.5" fill="rgba(255,69,58,.85)" font-weight="700" font-family="Inter,sans-serif">HI '+rtDe(ownHi)+'</text>';
  }
    HV_usedCodes().forEach(function(t){
    var tp=pts.filter(function(d){return d.half===t;});
    if(tp.length<2)return;
    var path='';
    tp.forEach(function(d){var xi=pts.indexOf(d);path+=(path?'L':'M')+xS(xi).toFixed(1)+','+yS(d.hi).toFixed(1);});
    g+='<path d="'+path+'" fill="none" stroke="'+HV_COURSE_META[t].color+'" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>';
  });
  [['2026-04-01','Apr'],['2026-05-01','Mai'],['2026-06-01','Jun'],['2026-07-01','Jul'],['2026-07-25','25.07.']].forEach(function(L){
    var t=ms(L[0]); if(t<t0||t>t1) return;
    var x=(HV_P.l+(t-t0)/tSpan*HV_cW).toFixed(1);
    g+='<line x1="'+x+'" y1="'+HV_P.t+'" x2="'+x+'" y2="'+(HV_P.t+HV_cH)+'" stroke="rgba(27,46,32,.07)" stroke-dasharray="2,4"/>';
    g+='<text x="'+x+'" y="'+(HV_P.t+HV_cH+14).toFixed(1)+'" text-anchor="middle" font-size="9.5" fill="rgba(50,72,56,.9)" font-weight="500" font-family="Inter,sans-serif">'+L[1]+'</text>';
  });
  pts.forEach(function(d,i){
    var x=xS(i).toFixed(1),y=yS(d.hi).toFixed(1);
    g+='<circle class="dot" data-idx="'+HV_D.indexOf(d)+'" cx="'+x+'" cy="'+y+'" r="4.5" fill="'+d.col+'" stroke="#fff" stroke-width="2" style="cursor:pointer"/>';
    if(i===0||i===n-1||d.hi>88||d.hi<=54)
      g+='<text x="'+x+'" y="'+(parseFloat(y)-9).toFixed(1)+'" text-anchor="middle" font-size="9" fill="'+d.col+'" font-weight="700" font-family="Inter,sans-serif">'+d.hi.toFixed(0)+'</text>';
  });
  svg.innerHTML=g;
  var tip=document.getElementById('tip');
  function show(ex,ey,d){
    tip.innerHTML='<div class="tit" style="color:'+d.col+'">'+d.lbl+' '+HV_hn(d.half)+'</div>'+
      '<div class="tr"><span>Schläge 9L</span><b>'+d.s+'</b></div>'+
      '<div class="tr"><span>Stableford</span><b>'+d.stbf+'</b></div>'+
      '<div class="tr"><span>CR / SL</span><b>'+rtDe(d.cr)+' / '+d.sl+'</b></div>'+
      '<div class="tr"><span>HI theoret.</span><b>'+d.hi.toFixed(1)+'</b></div>';
    tip.classList.add('on');
    var wr=svg.parentElement.getBoundingClientRect();
    var lf=ex-wr.left+12; if(lf+195>wr.width) lf=ex-wr.left-200;
    tip.style.left=Math.max(0,lf)+'px'; tip.style.top=Math.max(0,ey-wr.top-70)+'px';
  }
  svg.querySelectorAll('.dot').forEach(function(el){
    el.addEventListener('mouseenter',function(e){var d=HV_D[parseInt(el.dataset.idx)];if(d)show(e.clientX,e.clientY,d);});
    el.addEventListener('mouseleave',function(){tip.classList.remove('on');});
    el.addEventListener('click',function(e){var d=HV_D[parseInt(el.dataset.idx)];if(d)show(e.clientX,e.clientY,d);});
    el.addEventListener('touchstart',function(e){e.preventDefault();var d=HV_D[parseInt(el.dataset.idx)];if(!d)return;var t=e.touches[0];show(t.clientX,t.clientY,d);setTimeout(function(){tip.classList.remove('on');},2500);},{passive:false});
  });
}
function HV_renderWhsChart(){
  var svg=document.getElementById('svg-whs'); if(!svg) return;
  var pts=RT_whsSeries();
  var n=pts.length;
  if(!n){ svg.innerHTML='<text x="180" y="130" text-anchor="middle" font-size="12" fill="rgba(100,118,102,.95)">Keine Daten</text>'; return; }
  var ms=function(x){return new Date(x).getTime();};
  var ts=pts.map(function(d){return ms(d.date);});
  var t0=Math.min.apply(null,ts),t1=Math.max.apply(null,ts),tSpan=Math.max(1,t1-t0);
  var xS=function(i){return HV_P.l+(t1===t0?HV_cW/2:(ms(pts[i].date)-t0)/tSpan*HV_cW);};
  var va=pts.map(function(d){return d.diff;});
  var mn=Math.floor((Math.min.apply(null,va)-10)/10)*10;
  var mx=Math.ceil((Math.max.apply(null,va)+10)/10)*10;
  var yS=function(v){return HV_P.t+HV_cH-(v-mn)/(mx-mn)*HV_cH;};
  var g='';
  for(var v=mn;v<=mx;v+=10){
    var gy=yS(v).toFixed(1);
    g+='<line x1="'+HV_P.l+'" y1="'+gy+'" x2="'+(HV_W-HV_P.r)+'" y2="'+gy+'" stroke="rgba(27,46,32,'+(v%20===0?.12:.06)+')"/>';
    g+='<text x="'+(HV_P.l-5)+'" y="'+(parseFloat(gy)+3.5).toFixed(1)+'" text-anchor="end" font-size="9" fill="rgba(96,115,99,.95)" font-family="Inter,sans-serif">'+v+'</text>';
  }
  var ownHi=RT_ownHandicap();
  if(ownHi>=mn&&ownHi<=mx){
    var y54=yS(ownHi).toFixed(1);
    g+='<line x1="'+HV_P.l+'" y1="'+y54+'" x2="'+(HV_W-HV_P.r)+'" y2="'+y54+'" stroke="rgba(255,69,58,.7)" stroke-width="2" stroke-dasharray="6,4"/>';
    g+='<text x="'+(HV_W-HV_P.r+4)+'" y="'+(parseFloat(y54)+3.5).toFixed(1)+'" font-size="8.5" fill="rgba(255,69,58,.85)" font-weight="700" font-family="Inter,sans-serif">HI '+rtDe(ownHi)+'</text>';
  }
  var w=RT_whsIndex();
  if(w && w.value>=mn && w.value<=mx){
    var yw=yS(w.value).toFixed(1);
    g+='<line x1="'+HV_P.l+'" y1="'+yw+'" x2="'+(HV_W-HV_P.r)+'" y2="'+yw+'" stroke="rgba(31,138,77,.75)" stroke-width="2" stroke-dasharray="6,4"/>';
    g+='<text x="'+(HV_W-HV_P.r+4)+'" y="'+(parseFloat(yw)-3).toFixed(1)+'" font-size="8.5" fill="rgba(31,138,77,.95)" font-weight="700" font-family="Inter,sans-serif">WHS '+rtDe(w.value)+'</text>';
  }
  var path='';
  pts.forEach(function(d,i){ path+=(path?'L':'M')+xS(i).toFixed(1)+','+yS(d.diff).toFixed(1); });
  g+='<path d="'+path+'" fill="none" stroke="rgba(80,100,86,.5)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  [['2026-04-01','Apr'],['2026-05-01','Mai'],['2026-06-01','Jun'],['2026-07-01','Jul'],['2026-07-25','25.07.']].forEach(function(L){
    var t=ms(L[0]); if(t<t0||t>t1) return;
    var x=(HV_P.l+(t-t0)/tSpan*HV_cW).toFixed(1);
    g+='<line x1="'+x+'" y1="'+HV_P.t+'" x2="'+x+'" y2="'+(HV_P.t+HV_cH)+'" stroke="rgba(27,46,32,.07)" stroke-dasharray="2,4"/>';
    g+='<text x="'+x+'" y="'+(HV_P.t+HV_cH+14).toFixed(1)+'" text-anchor="middle" font-size="9.5" fill="rgba(50,72,56,.9)" font-weight="500" font-family="Inter,sans-serif">'+L[1]+'</text>';
  });
  pts.forEach(function(d,i){
    var x=xS(i).toFixed(1),y=yS(d.diff).toFixed(1);
    g+='<circle class="dotw" data-i="'+i+'" cx="'+x+'" cy="'+y+'" r="4.5" fill="'+d.col+'" stroke="#fff" stroke-width="2" style="cursor:pointer"/>';
    if(i===0||i===n-1) g+='<text x="'+x+'" y="'+(parseFloat(y)-9).toFixed(1)+'" text-anchor="middle" font-size="9" fill="'+d.col+'" font-weight="700" font-family="Inter,sans-serif">'+d.diff.toFixed(0)+'</text>';
  });
  svg.innerHTML=g;
  var tip=document.getElementById('tip-whs');
  if(tip){
    var show=function(ex,ey,d){
      tip.innerHTML='<div class="tit" style="color:'+d.col+'">'+(d.course||'Runde')+'</div>'+
        '<div class="tr"><span>Datum</span><b>'+(d.date?d.date.split('-').reverse().join('.'):'')+'</b></div>'+
        '<div class="tr"><span>L\u00f6cher</span><b>'+(d.cnt||18)+'</b></div>'+
        '<div class="tr"><span>WHS-Differenzial</span><b>'+rtDe(d.diff)+'</b></div>';
      tip.classList.add('on');
      var wr=svg.parentElement.getBoundingClientRect();
      var lf=ex-wr.left+12; if(lf+195>wr.width) lf=ex-wr.left-200;
      tip.style.left=Math.max(0,lf)+'px'; tip.style.top=Math.max(0,ey-wr.top-70)+'px';
    };
    svg.querySelectorAll('.dotw').forEach(function(el){
      var d=pts[parseInt(el.dataset.i)];
      el.addEventListener('mouseenter',function(e){ if(d)show(e.clientX,e.clientY,d);});
      el.addEventListener('mouseleave',function(){tip.classList.remove('on');});
      el.addEventListener('click',function(e){ if(d)show(e.clientX,e.clientY,d);});
      el.addEventListener('touchstart',function(e){e.preventDefault();if(!d)return;var t=e.touches[0];show(t.clientX,t.clientY,d);setTimeout(function(){tip.classList.remove('on');},2500);},{passive:false});
    });
  }
}
var RT_stbfMode='18';
/* Stableford-Verlauf. Datenquelle sind die PRO-NEUN erfassten Stableford-Punkte (HV_D.stbf).
   Modus '9': jede Neun als eigener Punkt (ein Tag mit Front+Back gibt zwei Punkte).
   Modus '18': Front+Back desselben Tages und Platzes werden zu EINER 18er-Wertung summiert
   (je ein bester Front- und Back-Wert); wurde nur eine Neun gespielt, steht sie allein. */
function RT_stbfSeries(){
 var base=(typeof HV_D!=='undefined'&&HV_D)?HV_D.slice():[];
 var arr=(HV_curV==='all')?base:base.filter(function(d){ return HV_curV.split(',').indexOf(d.half)>=0; });
 var cut=(RT_hiRange&&RT_hiRange!=='all'&&typeof RT_rangeCutoff==='function')?RT_rangeCutoff(RT_hiRange):null;
 if(cut) arr=arr.filter(function(d){return d.date>=cut;});
 arr=arr.filter(function(d){ return d && d.stbf!==null && d.stbf!==undefined && !isNaN(d.stbf); });
 function ascSort(x){ x.sort(function(a,b){ var ka=(a.date||'')+'T'+(a.time||'00:00'),kb=(b.date||'')+'T'+(b.time||'00:00'); return ka<kb?-1:(ka>kb?1:0); }); return x; }
 if(RT_stbfMode==='9'){
  return ascSort(arr.map(function(d){ return {date:d.date, time:d.time, pts:d.stbf, col:d.col, course:(HV_COURSE_META[d.half]&&HV_COURSE_META[d.half].label)||d.half, holes:9}; }));
 }
 function baseOf(half){ var m=HV_COURSE_META[half]; var lbl=m?m.label:half; return String(lbl).replace(/\s+[FB]$/,''); }
 function isFront(half){ return half==='Front'||/F$/.test(half); }
 var groups={};
 arr.forEach(function(d){
  var b=baseOf(d.half); var k=d.date+'|'+b;
  if(!groups[k]) groups[k]={date:d.date, time:d.time, base:b, front:null, back:null, frontCol:null, backCol:null};
  var gg=groups[k];
  if(isFront(d.half)){ if(gg.front===null||d.stbf>gg.front){ gg.front=d.stbf; gg.frontCol=d.col; } }
  else { if(gg.back===null||d.stbf>gg.back){ gg.back=d.stbf; gg.backCol=d.col; } }
  var tt=d.time||'00:00'; if(!gg.time||tt<gg.time) gg.time=tt;
 });
 var out=Object.keys(groups).map(function(k){ var gg=groups[k];
  var sum=(gg.front||0)+(gg.back||0); var nines=(gg.front!==null?1:0)+(gg.back!==null?1:0);
  return {date:gg.date, time:gg.time, pts:sum, col:gg.frontCol||gg.backCol, course:gg.base, holes:18, nines:nines};
 });
 return ascSort(out);
}
function HV_renderStbfToggle(){
 var el=document.getElementById('seg-stbf'); if(!el) return;
 var opts=[['18','18 L\u00f6cher'],['9','9 L\u00f6cher']];
 el.innerHTML=opts.map(function(o){return '<button class="sb'+(RT_stbfMode===o[0]?' on':'')+'" data-v="'+o[0]+'">'+o[1]+'</button>';}).join('');
}
function HV_renderStbfChart(){
  var svg=document.getElementById('svg-stbf'); if(!svg) return;
  var pts=RT_stbfSeries();
  var n=pts.length;
  if(!n){ svg.innerHTML='<text x="180" y="130" text-anchor="middle" font-size="12" fill="rgba(100,118,102,.95)">Keine Daten</text>'; return; }
  var target=(RT_stbfMode==='9')?18:36;
  var ms=function(x){return new Date(x).getTime();};
  var ts=pts.map(function(d){return ms(d.date);});
  var t0=Math.min.apply(null,ts),t1=Math.max.apply(null,ts),tSpan=Math.max(1,t1-t0);
  var xS=function(i){return HV_P.l+(t1===t0?HV_cW/2:(ms(pts[i].date)-t0)/tSpan*HV_cW);};
  var va=pts.map(function(d){return d.pts;});
  var lo=Math.min.apply(null,va), hi=Math.max.apply(null,va);
  var mn=Math.max(0,Math.floor((Math.min(lo,target)-4)/10)*10);
  var mx=Math.ceil((Math.max(hi,target)+4)/10)*10;
  var yS=function(v){return HV_P.t+HV_cH-(v-mn)/(mx-mn)*HV_cH;};
  var g='';
  for(var v=mn;v<=mx;v+=10){
    var gy=yS(v).toFixed(1);
    g+='<line x1="'+HV_P.l+'" y1="'+gy+'" x2="'+(HV_W-HV_P.r)+'" y2="'+gy+'" stroke="rgba(27,46,32,'+(v%20===0?.12:.06)+')"/>';
    g+='<text x="'+(HV_P.l-5)+'" y="'+(parseFloat(gy)+3.5).toFixed(1)+'" text-anchor="end" font-size="9" fill="rgba(96,115,99,.95)" font-family="Inter,sans-serif">'+v+'</text>';
  }
  var yt=yS(target).toFixed(1);
  g+='<line x1="'+HV_P.l+'" y1="'+yt+'" x2="'+(HV_W-HV_P.r)+'" y2="'+yt+'" stroke="rgba(255,159,10,.75)" stroke-width="2" stroke-dasharray="6,4"/>';
  g+='<text x="'+(HV_W-HV_P.r+4)+'" y="'+(parseFloat(yt)+3.5).toFixed(1)+'" font-size="8.5" fill="rgba(200,120,0,.95)" font-weight="700" font-family="Inter,sans-serif">'+target+'</text>';
  var path='';
  pts.forEach(function(d,i){ path+=(path?'L':'M')+xS(i).toFixed(1)+','+yS(d.pts).toFixed(1); });
  g+='<path d="'+path+'" fill="none" stroke="rgba(80,100,86,.5)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  [['2026-04-01','Apr'],['2026-05-01','Mai'],['2026-06-01','Jun'],['2026-07-01','Jul'],['2026-07-25','25.07.']].forEach(function(L){
    var t=ms(L[0]); if(t<t0||t>t1) return;
    var x=(HV_P.l+(t-t0)/tSpan*HV_cW).toFixed(1);
    g+='<line x1="'+x+'" y1="'+HV_P.t+'" x2="'+x+'" y2="'+(HV_P.t+HV_cH)+'" stroke="rgba(27,46,32,.07)" stroke-dasharray="2,4"/>';
    g+='<text x="'+x+'" y="'+(HV_P.t+HV_cH+14).toFixed(1)+'" text-anchor="middle" font-size="9.5" fill="rgba(50,72,56,.9)" font-weight="500" font-family="Inter,sans-serif">'+L[1]+'</text>';
  });
  pts.forEach(function(d,i){
    var x=xS(i).toFixed(1),y=yS(d.pts).toFixed(1);
    g+='<circle class="dots" data-i="'+i+'" cx="'+x+'" cy="'+y+'" r="4.5" fill="'+d.col+'" stroke="#fff" stroke-width="2" style="cursor:pointer"/>';
    if(i===0||i===n-1) g+='<text x="'+x+'" y="'+(parseFloat(y)-9).toFixed(1)+'" text-anchor="middle" font-size="9" fill="'+d.col+'" font-weight="700" font-family="Inter,sans-serif">'+d.pts+'</text>';
  });
  svg.innerHTML=g;
  var tip=document.getElementById('tip-stbf');
  if(tip){
    var show=function(ex,ey,d){
      tip.innerHTML='<div class="tit" style="color:'+d.col+'">'+(d.course||'Runde')+'</div>'+
        '<div class="tr"><span>Datum</span><b>'+(d.date?d.date.split('-').reverse().join('.'):'')+'</b></div>'+
        '<div class="tr"><span>Wertung</span><b>'+(d.holes===18?((d.nines===1?'9 (nur eine Neun)':'18 L\u00f6cher')):'9 L\u00f6cher')+'</b></div>'+
        '<div class="tr"><span>Stableford</span><b>'+d.pts+'</b></div>';
      tip.classList.add('on');
      var wr=svg.parentElement.getBoundingClientRect();
      var lf=ex-wr.left+12; if(lf+195>wr.width) lf=ex-wr.left-200;
      tip.style.left=Math.max(0,lf)+'px'; tip.style.top=Math.max(0,ey-wr.top-70)+'px';
    };
    svg.querySelectorAll('.dots').forEach(function(el){
      var d=pts[parseInt(el.dataset.i)];
      el.addEventListener('mouseenter',function(e){ if(d)show(e.clientX,e.clientY,d);});
      el.addEventListener('mouseleave',function(){tip.classList.remove('on');});
      el.addEventListener('click',function(e){ if(d)show(e.clientX,e.clientY,d);});
      el.addEventListener('touchstart',function(e){e.preventDefault();if(!d)return;var t=e.touches[0];show(t.clientX,t.clientY,d);setTimeout(function(){tip.classList.remove('on');},2500);},{passive:false});
    });
  }
}
var HV_tblPage=0;
function HV_renderTable(){
  var sortedHV=HV_D.slice().sort(function(a,b){
   if(a.date!==b.date) return b.date>a.date?1:-1;
   var at=a.time||'', bt=b.time||'';
   return bt>at?1:bt<at?-1:0;
  });
  var start=HV_tblPage*20;
  var shown=sortedHV.slice(start,start+20);
  var rows=shown.map(function(d){
    var hc=HV_hiCol(d.hi);
    var pill='<span class="pill" style="background:'+hc.bg+';color:'+hc.tc+'">'+d.hi.toFixed(1)+'</span>';
    var stbf='<span style="font-size:10px;font-weight:600;color:#BF5AF2;">'+d.stbf+'</span>';
    return '<tr><td>'+d.lbl+'</td><td style="color:'+d.col+';font-size:9px">'+HV_hn(d.half)+'</td>'+
      '<td style="text-align:right;font-size:9px">'+rtDe(d.cr)+'/'+d.sl+'</td>'+
      '<td style="text-align:right">'+d.s+'</td>'+
      '<td style="text-align:right">'+stbf+'</td>'+
      '<td style="text-align:right">'+pill+'</td></tr>';
  }).join('');
  document.getElementById('tbl').innerHTML='<thead><tr><th>Datum</th><th>Typ</th><th style="text-align:right">CR/SL</th><th style="text-align:right">Schlg</th><th style="text-align:right">Stbf</th><th style="text-align:right">HI</th></tr></thead><tbody>'+rows+'</tbody>';
  var hasPrev=HV_tblPage>0, hasNext=start+20<sortedHV.length;
  var rangeEnd=Math.min(start+20,sortedHV.length);
  document.getElementById('tbl-more').innerHTML = (hasPrev||hasNext)
    ? '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;">'+
      '<button class="sb" style="flex:1;background:#E9F0E2;" '+(hasPrev?'onclick="HV_tblPrev()"':'disabled style="flex:1;background:#E9F0E2;opacity:.4;"')+'>&#8249; Vorherige</button>'+
      '<div style="font-size:10px;color:rgba(93,112,96,.95);white-space:nowrap;">'+(start+1)+'–'+rangeEnd+' von '+sortedHV.length+'</div>'+
      '<button class="sb" style="flex:1;background:#E9F0E2;" '+(hasNext?'onclick="HV_tblNext()"':'disabled style="flex:1;background:#E9F0E2;opacity:.4;"')+'>Nächste &#8250;</button>'+
    '</div>'
    : '';
}
function HV_tblNext(){ HV_tblPage++; HV_renderTable(); }
function HV_tblPrev(){ if(HV_tblPage>0){ HV_tblPage--; HV_renderTable(); } }
document.getElementById('seg').addEventListener('click',function(e){
  var btn=e.target.closest('.sb'); if(!btn)return;
  HV_curV=btn.dataset.v;
  document.querySelectorAll('#seg .sb').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  HV_renderChart();
  HV_renderWhsChart();
  HV_renderStbfChart();
});
function HV_renderRangeButtons(){
 var opts=[['all','Alle'],['30','30 Tage'],['90','90 Tage'],['180','6 Monate'],['365','1 Jahr']];
 var html=opts.map(function(o){return '<button class="sb'+(RT_hiRange===o[0]?' on':'')+'" data-v="'+o[0]+'">'+o[1]+'</button>';}).join('');
 var el=document.getElementById('seg-hirange'); if(el) el.innerHTML=html;
}
document.getElementById('seg-hirange').addEventListener('click',function(e){
  var btn=e.target.closest('.sb'); if(!btn)return;
  RT_hiRange=btn.dataset.v;
  document.querySelectorAll('#seg-hirange .sb').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  HV_renderChart();
  HV_renderWhsChart();
  HV_renderStbfChart();
});
var _segStbfEl=document.getElementById('seg-stbf');
if(_segStbfEl){ _segStbfEl.addEventListener('click',function(e){
  var btn=e.target.closest('.sb'); if(!btn)return;
  RT_stbfMode=btn.dataset.v;
  document.querySelectorAll('#seg-stbf .sb').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  HV_renderStbfChart();
}); }

function barChart(svgId, series, colors, labels, dataArr, tipId, seriesLabels){
  dataArr = dataArr || SC;
  var svg=document.getElementById(svgId);
  if(!svg) return;
  var W=340,H=140,pb={t:20,r:10,b:36,l:32};
  var cW=W-pb.l-pb.r,cH=H-pb.t-pb.b;
  var n=labels.length;
  var allVals=[];
  series.forEach(function(s){s.forEach(function(v){allVals.push(v);});});
  /* Neuanmeldung/keine Runden: kein Balken, sondern schlichter Hinweis wie im Handicap-Diagramm.
     Ohne diesen Guard liefert Math.max([]) = -Infinity und die Achsenbeschriftung zeigt
     "-Infinity"/"NaN". */
  if(!n || !dataArr.length || !allVals.length){ svg.innerHTML='<text x="170" y="74" text-anchor="middle" font-size="12" fill="rgba(100,118,102,.95)" font-family="Inter,sans-serif">Keine Daten</text>'; return; }
  var mx=Math.ceil(Math.max.apply(null,allVals)+1);
  if(!isFinite(mx)||mx<1) mx=1;
  var g='';
  // Grid
  for(var i=0;i<=4;i++){
    var gv=mx*i/4;
    var gy=(pb.t+cH-gv/mx*cH).toFixed(1);
    g+='<line x1="'+pb.l+'" y1="'+gy+'" x2="'+(W-pb.r)+'" y2="'+gy+'" stroke="rgba(27,46,32,.10)"/>';
    g+='<text x="'+(pb.l-4)+'" y="'+(parseFloat(gy)+3).toFixed(1)+'" text-anchor="end" font-size="8" fill="rgba(100,118,102,.95)" font-family="Inter,sans-serif">'+Math.round(gv)+'</text>';
  }
  // Zeitproportionale X-Achse basierend auf dataArr.date
  var _ts=dataArr.map(function(x){return new Date(x.date).getTime();});
  var t0=Math.min.apply(null,_ts);
  var t1=Math.max.apply(null,_ts);
  var tSpan=Math.max(1,t1-t0);
  var bW=8; // feste Balkenbreite
  // Monatsgrenzen als Orientierungslinien
  ['2026-04-01','2026-05-01','2026-06-01','2026-07-01'].forEach(function(md){
    var t=new Date(md).getTime();
    if(t<t0||t>t1) return;
    var x=(pb.l+(t-t0)/tSpan*cW).toFixed(1);
    var mo=md.slice(5,7)==='04'?'Apr':md.slice(5,7)==='05'?'Mai':md.slice(5,7)==='06'?'Jun':'Jul';
    g+='<line x1="'+x+'" y1="'+pb.t+'" x2="'+x+'" y2="'+(pb.t+cH)+'" stroke="rgba(27,46,32,.09)" stroke-dasharray="2,4"/>';
    g+='<text x="'+x+'" y="'+(pb.t+cH+12).toFixed(1)+'" text-anchor="middle" font-size="8.5" fill="rgba(74,96,80,.9)" font-weight="500" font-family="Inter,sans-serif">'+mo+'</text>';
  });
  // Balken zeitproportional positionieren
  dataArr.forEach(function(sc,i){
    var t=new Date(sc.date).getTime();
    var cx=pb.l+(t-t0)/tSpan*cW;
    var grpW=series.length*bW+(series.length-1)*2;
    var startX=cx-grpW/2;
    series.forEach(function(ser,si){
      var v=ser[i];
      if(!v) return;
      var bh=Math.max(2,v/mx*cH);
      var bx=(startX+si*(bW+2)).toFixed(1);
      var by=(pb.t+cH-bh).toFixed(1);
      g+='<rect class="bar" data-idx="'+i+'" data-si="'+si+'" x="'+bx+'" y="'+by+'" width="'+bW+'" height="'+bh.toFixed(1)+'" rx="2" fill="'+colors[si]+'" opacity=".85" style="cursor:pointer"/>';
    });
  });
  svg.innerHTML=g;
  if(tipId){
    var tip=document.getElementById(tipId);
    if(tip){
      var showBarTip=function(ex,ey,idx,si){
        var sc=dataArr[idx]; if(!sc) return;
        var val=series[si]?series[si][idx]:null;
        var lbl=(seriesLabels&&seriesLabels[si])||'Wert';
        var courseName=(HV_COURSE_META[sc.half]&&HV_COURSE_META[sc.half].label)||hn(sc.half);
        tip.innerHTML='<div class="tit">'+SC_label(sc)+' &middot; '+courseName+'</div>'+
         '<div class="tr"><span>'+lbl+'</span><b>'+(val!==null&&val!==undefined?val:'–')+'</b></div>'+
         (sc.stbf!==undefined?'<div class="tr"><span>Stableford</span><b>'+sc.stbf+'</b></div>':'');
        tip.classList.add('on');
        var wr=svg.parentElement.getBoundingClientRect();
        var lf=ex-wr.left+12; if(lf+195>wr.width) lf=ex-wr.left-200;
        tip.style.left=Math.max(0,lf)+'px'; tip.style.top=Math.max(0,ey-wr.top-70)+'px';
      };
      svg.querySelectorAll('.bar').forEach(function(el){
        el.addEventListener('mouseenter',function(e){ showBarTip(e.clientX,e.clientY,parseInt(el.dataset.idx,10),parseInt(el.dataset.si,10)); });
        el.addEventListener('mouseleave',function(){ tip.classList.remove('on'); });
        el.addEventListener('click',function(e){ showBarTip(e.clientX,e.clientY,parseInt(el.dataset.idx,10),parseInt(el.dataset.si,10)); });
        el.addEventListener('touchstart',function(e){ e.preventDefault(); var t=e.touches[0]; showBarTip(t.clientX,t.clientY,parseInt(el.dataset.idx,10),parseInt(el.dataset.si,10)); setTimeout(function(){tip.classList.remove('on');},2500); },{passive:false});
      });
    }
  }
}








var SC_STATIC=[
  {id:'01.04-F', date:'2026-04-01', lbl:'01.04. F', half:'KawF',
   scores:[14,12,7,12,10,6,10,17,6], crossed:[0,0,0,0,1,0,1,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0]},
  {id:'01.04-B', date:'2026-04-01', lbl:'01.04. B', half:'KawB',
   scores:[13,4,11,6,9,15,10,9,10], crossed:[0,0,0,0,0,0,1,1,1],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0]},
  {id:'16.07.R1-B', date:'2026-07-16', lbl:'16.07. B1', half:'Back',
   scores:[9,12,7,6,6,10,7,8,7], crossed:[0,0,0,0,0,1,0,0,0],
   putts:[3,3,4,2,3,-1,3,3,3], fw:['C','C','C','C',null,null,null,'C','C'],
   pen:[1,1,0,0,0,0,0,0,0], sand:[1,0,0,0,1,0,0,0,0],stbf:15},
  {id:'16.07.R2-B', date:'2026-07-16', lbl:'16.07. B2', half:'Back',
   scores:[8,10,7,6,6,10,7,8,7], crossed:[1,1,0,0,0,1,0,0,0],
   putts:[-1,-1,4,2,3,-1,3,3,3], fw:[null,null,'C','C',null,null,null,'C','C'],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,1,0,0,0,0],stbf:15},
  {id:'17.07-B', date:'2026-07-17', lbl:'17.07. B', half:'Back',
   scores:[6,8,6,8,3,9,6,11,10], crossed:[0,0,0,0,0,0,0,1,0],
   putts:[3,2,2,3,1,3,3,-1,2], fw:[null,'R','R','C',null,'C',null,null,'C'],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,2,0,0,0,0,0,0,0],stbf:17},
  {id:'17.07-F', date:'2026-07-17', lbl:'17.07. F', half:'Front',
   scores:[7,11,11,10,8,9,9,8,11], crossed:[0,0,1,1,1,0,0,0,0],
   putts:[2,2,-1,-1,-1,3,3,2,3], fw:['C','C',null,null,null,'C','C','R','R'],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,1,0,0,0,0,0,0,1],stbf:5},
  {id:'19.07-F', date:'2026-07-19', lbl:'19.07. F', half:'Front',
   scores:[10,7,11,6,5,6,8,9,11], crossed:[0,0,1,0,0,0,0,1,1],
   putts:[2,4,-1,3,4,3,3,-1,-1], fw:['R','C',null,'C',null,'R',null,null,null],
   pen:[1,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0],stbf:14},
  {id:'19.07-B', date:'2026-07-19', lbl:'19.07. B', half:'Back',
   scores:[8,10,9,8,5,7,5,8,8], crossed:[1,1,0,0,0,0,0,0,0],
   putts:[3,-1,3,2,2,2,3,2,2], fw:[null,null,'C','C',null,'R',null,'C','C'],
   pen:[1,0,1,1,0,0,0,0,1], sand:[0,0,1,1,0,0,0,0,1],stbf:17},
  {id:'19.07-B2', date:'2026-07-19', lbl:'19.07. B2', half:'Back',
   scores:[7,11,8,10,5,8,4,9,10], crossed:[0,0,0,1,0,0,0,0,0],
   putts:[2,3,3,-1,2,3,2,2,4], fw:[null,'R',null,null,null,'C',null,'C','R'],
   pen:[1,0,0,0,0,0,0,0,1], sand:[0,0,0,0,1,0,0,0,1],stbf:13},
  {id:'24.07-F', date:'2026-07-24', lbl:'24.07. F', half:'Front',
   scores:[5,5,null,6,null,7,9,null,8], crossed:[0,0,1,0,1,0,0,1,0],
   putts:[2,1,-1,2,-1,3,3,-1,3], fw:['C','R',null,'R',null,'R','R',null,'C'],
   pen:[0,0,0,0,0,1,0,0,0], sand:[0,1,0,0,0,0,0,0,1],stbf:19},
  {id:'24.07-B', date:'2026-07-24', lbl:'24.07. B', half:'Back',
   scores:[8,7,7,8,null,8,7,11,7], crossed:[0,0,0,0,1,0,0,0,0],
   putts:[2,2,2,3,-1,2,2,2,3], fw:[null,'R','C','R',null,'R',null,'R','C'],
   pen:[1,0,0,0,0,0,1,1,0], sand:[0,0,0,0,0,0,2,0,0],stbf:14},
  {id:'27.05-F', date:'2026-05-27', lbl:'27.05. F', half:'Front',
   scores:[10,8,11,10,8,8,9,8,9], crossed:[1,0,1,1,1,1,0,1,0],
   putts:[-1,3,-1,-1,-1,-1,3,-1,2], fw:[null,'R',null,null,null,null,'R',null,'R'],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,1,0],stbf:4},
  {id:'27.05-B', date:'2026-05-27', lbl:'27.05. B', half:'Back',
   scores:[8,9,7,10,8,8,6,11,10], crossed:[0,0,0,1,0,0,0,1,0],
   putts:[-1,2,2,3,-1,3,2,-1,3], fw:[null,'R','R','R',null,'R',null,null,'R'],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0],stbf:7},
  {id:'05.07-F', date:'2026-07-05', lbl:'05.07. F', half:'Front',
   scores:[9,12,12,9,6,7,9,8,11], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[2,2,3,4,2,1,2,2,2], fw:['C','R','C','C',null,'C','C','R','R'],
   pen:[0,0,0,0,1,0,1,1,1], sand:[0,0,0,0,0,0,0,0,0],stbf:8},
  {id:'05.07-B', date:'2026-07-05', lbl:'05.07. B', half:'Back',
   scores:[4,11,6,14,8,10,7,10,8], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[1,2,3,2,3,3,3,3,3], fw:[null,'R',null,'C',null,'C',null,'C','C'],
   pen:[0,0,0,0,1,0,0,0,0], sand:[1,0,3,0,0,0,0,0,0],stbf:11},
  {id:'25.07-F', date:'2026-07-25', lbl:'25.07. F', half:'Front',
   scores:[7,8,11,8,8,9,8,8,7], crossed:[0,0,1,0,1,0,0,1,0],
   putts:[3,2,-1,2,-1,2,3,-1,1], fw:['R','R',null,'C',null,'C','C',null,'C'],
   pen:[0,0,0,1,0,1,0,0,0], sand:[0,0,0,0,0,0,0,1,0],stbf:12},
  {id:'25.07-B', date:'2026-07-25', lbl:'25.07. B', half:'Back',
   scores:[8,10,8,10,8,8,6,9,8], crossed:[1,0,0,0,1,0,0,0,0],
   putts:[-1,2,3,3,-1,2,2,2,3], fw:[null,'R','R','L',null,'R',null,'C','C'],
   pen:[0,0,0,0,0,1,0,0,0], sand:[0,0,0,0,0,0,1,0,0],stbf:10},
  {id:'25.07-B2', date:'2026-07-25', lbl:'25.07. B2', half:'Back',
   scores:[6,10,6,9,5,8,6,11,7], crossed:[0,1,0,0,0,0,0,0,0],
   putts:[2,-1,2,3,2,2,3,2,3], fw:[null,null,'R','C',null,'R',null,'R','C'],
   pen:[0,0,0,0,0,0,1,0,0], sand:[1,0,0,0,0,0,0,0,0],stbf:16},
  {id:'ph-2026-04-18-Back', date:'2026-04-18', lbl:'18.04. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:7, noData:true},
  {id:'ph-2026-04-26-Front', date:'2026-04-26', lbl:'26.04. F', half:'Front',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:4, noData:true},
  {id:'ph-2026-04-28-Back', date:'2026-04-28', lbl:'28.04. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:10, noData:true},
  {id:'ph-2026-05-02-Back', date:'2026-05-02', lbl:'02.05. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:4, noData:true},
  {id:'ph-2026-05-14-Back', date:'2026-05-14', lbl:'14.05. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:1, noData:true},
  {id:'ph-2026-05-15-Back', date:'2026-05-15', lbl:'15.05. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:4, noData:true},
  {id:'ph-2026-05-16-Front', date:'2026-05-16', lbl:'16.05. F', half:'Front',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:12, noData:true},
  {id:'ph-2026-05-16-Back', date:'2026-05-16', lbl:'16.05. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:11, noData:true},
  {id:'ph-2026-05-24-WalF', date:'2026-05-24', lbl:'24.05. F', half:'WalF',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:9, noData:true},
  {id:'ph-2026-05-24-WalB', date:'2026-05-24', lbl:'24.05. B', half:'WalB',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:9, noData:true},
  {id:'ph-2026-05-25-Front', date:'2026-05-25', lbl:'25.05. F', half:'Front',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:8, noData:true},
  {id:'ph-2026-05-25-Back', date:'2026-05-25', lbl:'25.05. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:8, noData:true},
  {id:'ph-2026-06-22-Back', date:'2026-06-22', lbl:'22.06. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:10, noData:true},
  {id:'ph-2026-06-24-Back', date:'2026-06-24', lbl:'24.06. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:12, noData:true},
  {id:'ph-2026-06-26-Back', date:'2026-06-26', lbl:'26.06. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:13, noData:true},
  {id:'ph-2026-06-30-Front', date:'2026-06-30', lbl:'30.06. F', half:'Front',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:14, noData:true},
  {id:'ph-2026-06-30-Back', date:'2026-06-30', lbl:'30.06. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:14, noData:true},
  {id:'ph-2026-07-01-Front', date:'2026-07-01', lbl:'01.07. F', half:'Front',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:7, noData:true},
  {id:'ph-2026-07-01-Back', date:'2026-07-01', lbl:'01.07. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:7, noData:true},
  {id:'ph-2026-07-06-Front', date:'2026-07-06', lbl:'06.07. F', half:'Front',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:14, noData:true},
  {id:'ph-2026-07-06-Back', date:'2026-07-06', lbl:'06.07. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:13, noData:true},
  {id:'ph-2026-07-09-Back', date:'2026-07-09', lbl:'09.07. B', half:'Back',
   scores:[null,null,null,null,null,null,null,null,null], crossed:[0,0,0,0,0,0,0,0,0],
   putts:[-1,-1,-1,-1,-1,-1,-1,-1,-1], fw:[null,null,null,null,null,null,null,null,null],
   pen:[0,0,0,0,0,0,0,0,0], sand:[0,0,0,0,0,0,0,0,0], stbf:7, noData:true},
];
/* Siehe Kommentar bei HV_D weiter oben: SC startet ebenfalls leer statt mit Marks echten
   Klartext-Daten aus SC_STATIC. */
var SC=[];

function hn(h){
  return HV_hn(h);
}

function SC_filtered(){
  return SC.filter(function(sc){ return curRoFilter==='all' || curRoFilter.split(',').indexOf(sc.half)>=0; });
}
function GD_filtered(){
  var list=SC_filtered();
  var cutoff=RT_rangeCutoff(RT_gdRange);
  if(cutoff) list=list.filter(function(sc){return sc.date>=cutoff;});
  return list;
}
function stats(){
  var tP=0,cP=0,tPen=0,tSand=0;
  var fwL=0,fwC=0,fwR=0;
  var scList=SC_filtered();
  scList.forEach(function(sc){
    sc.putts.forEach(function(p){if(p>0){tP+=p;cP++;}});
    sc.pen.forEach(function(p){tPen+=p;});
    sc.sand.forEach(function(s){tSand+=s;});
    sc.fw.forEach(function(f){if(f==='L')fwL++;else if(f==='C')fwC++;else if(f==='R')fwR++;});
  });
  var n=Math.max(1,scList.length);
  return {avgPutts:(tP/Math.max(1,cP)).toFixed(1),avgPen:(tPen/n).toFixed(1),
    avgSand:(tSand/n).toFixed(1),fwL:fwL,fwC:fwC,fwR:fwR,
    fwTotal:fwL+fwC+fwR,totalPen:tPen,totalSand:tSand,roundCount:scList.length};
}

function GD_renderKPIs(){
  var s=stats(); var tot=s.fwTotal||1;
  var fwPct=Math.round(s.fwC/tot*100);
  document.getElementById('gd-kpis').innerHTML=
    '<div class="kpi"><div class="kv cg">'+fwPct+'%</div><div class="kl">Fairway Mitte</div></div>'+
    '<div class="kpi"><div class="kv ca">'+s.avgPen+'</div><div class="kl">Strafschl./Rd.</div></div>'+
    '<div class="kpi"><div class="kv cb">'+s.avgPutts+'</div><div class="kl">Putts/Loch</div></div>';
}

function renderFW(){
  var s=stats(); var tot=s.fwTotal||1;
  var lp=Math.round(s.fwL/tot*100),cp=Math.round(s.fwC/tot*100),rp=Math.round(s.fwR/tot*100);
  document.getElementById('fw-chart').innerHTML=
    '<div class="fw-bar"><div class="fw-l" style="width:'+lp+'%"></div>'+
    '<div class="fw-c" style="width:'+cp+'%"></div>'+
    '<div class="fw-r" style="width:'+rp+'%"></div></div>'+
    '<div class="fw-legend">'+
    '<div class="fw-li"><div class="fw-dot" style="background:#FF453A"></div>Links '+lp+'% ('+s.fwL+')</div>'+
    '<div class="fw-li"><div class="fw-dot" style="background:#34C759"></div>Mitte '+cp+'% ('+s.fwC+')</div>'+
    '<div class="fw-li"><div class="fw-dot" style="background:#FF9F0A"></div>Rechts '+rp+'% ('+s.fwR+')</div>'+
    '</div>';
}

function renderPuttsChart(){
  var fList=GD_filtered();
  var labels=fList.map(function(sc,i){return i%3===0?sc.lbl.split(' ')[0]:'';});
  var avgPutts=fList.map(function(sc){
    var pp=sc.putts.filter(function(p){return p>0;});
    return pp.length?parseFloat((pp.reduce(function(s,v){return s+v;},0)/pp.length).toFixed(2)):0;
  });
  barChart('svg-putts',[avgPutts],['#0A84FF'],labels,fList,'tip-putts',['Putts/Loch']);
}

function renderPenChart(){
  var fList=GD_filtered();
  var labels=fList.map(function(sc,i){return i%3===0?sc.lbl.split(' ')[0]:'';});
  var pens=fList.map(function(sc){return sc.pen.reduce(function(s,v){return s+v;},0);});
  barChart('svg-pen',[pens],['#FF453A'],labels,fList,'tip-pen',['Strafschläge']);
}
function renderSandChart(){
  var fList=GD_filtered();
  var labels=fList.map(function(sc,i){return i%3===0?sc.lbl.split(' ')[0]:'';});
  var sands=fList.map(function(sc){return sc.sand.reduce(function(s,v){return s+v;},0);});
  barChart('svg-sand',[sands],['#FF9F0A'],labels,fList,'tip-sand',['Bunker']);
}

function renderMetrics(){
  var s=stats(); var tot=s.fwTotal||1;
  var items=[
    {icon:'&#127919;',bg:'rgba(52,199,89,.2)',col:'#34C759',name:'Fairway Mitte',desc:s.fwC+' von '+tot+' Abschlägen auf Par 4/5',val:Math.round(s.fwC/tot*100)+'%'},
    {icon:'&#8594;',bg:'rgba(255,159,10,.2)',col:'#FF9F0A',name:'Tendenz Rechts',desc:s.fwR+' Abschläge nach rechts ('+Math.round(s.fwR/tot*100)+'%)',val:Math.round(s.fwR/tot*100)+'%'},
    {icon:'&#9940;',bg:'rgba(255,69,58,.2)',col:'#FF453A',name:'Strafschläge pro Runde',desc:'Gesamt '+s.totalPen+' über '+s.roundCount+' Runden',val:s.avgPen},
    {icon:'&#127944;',bg:'rgba(255,159,10,.2)',col:'#FF9F0A',name:'Bunker-Shots pro Runde',desc:'Gesamt '+s.totalSand+' über '+s.roundCount+' Runden',val:s.avgSand},
    {icon:'&#127944;',bg:'rgba(10,132,255,.2)',col:'#0A84FF',name:'Putts pro Loch',desc:'Alle Löcher mit bekannter Putt-Zahl',val:s.avgPutts}
  ];
  document.getElementById('metrics').innerHTML=items.map(function(it){
    return '<div class="mrow"><div class="mic" style="background:'+it.bg+'">'+it.icon+'</div>'+
      '<div class="mbody"><div class="mn">'+it.name+'</div><div class="md">'+it.desc+'</div></div>'+
      '<div class="mv" style="color:'+it.col+'">'+it.val+'</div></div>';
  }).join('');
}

function renderPerf(){
  var s=stats(); var tot=s.fwTotal||1;
  var fwAcc=Math.round(s.fwC/tot*100);
  var puttScore=Math.round(Math.max(0,Math.min(100,(3.5-parseFloat(s.avgPutts))/1.5*100)));
  var penScore=Math.round(Math.max(0,Math.min(100,(5-parseFloat(s.avgPen))/5*100)));
  var sandScore=Math.round(Math.max(0,Math.min(100,(4-parseFloat(s.avgSand))/4*100)));
  var bars=[
    {n:'Fairway-Genauigkeit',v:fwAcc,c:'#34C759',tip:fwAcc+'% Mitte'},
    {n:'Rechts-Tendenz (inv.)',v:Math.round((1-s.fwR/tot)*100),c:'#BF5AF2',tip:s.fwR+' von '+tot+' rechts'},
    {n:'Strafschlag-Kontrolle',v:penScore,c:'#FF453A',tip:'Oe '+s.avgPen+'/Runde'},
    {n:'Bunker-Vermeidung',v:sandScore,c:'#FF9F0A',tip:'Oe '+s.avgSand+'/Runde'},
    {n:'Putt-Effizienz',v:puttScore,c:'#0A84FF',tip:'Oe '+s.avgPutts+' Putts/Loch'}
  ];
  document.getElementById('perf').innerHTML=bars.map(function(b){
    var g=b.v>=80?'Sehr gut':b.v>=60?'Gut':b.v>=40?'Ausbaufähig':'Handlungsbedarf';
    var gc=b.v>=80?'#34C759':b.v>=60?'#0A84FF':b.v>=40?'#FF9F0A':'#FF453A';
    return '<div class="pr"><div class="ph"><div class="pn">'+b.n+'</div><div class="pv" style="color:'+gc+'">'+g+'</div></div>'+
      '<div class="pt"><div class="pf" style="width:'+b.v+'%;background:'+b.c+'"></div></div>'+
      '<div style="font-size:10px;color:rgba(93,112,96,.95);margin-top:3px;">'+b.tip+'</div></div>';
  }).join('');
}

var curRoFilter='all';
var RD_page=0;
function renderRounds(filter){
  if(filter){ curRoFilter=filter; RD_page=0; }
  var list=SC.slice().sort(function(a,b){
   if(a.date!==b.date) return b.date>a.date?1:-1;
   var at=a.time||'', bt=b.time||'';
   return bt>at?1:bt<at?-1:0;
  }).filter(function(sc){
    if(curRoFilter==='all') return true;
    return curRoFilter.split(',').indexOf(sc.half)>=0;
  });
  var rdStart=RD_page*10;
  var shownList=list.slice(rdStart,rdStart+10);
  var html=shownList.map(function(sc){
    var pp=sc.putts.filter(function(p){return p>0;});
    var avgP=pp.length?(pp.reduce(function(s,v){return s+v;},0)/pp.length).toFixed(1):'-';
    var pen=sc.pen.reduce(function(s,v){return s+v;},0);
    var sand=sc.sand.reduce(function(s,v){return s+v;},0);
    var fw=sc.fw.filter(function(f){return f!==null;});
    var fwC=fw.filter(function(f){return f==='C';}).length;
    var fwPct=fw.length?Math.round(fwC/fw.length*100):0;
    var col=(HV_COURSE_META[sc.half]&&HV_COURSE_META[sc.half].color)||'#8E8E93';
    var scCourse=(HV_COURSE_META[sc.half]&&HV_COURSE_META[sc.half].label)||hn(sc.half); var scKey=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(scCourse):null; var scBg=RT_bgForKey(scKey,scCourse);
    return '<div style="position:relative;overflow:hidden;border-radius:16px;padding:10px 10px;margin-bottom:6px;cursor:pointer;" onclick="RT_editFromDetail(\''+(sc.rtId||('hist-'+sc.id))+'\')">'+'<img src="'+scBg+'" alt="" loading="lazy" onerror="RT_imgErr(this)" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.12;z-index:0;pointer-events:none;">'+'<div style="position:relative;z-index:1;">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+
      '<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:600;">'+SC_label(sc)+'</div>'+
      '<div style="font-size:10px;color:'+col+';margin-top:1px;">'+hn(sc.half)+'</div></div>'+
      '<div style="display:grid;grid-template-columns:repeat(4,42px);gap:6px;text-align:center;flex:none;">'+
      '<div><div style="font-size:14px;font-weight:700;line-height:1.2;font-variant-numeric:tabular-nums;color:#0A84FF;">'+avgP+'</div><div style="font-size:8px;line-height:1.3;color:rgba(93,112,96,.95);">Putts</div></div>'+
      '<div><div style="font-size:14px;font-weight:700;line-height:1.2;font-variant-numeric:tabular-nums;color:#34C759;">'+fwPct+'%</div><div style="font-size:8px;line-height:1.3;color:rgba(93,112,96,.95);">FW-M</div></div>'+
      '<div><div style="font-size:14px;font-weight:700;line-height:1.2;font-variant-numeric:tabular-nums;color:#FF453A;">'+pen+'</div><div style="font-size:8px;line-height:1.3;color:rgba(93,112,96,.95);">Pen</div></div>'+
      '<div><div style="font-size:14px;font-weight:700;line-height:1.2;font-variant-numeric:tabular-nums;color:#FF9F0A;">'+sand+'</div><div style="font-size:8px;line-height:1.3;color:rgba(93,112,96,.95);">Sand</div></div>'+
      '</div></div>'+renderHoles(sc)+'</div></div>';
  }).join('');
  document.getElementById('round-list').innerHTML=html||'<div style="color:rgba(93,112,96,.95);padding:20px;text-align:center;">Keine Runden</div>';
  var rdHasPrev=RD_page>0, rdHasNext=rdStart+10<list.length;
  var rdRangeEnd=Math.min(rdStart+10,list.length);
  document.getElementById('round-list-more').innerHTML = (rdHasPrev||rdHasNext)
    ? '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;">'+
      '<button class="sb" style="flex:1;background:#E9F0E2;" '+(rdHasPrev?'onclick="RD_prev()"':'disabled style="flex:1;background:#E9F0E2;opacity:.4;"')+'>&#8249; Vorherige</button>'+
      '<div style="font-size:10px;color:rgba(93,112,96,.95);white-space:nowrap;">'+(list.length?(rdStart+1):0)+'–'+rdRangeEnd+' von '+list.length+'</div>'+
      '<button class="sb" style="flex:1;background:#E9F0E2;" '+(rdHasNext?'onclick="RD_next()"':'disabled style="flex:1;background:#E9F0E2;opacity:.4;"')+'>Nächste &#8250;</button>'+
    '</div>'
    : '';
}
function RD_next(){ RD_page++; renderRounds(); }
function RD_prev(){ if(RD_page>0){ RD_page--; renderRounds(); } }

function renderHoles(sc){
  var par = sc.par || SC_PAR[sc.half] || SC_PAR.Front;
  var ch = sc.ch!==undefined&&sc.ch!==null ? sc.ch : (SC_CH[sc.half]||32);
  var siArr = sc.si || SC_SI[sc.half] || SC_SI.Front;
  /* chHoles laesst eine 9-Loch-Karte, die aus einer 18-Loch-Runde stammt (siehe
     RT_convertHalf), ihre ECHTE Spielvorgabe/SI im 18-Loch-Kontext behalten, statt sie als
     eigenstaendige 9-Loch-Runde neu zu interpretieren - sonst weicht die Anzeige von der
     amtlichen Out-/In-Aufteilung der Scorekarte ab. */
  var holesTotal = sc.chHoles || 9;
  var h='<div style="display:flex;align-items:flex-start;gap:8px;">';
  var _cols=Math.min(Math.max(sc.scores.length||9,1),9);
  h+='<div style="display:grid;grid-template-columns:repeat('+_cols+',minmax(0,1fr));gap:3px;flex:1;min-width:0;">';
  var stbfSum=0; var grossSum=0; var hasAnyScore=false;
  for(var i=0;i<sc.scores.length;i++){
    var s=sc.scores[i]; var cross=sc.crossed[i];
    var fw=sc.fw[i]; var pen=sc.pen[i]; var sand=sc.sand[i];
    var p=par[i]; var si=siArr[i];
    var cls=SC_scoreClass(s,p);
    if(s!==null) hasAnyScore=true;
    /* Fuer die Schlagzahl unter dem Stbf-Badge zaehlen die gewerteten Schlaege (mit
       Netto-Doppelbogey-Deckel begrenzt). Gestrichene oder noch ungespielte Bahnen werden
       NICHT ausgeschlossen, sondern - wie ueberall sonst in der App (RT_cap, RT_convertHalf) -
       konservativ mit ihrem NDB-Deckel als Platzhalter gezaehlt, nie mit 0 und nie komplett
       ignoriert. */
    var npar=SC_netPar(p,ch,si,holesTotal);
    grossSum+= cross||s===null ? npar+2 : Math.min(s,npar+2);
    var stbfH = cross ? null : SC_stbfHole(s,p,ch,si,holesTotal);
    if(stbfH!==null) stbfSum+=stbfH;
    var bg=cross?'rgba(27,46,32,.07)':pen>0?'rgba(255,69,58,.2)':sand>0?'rgba(255,159,10,.15)':'rgba(27,46,32,.06)';
    var tc=cross?'rgba(100,118,102,.95)':fw==='C'?'#34C759':fw==='R'?'#FF9F0A':fw==='L'?'#FF453A':'#0A84FF';
    var ind=fw==='C'?'&#9711;':fw==='R'?'&#8599;':fw==='L'?'&#8598;':'';
    var disp=s!==null?s:'--';
    var shape='';
    if(cls && !cross){
      var scCol = cls==='eagle'?'#C9980A':cls==='birdie'?'#34C759':cls==='par'?'rgba(50,72,56,.9)':cls==='bogey'?'#FF9F0A':'#FF453A';
      var scBg  = cls==='eagle'?'rgba(255,214,10,.22)':cls==='birdie'?'rgba(52,199,89,.18)':'transparent';
      var brd   = 'none';
      if(cls==='eagle') brd='2px solid '+scCol;
      if(cls==='birdie') brd='1.5px solid '+scCol;
      if(cls==='par') brd='1.5px solid rgba(84,104,88,.9)';
      if(cls==='bogey') brd='1.5px solid '+scCol;
      if(cls==='dbogey') brd='1.5px solid '+scCol;
      var rad = (cls==='bogey'||cls==='dbogey') ? '3px' : '50%';
      var extra = cls==='dbogey' ? 'box-shadow:0 0 0 2px rgba(255,69,58,.35) inset;' : '';
      var stbfLbl = stbfH!==null ? stbfH : '';
      shape='<div style="width:15px;height:15px;margin:1px auto 0;border-radius:'+rad+';border:'+brd+';background:'+scBg+';'+extra+'display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:'+scCol+';">'+stbfLbl+'</div>';
    } else {
      shape='<div style="width:15px;height:15px;margin:1px auto 0;"></div>';
    }
    h+='<div style="min-width:0;background:'+bg+';border-radius:6px;padding:3px 1px;text-align:center;overflow:hidden;">'+
      '<div style="font-size:8px;line-height:1.3;color:rgba(93,112,96,.95);">'+(i+1)+'</div>'+
      '<div style="font-size:6.5px;line-height:1.1;color:rgba(93,112,96,.7);">Par '+p+'</div>'+
      '<div style="font-size:11px;font-weight:700;color:'+tc+';text-decoration:'+(cross?'line-through':'none')+';">'+disp+'</div>'+
      shape+
      '<div style="font-size:8px;line-height:1.3;color:rgba(93,112,96,.95);">'+(ind||'&nbsp;')+'</div>'+
      '</div>';
  }
  h+='</div>';
  if(!hasAnyScore && sc.stbf) stbfSum=sc.stbf;
  h+='<div style="flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:38px;padding:6px 4px;background:rgba(191,90,242,.15);border-radius:8px;">'+
     '<div style="font-size:16px;font-weight:800;color:#BF5AF2;line-height:1;">'+stbfSum+'</div>'+
     '<div style="font-size:7px;color:rgba(84,104,88,.9);margin-top:2px;">Stbf</div>'+
     '<div style="font-size:9px;font-weight:700;color:rgba(84,104,88,.95);margin-top:3px;border-top:1px solid rgba(191,90,242,.3);padding-top:2px;">'+(grossSum||'\u2013')+'</div>'+
     '</div>';
  h+='</div>';
  if(sc.noData) h+='<div style="font-size:9px;color:rgba(93,112,96,.95);margin-top:6px;">Keine Lochdaten verf\u00fcgbar &ndash; nur Rundensumme aus Hole19 bekannt.</div>';
  return h+SC_legend();
}

function SC_legend(){
  var items=[
    {sh:'border-radius:50%;border:2px solid #C9980A;background:rgba(255,214,10,.22);',lbl:'Eagle o. besser'},
    {sh:'border-radius:50%;border:1.5px solid #34C759;background:rgba(52,199,89,.18);',lbl:'Birdie'},
    {sh:'border-radius:50%;border:1.5px solid rgba(84,104,88,.9);background:transparent;',lbl:'Par'},
    {sh:'border-radius:3px;border:1.5px solid #FF9F0A;background:transparent;',lbl:'Bogey'},
    {sh:'border-radius:3px;border:1.5px solid #FF453A;background:transparent;box-shadow:0 0 0 2px rgba(255,69,58,.35) inset;',lbl:'Doppelbogey o. mehr'}
  ];
  /* Zweite Zeile: Bedeutung der TEXTFARBE der grossen Bruttoschlag-Zahl selbst (siehe tc in
     renderHoles) - das ist unabhaengig von der Schalen-/Rahmenfarbe oben und zeigt stattdessen
     das Fairway-Treffer-Ergebnis dieser Bahn (nur bei Par 4/5 erfasst). */
  var colorItems=[
    {col:'#34C759', lbl:'Mitte'},
    {col:'#FF9F0A', lbl:'rechts'},
    {col:'#FF453A', lbl:'links'},
    {col:'#0A84FF', lbl:'nicht erfasst'},
    {col:'rgba(100,118,102,.95)', lbl:'gestrichen'}
  ];
  return '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;padding-top:8px;border-top:1px solid rgba(27,46,32,.07);">'+
    items.map(function(it){
      return '<div style="display:flex;align-items:center;gap:4px;">'+
        '<div style="width:11px;height:11px;'+it.sh+'"></div>'+
        '<span style="font-size:8.5px;color:rgba(84,104,88,.9);">'+it.lbl+'</span></div>';
    }).join('')+'</div>'+
    '<div style="font-size:8px;color:rgba(84,104,88,.75);margin-top:8px;">Farbe der Schlagzahl = Fairway-Treffer:</div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px;">'+
    colorItems.map(function(it){
      return '<div style="display:flex;align-items:center;gap:4px;">'+
        '<span style="font-size:12px;font-weight:800;color:'+it.col+';">1</span>'+
        '<span style="font-size:8.5px;color:rgba(84,104,88,.9);">'+it.lbl+'</span></div>';
    }).join('')+'</div>';
}
document.getElementById('seg-ro').addEventListener('click',function(e){
  var btn=e.target.closest('.sb');
  if(!btn)return;
  document.querySelectorAll('#seg-ro .sb').forEach(function(b){b.classList.remove('on');});
  btn.classList.add('on');
  renderRounds(btn.dataset.v);
  /* Alle Analysen unterhalb (und die KPI-Kacheln oben) auf dieselbe Auswahl anwenden */
  GD_renderKPIs();
  renderPenChart();
  renderFW();
  renderSandChart();
  renderPuttsChart();
  renderMetrics();
  renderPerf();
});


/* ===== RUNDEN-ERFASSUNG ===== */
/* ===== Cloud-Sync (Supabase) ===== */
var SB_URL='https://qzeesflibjxkdorvxqyf.supabase.co', SB_KEY='sb_publishable_vjpHBU2YE30WznFuaDoyWg_fxVmNDbW';
var sb=null, sbUser=null, sbMsg='';
/* Eigentuemer-Zuordnung fuer geteilte Runden: RT_roundOwners bildet Runden-ID auf die
   user_id des Erstellers ab (kommt aus der rounds.user_id-Spalte, nicht aus rd.data selbst -
   siehe sbPull). RT_myPlayerNameByOwner bildet Ersteller-user_id auf den Spielernamen ab,
   unter dem ICH (der eingeladene/verknuepfte Nutzer) in dessen Runden gefuehrt werde (aus
   player_links, wo linked_user_id = meine user_id ist). Beides zusammen ermoeglicht
   RT_myPlayerIndex(), in einer FREMDEN, geteilten Runde den richtigen Spieler-Index (statt
   blind players[0] = den Ersteller) fuer Schlag-Detail/Handicap-Verlauf zu finden - siehe
   RT_convertRound(). Ohne das saehe ein eingeladener Mitspieler in diesen beiden Ansichten
   die Analyse des Einladenden statt seiner eigenen. */
var RT_roundOwners={}, RT_myPlayerNameByOwner={};
function sbReady(){return SB_URL.indexOf('https')===0 && typeof window!=='undefined' && window.supabase;}
var RT_LAST_UID_KEY='golflog_last_uid_v1';
/* Verhindert Konto-Kontamination auf geteilten/wiederverwendeten Geraeten: wird ein ANDERES
   Konto als beim letzten Mal erkannt (z.B. Kontowechsel auf demselben Browser/Geraet), werden
   die lokal gecachten Runden/Plaetze GELOESCHT, bevor der Cloud-Sync laeuft. Ohne das wuerde
   sbPull() alte lokale Daten des vorherigen Kontos als "noch nicht synchronisiert" ansehen und
   sie in das NEUE Konto hochladen - genau das hat dazu gefuehrt, dass ein eingeladener
   Mitspieler weiterhin fremde Runden sah, obwohl das automatische Historien-Seeding bereits
   entfernt war. Ist noch KEIN vorheriges Konto bekannt (erstes Login auf diesem Geraet ueberhaupt),
   wird NICHT geloescht, damit echte, noch nicht synchronisierte lokale Runden weiterhin normal
   ins neue Konto uebernommen werden koennen.
   Wird ZUSAETZLICH beim Abmelden (siehe sbOut) aufgerufen: ohne das blieben die eigenen Runden
   (inkl. laufender Runde und eigenem Handicap) im localStorage stehen und waren im nicht
   angemeldeten Zustand weiterhin sichtbar - lokale Daten sind unabhaengig von der Supabase-
   Session und werden nie automatisch geloescht, nur durch expliziten Aufruf dieser Funktion. */
function RT_clearLocalSyncedData(){
 rtDel(RT_KEY);
 rtDel(RT_ACT);
 rtDel(RT_CUSTOM_KEY);
 rtDel(RT_SIOV_KEY);
 rtDel(RT_NAMEOV_KEY);
 rtDel(RT_ADDROV_KEY);
 rtDel(RT_TEEOV_KEY);
 rtDel(RT_PHOTOOV_KEY);
 rtDel(RT_PLAYERSAV_KEY);
 rtDel(RT_HISTDEL_KEY);
 rtDel(RT_OWNHI_KEY);
 rtDel(RT_REFOV_KEY);
 /* Lernfortschritt beim Konto-Wechsel/Logout lokal leeren, damit kein fremder Stand ins
    naechste Konto mergt (er liegt seit dem Cloud-Sync sicher in learning_progress). */
 rtDel('fp_lrn_xp'); rtDel('fp_lrn_done'); rtDel('fp_lrn_badges');
 rtDel('fp_lrn_exam'); rtDel('fp_lrn_wrong'); rtDel('fp_lrn_streak');
 RT_roundOwners={}; RT_myPlayerNameByOwner={};
 RT_round=null;
 HV_D=[]; SC=[];
}
/* Laedt, unter welchem Spielernamen ICH in FREMDEN (von anderen erstellten) Runden gefuehrt
   werde. Direktabfrage auf player_links statt ueber die RPC get_my_connections(), da diese
   keine owner_id zurueckgibt - genau die wird hier als Schluessel gebraucht, um sie mit
   RT_roundOwners (siehe sbPull) zu verknuepfen. Von der RLS-Policy player_links_select
   (linked_user_id = auth.uid()) gedeckt. */
async function RT_loadMyPlayerNames(){
 RT_myPlayerNameByOwner={};
 if(!sb||!sbUser)return;
 try{
  var r=await sb.from('player_links').select('owner_id,player_name').eq('linked_user_id',sbUser.id);
  if(!r.error){
   var map={};
   r.data.forEach(function(row){ map[row.owner_id]=row.player_name; });
   RT_myPlayerNameByOwner=map;
  }
 }catch(e){}
}
/* Liefert den Index in rd.players, der zum AKTUELL angemeldeten Nutzer gehoert:
   - Eigene Runde (kein bekannter fremder Eigentuemer, oder Eigentuemer = ich selbst, oder
     noch nicht synchronisiert): wie bisher Spieler 0 (der Ersteller).
   - Fremde, geteilte Runde: Name-Abgleich (getrimmt, case-insensitive) gegen den ueber
     player_links hinterlegten eigenen Spielernamen bei diesem Eigentuemer.
   - Kein Treffer (sollte laut RLS nicht vorkommen): -1, die Runde wird dann in Schlag-Detail/
     Handicap-Verlauf uebersprungen statt faelschlich fremde Daten zu zeigen. */
function RT_myPlayerIndex(rd){
 var norm=function(s){ return (s||'').trim().toLowerCase(); };
 /* copiedForPlayer wird beim Kopieren einer geteilten Runde in mein eigenes Konto
    gesetzt (siehe claim_invite/claim_by_email) und hat Vorrang vor der Eigentuemer-Pruefung
    unten: nur weil ICH jetzt Eigentuemer dieser Kopie bin, heisst das nicht, dass ich
    player[0] (der urspruengliche Ersteller) bin. */
 if(rd.copiedForPlayer){
  var cn=norm(rd.copiedForPlayer);
  for(var j=0;j<rd.players.length;j++){ if(norm(rd.players[j].name)===cn) return j; }
 }
 var ownerId=RT_roundOwners[rd.id];
 if(!ownerId||!sbUser||ownerId===sbUser.id) return 0;
 var myName=RT_myPlayerNameByOwner[ownerId];
 if(!myName) return -1;
 var mn=norm(myName);
 for(var i=0;i<rd.players.length;i++){ if(norm(rd.players[i].name)===mn) return i; }
 return -1;
}
/* True, wenn diese Runde von einem ANDEREN Konto erstellt und nur mit mir geteilt wurde
   (RLS gewaehrt mir dafuer ausschliesslich SELECT, siehe rounds_update_own/rounds_delete_own
   in Supabase - dort ist ein UPDATE/DELETE durch mich serverseitig ohnehin ausgeschlossen).
   Wird genutzt, um Bearbeiten/Loeschen/Runde-beenden clientseitig zu verstecken: ohne diese
   Sperre wuerde ein Speicherversuch ueber sbPushRound() (upsert) still und leise eine NEUE,
   eigene Kopie der GESAMTEN Runde (inkl. der Daten aller Mitspieler) unter meinem Konto mit
   der GLEICHEN Runden-ID anlegen - das Original des Einladenden bliebe zwar unveraendert,
   aber es entstuenden doppelte IDs und eine unerwuenschte Datenkopie bei mir. */
function RT_isForeignRound(rd){
 var ownerId=RT_roundOwners[rd.id];
 return !!(ownerId&&sbUser&&ownerId!==sbUser.id);
}
/* Wie RT_isForeignRound, aber zusaetzlich true, wenn die Runde bereits abgeschlossen (done:true)
   ist. Fuer eine noch AKTIVE (done:false) geteilte Runde erlaubt die Datenbank-Policy
   rounds_update_shared_active dem verknuepften Mitspieler ausdruecklich, selbst Schlaege
   einzutragen und die Runde zu beenden (das war der eigentliche Zweck dieser Policy) - erst nach
   dem Abschluss wird sie dauerhaft schreibgeschuetzt. RT_isForeignLocked() ist daher die richtige
   Sperre fuer Bearbeiten/Runde-starten, waehrend RT_isForeignRound() weiterhin fuer Loeschen und
   die Kurzfassungs-Anzeige ("geteilt von") verwendet wird. */
function RT_isForeignLocked(rd){
 return RT_isForeignRound(rd)&&!!rd.done;
}
/* ===== Scoring-Ownership (Stufe 1): bei geteilten (verknuepften) Runden fuehrt genau EIN
   Spieler die Scoringkarte. Nur der aktuelle Scorer schreibt; andere sehen mit (nach Sync)
   und koennen die Uebergabe anfordern. Solo-/unverknuepfte Runden sind unberuehrt - dort ist
   man immer selbst Scorer (RT_amScorer() liefert dann true). Live-Aktualisierung = Stufe 2. */
function RT_scorerId(rd){
 if(!rd) return null;
 /* Standard-Scorer ist der wahre Eigentuemer (aus dem Cloud-Pull) - VOR ownerHint. Sonst
    koennte eine fremde, lokal neu aufgebaute Runde mit falschem ownerHint das eigene Konto
    zum Scorer machen. */
 var owner=(RT_roundOwners&&RT_roundOwners[rd.id])||rd.ownerHint||(sbUser&&sbUser.id)||null;
 if(rd.scorerId){
  if(rd.scorerId===owner) return rd.scorerId;
  if(sbUser&&rd.scorerId===sbUser.id) return rd.scorerId;
  /* Nur der EIGENTUEMER kann verlaesslich pruefen, ob der eingetragene Scorer noch ein
     aktuell verknuepfter Mitspieler ist (nur er hat die player_links). Ist der Scorer verwaist
     - z.B. Konto geloescht oder entknuepft -, faellt die Karte an den Eigentuemer zurueck,
     sonst bliebe die eigene Runde mit einem nicht mehr existierenden Scorer gesperrt.
     Zuschauer/verknuepfte Geraete zeigen den scorerId unveraendert an (kein Fehlurteil). */
  if(sbUser && owner===sbUser.id){
   var valid=false;
   if(rd.players&&typeof PL_statusFor==='function'){ for(var i=0;i<rd.players.length;i++){ var st=PL_statusFor(rd.players[i].name); if(st&&st.linked_user_id&&st.linked_user_id===rd.scorerId){ valid=true; break; } } }
   return valid?rd.scorerId:owner;
  }
  return rd.scorerId;
 }
 return owner;
}
/* Fremde (geteilte) Runde fortsetzen, OHNE sie ueber den Bearbeiten-Pfad (RT_applyEdit) neu
   aufzubauen: das echte Rundenobjekt (mit scorerId/ownerHint des Eigentuemers und aktuellem
   Loch) wird direkt geoeffnet. So bleibt der Scoring-Gate korrekt - der Mitspieler sieht nur
   mit und kann erst nach einer Uebergabe selbst eintragen. */
function RT_resumeShared(id){
 var saved=rtGet(RT_KEY)||[]; var rd=null;
 for(var i=0;i<saved.length;i++){ if(saved[i].id===id){ rd=saved[i]; break; } }
 if(!rd) return;
 RT_round=rd;
 RT_editingExisting=false;
 RT_state.saveWarn='';
 try{ rtSet(RT_ACT,rd); }catch(e){}
 RT_go('play');
}
function RT_roundIsShared(rd){
 if(!rd) return false;
 if(RT_isForeignRound(rd)) return true;
 /* Auch beim Eigentuemer als geteilt behandeln, sobald die Runde JEMALS geteilt wurde
    (E-Mail-Einladung raus, verknuepfter Mitspieler oder Live-Einladung). Ohne diese breitere
    Erkennung abonnierte der Owner den Live-Kanal nicht und der Mitspieler sah Eingaben erst
    nach Neuladen. */
 if(rd.invitesSentTo && rd.invitesSentTo.length) return true;
 if(rd.players&&rd.players.length>1&&typeof PL_statusFor==='function'){
  return rd.players.some(function(pp){ if(pp&&pp.liveInvite) return true; var st=PL_statusFor(pp.name); return !!(st&&(st.linked_user_id||st.invite_email||st.invite_code)); });
 }
 return false;
}
function RT_amScorer(rd){
 if(!rd) return true;
 if(!RT_roundIsShared(rd)) return true;
 if(!sbUser) return true;
 return RT_scorerId(rd)===sbUser.id;
}
function RT_scorerName(rd){
 var sid=RT_scorerId(rd);
 if(sbUser&&sid===sbUser.id) return 'Du';
 if(rd&&rd.players){
  for(var i=0;i<rd.players.length;i++){ var st=(typeof PL_statusFor==='function')?PL_statusFor(rd.players[i].name):null; if(st&&st.linked_user_id===sid) return rd.players[i].name; }
  if(RT_isForeignRound(rd)&&rd.players[0]) return rd.players[0].name;
 }
 return 'ein Mitspieler';
}
function RT_scorerBlock(){
 RT_state.saveWarn=RT_scorerName(RT_round)+' f\u00fchrt gerade die Scoringkarte. Fordere die \u00dcbergabe an, um selbst zu scoren.';
 RT_render();
}
/* ===== Eigene-Karten-Modus (Item 6): in einer geteilten Runde kann jeder Spieler auf seinem
   eigenen Geraet ausschliesslich seine EIGENE Scorecard fuehren und bei Mitspielern nichts
   aendern. Alles unten ist strikt hinter rd.ownCards gekapselt - ohne dieses Flag bleibt der
   bisherige gemeinsame Scoring-Pfad voellig unberuehrt. */
function RT_canEditPlayer(rd,pi){
 if(!rd) return true;
 if(rd.v2){ if(!sbUser) return false; return RT_v2ScorerFor(rd,pi)===sbUser.id; }
 if(rd.ownCards && RT_roundIsShared(rd)){
  if(!sbUser) return true;
  return pi===RT_myPlayerIndex(rd);
 }
 return RT_amScorer(rd);
}
function RT_editBlock(rd){
 if(rd && rd.v2){ RT_state.saveWarn='Diese Karte wird von einem anderen Konto geführt – du siehst live mit. Über „Karte übernehmen" kannst du sie übernehmen, falls das Gerät nicht erreichbar ist.'; RT_render(); return; }
 if(rd && rd.ownCards){
  RT_state.saveWarn='Eigene-Karten-Modus: Du kannst nur deine eigene Scorecard bearbeiten.';
  RT_render();
  return;
 }
 RT_scorerBlock();
}
function RT_uidToPi(rd,uid){
 if(!rd||!uid) return -1;
 var owner=(RT_roundOwners&&RT_roundOwners[rd.id])||rd.ownerHint||null;
 if(owner&&uid===owner) return 0;
 if(rd.players&&typeof PL_statusFor==='function'){
  for(var i=0;i<rd.players.length;i++){ var st=PL_statusFor(rd.players[i].name); if(st&&st.linked_user_id&&st.linked_user_id===uid) return i; }
 }
 return -1;
}
function RT_suOwnCards(v){ if(RT_su){ RT_su.ownCards=!!v; RT_render(); } }
function RT_handoffScoring(uid){
 var rd=RT_round; if(!rd||!RT_amScorer(rd)||!uid) return;
 rd.scorerId=uid;
 RT_pendingHandoff=null;
 rtSet(RT_ACT,rd); RT_syncActiveToSaved();
 try{ sbPushCanonical(rd); }catch(e){}
 if(RT_RT.ch){ try{ RT_RT.ch.send({type:'broadcast',event:'state',payload:{data:rd}}); }catch(e){} }
 RT_render();
}
function RT_requestScoring(){
 if(RT_round&&RT_amScorer(RT_round)) return;
 try{ RT_rtSync(); }catch(e){}
 var who=RT_scorerName(RT_round);
 if(RT_RT.ch&&sbUser){
  try{ RT_RT.ch.send({type:'broadcast',event:'request',payload:{name:(typeof RT_myDisplayName==='function'?RT_myDisplayName():'Ein Mitspieler'),uid:sbUser.id}}); }catch(e){}
  RT_toast('Anfrage an '+who+' gesendet. Sobald '+who+' zustimmt, kannst du selbst scoren \u2013 der aktuelle Scorer muss die Runde ge\u00f6ffnet haben.');
  return;
 }
 RT_toast('Live-Verbindung noch nicht bereit \u2013 kurz warten und erneut tippen. Der aktuelle Scorer muss die Runde ge\u00f6ffnet haben.');
}
function RT_handoffMenu(){
 var rd=RT_round; if(!rd||!RT_amScorer(rd)) return;
 var opts=[];
 if(rd.players){ rd.players.forEach(function(pp){ var st=(typeof PL_statusFor==='function')?PL_statusFor(pp.name):null; if(st&&st.linked_user_id&&st.linked_user_id!==(sbUser&&sbUser.id)) opts.push({name:pp.name,uid:st.linked_user_id}); }); }
 /* Bin ich selbst ein eingeladener Scorer (fremde Runde), taucht der Eigentuemer nicht in
    MEINEN player_links auf - er waere sonst kein Uebergabe-Ziel und die Karte liesse sich nicht
    zurueckgeben. Eigentuemer (aus RT_roundOwners) daher explizit als erstes Ziel anbieten. */
 var _own=RT_roundOwners[rd.id];
 if(_own && sbUser && _own!==sbUser.id && !opts.some(function(o){ return o.uid===_own; })){
  var _on=(rd.players&&rd.players[0]&&rd.players[0].name)||'Eigent\u00fcmer';
  opts.unshift({name:_on,uid:_own});
 }
 if(!opts.length){ RT_state.saveWarn='Noch kein verkn\u00fcpfter Mitspieler zum \u00dcbergeben. Lade zuerst jemanden per E-Mail ein.'; RT_render(); return; }
 var ex=document.getElementById('rt-handoff'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var ov=document.createElement('div'); ov.id='rt-handoff';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,20,12,.42);display:flex;align-items:flex-end;justify-content:center;';
 var btns=opts.map(function(o){ return '<button class="rt-ho-opt" data-uid="'+rtEsc(o.uid)+'" style="width:100%;padding:12px;border-radius:11px;border:1px solid #DCE7D4;background:#F1F6EC;color:#143522;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;margin-bottom:8px;">Scoring an '+rtEsc(o.name)+' \u00fcbergeben</button>'; }).join('');
 ov.innerHTML='<div style="background:#fff;border-radius:18px 18px 0 0;max-width:480px;width:100%;padding:16px 16px calc(env(safe-area-inset-bottom,0px) + 16px);box-shadow:0 -8px 32px rgba(0,0,0,.28);font-family:Inter,-apple-system,sans-serif;"><div style="font-size:13px;color:#8A9C8E;font-weight:700;margin-bottom:12px;">Scoringkarte \u00fcbergeben</div>'+btns+'<button id="rt-ho-cancel" style="width:100%;padding:11px;border-radius:11px;border:1px solid #DCE7D4;background:#fff;color:#3C5546;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;">Abbrechen</button></div>';
 document.body.appendChild(ov);
 function close(){ if(ov&&ov.parentNode) ov.parentNode.removeChild(ov); }
 ov.addEventListener('click',function(e){ if(e.target===ov) close(); });
 document.getElementById('rt-ho-cancel').onclick=close;
 Array.prototype.forEach.call(ov.querySelectorAll('.rt-ho-opt'),function(b){ b.onclick=function(){ var uid=b.dataset.uid; close(); RT_pageConfirm('Scoringkarte \u00fcbergeben? Danach tr\u00e4gt der andere Spieler ein, du siehst nur mit.', function(){ RT_handoffScoring(uid); }, '\u00dcbergeben', '#1F8A4D'); }; });
}
/* Einladung im Runden-Setup: neuen/vorhandenen Mitspieler VOR dem Spiel per E-Mail einladen und
   verknuepfen (nutzt dieselbe PL_-Mechanik wie die Konto-Seite). */
/* ===== Live-Scoring Stufe 2: Supabase Realtime BROADCAST (ephemer, KEINE DB-/RLS-Aenderung).
   Der aktuelle Scorer sendet nach jeder Eingabe den Rundenstand ueber einen Kanal
   'fp-round-<id>'; Zuschauer ziehen live mit. Uebergabe und Anforderung laufen ueber denselben
   Kanal. Faellt der Kanal aus, bleibt der pull-basierte Sync (Stufe 1) als Fallback. ===== */
var RT_RT={ch:null,id:null};
var RT_pendingHandoff=null;
/* Kurzer, gut sichtbarer Hinweis unten mittig - fuer Live-Aktionen wie die Scoring-Anfrage,
   deren bisherige Rueckmeldung ganz unten auf der langen Spielseite unbemerkt blieb. */
function RT_toast(msg){
 var ex=document.getElementById('rt-toast'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var d=document.createElement('div'); d.id='rt-toast';
 d.style.cssText='position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 88px);transform:translateX(-50%);z-index:100000;max-width:88vw;background:#143522;color:#fff;font-family:Inter,-apple-system,sans-serif;font-size:13px;line-height:1.4;padding:12px 16px;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.35);text-align:center;';
 d.textContent=msg;
 document.body.appendChild(d);
 setTimeout(function(){ if(d&&d.parentNode) d.parentNode.removeChild(d); },5600);
}
function RT_dismissHandoff(){ RT_pendingHandoff=null; try{ RT_render(); }catch(e){} }
/* Der EIGENTUEMER der Runde kann die Scoringkarte jederzeit zurueckholen - auch ohne Zustimmung
   des aktuellen Scorers. Verhindert ein Aussperren, wenn nach einer Uebergabe der Mitspieler
   offline geht. Nur der echte Eigentuemer (RT_roundOwners) darf das. */
function RT_reclaimScoring(){
 var rd=RT_round; if(!rd||!sbUser) return;
 if(!(RT_roundOwners[rd.id]&&RT_roundOwners[rd.id]===sbUser.id)) return;
 rd.scorerId=sbUser.id;
 RT_pendingHandoff=null;
 rtSet(RT_ACT,rd); RT_syncActiveToSaved();
 try{ sbPushCanonical(rd); }catch(e){}
 if(RT_RT.ch){ try{ RT_RT.ch.send({type:'broadcast',event:'state',payload:{data:rd}}); }catch(e){} }
 RT_render();
}
function RT_rtWantId(){
 var rd=RT_round;
 return (rd&&!rd.v2&&!rd.done&&sb&&sbUser&&RT_state.screen==='play'&&RT_roundIsShared(rd))?rd.id:null;
}
function RT_rtSync(){
 var want=RT_rtWantId();
 if(RT_RT.id===want) return;
 if(RT_RT.ch){ try{ sb.removeChannel(RT_RT.ch); }catch(e){} RT_RT.ch=null; }
 RT_RT.id=want;
 if(!want) return;
 try{
  var ch=sb.channel('fp-round-'+want,{config:{broadcast:{self:false}}});
  ch.on('broadcast',{event:'state'},function(m){ RT_rtOnState(m&&m.payload); });
  ch.on('broadcast',{event:'request'},function(m){ RT_rtOnRequest(m&&m.payload); });
  ch.subscribe();
  RT_RT.ch=ch;
 }catch(e){ RT_RT.ch=null; RT_RT.id=null; }
}
function RT_rtBroadcastState(){
 if(RT_RT.ch&&RT_round&&RT_RT.id===RT_round.id){
  var _ok=RT_round.ownCards?RT_roundIsShared(RT_round):RT_amScorer(RT_round);
  if(_ok){ try{ RT_RT.ch.send({type:'broadcast',event:'state',payload:{data:RT_round,uid:(sbUser&&sbUser.id)||null}}); }catch(e){} }
 }
}
function RT_rtApplyState(nd,senderUid){
 if(!nd||!nd.id) return;
 if(RT_round&&RT_round.v2) return; /* v2 nutzt round_scores; alten Vollstand nie anwenden */
 if(RT_round && RT_round.id===nd.id && RT_round.ownCards && senderUid){
  var _spi=RT_uidToPi(RT_round,senderUid), _mi=RT_myPlayerIndex(RT_round);
  if(_spi>=0 && _spi!==_mi && nd.players && nd.players[_spi] && RT_round.players[_spi]){
   RT_round.players[_spi]=nd.players[_spi];
   try{ rtSet(RT_ACT,RT_round); }catch(e){}
   var _sv=rtGet(RT_KEY)||[];
   for(var _i=0;_i<_sv.length;_i++){ if(_sv[_i].id===RT_round.id){ _sv[_i]=RT_round; break; } }
   rtSet(RT_KEY,_sv);
   RT_render();
  }
  return;
 }
 /* Zuschauer (nicht der aktuelle Scorer) darf eigenstaendig durch die Loecher blaettern:
    seinen lokal betrachteten Loch-Index (cur) behalten, statt bei jedem Broadcast/Poll auf das
    Loch des Scorers gezogen zu werden. Nur die Score-Daten werden uebernommen. */
 try{
  if(RT_round && RT_round.id===nd.id && typeof RT_amScorer==='function' && !RT_amScorer(nd)){
   var _kc=RT_round.cur, _cnt=nd.cnt||(nd.par?nd.par.length:0)||999;
   if(typeof _kc==='number' && _kc>=0 && _kc<_cnt) nd.cur=_kc;
  }
 }catch(e){}
 var saved=rtGet(RT_KEY)||[]; var found=false;
 for(var i=0;i<saved.length;i++){ if(saved[i].id===nd.id){ saved[i]=nd; found=true; break; } }
 if(!found) saved.push(nd);
 rtSet(RT_KEY,saved);
 if(RT_round&&RT_round.id===nd.id){ RT_round=nd; try{ rtSet(RT_ACT,RT_round); }catch(e){} }
 RT_render();
}
function RT_rtOnState(payload){
 var nd=payload&&payload.data; var rd=RT_round;
 if(!nd||!rd||rd.id!==nd.id) return;
 RT_rtApplyState(nd,payload&&payload.uid);
 /* Finaler (beendeter) Stand: eigene, eigenstaendige Kopie in der Cloud sichern, damit die
    fertige Runde dauerhaft auch bei MIR vorliegt - unabhaengig vom anderen Spieler. Spaetere
    Aenderungen bleiben danach isoliert (kein Live-Kanal mehr bei done:true). */
 if(nd.done && sb && sbUser && !rd.ownCards){ try{ sbPushRound(nd); }catch(e){} }
}
function RT_rtOnRequest(payload){
 var rd=RT_round; if(!rd||!RT_amScorer(rd)) return;
 var nm=(payload&&payload.name)||'Ein Mitspieler';
 if(payload&&payload.uid) RT_pendingHandoff={name:nm,uid:payload.uid,ts:Date.now()};
 try{ RT_render(); }catch(e){}
 RT_pageConfirm(rtEsc(nm)+' m\u00f6chte die Scoringkarte \u00fcbernehmen. \u00dcbergeben?', function(){
  if(payload&&payload.uid) RT_handoffScoring(payload.uid);
 }, '\u00dcbergeben', '#1F8A4D');
}
function RT_setupInviteHtml(name){
 if(!sbUser||(typeof RT_isSelfName==='function'&&RT_isSelfName(name))) return '';
 var st=(typeof PL_statusFor==='function')?PL_statusFor(name):null;
 var linked=st&&st.linked_user_id;
 if(linked){
  var pp=(RT_su&&RT_su.players)?RT_su.players.filter(function(x){return x.name===name;})[0]:null;
  var on=!!(pp&&pp.liveInvite);
  var lh='<div style="margin-top:8px;font-size:11.5px;color:#187040;font-weight:700;">\u2713 verkn\u00fcpft</div>';
  if(on){
   lh+='<div style="margin-top:4px;font-size:11.5px;color:#187040;font-weight:700;">\ud83d\udcf2 Live-Einladung aktiv \u2013 Link geht beim Start der Runde raus. <a href="#" onclick="RT_toggleLiveInvite(\''+rtJsEsc(name)+'\');return false;" style="color:#8A9C8E;font-weight:600;">abbrechen</a></div>';
  }else{
   lh+='<button class="rt-btn3" style="color:#1F8A4D;font-weight:700;padding:4px 0;font-size:12px;" onclick="RT_toggleLiveInvite(\''+rtJsEsc(name)+'\')">\ud83d\udcf2 Zur Live-Runde einladen</button>';
   lh+='<div style="font-size:11px;color:#8A9C8E;margin-top:2px;">Ohne Einladung wird '+rtEsc(name)+' nur gewertet \u2013 die Ergebnisse sieht sie/er erst beim Beenden der Runde.</div>';
  }
  return lh;
 }
 var emailMode=RT_state.plEmailFor===name;
 var h='<div style="margin-top:8px;">';
 h+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px;">'+'<button class="rt-btn2" style="flex:none;width:auto;margin:0;padding:8px 12px;font-size:12px;" onclick="PL_share(\''+rtJsEsc(name)+'\')">\ud83d\udcf2 Link teilen</button>'+'<button class="rt-btn3" style="flex:none;padding:8px 10px;font-size:12px;" onclick="PL_qr(\''+rtJsEsc(name)+'\')">QR</button>'+'</div>';
 if(RT_state.qrFor===name){ h+=RT_qrBoxHtml(name); }
 if(st&&st.invite_email){ h+='<div style="font-size:11.5px;color:#187040;font-weight:700;margin-bottom:4px;">✉️ Eingeladen: '+rtEsc(st.invite_email)+' – bekommt beim Start den Link</div>'; }
 h+='<button class="rt-btn3" style="color:#1F8A4D;font-weight:700;padding:4px 0;font-size:12px;" onclick="PL_showEmail(\''+rtJsEsc(name)+'\')">'+(emailMode?'Abbrechen':(st?'E-Mail ändern':'\u2709\ufe0f Einladen (E-Mail + Live-Zugriff)'))+'</button>';
 if(emailMode){
  h+='<div style="display:flex;gap:8px;align-items:center;margin-top:6px;">'
   +'<input class="rt-inp" id="'+PL_domId(name)+'" type="email" value="'+rtEsc((st&&st.invite_email)||'')+'" placeholder="E-Mail von '+rtEsc(name)+'" style="flex:1;margin:0;">'
   +'<button class="rt-btn" style="flex:none;width:auto;padding:10px 14px;margin:0;" onclick="PL_sendInvite(\''+rtJsEsc(name)+'\')">Einladen</button></div>';
  if(PL_msg) h+='<div class="rt-warn" style="margin-top:6px;margin-bottom:0;font-size:11px;">'+rtEsc(PL_msg)+'</div>';
 }else if(!st||!st.invite_email){ h+='<div style="font-size:11px;color:#8A9C8E;margin-top:2px;">Ohne Einladung wird '+rtEsc(name)+' nur gewertet (kein Zugriff, keine E-Mail).</div>'; }
 h+='</div>';
 return h;
}
function sbInit(){
 if(!sbReady())return;
 sb=window.supabase.createClient(SB_URL,SB_KEY);
 sb.auth.onAuthStateChange(function(ev,session){
  sbUser=session?session.user:null;
   if(ev==='PASSWORD_RECOVERY'){ RT_render(); try{ AG_recoveryPrompt(); }catch(e){} return; }
  if(sbUser){
   /* TOKEN_REFRESHED feuert automatisch alle ca. 50-60 Minuten im Hintergrund (z.B. waehrend
      einer laufenden Runde auf dem Platz), ohne dass sich der Nutzer neu anmeldet. Ein voller
      sbPull() dabei ist unnoetig und riskant (ueberschreibt RT_KEY mit dem zuletzt bekannten
      Cloud-Stand, waehrend lokal evtl. gerade eine aktive Runde bearbeitet wird, deren neuester
      Klick fuer diese Bahn noch nicht per RT_autosaveHole hochgeladen wurde). Nur bei echtem
      An-/Abmelden bzw. initialer Session-Wiederherstellung neu synchronisieren. */
   if(ev==='TOKEN_REFRESHED'||ev==='USER_UPDATED'){ RT_render(); return; }
   var lastUid=null; try{ lastUid=localStorage.getItem(RT_LAST_UID_KEY); }catch(e){}
   if(lastUid&&lastUid!==sbUser.id){ RT_clearLocalSyncedData(); }
   var firstEverLogin=!lastUid;
   try{ localStorage.setItem(RT_LAST_UID_KEY,sbUser.id); }catch(e){}
   sbPull(firstEverLogin); PL_load().then(RT_render); RT_loadConnections(); if(AG_joinCode) AG_claim(); AG_claimByEmail(); RT_LRN_cloudPull(); RT_bagCloudPull(); RT_loadEntitlement();
   if(firstEverLogin){ setTimeout(function(){ try{ RT_onbMaybeShow(); }catch(e){} }, 1200); }
   try{ var _dn=sbUser.user_metadata&&sbUser.user_metadata.display_name; if(!_dn||!(''+_dn).trim()){ AG_needName=true; setTimeout(function(){ try{ AG_namePrompt(); }catch(e){} },0); } }catch(e){}
  }
  else RT_render();
  AG_render();
 });
}
async function sbAuth(mode){
 var em=document.getElementById('sb-em').value.trim();
 var pw=document.getElementById('sb-pw').value;
 if(!em||pw.length<6){sbMsg='E-Mail und Passwort (mind. 6 Zeichen) eingeben.';RT_render();return;}
 sbMsg='';
 try{
  var r=(mode==='up')?await sb.auth.signUp({email:em,password:pw})
                     :await sb.auth.signInWithPassword({email:em,password:pw});
  if(r.error)throw r.error;
  if(mode==='up'&&!r.data.session)sbMsg='Registriert \u2013 bitte Best\u00e4tigungslink in der E-Mail \u00f6ffnen, dann anmelden.';
 }catch(e){sbMsg='Anmeldung fehlgeschlagen: '+rtEsc(e.message||e);}
 RT_render();
}
/* Vor dem eigentlichen Abmelden wird versucht, alle lokal vorhandenen, noch NICHT in der
   Cloud vorhandenen Runden ein letztes Mal hochzuladen. Grund: RT_clearLocalSyncedData()
   loescht danach kompromisslos den lokalen Stand - schlaegt der Cloud-Push vorher fehl (z.B.
   durch einen transienten Sync-Fehler wie "JWT issued at future"), waren bis zu diesem Fix
   noch nicht synchronisierte Runden unwiederbringlich verloren, sobald sich der Nutzer
   abmeldete. Jetzt wird das Abmelden bei einem Fehlschlag gestoppt (RT_state.ask=
   'logout_unsynced') und der Nutzer kann erneut versuchen oder bewusst trotzdem abmelden
   (sbOutForce), statt die Daten kommentarlos zu verlieren. */
async function sbOut(){
 RT_state.logoutErr='';
 if(sb&&sbUser){
  RT_state.logoutBusy=true; RT_render();
  try{
   var r=await sb.from('rounds').select('data');
   if(r.error)throw r.error;
   var ids={}; r.data.forEach(function(x){ if(x.data&&x.data.id) ids[x.data.id]=1; });
   var unsynced=(rtGet(RT_KEY)||[]).filter(function(x){
    return !ids[x.id] && (!x.ownerHint||x.ownerHint===sbUser.id);
   });
   for(var i=0;i<unsynced.length;i++){
    var rd=unsynced[i];
    var pr=await sb.from('rounds').upsert({id:rd.id,date:rd.date,course_name:rd.courseName,data:rd});
    if(pr.error) throw pr.error;
   }
  }catch(e){
   RT_state.logoutBusy=false;
   RT_state.ask='logout_unsynced';
   RT_state.logoutErr=(e&&e.message)||String(e);
   RT_render();
   return;
  }
  RT_state.logoutBusy=false;
 }
 await sbOutForce();
}
async function sbOutForce(){
 RT_state.ask='';
 try{await sb.auth.signOut();}catch(e){}
 sbUser=null;
 RT_clearLocalSyncedData();
 try{ localStorage.removeItem(RT_LAST_UID_KEY); localStorage.removeItem(AG_KEY); }catch(e){}
 RT_state.screen='home';
 RT_render();
 AG_render();
}
async function sbPull(firstEverLogin){
 try{
  var r=await sb.from('rounds').select('data,user_id').order('date',{ascending:true});
  if(r.error)throw r.error;
  var cloud=r.data.map(function(x){return x.data;});
  var owners={};
  r.data.forEach(function(x){ if(x.data&&x.data.id) owners[x.data.id]=x.user_id; });
  RT_roundOwners=owners;
  /* Vom Mitspieler verlassene geteilte Runden nicht erneut aus der Cloud einblenden:
     der DB-Server teilt sie weiter (RLS SELECT), lokal bleiben sie aber ausgeblendet, bis
     ein neuer Einladungslink sie wieder oeffnet. Nur FREMDE Runden filtern, eigene nie. */
  var _leftSet={}; (rtGet('golflog_left_rounds_v1')||[]).forEach(function(_id){ _leftSet[_id]=1; });
  cloud=cloud.filter(function(x){ return !(x && _leftSet[x.id] && owners[x.id] && owners[x.id]!==sbUser.id); });
  await RT_loadMyPlayerNames();
  /* Bulletproof-Kopie fuer gemeinsames Scoring: Jede BEENDETE, mit mir GETEILTE Runde (der
     DB-Server gibt sie ueber player_links frei, also bin ich verifizierter Mitspieler) einmalig
     als eigene, eigenstaendige Zeile sichern. So liegt jede fertige gemeinsame Runde dauerhaft
     auch bei MIR vor - selbst wenn ich beim Beenden offline/abwesend war - und ab dem Moment,
     wo ich eine eigene Kopie habe, sehe ich nur noch meine Zeile (rounds_select_shared greift
     nicht mehr): spaetere Aenderungen des anderen an SEINER Kopie erreichen mich nicht, und
     Loeschen bleibt beidseitig unabhaengig. Nur DONE-Runden - laufende bleiben live geteilt. */
  cloud.forEach(function(x){
   if(x && x.done && owners[x.id] && owners[x.id]!==sbUser.id){
    try{ if(typeof RT_myPlayerIndex!=='function' || RT_myPlayerIndex(x)>=0) sbPushRound(x); }catch(e){}
   }
  });
  var ids={}; cloud.forEach(function(x){ids[x.id]=1;});
  /* KRITISCH: hier NICHT blind jede lokal gecachte, dem eigenen Cloud-Stand unbekannte Runde
     als "meine, noch nicht synchronisierte" Runde behandeln und hochladen - genau das hat zu
     einem echten Datenleck gefuehrt (siehe Vorfall vom 30.07.2026: 31 fremde Runden landeten
     durch genau diesen Mechanismus als Duplikate im Konto eines eingeladenen Nutzers, dessen
     Geraet/Browser zuvor fuer ein anderes Konto genutzt wurde). Nur Runden pushen, die
     PROVABLY mir gehoeren: entweder per ownerHint (wird seit diesem Fix bei jeder lokalen
     Erstellung/Bearbeitung gesetzt, siehe RT_start/RT_applyEdit) klar mir zugeordnet, oder -
     falls kein ownerHint vorhanden (Altdaten von vor diesem Fix, oder echter Gastmodus) - nur
     beim allerersten Login auf diesem Geraet ueberhaupt (kein vorher bekanntes anderes Konto),
     damit legitime, offline im Gastmodus erfasste Runden weiterhin normal uebernommen werden
     koennen, ohne dass sich fremde Altdaten einschleichen. Alles andere wird beim Zusammenfuehren
     stillschweigend verworfen statt hochgeladen. */
  var extra=(rtGet(RT_KEY)||[]).filter(function(x){
   if(ids[x.id]) return false;
   if(x.ownerHint) return x.ownerHint===sbUser.id;
   return !!firstEverLogin;
  });
  extra.forEach(function(x){ if(!x.ownerHint) x.ownerHint=sbUser.id; sbPushRound(x); });
  rtSet(RT_KEY,cloud.concat(extra));
  var cr=await sb.from('courses').select('id,data,user_id');
  if(!cr.error&&cr.data.length){
   var allCustom=RT_loadCustomCourses();
   /* Preset-Keys (georg/waldhof) werden seit diesem Fix ebenfalls in die Cloud
      gepusht (siehe RT_setPhoto/RT_persistSi/RT_persistTees/RT_renameCourse/RT_renameAddress),
      damit Aenderungen daran nicht mehr beim Abmelden verloren gehen. Sie duerfen aber NICHT
      zusaetzlich in RT_CUSTOM_KEY landen - das wuerde in RT_platzChips() zu einem doppelten
      Chip fuehren (einmal aus der festen Preset-Liste, einmal aus den "eigenen" Plaetzen). */
   /* Seit der Policy courses_select_linked sehen verknuepfte Accounts (player_links)
      auch die Plaetze des Owners. Dadurch koennen ZWEI Zeilen mit derselben id
      ankommen: die eigene und die fremde. Ohne Priorisierung entscheidet die
      Rueckgabereihenfolge der Datenbank, welche Fassung im Client landet - die eigene,
      gerade bearbeitete Version koennte dabei von der fremden ueberschrieben werden.
      Deshalb erst die fremden anwenden, die eigenen zuletzt (Array.sort ist stabil). */
   var rowsC=cr.data.slice().sort(function(a,b){
    var ao=(sbUser&&a.user_id===sbUser.id)?1:0, bo=(sbUser&&b.user_id===sbUser.id)?1:0;
    return ao-bo;
   });
   rowsC.forEach(function(row){
    if(row.id==='cust')return;
    RT_COURSES[row.id]=row.data;
    if(!RT_PRESET_KEYS[row.id]) allCustom[row.id]=row.data;
   });
   rtSet(RT_CUSTOM_KEY,allCustom);
   /* Lokal eingetragene SI-Werte sind immer die aktuellste Wahrheit (Nutzer hat sie gerade auf
      DIESEM Geraet eingetragen) - nach dem Cloud-Pull erneut ueber die Platzdaten legen, damit
      ein veralteter/unvollstaendiger Cloud-Stand sie nicht wieder ueberschreibt. */
   RT_applySiOverrides();
   RT_applyParOverrides();
   RT_applyKnownAddresses();
   RT_applyNameOverrides();
   RT_applyAddrOverrides();
   RT_applyTeeOverrides();
   RT_applyTeeOrderOverrides();
   RT_applyPhotoOverrides();
   RT_applyRefOverrides();
  }
  /* HV_D/SC nach jedem Cloud-Pull neu aus dem jetzt korrekt gefuellten RT_roundOwners/
     RT_myPlayerNameByOwner aufbauen - und falls der Nutzer gerade den HI-Verlauf oder das
     Schlag-Detail geoeffnet hat, diesen Tab sofort neu rendern. Ohne das blieben Werte aus
     geteilten Runden, die noch VOR Abschluss dieses Pulls (also mit leerer
     RT_roundOwners-Zuordnung) berechnet wurden, faelschlich auf Spieler 0 (den Ersteller)
     stehen, bis der Nutzer manuell den Tab wechselt - siehe RT_myPlayerIndex(). */
  RT_hydrateHistoricalData();
  if(RT_curTab==='hi'||RT_curTab==='detail'){ showTab(RT_curTab); }
 }catch(e){sbMsg='Sync-Fehler: '+rtEsc(e.message||e);}
 RT_render();
 try{ RT_tryOpenPendingRound(); }catch(e){}
}
async function sbPushRound(rd){
 if(!sb||!sbUser)return;
 try{
  var r=await sb.from('rounds').upsert({id:rd.id,date:rd.date,course_name:rd.courseName,data:rd});
  if(r.error)throw r.error;
 }catch(e){sbMsg='Cloud-Speichern fehlgeschlagen: '+rtEsc(e.message||e);RT_render();}
}
/* Kanonisches Schreiben einer GETEILTEN Runde: der aktuelle Scorer schreibt IMMER in die EINE
   Eigentuemer-Zeile - keine Dubletten, alle lesen/schreiben dieselbe Wahrheit. Bin ich der
   Eigentuemer -> normaler Upsert meiner Zeile. Bin ich ein verknuepfter Mitspieler (nach
   Uebergabe) -> plain UPDATE der Eigentuemer-Zeile (RLS rounds_update_shared_active erlaubt das
   bei aktiver Runde inkl. Beenden; ein Upsert wuerde an der INSERT-Policy scheitern bzw. eine
   eigene Dublette anlegen). Weiches Fehlschlagen: der Live-Broadcast traegt den Stand ohnehin. */
async function sbPushCanonical(rd){
 if(!sb||!sbUser||!rd) return;
 var owner=RT_roundOwners[rd.id];
 var mine=(!owner||owner===sbUser.id);
 try{
  if(mine){
   var r=await sb.from('rounds').upsert({id:rd.id,date:rd.date,course_name:rd.courseName,data:rd});
   if(r.error) throw r.error;
  }else{
   var r2=await sb.from('rounds').update({date:rd.date,course_name:rd.courseName,data:rd}).eq('id',rd.id).eq('user_id',owner);
   if(r2.error) throw r2.error;
  }
 }catch(e){}
}
async function sbDelRound(id){if(!sb||!sbUser)return;try{await sb.from('rounds').delete().eq('id',id);}catch(e){}}
async function sbDelCourse(id){if(!sb||!sbUser)return;try{await sb.from('courses').delete().eq('id',id);}catch(e){}}
async function sbPushCourse(id,courseObj){
 if(!sb||!sbUser||!id||!courseObj)return;
 try{
  var r=await sb.from('courses').upsert({id:id,user_id:sbUser.id,name:courseObj.name,data:courseObj},{onConflict:'id,user_id'});
  if(r.error)throw r.error;
 }catch(e){
  RT_state.saveWarn='Cloud-Speichern (Platzdaten) fehlgeschlagen: '+(e.message||e)+' \u2013 lokal gespeichert, bitte Verbindung pr\u00fcfen und erneut versuchen.';
  RT_render();
 }
}
/* ===== Auth-Gate: eigene Anmeldeseite + Mitspieler-Einladungen ===== */
var AG_KEY='golflog_guest_v1';
var AG_PENDING_JOIN_KEY='golflog_pending_join_v1';
var AG_PENDING_ROUND_KEY='golflog_pending_round_v1', AG_pendingRound=null;
var AG_joinCode=null;
/* Der Einladungscode wird zusaetzlich dauerhaft (localStorage) gemerkt, nicht nur im
   JS-Speicher. Grund: verlangt Supabase eine E-Mail-Bestaetigung bei der Registrierung,
   ist beim ersten Laden (mit ?join=CODE in der URL) noch keine Session vorhanden - erst NACH
   dem Klick auf den Bestaetigungslink in der Mail entsteht eine Session, i.d.R. aber auf
   einer neuen Seitenanfrage OHNE den urspruenglichen ?join=-Parameter. Ohne diese
   Zwischenspeicherung ging der Code dabei verloren und die Einladung wurde nie
   uebernommen (linked_user_id blieb dauerhaft leer). */
(function(){
 try{
  var qs=new URLSearchParams(window.location.search);
  var fromUrl=qs.get('join');
  if(fromUrl){ AG_joinCode=fromUrl; localStorage.setItem(AG_PENDING_JOIN_KEY,fromUrl); }
  else{ var pending=localStorage.getItem(AG_PENDING_JOIN_KEY); if(pending) AG_joinCode=pending; }
  var rndUrl=qs.get('round');
  if(rndUrl){ AG_pendingRound=rndUrl; localStorage.setItem(AG_PENDING_ROUND_KEY,rndUrl); }
  else{ var pr=localStorage.getItem(AG_PENDING_ROUND_KEY); if(pr) AG_pendingRound=pr; }
 }catch(e){}
})();
var AG_msg='';
function AG_shouldGate(){
 if(sbUser) return false;
 if(AG_joinCode) return true;
 try{ if(localStorage.getItem(AG_KEY)==='1') return false; }catch(e){}
 return true;
}
function AG_render(){
 var el=document.getElementById('auth-gate'); if(!el) return;
 if(!AG_shouldGate()){ el.style.display='none'; return; }
 el.style.display='block';
 var h='<div style="max-width:420px;margin:0 auto;">';
 h+='<h1 style="margin-bottom:4px;">Fairway<em>Pilot</em></h1>';
 h+='<div style="font-size:12px;color:var(--tx3);margin-bottom:20px;">Deine Runden, dein Handicap-Verlauf – privat und geräteübergreifend synchronisiert.</div>';
 if(AG_joinCode){
  h+='<div class="rtc" style="margin-bottom:16px;"><div class="rt-ct">Einladung</div>'+
   '<div class="rt-cs">Du wurdest zu einer gemeinsamen Runde eingeladen. Melde dich an – die Einladung wird danach automatisch in dein Profil übernommen.</div></div>';
  h+='<div class="rtc"><div class="rt-ct">Anmelden</div>'+
   '<span class="rt-lbl">E-Mail</span><input class="rt-inp" id="ag-em" type="email" autocomplete="email" style="margin-bottom:8px;">'+
   '<span class="rt-lbl">Passwort</span><input class="rt-inp" id="ag-pw" type="password" autocomplete="current-password" style="margin-bottom:10px;">'+
   '<div class="rt-row"><button class="rt-btn" onclick="AG_auth(\'in\')">Anmelden</button>'+
   '<button class="rt-btn2" onclick="AG_auth(\'up\')">Registrieren</button></div>'+
   '<div style="text-align:right;margin-top:8px;"><a href="#" onclick="AG_auth(\'reset\');return false;" style="font-size:12px;color:var(--tx3);">Passwort vergessen?</a></div>'+
   '<div style="text-align:center;margin-top:10px;padding-top:10px;border-top:1px solid #DCE7D4;"><a href="#" onclick="AG_auth(\'magic\');return false;" style="font-size:12px;color:var(--tx3);">Kein Passwort? Login-Link per E-Mail senden</a></div>';
  if(AG_msg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(AG_msg)+'</div>';
  h+='</div>';
 }else{
  h+='<div class="rtc" style="margin-bottom:16px;"><div class="rt-ct">Warum ein Konto?</div>'+
   '<div class="rt-cs">Jeder Spieler bekommt ein eigenes, privates Profil. Runden werden in der Datenbank gespeichert und sind ausschließlich für dich sichtbar – andere Nutzer sehen deine Daten nicht. Wurdest du zu einer gemeinsam gespielten Runde eingeladen, kannst du sie per Einladungslink in dein Profil übernehmen.</div></div>';
  h+='<div class="rtc"><div class="rt-ct">Anmelden</div>'+
   '<span class="rt-lbl">E-Mail</span><input class="rt-inp" id="ag-em" type="email" autocomplete="email" style="margin-bottom:8px;">'+
   '<span class="rt-lbl">Passwort</span><input class="rt-inp" id="ag-pw" type="password" autocomplete="current-password" style="margin-bottom:10px;">'+
   '<div class="rt-row"><button class="rt-btn" onclick="AG_auth(\'in\')">Anmelden</button>'+
   '<button class="rt-btn2" onclick="AG_auth(\'up\')">Registrieren</button></div>'+'<div style="text-align:right;margin-top:8px;"><a href="#" onclick="AG_auth(\'reset\');return false;" style="font-size:12px;color:var(--tx3);">Passwort vergessen?</a></div>';
  if(AG_msg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(AG_msg)+'</div>';
  h+='</div>';
 }
 h+='<div style="text-align:center;margin-top:14px;"><a href="#" onclick="RT_state.showManualCode=!RT_state.showManualCode;AG_render();return false;" style="font-size:12px;color:var(--tx3);">Einladungscode manuell eingeben</a></div>';
 if(RT_state.showManualCode){
  h+='<div class="rtc" style="margin-top:10px;"><span class="rt-lbl">Einladungscode</span>'+
   '<input class="rt-inp" id="manual-invite-code" placeholder="Code aus der Einladung" style="margin-bottom:8px;">'+
   '<button class="rt-btn2" style="width:100%;" onclick="RT_manualClaim()">'+(RT_state.claimBusy?'Wird übernommen…':'Einladung übernehmen')+'</button></div>';
 }
 if(!AG_joinCode)h+='<div style="text-align:center;margin-top:18px;"><a href="#" onclick="AG_skip();return false;" style="font-size:12px;color:var(--tx3);">Ohne Konto fortfahren (nur dieses Gerät)</a></div>';
 h+='</div>';
 el.innerHTML=h;
}
function AG_skip(){ try{ localStorage.setItem(AG_KEY,'1'); }catch(e){} AG_render(); }
function AG_errText(e){
 var m=(e&&(e.message||e.error_description||e.msg))||String(e||'');
 var l=m.toLowerCase();
 if(l.indexOf('invalid login')>=0||l.indexOf('invalid credentials')>=0) return 'E-Mail oder Passwort ist nicht korrekt. Tipp: „Passwort vergessen?“ setzt es neu.';
 if(l.indexOf('already registered')>=0||l.indexOf('already been registered')>=0||l.indexOf('user already')>=0) return 'Diese E-Mail ist bereits registriert – bitte melde dich an (oder nutze „Passwort vergessen?“).';
 if(l.indexOf('email not confirmed')>=0) return 'Bitte zuerst den Bestätigungslink in deiner Registrierungs-E-Mail öffnen.';
 if(l.indexOf('you can only request')>=0||l.indexOf('security purposes')>=0) return 'Bitte kurz warten (ca. 30 Sekunden) und den Login-Link erneut anfordern.';
 if(l.indexOf('rate limit')>=0||l.indexOf('too many')>=0) return 'Zu viele Versuche in kurzer Zeit – bitte kurz warten und erneut versuchen.';
 if(l.indexOf('password should be')>=0||l.indexOf('at least 6')>=0) return 'Das Passwort muss mindestens 6 Zeichen haben.';
 return m;
}
async function AG_auth(mode){
 var em=document.getElementById('ag-em').value.trim();
 if(mode==='magic'){
  if(!em){ AG_msg='Bitte deine E-Mail-Adresse eingeben.'; AG_render(); return; }
  AG_msg='';
  try{
   var redirectTo=window.location.origin+window.location.pathname+(AG_joinCode?('?join='+encodeURIComponent(AG_joinCode)):'');
   var r=await sb.auth.signInWithOtp({email:em,options:{emailRedirectTo:redirectTo}});
   if(r.error)throw r.error;
   AG_msg='Login-Link verschickt – bitte E-Mail-Postfach öffnen und den Link antippen.';
  }catch(e){ AG_msg=AG_errText(e); }
  AG_render();
  return;
 }
  if(mode==='reset'){
  if(!em){ AG_msg='Bitte zuerst deine E-Mail-Adresse oben eingeben, dann erneut auf "Passwort vergessen?" tippen.'; AG_render(); return; }
  AG_msg='';
  try{
   var redirectTo=window.location.origin+window.location.pathname;
   var rr=await sb.auth.resetPasswordForEmail(em,{redirectTo:redirectTo});
   if(rr.error)throw rr.error;
   AG_msg='Wir haben dir eine E-Mail zum Zurücksetzen des Passworts geschickt. Öffne den Link darin – danach kannst du hier direkt ein neues Passwort vergeben.';
  }catch(e){ AG_msg='E-Mail konnte nicht gesendet werden: '+AG_errText(e); }
  AG_render();
  return;
 }
 var pw=document.getElementById('ag-pw').value;
 if(!em||pw.length<6){ AG_msg='E-Mail und Passwort (mind. 6 Zeichen) eingeben.'; AG_render(); return; }
 AG_msg='';
 try{
  var r=(mode==='up')?await sb.auth.signUp({email:em,password:pw}):await sb.auth.signInWithPassword({email:em,password:pw});
  if(r.error)throw r.error;
  if(mode==='up'&&!r.data.session){ AG_msg='Registriert – bitte Bestätigungslink in der E-Mail öffnen, dann anmelden.'; AG_render(); return; }
 }catch(e){ AG_msg=AG_errText(e); AG_render(); return; }
 if(!AG_joinCode)AG_render();
}
var AG_needName=false, AG_nameMsg='';
function AG_namePrompt(){
 var el=document.getElementById('auth-gate'); if(!el) return;
 el.style.display='block';
 var dn=''; try{ dn=(sbUser&&sbUser.user_metadata&&sbUser.user_metadata.display_name)||''; }catch(e){}
 var h='<div style="max-width:420px;margin:0 auto;">';
 h+='<h1 style="margin-bottom:4px;">Fairway<em>Pilot</em></h1>';
 h+='<div class="rtc"><div class="rt-ct">Wie sollen dich Mitspieler sehen?</div>'+
  '<div class="rt-cs" style="margin-bottom:8px;">Dieser Anzeigename erscheint bei gemeinsam gespielten Runden. Bitte Vor- und Zunamen eingeben, damit du eindeutig erkennbar bist.</div>'+
  '<span class="rt-lbl">Anzeigename</span><input class="rt-inp" id="ag-dispname" value="'+rtEsc(dn)+'" placeholder="z. B. Mark Mätschke" style="margin-bottom:10px;">'+
  '<button class="rt-btn" style="width:100%;" onclick="AG_saveDisplayName()">Speichern</button>';
 if(AG_nameMsg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(AG_nameMsg)+'</div>';
 h+='</div></div>';
 el.innerHTML=h;
}
async function AG_saveDisplayName(){
 var el=document.getElementById('ag-dispname'); var nm=el?el.value.trim():'';
 if(nm.length<2){ AG_nameMsg='Bitte einen Namen mit mindestens 2 Zeichen eingeben.'; AG_namePrompt(); return; }
 AG_nameMsg='';
 try{
  var r=await sb.auth.updateUser({data:{display_name:nm}});
  if(r.error)throw r.error;
  AG_needName=false;
  var g=document.getElementById('auth-gate'); if(g){ g.style.display='none'; g.innerHTML=''; }
  RT_render();
 }catch(e){ AG_nameMsg='Konnte nicht gespeichert werden: '+((typeof AG_errText==='function')?AG_errText(e):(e.message||e)); AG_namePrompt(); return; }
}
var AG_recoveryMsg='';
/* Wird nach Klick auf den Passwort-Zuruecksetzen-Link in der E-Mail aufgerufen (Supabase feuert
   dann PASSWORD_RECOVERY mit gueltiger Session). Zeigt ein Overlay zum Vergeben eines neuen
   Passworts - danach ist der Nutzer regulaer eingeloggt. */
function AG_recoveryPrompt(){
 var el=document.getElementById('auth-gate'); if(!el) return;
 el.style.display='block';
 var h='<div style="max-width:420px;margin:0 auto;">';
 h+='<h1 style="margin-bottom:4px;">Fairway<em>Pilot</em></h1>';
 h+='<div class="rtc"><div class="rt-ct">Neues Passwort vergeben</div>'+
  '<div class="rt-cs" style="margin-bottom:8px;">Gib jetzt dein neues Passwort ein (mind. 6 Zeichen). Danach bist du direkt angemeldet.</div>'+
  '<span class="rt-lbl">Neues Passwort</span><input class="rt-inp" id="ag-newpw" type="password" autocomplete="new-password" style="margin-bottom:10px;">'+
  '<button class="rt-btn" style="width:100%;" onclick="AG_setNewPassword()">Passwort speichern</button>';
 if(AG_recoveryMsg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(AG_recoveryMsg)+'</div>';
 h+='</div></div>';
 el.innerHTML=h;
}
async function AG_setNewPassword(){
 var el=document.getElementById('ag-newpw'); var pw=el?el.value:'';
 if(!pw||pw.length<6){ AG_recoveryMsg='Bitte mindestens 6 Zeichen eingeben.'; AG_recoveryPrompt(); return; }
 AG_recoveryMsg='';
 try{
  var r=await sb.auth.updateUser({password:pw});
  if(r.error)throw r.error;
  try{ localStorage.setItem(AG_KEY,'1'); }catch(e){}
  AG_msg=''; AG_render();
 }catch(e){ AG_recoveryMsg='Passwort konnte nicht gespeichert werden: '+AG_errText(e); AG_recoveryPrompt(); return; }
}
async function AG_claim(){
 if(!sb||!sbUser||!AG_joinCode)return;
 try{
  var r=await sb.rpc('claim_invite',{p_code:AG_joinCode});
  if(r.error)throw r.error;
  var row=(r.data&&r.data[0])||{};
  AG_joinCode=null;
  try{ var u=new URL(window.location.href); u.searchParams.delete('join'); window.history.replaceState({},'',u.toString()); }catch(e){}
  try{ localStorage.setItem(AG_KEY,'1'); localStorage.removeItem(AG_PENDING_JOIN_KEY); }catch(e){}
  AG_msg='Einladung als "'+rtEsc(row.player_name||'')+'" angenommen – '+(row.rounds_count||0)+' Runde(n) sind jetzt in deinem Profil sichtbar.';
  await sbPull(); await PL_load();
 }catch(e){ AG_msg='Einladung konnte nicht übernommen werden: '+(e.message||e); }
 AG_render();
}
/* Zusaetzliches, robusteres Gegenstueck zu AG_claim(): matcht nicht ueber den
   ?join=-URL-Parameter (der auf dem Weg durch die Mail-App/Weiterleitungskette verloren
   gehen kann), sondern direkt ueber die beim Versand der Einladung hinterlegte
   E-Mail-Adresse. Laeuft bei jedem Login automatisch mit, unabhaengig davon ob
   AG_joinCode gesetzt ist, und ist idempotent (wirkt nur auf noch unverknuepfte
   Eintraege). */
async function AG_claimByEmail(){
 if(!sb||!sbUser)return;
 /* Bis zu 3 Versuche mit Backoff: der Claim laeuft nur einmal beim Login, und ein transienter
    Fehler (z.B. PostgREST laedt gerade seinen Schema-Cache nach einer DDL-Aenderung, oder ein
    kurzer Netzaussetzer) wuerde die Einladung sonst still unverknuepft lassen. Idempotent -
    ein erfolgreicher Lauf (auch ohne Treffer) beendet die Schleife sofort. */
 for(var attempt=0;attempt<3;attempt++){
  try{
   var r=await sb.rpc('claim_by_email');
   if(r.error)throw r.error;
   if(r.data&&r.data.length){ await sbPull(); await PL_load(); RT_loadConnections(); AG_render(); }
   return;
  }catch(e){
   if(attempt>=2) return;
   await new Promise(function(res){ setTimeout(res,1500*(attempt+1)); });
  }
 }
}

/* Manuelles Gegenstueck zu AG_claim(): nimmt den Code direkt aus einem Eingabefeld statt aus
   der URL/localStorage, damit das Herstellen einer Mitspieler-Verknuepfung nicht mehr davon
   abhaengt, ob der ?join=-Parameter den kompletten Registrierungs-/Bestaetigungs-Weg
   unbeschadet uebersteht. */
async function RT_manualClaim(){
 var codeEl=document.getElementById('manual-invite-code');
 var code=(codeEl&&codeEl.value||'').trim();
 if(!code){ AG_msg='Bitte einen Einladungscode eintragen.'; RT_render(); return; }
 if(!sb||!sbUser){ AG_msg='Bitte zuerst anmelden.'; RT_render(); return; }
 RT_state.claimBusy=true; RT_render();
 AG_joinCode=code;
 await AG_claim();
 RT_state.claimBusy=false;
 await RT_loadConnections();
}
var PL_msg='', PL_list=null;
var RT_connections=null;
/* Laedt sowohl eingehende (jemand hat mich eingeladen, ich habe angenommen) als auch
   ausgehende (ich habe jemanden eingeladen, der angenommen hat) Verbindungen ueber die
   sichere RPC get_my_connections() - loest Marks Anliegen "Verbindungen sollten sichtbar
   sein", da bisher nur die eigenen ausgehenden Einladungen (player_links.owner_id=self)
   abgefragt wurden, nie die eingehende Seite. */
function RT_connRoundCount(c){ if(c&&c.rounds_count!=null) return c.rounds_count; if(c&&c.round_count!=null) return c.round_count; var name=((c&&c.player_name)||'').trim().toLowerCase(); if(!name) return 0; var rounds=rtGet(RT_KEY)||[]; var n=0; rounds.forEach(function(rd){ if(!rd||rd.hidden) return; if(rd.players&&rd.players.some(function(p){return p&&((p.name||'').trim().toLowerCase()===name);})) n++; }); return n; }
async function RT_loadConnections(){
 if(!sb||!sbUser)return;
 try{
  var r=await sb.rpc('get_my_connections');
  if(!r.error) RT_connections=r.data;
 }catch(e){}
 RT_render();
}
async function PL_load(){
 if(!sb||!sbUser)return;
 try{ var r=await sb.from('player_links').select('player_name,invite_code,linked_user_id,claimed_at').eq('owner_id',sbUser.id); if(!r.error)PL_list=r.data; }catch(e){}
}
function PL_statusFor(name){ if(!PL_list)return null; return PL_list.find(function(x){return x.player_name===name;})||null; }
async function PL_invite(name){
 if(!sb||!sbUser||!name)return;
 try{
  var r=await sb.from('player_links').insert({owner_id:sbUser.id,player_name:name}).select('player_name,invite_code,linked_user_id,claimed_at').single();
  if(r.error)throw r.error;
  if(!PL_list)PL_list=[]; PL_list.push(r.data); PL_msg='';
 }catch(e){ PL_msg='Einladung fehlgeschlagen: '+(e.message||e); }
 RT_render();
}
async function PL_copy(code){
 var link=window.location.origin+window.location.pathname+'?join='+encodeURIComponent(code);
 try{ await navigator.clipboard.writeText(link); PL_msg='Link kopiert: '+link; }catch(e){ PL_msg=link; }
 RT_render();
}
async function PL_copyRaw(code){ try{ await navigator.clipboard.writeText(code); PL_msg='Code kopiert: '+code; }catch(e){ PL_msg='Code: '+code; } RT_render(); }
function PL_buildLink(code){
 return window.location.origin+window.location.pathname+'?join='+encodeURIComponent(code);
}
/* Legt bei Bedarf einen Einladungscode an - OHNE E-Mail (reine Verknuepfungs-Einladung zum
   Teilen per Link/QR). Gibt den Code zurueck (oder null bei Fehler). */
async function PL_ensureCode(name){
 var st=(typeof PL_statusFor==='function')?PL_statusFor(name):null;
 if(st&&st.invite_code) return st.invite_code;
 if(!sb||!sbUser||!name) return null;
 try{
  var r=await sb.from('player_links').insert({owner_id:sbUser.id,player_name:name}).select('player_name,invite_code,linked_user_id,claimed_at').single();
  if(r.error) throw r.error;
  if(!PL_list)PL_list=[]; PL_list.push(r.data);
  return r.data.invite_code;
 }catch(e){ PL_msg='Link konnte nicht erstellt werden: '+(e.message||e); RT_render(); return null; }
}
/* Teilt den Einladungslink ueber den nativen Teilen-Dialog des Geraets (WhatsApp, iMessage,
   AirDrop, ...). Faellt auf Kopieren zurueck, wenn kein Share-Dialog verfuegbar ist. */
async function PL_share(name){
 var code=await PL_ensureCode(name); if(!code) return;
 var link=PL_buildLink(code);
 var who=(typeof RT_myDisplayName==='function')?RT_myDisplayName():'Ein Mitspieler';
 var msg=who+' l\u00e4dt dich zu FairwayPilot ein \u2013 \u00f6ffne den Link, um gemeinsam zu spielen:';
 try{ if(navigator.share){ await navigator.share({title:'FairwayPilot Einladung', text:msg, url:link}); PL_msg=''; RT_render(); return; } }
 catch(e){ if(e&&e.name==='AbortError') return; }
 try{ await navigator.clipboard.writeText(link); PL_msg='Link kopiert: '+link; }catch(e){ PL_msg=link; }
 RT_render();
}
/* QR-Ansicht fuer eine Zeile ein-/ausklappen (erzeugt bei Bedarf den Code). */
function PL_qr(name){
 RT_state.qrFor=(RT_state.qrFor===name)?null:name;
 if(RT_state.qrFor){ PL_ensureCode(name).then(function(){ RT_render(); }); } else { RT_render(); }
}
/* Rendert einen scannbaren QR-Code (inline-SVG, EC-Level M) fuer den Einladungslink. Nutzt den
   eingebundenen, gegen die Referenz verifizierten QR-Encoder (window.QR). Kein Drittanbieter. */
function RT_qrSvg(text,px){
 try{
  if(typeof QR==='undefined'||!QR.matrix) return '';
  var m=QR.matrix(text,'M'); var n=m.n, quiet=4, total=n+quiet*2;
  var cell=Math.max(1,Math.floor((px||212)/total)); var size=cell*total;
  var rects='';
  for(var r=0;r<n;r++){ for(var c=0;c<n;c++){ if(m.dark[r][c]) rects+='<rect x="'+((c+quiet)*cell)+'" y="'+((r+quiet)*cell)+'" width="'+cell+'" height="'+cell+'"/>'; } }
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="'+size+'" height="'+size+'" fill="#ffffff"/><g fill="#12281b">'+rects+'</g></svg>';
 }catch(e){ return ''; }
}
function RT_qrBoxHtml(name){
 var st=(typeof PL_statusFor==='function')?PL_statusFor(name):null;
 var code=st&&st.invite_code;
 if(!code) return '<div style="margin-top:8px;font-size:12px;color:#8A9C8E;">Einladungslink wird erstellt \u2026</div>';
 var link=PL_buildLink(code);
 var svg=RT_qrSvg(link,212);
 var h='<div style="margin-top:8px;padding:12px;border:1px solid #DCE7D4;border-radius:12px;background:#fff;text-align:center;">';
 h+='<div style="font-size:12px;color:#3C5546;margin-bottom:8px;">'+rtEsc(name)+' scannt den Code (oder du teilst den Link) und landet direkt in der Einladung.</div>';
 if(svg) h+='<div style="display:flex;justify-content:center;margin-bottom:8px;">'+svg+'</div>';
 else h+='<div style="font-size:11px;color:#B03A3A;margin-bottom:8px;">QR-Code nicht verf\u00fcgbar \u2013 nutze den Link.</div>';
 h+='<div style="font-size:11px;color:#8A9C8E;word-break:break-all;margin-bottom:8px;">'+rtEsc(link)+'</div>';
 h+='<div style="font-size:11.5px;color:#3C5546;margin-bottom:10px;">Notfalls Code manuell eingeben: <b style="font-family:monospace;letter-spacing:.5px;">'+rtEsc(code)+'</b></div>';
 h+='<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'+
  '<button class="rt-btn" style="width:auto;flex:none;padding:9px 14px;margin:0;" onclick="PL_share(\''+rtJsEsc(name)+'\')">\ud83d\udcf2 Teilen</button>'+
  '<button class="rt-btn2" style="width:auto;flex:none;padding:9px 14px;margin:0;" onclick="PL_copy(\''+rtJsEsc(code)+'\')">Link kopieren</button>'+
  '<button class="rt-btn3" style="width:auto;flex:none;padding:9px 14px;margin:0;" onclick="PL_copyRaw(\''+rtJsEsc(code)+'\')">Code kopieren</button>'+
  '</div></div>';
 return h;
}
/* Blendet fuer eine Zeile das E-Mail-Eingabefeld ein/aus, statt den Link direkt zu kopieren -
   siehe PL_sendInvite fuer den eigentlichen Versand. */
function PL_showEmail(name){
 RT_state.plEmailFor = (RT_state.plEmailFor===name) ? null : name;
 PL_msg='';
 RT_render();
}
/* Versendet die Einladung per E-Mail: legt bei Bedarf zuerst einen Einladungscode an (falls
   noch keiner existiert), oeffnet dann die Mail-App des Geraets mit vorausgefuelltem
   Empfaenger, Betreff und dem Einladungslink im Text - kein eigener Mailversand-Server
   noetig, der Nutzer sendet ueber seine eigene, bereits eingerichtete Mail-App. */
function PL_domId(name){ return 'pl-email-'+String(name).replace(/[^a-zA-Z0-9]/g,''); }
/* Hebt die Verknuepfung zu einem Mitspieler wieder auf (loescht die player_links-Zeile des
   Kontoinhabers fuer diesen Namen). Danach erscheint wieder "Einladen" und der Spieler kann
   neu - auch mit einer ANDEREN E-Mail-Adresse - eingeladen werden. Bereits abgeschlossene,
   gemeinsam gespeicherte Runden bleiben bei beiden als eigene Kopie erhalten; eine noch
   laufende Freigabe endet. */
function PL_unlink(name){
 RT_pageConfirm('Verkn\u00fcpfung zu <b>'+rtEsc(name)+'</b> aufheben? Du kannst '+rtEsc(name)+' danach neu (auch mit anderer E-Mail) einladen. Bereits gespeicherte gemeinsame Runden bleiben bei beiden erhalten.', function(){ PL_unlinkDo(name); }, 'Verkn\u00fcpfung aufheben');
}
async function PL_unlinkDo(name){
 if(!sb||!sbUser){ PL_msg='Nicht angemeldet.'; RT_render(); return; }
 try{
  var r=await sb.from('player_links').delete().eq('owner_id',sbUser.id).eq('player_name',name);
  if(r.error)throw r.error;
  if(PL_list) PL_list=PL_list.filter(function(x){return x.player_name!==name;});
  RT_state.plEmailFor=null;
  PL_msg='Verkn\u00fcpfung zu '+name+' aufgehoben \u2013 du kannst '+name+' jetzt neu einladen.';
 }catch(e){ PL_msg='Aufheben fehlgeschlagen: '+(e.message||e); }
 try{ RT_loadConnections(); }catch(e){}
 RT_render();
}
async function PL_sendInvite(name){
 var emEl=document.getElementById(PL_domId(name));
 var em=(emEl?emEl.value:'').trim();
 if(!em||em.indexOf('@')<0){ PL_msg='Bitte eine g\u00fcltige E-Mail-Adresse eingeben.'; RT_render(); return; }
 var st=PL_statusFor(name);
 if(!st){
  if(!sb||!sbUser)return;
  try{
   var r=await sb.from('player_links').insert({owner_id:sbUser.id,player_name:name,invite_email:em}).select('player_name,invite_code,linked_user_id,claimed_at').single();
   if(r.error)throw r.error;
   if(!PL_list)PL_list=[]; PL_list.push(r.data);
   st=r.data;
  }catch(e){ PL_msg='Einladung fehlgeschlagen: '+(e.message||e); RT_render(); return; }
 }else if(st.invite_email!==em){
  try{ await sb.from('player_links').update({invite_email:em}).eq('owner_id',sbUser.id).eq('player_name',name); st.invite_email=em; }catch(e){}
 }
 var link=PL_buildLink(st.invite_code);
 var subject='Einladung zu FairwayPilot';
 var body='Hallo '+name+',\n\nich m\u00f6chte dich zu FairwayPilot einladen, damit unsere gemeinsam gespielten Golfrunden auch in deinem eigenen, privaten Profil erscheinen.\n\n\u00d6ffne einfach diesen Link, um dich zu registrieren:\n'+link+'\n\nViele Gr\u00fc\u00dfe';
 var mailto='mailto:'+encodeURIComponent(em)+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 
 PL_msg='E-Mail wird an '+rtEsc(em)+' gesendet …'; RT_render();
 try{
  var _inv=(typeof RT_myDisplayName==='function')?RT_myDisplayName():'Ein Mitspieler';
  var _lab='einer Golfrunde', _rid='';
  if(RT_round&&!RT_round.done){ _lab=(RT_round.courseName||'einer Runde')+(RT_round.date?(' am '+(''+RT_round.date).split('-').reverse().join('.')):''); _rid=RT_round.id; }
  else if(RT_su&&RT_su.course&&RT_su.course!=='other'){ var _cc=RT_COURSES[RT_su.course]; _lab=((_cc&&_cc.name)||'einer Runde')+(RT_su.date?(' am '+(''+RT_su.date).split('-').reverse().join('.')):''); }
  var _res=await sb.functions.invoke('send-invite',{body:{to:em,playerName:name,inviterName:_inv,roundLabel:_lab,joinCode:st.invite_code,roundId:_rid}});
  if(_res&&_res.error) throw _res.error;
  PL_msg='Einladung an '+rtEsc(em)+' gesendet.';
 }catch(e){
  try{ window.location.href=mailto; PL_msg='Server-Versand nicht möglich \u2013 deine Mail-App wurde mit der Einladung an '+rtEsc(em)+' geöffnet. Bitte dort auf Senden tippen.'; }
  catch(e2){ PL_msg='Versand fehlgeschlagen: '+((e&&e.message)||e)+'. Link zum Weitergeben: '+PL_buildLink(st.invite_code); }
 }
 RT_state.plEmailFor=null;
 RT_render();
}
function sbCard(){
 if(!sbReady())return '<div class="rt-note">Cloud-Sync ist noch nicht konfiguriert \u2013 Runden werden nur lokal auf diesem Ger\u00e4t gespeichert.</div>';
 var h='<div class="rtc"><div class="rt-ct">Konto &amp; Cloud-Sync</div>';
 if(sbUser){
  h+='<div class="rt-cs">Angemeldet als '+rtEsc(sbUser.email)+' \u2013 Runden und Pl\u00e4tze werden in der Datenbank gespeichert und ger\u00e4te\u00fcbergreifend synchronisiert.</div>'+
   '<button class="rt-btn2" onclick="RT_go(\'user\')">Konto verwalten &amp; Mitspieler einladen &#8250;</button>';
 }else{
  h+='<div class="rt-cs">Anmelden, damit Runden ger\u00e4te\u00fcbergreifend in der Datenbank gespeichert werden</div>'+
   '<span class="rt-lbl">E-Mail</span><input class="rt-inp" id="sb-em" type="email" autocomplete="email" style="margin-bottom:8px;">'+
   '<span class="rt-lbl">Passwort</span><input class="rt-inp" id="sb-pw" type="password" autocomplete="current-password" style="margin-bottom:10px;">'+
   '<div class="rt-row"><button class="rt-btn" onclick="sbAuth(\'in\')">Anmelden</button>'+
   '<button class="rt-btn2" onclick="sbAuth(\'up\')">Registrieren</button></div>';
 }
 if(sbMsg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+sbMsg+'</div>';
 h+='</div>';
 return h;
}
/* Benutzermenue: Profilbild, Name, E-Mail, Passwort und Mitspieler-Einladungslinks an einem
   Ort, erreichbar ueber das Icon oben rechts auf der Startseite. Nicht angemeldete Nutzer
   sehen stattdessen das Anmelde-/Registrierungsformular. */
var FP_BUILD='2026-08-18 · 07:35 · icons2';
function RT_rUser(){
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="RT_go(\'home\')">&#8249;</button>'+
  '<div class="rt-h1" style="font-size:18px;">Konto</div></div>';
 if(!sbReady()){
  h+='<div class="rt-note">Cloud-Sync ist noch nicht konfiguriert \u2013 kein Benutzerkonto verf\u00fcgbar.</div>';
  return h;
 }
 if(!sbUser){
  h+='<div class="rtc"><div class="rt-cs">Anmelden, damit Runden ger\u00e4te\u00fcbergreifend in der Datenbank gespeichert werden.</div>'+
   '<span class="rt-lbl">E-Mail</span><input class="rt-inp" id="sb-em" type="email" autocomplete="email" style="margin-bottom:8px;">'+
   '<span class="rt-lbl">Passwort</span><input class="rt-inp" id="sb-pw" type="password" autocomplete="current-password" style="margin-bottom:10px;">'+
   '<div class="rt-row"><button class="rt-btn" onclick="sbAuth(\'in\')">Anmelden</button>'+
   '<button class="rt-btn2" onclick="sbAuth(\'up\')">Registrieren</button></div>'+
   (sbMsg?'<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+sbMsg+'</div>':'')+
   '</div>';
  return h;
 }
 var av=sbUser.user_metadata&&sbUser.user_metadata.avatar_url;
 var dispName=(sbUser.user_metadata&&sbUser.user_metadata.display_name)||'';
 h+='<div class="rtc" style="text-align:center;">'+
  '<div style="position:relative;width:84px;height:84px;margin:0 auto 10px;">'+
   '<div style="width:84px;height:84px;border-radius:50%;overflow:hidden;background:#1F8A4D;display:flex;align-items:center;justify-content:center;">'+
    (av?'<img src="'+rtEsc(av)+'" style="width:100%;height:100%;object-fit:cover;">':'<span style="font-size:30px;font-weight:800;color:#fff;">'+(dispName?dispName.charAt(0).toUpperCase():sbUser.email.charAt(0).toUpperCase())+'</span>')+
   '</div>'+
   (RT_state.avatarBusy?'<div style="position:absolute;inset:0;border-radius:50%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:11px;">...</div>':
    '<label style="position:absolute;bottom:-2px;right:-2px;width:28px;height:28px;border-radius:50%;background:#fff;border:1.5px solid #DCE7D4;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;">&#128247;<input type="file" accept="image/*" style="display:none;" onchange="RT_avatarFile(event)"></label>')+
  '</div>'+
  '<div class="rt-cs" style="margin-bottom:0;">'+rtEsc(sbUser.email)+'</div>'+
 '</div>';
 h+=RT_premiumCard();
 h+='<div class="rtc"><div class="rt-ct">Name</div>'+
  '<input class="rt-inp" id="usr-name" value="'+rtEsc(dispName)+'" placeholder="Anzeigename" style="margin-bottom:8px;">'+
  '<button class="rt-btn2" onclick="RT_nameSave()">Speichern</button>'+
  (RT_state.nameMsg?'<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(RT_state.nameMsg)+'</div>':'')+
  '</div>';
  h+='<div class="rtc"><div class="rt-ct">Golfbag</div><div class="rt-cs" style="margin-bottom:8px;">'+(RT_bagCount()?(RT_bagCount()+' Schläger im Bag'):'Noch keine Schläger ausgewählt')+'</div><button class="rt-btn2" onclick="RT_go(\'bag\')">Schlägerauswahl &#8250;</button></div>';
 h+='<div class="rtc"><div class="rt-ct">Verbundene Dienste</div><div class="rt-cs" style="margin-bottom:8px;">'+RT_svcSummaryLine()+'</div><button class="rt-btn2" onclick="RT_go(\'services\')">Dienste verwalten &#8250;</button></div>';
 /* Gemeinsames Scoring: Notschalter auf altes Modell (Sicherheitsventil). */
 h+='<div class="rtc"><div class="rt-ct">Gemeinsames Scoring</div>'
  +'<div class="rt-cs" style="margin-bottom:8px;">Server-erzwungenes Scoring mit Per-Spieler-Zuweisung ist Standard. Nur bei Problemen unterwegs hier auf das alte Modell zur\u00fcckschalten.</div>'
  +'<button class="rt-btn2" style="width:auto;" onclick="RSV2_toggle()">'+(RSV2_ON()?'Aktiv \u2013 Notschalter: altes Modell':'Altes Modell aktiv \u2013 wieder umschalten')+'</button></div>';
 h+='<div class="rtc"><div class="rt-ct">Eigenes Handicap</div>'+
  '<div class="rt-cs">Wird bei einer neuen Runde als Standard-HI vorbelegt, statt jedes Mal 54 eintragen zu m\u00fcssen.</div>'+
  '<input class="rt-inp" id="usr-hcp" type="number" step="0.1" min="-10" max="54" value="'+rtEsc(RT_ownHandicapStored())+'" placeholder="z.\u2009B. 24.5" style="margin-bottom:8px;">'+
  '<button class="rt-btn2" onclick="RT_hcpSave()">Speichern</button>'+
  (RT_state.hcpMsg?'<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(RT_state.hcpMsg)+'</div>':'')+
  '</div>';
 h+='<div class="rtc"><div class="rt-ct">Passwort \u00e4ndern</div>'+
  '<span class="rt-lbl">Neues Passwort</span><input class="rt-inp" id="usr-pw1" type="password" autocomplete="new-password" style="margin-bottom:8px;">'+
  '<span class="rt-lbl">Wiederholen</span><input class="rt-inp" id="usr-pw2" type="password" autocomplete="new-password" style="margin-bottom:10px;">'+
  '<button class="rt-btn2" onclick="RT_pwSave()">Passwort \u00e4ndern</button>'+
  (RT_state.pwMsg?'<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(RT_state.pwMsg)+'</div>':'')+
  '</div>';
 /* Manuelles Einloesen eines Einladungscodes - unabhaengig davon, ob der ?join=-Link beim
    Registrieren/Anmelden korrekt durchgereicht wurde (z.B. bei E-Mail-Bestaetigung, verlorenen
    Parametern durch Weiterleitungen, oder wenn schon ein Konto bestand und ganz normal ueber
    das Anmeldeformular eingeloggt wurde statt ueber den Einladungslink). Damit haengt das
    Herstellen der Verbindung nicht mehr allein vom exakten Link-Klick ab. */
 h+='<div class="rtc"><div class="rt-ct">Einladungscode einl\u00f6sen</div>'+
  '<div class="rt-cs">Hast du einen Einladungslink/-code von jemandem erhalten? Code hier eintragen, um die Verkn\u00fcpfung herzustellen.</div>'+
  '<div class="rt-row"><input class="rt-inp" id="manual-invite-code" placeholder="Einladungscode" style="flex:1;">'+
  '<button class="rt-btn2" style="flex:none;width:auto;" onclick="RT_manualClaim()">'+(RT_state.claimBusy?'...':'\u00dcbernehmen')+'</button></div>'+
  (AG_msg?'<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(AG_msg)+'</div>':'')+
  '</div>';
 if(RT_connections===null){ RT_loadConnections(); }
 else if(RT_connections.length){
  h+='<div class="rtc"><div class="rt-ct">Meine Verbindungen</div>'+
   '<div class="rt-cs">Diese Personen sind mit deinem Konto verkn\u00fcpft.</div>';
  var _seenConn={};
   var connList=(RT_connections||[]).filter(function(c){ var k=(c&&(c.other_email||c.other_display_name||c.player_name)||'').trim().toLowerCase(); if(!k) return true; if(_seenConn[k]) return false; _seenConn[k]=true; return true; });
   connList.forEach(function(c){
   var who=c.other_display_name||c.other_email;
   var cnt=RT_connRoundCount(c); var email=c.other_email||c.other_display_name||who;
   var desc=c.direction==='incoming'
    ? 'Du spielst als <b>'+rtEsc(c.player_name)+'</b> in Runden von '+rtEsc(who)
    : '<b>'+rtEsc(c.player_name)+'</b> spielt unter '+rtEsc(email)+' in '+cnt+' '+(cnt===1?'deiner Runde':'deiner Runden');
   h+='<div style="display:flex;align-items:center;gap:8px;margin-top:8px;font-size:13px;">'+
    '<span style="width:8px;height:8px;border-radius:50%;background:#1F8A4D;flex:none;"></span>'+
    '<div style="flex:1;">'+desc+'</div></div>';
  });
  h+='</div>';
 }
 h+='<div class="rtc"><div class="rt-ct">Mitspieler einladen</div>'+
  '<div class="rt-cs">Lade Mitspieler ein, damit gemeinsam gespielte Runden auch in ihrem eigenen, privaten Profil erscheinen.</div>';
 /* Der Kontoinhaber selbst darf sich nicht "einladen" - Abgleich gegen RT_myDisplayName(),
    denselben Namen, der auch als Standardspieler beim Anlegen einer neuen Runde vorbelegt
    wird (siehe RT_defSu). Fr\u00fcher war hier fest "mark" hinterlegt - das war nur fuer Marks
    eigenes Konto korrekt und h\u00e4tte bei jedem anderen Konto (z.B. einem eingeladenen
    Mitspieler mit eigenem Account) nicht gegriffen. */
 /* Nur ECHTE Mitspieler in der Einladen-Liste: wer in mindestens einer noch vorhandenen Runde
    vorkommt ODER verknuepft/eingeladen ist (player_link vorhanden). Reine lokale Roster-Reste
    (in RT_PLAYERSAV_KEY, aber in keiner Runde und ohne Verknuepfung) - "Karteileichen" - fallen
    dadurch automatisch raus, ohne manuelles Entfernen. Das Runden-Setup-Roster bleibt davon
    unberuehrt (dort ist die Schnell-Auswahl auch fuer selten gespielte Mitspieler gewollt). */
 var _invNorm=function(x){ return (x||'').trim().toLowerCase(); };
 var _invInRounds={}; var _hpn=RT_historicPlayerNames(); Object.keys(_hpn).forEach(function(nm){ _invInRounds[_invNorm(nm)]=1; });
 var plSaved=(RT_getSavedPlayers()||[]).filter(function(sp){
 if(RT_isSelfName(sp.name)) return false;
 if(_invInRounds[_invNorm(sp.name)]) return true;
 var st=(typeof PL_statusFor==='function')?PL_statusFor(sp.name):null;
 return !!(st&&(st.linked_user_id||st.invite_email||st.invite_code));
});
 plSaved=RT_dedupInvitees(plSaved);
  if(!plSaved.length){h+='<div class="rt-note">Noch keine einladbaren Mitspieler. Lege sie beim Anlegen einer Runde \u00fcber "+ Neuer Spieler" an.</div>';}
 else plSaved.forEach(function(sp){
 if(RT_needsSelfConfirm(sp.name)){ h+=RT_selfConfirmHtml(sp.name); return; }
  var st=PL_statusFor(sp.name);
  var linked=st&&st.linked_user_id;
  var emailMode=RT_state.plEmailFor===sp.name;
  h+='<div style="margin-top:8px;">';
  h+='<div style="display:flex;gap:8px;align-items:center;">'+
   '<div style="flex:1;min-width:0;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+rtEsc(sp.name)+'</div>';
  if(linked)h+='<button class="rt-btn2" title="Verkn&uuml;pfung aufheben" onclick="PL_unlink(\''+rtJsEsc(sp.name)+'\')" style="flex:none;width:128px;box-sizing:border-box;margin:0;padding:9px 8px;display:flex;align-items:center;justify-content:center;background:#1F8A4D;border-color:#1F8A4D;color:#fff;font-weight:700;cursor:pointer;">verknüpft &#10003;</button>';
  else { h+='<button class="rt-btn" style="flex:none;width:auto;box-sizing:border-box;margin:0;padding:9px 12px;text-align:center;" onclick="PL_share(\''+rtJsEsc(sp.name)+'\')" title="Einladungslink teilen">\ud83d\udcf2 Teilen</button>'+
   '<button class="rt-btn3" style="flex:none;padding:8px 10px;" onclick="PL_qr(\''+rtJsEsc(sp.name)+'\')" title="QR-Code">QR</button>'+
   '<button class="rt-btn3" style="flex:none;padding:8px 10px;" onclick="PL_showEmail(\''+rtJsEsc(sp.name)+'\')" title="Per E-Mail einladen">'+(emailMode?'\u2715':'\u2709\ufe0f')+'</button>'; }
  h+='</div>';
  if(!linked&&emailMode){
   h+='<div style="display:flex;gap:8px;align-items:center;margin-top:6px;padding-left:80px;">'+
    '<input class="rt-inp" id="'+PL_domId(sp.name)+'" type="email" placeholder="E-Mail von '+rtEsc(sp.name)+'" style="flex:1;">'+
    '<button class="rt-btn" style="flex:none;width:auto;padding:10px 14px;" onclick="PL_sendInvite(\''+rtJsEsc(sp.name)+'\')">Senden</button>'+
    '</div>';
  }
  if(!linked&&RT_state.qrFor===sp.name){ h+=RT_qrBoxHtml(sp.name); }
  h+='</div>';
 });
 if(PL_msg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(PL_msg)+'</div>';
 h+='</div>';
  h+='<div class="rtc" style="border-top-color:#B03A3A;margin-top:10px;">'+
 '<button class="rt-btn2" style="width:100%;color:#B03A3A;border-color:#E0BCBC;font-weight:700;" '+(RT_state.logoutBusy?'disabled':'')+' onclick="sbOut()">'+(RT_state.logoutBusy?'<span class="rt-spin"></span>Pr\u00fcft Sync\u2026':'Abmelden')+'</button></div>';
 if(RT_state.ask==='logout_unsynced'){
  h+='<div class="rt-warn" style="margin-top:8px;">Nicht alle Runden konnten synchronisiert werden ('+rtEsc(RT_state.logoutErr||'')+'). Ein Abmelden w\u00fcrde diese Daten unwiederbringlich l\u00f6schen.'+
   '<div class="rt-row" style="margin-top:8px;"><button class="rt-btn2" onclick="sbOut()">Erneut versuchen</button>'+
   '<button class="rt-btn2" style="color:#B03A3A;border-color:#E0BCBC;" onclick="sbOutForce()">Trotzdem abmelden</button></div></div>';
 }
 h+='<div class="rtc" style="margin-top:10px;"><div class="rt-ct">Rechtliches</div><div class="rt-cs" style="display:flex;flex-direction:column;gap:6px;"><a href="/impressum" target="_blank" style="color:var(--gd);text-decoration:none;font-weight:600;">Impressum</a><a href="/datenschutz" target="_blank" style="color:var(--gd);text-decoration:none;font-weight:600;">Datenschutzerkl\u00e4rung</a><a href="/agb" target="_blank" style="color:var(--gd);text-decoration:none;font-weight:600;">AGB</a></div></div>';
 h+='<div class="rtc" style="margin-top:10px;border-top-color:#D64550;"><div class="rt-ct" style="color:#B03A3A;">Konto l\u00f6schen</div><div class="rt-cs">L\u00f6scht dein Konto und alle deine Runden, Pl\u00e4tze und Verkn\u00fcpfungen unwiderruflich. Diese Aktion kann nicht r\u00fcckg\u00e4ngig gemacht werden.</div>'+
 (RT_state.delAccMsg?'<div class="rt-warn" style="margin-bottom:10px;">'+rtEsc(RT_state.delAccMsg)+'</div>':'')+
 '<button class="rt-btn2" style="color:#B03A3A;border-color:#E0BCBC;'+(RT_state.ask==='delaccount'?'background:#FBEAEA;font-weight:800;':'')+'" '+(RT_state.delAccBusy?'disabled':'')+' onclick="RT_deleteAccount()">'+(RT_state.delAccBusy?'<span class="rt-spin"></span>L\u00f6sche\u2026':(RT_state.ask==='delaccount'?'Wirklich unwiderruflich l\u00f6schen?':'Konto endg\u00fcltig l\u00f6schen'))+'</button>'+
 '</div>';
 h+='<div style="text-align:center;margin-top:16px;font-size:11px;color:#9AAB9E;">Build '+FP_BUILD+'</div>';
 return h;
}
/* Liefert {url,bg} fuer ein eigenes Lochbild (statt Live-Karte), falls der Platz
   welche hinterlegt hat (courseObj.holeImg.F/B je 9 URLs) - sonst null. Generisches
   Feature: greift fuer jeden Platz, der holeImg gepflegt hat, nicht nur Leverkusen. */
function RT_holeImgFor(rd,c){
 if(!rd) return null;
 var ck=RT_courseKeyFromName(rd.courseName,rd);
 var co=ck?RT_COURSES[ck]:null;
 if(!co||!co.holeImg) return null;
 var num=rd.nums[c];
 var nine=num<=9?'F':'B';
 var idx=num<=9?num-1:num-10;
 var arr=co.holeImg[nine];
 var url=arr&&arr[idx]?arr[idx]:null;
 if(!url) return null;
 return {url:url, bg:co.holeImgBg||'#EAF1E3'};
}
function RT_haversineM(lat1,lon1,lat2,lon2){
 var R=6371000;
 var dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180;
 var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
 var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
 return R*c;
}
function RT_distUnit(){ return rtGet(RT_DISTUNIT_KEY)||'m'; }
function RT_toggleDistUnit(){ rtSet(RT_DISTUNIT_KEY, RT_distUnit()==='yd'?'m':'yd'); RT_render(); }
function RT_fmtDist(meters){
 if(meters===null||meters===undefined||isNaN(meters)) return '–';
 if(RT_distUnit()==='yd') return Math.round(meters*1.09361)+' yd';
 return Math.round(meters)+' m';
}
function RT_getRefOverrides(){ return rtGet(RT_REFOV_KEY)||{}; }
function RT_applyRefOverrides(){
 var ov=RT_getRefOverrides();
 Object.keys(ov).forEach(function(key){ if(RT_COURSES[key]) RT_COURSES[key].refs=ov[key]; });
}
function RT_ensureRefsObj(c){
 if(!c.refs) c.refs={F:[null,null,null,null,null,null,null,null,null],B:[null,null,null,null,null,null,null,null,null]};
 if(!c.refs.F) c.refs.F=[null,null,null,null,null,null,null,null,null];
 if(!c.refs.B) c.refs.B=[null,null,null,null,null,null,null,null,null];
}
function RT_persistRefs(key){
 var custom=RT_loadCustomCourses();
 if(custom[key]){ custom[key].refs=RT_COURSES[key].refs; rtSet(RT_CUSTOM_KEY,custom); sbPushCourse(key,custom[key]); }
 else{ var ov=RT_getRefOverrides(); ov[key]=RT_COURSES[key].refs; rtSet(RT_REFOV_KEY,ov); sbPushCourse(key,RT_COURSES[key]); }
}
function RT_refFor(rd,c){
 var key=RT_courseKeyFromName(rd.courseName,rd); if(!key) return null;
 var co=RT_COURSES[key]; if(!co||!co.refs) return null;
 var num=rd.nums[c]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
 return (co.refs[nine]&&co.refs[nine][idx])||null;
}
var RT_curPos=null;
var RT_geoWatchId=null;
/* ---------- Native Standortfreigabe (Backlog B9) ----------
   In einem Capacitor-Container laeuft die App in einem WKWebView bzw. WebView. Dort greift
   navigator.geolocation erst, wenn das Betriebssystem der App selbst die Standortfreigabe
   erteilt hat. Das Web-API loest den nativen Dialog nicht zuverlaessig aus - unter iOS
   schlaegt der Zugriff sonst stumm fehl. Deshalb wird die Freigabe einmalig ueber das
   Geolocation-Plugin angefordert, bevor der Watch startet.
   Im Browser ist der ganze Block wirkungslos: window.Capacitor existiert dort nicht,
   RT_nativeGeoState bleibt auf 'web' und es wird direkt weitergemacht. */
var RT_nativeGeoState='unbekannt';
function RT_nativeGeoPlugin(){
 try{
  var C=(typeof window!=='undefined')&&window.Capacitor;
  if(!C) return null;
  if(typeof C.isNativePlatform==='function'&&!C.isNativePlatform()) return null;
  var G=C.Plugins&&C.Plugins.Geolocation;
  return (G&&typeof G.requestPermissions==='function')?G:null;
 }catch(e){ return null; }
}
function RT_ensureNativeGeo(){
 var G=RT_nativeGeoPlugin();
 if(!G){ RT_nativeGeoState='web'; return Promise.resolve(true); }
 var step;
 try{ step=(typeof G.checkPermissions==='function')?G.checkPermissions():Promise.resolve(null); }
 catch(e){ step=Promise.resolve(null); }
 return Promise.resolve(step).then(function(st){
  var s=st&&(st.location||st.coarseLocation);
  if(s==='granted'){ RT_nativeGeoState='granted'; return true; }
  if(s==='denied'){ RT_nativeGeoState='denied'; return false; }
  return G.requestPermissions({permissions:['location']}).then(function(res){
   var r=res&&(res.location||res.coarseLocation);
   RT_nativeGeoState=(r==='granted')?'granted':(r||'unbekannt');
   return RT_nativeGeoState==='granted';
  });
 }).catch(function(e){
  /* Bei einem Plugin-Fehler nicht blockieren: der Watch wird trotzdem versucht,
     damit ein Fehler in der Bruecke nicht das ganze GPS lahmlegt. */
  RT_nativeGeoState='fehler'; return true;
 });
}
var RT_geoStarting=false, RT_geoDenied=false;
function RT_startGeoWatch(){
 if(RT_geoWatchId!==null||RT_geoStarting||RT_geoDenied||typeof navigator==='undefined'||!navigator.geolocation) return;
 RT_geoStarting=true;
 RT_ensureNativeGeo().then(function(ok){
  RT_geoStarting=false;
  if(RT_geoWatchId!==null) return;
  if(!ok){ RT_geoDenied=true; if(typeof RT_render==='function') RT_render(); return; }
  RT_startGeoWatchNow();
  if(typeof RT_render==='function') RT_render();
 });
}
function RT_startGeoWatchNow(){
 if(RT_geoWatchId!==null||typeof navigator==='undefined'||!navigator.geolocation) return;
 RT_geoWatchId=navigator.geolocation.watchPosition(function(pos){
  RT_curPos={lat:pos.coords.latitude,lng:pos.coords.longitude,acc:pos.coords.accuracy};
  RT_updDistanceDisplays();
  if(typeof RT_hfUpdateGps==='function') RT_hfUpdateGps();
 },function(err){},{enableHighAccuracy:true,maximumAge:2000,timeout:10000});
}
function RT_stopGeoWatch(){
 if(RT_geoWatchId!==null&&typeof navigator!=='undefined'&&navigator.geolocation) navigator.geolocation.clearWatch(RT_geoWatchId);
 RT_geoWatchId=null;
 RT_curPos=null;
}
function RT_gpsAccText(){
 if(RT_nativeGeoState==='denied') return 'Standortfreigabe für die App verweigert – in den Systemeinstellungen erlauben.';
 if(!RT_curPos) return 'Warte auf GPS-Signal…'+(RT_nativeGeoState==='fehler'?' (Standortfreigabe unklar)':'');
 return 'GPS-Genauigkeit: ±'+Math.round(RT_curPos.acc)+' m';
}
function RT_distToPoint(pt){
 if(!RT_curPos||!pt) return '–';
 return RT_fmtDist(RT_haversineM(RT_curPos.lat,RT_curPos.lng,pt.lat,pt.lng));
}
function rtSlugAttr(s){ return String(s).replace(/[^a-zA-Z0-9]/g,''); }
function RT_lastBallPos(rd,c){
 var pi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(rd):0;
 var p=rd.players[pi]||rd.players[0];
 if(!p||!p.pins||!p.pins[c]||!p.pins[c].length) return null;
 return p.pins[c][p.pins[c].length-1];
}
function RT_distListHtml(rd,c){
 var ref=RT_refFor(rd,c); if(!ref) return '';
 var lines=[];
 var seenTee={};
 rd.players.forEach(function(p){
  if(seenTee[p.tee]) return; seenTee[p.tee]=true;
  var pt=ref.tees&&ref.tees[p.tee];
  if(pt) lines.push('<div class="tr"><span>Abschlag ('+rtEsc(p.tee)+')</span><b id="dist-tee-'+rtSlugAttr(p.tee)+'">'+RT_distToPoint(pt)+'</b></div>');
 });
 if(ref.pin) lines.push('<div class="tr"><span>Loch</span><b id="dist-pin">'+RT_distToPoint(ref.pin)+'</b></div>');
 if(ref.mid) lines.push('<div class="tr"><span>Bahnmitte</span><b id="dist-mid">'+RT_distToPoint(ref.mid)+'</b></div>');
 var lastBall=RT_lastBallPos(rd,c);
 if(lastBall) lines.push('<div class="tr"><span>Letzte Balllage</span><b id="dist-ball">'+RT_distToPoint(lastBall)+'</b></div>');
 return lines.join('');
}
/* Feste Distanzen zwischen den gespeicherten Markierungen der eigenen Spur (im Gegensatz
   zu den Live-Werten darueber, die sich mit dem GPS mitbewegen). Je Lage: Laenge des Schlags
   dorthin, Entfernung vom eigenen Abschlag und Rest zum Loch. Straf- und Putt-Marker bleiben
   aussen vor - sie liegen meist auf derselben Stelle wie ein Schlag und wuerden die Liste
   nur verdoppeln; Bunker-Marker (B) sind echte Lagen und daher enthalten. */
function RT_shotDistRows(rd,c){
 var ref=RT_refFor(rd,c); if(!ref) return [];
 var pi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(rd):0;
 var pins=RT_pinsOf(rd,pi,c);
 var tee=RT_grabberTeePoint(rd,c);
 var pin=(ref.pin&&ref.pin.lat!==undefined&&ref.pin.lat!==null)?ref.pin:null;
 var rows=[], prev=tee?{lat:tee.lat,lng:tee.lng}:null, num=0;
 pins.forEach(function(p){
  var t=p.type||'shot';
  if(t!=='shot'&&t!=='sand') return;
  if(p.lat===undefined||p.lat===null) return;
  var lbl;
  if(t==='sand') lbl='B';
  else if(p.shot==='P') lbl='\u26f3';
  else if(p.shot===1) lbl='A';
  else { num=(typeof p.shot==='number')?p.shot:(num+1); lbl=String(num); }
  rows.push({
   label:lbl,
   /* Der Abschlag selbst ist kein Schlag - dort bleibt die Schlagweite leer. */
   shotLen:(lbl==='A')?null:(prev?RT_haversineM(prev.lat,prev.lng,p.lat,p.lng):null),
   fromTee:tee?RT_haversineM(tee.lat,tee.lng,p.lat,p.lng):null,
   toPin:pin?RT_haversineM(p.lat,p.lng,pin.lat,pin.lng):null
  });
  prev={lat:p.lat,lng:p.lng};
 });
 return rows;
}
function RT_shotDistListHtml(rd,c){
 var rows=RT_shotDistRows(rd,c);
 if(!rows.length) return '<div class="rt-cs" style="margin:0;">Noch keine Markierungen auf dieser Bahn.</div>';
 var grid='display:grid;grid-template-columns:24px 1fr 1fr 1fr;gap:2px 6px;align-items:center;';
 var h='<div style="'+grid+'font-size:10px;color:#8A9C8E;margin-bottom:2px;"><span></span><span>Schlag</span><span>ab Abschlag</span><span>zum Loch</span></div>';
 rows.forEach(function(r){
  h+='<div style="'+grid+'font-size:12px;color:#3C5546;padding:2px 0;">'
   +'<b style="color:#143522;">'+r.label+'</b>'
   +'<span>'+RT_fmtDist(r.shotLen)+'</span>'
   +'<span>'+RT_fmtDist(r.fromTee)+'</span>'
   +'<span>'+RT_fmtDist(r.toPin)+'</span>'
   +'</div>';
 });
 return h;
}
function RT_updDistanceDisplays(){
 var accEl=document.getElementById('gps-acc'); if(accEl) accEl.textContent=RT_gpsAccText();
 var listEl=document.getElementById('dist-list');
 if(listEl&&RT_round) listEl.innerHTML=RT_distListHtml(RT_round,RT_round.cur);
}

function RT_setTeeRef(teeName){
 if(typeof navigator==='undefined'||!navigator.geolocation){ RT_state.saveWarn='Geolocation nicht verfügbar.'; RT_render(); return; }
 navigator.geolocation.getCurrentPosition(function(pos){
  var rd=RT_round; if(!rd) return;
  var key=RT_courseKeyFromName(rd.courseName,rd);
  if(!key){ RT_state.saveWarn='Referenzpunkte können nur für bekannte Plätze gespeichert werden.'; RT_render(); return; }
  var co=RT_COURSES[key]; RT_ensureRefsObj(co);
  var num=rd.nums[rd.cur]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
  var entry=co.refs[nine][idx]||{tees:{},pin:null,mid:null};
  if(!entry.tees) entry.tees={};
  entry.tees[teeName]={lat:pos.coords.latitude,lng:pos.coords.longitude};
  co.refs[nine][idx]=entry;
  RT_persistRefs(key);
  RT_render();
 },function(err){ RT_state.saveWarn='Standort konnte nicht ermittelt werden: '+(err.message||err); RT_render(); },{enableHighAccuracy:true,timeout:10000});
}
function RT_clearTeeRef(teeName){
 var rd=RT_round; if(!rd) return;
 var key=RT_courseKeyFromName(rd.courseName,rd); if(!key) return;
 var co=RT_COURSES[key]; if(!co||!co.refs) return;
 var num=rd.nums[rd.cur]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
 var entry=co.refs[nine][idx]; if(!entry||!entry.tees) return;
 delete entry.tees[teeName];
 RT_persistRefs(key);
 RT_render();
}
function RT_setRefPoint(kind){
 if(typeof navigator==='undefined'||!navigator.geolocation){ RT_state.saveWarn='Geolocation nicht verfügbar.'; RT_render(); return; }
 navigator.geolocation.getCurrentPosition(function(pos){
  var rd=RT_round; if(!rd) return;
  var key=RT_courseKeyFromName(rd.courseName,rd);
  if(!key){ RT_state.saveWarn='Referenzpunkte können nur für bekannte Plätze gespeichert werden.'; RT_render(); return; }
  var co=RT_COURSES[key]; RT_ensureRefsObj(co);
  var num=rd.nums[rd.cur]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
  var entry=co.refs[nine][idx]||{tees:{},pin:null,mid:null};
  if(kind==='pin') entry.pin={lat:pos.coords.latitude,lng:pos.coords.longitude};
  else if(kind==='mid') entry.mid={lat:pos.coords.latitude,lng:pos.coords.longitude};
  co.refs[nine][idx]=entry;
  RT_persistRefs(key);
  RT_render();
 },function(err){ RT_state.saveWarn='Standort konnte nicht ermittelt werden: '+(err.message||err); RT_render(); },{enableHighAccuracy:true,timeout:10000});
}
function RT_clearRefPoint(kind){
 var rd=RT_round; if(!rd) return;
 var key=RT_courseKeyFromName(rd.courseName,rd); if(!key) return;
 var co=RT_COURSES[key]; if(!co||!co.refs) return;
 var num=rd.nums[rd.cur]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
 var entry=co.refs[nine][idx]; if(!entry) return;
 if(kind==='pin') entry.pin=null; else if(kind==='mid') entry.mid=null;
 RT_persistRefs(key);
 RT_render();
}
/* ==================== Ball-Tracking / Georeferenzierung (Phase 1-4) ==================== */

/* Phase 1: Manuelle Koordinaten-Eingabe (Google-Maps-Format "Breite, Laenge") */
function RT_parseCoord(str){
 if(!str) return null;
 var s=String(str).trim();
 var m=s.match(/^(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/);
 if(!m) return null;
 var lat=parseFloat(m[1]), lng=parseFloat(m[2]);
 if(isNaN(lat)||isNaN(lng)) return null;
 if(lat<-90||lat>90||lng<-180||lng>180) return null;
 return {lat:lat,lng:lng};
}

/* Gemeinsamer Zugriff auf den Referenzpunkte-Eintrag der aktuellen Bahn (legt bei Bedarf an) */
function RT_refEntryFor(rd,c,createIfMissing){
 var key=RT_courseKeyFromName(rd.courseName,rd); if(!key) return null;
 var co=RT_COURSES[key]; if(!co) return null;
 RT_ensureRefsObj(co);
 var num=rd.nums[c]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
 var entry=co.refs[nine][idx];
 if(!entry&&createIfMissing){ entry={tees:{},pin:null,mid:null}; co.refs[nine][idx]=entry; }
 if(entry&&!entry.tees) entry.tees={};
 return entry?{key:key,co:co,entry:entry,nine:nine,idx:idx}:null;
}
function RT_curRefCtx(){
 var rd=RT_round; if(!rd) return null;
 return RT_refEntryFor(rd,rd.cur,true);
}

function RT_setRefManual(kind,teeName,text){
 var rd=RT_round; if(!rd) return;
 var parsed=RT_parseCoord(text);
 if(!parsed){ RT_state.saveWarn='Ung\u00fcltiges Koordinatenformat. Bitte "Breite, L\u00e4nge" (z.B. 50.983245, 7.365198) einf\u00fcgen.'; RT_render(); return; }
 var ctx=RT_refEntryFor(rd,rd.cur,true); if(!ctx) return;
 var e=ctx.entry;
 var existingPx=null;
 if(kind==='pin'){ existingPx=e.pin&&e.pin.px; e.pin={lat:parsed.lat,lng:parsed.lng}; if(existingPx) e.pin.px=existingPx; }
 else if(kind==='mid'){ existingPx=e.mid&&e.mid.px; e.mid={lat:parsed.lat,lng:parsed.lng}; if(existingPx) e.mid.px=existingPx; }
 else if(kind==='tee'&&teeName){ existingPx=e.tees[teeName]&&e.tees[teeName].px; e.tees[teeName]={lat:parsed.lat,lng:parsed.lng}; if(existingPx) e.tees[teeName].px=existingPx; }
 RT_state.saveWarn='';
 RT_persistRefs(ctx.key);
 RT_render();
}

/* Phase 2: Kalibrierung ueber Bildklick */
function RT_calibPoints(ref){
 var pts=[];
 if(ref.pin&&ref.pin.px) pts.push(ref.pin);
 if(ref.mid&&ref.mid.px) pts.push(ref.mid);
 if(ref.tees){ Object.keys(ref.tees).forEach(function(k){ if(ref.tees[k]&&ref.tees[k].px) pts.push(ref.tees[k]); }); }
 return pts;
}
/* Aehnlichkeitstransformation (Rotation+Skalierung+Verschiebung) aus mind. 2 kalibrierten
   Punkten via komplexer Division - projiziert GPS-Koordinaten auf normierte Bildposition
   (Bruchteil 0..1 der jeweiligen .rt-holemap-Box, unabhaengig von tatsaechlicher Boxgroesse/Zoom). */
/* Seitenverhaeltnis (Breite/Hoehe) der Box, auf die sich die gespeicherten Bild-
   Fraktionen (px.x/px.y, jeweils 0..1) beziehen. Ohne diesen Faktor waeren x und y
   unterschiedlich skaliert und die Aehnlichkeitstransformation/Peilung im Bild
   verzerrt (Punkte abseits der Verbindungslinie der beiden Kalibrierpunkte wandern
   weg, Rotationswinkel stimmt nicht). Bevorzugt der beim Kalibrieren gemessene Wert. */
function RT_pxAspect(ref){
 if(ref&&ref.pxAspect&&!isNaN(ref.pxAspect)&&ref.pxAspect>0.1) return ref.pxAspect;
 try{
  var el=document.querySelector('.rt-holemap');
  if(el&&el.clientWidth>0&&el.clientHeight>0) return el.clientWidth/el.clientHeight;
 }catch(e){}
 var w=(typeof window!=='undefined'&&window.innerWidth)?(window.innerWidth-64):350;
 return Math.max(0.2,w/180);
}
function RT_computeCalib(ref){
 var pts=RT_calibPoints(ref);
 if(pts.length<2) return null;
 var a=pts[0], b=pts[1];
 var latRad=a.lat*Math.PI/180;
 var mPerDegLat=110540, mPerDegLng=111320*Math.cos(latRad);
 function toM(pt){ return {x:(pt.lng-a.lng)*mPerDegLng, y:-(pt.lat-a.lat)*mPerDegLat}; }
 var bm=toM(b);
 var gpsLen2=bm.x*bm.x+bm.y*bm.y;
 if(gpsLen2<1e-6) return null;
 var A=RT_pxAspect(ref);
 var pxDx=b.px.x-a.px.x, pxDy=(b.px.y-a.px.y)/A;
 var Tx=(pxDx*bm.x+pxDy*bm.y)/gpsLen2;
 var Ty=(pxDy*bm.x-pxDx*bm.y)/gpsLen2;
 /* Rotation der Birdiekarte relativ zu echt Nord: Peilung A->B in der Realitaet (GPS) vs.
    Peilung A->B im Bild (Pixel) vergleichen. Differenz = Grad, um die die Satellitenkarte
    gedreht werden muss, damit "oben" auf der Karte demselben Blickwinkel entspricht wie
    "oben" auf der Birdiekarte - macht Rotations-Automatik moeglich (siehe RT_initHoleMaps/
    RT_initHoleFullMap), sobald mind. 2 Referenzpunkte bildkalibriert sind. */
 var bearingReal=Math.atan2(bm.x,-bm.y)*180/Math.PI;
 var bearingImg=Math.atan2(pxDx,-pxDy)*180/Math.PI;
 var rotDeg=((bearingImg-bearingReal)%360+360)%360;
 return {originLat:a.lat, originLng:a.lng, originPx:{x:a.px.x,y:a.px.y}, mPerDegLat:mPerDegLat, mPerDegLng:mPerDegLng, Tx:Tx, Ty:Ty, A:A, rotDeg:rotDeg};
}
/* GPS-Ausrichtung fuer Plaetze OHNE Bild-Kalibrierung (kein px): dreht die Vollbild-
   Satellitenkarte so, dass die Fahne oben liegt. Herleitung: auf der nordausgerichteten
   Karte erscheint die Peilung Abschlag->Fahne (brTP, im Uhrzeigersinn von Nord) als
   Bildschirmwinkel brTP von oben. Die Karte wird per CSS um rotF im Uhrzeigersinn gedreht,
   ein Vektor wandert also auf brTP+rotF. Fahne oben => rotF = -brTP. Da die Vollbildkarte
   rotF = basePos.rot + RT_FULL_IMG_ROT anwendet, muss der zurueckgegebene Wert
   (-brTP - RT_FULL_IMG_ROT) sein - dieselbe Rolle wie rotDeg aus der Bildkalibrierung. */
function RT_gpsRotDeg(ref){
 if(!ref) return null;
 var A=null,B=null;
 if(ref.tees){ var ks=Object.keys(ref.tees); for(var i=0;i<ks.length;i++){ var t=ref.tees[ks[i]]; if(t&&t.lat!=null){ A=t; break; } } }
 if(ref.pin&&ref.pin.lat!=null) B=ref.pin; else if(ref.mid&&ref.mid.lat!=null) B=ref.mid;
 if(!A&&ref.mid&&ref.mid.lat!=null&&ref.pin&&ref.pin.lat!=null){ A=ref.mid; B=ref.pin; }
 if(!A||!B) return null;
 var latRad=A.lat*Math.PI/180;
 var mLat=110540, mLng=111320*Math.cos(latRad);
 var east=(B.lng-A.lng)*mLng, north=(B.lat-A.lat)*mLat;
 if(east*east+north*north<1) return null;
 var brTP=Math.atan2(east,north)*180/Math.PI;
 return ((((-brTP)-RT_FULL_IMG_ROT)%360)+360)%360;
}
function RT_projectLatLngToPx(calib,lat,lng){
 if(!calib) return null;
 var dxM=(lng-calib.originLng)*calib.mPerDegLng;
 var dyM=-(lat-calib.originLat)*calib.mPerDegLat;
 var px=calib.originPx.x+(calib.Tx*dxM-calib.Ty*dyM);
 var py=calib.originPx.y+((calib.Ty*dxM+calib.Tx*dyM)*(calib.A||1));
 return {x:px,y:py};
}
function RT_activeCalibLabel(){
 var a=RT_state.calibActive; if(!a) return null;
 if(a.kind==='pin') return 'Loch/Fahne';
 if(a.kind==='mid') return 'Bahnmitte';
 if(a.kind==='tee') return a.teeName;
 return null;
}
function RT_setActiveCalibPoint(kind,teeName){
 teeName=teeName||null;
 var cur=RT_state.calibActive;
 if(cur&&cur.kind===kind&&cur.teeName===teeName) RT_state.calibActive=null;
 else RT_state.calibActive={kind:kind,teeName:teeName};
 RT_render();
}
function RT_saveRefPx(kind,teeName,frac){
 var ctx=RT_curRefCtx(); if(!ctx) return;
 var e=ctx.entry;
 var pt=(kind==='pin')?e.pin:(kind==='mid')?e.mid:(kind==='tee'&&teeName)?e.tees[teeName]:null;
 if(!pt){ RT_state.saveWarn='Bitte zuerst GPS-Koordinaten f\u00fcr diesen Punkt setzen (GPS-Button oder manuell), bevor die Bildposition kalibriert wird.'; RT_render(); return; }
 pt.px={x:frac.x,y:frac.y};
 if(RT_state.calibPxAspect) e.pxAspect=RT_state.calibPxAspect;
 RT_state.calibActive=null;
 RT_persistRefs(ctx.key);
 RT_render();
}
/* Referenzpunkt-Marker auf der Birdiekarte direkt verschiebbar machen: bisher liess sich
   eine Bildposition nur neu SETZEN (Punkt aktivieren, dann ins Bild tippen). Jetzt kann
   jeder bereits gesetzte Marker gegriffen und gezogen werden. Gearbeitet wird mit Pointer-
   Events plus setPointerCapture, damit Maus und Touch denselben Pfad nehmen und der Zeiger
   den Marker auch bei schnellen Bewegungen nicht verliert. */
var RT_refDrag=null;
var RT_suppressImgClick=false;
function RT_refDragFrac(box,ev){
 var r=box.getBoundingClientRect();
 var fx=(ev.clientX-r.left)/r.width, fy=(ev.clientY-r.top)/r.height;
 return {x:Math.max(0,Math.min(1,fx)), y:Math.max(0,Math.min(1,fy)), aspect:(r.height>0?(r.width/r.height):null)};
}
function RT_refDragStart(ev,el){
 if(!el||!el.parentElement) return;
 ev.preventDefault(); ev.stopPropagation();
 RT_refDrag={el:el, box:el.parentElement, kind:el.getAttribute('data-kind'), teeName:(el.getAttribute('data-tee')||null), moved:false};
 try{ el.setPointerCapture(ev.pointerId); }catch(e){}
 el.style.cursor='grabbing'; el.style.zIndex='30';
 el.addEventListener('pointermove',RT_refDragMove);
 el.addEventListener('pointerup',RT_refDragEnd);
 el.addEventListener('pointercancel',RT_refDragEnd);
}
function RT_refDragMove(ev){
 if(!RT_refDrag) return;
 ev.preventDefault();
 RT_refDrag.moved=true;
 var f=RT_refDragFrac(RT_refDrag.box,ev);
 RT_refDrag.el.style.left=(f.x*100)+'%';
 RT_refDrag.el.style.top=(f.y*100)+'%';
}
function RT_refDragEnd(ev){
 if(!RT_refDrag) return;
 var d=RT_refDrag; RT_refDrag=null;
 try{
  d.el.removeEventListener('pointermove',RT_refDragMove);
  d.el.removeEventListener('pointerup',RT_refDragEnd);
  d.el.removeEventListener('pointercancel',RT_refDragEnd);
 }catch(e){}
 d.el.style.cursor='grab'; d.el.style.zIndex='';
 if(!d.moved) return;
 /* Nach einem Drag darf der nachfolgende click auf die Bildbox nicht noch einmal die
    Position des gerade aktiven Punkts setzen. */
 RT_suppressImgClick=true;
 setTimeout(function(){ RT_suppressImgClick=false; },350);
 var f=RT_refDragFrac(d.box,ev);
 RT_state.calibPxAspect=f.aspect;
 RT_saveRefPx(d.kind,d.teeName,{x:f.x,y:f.y});
}
function RT_refImgClick(ev){
 if(RT_suppressImgClick) return;
 var active=RT_state.calibActive; if(!active) return;
 var box=ev.currentTarget.getBoundingClientRect();
 RT_state.calibPxAspect=(box.height>0)?(box.width/box.height):null;
 var fx=(ev.clientX-box.left)/box.width;
 var fy=(ev.clientY-box.top)/box.height;
 fx=Math.max(0,Math.min(1,fx)); fy=Math.max(0,Math.min(1,fy));
 RT_saveRefPx(active.kind,active.teeName,{x:fx,y:fy});
}
function RT_calibMarkersHtml(ref){
 var h='';
 var active=RT_state.calibActive;
  function dot(pt,label,bg,fg,isActive,kind,teeName){
  if(!pt||!pt.px) return '';
  fg=fg||'#fff';
  var fx=Math.max(0.02,Math.min(0.98,pt.px.x))*100, fy=Math.max(0.02,Math.min(0.98,pt.px.y))*100;
  return '<div style="position:absolute;left:'+fx+'%;top:'+fy+'%;transform:translate(-50%,-50%);width:18px;height:18px;border-radius:50%;background:'+(isActive?'#BF5AF2':bg)+';color:'+(isActive?'#fff':fg)+';font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:auto;cursor:grab;touch-action:none;" data-kind="'+kind+'" data-tee="'+rtEsc(teeName||'')+'" onpointerdown="RT_refDragStart(event,this)" title="Zum Verschieben ziehen">'+label+'</div>';
 }
 h+=dot(ref.pin,'\u26f3','#FFFFFF','#fff', !!(active&&active.kind==='pin'),'pin',null);
 h+=dot(ref.mid,'M','#0A84FF','#fff', !!(active&&active.kind==='mid'),'mid',null);
 if(ref.tees) Object.keys(ref.tees).forEach(function(k){ var bg=RT_teeColorFor(k); h+=dot(ref.tees[k],'T',bg,RT_teeTextColorFor(bg), !!(active&&active.kind==='tee'&&active.teeName===k),'tee',k); });
 return h;
}

/* Phase 3: Schlag-fuer-Schlag-Tracking mit expliziten Schlagnummern (Luecken erlaubt) + "P" (eingelocht) */
/* Ab hier werden Balllagen/Markierungen PRO SPIELER gefuehrt. Frueher lief das gesamte
   Pin-System hart auf players[0]; dadurch teilten sich alle Mitspieler eine einzige
   Markierungsspur. Jeder Zugriff laeuft jetzt ueber RT_pinsOf(rd,pi,c). */
function RT_pinsOf(rd,pi,c){
 RT_ensurePins(rd);
 var p=rd.players[pi]||rd.players[0];
 if(!p.pins[c]) p.pins[c]=[];
 return p.pins[c];
}
function RT_ballShotSuggest(rd,c,pi){
 var pins=RT_pinsOf(rd,(pi===undefined||pi===null)?0:pi,c);
 var maxN=0;
 pins.forEach(function(p){ if(typeof p.shot==='number'&&p.shot>maxN) maxN=p.shot; });
 return maxN+1;
}
function RT_ballLabel(shot){
 if(shot==='P') return 'P';
 return String(shot);
}
/* Ein Button pro Spieler: setzt an der aktuellen GPS-Position die naechste Markierung.
   Der Schlagzaehler bleibt davon unberuehrt - gezaehlt wird allein ueber die +/- Stepper. Der erste Klick ist der Abschlag (A),
   danach 2..n. Liegt der Standort naeher als 8 m am Loch-Referenzpunkt, wird statt einer
   Nummer das Einlochen (Fahne) gesetzt - anders koennte der Button nicht wissen, dass die
   Bahn zu Ende ist. Bei Mitspielern ohne eigenes Geraet wird bewusst das GPS DIESES Geraets
   verwendet; die Zuordnung erfolgt trotzdem zum jeweiligen Spieler. */
var RT_HOLED_RADIUS_M=8;
/* Button-Beschriftung verraet, was der naechste Klick setzt: A beim ersten Klick, danach
   die naechste Nummer. Ob es stattdessen das Einlochen wird, entscheidet sich erst beim
   Klick anhand der dann gemessenen Position - deshalb steht das nicht im Label. */
function RT_markShotLabel(rd,c,pi){
 /* Vorschau der naechsten Positionsnummer: der naechste Marker landet an Position pins.length
    (0-basiert) und wird als pins.length+1 angezeigt; die allererste Markierung ist der Abschlag (A). */
 var _pl=RT_pinsOf(rd,(pi===undefined||pi===null)?0:pi,c).length;
 return '<img src="/hv/ortsmarkierung.png" alt="" style="width:18px;height:18px;border-radius:4px;vertical-align:-4px;margin-right:6px;">Markieren'+(_pl===0?' (A)':' ('+(_pl+1)+')');
}
function RT_markShot(pi){
 var rd=RT_round; if(!rd) return;
 if(!RT_canEditPlayer(rd,(typeof pi==='number'?pi:0))){RT_editBlock(rd);return;}
 var c=rd.cur;
 /* Anschlag (erste Markierung der Bahn = "A"): immer den hinterlegten Abschlag des Spielers
    verwenden, nicht die am Tee oft ungenaue GPS-Position. Fehlt der Abschlag, faellt es auf GPS zurueck. */
 if(RT_pinsOf(rd,(pi===undefined||pi===null)?0:pi,c).length===0){
  var _tp=RT_teePointForPlayer(rd,c,pi);
  if(_tp){
   RT_pinsOf(rd,pi,c).push({lat:_tp.lat,lng:_tp.lng,shot:1});
   RT_scAdjust(pi,1);
   rtSet(RT_ACT,rd); RT_syncActiveToSaved(); RT_render();
   return;
  }
 }
 if(typeof navigator==='undefined'||!navigator.geolocation){ RT_state.saveWarn='Geolocation nicht verf\u00fcgbar.'; RT_render(); return; }
 navigator.geolocation.getCurrentPosition(function(pos){
  var la=pos.coords.latitude, ln=pos.coords.longitude;
  var ref=RT_refFor(rd,c);
  var holed=false;
  if(ref&&ref.pin&&ref.pin.lat!==undefined&&ref.pin.lat!==null){
   holed=RT_haversineM(la,ln,ref.pin.lat,ref.pin.lng)<=RT_HOLED_RADIUS_M;
  }
  var pins=RT_pinsOf(rd,pi,c);
  pins.push({lat:la,lng:ln,shot:(holed?'P':RT_ballShotSuggest(rd,c,pi))});
  RT_scAdjust(pi,1);
  if(holed){ var _hp=rd.players[(typeof pi==='number'?pi:0)]; if(_hp) RT_pinCounterAdjust(_hp,c,'holed',1); }
  /* Backlog A2: Markieren setzt AUSSCHLIESSLICH die Position. Der Schlagzaehler wird hier
     jetzt gekoppelt: +1 pro Balllage. Die +/- Stepper zaehlen weiter nur die Zahl. Die fruehere
     Kopplung erzeugte gefuehlte Phantomschlaege, sobald nur eine Balllage markiert wurde.
     Die Marker-Nummerierung haengt an RT_ballShotSuggest() und damit an den vorhandenen
     Pins, nicht an p.sc - sie bleibt deshalb unveraendert korrekt. */
  rtSet(RT_ACT,rd);
  RT_syncActiveToSaved();
  RT_render();
 },function(err){ RT_state.saveWarn='Standort konnte nicht ermittelt werden: '+(err.message||err); RT_render(); },{enableHighAccuracy:true,timeout:10000});
}
/* Phase 4: Pin-Overlay auf statischem Lochbild */
function RT_teeColorFor(name){
 var n=(name||'').toLowerCase();
 if(n.indexOf('gelb')>=0) return '#E0B400';
 if(n.indexOf('rot')>=0) return '#D64550';
 if(n.indexOf('gr\u00fcn')>=0||n.indexOf('gruen')>=0) return '#1F8A4D';
 if(n.indexOf('blau')>=0) return '#0A84FF';
 if(n.indexOf('orange')>=0) return '#FF9F0A';
 if(n.indexOf('schwarz')>=0) return '#1B1B1B';
 if(n.indexOf('silber')>=0) return '#9AAB9E';
 if(n.indexOf('wei')>=0) return '#FFFFFF';
 return '#E9A820';
}
function RT_teeTextColorFor(bg){
 return bg==='#FFFFFF'?'#143522':'#fff';
}
/* Eindeutige Zeichen je Markierungsart - bewusst KEIN dreifaches "P":
   Abschlag = A (schwarz), Balllagen = 2..n (dunkelgruen), eingelocht = Fahne (schwarz),
   Strafschlag = S (rot), Bunker = B (gelb), Putt = P (gruen). */
/* Index des LETZTEN Putt-Markers einer Bahn - dieser wird als eingelocht (Fahne) dargestellt,
   sofern die Bahn nicht ohnehin schon einen expliziten Eingelocht-Marker hat. Rein visuell,
   aendert keine Zaehlung (Putts kommen aus dem Stepper). */
function RT_lastPuttIdx(pins){
 if(!pins||!pins.length) return -1;
 var hasHoled=false, last=-1;
 for(var i=0;i<pins.length;i++){ var k=RT_pinKind(pins[i]); if(k==='holed') hasHoled=true; else if(k==='putt') last=i; }
 return hasHoled?-1:last;
}
function RT_pinMarkerVisual(pt,idx,asHoled){
 var type=pt.type||'shot';
 if(type==='straf') return {label:'S', bg:'#D64550'};
 if(type==='sand') return {label:'B', bg:'#E0B400'};
 if(type==='putt') return asHoled ? {label:'\u26f3', bg:'#1B1B1B'} : {label:'P', bg:'#1F8A4D'};
 if(pt.shot==='P') return {label:'\u26f3', bg:'#1B1B1B'};
 /* Positionsbasierte Nummerierung: jede Markierung (Ball ODER Straf/Sand/Putt) besetzt eine
    Position im gemeinsamen pins-Array. Normale Schlaege zeigen ihre Position (idx+1); Straf/Sand/
    Putt zeigen S/B/P, besetzen aber ebenfalls eine Position -> Beispiel A,2,B,4,S,6,P,P.
    Die erste Markierung der Bahn ist der Abschlag (A). */
 if((idx||0)===0) return {label:'A', bg:'#1B1B1B'};
 return {label:String((idx||0)+1), bg:'rgba(20,53,34,.85)'};
}

function RT_pinsOverlayHtml(rd,c,rotComp,pi){
 var ref=RT_refFor(rd,c); if(!ref) return '';
 var calib=RT_computeCalib(ref); if(!calib) return '';
 var pins=RT_pinsOf(rd,(pi===undefined||pi===null)?0:pi,c);
 if(!pins.length) return '';
 var h='';
 var _lp=RT_lastPuttIdx(pins);
 pins.forEach(function(p,idx){
  var px=RT_projectLatLngToPx(calib,p.lat,p.lng); if(!px) return;
  var fx=Math.max(0.02,Math.min(0.98,px.x))*100, fy=Math.max(0.02,Math.min(0.98,px.y))*100;
  var vis=RT_pinMarkerVisual(p,idx,idx===_lp);
  h+='<div style="position:absolute;left:'+fx+'%;top:'+fy+'%;transform:translate(-50%,-50%) rotate('+(rotComp||0)+'deg);width:20px;height:20px;border-radius:50%;background:'+vis.bg+';color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,.35);border:1.5px solid #fff;pointer-events:none;">'+vis.label+'</div>';
 });
 return h;
}

/* Baustein fuer je einen Referenzpunkt (Tee/Pin/Mitte) in RT_refSetupHtml:
   GPS-Button (bestehend) + manuelles Koordinatenfeld (neu) + Bildposition-Kalibrierungs-Toggle (neu) */
function RT_refOverlayHtml(rd,c,rotComp){
 var ref=RT_refFor(rd,c); if(!ref) return '';
 var calib=RT_computeCalib(ref); if(!calib) return '';
 var h='';
 function dot(pt,label,bg,fg){
  if(!pt) return;
  fg=fg||'#fff';
  var px=RT_projectLatLngToPx(calib,pt.lat,pt.lng); if(!px) return;
  var fx=Math.max(0.02,Math.min(0.98,px.x))*100, fy=Math.max(0.02,Math.min(0.98,px.y))*100;
  h+='<div style="position:absolute;left:'+fx+'%;top:'+fy+'%;transform:translate(-50%,-50%) rotate('+(rotComp||0)+'deg);width:20px;height:20px;border-radius:50%;background:'+bg+';color:'+fg+';font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,.35);border:1.5px solid #fff;pointer-events:none;">'+label+'</div>';
 }
 dot(ref.pin,'\u26f3','#FFFFFF');
 dot(ref.mid,'M','#0A84FF');
 if(ref.tees) Object.keys(ref.tees).forEach(function(k){ var bg=RT_teeColorFor(k); dot(ref.tees[k],'T',bg,RT_teeTextColorFor(bg)); });
 return h;
}

function RT_refPointRowHtml(kind,teeName,label,pt,hasImg){
 var hasGps=!!pt;
 var hasPx=!!(pt&&pt.px);
 var active=!!(RT_state.calibActive&&RT_state.calibActive.kind===kind&&(kind!=='tee'||RT_state.calibActive.teeName===teeName));
 var setFn=kind==='tee' ? ("RT_setTeeRef('"+rtJsEsc(teeName)+"')") : ("RT_setRefPoint('"+kind+"')");
 var clearFn=kind==='tee' ? ("RT_clearTeeRef('"+rtJsEsc(teeName)+"')") : ("RT_clearRefPoint('"+kind+"')");
 var coordText=hasGps ? (pt.lat.toFixed(6)+', '+pt.lng.toFixed(6)) : '';
 var teeArg=teeName?rtJsEsc(teeName):'';
 var h='<div style="border:1px solid #E1EADA;border-radius:10px;padding:8px;margin-bottom:8px;'+(active?'background:#FBF3FF;border-color:#BF5AF2;':'background:#FBFDF9;')+'">';
 h+='<div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">'
   +'<button class="rt-btn3" style="flex:1;text-align:left;border-radius:8px;padding:6px 10px;background:'+(hasGps?'#EAF6EE':'#F1F6EC')+'" onclick="'+setFn+'">'+(hasGps?'\u2705 ':'\ud83d\udccd ')+rtEsc(label)+' hier setzen</button>'
   +(hasGps?('<button class="rt-btn3" onclick="'+clearFn+'">&#10005;</button>'):'')
   +'</div>';
 h+='<div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">'
   +'<input class="rt-inp" placeholder="Breite, L\u00e4nge (z.B. 50.983245, 7.365198)" value="'+rtEsc(coordText)+'" style="flex:1;font-size:12px;" onchange="RT_setRefManual(\''+kind+'\',\''+teeArg+'\',this.value)">'
   +'<button class="rt-btn3" style="flex-shrink:0;padding:6px 10px;" title="Aktuelle GPS-Position hier eintragen" onclick="'+setFn+'">\ud83d\udccd</button>'
   +'</div>';
 if((hasGps||hasPx)&&hasImg){
  h+='<button class="rt-btn3" style="width:100%;'+(active?'background:#BF5AF2;color:#fff;':(hasPx?'background:#EAF6EE;':'background:#F1F6EC;'))+'" onclick="RT_setActiveCalibPoint(\''+kind+'\',\''+teeArg+'\')">'
    +(hasPx?'\u2705 ':'')+'Bildposition '+(active?'aktiv \u2013 im Bild unten antippen':(hasPx?'gesetzt (neu setzen)':'setzen'))+'</button>';
 }
 h+='</div>';
 return h;
}

function RT_refSetupHtml(rd,c){
 var key=RT_courseKeyFromName(rd.courseName,rd);
 if(!key) return '<div class="rt-cs">Unbekannter Platz \u2013 keine Referenzpunkte m\u00f6glich.</div>';
 var co=RT_COURSES[key]; RT_ensureRefsObj(co);
 var num=rd.nums[c]; var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
 var ref=co.refs[nine][idx]||{tees:{},pin:null,mid:null};
 if(!ref.tees) ref.tees={};
 var rtImg=RT_holeImgFor(rd,c);
 var hasImg=!!rtImg;
 var h='<div style="margin-top:8px;">';
 if(!hasImg){ h+='<div class="rt-cs" style="margin-bottom:8px;">F\u00fcr diesen Platz ist kein Bahn-Bild hinterlegt \u2013 setze hier nur die GPS-Koordinaten der Punkte (Abschl\u00e4ge, Bahnmitte, Loch). Distanzen und Balllagen laufen dann \u00fcber die Satellitenkarte. \u201eBildposition setzen\u201c erscheint nur bei Pl\u00e4tzen mit hinterlegter Bahn-Grafik.</div>'; }
 RT_teeOrderResolved(co).map(function(ti){return co.tees[ti];}).forEach(function(t){
  h+=RT_refPointRowHtml('tee',t.name,t.name,ref.tees[t.name],hasImg);
 });
 h+=RT_refPointRowHtml('mid',null,'Bahnmitte',ref.mid,hasImg);
 h+=RT_refPointRowHtml('pin',null,'Loch/Fahne',ref.pin,hasImg);
 var _ppts=[];
 RT_teeOrderResolved(co).map(function(ti){return co.tees[ti];}).forEach(function(t){ _ppts.push(['tee',t.name,t.name]); });
 _ppts.push(['mid','','Bahnmitte']); _ppts.push(['pin','','Loch']);
 h+='<div style="margin-top:10px;padding-top:10px;border-top:1px solid #EEF3EA;">';
 h+='<button class="rt-btn2" onclick="RT_refsFromOSM()"'+(RT_state.osmBusy?' disabled':'')+' style="width:100%;margin-bottom:8px;">'+(RT_state.osmBusy?'Lade aus OpenStreetMap\u2026':'Referenzpunkte automatisch aus OpenStreetMap laden')+'</button>';
 if(RT_state.osmMsg) h+='<div class="rt-cs" style="margin-bottom:8px;color:#1F6E3C;background:#EAF5EE;padding:8px 10px;border-radius:8px;">'+rtEsc(RT_state.osmMsg)+'</div>';
 h+='<div class="rt-cs" style="margin-bottom:6px;">Auf Karte setzen: oben einen Punkt w\u00e4hlen, dann in die Karte tippen. Bereits gesetzte Punkte lassen sich direkt verschieben.</div>';
 h+='<div class="rt-chiprow" style="margin-bottom:8px;">';
 _ppts.forEach(function(pp){ var on=!!(RT_refPickActive&&RT_refPickActive.kind===pp[0]&&((pp[0]!=='tee')||RT_refPickActive.teeName===pp[1])); h+='<button class="rt-chip'+(on?' on':'')+'" onclick="RT_refPick(\''+pp[0]+'\',\''+(pp[1]?rtJsEsc(pp[1]):'')+'\')">'+rtEsc(pp[2])+'</button>'; });
 h+='</div>';
 h+='<div id="ref-edit-map" style="width:100%;height:280px;border-radius:12px;overflow:hidden;background:#EAF1E3;"></div>';
 h+='</div>';
 if(rtImg){
  h+='<div style="margin-top:8px;">';
  h+='<div class="rt-cs" style="margin-bottom:6px;">'+(RT_state.calibActive?('Bildposition f\u00fcr \u201e'+rtEsc(RT_activeCalibLabel())+'\u201c antippen'):'Zum Kalibrieren oben bei einem Punkt \u201eBildposition setzen\u201c antippen, dann hier im Bild antippen. Bereits gesetzte Marker lassen sich direkt im Bild verschieben. (Mind. 2 kalibrierte Punkte n\u00f6tig, damit Balllagen im Bild erscheinen.)')+'</div>';
  h+='<div class="rt-holemap" style="cursor:'+(RT_state.calibActive?'crosshair':'default')+';" '+(RT_state.calibActive?'onclick="RT_refImgClick(event)"':'')+'>'
    +'<img src="'+rtImg.url+'" alt="Lochkarte" style="width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;">'
    +RT_calibMarkersHtml(ref)
    +'</div>';
  h+='</div>';
 }
 h+='</div>';
 return h;
}
var RT_refEditMapInst=null, RT_refPickActive=null, RT_refEditView=null;
function RT_refPick(kind,teeName){
 teeName=teeName||null;
 var a=RT_refPickActive;
 if(a&&a.kind===kind&&a.teeName===teeName) RT_refPickActive=null; else RT_refPickActive={kind:kind,teeName:teeName};
 RT_render();
}
async function RT_refsFromOSM(){
 var rd=RT_round; if(!rd) return;
 var key=RT_courseKeyFromName(rd.courseName,rd);
 if(!key){ RT_state.osmMsg='Unbekannter Platz – kein automatischer Abruf möglich.'; RT_render(); return; }
 var co=RT_COURSES[key];
 var lat=co?co.lat:null, lon=co?(co.lon!=null?co.lon:co.lng):null;
 if(lat==null||lon==null){ RT_state.osmMsg='Für diesen Platz sind keine Koordinaten hinterlegt – bitte den Platz zuerst auf der Karte verknüpfen.'; RT_render(); return; }
 RT_state.osmBusy=true; RT_state.osmMsg='Suche Bahnen in OpenStreetMap…'; RT_render();
 try{
  var resp=await fetch('/api/holes?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon));
  var j=await resp.json();
  if(!resp.ok||!j||!j.holes) throw new Error((j&&j.error)||('HTTP '+resp.status));
  var holes=j.holes||[];
  if(!holes.length){ RT_state.osmBusy=false; RT_state.osmMsg='OpenStreetMap enthält für diesen Platz keine einzelnen Bahn-Geometrien. Bitte die Punkte manuell auf der Karte setzen.'; RT_render(); return; }
  RT_ensureRefsObj(co);
  var teeNames=RT_teeOrderResolved(co).map(function(ti){return co.tees[ti].name;});
  var set=0;
  holes.forEach(function(hh){
   var num=hh.hole; if(num<1||num>18) return;
   var nine=num<=9?'F':'B'; var idx=num<=9?num-1:num-10;
   var e=co.refs[nine][idx]; if(!e){ e={tees:{},pin:null,mid:null}; co.refs[nine][idx]=e; }
   if(!e.tees) e.tees={};
   if(hh.tee&&hh.tee.lat!=null){
    if(teeNames.length){ teeNames.forEach(function(tn){ var px=e.tees[tn]&&e.tees[tn].px; e.tees[tn]={lat:hh.tee.lat,lng:hh.tee.lng}; if(px)e.tees[tn].px=px; }); }
    else { var px0=e.tees['Standard']&&e.tees['Standard'].px; e.tees['Standard']={lat:hh.tee.lat,lng:hh.tee.lng}; if(px0)e.tees['Standard'].px=px0; }
   }
   if(hh.pin&&hh.pin.lat!=null){ var ppx=e.pin&&e.pin.px; e.pin={lat:hh.pin.lat,lng:hh.pin.lng}; if(ppx)e.pin.px=ppx; }
   set++;
  });
  RT_persistRefs(key);
  RT_state.osmBusy=false;
  RT_state.osmMsg=set+' von 18 Bahnen aus OpenStreetMap gesetzt (Abschlag + Fahne'+(teeNames.length>1?', alle Abschlagfarben':'')+'). Die Satellitenkarten richten sich nun automatisch von unten (Abschlag) nach oben (Fahne) aus. Feinjustierung: oben einen Punkt wählen und auf der Karte verschieben.';
  RT_render();
 }catch(err){
  RT_state.osmBusy=false;
  RT_state.osmMsg='Abruf fehlgeschlagen: '+((err&&err.message)||err)+'. Bitte die Punkte manuell auf der Karte setzen.';
  RT_render();
 }
}
function RT_refEditMarkers(){
 var ctx=RT_curRefCtx(); if(!ctx) return [];
 var e=ctx.entry; var out=[];
 if(e.tees) Object.keys(e.tees).forEach(function(k){ var pt=e.tees[k]; if(pt&&pt.lat!=null){ var bg=RT_teeColorFor(k); out.push({kind:'tee',teeName:k,lat:pt.lat,lng:pt.lng,label:'T',bg:bg,fg:RT_teeTextColorFor(bg)}); } });
 if(e.mid&&e.mid.lat!=null) out.push({kind:'mid',teeName:null,lat:e.mid.lat,lng:e.mid.lng,label:'M',bg:'#0A84FF',fg:'#fff'});
 if(e.pin&&e.pin.lat!=null) out.push({kind:'pin',teeName:null,lat:e.pin.lat,lng:e.pin.lng,label:'\u26f3',bg:'#143522',fg:'#fff'});
 return out;
}
function RT_initRefEditMap(){
 if(RT_refEditMapInst){ try{RT_refEditMapInst.remove();}catch(e){} RT_refEditMapInst=null; }
 var el=document.getElementById('ref-edit-map'); if(!el||!RT_round) return;
 if(typeof L==='undefined'){ el.style.display='none'; return; }
 var curKey=RT_holeMapKey(RT_round,RT_round.cur);
 var mk=RT_refEditMarkers();
 var center=null, zoom=17;
 if(RT_refEditView&&RT_refEditView.key===curKey){ center=[RT_refEditView.lat,RT_refEditView.lng]; zoom=RT_refEditView.zoom; }
 else if(mk.length){ var la=0,lo=0; mk.forEach(function(m){la+=m.lat;lo+=m.lng;}); center=[la/mk.length,lo/mk.length]; zoom=17; }
 else { var ck=RT_courseKeyFromName(RT_round.courseName,RT_round); var co=ck?RT_COURSES[ck]:null; if(co&&co.lat!=null){ center=[co.lat,co.lon]; zoom=16; } else if(RT_curPos){ center=[RT_curPos.lat,RT_curPos.lng]; zoom=16; } else { center=[51.2,10.4]; zoom=6; } }
 var map;
 try{
  map=L.map('ref-edit-map',{zoomControl:true,attributionControl:false}).setView(center,zoom);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,maxNativeZoom:19,noWrap:true,errorTileUrl:RT_TRANSPX}).addTo(map);
 }catch(e){ el.style.display='none'; return; }
 RT_refEditMapInst=map;
 RT_refEditView={key:curKey,lat:center[0],lng:center[1],zoom:zoom};
 mk.forEach(function(m){
  var icon=L.divIcon({className:'',iconSize:[22,22],iconAnchor:[11,11],html:'<div style="width:20px;height:20px;border-radius:50%;background:'+m.bg+';color:'+m.fg+';border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;">'+m.label+'</div>'});
  var mrk=L.marker([m.lat,m.lng],{icon:icon,draggable:true}).addTo(map);
  (function(mm){ mrk.on('dragend',function(ev){ var ll=ev.target.getLatLng(); RT_setRefManual(mm.kind,mm.teeName,ll.lat+', '+ll.lng); }); })(m);
 });
 map.on('click',function(ev){ if(!RT_refPickActive){ RT_state.saveWarn='Bitte oben zuerst einen Punkt w\u00e4hlen, dann in die Karte tippen.'; RT_render(); return; } var a=RT_refPickActive; RT_setRefManual(a.kind,a.teeName,ev.latlng.lat+', '+ev.latlng.lng); });
 map.on('moveend zoomend',function(){ try{ var cc=map.getCenter(); RT_refEditView={key:curKey,lat:cc.lat,lng:cc.lng,zoom:map.getZoom()}; }catch(e){} });
}
/* Einzelne Georghausen-Lochkarten wirken bei fester Kartenhoehe (180px) kleiner, weil ihr
   Quellbild ein hoeheres/schmaleres Seitenverhaeltnis hat als der Durchschnitt (Ursache: die
   Original-PDF-Seite hat die Bahn dort vertikaler angeordnet). Anstatt die Bilddateien zu
   beschneiden (Informationsverlust) wird hier gezielt hochskaliert - Faktor ist manuell/optisch
   austariert, nicht rein rechnerisch aus dem Seitenverhaeltnis abgeleitet, da z.B. Bahn 9 laut
   reiner Hoehen-Formel schon "gross genug" waere, aber auf Wunsch trotzdem angehoben wurde. */
var RT_HOLE_BIGGER={};
var RT_holeFullMapInst=null;
/* pi = Spieler, aus dessen Karte das Vollbild geoeffnet wurde. Ohne diese Angabe wuerden
   im Vollbild immer die Markierungen des ersten Spielers gezeigt. */
function RT_openHoleFull(url,title,pi){
 RT_state.fullPi=(pi===undefined||pi===null)?0:pi;
 var el=document.getElementById('hole-full'); if(!el)return;
 el.style.display='block';
 RT_renderHoleFull(url,title);
}
function RT_holeFullNav(delta){
 var rd=RT_round; if(!rd||!rd.nums) return;
 var n=rd.nums.length;
 var ni=rd.cur+delta;
 if(ni<0||ni>=n) return;
 var pi=RT_state.fullPi||0;
 RT_setHole(ni);
 var img=(typeof RT_holeImgFor==='function')?RT_holeImgFor(rd,ni):null;
 RT_openHoleFull(img?img.url:'','Bahn '+rd.nums[ni],pi);
}
function RT_renderHoleFull(url,title){
 var el=document.getElementById('hole-full'); if(!el)return;
 var rd=RT_round;
 var c=rd?rd.cur:null;
 var holeKey=rd?RT_holeMapKey(rd,c):null;
 var mapMode=!!(holeKey&&(RT_mapSat()||(typeof RT_holeImgFor==='function'&&!RT_holeImgFor(rd,c))));
 var fs=!!RT_state.holeFS;
 var _hbtn='background:#fff;border:1.5px solid #DCE7D4;border-radius:100px;padding:8px 14px;font-size:12px;font-weight:700;color:#3C5546;font-family:inherit;cursor:pointer;';
 var fsBtn='<button class="rt-btn3" style="'+_hbtn+'" onclick="RT_toggleHoleFS(\''+rtJsEsc(url)+'\',\''+rtJsEsc(title)+'\')">'+(fs?'Standard':'Vollbild')+'</button>';
 var _bcIcon='<img src="/hv/birdiekarte.png" alt="" style="width:18px;height:18px;border-radius:4px;margin-right:6px;vertical-align:-4px;">';var _satIcon='<img src="/hv/landkarte.png" alt="" style="width:18px;height:18px;border-radius:4px;margin-right:6px;vertical-align:-4px;">';var toggleBtn=holeKey?('<button class="rt-btn3" style="'+_hbtn+'" onclick="RT_toggleHoleView();RT_renderHoleFull(\''+rtJsEsc(url)+'\',\''+rtJsEsc(title)+'\')">'+(mapMode?_bcIcon+'Birdiekarte':_satIcon+'Satellitenkarte')+'</button>'):'';
 var topBar='<div style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 14px);left:50%;transform:translateX(-50%);z-index:3000;display:flex;gap:8px;">'+fsBtn+toggleBtn+'</div>';
 var body;
 if(mapMode){
  body='<div style="position:absolute;inset:0;overflow:hidden;"><div id="hole-full-map" style="position:absolute;width:160%;height:160%;left:-30%;top:-30%;transform-origin:center center;"></div></div>'+RT_grabberOverlayHtml();
 }else{
  var ov=(rd?RT_pinsOverlayHtml(rd,c,-RT_FULL_IMG_ROT,RT_state.fullPi||0):'');
  body='<div id="hole-full-frame" style="position:relative;transform-origin:center center;"><img src="'+url+'" alt="Lochkarte" onload="RT_fitRotatedImg(this)" style="display:block;width:100%;height:100%;">'+ov+'</div>';
 }
 if(RT_holeFullMapInst){ try{RT_holeFullMapInst.remove();}catch(e){} RT_holeFullMapInst=null; }
 var _ni=rd?rd.cur:0, _nn=(rd&&rd.nums)?rd.nums.length:0;
 function _navBtn(dir,dis,glyph){ return '<button onclick="RT_holeFullNav('+dir+')" '+(dis?'disabled ':'')+'style="width:40px;height:40px;border-radius:50%;background:#fff;border:1.5px solid #DCE7D4;font-size:20px;line-height:1;color:'+(dis?'#C2CFC0':'#3C5546')+';display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(20,53,34,.18);">'+glyph+'</button>'; }
 var navBar=rd?('<div style="position:absolute;left:50%;transform:translateX(-50%);bottom:calc(env(safe-area-inset-bottom,0px) + 40px);display:flex;align-items:center;gap:16px;z-index:3;">'+_navBtn(-1,_ni<=0,'\u2039')+_navBtn(1,_ni>=_nn-1,'\u203a')+'</div>'):'';
 el.innerHTML='<button class="rt-holefull-close" '+(fs?'style="z-index:3001;" ':'')+'onclick="RT_closeHoleFull()">&#10005;</button>'+topBar+(fs?'':'<div class="rt-holefull-title">'+rtEsc(title)+'</div>')+'<div class="rt-holefull-card"'+(fs?' style="top:0;left:0;right:0;bottom:0;border-radius:0;"':'')+'><div class="rt-holefull-imgwrap">'+body+'</div></div>'+(fs?'':navBar);
 if(mapMode) RT_initHoleFullMap();
 else { /* Birdiekarte: nach Layout sicher neu einpassen (Cache-Bilder feuern onload evtl. nicht nach Vollbild-Wechsel) */
  try{ var _im=el.querySelector('#hole-full-frame img'); if(_im){ requestAnimationFrame(function(){ try{ if(_im.complete && _im.naturalWidth) RT_fitRotatedImg(_im); }catch(e){} }); } }catch(e){}
 }
}
function RT_toggleHoleFS(url,title){ RT_state.holeFS=!RT_state.holeFS; RT_renderHoleFull(url,title); }
function RT_closeHoleFull(){
 var el=document.getElementById('hole-full'); if(!el)return;
 if(RT_holeFullMapInst){ try{RT_holeFullMapInst.remove();}catch(e){} RT_holeFullMapInst=null; }
 RT_holeFullGpsMarker=null; RT_state.holeFS=false; RT_state.spOn=false;
 el.style.display='none'; el.innerHTML='';
}
function RT_sizeRotatedMap(el,rotDeg){
 /* Ein gedrehtes Rechteck deckt seinen aufrechten Container nicht mehr vollstaendig ab -
    an den Ecken bleibt der helle Hintergrund stehen. Die feste Vorgabe von 160% reichte
    nur bei kleinen Winkeln: bei einem hochkanten Ausschnitt (H/W ~ 2,9 auf dem iPhone)
    projiziert schon eine Drehung um 15 Grad mehr Hoehe in die Breite, als 160% Breite
    abdecken (|cos15|+2,9*|sin15| = 1,72 > 1,6). Deshalb wird die noetige Groesse aus
    Winkel UND Seitenverhaeltnis berechnet:
      Breite = W*|cos| + H*|sin|   Hoehe = W*|sin| + H*|cos|
    Das Ergebnis liegt mittig ueber dem sichtbaren Bereich; der Ueberstand wird vom
    Wrapper (overflow:hidden) abgeschnitten. Muss VOR L.map() laufen, damit Leaflet die
    richtige Containergroesse kennt. Die kleine Karte braucht das nicht: ihr 500x500-px-
    Quadrat deckt mit seinem Inkreis die Bildschirmdiagonale bei jedem Winkel ab. */
 if(!el) return;
 var wrap=el.parentNode; if(!wrap) return;
 var W=wrap.clientWidth||0, H=wrap.clientHeight||0;
 if(!W||!H) return;
 var th=(rotDeg||0)*Math.PI/180;
 var ac=Math.abs(Math.cos(th)), as=Math.abs(Math.sin(th));
 var nw=Math.ceil(W*ac+H*as)+4, nh=Math.ceil(W*as+H*ac)+4;
 el.style.width=nw+'px'; el.style.height=nh+'px';
 el.style.left=Math.round((W-nw)/2)+'px'; el.style.top=Math.round((H-nh)/2)+'px';
}
var RT_fullSelPin=null,RT_fullTapIdx=null,RT_fullTapT=0;
function RT_pageConfirm(msg,onOk,okLabel,okColor){
 var ex=document.getElementById('rt-pageconfirm'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var ov=document.createElement('div'); ov.id='rt-pageconfirm';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,20,12,.42);display:flex;align-items:center;justify-content:center;padding:24px;';
 ov.innerHTML='<div style="background:#fff;border-radius:16px;max-width:340px;width:100%;padding:20px 20px 14px;box-shadow:0 12px 44px rgba(0,0,0,.32);font-family:Inter,-apple-system,sans-serif;">'+'<div style="font-size:15px;color:#143522;font-weight:600;line-height:1.35;margin-bottom:16px;">'+msg+'</div>'+'<div style="display:flex;gap:10px;justify-content:flex-end;">'+'<button id="rt-pc-cancel" style="padding:9px 16px;border-radius:10px;border:1px solid #DCE7D4;background:#fff;color:#3C5546;font-weight:600;font-size:14px;cursor:pointer;">Abbrechen</button>'+'<button id="rt-pc-ok" style="padding:9px 18px;border-radius:10px;border:none;background:'+(okColor||'#B03A3A')+';color:#fff;font-weight:700;font-size:14px;cursor:pointer;">'+(okLabel||'Löschen')+'</button>'+'</div></div>';
 document.body.appendChild(ov);
 function close(){ if(ov&&ov.parentNode) ov.parentNode.removeChild(ov); }
 ov.addEventListener('click',function(e){ if(e.target===ov) close(); });
 document.getElementById('rt-pc-cancel').onclick=close;
 document.getElementById('rt-pc-ok').onclick=function(){ close(); try{ onOk&&onOk(); }catch(e){} };
}
var RT_pinMoveMode=null;
/* ===== Einheitliches Marker-Kontextmenue (kleine + grosse Karte) =====
   Tap auf einen Marker -> Menue: Verschieben / Loeschen / Typ aendern (Schlag, Straf, Sand,
   Putt, Eingelocht). Die automatische Zuordnung passt selten - daher manuell aenderbar.
   Regel: ein Marker = ein Schlag. Umklassifizieren laesst die Gesamtschlagzahl unveraendert
   und tauscht nur den Straf-/Sand-/Putt-Zaehler; Loeschen entfernt Schlag + Zaehler. */
function RT_pinKind(pt){
 if(!pt) return 'ball';
 if(pt.type==='straf') return 'straf';
 if(pt.type==='sand') return 'sand';
 if(pt.type==='putt') return 'putt';
 if(pt.shot==='P') return 'holed';
 return 'ball';
}
function RT_pinCounterAdjust(p,c,kind,delta){
 if(kind==='straf'){ p.pe[c]=Math.max(0,(p.pe[c]||0)+delta); }
 else if(kind==='sand'){ p.sa[c]=Math.max(0,(p.sa[c]||0)+delta); }
 else if(kind==='putt'||kind==='holed'){ if(p.pu[c]===null||p.pu[c]===undefined){ p.pu[c]=delta>0?delta:0; } else { p.pu[c]=Math.max(0,p.pu[c]+delta); } }
}
function RT_pinApplyKind(pt,kind){
 delete pt.type; delete pt.shot;
 if(kind==='straf') pt.type='straf';
 else if(kind==='sand') pt.type='sand';
 else if(kind==='putt') pt.type='putt';
 else if(kind==='holed') pt.shot='P';
 else pt.shot=1;
}
function RT_pinReclass(pi,idx,kind){
 var rd=RT_round; if(!rd) return; var c=rd.cur; var p=rd.players[pi];
 var pins=RT_pinsOf(rd,pi,c); var pt=pins[idx]; if(!pt) return;
 var old=RT_pinKind(pt); if(old===kind){ RT_render(); return; }
 RT_pinCounterAdjust(p,c,old,-1);
 RT_pinCounterAdjust(p,c,kind,1);
 RT_pinApplyKind(pt,kind);
 rtSet(RT_ACT,rd); RT_syncActiveToSaved(); if(RT_holeFullMapInst){ try{ RT_redrawFullPins(); }catch(e){} } RT_render();
}
function RT_pinDelete(pi,idx){
 var rd=RT_round; if(!rd) return; var c=rd.cur; var p=rd.players[pi];
 var pins=RT_pinsOf(rd,pi,c); var pt=pins[idx]; if(!pt) return;
 var kind=RT_pinKind(pt); var isBall=(kind==='ball'||kind==='holed');
 RT_pinCounterAdjust(p,c,kind,-1);
 if(isBall||RT_roundAutoCount(rd)) RT_scAdjust(pi,-1);
 pins.splice(idx,1);
 RT_pinMoveMode=null;
 rtSet(RT_ACT,rd); RT_syncActiveToSaved(); if(RT_holeFullMapInst){ try{ RT_redrawFullPins(); }catch(e){} } RT_render();
}
function RT_pinStartMove(pi,idx){
 RT_pinMoveMode={pi:pi,idx:idx};
 RT_fullSelPin=(RT_holeFullMapInst&&(RT_holeFullMapInst._pi||0)===pi)?idx:null;
 if(RT_holeFullMapInst) { try{ RT_redrawFullPins(); }catch(e){} }
 RT_render();
}
function RT_pinMenu(pi,idx){
 var rd=RT_round; if(!rd) return;
 if(!RT_canEditPlayer(rd,(typeof pi==='number'?pi:0))){RT_editBlock(rd);return;}
 var pins=RT_pinsOf(rd,pi,rd.cur); var pt=pins[idx]; if(!pt) return;
 var cur=RT_pinKind(pt);
 var kinds=[['ball','Schlag'],['straf','Strafschlag'],['sand','Bunkerschlag'],['putt','Putt'],['holed','Eingelocht']];
 var ex=document.getElementById('rt-pinmenu'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var ov=document.createElement('div'); ov.id='rt-pinmenu';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,20,12,.42);display:flex;align-items:flex-end;justify-content:center;';
 var reclass=kinds.filter(function(k){return k[0]!==cur;}).map(function(k){
  return '<button class="rt-pm-kind" data-k="'+k[0]+'" style="flex:1 1 88px;padding:11px 8px;border-radius:10px;border:1px solid #DCE7D4;background:#fff;color:#143522;font-weight:700;font-size:13px;font-family:inherit;cursor:pointer;">'+k[1]+'</button>';
 }).join('');
 ov.innerHTML='<div style="background:#fff;border-radius:18px 18px 0 0;max-width:480px;width:100%;padding:16px 16px calc(env(safe-area-inset-bottom,0px) + 16px);box-shadow:0 -8px 32px rgba(0,0,0,.28);font-family:Inter,-apple-system,sans-serif;">'
  +'<div style="font-size:13px;color:#8A9C8E;font-weight:700;margin-bottom:12px;">Markierung bearbeiten</div>'
  +'<button id="rt-pm-move" style="width:100%;padding:12px;border-radius:11px;border:1px solid #DCE7D4;background:#F1F6EC;color:#143522;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;margin-bottom:14px;">📍 Verschieben</button>'
  +'<div style="font-size:11px;color:#8A9C8E;font-weight:600;margin-bottom:6px;">Ändern in:</div>'
  +'<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">'+reclass+'</div>'
  +'<div style="display:flex;gap:10px;">'
   +'<button id="rt-pm-cancel" style="flex:1;padding:11px;border-radius:11px;border:1px solid #DCE7D4;background:#fff;color:#3C5546;font-weight:600;font-size:14px;font-family:inherit;cursor:pointer;">Abbrechen</button>'
   +'<button id="rt-pm-del" style="flex:1;padding:11px;border-radius:11px;border:none;background:#B03A3A;color:#fff;font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;">Löschen</button>'
  +'</div>'
 +'</div>';
 document.body.appendChild(ov);
 function close(){ if(ov&&ov.parentNode) ov.parentNode.removeChild(ov); }
 ov.addEventListener('click',function(e){ if(e.target===ov) close(); });
 document.getElementById('rt-pm-cancel').onclick=close;
 document.getElementById('rt-pm-move').onclick=function(){ close(); RT_pinStartMove(pi,idx); };
 document.getElementById('rt-pm-del').onclick=function(){ close(); RT_pinDelete(pi,idx); };
 Array.prototype.forEach.call(ov.querySelectorAll('.rt-pm-kind'),function(b){ b.onclick=function(){ close(); RT_pinReclass(pi,idx,b.dataset.k); }; });
}
function RT_redrawFullPins(){
 var map=RT_holeFullMapInst; if(!map||!map._layer) return;
 var layer=map._layer, rotF=map._rotF||0, pi=map._pi||0;
 var rd=RT_round; if(!rd) return;
 layer.clearLayers();
 var pins=RT_pinsOf(rd,pi,rd.cur);
 var _lp=RT_lastPuttIdx(pins);
 pins.forEach(function(pt,idx){
  var sel=(RT_fullSelPin===idx);
  var vis=RT_pinMarkerVisual(pt,idx,idx===_lp);
  var ring=sel?'box-shadow:0 0 0 3px #FFD23F,0 1px 4px rgba(0,0,0,.45);':'box-shadow:0 1px 3px rgba(0,0,0,.3);';
  var icon=L.divIcon({className:'',html:'<div style="width:22px;height:22px;border-radius:50%;background:'+vis.bg+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;border:2px solid #fff;'+ring+'transform:rotate('+(-rotF)+'deg);">'+vis.label+'</div>',iconSize:[22,22],iconAnchor:[11,11]});
  var m=L.marker([pt.lat,pt.lng],{icon:icon,interactive:true}).addTo(layer);
  m.on('click',function(ev){
   if(ev.originalEvent) L.DomEvent.stopPropagation(ev.originalEvent);
   RT_pinMenu((RT_holeFullMapInst&&RT_holeFullMapInst._pi)||0,idx);
  });
 });
}
var RT_holeFullGpsMarker=null;
function RT_hfUpdateGps(){
 var map=RT_holeFullMapInst; if(!map||typeof L==='undefined'||!RT_curPos||RT_curPos.lat==null) return;
 try{
  if(!RT_holeFullGpsMarker){
   RT_holeFullGpsMarker=L.marker([RT_curPos.lat,RT_curPos.lng],{interactive:false,keyboard:false,icon:L.divIcon({className:'',iconSize:[22,22],iconAnchor:[11,11],html:'<div class="rt-gpspulse"></div>'})}).addTo(map);
  } else { RT_holeFullGpsMarker.setLatLng([RT_curPos.lat,RT_curPos.lng]); }
 }catch(e){}
}
function RT_hfAddPinAt(cx,cy){
 var map=RT_holeFullMapInst; if(!map||typeof L==='undefined') return;
 if(RT_pinMoveMode) return;
 var el=map._el, rotF=map._rotF||0, pi=map._pi||0;
 if(!RT_canEditPlayer(RT_round,pi)){ RT_editBlock(RT_round); return; }
 var ll=RT_correctedLatLng(map,el,rotF,cx,cy); if(!ll) return;
 var pins=RT_pinsOf(RT_round,pi,RT_round.cur);
 pins.push({lat:ll.lat,lng:ll.lng});
 RT_scAdjust(pi,1);
 rtSet(RT_ACT,RT_round); RT_syncActiveToSaved();
 RT_redrawFullPins();
 RT_pinMenu(pi,pins.length-1);
}
async function RT_initHoleFullMap(){
 var rd=RT_round; if(!rd) return;
 RT_fullSelPin=null;
 var c=rd.cur;
 var hfRef=RT_refFor(rd,c);
 var hfCalib=hfRef?RT_computeCalib(hfRef):null;
 var hfAutoRot=hfCalib?hfCalib.rotDeg:RT_gpsRotDeg(hfRef);
 var savedView=(rd.holeViews&&rd.holeViews[RT_holeMapKey(rd,c)])||RT_holeViews()[RT_holeMapKey(rd,c)];
 if(!RT_savedViewUsable(rd,c,savedView)) savedView=null;
 var basePos=null;
 if(savedView){ var hfRotVal=(savedView.rot!==undefined&&savedView.rot!==null&&savedView.rot!==0)?savedView.rot:(hfAutoRot!==null?hfAutoRot:(savedView.rot||0)); basePos={lat:savedView.lat, lng:savedView.lng, zoom:savedView.zoom, rot:hfRotVal}; }
 else{
  var hfCtr=RT_holeCenter(rd,c);
  if(hfCtr){ basePos={lat:hfCtr.lat, lng:hfCtr.lng, zoom:17, rot:(hfAutoRot!==null?hfAutoRot:0), fit:true}; }
  else{
   var ck=RT_courseKeyFromName(rd.courseName,rd);
   var courseObj=ck?RT_COURSES[ck]:null;
   var pos=null;
   if(courseObj){
    if(courseObj.lat!==undefined&&courseObj.lat!==null){ pos={lat:courseObj.lat, lon:courseObj.lon}; }
    else if(courseObj.address){ pos=await RT_geocode(courseObj.address); }
   }
   if(pos) basePos={lat:pos.lat, lng:pos.lon, zoom:17, rot:(hfAutoRot!==null?hfAutoRot:0)};
  }
 }
 if(rd!==RT_round||c!==RT_round.cur) return;
 var el=document.getElementById('hole-full-map'); if(!el||!basePos||typeof L==='undefined') return;
 if(RT_holeFullMapInst){ try{RT_holeFullMapInst.remove();}catch(e){} RT_holeFullMapInst=null; }
 RT_holeFullGpsMarker=null;
 var rotF=((((basePos.rot||0)+RT_FULL_IMG_ROT)%360)+360)%360;
 el.style.transform='rotate('+rotF+'deg)';
 RT_sizeRotatedMap(el,rotF);
 var map=L.map('hole-full-map',{zoomControl:false,attributionControl:true,zoomSnap:0.1}).setView([basePos.lat,basePos.lng],basePos.zoom);
 L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,maxNativeZoom:19,noWrap:true,errorTileUrl:RT_TRANSPX,attribution:'Tiles \u00a9 Esri'}).addTo(map);
 RT_holeFullMapInst=map;
 /* Leaflets eigenes Dragging MUSS hier ausgeschaltet werden: die Vollbildkarte laeuft ohne
    Kartensperre (RT_applyMapLock gilt nur fuer die kleinen Karten), sonst wuerde Leaflet
    parallel zu RT_setupRotDrag() weiter unkorrigiert - also schief - verschieben.
    Pinch-Zoom bleibt bewusst bei Leaflet. */
 try{ map.dragging.disable(); }catch(e){}
 RT_setupRotDrag('full',map,el,function(){ return rotF; },function(){ return false; });
 /* Die Bahn soll immer gleich im Bild liegen: eigener Abschlag unten in der Mitte, Fahne
    knapp unter dem oberen Rand. Weil das Kartenzentrum in der Mitte des sichtbaren
    Ausschnitts sitzt, ist der Mittelpunkt zwischen Abschlag und Fahne der richtige
    Zielpunkt; der Zoom ergibt sich aus Bahnlaenge und sichtbarer Hoehe. Ein gespeicherter
    Ausschnitt tritt dahinter zurueck - beim Spielen zaehlt der Blick die Bahn hinauf. */
 var tpFit=RT_teePinFit(rd,c,el);
 if(tpFit){ try{ map.setView([tpFit.lat,tpFit.lng],tpFit.zoom,{animate:false}); }catch(e){} }
 else if(basePos.fit){ try{ var ffpts=RT_holePoints(rd,c); if(ffpts.length>1) map.fitBounds(L.latLngBounds(ffpts).pad(0.45)); else map.setZoom(18); }catch(e){} }
 var layer=L.layerGroup().addTo(map);
 /* Referenzpunkte bleiben im Spielbetrieb ausgeblendet - auf den Spielerkarten sollen nur
    die selbst gesetzten Markierungen sichtbar sein (siehe RT_initHoleMaps). */
 RT_holeFullMapInst._layer=layer; RT_holeFullMapInst._rotF=rotF; RT_holeFullMapInst._el=el; RT_holeFullMapInst._pi=RT_state.fullPi||0;
 RT_redrawFullPins();
 RT_hfUpdateGps();
 (function(){ var lt=0,lx=0,ly=0,dx=0,dy=0,mv=false;
  el.addEventListener('pointerdown',function(ev){ dx=ev.clientX; dy=ev.clientY; mv=false; },true);
  el.addEventListener('pointermove',function(ev){ if(Math.abs(ev.clientX-dx)>10||Math.abs(ev.clientY-dy)>10) mv=true; },true);
  el.addEventListener('pointerup',function(ev){ if(mv){ lt=0; return; } var now=Date.now(); if(now-lt<350&&Math.abs(ev.clientX-lx)<30&&Math.abs(ev.clientY-ly)<30){ lt=0; RT_hfAddPinAt(ev.clientX,ev.clientY); } else { lt=now; lx=ev.clientX; ly=ev.clientY; } },true);
 })();
 map.on('click', function(e){
  if(RT_suppressMapClick && RT_suppressMapClick['full']) return;
  if(!RT_pinMoveMode) return;
  var oe=e.originalEvent, ll;
  if(oe&&typeof oe.clientX==='number'){ ll=RT_correctedLatLng(map,el,rotF,oe.clientX,oe.clientY); } else { ll=e.latlng; }
  if(!ll) return;
  var pp=RT_pinsOf(RT_round,RT_pinMoveMode.pi,RT_round.cur);
  if(pp[RT_pinMoveMode.idx]){ pp[RT_pinMoveMode.idx].lat=ll.lat; pp[RT_pinMoveMode.idx].lng=ll.lng; rtSet(RT_ACT,RT_round); RT_syncActiveToSaved(); }
  RT_pinMoveMode=null; RT_fullSelPin=null; RT_redrawFullPins(); RT_render();
 });
 RT_state.fullRot=rotF;
 RT_clearFullGrabber();
 /* Reihenfolge ist wichtig: erst invalidateSize, dann zeichnen. Andersherum bekommt der
    SVG-Renderer der Boegen einen Ursprung, der nach der Groessenaenderung nicht mehr passt. */
 setTimeout(function(){
  try{map.invalidateSize();}catch(e){}
  if(RT_state.grabberOn&&RT_state.grabberOn[RT_holeMapKey(rd,c)]) RT_setupFullGrabber();
  if(RT_state.radarOn&&RT_state.radarOn[RT_holeMapKey(rd,c)]){ RT_radarBuildOverlay(); RT_radarAttach(map); RT_wxFetch(false); RT_radarZoomOut(map); }
  if(RT_state.gvOn&&RT_state.gvOn[RT_holeMapKey(rd,c)]){ RT_gvBuildOverlay(); RT_gvAttach(); }
  if(RT_state.spOn){ try{ RT_openShotPlan(); }catch(e){} }
 },80);
}
/* Die Birdiekarten-Quellbilder liegen im Querformat vor und werden in der Vollbild-
   ansicht per CSS um -90 Grad gedreht dargestellt (RT_fitRotatedImg). Diese reine
   ANZEIGE-Drehung muss ueberall mitgerechnet werden: die Satellitenkarte im Vollbild
   wird zusaetzlich um denselben Winkel gedreht (damit sie wie die Birdiekarte liegt),
   und die Marker-Beschriftungen werden um den Gegenwinkel zurueckgedreht (damit sie
   lesbar bleiben). */
var RT_FULL_IMG_ROT=-90;
function RT_fitRotatedImg(img){
 var frame=img.parentElement;
 var wrap=(frame&&frame.id==='hole-full-frame')?frame.parentElement:img.parentElement;
 var vw=(wrap&&wrap.clientWidth)?wrap.clientWidth-16:window.innerWidth-32;
 var vh=(wrap&&wrap.clientHeight)?wrap.clientHeight-16:window.innerHeight-110;
 var iw=img.naturalWidth||1, ih=img.naturalHeight||1;
 var scale=Math.min(vw/ih, vh/iw);
 var dispW=Math.round(iw*scale), dispH=Math.round(ih*scale);
 if(frame&&frame.id==='hole-full-frame'){
  frame.style.width=dispW+'px'; frame.style.height=dispH+'px';
  frame.style.transform='rotate(-90deg)';
 }else{
  img.style.width=dispW+'px'; img.style.height=dispH+'px';
  img.style.transform='rotate(-90deg)';
 }
}
async function RT_avatarFile(ev){
 var f=ev.target.files&&ev.target.files[0]; if(!f||!sb||!sbUser)return;
 var reader=new FileReader();
 reader.onload=function(e){
  var img=new Image();
  img.onload=function(){
   var maxW=400;
   var scale=Math.min(1,maxW/img.width);
   var w=Math.round(img.width*scale), h=Math.round(img.height*scale);
   var cv=document.createElement('canvas'); cv.width=w; cv.height=h;
   var ctx=cv.getContext('2d'); ctx.drawImage(img,0,0,w,h);
   if(!cv.toBlob){ return; }
   cv.toBlob(async function(blob){
    if(!blob) return;
    RT_state.avatarBusy=true; RT_render();
    try{
     var path=sbUser.id+'-'+Date.now()+'.jpg';
     var up=await sb.storage.from('avatars').upload(path,blob,{contentType:'image/jpeg',upsert:true});
     if(up.error)throw up.error;
     var pub=sb.storage.from('avatars').getPublicUrl(path);
     var r=await sb.auth.updateUser({data:{avatar_url:pub.data.publicUrl}});
     if(r.error)throw r.error;
     sbUser=r.data.user;
    }catch(err){
     RT_state.nameMsg='Profilbild-Upload fehlgeschlagen: '+(err.message||err);
    }
    RT_state.avatarBusy=false; RT_render();
   },'image/jpeg',0.85);
  };
  img.src=e.target.result;
 };
 reader.readAsDataURL(f);
}
async function RT_nameSave(){
 if(!sb||!sbUser)return;
 var name=(document.getElementById('usr-name').value||'').trim();
 try{
  var r=await sb.auth.updateUser({data:{display_name:name}});
  if(r.error)throw r.error;
  sbUser=r.data.user;
  RT_state.nameMsg='Gespeichert.';
 }catch(e){ RT_state.nameMsg='Fehler: '+(e.message||e); }
 RT_render();
}
async function RT_pwSave(){
 if(!sb||!sbUser)return;
 var p1=document.getElementById('usr-pw1').value, p2=document.getElementById('usr-pw2').value;
 if(p1.length<6){ RT_state.pwMsg='Mindestens 6 Zeichen.'; RT_render(); return; }
 if(p1!==p2){ RT_state.pwMsg='Passw\u00f6rter stimmen nicht \u00fcberein.'; RT_render(); return; }
 try{
  var r=await sb.auth.updateUser({password:p1});
  if(r.error)throw r.error;
  RT_state.pwMsg='Passwort ge\u00e4ndert.';
 }catch(e){ RT_state.pwMsg='Fehler: '+(e.message||e); }
 RT_render();
}

async function RT_deleteAccount(){
 if(!sb||!sbUser)return;
 if(RT_state.ask!=='delaccount'){ RT_state.ask='delaccount'; RT_state.delAccMsg=''; RT_render(); return; }
 RT_state.ask='';
 RT_state.delAccBusy=true; RT_render();
 try{
  var s=await sb.auth.getSession();
  var token=s.data&&s.data.session&&s.data.session.access_token;
  if(!token) throw new Error('Keine aktive Sitzung gefunden.');
  var r=await fetch('/api/account/delete',{method:'POST',headers:{'Authorization':'Bearer '+token}});
  var j={}; try{ j=await r.json(); }catch(e){}
  if(!r.ok) throw new Error(j.error||('Fehler ('+r.status+')'));
  try{await sb.auth.signOut();}catch(e){}
  sbUser=null;
  RT_clearLocalSyncedData();
  try{ localStorage.removeItem(RT_LAST_UID_KEY); localStorage.removeItem(AG_KEY); }catch(e){}
  RT_state.delAccBusy=false;
  RT_state.delAccMsg='';
  RT_state.screen='home';
  RT_render();
  AG_render();
 }catch(e){
  RT_state.delAccBusy=false;
  RT_state.delAccMsg='L\u00f6schen fehlgeschlagen: '+(e.message||e);
  RT_render();
 }
}

var RT_KEY='golflog_runden_v1', RT_ACT='golflog_aktiv_v1', RT_AUTOCOUNT_KEY='golflog_autocount_v1', RT_CUSTOM_KEY='golflog_custom_courses_v1', RT_SIOV_KEY='golflog_si_overrides_v1', RT_PAROV_KEY='golflog_par_overrides_v1', RT_NAMEOV_KEY='golflog_name_overrides_v1', RT_TEEOV_KEY='golflog_tee_overrides_v1', RT_PHOTOOV_KEY='golflog_photo_overrides_v1', RT_ADDROV_KEY='golflog_addr_overrides_v1', RT_PLAYERSAV_KEY='golflog_saved_players_v1', RT_HISTDEL_KEY='golflog_deleted_historical_v1', RT_OWNHI_KEY='golflog_own_hi_v1', RT_REFOV_KEY='golflog_ref_overrides_v1', RT_DISTUNIT_KEY='golflog_dist_unit_v1', RT_TEEORDOV_KEY='golflog_tee_order_v1', RT_PLATZORDER_KEY='golflog_platz_order_v1';
var RT_ONBOARD_KEY='fp_onboard_v1', RT_LOCALNAME_KEY='fp_local_name_v1', RT_CHECKDISMISS_KEY='fp_checklist_dismiss_v1', RT_TRIALNUDGE_KEY='fp_trialnudge_v1';
var RT_HIDPLAY_KEY='golflog_hidden_players_v1';
/* Eigenes Handicap des Kontoinhabers: bei angemeldeten Nutzern in sbUser.user_metadata.handicap
   (geräteübergreifend synchron, analog zu display_name/avatar_url), sonst lokal als Fallback.
   Ersetzt den frueher hart codierten Standardwert 54 ueberall dort, wo eine neue Runde fuer den
   Kontoinhaber ("Mark"-Standardspieler) angelegt wird - siehe RT_defSu(). */
function RT_ownHandicapStored(){
 var mv=sbUser&&sbUser.user_metadata?sbUser.user_metadata.handicap:undefined;
 if(mv!==undefined&&mv!==null&&mv!=='') return mv;
 var local=rtGet(RT_OWNHI_KEY);
 return (local!==null&&local!==undefined)?local:'';
}
function RT_ownHandicap(){
 var v=RT_ownHandicapStored();
 var num=parseFloat(v);
 return (v!==''&&!isNaN(num))?num:54;
}
/* Anzeigename des angemeldeten Kontoinhabers fuer den Standardspieler bei einer neuen Runde -
   ersetzt den zuvor hart codierten Namen "Mark", der bei JEDEM Konto (auch bei anderen Nutzern
   wie einem eingeladenen Mitspieler) fest als Spieler-1-Name vorbelegt war. Faellt zurueck auf
   den lokalen Teil der E-Mail-Adresse, wenn kein Anzeigename gesetzt ist, und auf "Ich" im
   Gastmodus (nicht angemeldet). */
function RT_myDisplayName(){
 if(sbUser){
  var dn=sbUser.user_metadata&&sbUser.user_metadata.display_name;
  if(dn&&dn.trim())return dn.trim();
  if(sbUser.email)return sbUser.email.split('@')[0];
 }
 var _ln=rtGet(RT_LOCALNAME_KEY); if(_ln&&(''+_ln).trim()) return (''+_ln).trim();
 return 'Ich';
}
var RT_SELFNAME_KEY='golflog_selfname_decisions_v1';
function RT_selfNameDecisions(){ return rtGet(RT_SELFNAME_KEY)||{}; }
function RT_setSelfNameDecision(name,val){
 var d=RT_selfNameDecisions(); d[name]=val; rtSet(RT_SELFNAME_KEY,d); RT_render();
}
function RT_normName(s){ return (s||'').trim().toLowerCase(); }
/* Erkennt AEHNLICHE (nicht exakte) Namensuebereinstimmungen mit dem eigenen Anzeigenamen -
   z.B. "Mark" vs. "Mark Maetschke". Grundlage: gleicher erster Vorname ODER Teilstring-
   Enthaltensein in eine der beiden Richtungen. Bewusst KEIN automatischer Ausschluss (Verwechs-
   lungsgefahr bei echten Namensvettern) - stattdessen Nachfragelogik ueber RT_needsSelfConfirm(). */
function RT_namesLikelySame(a,b){
 var na=RT_normName(a), nb=RT_normName(b);
 if(!na||!nb) return false;
 if(na===nb) return true;
 var fa=na.split(' ')[0], fb=nb.split(' ')[0];
 if(fa&&fb&&fa===fb) return true;
 if(na.indexOf(nb)>=0||nb.indexOf(na)>=0) return true;
 return false;
}
/* True, wenn dieser gespeicherte Name als "ich selbst" gilt - entweder exakt identisch mit dem
   aktuellen Anzeigenamen, oder vom Nutzer bereits explizit als "das bin ich" bestaetigt (siehe
   RT_confirmSelfName). Wird genutzt, um Kontakte aus der Einladen-/Mitspieler-Auswahl herauszu-
   filtern, damit man sich nicht selbst einladen kann. */
function RT_isSelfName(name){
 var nn=RT_normName(name); if(!nn) return false;
 if(nn===RT_normName(RT_myDisplayName())) return true;
 /* Auch die eigene Konto-E-Mail (voll und der Teil vor @) gilt als ich: bei Magic-Link-
    Registrierung ohne Anzeigename wird der E-Mail-Praefix als Spielername genutzt, sodass man
    sich sonst selbst in der Einladen-Liste sieht. */
 if(sbUser&&sbUser.email){ var em=RT_normName(sbUser.email); if(nn===em||nn===RT_normName(sbUser.email.split('@')[0])) return true; }
 /* Namen, unter denen ICH in fremden Runden als Spieler verknuepft bin (RT_myPlayerNameByOwner),
    sind ebenfalls ich - deckt den Fall ab, dass mein Spielername eine E-Mail ist. */
 try{ if(RT_myPlayerNameByOwner){ for(var k in RT_myPlayerNameByOwner){ if(RT_normName(RT_myPlayerNameByOwner[k])===nn) return true; } } }catch(e){}
 var decisions=RT_selfNameDecisions();
 return decisions[name]==='self';
}
/* True, wenn ein gespeicherter Name AEHNLICH (aber nicht exakt gleich) dem eigenen Anzeigenamen
   ist und noch keine Entscheidung (self/other) dazu getroffen wurde - loest dann eine Rueckfrage
   in der UI aus (siehe RT_selfConfirmHtml), statt stillschweigend zu entscheiden. */
function RT_needsSelfConfirm(name){
 if(RT_normName(name)===RT_normName(RT_myDisplayName())) return false;
 var decisions=RT_selfNameDecisions();
 if(decisions[name]) return false;
 return RT_namesLikelySame(name, RT_myDisplayName());
}
function RT_confirmSelfName(name,val){
 RT_setSelfNameDecision(name,val);
}
/* Baut die Rueckfrage-Box fuer einen Namen mit Verwechslungsgefahr - gemeinsam genutzt von
   RT_rUser() (Mitspieler einladen) und RT_rSetup() (Kontakte-Chips). */
function RT_selfConfirmHtml(name){
 return '<div style="margin-top:8px;padding:10px 12px;background:#FFF6E2;border:1px solid #EFDDB0;border-radius:12px;">'+
  '<div style="font-size:12px;color:#7A5C00;margin-bottom:8px;">Ist "'+rtEsc(name)+'" eigentlich du selbst (\u00e4hnelt deinem Anzeigenamen "'+rtEsc(RT_myDisplayName())+'", ist aber nicht exakt gleich)?</div>'+
  '<div style="display:flex;gap:8px;">'+
   '<button class="rt-btn2" style="flex:1;padding:8px;font-size:12px;" onclick="RT_confirmSelfName(\''+rtJsEsc(name)+'\',\'self\')">Ja, das bin ich</button>'+
   '<button class="rt-btn2" style="flex:1;padding:8px;font-size:12px;" onclick="RT_confirmSelfName(\''+rtJsEsc(name)+'\',\'other\')">Nein, andere Person</button>'+
  '</div></div>';
}
async function RT_hcpSave(){
 var raw=(document.getElementById('usr-hcp').value||'').trim().replace(',','.');
 if(raw!==''){
  var num=parseFloat(raw);
  if(isNaN(num)||num<-10||num>54){ RT_state.hcpMsg='Bitte eine Zahl zwischen -10 und 54 eingeben.'; RT_render(); return; }
 }
 var val=raw===''?null:parseFloat(raw);
 rtSet(RT_OWNHI_KEY,val);
 if(sb&&sbUser){
  try{
   var r=await sb.auth.updateUser({data:{handicap:val}});
   if(r.error)throw r.error;
   sbUser=r.data.user;
   RT_state.hcpMsg='Gespeichert.';
  }catch(e){ RT_state.hcpMsg='Fehler: '+(e.message||e); }
 }else{
  RT_state.hcpMsg='Nur lokal gespeichert (nicht angemeldet).';
 }
 RT_render();
}
var RT_siOverrides=null;
function RT_getSiOverrides(){ if(!RT_siOverrides) RT_siOverrides=rtGet(RT_SIOV_KEY)||{}; return RT_siOverrides; }
var RT_parOverrides=null;
function RT_getParOverrides(){ if(!RT_parOverrides) RT_parOverrides=rtGet(RT_PAROV_KEY)||{}; return RT_parOverrides; }
var RT_MEM={};
function rtSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){RT_MEM[k]=v;} if(!RT_LRN_pulling&&typeof k==='string'&&k.indexOf('fp_lrn_')===0){try{RT_LRN_cloudPush();}catch(e){}} if(typeof k==='string'&&k==='fp_bag'){try{if(typeof RT_bagCloudPush==='function')RT_bagCloudPush();}catch(e){}}}
function rtGet(k){try{var r=localStorage.getItem(k);if(r!==null)return JSON.parse(r);}catch(e){}return RT_MEM[k]!==undefined?RT_MEM[k]:null;}
function rtDel(k){try{localStorage.removeItem(k);}catch(e){}delete RT_MEM[k];}
function rtEsc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function rtJsEsc(s){return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
/* Dezimalwerte (v.a. Course Rating) in reinen Text-/Anzeigekontexten immer mit Komma statt
   Punkt darstellen - deutsche Schreibweise. NICHT auf <input type="number">-Felder anwenden,
   deren value-Attribut laut HTML5-Spec zwingend einen Punkt braucht; der Browser zeigt dort
   ohnehin automatisch die lokale Schreibweise an. */
function rtDe(v){ return (v===null||v===undefined||v==='')?v:String(v).replace('.',','); }

var RT_HIDDEN_KEY='golflog_hidden_presets';
function RT_hiddenPresets(){ return rtGet(RT_HIDDEN_KEY)||[]; }
/* Frueher ueber HV_D-Halbcodes (RT_PRESET_HALVES) UND exakten Namensvergleich geprueft - beides
   war zerbrechlich: sobald der in einer Runde gespeicherte courseName nicht EXAKT dem vollen
   Preset-Namen entsprach (z.B. "Gut Waldhof" vs. dem hinterlegten "GC Hamburg Gut Waldhof
   (A-B)"), erkannte die Pruefung eine tatsaechlich gespielte Runde nicht - ein einmal
   ausgeblendetes Preset (RT_hidePreset) konnte dann nie wieder automatisch auftauchen, selbst
   wenn dort weiter gespielt wurde. Nutzt jetzt dieselbe robuste, bereits an anderer Stelle
   bewaehrte Namensaufloesung wie RT_courseKeyFromName (exakter Match, normalisierter Match,
   Teilstring-Fallback in beide Richtungen). */
function RT_isPlayed(key){
 var saved=rtGet(RT_KEY)||[];
 return saved.some(function(rd){ return RT_courseKeyFromName(rd.courseName,rd)===key; });
}
function RT_deleteCustomCourse(key){
 var custom=RT_loadCustomCourses();
 if(!custom[key])return;
 delete custom[key];
 rtSet(RT_CUSTOM_KEY,custom);
 delete RT_COURSES[key];
 sbDelCourse(key);
 RT_render();
}
function RT_removeCoursePick(key){
 if(RT_loadCustomCourses()[key]){ RT_deleteCustomCourse(key); }
 else { RT_hidePreset(key); }
}
function RT_hidePreset(key){
 var hidden=RT_hiddenPresets();
 if(hidden.indexOf(key)===-1){ hidden.push(key); rtSet(RT_HIDDEN_KEY,hidden); }
 RT_render();
}

/* Platz-Presets. CR/SL sind Startwerte und im Setup je Spieler editierbar. */
var RT_COURSES={
 georg:{name:'Georghausen', address:'Georghausen 8, 51789 Lindlar',
  nines:{
   F:{lbl:'Front 9 (1\u20139)', nums:[1,2,3,4,5,6,7,8,9], par:[4,4,5,4,3,4,4,4,5], si:[2,7,1,4,8,6,3,9,5], si18:[3,9,1,7,15,13,5,17,11]},
   B:{lbl:'Back 9 (10\u201318)', nums:[10,11,12,13,14,15,16,17,18], par:[3,5,4,4,3,4,3,5,4], si:[8,6,5,4,7,3,9,2,1], si18:[16,10,14,8,12,6,18,4,2]}
  },
  tees:[
   {name:'Gelb (Herren)', cr:{F:36.2,B:35.4,A:71.1}, sl:{F:138,B:130,A:135}},
   {name:'Rot M (Damen, kurz)', cr:{F:33.9,B:33.9,A:67.8}, sl:{F:125,B:125,A:125}},
   {name:'Rot L (Damen)', cr:{F:36.5,B:36.9,A:73.4}, sl:{F:130,B:134,A:132}}
  ]},
 waldhof:{name:'GC Hamburg Gut Waldhof (A\u2013B)', address:'Am Waldhof 3, 24629 Kisdorf', lat:53.81383, lon:10.08614,
  nines:{
   F:{lbl:'A-Platz (1\u20139)', nums:[1,2,3,4,5,6,7,8,9], par:[4,4,3,4,5,4,4,4,4], si:null, si18:null},
   B:{lbl:'B-Platz (10\u201318)', nums:[10,11,12,13,14,15,16,17,18], par:[4,3,4,4,5,3,5,4,4], si:null, si18:null}
  },
  tees:[
   {name:'Gelb (Herren)', cr:{F:36.2,B:36.2,A:71.5}, sl:{F:131,B:131,A:131}},
   {name:'Blau (Herren, Senior)', cr:{F:null,B:null,A:67.8}, sl:{F:null,B:null,A:123}},
   {name:'Rot (Damen)', cr:{F:null,B:null,A:73.1}, sl:{F:null,B:null,A:129}}
  ]},
};
/* Feste Preset-Keys, zentral gepflegt. Verhindert, dass ein alter/kollidierender
   RT_CUSTOM_KEY-Eintrag mit demselben Key (z.B. eine sehr alte, von Hand angelegte
   "waldhof"-Kachel aus einer Zeit vor dem Preset) zusaetzlich als eigener Kachel-Chip
   auftaucht (siehe RT_platzChips) - beide Chips wuerden sonst dieselben Daten anzeigen
   und jede Aenderung an einem wuerde sofort auch am anderen sichtbar werden. */
var RT_PRESET_KEYS={georg:1,waldhof:1};
/* Neue Nutzer (noch NIE zuvor auf diesem Geraet aktiv, weder RT_HIDDEN_KEY noch RT_KEY
   vorhanden) sollen zunaechst nur Georghausen in der Platzauswahl sehen. Gut Waldhof wird
   dafuer beim allerersten Laden einmalig in die lokale Hidden-Preset-Liste (RT_HIDDEN_KEY)
   aufgenommen - dieselbe Liste, die auch das X-Icon in RT_platzChips befuellt. Wer dort
   bereits gespielt hat oder die Kachel spaeter selbst wieder einblenden moechte, ist davon
   NICHT betroffen: RT_isPlayed()-Check in RT_rCoursePick zeigt Waldhof automatisch wieder,
   sobald eine Runde dort existiert (z.B. bei Mark/Eva/Carsten unveraendert sichtbar). */
(function(){
 try{
  if(localStorage.getItem(RT_HIDDEN_KEY)===null && localStorage.getItem(RT_KEY)===null){
   localStorage.setItem(RT_HIDDEN_KEY, JSON.stringify(['waldhof']));
  }
 }catch(e){}
})();

var RT_state={screen:'home', viewId:null, resMsg:'', busy:false, ask:''};
var RT_round=rtGet(RT_ACT)||null;
var RT_su=null;
var RT_editingExisting=false;
var RT_editSourceRound=null;

/* Gespeicherte, ueber \"+ Spieler\" angelegte Mitspieler (siehe RT_persistPlayer) - werden bei\n   jeder neuen Runde automatisch mit vorbelegt (Name + zuletzt genutztes HI), damit man sie\n   nicht jedes Mal neu eintippen muss. Der Abschlag startet immer beim ersten verfuegbaren\n   Tee des jeweiligen Platzes und kann pro Runde angepasst werden. Über \"Entfernen\" lassen sie\n   sich aus der jeweils AKTUELLEN Runde wieder herausnehmen, ohne das gespeicherte Profil zu\n   loeschen - beim naechsten Mal tauchen sie wieder auf. */
/* Namen aus der (Cloud-synchronisierten) Rundenhistorie ableiten - Fallback/Ergaenzung zur rein
   lokalen golflog_saved_players_v1-Liste. Diese war bislang NUR im localStorage des jeweiligen
   Geraets/Browsers gespeichert, nicht cloud-synchronisiert - nach Browserwechsel oder geloeschten
   Website-Daten waren bereits gespielte Mitspieler (z.B. Eva, Carsten) dadurch aus der
   Kontakte-Auswahl verschwunden, obwohl sie in den (synchronisierten) Runden weiter auftauchen.
   Diese Funktion rekonstruiert die fehlenden Kontakte direkt aus den vorhandenen Rundendaten. */
function RT_historicPlayerNames(){
 var rounds=rtGet(RT_KEY)||[];
 var byName={};
 rounds.forEach(function(rd){
  (rd.players||[]).forEach(function(p){
   var nm=(p&&p.name||'').trim();
   if(!nm||RT_isSelfName(nm)||byName[nm])return;
   var hi=parseFloat(p.hi);
   byName[nm]={name:nm, hi:isNaN(hi)?54:hi, teeName:null, teeHalf:null};
  });
 });
 return byName;
}
function RT_getSavedPlayers(){
 var byName={};
 (rtGet(RT_PLAYERSAV_KEY)||[]).forEach(function(sp){ if(sp&&sp.name) byName[sp.name]=sp; });
 var hist=RT_historicPlayerNames();
 Object.keys(hist).forEach(function(nm){ if(!byName[nm]) byName[nm]=hist[nm]; });
 var hid={}; (rtGet(RT_HIDPLAY_KEY)||[]).forEach(function(n){ hid[n]=1; }); return Object.keys(byName).filter(function(nm){ return !hid[nm]; }).map(function(nm){ return byName[nm]; });
}
/* Ein Mitspieler, der seinen Namen geaendert hat (z.B. "Mark" -> "Mark Maetschke"), taucht sonst
   mehrfach in der Einladen-Liste auf. Verknuepfte Eintraege werden pro linked_user_id auf EINEN
   reduziert (zuletzt bestaetigter bzw. laengster Anzeigename gewinnt); nicht verknuepfte Namen,
   die klar zu einem bereits gezeigten verknuepften Namen gehoeren, werden ausgeblendet. */
function RT_dedupInvitees(list){
 if(!list||!list.length) return list||[];
 var pick={};
 list.forEach(function(sp){
  var st=(typeof PL_statusFor==='function')?PL_statusFor(sp.name):null;
  var uid=st&&st.linked_user_id; if(!uid) return;
  var cur=pick[uid];
  if(!cur){ pick[uid]={sp:sp,st:st}; return; }
  var at=(cur.st&&cur.st.claimed_at)||'', bt=(st&&st.claimed_at)||'';
  if(bt>at || (bt===at && (sp.name||'').length>(cur.sp.name||'').length)) pick[uid]={sp:sp,st:st};
 });
 var keepLinked={}, linkedNames=[];
 Object.keys(pick).forEach(function(uid){ var nm=pick[uid].sp.name; keepLinked[nm]=true; linkedNames.push(nm); });
 var out=[];
 list.forEach(function(sp){
  var st=(typeof PL_statusFor==='function')?PL_statusFor(sp.name):null;
  var uid=st&&st.linked_user_id;
  if(uid){ if(keepLinked[sp.name]) out.push(sp); return; }
  var dup=linkedNames.some(function(ln){ return ln!==sp.name && RT_namesLikelySame(sp.name,ln); });
  if(!dup) out.push(sp);
 });
 return out;
}
function RT_setSavedPlayers(list){ rtSet(RT_PLAYERSAV_KEY,list); }
/* Versucht, fuer einen Spieler den zuletzt gespeicherten Abschlag (per Name) im GERADE
   gewaehlten Platz wiederzufinden und zu setzen. Kein Fund (z.B. Platzwechsel ohne
   gleichnamigen Abschlag) -> Tee bleibt unveraendert (Standard: erster Abschlag). */
function RT_applySavedTee(p,courseKey){
 if(!p||!courseKey) return;
 var c=RT_COURSES[courseKey]; if(!c||!c.tees) return;
 var saved=RT_getSavedPlayers().find(function(sp){ return sp.name===p.name; });
 if(!saved||!saved.teeName) return;
 var ti=c.tees.findIndex(function(t){ return t.name===saved.teeName; });
 /* Nur die Abschlagfarbe (teeName) ist eine dauerhaft sinnvolle, personenbezogene Praeferenz -
    z.B. Carsten spielt immer Gelb. Welche Haelfte (Front/Back/18) gespielt wird, ist dagegen
    eine EIGENSCHAFT DER RUNDE, nicht der Person: p.teeHalf wird deshalb bewusst NICHT aus alten
    gespeicherten Runden wiederhergestellt (das fuehrte sonst dazu, dass ein neu hinzugefuegter
    Spieler noch die Halbierung einer laengst vergangenen Runde zeigte, obwohl die aktuelle Runde
    z.B. 18 Loch spielt). p.teeHalf bleibt daher auf dem Wert stehen, den der Aufrufer vorher
    gesetzt hat (ueblicherweise null = folgt RT_su.holes der aktuellen Runde). */
 if(ti>=0){ p.tee=ti; }
 if(saved.sex==='w'||saved.sex==='m'){ p.sex=saved.sex; }
}
function RT_persistPlayer(i){
 if(!RT_su||!RT_su.players||!RT_su.players[i]) return;
 var p=RT_su.players[i];
 var name=(p.name||'').trim();
 if(!name) return;
 var hi=parseFloat(p.hi);
 var list=RT_getSavedPlayers();
 var idx=list.findIndex(function(sp){ return sp.name===name; });
 /* Tee-Index gilt nur innerhalb des jeweils gewaehlten Platzes - darum wird der Tee-NAME
    gespeichert (platzuebergreifend sinnvoll) und beim naechsten Mal im dann aktuellen
    Platz per Name nachgeschlagen (siehe RT_applySavedTee). */
 var teeName=null;
 var key=RT_su.course; var c=key&&RT_COURSES[key];
 if(c&&p.tee>=0&&c.tees[p.tee]) teeName=c.tees[p.tee].name;
 var entry={name:name, hi:isNaN(hi)?54:hi, sex:(p.sex==='w')?'w':'m', teeName:teeName, teeHalf:p.teeHalf||null};
 if(idx>=0) list[idx]=entry; else list.push(entry);
 RT_setSavedPlayers(list);
}
function RT_playerMove(i,dir){
 if(!RT_su||!RT_su.players)return;
 var np=i+dir; if(np<0||np>=RT_su.players.length)return;
 var tmp=RT_su.players[i]; RT_su.players[i]=RT_su.players[np]; RT_su.players[np]=tmp;
 RT_render();
}function RT_defSu(){
 /* Neue Runden starten bewusst NUR mit dem Standardspieler - bekannte Mitspieler werden NICHT
    mehr automatisch mitgenommen (siehe Kontakt-Chips im Spieler-Abschnitt: dort waehlt man
    aktiv per Klick aus, wer bei dieser Runde dabei ist).
    Segment-Standard: 18 Loch vor Front vor Back (Georghausen hat einen echten Back-9, also 'A'). */
 var defHoles='A';
 var players=[{name:RT_myDisplayName(), hi:RT_ownHandicap(), sex:'m', tee:RT_hardestTeeIdx('georg',defHoles,'m'), teeHalf:(defHoles==='A')?null:defHoles, cr:null, sl:null}];
 RT_applySavedTee(players[0],'georg');
 return {course:'georg', holes:defHoles, date:RT_today(), time:RT_nowTime(),
  players:players, ownCards:false,
  custName:'', custPar:'', custSi:'', siEdit:{}, parEdit:{}};
}

/* Spielvorgabe: 9L = HI/2 x SL/113 + (CR9 - Par9); 18L = HI x SL/113 + (CR - Par) */
function RT_ph(hi,cr,sl,parSum,cnt){
 if(hi===null||cr===null||sl===null||isNaN(hi)||isNaN(cr)||isNaN(sl))return null;
 var h=cnt===9?hi/2:hi;
 return Math.round(h*sl/113+(cr-parSum));
}
function RT_courseData(){
 var c=RT_COURSES[RT_su.course]; if(!c)return null;
 var m=RT_su.holes, d={name:c.name};
 function siOf(nk,use18){
  var nn=c.nines[nk];
  var f=nk+(use18?'18':'9');
  var base=use18?(nn.si18||nn.si):(nn.si);
  var ov=RT_getSiOverrides()[RT_su.course];
  if(ov&&ov[f])base=ov[f];
  if(RT_su.siEdit[f])base=RT_su.siEdit[f];
  return base;
 }
 function parOf(nk){
  var nn=c.nines[nk];
  var f=nk+'9';
  var base=nn.par;
  var ov=RT_getParOverrides()[RT_su.course];
  if(ov&&ov[f])base=ov[f];
  if(RT_su.parEdit[f])base=RT_su.parEdit[f];
  return base;
 }
 if(m==='A'){
  d.par=parOf('F').concat(parOf('B'));
  d.si=(siOf('F',true)||[]).concat(siOf('B',true)||[]);
  d.nums=c.nines.F.nums.concat(c.nines.B.nums);
  d.cnt=18; d.lbl='18 Loch';
  if(d.si.length!==18)d.si=null;
 }else{
  var n=c.nines[m];
  d.par=parOf(m).slice(); d.si=siOf(m,false); d.nums=n.nums.slice(); d.cnt=9; d.lbl=n.lbl;
  if(d.si&&d.si.length!==9)d.si=null;
 }
 d.parSum=d.par.reduce(function(s,v){return s+v;},0);
 d.tees=c.tees;
 return d;
}
/* p.teeHalf erzwingt fuer diesen Spieler Front (\'F\') oder Back (\'B\'), unabhaengig von der\n   rundenweiten Loecher-Auswahl (RT_su.holes) - z.B. wenn alle gemeinsam 18 Loch spielen, ein\n   Spieler seine Spielvorgabe aber ausdruecklich mit der Front- oder Back-CR/Slope berechnet\n   haben moechte. Ist kein Override gesetzt, gilt wie bisher die rundenweite Auswahl. */
function RT_pCr(p,cd){
 if(p.cr!==null&&p.cr!==''&&!isNaN(parseFloat(p.cr)))return parseFloat(p.cr);
 var t=cd.tees[p.tee]; if(!t)return null;
 var side=(RT_su.holes==='A')?'A':(p.teeHalf||RT_su.holes);
 var v=t.cr[side]; return (v===undefined||v===null)?null:v;
}
function RT_pSl(p,cd){
 if(p.sl!==null&&p.sl!==''&&!isNaN(parseFloat(p.sl)))return parseFloat(p.sl);
 var t=cd.tees[p.tee]; if(!t)return null;
 var side=(RT_su.holes==='A')?'A':(p.teeHalf||RT_su.holes);
 var v=t.sl[side]; return (v===undefined||v===null)?null:v;
}

/* ---------- Screens ---------- */
/* ---------- Platzkarte (OpenStreetMap via Leaflet, kostenlos, kein API-Key) ---------- */
var RT_GEO_KEY='golflog_geocode_cache_v1';
var RT_leafletMap=null;
function RT_geoCache(){ return rtGet(RT_GEO_KEY)||{}; }
async function RT_geocode(address){
 var cache=RT_geoCache();
 if(cache[address]) return cache[address];
 try{
  var resp=await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(address),
   {headers:{'Accept':'application/json'}});
  var data=await resp.json();
  if(data&&data[0]){
   var pos={lat:parseFloat(data[0].lat), lon:parseFloat(data[0].lon)};
   cache[address]=pos; rtSet(RT_GEO_KEY,cache);
   return pos;
  }
 }catch(e){}
 return null;
}
async function RT_reverseGeocode(lat,lon){
 if(lat==null||lon==null) return null;
 var key='r:'+(+lat).toFixed(5)+','+(+lon).toFixed(5);
 var cache=RT_geoCache();
 if(cache[key]) return (typeof cache[key]==='string')?cache[key]:null;
 try{
  var resp=await fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom=18&lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon),
   {headers:{'Accept':'application/json'}});
  var d=await resp.json();
  var a=d&&d.address; if(!a) return null;
  var road=a.road||a.pedestrian||a.footway||a.path||a.cycleway||'';
  var hn=a.house_number||'';
  var plz=a.postcode||'';
  var city=a.city||a.town||a.village||a.municipality||a.hamlet||a.suburb||'';
  var line1=(road+(hn?' '+hn:'')).trim();
  var line2=((plz?plz+' ':'')+city).trim();
  var addr=[line1,line2].filter(Boolean).join(', ');
  if(!addr) addr=(d.display_name||'').split(',').slice(0,3).join(', ').trim();
  if(addr){ cache[key]=addr; rtSet(RT_GEO_KEY,cache); }
  return addr||null;
 }catch(e){ return null; }
}
function RT_clearMap(){
 if(RT_leafletMap){ try{RT_leafletMap.remove();}catch(e){} RT_leafletMap=null; }
}
async function RT_initMap(){
 RT_clearMap();
 var el=document.getElementById('platz-map');
 if(!el) return;
 if(typeof L==='undefined'){ el.style.display='none'; return; }
 var c=RT_COURSES[RT_su.course];
 if(!c){ el.style.display='none'; return; }
 var pos=null;
 if(c.lat!==undefined&&c.lat!==null&&c.lon!==undefined&&c.lon!==null){ pos={lat:c.lat, lon:c.lon}; }
 else if(c.address){ pos=await RT_geocode(c.address); }
 if(!pos){ el.style.display='none'; return; }
 el.style.display='block';
 try{
  RT_leafletMap=L.map('platz-map',{zoomControl:false,attributionControl:true,dragging:false,scrollWheelZoom:false,doubleClickZoom:false,touchZoom:false})
   .setView([pos.lat,pos.lon],15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(RT_leafletMap);
  L.marker([pos.lat,pos.lon]).addTo(RT_leafletMap);
 }catch(e){ el.style.display='none'; }
}
/* ---------- Loch-Karte in der laufenden Runde: Kartenausschnitt je Loch merken, Ball-Lagen als
   nummerierte Pins festhalten ---------- */
var RT_HOLEVIEW_KEY='golflog_holeviews_v1';
function RT_holeViews(){ return rtGet(RT_HOLEVIEW_KEY)||{}; }
function RT_holeMapKey(rd,holeIdx){
 var key=RT_courseKeyFromName(rd.courseName,rd)||rd.courseName||'unk';
 return key+'-h'+rd.nums[holeIdx];
}
function RT_saveHoleView(rd,holeIdx,lat,lng,zoom,rot){
 var v=RT_holeViews();
 var key=RT_holeMapKey(rd,holeIdx);
 var existing=v[key]||{};
 var entry={lat:lat,lng:lng,zoom:zoom,rot:(rot!==undefined?rot:(existing.rot||0))};
 v[key]=entry;
 rtSet(RT_HOLEVIEW_KEY,v);
 /* Zusaetzlich auf der Runde selbst ablegen, damit die Kartenausrichtung Teil der
    synchronisierten Rundendaten wird (sbPushRound sendet die komplette Runde) und
    damit auf anderen Geraeten beim Oeffnen dieser Runde sichtbar ist. */
 if(rd){
  rd.holeViews=rd.holeViews||{};
  rd.holeViews[key]=entry;
  if(rd===RT_round) rtSet(RT_ACT,RT_round);
 }
}
/* Rechnet einen Klick/Tap-Punkt (in Seitenkoordinaten) auf die korrekte geografische Position
   um, auch wenn der Kartencontainer per CSS gedreht ist - Leaflet selbst kennt die CSS-Drehung
   nicht und wuerde sonst an der falschen Stelle einen Pin setzen. */
function RT_correctedLatLng(map,containerEl,rotDeg,clientX,clientY){
 var rect=containerEl.getBoundingClientRect();
 var cx=rect.left+rect.width/2, cy=rect.top+rect.height/2;
 var dx=clientX-cx, dy=clientY-cy;
 var rad=-rotDeg*Math.PI/180;
 var ux=dx*Math.cos(rad)-dy*Math.sin(rad);
 var uy=dx*Math.sin(rad)+dy*Math.cos(rad);
 /* Container-Mittelpunkt braucht BEIDE Achsen. Vorher wurde die Breite auch als Hoehe
    benutzt (S/2 fuer x und y) - bei der quadratischen kleinen Karte (500x500) faellt das
    nicht auf, bei der hochkanten Vollbildkarte lag der angenommene Mittelpunkt um
    mehrere hundert Pixel daneben. Deshalb konnte bisher nur mit Differenzen gerechnet
    werden (konstanter Versatz kuerzt sich weg); absolute Positionen waren unbrauchbar. */
 var W=containerEl.offsetWidth||500, H=containerEl.offsetHeight||W;
 return map.containerPointToLatLng(L.point(W/2+ux,H/2+uy));
}
/* Leaflet kennt die CSS-Rotation des Kartencontainers nicht: es verschiebt den Karten-Pane
   um exakt den Zeiger-Versatz in Bildschirmkoordinaten. Da der Pane aber mitgedreht ist,
   wandert der Ausschnitt sichtbar um genau diesen Drehwinkel schief - ein Wischen nach
   rechts verschiebt die Karte je nach Rotation nach oben oder unten. Deshalb wird Leaflets
   eigenes Dragging abgeschaltet und hier durch ein Panning ersetzt, das den Zeigerpunkt
   vorher per RT_correctedLatLng() zurueckdreht - also in echte Koordinaten uebersetzt.
   Verschoben wird dann um die Differenz zweier so bestimmter Punkte; beide werden im selben
   Kartenzustand berechnet, wodurch das Delta unabhaengig vom laufenden Pan korrekt bleibt. */
var RT_suppressMapClick={};
function RT_setupRotDrag(key,map,el,getRot,getLocked){
 if(!map||!el||el.dataset.rotdrag==='1') return;
 el.dataset.rotdrag='1';
 var st=null, active={};
 function nActive(){ return Object.keys(active).length; }
 el.addEventListener('pointerdown',function(ev){
  active[ev.pointerId]=1;
  /* Zweiter Finger = Pinch-Zoom, den macht Leaflet weiterhin selbst. */
  if(nActive()>1){ st=null; return; }
  if(ev.target&&ev.target.closest&&ev.target.closest('.leaflet-marker-icon')) return;
  st={x:ev.clientX,y:ev.clientY,moved:false};
 });
 el.addEventListener('pointermove',function(ev){
  if(!st||nActive()>1) return;
  if(getLocked&&getLocked()) return;
  if(!st.moved&&(Math.abs(ev.clientX-st.x)+Math.abs(ev.clientY-st.y))<3) return;
  st.moved=true;
  ev.preventDefault();
  var rot=getRot()||0;
  var a=RT_correctedLatLng(map,el,rot,st.x,st.y);
  var b=RT_correctedLatLng(map,el,rot,ev.clientX,ev.clientY);
  if(!a||!b) return;
  var ctr=map.getCenter();
  map.setView([ctr.lat+(a.lat-b.lat), ctr.lng+(a.lng-b.lng)], map.getZoom(), {animate:false});
  st.x=ev.clientX; st.y=ev.clientY;
 });
 function endDrag(ev){
  delete active[ev.pointerId];
  if(!st) return;
  var moved=st.moved; st=null;
  /* Nach einem Pan darf der folgende Kartenklick keine Balllage setzen. */
  if(moved){ RT_suppressMapClick[key]=true; setTimeout(function(){ RT_suppressMapClick[key]=false; },300); }
 }
 el.addEventListener('pointerup',endDrag);
 el.addEventListener('pointercancel',endDrag);
}
function RT_rotateMap(pi,delta){
 var inst=RT_holeMapInst[pi]; if(!inst) return;
 var rd=RT_round; if(!rd) return;
 var c=rd.cur;
 inst.rot=((inst.rot||0)+delta+360)%360;
 if(inst.el) inst.el.style.transform='rotate('+inst.rot+'deg)';
 var ctr=inst.map.getCenter();
 RT_saveHoleView(rd,c,ctr.lat,ctr.lng,inst.map.getZoom(),inst.rot);
 RT_redrawPins(pi);
}
/* Kartensperre: verhindert, dass ein Tap auf die Lochkarte (z.B. um einen Pin zu setzen)
   versehentlich den Kartenausschnitt verschiebt. Gesperrt ist der Ausgangszustand bei jedem
   Laden der Karte; ueber das Schloss-Icon (gleiche Zeile wie die Rotationsbuttons, rechts-
   buendig) kann gezielt entsperrt werden, um Ausschnitt/Zoom anzupassen. Pins setzen per
   einfachem Tap funktioniert unabhaengig vom Sperrzustand, da das ueber den click-Handler
   laeuft, nicht ueber Leaflets dragging. */
function RT_applyMapLock(pi){
 var inst=RT_holeMapInst[pi]; if(!inst||!inst.map) return;
 var m=inst.map;
 if(inst.locked){
  m.dragging.disable(); m.touchZoom.disable(); m.doubleClickZoom.disable();
  m.scrollWheelZoom.disable(); if(m.boxZoom)m.boxZoom.disable(); if(m.keyboard)m.keyboard.disable();
 }else{
  /* dragging bewusst NICHT aktivieren: das Verschieben laeuft rotationskorrigiert
     ueber RT_setupRotDrag(). */
  m.touchZoom.enable(); m.doubleClickZoom.disable();
  m.scrollWheelZoom.enable(); if(m.boxZoom)m.boxZoom.enable(); if(m.keyboard)m.keyboard.enable();
 }
}
/* Baut NUR die kleine Steuerzeile unter der Lochkarte (Rotations-Buttons, Pins-zuruecksetzen,
   Schloss-Icon). Wird sowohl beim ersten Rendern der Karte verwendet als auch fuer gezielte
   Updates (siehe RT_toggleMapLock) - letzteres bewusst OHNE RT_render(), da ein volles
   RT_render() auf dem Play-Screen RT_initHoleMaps() erneut ausloest, was JEDE Lochkarte
   (inkl. der gerade erst entsperrten) wieder frisch mit locked:true aufbaut und die Sperre
   damit sofort ungewollt zurueckgesetzt haette - genau das war der Grund, warum Entsperren
   bisher wirkungslos blieb. */
function RT_mapCtrlHtml(pi){
 var rd=RT_round; if(!rd) return '';
 var p=rd.players[pi], c=rd.cur;
 var pinN=(p.pins&&p.pins[c])?p.pins[c].length:0;
 var mapLocked=!RT_holeMapInst[pi]||RT_holeMapInst[pi].locked!==false;
 return '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">'+
   '<div style="display:flex;gap:6px;">'+
    (mapLocked?'':(
     '<button class="rt-rotbtn" onclick="RT_rotateMap('+pi+',-15)" title="Karte drehen">&#8634;</button>'+
     '<button class="rt-rotbtn" onclick="RT_rotateMap('+pi+',15)" title="Karte drehen">&#8635;</button>'
    ))+
   '</div>'+
   '<div style="display:flex;gap:6px;align-items:center;">'+
    '<button id="pin-reset-'+pi+'" class="rt-btn3" style="padding:2px 6px;display:'+(pinN?'inline-block':'none')+';" onclick="RT_clearPins('+pi+')">Pins zur\u00fccksetzen</button>'+
    '<button class="rt-rotbtn" onclick="RT_toggleMapLock('+pi+')" title="'+(mapLocked?'Karte entsperren':'Karte sperren')+'">'+(mapLocked?'&#128274;':'&#128275;')+'</button>'+
   '</div>'+
  '</div>';
}
function RT_toggleMapLock(pi){
 var inst=RT_holeMapInst[pi]; if(!inst) return;
 inst.locked=!inst.locked;
 RT_applyMapLock(pi);
 var el=document.getElementById('map-ctrl-'+pi);
 if(el) el.innerHTML=RT_mapCtrlHtml(pi);
}
function RT_ensurePins(rd){
 if(!rd)return;
 rd.players.forEach(function(p){
  if(!p.pins)p.pins=[];
  while(p.pins.length<rd.cnt)p.pins.push([]);
 });
}
/* GPX-Import: liest eine .gpx-Datei (z.B. aus einer GPS-Tracking-App), extrahiert alle
   <wpt>-Wegpunkte samt Zeitstempel, sortiert sie chronologisch und verteilt sie der Reihe
   nach auf die Bahnen der aktuellen Runde (Bahn 1 bekommt die zeitlich ersten Wegpunkte usw.).
   Ergebnis landet bei den Pins des eigenen Spielers - dieselbe Struktur, die auch manuell per Kartentipp
   befuellt wird (siehe RT_redrawPins), und erscheint damit automatisch als nummerierte Pins
   auf der jeweiligen Lochkarte. */
function RT_gpxFile(ev){
 var f=ev.target.files&&ev.target.files[0];
 ev.target.value='';
 if(!f)return;
 var reader=new FileReader();
 reader.onload=function(e){
  try{
   var xml=new DOMParser().parseFromString(String(e.target.result),'text/xml');
   if(xml.getElementsByTagName('parsererror').length) throw new Error('Datei ist kein gültiges GPX/XML.');
   var wpts=Array.prototype.slice.call(xml.getElementsByTagName('wpt')).map(function(w){
    var timeEl=w.getElementsByTagName('time')[0];
    return {lat:parseFloat(w.getAttribute('lat')), lng:parseFloat(w.getAttribute('lon')),
     time:timeEl?timeEl.textContent:null};
   }).filter(function(p){return !isNaN(p.lat)&&!isNaN(p.lng);});
   if(!wpts.length){ RT_state.saveWarn='Keine Wegpunkte in der Datei gefunden.'; RT_render(); return; }
   wpts.sort(function(a,b){ return (a.time||'')<(b.time||'')?-1:(a.time||'')>(b.time||'')?1:0; });
   RT_applyGpxWaypoints(wpts);
  }catch(err){
   RT_state.saveWarn='GPX konnte nicht gelesen werden: '+(err.message||err);
   RT_render();
  }
 };
 reader.readAsText(f);
}
/* Berechnet aus einer Liste von {lat,lng}-Punkten Mittelpunkt + einen Zoom-Level, der alle
   Punkte in den Kartenausschnitt einpasst (Standard-"Bounds-fit"-Formel via Web-Mercator-
   Breitengrad-Radiant, ohne Leaflet-Instanz - wird direkt beim Import berechnet, bevor die
   Karte ueberhaupt gerendert ist). Noetig, weil sonst ALLE Lochkarten weiterhin auf den einen
   generischen Vereins-Standort zentriert blieben (siehe RT_initHoleMaps-Fallback) und die
   importierten Pins je nach Lage der Bahn ausserhalb des sichtbaren Kartenausschnitts landen -
   genau das fuehrte dazu, dass nach dem Import nicht alle Wegpunkte sichtbar waren. */
function RT_fitPinsView(pins){
 if(!pins||!pins.length) return null;
 var lats=pins.map(function(p){return p.lat;}), lngs=pins.map(function(p){return p.lng;});
 var minLat=Math.min.apply(null,lats), maxLat=Math.max.apply(null,lats);
 var minLng=Math.min.apply(null,lngs), maxLng=Math.max.apply(null,lngs);
 var center={lat:(minLat+maxLat)/2, lng:(minLng+maxLng)/2};
 if((maxLat-minLat)<0.00005 && (maxLng-minLng)<0.00005) return {lat:center.lat,lng:center.lng,zoom:18};
 function latRad(lat){ var s=Math.sin(lat*Math.PI/180); return Math.log((1+s)/(1-s))/2; }
 function zoomForFraction(mapPx,worldPx,fraction){ if(fraction<=0) return 21; return Math.floor(Math.log(mapPx/worldPx/fraction)/Math.LN2); }
 var mapDim=460;
 var latFraction=Math.abs(latRad(maxLat)-latRad(minLat))/Math.PI;
 var lngDiff=maxLng-minLng;
 var lngFraction=(lngDiff<0?lngDiff+360:lngDiff)/360;
 var z=Math.min(zoomForFraction(mapDim,256,latFraction),zoomForFraction(mapDim,256,lngFraction),19)-1;
 z=Math.max(14,Math.min(19,z));
 return {lat:center.lat,lng:center.lng,zoom:z};
}
function RT_applyGpxWaypoints(wpts){
 var rd=RT_round; if(!rd)return;
 RT_ensurePins(rd);
 var gpxPi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(rd):0;
 var n=wpts.length, cnt=rd.cnt, perHole=Math.max(1,Math.floor(n/cnt)), idx=0;
 var touchedHoles=[];
 for(var h=0; h<cnt; h++){
  var take = (h===cnt-1) ? (n-idx) : Math.min(perHole,n-idx);
  var slice=wpts.slice(idx, idx+take);
  idx+=take;
  if(slice.length){
   slice.forEach(function(w){ RT_pinsOf(rd,gpxPi,h).push({lat:w.lat, lng:w.lng}); });
   touchedHoles.push(h);
  }
 }
 touchedHoles.forEach(function(h){
  var view=RT_fitPinsView(RT_pinsOf(rd,gpxPi,h));
  if(view) RT_saveHoleView(rd,h,view.lat,view.lng,view.zoom);
 });
 rtSet(RT_ACT, rd);
 RT_state.saveWarn='';
 RT_render();
}
var RT_holeMapInst={};
function RT_clearHoleMaps(){
 Object.keys(RT_holeMapInst).forEach(function(pi){
  try{ RT_holeMapInst[pi].map.remove(); }catch(e){}
 });
 RT_holeMapInst={};
}
/* Alle bekannten geografischen Punkte DIESER Bahn: Abschlaege, Bahnmitte, Loch und
   bereits gesetzte Balllagen. Grundlage dafuer, die Satellitenkarte auf die Bahn zu
   zentrieren statt auf die Platz-/Clubhaus-Koordinate. */
function RT_holePoints(rd,c){
 var out=[];
 var ref=RT_refFor(rd,c);
 if(ref){
  if(ref.pin&&ref.pin.lat) out.push([ref.pin.lat,ref.pin.lng]);
  if(ref.mid&&ref.mid.lat) out.push([ref.mid.lat,ref.mid.lng]);
  if(ref.tees) Object.keys(ref.tees).forEach(function(k){ var t=ref.tees[k]; if(t&&t.lat) out.push([t.lat,t.lng]); });
 }
 (rd.players||[]).forEach(function(pl){
  var pins=(pl.pins&&pl.pins[c])||[];
  pins.forEach(function(p){ if(p&&p.lat) out.push([p.lat,p.lng]); });
 });
 return out;
}
function RT_holeCenter(rd,c){
 var pts=RT_holePoints(rd,c); if(!pts.length) return null;
 var la=0,ln=0; pts.forEach(function(p){ la+=p[0]; ln+=p[1]; });
 return {lat:la/pts.length, lng:ln/pts.length, n:pts.length};
}
/* Grober Meter-Abstand zweier Koordinaten (aequirektangulaere Naeherung, fuer wenige
   hundert Meter voellig ausreichend). */
function RT_roughDist(aLat,aLng,bLat,bLng){
 var dy=(bLat-aLat)*110540;
 var dx=(bLng-aLng)*111320*Math.cos(aLat*Math.PI/180);
 return Math.sqrt(dx*dx+dy*dy);
}
/* Ein gespeicherter Kartenausschnitt wird nur uebernommen, wenn er ueberhaupt in der Naehe
   dieser Bahn liegt. Sonst stammt er noch aus der Zeit, als die Karte pauschal auf die
   Platzkoordinate (= Clubhaus) zentriert wurde - dann lieber neu auf die Bahn zentrieren. */
function RT_savedViewUsable(rd,c,savedView){
 if(!savedView||savedView.lat===undefined||savedView.lat===null) return false;
 var ctr=RT_holeCenter(rd,c); if(!ctr) return true;
 return RT_roughDist(ctr.lat,ctr.lng,savedView.lat,savedView.lng)<120;
}
async function RT_initHoleMaps(){
 RT_clearHoleMaps();
 var rd=RT_round; if(!rd) return;
 var c=rd.cur;
 var hmKey=RT_holeMapKey(rd,c);
 var hmMapMode=RT_mapSat();
 if(RT_holeImgFor(rd,c)&&!hmMapMode) return;
 RT_ensurePins(rd);
 if(typeof L==='undefined') return;
 var savedView=(rd.holeViews&&rd.holeViews[RT_holeMapKey(rd,c)])||RT_holeViews()[RT_holeMapKey(rd,c)];
 if(!RT_savedViewUsable(rd,c,savedView)) savedView=null;
 var hmRef=RT_refFor(rd,c);
 var hmCalib=hmRef?RT_computeCalib(hmRef):null;
 var hmAutoRot=hmCalib?hmCalib.rotDeg:null;
 var basePos=null;
 if(savedView){ var hmRotVal=(savedView.rot!==undefined&&savedView.rot!==null&&savedView.rot!==0)?savedView.rot:(hmAutoRot!==null?hmAutoRot:(savedView.rot||0)); basePos={lat:savedView.lat, lng:savedView.lng, zoom:savedView.zoom, rot:hmRotVal}; }
 else{
  var hmCtr=RT_holeCenter(rd,c);
  if(hmCtr){ basePos={lat:hmCtr.lat, lng:hmCtr.lng, zoom:17, rot:(hmAutoRot!==null?hmAutoRot:0), fit:true}; }
  else{
   var ck=RT_courseKeyFromName(rd.courseName,rd);
   var courseObj=ck?RT_COURSES[ck]:null;
   var pos=null;
   if(courseObj){
    if(courseObj.lat!==undefined&&courseObj.lat!==null){ pos={lat:courseObj.lat, lon:courseObj.lon}; }
    else if(courseObj.address){ pos=await RT_geocode(courseObj.address); }
   }
   if(pos) basePos={lat:pos.lat, lng:pos.lon, zoom:17, rot:(hmAutoRot!==null?hmAutoRot:0)};
  }
 }
 /* Nach dem await erneut pruefen: Nutzer koennte inzwischen die Bahn gewechselt haben. */
 if(rd!==RT_round||c!==RT_round.cur) return;
 rd.players.forEach(function(p,pi){
  var el=document.getElementById('hole-map-'+pi);
  if(!el) return;
  if(!basePos){ el.style.display='none'; return; }
  el.style.display='block';
  var map=L.map('hole-map-'+pi,{zoomControl:true,attributionControl:true}).setView([basePos.lat,basePos.lng],basePos.zoom);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:20,attribution:'Tiles &copy; Esri'}).addTo(map);
  var layer=L.layerGroup().addTo(map);
  var refLayer=L.layerGroup().addTo(map);
  var rot0=basePos.rot||0;
  el.style.transform='rotate('+rot0+'deg)';
  RT_holeMapInst[pi]={map:map,layer:layer,refLayer:refLayer,rot:rot0,el:el,locked:true};
  if(basePos.fit){ try{ var fpts=RT_holePoints(rd,c); if(fpts.length>1) map.fitBounds(L.latLngBounds(fpts).pad(0.45)); else map.setZoom(18); }catch(e){} }
  RT_applyMapLock(pi);
  RT_setupRotDrag('h'+pi,map,el,function(){ var i2=RT_holeMapInst[pi]; return i2?(i2.rot||0):0; },function(){ var i3=RT_holeMapInst[pi]; return !i3||i3.locked!==false; });
  RT_redrawPins(pi);
  /* Referenzpunkte werden waehrend des Spiels bewusst NICHT mehr eingeblendet - auf den
     Spielerkarten sollen nur die selbst gesetzten Markierungen zu sehen sein. Sichtbar
     sind sie weiterhin im Referenzpunkte-Editor (RT_calibMarkersHtml). */
  map.on('moveend zoomend', function(){
   var ctr=map.getCenter();
   RT_saveHoleView(rd,c,ctr.lat,ctr.lng,map.getZoom());
  });
  map.on('click', function(e){
   if(RT_suppressMapClick['h'+pi]) return;
   if(!RT_canEditPlayer(RT_round,pi)){RT_editBlock(RT_round);return;}
   if(!p.pins[c])p.pins[c]=[];
   var inst=RT_holeMapInst[pi];
   var rot=(inst&&inst.rot)||0;
   var oe=e.originalEvent;
   var ll;
   if(oe&&typeof oe.clientX==='number'&&rot){
    ll=RT_correctedLatLng(map,(inst&&inst.el)||el,rot,oe.clientX,oe.clientY);
   }else{
    ll=e.latlng;
   }
   if(RT_pinMoveMode&&RT_pinMoveMode.pi===pi){
    var mp=p.pins[c][RT_pinMoveMode.idx];
    if(mp){ mp.lat=ll.lat; mp.lng=ll.lng; }
    RT_pinMoveMode=null;
    rtSet(RT_ACT,RT_round); RT_syncActiveToSaved();
    setTimeout(function(){ RT_render(); },0);
    return;
   }
   p.pins[c].push({lat:ll.lat, lng:ll.lng});
   RT_scAdjust(pi,1);
   rtSet(RT_ACT,RT_round);
   RT_syncActiveToSaved();
   setTimeout(function(){ RT_render(); },0);
  });
 });
}
function RT_redrawPins(pi){
 var inst=RT_holeMapInst[pi]; if(!inst) return;
 var rd=RT_round, p=rd.players[pi], c=rd.cur;
 var rot=inst.rot||0;
 inst.layer.clearLayers();
 var pins=p.pins[c]||[];
 var _lp=RT_lastPuttIdx(pins);
 pins.forEach(function(pt,idx){
  /* Zahl/Icon im Pin immer gegen die Kartendrehung gegenrotieren, damit es lesbar aufrecht bleibt. */
  var vis=RT_pinMarkerVisual(pt,idx,idx===_lp);
  var icon=L.divIcon({className:'',html:'<div style="width:22px;height:22px;border-radius:50%;background:'+vis.bg+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);transform:rotate('+(-rot)+'deg);">'+vis.label+'</div>',iconSize:[22,22],iconAnchor:[11,11]});
  var m=L.marker([pt.lat,pt.lng],{icon:icon}).addTo(inst.layer);
  m.on('click', function(ev){
   if(ev.originalEvent)L.DomEvent.stopPropagation(ev.originalEvent);
   RT_pinMenu(pi,idx);
  });
 });
}
function RT_drawRefMarkers(pi){
 var inst=RT_holeMapInst[pi]; if(!inst||!inst.refLayer) return;
 var rd=RT_round; if(!rd) return;
 var c=rd.cur;
 var ref=RT_refFor(rd,c); if(!ref) return;
 inst.refLayer.clearLayers();
 var rot=inst.rot||0;
 function mk(pt,label,bg,fg){
  if(!pt) return;
  fg=fg||'#fff';
  var icon=L.divIcon({className:'',html:'<div style="width:20px;height:20px;border-radius:50%;background:'+bg+';color:'+fg+';display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transform:rotate('+(-rot)+'deg);">'+label+'</div>',iconSize:[20,20],iconAnchor:[10,10]});
  L.marker([pt.lat,pt.lng],{icon:icon,interactive:false}).addTo(inst.refLayer);
 }
 mk(ref.pin,'\u26f3','#FFFFFF');
 mk(ref.mid,'M','#0A84FF');
 if(ref.tees) Object.keys(ref.tees).forEach(function(k){ var bg=RT_teeColorFor(k); mk(ref.tees[k],'T',bg,RT_teeTextColorFor(bg)); });
}
/* Ausgangspunkt der Grabber-Distanzringe: bewusst der ABSCHLAG dieser Bahn - und zwar
   der Abschlag, den ICH in dieser Runde spiele (Tee-Name aus meinem Spieler-Eintrag,
   nachgeschlagen in den Referenzpunkten der Bahn). Die Ringe beantworten damit die Frage
   "wie weit muss ich vom Tee aus schlagen" und bleiben ueber die ganze Bahn stabil,
   statt mit dem eigenen Standort mitzuwandern. Nur wenn kein Abschlagpunkt hinterlegt
   ist, wird auf GPS bzw. die bisherigen Ersatzpunkte zurueckgefallen. */
/* ---------- Wind (Backlog A4) ----------
   Quelle: Open-Meteo ueber die eigene Worker-Route /api/wind. Kein Schluessel, keine
   Registrierung, und weil der Worker dazwischensteht, sieht der Dienst nie die IP des
   Spielers. Bezugspunkt ist die Bahn selbst (Loch, sonst Abschlag), nicht der GPS-Standort:
   so steht der Wind auch dann, wenn noch kein Signal da ist, und der Wert wechselt nicht
   bei jedem Schritt. */
var RT_IC_WIND='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABWGlDQ1BJQ0MgUHJvZmlsZQAAeJx9kLFLw1AQxr9WpaB1EB0cHDKJQ5SSCro4tBVEcQhVweqUvqapkMZHkiIFN/+Bgv+BCs5uFoc6OjgIopPo5uSk4KLleS+JpCJ6j+N+fO+74zggOW5wbvcDqDu+W1zKK5ulLSX1jAS9IAzm8Zyur0r+rj/j/T703k7LWb///43Biukxqp+UGcZdH0ioxPqezyXvE4+5tBRxS7IV8onkcsjngWe9WCC+JlZYzagQvxCr5R7d6uG63WDRDnL7tOlsrMk5lBNYxA48cNgw0IQCHdk//LOBv4BdcjfhUp+FGnzqyZEiJ5jEy3DAMAOVWEOGUpN3ju53F91PjbWDJ2ChI4S4iLWVDnA2Rydrx9rUPDAyBFy1ueEagdRHmaxWgddTYLgEjN5Qz7ZXzWrh9uk8MPAoxNskkDoEui0hPo6E6B5T8wNw6XwBA6diE8HYWhMAAAGAUExURVJncXWIk4SXomV6hH2RnIKTnVxyfPz9/QAAAKu1uZejqMvT1WF1fbrEx0leaMXN0F51gP7//+Xr7LO9wdvj5X9/f4GOk6KsslBkbE9jZlVVVVBjbFBkbaqqqqu1u1RnbE9ka36UoISXooSZpKy1ugB/fwD//01Vak1dZX+Nm3///4OXnoSYo4Wbpbu7u9je4D8/Pz8/f1BaX0dfZ05dYVVVqlWqqn+Pl32EiHqHiXGNqnqZo4mJnJmZmYKSn4+hp5qipJOjp5WjrKGts7i+xLrHzbXBxcbG1MPPz8rP1MXJzcjS183Q1dPb38bR19Te4tfn393j6uHn7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF+00wUAAACAdFJOU/7+/v/+/v//AP7+/v7+/v//Bf/+/wL//9cRA1GhA6Iqgv+hz9YCAQ2kEgJRL4IL/wQEMyDJAwMgS8YJGQ0Z3VKEpN/cV1KBEiuh3TNXo8aEIEsrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAznxhzAAAA9ZJREFUeNrNmOeW2zYQRgcAUQiSkSiqrLzVuxt3O733YqfYSey8/8NkBgCrSJWlfuQ7EgkMBpczA4I8h2Cc8s/w//Litoj31y8//fDYmM8feAJ4jjGvL37mXEaR7FVpj0IPJTnnN9fPjFnUoBcmf2URww+W5c+/9SRw8by9tXegeNTNF5QQgXLzruBj9NScE+iJyTM+Tt9gdpA/yf/mchzo5utFDrn5p2AjI7LPzTnk/ya4oCNJ/NkDMH9ljMuRLHtt4LfERnx8SI/hzQQpYzmSP4U/MLMqovt3Rl3DnzFlJj0sIrpsVcyFWzmE2EPTWyNqfg+TleRhO7p92Nq3vHFyG7WxjZ3FTyMXyFbVfvaOUdkOPlG1/72t8o1qoTWAmtaWaOB+a8qAHxSWueEhB0kgxlg0eK0AihHEqOkPzP/8KUTNlvjckaxnevAhOZBHMHdwmFoYyDKeaa1nWYmqic7BGRgj0DZFTH6g9TzBw0xWF6sCr/12gRhL9JzjSeK5nOQQsh36TpDVsyWVgrG5Llwg+Kd17oS0E5TpOFQfkX6uTbBoswk/LKK5lqElNTYjQgfFh6VWjS9nDjTRukC2nLRJu4tdSWK1KEFtBXXFSlfBHgQSmZ4wiYsYi2CY6OwOoBCAyy+IY/W3gWxb4amcaL2iQmldezZz2wCJalE6mvnSZNkQiHcC4pOmEhKeM8tET/XZFhATXiwcS0Nv9cU20L6riDeCHAKJrobsOBLjjSlaqdU9nmxTWTHfwu2WifIqHZCI9QFKeMqqUgrRioiFl1ZX1Tuu8TZiadpK1YGEW5qeWqSiT6nqGQmgZm2FIqVpSn+6bj2JeqwX3gE5STuoleUsHQLZrmlHkbP+hDdB6SrrU0GKC9y7896gEFSbpw4EW4UPpKQfxDugHYJ0rq0aAAXUlOQbHa/pVIFKp+6GAK4TVdmbIJUqNVVeU4VL3Oj5OwH/IuNA/koopmepv8mQr4iFs6YQS0hVQ61OJWA6A+EuNA2gasxfjkBqt0DouWsIiigBsemxD4hWK9GcpmMxCh33THEgt67kr4aXnZ6roaEFqLYndSvQdinI6M0qlviosZujzYh2ksqnle0Z9BHtKxYn8yQWA6MHgLbr/wcqjgW6PQ7oBC7sUUBn8Kt97xigU3hxnIjWYC7YMTIzkP9+jGpfGjg3P6ajOVfmHuSL/KvRa//wfQNmYb4bG9LaEMicmy9HLr25V36Iuvx0RF6flB+ijPnQrK+aY/veouR3tTYf1R/rFsZ8fHZCQ13VYGxvDJ2cXbY+1qEwy4enj04OyunR6dpNdPoPw8RRvM941t8AAAAASUVORK5CYII=';
var RT_IC_ENTF='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABWGlDQ1BJQ0MgUHJvZmlsZQAAeJx9kLFLw1AQxr9WpaB1EB0cHDKJQ5SSCro4tBVEcQhVweqUvqapkMZHkiIFN/+Bgv+BCs5uFoc6OjgIopPo5uSk4KLleS+JpCJ6j+N+fO+74zggOW5wbvcDqDu+W1zKK5ulLSX1jAS9IAzm8Zyur0r+rj/j/T703k7LWb///43Biukxqp+UGcZdH0ioxPqezyXvE4+5tBRxS7IV8onkcsjngWe9WCC+JlZYzagQvxCr5R7d6uG63WDRDnL7tOlsrMk5lBNYxA48cNgw0IQCHdk//LOBv4BdcjfhUp+FGnzqyZEiJ5jEy3DAMAOVWEOGUpN3ju53F91PjbWDJ2ChI4S4iLWVDnA2Rydrx9rUPDAyBFy1ueEagdRHmaxWgddTYLgEjN5Qz7ZXzWrh9uk8MPAoxNskkDoEui0hPo6E6B5T8wNw6XwBA6diE8HYWhMAAAGAUExURY1kOsiiba2HWMOcabiVaZp0SoZdNJNsQqN7TgAAAK2MY/3778q1lbiRXseshdbGrO/n07qmiZuGbH1jRuXbxbygetzRucu8o5uAW7CcgeHUuf//AH9/ANvBm/nz3HlbOH9/f6pVVaqqVXtbO4FdN4RhO4VgObWacrOYc8Ohc////1VVVX8/P3piOXhjRntkSYRbOIVgOYhkQodpSoRiQr9/f7qdc72db7ulhsSld8u1k8i2mNrSwv8AAOHEmXVOOnFVOH1fPWNVRntgP3lgQIheO4RYNoZeN41xOJF8ZrCJibece76fcKqbjb6gfbWhfriqjbGgiLKnj7mmiqqqqri4m8aNccGZZsOacMGcbsCcb8CfbsaqccGhcsKlfcWvjcKmgMq1lf9/f/+qVeLKqvHu4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPVKsioAAACAdFJOU/7+//7+//7+/wD///7//////v7+//3//////wEC//8pAgMDo9ChzhImzgEDBA8SVBmCVKHcBEvToIFS3P8B/w0JSxKE3CtLgQndDYShEjOjEitX3QMSCRkrhKPJCVegpN+kAgP//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUNXd7AAABdtJREFUeNqtmIdy2zgQhgFwIRIAq6LiuCZOz116Lr1c7733fu//CvcvAFJUsaU42dHIFLD7bQXkkTBedg6N+e7RX4+rfHN5/MejL4053AkE4d/PGHP5wZ9SykQmXvhxnUDnyu+fe+MW9Ib5+KE3lZtLEvUfXoJ5BF01l+/L5IUwLQ02v1wGwIO+NfdeMJoZx7u/Z/5h0BlzSZ5QkiQk8gMgYufv76/I5OQoJl359cyOODSfyJfB+Jh+Mofi6lfypUAhph93hPlCJrOWzWYkmXMrewsrJkz+bMRn424KE7kwbzIOplwo4jIouSS+PnaEYzwdOc7Ost5v4sEGZ2H9iZGfim/WYkhKonVK90WzRodkXv27l8vj1ShZByIq86rK98p1/pZARLM8qFDKkqWG8NZfj8/UswKIFm6Z0ut52zLfHtW1g9SjKi8jAEWTRFGLApfEaeqTKMnzPVyT0lJZgbBfj7aryagCb59xFWAoWlU9e0YF9cWD+iJlDtcNU0ZTmCmlSFoIUc6Ldd6U5V6Z51QUx4KQkm1GoOT8hI/QR3z4w0iaglWBTqpYAs2HWNiGdccewvYFIlKdkfeyn1usqCVQf0HRxLkJ2aKl+NT4vQghYAWe6hLLc4bCqwdhhw1juCcFl8f6Tsg8tLxQEUw0ctvoagGFIgAYpFoBp3J1Y5WUiiyU4iGlcKOXaLrXQ4A2d660RWeqrJhx8GmbC4k65HAHwyRuJtFP4lFwXWB/5Cp7BMiOXM57YJWyHHc7hZwFDRTCVeytctVqkK33x636Xj/QGFHUwgSho8paVboJlyCIB6EAmJp6P1oT5nDcB/WjxlDhEIUPuasajGZZygjy41y7YGylDAVtO0DspWNx3WhGmoCDamYqpmZ15crIoWCf4dlfjcQR8v1KqvMgw5+scaXupaaULl2+FcrT5qdwtm1kt1nxWGRZ0PN7Onek+6DGVVuzIYYrzYXIVB/k93OlrfJTFhLQk32b9UCVmzIo7oKAc5p1Be5AmQ0XhMz3KOhinKgPUhO0UqnAyTJKlKYZada1JNNK0phhGaLXjaujWgvammLJz2CWZQll/B4rQ2O+UbwHVIjdkNY6y+Bq6kY2lCjrBhJwl+vAsZpBMEaz+LSW8Wbg0MIOK2hdo7JZqKQWXQIaJ2QKT5qU52QqH8e2+QAVAzNP0kzStnaN9mBeEqSz9hmztD1sORq3duxsOCJYk2OKqmRTLk9nC5DtfeDalWFBcyalN48RZWiZRoH9Y8pHVs9M50G8X6NQXMiEOEni2mpN3kQzD3PhXeKiSPuWDPKGepbeZKg9h6205tOCKcaOYlVsKZCda9JQ8GipxbAD+UWNof8PLW/rxNcvmmX5NuevTK1T4grY1OtHaUHzS6ed7x6e/ImA+FAwZf7KIKRV6TkOyyLI2418IREPzhUHacNUEH8rjPEdgrSWRAyXFmE55diJA6EQEahjzZop4qUVnJUR6SzlaqIMsFdpqhUsJR5SHpDRcBVnVUQs6VboL0dj+Y6yJNJUhPJoj9wMBN2pm3AyOBYoD76ghBBDLg9zGBWlD1pCeUVx2tV8YJAhjgplhHzroUhXik4BaqkLO0ik5u5hugkVEhpXlhZpIAmxErQQbbspMOajLWW30Hkx5KKBI5gRXitAR4jAEXeY7YaH2aFKnrMoUXc4Z7gkhH9h8G/aE18ecZR0oDbxFftIj+WJPobDqmLYPcX0FxXIg46lzIGOlCFztsXLgwTqPNLrQR+tC1oM9HCtjrgr7qxX2kTuiBuvBnRbvP1KOOKaMOdeBeeCEebgJIYDL7PP7xlx1rwj/MrgxKCBuGXOiqe7H15kyGBD0IA1B/MRXXxz96kwu+Zm8BBZg/BaJWIwvx7zGNwERBhz1rx1hOFGIgbvA+F/iNoxB+dPTBLnD8xO+9PY6+b5rU2CEitWPrgG8+7Hul1jDi6cH7xgWKjyhQNv3IGMec2Y6zfOvXsqSpryKz725VQn6d1zt697Qy//A40UeKWSQmXtAAAAAElFTkSuQmCC';
function RT_wxAdd(rd,j){ if(!rd||!j||j.spd===undefined||j.spd===null) return; if(rd.done) return; if(!rd.wxStart){ rd.wxStart={spd:Number(j.spd)||0, temp:(j.temp!==undefined&&j.temp!==null)?(Number(j.temp)||0):null}; } if(!rd.wx) rd.wx={n:0,spd:0,temp:0,tc:0}; rd.wx.n++; rd.wx.spd+=Number(j.spd)||0; if(j.temp!==undefined&&j.temp!==null){ rd.wx.temp+=Number(j.temp)||0; rd.wx.tc++; } try{ rtSet(RT_ACT, rd); }catch(e){} }
function RT_wxBadgeHtml(rd){ if(!rd) return ''; var sp=null,tp=null; if(rd.wxStart&&rd.wxStart.spd!=null){ sp=Math.round(rd.wxStart.spd); tp=(rd.wxStart.temp!=null)?Math.round(rd.wxStart.temp):null; } else if(rd.wx&&rd.wx.n){ sp=Math.round(rd.wx.spd/rd.wx.n); tp=rd.wx.tc?Math.round(rd.wx.temp/rd.wx.tc):null; } if(sp==null) return ''; return '<div style="position:absolute;top:11px;left:13px;display:flex;align-items:center;gap:5px;background:rgba(8,24,14,.42);border-radius:9px;padding:3px 8px 3px 6px;">'+'<img src="'+RT_IC_WIND+'" style="width:15px;height:15px;display:block;">'+'<span style="font-size:11px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5);">'+sp+' km/h'+(tp!==null?' · '+tp+'°C':'')+'</span></div>'; }
var RT_wind={data:null,ts:0,key:'',loading:false,err:null,errKey:'',errTs:0};
var RT_WIND_TTL_MS=10*60*1000;
var RT_WIND_ERR_TTL_MS=60*1000;
/* Wetter-/Windzeile fuer die gespeicherte Rundenansicht: zeigt den bei der Runde
   aufgezeichneten Wind (Beginn aus rd.wxStart, sonst Mittel aus rd.wx) inkl. Temperatur.
   Rein informativ - stammt aus den waehrend des Spiels geholten Open-Meteo-Werten. */
function RT_wxRoundLine(rd){
 if(!rd) return '';
 var sp=null,tp=null,avg=null;
 if(rd.wxStart&&rd.wxStart.spd!=null){ sp=Math.round(rd.wxStart.spd); tp=(rd.wxStart.temp!=null)?Math.round(rd.wxStart.temp):null; }
 if(rd.wx&&rd.wx.n){ avg=Math.round(rd.wx.spd/rd.wx.n); if(tp==null&&rd.wx.tc){ tp=Math.round(rd.wx.temp/rd.wx.tc); } }
 if(sp==null&&avg==null) return '';
 var main=(sp!=null?sp:avg)+' km/h'+(tp!=null?' · '+tp+'°C':'');
 var sub=(sp!=null?'Wind zu Rundenbeginn':'Wind Ø Runde');
 if(sp!=null&&avg!=null&&avg!==sp) sub+=' · Ø '+avg+' km/h';
 return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;padding:9px 12px;background:#F8FBF5;border:1px solid #EDF2E9;border-radius:11px;">'
  +'<img src="'+RT_IC_WIND+'" style="width:16px;height:16px;flex:none;display:block;">'
  +'<div style="flex:1;min-width:0;"><div style="font-size:12.5px;font-weight:700;color:#143522;">'+main+'</div>'
  +'<div style="font-size:10.5px;color:#8A9C8E;">'+sub+'</div></div></div>';
}
function RT_windRefPoint(rd,c){
 var ref=RT_refFor(rd,c);
 if(ref){
  if(ref.pin&&ref.pin.lat!==undefined&&ref.pin.lat!==null) return {lat:ref.pin.lat,lng:ref.pin.lng};
  if(ref.mid&&ref.mid.lat!==undefined&&ref.mid.lat!==null) return {lat:ref.mid.lat,lng:ref.mid.lng};
  var t=RT_grabberTeePoint(rd,c); if(t) return {lat:t.lat,lng:t.lng};
 }
 if(RT_curPos) return {lat:RT_curPos.lat,lng:RT_curPos.lng};
 return null;
}
function RT_windFetch(rd,c,force){
 var p=RT_windRefPoint(rd,c); if(!p) return;
 var key=p.lat.toFixed(3)+','+p.lng.toFixed(3);
 var fresh=(RT_wind.key===key)&&RT_wind.data&&((Date.now()-RT_wind.ts)<RT_WIND_TTL_MS);
 var recentErr=(RT_wind.errKey===key)&&RT_wind.errTs&&((Date.now()-RT_wind.errTs)<RT_WIND_ERR_TTL_MS);
 if(RT_wind.loading||(fresh&&!force)||(recentErr&&!force)) return;
 RT_wind.loading=true; RT_wind.err=null;
 fetch('/api/wind?lat='+encodeURIComponent(p.lat)+'&lng='+encodeURIComponent(p.lng))
  .then(function(r){ return r.json(); })
  .then(function(j){
   RT_wind.loading=false;
   if(!j||j.error||j.spd===undefined||j.spd===null){ RT_wind.err='nicht verfügbar'; RT_wind.errKey=key; RT_wind.errTs=Date.now(); }
   else { RT_wind.data=j; RT_wind.ts=Date.now(); RT_wind.key=key; RT_wind.err=null; RT_wind.errKey=''; RT_wind.errTs=0; try{RT_wxAdd(rd,j);}catch(e){} }
   RT_render(); try{RT_windOverlayRefresh();}catch(e){}
  })
  .catch(function(e){ RT_wind.loading=false; RT_wind.err='nicht verfügbar'; RT_wind.errKey=key; RT_wind.errTs=Date.now(); RT_render(); try{RT_windOverlayRefresh();}catch(e){} });
}
/* Spielrichtung: von der letzten eigenen Balllage (sonst vom eigenen Abschlag) zum Loch.
   Damit dreht sich die Nadel mit, sobald man die Bahn hinunterspielt. */
function RT_playBearing(rd,c){
 var ref=RT_refFor(rd,c); if(!ref||!ref.pin||ref.pin.lat===undefined||ref.pin.lat===null) return null;
 var from=RT_lastBallPos(rd,c)||RT_grabberTeePoint(rd,c)||(RT_curPos?{lat:RT_curPos.lat,lng:RT_curPos.lng}:null);
 if(!from) return null;
 var la=(from.lat+ref.pin.lat)/2*Math.PI/180;
 var dn=(ref.pin.lat-from.lat)*111320;
 var de=(ref.pin.lng-from.lng)*111320*Math.cos(la);
 if(Math.abs(dn)<1&&Math.abs(de)<1) return null;
 return (Math.atan2(de,dn)*180/Math.PI+360)%360;
}
/* dir ist die Richtung, AUS der der Wind kommt. Der Wind weht also nach dir+180.
   Relativ zur Spielrichtung ergibt sich daraus, ob er schiebt, bremst oder versetzt. */
function RT_windRelDeg(rd,c){
 if(!RT_wind.data||RT_wind.data.dir===undefined||RT_wind.data.dir===null) return null;
 var b=RT_playBearing(rd,c); if(b===null) return null;
 var d=((RT_wind.data.dir+180)-b+540)%360-180;
 return d;
}
function RT_windLabel(d){
 if(d===null) return '';
 var a=Math.abs(d);
 var seite=(a>12&&a<168)?(d>0?' von links':' von rechts'):'';
 if(a<=35) return 'Rückenwind'+seite;
 if(a>=145) return 'Gegenwind'+seite;
 if(a<=80||a>=100) return (a<90?'Rückenwind schräg':'Gegenwind schräg')+seite;
 return 'Seitenwind'+seite;
}
function RT_windStrengthText(s){
 if(s===undefined||s===null) return '';
 if(s<2) return 'windstill';
 if(s<8) return 'kaum spürbar';
 if(s<16) return 'leicht';
 if(s<25) return 'spürbar';
 if(s<35) return 'stark';
 return 'sehr stark';
}
/* Nadel: oben ist immer die Spielrichtung. Der Pfeil zeigt, wohin der Wind weht. */
function RT_windArrowSvg(d,spd){
 var col=(spd>=25)?'#D64550':(spd>=12?'#B7791F':'#1F8A4D');
 return '<svg viewBox="0 0 40 40" width="34" height="34" style="flex:none;">'+
  '<circle cx="20" cy="20" r="18" fill="#F1F6EC" stroke="#DFE8DA"/>'+
  '<path d="M20 5 L20 11" stroke="#9AAB9E" stroke-width="1.5" stroke-linecap="round"/>'+
  '<g transform="rotate('+d.toFixed(1)+' 20 20)">'+
   '<path d="M20 31 L20 12 M20 12 L15.5 17 M20 12 L24.5 17" fill="none" stroke="'+col+
   '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>'+
  '</g></svg>';
}
function RT_windCardHtml(rd,c){
 var h='<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:8px 10px;'+
  'background:#F8FBF5;border:1px solid #EDF2E9;border-radius:11px;">';
 if(RT_wind.loading&&!RT_wind.data){
  return h+'<div style="font-size:11.5px;color:#8A9C8E;">Wind wird geladen…</div></div>';
 }
 if(!RT_wind.data){
  return h+'<div style="font-size:11.5px;color:#8A9C8E;flex:1;">Wind '+(RT_wind.err||'nicht verfügbar')+'</div>'+
   '<button class="rt-btn3" style="padding:4px 10px;font-size:11px;width:auto;margin:0;" onclick="RT_windFetch(RT_round,RT_round.cur,true)">Erneut</button></div>';
 }
 var w=RT_wind.data;
 var spd=Math.round(w.spd);
 var d=RT_windRelDeg(rd,c);
 var alt=Math.round((Date.now()-RT_wind.ts)/60000);
 h+=(d===null?'':RT_windArrowSvg(d,spd));
 h+='<div style="flex:1;min-width:0;">';
 h+='<div style="font-size:12.5px;font-weight:700;color:#143522;">'+
    (d===null?('Wind '+spd+' km/h'):(RT_windLabel(d)+' · '+spd+' km/h'))+'</div>';
 var sub=RT_windStrengthText(w.spd);
 if(w.gust!==undefined&&w.gust!==null&&(w.gust-w.spd)>=8) sub+=' · Böen '+Math.round(w.gust)+' km/h';
 if(w.temp!==undefined&&w.temp!==null) sub+=' · '+Math.round(w.temp)+'°C';
 if(alt>=10) sub+=' · vor '+alt+' min';
 h+='<div style="font-size:10.5px;color:#8A9C8E;">'+sub+'</div>';
 h+='</div>';
 h+='<button class="rt-btn3" style="padding:4px 8px;font-size:11px;width:auto;margin:0;flex:none;" onclick="RT_windFetch(RT_round,RT_round.cur,true)" title="Wind aktualisieren">&#8635;</button>';
 return h+'</div>';
}
function RT_grabberTeePoint(rd,c){
 var ref=RT_refFor(rd,c); if(!ref||!ref.tees) return null;
 var norm=function(x){ return (x||'').trim().toLowerCase(); };
 var mi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(rd):0;
 var me=rd.players&&(rd.players[mi]||rd.players[0]);
 var want=norm(me&&me.tee);
 var keys=Object.keys(ref.tees);
 if(want){
  for(var i=0;i<keys.length;i++){
   var t=ref.tees[keys[i]];
   if(t&&t.lat!==undefined&&t.lat!==null&&norm(keys[i])===want) return {lat:t.lat,lng:t.lng,teeName:keys[i]};
  }
 }
 for(var j=0;j<keys.length;j++){
  var t2=ref.tees[keys[j]];
  if(t2&&t2.lat!==undefined&&t2.lat!==null) return {lat:t2.lat,lng:t2.lng,teeName:keys[j]};
 }
 return null;
}
/* Wie RT_grabberTeePoint, aber fuer einen BELIEBIGEN Spieler pi (nicht nur den eigenen).
   Beim Abschlag-Markieren soll der hinterlegte Abschlag DES JEWEILIGEN Spielers gelten -
   also der User-Abschlag beim User, der Mitspieler-Abschlag beim Mitspieler, nicht GPS. */
function RT_teePointForPlayer(rd,c,pi){
 var ref=RT_refFor(rd,c); if(!ref||!ref.tees) return null;
 var norm=function(x){ return (x||'').trim().toLowerCase(); };
 var pl=rd.players&&(rd.players[pi]||rd.players[0]);
 var want=norm(pl&&pl.tee);
 var keys=Object.keys(ref.tees);
 if(want){
  for(var i=0;i<keys.length;i++){
   var t=ref.tees[keys[i]];
   if(t&&t.lat!==undefined&&t.lat!==null&&norm(keys[i])===want) return {lat:t.lat,lng:t.lng,teeName:keys[i]};
  }
 }
 for(var j=0;j<keys.length;j++){
  var t2=ref.tees[keys[j]];
  if(t2&&t2.lat!==undefined&&t2.lat!==null) return {lat:t2.lat,lng:t2.lng,teeName:keys[j]};
 }
 return null;
}
function RT_grabberCenter(rd,c){
 var tee=RT_grabberTeePoint(rd,c);
 if(tee) return {lat:tee.lat,lng:tee.lng,teeName:tee.teeName};
 if(RT_curPos) return {lat:RT_curPos.lat,lng:RT_curPos.lng};
 var lastBall=RT_lastBallPos(rd,c);
 if(lastBall) return {lat:lastBall.lat,lng:lastBall.lng};
 var ref=RT_refFor(rd,c);
 if(ref&&ref.mid) return {lat:ref.mid.lat,lng:ref.mid.lng};
 if(ref&&ref.pin) return {lat:ref.pin.lat,lng:ref.pin.lng};
 return null;
}
/* Distanz-Grabber (Vollbild-Satellitenkarte).
   Fruehere Fassung: fuenf volle L.circle auf der KLEINEN Karte, Ziehpunkt an Leaflets
   L.Draggable. Beides ist entfallen - die kleine Karte zeigt nur noch Markierungen, und
   das Ziehen laeuft jetzt rotationskorrigiert, weil die Vollbildkarte per CSS gedreht ist
   (Leaflet kennt diese Rotation nicht; siehe RT_setupRotDrag).
   Dargestellt werden Kreis-AUSSCHNITTE um den eigenen Abschlag in Richtung Fahne. */
function RT_grabDest(lat,lng,brgDeg,dM){
 var R=6371000, br=brgDeg*Math.PI/180, la=lat*Math.PI/180, lo=lng*Math.PI/180, dr=dM/R;
 var la2=Math.asin(Math.sin(la)*Math.cos(dr)+Math.cos(la)*Math.sin(dr)*Math.cos(br));
 var lo2=lo+Math.atan2(Math.sin(br)*Math.sin(dr)*Math.cos(la), Math.cos(dr)-Math.sin(la)*Math.sin(la2));
 return [la2*180/Math.PI, lo2*180/Math.PI];
}
function RT_grabBearing(a,b){
 var la1=a.lat*Math.PI/180, la2=b.lat*Math.PI/180, dl=(b.lng-a.lng)*Math.PI/180;
 var y=Math.sin(dl)*Math.cos(la2);
 var x=Math.cos(la1)*Math.sin(la2)-Math.sin(la1)*Math.cos(la2)*Math.cos(dl);
 return (Math.atan2(y,x)*180/Math.PI+360)%360;
}
/* Bis 150 m in 25er-Schritten, danach 50er - sonst haette Bahn 3 (509 m) zwanzig Boegen. */
function RT_grabRadii(totalM){
 var out=[], r=25, cap=(totalM||250);
 while(r<=cap&&out.length<24){ out.push(r); r+=(r<150?25:50); }
 return out;
}
/* Zielausschnitt fuer die Vollbildkarte aus eigenem Abschlag und Fahne. Rueckgabe ist der
   Mittelpunkt beider Punkte plus die Zoomstufe, bei der die Bahnlaenge rund 86 Prozent der
   sichtbaren Hoehe einnimmt. 156543.03392 ist die Aufloesung in m/px bei Zoom 0 am Aequator,
   der Kosinus korrigiert die Breitengrad-Stauchung von Web Mercator. */
function RT_teePinFit(rd,c,el){
 if(typeof RT_grabberCenter!=='function') return null;
 var center=RT_grabberCenter(rd,c);
 var ref=RT_refFor(rd,c);
 var pin=(ref&&ref.pin&&ref.pin.lat!==undefined&&ref.pin.lat!==null)?ref.pin:null;
 if(!center||!pin) return null;
 var d=RT_haversineM(center.lat,center.lng,pin.lat,pin.lng);
 if(!d||d<30) return null;
 var wrap=(el&&el.parentElement)?el.parentElement:null;
 var H=(wrap&&wrap.clientHeight)||(el&&el.clientHeight)||520;
 var mLat=(center.lat+pin.lat)/2, mLng=(center.lng+pin.lng)/2;
 var mpp=d/(H*0.86);
 var z=Math.log(156543.03392*Math.cos(mLat*Math.PI/180)/mpp)/Math.LN2;
 if(!isFinite(z)) return null;
 z=Math.max(14,Math.min(17.5,Math.round(z*10)/10));
 return {lat:mLat,lng:mLng,zoom:z};
}
function RT_windRoseSvg(d,spd){
 var col=(spd>=25)?'#FF6B6B':(spd>=12?'#F6C35A':'#7FE0A6');
 function pt(a,l,w){ var rad=a*Math.PI/180; return {tx:22+l*Math.sin(rad),ty:22-l*Math.cos(rad),b1x:22+w*Math.cos(rad),b1y:22+w*Math.sin(rad),b2x:22-w*Math.cos(rad),b2y:22-w*Math.sin(rad)}; }
 function star(a,l,fa,fb){ var p=pt(a,l,3.2); return '<path d="M'+p.tx.toFixed(1)+' '+p.ty.toFixed(1)+' L22 22 L'+p.b1x.toFixed(1)+' '+p.b1y.toFixed(1)+' Z" fill="'+fa+'"/><path d="M'+p.tx.toFixed(1)+' '+p.ty.toFixed(1)+' L22 22 L'+p.b2x.toFixed(1)+' '+p.b2y.toFixed(1)+' Z" fill="'+fb+'"/>'; }
 var g='<svg viewBox="0 0 44 44" width="46" height="46" style="flex:none;width:46px;height:46px;display:block;">';
 g+='<circle cx="22" cy="22" r="20" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1"/>';
 for(var i=0;i<24;i++){ var a=i*15*Math.PI/180, r1=(i%6===0)?16.5:18; g+='<line x1="'+(22+r1*Math.sin(a)).toFixed(1)+'" y1="'+(22-r1*Math.cos(a)).toFixed(1)+'" x2="'+(22+19.5*Math.sin(a)).toFixed(1)+'" y2="'+(22-19.5*Math.cos(a)).toFixed(1)+'" stroke="rgba(255,255,255,.4)" stroke-width="'+(i%6===0?1.3:0.8)+'"/>'; }
 [45,135,225,315].forEach(function(a){ g+=star(a,9,'rgba(255,255,255,.55)','rgba(255,255,255,.85)'); });
 [0,90,180,270].forEach(function(a){ g+=star(a,15,'rgba(255,255,255,.75)','#ffffff'); });
 g+='<circle cx="22" cy="22" r="2.4" fill="#fff"/>';
 var rot=(d===null?0:d);
 g+='<g transform="rotate('+rot.toFixed(1)+' 22 22)"><line x1="22" y1="30" x2="22" y2="14" stroke="'+col+'" stroke-width="2.6" stroke-linecap="round"/><path d="M22 11 L18 17 L26 17 Z" fill="'+col+'"/></g>';
 g+='</svg>'; return g;
}
function RT_thermoSvg(t){
 var col=(t!==undefined&&t!==null)?((t<=4)?'#7FB6FF':(t>=24?'#FF8A5B':'#eaf2ea')):'#eaf2ea';
 return '<svg viewBox="0 0 24 24" width="12" height="14" style="flex:none;width:12px;height:14px;display:block;"><path d="M13 13.5V5a2.2 2.2 0 10-4.4 0v8.5a3.6 3.6 0 104.4 0z" fill="none" stroke="'+col+'" stroke-width="1.7"/><rect x="10.1" y="7" width="1.8" height="6.6" rx="0.9" fill="'+col+'"/><circle cx="11" cy="17.3" r="2.2" fill="'+col+'"/></svg>';
}
function RT_windGlyphSvg(sz,col){
 col=col||'#eaf2ea';
 return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" style="flex:none;width:'+sz+'px;height:'+sz+'px;display:block;"><g fill="none" stroke="'+col+'" stroke-width="1.7" stroke-linecap="round"><path d="M3 8h8.2a2.1 2.1 0 10-2.1-2.1"/><path d="M3 12h12.5a2.3 2.3 0 11-2.3 2.3"/><path d="M3 16h6.5"/></g></svg>';
}
function RT_windOverlayRefresh(){
 var ov=document.getElementById('rt-wind-ui'); if(!ov) return;
 var rd=RT_round; if(!rd) return;
 var key=RT_holeMapKey(rd,rd.cur);
 var on=!!(RT_state.windOn&&RT_state.windOn[key]);
 try{ ov.innerHTML=RT_windOverlayContent(rd,rd.cur); ov.style.display=on?'flex':'none'; }catch(e){}
}
function RT_windOverlayContent(rd,c){
 var w=RT_wind.data;
 if(!w){ return '<span style="font-size:12px;color:#fff;padding:2px 8px;white-space:nowrap;">Wind nicht verfügbar</span>'; }
 var spd=Math.round(w.spd);
 var d=RT_windRelDeg(rd,c);
 var dir=(d===null?'Wind':RT_windLabel(d));
 var hasT=(w.temp!==undefined&&w.temp!==null);
 var l2=RT_windGlyphSvg(14,'#eaf2ea')+'<span style="font-weight:700;">'+spd+'</span> km/h';
 if(hasT) l2+='<span style="opacity:.4;padding:0 2px;">·</span>'+RT_thermoSvg(w.temp)+'<span style="font-weight:700;">'+Math.round(w.temp)+'°</span>';
 return '<div style="width:58px;height:58px;border-radius:14px;background:rgba(8,20,13,.66);display:flex;align-items:center;justify-content:center;flex:none;">'+RT_windRoseSvg(d,spd)+'</div>'+
  '<div style="display:flex;flex-direction:column;gap:3px;min-width:0;line-height:1.2;text-align:left;">'+
   '<div style="font-size:12.5px;font-weight:700;color:#fff;white-space:nowrap;">'+dir+'</div>'+
   '<div style="font-size:11.5px;color:#e8f0e6;display:flex;align-items:center;gap:4px;white-space:nowrap;">'+l2+'</div>'+
  '</div>';
}
/* ============================================================
   Wetterradar (Bahnkarte, rechte Toolbar)
   - Aktuelles Wetter + Stunden-Vorschau ueber /api/wx (Open-Meteo, serverseitig)
   - Niederschlagsradar von RainViewer als animierter Kachel-Layer ueber heller
     Esri-Basiskarte (Light Gray Canvas). RainViewer laedt clientseitig, weil
     Kachel-Requests zwingend die Client-IP brauchen.
   ============================================================ */
var RT_TRANSPX='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
var RT_wxState={data:null,ts:0,loading:false,err:null,key:''};
var RT_RADAR={map:null,layers:[],frames:[],idx:0,timer:null,playing:false};

function RT_radarCenter(){
 var rd=RT_round;
 if(rd){
  var ref=RT_refFor(rd,rd.cur);
  if(ref&&ref.pin&&ref.pin.lat!=null) return {lat:ref.pin.lat,lng:ref.pin.lng};
  var ctr=RT_grabberCenter(rd,rd.cur);
  if(ctr&&ctr.lat!=null) return {lat:ctr.lat,lng:ctr.lng};
 }
 if(RT_curPos&&RT_curPos.lat!=null) return {lat:RT_curPos.lat,lng:RT_curPos.lng};
 return {lat:51.05,lng:6.9};
}
function RT_wxCompass(dir){
 if(dir==null) return '';
 var names=['N','NO','O','SO','S','SW','W','NW'];
 return names[Math.round(((dir%360)/45))%8];
}
function RT_wxCode(code){
 var c=(code==null)?-1:code;
 if(c===0) return {e:'☀️',t:'Klar'};
 if(c===1) return {e:'🌤️',t:'Heiter'};
 if(c===2) return {e:'⛅',t:'Wolkig'};
 if(c===3) return {e:'☁️',t:'Bedeckt'};
 if(c===45||c===48) return {e:'🌫️',t:'Nebel'};
 if(c>=51&&c<=57) return {e:'🌦️',t:'Niesel'};
 if(c>=61&&c<=67) return {e:'🌧️',t:'Regen'};
 if(c>=71&&c<=77) return {e:'🌨️',t:'Schnee'};
 if(c>=80&&c<=82) return {e:'🌦️',t:'Schauer'};
 if(c>=85&&c<=86) return {e:'🌨️',t:'Schneeschauer'};
 if(c>=95) return {e:'⛈️',t:'Gewitter'};
 return {e:'🌥️',t:''};
}
function RT_wxHourLabel(iso){
 var t=(iso||'').slice(11,16); return t||'';
}
function RT_wxFetch(force){
 var p=RT_radarCenter();
 var key=p.lat.toFixed(3)+','+p.lng.toFixed(3);
 var fresh=(RT_wxState.key===key)&&RT_wxState.data&&((Date.now()-RT_wxState.ts)<600000);
 if(RT_wxState.loading||(fresh&&!force)){ RT_wxRenderBody(); return; }
 RT_wxState.loading=true; RT_wxState.err=null; RT_wxRenderBody();
 fetch('/api/wx?lat='+encodeURIComponent(p.lat)+'&lng='+encodeURIComponent(p.lng))
  .then(function(r){ return r.json(); })
  .then(function(j){
   RT_wxState.loading=false;
   if(!j||j.error||j.temp===undefined){ RT_wxState.err='nicht verfügbar'; }
   else { RT_wxState.data=j; RT_wxState.ts=Date.now(); RT_wxState.key=key; }
   RT_wxRenderBody();
  })
  .catch(function(){ RT_wxState.loading=false; RT_wxState.err='nicht verfügbar'; RT_wxRenderBody(); });
}
function RT_wxRenderBody(){
 var host=document.getElementById('rt-wx-body'); if(!host) return;
 if(RT_wxState.loading&&!RT_wxState.data){ host.innerHTML='<div style="color:#9fb3a4;font-size:12.5px;padding:6px 2px;">Wetter wird geladen…</div>'; return; }
 if(!RT_wxState.data){
  host.innerHTML='<div style="display:flex;align-items:center;gap:10px;color:#cfe0d4;font-size:12.5px;padding:4px 2px;">Wetter '+(RT_wxState.err||'nicht verfügbar')+'<button onclick="RT_wxFetch(true)" style="border:none;background:rgba(255,255,255,.14);color:#fff;border-radius:8px;padding:4px 10px;font-size:11px;font-family:inherit;cursor:pointer;">Erneut</button></div>';
  return;
 }
 var w=RT_wxState.data;
 var comp=RT_wxCompass(w.dir);
 var arrowRot=(w.dir==null)?0:((w.dir+180)%360);
 var updated=RT_wxHourLabel(w.at);
 var cur='<div style="display:flex;align-items:stretch;gap:0;background:rgba(0,0,0,.34);border-radius:14px;padding:6px 6px;">'
  +RT_wxCell('Temp',(w.temp!=null?Math.round(w.temp)+'°':'–'))
  +RT_wxDivider()
  +RT_wxCell('Feuchte',(w.hum!=null?Math.round(w.hum)+'%':'–'))
  +RT_wxDivider()
  +'<div style="flex:1.3;text-align:center;padding:0 4px;min-width:0;">'
    +'<div style="font-size:10.5px;color:#9fb3a4;margin-bottom:1px;">Wind</div>'
    +'<div style="display:flex;align-items:center;justify-content:center;gap:6px;">'
      +'<span style="font-size:16px;font-weight:800;color:#fff;">'+(w.spd!=null?Math.round(w.spd):'–')+'</span>'
      +'<span style="font-size:11px;color:#cfe0d4;">km/h</span>'
      +(w.dir!=null?('<span style="display:inline-flex;align-items:center;gap:2px;margin-left:2px;"><svg width="15" height="15" viewBox="0 0 24 24" style="transform:rotate('+arrowRot+'deg);"><path d="M12 3l0 18M12 3l-5 6M12 3l5 6" fill="none" stroke="#8FE1A9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span style="font-size:12px;font-weight:700;color:#8FE1A9;">'+comp+'</span></span>'):'')
    +'</div>'
  +'</div>'
 +'</div>';
 var upd=updated?('<div style="font-size:11px;color:#7f948a;text-align:center;margin-top:3px;">Aktualisiert '+updated+' Uhr</div>'):'';
 var hrs='';
 if(w.hours&&w.hours.length){
  var cells=w.hours.slice(0,5).map(function(h){
   var ic=RT_wxCode(h.code);
   var pop=(h.pop!=null&&h.pop>0)?('<div style="font-size:10px;color:#63b3ff;font-weight:700;">'+Math.round(h.pop)+'%</div>'):'<div style="font-size:10px;color:transparent;">0%</div>';
   return '<div style="flex:1;text-align:center;">'
     +'<div style="font-size:16px;line-height:1.1;">'+ic.e+'</div>'
     +pop
     +'<div style="font-size:12px;font-weight:800;color:#fff;margin-top:1px;">'+(h.temp!=null?Math.round(h.temp)+'°':'–')+'</div>'
     +'<div style="font-size:10.5px;color:#9fb3a4;margin-top:2px;">'+RT_wxHourLabel(h.t)+'</div>'
   +'</div>';
  }).join('<div style="width:1px;background:rgba(255,255,255,.09);margin:6px 0;"></div>');
  hrs='<div style="display:flex;align-items:flex-start;margin-top:6px;">'+cells+'</div>';
 }
 host.innerHTML=cur+upd+hrs;
}
function RT_wxCell(lbl,val){
 return '<div style="flex:1;text-align:center;padding:0 4px;min-width:0;">'
  +'<div style="font-size:11px;color:#9fb3a4;margin-bottom:2px;">'+lbl+'</div>'
  +'<div style="font-size:16px;font-weight:800;color:#fff;">'+val+'</div></div>';
}
function RT_wxDivider(){ return '<div style="width:1px;background:rgba(255,255,255,.12);margin:2px 0;"></div>'; }

var RT_radarPrevView=null;
/* RainViewer-Kacheln haben nur bis Zoom 10 echte Aufloesung. Auf dem tief herangezoomten
   Loch (~Zoom 18) wird eine einzelne Radarzelle ueber die ganze Ansicht gestreckt -> man
   sieht praktisch nichts. Beim Radar-Start daher auf eine radartaugliche Regionalansicht
   (Zoom 9) um den Platz herauszoomen. */
function RT_radarZoomOut(map){
 if(!map) return;
 try{ var rc=RT_radarCenter(); map.setView([rc.lat,rc.lng],7,{animate:false}); }catch(e){}
}
function RT_radarBuildOverlay(){
 var host=document.getElementById('hole-full'); if(!host) return;
 var ex=document.getElementById('rt-wxradar-ui'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var o=document.createElement('div'); o.id='rt-wxradar-ui';
 o.style.cssText='position:absolute;inset:0;z-index:2400;pointer-events:none;';
 o.innerHTML=RT_hvPanel('Wetterradar','','<div id="rt-wx-body"></div>','')
  +'<div style="position:absolute;left:12px;top:calc(env(safe-area-inset-top,0px) + 66px);pointer-events:none;display:flex;align-items:center;gap:7px;background:rgba(8,20,13,.72);border-radius:100px;padding:5px 11px;">'
    +'<span style="font-size:10.5px;color:#cfe0d4;">leicht</span>'
    +'<span style="width:46px;height:7px;border-radius:4px;background:linear-gradient(90deg,#8fd1ff,#3a86ff,#33d17a,#f6d32d,#e01b24);display:inline-block;"></span>'
    +'<span style="font-size:10.5px;color:#cfe0d4;">stark</span>'
  +'</div>'
  +'<div style="position:absolute;left:12px;top:calc(env(safe-area-inset-top,0px) + 110px);pointer-events:auto;display:flex;align-items:center;gap:8px;">'
    +'<button id="rt-radar-play" onclick="RT_radarToggle()" style="border:none;width:44px;height:44px;border-radius:50%;background:#1F8A4D;box-shadow:0 2px 8px rgba(0,0,0,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;">'+RT_radarPlayIcon(true)+'</button>'
    +'<span id="rt-radar-time" style="background:rgba(8,20,13,.78);color:#fff;font-size:12px;font-weight:700;border-radius:100px;padding:6px 12px;">–</span>'
  +'</div>';
 host.appendChild(o);
 RT_hvGrabInit();
}
function RT_radarRemoveOverlay(){ var o=document.getElementById('rt-wxradar-ui'); if(o&&o.parentNode) o.parentNode.removeChild(o); }
function RT_toggleRadarHole(){
 if(!RT_requirePremium('map'))return;
 var rd=RT_round; if(!rd) return;
 var key=RT_holeMapKey(rd,rd.cur);
 if(!RT_state.radarOn) RT_state.radarOn={};
 RT_state.radarOn[key]=!RT_state.radarOn[key];
 var on=!!RT_state.radarOn[key];
 RT_tileOp('rt-wxr-toggle',on);
 if(on){ RT_ovCloseOthers('radar'); RT_radarBuildOverlay(); RT_wxFetch(false); RT_radarAttach(RT_holeFullMapInst);
  try{ var _rm=RT_holeFullMapInst; if(_rm){ RT_radarPrevView={c:_rm.getCenter(),z:_rm.getZoom()}; } }catch(e){}
  RT_radarZoomOut(RT_holeFullMapInst); }
 else { RT_radarRemoveOverlay(); RT_radarDetach();
  try{ if(RT_radarPrevView&&RT_holeFullMapInst){ RT_holeFullMapInst.setView(RT_radarPrevView.c,RT_radarPrevView.z,{animate:true}); } }catch(e){} RT_radarPrevView=null; }
}
function RT_radarPlayIcon(playing){
 return playing
  ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
  : '<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M7 4l13 8-13 8z"/></svg>';
}
function RT_radarAttach(map){
 RT_radarDetach();
 if(!map||typeof L==='undefined') return;
 RT_RADAR.map=map;
 if(!map.getPane('wxradar')){ var p=map.createPane('wxradar'); if(p){ p.style.zIndex=350; p.style.pointerEvents='none'; } }
 if(!map.getPane('wxclouds')){ var pc=map.createPane('wxclouds'); if(pc){ pc.style.zIndex=340; pc.style.pointerEvents='none'; } }
 RT_radarLoad();
}
function RT_radarDetach(){
 if(RT_RADAR.timer){ clearInterval(RT_RADAR.timer); RT_RADAR.timer=null; }
 RT_RADAR.playing=false;
 if(RT_RADAR.map&&RT_RADAR.layers&&RT_RADAR.layers.length){
  RT_RADAR.layers.forEach(function(l){ try{ RT_RADAR.map.removeLayer(l); }catch(e){} });
 }
 if(RT_RADAR.cloudLayer&&RT_RADAR.map){ try{ RT_RADAR.map.removeLayer(RT_RADAR.cloudLayer); }catch(e){} } RT_RADAR.cloudLayer=null;
 RT_RADAR.layers=[]; RT_RADAR.frames=[]; RT_RADAR.idx=0; RT_RADAR.map=null;
}
function RT_radarLoad(){
 fetch('https://api.rainviewer.com/public/weather-maps.json')
  .then(function(r){ return r.json(); })
  .then(function(j){
   if(!RT_RADAR.map) return;
   var host=j&&j.host?j.host:'https://tilecache.rainviewer.com';
   var past=(j&&j.radar&&j.radar.past)?j.radar.past:[];
   var now=(j&&j.radar&&j.radar.nowcast)?j.radar.nowcast:[];
   var all=past.slice(-8).concat(now);
   if(!all.length){ var tc=document.getElementById('rt-radar-time'); if(tc) tc.textContent='Kein Radarbild'; return; }
   RT_RADAR.frames=all.map(function(f){ return {path:host+f.path,time:f.time}; });
   RT_RADAR.layers=RT_RADAR.frames.map(function(f){
    return L.tileLayer(f.path+'/256/{z}/{x}/{y}/2/1_1.png',{opacity:0,pane:'wxradar',tileSize:256,maxNativeZoom:7,maxZoom:20,noWrap:true,errorTileUrl:RT_TRANSPX});
   });
   RT_RADAR.layers.forEach(function(l){ l.addTo(RT_RADAR.map); });
   /* Infrarot-Satelliten-Layer entfernt: unterstuetzt nur niedrige Zoomstufen und lieferte
      sonst die "Zoom Level Not Supported"-Kacheln. Das Niederschlagsradar reicht. */
   RT_RADAR.idx=Math.max(0,Math.min(RT_RADAR.frames.length-1,past.slice(-8).length-1));
   RT_radarShow(RT_RADAR.idx);
   RT_RADAR.playing=false; RT_radarToggle();
  })
  .catch(function(){ var tc=document.getElementById('rt-radar-time'); if(tc) tc.textContent='Radar nicht verfügbar'; });
}
function RT_radarShow(i){
 if(!RT_RADAR.layers.length) return;
 RT_RADAR.idx=(i+RT_RADAR.frames.length)%RT_RADAR.frames.length;
 RT_RADAR.layers.forEach(function(l,k){ try{ l.setOpacity(k===RT_RADAR.idx?0.88:0); }catch(e){} });
 var f=RT_RADAR.frames[RT_RADAR.idx];
 var tc=document.getElementById('rt-radar-time');
 if(tc&&f){
  var d=new Date(f.time*1000);
  var hh=('0'+d.getHours()).slice(-2), mm=('0'+d.getMinutes()).slice(-2);
  var past=(f.time*1000)<=Date.now();
  tc.textContent=(past?'':'Vorhersage ')+hh+':'+mm+' Uhr';
 }
}
function RT_radarToggle(){
 var btn=document.getElementById('rt-radar-play');
 if(RT_RADAR.playing){
  if(RT_RADAR.timer){ clearInterval(RT_RADAR.timer); RT_RADAR.timer=null; }
  RT_RADAR.playing=false;
  if(btn) btn.innerHTML=RT_radarPlayIcon(false);
  return;
 }
 if(!RT_RADAR.frames.length) return;
 RT_RADAR.playing=true;
 if(btn) btn.innerHTML=RT_radarPlayIcon(true);
 RT_RADAR.timer=setInterval(function(){
  var next=RT_RADAR.idx+1;
  if(next>=RT_RADAR.frames.length){ next=0; }
  RT_radarShow(next);
 },700);
}
/* ===== Ende Wetterradar ===== */

function RT_hvActiveCss(active){ return active?'background:rgba(31,138,77,.24);box-shadow:0 0 0 3px #1F8A4D,0 3px 9px rgba(0,0,0,.5);transform:scale(1.06);':'background:transparent;box-shadow:none;transform:scale(1);'; }
function RT_hvBtn(name,label,onclick,active,id){
 return '<button '+(id?('id="'+id+'" '):'')+'onclick="'+onclick+'" aria-label="'+label+'" style="pointer-events:auto;border:none;padding:0;cursor:pointer;display:block;border-radius:14px;transition:box-shadow .16s ease,transform .16s ease,background .16s ease;'+RT_hvActiveCss(active)+'"><img src="/hv/'+name+'.png" alt="'+label+'" style="width:50px;height:50px;display:block;border-radius:12px;filter:drop-shadow(0 2px 5px rgba(0,0,0,.5));"></button>';
}
function RT_hvToast(msg){
 var ex=document.getElementById('rt-hv-toast'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var d=document.createElement('div'); d.id='rt-hv-toast';
 d.style.cssText='position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 96px);transform:translateX(-50%);z-index:4000;background:rgba(14,30,21,.94);color:#fff;font-size:13px;font-weight:600;padding:11px 18px;border-radius:100px;box-shadow:0 4px 16px rgba(0,0,0,.4);max-width:82%;text-align:center;';
 d.textContent=msg; document.body.appendChild(d);
 setTimeout(function(){ if(d&&d.parentNode) d.parentNode.removeChild(d); },2200);
}
/* ============================================================
   Shot-Analyse (Overlay auf der Bahnkarte)
   Plottet die getrackten Abschlaege dieser Bahn (erster Schlag je Runde) direkt als Punkte
   auf die Satelliten-Bahnkarte. Kopf-Panel (wie Wetterradar) zeigt Links/Mitte/Rechts,
   darunter eine regelbasierte Empfehlung. Verteilung: seitliche Abweichung Tee->Gruen.
   ============================================================ */
function RT_hvPanel(title,closeFn,extra,grabBox){
 var x=closeFn?('<button onclick="'+closeFn+'" aria-label="Schließen" style="border:none;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;font-size:14px;cursor:pointer;">✕</button>'):'';
 var grabOn=(grabBox!==undefined&&grabBox!==null);
 var grab=grabOn?'<div class="rt-hv-grab" style="position:absolute;left:50%;top:2px;transform:translateX(-50%);width:60px;height:18px;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;pointer-events:auto;"><div style="width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.55);"></div></div>':'';
 var body=grabOn?('<div class="rt-hv-body" style="margin-top:'+(extra?'8px':'0')+';overflow:hidden;transition:max-height .28s ease,opacity .2s ease,margin-top .28s ease;">'+(extra||'')+'</div>'):(extra||'');
 var _col=(grabBox&&grabBox.indexOf('col:')===0)?grabBox.slice(4):''; var _bx=grabOn?(_col?(' data-hvcol="'+_col+'"'):(grabBox?' data-hvbox="'+grabBox+'"':'')):''; var attrs=grabOn?(' class="rt-hv-panel" data-hvgrab="1"'+_bx):'';
 return '<div'+attrs+' style="position:absolute;bottom:0;left:0;right:0;pointer-events:auto;background:rgba(10,22,15,.95);border-radius:18px 18px 0 0;padding:'+(grabOn?'18px':'9px')+' 12px calc(env(safe-area-inset-bottom,0px) + 9px);box-shadow:0 -5px 16px rgba(0,0,0,.55);z-index:6;">'
  +'<div style="display:flex;align-items:center;justify-content:space-between;min-height:30px;'+((extra&&!grabOn)?'margin-bottom:8px;':'')+'">'
    +'<div style="font-size:15px;font-weight:800;color:#fff;">'+title+'</div>'+x
  +'</div>'+body+grab+'</div>';
}
/* Grabber-Steuerung: klappt Kopf-Body (und optional unteren Kasten) 3 s nach Anzeige
   automatisch ein (nur Titel sichtbar, wie beim Fahnenradar). Grabber mittig in der
   Kopfleiste zieht alles wieder herunter. Tippen togglet, Ziehen richtet nach Richtung. */
function RT_hvGrabInit(){ var ps=document.querySelectorAll('.rt-hv-panel[data-hvgrab="1"]'); for(var i=0;i<ps.length;i++) RT_hvGrabWire(ps[i]); }
function RT_hvGrabWire(panel){
 if(panel._grabWired) return; panel._grabWired=true;
 var body=panel.querySelector('.rt-hv-body');
 var grab=panel.querySelector('.rt-hv-grab');
 var boxId=panel.getAttribute('data-hvbox');
 var colId=panel.getAttribute('data-hvcol');
 var expanded=true;
 function setExpanded(on){
  expanded=on;
  if(body){
   if(on){ body.style.maxHeight=body.scrollHeight+'px'; body.style.opacity='1'; body.style.marginTop='8px'; }
   else { body.style.maxHeight=body.scrollHeight+'px'; void body.offsetHeight; body.style.maxHeight='0px'; body.style.opacity='0'; body.style.marginTop='0px'; }
  }
  if(boxId){ var b=document.getElementById(boxId); if(b){ b.style.transition='transform .30s ease'; b.style.transform=on?'translateY(0)':'translateY(135%)'; } }
  if(colId){ var cE=document.getElementById(colId); if(cE){ if(on){ cE.style.maxHeight=cE.scrollHeight+'px'; cE.style.opacity='1'; } else { cE.style.maxHeight=cE.scrollHeight+'px'; void cE.offsetHeight; cE.style.maxHeight='0px'; cE.style.opacity='0'; } } }
 }
 panel._grabTimer=setTimeout(function(){ if(document.body.contains(panel)) setExpanded(false); },3000);
 if(grab){
  var stt=null, sy=0, moved=false;
  grab.addEventListener('pointerdown',function(ev){ ev.preventDefault(); ev.stopPropagation(); try{grab.setPointerCapture(ev.pointerId);}catch(e){} if(panel._grabTimer){ clearTimeout(panel._grabTimer); panel._grabTimer=null; } stt=true; sy=ev.clientY; moved=false; });
  grab.addEventListener('pointermove',function(ev){ if(!stt) return; ev.preventDefault(); ev.stopPropagation(); var dy=ev.clientY-sy; if(Math.abs(dy)>8){ moved=true; if(dy>0){ if(!expanded) setExpanded(true); } else { if(expanded) setExpanded(false); } } });
  function endG(ev){ if(!stt) return; stt=null; ev.stopPropagation(); if(!moved) setExpanded(!expanded); }
  grab.addEventListener('pointerup',endG); grab.addEventListener('pointercancel',endG);
 }
}
function RT_tileOp(id,on){ var b=document.getElementById(id); if(!b) return; if(on){ b.style.background='rgba(31,138,77,.24)'; b.style.boxShadow='0 0 0 3px #1F8A4D,0 3px 9px rgba(0,0,0,.5)'; b.style.transform='scale(1.06)'; } else { b.style.background='transparent'; b.style.boxShadow='none'; b.style.transform='scale(1)'; } }
function RT_ovCloseOthers(keep){
 if(keep!=='sp'&&document.getElementById('rt-sp')) RT_closeShotPlan();
 if(keep!=='fr'&&document.getElementById('rt-fr')) RT_closeFlagRadar();
 if(keep!=='dki'&&document.getElementById('rt-dki')) RT_closeDistKI();
 if(keep!=='radar'){ var rd=RT_round; if(rd&&RT_state.radarOn&&RT_state.radarOn[RT_holeMapKey(rd,rd.cur)]) RT_toggleRadarHole(); }
}
var RT_SP={layer:null};
function RT_spTee(rd,ref){
 var tp=RT_grabberTeePoint(rd,rd.cur); if(tp&&tp.lat!=null) return {lat:tp.lat,lng:tp.lng};
 if(ref&&ref.tees){ var ks=Object.keys(ref.tees); for(var i=0;i<ks.length;i++){ var t=ref.tees[ks[i]]; if(t&&t.lat!=null) return {lat:t.lat,lng:t.lng}; } }
 return null;
}
function RT_spData(){
 var rd=RT_round; if(!rd) return {noRef:true};
 var ref=RT_refFor(rd,rd.cur);
 var pin=(ref&&ref.pin&&ref.pin.lat!=null)?{lat:ref.pin.lat,lng:ref.pin.lng}:null;
 var tee=RT_spTee(rd,ref);
 if(!pin||!tee) return {noRef:true};
 var key=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(rd.courseName,rd):null;
 var num=rd.nums[rd.cur];
 var COS=Math.cos(tee.lat*Math.PI/180);
 function xy(p){ return {x:(p.lng-tee.lng)*111320*COS, y:(p.lat-tee.lat)*111320}; }
 var pinXY=xy(pin); var len=Math.hypot(pinXY.x,pinXY.y);
 if(len<20) return {noRef:true};
 var ux=pinXY.x/len, uy=pinXY.y/len;
 var rounds=(rtGet(RT_KEY)||[]).slice();
 if(rd&&!rounds.some(function(r){ return r.id===rd.id; })) rounds.push(rd);
 var shots=[], lies=[];
 rounds.forEach(function(r){
  if(!r||!r.nums) return;
  var k2=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(r.courseName,r):null;
  if(key&&k2&&k2!==key) return;
  if(!key&&r.courseName!==rd.courseName) return;
  var c2=-1; for(var i=0;i<r.nums.length;i++){ if(r.nums[i]===num){ c2=i; break; } }
  if(c2<0) return;
  var pi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(r):0;
  var p=r.players&&(r.players[pi]||r.players[0]); if(!p||!p.pins||!p.pins[c2]) return;
  var pts=p.pins[c2], first=null;
  for(var m=0;m<pts.length;m++){ var ty=pts[m].type||'shot'; if(ty==='shot'&&pts[m].lat!=null){ first=pts[m]; break; } }
  if(!first) return;
  var s=xy(first);
  var along=s.x*ux+s.y*uy;
  var offR=-(ux*s.y-uy*s.x);
  if(along>=15) shots.push({lat:first.lat,lng:first.lng,along:along,off:offR,frac:Math.max(0,Math.min(1.05,along/len)),date:r.date||''});
  for(var q=0;q<pts.length;q++){ var pq=pts[q]; if(!pq||pq.lat==null) continue; var sq=xy(pq); var offq=-(ux*sq.y-uy*sq.x); lies.push({lat:pq.lat,lng:pq.lng,off:offq,isTee:(pq===first)}); }
 });
 var TH=12, L=0,M=0,R=0;
 shots.forEach(function(s){ if(s.off>TH) R++; else if(s.off<-TH) L++; else M++; });
 var n=shots.length, avgLen=0; if(n){ shots.forEach(function(s){ avgLen+=s.along; }); avgLen=Math.round(avgLen/n); }
 return {noRef:false,tee:tee,pin:pin,len:len,shots:shots,lies:lies,n:n,L:L,M:M,R:R,avgLen:avgLen,TH:TH,num:num};
}
function RT_spPct(x,n){ return n?Math.round(x*100/n):0; }
function RT_spAdvice(d){
 var n=d.n, L=RT_spPct(d.L,n), M=RT_spPct(d.M,n), R=RT_spPct(d.R,n);
 if(n<3) return {tone:'info',txt:'Noch zu wenige erfasste Abschläge auf dieser Bahn ('+n+'). Markiere beim Spielen deinen Abschlag – nach ein paar Runden erkenne ich dein Muster.'};
 if(M>=55) return {tone:'good',txt:'Du triffst hier zuverlässig die Mitte ('+M+' %). Bleib bei deiner Linie – kein Grund, etwas zu ändern.'};
 if(Math.abs(R-L)<12&&M<50) return {tone:'warn',txt:'Deine Abschläge streuen breit (links '+L+' %, rechts '+R+' %). Nimm hier einen kontrollierteren Schläger und ziele bewusst auf die Fairwaymitte.'};
 var dom=(R>=L)?'rechts':'links', other=(R>=L)?'links':'rechts', domPct=Math.max(R,L);
 return {tone:'warn',txt:'Du schlägst hier auffällig oft nach '+dom+' ('+domPct+' %). Ziele bewusst weiter '+other+' bzw. auf die '+other+'e Fairwayhälfte, um in der Mitte zu landen.'};
}
function RT_openShotPlan(){
 if(!document.getElementById('rt-sp') && !RT_requirePremium('map'))return;
 var host=document.getElementById('hole-full'); if(!host) return;
 if(document.getElementById('rt-sp')){ RT_closeShotPlan(); return; }
 RT_ovCloseOthers('sp'); RT_tileOp('rt-tile-sp',true); RT_state.spOn=true;
 var d=RT_spData();
 var o=document.createElement('div'); o.id='rt-sp';
 o.style.cssText='position:absolute;inset:0;z-index:2500;pointer-events:none;';
 if(!d||d.noRef){
  o.innerHTML=RT_hvPanel('Shot-Analyse','')+'<div style="position:absolute;left:0;right:0;bottom:0;pointer-events:auto;background:rgba(14,30,21,.96);padding:14px 16px calc(env(safe-area-inset-bottom,0px) + 16px);color:#cfe0d4;font-size:13px;line-height:1.5;">Für diese Bahn fehlen die Referenzpunkte (Abschlag/Grün), um die Schläge auszuwerten.</div>';
  host.appendChild(o); return;
 }
 var Lp=RT_spPct(d.L,d.n),Mp=RT_spPct(d.M,d.n),Rp=RT_spPct(d.R,d.n);
 var extra='<div style="display:flex;gap:8px;">'
   +[['Links',Lp,'#ffce45'],['Mitte',Mp,'#48e08a'],['Rechts',Rp,'#ff8a5c']].map(function(c){ return '<div style="flex:1;text-align:center;"><div style="font-size:19px;font-weight:800;color:'+c[2]+';">'+c[1]+'<span style="font-size:11px;"> %</span></div><div style="font-size:10.5px;color:#9fb3a4;">'+c[0]+'</div></div>'; }).join('')
 +'</div>';
 var adv=RT_spAdvice(d);
 var advBg=adv.tone==='good'?'rgba(31,138,77,.18)':(adv.tone==='warn'?'rgba(224,140,27,.18)':'rgba(255,255,255,.08)');
 var advBd=adv.tone==='good'?'#1F8A4D':(adv.tone==='warn'?'#E08C1B':'rgba(255,255,255,.22)');
 var advIc=adv.tone==='good'?'✓':(adv.tone==='warn'?'⚠':'ℹ');
 var card='<div id="rt-sp-card" style="position:absolute;left:0;right:0;bottom:0;pointer-events:auto;background:rgba(14,30,21,.96);padding:13px 15px calc(env(safe-area-inset-bottom,0px) + 15px);box-shadow:0 -3px 12px rgba(0,0,0,.4);">'
   +'<div style="background:'+advBg+';border:1px solid '+advBd+';border-radius:13px;padding:12px 13px;display:flex;gap:10px;align-items:flex-start;">'
     +'<div style="font-size:16px;">'+advIc+'</div>'
     +'<div style="flex:1;"><div style="font-size:11.5px;font-weight:800;letter-spacing:.4px;color:#9fb3a4;margin-bottom:3px;">EMPFEHLUNG</div><div style="font-size:13px;color:#fff;line-height:1.5;">'+adv.txt+'</div></div>'
   +'</div>'
   +'<div style="font-size:10.5px;color:#6f857a;text-align:center;margin-top:9px;">Basis: '+d.n+' erfasste'+(d.n===1?'r Abschlag':' Abschläge')+' auf dieser Bahn'+(d.avgLen?' · Ø '+RT_fmtDist(d.avgLen):'')+'</div>'
 +'</div>';
 o.innerHTML=RT_hvPanel('Shot-Analyse · Bahn '+d.num,'',extra,'rt-sp-card')+card;
 host.appendChild(o);
 RT_hvGrabInit();
 RT_spPlot(d);
}
function RT_spPlot(d){
 var map=RT_holeFullMapInst; if(!map||typeof L==='undefined') return;
 if(RT_SP.layer){ try{map.removeLayer(RT_SP.layer);}catch(e){} RT_SP.layer=null; }
 if(!map.getPane('spdots')){ var p=map.createPane('spdots'); if(p){ p.style.zIndex=635; p.style.pointerEvents='none'; } }
 var lg=L.layerGroup().addTo(map); RT_SP.layer=lg;
 var lies=d.lies||d.shots||[];
 if(lies.length>10){
  lies.forEach(function(s){
   if(s.lat==null) return;
   L.marker([s.lat,s.lng],{pane:'spdots',interactive:false,icon:L.divIcon({className:'',iconSize:[54,54],iconAnchor:[27,27],html:'<div style="width:54px;height:54px;border-radius:50%;background:radial-gradient(circle,rgba(255,74,58,.34) 0%,rgba(255,170,30,.20) 46%,rgba(72,224,138,0) 72%);"></div>'})}).addTo(lg);
  });
 } else {
  lies.forEach(function(s){
   if(s.lat==null) return;
   if(s.isTee){
    /* Abschlag: gruen = Mittelkorridor, gelb = seitlich daneben. */
    var mid=(s.off<=d.TH&&s.off>=-d.TH), col=mid?'#48e08a':'#ffce45';
    L.marker([s.lat,s.lng],{pane:'spdots',interactive:false,icon:L.divIcon({className:'',iconSize:[16,16],iconAnchor:[8,8],html:'<div style="width:13px;height:13px;border-radius:50%;background:'+col+';border:2px solid #0b160f;box-shadow:0 1px 3px rgba(0,0,0,.6);"></div>'})}).addTo(lg);
   } else {
    /* Folgeschlaege: neutral (kein Mitte/daneben-Bezug wie beim Abschlag). */
    L.marker([s.lat,s.lng],{pane:'spdots',interactive:false,icon:L.divIcon({className:'',iconSize:[13,13],iconAnchor:[6,6],html:'<div style="width:10px;height:10px;border-radius:50%;background:#eef2f4;border:2px solid #0b160f;box-shadow:0 1px 3px rgba(0,0,0,.55);"></div>'})}).addTo(lg);
   }
  });
 }
}
function RT_closeShotPlan(){
 if(RT_SP.layer&&RT_holeFullMapInst){ try{RT_holeFullMapInst.removeLayer(RT_SP.layer);}catch(e){} }
 RT_SP.layer=null; RT_state.spOn=false; RT_tileOp('rt-tile-sp',false);
 var o=document.getElementById('rt-sp'); if(o&&o.parentNode) o.parentNode.removeChild(o);
}
/* ===== Ende Shot-Analyse ===== */
/* ============================================================
   Fahnenradar (Overlay auf der Bahnkarte) - "Blind Shot"
   Kompassrose ueber der Bahnkarte, dreht mit dem Geraetekompass; Fahne auf dem echten
   Peilwinkel GPS->Gruen. Kopf-Panel wie Wetterradar. iOS-Permission per Button.
   ============================================================ */
var RT_FR={origin:null,pin:null,brg:0,dist:0,heading:null,listening:false,got:false,handler:null};
function RT_frPx(angle,r){ var t=angle*Math.PI/180; return [150+r*Math.sin(t),150-r*Math.cos(t)]; }
function RT_frRoseSvg(brg){
 var parts=[];
 parts.push('<circle cx="150" cy="150" r="140" fill="rgba(8,20,13,.35)" stroke="rgba(255,255,255,.28)" stroke-width="2"/>');
 parts.push('<circle cx="150" cy="150" r="112" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="1"/>');
 for(var a=0;a<360;a+=15){
  var major=(a%90===0);
  var p1=RT_frPx(a,140), p2=RT_frPx(a,major?120:130);
  parts.push('<line x1="'+p1[0].toFixed(1)+'" y1="'+p1[1].toFixed(1)+'" x2="'+p2[0].toFixed(1)+'" y2="'+p2[1].toFixed(1)+'" stroke="rgba(255,255,255,'+(major?'.8':'.4')+')" stroke-width="'+(major?'2.4':'1.4')+'"/>');
 }
 [['N',0],['O',90],['S',180],['W',270]].forEach(function(Ln){
  var p=RT_frPx(Ln[1],96);
  parts.push('<text x="'+p[0].toFixed(1)+'" y="'+(p[1]+5).toFixed(1)+'" text-anchor="middle" font-size="20" font-weight="800" fill="'+(Ln[0]==='N'?'#ff6b5e':'#ffffff')+'" font-family="Inter,sans-serif">'+Ln[0]+'</text>');
 });
 var fp=RT_frPx(brg,116);
 parts.push('<line x1="150" y1="150" x2="'+fp[0].toFixed(1)+'" y2="'+fp[1].toFixed(1)+'" stroke="#8FE1A9" stroke-width="3.5" stroke-linecap="round"/>');
 var aTip=RT_frPx(brg,140), aL=RT_frPx(brg-8,118), aR=RT_frPx(brg+8,118);
 parts.push('<path d="M'+aTip[0].toFixed(1)+' '+aTip[1].toFixed(1)+'L'+aL[0].toFixed(1)+' '+aL[1].toFixed(1)+'L'+aR[0].toFixed(1)+' '+aR[1].toFixed(1)+'Z" fill="#ffd24a" stroke="#0b160f" stroke-width="1"/>');
 parts.push('<circle cx="150" cy="150" r="8" fill="#1F8A4D" stroke="#fff" stroke-width="2.5"/>');
 return '<svg viewBox="0 0 300 300" style="width:100%;height:100%;display:block;">'+parts.join('')+'</svg>';
}
function RT_openFlagRadar(){
 if(!document.getElementById('rt-fr') && !RT_requirePremium('map'))return;
 var host=document.getElementById('hole-full'); if(!host) return;
 if(document.getElementById('rt-fr')){ RT_closeFlagRadar(); return; }
 RT_ovCloseOthers('fr'); RT_tileOp('rt-tile-fr',true);
 var rd=RT_round;
 var origin=(RT_curPos&&RT_curPos.lat!=null)?{lat:RT_curPos.lat,lng:RT_curPos.lng,src:'gps'}:null;
 if(!origin&&rd){ var lb=RT_lastBallPos(rd,rd.cur); if(lb) origin={lat:lb.lat,lng:lb.lng,src:'ball'}; }
 if(!origin&&rd){ var tp=RT_grabberTeePoint(rd,rd.cur); if(tp) origin={lat:tp.lat,lng:tp.lng,src:'tee'}; }
 var ref=rd?RT_refFor(rd,rd.cur):null;
 var pin=(ref&&ref.pin&&ref.pin.lat!=null)?{lat:ref.pin.lat,lng:ref.pin.lng}:null;
 RT_FR.origin=origin; RT_FR.pin=pin; RT_FR.heading=null; RT_FR.got=false;
 RT_FR.brg=(origin&&pin)?RT_grabBearing(origin,pin):0;
 RT_FR.dist=(origin&&pin)?RT_haversineM(origin.lat,origin.lng,pin.lat,pin.lng):0;
 var o=document.createElement('div'); o.id='rt-fr';
 o.style.cssText='position:absolute;inset:0;z-index:2500;pointer-events:none;';
 var canDo=!!(origin&&pin);
 if(!canDo){
  o.innerHTML=RT_hvPanel('Fahnenradar','RT_closeFlagRadar()')+'<div style="position:absolute;left:0;right:0;bottom:0;pointer-events:auto;background:rgba(14,30,21,.96);padding:14px 16px calc(env(safe-area-inset-bottom,0px) + 16px);color:#cfe0d4;font-size:13px;line-height:1.5;">'+(pin?'Warte auf GPS-Signal … öffne das Fahnenradar auf der Bahn im Freien.':'Für diese Bahn ist keine Fahnenposition hinterlegt.')+'</div>';
  host.appendChild(o); return;
 }
 var rec=RT_dkiRecommend(Math.round(RT_FR.dist));
 var srcNote=origin?(origin.src==='gps'?'':(origin.src==='ball'?'Standort: letzte Balllage (kein GPS)':'Standort: Abschlag (kein GPS)')):'';
 var body='<div style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 56px);bottom:calc(env(safe-area-inset-bottom,0px) + 16px);left:29px;width:min(56vw,200px);pointer-events:none;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:12px;">'
   +'<div style="position:relative;width:100%;aspect-ratio:1/1;background:rgba(6,12,9,.80);border-radius:18px;pointer-events:auto;box-shadow:0 4px 16px rgba(0,0,0,.5);">'
     +'<div style="position:absolute;left:50%;top:-2px;transform:translateX(-50%);z-index:3;color:#fff;font-size:18px;text-shadow:0 1px 3px #000;">&#9660;</div>'
     +'<div id="rt-fr-rose" style="position:absolute;inset:8px;transition:transform .12s linear;">'+RT_frRoseSvg(RT_FR.brg)+'</div>'
     +'<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">'
       +'<div id="rt-fr-aim" style="font-size:10px;font-weight:800;color:#8FE1A9;height:13px;text-shadow:0 1px 3px #000;"></div>'
       +'<div style="font-size:30px;font-weight:800;color:#fff;line-height:1;text-shadow:0 1px 5px rgba(0,0,0,.7);">'+RT_fmtDist(RT_FR.dist)+'</div>'
       +'<div style="font-size:11px;color:#cfe0d4;text-shadow:0 1px 3px #000;">zur Fahne</div>'
       +(rec.empty?'':'<div style="margin-top:6px;background:rgba(31,138,77,.92);color:#fff;font-size:12px;font-weight:700;border-radius:100px;padding:4px 11px;">'+rec.best.l+' &#183; &#216; '+rec.best.d+' m</div>')
     +'</div>'
   +'</div>'
   +'<div style="pointer-events:auto;text-align:center;width:100%;">'
     +(srcNote?'<div style="font-size:11px;color:#cfe0d4;margin-bottom:8px;text-shadow:0 1px 3px #000;">'+srcNote+'</div>':'')
     +'<button id="rt-fr-act" onclick="RT_frStart()" style="border:none;background:#1F8A4D;color:#fff;font-size:14px;font-weight:700;font-family:inherit;border-radius:100px;padding:10px 20px;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.4);">Kompass aktivieren</button>'
     +'<div id="rt-fr-msg" style="font-size:11px;color:#cfe0d4;margin-top:8px;text-shadow:0 1px 3px #000;"></div>'
   +'</div>'
 +'</div>';

 o.innerHTML=RT_hvPanel('Fahnenradar','RT_closeFlagRadar()')+body;
 host.appendChild(o);
 if(!(window.DeviceOrientationEvent&&typeof DeviceOrientationEvent.requestPermission==='function')) RT_frStart();
}
function RT_closeFlagRadar(){ RT_frStop(); RT_tileOp('rt-tile-fr',false); var o=document.getElementById('rt-fr'); if(o&&o.parentNode) o.parentNode.removeChild(o); }
function RT_frStop(){
 if(RT_FR.handler){ window.removeEventListener('deviceorientationabsolute',RT_FR.handler,true); window.removeEventListener('deviceorientation',RT_FR.handler,true); RT_FR.handler=null; }
 RT_FR.listening=false;
}
function RT_frStart(){
 var msg=document.getElementById('rt-fr-msg');
 if(window.DeviceOrientationEvent&&typeof DeviceOrientationEvent.requestPermission==='function'){
  DeviceOrientationEvent.requestPermission().then(function(res){
   if(res==='granted'){ RT_frListen(); }
   else { if(msg) msg.textContent='Kompass-Zugriff abgelehnt. In den iOS-Einstellungen für Safari „Bewegung & Ausrichtung" erlauben.'; }
  }).catch(function(){ if(msg) msg.textContent='Kompass konnte nicht aktiviert werden.'; });
 } else { RT_frListen(); }
}
function RT_frListen(){
 if(RT_FR.listening) return;
 RT_FR.listening=true; RT_FR.handler=RT_frOnOrient;
 window.addEventListener('deviceorientationabsolute',RT_FR.handler,true);
 window.addEventListener('deviceorientation',RT_FR.handler,true);
 var act=document.getElementById('rt-fr-act'); if(act) act.style.display='none';
 var msg=document.getElementById('rt-fr-msg'); if(msg) msg.textContent='Kompass aktiv. Bei Ungenauigkeit das Gerät in einer 8 bewegen.';
 setTimeout(function(){ if(!RT_FR.got){ var m=document.getElementById('rt-fr-msg'); if(m) m.textContent='Kein Kompass-Signal. Nordausrichtung ggf. ungenau.'; } },2500);
}
function RT_frOnOrient(e){
 if(!document.getElementById('rt-fr')){ RT_frStop(); return; }
 var h=null;
 if(e.webkitCompassHeading!=null&&!isNaN(e.webkitCompassHeading)) h=e.webkitCompassHeading;
 else if(e.alpha!=null&&!isNaN(e.alpha)) h=(360-e.alpha)%360;
 if(h==null) return;
 RT_FR.heading=h; RT_FR.got=true; RT_frUpdate();
}
function RT_frUpdate(){
 var rose=document.getElementById('rt-fr-rose');
 if(rose&&RT_FR.heading!=null) rose.style.transform='rotate('+(-RT_FR.heading)+'deg)';
 var aim=document.getElementById('rt-fr-aim');
 if(aim&&RT_FR.heading!=null){
  var diff=((RT_FR.brg-RT_FR.heading+540)%360)-180;
  if(Math.abs(diff)<=7) aim.textContent='▲ AUF KURS';
  else aim.textContent=(diff>0?'→ '+Math.round(Math.abs(diff))+'° nach rechts':'← '+Math.round(Math.abs(diff))+'° nach links');
 }
}
/* ===== Ende Fahnenradar ===== */
/* ============================================================
   Entfernung & KI (Overlay auf der Bahnkarte)
   Fester Standort (Abschlag/eigene Lage) + ziehbarer Zielpunkt direkt auf der Satelliten-
   Bahnkarte (rotationskorrigiert wie der Grabber). Zeigt Luftlinie + Hoehendifferenz
   (Open-Meteo /api/elev) -> "Plays-like"-Distanz, Schlaeger-Empfehlung + Strategie.
   Kopf-Panel wie Wetterradar. Keine Verbindungslinie (L.polyline auf gedrehter Karte
   unzuverlaessig) - dafuer der Live-Wert in der Karte.
   ============================================================ */
var RT_DKI={map:null,mA:null,mB:null,layer:null,pin:null,elev:{a:null,b:null},seq:0,err:false};
function RT_dkiShortClub(id){
 var c=null; for(var i=0;i<RT_BAG_CLUBS.length;i++){ if(RT_BAG_CLUBS[i].id===id){ c=RT_BAG_CLUBS[i]; break; } }
 if(!c) return id;
 var m=c.l.match(/\(([^)]+)\)/); return m?m[1]:c.l;
}
function RT_dkiClubs(){
 var b=RT_bagData(); var out=[];
 RT_BAG_CLUBS.forEach(function(c){ if(c.id==='putter') return; var e=b[c.id]; if(e&&e.d!=null&&!isNaN(e.d)&&e.d>0) out.push({id:c.id,l:RT_dkiShortClub(c.id),d:e.d}); });
 out.sort(function(a,b){ return a.d-b.d; });
 return out;
}
function RT_dkiRecommend(pl){
 var clubs=RT_dkiClubs();
 if(!clubs.length) return {empty:true};
 var best=clubs[0], bd=Math.abs(clubs[0].d-pl);
 clubs.forEach(function(c){ var dd=Math.abs(c.d-pl); if(dd<bd){ bd=dd; best=c; } });
 var maxC=clubs[clubs.length-1];
 var diff=Math.round(pl-best.d);
 var fit; if(Math.abs(diff)<=4) fit='passt genau'; else if(diff>0) fit='ca. '+Math.abs(diff)+' m mehr als dein Schnitt'; else fit='ca. '+Math.abs(diff)+' m weniger als dein Schnitt';
 var over=(pl>maxC.d+6);
 return {empty:false,best:best,maxC:maxC,fit:fit,over:over,diff:diff};
}
function RT_openDistKI(){
 if(!document.getElementById('rt-dki') && !RT_requirePremium('map'))return;
 var host=document.getElementById('hole-full'); if(!host) return;
 if(document.getElementById('rt-dki')){ RT_closeDistKI(); return; }
 RT_ovCloseOthers('dki'); RT_tileOp('rt-tile-dki',true);
 var rd=RT_round;
 var map=RT_holeFullMapInst;
 var A=rd?RT_grabberCenter(rd,rd.cur):null;
 var ref=rd?RT_refFor(rd,rd.cur):null;
 var pin=(ref&&ref.pin&&ref.pin.lat!=null)?{lat:ref.pin.lat,lng:ref.pin.lng}:null;
 if(!A&&RT_curPos) A={lat:RT_curPos.lat,lng:RT_curPos.lng};
 var B=pin?{lat:pin.lat,lng:pin.lng}:(A?{lat:A.lat+0.0012,lng:A.lng}:null);
 RT_DKI.pin=pin; RT_DKI.map=map; RT_DKI.mA=null; RT_DKI.mB=null; RT_DKI.err=false; RT_DKI.seq++;
 var o=document.createElement('div'); o.id='rt-dki';
 o.style.cssText='position:absolute;inset:0;z-index:2500;pointer-events:none;';
 o.innerHTML=RT_hvPanel('Entfernung & KI','','<div style="font-size:11.5px;color:#9fb3a4;">Standort &amp; Ziel per Touch verschieben – nur zur Info.</div>','col:rt-dki-rec')
   +'<div id="rt-dki-card" style="position:absolute;left:0;right:0;bottom:0;pointer-events:auto;background:rgba(14,30,21,.96);padding:12px 15px calc(env(safe-area-inset-bottom,0px) + 14px);box-shadow:0 -3px 12px rgba(0,0,0,.4);"></div>';
 host.appendChild(o);
 RT_hvGrabInit();
 if(!map||typeof L==='undefined'||!A||!B){ RT_dkiRenderCard(null,null,false,'Karte/Position nicht verfügbar. Öffne die Funktion auf der Bahn (Satellitenkarte).'); return; }
 RT_dkiAttach(map,A,B);
 RT_dkiRenderCard(RT_haversineM(A.lat,A.lng,B.lat,B.lng),null,true);
 RT_dkiFetchElev();
}
function RT_dkiAttach(map,A,B){
 if(RT_DKI.layer){ try{map.removeLayer(RT_DKI.layer);}catch(e){} RT_DKI.layer=null; }
 if(!map.getPane('dkigrab')){ var p=map.createPane('dkigrab'); if(p){ p.style.zIndex=655; } }
 var lg=L.layerGroup().addTo(map); RT_DKI.layer=lg;
 RT_DKI.mA=L.marker([A.lat,A.lng],{pane:'dkigrab',icon:L.divIcon({className:'',iconSize:[30,30],iconAnchor:[15,15],html:'<div style="width:24px;height:24px;border-radius:50%;background:#1F8A4D;border:3px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.55);"></div>'})}).addTo(lg);
 RT_DKI.mB=L.marker([B.lat,B.lng],{pane:'dkigrab',icon:L.divIcon({className:'',iconSize:[46,46],iconAnchor:[23,23],html:'<div style="width:40px;height:40px;border-radius:50%;border:3px solid #ffd24a;background:rgba(255,210,74,.18);box-shadow:0 1px 6px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;border-radius:50%;background:#ffd24a;"></div></div>'})}).addTo(lg);
 RT_dkiDrag(RT_DKI.mA); RT_dkiDrag(RT_DKI.mB);
}
function RT_dkiDrag(marker){
 var map=RT_DKI.map; if(!map||!marker) return;
 var el=map._el||document.getElementById('hole-full-map'); var rotF=map._rotF||0;
 var gEl=marker.getElement(); if(!gEl||!el) return;
 gEl.style.touchAction='none'; gEl.style.cursor='grab';
 var st=null;
 gEl.addEventListener('pointerdown',function(ev){ ev.preventDefault(); ev.stopPropagation(); try{gEl.setPointerCapture(ev.pointerId);}catch(e){} var p0=RT_correctedLatLng(map,el,rotF,ev.clientX,ev.clientY); var mp=marker.getLatLng(); st=p0?{dLat:mp.lat-p0.lat,dLng:mp.lng-p0.lng}:{dLat:0,dLng:0}; });
 gEl.addEventListener('pointermove',function(ev){ if(!st) return; ev.preventDefault(); ev.stopPropagation(); var p=RT_correctedLatLng(map,el,rotF,ev.clientX,ev.clientY); if(!p) return; marker.setLatLng([p.lat+st.dLat,p.lng+st.dLng]); RT_dkiLive(); });
 var endD=function(ev){ if(!st) return; st=null; if(ev&&ev.stopPropagation) ev.stopPropagation(); RT_dkiFetchElev(); };
 gEl.addEventListener('pointerup',endD); gEl.addEventListener('pointercancel',endD);
}
function RT_dkiLive(){
 if(!RT_DKI.mA||!RT_DKI.mB) return;
 var a=RT_DKI.mA.getLatLng(), b=RT_DKI.mB.getLatLng();
 var live=document.getElementById('rt-dki-live'); if(live) live.textContent=RT_fmtDist(RT_haversineM(a.lat,a.lng,b.lat,b.lng));
}
function RT_dkiFetchElev(){
 if(!RT_DKI.mA||!RT_DKI.mB) return;
 var a=RT_DKI.mA.getLatLng(), b=RT_DKI.mB.getLatLng();
 var d=RT_haversineM(a.lat,a.lng,b.lat,b.lng);
 var my=++RT_DKI.seq;
 RT_dkiRenderCard(d,null,true);
 fetch('/api/elev?lat1='+a.lat+'&lng1='+a.lng+'&lat2='+b.lat+'&lng2='+b.lng)
  .then(function(r){ return r.json(); })
  .then(function(j){
   if(my!==RT_DKI.seq) return;
   if(!j||j.error||j.a==null||j.b==null){ RT_DKI.err=true; RT_dkiRenderCard(d,null,false); return; }
   RT_DKI.err=false; RT_DKI.elev={a:j.a,b:j.b}; RT_dkiRenderCard(d,(j.b-j.a),false);
  })
  .catch(function(){ if(my!==RT_DKI.seq) return; RT_DKI.err=true; RT_dkiRenderCard(d,null,false); });
}
function RT_dkiRenderCard(d,dh,loading,msg){
 var host=document.getElementById('rt-dki-card'); if(!host) return;
 if(msg){ host.innerHTML='<div style="color:#cfe0d4;font-size:13px;padding:4px 2px;">'+msg+'</div>'; return; }
 if(d==null){ host.innerHTML='<div style="color:#9fb3a4;font-size:13px;">Ziehe den Zielpunkt auf die gewünschte Lage.</div>'; return; }
 var pl=(dh!=null)?Math.round(d+dh):Math.round(d);
 var hLabel,hVal;
 if(dh==null){ hLabel=RT_DKI.err?'Höhe n.v.':'Höhe …'; hVal='–'; }
 else{ var up=dh>=0; hVal=(up?'+':'−')+Math.round(Math.abs(dh))+' m'; hLabel=(Math.abs(dh)<1)?'eben':(up?'bergauf':'bergab'); }
 var head='<div style="display:flex;gap:0;background:rgba(0,0,0,.30);border-radius:13px;padding:9px 4px;margin-bottom:10px;">'
  +'<div style="flex:1;text-align:center;"><div style="font-size:10.5px;color:#9fb3a4;">Luftlinie</div><div id="rt-dki-live" style="font-size:19px;font-weight:800;color:#fff;">'+RT_fmtDist(d)+'</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,.12);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:10.5px;color:#9fb3a4;">Höhe</div><div style="font-size:19px;font-weight:800;color:#fff;">'+hVal+'</div><div style="font-size:9.5px;color:#7f948a;margin-top:-1px;">'+hLabel+'</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,.12);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:10.5px;color:#8FE1A9;">Spielt wie</div><div style="font-size:19px;font-weight:800;color:#8FE1A9;">'+RT_fmtDist(pl)+'</div></div>'
 +'</div>';
 var rec=RT_dkiRecommend(pl), body;
 if(rec.empty){
  body='<div style="font-size:12.5px;color:#cfe0d4;line-height:1.45;">Trage deine durchschnittlichen Schlaglängen im <b>Golfbag</b> ein – dann bekommst du hier eine passende Schläger-Empfehlung.</div>';
 }else{
  var strat;
  if(rec.over){ var over=pl-rec.maxC.d; var rem=RT_dkiRecommend(over); strat='Über deiner längsten Länge ('+RT_fmtDist(rec.maxC.d)+'). Lege mit <b>'+rec.maxC.l+'</b> vor – danach bleiben ~'+RT_fmtDist(over)+(rem.empty?'':' (≈ <b>'+rem.best.l+'</b>)')+'.'; }
  else{ var remPin=RT_DKI.pin?RT_haversineM(RT_DKI.mB.getLatLng().lat,RT_DKI.mB.getLatLng().lng,RT_DKI.pin.lat,RT_DKI.pin.lng):null; if(remPin!=null&&remPin>12) strat='In einem Schlag erreichbar. Von dort noch ~'+RT_fmtDist(remPin)+' zum Grün.'; else strat='Direkt aufs Grün spielbar – triffst du die Länge, bist du zum Putt.'; }
  body='<div style="display:flex;align-items:center;gap:11px;">'
    +'<div style="flex:none;width:50px;height:50px;border-radius:14px;background:linear-gradient(135deg,#1F8A4D,#0f5c31);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;"><div style="font-size:16px;font-weight:800;line-height:1;">'+rec.best.l+'</div><div style="font-size:9px;opacity:.8;margin-top:2px;">Ø '+rec.best.d+'</div></div>'
    +'<div style="flex:1;min-width:0;"><div style="font-size:13px;color:#fff;font-weight:700;">Empfehlung: '+rec.best.l+' <span style="font-weight:500;color:#9fb3a4;">('+rec.fit+')</span></div><div style="font-size:12px;color:#cfe0d4;line-height:1.4;margin-top:3px;">'+strat+'</div></div>'
  +'</div>';
  if(!RT_DKI.err&&dh!=null) body+='<div style="font-size:10.5px;color:#6f857a;margin-top:8px;">Plays-like nach Höhe berechnet · ohne Windkorrektur</div>';
 }
 host.innerHTML=head+'<div id="rt-dki-rec" style="overflow:hidden;transition:max-height .3s ease,opacity .2s ease;">'+body+'</div>';
}
function RT_closeDistKI(){
 RT_DKI.seq++;
 if(RT_DKI.layer&&RT_DKI.map){ try{RT_DKI.map.removeLayer(RT_DKI.layer);}catch(e){} }
 RT_DKI.layer=null; RT_DKI.mA=null; RT_DKI.mB=null; RT_tileOp('rt-tile-dki',false);
 var o=document.getElementById('rt-dki'); if(o&&o.parentNode) o.parentNode.removeChild(o);
}
/* ===== Ende Entfernung & KI ===== */
/* ============================================================
   M9a/b · Geländerelief (Overlay auf der Bahnkarte)
   Echtes 1-m-Geländerelief (DGM1, Geobasis NRW) rund um die Fahne: Höhenlinien +
   schattiertes Relief über der Satelliten-Grünansicht, plus Falllinie und Putt-Distanz.
   Datenweg: Worker /api/dgm (WGS84→UTM32, WCS-GeoTIFF) → geotiff.js (CDN) parst im Client.
   Ehrlich: 1-m-DGM zeigt das Geländerelief, KEINE cm-genaue Grün-Vermessung. Nur NRW-Plätze.
   ============================================================ */
var RT_GV={relief:null,pin:null,ball:null,center:null,size:64};

function RT_gvPinBall(){
 var rd=RT_round; var ref=rd?RT_refFor(rd,rd.cur):null;
 var pin=(ref&&ref.pin&&ref.pin.lat!=null)?{lat:ref.pin.lat,lng:ref.pin.lng}:null;
 var ball=null; if(rd){ var lb=RT_lastBallPos(rd,rd.cur); if(lb&&lb.lat!=null) ball={lat:lb.lat,lng:lb.lng}; }
 return {pin:pin,ball:ball};
}
/* Ausdehnung der KOMPLETTEN Bahn (Abschlag..Grün + markierte Lagen) als quadratischer
   Ausschnitt; das Relief deckt damit die ganze Bahn ab, nicht nur das Grün. */
function RT_gvHoleExtent(rd,c){
 var pts=RT_holePoints(rd,c);
 if(!pts.length) return null;
 var minLa=90,maxLa=-90,minLo=180,maxLo=-180;
 pts.forEach(function(p){ if(p[0]<minLa)minLa=p[0]; if(p[0]>maxLa)maxLa=p[0]; if(p[1]<minLo)minLo=p[1]; if(p[1]>maxLo)maxLo=p[1]; });
 var clat=(minLa+maxLa)/2, clng=(minLo+maxLo)/2;
 var latM=(maxLa-minLa)*111320, lngM=(maxLo-minLo)*111320*Math.cos(clat*Math.PI/180);
 var size=Math.max(latM,lngM)*4.0;
 size=Math.max(200,Math.min(900,size));
 return {clat:clat,clng:clng,size:Math.round(size)};
}
function RT_gvActive(){ var rd=RT_round; return !!(rd&&RT_state.gvOn&&RT_state.gvOn[RT_holeMapKey(rd,rd.cur)]); }
function RT_openGreenView(){
 if(!RT_gvActive() && !RT_requirePremium('map'))return;
 var rd=RT_round; if(!rd) return;
 var key=RT_holeMapKey(rd,rd.cur);
 RT_state.gvOn=RT_state.gvOn||{};
 if(RT_state.gvOn[key]){ RT_state.gvOn[key]=false; RT_tileOp('rt-tile-gv',false); RT_gvDetach(); RT_gvRemoveOverlay(); return; }
 RT_state.gvOn[key]=true; RT_tileOp('rt-tile-gv',true);
 RT_gvBuildOverlay(); RT_gvAttach();
}
function RT_closeGreenView(){
 var rd=RT_round; if(rd&&RT_state.gvOn){ RT_state.gvOn[RT_holeMapKey(rd,rd.cur)]=false; }
 RT_tileOp('rt-tile-gv',false); RT_gvDetach(); RT_gvRemoveOverlay();
}
function RT_gvBuildOverlay(){
 var host=document.getElementById('hole-full'); if(!host) return;
 var ex=document.getElementById('rt-gv-ui'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var o=document.createElement('div'); o.id='rt-gv-ui';
 o.style.cssText='position:absolute;inset:0;z-index:2400;pointer-events:none;';
 o.innerHTML=RT_hvPanel('Geländerelief','','','gv-card')
  +'<div id="gv-status" style="position:absolute;left:12px;top:calc(env(safe-area-inset-top,0px) + 70px);pointer-events:none;background:rgba(8,20,13,.82);color:#fff;font-size:12px;border-radius:100px;padding:6px 12px;">Höhenmodell wird geladen…</div>'
  +'<div id="gv-card" style="position:absolute;left:0;right:0;bottom:0;pointer-events:auto;background:rgba(14,30,21,.96);padding:13px 15px calc(env(safe-area-inset-bottom,0px) + 15px);box-shadow:0 -3px 12px rgba(0,0,0,.4);display:none;"></div>';
 host.appendChild(o);
 RT_hvGrabInit();
}
function RT_gvRemoveOverlay(){ var o=document.getElementById('rt-gv-ui'); if(o&&o.parentNode) o.parentNode.removeChild(o); }
function RT_gvStatus(t){ var s=document.getElementById('gv-status'); if(s){ s.style.display=t?'block':'none'; s.textContent=t||''; } }
function RT_gvCard(html){ var c=document.getElementById('gv-card'); if(c){ c.style.display=html?'block':'none'; c.innerHTML=html||''; } }
function RT_gvErrCard(msg){ return '<div style="color:#cfe0d4;font-size:13px;line-height:1.5;">'+msg+'</div><div style="font-size:11px;color:#7f948a;margin-top:8px;">Geländerelief nutzt das 1-m-Geländemodell (DGM1) von Geobasis NRW – aktuell nur für NRW-Plätze.</div>'; }
function RT_gvAttach(){
 var map=RT_holeFullMapInst; if(!map||typeof L==='undefined'){ RT_gvStatus('Karte nicht verfügbar'); return; }
 var rd=RT_round; if(!rd) return; var c=rd.cur;
 var ext=RT_gvHoleExtent(rd,c);
 var pb=RT_gvPinBall(); RT_GV.pin=pb.pin; RT_GV.ball=pb.ball;
 if(!ext){ RT_gvStatus('Keine Referenzpunkte'); RT_gvCard(RT_gvErrCard('Für diese Bahn fehlen Referenzpunkte (Abschlag/Grün) für das Relief.')); return; }
 RT_GV.center={lat:ext.clat,lng:ext.clng}; RT_GV.size=ext.size;
 if(!map.getPane('gvrelief')){ var p=map.createPane('gvrelief'); if(p){ p.style.zIndex=345; p.style.pointerEvents='none'; } }
 RT_gvStatus('Höhenmodell wird geladen…');
 RT_gvLoad();
}
function RT_gvApplyReliefRot(rotF){
 if(!rotF) return;
 var img=RT_GV.relief&&RT_GV.relief._image; if(!img) return;
 img.style.transformOrigin='center center';
 var base=(img.style.transform||'').replace(/\s*rotate\([-0-9.]+deg\)/,'');
 img.style.transform=base+' rotate('+(-rotF)+'deg)';
}
function RT_gvDetach(){
 if(RT_GV._rotHook&&RT_holeFullMapInst){ try{ RT_holeFullMapInst.off('move moveend zoomend viewreset',RT_GV._rotHook); }catch(e){} }
 RT_GV._rotHook=null;
 if(RT_GV.relief&&RT_holeFullMapInst){ try{ RT_holeFullMapInst.removeLayer(RT_GV.relief); }catch(e){} }
 RT_GV.relief=null;
}
function RT_gvLoadGeotiff(cb){
 if(window.GeoTIFF){ cb(null); return; }
 function load(src,next){ var sc=document.createElement('script'); sc.src=src; sc.onload=function(){ if(window.GeoTIFF) cb(null); else next(); }; sc.onerror=next; document.head.appendChild(sc); }
 load('/vendor/geotiff.js?v=213', function(){ load('https://cdn.jsdelivr.net/npm/geotiff@2.1.3/dist-browser/geotiff.js', function(){ cb('load_fail'); }); });
}
function RT_gvLoad(){
 var ct=RT_GV.center, size=RT_GV.size;
 fetch('/api/dgm?lat='+ct.lat+'&lng='+ct.lng+'&size='+size).then(function(r){
  var ctype=r.headers.get('content-type')||'';
  if(ctype.indexOf('json')>=0){ return r.json().then(function(j){ throw {diag:j}; }); }
  return r.arrayBuffer();
 }).then(function(buf){
  if(!RT_gvActive()) return;
  RT_gvStatus('Relief wird berechnet…');
  RT_gvLoadGeotiff(function(err){
   if(err){ RT_gvStatus('geotiff.js fehlt'); RT_gvCard(RT_gvErrCard('Konnte die GeoTIFF-Bibliothek nicht laden ('+err+').')); return; }
   try{
    window.GeoTIFF.fromArrayBuffer(buf).then(function(tif){ return tif.getImage(); }).then(function(img){
     return img.readRasters().then(function(ras){ RT_gvRender(ras[0],img.getWidth(),img.getHeight()); });
    }).catch(function(e){ RT_gvStatus('GeoTIFF-Fehler'); RT_gvCard(RT_gvErrCard('GeoTIFF konnte nicht gelesen werden: '+(e&&e.message||e))); });
   }catch(e){ RT_gvStatus('GeoTIFF-Fehler'); RT_gvCard(RT_gvErrCard('GeoTIFF-Parsing fehlgeschlagen.')); }
  });
 }).catch(function(e){
  if(e&&e.diag){ var j=e.diag; var out=(j.error==='out_of_nrw');
   RT_gvStatus(out?'Außerhalb NRW':'DGM nicht verfügbar');
   RT_gvCard(RT_gvErrCard(out?'DGM1 gibt es nur für NRW-Plätze. Diese Bahn liegt außerhalb Nordrhein-Westfalens.':('Geodienst-Antwort: '+(j.error||'unbekannt')+(j.detail?(' – '+String(j.detail).slice(0,160)):''))));
  } else { RT_gvStatus('DGM nicht erreichbar'); RT_gvCard(RT_gvErrCard('Höhenmodell konnte nicht geladen werden.')); }
 });
}
function RT_gvRender(band,W,H){
 if(!RT_gvActive()||!RT_holeFullMapInst) return;
 if(!band||!W||!H){ RT_gvStatus('Leeres Höhenmodell'); RT_gvCard(RT_gvErrCard('Das Höhenmodell kam leer zurück.')); return; }
 var g=function(r,c){ var v=band[r*W+c]; return (v>-1000&&v<9000&&!isNaN(v))?v:NaN; };
 var mn=Infinity,mx=-Infinity,cnt=0;
 for(var i=0;i<band.length;i++){ var v=band[i]; if(v>-1000&&v<9000&&!isNaN(v)){ if(v<mn)mn=v; if(v>mx)mx=v; cnt++; } }
 if(!cnt){ RT_gvStatus('Keine gültigen Höhen'); RT_gvCard(RT_gvErrCard('Keine gültigen Höhenwerte im Ausschnitt.')); return; }
 var range=mx-mn;
 var cell=(W>200)?4:6, cv=document.createElement('canvas'); cv.width=W*cell; cv.height=H*cell; var ctx=cv.getContext('2d');
 for(var r=0;r<H;r++){ for(var c=0;c<W;c++){ var h=g(r,c); if(isNaN(h))continue; var t=range>0.01?(h-mn)/range:0.5; var hue=210-210*t; ctx.fillStyle='hsla('+hue+',80%,52%,.5)'; ctx.fillRect(c*cell,r*cell,cell,cell); } }
 var iv=range<1.5?0.25:(range<4?0.5:(range<10?1:2));
 ctx.lineCap='round';
 function march(level,major){
  ctx.strokeStyle=major?'rgba(255,255,255,.95)':'rgba(255,255,255,.6)'; ctx.lineWidth=major?2:1.2;
  for(var rr=0;rr<H-1;rr++){ for(var cc=0;cc<W-1;cc++){
   var tl=g(rr,cc),tr=g(rr,cc+1),br=g(rr+1,cc+1),bl=g(rr+1,cc);
   if(isNaN(tl)||isNaN(tr)||isNaN(br)||isNaN(bl))continue;
   var pts=[];
   if((tl<level)!=(tr<level)) pts.push([cc+(level-tl)/(tr-tl),rr]);
   if((tr<level)!=(br<level)) pts.push([cc+1,rr+(level-tr)/(br-tr)]);
   if((bl<level)!=(br<level)) pts.push([cc+(level-bl)/(br-bl),rr+1]);
   if((tl<level)!=(bl<level)) pts.push([cc,rr+(level-tl)/(bl-tl)]);
   if(pts.length>=2){ ctx.beginPath(); ctx.moveTo(pts[0][0]*cell,pts[0][1]*cell); ctx.lineTo(pts[1][0]*cell,pts[1][1]*cell); ctx.stroke(); if(pts.length>=4){ ctx.beginPath(); ctx.moveTo(pts[2][0]*cell,pts[2][1]*cell); ctx.lineTo(pts[3][0]*cell,pts[3][1]*cell); ctx.stroke(); } }
  }}
 }
 var lvl=Math.ceil(mn/iv)*iv;
 for(; lvl<mx; lvl+=iv){ march(lvl, (Math.round(lvl/iv)%4===0)); }
 var ct=RT_GV.center, size=RT_GV.size, pin=RT_GV.pin;
 var mpp=size/W; // Meter pro Pixel
 // Falllinie an der Fahne (Fahnen-Pixel im Raster bestimmen)
 var fallBrg=null, slopePct=null, pcol=null, prow=null;
 if(pin){
  var eOff=(pin.lng-ct.lng)*111320*Math.cos(ct.lat*Math.PI/180);
  var nOff=(pin.lat-ct.lat)*111320;
  pcol=Math.max(1,Math.min(W-2,Math.round(W*(0.5+eOff/size))));
  prow=Math.max(1,Math.min(H-2,Math.round(H*(0.5-nOff/size))));
  var hE=g(prow,pcol+1),hW=g(prow,pcol-1),hN=g(prow-1,pcol),hS=g(prow+1,pcol);
  if(!isNaN(hE)&&!isNaN(hW)&&!isNaN(hN)&&!isNaN(hS)){
   var gx=(hE-hW)/(2*mpp), gnorth=(hN-hS)/(2*mpp);
   slopePct=Math.round(Math.hypot(gx,gnorth)*1000)/10;
   var dE=-gx, dN=-gnorth;
   if(Math.hypot(dE,dN)>1e-5){
    fallBrg=(Math.atan2(dE,dN)*180/Math.PI+360)%360;
    var un=Math.hypot(dE,dN), ux=dE/un, uy=dN/un;
    var px=pcol*cell, py=prow*cell, Ln=Math.max(cell*10,46);
    var ex=px+ux*Ln, ey=py-uy*Ln;
    ctx.strokeStyle='#ffd24a'; ctx.lineWidth=Math.max(3,cell*0.7); ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(ex,ey); ctx.stroke();
    var ah=Math.max(7,cell*1.6), ang=Math.atan2(-(ey-py),(ex-px));
    ctx.fillStyle='#ffd24a'; ctx.beginPath(); ctx.moveTo(ex,ey);
    ctx.lineTo(ex-ah*Math.cos(ang-0.5), ey+ah*Math.sin(ang-0.5));
    ctx.lineTo(ex-ah*Math.cos(ang+0.5), ey+ah*Math.sin(ang+0.5));
    ctx.closePath(); ctx.fill();
   }
   ctx.fillStyle='#ffd24a'; ctx.strokeStyle='#0b160f'; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(pcol*cell,prow*cell,Math.max(4,cell),0,6.29); ctx.fill(); ctx.stroke();
  }
 }
 // Relief geo-platzieren: Inhalt um +rotF vorrotieren, Bild um -rotF gegenrotieren -> das
 // Quadrat erscheint screen-horizontal, der Inhalt bleibt deckungsgleich zum gedrehten Gelaende.
 // Bei rotF=0 (Nordausrichtung) unveraendertes Verhalten.
 var _rotF=(RT_holeFullMapInst&&RT_holeFullMapInst._rotF)||0;
 var _rad=_rotF*Math.PI/180, _shrink=Math.abs(Math.cos(_rad))+Math.abs(Math.sin(_rad));
 var _cvOut=cv, _vis=size;
 if(_rotF){
  var _sidePx=Math.min(cv.width,cv.height);
  var _vpx=Math.max(8,Math.round(_sidePx/_shrink));
  var _cv2=document.createElement('canvas'); _cv2.width=_vpx; _cv2.height=_vpx;
  var _c2=_cv2.getContext('2d');
  _c2.translate(_vpx/2,_vpx/2); _c2.rotate(_rad); _c2.drawImage(cv,-cv.width/2,-cv.height/2);
  _cvOut=_cv2; _vis=size/_shrink;
 }
 var dLat=(_vis/2)/111320, dLng=(_vis/2)/(111320*Math.cos(ct.lat*Math.PI/180));
 var bounds=[[ct.lat-dLat,ct.lng-dLng],[ct.lat+dLat,ct.lng+dLng]];
 RT_gvDetach();
 try{
  RT_GV.relief=L.imageOverlay(_cvOut.toDataURL('image/png'),bounds,{opacity:0.5,pane:'gvrelief',interactive:false});
  RT_GV.relief.addTo(RT_holeFullMapInst);
  RT_gvApplyReliefRot(_rotF);
  if(_rotF&&RT_holeFullMapInst){ RT_GV._rotHook=function(){ RT_gvApplyReliefRot(_rotF); }; RT_holeFullMapInst.on('move moveend zoomend viewreset',RT_GV._rotHook); }
 }catch(e){}
 RT_gvStatus('');
 var comp=(fallBrg==null)?'':(['N','NO','O','SO','S','SW','W','NW'][Math.round((fallBrg%360)/45)%8]);
 var putt=(pin&&RT_GV.ball)?RT_haversineM(pin.lat,pin.lng,RT_GV.ball.lat,RT_GV.ball.lng):null;
 var cells='<div style="display:flex;gap:0;background:rgba(0,0,0,.30);border-radius:13px;padding:9px 4px;">'
  +'<div style="flex:1;text-align:center;"><div style="font-size:10.5px;color:#9fb3a4;">Gefälle Fahne</div><div style="font-size:18px;font-weight:800;color:#fff;">'+(slopePct!=null?slopePct+' %':'–')+'</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,.12);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:10.5px;color:#9fb3a4;">Falllinie</div><div style="font-size:18px;font-weight:800;color:#ffd24a;">'+(comp||'–')+'</div><div style="font-size:9.5px;color:#7f948a;">bergab</div></div>'
  +'<div style="width:1px;background:rgba(255,255,255,.12);"></div>'
  +'<div style="flex:1;text-align:center;"><div style="font-size:10.5px;color:#9fb3a4;">Putt</div><div style="font-size:18px;font-weight:800;color:#fff;">'+(putt!=null?RT_fmtDist(putt):'–')+'</div></div>'
 +'</div>';
 RT_gvCard(cells+'<div style="font-size:10.5px;color:#7f948a;margin-top:8px;line-height:1.5;">Höhenlinien alle '+String(iv).replace('.',',')+' m über die ganze Bahn · 1-m-Geländemodell (DGM1, Geobasis NRW). Zeigt das Geländerelief, keine cm-genaue Grün-Vermessung.</div>');
}
/* ===== Ende Geländerelief ===== */


function RT_grabberOverlayHtml(){
 var rd=RT_round; if(!rd) return '';
 var key=RT_holeMapKey(rd,rd.cur);
 var on=!!(RT_state.grabberOn&&RT_state.grabberOn[key]);
 var windOn=!!(RT_state.windOn&&RT_state.windOn[key]);
 var radarOn=!!(RT_state.radarOn&&RT_state.radarOn[key]);
 var lbl='position:absolute;left:0;background:#12261B;color:#fff;padding:7px 14px 7px 12px;'+
   'border-radius:0 10px 10px 0;font-size:26px;font-weight:800;line-height:1;'+
   'box-shadow:0 2px 8px rgba(0,0,0,.4);display:'+(on?'block':'none')+';';
 var btn='pointer-events:auto;width:48px;height:48px;border:none;border-radius:15px;cursor:pointer;'+
   'box-shadow:0 2px 8px rgba(0,0,0,.45);background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;';
 return '<div id="rt-grab-ui" style="position:absolute;inset:0;pointer-events:none;z-index:2600;">'+
  '<div style="position:absolute;right:12px;top:calc(env(safe-area-inset-top,0px) + 64px);display:flex;flex-direction:column;gap:10px;">'+
   RT_hvBtn('wind','Wind','RT_toggleWind()',windOn,'rt-wind-toggle')+
   RT_hvBtn('wetterradar','Wetterradar','RT_toggleRadarHole()',radarOn,'rt-wxr-toggle')+
   RT_hvBtn('shotanalyse','Shot-Analyse','RT_openShotPlan()',!!document.getElementById('rt-sp'),'rt-tile-sp')+
   RT_hvBtn('fahnenradar','Fahnenradar','RT_openFlagRadar()',!!document.getElementById('rt-fr'),'rt-tile-fr')+
   RT_hvBtn('entfernungki','Entfernung & KI','RT_openDistKI()',!!document.getElementById('rt-dki'),'rt-tile-dki')+
   RT_hvBtn('gruen','Geländerelief','RT_openGreenView()',RT_gvActive(),'rt-tile-gv')+
   RT_hvBtn('entfernung','Entfernung','RT_toggleGrabber()',on,'rt-grab-toggle')+
  '</div>'+
  '<div id="rt-wind-ui" style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 64px);left:12px;pointer-events:none;display:'+(windOn?'flex':'none')+';align-items:flex-start;gap:9px;background:rgba(14,30,21,.80);border-radius:16px;padding:7px 13px 7px 7px;box-shadow:0 4px 14px rgba(0,0,0,.45);">'+RT_windOverlayContent(rd,rd.cur)+'</div>'+
  '<div id="rt-grab-far" style="'+lbl+'top:32%;">–</div>'+
  '<div id="rt-grab-near" style="'+lbl+'top:60%;">–</div>'+
 '</div>';
}
function RT_toggleWind(){
 var _wk=RT_round?RT_holeMapKey(RT_round,RT_round.cur):null;
 var _won=!!(RT_state.windOn&&_wk&&RT_state.windOn[_wk]);
 if(!_won && !RT_requirePremium('map'))return;
 var rd=RT_round; if(!rd) return;
 var key=RT_holeMapKey(rd,rd.cur);
 if(!RT_state.windOn) RT_state.windOn={};
 RT_state.windOn[key]=!RT_state.windOn[key];
 var on=!!RT_state.windOn[key];
 RT_tileOp('rt-wind-toggle',on);
 if(on){ try{ RT_windFetch(RT_round,RT_round.cur,false); }catch(e){} }
 var ov=document.getElementById('rt-wind-ui');
 if(ov){ ov.innerHTML=RT_windOverlayContent(rd,rd.cur); ov.style.display=on?'flex':'none'; }
}
function RT_clearFullGrabber(){
 if(RT_state.simClick){ try{ if(RT_holeFullMapInst) RT_holeFullMapInst.off('click',RT_state.simClick); }catch(e){} RT_state.simClick=null; }
 if(RT_state.grabLayer){ try{RT_state.grabLayer.remove();}catch(e){} RT_state.grabLayer=null; }
 var map=RT_holeFullMapInst;
 if(map){
  var doomed=[];
  try{ map.eachLayer(function(l){ if(l&&l._rtGrab) doomed.push(l); }); }catch(e){}
  doomed.forEach(function(l){ try{map.removeLayer(l);}catch(e){} });
  try{ var pn=map.getPane('rtgrab'); if(pn) pn.innerHTML=''; }catch(e){}
 }
 ['rt-grab-far','rt-grab-near'].forEach(function(id){
  var el=document.getElementById(id); if(el) el.style.display='none';
 });
}
function RT_setupFullGrabber(){
 var map=RT_holeFullMapInst; if(!map) return;
 var el=document.getElementById('hole-full-map'); if(!el) return;
 var rd=RT_round; if(!rd) return;
 var c=rd.cur, rotF=RT_state.fullRot||0;
 var center=RT_grabberCenter(rd,c);
 var ref=RT_refFor(rd,c);
 var pin=(ref&&ref.pin)?{lat:ref.pin.lat,lng:ref.pin.lng}:null;
 RT_clearFullGrabber();
 if(!center) return;
 /* Eigener Leaflet-Pane nur fuer den Grabber: dadurch laesst sich beim Aufraeumen der
    komplette Zeichenbereich per DOM leeren. Das greift auch bei Layern, die eine frühere
    Code-Fassung angelegt hat und die keine Objektreferenz mehr besitzen. */
 if(!map.getPane('rtgrab')){ var pn0=map.createPane('rtgrab'); if(pn0) pn0.style.zIndex=650; }
 var layer=L.layerGroup().addTo(map);
 layer._rtGrab=true;
 RT_state.grabLayer=layer;
 /* Kleiner Punkt am Ringmittelpunkt: der Ausgangspunkt ist der kalibrierte Abschlag-
    Referenzpunkt, NICHT die eigene Markierung 'A' - beide koennen ein paar Meter
    auseinanderliegen, und ohne sichtbaren Mittelpunkt wirkt das wie ein Fehler. */
 L.marker([center.lat,center.lng],{pane:'rtgrab',interactive:false,icon:L.divIcon({className:'',
  iconSize:[14,14],iconAnchor:[7,7],
  html:'<div style="width:14px;height:14px;border-radius:50%;background:#fff;'+
   'border:2px solid #12261B;box-shadow:0 1px 3px rgba(0,0,0,.5);"></div>'})}).addTo(layer);
 var brg=pin?RT_grabBearing(center,pin):0;
 var total=pin?RT_haversineM(center.lat,center.lng,pin.lat,pin.lng):250;
 /* Boegen NICHT als L.polyline: in der per CSS gedrehten Vollbildkarte erhaelt Leaflets
    Vektor-Renderer keine Kartenereignisse - die Pfade werden nie neu projiziert, kleben an
    ihrer ersten Bildschirmposition und wandern beim Verschieben nicht mit. Marker dagegen
    positioniert Leaflet einzeln und zuverlaessig. Der komplette Faecher steckt deshalb als
    Inline-SVG in EINEM divIcon, das am Ringmittelpunkt verankert ist. Im SVG wird in reinen
    Pixeln um die Bildmitte gezeichnet, Winkel 0 zeigt nach Norden - die Kartendrehung
    uebernimmt der Container. */
 var arcMarker=null;
 function RT_grabMpp(){
  return 156543.03392*Math.cos(center.lat*Math.PI/180)/Math.pow(2,map.getZoom());
 }
 var spKey=RT_holeMapKey(rd,c);
 RT_state.simPts=RT_state.simPts||{};
 var _sp=RT_state.simPts[spKey];
 if(pin&&(!_sp||!_sp.length||typeof _sp[0]!=='object')){ RT_state.simPts[spKey]=[{lat:(center.lat+pin.lat)/2,lng:(center.lng+pin.lng)/2}]; }
 var COSs=Math.cos(center.lat*Math.PI/180);
 function mProjT(ll){ var vx=(pin.lng-center.lng)*111320*COSs, vy=(pin.lat-center.lat)*111320; var wx=(ll.lng-center.lng)*111320*COSs, wy=(ll.lat-center.lat)*111320; var l2=vx*vx+vy*vy||1e-9; return (wx*vx+wy*vy)/l2; }
 function routeSorted(){ if(!pin) return []; var a=(RT_state.simPts[spKey]||[]).slice(); a.sort(function(p,q){ return mProjT(p)-mProjT(q); }); return a; }
 function RT_grabArcSvg(){
  var mpp=RT_grabMpp(), radii=RT_grabRadii(total);
  var maxM=radii.length?radii[radii.length-1]:250;
  if(pin) maxM=Math.max(maxM,total);
  routeSorted().forEach(function(w){ maxM=Math.max(maxM,RT_haversineM(center.lat,center.lng,w.lat,w.lng)); });
  var R=maxM/mpp, S=Math.min(Math.round(2*R+80),8000), cx=S/2, cy=S/2;
  function px(brgDeg,dM){ var t=brgDeg*Math.PI/180, rr=dM/mpp; return [cx+rr*Math.sin(t), cy-rr*Math.cos(t)]; }
  function pxLL(ll){ var d=RT_haversineM(center.lat,center.lng,ll.lat,ll.lng); return px(RT_grabBearing(center,ll),d); }
  var parts=[];
  radii.forEach(function(r){
   var d='';
   for(var a=-40;a<=40;a+=2.5){ var p=px(brg+a,r); d+=(d?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1); }
   var hundred=(r%100===0);
   parts.push('<path d="'+d+'" fill="none" stroke="'+(hundred?'#2F86FF':'#FFFFFF')+'" stroke-width="'+(hundred?2.6:1.8)+'" stroke-opacity="'+(hundred?.95:.85)+'" stroke-linecap="round"/>');
  });
  // Route: Abschlag -> Punkte -> Loch. Die weisse Linie IST die Route und bricht an jedem Punkt.
  var ptsL=[px(0,0)];
  routeSorted().forEach(function(w){ ptsL.push(pxLL(w)); });
  if(pin) ptsL.push(px(brg,total));
  var dl=ptsL.map(function(p,i){ return (i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1); }).join('');
  parts.push('<path d="'+dl+'" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity=".95" stroke-linejoin="round" stroke-linecap="round"/>');
  return {svg:'<svg width="'+S+'" height="'+S+'" viewBox="0 0 '+S+' '+S+'" style="display:block;overflow:visible;">'+parts.join('')+'</svg>', size:S};
 }
 function RT_grabDrawArcs(){
  var o=RT_grabArcSvg();
  var ic=L.divIcon({className:'',html:o.svg,iconSize:[o.size,o.size],iconAnchor:[o.size/2,o.size/2]});
  if(arcMarker){ arcMarker.setIcon(ic); }
  else{ arcMarker=L.marker([center.lat,center.lng],{pane:'rtgrab',interactive:false,icon:ic}).addTo(layer); }
 }
 RT_grabRadii(total).forEach(function(r){
  var lp=RT_grabDest(center.lat,center.lng,brg,r);
  L.marker(lp,{pane:'rtgrab',interactive:false,icon:L.divIcon({className:'',iconSize:[46,18],iconAnchor:[23,9],
   html:'<div style="transform:rotate('+(-rotF)+'deg);text-align:center;color:#fff;font-size:12px;font-weight:800;text-shadow:0 1px 3px rgba(0,0,0,.85);">'+r+'</div>'})}).addTo(layer);
 });
 RT_grabDrawArcs();
 map.on('zoomend',function(){ if(arcMarker) RT_grabDrawArcs(); });
 // ===== Route-Punkte: frei verschiebbar, brechen die weisse Linie (Abschlag -> Punkte -> Loch) =====
 if(pin&&total>0){
  var routeMarkers=[];
  function rUnit(m){ return (RT_distUnit()==='yd')?Math.round(m*1.09361):Math.round(m); }
  function rLbl(obj){ var fromTee=RT_haversineM(center.lat,center.lng,obj.lat,obj.lng); var toPin=RT_haversineM(obj.lat,obj.lng,pin.lat,pin.lng); var uu=(RT_distUnit()==='yd')?'yd':'m'; return '<span style="font-size:9px;font-weight:600;color:#9fb3a4;">ab </span><span style="font-size:13px;font-weight:800;">'+rUnit(fromTee)+'</span><span style="font-size:9px;font-weight:700;color:#9fb3a4;margin:0 6px 0 2px;">'+uu+'</span><span style="font-size:9px;font-weight:600;color:#9fb3a4;">Loch </span><span style="font-size:13px;font-weight:800;">'+rUnit(toPin)+'</span><span style="font-size:9px;font-weight:700;margin-left:2px;">'+uu+'</span>'; }
  function rIcon(obj){ return L.divIcon({className:'',iconSize:[44,44],iconAnchor:[22,22],html:'<div style="width:44px;height:44px;transform:rotate('+(-rotF)+'deg);position:relative;">'+'<div style="position:absolute;left:14px;top:14px;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid #12261B;box-shadow:0 1px 4px rgba(0,0,0,.55);"></div>'+'<div class="simlbl" style="position:absolute;left:50%;top:33px;transform:translateX(-50%);background:#12261B;color:#fff;font-weight:800;border-radius:9px;padding:4px 10px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.5);">'+rLbl(obj)+'</div>'+'</div>'}); }
  function rWire(m,obj){ var e2=m.getElement(); if(!e2) return; e2.style.touchAction='none'; e2.style.cursor='grab'; var st=null,mv=false,sc=null;
   e2.addEventListener('pointerdown',function(ev){ ev.preventDefault(); ev.stopPropagation(); try{e2.setPointerCapture(ev.pointerId);}catch(e){} var p0=RT_correctedLatLng(map,el,rotF,ev.clientX,ev.clientY); st=p0?{dLat:obj.lat-p0.lat,dLng:obj.lng-p0.lng}:{dLat:0,dLng:0}; mv=false; sc={x:ev.clientX,y:ev.clientY}; });
   e2.addEventListener('pointermove',function(ev){ if(!st) return; ev.preventDefault(); ev.stopPropagation(); if(Math.abs(ev.clientX-sc.x)+Math.abs(ev.clientY-sc.y)>5) mv=true; var p=RT_correctedLatLng(map,el,rotF,ev.clientX,ev.clientY); if(!p) return; obj.lat=p.lat+st.dLat; obj.lng=p.lng+st.dLng; m.setLatLng([obj.lat,obj.lng]); var lab=e2.querySelector('.simlbl'); if(lab) lab.innerHTML=rLbl(obj); RT_grabDrawArcs(); });
   function endR(ev){ if(!st) return; st=null; ev.stopPropagation(); if(!mv){ var arr=RT_state.simPts[spKey]; if(arr.length>1){ var k=arr.indexOf(obj); if(k>=0){ arr.splice(k,1); routeDraw(); } } } else { routeDraw(); } }
   e2.addEventListener('pointerup',endR); e2.addEventListener('pointercancel',endR);
  }
  function routeDraw(){ routeMarkers.forEach(function(m){ try{layer.removeLayer(m);}catch(e){} }); routeMarkers=[]; routeSorted().forEach(function(obj){ var m=L.marker([obj.lat,obj.lng],{pane:'rtgrab',icon:rIcon(obj)}).addTo(layer); routeMarkers.push(m); rWire(m,obj); }); RT_grabDrawArcs(); }
  function segNearest(A,B,Pll){ function xy(p){ return [(p.lng-center.lng)*111320*COSs,(p.lat-center.lat)*111320]; } var a=xy(A),b=xy(B),p=xy(Pll); var vx=b[0]-a[0],vy=b[1]-a[1]; var wx=p[0]-a[0],wy=p[1]-a[1]; var l2=vx*vx+vy*vy||1e-9; var t=Math.max(0,Math.min(1,(wx*vx+wy*vy)/l2)); var qx=a[0]+vx*t,qy=a[1]+vy*t; return {pt:{lat:center.lat+qy/111320,lng:center.lng+qx/(111320*COSs)},dist:Math.hypot(p[0]-qx,p[1]-qy)}; }
  function nearestOnRoute(Pll){ var chain=[center].concat(routeSorted()).concat([pin]); var best=null; for(var i=0;i<chain.length-1;i++){ var r=segNearest(chain[i],chain[i+1],Pll); if(!best||r.dist<best.dist) best=r; } return best; }
  function routeClick(e){ if(RT_suppressMapClick&&RT_suppressMapClick['full']) return; if(RT_fullSelPin!=null&&RT_fullSelPin!==undefined) return; var oe=e.originalEvent, ll; if(oe&&typeof oe.clientX==='number'){ ll=RT_correctedLatLng(map,el,rotF,oe.clientX,oe.clientY); } else ll=e.latlng; if(!ll) return; var nr=nearestOnRoute(ll); if(!nr||nr.dist>26*RT_grabMpp()) return; var arr=RT_state.simPts[spKey]; for(var i=0;i<arr.length;i++){ if(RT_haversineM(arr[i].lat,arr[i].lng,nr.pt.lat,nr.pt.lng)<8) return; } arr.push({lat:nr.pt.lat,lng:nr.pt.lng}); routeDraw(); }
  RT_state.simClick=routeClick; map.on('click',routeClick);
  routeDraw();
 }
 /* Groesse und Renderer-Ursprung nach dem Zeichnen erzwingen: laeuft der Aufbau vor dem
    invalidateSize() der Karte, kennt der Renderer noch die alte Containergroesse. */
 setTimeout(function(){ try{ map.invalidateSize(); map.fire('moveend'); }catch(e){} },0);
}
function RT_grabNum(m){
 if(m===null||m===undefined||isNaN(m)) return '\u2013';
 var v=(RT_distUnit()==='yd')?Math.round(m*1.09361):Math.round(m);
 var u=(RT_distUnit()==='yd')?'yd':'m';
 return v+'<span style="font-size:12px;font-weight:700;vertical-align:super;margin-left:2px;">'+u+'</span>';
}
function RT_toggleGrabber(){
 var rd=RT_round; if(!rd) return;
 var key=RT_holeMapKey(rd,rd.cur);
 if(!RT_state.grabberOn) RT_state.grabberOn={};
 RT_state.grabberOn[key]=!RT_state.grabberOn[key];
 var on=!!RT_state.grabberOn[key];
 RT_tileOp('rt-grab-toggle',on);
 /* Bewusst KEIN RT_render(): das Vollbild wuerde neu aufgebaut und die Karte neu
    initialisiert - Ausschnitt und Zoom waeren weg. */
 if(on) RT_setupFullGrabber(); else RT_clearFullGrabber();
}
function RT_updPinHint(pi){
 var rd=RT_round; if(!rd)return;
 var p=rd.players[pi], c=rd.cur;
 var n=(p.pins&&p.pins[c])?p.pins[c].length:0;
 var hintEl=document.getElementById('pin-hint-'+pi);
 if(hintEl) hintEl.textContent='Karte antippen = Lage + Schlag \u00b7 Markierung antippen = entfernt beides';
 var btn=document.getElementById('pin-reset-'+pi);
 if(btn) btn.style.display = n? 'inline-block':'none';
}
function RT_clearPins(pi){
 var rd=RT_round; if(!rd)return;
 var p=rd.players[pi], c=rd.cur;
 if(p.pins) p.pins[c]=[];
 rtSet(RT_ACT,RT_round);
 RT_redrawPins(pi);
 RT_updPinHint(pi);
}
var RT_MAPSAT_KEY='fp_mapsat';
function RT_mapSat(){ return rtGet(RT_MAPSAT_KEY)===true; }
function RT_setMapSat(v){ rtSet(RT_MAPSAT_KEY, !!v); }
function RT_toggleHoleView(){
 var rd=RT_round; if(!rd) return;
 RT_setMapSat(!RT_mapSat());
 RT_render();
}
function RT_render(){
 var r=document.getElementById('rt-root'); if(!r)return;
 if(RT_state.screen==='setup'){ r.innerHTML=RT_rSetup(); RT_initMap(); }
 else if(RT_state.screen==='coursePick')r.innerHTML=RT_rCoursePick();
 else if(RT_state.screen==='play'){ r.innerHTML=RT_rPlay(); RT_initHoleMaps(); RT_initRefEditMap(); RT_startGeoWatch(); }
 else if(RT_state.screen==='view')r.innerHTML=RT_rView();
 else if(RT_state.screen==='bag')r.innerHTML=RT_rBag();
 else if(RT_state.screen==='courseMap'){ r.innerHTML=RT_rCourseMap(); RT_cmInit(); }
 else if(RT_state.screen==='myCourses')r.innerHTML=RT_rMyCourses();
 else if(RT_state.screen==='user')r.innerHTML=RT_rUser();
 else if(RT_state.screen==='services')r.innerHTML=RT_rServices();
 else r.innerHTML=RT_rHome();
 try{ if(typeof RT_rtSync==='function') RT_rtSync(); }catch(e){}
 try{ if(typeof RT_livePollSync==='function') RT_livePollSync(); }catch(e){}
 try{ if(typeof RT_v2Sync==='function') RT_v2Sync(); }catch(e){}
 try{ if(RT_state.screen==='play'){ RT_wakeReq(); } else { RT_wakeRelease(); } }catch(e){}
}
function RT_go(s){if(s!=='play')RT_stopGeoWatch();RT_state.screen=s;RT_state.ask='';try{if(s==='play')rtSet('golflog_screen_v1','play');else rtDel('golflog_screen_v1');}catch(e){}RT_render();var _ap=document.getElementById('app');if(_ap)_ap.scrollTop=0;}

/* ============================================================
   M7 · Verbundene Dienste (Konto)
   Adapter-Rahmen zum Verbinden/Trennen externer Datenquellen mit ausdrücklicher
   Einwilligung vor jeder Übertragung. Reihenfolge laut Roadmap: Apple Health → FIT-Import
   → Garmin Cloud. OAuth-/Cloud-Anbindungen laufen später serverseitig im Worker; hier ist
   der clientseitige Rahmen + der erste real funktionierende Adapter: FIT-Datei-Import.
   Ehrlich: Apple Health braucht die native iOS-App (HealthKit, kein Browser-Zugriff);
   Garmin Connect nimmt aktuell keine Neuanträge (Golf-Premium-API erst nach Store-Launch).
   FIT-Import läuft komplett lokal auf dem Gerät – die Datei verlässt das Gerät nicht.
   ============================================================ */
var RT_SVC_KEY='fp_services_v1';
function RT_svcState(){ return rtGet(RT_SVC_KEY)||{}; }
function RT_svcGet(id){ var s=RT_svcState(); return s[id]||{}; }
function RT_svcSet(id,patch){ var s=RT_svcState(); s[id]=Object.assign({},s[id]||{},patch); rtSet(RT_SVC_KEY,s); }

/* Adapter-Registry. available=false → Karte informativ (noch nicht im Browser nutzbar). */
var RT_SERVICES=[
 { id:'applehealth', name:'Apple Health', tint:'#FF4E64', available:false, availLabel:'Nur in der iOS-App',
   icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#FF4E64"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.3 2 4.5 5.6 4.5c2 0 3.3 1.2 4.4 2.6 1.1-1.4 2.4-2.6 4.4-2.6 3.6 0 5.3 3.8 3.6 7.2C19.5 16.4 12 21 12 21z"/></svg>',
   desc:'Aktivitäten, Schritte und Herzfrequenz aus Apple Health – als Kontext zu deinen Runden.',
   note:'Apple Health ist nur über die native iOS-App (HealthKit) erreichbar, nicht im Browser. Sobald FairwayPilot im App Store ist, kannst du die Verbindung hier mit ausdrücklicher Einwilligung aktivieren.' },
 { id:'fit', name:'FIT-Datei-Import', tint:'#1F8A4D', available:true, availLabel:'Verfügbar',
   icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1F8A4D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M12 18v-6"/><path d="M9 15l3 3 3-3"/></svg>',
   desc:'Runde als .FIT-Datei von einer Garmin-/Kompatibel-Uhr einlesen und die Kennzahlen prüfen. Läuft lokal auf dem Gerät.' },
 { id:'garmin', name:'Garmin Connect', tint:'#0B7CC1', available:false, availLabel:'Nach Store-Launch',
   icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="#0B7CC1"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3.2 2.1 4.4 4.7.6-3.5 3.2 1 4.7L12 15.9 7.7 18.3l1-4.7-3.5-3.2 4.7-.6L12 5.2z"/></svg>',
   desc:'Runden direkt aus der Garmin-Cloud übernehmen (Golf-Premium-API).',
   note:'Das Garmin-Connect-Programm nimmt derzeit keine Neuanträge an; die Golf-Premium-API wird erst nach dem Store-Launch freigeschaltet. Die Antragsmail liegt bereit. Bis dahin nutze den FIT-Datei-Import oben.' }
];
function RT_svcById(id){ for(var i=0;i<RT_SERVICES.length;i++){ if(RT_SERVICES[i].id===id) return RT_SERVICES[i]; } return null; }
function RT_svcSummaryLine(){
 var st=RT_svcState(); var conn=0;
 for(var i=0;i<RT_SERVICES.length;i++){ if(st[RT_SERVICES[i].id]&&st[RT_SERVICES[i].id].connected) conn++; }
 var fit=RT_svcGet('fit');
 if(fit&&fit.last) return 'Zuletzt importiert: '+RT_svcFmtWhen(fit.last.at);
 if(conn>0) return conn+' Dienst'+(conn===1?'':'e')+' verbunden';
 return 'Apple Health · FIT-Import · Garmin – noch nichts verbunden';
}
function RT_svcFmtWhen(ts){
 if(!ts) return '–'; var d=new Date(ts);
 function p(n){ return (n<10?'0':'')+n; }
 return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear()+' '+p(d.getHours())+':'+p(d.getMinutes());
}

/* ---------- Bildschirm ---------- */
function RT_rServices(){
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="RT_go(\'user\')">&#8249;</button>'+
  '<div class="rt-h1" style="font-size:18px;">Verbundene Dienste</div></div>';
 h+='<div class="rt-cs" style="margin:-4px 2px 12px;">Verbinde externe Datenquellen mit FairwayPilot. Vor jeder Datenübertragung wirst du ausdrücklich um Einwilligung gebeten; du kannst jede Verbindung jederzeit trennen.</div>';
 for(var i=0;i<RT_SERVICES.length;i++){ h+=RT_svcCard(RT_SERVICES[i]); }
 h+='<div class="rt-note" style="margin-top:4px;">Deine Daten werden nur mit deiner Einwilligung übertragen. FIT-Dateien werden ausschließlich lokal auf diesem Gerät gelesen und nicht hochgeladen.</div>';
 return h;
}
function RT_svcCard(s){
 var st=RT_svcGet(s.id);
 var connected=!!st.connected;
 var pillBg,pillTx,pillLbl;
 if(!s.available){ pillBg='rgba(120,132,124,.16)'; pillTx='#6f857a'; pillLbl=s.availLabel; }
 else if(connected){ pillBg='rgba(31,138,77,.16)'; pillTx='#1F8A4D'; pillLbl='Verbunden'; }
 else { pillBg='rgba(120,132,124,.14)'; pillTx='#6f857a'; pillLbl='Nicht verbunden'; }
 var h='<div class="rtc">'+
  '<div style="display:flex;align-items:center;gap:11px;">'+
   '<div style="width:40px;height:40px;border-radius:11px;background:'+s.tint+'1a;display:flex;align-items:center;justify-content:center;flex:none;">'+s.icon+'</div>'+
   '<div style="flex:1;min-width:0;"><div style="font-size:15px;font-weight:800;color:var(--tx);">'+s.name+'</div>'+
    '<div style="display:inline-block;margin-top:2px;font-size:11px;font-weight:700;color:'+pillTx+';background:'+pillBg+';border-radius:100px;padding:2px 9px;">'+pillLbl+'</div></div>'+
  '</div>'+
  '<div class="rt-cs" style="margin:9px 0 0;">'+s.desc+'</div>';

 if(s.id==='fit'){
  h+=RT_svcFitBody(st);
 } else if(!s.available){
  h+='<div style="font-size:12px;color:#7f948a;line-height:1.5;margin-top:9px;background:rgba(120,132,124,.08);border-radius:11px;padding:10px 12px;">'+s.note+'</div>';
  if(s.id==='garmin'){
   h+='<button class="rt-btn2" style="margin-top:10px;" onclick="RT_go(\'user\')">Antragsstatus im Blick behalten</button>';
  }
 }
 h+='</div>';
 return h;
}
function RT_svcFitBody(st){
 var h='<label class="rt-btn" style="margin-top:11px;display:flex;align-items:center;justify-content:center;gap:7px;cursor:pointer;">'+
   '<span>FIT-Datei wählen</span>'+
   '<input type="file" accept=".fit,application/octet-stream" style="display:none;" onchange="RT_fitPick(event)"></label>';
 if(RT_state.fitBusy) h+='<div class="rt-cs" style="margin-top:10px;text-align:center;"><span class="rt-spin"></span>Datei wird gelesen…</div>';
 if(RT_state.fitErr) h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(RT_state.fitErr)+'</div>';
 if(st&&st.last){
  var L=st.last;
  var rows=[
   ['Datum', L.date||'–'],
   ['Sportart', L.sport||'–'],
   ['Dauer', L.durTxt||'–'],
   ['Distanz', L.distTxt||'–'],
   ['GPS-Punkte', (L.pts!=null?String(L.pts):'–')]
  ];
  var tbl='';
  for(var i=0;i<rows.length;i++){
   tbl+='<div style="display:flex;justify-content:space-between;padding:6px 0;'+(i?'border-top:1px solid var(--ln,#EAF0E7);':'')+'">'+
    '<span style="font-size:12.5px;color:var(--tx3,#6f857a);">'+rows[i][0]+'</span>'+
    '<span style="font-size:13px;font-weight:700;color:var(--tx);">'+rtEsc(rows[i][1])+'</span></div>';
  }
  h+='<div style="margin-top:11px;background:rgba(31,138,77,.06);border:1px solid rgba(31,138,77,.18);border-radius:12px;padding:8px 13px;">'+
    '<div style="font-size:11px;font-weight:800;letter-spacing:.4px;color:#1F8A4D;margin-bottom:2px;">ZULETZT GELESEN'+(L.golf?' · GOLFRUNDE':'')+'</div>'+
    tbl+'</div>';
  h+='<div style="font-size:11px;color:#7f948a;margin-top:8px;line-height:1.5;">'+
    (L.golf
      ? 'Als Golfrunde erkannt. Das Übernehmen als vollständige FairwayPilot-Runde (mit Score je Loch) folgt, sobald das genaue Feld­format deiner Uhr abgeglichen ist – schick mir gern eine deiner FIT-Dateien.'
      : 'Kennzahlen gelesen. FIT enthält je nach Uhr keine Golf-Scores in Standardfeldern; diese lassen sich nicht zuverlässig automatisch übernehmen.')+
    '</div>';
  h+='<button class="rt-btn3" style="margin-top:6px;font-size:12px;color:var(--tx3);" onclick="RT_fitClear()">Ergebnis entfernen</button>';
 }
 return h;
}
function RT_fitClear(){ RT_svcSet('fit',{last:null}); RT_state.fitErr=''; RT_render(); }

/* ---------- FIT-Parser (clientseitig, robust, minimal) ----------
   Liest Header + Definition-/Data-Messages nach FIT-Spezifikation aus. Extrahiert
   verlässliche Standardfelder: file_id.time_created, sport, total_distance/elapsed_time
   (session) und zählt record-Messages mit gültiger GPS-Position. Undokumentierte
   Golf-Score-Felder werden bewusst NICHT interpretiert. */
var RT_FIT_SPORT={0:'Allgemein',1:'Laufen',2:'Radfahren',5:'Schwimmen',11:'Gehen',15:'Rudern',17:'Wandern',25:'Golf',37:'SUP',38:'Surfen'};
var RT_FIT_BASESZ={0:1,1:1,2:1,131:2,132:2,133:4,134:4,7:1,136:4,137:8,10:1,139:2,140:4,13:1,142:8,143:8,144:8};
function RT_fitPick(ev){
 var f=ev&&ev.target&&ev.target.files&&ev.target.files[0]; if(!f){ return; }
 RT_state.fitBusy=true; RT_state.fitErr=''; RT_render();
 var rd=new FileReader();
 rd.onerror=function(){ RT_state.fitBusy=false; RT_state.fitErr='Datei konnte nicht gelesen werden.'; RT_render(); };
 rd.onload=function(){
  RT_state.fitBusy=false;
  try{
   var res=RT_fitParse(rd.result);
   if(!res.ok){ RT_state.fitErr=res.msg||'Keine gültige FIT-Datei.'; RT_render(); return; }
   RT_svcSet('fit',{connected:true,last:res.data});
   RT_state.fitErr='';
   RT_render();
  }catch(e){ RT_state.fitErr='FIT-Datei konnte nicht ausgewertet werden.'; RT_render(); }
 };
 rd.readAsArrayBuffer(f);
}
function RT_fitParse(buf){
 var dv=new DataView(buf), N=buf.byteLength;
 if(N<14) return {ok:false,msg:'Datei zu klein für eine FIT-Datei.'};
 var hdrSize=dv.getUint8(0);
 if(hdrSize!==12&&hdrSize!==14) return {ok:false,msg:'Kein FIT-Header erkannt.'};
 var magic=String.fromCharCode(dv.getUint8(8),dv.getUint8(9),dv.getUint8(10),dv.getUint8(11));
 if(magic!=='.FIT') return {ok:false,msg:'Datei ist keine FIT-Datei (.FIT-Signatur fehlt).'};
 var dataSize=dv.getUint32(4,true);
 var pos=hdrSize, end=Math.min(N, hdrSize+dataSize);
 var defs={}; // localType -> {arch,global,fields:[{num,size,base}], totalSize}
 var out={time:null,sport:null,dist:null,elapsed:null,start:null,pts:0,golf:false};
 var guard=0;
 while(pos<end && guard++<500000){
  var rh=dv.getUint8(pos++);
  if(rh&0x80){ // compressed timestamp data message
   var lt=(rh>>5)&0x03; var d=defs[lt];
   if(!d){ return {ok:false,msg:'FIT-Struktur unerwartet (fehlende Definition).'}; }
   RT_fitReadData(dv,pos,d,out); pos+=d.totalSize; continue;
  }
  var local=rh&0x0f;
  if(rh&0x40){ // definition
   var arch=dv.getUint8(pos+1);
   var le=(arch===0);
   var global=dv.getUint16(pos+2,le);
   var nf=dv.getUint8(pos+4);
   var p2=pos+5; var fields=[]; var tot=0;
   for(var i=0;i<nf;i++){ var fn=dv.getUint8(p2), sz=dv.getUint8(p2+1), bt=dv.getUint8(p2+2); fields.push({num:fn,size:sz,base:bt}); tot+=sz; p2+=3; }
   if(rh&0x20){ var nd=dv.getUint8(p2); p2+=1; for(var j=0;j<nd;j++){ var dsz=dv.getUint8(p2+1); fields.push({num:-1,size:dsz,base:0,dev:true}); tot+=dsz; p2+=3; } }
   defs[local]={arch:arch,le:le,global:global,fields:fields,totalSize:tot};
   pos=p2; continue;
  }
  // normal data message
  var def=defs[local];
  if(!def){ return {ok:false,msg:'FIT-Struktur unerwartet (Datensatz ohne Definition).'}; }
  RT_fitReadData(dv,pos,def,out); pos+=def.totalSize;
 }
 // Ergebnis aufbereiten
 var data={};
 var epoch=631065600; // FIT → Unix Sekunden
 var whenT=(out.time!=null?out.time:(out.start!=null?out.start:null));
 if(whenT!=null){ var dt=new Date((whenT+epoch)*1000); data.date=RT_fitFmtDate(dt); data.iso=dt.toISOString(); }
 else data.date='–';
 data.sport=(out.sport!=null)?(RT_FIT_SPORT[out.sport]||('Sport '+out.sport)):'–';
 data.golf=(out.sport===25);
 if(out.dist!=null&&out.dist>0){ var m=out.dist/100; data.distTxt=(m>=1000?(Math.round(m/10)/100+' km'):(Math.round(m)+' m')); }
 else data.distTxt='–';
 if(out.elapsed!=null&&out.elapsed>0){ var sec=Math.round(out.elapsed/1000); var hh=Math.floor(sec/3600), mm=Math.floor((sec%3600)/60); data.durTxt=(hh>0?(hh+' h '):'')+mm+' min'; }
 else data.durTxt='–';
 data.pts=out.pts;
 data.at=RT_fitNow();
 return {ok:true,data:data};
}
function RT_fitReadData(dv,pos,def,out){
 var p=pos, le=def.le;
 for(var i=0;i<def.fields.length;i++){
  var f=def.fields[i];
  if(!f.dev && def.global===0 && f.num===4){ out.time=RT_fitU32(dv,p,le,f); }          // file_id.time_created
  else if(!f.dev && def.global===12 && f.num===0){ var sv=RT_fitU8(dv,p,f); if(sv!=null) out.sport=sv; } // sport.sport
  else if(!f.dev && def.global===18){ // session
   if(f.num===5){ var s2=RT_fitU8(dv,p,f); if(s2!=null&&out.sport==null) out.sport=s2; }
   else if(f.num===2){ var st=RT_fitU32(dv,p,le,f); if(st!=null) out.start=st; }
   else if(f.num===7){ var el=RT_fitU32(dv,p,le,f); if(el!=null) out.elapsed=el; }
   else if(f.num===9){ var ds=RT_fitU32(dv,p,le,f); if(ds!=null) out.dist=ds; }
  }
  else if(!f.dev && def.global===20 && (f.num===0||f.num===1)){ // record position
   var v=RT_fitI32(dv,p,le,f); if(f.num===0 && v!=null && v!==0) out.pts++;
  }
  p+=f.size;
 }
}
function RT_fitU8(dv,p,f){ if(f.size<1) return null; var v=dv.getUint8(p); return v===0xFF?null:v; }
function RT_fitU32(dv,p,le,f){ if(f.size<4) return null; var v=dv.getUint32(p,le); return v===0xFFFFFFFF?null:v; }
function RT_fitI32(dv,p,le,f){ if(f.size<4) return null; var v=dv.getInt32(p,le); return v===0x7FFFFFFF?null:v; }
function RT_fitFmtDate(d){ function p(n){ return (n<10?'0':'')+n; } return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear(); }
function RT_fitNow(){ return (new Date()).getTime(); }
/* ===== Ende Verbundene Dienste ===== */

function RT_userIcon(){
 var av=sbUser&&sbUser.user_metadata&&sbUser.user_metadata.avatar_url;
 var initial=sbUser&&sbUser.user_metadata&&sbUser.user_metadata.display_name?sbUser.user_metadata.display_name.charAt(0).toUpperCase():(sbUser&&sbUser.email?sbUser.email.charAt(0).toUpperCase():'');
 var inner=av?'<img src="'+rtEsc(av)+'" style="width:100%;height:100%;object-fit:cover;">':
  (sbUser?'<span style="font-size:15px;font-weight:800;color:#fff;">'+initial+'</span>':'<span style="font-size:16px;">&#128100;</span>');
 var bg=sbUser?'#1F8A4D':'#DCE7D4';
 /* showTab('runde') zuerst, weil das Konto-Menue (RT_rUser via RT_go('user')) in #rt-root
    gerendert wird, das nur innerhalb des Tabs "Runde" sichtbar ist - so funktioniert das Icon
    auch, wenn es auf den Tabs "Handicap" oder "Schlag-Detail" angezeigt wird. */
 return '<button onclick="showTab(\'runde\');RT_go(\'user\')" title="Benutzermen\u00fc" style="flex:none;width:38px;height:38px;border-radius:50%;border:none;background:'+bg+';overflow:hidden;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;">'+inner+'</button>';
}
var RT_homeLimit=20;
function RT_homeShowMore(){ RT_homeLimit+=20; RT_render(); }
function RT_rHome(){
 var saved=rtGet(RT_KEY)||[];
 saved=saved.filter(function(r){return !r.hidden;});
 var h='<div style="margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;">'+
   '<div><div class="rt-h1">Fairway<em>Pilot</em></div>'+
   '<div class="rt-sub">Scorecard w\u00e4hrend der Runde erfassen</div></div>'+
   RT_userIcon()+
   '</div>';
 if(RT_round&&!RT_round.done){
  h+='<div class="rtc rtc-hd"><div class="rt-ct">Aktive Runde</div>'+
   '<div class="rt-cs">'+rtEsc(RT_round.courseName)+' &middot; '+RT_fmtDT(RT_round)+' &middot; Bahn '+RT_round.nums[RT_round.cur]+'</div>'+
   '<button class="rt-btn" onclick="RT_go(\'play\')">Runde fortsetzen</button>'+
   (RT_state.ask==='discard'?'<button class="rt-btn3" style="width:100%;margin-top:4px;color:#B03A3A;font-weight:800;" onclick="RT_discard()">Wirklich verwerfen? Erneut tippen</button>':'<button class="rt-btn3" style="width:100%;margin-top:4px;" onclick="RT_discard()">Aktive Runde verwerfen</button>')+'</div>';
 }else{
  h+='<div class="rtc rtc-hd"><div class="rt-ct">Neue Runde</div>'+
   '<div class="rt-cs">Platz, Spieler und Abschl\u00e4ge festlegen &ndash; dann Loch f\u00fcr Loch eintragen</div>'+
   '<button class="rt-btn" onclick="RT_newRound()">Neue Runde starten</button></div>';
 }
 h+=RT_onbChecklistHtml();
 h+='<div class="rtc"><div class="rt-ct">Gespeicherte Runden</div>';
 if(!saved.length){
  h+='<div style="font-size:12px;color:#8A9C8E;padding:14px 0 10px;text-align:center;">Noch keine Runden gespeichert.<br>Deine erste Runde erscheint hier.</div>'
   +'<button class="rt-btn" style="width:100%;" onclick="RT_newRound()">Erste Runde starten</button>';
 }else{
  h+='<div class="rt-cs">'+saved.length+' Runde'+(saved.length>1?'n':'')+' &middot; auf diesem Ger\u00e4t gespeichert</div>';
  var sortedSaved=saved.slice().sort(function(a,b){
   if(a.date!==b.date) return b.date>a.date?1:-1;
   var at=a.time||'', bt=b.time||'';
   return bt>at?1:bt<at?-1:0;
  });
  /* Rundenkarte im Stil einer Scorecard-Kachel: Hintergrundbild des Platzes, Logo oben
     rechts, unten Datum/Platz/Loecher und rechts die eigene Schlagzahl mit hochgestellter
     Stableford-Punktzahl. Gezeigt wird die auf Netto-Doppel-Bogey gedeckelte Schlagzahl (t.br), also der handicaprelevante Wert - die Bruttosumme (t.brRaw) steht weiterhin in der Detailansicht unter Gesamtanzahl Schlaege. Gezeigt werden bewusst nur die eigenen Werte (RT_myPlayerIndex),
     nicht die aller Mitspieler. */
  sortedSaved.slice(0,RT_homeLimit).forEach(function(rd){
   var mi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(rd):0;
   var me=rd.players[mi]||rd.players[0];
   var t=RT_totals(me,rd);
   var holes=(rd.cnt===18)?'18':String(rd.cnt);
   var bg=RT_roundBgUrl(rd);
   h+='<div class="rt-rcard" onclick="RT_openView(\''+rd.id+'\')">'+
    '<img src="'+bg+'" alt="" loading="lazy" onerror="RT_imgErr(this)">'+
    '<div class="rt-rcard-sh"></div>'+RT_wxBadgeHtml(rd)+
    '<div class="rt-rcard-logo"><img src="/logo-mark.png" alt="">FairwayPilot</div>'+
    '<div class="rt-rcard-body">'+
     '<div class="rt-rcard-txt">'+
      '<div class="d">'+RT_fmtDT(rd)+'</div>'+
      '<div class="c">'+rtEsc(rd.courseName)+'</div>'+
      '<div class="m">'+holes+' L\u00d6CHER &middot; PAR '+rd.par.reduce(function(a,b){return a+b;},0)+'</div>'+
     '</div>'+
     '<div class="rt-rcard-sc">'+t.br+'<sup>'+t.stbf+'</sup></div>'+
    '</div>'+
   '</div>';
  });
 }
 h+='</div>';
  if(saved.length>RT_homeLimit){h+='<div style="text-align:center;margin:8px 0 2px;"><button onclick="RT_homeShowMore()" style="padding:10px 22px;border-radius:var(--fp-radius-md,13px);border:1px solid var(--fp-border,#DFE8DA);background:var(--fp-surface-glass,rgba(255,255,255,.92));color:var(--fp-primary,#1F8A4D);font-weight:600;font-family:var(--fp-font,Inter,sans-serif);font-size:14px;cursor:pointer;">Weitere laden ('+(saved.length-RT_homeLimit)+')</button></div>';}
 return h;
}

function RT_newRound(){RT_su=RT_defSu();RT_su.course=null;RT_editingExisting=false;RT_editSourceRound=null;RT_go('coursePick');}

function RT_pickCourse(k){RT_suCourse(k);RT_go('setup');}
function RT_imgErr(el){el.style.display='none';}
/* True, wenn der aktuell angemeldete Nutzer von jemand anderem eingeladen wurde (mindestens
   eine eingehende Verbindung ueber player_links, siehe get_my_connections/RT_loadConnections).
   Wird genutzt, um die Platzauswahl fuer eingeladene Mitspieler auf die Plaetze zu beschraenken,
   an denen sie tatsaechlich mitgespielt haben - Marks eigene Preset-Sammlung (Georghausen,
   Waldhof) ist fuer einen eingeladenen Mitspieler sonst irrelevanter Ballast bzw.
   zeigt unnoetig Details aus Marks Umgebung. RT_connections===null bedeutet "noch nicht
   geladen" - in diesem Zwischenzustand bewusst NICHT einschraenken (sicherer Default: lieber
   kurzzeitig die volle Liste zeigen als faelschlich alles auszublenden). */
function RT_isInvitedUser(){
 return !!(RT_connections&&RT_connections.some(function(c){ return c.direction==='incoming'; }));
}

var RT_cpLists=null, RT_cpListsLoading=false;
/* Laedt die gemerkten Karten-Plaetze (course_lists) fuer den vereinheitlichten Platz-Screen.
   Cache in RT_cpLists; wird bei Aenderungen (RT_cmToggle/RT_mcRemove) auf null gesetzt. */
function RT_cpLoadLists(force){
 if(!(sbReady()&&sb&&sbUser)) return;
 if(RT_cpListsLoading) return;
 if(RT_cpLists!==null&&!force) return;
 RT_cpListsLoading=true;
 sb.from('course_lists').select('course_ref,kind,name,lat,lon,holes,created_at').order('created_at',{ascending:false}).then(function(res){
  RT_cpLists=(res&&res.data)||[]; RT_cpListsLoading=false;
  RT_CM._mc=RT_CM._mc||{}; RT_cpLists.forEach(function(x){ RT_CM._mc[x.course_ref]=x; });
  if(RT_state.screen==='coursePick') RT_render();
 });
}
function RT_rCoursePick(){
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="RT_go(\'home\')">&#8249;</button>'+
  '<div><div class="rt-h1" style="font-size:19px;">Platz w\u00e4hlen</div>'+
  '<div class="rt-sub">Wo wird gespielt?</div></div></div>';
 var restrictToPlayed=RT_isInvitedUser();
 RT_cpLoadLists();
 var flagByKey={}, unmatched=[];
 (RT_cpLists||[]).forEach(function(r){
  var _mk=RT_placeMatch({ref:r.course_ref,name:r.name,lat:r.lat,lon:r.lon});
  if(_mk){ (flagByKey[_mk]||(flagByKey[_mk]={}))[r.kind]=1; }
  else { unmatched.push(r); }
 });
 var kindMeta={home:['🏠','Heimatplatz'],saved:['🔖','Gespeichert'],bucket:['📋','Bucket-Liste']};
 var flagChips=function(mk){
  var fb=flagByKey[mk]; if(!fb) return '';
  var out='';
  ['home','saved','bucket'].forEach(function(kk){ if(fb[kk]){ out+='<span style="display:inline-flex;align-items:center;gap:3px;background:#EAF6EE;color:#1F8A4D;font-size:11px;font-weight:800;padding:3px 8px;border-radius:100px;margin:6px 6px 0 0;">'+kindMeta[kk][0]+' '+kindMeta[kk][1]+'</span>'; } });
  return out?('<div style="margin-top:2px;">'+out+'</div>'):'';
 };
 var tilesShown=0;
 RT_platzChips().forEach(function(ch,pIdx,pArr){
  var k=ch[0];
  if(k==='other'){
   if(unmatched.length){
    h+='<div class="rt-ct" style="margin:18px 2px 8px;">Gemerkte Plätze · noch nicht spielbar</div>';
    var _seen={};
    unmatched.forEach(function(r){
     if(_seen[r.course_ref]) return; _seen[r.course_ref]=1;
     var _kinds=unmatched.filter(function(x){return x.course_ref===r.course_ref;}).map(function(x){return x.kind;});
     var _ic=_kinds.map(function(kk){return (kindMeta[kk]||['',''])[0];}).join(' ');
     var _dist=RT_CM.userLL?RT_cmDistTxt({lat:r.lat,lon:r.lon}):null;
     h+='<div class="rtc" style="margin-bottom:8px;display:flex;align-items:center;gap:8px;"><div style="flex:1;min-width:0;"><div style="font-weight:700;color:#143522;">'+(_ic?(_ic+' '):'')+RT_cmEsc(r.name||r.course_ref)+'</div>'+
      '<div class="rt-cs" style="margin:2px 0 0;">Löcher ergänzen'+(_dist?(' · '+_dist):'')+'</div></div>'+
      '<button class="rt-btn" style="flex:none;width:auto;margin:0;padding:9px 14px;" onclick="RT_mcStart(\''+r.course_ref+'\')">Anlegen</button>'+
      '<button class="rt-btn3" style="color:#B03A3A;padding:6px 8px;" onclick="RT_mcRemove(\''+r.course_ref+'\',\''+r.kind+'\')">✕</button></div>';
    });
   }
   h+='<div class="rt-ct" style="margin:18px 2px 8px;">Neu</div>';
   h+='<div class="rtc" style="cursor:pointer;display:flex;align-items:center;gap:12px;" onclick="RT_pickCourse(\''+k+'\')">'+
    '<div style="width:54px;height:54px;border-radius:12px;background:#EAF6EE;display:flex;align-items:center;justify-content:center;font-size:22px;color:#1F8A4D;flex:none;">&#10133;</div>'+
    '<div><div class="rt-ct" style="margin:0;">Anderer Platz</div><div class="rt-cs" style="margin:0;">Platz suchen oder manuell anlegen</div></div>'+
    '</div>';
   h+='<div class="rtc" style="cursor:pointer;display:flex;align-items:center;gap:12px;" onclick="RT_cmOpen()"><div style="width:54px;height:54px;border-radius:12px;background:#EAF1F6;display:flex;align-items:center;justify-content:center;font-size:22px;flex:none;">🗺️</div><div><div class="rt-ct" style="margin:0;">Auf der Karte suchen</div><div class="rt-cs" style="margin:0;">Alle Golfplätze Deutschlands auf der Karte</div></div></div>';
   return;
  }
  var c=RT_COURSES[k];
  if(!c)return;
  if(restrictToPlayed){
   if(!RT_isPlayed(k))return;
  }else if(RT_hiddenPresets().indexOf(k)!==-1&&!RT_isPlayed(k))return;
  if(tilesShown===0) h+='<div class="rt-ct" style="margin:2px 2px 8px;">Spielbare Plätze</div>'; tilesShown++;
  h+='<div class="rtc" style="padding:0;overflow:hidden;cursor:pointer;position:relative;" onclick="RT_pickCourse(\''+k+'\')">'+
   (RT_isPlayed(k)?'':'<button class="rt-btn3" style="position:absolute;top:8px;right:8px;z-index:2;width:28px;height:28px;min-height:28px;box-sizing:border-box;border-radius:50%;background:rgba(20,53,34,.85);color:#fff;font-size:13px;line-height:1;padding:0;border:none;" onclick="event.stopPropagation();RT_removeCoursePick(\''+k+'\')">&#10005;</button>')+(pArr.length>2?'<div style="position:absolute;top:8px;left:8px;z-index:2;display:flex;gap:4px;">'+
  (pIdx>0?'<button class="rt-btn3" style="width:28px;height:28px;min-height:28px;box-sizing:border-box;border-radius:50%;background:rgba(20,53,34,.85);color:#fff;font-size:13px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="event.stopPropagation();RT_platzMove(\''+k+'\',-1)"><span style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:7px solid #fff;"></span></button>':'')+
  (pIdx<pArr.length-2?'<button class="rt-btn3" style="width:28px;height:28px;min-height:28px;box-sizing:border-box;border-radius:50%;background:rgba(20,53,34,.85);color:#fff;font-size:13px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="event.stopPropagation();RT_platzMove(\''+k+'\',1)"><span style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #fff;"></span></button>':'')+
 '</div>':'')+
   '<img src="'+RT_coursePhotoFor(k,c)+'" loading="lazy" style="width:100%;height:150px;object-fit:cover;display:block;background:#EAF1E3;" onerror="RT_imgErr(this)">'+
   '<div style="padding:14px 14px 15px;">'+
   '<div class="rt-ct" style="margin:0;">'+rtEsc(ch[1])+'</div>'+
   (c.address?'<div class="rt-cs" style="margin:6px 0 0;">'+rtEsc(c.address)+'</div>':'')+
   flagChips(k)+
   '</div></div>';
 });
 return h;
}

function RT_rSetup(){
 var cd=RT_courseData();
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="'+(RT_editingExisting?'RT_cancelEditSetup()':'RT_go(\'home\')')+'">&#8249;</button>'+
  '<div><div class="rt-h1" style="font-size:19px;">'+(RT_editingExisting?'Runde bearbeiten':'Neue Runde')+'</div>'+
  '<div class="rt-sub">'+(RT_editingExisting&&RT_editSourceRound?rtEsc(RT_editSourceRound.courseName):(RT_COURSES[RT_su.course]?rtEsc(RT_COURSES[RT_su.course].name):(RT_su.course==='other'?'Anderer Platz':'Wann und wo gespielt wurde')))+'</div></div></div>';
 if(RT_COURSES[RT_su.course]){
  var pc=RT_COURSES[RT_su.course];
  h+='<div class="rtc" style="padding:0;overflow:hidden;">'+
   '<div style="width:100%;height:150px;background:#EAF1E3;position:relative;">'+
    '<img src="'+RT_coursePhotoFor(RT_su.course,pc)+'" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="RT_imgErr(this)">'+
    '<label style="position:absolute;bottom:8px;right:8px;background:rgba(20,53,34,.72);color:#fff;font-size:11px;font-weight:700;padding:6px 12px;border-radius:100px;cursor:pointer;display:flex;align-items:center;">'+
     (RT_state.photoBusy==='photoUrl'?'<span class="rt-spin"></span>Lädt hoch…':(pc.photoUrl?'Platzbild ändern':'Platzbild hochladen'))+
     '<input type="file" accept="image/*" style="display:none;" onchange="RT_photoFile(event,\'photoUrl\')" '+(RT_state.photoBusy?'disabled':'')+'></label>'+
   '</div>'+
   '<div style="padding:14px 14px 15px;">'+
    '<span class="rt-lbl">Platzname</span><input class="rt-inp" id="rt-coursename" value="'+rtEsc(pc.name)+'" onchange="RT_renameCourse(this.value)" style="margin-bottom:10px;">'+
    '<span class="rt-lbl">Adresse</span><input class="rt-inp" id="rt-courseaddr" value="'+rtEsc(pc.address||'')+'" placeholder="Straße, PLZ Ort" onchange="RT_renameAddress(this.value)">'+
   '</div>'+
  '</div>';
  h+=RT_roundPhotosBoxHtml(pc);
 }
 /* Datum & Uhrzeit - eigene Dropdown-Auswahl statt nativer type="date"/"time"-Felder:
    iOS oeffnet bei diesen Eingabetypen ein natives, vom Web-Code nicht beeinflussbares
    Auswahl-Overlay in Systembreite. Mit Select-Dropdowns bleibt die gesamte Bedienung
    innerhalb der Seite und in Seitenbreite. */
 h+='<div class="rtc"><div class="rt-ct">Datum &amp; Uhrzeit</div><div class="rt-cs">Wann wurde die Runde gespielt?</div>'+
  RT_dateTimeSelects()+
  '</div>';
 /* Platz */
 var RT_platzKnown=RT_su.course&&RT_su.course!=='other';
 if(RT_editingExisting||!RT_platzKnown){
  h+='<div class="rtc"><div class="rt-ct">Platz</div><div class="rt-cs">'+(RT_editingExisting?'Preset w\u00e4hlen oder anderen Platz recherchieren':'Eigenen Platz anlegen')+'</div>';
  if(RT_editingExisting){
   h+='<div class="rt-chiprow">';
   RT_platzChips().forEach(function(c){
  var on=(c[0]==='other'?RT_su.course==='other':RT_su.course===c[0]);
  if(c[0]==='other'){
   h+='<button class="rt-chip'+(on?' on':'')+'" onclick="RT_suCourse(\''+c[0]+'\')">'+c[1]+'</button>';
   return;
  }
  var played=RT_isPlayed(c[0]);
  var hidden=RT_hiddenPresets().indexOf(c[0])!==-1;
  if(hidden&&!played) return;
  h+='<button class="rt-chip'+(on?' on':'')+'" style="position:relative;'+(played?'':'padding-right:24px;')+'" onclick="RT_suCourse(\''+c[0]+'\')">'+c[1]+
   (played?'':'<span onclick="event.stopPropagation();RT_hidePreset(\''+c[0]+'\')" style="position:absolute;right:4px;top:50%;transform:translateY(-50%);width:15px;height:15px;border-radius:50%;background:rgba(0,0,0,.18);color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;line-height:1;">&#10005;</span>')+
   '</button>';
 });
   h+='</div>';
  }
  if(RT_su.course==='other'){
  h+='<div style="margin-top:12px;"><span class="rt-lbl">Platzname</span>'+
   '<input class="rt-inp" id="rt-cname" value="'+rtEsc(RT_su.custName)+'" placeholder="z.\u2009B. GC Refrath" oninput="RT_su.custName=this.value">'+
   '<button class="rt-btn" style="margin-top:8px;" '+(RT_state.busy?'disabled':'')+' onclick="RT_research()">'+
   (RT_state.busy?'<span class="rt-spin"></span>Recherchiere\u2026':'Platzdaten aus dem Netz laden')+'</button>';
  if(RT_state.resMsg)h+='<div class="rt-'+(RT_state.resOk?'note':'warn')+'" style="margin-top:8px;margin-bottom:0;">'+RT_state.resMsg+'</div>';
  h+='<div style="margin-top:10px;"><span class="rt-lbl">Oder manuell: Par je Bahn (Komma-getrennt)</span>'+
   '<input class="rt-inp" value="'+rtEsc(RT_su.custPar)+'" placeholder="4,4,5,4,3,4,4,4,5" oninput="RT_su.custPar=this.value">'+
   '<span class="rt-lbl" style="margin-top:8px;">HCP-SI je Bahn (Komma-getrennt)</span>'+
   '<input class="rt-inp" value="'+rtEsc(RT_su.custSi)+'" placeholder="2,7,1,4,8,6,3,9,5" oninput="RT_su.custSi=this.value">'+
   '<button class="rt-btn2" style="margin-top:8px;" onclick="RT_custManual()">Manuellen Platz \u00fcbernehmen</button></div>';
  h+='</div>';
 }
 h+='</div>';
  h+='</div>';
 }
 if(RT_editingExisting){
  /* Platz-Vorschau: Foto (aus der Recherche) + Standortkarte, sofern vorhanden */
 var pvC=RT_COURSES[RT_su.course];
 if(pvC&&(pvC.address||pvC.lat!==undefined)){
  h+='<div class="rtc rt-mapwrap" style="padding:0;">'+
   '<div id="platz-map" style="width:100%;height:170px;background:#EAF1E3;"></div>'+
   '</div>';
 }
  }
if(cd){
  /* Löcher */
  var c=RT_COURSES[RT_su.course];
  h+='<div class="rtc"><div class="rt-ct">L\u00f6cher</div><div class="rt-seg" style="margin-bottom:0;">';
  [['F',c.nines.F.lbl],['B',c.nines.B.lbl],['A','18 Loch']].forEach(function(o){
   h+='<button class="'+(RT_su.holes===o[0]?'on':'')+'" onclick="RT_suHoles(\''+o[0]+'\')">'+o[1]+'</button>';
  });
  h+='</div>';
  h+='<div style="font-size:11px;color:#7B8E80;margin-top:8px;">Par '+cd.parSum+'</div>';
  var parStr=cd.par?cd.par.join(','):'';
  h+='<div style="font-size:10px;color:#8A9C8E;margin-top:8px;margin-bottom:4px;">Par je Bahn &ndash; bei Bedarf anpassen</div>';
  h+='<input class="rt-inp" placeholder="Par Komma-getrennt, z.\u2009B. 4,4,5,4,3,4,4,4,5" value="'+parStr+'" oninput="RT_suPar(this.value)">';
  var siStr=cd.si?cd.si.join(','):'';
  if(!cd.si){
   h+='<div class="rt-warn" style="margin-top:8px;margin-bottom:4px;">HCP-SI f\u00fcr diese Auswahl fehlt. Bitte je Bahn eintragen (1 = schwerste Bahn) &ndash; sonst gleichm\u00e4\u00dfige Verteilung.</div>';
  }else{
   h+='<div style="font-size:10px;color:#8A9C8E;margin-top:8px;margin-bottom:4px;">HCP-SI je Bahn (1 = schwerste Bahn) &ndash; bei Bedarf anpassen</div>';
  }
  h+='<input class="rt-inp" placeholder="SI Komma-getrennt, z.\u2009B. 5,11,7,\u2026" value="'+siStr+'" oninput="RT_suSi(this.value)">';
  h+='</div>';
  /* Abschläge: CR/Slope je Abschlag, wie von der Recherche geliefert. Bei Plätzen mit zwei
     Neunen zusätzlich getrennte Front/Back-Werte, da CR/Slope je Neun real unterschiedlich
     ausfallen (z.B. Georghausen Gelb F 36,2/SL 138 vs. B 35,4/SL 130) und 9-Loch-Runden
     genau diese hälftenspezifischen Werte für die Spielvorgabe brauchen. */
  h+='<div class="rtc"><div class="rt-ct">Abschläge</div><div class="rt-cs">Course Rating und Slope je Abschlag – wie recherchiert, bei Bedarf anpassen. Front, Back und 18 Loch sind unabhängige, amtlich ausgewiesene Werte – bitte alle drei einzeln aus der Course-Rating-Tabelle eintragen.</div>';
  var teeHasTwoNines = c.nines && c.nines.B && c.nines.B.lbl !== '–';
  var teeOrd=RT_teeOrderResolved(c);
  var _teesOpen=!!RT_su.teesOpen;
  h+='<div onclick="RT_teesToggle()" style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:6px 2px 2px;user-select:none;"><span style="color:#1F8A4D;font-size:13px;width:14px;text-align:center;">'+(_teesOpen?'▾':'▸')+'</span><span style="flex:1;font-weight:700;color:#143522;font-size:14px;">'+teeOrd.length+' Abschläge hinterlegt</span><span style="font-size:12px;color:#1F8A4D;font-weight:700;">'+(_teesOpen?'ausblenden':'anzeigen')+'</span></div>';
  if(_teesOpen){
  teeOrd.forEach(function(ti,pos){
   var t=c.tees[ti];
   h+='<div style="margin-bottom:'+(teeHasTwoNines?'16':'20')+'px;">'+
    ((teeOrd.length>1||c.tees.length>1)?'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+(teeOrd.length>1?'<div style="display:flex;gap:6px;">'+(pos>0?'<button class="rt-btn3" style="background:rgba(20,53,34,.85);width:26px;height:26px;min-height:26px;box-sizing:border-box;border-radius:50%;color:#fff;font-size:12px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="RT_teeMove('+pos+',-1)" title="Nach oben"><span style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:7px solid #fff;"></span></button>':'')+(pos<teeOrd.length-1?'<button class="rt-btn3" style="background:rgba(20,53,34,.85);width:26px;height:26px;min-height:26px;box-sizing:border-box;border-radius:50%;color:#fff;font-size:12px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="RT_teeMove('+pos+',1)" title="Nach unten"><span style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #fff;"></span></button>':'')+'</div>':'<div></div>')+(c.tees.length>1?'<button class="rt-btn3" style="background:rgba(176,58,58,.85);width:26px;height:26px;min-height:26px;box-sizing:border-box;border-radius:50%;color:#fff;font-size:12px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="RT_teeRemove('+ti+')" title="Abschlag entfernen">&#10005;</button>':'')+'</div>':'')+
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;align-items:flex-end;">'+
     '<div style="grid-column:span 2;"><span class="rt-lbl">Abschlag</span><input class="rt-inp" value="'+rtEsc(t.name)+'" oninput="RT_teeName('+ti+',this.value)"></div>'+
     '<div><span class="rt-lbl">CR (18L)</span><input class="rt-inp" id="tee-cr-'+ti+'" type="text" inputmode="decimal" value="'+rtDe((t.cr&&t.cr.A!==null&&t.cr.A!==undefined)?t.cr.A:'')+'" oninput="RT_teeNum('+ti+',\'cr\',this.value.replace(\',\',\'.\'))"></div>'+
     '<div><span class="rt-lbl">Slope (18L)</span><input class="rt-inp" id="tee-sl-'+ti+'" type="number" value="'+((t.sl&&t.sl.A!==null&&t.sl.A!==undefined)?t.sl.A:'')+'" oninput="RT_teeNum('+ti+',\'sl\',this.value)"></div>'+
    '</div>';
   if(teeHasTwoNines){
    h+='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:8px;">'+
     '<div><span class="rt-lbl">CR Front</span><input class="rt-inp" id="tee-crF-'+ti+'" type="text" inputmode="decimal" value="'+rtDe((t.cr&&t.cr.F!==null&&t.cr.F!==undefined)?t.cr.F:'')+'" oninput="RT_teeSide('+ti+',\'cr\',\'F\',this.value.replace(\',\',\'.\'))"></div>'+
     '<div><span class="rt-lbl">Slope Front</span><input class="rt-inp" id="tee-slF-'+ti+'" type="number" value="'+((t.sl&&t.sl.F!==null&&t.sl.F!==undefined)?t.sl.F:'')+'" oninput="RT_teeSide('+ti+',\'sl\',\'F\',this.value)"></div>'+
     '<div><span class="rt-lbl">CR Back</span><input class="rt-inp" id="tee-crB-'+ti+'" type="text" inputmode="decimal" value="'+rtDe((t.cr&&t.cr.B!==null&&t.cr.B!==undefined)?t.cr.B:'')+'" oninput="RT_teeSide('+ti+',\'cr\',\'B\',this.value.replace(\',\',\'.\'))"></div>'+
     '<div><span class="rt-lbl">Slope Back</span><input class="rt-inp" id="tee-slB-'+ti+'" type="number" value="'+((t.sl&&t.sl.B!==null&&t.sl.B!==undefined)?t.sl.B:'')+'" oninput="RT_teeSide('+ti+',\'sl\',\'B\',this.value)"></div>'+
    '</div>';
   }
   h+='</div>';
  });
  h+='<button class="rt-btn2" onclick="RT_teeAdd()">+ Abschlag</button>';
  }
  h+='</div>';
  /* Spieler */
  h+='<div class="rtc"><div class="rt-ct">Spieler</div><div class="rt-cs">HI, Abschlag und CR/Slope je Spieler &ndash; Spielvorgabe wird live berechnet</div>';
  RT_su.players.forEach(function(p,i,pArr){
   var cr=RT_pCr(p,cd), sl=RT_pSl(p,cd);
   var neutral=(cr===null||sl===null);
   var ph=RT_ph(parseFloat(p.hi),cr!==null?cr:cd.parSum,sl!==null?sl:113,cd.parSum,cd.cnt);
   h+='<div class="rt-plc" style="position:relative;">'+
    (pArr.length>1?'<div style="display:flex;justify-content:flex-end;gap:6px;margin-bottom:8px;">'+(i>0?'<button class="rt-btn3" style="width:26px;height:26px;min-height:26px;box-sizing:border-box;border-radius:50%;background:rgba(20,53,34,.85);color:#fff;font-size:12px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="RT_playerMove('+i+',-1)" title="Nach oben"><span style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:7px solid #fff;"></span></button>':'')+(i<pArr.length-1?'<button class="rt-btn3" style="width:26px;height:26px;min-height:26px;box-sizing:border-box;border-radius:50%;background:rgba(20,53,34,.85);color:#fff;font-size:12px;line-height:1;padding:0;border:none;display:flex;align-items:center;justify-content:center;" onclick="RT_playerMove('+i+',1)" title="Nach unten"><span style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid #fff;"></span></button>':'')+'</div>':'')+
    '<div class="rt-row" style="margin-bottom:8px;">'+
     '<div style="flex:2;"><span class="rt-lbl">Name</span><input class="rt-inp" value="'+rtEsc(p.name)+'" oninput="RT_su.players['+i+'].name=this.value;RT_updStart()" onchange="RT_persistPlayer('+i+');RT_suCheckDup('+i+')"></div>'+
     '<div><span class="rt-lbl">HI</span><input class="rt-inp" type="number" step="0.1" value="'+p.hi+'" oninput="RT_suNum('+i+',\'hi\',this.value)" onchange="RT_persistPlayer('+i+')"></div>'+
    '</div>'+
    (p._dupHint?'<div style="margin:-2px 0 8px;font-size:12px;color:#8A6D3B;background:#FCF4E3;border:1px solid #E7D8A8;border-radius:8px;padding:6px 10px;">Ähnlich zu <b>'+rtEsc(p._dupHint)+'</b>. <a href="#" onclick="RT_suApplyDup('+i+');return false;" style="font-weight:700;color:#143522;">Übernehmen</a> &middot; <a href="#" onclick="RT_suDismissDup('+i+');return false;" style="color:#8A9C8E;">ignorieren</a></div>':'')+
    '<div style="margin-bottom:8px;"><span class="rt-lbl">Geschlecht</span><div style="display:inline-flex;margin-left:8px;border:1.5px solid #DCE7D4;border-radius:10px;overflow:hidden;vertical-align:middle;">'+
     '<button type="button" onclick="RT_suSex('+i+',\'m\')" style="border:none;padding:6px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;'+((p.sex==='w')?'background:#F1F6EC;color:#5b6b5e;':'background:#143522;color:#fff;')+'">Herren</button>'+
     '<button type="button" onclick="RT_suSex('+i+',\'w\')" style="border:none;padding:6px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;'+((p.sex==='w')?'background:#143522;color:#fff;':'background:#F1F6EC;color:#5b6b5e;')+'">Damen</button>'+
    '</div></div>'+
    '<div style="margin-bottom:8px;"><span class="rt-lbl">Abschlag</span><select class="rt-inp" onchange="RT_suTee('+i+',this.value)">';
   var pSex=(p.sex==='w')?'w':'m';
   var hasBackP = c.nines && c.nines.B && c.nines.B.lbl !== '–';
   var segP = RT_su.holes;
   var anyMatchP = cd.tees.some(function(t){ var d=(t.name||'').toLowerCase().indexOf('damen')>=0; return pSex==='w'?d:!d; });
   RT_teeOrderResolved(c).forEach(function(ti){
    var t=cd.tees[ti];
    var isDamen=(t.name||'').toLowerCase().indexOf('damen')>=0;
    if(anyMatchP){ if(pSex==='w'){ if(!isDamen) return; } else { if(isDamen) return; } }
    if(segP==='A' || !hasBackP){
     h+='<option value="'+ti+'"'+(p.tee===ti&&!p.teeHalf?' selected':'')+'>'+rtEsc(t.name)+'</option>';
    }else if(segP==='F'){
     h+='<option value="'+ti+':F"'+(p.tee===ti&&p.teeHalf==='F'?' selected':'')+'>'+rtEsc(t.name)+' \u2013 Front</option>';
    }else if(segP==='B'){
     h+='<option value="'+ti+':B"'+(p.tee===ti&&p.teeHalf==='B'?' selected':'')+'>'+rtEsc(t.name)+' \u2013 Back</option>';
    }
   });
   h+='<option value="-1"'+(p.tee===-1?' selected':'')+'>Manuell (CR/SL unten)</option></select></div>'+
    '<div class="rt-row" style="margin-bottom:8px;">'+
     '<div><span class="rt-lbl">CR ('+(p.teeHalf==='F'?c.nines.F.lbl:p.teeHalf==='B'?c.nines.B.lbl:cd.lbl)+')</span><input class="rt-inp" type="number" step="0.1" value="'+(cr!==null?cr:'')+'" oninput="RT_suNum('+i+',\'cr\',this.value)"></div>'+
     '<div><span class="rt-lbl">Slope</span><input class="rt-inp" type="number" value="'+(sl!==null?sl:'')+'" oninput="RT_suNum('+i+',\'sl\',this.value)"></div>'+
    '</div>'+
    '<div style="display:flex;justify-content:space-between;align-items:center;">'+
     '<div class="rt-ph" id="rt-ph-'+i+'">Spielvorgabe: '+(ph!==null?ph:'&ndash;')+(neutral&&ph!==null?' <span style="font-weight:500;color:#8A9C8E;">neutral</span>':'')+'</div>'+
     (RT_su.players.length>1?'<button class="rt-btn3" onclick="RT_suRm('+i+')">Entfernen</button>':'')+
    '</div>'+RT_setupInviteHtml(p.name)+'</div>';
  });
  if(RT_su.players.length>1 && RSV2_ON() && sbUser){
   h+=RT_suScorerHtml();
  } else if(RT_su.players.length>1){
   var _oc=!!RT_su.ownCards;
   h+='<div style="margin-top:6px;padding-top:10px;border-top:1px solid #ECF2E6;">'+
    '<span class="rt-lbl">Scorecard-Modus</span>'+
    '<div style="display:inline-flex;margin-left:8px;border:1.5px solid #DCE7D4;border-radius:10px;overflow:hidden;vertical-align:middle;">'+
     '<button type="button" onclick="RT_suOwnCards(false)" style="border:none;padding:6px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;'+(_oc?'background:#F1F6EC;color:#5b6b5e;':'background:#143522;color:#fff;')+'">Gemeinsame Karte</button>'+
     '<button type="button" onclick="RT_suOwnCards(true)" style="border:none;padding:6px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;'+(_oc?'background:#143522;color:#fff;':'background:#F1F6EC;color:#5b6b5e;')+'">Jeder eigene Karte</button>'+
    '</div>'+
    '<div class="rt-cs" style="margin-top:6px;">'+(_oc?'Jeder Spieler führt auf seinem eigenen Gerät seine Scorecard und kann bei Mitspielern nichts ändern.':'Ein Spieler führt die gemeinsame Scoringkarte für alle – Übergabe jederzeit möglich.')+'</div>'+
   '</div>';
  }
  var savedNotInRound=RT_getSavedPlayers().filter(function(sp){
   if(RT_isSelfName(sp.name)) return false;
   return !RT_su.players.some(function(p){ return p.name===sp.name; });
  });
  if(savedNotInRound.length && RT_su.players.length<4){
   h+='<div class="rt-cs" style="margin-bottom:6px;">Kontakte \u2013 antippen f\u00fcr diese Runde dazunehmen</div>';
   h+='<div class="rt-chiprow" style="margin-bottom:8px;">';
   savedNotInRound.forEach(function(sp){
    if(RT_needsSelfConfirm(sp.name)){ h+=RT_selfConfirmHtml(sp.name); return; }
    if(RT_state.ask==='delplayer'+sp.name){
     h+='<span style="display:inline-flex;align-items:center;gap:6px;background:#FBEAEA;border:1.5px solid #E8B4B4;border-radius:100px;padding:6px 6px 6px 12px;font-size:12px;color:#8A3A3A;">'+
      '"'+rtEsc(sp.name)+'" endg\u00fcltig l\u00f6schen?'+
      '<button style="background:#C0392B;color:#fff;border:none;border-radius:100px;padding:4px 10px;font-size:11px;font-weight:700;cursor:pointer;" onclick="RT_deleteSavedPlayer(\''+rtJsEsc(sp.name)+'\')">Ja</button>'+
      '<button style="background:none;border:none;color:#8A3A3A;font-size:11px;font-weight:600;cursor:pointer;" onclick="RT_state.ask=\'\';RT_render();">Nein</button>'+
     '</span>';
    }else{
     h+='<span style="display:inline-flex;align-items:center;">'+
      '<button class="rt-chip" style="border-top-right-radius:0;border-bottom-right-radius:0;border-right:none;" onclick="RT_suAddSaved(\''+rtJsEsc(sp.name)+'\')">+ '+rtEsc(sp.name)+'</button>'+
      '<button style="background:#F1F6EC;border:1.5px solid #DCE7D4;border-left:1px solid #DCE7D4;border-top-right-radius:100px;border-bottom-right-radius:100px;color:#8A9C8E;font-size:11px;font-weight:700;padding:8px 10px 8px 6px;cursor:pointer;font-family:inherit;" onclick="RT_deleteSavedPlayer(\''+rtJsEsc(sp.name)+'\')" title="Kontakt dauerhaft l\u00f6schen">&#10005;</button>'+
     '</span>';
    }
   });
   h+='</div>';
  }
  h+=(RT_su.players.length>=4)?'<div class="rt-cs" style="margin-top:2px;">Maximal 4 Spieler pro Flight.</div></div>':'<div class="rt-row"><button class="rt-btn2" onclick="RT_suAdd()">+ Neuer Spieler</button></div></div>';
  var ready=RT_su.players.every(function(p){
   return p.name&&!isNaN(parseFloat(p.hi));
  });
  var anyNeutral=RT_su.players.some(function(p){return RT_pCr(p,cd)===null||RT_pSl(p,cd)===null;});
  if(anyNeutral)h+='<div class="rt-warn">Kein CR/Slope hinterlegt \u2013 die Spielvorgabe wird neutral berechnet (CR = Par, Slope 113). Werte k\u00f6nnen oben eingetragen werden.</div>';
  h+='<button class="rt-btn" id="rt-start" '+(ready?'':'disabled ')+'onclick="'+(RT_editingExisting?'RT_applyEdit()':'RT_start()')+'">'+(RT_editingExisting?'\u00dcbernehmen':'Runde starten')+'</button>';
  h+='<div id="rt-starthint" style="font-size:11px;color:#8A9C8E;text-align:center;margin-top:6px;margin-bottom:12px;display:'+(ready?'none':'block')+';">Name und HI f\u00fcr alle Spieler ausf\u00fcllen</div>';
  if(ready) h+='<div style="margin-bottom:12px;"></div>';
 }
 return h;
}
/* Ermittelt fuer einen Platz+Segment (F/B/A) den Abschlag mit dem hoechsten Course Rating -
   "schwerste Variante" wird beim Hinzufuegen eines Spielers als Standard vorausgewaehlt statt
   einfach immer der erste Abschlag in der Liste. Faellt auf Index 0 zurueck, wenn keine CR-Werte
   fuer das Segment vorliegen (z.B. bei manuell angelegten Plaetzen ohne vollstaendige Daten). */
function RT_hardestTeeIdx(courseKey, side, sex){
 var cc=courseKey&&RT_COURSES[courseKey];
 if(!cc||!cc.tees||!cc.tees.length) return 0;
 if(sex==='w'||sex==='m'){
  var poolG=[];
  cc.tees.forEach(function(t,i){ var d=t.name.toLowerCase().indexOf('damen')>=0; if(sex==='w'?d:!d) poolG.push(i); });
  if(!poolG.length){ poolG=cc.tees.map(function(t,i){ return i; }); }
  var bgIdx=-1, bgCr=-Infinity;
  poolG.forEach(function(i){ var v=cc.tees[i].cr&&cc.tees[i].cr[side]!=null?parseFloat(cc.tees[i].cr[side]):null; if(v!=null&&!isNaN(v)&&v>bgCr){ bgCr=v; bgIdx=i; } });
  return bgIdx>=0?bgIdx:poolG[0];
 }
 /* CR allein ist kein verlaesslicher "Schwierigkeits"-Vergleich ueber Geschlechter-Abschlaege
    hinweg - ein Damen-Abschlag kann bei kuerzerer Laenge einen HOEHEREN CR haben als der
    Herren-Abschlag (z.B. Georghausen: Rot L/Damen 73,4 vs. Gelb/Herren 71,1), waere hier aber
    ein falscher Standard fuer einen erkennbar maennlichen Spieler. Deshalb: "schwerste Variante"
    zunaechst NUR unter den Nicht-Damen-Abschlaegen suchen (das sind in diesem Code durchgehend
    auch die technisch als Index 0 gefuehrten Standard-/Herren-Abschlaege); nur falls ein Platz
    ausschliesslich Damen-Abschlaege hat, auf die volle Liste zurueckfallen. */
 function hardestIn(list){
  var bestIdx=-1, bestCr=-Infinity;
  list.forEach(function(t,i){
   var v=t.cr&&t.cr[side]!=null&&t.cr[side]!==undefined?parseFloat(t.cr[side]):null;
   if(v!=null&&!isNaN(v)&&v>bestCr){ bestCr=v; bestIdx=i; }
  });
  return bestIdx;
 }
 var nonDamenIdx=[];
 cc.tees.forEach(function(t,i){ if(t.name.toLowerCase().indexOf('damen')<0) nonDamenIdx.push(i); });
 if(nonDamenIdx.length){
  var sub=nonDamenIdx.map(function(i){ return cc.tees[i]; });
  var bi=hardestIn(sub);
  return bi>=0?nonDamenIdx[bi]:nonDamenIdx[0];
 }
 var bi2=hardestIn(cc.tees);
 return bi2>=0?bi2:0;
}
function RT_suCourse(k){
 RT_su.course=k;
 if(k!=='other'){
  var cc=RT_COURSES[k];
  /* Prioritaet 18 Loch vor Front vor Back: sobald ein echter Back-9 vorhanden ist, gilt
     18 Loch als "schwerste"/vollstaendigste Variante und wird vorausgewaehlt. Nur reine
     9-Loch-Plaetze (kein Back-9, Label \u2013) starten mit Front. */
  var hasBack=cc&&cc.nines&&cc.nines.B&&cc.nines.B.lbl!=='\u2013';
  RT_su.holes=hasBack?'A':'F';
 }
 if(k!=='other'){ RT_su.players.forEach(function(p){ var side=(RT_su.holes==='A')?'A':RT_su.holes; p.tee=RT_hardestTeeIdx(k,side,p.sex||'m'); p.teeHalf=(RT_su.holes==='A')?null:RT_su.holes; RT_applySavedTee(p,k); }); }
 if(k==='other'){ RT_su.custName=''; RT_su.custPar=''; RT_su.custSi=''; RT_su.siEdit={}; RT_su.parEdit={}; RT_su._cmRef=null; RT_su._cmLat=null; RT_su._cmLon=null; RT_state.resMsg=''; }
 RT_render();
}
function RT_suHoles(v){
 RT_su.holes=v;
 if(RT_su.course&&RT_su.course!=='other'){
  var side=(v==='A')?'A':v;
  RT_su.players.forEach(function(p){ p.tee=RT_hardestTeeIdx(RT_su.course,side,p.sex||'m'); p.teeHalf=(v==='A')?null:v; });
 }
 RT_render();
}
/* Prueft, ob a eine gueltige Permutation von 1..n ist (jeder Wert von 1 bis n genau einmal) -
   nur dann ist es ein plausibler Stroke-Index. Verhindert die Art von Datenkorruption, die
   z.B. bei Kuerten/Kaanapali passiert ist: 18er-Skala-Werte wurden ungeprueft als 9-Loch-SI
   uebernommen. */
function RT_isValidSiPerm(a,n){
 if(!a||a.length!==n) return false;
 var seen={};
 for(var i=0;i<a.length;i++){
  var v=a[i];
  if(v<1||v>n||seen[v]) return false;
  seen[v]=true;
 }
 return true;
}
function RT_suSi(v){
 var a=v.split(',').map(function(x){return parseInt(x.trim(),10);}).filter(function(x){return !isNaN(x);});
 var cd0=RT_COURSES[RT_su.course];var need=RT_su.holes==='A'?18:9;
 if(a.length!==need) return;
 if(RT_su.holes==='A'){
  if(!RT_isValidSiPerm(a,18)){
   RT_state.resMsg='Ung\u00fcltiger SI: es werden genau die Werte 1 bis 18 je einmal erwartet (18-Loch-Runde).';
   RT_render();
   return;
  }
  RT_su.siEdit['F18']=a.slice(0,9);RT_su.siEdit['B18']=a.slice(9);
 }else{
  if(!RT_isValidSiPerm(a,9)){
   RT_state.resMsg='Ung\u00fcltiger SI: es werden genau die Werte 1 bis 9 je einmal erwartet (9-Loch-Auswahl). Tipp: bei einer 18-Loch-Runde bitte "18 Loch" ausw\u00e4hlen, um die 1-18-Skala einzugeben.';
   RT_render();
   return;
  }
  RT_su.siEdit[RT_su.holes+'9']=a;
 }
 RT_persistSi();
 RT_render();
}
/* Einmal eingetragene SI-Werte dauerhaft merken (bis zur naechsten Aenderung), pro Platz.
   Gilt fuer alle Plaetze (Presets wie eigene/recherchierte); bei eigenen Plaetzen zusaetzlich
   direkt im Platzobjekt speichern, damit es auch per Cloud-Sync auf andere Geraete kommt. */
function RT_persistSi(){
 var key=RT_su.course;
 if(!key||key==='other') return;
 var ov=RT_getSiOverrides();
 ov[key]=ov[key]||{};
 ['F9','B9','F18','B18'].forEach(function(f){
  if(RT_su.siEdit[f]) ov[key][f]=RT_su.siEdit[f].slice();
 });
 rtSet(RT_SIOV_KEY, ov);
 var custom=RT_loadCustomCourses();
 if(custom[key]){
  ['F9','B9','F18','B18'].forEach(function(f){
   if(!RT_su.siEdit[f]) return;
   var nk=f.charAt(0), use18=f.indexOf('18')>=0;
   if(use18) custom[key].nines[nk].si18=RT_su.siEdit[f].slice();
   else custom[key].nines[nk].si=RT_su.siEdit[f].slice();
  });
  RT_COURSES[key]=custom[key];
  rtSet(RT_CUSTOM_KEY, custom);
  sbPushCourse(key, custom[key]);
 }else{
  /* Auch fuer Presets: RT_applySiOverrides() spielt ov[key] bereits in RT_COURSES ein (siehe
     Aufrufer), zusaetzlich jetzt auch in die Cloud sichern - sonst geht eine per Hand
     eingetragene SI-Korrektur an einem Preset beim naechsten Abmelden wieder verloren.
     RT_applySiOverrides() MUSS hier zuerst laufen: RT_COURSES[key] wird bei Presets nicht
     direkt mutiert, sondern die SI-Werte kommen normalerweise erst zur Laufzeit ueber ein
     separates Overlay (siehe siOf() in RT_courseData) - ohne diesen Zwischenschritt wuerden
     die ALTEN, nicht korrigierten Werte in die Cloud gepusht. */
  RT_applySiOverrides();
  sbPushCourse(key, RT_COURSES[key]);
 }
}
function RT_suPar(v){
 var a=v.split(',').map(function(x){return parseInt(x.trim(),10);}).filter(function(x){return !isNaN(x);});
 var need=RT_su.holes==='A'?18:9;
 if(a.length!==need) return;
 if(a.some(function(x){return x<3||x>6;})){
  RT_state.resMsg='Ungültiger Par: nur Werte zwischen 3 und 6 pro Loch erlaubt.';
  RT_render();
  return;
 }
 if(RT_su.holes==='A'){
  RT_su.parEdit['F9']=a.slice(0,9);RT_su.parEdit['B9']=a.slice(9);
 }else{
  RT_su.parEdit[RT_su.holes+'9']=a;
 }
 RT_persistPar();
 RT_render();
}
/* Einmal eingetragene Par-Werte dauerhaft merken (bis zur naechsten Aenderung), pro Platz -
   analog zu RT_persistSi. Gilt fuer alle Plaetze; bei eigenen Plaetzen zusaetzlich direkt
   im Platzobjekt speichern, damit es auch per Cloud-Sync auf andere Geraete kommt. */
function RT_persistPar(){
 var key=RT_su.course;
 if(!key||key==='other') return;
 var ov=RT_getParOverrides();
 ov[key]=ov[key]||{};
 ['F9','B9'].forEach(function(f){
  if(RT_su.parEdit[f]) ov[key][f]=RT_su.parEdit[f].slice();
 });
 rtSet(RT_PAROV_KEY, ov);
 var custom=RT_loadCustomCourses();
 if(custom[key]){
  ['F9','B9'].forEach(function(f){
   if(!RT_su.parEdit[f]) return;
   var nk=f.charAt(0);
   custom[key].nines[nk].par=RT_su.parEdit[f].slice();
  });
  RT_COURSES[key]=custom[key];
  rtSet(RT_CUSTOM_KEY, custom);
  sbPushCourse(key, custom[key]);
 }else{
  RT_applyParOverrides();
  sbPushCourse(key, RT_COURSES[key]);
 }
}
function RT_suNum(i,f,v){RT_su.players[i][f]=v===''?null:v;RT_updPh(i);}
function RT_updPh(i){
 var cd=RT_courseData(); if(!cd)return;
 var p=RT_su.players[i];
 var cr=RT_pCr(p,cd), sl=RT_pSl(p,cd);
 var neutral=(cr===null||sl===null);
 var ph=RT_ph(parseFloat(p.hi),cr!==null?cr:cd.parSum,sl!==null?sl:113,cd.parSum,cd.cnt);
 var el=document.getElementById('rt-ph-'+i);
 if(el)el.innerHTML='Spielvorgabe: '+(ph!==null?ph:'&ndash;')+(neutral&&ph!==null?' <span style="font-weight:500;color:#8A9C8E;">neutral</span>':'');
 RT_updStart();
}
function RT_updStart(){
 var btn=document.getElementById('rt-start'); if(!btn)return;
 var ready=RT_su.players.every(function(p){return p.name&&!isNaN(parseFloat(p.hi));});
 btn.disabled=!ready;
 var hint=document.getElementById('rt-starthint');
 if(hint)hint.style.display=ready?'none':'block';
}
function RT_suTee(i,v){
 var p=RT_su.players[i];
 var parts=v.split(':');
 p.tee=parseInt(parts[0],10);
 p.teeHalf=parts[1]||null;
 p.cr=null;p.sl=null;
 var cc=RT_su.course&&RT_COURSES[RT_su.course];
 if(cc&&cc.tees&&cc.tees[p.tee]){ p.sex=(cc.tees[p.tee].name.toLowerCase().indexOf('damen')>=0)?'w':'m'; }
 RT_persistPlayer(i);
 RT_render();
}
function RT_suSex(i,s){
 var p=RT_su.players[i]; if(!p) return;
 p.sex=(s==='w')?'w':'m';
 if(RT_su.course&&RT_su.course!=='other'){
  var side=(RT_su.holes==='A')?'A':RT_su.holes;
  p.tee=RT_hardestTeeIdx(RT_su.course,side,p.sex);
  p.teeHalf=(RT_su.holes==='A')?null:RT_su.holes;
  p.cr=null;p.sl=null;
 }
 RT_persistPlayer(i);
 RT_render();
}
function RT_suCheckDup(i){
 var p=RT_su.players[i]; if(!p){ RT_render(); return; }
 p._dupHint=null;
 var nm=(p.name||'').trim();
 if(nm.length>=2){
  var inRound={}; RT_su.players.forEach(function(q,j){ if(j!==i && q.name) inRound[RT_normName(q.name)]=1; });
  var cands=RT_getSavedPlayers().map(function(sp){ return sp.name; });
  var exact=false, best=null;
  for(var k=0;k<cands.length;k++){
   var cn=cands[k]; if(!cn) continue;
   if(RT_normName(cn)===RT_normName(nm)){ exact=true; break; }
   if(typeof RT_isSelfName==='function'&&RT_isSelfName(cn)) continue;
   if(inRound[RT_normName(cn)]) continue;
   if(RT_namesLikelySame(nm,cn)){ if(!best||cn.length>best.length) best=cn; }
  }
  if(!exact && best && RT_normName(best)!==RT_normName(nm)) p._dupHint=best;
 }
 RT_render();
}
function RT_suApplyDup(i){
 var p=RT_su.players[i]; if(!p||!p._dupHint) return;
 p.name=p._dupHint; p._dupHint=null;
 var sp=RT_getSavedPlayers().find(function(x){ return x.name===p.name; });
 if(sp){ if(sp.sex==='w'||sp.sex==='m') p.sex=sp.sex; if(sp.hi!==undefined&&sp.hi!==null&&!isNaN(sp.hi)) p.hi=sp.hi; }
 RT_persistPlayer(i);
 RT_render();
}
function RT_suDismissDup(i){ var p=RT_su.players[i]; if(p){ p._dupHint=null; } RT_render(); }
function RT_suAdd(){if(RT_su.players.length>=4){RT_toast('Maximal 4 Spieler pro Flight.');return;}var side=(RT_su.holes==='A')?'A':RT_su.holes;RT_su.players.push({name:'',hi:54,sex:'m',tee:RT_hardestTeeIdx(RT_su.course,side,'m'),teeHalf:(RT_su.holes==='A')?null:RT_su.holes,cr:null,sl:null});RT_render();}
/* Fuegt einen bereits bekannten/gespeicherten Mitspieler (Name, HI, zuletzt genutzter
   Abschlag) direkt zur aktuellen Runde hinzu, statt eine leere Spielerkarte zu erzeugen -
   siehe die Schnellauswahl-Chips ueber "+ Neuer Spieler". */
function RT_suAddSaved(name){
 var sp=RT_getSavedPlayers().find(function(x){ return x.name===name; });
 if(!sp) return;
 if(RT_su.players.length>=4){ RT_toast('Maximal 4 Spieler pro Flight.'); return; }
 var sx=(sp.sex==='w')?'w':'m';
 var side=(RT_su.holes==='A')?'A':RT_su.holes;
 var p={name:sp.name, hi:(sp.hi!==undefined&&sp.hi!==null&&!isNaN(sp.hi))?sp.hi:54, sex:sx, tee:RT_hardestTeeIdx(RT_su.course,side,sx), teeHalf:(RT_su.holes==='A')?null:RT_su.holes, cr:null, sl:null};
 RT_applySavedTee(p, RT_su.course);
 RT_su.players.push(p);
 RT_render();
}
function RT_suRm(i){RT_su.players.splice(i,1);RT_render();}
/* Kontakt dauerhaft aus der gespeicherten Mitspieler-Liste entfernen (nicht nur aus der
   aktuellen Runde) - erfordert zwei Taps zur Bestaetigung, analog zum Runde-loeschen-Muster,
   da dies unwiderruflich ist (Name/HI/zuletzt genutzter Abschlag gehen verloren). */
function RT_deleteSavedPlayer(name){
 if(RT_state.ask!=='delplayer'+name){ RT_state.ask='delplayer'+name; RT_render(); return; }
 var list=(rtGet(RT_PLAYERSAV_KEY)||[]).filter(function(sp){ return !sp||sp.name!==name; });
 RT_setSavedPlayers(list);
 var hid=rtGet(RT_HIDPLAY_KEY)||[]; if(hid.indexOf(name)<0){ hid.push(name); rtSet(RT_HIDPLAY_KEY,hid); }
 try{ if(sb&&sbUser){ var _st=(typeof PL_statusFor==='function')?PL_statusFor(name):null; if(_st&&!_st.linked_user_id){ sb.from('player_links').delete().eq('owner_id',sbUser.id).eq('player_name',name); if(PL_list) PL_list=PL_list.filter(function(x){return x.player_name!==name;}); } } }catch(e){}
 RT_state.ask='';
 RT_render();
}
function RT_custManual(){
 var par=RT_su.custPar.split(',').map(function(x){return parseInt(x.trim(),10);}).filter(function(x){return !isNaN(x);});
 var si=RT_su.custSi.split(',').map(function(x){return parseInt(x.trim(),10);}).filter(function(x){return !isNaN(x);});
 if(par.length!==9&&par.length!==18){RT_state.resOk=false;RT_state.resMsg='Par-Liste braucht 9 oder 18 Werte.';RT_render();return;}
 RT_buildCust(RT_su.custName||'Eigener Platz',par,si.length===par.length?si:null,[],null);
}
/* Platz-IDs neu angelegter Plaetze: einheitlich 'custom-<platzname>'.
   Umlaute und Akzente werden vorher transliteriert - ohne das wird jedes Sonderzeichen zu
   einem Bindestrich, wodurch aus "Kuerten" ein 'custom-k-rten' wird (so entstanden die
   bestehenden, unschoenen Alt-IDs). Ausserdem wird erst gekuerzt und DANN ein eventuell
   entstandener Binde­strich am Ende entfernt, damit keine IDs auf '-' enden.
   Die Funktion bleibt bewusst rein deterministisch, weil sie auch zum Wiederfinden eines
   bereits angelegten Platzes verwendet wird (RT_hydrateCustomCourses). */
function RT_translitId(name){
 var s=(name||'').toLowerCase();
 var map={'\u00e4':'ae','\u00f6':'oe','\u00fc':'ue','\u00df':'ss','\u00e0':'a','\u00e1':'a','\u00e2':'a','\u00e3':'a','\u00e5':'a',
  '\u00e8':'e','\u00e9':'e','\u00ea':'e','\u00eb':'e','\u00ec':'i','\u00ed':'i','\u00ee':'i','\u00ef':'i',
  '\u00f2':'o','\u00f3':'o','\u00f4':'o','\u00f5':'o','\u00f8':'o','\u00f9':'u','\u00fa':'u','\u00fb':'u',
  '\u00f1':'n','\u00e7':'c','\u00fd':'y'};
 return s.replace(/[^a-z0-9]/g,function(ch){ return (map[ch]!==undefined)?map[ch]:ch; });
}
function RT_slugifyId(name){
 var slug=RT_translitId(name).replace(/[^a-z0-9]+/g,'-').replace(/(^-+|-+$)/g,'');
 slug=slug.slice(0,30).replace(/-+$/,'');
 return 'custom-'+(slug||'platz');
}
/* Beim ANLEGEN zusaetzlich gegen Kollisionen absichern: zwei Plaetze mit gleichem Namen
   wuerden sonst dieselbe ID bekommen und einander ueberschreiben. */
function RT_newCourseId(name){
 var base=RT_slugifyId(name);
 var taken=RT_loadCustomCourses()||{};
 if(!taken[base]&&!RT_COURSES[base]) return base;
 for(var i=2;i<100;i++){
  var cand=base+'-'+i;
  if(!taken[cand]&&!RT_COURSES[cand]) return cand;
 }
 return base+'-'+Date.now();
}
function RT_loadCustomCourses(){ return rtGet(RT_CUSTOM_KEY)||{}; }
function RT_hydrateCustomCourses(){
 var all=RT_loadCustomCourses();
 var legacy=rtGet('golflog_platz_v1');
 if(legacy&&legacy.name){
  var legacyId=RT_slugifyId(legacy.name);
  if(!all[legacyId]){ all[legacyId]=legacy; rtSet(RT_CUSTOM_KEY,all); }
  rtDel('golflog_platz_v1');
 }
 Object.keys(all).forEach(function(id){ RT_COURSES[id]=all[id]; });
 RT_applySiOverrides();
 RT_applyParOverrides();
 RT_applyKnownAddresses();
 RT_applyNameOverrides();
 RT_applyAddrOverrides();
 RT_applyTeeOverrides();
 RT_applyTeeOrderOverrides();
 RT_applyPhotoOverrides();
 RT_applyRefOverrides();
 RT_applyCmRefOv();
 RT_fixKuertenSI();
 try{ if(typeof RT_CM!=='undefined'&&(!RT_CM.courses||!RT_CM.courses.length)){ var _cc=rtGet('fp_cm_courses_v2'); if(_cc&&_cc.list&&_cc.list.length) RT_CM.courses=_cc.list; } if(typeof RT_backfillCourseRefs==='function') RT_backfillCourseRefs(); }catch(e){}
}
/* Einmalige, robuste Korrektur der amtlichen 18-Loch-Stroke-Index-Werte fuer GC Kuerten
   (Meisterschaftsplatz) - unabhaengig davon, UNTER WELCHEM KEY der Platz tatsaechlich
   vorliegt. Es kann parallel mehrere Objekte fuer denselben realen Platz geben: das feste
   Preset "kuerten" UND/ODER einen separat recherchierten/umbenannten eigenen Eintrag
   (z.B. "Golf-Club Kuerten", eigene ID) - beide muessten dieselben korrekten Werte haben.
   Erkennung ueber Name ODER Adresse plus Par-Summe 72 (Meisterschaftsplatz, nicht andere
   Kuerten-Varianten), damit nichts Falsches getroffen wird. Korrigiert werden: das aktuell
   im Speicher geladene Objekt, eine ggf. persistierte eigene Kopie (golflog_custom_courses_v1)
   und ein eventuell noch vorhandener, veralteter SI-Override (golflog_si_overrides_v1). */
function RT_fixKuertenSI(){
 /* Korrigiert sowohl den Stroke Index (si18) als auch die PAR-Zuordnung je Bahn fuer JEDEN
    Kuerten-artigen Platzeintrag - manche recherchierten/eigenen Kopien hatten nicht nur ein
    falsches SI, sondern zusaetzlich die Par-Werte den falschen Loechern zugeordnet (Summe pro
    Neun stimmte zufaellig trotzdem, daher fiel es nicht sofort auf). Amtliche Werte laut
    Course-Rating-Tabelle des Clubs. */
 var correctF18=[13,7,17,5,11,1,9,3,15], correctB18=[12,4,18,8,10,16,2,14,6];
 var correctParF=[4,4,3,5,5,4,4,4,3], correctParB=[5,4,3,5,4,4,4,3,4];
 function looksLikeKuerten(c){
  if(!c||!c.nines||!c.nines.F||!c.nines.B) return false;
  var nameMatch=c.name&&/k.rten/i.test(c.name);
  var addrMatch=c.address&&/johannesberg\s*13/i.test(c.address);
  if(!nameMatch&&!addrMatch) return false;
  var parSumF=(c.nines.F.par||[]).reduce(function(s,v){return s+v;},0);
  var parSumB=(c.nines.B.par||[]).reduce(function(s,v){return s+v;},0);
  return (parSumF+parSumB)===72;
 }
 var custom=RT_loadCustomCourses();
 var customChanged=false;
 var ov=RT_getSiOverrides();
 var ovChanged=false;
 Object.keys(RT_COURSES).forEach(function(key){
  var c=RT_COURSES[key];
  if(!looksLikeKuerten(c)) return;
  c.nines.F.si18=correctF18.slice();
  c.nines.B.si18=correctB18.slice();
  c.nines.F.par=correctParF.slice();
  c.nines.B.par=correctParB.slice();
  if(custom[key]&&custom[key].nines){
   custom[key].nines.F.si18=correctF18.slice();
   custom[key].nines.B.si18=correctB18.slice();
   custom[key].nines.F.par=correctParF.slice();
   custom[key].nines.B.par=correctParB.slice();
   customChanged=true;
   sbPushCourse(key,custom[key]);
  }
  if(ov[key]){
   if(ov[key].F18&&JSON.stringify(ov[key].F18)!==JSON.stringify(correctF18)){ delete ov[key].F18; ovChanged=true; }
   if(ov[key].B18&&JSON.stringify(ov[key].B18)!==JSON.stringify(correctB18)){ delete ov[key].B18; ovChanged=true; }
  }
 });
 if(customChanged) rtSet(RT_CUSTOM_KEY, custom);
 if(ovChanged) rtSet(RT_SIOV_KEY, ov);
 RT_fixInvalidNineSi();
}
/* Generische Reparatur fuer JEDEN Platz (nicht nur Kuerten): das 9-Loch-relative SI-Feld
   (nines.F/B.si, Werte 1-9) ist bei manchen recherchierten/eigenen Plaetzen keine gueltige
   Permutation von 1-9 - z.B. wurden bei Kuerten-Back und Kaanapali-Back versehentlich
   18er-Skala-Werte (bis 18) direkt als 9-Loch-SI gespeichert (vermutlich durch manuelle
   SI-Eingabe im falschen Loecher-Modus, siehe RT_suSi-Validierung). Betroffen ist nur der
   9-Loch-Solo-Spielmodus dieser Neun sowie das HI-Differenzial beim Aufteilen einer 18-Loch-
   Runde - der Haupt-Rundenwert (18-Loch, RT_totals) ist NICHT betroffen, da der dort
   verwendete si18 unabhaengig und bereits korrekt ist. Reparatur: aus dem verlaesslichen
   si18 einer Haelfte per Rang-Normierung (RT_si9) ein gueltiges 1-9-SI neu ableiten. */
function RT_fixInvalidNineSi(){
 var custom=RT_loadCustomCourses();
 var customChanged=false;
 Object.keys(RT_COURSES).forEach(function(key){
  var c=RT_COURSES[key];
  if(!c||!c.nines) return;
  ['F','B'].forEach(function(side){
   var n=c.nines[side];
   if(!n) return;
   var valid=n.si&&n.si.length===9&&(function(){
    var seen={}; for(var i=0;i<9;i++){var v=n.si[i]; if(v<1||v>9||seen[v])return false; seen[v]=true;} return true;
   })();
   if(valid) return;
   if(!n.si18||n.si18.length!==9) return;
   var repaired=RT_si9(n.si18.slice());
   n.si=repaired;
   if(custom[key]&&custom[key].nines&&custom[key].nines[side]){
    custom[key].nines[side].si=repaired.slice();
    customChanged=true;
    sbPushCourse(key,custom[key]);
   }
  });
 });
 if(customChanged) rtSet(RT_CUSTOM_KEY, custom);
}
/* Bekannte reale Plaetze bekommen eine Adresse fuer die Kartenvorschau nachgetragen,
   auch wenn sie als eigener/recherchierter Eintrag (nicht als fester Preset) angelegt
   wurden - z.B. der separat recherchierte "Golf-Club Kuerten e.V. Bergerhoehe...". */
var RT_KNOWN_ADDR=[
 {re:/georghausen/i, addr:'Georghausen 8, 51789 Lindlar'},
 {re:/waldhof/i, addr:'Am Waldhof 3, 24629 Kisdorf'},
 {re:/k.rten/i, addr:'Johannesberg 13, 51515 K\u00fcrten'}
];
function RT_applyKnownAddresses(){
 Object.keys(RT_COURSES).forEach(function(key){
  var c=RT_COURSES[key];
  if(!c||!c.name||c.address||c.lat!==undefined) return;
  for(var i=0;i<RT_KNOWN_ADDR.length;i++){
   if(RT_KNOWN_ADDR[i].re.test(c.name)){ c.address=RT_KNOWN_ADDR[i].addr; break; }
  }
 });
}
/* Dauerhaft gespeicherte SI-Overrides (siehe RT_persistSi) direkt in die geladenen
   Platzobjekte einspielen - fuer Presets UND eigene/recherchierte Plaetze. Laeuft beim
   Start und stellt sicher, dass einmal eingetragene SI-Werte nach einem Neuladen der
   Seite sofort wieder da sind, unabhaengig vom siOf()-Laufzeit-Fallback. */
function RT_getNameOverrides(){ return rtGet(RT_NAMEOV_KEY)||{}; }
/* Manuell umbenannte Platznamen (Presets UND eigene Plaetze) dauerhaft ueber die
   geladenen Platzobjekte legen - laeuft beim Start und nach jedem Cloud-Pull, damit
   ein Preset-Name oder ein veralteter Cloud-Stand die Umbenennung nicht ueberschreibt. */
function RT_applyNameOverrides(){
 var ov=RT_getNameOverrides();
 Object.keys(ov).forEach(function(key){ if(RT_COURSES[key]) RT_COURSES[key].name=ov[key]; });
}
function RT_getTeeOverrides(){ return rtGet(RT_TEEOV_KEY)||{}; }
function RT_applyTeeOverrides(){
 var ov=RT_getTeeOverrides();
 Object.keys(ov).forEach(function(key){ if(RT_COURSES[key]) RT_COURSES[key].tees=ov[key]; });
}
function RT_getTeeOrderOverrides(){ return rtGet(RT_TEEORDOV_KEY)||{}; }
function RT_applyTeeOrderOverrides(){
 var ov=RT_getTeeOrderOverrides();
 Object.keys(ov).forEach(function(key){ if(RT_COURSES[key]) RT_COURSES[key].teeOrder=ov[key]; });
}
/* Liefert die Anzeigereihenfolge der Abschlaege eines Platzes als Liste ECHTER Array-Indizes
   (nicht als neu sortiertes tees-Array!). Wichtig: p.tee (Spielerauswahl, auch in bereits
   gespeicherten Runden) speichert einen INDEX in c.tees - wuerde man c.tees selbst umsortieren,
   wuerde das rueckwirkend die Abschlag-Zuordnung aller alten Runden verfaelschen. Deshalb bleibt
   c.tees unveraendert; c.teeOrder ist nur eine reine Anzeige-Reihenfolge dieser Indizes. */
function RT_teeOrderResolved(c){
 var n=c.tees.length;
 var ord=(c.teeOrder||[]).filter(function(i){ return typeof i==='number'&&isFinite(i)&&i>=0&&i<n; });
 var seen={}; ord=ord.filter(function(i){ if(seen[i])return false; seen[i]=true; return true; });
 for(var i=0;i<n;i++){ if(ord.indexOf(i)===-1) ord.push(i); }
 return ord;
}
function RT_teesToggle(){ RT_su.teesOpen=!RT_su.teesOpen; RT_render(); }
function RT_teeToggle(ti){ if(!RT_su.teeOpen)RT_su.teeOpen={}; RT_su.teeOpen[ti]=!RT_su.teeOpen[ti]; RT_render(); }
function RT_teeToggleHdr(ti,t,open){
 var chev=open?'▾':'▸';
 return '<div onclick="RT_teeToggle('+ti+')" style="display:flex;align-items:center;gap:8px;cursor:pointer;padding:8px 2px;user-select:none;">'
  +'<span style="color:#1F8A4D;font-size:13px;width:14px;text-align:center;">'+chev+'</span>'
  +'<span style="flex:1;font-weight:700;color:#143522;font-size:14px;">'+rtEsc(t.name||'Abschlag')+'</span>'
  +'<span style="font-size:11px;color:#8A9C8E;">'+(open?'schließen':'öffnen')+'</span></div>';
}
function RT_teeMove(pos,dir){
 var key=RT_su&&RT_su.course; var c=key&&RT_COURSES[key]; if(!c)return;
 var ord=RT_teeOrderResolved(c);
 var np=pos+dir; if(np<0||np>=ord.length)return;
 var tmp=ord[pos]; ord[pos]=ord[np]; ord[np]=tmp;
 c.teeOrder=ord;
 RT_persistTees();
 RT_render();
}
function RT_persistTees(){
 var key=RT_su&&RT_su.course; if(!key||!RT_COURSES[key])return;
 var custom=RT_loadCustomCourses();
 if(custom[key]){
  custom[key].tees=RT_COURSES[key].tees;
  custom[key].teeOrder=RT_COURSES[key].teeOrder;
  rtSet(RT_CUSTOM_KEY,custom);
  sbPushCourse(key,custom[key]);
 }else{
  var ov=RT_getTeeOverrides();
  ov[key]=RT_COURSES[key].tees;
  rtSet(RT_TEEOV_KEY,ov);
  var tord=RT_getTeeOrderOverrides();
  tord[key]=RT_COURSES[key].teeOrder;
  rtSet(RT_TEEORDOV_KEY,tord);
  /* Auch fuer Presets in die Cloud sichern - RT_COURSES[key].tees ist hier bereits durch den
     Aufrufer (RT_teeName/RT_teeNum/RT_teeSide/...) direkt aktualisiert. */
  sbPushCourse(key,RT_COURSES[key]);
 }
}
function RT_teeName(i,v){
 var key=RT_su&&RT_su.course; var c=key&&RT_COURSES[key]; if(!c)return;
 var t=c.tees[i]; if(!t)return;
 t.name=v;
 RT_persistTees();
}
/* Aktualisiert nach einer CR/Slope-Aenderung an einem Abschlag NUR die davon abhaengigen\n   Anzeigen gezielt per DOM-Update - statt RT_render() (kompletter Neuaufbau von #rt-root),\n   das jedes Eingabefeld als neues Element ersetzt und damit den Fokus killt (Nutzer muesste\n   nach jedem einzelnen Zeichen erneut ins Feld tippen). So bleibt der Fokus im gerade\n   editierten Feld erhalten, waehrend Spielvorgabe-Anzeigen und abgeleitete Werte live\n   mitlaufen. */
function RT_teeSyncDisplay(ti,t){
 var setVal=function(id,val){
  var el=document.getElementById(id);
  if(el && document.activeElement!==el) el.value=(val!==null&&val!==undefined)?val:'';
 };
 setVal('tee-cr-'+ti, rtDe(t.cr&&t.cr.A!==null&&t.cr.A!==undefined?t.cr.A:''));
 setVal('tee-sl-'+ti, t.sl&&t.sl.A!==null&&t.sl.A!==undefined?t.sl.A:'');
 setVal('tee-crF-'+ti, rtDe(t.cr&&t.cr.F!==null&&t.cr.F!==undefined?t.cr.F:''));
 setVal('tee-slF-'+ti, t.sl&&t.sl.F!==null&&t.sl.F!==undefined?t.sl.F:'');
 setVal('tee-crB-'+ti, rtDe(t.cr&&t.cr.B!==null&&t.cr.B!==undefined?t.cr.B:''));
 setVal('tee-slB-'+ti, t.sl&&t.sl.B!==null&&t.sl.B!==undefined?t.sl.B:'');
 if(RT_su&&RT_su.players) RT_su.players.forEach(function(p,i){ RT_updPh(i); });
}
/* WICHTIG: CR/Slope fuer Front, Back und 18-Loch (A) sind in echten Course-Rating-Tabellen\n   DREI unabhaengig zertifizierte Werte - kein einfacher Automatismus wie \"A=F+B\" oder\n   \"F=B=A/2\" trifft in der Praxis zu (z.B. Georghausen Gelb: F 36,2/SL138, B 35,4/SL130,\n   aber 18L amtlich 71,1/SL135 statt rechnerisch 71,6/134). Deshalb wird hier NICHTS mehr\n   automatisch aus einem Feld in ein anderes uebertragen - jedes der drei Felder wird beim\n   Eintippen ausschliesslich fuer sich selbst gespeichert. */
function RT_teeNum(i,f,v){
 var key=RT_su&&RT_su.course; var c=key&&RT_COURSES[key]; if(!c)return;
 var t=c.tees[i]; if(!t)return;
 var val=v===''?null:parseFloat(v);
 var obj=f==='sl'?t.sl:t.cr;
 if(!obj){ obj={F:null,B:null,A:null}; if(f==='sl')t.sl=obj; else t.cr=obj; }
 obj.A=val;
 RT_persistTees();
 RT_teeSyncDisplay(i,t);
}
function RT_teeSide(i,f,side,v){
 var key=RT_su&&RT_su.course; var c=key&&RT_COURSES[key]; if(!c)return;
 var t=c.tees[i]; if(!t)return;
 var val=v===''?null:parseFloat(v);
 var obj=f==='sl'?t.sl:t.cr;
 if(!obj){ obj={F:null,B:null,A:null}; if(f==='sl')t.sl=obj; else t.cr=obj; }
 obj[side]=val;
 RT_persistTees();
 RT_teeSyncDisplay(i,t);
}
function RT_teeAdd(){
 var key=RT_su&&RT_su.course; var c=key&&RT_COURSES[key]; if(!c)return;
 c.tees.push({name:'Neuer Abschlag',cr:{F:null,B:null,A:null},sl:{F:null,B:null,A:null}});
 RT_persistTees();
 RT_render();
}
function RT_teeRemove(i){
 var key=RT_su&&RT_su.course; var c=key&&RT_COURSES[key]; if(!c)return;
 if(c.tees.length<=1)return;
 c.tees.splice(i,1);
 if(c.teeOrder){
  c.teeOrder=c.teeOrder.filter(function(x){return x!==i;}).map(function(x){return x>i?x-1:x;});
 }
 RT_persistTees();
 RT_render();
}
function RT_getPhotoOverrides(){ return rtGet(RT_PHOTOOV_KEY)||{}; }
/* Altbestand speicherte je Platz nur einen String (das Platzfoto). Neu ist ein Objekt
   {photoUrl,bgUrl}; beide Formen werden gelesen, damit vorhandene Fotos erhalten bleiben. */
function RT_applyPhotoOverrides(){
 var ov=RT_getPhotoOverrides();
 Object.keys(ov).forEach(function(key){
  if(!RT_COURSES[key]) return;
  var v=ov[key];
  if(typeof v==='string'){ RT_COURSES[key].photoUrl=v; return; }
  if(v&&v.photoUrl) RT_COURSES[key].photoUrl=v.photoUrl;
  if(v&&v.bgUrl) RT_COURSES[key].bgUrl=v.bgUrl;
  if(v&&v.bgUrls) RT_COURSES[key].bgUrls=v.bgUrls;
 });
}
function RT_getAddrOverrides(){ return rtGet(RT_ADDROV_KEY)||{}; }
function RT_applyAddrOverrides(){
 var ov=RT_getAddrOverrides();
 Object.keys(ov).forEach(function(key){ if(RT_COURSES[key]) RT_COURSES[key].address=ov[key]; });
}
/* field ist 'photoUrl' (Platzfoto in der Platz-Box) oder 'bgUrl' (Hintergrund der
   Rundenkarten). Beide laufen durch denselben Upload-/Speicherpfad. */
/* Hintergrund einer Rundenkarte: eigenes Bild des Platzes, sonst eines aus fuenf
   mitgelieferten Golfmotiven. Die Auswahl wird NICHT bei jedem Rendern neu gewuerfelt,
   sondern deterministisch aus dem Platz abgeleitet - sonst wechselte das Bild bei jedem
   Scrollen. Damit sieht ein Platz ohne eigenes Foto immer gleich aus, verschiedene
   Plaetze aber unterschiedlich. */
var RT_BG_BASE='/round-bg/';
var RT_BG_POOL=['course-1.jpg','course-2.jpg','course-3.jpg','course-4.jpg','course-5.jpg'];
/* Deterministische Auswahl EINES der fuenf Standardbilder aus /round-bg/ anhand des
   Platzschluessels (bzw. Namens). Grundlage fuer die Vorbelegung von Platz- und Rundenbild
   bei Neuinstallationen - beide nutzen denselben Seed und damit dasselbe Standardbild. */
function RT_stdBgFor(key,name){
 var seed=key||name||'x';
 var hsh=0;
 for(var i=0;i<seed.length;i++){ hsh=(hsh*31+seed.charCodeAt(i))>>>0; }
 return RT_BG_BASE+RT_BG_POOL[hsh%RT_BG_POOL.length];
}
/* Effektives Platzbild: selbst hochgeladenes Foto (photoUrl) falls vorhanden, sonst eines der
   fuenf Standardbilder. Presets tragen bewusst KEIN eigenes Default-Foto mehr, damit bei
   Neuinstallationen nie ein mitgeliefertes/persoenliches Bild als Platzbild erscheint. */
function RT_coursePhotoFor(key,co){
 if(co&&co.photoUrl) return co.photoUrl;
 return RT_stdBgFor(key, co&&co.name);
}
function RT_bgForKey(key,fallbackName){
 var co=key?RT_COURSES[key]:null;
 if(co&&co.bgUrls&&co.bgUrls.length) return co.bgUrls[0];
 if(co&&co.bgUrl) return co.bgUrl;
 return RT_stdBgFor(key,fallbackName);
}
function RT_roundBgUrl(rd){
 var key=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(rd.courseName,rd):null;
 return RT_bgForKey(key,rd.courseName);
}
function RT_setPhoto(dataUrl,field){
 field=field||'photoUrl';
 var key=RT_su&&RT_su.course; if(!key||key==='other'||!RT_COURSES[key])return;
 /* Erstinstallation: Wird das Platzbild (photoUrl) gesetzt und ist noch kein eigenes
    Rundenbild (bgUrl) hinterlegt, wird dasselbe Bild automatisch auch als Rundenbild
    uebernommen. Ein spaeter separat hochgeladenes Rundenbild bleibt unangetastet. */
 var flds=[field];
 if(field==='photoUrl' && !RT_COURSES[key].bgUrl) flds.push('bgUrl');
 flds.forEach(function(fld){ RT_COURSES[key][fld]=dataUrl; });
 var custom=RT_loadCustomCourses();
 if(custom[key]){
  flds.forEach(function(fld){ custom[key][fld]=dataUrl; });
  rtSet(RT_CUSTOM_KEY,custom);
  sbPushCourse(key,custom[key]);
 }else{
  /* Auch fuer feste Presets (Georghausen, Waldhof) lokal UND in die Cloud sichern -
     vorher landete das nur in RT_PHOTOOV_KEY (rein lokal), wurde nie ueber sbPushCourse
     synchronisiert und ging beim naechsten Abmelden (RT_clearLocalSyncedData loescht diesen
     Key bewusst aus Datenschutzgruenden) unwiederbringlich verloren. */
  var ov=RT_getPhotoOverrides();
  ov[key]=(typeof ov[key]==='object'&&ov[key])?ov[key]:{};
  if(typeof ov[key]==='string') ov[key]={photoUrl:ov[key]};
  flds.forEach(function(fld){ ov[key][fld]=dataUrl; });
  rtSet(RT_PHOTOOV_KEY,ov);
  sbPushCourse(key,RT_COURSES[key]);
 }
 RT_render();
}
function RT_persistPhotoField(key,field,val){
 if(!key||key==='other'||!RT_COURSES[key])return;
 RT_COURSES[key][field]=val;
 var custom=RT_loadCustomCourses();
 if(custom[key]){ custom[key][field]=val; rtSet(RT_CUSTOM_KEY,custom); sbPushCourse(key,custom[key]); }
 else{
  var ov=RT_getPhotoOverrides();
  ov[key]=(typeof ov[key]==='object'&&ov[key])?ov[key]:(typeof ov[key]==='string'?{photoUrl:ov[key]}:{});
  ov[key][field]=val; rtSet(RT_PHOTOOV_KEY,ov);
  sbPushCourse(key,RT_COURSES[key]);
 }
}
function RT_roundPhotoList(co){ return (co&&co.bgUrls&&co.bgUrls.length)?co.bgUrls.slice():((co&&co.bgUrl)?[co.bgUrl]:[]); }
function RT_addRoundPhoto(url){
 var key=RT_su&&RT_su.course; var co=key&&RT_COURSES[key]; if(!co)return;
 var arr=RT_roundPhotoList(co); arr.push(url);
 RT_persistPhotoField(key,'bgUrls',arr); RT_persistPhotoField(key,'bgUrl',arr[0]); RT_render();
}
function RT_removeRoundPhoto(idx){
 var key=RT_su&&RT_su.course; var co=key&&RT_COURSES[key]; if(!co)return;
 var arr=RT_roundPhotoList(co); if(idx<0||idx>=arr.length)return;
 arr.splice(idx,1);
 RT_persistPhotoField(key,'bgUrls',arr); RT_persistPhotoField(key,'bgUrl',arr.length?arr[0]:null); RT_render();
}
/* Ausgewaehltes Bild zum Hauptbild (Titelbild) machen: an den Anfang der Liste schieben. */
function RT_setMainRoundPhoto(idx){
 var key=RT_su&&RT_su.course; var co=key&&RT_COURSES[key]; if(!co)return;
 var arr=RT_roundPhotoList(co); if(idx<=0||idx>=arr.length)return;
 var sel=arr.splice(idx,1)[0]; arr.unshift(sel);
 RT_persistPhotoField(key,'bgUrls',arr); RT_persistPhotoField(key,'bgUrl',arr[0]); RT_render();
}
function RT_applyUploadedPhoto(url,field){ if(field==='bgAdd') RT_addRoundPhoto(url); else RT_setPhoto(url,field); }
function RT_roundPhotosBoxHtml(pc){
 var list=RT_roundPhotoList(pc);
 var h='<div class="rtc"><div class="rt-ct">Rundenbilder</div><div class="rt-cs">Fotos der Runde \u2013 erscheinen als Hintergrund der Rundenkarte. Du kannst mehrere hinterlegen; tippe \u201eAls Hauptbild\u201c, um das Titelbild zu w\u00e4hlen.</div>';
 h+='<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;">';
 if(!list.length){
  h+='<div style="position:relative;width:104px;height:104px;border-radius:12px;overflow:hidden;border:1px solid #DCE7D4;"><img src="'+RT_bgForKey(RT_su.course,pc.name)+'" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="RT_imgErr(this)"><div style="position:absolute;left:6px;bottom:5px;color:#fff;font-size:10px;font-weight:700;text-shadow:0 1px 3px rgba(0,0,0,.6);">Standardbild</div></div>';
 }else{
  list.forEach(function(u,idx){
   h+='<div style="position:relative;width:104px;height:104px;border-radius:12px;overflow:hidden;border:1px solid #DCE7D4;"><img src="'+u+'" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="RT_imgErr(this)">'+(idx===0?'<div style="position:absolute;left:6px;top:5px;background:rgba(31,138,77,.92);color:#fff;font-size:9px;font-weight:800;padding:2px 6px;border-radius:100px;">Hauptbild</div>':'<button onclick="RT_setMainRoundPhoto('+idx+')" style="position:absolute;left:5px;bottom:5px;background:rgba(20,53,34,.82);color:#fff;font-size:9px;font-weight:700;padding:3px 8px;border-radius:100px;border:none;cursor:pointer;">Als Hauptbild</button>')+'<button onclick="RT_removeRoundPhoto('+idx+')" style="position:absolute;top:4px;right:4px;width:22px;height:22px;border-radius:50%;background:rgba(176,58,58,.92);color:#fff;border:none;font-size:12px;line-height:1;cursor:pointer;">\u2715</button></div>';
  });
 }
 h+='<label style="width:104px;height:104px;border-radius:12px;border:1.5px dashed #B9CDB0;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;color:#1F8A4D;font-size:12px;font-weight:700;gap:2px;">'+(RT_state.photoBusy==='bgAdd'?'<span class="rt-spin"></span>':'<span style="font-size:26px;line-height:1;">+</span>Bild')+'<input type="file" accept="image/*" style="display:none;" onchange="RT_photoFile(event,\'bgAdd\')" '+(RT_state.photoBusy?'disabled':'')+'></label>';
 h+='</div></div>';
 return h;
}
function RT_photoFile(ev,field){
 field=field||'photoUrl';
 var f=ev.target.files&&ev.target.files[0]; if(!f)return;
 var key=RT_su&&RT_su.course; if(!key||key==='other')return;
 var reader=new FileReader();
 reader.onload=function(e){
  var img=new Image();
  img.onload=function(){
   var maxW=1200;
   var scale=Math.min(1,maxW/img.width);
   var w=Math.round(img.width*scale), h=Math.round(img.height*scale);
   var cv=document.createElement('canvas'); cv.width=w; cv.height=h;
   var ctx=cv.getContext('2d'); ctx.drawImage(img,0,0,w,h);
   if(sb&&sbUser&&cv.toBlob){
    cv.toBlob(async function(blob){
     if(!blob){ RT_applyUploadedPhoto(cv.toDataURL('image/jpeg',0.72),field); return; }
     RT_state.photoBusy=field; RT_render();
     try{
      var path=key+'-'+field+'-'+Date.now()+'.jpg';
      var up=await sb.storage.from('course-photos').upload(path,blob,{contentType:'image/jpeg',upsert:true});
      if(up.error)throw up.error;
      var pub=sb.storage.from('course-photos').getPublicUrl(path);
      RT_state.photoBusy=false;
      RT_applyUploadedPhoto(pub.data.publicUrl,field);
     }catch(err){
      /* Cloud-Upload fehlgeschlagen (z.B. offline) - lokal als Fallback speichern, damit das\n         Foto trotzdem sofort sichtbar ist; beim naechsten Login/Sync erneut versuchen. */
      RT_state.photoBusy=false;
      RT_applyUploadedPhoto(cv.toDataURL('image/jpeg',0.72),field);
     }
    },'image/jpeg',0.85);
   }else{
    /* Nicht angemeldet oder kein Blob-Support: Foto nur lokal (Base64) speichern - fuer\n       dauerhaften, geraeteuebergreifenden Speicher bitte zuerst anmelden (Konto & Cloud-Sync). */
    RT_applyUploadedPhoto(cv.toDataURL('image/jpeg',0.72),field);
   }
  };
  img.src=e.target.result;
 };
 reader.readAsDataURL(f);
}
/* Platz umbenennen: aktualisiert den Namen ueberall - im Platzobjekt (Presets per
   dauerhaftem Override, eigene Plaetze direkt im Custom-Store inkl. Cloud-Push) sowie
   rueckwirkend in allen bereits gespeicherten Runden mit dem alten Namen. */
function RT_renameAddress(newAddr){
 var key=RT_su&&RT_su.course;
 if(!key||!RT_COURSES[key])return;
 newAddr=(newAddr||'').trim();
 var oldAddr=RT_COURSES[key].address||'';
 if(newAddr===oldAddr){RT_render();return;}
 RT_COURSES[key].address=newAddr||undefined;
 var custom=RT_loadCustomCourses();
 if(custom[key]){
  custom[key].address=newAddr||undefined;
  rtSet(RT_CUSTOM_KEY,custom);
  sbPushCourse(key,custom[key]);
 }else{
  var ov=RT_getAddrOverrides();
  ov[key]=newAddr;
  rtSet(RT_ADDROV_KEY,ov);
  sbPushCourse(key,RT_COURSES[key]);
 }
 RT_clearMap();
 RT_render();
}
function RT_renameCourse(newName){
 var key=RT_su&&RT_su.course;
 if(!key||!RT_COURSES[key])return;
 newName=(newName||'').trim();
 var oldName=RT_COURSES[key].name;
 if(!newName||newName===oldName){RT_render();return;}
 RT_COURSES[key].name=newName;
 var custom=RT_loadCustomCourses();
 if(custom[key]){
  custom[key].name=newName;
  rtSet(RT_CUSTOM_KEY,custom);
  sbPushCourse(key,custom[key]);
 }else{
  var ov=RT_getNameOverrides();
  ov[key]=newName;
  rtSet(RT_NAMEOV_KEY,ov);
  sbPushCourse(key,RT_COURSES[key]);
 }
 var saved=rtGet(RT_KEY)||[];
 var changed=false;
 saved.forEach(function(rd){ if(rd.courseName===oldName){ rd.courseName=newName; changed=true; sbPushRound(rd); } });
 if(changed) rtSet(RT_KEY,saved);
 if(RT_editSourceRound&&RT_editSourceRound.courseName===oldName) RT_editSourceRound.courseName=newName;
 if(RT_round&&RT_round.courseName===oldName) RT_round.courseName=newName;
 RT_render();
}
function RT_applySiOverrides(){
 var ov=RT_getSiOverrides();
 Object.keys(ov).forEach(function(key){
  var c=RT_COURSES[key]; if(!c||!c.nines) return;
  var o=ov[key];
  if(o.F9&&c.nines.F) c.nines.F.si=o.F9.slice();
  if(o.B9&&c.nines.B) c.nines.B.si=o.B9.slice();
  if(o.F18&&c.nines.F) c.nines.F.si18=o.F18.slice();
  if(o.B18&&c.nines.B) c.nines.B.si18=o.B18.slice();
 });
}
function RT_applyParOverrides(){
 var ov=RT_getParOverrides();
 Object.keys(ov).forEach(function(key){
  var c=RT_COURSES[key]; if(!c||!c.nines) return;
  var o=ov[key];
  if(o.F9&&c.nines.F) c.nines.F.par=o.F9.slice();
  if(o.B9&&c.nines.B) c.nines.B.par=o.B9.slice();
 });
}
function RT_getPlatzOrder(){ return rtGet(RT_PLATZORDER_KEY)||[]; }
function RT_setPlatzOrder(arr){ rtSet(RT_PLATZORDER_KEY, arr); }
function RT_platzChips(){
 var chips=[['georg','Georghausen'],['waldhof','Gut Waldhof']];
 var custom=RT_loadCustomCourses();
 Object.keys(custom).forEach(function(id){
  if(RT_PRESET_KEYS[id])return; /* alter/kollidierender Custom-Eintrag mit Preset-Key: nicht doppelt anzeigen */
  var nm=custom[id].name;
  chips.push([id, nm.length>16?nm.slice(0,16)+'\u2026':nm]);
 });
 /* Anzeigereihenfolge: per RT_platzMove persistierte Reihenfolge hat Vorrang, neue Plaetze werden
    hinten angehaengt. Rein lokale UI-Praeferenz (kein Cloud-Sync), betrifft nur die Darstellung,
    nicht die eigentlichen Platzdaten. */
 var keys=chips.map(function(ch){return ch[0];});
 var savedOrd=RT_getPlatzOrder().filter(function(k){return keys.indexOf(k)!==-1;});
 var seen={}; savedOrd=savedOrd.filter(function(k){ if(seen[k])return false; seen[k]=true; return true; });
 keys.forEach(function(k){ if(savedOrd.indexOf(k)===-1) savedOrd.push(k); });
 var byKey={}; chips.forEach(function(ch){ byKey[ch[0]]=ch; });
 chips=savedOrd.map(function(k){return byKey[k];});
 chips.push(['other','Anderer Platz']);
 return chips;
}
function RT_platzMove(key,dir){
 var chips=RT_platzChips().filter(function(ch){return ch[0]!=='other';});
 var keys=chips.map(function(ch){return ch[0];});
 var pos=keys.indexOf(key); if(pos<0)return;
 var np=pos+dir; if(np<0||np>=keys.length)return;
 var tmp=keys[pos]; keys[pos]=keys[np]; keys[np]=tmp;
 RT_setPlatzOrder(keys);
 RT_render();
}
function RT_buildCust(name,par,si,tees,address){
 var n9=par.length===9;
 var _dupKey=RT_placeMatch({ref:(RT_su&&RT_su._cmRef),name:name,lat:(RT_su&&RT_su._cmLat),lon:(RT_su&&RT_su._cmLon)}, true);
 if(_dupKey&&RT_COURSES[_dupKey]){
  RT_su.course=_dupKey;
  var _hb=RT_COURSES[_dupKey].nines&&RT_COURSES[_dupKey].nines.B&&RT_COURSES[_dupKey].nines.B.lbl!=='\u2013';
  RT_su.holes=_hb?'A':'F';
  if(RT_su._cmRef!=null&&RT_COURSES[_dupKey].cmRef==null){ RT_COURSES[_dupKey].cmRef=RT_su._cmRef; if(RT_COURSES[_dupKey].lat==null&&RT_su._cmLat!=null){ RT_COURSES[_dupKey].lat=RT_su._cmLat; RT_COURSES[_dupKey].lon=RT_su._cmLon; } try{ RT_persistCourseRef(_dupKey); }catch(e){} }
  RT_state.resOk=true; RT_state.resMsg='Dieser Platz ist bereits angelegt \u2013 wir nutzen den vorhandenen Eintrag (kein Duplikat). Zum bewussten Neuanlegen oben umbenennen.';
  RT_render(); return;
 }
 var id=RT_newCourseId(name);
 var courseObj={name:name,
  address:address||undefined,
  nines:{
   F:{lbl:n9?'9 Loch (1\u20139)':'Front 9 (1\u20139)',nums:[1,2,3,4,5,6,7,8,9],par:par.slice(0,9),
      si:si?RT_si9(si.slice(0,9)):null, si18:si&&!n9?si.slice(0,9):null},
   B:n9?{lbl:'\u2013',nums:[10,11,12,13,14,15,16,17,18],par:par.slice(0,9),si:si?RT_si9(si.slice(0,9)):null,si18:null}
       :{lbl:'Back 9 (10\u201318)',nums:[10,11,12,13,14,15,16,17,18],par:par.slice(9),
         si:si?RT_si9(si.slice(9)):null, si18:si?si.slice(9):null}
  },
  tees:tees.length?tees:[{name:'Standard',cr:{F:null,B:null,A:null},sl:{F:null,B:null,A:null}}]};
 if(RT_su&&RT_su._cmRef!=null){ courseObj.cmRef=RT_su._cmRef; if(RT_su._cmLat!=null){ courseObj.lat=RT_su._cmLat; courseObj.lon=RT_su._cmLon; } }
 RT_COURSES[id]=courseObj;
 var allCustom=RT_loadCustomCourses();
 allCustom[id]=courseObj;
 rtSet(RT_CUSTOM_KEY, allCustom);
 sbPushCourse(id, courseObj);
 if(!courseObj.address){
  var _glat=courseObj.lat!=null?courseObj.lat:(RT_su&&RT_su._cmLat), _glon=courseObj.lon!=null?courseObj.lon:(RT_su&&RT_su._cmLon);
  if(_glat!=null&&_glon!=null){ RT_reverseGeocode(_glat,_glon).then(function(addr){
   if(!addr) return; var c=RT_COURSES[id]; if(!c||c.address) return; c.address=addr;
   var cc=RT_loadCustomCourses(); if(cc[id]){ cc[id].address=addr; rtSet(RT_CUSTOM_KEY,cc); try{ sbPushCourse(id,cc[id]); }catch(e){} }
   try{ RT_render(); }catch(e){}
  }); }
 }
 RT_su.course=id; RT_su.holes=n9?'F':'A';
 RT_state.resOk=true; RT_state.resMsg='Platz \u00fcbernommen: '+rtEsc(name)+' ('+par.length+' Loch). Erscheint jetzt dauerhaft in der Platzliste.';
 RT_render();
}
function RT_si9(a){ /* 18er-SI-Segment auf Rang 1-9 innerhalb der 9 normieren */
 var sorted=a.slice().sort(function(x,y){return x-y;});
 return a.map(function(v){return sorted.indexOf(v)+1;});
}

/* ============================================================
   Platz-Verknuepfung: "Meine Plaetze"/Karte <-> spielbare Plaetze.
   Kanonische Identitaet = cmRef (OSM-ID des Karten-Platzes). "Spielbar"
   (Loch-Daten) ist ein Attribut. Match ueber cmRef, sonst Geo<250m + Name.
   ============================================================ */
function RT_placeNorm(x){ return (x||'').toString().toLowerCase().replace(/[^a-z0-9äöüß]/g,''); }
/* Findet zu einem Karten-/Listen-Platz (ref,lat,lon,name) den passenden SPIELBAREN
   Platz-Key aus RT_COURSES. strict=true => nur exakter Name oder Geo-Treffer (kein
   loser Teilstring-Match), fuer die Dublettenpruefung beim manuellen Anlegen. */
function RT_placeMatch(place, strict){
 if(!place) return null;
 var ref=(place.ref!=null?place.ref:place.course_ref);
 var keys=Object.keys(RT_COURSES), i, c;
 if(ref!=null){ for(i=0;i<keys.length;i++){ c=RT_COURSES[keys[i]]; if(c&&c.cmRef!=null&&String(c.cmRef)===String(ref)) return keys[i]; } }
 var pn=RT_placeNorm(place.name), plat=place.lat, plon=place.lon;
 var best=null, bestD=1e12;
 for(i=0;i<keys.length;i++){ c=RT_COURSES[keys[i]]; if(!c) continue;
  var cn=RT_placeNorm(c.name);
  var exact=(pn&&cn&&cn===pn);
  var sub=(pn&&cn&&(cn.indexOf(pn)>=0||pn.indexOf(cn)>=0));
  if(plat!=null&&plon!=null&&c.lat!=null&&c.lon!=null){
   var d=RT_haversineM(plat,plon,c.lat,c.lon);
   if(d<250&&(sub||d<80)){ if(d<bestD){ bestD=d; best=keys[i]; } continue; }
  }
  if(exact) return keys[i];
  if(!strict && sub && pn.length>=6 && best===null){ best=keys[i]; }
 }
 return best;
}
function RT_getCmRefOv(){ return rtGet('golflog_cmref_v1')||{}; }
function RT_applyCmRefOv(){ var ov=RT_getCmRefOv(); Object.keys(ov).forEach(function(k){ var c=RT_COURSES[k]; if(!c) return; var o=ov[k]||{}; if(o.cmRef!=null) c.cmRef=o.cmRef; if(o.lat!=null&&c.lat==null){ c.lat=o.lat; c.lon=o.lon; } }); }
function RT_persistCourseRef(key){
 var c=RT_COURSES[key]; if(!c) return;
 var custom=RT_loadCustomCourses();
 if(custom[key]){ custom[key].cmRef=c.cmRef; if(c.lat!=null){ custom[key].lat=c.lat; custom[key].lon=c.lon; } rtSet(RT_CUSTOM_KEY,custom); try{ sbPushCourse(key,custom[key]); }catch(e){} }
 else{ var ov=RT_getCmRefOv(); ov[key]={cmRef:c.cmRef,lat:c.lat,lon:c.lon}; rtSet('golflog_cmref_v1',ov); }
}
/* Lazy Backfill: sobald die Karten-Plaetze geladen sind, spielbaren Plaetzen ohne cmRef
   den passenden Karten-Platz zuordnen (Name; bei vorhandenen Koordinaten zusaetzlich Geo). */
function RT_backfillCourseRefs(){
 if(!RT_CM.courses||!RT_CM.courses.length) return;
 var changed=false;
 Object.keys(RT_COURSES).forEach(function(key){
  var c=RT_COURSES[key]; if(!c||c.cmRef!=null) return;
  var cn=RT_placeNorm(c.name); if(!cn||cn.length<6) return;
  var found=null;
  for(var i=0;i<RT_CM.courses.length;i++){ var pp=RT_CM.courses[i]; if(!pp||pp.lat==null) continue;
   var pn=RT_placeNorm(pp.name); if(!pn) continue;
   var _hasGeo=(c.lat!=null&&c.lon!=null);
   if(_hasGeo){ if(!(pn===cn||pn.indexOf(cn)>=0||cn.indexOf(pn)>=0)) continue; if(RT_haversineM(c.lat,c.lon,pp.lat,pp.lon)>2000) continue; }
   else { if(pn!==cn) continue; }
   found=pp; break;
  }
  if(found){ c.cmRef=found.ref; if(c.lat==null){ c.lat=found.lat; c.lon=found.lon; } try{ RT_persistCourseRef(key); }catch(e){} changed=true; }
 });
 if(changed&&(RT_state.screen==='myCourses'||RT_state.screen==='coursePick')){ try{ RT_render(); }catch(e){} }
}
function RT_ensureSu(){ if(!RT_su){ RT_su=RT_defSu(); RT_editingExisting=false; RT_editSourceRound=null; } }
/* Karten-/Listen-Platz ohne Loch-Daten -> Anlege-Flow, vorbelegt mit Name + cmRef/Geo,
   damit der entstehende eigene Platz mit dem Karten-Platz verknuepft wird (keine Dublette). */
function RT_cmStartCreate(place){
 RT_ensureSu();
 RT_su.course='other';
 RT_su.custName=(place&&place.name)||'';
 RT_su.custPar=''; RT_su.custSi=''; RT_su.siEdit={}; RT_su.parEdit={};
 RT_su._cmRef=(place&&(place.ref!=null?place.ref:place.course_ref)); RT_su._cmLat=place&&place.lat; RT_su._cmLon=place&&place.lon;
 RT_state.resMsg=''; RT_editingExisting=false;
 RT_go('setup');
 if((RT_su.custName||'').trim()){ setTimeout(function(){ try{ if(RT_su&&RT_su.course==='other'&&!RT_state.busy) RT_research(); }catch(e){} }, 80); }
}
function RT_cmPlay(ref){
 var c=RT_CM.sel; if(!c||c.ref!==ref){ for(var i=0;i<(RT_CM.courses||[]).length;i++){ if(RT_CM.courses[i].ref===ref){ c=RT_CM.courses[i]; break; } } }
 if(!c) return;
 var key=RT_placeMatch(c);
 if(key){ RT_ensureSu(); RT_cmCloseSheet(); RT_pickCourse(key); return; }
 RT_cmStartCreate(c);
}
function RT_mcStart(ref){
 var r=(RT_CM._mc||{})[ref];
 var place=r?{ref:r.course_ref,name:r.name,lat:r.lat,lon:r.lon,holes:r.holes}:{ref:ref};
 var key=RT_placeMatch(place);
 if(key){ RT_ensureSu(); RT_pickCourse(key); return; }
 RT_cmStartCreate(place);
}
async function RT_research(){
 var name=(RT_su.custName||'').trim();
 if(!name){RT_state.resOk=false;RT_state.resMsg='Bitte zuerst einen Platznamen eingeben.';RT_render();return;}
 RT_state.busy=true;RT_state.resMsg='';RT_render();
 try{
  var _tok=(typeof RT_authToken==='function')?await RT_authToken():null;
  var _hdr={'Content-Type':'application/json'};
  if(_tok) _hdr['Authorization']='Bearer '+_tok;
  var resp=await fetch('/api/research',{method:'POST',headers:_hdr,
   body:JSON.stringify({name:name, lat:(RT_su&&RT_su._cmLat!=null)?RT_su._cmLat:undefined, lon:(RT_su&&RT_su._cmLon!=null)?RT_su._cmLon:undefined})});
  var data=await resp.json();
  if(!resp.ok||data.error) throw new Error(data.error||('Server-Fehler ('+resp.status+')'));
  var js=data.result;
  var par=(js.par||[]).map(Number), si=(js.si||[]).map(Number);
  if(par.length!==9&&par.length!==18)throw new Error('Unvollst\u00e4ndige Par-Liste erhalten ('+par.length+' statt 9 oder 18 Werte). Bitte erneut versuchen oder Par unten manuell eintragen.');
  var teeApprox=false;
  var tees=(js.tees||[]).filter(function(t){return t&&t.name&&!isNaN(parseFloat(t.cr))&&!isNaN(parseFloat(t.slope));})
   .map(function(t){
    var cr=parseFloat(t.cr),sl=parseFloat(t.slope);
    var crF=parseFloat(t.cr_front),crB=parseFloat(t.cr_back),slF=parseFloat(t.slope_front),slB=parseFloat(t.slope_back);
    if(par.length===18){
     /* Echte Per-9-CR/Slope nutzen, wenn die Recherche sie geliefert hat; sonst als
        Naeherung die 18-Loch-Werte splitten (CR/2, Slope unveraendert) und Nutzer zum
        Nachtragen der amtlichen Neuner-Werte anstupsen. */
     var hasF=!isNaN(crF)&&!isNaN(slF), hasB=!isNaN(crB)&&!isNaN(slB);
     if(!hasF||!hasB) teeApprox=true;
     return{name:t.name,
      cr:{F:hasF?Math.round(crF*10)/10:Math.round(cr/2*10)/10, B:hasB?Math.round(crB*10)/10:Math.round(cr/2*10)/10, A:cr},
      sl:{F:hasF?slF:sl, B:hasB?slB:sl, A:sl}};
    }
    /* 9-Loch-Platz: gelieferte cr/slope sind die Neuner-Werte. */
    return{name:t.name,cr:{F:cr,B:!isNaN(crB)?crB:cr,A:Math.round(cr*2*10)/10},sl:{F:sl,B:!isNaN(slB)?slB:sl,A:sl}};
   });
  RT_buildCust(js.name||name,par,si.length===par.length?si:null,tees,(js.address&&String(js.address).trim())||null);
  if(teeApprox){RT_state.resMsg+=' Getrennte Front/Back-9 CR/Slope waren nicht sicher auffindbar – Front und Back wurden aus dem 18-Loch-Wert genähert. Bitte die amtlichen Neuner-Werte oben je Abschlag prüfen/eintragen (v.a. für 9-Loch-Runden wichtig).';RT_state.resOk=true;}
  if(js.siRejected){RT_state.resMsg+=' Gefundene SI-Werte waren keine g\u00fcltige Permutation (1\u2013'+par.length+' je genau einmal) und wurden verworfen \u2013 bitte pr\u00fcfen/eintragen.';RT_state.resOk=true;}
  else if(si.length!==par.length){RT_state.resMsg+=' SI wurde nicht sicher gefunden \u2013 bitte pr\u00fcfen/eintragen.';RT_state.resOk=true;}
 }catch(e){
  RT_state.resOk=false;
  RT_state.resMsg='Recherche fehlgeschlagen: '+rtEsc(e.message||'Unbekannter Fehler')+'. Par/SI unten manuell eintragen; der Platz wird dauerhaft gespeichert.';
 }
 RT_state.busy=false;RT_render();
}

function RT_toggleLiveInvite(name){
 if(!RT_su||!RT_su.players)return;
 for(var i=0;i<RT_su.players.length;i++){ if(RT_su.players[i].name===name){ RT_su.players[i].liveInvite=!RT_su.players[i].liveInvite; break; } }
 RT_render();
}
async function RT_inviteLinkedNow(name){
 var st=(typeof PL_statusFor==='function')?PL_statusFor(name):null;
 if(!st||!st.linked_user_id||!RT_round){ return; }
 RT_state.liveInvMsgFor=name; PL_msg='Live-Link wird gesendet \u2026'; RT_render();
 try{
  var inviter=(typeof RT_myDisplayName==='function')?RT_myDisplayName():'Ein Mitspieler';
  var label=(RT_round.courseName||'einer Runde')+(RT_round.date?(' am '+(''+RT_round.date).split('-').reverse().join('.')):'');
  var res=await sb.functions.invoke('send-invite',{body:{toUserId:st.linked_user_id,playerName:name,inviterName:inviter,roundLabel:label,joinCode:st.invite_code||'',roundId:RT_round.id}});
  if(res&&res.error) throw res.error;
  PL_msg=name+' wurde der Live-Link gesendet.';
 }catch(e){ PL_msg='Senden fehlgeschlagen: '+((e&&e.message)||e); }
 RT_render();
}
async function RT_sendRoundInvites(rd){
 if(!sb||!sbUser||!rd||!rd.players) return;
 var inviter=(typeof RT_myDisplayName==='function')?RT_myDisplayName():'Ein Mitspieler';
 var label=(rd.courseName||'einer Runde')+(rd.date?(' am '+(''+rd.date).split('-').reverse().join('.')):'');
 rd.invitesSentTo=rd.invitesSentTo||[];
 for(var i=0;i<rd.players.length;i++){
  var pn=rd.players[i].name;
  if(!pn||(typeof RT_isSelfName==='function'&&RT_isSelfName(pn))) continue;
  if(rd.invitesSentTo.indexOf(pn)>=0) continue;
  var st=(typeof PL_statusFor==='function')?PL_statusFor(pn):null;
  if(!st||!st.linked_user_id) continue;
  if(!rd.players[i].liveInvite) continue;   // nur wenn aktiv zur Live-Runde eingeladen
  try{
   var res=await sb.functions.invoke('send-invite',{body:{toUserId:st.linked_user_id,playerName:pn,inviterName:inviter,roundLabel:label,joinCode:st.invite_code||'',roundId:rd.id}});
   if(!res||!res.error) rd.invitesSentTo.push(pn);
  }catch(e){}
 }
 try{ if(RT_round&&RT_round.id===rd.id) rtSet(RT_ACT,rd); if(sb&&sbUser) sbPushRound(rd); }catch(e){}
}
function RT_tryOpenPendingRound(){
 try{
  if(!AG_pendingRound) return;
  var rounds=rtGet(RT_KEY)||[];
  var hit=rounds.some(function(r){ return r&&r.id===AG_pendingRound; });
  if(hit){
   var id=AG_pendingRound; AG_pendingRound=null;
   try{ localStorage.removeItem(AG_PENDING_ROUND_KEY); }catch(e){}
   try{ var u=new URL(window.location.href); u.searchParams.delete('round'); window.history.replaceState({},'',u.toString()); }catch(e){}
   if(typeof RT_openView==='function') RT_openView(id);
  }
 }catch(e){}
}
function RT_start(){
 var cd=RT_courseData(); if(!cd)return;
 var si=cd.si;
 if(!si){si=[];for(var i=0;i<cd.cnt;i++)si.push(i+1);}
 RT_round={id:'r'+Date.now(), date:RT_su.date||RT_today(), time:RT_su.time||'', courseName:cd.name, lbl:cd.lbl+' \u00b7 Par '+cd.parSum,
  par:cd.par, si:si, nums:cd.nums, cnt:cd.cnt, parSum:cd.parSum, cur:0, done:false, holeViews:{},
  ownerHint:sbUser?sbUser.id:null, autoCount:RT_autoCountOn(), ownCards:!!RT_su.ownCards,
  players:RT_su.players.map(function(p){
   var cr=RT_pCr(p,cd), sl=RT_pSl(p,cd);
   if(cr===null)cr=cd.parSum; if(sl===null)sl=113;
   var teeName=p.tee>=0&&cd.tees[p.tee]?cd.tees[p.tee].name:'Manuell';
   var mk=function(v){var a=[];for(var i=0;i<cd.cnt;i++)a.push(v);return a;};
   var mkEmpty=function(){var a=[];for(var i=0;i<cd.cnt;i++)a.push([]);return a;};
   return{name:p.name, hi:parseFloat(p.hi), tee:teeName, cr:cr, sl:sl, sex:(p.sex==='w')?'w':'m', liveInvite:!!p.liveInvite,
    ph:RT_ph(parseFloat(p.hi),cr,sl,cd.parSum,cd.cnt),
    sc:mk(null), pu:mk(null), fw:mk(null), pe:mk(0), sa:mk(0), cx:mk(0), pins:mkEmpty()};
  })};
 if(RSV2_ON() && RT_round.players.length>1 && sbUser){
  RT_round.v2=true; RT_round.scorerMap={};
  for(var _si=0;_si<RT_round.players.length;_si++){ RT_round.scorerMap[_si]=(RT_su.scorerMap&&RT_su.scorerMap[_si])||((sbUser&&sbUser.id)||null); }
 }
 rtSet(RT_ACT,RT_round);
 if(sb&&sbUser){ try{ sbPushRound(RT_round); }catch(e){} }
 if(RT_round.v2){ try{ RT_v2Create(RT_round); }catch(e){} }
 try{ RT_sendRoundInvites(RT_round); }catch(e){}
 RT_go('play');
}
function RT_discard(){
 if(RT_state.ask!=='discard'){RT_state.ask='discard';RT_render();return;}
 RT_state.ask='';RT_round=null;rtDel(RT_ACT);RT_render();
}

/* Stableford je Loch (nutzt SC_netPar aus dem Bestand) */
function RT_stbfH(p,h,rd){
 rd=rd||RT_round;
 if(!RT_holeInSeg(rd,p,h)) return null;
 if(p.cx[h])return null;
 if(p.sc[h]===null)return null;
 var np=SC_netPar(rd.par[h],p.ph,rd.si[h],rd.cnt);
 return Math.max(0,2-(p.sc[h]-np));
}
function RT_cap(p,h,rd){
 rd=rd||RT_round;
 return SC_netPar(rd.par[h],p.ph,rd.si[h],rd.cnt)+2;
}
/* ===== Teil-Runden: ein Spieler kann nur die Front- ODER Back-9 einer 18-Loch-Runde
   gespielt haben (p.only = 'F' | 'B'; sonst null = alle 18). Nicht gespielte Loecher werden
   NICHT gewertet (kein NDB-Deckel) - Gesamt/Stableford/Handicap zaehlen nur das gespielte
   Segment. Fuer 9-Loch-Runden ohne Belang. */
function RT_holeInSeg(rd,p,hh){
 if(!p||!p.only||!rd||rd.cnt!==18) return true;
 var num=rd.nums[hh];
 return p.only==='F' ? (num<=9) : (num>=10);
}
function RT_totals(p,rd){
 rd=rd||RT_round;
 var br=0,brRaw=0,st=0,pu=0,puC=0,pe=0,sa=0,fwC=0,fwT=0,played=0;
 for(var h=0;h<rd.cnt;h++){
  if(!RT_holeInSeg(rd,p,h)) continue;
  var cap=RT_cap(p,h,rd);
  if(p.sc[h]!==null&&!p.cx[h]){
   /* Gespielt und nicht gestrichen: echte Schlagzahl zaehlt, Deckel nur bei "gewertet" */
   brRaw+=p.sc[h]; played++; br+=Math.min(p.sc[h],cap);
  }else{
   /* Nicht ausgefuellt ODER gestrichen: konservativ mit NDB-Max ansetzen - genau wie
      bei der Handicap-Berechnung, statt die Bahn einfach wegzulassen. */
   brRaw+=cap; br+=cap;
  }
  var s=RT_stbfH(p,h,rd); if(s!==null)st+=s;
  if(p.pu[h]!==null&&p.pu[h]>0){pu+=p.pu[h];puC++;}
  pe+=p.pe[h];sa+=p.sa[h];
  if(p.fw[h]){fwT++;if(p.fw[h]==='C')fwC++;}
 }
 return{br:br,brRaw:brRaw,stbf:st,played:played,avgPu:puC?(pu/puC).toFixed(1):'\u2013',pe:pe,sa:sa,
  fwPct:fwT?Math.round(fwC/fwT*100):null};
}

function RT_rPlay(){
 var rd=RT_round; if(!rd)return RT_rHome();
 var _nineSwap=!!(rd.cnt===18 && (function(){try{return rtGet('fp_nineSwap');}catch(e){return 0;}})());
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="'+(RT_editingExisting?'RT_cancelEdit()':'RT_go(\'home\')')+'">&#8249;</button>'+
  '<div style="flex:1;min-width:0;"><div class="rt-h1" style="font-size:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+rtEsc(rd.courseName)+'</div>'+
  '<div class="rt-sub">'+RT_fmtDT(rd)+' &middot; '+rd.lbl+'</div></div>'+(rd.cnt===18?('<span class="rt-nine-grip" role="button" title="Reihenfolge der Neuner tauschen \u2013 nur Ansicht" onclick="RT_toggleNineSwap()" style="flex:none;align-self:center;"><span class="dots">\u21C5</span>'+(_nineSwap?'10\u201318 oben':'1\u20139 oben')+'</span>'):'')+'</div>';
 if(!rd.v2 && RT_roundIsShared(rd)){
  var _amSc=RT_amScorer(rd);
  var _amOwner=!!(RT_roundOwners[rd.id]&&sbUser&&RT_roundOwners[rd.id]===sbUser.id);
  h+='<div class="rtc" style="padding:10px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px;background:'+(_amSc?'#EAF6EE':'#FBF3E4')+';border:1px solid '+(_amSc?'#BFE3CB':'#EAD9AE')+';">'
   +'<div style="flex:1;min-width:0;font-size:12.5px;color:#143522;"><b>'+(_amSc?'Du f\u00fchrst die Scoringkarte':(rtEsc(RT_scorerName(rd))+' f\u00fchrt die Scoringkarte'))+'</b><div style="font-size:11px;color:#6b7d70;margin-top:1px;">'+(_amSc?'Nur du tr\u00e4gst Schl\u00e4ge ein \u2013 du kannst die Karte \u00fcbergeben.':(_amOwner?'Nur der aktuelle Scorer tr\u00e4gt ein \u2013 als Eigent\u00fcmer kannst du die Karte zur\u00fcckholen.':'Nur der aktuelle Scorer tr\u00e4gt ein \u2013 du kannst die \u00dcbergabe anfordern.'))+'</div></div>'
   +(_amSc?'<button class="rt-btn2" style="width:auto;flex:none;padding:8px 12px;font-size:12px;margin:0;" onclick="RT_handoffMenu()">\u00dcbergeben</button>':(_amOwner?'<button class="rt-btn2" style="width:auto;flex:none;padding:8px 12px;font-size:12px;margin:0;" onclick="RT_reclaimScoring()">Karte zur\u00fcckholen</button>':'<button class="rt-btn2" style="width:auto;flex:none;padding:8px 12px;font-size:12px;margin:0;" onclick="RT_requestScoring()">Anfordern</button>'))
   +'</div>';
  if(_amSc && RT_pendingHandoff && RT_pendingHandoff.uid && (Date.now()-RT_pendingHandoff.ts<3600000)){
   h+='<div class="rtc" style="padding:10px 12px;margin-bottom:10px;background:#FBF3E4;border:1px solid #EAD9AE;display:flex;align-items:center;gap:10px;">'
    +'<div style="flex:1;min-width:0;font-size:12.5px;color:#143522;"><b>'+rtEsc(RT_pendingHandoff.name)+'</b> m\u00f6chte die Scoringkarte \u00fcbernehmen.</div>'
    +'<button class="rt-btn" style="width:auto;flex:none;padding:8px 12px;font-size:12px;margin:0;" onclick="RT_handoffScoring(\''+rtJsEsc(RT_pendingHandoff.uid)+'\')">\u00dcbergeben</button>'
    +'<button class="rt-btn3" style="flex:none;padding:8px 8px;font-size:12px;color:#8A9C8E;" onclick="RT_dismissHandoff()">Ablehnen</button>'
    +'</div>';
  }
 }
 /* Bahnen-Leiste */
 h+='<div class="rt-holes'+(_nineSwap?' swapped':'')+'">';
 for(var i=0;i<rd.cnt;i++){
  var done=rd.players.every(function(p){return p.sc[i]!==null||p.cx[i];});
  h+='<button class="rt-hb'+(i===rd.cur?' cur':done?' done':'')+'" onclick="RT_setHole('+i+')">'+
   '<span class="n">'+rd.nums[i]+'</span><span class="p">Par '+rd.par[i]+'</span></button>';
 }
 h+='</div>';
 var c=rd.cur;
 var rtImg=RT_holeImgFor(rd,c);
 var holeKey=RT_holeMapKey(rd,c);
 var mapMode=RT_mapSat();
 RT_windFetch(rd,c);
 h+='<div class="rtc rtc-hd"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;">'+
  '<div class="rt-ct" style="margin:0;">Bahn '+rd.nums[c]+'</div>'+
  '<div style="font-size:11px;color:#7B8E80;">Par '+rd.par[c]+' &middot; SI '+rd.si[c]+'</div></div>'+
  
  (rtImg?('<div style="margin-bottom:10px;"><button class="rt-btn3" style="padding:6px 10px;background:#F1F6EC;border-radius:8px;" onclick="RT_toggleHoleView()">'+(mapMode?'Birdiekarte anzeigen':'Satellitenkarte anzeigen')+'</button></div>'):'');
 rd.players.forEach(function(p,pi){
  var np=SC_netPar(rd.par[c],p.ph,rd.si[c],rd.cnt);
  var st=RT_stbfH(p,c);
  var tot=RT_totals(p);
  var stCol=st===null?'background:#F1F6EC;color:#9AAB9E;':st>=3?'background:#EAF6EE;color:#187040;':st===2?'background:#EEF4FB;color:#2F6BAE;':st===1?'background:#FBF3E4;color:#8A6A1F;':'background:#FBEAEA;color:#B03A3A;';
  h+='<div class="rt-plc" style="margin-bottom:10px;">'+
   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'+
    '<div class="rt-pts" style="background:#EAF6EE;color:#187040;">'+tot.stbf+'</div>'+
    '<div style="flex:1;text-align:left;padding-left:12px;"><span style="font-size:13.5px;font-weight:800;color:#143522;">'+rtEsc(p.name)+'</span>'+
    '<div style="font-size:10px;color:#8A9C8E;margin-top:1px;">SV '+p.ph+' &middot; Netto-Par '+np+' &middot; NDB-Max '+(np+2)+'</div>'+(p.sc[c]!==null&&!p.cx[c]&&p.sc[c]>np+2?'<div style="font-size:10px;font-weight:700;color:#B7791F;margin-top:2px;">'+p.sc[c]+' notiert &middot; gewertet mit '+(np+2)+'</div>':'')+'</div>'+
    '<div class="rt-pts" style="'+stCol+'">'+(st===null?'\u2013':st)+'</div></div>'+
   '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">'+
    '<div class="rt-step"><button class="rt-sbtn" onclick="RT_sc('+pi+',-1)">&minus;</button>'+
    '<div class="rt-sval">'+(p.sc[c]===null?'\u2013':p.sc[c])+'</div>'+
    '<button class="rt-sbtn" onclick="RT_sc('+pi+',1)">+</button>'+
    '<span style="font-size:10px;color:#8A9C8E;">Schl\u00e4ge</span></div>'+
    '<button class="rt-cxb'+(p.cx[c]?' on':'')+'" onclick="RT_cx('+pi+')">Streichen</button></div>'+
   '<div style="display:flex;justify-content:space-between;flex-wrap:nowrap;align-items:center;margin-bottom:'+(rd.par[c]>=4?'8':'0')+'px;">'+
    '<div class="rt-mini"><span style="font-size:10px;color:#8A9C8E;">Straf</span>'+
     '<button class="rt-mbtn" onclick="RT_mini('+pi+',\'pe\',-1)">&minus;</button><span class="rt-mval">'+p.pe[c]+'</span><button class="rt-mbtn" onclick="RT_mini('+pi+',\'pe\',1)">+</button></div>'+'<div class="rt-mini"><span style="font-size:10px;color:#8A9C8E;">Sand</span>'+
     '<button class="rt-mbtn" onclick="RT_mini('+pi+',\'sa\',-1)">&minus;</button><span class="rt-mval">'+p.sa[c]+'</span><button class="rt-mbtn" onclick="RT_mini('+pi+',\'sa\',1)">+</button></div>'+'<div class="rt-mini"><span style="font-size:10px;color:#8A9C8E;">Putts</span>'+
     '<button class="rt-mbtn" onclick="RT_mini('+pi+',\'pu\',-1)">&minus;</button><span class="rt-mval">'+(p.pu[c]===null?'\u2013':p.pu[c])+'</span><button class="rt-mbtn" onclick="RT_mini('+pi+',\'pu\',1)">+</button></div>'+
   '</div>';
  var _pinN=(p.pins&&p.pins[c])?p.pins[c].length:0;
  var _scCur=(p.sc[c]===null||p.sc[c]===undefined)?0:p.sc[c];
  if(RT_roundAutoCount(rd) && _pinN>_scCur && RT_canEditPlayer(rd,pi)){
   h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:7px 9px;border-radius:9px;background:#FBF3E4;border:1px solid #EAD9AE;">'
    +'<div style="flex:1;min-width:0;font-size:11px;color:#8A6A1F;line-height:1.3;"><b>'+_pinN+' Markierungen</b>, aber nur <b>'+_scCur+' Schl\u00e4ge</b> notiert.</div>'
    +'<button class="rt-btn3" style="flex:none;padding:6px 10px;font-size:11px;background:#F1E4C4;border-radius:8px;font-weight:700;color:#8A6A1F;" onclick="RT_scReconcile('+pi+')">Angleichen</button></div>';
  }
  if(rd.par[c]>=4){
   h+='<div style="display:flex;gap:6px;align-items:center;"><span style="font-size:10px;color:#8A9C8E;flex:none;">Fairway</span>';
   [['L','L','onL'],['C','&#9711;','on'],['R','R','onR'],['S','&#8595;','onS']].forEach(function(o){
    h+='<button class="rt-fwb'+(p.fw[c]===o[0]?' '+o[2]:'')+'" onclick="RT_fwSet('+pi+',\''+o[0]+'\')">'+o[1]+'</button>';
   });
   h+='</div>';
  }
  var pinN=(p.pins&&p.pins[c])?p.pins[c].length:0;
  if(rtImg&&!mapMode){
   var rtScale=RT_HOLE_BIGGER[rd.nums[c]]||1;
   h+='<div class="rt-holemap" onclick="RT_openHoleFull(\''+rtImg.url+'\',\'Bahn '+rd.nums[c]+'\','+pi+')"><img src="'+rtImg.url+'" alt="Lochkarte" loading="lazy" style="width:100%;height:100%;object-fit:contain;display:block;transform:scale('+rtScale+');">'+RT_pinsOverlayHtml(rd,c,0,pi)+'<div class="rt-holemap-tap">&#8599;</div></div>';
  }else{
   h+='<div class="rt-holemap" style="position:relative;"><div class="rt-holemap-inner" id="hole-map-'+pi+'"></div>'+'<div class="rt-holemap-tap" style="z-index:1200;pointer-events:auto;" onclick="event.stopPropagation();RT_openHoleFull(\''+(rtImg?rtImg.url:'')+'\',\'Bahn '+rd.nums[c]+'\','+pi+')">&#8599;</div>'+'</div>';
   h+='<div id="map-ctrl-'+pi+'">'+RT_mapCtrlHtml(pi)+'</div>';
   h+='<div id="pin-hint-'+pi+'" style="font-size:9.5px;color:#8A9C8E;margin-top:4px;">'+((RT_pinMoveMode&&RT_pinMoveMode.pi===pi)?'Tippe die neue Position für die Markierung an.':'Karte antippen = neue Lage<br>Markierung antippen = Menü (verschieben/löschen/Typ ändern)')+'</div>';
  }
  /* Ein Button je Spieler, links unter der Karte: setzt die naechste Markierung an der
     aktuellen GPS-Position und zaehlt zugleich einen Schlag hoch (A, dann 2..n, am Loch
     die Fahne). Ersetzt den frueheren Schlag-Stepper in der Distanzen-Box, der fuer alle
     Spieler gemeinsam galt. */
  h+='<div style="display:flex;margin-top:8px;"><button class="rt-btn2" style="margin:0;padding:9px 16px;font-size:12px;" onclick="RT_markShot('+pi+')">'+RT_markShotLabel(rd,c,pi)+'</button></div>';
  h+='<div style="font-size:10.5px;color:#8A9C8E;margin-top:8px;padding-top:8px;border-top:1px solid #EDF2E9;">Runde: <b style="color:#143522;">'+tot.brRaw+'</b> Schl\u00e4ge'+(tot.br!==tot.brRaw?' <span style="color:#B7791F;font-weight:700;">(gew. '+tot.br+')</span>':'')+' &middot; <b style="color:#187040;">'+tot.stbf+'</b> Stbf ('+tot.played+'/'+rd.cnt+' Bahnen)</div>';
  h+='</div>';
 });
 h+='</div>';
 if(rd.v2) h+=RT_v2BannerHtml(rd);
 /* Distanzen-Karte wie Referenzpunkte/Wegpunkte aufgebaut und standardmaessig zugeklappt:
    waehrend des Spiels braucht man sie nur punktuell. RT_state.distOpen ist beim Start
    undefined, also geschlossen. */
 h+='<div class="rtc" id="gps-card" style="padding:12px 14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;'+(RT_state.distOpen?'margin-bottom:10px;':'')+'">'+
  '<div><div class="rt-ct" style="margin:0;">Distanzen</div>'+
  '<div class="rt-cs" style="margin:0;">Live-Entfernungen zu Abschlag und Loch sowie jede markierte Balllage der Bahn</div></div>'+
  '<button class="rt-btn2" style="margin:0;padding:9px 14px;font-size:12px;white-space:nowrap;flex:none;width:auto;min-width:120px;text-align:center;" onclick="RT_state.distOpen=!RT_state.distOpen;RT_render();">'+(RT_state.distOpen?'Zuklappen':'Anzeigen')+'</button>'+
  '</div>';
 if(RT_state.distOpen){
  h+='<div style="display:flex;justify-content:flex-end;margin-bottom:6px;"><button class="rt-btn3" onclick="RT_toggleDistUnit()">'+(RT_distUnit()==='yd'?'yd':'m')+'</button></div>';
 var rtRef=RT_refFor(rd,c);
 if(!rtRef||!((rtRef.tees&&Object.keys(rtRef.tees).length)||rtRef.pin||rtRef.mid)){
  h+='<div class="rt-cs" style="margin-bottom:8px;">Noch keine Referenzpunkte für diese Bahn gesetzt.</div>';
 }else{
  h+='<div id="dist-list" style="font-size:12px;color:#3C5546;margin-bottom:8px;">'+RT_distListHtml(rd,c)+'</div>';
 }
 h+='<div style="font-size:10px;color:#8A9C8E;margin-bottom:8px;" id="gps-acc">'+RT_gpsAccText()+'</div>';
  h+='<div style="border-top:1px solid #EDF2E9;padding-top:8px;">'+RT_shotDistListHtml(rd,c)+'</div>';
 }
 h+='</div>';
 /* Referenzpunkte-Editor als eigene Karte im Aufbau der Distanzen-Karte (Titel links,
    Aktionsbutton rechts), standardmaessig zugeklappt: er wird nur beim Einrichten einer
    Bahn gebraucht und soll den Scoring-Screen nicht zumuellen. RT_state.refSetupOpen ist
    beim Start undefined, also geschlossen. */
 h+='<div class="rtc" id="ref-card" style="padding:12px 14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;'+(RT_state.refSetupOpen?'margin-bottom:10px;':'')+'">'+
  '<div><div class="rt-ct" style="margin:0;">Referenzpunkte</div>'+
  '<div class="rt-cs" style="margin:0;">Legt Abschläge, Bahnmitte und Loch fest – Grundlage für Distanzen, Kartenausrichtung und Ballpositionen</div></div>'+
  '<button class="rt-btn2" style="margin:0;padding:9px 14px;font-size:12px;white-space:nowrap;flex:none;width:auto;min-width:120px;text-align:center;" onclick="RT_state.refSetupOpen=!RT_state.refSetupOpen;RT_render();">'+(RT_state.refSetupOpen?'Zuklappen':'Bearbeiten')+'</button>'+
  '</div>';
 if(RT_state.refSetupOpen){ h+=RT_refSetupHtml(rd,c); }
 h+='</div>';
 h+='<div class="rtc" style="padding:12px 14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">'+
  '<div><div class="rt-ct" style="margin:0;">Wegpunkte (GPX)</div>'+
  '<div class="rt-cs" style="margin:0;">Ordnet die Wegpunkte zeitlich den Bahnen zu und zeigt sie als Pins auf der Lochkarte</div></div>'+
  '<label class="rt-btn2" style="margin:0;padding:9px 14px;font-size:12px;white-space:nowrap;flex:none;width:auto;min-width:120px;text-align:center;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;">Importieren'+
   '<input id="rt-gpx-input" type="file" accept=".gpx" style="display:none;" onchange="RT_gpxFile(event)"></label>'+
  '</div></div>';

 h+=RT_fmtHtml(rd);
 /* Navigation */
 if(RT_state.saveWarn) h+='<div class="rt-warn">'+rtEsc(RT_state.saveWarn)+'</div>';
 h+='<div class="rt-row" style="margin-bottom:10px;">'+
  '<button class="rt-btn2" '+(c===0?'style="visibility:hidden;"':'')+' onclick="RT_nav(-1)">&#8249; Bahn '+(c>0?rd.nums[c-1]:'')+'</button>'+
  (c<rd.cnt-1?'<button class="rt-btn" onclick="RT_nav(1)">Bahn '+rd.nums[c+1]+' &#8250;</button>'
             :'<button class="rt-btn" onclick="RT_finish()">'+(RT_editingExisting?'Speichern':'Runde beenden')+'</button>')+
  '</div>';
 if(c<rd.cnt-1)h+='<button class="rt-btn2" style="width:100%;margin-bottom:12px;" onclick="RT_finish()">'+(RT_editingExisting?'Speichern':'Runde vorzeitig beenden &amp; speichern')+'</button>';
 else h+='<div style="margin-bottom:12px;"></div>';
 if(rd.cnt===18&&!rd.ownCards&&RT_amScorer(rd)) h+='<button class="rt-btn3" style="width:100%;margin-bottom:12px;color:#6b7d70;font-size:12px;border:1px solid #E6ECDF;" onclick="RT_askConvertNine()">Auf 9 Löcher umstellen (nur gespielte werten)</button>';
 if(rd.cnt===9&&!rd.ownCards&&RT_amScorer(rd)) h+='<button class="rt-btn3" style="width:100%;margin-bottom:12px;color:#6b7d70;font-size:12px;border:1px solid #E6ECDF;" onclick="RT_askExpandEighteen()">Auf 18 Löcher erweitern (zweite Neun ergänzen)</button>';
 return h;
}
/* Prueft, ob fuer eine Bahn bei ALLEN Spielern ein Ergebnis erfasst ist (Schlagzahl gesetzt\n   oder Bahn gestrichen) - Grundlage fuer die automatische Cloud-Speicherung beim Bahnwechsel. */
function RT_holeComplete(rd,idx){
 return rd.players.every(function(p){ return p.sc[idx]!==null || p.cx[idx]; });
}
/* Nach vollstaendiger Eingabe einer Bahn UND Wechsel zur naechsten Bahn automatisch in der\n   Cloud sichern (zusaetzlich zur ohnehin sofortigen lokalen Speicherung ueber rtSet). So geht\n   der Fortschritt auch bei Abbruch/Wechsel des Geraets mitten in der Runde nicht verloren. */
function RT_autosaveHole(rd,prevIdx){
 if(rd.v2) return; /* v2 speichert je Karte ueber RT_v2PushMine */
 if(rd.cur===prevIdx) return;
 if(!RT_holeComplete(rd,prevIdx)) return;
 if(!sb||!sbUser) return;
 /* Geteilte Runde: nur der aktuelle Scorer schreibt, und zwar in die kanonische Eigentuemer-
    Zeile. Zuschauer schreiben nie (keine Dubletten). Solo-Runde: normaler Push. */
 if(RT_roundIsShared(rd)&&!rd.ownCards){ if(!RT_amScorer(rd)) return; sbPushCanonical(rd); return; }
 sbPushRound(rd);
}
/* Nur-optischer Tausch der beiden Neuner-Reihen (1-9 / 10-18) im Loch-Streifen.
   Aendert ausschliesslich die Anzeige-Reihenfolge per CSS-order; Loch-Indizes, Wertung
   und Daten bleiben voellig unberuehrt. Einstellung wird lokal gemerkt. */
function RT_toggleNineSwap(){
 try{ rtSet('fp_nineSwap', rtGet('fp_nineSwap')?0:1); }catch(e){}
 try{ RT_render(); }catch(e){}
}
function RT_setHole(i){
 var rd=RT_round; if(!rd)return;
 var prev=rd.cur;
 rd.cur=i;
 rtSet(RT_ACT,rd);
 RT_autosaveHole(rd,prev);
 RT_render();
}
function RT_nav(d){
 var rd=RT_round; if(!rd)return;
 var prev=rd.cur;
 rd.cur=Math.max(0,Math.min(rd.cnt-1,rd.cur+d));
 rtSet(RT_ACT,rd);
 RT_autosaveHole(rd,prev);
 RT_render();
 var _ap=document.getElementById('app');if(_ap)_ap.scrollTop=0;
}
/* Einstellung: Zaehlen von Putts/Strafschlaegen/Sandschlaegen automatisch als
   Schlag mitzaehlen. Default an (true), abschaltbar in den Kontoeinstellungen. */
function RT_autoCountOn(){
 /* Fest verdrahtet auf AN: Putt/Straf/Sand erhoehen immer die Schlagzahl.
    (Frueherer globaler Schalter entfernt - vermeidet Balllage/Schlag-Inkonsistenzen.) */
 return true;
}
function RT_toggleAutoCount(){
 rtSet(RT_AUTOCOUNT_KEY,!RT_autoCountOn());
 RT_render();
}
/* Die Einstellung wird beim Anlegen/erneuten Speichern EINER Runde als rd.autoCount fest
   eingefroren (siehe RT_start/RT_applyEdit) - eine spaetere Aenderung des globalen Schalters
   (Kontoeinstellungen) wirkt sich dadurch NIE auf bereits gezaehlte Schlaege bereits existie-
   render Runden aus, auch nicht auf eine gerade laufende Runde bei einer Aenderung mitten im
   Spiel - RT_mini() liest ausschliesslich diesen eingefrorenen Wert, nie den globalen Live-
   Schalter direkt. Alte Runden ohne dieses Feld (vor diesem Fix angelegt) fallen auf true
   zurueck - das war der bisherige Standardwert von RT_autoCountOn() bei unveraendertem Schalter. */
function RT_roundAutoCount(rd){
 return (rd&&rd.autoCount!==undefined&&rd.autoCount!==null)?rd.autoCount:true;
}
/* Sobald die erste Eingabe in einer neuen Runde erfolgt, gilt sie als gespeichert:
   Eintrag in der lokalen Liste (RT_KEY) UND einmaliger Cloud-Push. Bei jeder weiteren
   Eingabe wird der lokale Eintrag aktuell gehalten (kein erneuter sofortiger Cloud-Push
   pro Klick, das uebernimmt weiterhin RT_autosaveHole beim Lochwechsel). */
function RT_syncActiveToSaved(){
 var rd=RT_round; if(!rd) return;
 var saved=rtGet(RT_KEY)||[];
 var idx=-1;
 for(var i=0;i<saved.length;i++){ if(saved[i].id===rd.id){ idx=i; break; } }
 var isNew=idx<0;
 if(idx>=0) saved[idx]=rd; else saved.push(rd);
 rtSet(RT_KEY,saved);
 if(isNew&&sb&&sbUser) sbPushRound(rd);
 if(rd.v2){ try{ RT_v2PushMine(rd); }catch(e){} return; }
 RT_rtBroadcastState();
 RT_liveDbPush();
}
/* Der Scorer schreibt den laufenden Stand gedrosselt (<= alle ~2,5s) zusaetzlich in die DB.
   So bekommt der Mitspieler den Stand auch dann zeitnah, wenn ein Broadcast-Paket verloren
   ging - sein Poll (RT_livePollTick) liest die frische Zeile. Nur der Owner der aktiven,
   geteilten Runde schreibt; fremde Konten fassen die Owner-Zeile nicht an. */
var RT_liveDbTs=0, RT_liveDbPending=false;
function RT_liveDbPush(){
 var rd=RT_round; if(!rd||rd.done||!sb||!sbUser) return;
 if(rd.v2) return;
 if(rd.ownCards) return;
 if(!RT_roundIsShared(rd)||!RT_amScorer(rd)) return;
 var now=Date.now();
 if(now-RT_liveDbTs>2500){ RT_liveDbTs=now; try{ sbPushCanonical(rd); }catch(e){} }
 else if(!RT_liveDbPending){ RT_liveDbPending=true; setTimeout(function(){ RT_liveDbPending=false; RT_liveDbTs=Date.now(); try{ if(RT_round&&!RT_round.done&&RT_roundIsShared(RT_round)&&RT_amScorer(RT_round)) sbPushCanonical(RT_round); }catch(e){} }, 2600); }
}
/* Mitspieler-seitiger Poll-Fallback: solange eine FREMDE, aktive Runde auf dem Spielscreen
   offen ist, alle 5s die Owner-Zeile lesen und bei Aenderung anwenden. Zusammen mit dem
   Live-Broadcast (sofort) sorgt das dafuer, dass Scorer-Eingaben ohne Neuladen erscheinen. */
var RT_livePoll=null, RT_livePollId=null;
function RT_livePollSync(){
 var rd=RT_round;
 var active=!!(rd&&!rd.v2&&!rd.done&&sb&&sbUser&&RT_state.screen==='play'&&RT_roundIsShared(rd)&&!rd.ownCards&&!RT_amScorer(rd));
 if(active){
  if(RT_livePollId!==rd.id){
   if(RT_livePoll){ clearInterval(RT_livePoll); RT_livePoll=null; }
   RT_livePollId=rd.id;
   RT_livePoll=setInterval(RT_livePollTick,5000);
  }
 }else{
  if(RT_livePoll){ clearInterval(RT_livePoll); RT_livePoll=null; }
  RT_livePollId=null;
 }
}
function RT_livePollTick(){
 var rd=RT_round; if(!rd||rd.done||!sb||!sbUser||RT_state.screen!=='play'){ return; }
 if(rd.v2) return;
 if(rd.ownCards) return;
 if(RT_amScorer(rd)) return;
 sb.from('rounds').select('data,user_id').eq('id',rd.id).then(function(res){
  if(!res||res.error||!res.data||!res.data.length) return;
  var own=RT_roundOwners[rd.id], row=null;
  for(var i=0;i<res.data.length;i++){ if(res.data[i].user_id===own){ row=res.data[i]; break; } }
  if(!row) row=res.data[0];
  var nd=row.data; if(!nd||nd.id!==(RT_round&&RT_round.id)) return;
  if(RT_amScorer(RT_round)) return;
  var changed=true; try{ changed=(JSON.stringify(nd)!==JSON.stringify(RT_round)); }catch(e){}
  if(changed) RT_rtApplyState(nd);
 });
}
function RT_addTrackedPoint(type,shotNum,pi){
 var rd=RT_round; if(!rd) return;
 if(!RT_curPos) return;
 var c=rd.cur;
 var entry={lat:RT_curPos.lat,lng:RT_curPos.lng,type:type};
 if(shotNum!==undefined&&shotNum!==null) entry.shot=shotNum;
 RT_pinsOf(rd,pi||0,c).push(entry);
}
function RT_removeLastTrackedPoint(type,pi){
 var rd=RT_round; if(!rd) return;
 var c=rd.cur;
 var pins=RT_pinsOf(rd,pi||0,c);
 if(!pins) return;
 for(var i=pins.length-1;i>=0;i--){
  var t=pins[i].type||'shot';
  if(t===type){ pins.splice(i,1); break; }
 }
}
function RT_scAdjust(pi,d){ var p=RT_round.players[pi],c=RT_round.cur; if(p.sc[c]===null){ if(d>0)p.sc[c]=1; } else { var nv=p.sc[c]+d; p.sc[c]=nv<1?null:nv; } }
/* N1-Vereinheitlichung: Karten-Pins und Schlagzaehler zusammenfuehren. Im Auto-Count-Modus
   erhoeht jede Markierung (Balllage/Straf/Sand/Putt/eingelocht) den Schlagzaehler mit - dort
   MUSS also gelten: Anzahl Markierungen <= notierte Schlaege. Ist das verletzt (z.B. Altdaten
   aus der Zeit vor der Kopplung), gleicht dieser Helfer den Schlagzaehler an die Markierungen
   an. Im manuellen Modus (autoCount aus) sind Markierungen bewusst rein positionsbezogen -
   dort wird nicht angeglichen. */
function RT_scReconcile(pi){
 if(!RT_canEditPlayer(RT_round,pi)){RT_editBlock(RT_round);return;}
 var p=RT_round.players[pi],c=RT_round.cur;
 var n=(p.pins&&p.pins[c])?p.pins[c].length:0;
 var cur=(p.sc[c]===null||p.sc[c]===undefined)?0:p.sc[c];
 if(n>cur){ p.sc[c]=n; rtSet(RT_ACT,RT_round); RT_syncActiveToSaved(); RT_render(); }
}
function RT_sc(pi,d){
 if(!RT_canEditPlayer(RT_round,pi)){RT_editBlock(RT_round);return;}
 var p=RT_round.players[pi],c=RT_round.cur;
 if(p.sc[c]===null){p.sc[c]=d>0?1:Math.max(1,RT_round.par[c]-1);}
 else{var nv=p.sc[c]+d;p.sc[c]=nv<1?null:nv;}
 /* Minus entfernt zusaetzlich die zuletzt gesetzte Balllage (letzter Ball-/eingelocht-Marker);
    Straf/Sand/Putt-Marker bleiben - die werden ueber ihre eigenen Stepper verwaltet. */
 if(d<0 && p.pins && p.pins[c] && p.pins[c].length){
  var pins=p.pins[c];
  for(var i=pins.length-1;i>=0;i--){ var k=RT_pinKind(pins[i]); if(k==='ball'||k==='holed'){ pins.splice(i,1); break; } }
 }
 rtSet(RT_ACT,RT_round);RT_syncActiveToSaved();RT_render();
}
function RT_mini(pi,f,d){
 if(!RT_canEditPlayer(RT_round,pi)){RT_editBlock(RT_round);return;}
 var p=RT_round.players[pi],c=RT_round.cur;
 if(f==='pu'){p.pu[c]=p.pu[c]===null?(d>0?1:0):Math.max(0,p.pu[c]+d);}
 else{p[f][c]=Math.max(0,p[f][c]+d);}
 if((f==='pu'||f==='pe'||f==='sa')&&RT_roundAutoCount(RT_round)){
 if(p.sc[c]===null){ if(d>0)p.sc[c]=1; }
 else{ var nv=p.sc[c]+d; p.sc[c]=nv<1?null:nv; }
 }
 var trackType=(f==='pe')?'straf':(f==='sa')?'sand':(f==='pu')?'putt':null;
 if(trackType){
  if(d>0){ RT_addTrackedPoint(trackType,null,pi); }
  else{ RT_removeLastTrackedPoint(trackType,pi); }
 }
 rtSet(RT_ACT,RT_round);RT_syncActiveToSaved();RT_render();
}
function RT_fwSet(pi,v){
 if(!RT_canEditPlayer(RT_round,pi)){RT_editBlock(RT_round);return;}
 var p=RT_round.players[pi],c=RT_round.cur;
 p.fw[c]=p.fw[c]===v?null:v;
 rtSet(RT_ACT,RT_round);RT_syncActiveToSaved();RT_render();
}
function RT_cx(pi){
 if(!RT_canEditPlayer(RT_round,pi)){RT_editBlock(RT_round);return;}
 var p=RT_round.players[pi],c=RT_round.cur;
 p.cx[c]=p.cx[c]?0:1;
 rtSet(RT_ACT,RT_round);RT_syncActiveToSaved();RT_render();
}
/* Ganze 18-Loch-Runde waehrend des Spiels auf eine echte 9-Loch-Runde umstellen: die nicht
   gespielte Haelfte wird verworfen, CR/Slope/Spielvorgabe je Spieler auf die Neun umgerechnet,
   Front oder Back automatisch anhand der bereits erfassten Loecher erkannt. */
function RT_convertRoundToNine(side){
 var rd=RT_round; if(!rd||rd.cnt!==18) return;
 RT_closeConv9();
 var isFront;
 if(side==='F') isFront=true; else if(side==='B') isFront=false;
 else { var fCnt=0,bCnt=0; for(var i=0;i<18;i++){ var pl=false; for(var pj=0;pj<rd.players.length;pj++){ if(rd.players[pj].sc[i]!==null){pl=true;break;} } if(pl){ if(rd.nums[i]<=9)fCnt++; else bCnt++; } } isFront=!(bCnt>fCnt); }
 var sIdx=isFront?0:9;
 var half=rd.players.map(function(p){ return RT_halfCrSl(rd,p,isFront); });
 var newPar=rd.par.slice(sIdx,sIdx+9), newSi=rd.si.slice(sIdx,sIdx+9), newNums=rd.nums.slice(sIdx,sIdx+9);
 var newParSum=newPar.reduce(function(a,b){return a+b;},0);
 rd.players.forEach(function(p,pi){
  p.sc=p.sc.slice(sIdx,sIdx+9); p.pu=p.pu.slice(sIdx,sIdx+9); p.fw=p.fw.slice(sIdx,sIdx+9);
  p.pe=p.pe.slice(sIdx,sIdx+9); p.sa=p.sa.slice(sIdx,sIdx+9); p.cx=p.cx.slice(sIdx,sIdx+9);
  if(p.pins&&p.pins.length) p.pins=p.pins.slice(sIdx,sIdx+9);
  var cr=half[pi]&&half[pi].cr, sl=half[pi]&&half[pi].sl;
  if(cr!==null&&cr!==undefined) p.cr=cr;
  if(sl!==null&&sl!==undefined) p.sl=sl;
  var nph=RT_ph(p.hi,p.cr,p.sl,newParSum,9);
  if(nph!==null&&!isNaN(nph)) p.ph=nph;
  p.only=null;
 });
 rd.par=newPar; rd.si=newSi; rd.nums=newNums; rd.cnt=9; rd.parSum=newParSum;
 rd.lbl=(isFront?'Front 9':'Back 9')+' · Par '+newParSum;
 rd.cur=Math.max(0,Math.min(8,rd.cur));
 rtSet(RT_ACT,rd); RT_syncActiveToSaved(); RT_render();
}
function RT_closeConv9(){ var o=document.getElementById('rt-conv9'); if(o&&o.parentNode) o.parentNode.removeChild(o); }
function RT_askConvertNine(){
 var rd=RT_round; if(!rd||rd.cnt!==18) return;
 RT_closeConv9();
 var ov=document.createElement('div'); ov.id='rt-conv9';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,20,12,.42);display:flex;align-items:flex-end;justify-content:center;';
 ov.innerHTML='<div style="background:#fff;border-radius:18px 18px 0 0;max-width:480px;width:100%;padding:18px 16px calc(env(safe-area-inset-bottom,0px) + 16px);box-shadow:0 -8px 32px rgba(0,0,0,.28);font-family:Inter,-apple-system,sans-serif;">'
  +'<div style="font-size:15px;font-weight:800;color:#143522;margin-bottom:4px;">Auf 9 Löcher umstellen</div>'
  +'<div style="font-size:12px;color:#6b7d70;margin-bottom:14px;">Welche Neun soll gewertet werden? Die jeweils andere Neun wird verworfen.</div>'
  +'<div style="display:flex;gap:8px;margin-bottom:8px;">'
   +'<button onclick="RT_convertRoundToNine(\'F\')" style="flex:1;padding:12px;border-radius:10px;border:none;background:#187040;color:#fff;font-weight:800;font-family:inherit;cursor:pointer;">Front 9 (1–9)</button>'
   +'<button onclick="RT_convertRoundToNine(\'B\')" style="flex:1;padding:12px;border-radius:10px;border:none;background:#187040;color:#fff;font-weight:800;font-family:inherit;cursor:pointer;">Back 9 (10–18)</button>'
  +'</div>'
  +'<button onclick="RT_closeConv9()" style="width:100%;padding:11px;border-radius:10px;border:1px solid #DCE7D4;background:#fff;color:#143522;font-weight:700;font-family:inherit;cursor:pointer;">Abbrechen</button>'
  +'</div>';
 document.body.appendChild(ov);
 ov.addEventListener('click',function(e){ if(e.target===ov) RT_closeConv9(); });
}
function RT_askExpandEighteen(){
 var rd=RT_round; if(!rd||rd.cnt!==9) return;
 var key=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(rd.courseName,rd):null;
 var co=key&&RT_COURSES[key];
 if(!co||!co.nines||!co.nines.F||!co.nines.B||co.nines.B.lbl==='–'){ RT_pageConfirm('Für diesen Platz ist keine zweite Neun hinterlegt – Erweiterung auf 18 nicht möglich.', function(){}, 'OK', '#187040'); return; }
 RT_pageConfirm('Runde auf 18 Löcher erweitern? Die zweite Neun wird ergänzt (noch nicht gespielte Löcher bleiben leer).', function(){ RT_convertRoundToEighteen(); }, 'Erweitern', '#187040');
}
function RT_convertRoundToEighteen(){
 var rd=RT_round; if(!rd||rd.cnt!==9) return;
 var key=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(rd.courseName,rd):null;
 var co=key&&RT_COURSES[key]; if(!co||!co.nines||!co.nines.F||!co.nines.B) return;
 var curFront=rd.nums[0]<=9;
 var parF=(co.nines.F.par||[]).slice(), parB=(co.nines.B.par||[]).slice();
 var numsF=(co.nines.F.nums||[]).slice(), numsB=(co.nines.B.nums||[]).slice();
 var siF=(co.nines.F.si18||co.nines.F.si), siB=(co.nines.B.si18||co.nines.B.si);
 if(parF.length!==9||parB.length!==9||numsF.length!==9||numsB.length!==9) return;
 var par=parF.concat(parB), nums=numsF.concat(numsB);
 var si=(siF&&siB&&siF.length===9&&siB.length===9)?siF.concat(siB):null;
 var parSum=par.reduce(function(a,b){return a+b;},0);
 function nulls(){ return [null,null,null,null,null,null,null,null,null]; }
 function emptyPins(){ return [[],[],[],[],[],[],[],[],[]]; }
 rd.players.forEach(function(pp){
  function ext(a){ a=a||[]; return curFront? a.concat(nulls()) : nulls().concat(a); }
  pp.sc=ext(pp.sc); pp.pu=ext(pp.pu); pp.fw=ext(pp.fw); pp.pe=ext(pp.pe); pp.sa=ext(pp.sa); pp.cx=ext(pp.cx);
  if(pp.pins){ pp.pins = curFront ? pp.pins.concat(emptyPins()) : emptyPins().concat(pp.pins); }
  var t=co.tees&&(co.tees[pp.tee]); var cr=(t&&t.cr&&t.cr.A!=null)?t.cr.A:null, sl=(t&&t.sl&&t.sl.A!=null)?t.sl.A:null;
  if(cr!=null) pp.cr=cr; if(sl!=null) pp.sl=sl;
  var nph=RT_ph(pp.hi,pp.cr,pp.sl,parSum,18); if(nph!=null&&!isNaN(nph)) pp.ph=nph;
  pp.only=null;
 });
 rd.par=par; rd.si=si; rd.nums=nums; rd.cnt=18; rd.parSum=parSum; rd.lbl='18 Loch · Par '+parSum;
 if(!curFront) rd.cur=Math.min(17,rd.cur+9);
 rtSet(RT_ACT,rd); RT_syncActiveToSaved(); RT_render();
}
/* Beim Runde-Beenden: pro (bearbeitbaren) Spieler festlegen, ob alle 18 / nur Front 9 /
   nur Back 9 gespielt wurden. Nicht gespielte Loecher werden als "-" dargestellt und nicht
   gewertet (WHS-9-Loch-Wertung). */
var RT_finishSel=null, RT_finishPis=[];
function RT_finishPrompt(){
 var rd=RT_round; if(!rd){ RT_finishDo(); return; }
 var pis;
 if(rd.ownCards){ var mi=RT_myPlayerIndex(rd); pis=(mi>=0)?[mi]:rd.players.map(function(_,i){return i;}); }
 else { pis=rd.players.map(function(_,i){return i;}); }
 RT_finishSel={};
 pis.forEach(function(pi){
  var p=rd.players[pi], f=false, b=false;
  for(var i=0;i<rd.cnt;i++){ if(p.sc[i]!==null){ if(rd.nums[i]<=9)f=true; else b=true; } }
  RT_finishSel[pi]=(p.only==='F'||p.only==='B')?p.only:(f&&!b?'F':(b&&!f?'B':'A'));
 });
 RT_finishPis=pis;
 RT_renderFinishPrompt();
}
function RT_renderFinishPrompt(){
 var rd=RT_round; if(!rd) return;
 var ex=document.getElementById('rt-finishprompt'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 var ov=document.createElement('div'); ov.id='rt-finishprompt';
 ov.style.cssText='position:fixed;inset:0;z-index:99999;background:rgba(8,20,12,.42);display:flex;align-items:flex-end;justify-content:center;';
 var rows=RT_finishPis.map(function(pi){
  var p=rd.players[pi], sel=RT_finishSel[pi];
  var opt=function(v,lbl){ return '<button onclick="RT_finishSet('+pi+',\''+v+'\')" style="flex:1;padding:8px 4px;border-radius:8px;border:1px solid '+(sel===v?'#187040':'#DCE7D4')+';background:'+(sel===v?'#187040':'#fff')+';color:'+(sel===v?'#fff':'#143522')+';font-weight:700;font-size:12px;font-family:inherit;cursor:pointer;">'+lbl+'</button>'; };
  return '<div style="margin-bottom:12px;"><div style="font-size:13px;font-weight:700;color:#143522;margin-bottom:6px;">'+rtEsc(p.name)+'</div><div style="display:flex;gap:6px;">'+opt('A','Alle 18')+opt('F','Nur Front 9')+opt('B','Nur Back 9')+'</div></div>';
 }).join('');
 ov.innerHTML='<div style="background:#fff;border-radius:18px 18px 0 0;max-width:480px;width:100%;padding:18px 16px calc(env(safe-area-inset-bottom,0px) + 16px);box-shadow:0 -8px 32px rgba(0,0,0,.28);font-family:Inter,-apple-system,sans-serif;max-height:82vh;overflow:auto;">'
  +'<div style="font-size:15px;font-weight:800;color:#143522;margin-bottom:4px;">Runde beenden</div>'
  +'<div style="font-size:12px;color:#6b7d70;margin-bottom:14px;">Wer hat nur 9 Löcher gespielt? Nicht gespielte Löcher werden nicht gewertet.</div>'
  +rows
  +'<div style="display:flex;gap:8px;margin-top:8px;"><button onclick="RT_finishCancel()" style="flex:1;padding:11px;border-radius:10px;border:1px solid #DCE7D4;background:#fff;color:#143522;font-weight:700;font-family:inherit;cursor:pointer;">Abbrechen</button>'
  +'<button onclick="RT_finishConfirm()" style="flex:2;padding:11px;border-radius:10px;border:none;background:#187040;color:#fff;font-weight:800;font-family:inherit;cursor:pointer;">Runde beenden</button></div>'
  +'</div>';
 document.body.appendChild(ov);
}
function RT_finishSet(pi,v){ if(RT_finishSel){ RT_finishSel[pi]=v; RT_renderFinishPrompt(); } }
function RT_finishCancel(){ var ex=document.getElementById('rt-finishprompt'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex); RT_finishSel=null; }
function RT_finishConfirm(){
 var rd=RT_round;
 var ex=document.getElementById('rt-finishprompt'); if(ex&&ex.parentNode) ex.parentNode.removeChild(ex);
 if(rd&&RT_finishSel){ RT_finishPis.forEach(function(pi){ var v=RT_finishSel[pi]; rd.players[pi].only=(v==='F'||v==='B')?v:null; }); }
 RT_finishSel=null;
 RT_finishDo();
}
function RT_validateRound(rd){
 for(var h=0; h<rd.cnt; h++){
  for(var pi=0; pi<rd.players.length; pi++){
   var p=rd.players[pi];
   if(!RT_holeInSeg(rd,p,h)) continue;
   var score=p.sc[h]===null?0:p.sc[h];
   var putts=p.pu[h]>0?p.pu[h]:0;
   var sum=putts+p.pe[h]+p.sa[h];
   if(sum>score) return {ok:false, hole:rd.nums[h], player:p.name};
  }
 }
 return {ok:true};
}
function RT_finish(){
 if(RT_round&&!RT_round.v2&&!RT_round.ownCards&&!RT_amScorer(RT_round)){RT_scorerBlock();return;}
 if(RT_round && RT_round.cnt===18 && !RT_editingExisting){ RT_finishPrompt(); return; }
 RT_finishDo();
}
function RT_finishDo(){
 var check=RT_validateRound(RT_round);
 if(!check.ok){
  RT_state.saveWarn='Bahn '+check.hole+' bei '+check.player+': Putts + Strafschl\u00e4ge + Sandschl\u00e4ge d\u00fcrfen zusammen nicht mehr sein als die Schl\u00e4ge.';
  RT_render();
  return;
 }
 RT_state.saveWarn='';
 RT_round.done=true;
 if(RT_round.historical) RT_round.promoted=true;
 var saved=rtGet(RT_KEY)||[];
 var idx=-1;
 for(var i=0;i<saved.length;i++){ if(saved[i].id===RT_round.id){ idx=i; break; } }
 if(idx>=0){ saved[idx]=RT_round; } else { saved.push(RT_round); }
 RT_editingExisting=false;
 rtSet(RT_KEY,saved);
 if(RT_round.v2){ try{ if(typeof RSV2!=='undefined') RSV2.finish(RT_round.id); }catch(e){} sbPushRound(RT_round); } else if(RT_roundIsShared(RT_round)&&!RT_round.ownCards&&RT_amScorer(RT_round)){ try{ sbPushCanonical(RT_round); }catch(e){} } else { sbPushRound(RT_round); }
 RT_rtBroadcastState();
 rtDel(RT_ACT);
 if(RT_round.promoted) RT_hydrateHistoricalData();
 RT_state.viewId=RT_round.id;
 try{ RT_onbMaybeTrialNudge(); }catch(e){}
 RT_round=null;
 RT_go('view');
}
/* Loest einen Platz-Schluessel auf - bevorzugt ueber rd.courseKey (stabile ID, seit kurzem bei
   jeder neu angelegten/bearbeiteten Runde direkt mitgespeichert, siehe RT_applyEdit/
   RT_seedHistoricalRounds), erst danach ueber den Namen. Der Namensvergleich ist zusaetzlich
   robust gegen Gross-/Kleinschreibung, Leerzeichen und Satzzeichen, damit kleine Abweichungen
   (z.B. nach einer Umbenennung ueber das Platzname-Feld) die Zuordnung nicht mehr brechen -
   genau das hat vorher z.B. bei "Gut Waldhof" (Runde) vs. dem Platznamen im Code Probleme
   gemacht. Aeltere Runden ohne courseKey heilen sich beim naechsten Bearbeiten+Speichern
   automatisch, weil RT_applyEdit den Schluessel dann ergaenzt. */
function RT_courseKeyFromName(name, rd){
 if(rd&&rd.courseKey&&RT_COURSES[rd.courseKey]) return rd.courseKey;
 var keys=Object.keys(RT_COURSES);
 for(var i=0;i<keys.length;i++){ if(RT_COURSES[keys[i]].name===name) return keys[i]; }
 var norm=function(s){ return (s||'').toLowerCase().replace(/[^a-z0-9\u00e4\u00f6\u00fc\u00df]/g,''); };
 var nn=norm(name);
 if(!nn) return null;
 for(var j=0;j<keys.length;j++){ if(norm(RT_COURSES[keys[j]].name)===nn) return keys[j]; }
 /* Dritte Stufe: Substring-Vergleich in beide Richtungen. Faengt Faelle ab, in denen ein
    Platz stark gekuerzt umbenannt wurde (z.B. Rundenname "Gut Waldhof" vs. hinterlegter
    Platzname "GC Hamburg Gut Waldhof (A-B)") und diese Umbenennung nur lokal auf einem
    Geraet als Override existiert, aber nicht (mehr) greift - z.B. auf einem neuen Geraet
    oder nach dem Leeren des lokalen Speichers. Bevorzugt den laengsten Treffer, um bei
    mehreren Kandidaten den spezifischsten zu waehlen. */
 var best=null, bestLen=0;
 for(var k=0;k<keys.length;k++){
  var cn=norm(RT_COURSES[keys[k]].name);
  if(!cn) continue;
  if(cn.indexOf(nn)>=0||nn.indexOf(cn)>=0){
   var len=Math.min(cn.length,nn.length);
   if(len>bestLen){ best=keys[k]; bestLen=len; }
  }
 }
 return best;
}
function RT_arrEq(a,b){
 if(!a||!b||a.length!==b.length) return false;
 for(var i=0;i<a.length;i++){ if(a[i]!==b[i]) return false; }
 return true;
}
function RT_holesSelFromRound(rd,key){
 if(rd.cnt===18) return 'A';
 var c=RT_COURSES[key];
 if(c){
  if(RT_arrEq(rd.nums,c.nines.F.nums)) return 'F';
  if(RT_arrEq(rd.nums,c.nines.B.nums)) return 'B';
 }
 return (rd.nums&&rd.nums[0]===1)?'F':'B';
}
function RT_editRound(id,direct){
 var saved=rtGet(RT_KEY)||[];
 var rd=null;
 for(var i=0;i<saved.length;i++)if(saved[i].id===id)rd=saved[i];
 if(!rd)return;
 /* Fremde (geteilte) Runde nie ueber den Bearbeiten-/Neuaufbau-Pfad oeffnen: aktiv -> nur
    ansehen/mitscoren (RT_resumeShared, Scoring-Gate bleibt korrekt); beendet -> gesperrt. */
 if(RT_isForeignRound(rd)){ if(!rd.done) RT_resumeShared(id); return; }
 RT_editSourceRound=JSON.parse(JSON.stringify(rd));
 var key=RT_courseKeyFromName(rd.courseName,rd);
 var holesSel=key?RT_holesSelFromRound(rd,key):(rd.cnt===18?'A':((rd.nums&&rd.nums[0]===1)?'F':'B'));
 RT_su={
  course:key||'other', holes:holesSel, date:rd.date||RT_today(), time:rd.time||'',
  players:rd.players.map(function(p){
   var teeIdx=-1, cr=p.cr, sl=p.sl;
   if(key){
    var tees=RT_COURSES[key].tees;
    for(var ti=0;ti<tees.length;ti++){
     if(tees[ti].name===p.tee){
      teeIdx=ti;
      /* Nur als "automatisch vom Abschlag" behandeln (cr/sl auf null, damit das Eingabefeld
         den Abschlags-Standardwert zeigt), wenn der gespeicherte Wert TATSAECHLICH dem
         Abschlags-Standard fuer diese Loch-Auswahl entspricht. Weicht er ab, wurde er beim
         urspruenglichen Anlegen manuell ueberschrieben - dieser Wert muss erhalten bleiben,
         sonst geht die manuelle CR/Slope-Aenderung beim Bearbeiten verloren. */
      var tCr=tees[ti].cr[holesSel], tSl=tees[ti].sl[holesSel];
      var matchesTee = tCr!==undefined && tCr!==null && tSl!==undefined && tSl!==null &&
        Math.abs(tCr-p.cr)<0.01 && Math.abs(tSl-p.sl)<0.01;
      if(matchesTee){ cr=null; sl=null; }
      break;
     }
    }
   }
   var pSex=(p.sex==='w'||p.sex==='m')?p.sex:((typeof p.tee==='string'&&p.tee.toLowerCase().indexOf('damen')>=0)?'w':'m');
   return {name:p.name, hi:p.hi, tee:teeIdx, cr:cr, sl:sl, sex:pSex, teeHalf:(holesSel==='A')?null:holesSel};
  }),
  ownCards:!!rd.ownCards,
  custName:key?'':rd.courseName, custPar:'', custSi:'', siEdit:{}, parEdit:{}
 };
 /* WICHTIG: RT_su.siEdit hier NICHT aus rd.si vorbelegen. RT_su.siEdit wirkt als Override,
    der die aktuellen (korrekten) Platz-SI-Werte in RT_courseData() verdraengt (siehe siOf()).
    Wuerde das gespeicherte SI der Runde hier automatisch als "manuelle Aenderung" uebernommen,
    wuerde jede zukuenftige Korrektur der Platzdaten (z.B. si18) beim erneuten Bearbeiten+
    Speichern sofort wieder durch den alten Rundenwert ueberschrieben - genau das hat zuvor
    verhindert, dass ein erneutes Speichern die korrekte SI-Zuordnung uebernimmt. Mit leerem
    siEdit greifen automatisch die aktuellen Platz-SI-Werte (bzw. ein bewusst gesetzter
    Platz-weiter Override ueber RT_persistSi), die dann beim Speichern frisch uebernommen
    werden. Wer wirklich rundenspezifisch abweichende SI braucht, kann sie im Loecher-Feld
    weiterhin manuell eintragen. */
 RT_editingExisting=true;
 RT_state.saveWarn='';
 if(direct){ RT_applyEdit(); } else { RT_go('setup'); }
}
function RT_cancelEditSetup(){
 RT_editingExisting=false;
 RT_su=null;
 RT_editSourceRound=null;
 RT_go('view');
}
function RT_applyEdit(){
 var cd=RT_courseData(); if(!cd)return;
 var si=cd.si;
 if(!si){si=[];for(var i=0;i<cd.cnt;i++)si.push(i+1);}
 var src=RT_editSourceRound;
 var mk=function(v){var a=[];for(var i=0;i<cd.cnt;i++)a.push(v);return a;};
 var newPlayers=RT_su.players.map(function(p,pi){
  var cr=RT_pCr(p,cd), sl=RT_pSl(p,cd);
  if(cr===null)cr=cd.parSum; if(sl===null)sl=113;
  var teeName=p.tee>=0&&cd.tees[p.tee]?cd.tees[p.tee].name:'Manuell';
  var srcP=src&&src.players[pi];
  var sc=mk(null),pu=mk(null),fw=mk(null),pe=mk(0),sa=mk(0),cx=mk(0);
  var pins=[];for(var pj=0;pj<cd.cnt;pj++)pins.push([]);
  if(srcP&&src.nums){
   for(var hh=0; hh<cd.nums.length; hh++){
    var num=cd.nums[hh];
    var oldIdx=src.nums.indexOf(num);
    if(oldIdx>=0){
     sc[hh]=srcP.sc[oldIdx]; pu[hh]=srcP.pu[oldIdx]; fw[hh]=srcP.fw[oldIdx];
     pe[hh]=srcP.pe[oldIdx]; sa[hh]=srcP.sa[oldIdx]; cx[hh]=srcP.cx[oldIdx];
     if(srcP.pins&&srcP.pins[oldIdx]) pins[hh]=srcP.pins[oldIdx].slice();
    }
   }
  }
  return{name:p.name, hi:parseFloat(p.hi), tee:teeName, cr:cr, sl:sl, sex:(p.sex==='w')?'w':'m',
   ph:RT_ph(parseFloat(p.hi),cr,sl,cd.parSum,cd.cnt),
   sc:sc, pu:pu, fw:fw, pe:pe, sa:sa, cx:cx, pins:pins};
 });
 RT_round={id:src?src.id:('r'+Date.now()), date:RT_su.date||(src?src.date:RT_today()), time:RT_su.time||(src?src.time:''),
  courseName:cd.name, courseKey:RT_su.course, lbl:cd.lbl+' \u00b7 Par '+cd.parSum,
  par:cd.par, si:si, nums:cd.nums, cnt:cd.cnt, parSum:cd.parSum, cur:0, done:(src?!!src.done:false), holeViews:(src&&src.holeViews)?src.holeViews:{},
  ownerHint:(src&&src.ownerHint)?src.ownerHint:(sbUser?sbUser.id:null),
 autoCount:(src&&src.autoCount!==undefined&&src.autoCount!==null)?src.autoCount:RT_autoCountOn(),
  historical:src?src.historical:undefined, histSrc:src?src.histSrc:undefined, promoted:src?src.promoted:undefined, ownCards:!!RT_su.ownCards, v2:(src&&src.v2)||undefined, scorerMap:(src&&src.scorerMap)?src.scorerMap:undefined,
  players:newPlayers};
 RT_state.saveWarn='';
 RT_go('play');
}
function RT_editFromDetail(id){
 showTab('runde');
 RT_openView(id);
}
/* Ein Platz kann in den Runden unter mehreren Schreibweisen stehen (z.B. "Georghausen" in
   aelteren und "Schloss Georghausen" in neueren Runden). Ohne Normalisierung entstuenden
   daraus ZWEI Serien mit zwei Farben fuer denselben Platz. Deshalb wird der Name zuerst
   ueber RT_courseKeyFromName() auf den hinterlegten Platz aufgeloest und dessen kanonischer
   Name als Grundlage fuer Code und Label verwendet. */
function RT_slugCourseCode(name,isFront){
 var key=(typeof RT_courseKeyFromName==='function')?RT_courseKeyFromName(name):null;
 if(key&&RT_COURSES[key]&&RT_COURSES[key].name) name=RT_COURSES[key].name;
 /* Beide Schreibvarianten je Platz, damit die in HV_COURSE_META fest hinterlegten Farben
    auch dann greifen, wenn der Platz unter seinem Kurznamen gefuehrt wird. */
 var known={
  'Schloss Georghausen': isFront?'Front':'Back',
  'Georghausen': isFront?'Front':'Back',
  'GC Hamburg Gut Waldhof (A\u2013B)': isFront?'WalF':'WalB',
  'Gut Waldhof': isFront?'WalF':'WalB',
  'GC K\u00fcrten (Meisterschaftsplatz)': isFront?'KueF':'KueB',
  'K\u00fcrten': isFront?'KueF':'KueB',
  'Kaanapali': isFront?'KawF':'KawB'
 };
 if(known[name]) return known[name];
 var slug=(name||'Custom').replace(/[^A-Za-z0-9]/g,'').slice(0,6)||'Custom';
 var code=slug+(isFront?'F':'B');
 if(!HV_COURSE_META[code]){
  var lbl=(name&&name.length>16)?name.slice(0,16)+'\u2026':(name||'Eigener Platz');
  HV_COURSE_META[code]={label:lbl+(isFront?' F':' B'), color:RT_colorForCode(code)};
 }
 return code;
}
/* Liefert die HALBEN-spezifischen CR/Slope-Werte (F oder B) fuer die Handicap-Umrechnung.
   p.cr/p.sl sind bei 18-Loch-Runden die AGGREGIERTEN 18-Loch-Werte des gewaehlten Abschlags -
   die duerfen NICHT 1:1 fuer eine 9-Loch-Haelfte verwendet werden. Deshalb hier ueber den
   Platz-/Abschlagsnamen die korrekten Front/Back-Werte nachschlagen; nur falls das nicht
   moeglich ist (z.B. unbekannter/gestrichener Platz), auf p.cr/p.sl zurueckfallen. */
function RT_halfCrSl(rd,p,isFront){
 var key=RT_courseKeyFromName(rd.courseName,rd);
 if(key&&RT_COURSES[key]){
  var tees=RT_COURSES[key].tees||[];
  for(var i=0;i<tees.length;i++){
   if(tees[i].name===p.tee){
    var side=isFront?'F':'B';
    var cr=tees[i].cr[side], sl=tees[i].sl[side];
    if(cr!==undefined&&cr!==null&&sl!==undefined&&sl!==null) return {cr:cr, sl:sl};
    break;
   }
  }
 }
 /* Kein passender Abschlag gefunden (z.B. Tee "Manuell") - p.cr/p.sl sind dann die fuer die
    GESAMTE Runde eingetragenen Werte. War die Runde urspruenglich 18 Loch, ist das eine
    18-Loch-CR, die fuer die Aufteilung in zwei 9-Loch-Haelften halbiert werden muss (Course
    Rating ist naeherungsweise additiv ueber beide Neunen: CR18 = CR-Front + CR-Back) - sonst
    entsteht eine grotesk ueberhoehte 9-Loch-Spielvorgabe (z.B. 69 statt ~33) und dadurch
    massiv zu viele Stableford-Punkte. Der Slope Rating bleibt unveraendert, da er die
    relative Schwierigkeit beschreibt und nicht mit der Lochzahl skaliert. */
 var crFallback=p.cr;
 if(rd.cnt!==9 && crFallback!==null && crFallback!==undefined && !isNaN(crFallback)){
  crFallback=Math.round(crFallback/2*10)/10;
 }
 return {cr:crFallback, sl:p.sl};
}
function RT_convertHalf(rd,p,startIdx,isFront){
 var code=RT_slugCourseCode(rd.courseName,isFront);
 var par=rd.par.slice(startIdx,startIdx+9);
 var si=rd.si.slice(startIdx,startIdx+9);
 var scores=p.sc.slice(startIdx,startIdx+9);
 var crossed=p.cx.slice(startIdx,startIdx+9);
 var puttsRaw=p.pu.slice(startIdx,startIdx+9);
 var putts=puttsRaw.map(function(v){return v===null?-1:v;});
 var fw=p.fw.slice(startIdx,startIdx+9);
 var pen=p.pe.slice(startIdx,startIdx+9);
 var sand=p.sa.slice(startIdx,startIdx+9);
 var crsl=RT_halfCrSl(rd,p,isFront);
 var cr=crsl.cr, sl=crsl.sl;
 var halfParSum=par.reduce(function(s,v){return s+v;},0);
 /* STABLEFORD-PUNKTE dieser Haelfte entsprechen jetzt exakt der Out-/In-Aufteilung der
    tatsaechlichen Rundenberechnung: echte Spielvorgabe (p.ph) + echtes SI dieser Haelfte im
    ORIGINALEN Rundenkontext (rd.cnt, z.B. 18 Loch mit 1-18-Index) - keine unabhaengige
    9-Loch-Neuberechnung mehr. Das entspricht 1:1 der Out-/In-Netto-Punkte auf der amtlichen
    Scorekarte des Clubs. War die Runde selbst schon 9 Loch, ist p.ph/rd.cnt ohnehin bereits
    9-Loch-basiert. */
 var stbfPh=p.ph, stbfHoles=rd.cnt;
 /* Nur fuer das separate HANDICAP-DIFFERENZIAL (WHS-Fortschreibung je Neun, siehe "hi" im
    hvEntry unten - fliesst in den HI-Verlauf ein) gilt weiterhin eine EIGENSTAENDIGE
    9-Loch-Spielvorgabe mit der 9-Loch-RELATIVEN Stroke-Index-Reihenfolge dieser Haelfte
    (1-9, nicht 1-18) - das ist WHS-konform fuer die Umrechnung eines Splits, hat aber ab
    jetzt keinen Einfluss mehr auf die angezeigten Stableford-Punkte. */
 var hiPh=(rd.cnt===9)?p.ph:RT_ph(p.hi,cr,sl,halfParSum,9);
 if(hiPh===null||isNaN(hiPh))hiPh=p.ph;
 var courseKey=RT_courseKeyFromName(rd.courseName,rd);
 var courseObj=courseKey&&RT_COURSES[courseKey];
 var nineObj=courseObj&&courseObj.nines&&courseObj.nines[isFront?'F':'B'];
 var hiSi=(nineObj&&nineObj.si)||si;
 /* Ungespielte oder gestrichene Loecher NIE als 0 Schlaege werten (waere ein Phantom-Bestwert).
    Stattdessen konservativ mit dem NDB-Deckel (Netto-Doppelbogey-Max) ansetzen - genau wie
    RT_cap() es fuer die laufende Rundenanzeige bereits tut. Eine komplett ungespielte Haelfte
    erzeugt gar keinen Handicap-Eintrag. */
 var grossSum=0, stbfSum=0, playedCount=0;
 for(var i=0;i<9;i++){
  var npHi=SC_netPar(par[i],hiPh,hiSi[i],9);
  var cap=npHi+2;
  if(scores[i]===null||scores[i]===undefined||crossed[i]){
   grossSum+=cap;
   continue;
  }
  playedCount++;
  grossSum+=Math.min(scores[i],cap);
  var npStbf=(rd.cnt===9)?npHi:SC_netPar(par[i],stbfPh,si[i],stbfHoles);
  stbfSum+=Math.max(0,2-(scores[i]-npStbf));
 }
 if(playedCount===0) return null;
 /* WHS-konforme 9-auf-18-Loch-Hochrechnung (Rule 5.1b, seit Jan. 2024): das 9-Loch-
    Score-Differential dieser Haelfte wird NICHT verdoppelt, sondern mit einem „Expected
    Score“ fuer die nicht gespielte Haelfte addiert. Der Expected-Score-Wert haengt vom
    aktuellen Handicap-Index des Spielers ab (p.hi, wie bei Rundenanlage/-bearbeitung erfasst) -
    naeherungsweise: ExpectedScore9 = 0,52 * HI + 1,2 (offiziell nicht als geschlossene Formel
    veroeffentlicht, aber anhand des USGA-Beispiels HI 14,0: 7,2 + 8,48 = 15,68 ~ 15,7 verifiziert).
    Ersetzt die vorherige grobe Naeherung (*2*0.96), die weder die offizielle Verdopplungslogik
    noch eine feste Konstante aus dem WHS-Regelwerk war. */
 var refHi=(p.hi!==undefined&&p.hi!==null&&!isNaN(p.hi))?p.hi:54;
 var nineDiff=sl?((113/sl)*(grossSum-cr)):0;
 var expected9=0.52*refHi+1.2;
 var hi=sl?(nineDiff+expected9):0;
 var dd=rd.date.slice(8,10), mm=rd.date.slice(5,7);
 var lblShort=dd+'.'+mm+'.';
 var meta=HV_COURSE_META[code];
 var hvEntry={date:rd.date, time:rd.time, lbl:lblShort, half:code, s:grossSum, cr:cr, sl:sl,
  hi:Math.round(hi*10)/10, col:meta.color, stbf:stbfSum, rtId:rd.id};
 var scEntry={id:'rt-'+rd.id+'-'+code, date:rd.date, time:rd.time, lbl:lblShort+' '+rd.date.slice(0,4), half:code,
  scores:scores, crossed:crossed, putts:putts, fw:fw, pen:pen, sand:sand, stbf:stbfSum, rtId:rd.id,
  par:par, si:si, ch:stbfPh, chHoles:stbfHoles};
 return {hv:hvEntry, sc:scEntry};
}
function RT_convertRound(rd){
 /* WICHTIG: nicht blind players[0] nehmen - bei einer von einem anderen Nutzer erstellten,
    geteilten Runde waere das der Ersteller, nicht ich. RT_myPlayerIndex() loest das ueber
    RT_roundOwners/RT_myPlayerNameByOwner korrekt auf (siehe sbPull/RT_loadMyPlayerNames). */
 var idx=RT_myPlayerIndex(rd);
 if(idx<0) return {hv:[],sc:[]};
 var p=rd.players&&rd.players[idx]; if(!p) return {hv:[],sc:[]};
 var hv=[], sc=[];
 if(rd.cnt===9){
  var isFront=rd.nums[0]===1;
  var conv=RT_convertHalf(rd,p,0,isFront);
  if(conv){hv.push(conv.hv); sc.push(conv.sc);}
 }else if(p.only==='F'){
  var convOF=RT_convertHalf(rd,p,0,true);
  if(convOF){hv.push(convOF.hv); sc.push(convOF.sc);}
 }else if(p.only==='B'){
  var convOB=RT_convertHalf(rd,p,9,false);
  if(convOB){hv.push(convOB.hv); sc.push(convOB.sc);}
 }else{
  var convF=RT_convertHalf(rd,p,0,true);
  var convB=RT_convertHalf(rd,p,9,false);
  if(convB){hv.push(convB.hv); sc.push(convB.sc);}
  if(convF){hv.push(convF.hv); sc.push(convF.sc);}
 }
 return {hv:hv, sc:sc};
}
function RT_pairHistorical(){
 var hvPool=HV_D_STATIC.map(function(hv,i){ return {hv:hv, idx:i}; });
 var pairs={};
 SC_STATIC.forEach(function(sc){
  var pos=hvPool.findIndex(function(p){ return p.hv.date===sc.date && p.hv.half===sc.half; });
  if(pos>=0){ pairs[sc.id]=hvPool[pos].idx; hvPool.splice(pos,1); }
  else{ pairs[sc.id]=null; }
 });
 return pairs;
}
function RT_seedHistoricalRounds(){
 var pairs=RT_pairHistorical();
 var rounds=rtGet(RT_KEY)||[];
 var existingIds={}; rounds.forEach(function(rd){existingIds[rd.id]=true;});
 /* Explizit vom Nutzer geloeschte historische Hole19-Runden (siehe RT_delete) duerfen beim
    naechsten Laden NICHT erneut eingespielt werden - sonst waere Loeschen fuer diese Runden
    wirkungslos, weil sie beim naechsten Seitenaufruf automatisch wieder auftauchen. */
 var deletedHist={}; (rtGet(RT_HISTDEL_KEY)||[]).forEach(function(id){deletedHist[id]=true;});
 var changed=false;
 SC_STATIC.forEach(function(sc){
  var id='hist-'+sc.id;
  if(existingIds[id]||deletedHist[id]) return;
  var hvIdx=pairs[sc.id];
  var hv=(hvIdx!==null&&hvIdx!==undefined)?HV_D_STATIC[hvIdx]:null;
  var par=SC_PAR[sc.half]||SC_PAR.Front;
  var si=SC_SI[sc.half]||SC_SI.Front;
  var ph=SC_CH[sc.half]||32;
  var meta=HV_COURSE_META[sc.half];
  var courseLabel=meta?meta.label:sc.half;
  var parSum=par.reduce(function(s,v){return s+v;},0);
  rounds.push({
   id:id, date:sc.date, courseName:courseLabel,
   lbl:'Historische Runde \u00b7 Par '+parSum,
   par:par, si:si, nums:[1,2,3,4,5,6,7,8,9], cnt:9, parSum:parSum,
   cur:0, done:true, historical:true, histSrc:sc.id,
   players:[{name:RT_myDisplayName(), hi:hv?hv.hi:RT_ownHandicap(), tee:'Historisch', cr:hv?hv.cr:null, sl:hv?hv.sl:null, ph:ph,
    sc:sc.scores.slice(), pu:sc.putts.map(function(v){return v<0?null:v;}), fw:sc.fw.slice(),
    pe:sc.pen.slice(), sa:sc.sand.slice(), cx:sc.crossed.slice()}]
  });
  changed=true;
 });
 if(changed) rtSet(RT_KEY, rounds);
}
/* Handicap und Schlag-Detail leiten sich AUSSCHLIESSLICH aus den tatsaechlich gespeicherten
   Runden ab (rtGet(RT_KEY)) - nicht mehr aus den eingebetteten Hole19-Importdaten
   (HV_D_STATIC/SC_STATIC). Die Importdaten dienen nur noch als einmalige Ausgangsbefuellung
   (siehe RT_seedHistoricalRounds) fuer neu angelegte Geraete; sobald eine historische Runde
   in den gespeicherten Runden existiert, zeigt die App exakt deren aktuellen Stand - auch
   waehrend sie noch teilweise leer und haendisch in Bearbeitung ist. Historische Runden
   werden dafuer unabhaengig vom "promoted"-Flag konvertiert; normale (nicht-historische)
   Runden weiterhin nur nach explizitem "Runde beenden" (promoted), damit frisch gespielte
   Runden vor der Uebernahme ins Handicap noch geprueft/korrigiert werden koennen. */
function RT_hydrateHistoricalData(){
 var rounds=rtGet(RT_KEY)||[];
 rounds=rounds.filter(function(r){return !r.hidden;});
 var hv=[], sc=[];
 rounds.forEach(function(rd){
  if(!rd.historical && !rd.promoted && !rd.done) return;
  var conv=RT_convertRound(rd);
  hv=hv.concat(conv.hv);
  sc=sc.concat(conv.sc);
 });
 HV_D=hv;
 SC=sc;
}
function RT_promoteRound(id){
 var saved=rtGet(RT_KEY)||[];
 var idx=-1;
 for(var i=0;i<saved.length;i++){ if(saved[i].id===id){ idx=i; break; } }
 if(idx<0) return;
 if(RT_isForeignRound(saved[idx])) return;
 saved[idx].promoted=true;
 rtSet(RT_KEY,saved);
 /* WICHTIG: auch in die Cloud pushen - ohne das ging die Befoerderung (promoted:true) beim
     naechsten sbPull() (z.B. beim Start einer neuen Runde oder App-Neustart) wieder verloren,
     weil sbPull() den kompletten lokalen RT_KEY-Stand durch den (hier nie aktualisierten)
     Cloud-Stand ersetzt. Die Runde verschwand dadurch scheinbar wieder aus Schlag-Detail/
     HI-Verlauf und wirkte erneut unbeendet, obwohl nur die Cloud-Synchronisierung fehlte. */
 sbPushRound(saved[idx]);
 RT_hydrateHistoricalData();
 RT_render();
}
function RT_cancelEdit(){
 RT_editingExisting=false;
 RT_round=null;
 RT_state.saveWarn='';
 RT_go('view');
}

function RT_openView(id){RT_state.viewId=id;RT_go('view');}
/* ===== Spielformate / Auswertung (berechnete Schicht ueber den Scores, aendert die Eingabe nicht) =====
   Netto = Brutto minus Vorgabeschlaege je Loch (aus SC_netPar). Ranglisten (Zaehlspiel/Stableford/Skins)
   fuer beliebig viele Spieler; Lochspiel/Nassau fuer zwei (bei mehr: die ersten beiden). */
var RT_fmtNet=true, RT_fmtOpen=false;
function RT_fmtSetNet(v){ RT_fmtNet=!!v; RT_render(); }
function RT_fmtToggleOpen(){ RT_fmtOpen=!RT_fmtOpen; RT_render(); }
var RT_fmtPairA=0, RT_fmtPairB=1;
function RT_fmtSetPair(w,v){ v=parseInt(v,10); if(w==='a') RT_fmtPairA=v; else RT_fmtPairB=v; RT_render(); }
function RT_hcpStrokes(p,h,rd){ rd=rd||RT_round; return SC_netPar(rd.par[h],p.ph,rd.si[h],rd.cnt)-rd.par[h]; }
function RT_grossH(p,h,rd){ rd=rd||RT_round; if(!RT_holeInSeg(rd,p,h)||p.cx[h]||p.sc[h]===null||p.sc[h]===undefined) return null; return p.sc[h]; }
function RT_netScoreH(p,h,rd){ var g=RT_grossH(p,h,rd); if(g===null) return null; return g-RT_hcpStrokes(p,h,rd); }
function RT_fmtStroke(rd,net){
 var rows=rd.players.map(function(p,pi){ var s=0,n=0; for(var h=0;h<rd.cnt;h++){ var v=net?RT_netScoreH(p,h,rd):RT_grossH(p,h,rd); if(v!==null){ s+=v; n++; } } return {pi:pi,name:p.name,total:s,played:n}; });
 rows.sort(function(a,b){ return a.total-b.total; }); return rows;
}
function RT_fmtStbf(rd){
 var rows=rd.players.map(function(p,pi){ var s=0,n=0; for(var h=0;h<rd.cnt;h++){ var v=RT_stbfH(p,h,rd); if(v!==null){ s+=v; n++; } } return {pi:pi,name:p.name,total:s,played:n}; });
 rows.sort(function(a,b){ return b.total-a.total; }); return rows;
}
function RT_fmtSkins(rd,net){
 var wins={}; rd.players.forEach(function(p,pi){ wins[pi]=0; });
 var carry=0;
 for(var h=0;h<rd.cnt;h++){
  var vals=[],ok=true;
  for(var pi=0;pi<rd.players.length;pi++){ var p=rd.players[pi]; if(!RT_holeInSeg(rd,p,h)) continue; var v=net?RT_netScoreH(p,h,rd):RT_grossH(p,h,rd); if(v===null){ ok=false; break; } vals.push({pi:pi,v:v}); }
  if(!ok||vals.length<2) continue;
  var min=Math.min.apply(null,vals.map(function(x){return x.v;}));
  var low=vals.filter(function(x){return x.v===min;});
  var pot=carry+1;
  if(low.length===1){ wins[low[0].pi]+=pot; carry=0; } else { carry=pot; }
 }
 var rows=rd.players.map(function(p,pi){ return {pi:pi,name:p.name,skins:wins[pi]}; });
 rows.sort(function(a,b){ return b.skins-a.skins; }); return {rows:rows,carry:carry};
}
function RT_fmtMatch(rd,net,ai,bi,filt){
 var a=rd.players[ai],b=rd.players[bi];
 var up=0,played=0,closed=null,open=0;
 for(var h=0;h<rd.cnt;h++){
  if(filt&&!filt(rd,h)) continue;
  if(!RT_holeInSeg(rd,a,h)||!RT_holeInSeg(rd,b,h)) continue;
  var va=net?RT_netScoreH(a,h,rd):RT_grossH(a,h,rd);
  var vb=net?RT_netScoreH(b,h,rd):RT_grossH(b,h,rd);
  if(va===null||vb===null){ open++; continue; }
  played++;
  if(va<vb) up++; else if(vb<va) up--;
  var rem=0; for(var k=h+1;k<rd.cnt;k++){ if(filt&&!filt(rd,k)) continue; if(!RT_holeInSeg(rd,a,k)||!RT_holeInSeg(rd,b,k)) continue; rem++; }
  if(!closed && Math.abs(up)>rem){ closed={by:Math.abs(up),rem:rem,leader:up>0?ai:bi}; }
 }
 return {up:up,played:played,closed:closed,open:open,ai:ai,bi:bi};
}
function RT_fmtMatchText(rd,net,ai,bi,filt){
 var m=RT_fmtMatch(rd,net,ai,bi,filt);
 if(m.played===0) return null;
 var a=rd.players[ai].name,b=rd.players[bi].name;
 if(m.closed) return rtEsc(rd.players[m.closed.leader].name)+' '+m.closed.by+'&'+m.closed.rem;
 if(m.up===0) return (m.open?'Stand: ':'')+'Unentschieden (A/S)';
 var lead=m.up>0?a:b;
 return (m.open?'Stand: ':'')+rtEsc(lead)+' '+Math.abs(m.up)+' auf';
}
function RT_fmtFront(rd,h){ return rd.nums[h]<=9; }
function RT_fmtBack(rd,h){ return rd.nums[h]>=10; }
function RT_fmtMedal(i){ return i===0?'🥇':i===1?'🥈':i===2?'🥉':(i+1)+'.'; }
function RT_fmtRankHtml(title,rows,valFn,sub){
 var h='<div style="margin-bottom:14px;"><div style="font-weight:800;color:#143522;font-size:13px;margin-bottom:6px;">'+title+'</div>';
 rows.forEach(function(r,i){
  h+='<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:8px;'+(i===0?'background:#EAF6EE;':'')+'margin-bottom:3px;">'
   +'<span style="width:24px;text-align:center;font-size:13px;">'+RT_fmtMedal(i)+'</span>'
   +'<span style="flex:1;min-width:0;font-size:13px;color:#143522;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+rtEsc(r.name)+'</span>'
   +'<span style="font-weight:800;color:#187040;font-size:14px;">'+valFn(r)+'</span></div>';
 });
 if(sub) h+='<div style="font-size:10.5px;color:#9AAB9E;margin-top:2px;">'+sub+'</div>';
 return h+'</div>';
}
function RT_fmtHtml(rd){
 if(!rd||!rd.players||!rd.players.length) return '';
 var head='<div class="rtc" style="margin-bottom:12px;padding:12px 14px;">'
  +'<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;'+(RT_fmtOpen?'margin-bottom:12px;':'')+'">'
  +'<div><div class="rt-ct" style="margin:0;">Spielformate &amp; Auswertung</div>'
  +'<div class="rt-cs" style="margin:0;">Zählspiel, Stableford, Skins, Lochspiel und Nassau – live aus den eingetragenen Scores berechnet.</div></div>'
  +'<button class="rt-btn2" style="margin:0;padding:9px 14px;font-size:12px;white-space:nowrap;flex:none;width:auto;min-width:120px;text-align:center;" onclick="RT_fmtToggleOpen()">'+(RT_fmtOpen?'Zuklappen':'Anzeigen')+'</button>'
  +'</div>';
 if(!RT_fmtOpen) return head+'</div>';
 var net=RT_fmtNet;
 var b='<div>';
 b+='<div style="display:flex;gap:6px;margin-bottom:14px;">'
  +'<button class="rt-btn3" style="flex:1;padding:8px;border-radius:8px;font-weight:700;'+(net?'background:#187040;color:#fff;':'background:#F1F6EC;color:#5a6d5e;')+'" onclick="RT_fmtSetNet(true)">Netto</button>'
  +'<button class="rt-btn3" style="flex:1;padding:8px;border-radius:8px;font-weight:700;'+(!net?'background:#187040;color:#fff;':'background:#F1F6EC;color:#5a6d5e;')+'" onclick="RT_fmtSetNet(false)">Brutto</button></div>';
 var stroke=RT_fmtStroke(rd,net);
 b+=RT_fmtRankHtml('Zählspiel – '+(net?'Netto':'Brutto'), stroke, function(r){ return r.total; }, 'Wenige Schläge = besser. Gewertet: gespielte Löcher'+(stroke[0]?' ('+stroke[0].played+')':'')+'.');
 var stbf=RT_fmtStbf(rd);
 b+=RT_fmtRankHtml('Stableford', stbf, function(r){ return r.total+' P'; }, 'Meiste Punkte = besser (Netto-basiert).');
 var sk=RT_fmtSkins(rd,net);
 b+=RT_fmtRankHtml('Skins – '+(net?'Netto':'Brutto'), sk.rows, function(r){ return r.skins; }, 'Je Loch 1 Skin an den eindeutig Besten; Gleichstand → Carry-over.'+(sk.carry?' Offen im Topf: '+sk.carry+'.':''));
 if(rd.players.length>=2){
  var np=rd.players.length;
  var ai=RT_fmtPairA, bi=RT_fmtPairB;
  if(ai<0||ai>=np) ai=0;
  if(bi<0||bi>=np) bi=1;
  if(bi===ai){ for(var _k=0;_k<np;_k++){ if(_k!==ai){ bi=_k; break; } } }
  var pairNote='';
  var pairSel='';
  if(np>2){
   var _oa='',_ob='';
   for(var _pi=0;_pi<np;_pi++){ _oa+='<option value="'+_pi+'"'+(_pi===ai?' selected':'')+'>'+rtEsc(rd.players[_pi].name)+'</option>'; _ob+='<option value="'+_pi+'"'+(_pi===bi?' selected':'')+'>'+rtEsc(rd.players[_pi].name)+'</option>'; }
   pairSel='<div style="font-weight:800;color:#143522;font-size:13px;margin-bottom:6px;">Paarung (Lochspiel &amp; Nassau)</div>'
    +'<div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">'
    +'<select class="rt-inp" style="flex:1;margin:0;" onchange="RT_fmtSetPair(\'a\',this.value)">'+_oa+'</select>'
    +'<span style="font-size:12px;color:#8A9C8E;">vs.</span>'
    +'<select class="rt-inp" style="flex:1;margin:0;" onchange="RT_fmtSetPair(\'b\',this.value)">'+_ob+'</select></div>';
  }
  b+=pairSel;
  var mText=RT_fmtMatchText(rd,net,ai,bi,null);
  b+='<div style="margin-bottom:14px;"><div style="font-weight:800;color:#143522;font-size:13px;margin-bottom:6px;">Lochspiel (Match Play)'+pairNote+'</div>'
   +'<div style="font-size:14px;color:#143522;padding:6px 8px;background:#EEF4FB;border-radius:8px;">'+(mText||'–')+'</div>'
   +'<div style="font-size:10.5px;color:#9AAB9E;margin-top:3px;">Loch für Loch; „X&amp;Y“ = X Löcher vorn bei Y Rest. '+(net?'Netto':'Brutto')+'.</div></div>';
  if(rd.cnt===18){
   var nF=RT_fmtMatchText(rd,net,ai,bi,RT_fmtFront);
   var nB=RT_fmtMatchText(rd,net,ai,bi,RT_fmtBack);
   b+='<div style="margin-bottom:4px;"><div style="font-weight:800;color:#143522;font-size:13px;margin-bottom:6px;">Nassau (3 Matches)'+pairNote+'</div>'
    +'<div style="font-size:13px;color:#143522;padding:5px 8px;border-radius:8px;background:#F1F6EC;margin-bottom:3px;">Front 9: <b>'+(nF||'–')+'</b></div>'
    +'<div style="font-size:13px;color:#143522;padding:5px 8px;border-radius:8px;background:#F1F6EC;margin-bottom:3px;">Back 9: <b>'+(nB||'–')+'</b></div>'
    +'<div style="font-size:13px;color:#143522;padding:5px 8px;border-radius:8px;background:#F1F6EC;">Gesamt 18: <b>'+(mText||'–')+'</b></div></div>';
  }
 }
 return head+b+'</div></div>';
}

function RT_rView(){
 var saved=rtGet(RT_KEY)||[];
 var rd=null;
 for(var i=0;i<saved.length;i++)if(saved[i].id===RT_state.viewId)rd=saved[i];
 if(!rd)return RT_rHome();
 var foreign=RT_isForeignRound(rd);
 var foreignLocked=foreign&&!!rd.done;
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="RT_go(\'home\')">&#8249;</button>'+
  '<div style="flex:1;min-width:0;"><div class="rt-h1" style="font-size:18px;">'+rtEsc(rd.courseName)+'</div>'+
  '<div class="rt-sub">'+RT_fmtDT(rd)+' &middot; '+rd.lbl+'</div></div></div>';
 if(foreignLocked)h+='<div class="rt-note" style="margin-bottom:10px;">Diese Runde wurde von einem anderen Konto geteilt \u2013 hier nur ansehbar, nicht bearbeitbar.</div>';
 else if(foreign)h+='<div class="rt-note" style="margin-bottom:10px;">Gemeinsame laufende Runde \u2013 du kannst hier deine eigenen Schl\u00e4ge eintragen, solange die Runde noch nicht beendet ist.</div>';
 h+=RT_fmtHtml(rd);
 rd.players.forEach(function(p){
  var t=RT_totals(p,rd);
  h+='<div class="rtc rtc-hd"'+(foreignLocked?'':' style="cursor:pointer;" onclick="RT_editRound(\''+rd.id+'\',true)"')+'><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;">'+
   '<div class="rt-ct" style="margin:0;">'+rtEsc(p.name)+'</div>'+
   '<div style="font-size:10.5px;color:#8A9C8E;">'+rtEsc(p.tee)+' &middot; HI '+p.hi+' &middot; SV '+p.ph+(p.only?' &middot; <span style="color:#B7791F;font-weight:700;">nur '+(p.only==='F'?'Front 9':'Back 9')+'</span>':'')+'</div></div>'+
   '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:12px;text-align:center;">'+
    '<div><div style="font-size:19px;font-weight:800;color:#143522;">'+t.br+'</div><div style="font-size:8.5px;color:#8A9C8E;">SCHL\u00c4GE</div></div>'+
    '<div><div style="font-size:19px;font-weight:800;color:#187040;">'+t.stbf+'</div><div style="font-size:8.5px;color:#8A9C8E;">STABLEFORD</div></div>'+
    '<div><div style="font-size:19px;font-weight:800;color:#2F6BAE;">'+t.avgPu+'</div><div style="font-size:8.5px;color:#8A9C8E;">PUTTS/LOCH</div></div>'+
    '<div><div style="font-size:19px;font-weight:800;color:#B7791F;">'+(t.fwPct===null?'\u2013':t.fwPct+'%')+'</div><div style="font-size:8.5px;color:#8A9C8E;">FW MITTE</div></div>'+
   '</div><div class="rt-hgrid">';
  for(var hh=0;hh<rd.cnt;hh++){
   if(!RT_holeInSeg(rd,p,hh)){
    h+='<div class="rt-hg" style="opacity:.38;"><div class="a">'+rd.nums[hh]+'</div><div class="p">Par '+rd.par[hh]+'</div><div class="b">–</div><div class="c">–</div></div>';
    continue;
   }
   var st=RT_stbfH(p,hh,rd);
   var stC=st===null?'#9AAB9E':st>=3?'#187040':st===2?'#2F6BAE':st===1?'#8A6A1F':'#B03A3A';
   var capped=p.sc[hh]!==null&&!p.cx[hh]&&p.sc[hh]>RT_cap(p,hh,rd);
   h+='<div class="rt-hg"><div class="a">'+rd.nums[hh]+'</div>'+
    '<div class="p">Par '+rd.par[hh]+'</div>'+
    '<div class="b" style="'+(p.cx[hh]?'text-decoration:line-through;color:#B03A3A;':capped?'color:#B7791F;':'')+'">'+(p.sc[hh]===null?'\u2013':p.sc[hh])+'</div>'+
    '<div class="c" style="color:'+stC+';">'+(st===null?'\u2013':st)+'</div></div>';
  }
  h+='</div><div style="font-size:9.5px;color:#9AAB9E;margin-top:6px;">Zeile: Bahn &middot; Brutto (durchgestrichen = gestrichen, orange = \u00fcber NDB-Deckel) &middot; Stbf-Punkte'+' &middot; <b style="color:#B7791F;">Gesamtanzahl Schl\u00e4ge: '+t.brRaw+'</b>'+
   (t.pe||t.sa?' &middot; '+t.pe+' Straf / '+t.sa+' Sand':'')+'</div></div>';
 });
 /* Hinweis nur solange zeigen, wie noch NICHT synchronisiert wurde - nach dem
    Bearbeiten/Speichern (rd.promoted) ist die Info nicht mehr noetig. */

 if(!foreignLocked){
  var _started=rd.players.some(function(p){ return (p.sc&&p.sc.some(function(v){return v!==null&&v!==undefined;}))||(p.pins&&p.pins.some(function(a){return a&&a.length;})); });
  var _ended=!!(rd.promoted||rd.historical);
  var _primLbl=_ended?'Runde ansehen':(_started?'Runde fortsetzen':'Runde starten');
  h+='<div class="rt-row" style="margin-bottom:8px;"><button class="rt-btn" onclick="'+(foreign?('RT_resumeShared(\''+rd.id+'\')'):('RT_editRound(\''+rd.id+'\',true)'))+'">'+_primLbl+'</button></div>';
  if(!foreign){
   h+='<div class="rt-row"><button class="rt-btn2" onclick="RT_editRound(\''+rd.id+'\')">Runde bearbeiten</button>'+
    ((_started&&!_ended)?'<button class="rt-btn2" onclick="RT_promoteRound(\''+rd.id+'\')">Runde beenden</button>':'')+'</div>'+
    '<div class="rt-row" style="margin-top:8px;margin-bottom:12px;"><button class="rt-btn2" style="color:#B03A3A;border-color:#E0BCBC;'+(RT_state.ask==='del'+rd.id?'background:#FBEAEA;font-weight:800;':'')+'" onclick="RT_delete(\''+rd.id+'\')">'+(RT_state.ask==='del'+rd.id?'Wirklich l\u00f6schen?':'Runde l\u00f6schen')+'</button></div>';
  }
 }
 if(foreign){ h+='<div class="rt-row" style="margin-top:8px;margin-bottom:12px;"><button class="rt-btn2" style="color:#B03A3A;border-color:#E0BCBC;" onclick="RT_leaveRound(\''+rd.id+'\')">Runde verlassen \u2013 aus meiner \u00dcbersicht entfernen</button></div>'; }
 return h;
}
var RT_LEFT_KEY='golflog_left_rounds_v1';
/* Mitspieler entfernt eine mit ihm GETEILTE (fremde) Runde aus seiner Uebersicht. Die Runde
   bleibt beim Eigentuemer unveraendert; lokal wird sie ausgeblendet und in sbPull dauerhaft
   herausgefiltert (golflog_left_rounds_v1), damit sie beim naechsten Sync nicht zurueckkommt. */
function RT_leaveRound(id,confirmed){
 if(!confirmed){ RT_pageConfirm('Diese geteilte Runde aus deiner \u00dcbersicht entfernen? Die Runde des Eigentuemers bleibt bestehen; du kannst sie sp\u00e4ter \u00fcber einen neuen Einladungslink wieder \u00f6ffnen.', function(){ RT_leaveRound(id,true); }); return; }
 var left=rtGet(RT_LEFT_KEY)||[]; if(left.indexOf(id)<0){ left.push(id); rtSet(RT_LEFT_KEY,left); }
 var saved=(rtGet(RT_KEY)||[]).filter(function(r){ return r&&r.id!==id; });
 rtSet(RT_KEY,saved);
 if(RT_round&&RT_round.id===id){ RT_round=null; try{ rtDel(RT_ACT); }catch(e){} }
 try{ RT_hydrateHistoricalData(); }catch(e){}
 RT_go('home');
}
function RT_delete(id,confirmed){
 var saved=rtGet(RT_KEY)||[];
 var existing=saved.find(function(r){return r.id===id;});
 if(existing&&RT_isForeignRound(existing)) return;
 if(!confirmed){ RT_pageConfirm('Wollen Sie diese Runde wirklich löschen und damit alle Einträge verlieren?', function(){ RT_delete(id,true); }); return; }
 if(id.indexOf('hist-')===0){
  var deletedHist=rtGet(RT_HISTDEL_KEY)||[];
  if(deletedHist.indexOf(id)===-1){ deletedHist.push(id); rtSet(RT_HISTDEL_KEY,deletedHist); }
 }else if(existing){
  existing.hidden=true;
  rtSet(RT_KEY,saved);
  sbPushRound(existing);
 }
 RT_hydrateHistoricalData();
 RT_go('home');
}
function RT_export(id){
 var saved=rtGet(RT_KEY)||[],rd=null;
 for(var i=0;i<saved.length;i++)if(saved[i].id===id)rd=saved[i];
 if(!rd)return;
 var blob=new Blob([JSON.stringify(rd,null,2)],{type:'application/json'});
 var a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='golflog_'+rd.date+'.json';
 document.body.appendChild(a);a.click();a.remove();
}
function RT_today(){
 var d=new Date();
 return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
}
function RT_nowTime(){
 var d=new Date();
 return ('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2);
}
function RT_fmtD(s){return s.slice(8,10)+'.'+s.slice(5,7)+'.'+s.slice(0,4);}
function RT_fmtDT(rd){return RT_fmtD(rd.date)+(rd.time?' &middot; '+rd.time+' Uhr':'');}

var RT_MONTHNAMES=['Januar','Februar','M\u00e4rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
/* Eigene Datum/Uhrzeit-Auswahl per <select>-Dropdowns statt input type="date"/"time" - siehe
   RT_rSetup. Baut die drei Datums- und zwei Zeit-Dropdowns anhand von RT_su.date/RT_su.time. */
function RT_dateTimeSelects(){
 var ds=(RT_su.date||RT_today()).split('-');
 var y=parseInt(ds[0],10), m=parseInt(ds[1],10), d=parseInt(ds[2],10);
 var ts=(RT_su.time||RT_nowTime()).split(':');
 var hh=parseInt(ts[0],10), mi=parseInt(ts[1],10);
 var nowY=parseInt(RT_today().slice(0,4),10);
 var h='<div class="rt-row" style="margin-bottom:8px;">';
 h+='<div style="flex:1;"><span class="rt-lbl">Tag</span><select class="rt-inp" onchange="RT_suDatePart(\'d\',this.value)">';
 for(var day=1;day<=31;day++) h+='<option value="'+day+'"'+(day===d?' selected':'')+'>'+day+'</option>';
 h+='</select></div>';
 h+='<div style="flex:2;"><span class="rt-lbl">Monat</span><select class="rt-inp" onchange="RT_suDatePart(\'m\',this.value)">';
 RT_MONTHNAMES.forEach(function(name,idx){ var mv=idx+1; h+='<option value="'+mv+'"'+(mv===m?' selected':'')+'>'+name+'</option>'; });
 h+='</select></div>';
 h+='<div style="flex:1.3;"><span class="rt-lbl">Jahr</span><select class="rt-inp" onchange="RT_suDatePart(\'y\',this.value)">';
 for(var yr=nowY-3;yr<=nowY+1;yr++) h+='<option value="'+yr+'"'+(yr===y?' selected':'')+'>'+yr+'</option>';
 h+='</select></div>';
 h+='</div>';
 h+='<div class="rt-row">';
 h+='<div style="flex:1;"><span class="rt-lbl">Stunde</span><select class="rt-inp" onchange="RT_suTimePart(\'h\',this.value)">';
 for(var hr=0;hr<24;hr++){ var hs=('0'+hr).slice(-2); h+='<option value="'+hs+'"'+(hr===hh?' selected':'')+'>'+hs+'</option>'; }
 h+='</select></div>';
 h+='<div style="flex:1;"><span class="rt-lbl">Minute</span><select class="rt-inp" onchange="RT_suTimePart(\'i\',this.value)">';
 for(var min=0;min<60;min++){ var ms=('0'+min).slice(-2); h+='<option value="'+ms+'"'+(min===mi?' selected':'')+'>'+ms+'</option>'; }
 h+='</select></div>';
 h+='</div>';
 return h;
}
function RT_suDatePart(part,val){
 var ds=(RT_su.date||RT_today()).split('-');
 var y=ds[0], m=ds[1], d=ds[2];
 if(part==='y') y=val;
 else if(part==='m') m=('0'+val).slice(-2);
 else d=('0'+val).slice(-2);
 /* Tag an die tatsaechliche Laenge des gewaehlten Monats anpassen (z.B. 31.02. gibt es nicht) */
 var dim=new Date(parseInt(y,10), parseInt(m,10), 0).getDate();
 if(parseInt(d,10)>dim) d=('0'+dim).slice(-2);
 RT_su.date=y+'-'+m+'-'+d;
 RT_render();
}
function RT_suTimePart(part,val){
 var ts=(RT_su.time||RT_nowTime()).split(':');
 var h=ts[0], mi=ts[1];
 if(part==='h') h=val; else mi=val;
 RT_su.time=h+':'+mi;
 RT_render();
}

/* ===== M0.3: Tab-/View-Registry ===== */
var RT_curTab='runde';
var RT_TABS=[];
var RT_VIEWS={};
function registerTab(def){ RT_TABS.push(def); }
function registerView(def){ RT_VIEWS[def.id]=def; }
function RT_tabById(id){ for(var i=0;i<RT_TABS.length;i++){ if(RT_TABS[i].id===id) return RT_TABS[i]; } return null; }
var RT_IC_RUNDE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABgFBMVEX6/ftQpVQth0cVdjs5k0xHm1EYeUEAAAAVazXQ59ctekdVlWqMu5QcgUOv1LpGhlokeTuqzLa72sRPjGWZxqbb8uN3q4doo3hEfFZkm3Tb7OJ6tIoLWCUmgzwva0LG285UqVQnaToAfwAUdToAVVXZ8d0TdDsdgjkA/wCUuaSOwpm74cdWm1hXs1wSdjwTdDpRpVZRpVeErJEScjgTdjxRmldKm1JUo1ji7uYHVhwVbTcRdjkadUIaeEIA//8me0xNnFVPm1lTplhWpVxdomd/f39mpWxvqXaCtYkNbj4PbDkRd0QeeEIAqlUA/38qfyooeE1SpVJVqn9iiXVinHVwn4B/wZN//3+b1Kyluay3zMHAz8cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACTAbJqAAAAgHRSTlP//v/+//7+AP7//v7+/v///////////////////////wf/AhAD/7X/Af///w7/eJt4vv8qSCqcmv//1ttQnAEKUNZC2/8CTKPWJUIP1gMCBtYlBg0N//8C/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACnfqNQAAAVeSURBVHjarZiHeqM6EIWFZFABm2KKDXbsxOk92d7u1ru7t/f+/u9xR0KATHDiJHu+2Aas+TkjjSQHREvNKf3946fPh94Nahocfv708TcVqITU+9eUPnry3rIsW7601EkpeSL/7OZbeWy9f/JIBVegOT0+t+6kE+v8uDQlQV/R44sT6446uZgDQIHm9J11L72TnhDdonPrnpoDBO3/OL+4L+ji17/20Zyen9wXdHJO52j/F+sL6NE+ok++BOgxRcdfgmPZx+hN+1L92RSwtVTmnXqDHi9jbpBlrwA+Rm+Xzj9wJLXD+Q7aQR3iWTfpLbKNdCx7gG4S7wTZH9DSdZvr5lF0DUh3XXmgVwy3Barixz7nK0D+UodVBwCqh8ZMzRVekA26HfWUWqOgQZZm9RpQQUjgDlaBcJtkgKQaEP6TYLxH/FkblCtQzAvcBbLboDE+3NsjOL3a5xKkutLDa4H8Q+LGeUcfJQA6UkdLpDaoHjUcGUlFg6Y444BgPaAVqXcVhCtQJswBZ0yEFYfZBamaFb2K1AOQGsteOaidoDELYAS55gRHKCZB2QUDLDtMRVYg+xoQnk4JYbHiKMQA75WkrFfLRU11maCxAfL3KlAYBKHkTKdTSTrEJqg80eVagUIRhPUU8dh0jwgYwYEIYsmBdlOwFuMOUG8JNGRsMhE1KSPEh5OZIMAJZcA0hiQxNkjdoNAVmyJtkpvJUuCKM1AcD0YsMANXgKDskitzTDBPc3AhpxzGa4DyJIE1kjd6GuGGk8rawj2VGV4NejoajYTU5ubmhtamECStOJnyU7bHFakDxMVR6cL1a0NFQCA8anOMQAnCvdqhAvm6V9Ksnqg+G8MXKpVOTg8PkcoVK4+4BRrXk20Ch0d4Cs3ckmOSVDiADPUCE1RoUO4zmZdQnAQlrurj6vZayyAsC78GeTo1nRcU4BTqUnLwVV0HKjJd5m7FwZITYLwmSBReenmZFhinIJdhmZf6+gjWR9LJwX4XyHeVsBi6Q1+wEOVChUcwfCs43Y709Chc+S7kgpLKePjOJcXfwfqOEmP4czZUHU9KjosGdwBJR+HkQJ38MZDLiZ3cBjQyQUM5V/WmSTB4jNYH1ZUth50RUlqKfOalw9uA8pHexDKX5x6A2ADlYRYQe2cM6EItjYKsARKB2IAlRBBYbxljhIkxe/aMBULAVMnYMORJEqWiRUJLF4gCxWEMgvU2jgWQgLcxDqMZ537hsWoFni1hRAeIj6q5BolsTDZG44NZfUU021RkRjptUGSAZEFeXpq/a8Bgs0uVVQrqgzRIdDoqK9tUzETCje2gwgBIdPVR0qS2rIOJy/8z9vK+5GBHg0TtSGCmKhutAsUTN5nNak9+X8txFEgIlZ6QINja+aYXKrm+fB8MwlouOPo3r35+5bhfS4L6mgJYBcp9IMOWNPKHfqmROvNhk2IbCRj6R/sjlR3HIRqkMOCP3fDLP4Rd4IDnfIYgP0wUgqgPgeBNdlgpdnDDPxDDiYd4mIRPOXKZYwij75U34miH0fWgI8ayKEER4pJDtB3Qz+hVv/RXXiQOHjZyaw3VK0tdB6aeO07hhw8EOaRC9c/Qy74C1HBSCaZrW3BJNWH6QLNkPi/Rdyqv2tLt1ES+RvRVnzimpVuBKgNnFNEHpTttcVXjlo9lDiHfULRNT/utrmhaE8e8qO5n3KAxdEq3Ed16vUu6Zd7yyp3M892fttRDlgXpjHDIKhBpgRbyIQul2/ThynuvpW8BoR5E7dPFbv/OmN0FAPSjsW26OL0r53RBf2ge1m1R+uDsxe0pL84eqOAaJE3RxcPd5+wWer77cKEClf4H6yKAPmXt1KwAAAAASUVORK5CYII=";
var RT_IC_DETAIL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABgFBMVEUuhrg5l8cmeKtBotL5/f0cZ5ohbKJBnMoiaJkAAAAcbKKIu9IxjsDQ6e9PlrY+odFIh6kcdKgxdZuUxdew2eVrqcZ2tM5nmrOmydXF2+PZ9Pew0t05kbwPWosA//8AVapuo7oAAP8Af39Vqv+84+tGmcgeXZkaZZkcZZgAf/8dgrFJos9FreKJq7gcaJkZZpoZZJQjZJojaJZBfaFFns5CncldobyZ0+UdZJMeaqEia6FRnL1GnsNVqqpHp9RGodB4s9HH2t4aV30cY5sba6IZa6EdaaAAf6oqVaoha5ogZJYqY6ojbqAndZw/n983l8c7m8w7nMoqqtQ+o9NKgJ1OibBJk7tGlbxAk7pImLxBm8hCmshVqtRQocVFotBJsOR1nLBhpMVoqMl9wNl+wuKCr8KQsLqLzuDi7/EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqHq6HAAAAgHRSTlP//v7+//7+/v4A/v7///7+//7+/////v////////8BA/8BAgP/FBAptwL/t///RnibDtb/Rpv//9iaTgspA3fb1v//Ene92wYGTKMSnQ0IJXmbBr3/DS1QndZ51gZMmv8NTKP///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHuCUrwAAAXfSURBVHjapZiHdts6DIYhStSgLVrLsi2PJs1s0nTv3bv33nvf+/5PcEGQmpbdpsVJtQh+BH6AUo8hINt9HARf/3z6LM3zwUta+uyP338Lgse7mgB0vBgEj355atu2VZqnzfKsXlNj6P709jc0uQTtBZ88sS/b9miE/+zz2ZOHON2AVsHB6a/68Wi0HbQ+evn0AAEE2gtuYU7nmNu1WyomCC4FB30TzpPiAUJgtfriy+3TXpzs6U+rFewFn122RueVuKPTD8EerD4djUavCbKsRysIPrdNQKONebyoLazR7QAOLDxbdm9MI4uC3RCxXthDHwQ8hFu2blKbjnjwqHFV71oW3WxVcKSmoOO3cNv2KrMaR9VaWRHajR1RuuFVvTAtaNnfwY92G+OZaZ5MHbTCNiA1yYxY5YpWdba+Bz1xbU8u7uw76Q6SsnqXmrO5r7c2XRmQ1+EtUie0F5A7Tl7Bq7PJz/aqd4RlSajHrQoE47AYLOhi3PciIX29VkQ1qDaQmZNJ6ATSZaVZlpraev0gGBT7d2KwNpuX25CpSoR9qTWySqdZNt5EAi8NC89zyHLdcT0grHkmQ/LpJYGcY0tkkM/JKa0yl9DyygtnEA9osXCxjhliMZ3UBoBxakBVBFD7A2JCCbCvw7bXwxkXzlwyGGe2zKYYUzHuA0ml3w5YTIOKtYgAe+sOyLRwnD8hR9J+Q8gaBLQjBmCdjAmUdTXCQg1UZzhZjoKgDDk0XGR9g3HTdCCRMjhpk2A/lFHqFAMJQ9IL9LmUtwaB2lkhCnkSg5QyT1sdEIUZdkbYikLhhjWo4oIqhIxPMOpptwMguwtpOIBuvkMlDQYHEZRjwyF160DOC6c0WS7C0pRlmVzHoNFBgRZDYyx1OobJ4XN0te+yu2lTE4sGoAUC82QIsgvCGuqxf+EvUgwloTVNMESpQZUlRQeUGVAuxzZYJnDotSZoyMbZNM2jSQUK9YDa4KAy3MxpgioXFtZqaxA2V8dna0QVqBZ9HGvQi60P1BB9yvB2Aa8KgrAj0quCGrnJl+SwflDUEeklQBseT6uWjOF1LN5pqf3qYtegjPUlwVg3mx6NGHqZ978qG1MzmHraY0Cj9Bd1wHo8rjRyojYENiDboOopx4+X83yqQS2L41ifhTBX9Qo6Yx1gEzQ9o0ZqR7QznqhTEo0HuWwOJGB4rZiTGSLOJmsgjp0a+jFLdOrzZA3EWuvGidojE9pyk8YIV+jnnHiOWivl66CmCersJOqCiD/j/Cs8Mo7DRbIdRCvOlwZUP6ammPkcv6ARj5WQUbwVpAkaVFctxvt/QgTFMJFMCH+GXbY1IpIyTDhrgzCxLCFQLLgQAgVL/a0gEvlvLm62QCqxCApnlmAvCcGjsBlQLyikgIzkzQJgthgRJ47ykmIbSEs6ERoUlnVJ8DN8NsCk/zuTKLQq4A5vReR3Sp/Q24OzEqTrIljjs7lcKs6Yt6aVILcMaFpON91UFng6m83nqgvDydIPVZ4czXWZi6ZAJVOTuC49L9uy1tNHW/rYX2/wpVqMfkSIuEsmeAI3CEG3CqT+u5ZhdWMDchs7R6gEsbNv1p+rpQZxcQM+YopgQK6L2WMLCWH0HbSEEEkWplywWYg2Q9spI4qvwQMNcX3DTiY3MXcVUpxMJqZorhCuAgnuc3Wojbu+j0/EFbjuGpJbpssZzhKUqKj0U6oqmh5xdcYUgKIJfh2C+wzjQ591q5xpgV4XPcDFtQB2j9SFSmaDo3HvvfXxQijS0S5cCK7GnFQxwpVqbTW1qu+7anm0+GpwAXYvvXcsiITJug0ZGzc0SS+hBXY5qk6mpoq33720C8HF4E265Z3pepKJ0BdlSvgioopUKO6KDxECQXAhuIJ5qee6oPTnazesbRkGziAf3jHXvYII80PU4XHcGfabl33zSxPHh+UPUSqmw7eU9ptsM0jwq4cqnsaPdUf339nMqlLt2L1rR60f6yio4OMHH9wohdpmZXT3jt+/Huhw0P4Hwy6ES+PwVOIAAAAASUVORK5CYII=";
var RT_IC_HI="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABgFBMVEXYZy7LWCTkcjTDSxm7Rhf+/PfJUh3hbDAAAADIeE7359XapIa5VSjqyK/Ul3Lu0rrw2cbOg1nLiWXbcTbBTiCxSiHktJW6dVS4Yzq3a0j/AAD57uDEbUHkvKOqVQDYnoP/VVW5UB3bpHrYtJq1PAzhqom1PBq5Qxd/AAC8Rxv/fwD98962RBm6RBexRBjXWDHbcTriczZ/fwC5QhfFShfBRBfUZjPIazjVbjfZcDbdcjnUeE3Ve0rSiWPXmXnbxbT//wCZRCKfSia1PhG7RBGlTCa/TSC8TiK/Xz+7ZjOqYEK9dj2wdU6/ckmwdWK/g1++iGTBSRvBRRrARRjCRRfETiffbzbXbTjMcD3ccznecjnHdUTBc0rQgl3IgFjbu6HjbjfjbzHhby/ifzj/f1XpekHgj1zhnHPgo34AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACtPor0AAAAgHRSTlP+/v7+/v///gD///7///////7////+/////gH///8D/wP//////xCzAkoC/yea1wZ4vQJ5D3cULZya2wxHo9b/AQ+dLQ9QndYID9b/DVAN//9Cmr/bDVDWGUK/JZ1M1v8ld5sSBu3///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAEb9MAAAZHSURBVHjarZgFm+M4DIbl2k7sMLSd4jDsLO8t0+0xMzPT//8FJ8lJmkw70JvT02lT23otfZadTMGwTbaN+eDZ85cPwsa28LW1RR+r7eDl5z9+ZMz2xBGA318y5uHjJ2WvhAtbCb1e78njh+xcg7bNrV+x2fd76xmNv/0OulegV8yDOz3wK1uLhMO/+wYBDNo233bmWNf+fEYxgblqfu9d0p4iBCZX/7hzWdCdp1cnsG1u9y5tt802TH7p/Q/2/QTMbx2F/Xo1/GZhLgJ6ZOCBv2Kp2oUAYOFcGLwLX/Vaw3wHocqtSFDmcZAmAJ0wl+YtP4RHPVfxZau1rKsTyiTWZIQ6vV6x9Qf42q83T69cFKQLy+5mRIkDfMsOcmKdlttP0N6nbkp3bYuD+BpjcrBDQulsmOSWO51zWfo8Nb6gIO8OqVcm4XAeZ1OXUoiehE5S/q6DOB6GSUmUkuVADx98yOszYcGCykUHaZiDAJ8bBeRhpusemr3Si0VgkH/ypEF5gywOEwtCuGFOeIA8CeMYcVkzqV9nlC+fWCLWga0zheZ08RsJhjqFRX9lq0EZ+CdWwF9ciwWoZatB1cAyL5LcgTCrpKj61wfZwOlKIFp/eylQ6dJcgGANUCwakFsgQaDgLFBxHiitQBmBXPN8HZDogji1aaXRGqB0kU8qGpB2ES0iPh/UEiazFkprNxwIjUHehcSe62BGnwzCjKbVDpsySIhUD5dBdgVoj5MQNWhhM+ag7gcXAkER6PwsUKCTJZDYWOb8lb+/mzQg1Mjmef5x0ICs1vlKEPq0GiDeTQLcYdXcOlYSzdtJa7FFQmItgSyAi9d9FfmwQBae/tQ4m9Lys0VpExEtajNeLECiNvw2293l797uUHZAHoGm4Lkwh64MGjfRAeEsSbyXhU6GOELvCuShNSAv5BRnVrRsAeLgUv1JqAMXfRp5whsFnYi0AwUYkJ3qsAOCJiLMK9Ab4yykUBKtCyUkgXDbkXtEB/9MCk+paEdEdKxzoo21U0t08HOcUVJICCIpedXccAIFIGU0LP5OIjXHuqCUBdT+G9CiDlO6I+aeiDCkeIDToHmOhNWElwpzD1HA0TwcSQ/Sf8QqkKd26OCg5EiSEJOjEvIYRZdCYTHOFUY+UpG1EgtuNUhKhQDKTWxQ/SleMOZwWHIckFCywGcKTH6YJapx76TGO1tPZ04wmlfIZhYPxUehEukE0/FeXeqngWgnCZYpGyt0rxeHOSFHR6Bc5bk6FeTR01DBrjsUU6FkIyCdbXtRA7Ke117/ZdAeHhJ8rfA40fORm1UNkmodyJ+Py04ZnQB5oLNCJ1XEaoyJBlg1Ug1syvG5/SKC4AVVyekgXNnENiAhoz16vEqigtUd1auI04XLoKgVkNXBIGdQNcohKJMgGUhOy6O4X4S1APXIDgjrNseay1VLxihhVDjCBWR5sdpmeq9oQM52EOS1JLI4AeBQ+qzasYZ3C9QJKRJ7pMLNireoor1nPW9njKBWi6QJcWumVtY1jS2KMdyDfbGlfSMpwIbjKQZ5nW0i5T5qrtjV7Q5HqGBWz/epfTER1mwFEh3QIMJTJBvtsC/PB6pCSRWNUh2MBy7ERjTJINlRTdmMn8/xcTSvQFE8dvFIm/JT8zSLbcOWpByD+g2oz7UTVrfDUFAmGHWit/YdqekbCtk1BA36uJ28Ps3Q7+Of3LeOQ+GjthGeUdNiHEVEQihZoeQySDCgz5y+a+QH8zFf29TdtoPAOY847UgugTbgbfpgI1K/70m4pjO8/bsBxTWXzNbAgek803Y5ovfgLVGDlAOpIrWDcZxIVwpNorw4Be64aJgsgeRrcFxjMCSXnaD9rmo5o6ClihKKi+AECMe/CW+oOrOVpjb4/7WtU7ob0KtgbsgzOHK/iMcqmh+c7G+74NUNA5PrdUSu6wRSgWon2gGxg3O6PoFNc7dRSa4ITbXel0FMUvKu2YTJ5NbRQu/VSS5H2nU4ujWZgLli7skzSKpCVHmvMKkOEQLGbJpPu0MqZ+cq6wa1GoODjhHBP0RNzOHnp4w63+TRoZnUP41tmsP78r+gMOT7hxRP/WPdFWNev3FTyXUpX3x2nZ0bkJkg9d7x0c2BUoPBoDN+wC3Uwa+F3Tw6/hKzqX4+/BcSlnsfyfaIEgAAAABJRU5ErkJggg==";
var RT_IC_LERNEN="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABgFBMVEXXnCbsuTn+/vfzw0Lzwz3jqTDZpC3r1ZEAAADpvEX899LZtFXy5a/lzIjlyHHPlxrt3KfUt2zTqkry68jEqGr//wDcwnHz4ZjDjBP/qgDgvWnu03b/qlXXnSbUoR3csTz/fwD/00X+9LfZnR3RmCbVmSXyw0TVmSLYmiTPmy7lqxvwxUl/fwC4hRPMjh7Rmi7doCTbtzP/AADgpSzsuTjluk3vwD7wxk3twUvyxk3zyEzox3TmyoP/1FXv0HC7mUS+mlHCmUzMn0HUqireoCTcoCbBoGDfv1/du1Xdu2bbvGLbumvXu3LfwFrXxInfx4bd0Jnf1KX/f3/gnyf/qirvvzzgt1Hyv0Hkvk7tv0PqwDfrxHX//1UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTHjkNAAAAgHRSTlP+/v/+/v7+/wD+/////v////7///4B////A///A7X//wL//w0pm75GeNb/dwL/GQ7bCgFMFCmcEkKa26PWBkwPnVD/Bnea1ggtD1Cd1v8N////Av8GUBl5m9YlDQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALc/aF4AAAUUSURBVHjarZiHdqM6EIYHBJIQQrTFzq6TzU3ddrf3fnvvvb3/c9wZiWZKEq93fDBY1nz6f40E5wDSRrUr5b9vXr4SyYVDvHr55gcpdytHAPv9gZSPn79gG8eL519J+UsH+k/ev8UOWOCCzq5f0Aarj2EwdutLuduAKvno9KDNw3ODaVt62CHu4PQPWTnQrnw207Xh2ZM9JsQx9ow0Ac7PU8ZGVqye6YlZN05XTxECVfX6dAIUzIKCHrG+Pn1dVbAr/zxY69QqCoJJRGAddqPixcEtuQvVP41/NprZCU8B68bpiX9cgXzCxhPMgvV6rcHaIXuwvyQ8GhWhNt+nNjXzvMEqct28IPoafsdTb8xgUBe2nuh56yyPeQG1sW/gCfMmHLjwgnb2SYy3OoyIRRLqtibYt/A3UuciYFHEvAjD5QjFlkqwyBuDvgMcgXrWv1sotmBb5K0FgXxfaWEGf3jRAiIHav5pXWFLEI1AkfAplF6ydVAOti9msB4pGhKGIN/XM6BhyjSpASk99NaALhgOpO10bwtaLc1kxsagmX8mFEUmejfQsEX7OtoeFBmFRRHhttbqVaL5zTkQuyCI9CjBb97cVNGwarRKYs5W051DcxZoMKbhnrfyDRcaQwjWmz4TLQ73jTDsIiDOV5rFpYpNs6fcajBaKYUgTrtfjXf/CBRy4Yt9g/Od1CS/NLQmMN9wc8i5dvzoTBCVnWsV72s0pxuS4FRMnLv9RMWcu8oaLwynQCG1c7LPY6XxUDxeAyECp0x9v3JYHIhFfAwKKbCH5isBBk2IWocFgaBEXeqfVCx8U5QWtFQmnAHh7uCGhsZD+XGhalAqfFUYVSrl6xK10fRhL3/J10BhEw7ka2tu4dPRgjQXZVkrzHMCXdW0lTDNs59LEHagDP1g2RO0srDmstZahlJVTVp0oDqQdwn4CISmrDlVmyOQVeSsqnhhQdS7UzEAZRZE5pbWXN6AVJyrEsMv0ba4KIjMKQPa1cvVT4DWqOnnUhurM+ZngrQDqYLrQ5S1usrLZkHmfEnbTxsLt1VLzlWE48dKXOU8ovXtQCqH2BjDwe2dcxQ1ILUAY1IQyw7k+1leFEVe75wYsr4ijiDeB0G96xXspIbWVQ9Ezc3FUJEF8V754UqzL27DUvm2Qj1QF6RoAArtT+5AaQPyswIiEbmCXRDkrvgAhIugAL4JyFqjbxiAfJVwOAvUTjZmW5CLMQjvjnk2B0o7ELlZA4kRyM3WLAjCNrsBAcVGINLfqahBAC0onwIlM3O0IUikDQgfSevWKBezLQjsZQuKaIq1WORxHOd5kikC4XIvxSLGHYKNSUY3phhvm0mbycGCoAeKhSm6ljSFXJvUiBx2dlLXgm1FbvYRZNKu5yXoBYFSoH6JyMoSH9mmgB1Mhp3bECcZ3UUyVMYtjkAwB9IAxY9a9dakJi07sCj7CzUzCMvmQbj4ynI01zov8nErPQmSOdCoykr5Z4S6sga60f3gcR5TYag8dKb7WKMlc2WMe1H0NPAv4CSEcaSuPBif4ALAJ1pSDHtQ9Xqgj+AanBMkjZ/XCT6Gu/Be4i3ISW8bRngioTp+H4KOK7gsr28tKbwuL0NV/ba3JSnc+7Sq6CXLEfy6FQeO6CWLlJflNb6FppBfQ0T9IurOu7sL9+40L6JI09F1JG9OwcfHZ0ekp3lZ96GUxyf3+IaskN/7/NgmtyD5AKn3H+7d2IDEb+w9vItuHjjC/2RjbKyeuqDqAAAAAElFTkSuQmCC";
var RT_IC_ANALYSE="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAABgFBMVEV0SJFRKnNlO4VZM3r9+/2BUZ0AAAB6VJKATpyEVKJcNICEaJfIus/w6PKsmLhhN32Zh6rSx9dlR3ytlsG5p8N9YpCKdJuReKPl2umjirSzo73d0+FOKHRVAFVeQXhOJm9/AH9DHWdPKHJQKHJOJ29VVaqBTqDBrcrZyeLb0d4AAP9NJm5OJnGLbaL/AP8AAH9tRop4TJJ6TJh8WJtzVIyqVaq+scVzTI10TJB/f/+VeKqjirc4FF8/H38zIlU/P19fH19EJF9bLYJSP29VVX9gRHx9TpR+T6B/Vap1Yol+bZN/f3+AT5eAT6CJUp6CUpuFUp2AVpyCVKCEUKCEVqCGYZqMbqSJdZyMdZ+Zd6qVgKqahqyfkLLgze0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7rSEIAAAAgHRSTlP+/v/+//4A/v7+/////////////v///v///v//DwP/tQL/SJvYA/r///8BKXj/AQIWRr4NmwP/LXgCo9b/CA8ICP//UAYl1v8GDdYCnXcleZvbmr3bTEwNUA+d1v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN88GoAAAAYpSURBVHjapZgHf9sqEMAPDoNsDUuKbMlxmjSjGU3Svfv23nuP7/813h1oIMV20tf7xRIg+HMTKwbt5I7WX/766vXWKknaRuIPv3712+92oRWw16+1fv7TL6PxCIwBAzcTMx79+OS51rc70FP9+NsxyfF4KKMRf0b8GfnD9noM47F58b5TikH39INH4yCw87tpLWAo4/YeAATjRw8IYEFP9cNjy+m2rRW5RpwPxvCQdQIy8XFAnIBRwfpVQQB2RrNjwPrA55b0gCBw7+UXP4+DkSXRFm6rFbvTH0ParZgbwDHd4PjRJy/vwlP9PXOsvVCDepq4wcCYETiKYajbGdx1/ELfgbvfsXetzk75nhAkvAxZU/rj50AcY4KRWxDUOPj0HugfxqN6GOwGo84+MItMkVRFCLUtEAzEOfyJhsd1OL00pKQEQyAol0rFy6wi1qKXiqZh1A4JzJ/wsHZtCyKV7DYjSJXKSh4PC6UKS2DIqsw3f8A3Y+s9vrjlrZRKJU49kGFFbVOruwJl/oLPrPdMW2NhEkUnKbeWpEWzRppYhZsK7+/OK9ZiUygrcYmlWnoTZaqyTaCkBjX9TMVJGLJP5oVKpT81VqMNoH4woFBZbWCsYtVzhXymypuCIFRxs3hO2dN7JhO1kOtBaU+hhUqauTIa+OQNQECWddonQ422Bz7bAJJFF2JSQM17U5cb498HLVTZmnaiVCR7/qvgpiCaHGHjsDiOOyzJ2UbLBiBKowR5uuTWnNKyXsv9SN5cIy6EAhDRZCrLkYq2MFMWKrWMhjeg/ulxwoROjDgqopgclBQJ3VRWFNEp30+iwtt2aozsVZDfKdU6YYfZE64JXBjVB8sqEFVTOpvZk4DKjRuzWd2vpXBJOmVMvPS974Mkx0yycGeFkMup/qTDJPlcFWtApf8E5ArXykzlfNDECe0UdvU0ANEWUw+b5shK+DjM1DOHsQYk0+tBbEU1R7RGdiBrFNhZcnYTEC3mQGUhTn3TCLQNbDL/mQZk3dcHbSO0j+Jsl7wRGd9VZFouwcWjBbleP2qJgDZA6gynIX09bkOzrwWBA0kLQqualSGoi7U6y0FOSzpyU2zGHKhe6kC1TDeBWJNpnlL5oQ+qBRkke6DalukAlNlpSPXagOQVUNdLuyzGKyBKyhl5qTWtD5r50x0IVoByPjc4izneNwPJlRrlcYZ0bGczlOCDcC1IrgRN8jiuOGDoly2BShSr9l0LwpwOoCQX/foXVCLLuUNtBnnuOIlygYODRGTxtlJnc9bTmTZdBeIS6RIDcYBBnBDIBoBqEDn8rJE906+AhFwvBBbLmL4azDMOwocMmtbCoGk706gqR1/EUIxakpp0J19F5Pg1ICxUnEW1tI1OMkrOUki7Aycqf0FNyQVMED6ISZuloiS3urJW857yaZe3EznBvBOAvH6R68ZQuGUTwSgpW85ElPy9KnEyoQ5dnCvoZp/yGIqJG7EPmv3nIe0/4RVuHjJoUosdoD13+aS2HzqQ+Cbtx7cjV5GQE4do0PUEBwnjU7EVb2GlZiaOBL13YRXTe3tEKZ3kVVQvwqra9Sk+yPUgNMKEQMsAXRMvS4T0EsPUYBmyjWTlMs4F9qUPwsYb24pv5BzyomDP2ea+dZ4QURyFYrIRVKtLoFyw03qCC7Aej9SuqYhdj/ogLx5utFC7PFJHwM6mOafACm2rmRBpBG14WlBbAD6IneBPRLFIqizB/VLNKWARF2zPJyUcXeE0oL7ALJvlVG3xfCIhqTyQ9exXcCiuCoO8LKybJ7hPB3DKKfROFLmxprTxCRx4AEpBQSlI/sz5lhuXmwYQzC5SK1PGZFQ9WGTd8WB3+hh2Ooy4VJVI1UJUiv6ricQWNf+N6U3uVCxUwe72XgTpk+x3OrwH2rON1aCNBVhVSEFqUneXPGaoi7OwEXonDEPoVh5q0OdXXIS9WxeMwTRPH3Gu4Za++GiIQWx9XDcHeSywv9GFvgX6/s6e2Cx4zXOxt3ObTLuvd8Rbyg5BQOtb+uDtOAeEsD9E3dXXWrfRLgLUP43d0u9e/F/OxQesT/Nj3W2tzw+P3pxydHje+7HOKqV3DvbeiHW0d7CjnTok/wF6D3Lm68KoigAAAABJRU5ErkJggg==";
/* ============================================================
   M1-4 Lernbereich - Hub, Rubriken, Quiz/Pruefung, Gamification
   Inhalte als statische JSON unter /learning/*.json (fetch+Cache)
   ============================================================ */
var RT_LRN_panel='tab-lernen';
var RT_LRN_data={};
var RT_LRN_totals={golfwissen:20,lexikon:97,fragenkatalog:114,platzreife:10,videos:25};
var RT_LRN_view='hub';
var RT_LRN_quiz=null;
var RT_LRN_examTimer=null;
var RT_LRN_lexQuery='';

function RT_LRN_esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function RT_LRN_set(html){ var el=document.getElementById(RT_LRN_panel); if(!el) return; el.innerHTML='<div class="lrnwrap" style="max-width:640px;margin:0 auto;padding:2px 2px 34px;">'+html+'</div>'; try{ el.scrollTop=0; window.scrollTo(0,0); }catch(e){} }

/* ---------- Persistenz / Gamification ---------- */
function RT_LRN_gxp(){ return rtGet('fp_lrn_xp')||0; }
function RT_LRN_doneMap(){ return rtGet('fp_lrn_done')||{}; }
function RT_LRN_badges(){ return rtGet('fp_lrn_badges')||[]; }
function RT_LRN_examRec(){ return rtGet('fp_lrn_exam')||{best:0,passed:false,count:0}; }
function RT_LRN_wrongMap(){ return rtGet('fp_lrn_wrong')||{}; }
function RT_LRN_streak(){ return rtGet('fp_lrn_streak')||{count:0,last:''}; }
/* ---------- Lernfortschritt Cloud-Sync (Tabelle learning_progress) ----------
   Der Lernfortschritt lag bisher NUR lokal (fp_lrn_*) und war nach geloeschten
   Website-Daten / Geraetewechsel weg. Jetzt: beim Login mit der Cloud MERGEN (nie
   ueberschreiben - XP=Maximum, erledigte/Badges/Fehler=Vereinigung, Pruefung=Bestwert,
   Streak=neuester Eintrag) und bei jeder Aenderung gedrosselt hochladen. Merge statt
   Last-Write-Wins, damit kein Geraet je Fortschritt verliert und mehrere Geraete sich
   sauber addieren. */
var RT_LRN_pushT=null, RT_LRN_pulling=false;
function RT_LRN_snapshot(){
  return {v:1,xp:RT_LRN_gxp(),done:RT_LRN_doneMap(),badges:RT_LRN_badges(),
    exam:RT_LRN_examRec(),wrong:RT_LRN_wrongMap(),streak:RT_LRN_streak()};
}
function RT_LRN_unionMap(a,b){ var o={},k; a=a||{}; b=b||{}; for(k in a){ if(a.hasOwnProperty(k))o[k]=1; } for(k in b){ if(b.hasOwnProperty(k))o[k]=1; } return o; }
function RT_LRN_mergeCloud(c){
  if(!c||typeof c!=='object') return;
  RT_LRN_pulling=true;
  try{
    var loc=RT_LRN_snapshot();
    var badges=(loc.badges||[]).slice();
    (c.badges||[]).forEach(function(id){ if(badges.indexOf(id)<0) badges.push(id); });
    var le=loc.exam||{}, ce=c.exam||{};
    var exam={best:Math.max(le.best||0,ce.best||0),passed:!!(le.passed||ce.passed),count:Math.max(le.count||0,ce.count||0)};
    var ls=loc.streak||{}, cs=c.streak||{};
    var streak=((cs.last||'')>(ls.last||''))?cs:ls;
    rtSet('fp_lrn_xp',Math.max(loc.xp||0,c.xp||0));
    rtSet('fp_lrn_done',RT_LRN_unionMap(loc.done,c.done));
    rtSet('fp_lrn_badges',badges);
    rtSet('fp_lrn_exam',exam);
    rtSet('fp_lrn_wrong',RT_LRN_unionMap(loc.wrong,c.wrong));
    rtSet('fp_lrn_streak',streak);
  }catch(e){}
  RT_LRN_pulling=false;
}
function RT_LRN_cloudPull(){
  if(!sb||!sbUser) return;
  try{
    sb.from('learning_progress').select('state').eq('user_id',sbUser.id).maybeSingle().then(function(r){
      if(r&&!r.error&&r.data&&r.data.state){ RT_LRN_mergeCloud(r.data.state); }
      RT_LRN_cloudPush(true); /* zusammengefuehrten Stand (inkl. lokaler Extras) hochladen */
      if(RT_curTab==='lernen'){ var d=RT_tabById('lernen'); if(d&&d.mount){ try{ d.mount(); }catch(e){} } }
    },function(){});
  }catch(e){}
}
function RT_LRN_cloudPush(now){
  if(!sb||!sbUser) return;
  if(RT_LRN_pushT){ clearTimeout(RT_LRN_pushT); RT_LRN_pushT=null; }
  var doPush=function(){
    if(!sb||!sbUser) return;
    try{ sb.from('learning_progress').upsert({user_id:sbUser.id,state:RT_LRN_snapshot(),updated_at:new Date().toISOString()}).then(function(){},function(){}); }catch(e){}
  };
  if(now){ doPush(); } else { RT_LRN_pushT=setTimeout(doPush,1500); }
}
function RT_LRN_levelInfo(){ var xp=RT_LRN_gxp(); var lv=1+Math.floor(xp/150); return {level:lv,into:xp-(lv-1)*150,need:150,pct:Math.round((xp-(lv-1)*150)/150*100)}; }
function RT_LRN_countPrefix(pre){ var d=RT_LRN_doneMap(),n=0; for(var k in d){ if(d.hasOwnProperty(k)&&k.lastIndexOf(pre,0)===0) n++; } return n; }
function RT_LRN_mark(key){ var d=RT_LRN_doneMap(); if(d[key]) return false; d[key]=1; rtSet('fp_lrn_done',d); return true; }
function RT_LRN_addXp(n){ rtSet('fp_lrn_xp',RT_LRN_gxp()+n); }
function RT_LRN_dayStr(dt){ return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate(); }
function RT_LRN_streakTick(){
  var s=RT_LRN_streak(); var now=new Date(); var today=RT_LRN_dayStr(now);
  if(s.last===today) return s;
  var y=new Date(now.getTime()-86400000); var yday=RT_LRN_dayStr(y);
  s.count=(s.last===yday)?(s.count+1):1; s.last=today; rtSet('fp_lrn_streak',s); return s;
}
var RT_LRN_BADGES=[
 {id:'first_module',t:'Erste Schritte',d:'Erstes Golfwissen-Modul gelesen',ic:'🎯'},
 {id:'ten_modules',t:'Wissensdurst',d:'10 Technikmodule gelesen',ic:'📚'},
 {id:'all_modules',t:'Technik-Profi',d:'Alle Technikmodule gelesen',ic:'🏌️'},
 {id:'lex25',t:'Lexikon-Kenner',d:'25 Begriffe nachgeschlagen',ic:'🔤'},
 {id:'lex_all',t:'Lexikon-Fuchs',d:'Alle Begriffe angesehen',ic:'🦊'},
 {id:'q50',t:'Regelkundig',d:'50 Fragen richtig beantwortet',ic:'✅'},
 {id:'q_all',t:'Quiz-Meister',d:'Alle Fragen richtig beantwortet',ic:'🧠'},
 {id:'exam_pass',t:'Platzreife-Prüfung bestanden',d:'Prüfung erfolgreich',ic:'🏅'},
 {id:'exam_perfect',t:'Perfekte Prüfung',d:'100 % in der Prüfung',ic:'💯'},
 {id:'streak3',t:'Dranbleiber',d:'3 Tage in Folge gelernt',ic:'🔥'},
 {id:'streak7',t:'Golf-Routine',d:'7 Tage in Folge gelernt',ic:'⚡'},
 {id:'level5',t:'Aufsteiger',d:'Level 5 erreicht',ic:'⭐'}
];
function RT_LRN_hasBadge(id){ return RT_LRN_badges().indexOf(id)>=0; }
function RT_LRN_checkBadges(){
  var gw=RT_LRN_countPrefix('gw:'),lx=RT_LRN_countPrefix('lx:'),q=RT_LRN_countPrefix('q:');
  var ex=RT_LRN_examRec(),st=RT_LRN_streak(),lv=RT_LRN_levelInfo().level;
  var want=[];
  if(gw>=1)want.push('first_module'); if(gw>=10)want.push('ten_modules'); if(gw>=RT_LRN_totals.golfwissen)want.push('all_modules');
  if(lx>=25)want.push('lex25'); if(lx>=RT_LRN_totals.lexikon)want.push('lex_all');
  if(q>=50)want.push('q50'); if(q>=RT_LRN_totals.fragenkatalog)want.push('q_all');
  if(ex.passed)want.push('exam_pass'); if(ex.best>=100)want.push('exam_perfect');
  if(st.count>=3)want.push('streak3'); if(st.count>=7)want.push('streak7'); if(lv>=5)want.push('level5');
  var have=RT_LRN_badges(),fresh=[];
  want.forEach(function(id){ if(have.indexOf(id)<0){ have.push(id); fresh.push(id); } });
  if(fresh.length){ rtSet('fp_lrn_badges',have); }
  return fresh;
}
function RT_LRN_gain(xp,markKey){
  var isNew=true; if(markKey){ isNew=RT_LRN_mark(markKey); }
  RT_LRN_addXp(isNew?xp:Math.min(2,xp));
  RT_LRN_streakTick();
  var fresh=RT_LRN_checkBadges();
  if(fresh.length) RT_LRN_toastBadge(fresh[0]);
  return isNew;
}
function RT_LRN_toastBadge(id){
  var b=null; for(var i=0;i<RT_LRN_BADGES.length;i++){ if(RT_LRN_BADGES[i].id===id){ b=RT_LRN_BADGES[i]; break; } }
  if(!b) return;
  var t=document.createElement('div');
  t.style.cssText='position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 14px);transform:translateX(-50%);z-index:4000;background:#12261B;color:#fff;border-radius:14px;padding:10px 16px;box-shadow:0 6px 22px rgba(0,0,0,.4);display:flex;align-items:center;gap:10px;font-family:Inter,sans-serif;';
  t.innerHTML='<img src="/learning/badges/'+b.id+'.png" alt="" style="width:28px;height:28px;object-fit:contain;flex:none;"><span><b style="font-size:13px;">Abzeichen freigeschaltet</b><br><span style="font-size:12px;opacity:.85;">'+RT_LRN_esc(b.t)+'</span></span>';
  document.body.appendChild(t);
  setTimeout(function(){ t.style.transition='opacity .5s'; t.style.opacity='0'; setTimeout(function(){ try{t.remove();}catch(e){} },500); },2600);
}
function RT_LRN_confetti(){
  var host=document.getElementById(RT_LRN_panel)||document.body;
  var cols=['#1F8A4D','#F6C35A','#4a90d9','#e05a5a','#7FE0A6','#fff'];
  for(var i=0;i<36;i++){ (function(i){
    var p=document.createElement('div'); var c=cols[i%cols.length];
    var left=Math.floor((i*997)%100); var dur=1400+((i*131)%900); var delay=(i*37)%400; var sz=6+((i*13)%8);
    p.style.cssText='position:fixed;top:-14px;left:'+left+'%;width:'+sz+'px;height:'+(sz+3)+'px;background:'+c+';opacity:.95;z-index:3900;border-radius:2px;pointer-events:none;animation:lrnfall '+dur+'ms ease-in '+delay+'ms forwards;';
    document.body.appendChild(p);
    setTimeout(function(){ try{p.remove();}catch(e){} },dur+delay+200);
  })(i); }
}
function RT_LRN_ensureStyle(){
  if(document.getElementById('rt-lrn-style')) return;
  var s=document.createElement('style'); s.id='rt-lrn-style';
  s.textContent=''
   +'.lrnwrap,.lrnwrap *{box-sizing:border-box;}'
   +'.lrncard{background:#fff;border-radius:16px;box-shadow:0 1px 4px rgba(20,40,25,.08);padding:14px;}'
   +'.lrnhead{display:flex;align-items:center;gap:10px;margin:6px 2px 12px;}'
   +'.lrnback{width:38px;height:38px;border:none;border-radius:12px;background:#eef3ee;cursor:pointer;font-size:19px;color:#2d4a34;flex:none;}'
   +'.lrntitle{font-size:19px;font-weight:800;color:#1d3324;font-family:Inter,sans-serif;}'
   +'.lrnrubrik{display:flex;align-items:center;gap:13px;width:100%;text-align:left;border:none;background:#fff;border-radius:16px;box-shadow:0 1px 4px rgba(20,40,25,.08);padding:14px;margin-bottom:11px;cursor:pointer;}'
   +'.lrnrubrik:active{transform:scale(.99);}'
   +'.lrnpill{display:inline-block;font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;background:#eef3ee;color:#3d6b4a;}'
   +'.lrnopt{display:block;width:100%;text-align:left;border:1.5px solid #e2e8e2;background:#fff;border-radius:13px;padding:13px 15px;margin-bottom:9px;font-size:14.5px;color:#233;cursor:pointer;font-family:Inter,sans-serif;line-height:1.35;}'
   +'.lrnopt:active{background:#f4f8f4;}'
   +'.lrnbtn{display:inline-block;border:none;border-radius:13px;padding:13px 18px;font-size:15px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;}'
   +'.lrnbtn-p{background:#1F8A4D;color:#fff;}'
   +'.lrnbtn-s{background:#eef3ee;color:#2d4a34;}'
   +'.lrnli{padding:6px 0 6px 20px;position:relative;font-size:14px;line-height:1.5;color:#2c3b30;}'
   +'.lrnli:before{content:"";position:absolute;left:2px;top:12px;width:7px;height:7px;border-radius:50%;background:#1F8A4D;}'
   +'.lrnsec-h{font-size:14px;font-weight:800;color:#1F8A4D;margin:16px 0 6px;}'
   +'@keyframes lrnfall{to{transform:translateY(105vh) rotate(540deg);opacity:.9;}}';
  document.head.appendChild(s);
}

/* ---------- Ringe / kleine Bausteine ---------- */
function RT_LRN_ring(pct,size,col,inner){
  pct=Math.max(0,Math.min(100,pct||0)); var r=(size-7)/2, cx=size/2, cir=2*Math.PI*r, off=cir*(1-pct/100);
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'" style="flex:none;width:'+size+'px;height:'+size+'px;display:block;">'
    +'<circle cx="'+cx+'" cy="'+cx+'" r="'+r+'" fill="none" stroke="#e6ece6" stroke-width="5"/>'
    +'<circle cx="'+cx+'" cy="'+cx+'" r="'+r+'" fill="none" stroke="'+col+'" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+cir.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 '+cx+' '+cx+')"/>'
    +(inner?('<text x="'+cx+'" y="'+(cx+4)+'" text-anchor="middle" font-size="'+(size*0.28)+'" font-weight="800" fill="#1d3324" font-family="Inter,sans-serif">'+inner+'</text>'):'')
    +'</svg>';
}

/* ---------- Daten laden ---------- */
function RT_LRN_load(name){
  if(RT_LRN_data[name]) return Promise.resolve(RT_LRN_data[name]);
  return fetch('/learning/'+name+'.json',{cache:'no-cache'}).then(function(r){ if(!r.ok) throw new Error(name+' '+r.status); return r.json(); }).then(function(j){ RT_LRN_data[name]=j; return j; });
}
function RT_LRN_ensure(names,cb){
  Promise.all(names.map(RT_LRN_load)).then(function(){ cb(); }).catch(function(e){
    RT_LRN_set('<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'hub\')">‹</button><div class="lrntitle">Lernen</div></div><div class="lrncard" style="text-align:center;padding:30px;"><div style="font-size:15px;color:#c0392b;font-weight:700;">Inhalte konnten nicht geladen werden.</div><div style="margin-top:8px;color:#5d7060;font-size:13px;">'+RT_LRN_esc(e&&e.message||'')+'</div><button class="lrnbtn lrnbtn-p" style="margin-top:16px;" onclick="RT_LRN_go(\''+RT_LRN_view+'\')">Erneut versuchen</button></div>');
  });
}
function RT_LRN_clearTimer(){ if(RT_LRN_examTimer){ clearInterval(RT_LRN_examTimer); RT_LRN_examTimer=null; } }

/* ---------- Mount + Router ---------- */
function RT_LRN_mount(panelId){
  RT_LRN_panel=panelId||'tab-lernen'; RT_LRN_ensureStyle();
  RT_LRN_set('<div class="lrncard" style="text-align:center;padding:36px;color:#5d7060;">Lädt …</div>');
  RT_LRN_load('manifest').then(function(m){ if(m&&m.bundles){ for(var k in m.bundles){ RT_LRN_totals[k]=m.bundles[k]; } } }).catch(function(){}).then(function(){ RT_LRN_go('hub'); });
}
function RT_LRN_go(view,a,b){
  RT_LRN_clearTimer(); RT_LRN_view=view; RT_LRN_ensureStyle();
  if(view==='hub'){ RT_LRN_renderHub(); return; }
  if(view==='gw'){ RT_LRN_ensure(['golfwissen'],RT_LRN_renderGwList); return; }
  if(view==='gw_detail'){ RT_LRN_ensure(['golfwissen'],function(){ RT_LRN_renderGwDetail(a); }); return; }
  if(view==='lx'){ RT_LRN_ensure(['lexikon'],RT_LRN_renderLex); return; }
  if(view==='lx_detail'){ RT_LRN_ensure(['lexikon'],function(){ RT_LRN_renderLexDetail(a); }); return; }
  if(view==='fk'){ RT_LRN_ensure(['fragenkatalog'],RT_LRN_renderFkHome); return; }
  if(view==='pr'){ RT_LRN_ensure(['platzreife'],RT_LRN_renderPrHome); return; }
  if(view==='pr_detail'){ RT_LRN_ensure(['platzreife'],function(){ RT_LRN_renderPrChapter(a); }); return; }
  if(view==='video'){ RT_LRN_ensure(['videoakademie'],RT_LRN_renderVideo); return; }
}

/* ---------- Hub ---------- */
function RT_LRN_rubrikCard(view,ic,titel,sub,pct,col){
  return '<button class="lrnrubrik" onclick="RT_LRN_go(\''+view+'\')">'
    + RT_LRN_ring(pct,52,col,pct+'%')
    + '<div style="flex:1;min-width:0;"><div style="font-size:16px;font-weight:800;color:#1d3324;display:flex;align-items:center;gap:7px;"><img src="/learning/rubrik/'+view+'.png" alt="" style="width:26px;height:26px;object-fit:contain;flex:none;">'+RT_LRN_esc(titel)+'</div>'
    + '<div style="font-size:12.5px;color:#5d7060;margin-top:3px;line-height:1.35;">'+RT_LRN_esc(sub)+'</div></div>'
    + '<span style="font-size:22px;color:#c3d0c5;">›</span></button>';
}
function RT_LRN_renderHub(){
  var li=RT_LRN_levelInfo(), st=RT_LRN_streak();
  var gw=RT_LRN_countPrefix('gw:'),lx=RT_LRN_countPrefix('lx:'),q=RT_LRN_countPrefix('q:'),pr=RT_LRN_countPrefix('pr:'),vd=RT_LRN_countPrefix('vid:');
  var T=RT_LRN_totals, ex=RT_LRN_examRec();
  var pctOf=function(n,t){ return t?Math.round(n/t*100):0; };
  var badges=RT_LRN_badges();
  var header='<div class="lrncard" style="background:linear-gradient(135deg,#1F8A4D,#146a3a);color:#fff;margin-bottom:14px;">'
    +'<div style="display:flex;align-items:center;gap:14px;">'
    + RT_LRN_ring(li.pct,58,'#F6C35A','L'+li.level).replace('#1d3324','#fff')
    +'<div style="flex:1;min-width:0;"><div style="font-size:18px;font-weight:800;">Level '+li.level+'</div>'
    +'<div style="font-size:12.5px;opacity:.9;margin-top:2px;">'+RT_LRN_gxp()+' XP · noch '+(li.need-li.into)+' XP bis Level '+(li.level+1)+'</div></div>'
    +'<div style="text-align:center;flex:none;"><div style="font-size:22px;">🔥</div><div style="font-size:12px;font-weight:800;">'+(st.count||0)+' Tag'+((st.count===1)?'':'e')+'</div></div>'
    +'</div></div>';
  var body=''
    + RT_LRN_rubrikCard('gw','🏌️','Golfwissen',gw+' / '+T.golfwissen+' Technikmodule',pctOf(gw,T.golfwissen),'#1F8A4D')
    + RT_LRN_rubrikCard('lx','📖','Lexikon',lx+' / '+T.lexikon+' Begriffe angesehen',pctOf(lx,T.lexikon),'#4a90d9')
    + RT_LRN_rubrikCard('fk','❓','Fragenkatalog',q+' / '+T.fragenkatalog+' Fragen gemeistert',pctOf(q,T.fragenkatalog),'#e0913a')
    + RT_LRN_rubrikCard('pr','🎓','Platzreife',(pr+' / '+T.platzreife+' Kapitel')+(ex.passed?' · bestanden ✓':(ex.best?(' · Best '+ex.best+'%'):'')),pctOf(pr,T.platzreife),'#8e5bd0')
    + RT_LRN_rubrikCard('video','🎬','Videoakademie',vd+' / '+T.videos+' Videos angesehen',pctOf(vd,T.videos),'#d94a6a');
  var badgeHtml=RT_LRN_BADGES.map(function(b){ var has=badges.indexOf(b.id)>=0;
    return '<div title="'+RT_LRN_esc(b.d)+'" style="width:60px;text-align:center;opacity:'+(has?'1':'.32')+';filter:'+(has?'none':'grayscale(1)')+';"><div style="height:46px;display:flex;align-items:center;justify-content:center;line-height:0;"><img src="/learning/badges/'+b.id+'.png" alt="" style="width:44px;height:44px;object-fit:contain;"></div><div style="font-size:9px;color:#5d7060;margin-top:3px;line-height:1.1;">'+RT_LRN_esc(b.t)+'</div></div>';
  }).join('');
  var badgeSec='<div class="lrncard" style="margin-top:6px;"><div class="lrnsec-h" style="margin-top:0;">Abzeichen ('+badges.length+'/'+RT_LRN_BADGES.length+')</div>'
    +'<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px 4px;justify-items:center;">'+badgeHtml+'</div></div>';
  RT_LRN_set('<div class="lrnhead" style="justify-content:space-between;"><div class="lrntitle">Lernen</div></div>'+header+body+badgeSec);
}

/* ---------- Golfwissen ---------- */
function RT_LRN_renderGwList(){
  var mods=RT_LRN_data.golfwissen||[]; var cats={},order=[];
  mods.forEach(function(m,i){ if(!cats[m.kategorie]){ cats[m.kategorie]=[]; order.push(m.kategorie); } cats[m.kategorie].push(i); });
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'hub\')">‹</button><div class="lrntitle"><img src="/learning/rubrik/gw.png" alt="" style="width:24px;height:24px;object-fit:contain;vertical-align:-5px;margin-right:4px;">Golfwissen</div></div>';
  order.forEach(function(cat){
    html+='<div class="lrnsec-h">'+RT_LRN_esc(cat)+'</div>';
    cats[cat].forEach(function(i){ var m=mods[i]; var done=RT_LRN_doneMap()['gw:'+m.id];
      html+='<button class="lrnrubrik" style="margin-bottom:9px;padding:12px 14px;" onclick="RT_LRN_go(\'gw_detail\','+i+')">'
        +'<div style="flex:1;min-width:0;"><div style="font-size:15px;font-weight:700;color:#1d3324;">'+RT_LRN_esc(m.titel)+'</div>'
        +'<div style="font-size:12px;color:#5d7060;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+RT_LRN_esc(m.einfuehrung)+'</div></div>'
        +(done?'<span style="color:#1F8A4D;font-size:18px;flex:none;">✓</span>':'<span style="font-size:20px;color:#c3d0c5;flex:none;">›</span>')+'</button>';
    });
  });
  RT_LRN_set(html);
}
function RT_LRN_gwSecList(title,arr){ if(!arr||!arr.length) return ''; return '<div class="lrnsec-h">'+title+'</div>'+arr.map(function(x){ return '<div class="lrnli">'+RT_LRN_esc(x)+'</div>'; }).join(''); }
function RT_LRN_renderGwDetail(i){
  var m=(RT_LRN_data.golfwissen||[])[i]; if(!m){ RT_LRN_go('gw'); return; }
  var isNew=RT_LRN_gain(15,'gw:'+m.id);
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'gw\')">‹</button><div class="lrntitle" style="font-size:17px;">'+RT_LRN_esc(m.titel)+'</div></div>';
  html+='<div class="lrncard"><span class="lrnpill">'+RT_LRN_esc(m.kategorie)+'</span>'
     +'<div style="font-size:14px;line-height:1.55;color:#2c3b30;margin-top:10px;">'+RT_LRN_esc(m.einfuehrung)+'</div>'
     +RT_LRN_gwSecList('So geht\'s',m.schritte)
     +RT_LRN_gwSecList('Typische Fehler',m.fehler)
     +RT_LRN_gwSecList('Korrekturen',m.korrekturen)
     +RT_LRN_gwSecList('Übungen',m.uebungen)
     +RT_LRN_gwSecList('Checkliste',m.checkliste)
     +'<div class="lrnsec-h">Kurz gesagt</div><div style="background:#eef7ef;border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.5;color:#1d4a2e;">'+RT_LRN_esc(m.zusammenfassung)+'</div>'
     +(isNew?'<div style="text-align:center;color:#1F8A4D;font-size:12.5px;font-weight:700;margin-top:14px;">+15 XP</div>':'')
     +'</div>';
  html+='<div style="display:flex;gap:10px;margin-top:12px;"><button class="lrnbtn lrnbtn-s" style="flex:1;" onclick="RT_LRN_go(\'gw\')">Zur Liste</button><button class="lrnbtn lrnbtn-p" style="flex:1;" onclick="RT_LRN_gwNext('+i+')">Nächstes Modul</button></div>';
  RT_LRN_set(html);
}
function RT_LRN_gwNext(i){ var n=(RT_LRN_data.golfwissen||[]).length; if(i+1<n) RT_LRN_go('gw_detail',i+1); else RT_LRN_go('gw'); }

/* ---------- Lexikon ---------- */
function RT_LRN_renderLex(){
  var terms=RT_LRN_data.lexikon||[];
  var q=RT_LRN_lexQuery.toLowerCase();
  var filt=terms.filter(function(t){ return !q || t.begriff.toLowerCase().indexOf(q)>=0 || (t.definition||'').toLowerCase().indexOf(q)>=0; });
  var groups={},letters=[];
  filt.forEach(function(t,i){ var L=t.begriff.charAt(0).toUpperCase(); var idx=terms.indexOf(t); if(!groups[L]){ groups[L]=[]; letters.push(L); } groups[L].push(idx); });
  letters.sort();
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'hub\')">‹</button><div class="lrntitle"><img src="/learning/rubrik/lx.png" alt="" style="width:24px;height:24px;object-fit:contain;vertical-align:-5px;margin-right:4px;">Lexikon</div></div>';
  html+='<input id="lrn-lexsearch" value="'+RT_LRN_esc(RT_LRN_lexQuery)+'" oninput="RT_LRN_lexInput(this.value)" placeholder="Begriff suchen …" style="width:100%;box-sizing:border-box;border:1.5px solid #e2e8e2;border-radius:13px;padding:12px 15px;font-size:15px;font-family:Inter,sans-serif;margin-bottom:12px;">';
  html+='<div style="font-size:12px;color:#5d7060;margin:0 2px 10px;">'+filt.length+' Begriff'+(filt.length===1?'':'e')+'</div>';
  if(!filt.length){ html+='<div class="lrncard" style="text-align:center;color:#5d7060;padding:26px;">Keine Treffer.</div>'; }
  letters.forEach(function(L){
    html+='<div class="lrnsec-h">'+L+'</div><div class="lrncard" style="padding:4px 0;">';
    groups[L].forEach(function(idx){ var t=terms[idx]; var seen=RT_LRN_doneMap()['lx:'+t.begriff];
      html+='<button onclick="RT_LRN_go(\'lx_detail\','+idx+')" style="display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:none;background:none;padding:11px 15px;border-bottom:1px solid #f0f3f0;cursor:pointer;">'
        +'<span style="flex:1;min-width:0;font-size:14.5px;font-weight:600;color:#1d3324;">'+RT_LRN_esc(t.begriff)+'</span>'
        +'<span class="lrnpill" style="font-size:10px;">'+RT_LRN_esc(t.kategorie)+'</span>'
        +(seen?'<span style="color:#1F8A4D;">✓</span>':'')+'</button>';
    });
    html+='</div>';
  });
  RT_LRN_set(html);
  var s=document.getElementById('lrn-lexsearch'); if(s && RT_LRN_lexQuery){ try{ s.focus(); s.setSelectionRange(s.value.length,s.value.length); }catch(e){} }
}
function RT_LRN_lexInput(v){ RT_LRN_lexQuery=v; RT_LRN_renderLex(); }
function RT_LRN_renderLexDetail(i){
  var t=(RT_LRN_data.lexikon||[])[i]; if(!t){ RT_LRN_go('lx'); return; }
  var isNew=RT_LRN_gain(3,'lx:'+t.begriff);
  var rel=(t.related||[]).map(function(r){ var idx=-1,arr=RT_LRN_data.lexikon||[]; for(var k=0;k<arr.length;k++){ if(arr[k].begriff===r){ idx=k; break; } }
    return idx>=0?'<button class="lrnpill" style="border:none;cursor:pointer;margin:3px 5px 0 0;" onclick="RT_LRN_go(\'lx_detail\','+idx+')">'+RT_LRN_esc(r)+'</button>':'<span class="lrnpill" style="margin:3px 5px 0 0;opacity:.6;">'+RT_LRN_esc(r)+'</span>'; }).join('');
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'lx\')">‹</button><div class="lrntitle" style="font-size:18px;">'+RT_LRN_esc(t.begriff)+'</div></div>';
  html+='<div class="lrncard"><span class="lrnpill">'+RT_LRN_esc(t.kategorie)+'</span>'
     +'<div style="font-size:15px;line-height:1.6;color:#2c3b30;margin-top:12px;">'+RT_LRN_esc(t.definition)+'</div>'
     +(rel?('<div class="lrnsec-h">Verwandt</div><div>'+rel+'</div>'):'')
     +(isNew?'<div style="text-align:center;color:#1F8A4D;font-size:12.5px;font-weight:700;margin-top:14px;">+3 XP</div>':'')
     +'</div>';
  html+='<button class="lrnbtn lrnbtn-s" style="width:100%;margin-top:12px;" onclick="RT_LRN_go(\'lx\')">Zurück zum Lexikon</button>';
  RT_LRN_set(html);
}

/* ---------- Fragenkatalog / Quiz ---------- */
function RT_LRN_kapitelList(){ var q=RT_LRN_data.fragenkatalog||[]; var seen={},o=[]; q.forEach(function(x){ if(!seen[x.kapitel]){ seen[x.kapitel]=0; o.push(x.kapitel); } seen[x.kapitel]++; }); return o.map(function(k){ return {kapitel:k,n:seen[k]}; }); }
function RT_LRN_renderFkHome(){
  var wrong=RT_LRN_wrongMap(); var nWrong=0; for(var w in wrong){ if(wrong.hasOwnProperty(w)) nWrong++; }
  var q=RT_LRN_data.fragenkatalog||[]; var mastered=RT_LRN_countPrefix('q:');
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'hub\')">‹</button><div class="lrntitle"><img src="/learning/rubrik/fk.png" alt="" style="width:24px;height:24px;object-fit:contain;vertical-align:-5px;margin-right:4px;">Fragenkatalog</div></div>';
  html+='<div class="lrncard" style="margin-bottom:12px;"><div style="display:flex;align-items:center;gap:12px;">'+RT_LRN_ring(RT_LRN_totals.fragenkatalog?Math.round(mastered/RT_LRN_totals.fragenkatalog*100):0,54,'#e0913a',mastered+'')
    +'<div><div style="font-size:14px;font-weight:800;color:#1d3324;">'+mastered+' von '+q.length+' Fragen gemeistert</div><div style="font-size:12px;color:#5d7060;margin-top:2px;">Beantworte eine Frage richtig, um sie zu meistern.</div></div></div></div>';
  html+='<div class="lrnsec-h" style="margin-top:4px;">Modus wählen</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">'
    +'<button class="lrnrubrik" style="display:block;text-align:center;margin:0;padding:16px 10px;" onclick="RT_LRN_startQuiz(\'lernen\',null)"><div style="font-size:24px;">📚</div><div style="font-size:14px;font-weight:700;color:#1d3324;margin-top:5px;">Lernen</div><div style="font-size:11px;color:#5d7060;">alle, mit Erklärung</div></button>'
    +'<button class="lrnrubrik" style="display:block;text-align:center;margin:0;padding:16px 10px;" onclick="RT_LRN_startQuiz(\'zufall\',null)"><div style="font-size:24px;">🎲</div><div style="font-size:14px;font-weight:700;color:#1d3324;margin-top:5px;">Zufall</div><div style="font-size:11px;color:#5d7060;">15 gemischte</div></button>'
    +'<button class="lrnrubrik" style="display:block;text-align:center;margin:0;padding:16px 10px;'+(nWrong?'':'opacity:.5;')+'" onclick="'+(nWrong?'RT_LRN_startQuiz(\'fehler\',null)':'')+'"><div style="font-size:24px;">🔁</div><div style="font-size:14px;font-weight:700;color:#1d3324;margin-top:5px;">Fehler</div><div style="font-size:11px;color:#5d7060;">'+nWrong+' offen</div></button>'
    +'<button class="lrnrubrik" style="display:block;text-align:center;margin:0;padding:16px 10px;background:#f3eefb;" onclick="RT_LRN_go(\'pr\')"><div style="height:28px;line-height:0;margin-bottom:2px;"><img src="/learning/rubrik/pr.png" alt="" style="width:28px;height:28px;object-fit:contain;"></div><div style="font-size:14px;font-weight:700;color:#1d3324;margin-top:5px;">Prüfung</div><div style="font-size:11px;color:#5d7060;">im Platzreife-Bereich</div></button>'
    +'</div>';
  html+='<div class="lrnsec-h">Nach Thema üben</div>';
  RT_LRN_kapitelList().forEach(function(k){
    html+='<button class="lrnrubrik" style="margin-bottom:9px;padding:12px 14px;" onclick="RT_LRN_startQuiz(\'lernen\',\''+RT_LRN_esc(k.kapitel).replace(/'/g,"\\'")+'\')"><div style="flex:1;"><div style="font-size:14.5px;font-weight:700;color:#1d3324;">'+RT_LRN_esc(k.kapitel)+'</div></div><span class="lrnpill">'+k.n+'</span><span style="font-size:20px;color:#c3d0c5;margin-left:8px;">›</span></button>';
  });
  RT_LRN_set(html);
}
function RT_LRN_shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function RT_LRN_shufOpt(it){
 var sh=RT_LRN_shuffle([0,1,2,3]);
 var opts=sh.map(function(k){ return it.optionen[k]; });
 return {id:it.id,kapitel:it.kapitel,frage:it.frage,optionen:opts,richtig:sh.indexOf(it.richtig),erklaerung:it.erklaerung,schwierigkeit:it.schwierigkeit};
}
function RT_LRN_startQuiz(mode,kapitel){
  var all=RT_LRN_data.fragenkatalog||[]; var pool=[];
  if(mode==='fehler'){ var w=RT_LRN_wrongMap(); pool=all.filter(function(x){ return w[x.id]; }); }
  else if(kapitel){ pool=all.filter(function(x){ return x.kapitel===kapitel; }); }
  else { pool=all.slice(); }
  pool=RT_LRN_shuffle(pool);
  if(mode==='zufall') pool=pool.slice(0,15);
  if(!pool.length){ RT_LRN_go('fk'); return; }
  RT_LRN_quiz={mode:mode,kapitel:kapitel,pool:pool.map(RT_LRN_shufOpt),idx:0,correct:0,answers:[],exam:false,title:(kapitel||({lernen:'Lernen',zufall:'Zufallsquiz',fehler:'Fehlerwiederholung'}[mode]||'Quiz'))};
  RT_LRN_renderQuiz();
}
function RT_LRN_renderQuiz(){
  var Q=RT_LRN_quiz; if(!Q){ RT_LRN_go('fk'); return; }
  var item=Q.pool[Q.idx]; var n=Q.pool.length;
  var head='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_quizExit()">‹</button><div style="flex:1;"><div class="lrntitle" style="font-size:16px;">'+RT_LRN_esc(Q.exam?'Prüfung':Q.title)+'</div></div>'
    +(Q.exam?'<div id="lrn-timer" style="font-weight:800;color:#8e5bd0;font-size:15px;">'+RT_LRN_fmtTime(Q.timeLeft)+'</div>':'<div style="font-size:13px;color:#5d7060;font-weight:700;">'+(Q.idx+1)+'/'+n+'</div>')+'</div>';
  var bar='<div style="height:6px;background:#e6ece6;border-radius:6px;overflow:hidden;margin:0 2px 14px;"><div style="height:100%;width:'+Math.round((Q.idx)/n*100)+'%;background:'+(Q.exam?'#8e5bd0':'#1F8A4D')+';border-radius:6px;transition:width .2s;"></div></div>';
  var opts=item.optionen.map(function(o,i){ return '<button class="lrnopt" id="lrn-opt-'+i+'" onclick="RT_LRN_answer('+i+')">'+RT_LRN_esc(o)+'</button>'; }).join('');
  var html=head+bar+'<div class="lrncard"><span class="lrnpill">'+RT_LRN_esc(item.kapitel)+'</span>'
    +'<div style="font-size:16px;font-weight:700;line-height:1.45;color:#1d3324;margin:12px 0 16px;">'+RT_LRN_esc(item.frage)+'</div>'
    +'<div id="lrn-opts">'+opts+'</div>'
    +'<div id="lrn-feedback"></div></div>';
  RT_LRN_set(html);
}
function RT_LRN_answer(i){
  var Q=RT_LRN_quiz; if(!Q) return; var item=Q.pool[Q.idx];
  if(Q.answered) return; Q.answered=true;
  var ok=(i===item.richtig); Q.answers.push({id:item.id,ok:ok});
  if(ok) Q.correct++;
  // Fehler-Map pflegen
  var w=RT_LRN_wrongMap();
  if(ok){ if(w[item.id]){ delete w[item.id]; rtSet('fp_lrn_wrong',w); } RT_LRN_gain(5,'q:'+item.id); }
  else { w[item.id]=1; rtSet('fp_lrn_wrong',w); RT_LRN_streakTick(); }
  if(Q.exam){ RT_LRN_quiz.answered=false; RT_LRN_quizAdvance(); return; }
  // Feedback anzeigen
  for(var k=0;k<item.optionen.length;k++){ var b=document.getElementById('lrn-opt-'+k); if(!b) continue; b.onclick=null;
    if(k===item.richtig){ b.style.background='#e6f6ec'; b.style.borderColor='#1F8A4D'; b.style.color='#14612f'; b.style.fontWeight='700'; }
    else if(k===i){ b.style.background='#fdecec'; b.style.borderColor='#d24a4a'; b.style.color='#a12a2a'; }
    else { b.style.opacity='.6'; }
  }
  var fb=document.getElementById('lrn-feedback');
  if(fb){ fb.innerHTML='<div style="margin-top:6px;background:'+(ok?'#eef7ef':'#fdf2f2')+';border-radius:12px;padding:12px 14px;font-size:13.5px;line-height:1.5;color:#2c3b30;">'
    +'<b style="color:'+(ok?'#1F8A4D':'#c0392b')+';">'+(ok?'Richtig! +5 XP':'Nicht ganz.')+'</b><br>'+RT_LRN_esc(item.erklaerung)+'</div>'
    +'<button class="lrnbtn lrnbtn-p" style="width:100%;margin-top:12px;" onclick="RT_LRN_quizAdvance()">'+((Q.idx+1<Q.pool.length)?'Weiter':'Ergebnis')+'</button>'; }
}
function RT_LRN_quizAdvance(){
  var Q=RT_LRN_quiz; if(!Q) return; Q.idx++; Q.answered=false;
  if(Q.idx>=Q.pool.length){ if(Q.exam){ RT_LRN_finishExam(); } else { RT_LRN_quizResult(); } return; }
  RT_LRN_renderQuiz();
  if(Q.exam) RT_LRN_startExamTimerTick();
}
function RT_LRN_quizExit(){ if(RT_LRN_quiz&&RT_LRN_quiz.exam){ RT_LRN_pageConfirmExit(); } else { RT_LRN_go('fk'); } }
function RT_LRN_pageConfirmExit(){ RT_LRN_clearTimer(); RT_LRN_quiz=null; RT_LRN_go('pr'); }
function RT_LRN_quizResult(){
  var Q=RT_LRN_quiz; var n=Q.pool.length, c=Q.correct, pct=Math.round(c/n*100);
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'fk\')">‹</button><div class="lrntitle">Ergebnis</div></div>';
  html+='<div class="lrncard" style="text-align:center;padding:26px;">'+RT_LRN_ring(pct,110,pct>=75?'#1F8A4D':'#e0913a',pct+'%')
    +'<div style="font-size:17px;font-weight:800;color:#1d3324;margin-top:14px;">'+c+' von '+n+' richtig</div>'
    +'<div style="font-size:13px;color:#5d7060;margin-top:4px;">Weiter so – jede richtige Antwort bringt dich näher an die Platzreife.</div></div>';
  html+='<div style="display:flex;gap:10px;margin-top:12px;"><button class="lrnbtn lrnbtn-s" style="flex:1;" onclick="RT_LRN_go(\'fk\')">Übersicht</button><button class="lrnbtn lrnbtn-p" style="flex:1;" onclick="RT_LRN_startQuiz(\''+Q.mode+'\','+(Q.kapitel?('\''+RT_LRN_esc(Q.kapitel).replace(/\x27/g,"\\x27")+'\''):'null')+')">Nochmal</button></div>';
  RT_LRN_quiz=null; RT_LRN_set(html);
}

/* ---------- Platzreife ---------- */
function RT_LRN_renderPrHome(){
  var d=RT_LRN_data.platzreife||{}; var kaps=d.kapitel||[]; var ex=RT_LRN_examRec();
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'hub\')">‹</button><div class="lrntitle"><img src="/learning/rubrik/pr.png" alt="" style="width:24px;height:24px;object-fit:contain;vertical-align:-5px;margin-right:4px;">Platzreife</div></div>';
  html+='<button class="lrnrubrik" style="background:linear-gradient(135deg,#8e5bd0,#6f42c1);color:#fff;margin-bottom:14px;padding:16px;" onclick="RT_LRN_startExam()">'
    +'<div style="flex:1;"><div style="font-size:16px;font-weight:800;">Prüfung starten</div>'
    +'<div style="font-size:12.5px;opacity:.92;margin-top:3px;">'+(d.pruefung?d.pruefung.fragen_anzahl:20)+' Fragen · '+(d.pruefung?d.pruefung.zeit_minuten:20)+' Min · '+(d.pruefung?d.pruefung.bestehen_prozent:75)+'% zum Bestehen'+(ex.passed?' · bestanden ✓':(ex.best?(' · Best '+ex.best+'%'):''))+'</div></div>'
    +'<span style="font-size:24px;">▶</span></button>';
  html+='<div class="lrnsec-h" style="margin-top:2px;">Kurs · '+kaps.length+' Kapitel</div>';
  kaps.forEach(function(k,i){ var done=RT_LRN_doneMap()['pr:'+k.id];
    html+='<button class="lrnrubrik" style="margin-bottom:9px;padding:12px 14px;" onclick="RT_LRN_go(\'pr_detail\','+i+')">'
      +'<div style="width:30px;height:30px;border-radius:9px;background:#f3eefb;color:#6f42c1;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center;flex:none;">'+(k.nummer||i+1)+'</div>'
      +'<div style="flex:1;min-width:0;"><div style="font-size:14.5px;font-weight:700;color:#1d3324;">'+RT_LRN_esc(k.titel)+'</div></div>'
      +(done?'<span style="color:#1F8A4D;font-size:18px;">✓</span>':'<span style="font-size:20px;color:#c3d0c5;">›</span>')+'</button>';
  });
  if(d.disclaimer){ html+='<div style="margin-top:10px;padding:12px 14px;background:#fbfaf3;border:1px solid #eee6c8;border-radius:12px;font-size:11.5px;line-height:1.5;color:#6b6444;">ℹ️ '+RT_LRN_esc(d.disclaimer)+'</div>'; }
  RT_LRN_set(html);
}
function RT_LRN_renderPrChapter(i){
  var d=RT_LRN_data.platzreife||{}; var k=(d.kapitel||[])[i]; if(!k){ RT_LRN_go('pr'); return; }
  var isNew=RT_LRN_gain(15,'pr:'+k.id);
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'pr\')">‹</button><div class="lrntitle" style="font-size:16px;">'+RT_LRN_esc(k.titel)+'</div></div>';
  html+='<div class="lrncard"><div style="font-size:14px;line-height:1.6;color:#2c3b30;">'+RT_LRN_esc(k.einfuehrung)+'</div>';
  (k.abschnitte||[]).forEach(function(a){ html+='<div class="lrnsec-h">'+RT_LRN_esc(a.ueberschrift)+'</div><div style="font-size:14px;line-height:1.6;color:#2c3b30;">'+RT_LRN_esc(a.text)+'</div>'; });
  if(k.merksaetze&&k.merksaetze.length){ html+='<div class="lrnsec-h">Merksätze</div><div style="background:#eef7ef;border-radius:12px;padding:6px 4px;">'+k.merksaetze.map(function(m){ return '<div class="lrnli">'+RT_LRN_esc(m)+'</div>'; }).join('')+'</div>'; }
  if(k.zusammenfassung){ html+='<div class="lrnsec-h">Zusammenfassung</div><div style="font-size:14px;line-height:1.55;color:#1d4a2e;">'+RT_LRN_esc(k.zusammenfassung)+'</div>'; }
  html+=(isNew?'<div style="text-align:center;color:#1F8A4D;font-size:12.5px;font-weight:700;margin-top:14px;">+15 XP</div>':'')+'</div>';
  var n=(d.kapitel||[]).length;
  html+='<div style="display:flex;gap:10px;margin-top:12px;"><button class="lrnbtn lrnbtn-s" style="flex:1;" onclick="RT_LRN_go(\'pr\')">Kapitel</button><button class="lrnbtn lrnbtn-p" style="flex:1;" onclick="'+((i+1<n)?('RT_LRN_go(\'pr_detail\','+(i+1)+')'):'RT_LRN_startExam()')+'">'+((i+1<n)?'Nächstes Kapitel':'Zur Prüfung')+'</button></div>';
  RT_LRN_set(html);
}
/* ---------- Prüfungsmodus ---------- */
function RT_LRN_fmtTime(s){ s=Math.max(0,s|0); var m=Math.floor(s/60); var r=s%60; return m+':'+(r<10?'0':'')+r; }
function RT_LRN_startExam(){
  if(!RT_requirePremium('exam'))return;
  RT_LRN_ensure(['platzreife','fragenkatalog'],function(){
    var d=RT_LRN_data.platzreife||{}; var cfg=d.pruefung||{fragen_anzahl:20,bestehen_prozent:75,zeit_minuten:20,quelle_kapitel:null};
    var all=RT_LRN_data.fragenkatalog||[];
    var pool=cfg.quelle_kapitel?all.filter(function(x){ return cfg.quelle_kapitel.indexOf(x.kapitel)>=0; }):all.slice();
    pool=RT_LRN_shuffle(pool).slice(0,cfg.fragen_anzahl||20);
    RT_LRN_quiz={mode:'pruefung',exam:true,pool:pool.map(RT_LRN_shufOpt),idx:0,correct:0,answers:[],answered:false,timeLeft:(cfg.zeit_minuten||20)*60,passPct:cfg.bestehen_prozent||75,title:'Prüfung'};
    RT_LRN_renderQuiz(); RT_LRN_startExamTimerTick();
  });
}
function RT_LRN_startExamTimerTick(){
  RT_LRN_clearTimer();
  RT_LRN_examTimer=setInterval(function(){
    var Q=RT_LRN_quiz; if(!Q||!Q.exam){ RT_LRN_clearTimer(); return; }
    Q.timeLeft--; var el=document.getElementById('lrn-timer'); if(el) el.textContent=RT_LRN_fmtTime(Q.timeLeft);
    if(Q.timeLeft<=0){ RT_LRN_clearTimer(); RT_LRN_finishExam(true); }
  },1000);
}
function RT_LRN_finishExam(timeUp){
  RT_LRN_clearTimer(); var Q=RT_LRN_quiz; if(!Q) return;
  var answered=Q.answers.length, n=Q.pool.length, c=Q.correct;
  var pct=Math.round(c/n*100); var pass=pct>=(Q.passPct||75);
  var rec=RT_LRN_examRec(); rec.count=(rec.count||0)+1; if(pct>rec.best) rec.best=pct; if(pass) rec.passed=true; rtSet('fp_lrn_exam',rec);
  RT_LRN_addXp(30+(pass?80:0)); RT_LRN_streakTick(); var fresh=RT_LRN_checkBadges();
  RT_LRN_quiz=null;
  var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'pr\')">‹</button><div class="lrntitle">Prüfungsergebnis</div></div>';
  html+='<div class="lrncard" style="text-align:center;padding:28px 22px;">'
    +RT_LRN_ring(pct,120,pass?'#1F8A4D':'#d24a4a',pct+'%')
    +'<div style="font-size:22px;font-weight:800;margin-top:16px;color:'+(pass?'#1F8A4D':'#c0392b')+';">'+(pass?'Bestanden! 🎉':'Nicht bestanden')+'</div>'
    +'<div style="font-size:14px;color:#3a4a3e;margin-top:6px;">'+c+' von '+n+' richtig'+(timeUp?' · Zeit abgelaufen':'')+' · benötigt: '+(Q.passPct||75)+'%</div>'
    +'<div style="font-size:12.5px;color:#5d7060;margin-top:8px;">+'+(30+(pass?80:0))+' XP'+(pass?' · Abzeichen erhalten':'')+'</div>'
    +(pass?'':'<div style="font-size:12.5px;color:#5d7060;margin-top:10px;line-height:1.5;">Tipp: Wiederhole die Kapitel und übe im Fragenkatalog gezielt die Themen, die dir schwerfallen.</div>')
    +'</div>';
  html+='<div style="display:flex;gap:10px;margin-top:12px;"><button class="lrnbtn lrnbtn-s" style="flex:1;" onclick="RT_LRN_go(\'pr\')">Zum Kurs</button><button class="lrnbtn lrnbtn-p" style="flex:1;" onclick="RT_LRN_startExam()">Neue Prüfung</button></div>';
  RT_LRN_set(html);
  if(pass){ RT_LRN_confetti(); }
}

/* ---------- Videoakademie (Zwei-Klick, nocookie) ---------- */
function RT_LRN_renderVideo(){
 var d=RT_LRN_data.videoakademie||{}; var cats=d.kategorien||[];
 var html='<div class="lrnhead"><button class="lrnback" onclick="RT_LRN_go(\'hub\')">‹</button><div class="lrntitle"><img src="/learning/rubrik/video.png" alt="" style="width:24px;height:24px;object-fit:contain;vertical-align:-5px;margin-right:4px;">Videoakademie</div></div>';
 html+='<div style="margin:0 2px 12px;padding:11px 13px;background:#fbfaf3;border:1px solid #eee6c8;border-radius:12px;font-size:11.5px;line-height:1.5;color:#6b6444;">🔒 YouTube im Modus ohne Cookies. Ein Tipp auf das Video startet es direkt.</div>';
 cats.forEach(function(cat){
  html+='<div class="lrnsec-h">'+RT_LRN_esc(cat.kategorie)+'</div>';
  (cat.videos||[]).forEach(function(v){ var seen=RT_LRN_doneMap()['vid:'+v.youtubeId];
   html+='<div class="lrncard" style="padding:0;overflow:hidden;margin-bottom:11px;">'
    +'<div style="position:relative;width:100%;aspect-ratio:16/9;background:#000;"><iframe src="https://www.youtube-nocookie.com/embed/'+v.youtubeId+'?rel=0&playsinline=1" title="'+RT_LRN_esc(v.titel)+'" loading="lazy" allow="accelerometer;encrypted-media;gyroscope;picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0;"></iframe></div>'
    +'<div style="padding:11px 13px;"><div style="font-size:14px;font-weight:700;color:#1d3324;line-height:1.35;">'+RT_LRN_esc(v.titel)+'</div>'
    +'<div style="font-size:12px;color:#5d7060;margin-top:3px;">'+RT_LRN_esc(v.kanal)+'</div>'
    +(v.beschreibung?'<div style="font-size:12.5px;color:#4a5a4e;margin-top:6px;line-height:1.45;">'+RT_LRN_esc(v.beschreibung)+'</div>':'')
    +'<button class="lrnbtn '+(seen?'lrnbtn-p':'lrnbtn-s')+'" style="margin-top:10px;padding:7px 14px;font-size:13px;" onclick="RT_LRN_markVideo(\''+v.youtubeId+'\')">'+(seen?'✓ Gesehen':'Als gesehen markieren')+'</button>'
    +'</div></div>';
  });
 });
 RT_LRN_set(html);
}
function RT_LRN_markVideo(yid){
 var d=RT_LRN_doneMap();
 if(d['vid:'+yid]){ delete d['vid:'+yid]; rtSet('fp_lrn_done',d); }
 else { RT_LRN_gain(5,'vid:'+yid); }
 RT_LRN_go('video');
}
/* ===== Ende Lernbereich ===== */

/* ============================================================
   Golfbag - Schlaegerauswahl (Konto). Markenneutrale Inline-SVGs:
   je Schlaeger ein eigener Kopf (Groesse/Loft), dynamisch gefaechert
   aus dem oberen Bag-Teil. Speicher: localStorage 'fp_bag' = { <id>:{d} }
   ============================================================ */
var RT_BAG_CLUBS=[
 {id:'dr',l:'Driver'},{id:'3w',l:'Holz 3'},{id:'5w',l:'Holz 5'},{id:'7w',l:'Holz 7'},
 {id:'2h',l:'Hybrid 2'},{id:'3h',l:'Hybrid 3'},{id:'4h',l:'Hybrid 4'},{id:'5h',l:'Hybrid 5'},
 {id:'3i',l:'Eisen 3'},{id:'4i',l:'Eisen 4'},{id:'5i',l:'Eisen 5'},{id:'6i',l:'Eisen 6'},
 {id:'7i',l:'Eisen 7'},{id:'8i',l:'Eisen 8'},{id:'9i',l:'Eisen 9'},
 {id:'pw',l:'Pitching Wedge (PW)'},{id:'gw',l:'Gap Wedge (GW)'},{id:'sw',l:'Sand Wedge (SW)'},{id:'lw',l:'Lob Wedge (LW)'},
 {id:'putter',l:'Putter'}
];
var RT_CLUB_META={
 dr:{t:'wood',s:1.0},'3w':{t:'wood',s:0.84},'5w':{t:'wood',s:0.78},'7w':{t:'wood',s:0.73},
 '2h':{t:'hyb',s:0.80},'3h':{t:'hyb',s:0.76},'4h':{t:'hyb',s:0.72},'5h':{t:'hyb',s:0.69},
 '3i':{t:'iron',lo:18},'4i':{t:'iron',lo:22},'5i':{t:'iron',lo:26},'6i':{t:'iron',lo:30},'7i':{t:'iron',lo:34},'8i':{t:'iron',lo:38},'9i':{t:'iron',lo:42},
 pw:{t:'wedge',lo:47},gw:{t:'wedge',lo:51},sw:{t:'wedge',lo:56},lw:{t:'wedge',lo:60},
 putter:{t:'putter'}
};
/* Innen-Pfade eines Kopfes im Raum 0..60 x 0..100 (Kopf oben, Schaft nach unten) */
/* Foto-Assets: freigestellter Bag + echte Schlaegerkoepfe (Rechte beim Nutzer, keine Marken).
   Bag-Composite als HTML (Bag-Bild + Kopf-Bilder in die Oeffnung), Listen-Icons als Kopf-Zuschnitt. */
var RT_BAG_MAP={dr:'dr','3w':'w1','5w':'w2','7w':'w3','2h':'w3','3h':'i1','4h':'i1','5h':'i1','3i':'i1','4i':'i2','5i':'i3','6i':'i4','7i':'i5','8i':'i6','9i':'i7',pw:'i8',gw:'wg',sw:'wg',lw:'wg',putter:'pt'};
var RT_BAG_LEN={dr:1.0,'3w':.95,'5w':.92,'7w':.90,'2h':.86,'3h':.84,'4h':.82,'5h':.80,'3i':.77,'4i':.75,'5i':.73,'6i':.71,'7i':.69,'8i':.67,'9i':.65,pw:.60,gw:.58,sw:.56,lw:.54,putter:.66};
function RT_clubHead(id,h){ var lab=RT_BAG_MAP[id]||'i4'; h=h||40; return '<img src="/bag/head_'+lab+'_ic.png" alt="" style="height:'+h+'px;width:auto;display:block;flex:none;">'; }
function RT_bagGraphic(inBag,w){
 return '<img src="/bag/bag_hero.png" alt="Golfbag" style="height:236px;width:auto;display:block;margin:0 auto;filter:drop-shadow(0 5px 9px rgba(0,0,0,.16));">';
}
function RT_bagData(){ return rtGet('fp_bag')||{}; }
function RT_bagSave(b){ rtSet('fp_bag',b); }
var RT_bagPushT=null;
function RT_bagCloudPush(now){
 if(!sb||!sbUser) return;
 if(RT_bagPushT){ clearTimeout(RT_bagPushT); RT_bagPushT=null; }
 var doPush=function(){ if(!sb||!sbUser) return; try{ sb.from('golfbag').upsert({user_id:sbUser.id,data:RT_bagData(),updated_at:new Date().toISOString()}).then(function(){},function(){}); }catch(e){} };
 if(now){ doPush(); } else { RT_bagPushT=setTimeout(doPush,1200); }
}
function RT_bagCloudPull(){
 if(!sb||!sbUser) return;
 try{
  sb.from('golfbag').select('data').eq('user_id',sbUser.id).maybeSingle().then(function(r){
   if(r&&!r.error&&r.data&&r.data.data){
    var cloud=r.data.data, local=RT_bagData(), changed=false;
    Object.keys(cloud).forEach(function(id){ var cv=cloud[id]; if(!cv) return;
     if(!local[id]){ local[id]=cv; changed=true; }
     else if((local[id].d==null||isNaN(local[id].d)) && cv.d!=null){ local[id].d=cv.d; changed=true; }
    });
    if(changed){ RT_bagSave(local); if(RT_state.screen==='bag'){ try{ RT_render(); }catch(e){} } }
   }
   RT_bagCloudPush(true);
  },function(){});
 }catch(e){}
}

function RT_bagCount(){ var b=RT_bagData(),n=0; for(var k in b){ if(b.hasOwnProperty(k)) n++; } return n; }
function RT_bagInOrder(){ var b=RT_bagData(); return RT_BAG_CLUBS.filter(function(c){ return b[c.id]; }); }
function RT_bagAdd(id){ var b=RT_bagData(); if(!b[id]) b[id]={d:null}; RT_bagSave(b); RT_render(); }
function RT_bagRemove(id){ var b=RT_bagData(); delete b[id]; RT_bagSave(b); RT_render(); }
function RT_bagAddAll(){ var b=RT_bagData(); RT_BAG_CLUBS.forEach(function(c){ if(!b[c.id]) b[c.id]={d:null}; }); RT_bagSave(b); RT_render(); }
function RT_bagDist(id,val){ var b=RT_bagData(); if(!b[id]) b[id]={d:null}; var n=parseInt(val,10); b[id].d=(isNaN(n)?null:n); RT_bagSave(b); }
function RT_rBag(){
 var b=RT_bagData();
 var inBag=RT_bagInOrder();
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="RT_go(\'user\')">&#8249;</button>'+
  '<div class="rt-h1" style="font-size:18px;">Golfbag</div></div>';
 // Bag-Grafik ueber der Box
 h+='<div style="display:flex;justify-content:center;margin:2px 0 6px;">'+RT_bagGraphic(inBag.map(function(c){return c.id;}),236)+'</div>';
 // Dein Bag
 h+='<div class="rtc"><div class="rt-ct">Dein Bag ('+inBag.length+')</div>';
 if(!inBag.length){ h+='<div class="rt-cs" style="margin-bottom:0;">Noch keine Schläger im Bag. Füge unten deine Schläger hinzu – sie erscheinen dann im Bag oben.</div>'; }
 else{
  h+='<div class="rt-cs">Trage optional deine durchschnittliche Schlaglänge ein.</div>';
  inBag.forEach(function(c){ var d=(b[c.id]&&b[c.id].d!=null)?b[c.id].d:'';
   h+='<div class="rt-row" style="align-items:center;gap:9px;margin-top:8px;">'+
      '<div style="width:38px;display:flex;justify-content:center;flex:none;">'+RT_clubHead(c.id,44)+'</div>'+
      '<div style="flex:1;font-weight:600;color:#143522;">'+rtEsc(c.l)+'</div>'+
      '<input class="rt-inp" style="width:70px;margin:0;text-align:right;" inputmode="numeric" placeholder="–" value="'+d+'" onchange="RT_bagDist(\''+c.id+'\',this.value)">'+
      '<span style="color:#5d7060;font-size:13px;">m</span>'+
      '<button class="rt-btn3" style="color:#B03A3A;padding:4px 6px;font-size:15px;" onclick="RT_bagRemove(\''+c.id+'\')">&#10005;</button>'+
      '</div>';
  });
 }
 h+='</div>';
 // Hinzufuegen
 var avail=RT_BAG_CLUBS.filter(function(c){ return !b[c.id]; });
 if(avail.length){
  h+='<div class="rtc"><div style="display:flex;justify-content:space-between;align-items:center;">'+
     '<div class="rt-ct" style="margin:0;">Schläger hinzufügen</div>'+
     '<button class="rt-btn3" style="color:#1F8A4D;font-weight:700;padding:4px 6px;" onclick="RT_bagAddAll()">Alle</button></div>';
  avail.forEach(function(c){
   h+='<div class="rt-row" style="align-items:center;gap:9px;margin-top:8px;">'+
      '<div style="width:38px;display:flex;justify-content:center;flex:none;">'+RT_clubHead(c.id,44)+'</div>'+
      '<div style="flex:1;color:#143522;">'+rtEsc(c.l)+'</div>'+
      '<button class="rt-btn2" style="width:auto;padding:6px 16px;" onclick="RT_bagAdd(\''+c.id+'\')">Hinzufügen</button></div>';
  });
  h+='</div>';
 }
 h+='<div class="rt-cs" style="margin-top:10px;">Deine Schläger und Distanzen bilden die Grundlage für spätere Schlägerempfehlungen auf dem Platz.</div>';
 return h;
}
/* ===== Ende Golfbag ===== */

/* ============================================================
   Platzsuche auf der Karte (OSM-Golfplaetze DE ueber /api/courses)
   + persoenliche Listen (gespeichert/bucket/heimat) & Bewertungen (Supabase)
   ============================================================ */
var RT_CM={courses:null,map:null,layer:null,labels:null,mk:{},mkDot:{},userLL:null,sel:null,lists:{},myR:{},agg:{},loading:false};
var RT_CM_DIFF=['','sehr leicht','leicht','mittel','schwer','sehr schwer'];
function RT_cmOpen(){ RT_go('courseMap'); }
function RT_rCourseMap(){
 return '<div id="cm-wrap" style="position:fixed;inset:0;z-index:1000;background:#5f6e50;">'
  +'<div id="cm-map" style="position:absolute;inset:0;"></div>'
  +'<button onclick="RT_go(\'coursePick\')" style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:12px;z-index:1002;width:40px;height:40px;border-radius:50%;border:none;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.25);font-size:20px;color:#143522;cursor:pointer;">&#8249;</button>'
  +'<div style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 12px);left:50%;transform:translateX(-50%);z-index:1002;background:#fff;border-radius:100px;padding:8px 15px;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:13px;font-weight:700;color:#143522;">Golfplätze in Deutschland</div>'
  +'<div id="cm-loading" style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 64px);left:50%;transform:translateX(-50%);z-index:1001;background:#fff;border-radius:10px;padding:8px 14px;box-shadow:0 2px 10px rgba(0,0,0,.18);font-size:12.5px;color:#333;">Lädt Plätze …</div>'
  +'<div id="cm-sheet" style="position:absolute;left:0;right:0;bottom:0;z-index:1003;pointer-events:none;"></div>'
  +'</div>';
}
function RT_cmInit(){
 if(typeof L==='undefined'){ return; }
 var el=document.getElementById('cm-map'); if(!el) return;
 if(!document.getElementById('cm-style2')){ var _s2=document.createElement('style'); _s2.id='cm-style2'; _s2.textContent='#cm-map .leaflet-container{background:#6b7a5c;}#cm-map .leaflet-tile{filter:brightness(1.14) saturate(1.03);}'; document.head.appendChild(_s2); }
 var map=L.map('cm-map',{zoomControl:false,attributionControl:false,preferCanvas:true}).setView([51.2,10.4],6);
 L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:20}).addTo(map);
 RT_CM.map=map; RT_CM.layer=L.layerGroup().addTo(map); RT_CM.labels=L.layerGroup().addTo(map); RT_CM.mk={};
 map.on('moveend zoomend',RT_cmMarkers);
 map.on('click',function(){ if(RT_CM._selAt&&(+new Date()-RT_CM._selAt)<450) return; RT_cmCloseSheet(); });
 // Standort des Nutzers
 try{ if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(function(p){
   RT_CM.userLL={lat:p.coords.latitude,lng:p.coords.longitude};
   try{ RT_cmUserDot(); map.setView([RT_CM.userLL.lat,RT_CM.userLL.lng],13); }catch(e){}
   if(RT_CM.sel) RT_cmSheet(RT_CM.sel);
 },function(){},{enableHighAccuracy:false,timeout:6000,maximumAge:600000}); } }catch(e){}
 RT_cmLoadLists();
 RT_cmLoadCourses();
}
function RT_cmLoadCourses(tries){
 tries=tries||0;
 var cached=null; try{ cached=rtGet('fp_cm_courses_v2'); }catch(e){}
 var now=+new Date();
 if(cached&&cached.ts&&(now-cached.ts)<7*864e5&&cached.list&&cached.list.length>50){ RT_CM.courses=cached.list; RT_cmMarkers(); try{RT_backfillCourseRefs();}catch(e){} return; }
 RT_CM.loading=true;
 var l0=document.getElementById('cm-loading'); if(l0){ l0.style.display='block'; l0.textContent='Lädt Plätze …'; }
 fetch('/api/courses').then(function(r){ return r.json(); }).then(function(j){
  var list=(j&&j.courses)||[];
  if(!list.length&&tries<2){ setTimeout(function(){ RT_cmLoadCourses(tries+1); },1500); return; }
  RT_CM.courses=list; RT_CM.loading=false;
  try{ if(list.length>50) rtSet('fp_cm_courses_v2',{ts:now,list:list}); }catch(e){}
  RT_cmMarkers(); try{RT_backfillCourseRefs();}catch(e){}
  var l=document.getElementById('cm-loading'); if(l){ l.style.display='block'; l.textContent=list.length+' Plätze'; setTimeout(function(){ var l2=document.getElementById('cm-loading'); if(l2) l2.style.display='none'; },1600); }
 }).catch(function(){ if(tries<2){ setTimeout(function(){ RT_cmLoadCourses(tries+1); },1800); return; } RT_CM.loading=false; var l=document.getElementById('cm-loading'); if(l) l.textContent='Plätze konnten nicht geladen werden.'; });
}
function RT_cmLoadLists(){
 if(!(sbReady()&&sb&&sbUser)) return;
 sb.from('course_lists').select('course_ref,kind').then(function(res){ var rows=(res&&res.data)||[]; var m={};
  rows.forEach(function(x){ if(!m[x.course_ref]) m[x.course_ref]={}; m[x.course_ref][x.kind]=1; }); RT_CM.lists=m;
  if(RT_CM.courses) RT_cmMarkers(); if(RT_CM.sel) RT_cmSheet(RT_CM.sel);
 });
 sb.from('course_ratings').select('course_ref,stars,difficulty').then(function(res){ var rows=(res&&res.data)||[]; var m={};
  rows.forEach(function(x){ m[x.course_ref]={stars:x.stars,difficulty:x.difficulty}; }); RT_CM.myR=m;
  if(RT_CM.sel) RT_cmSheet(RT_CM.sel);
 });
}
function RT_cmUserDot(){ if(!RT_CM.userLL||!RT_CM.layer||typeof L==='undefined') return; L.marker([RT_CM.userLL.lat,RT_CM.userLL.lng],{interactive:false,keyboard:false,zIndexOffset:1000,icon:L.divIcon({className:'',iconSize:[18,18],iconAnchor:[9,9],html:'<div style="width:14px;height:14px;border-radius:50%;background:#0A84FF;border:2px solid #fff;box-shadow:0 0 0 2px rgba(10,132,255,.35);"></div>'})}).addTo(RT_CM.layer); }
function RT_cmMarkers(){
 var map=RT_CM.map; if(!map||!RT_CM.courses) return;
 RT_CM.layer.clearLayers(); RT_CM.mk={}; RT_CM.mkDot={};
 if(RT_CM.userLL){ try{ RT_cmUserDot(); }catch(e){} }
 var bnds=null; try{ bnds=map.getBounds().pad(0.4); }catch(e){}
 var n=0;
 for(var i=0;i<RT_CM.courses.length;i++){ var c=RT_CM.courses[i];
  if(c.lat==null||c.lon==null) continue;
  if(bnds&&!bnds.contains([c.lat,c.lon])) continue;
  var st=(RT_CM.lists||{})[c.ref]||{}; var col=st.home?'#1F8A4D':(st.saved||st.bucket?'#e0913a':'#B03A3A');
  /* Platz als geografische Flaeche (Radius in Metern) statt fester Pixel-Punkt: beim
     Hineinzoomen waechst der Kreis zur echten Platzausdehnung. Radius grob nach Lochzahl
     (18 groesser, 9 kleiner), Fallback fuer unbekannte Lochzahl. Zusaetzlich ein kleiner,
     immer sichtbarer Mittelpunkt als Tap-Anker fuer die Landesuebersicht. */
  var rMet=(c.holes!=null)?(c.holes>=18?520:(c.holes<=9?300:430)):430;
  var area=L.circle([c.lat,c.lon],{radius:rMet,color:col,weight:1.5,opacity:.9,fillColor:col,fillOpacity:.16});
  var dot=L.circleMarker([c.lat,c.lon],{radius:5,color:'#fff',weight:2,fillColor:col,fillOpacity:.98});
  (function(cc){ var sel=function(e){ if(e&&e.originalEvent) e.originalEvent.stopPropagation(); RT_CM._selAt=+new Date(); RT_cmSelect(cc); }; area.on('click',sel); dot.on('click',sel); })(c);
  area.addTo(RT_CM.layer); dot.addTo(RT_CM.layer); RT_CM.mk[c.ref]=area; RT_CM.mkDot[c.ref]=dot;
  if(++n>=400) break;
 }
 RT_cmLabels();
}
function RT_cmLabels(){
 var map=RT_CM.map; if(!map||!RT_CM.courses||!RT_CM.labels) return;
 RT_CM.labels.clearLayers();
 if(map.getZoom()<9) return;
 var b=map.getBounds(), n=0;
 for(var i=0;i<RT_CM.courses.length&&n<80;i++){ var c=RT_CM.courses[i];
  if(b.contains([c.lat,c.lon])){ n++;
   L.marker([c.lat,c.lon],{interactive:false,icon:L.divIcon({className:'',iconSize:[0,0],
    html:'<div style="position:absolute;left:8px;top:-8px;white-space:nowrap;font-size:11px;font-weight:600;color:#143522;text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff;">'+RT_cmEsc(c.name)+'</div>'})}).addTo(RT_CM.labels);
  }
 }
}
function RT_cmEsc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function RT_cmDistTxt(c){ if(!RT_CM.userLL) return null; try{ var m=RT_haversineM(RT_CM.userLL.lat,RT_CM.userLL.lng,c.lat,c.lon); return (m<1000)?(Math.round(m)+' m'):((m/1000).toFixed(m<10000?1:0).replace('.',',')+' km'); }catch(e){ return null; } }
function RT_cmSelect(c){
 RT_CM.sel=c;
 try{ RT_CM.map.panTo([c.lat,c.lon]); }catch(e){}
 RT_cmSheet(c);
 if(sbReady()&&sb){ sb.rpc('course_ratings_agg',{refs:[c.ref]}).then(function(res){ var d=(res&&res.data&&res.data[0])||null; RT_CM.agg[c.ref]=d||{cnt:0}; if(RT_CM.sel&&RT_CM.sel.ref===c.ref) RT_cmSheet(c); }); }
}
function RT_cmCloseSheet(){ RT_CM.sel=null; var s=document.getElementById('cm-sheet'); if(s) s.innerHTML=''; }
function RT_cmStars(ref,mine){
 var out=''; for(var i=1;i<=5;i++){ out+='<span onclick="RT_cmRate(\''+ref+'\','+i+')" style="cursor:pointer;font-size:24px;line-height:1;color:'+(mine>=i?'#F6C35A':'#d6ddd6')+';">&#9733;</span>'; } return out;
}
function RT_cmSheet(c){
 var host=document.getElementById('cm-sheet'); if(!host) return;
 var st=(RT_CM.lists||{})[c.ref]||{}; var ag=RT_CM.agg[c.ref]||null; var mine=RT_CM.myR[c.ref]||{};
 var dist=RT_cmDistTxt(c);
 var holesTxt=(c.holes!=null)?(c.holes+' Löcher'):null;
 var meta=[]; if(holesTxt) meta.push(holesTxt); if(dist) meta.push(dist);
 if(ag&&ag.avg_diff!=null) meta.push('Schwierigkeit: '+RT_CM_DIFF[Math.round(ag.avg_diff)]);
 var ratingChip=(ag&&ag.cnt>0)?('★ '+String(ag.avg_stars).replace('.',',')+' ('+ag.cnt+')'):'Ohne Bewertung';
 var inList=!!(st.saved||st.bucket||st.home);
 var loggedIn=!!(sbReady()&&sb&&sbUser);
 var bmCol=inList?'#fff':'#143522';
 var bm='<svg width="19" height="19" viewBox="0 0 24 24" fill="'+bmCol+'"><path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z"/></svg>';
 var h='<div style="pointer-events:auto;background:#fff;border-radius:22px 22px 0 0;box-shadow:0 -4px 24px rgba(0,0,0,.22);max-width:520px;margin:0 auto;overflow:hidden;">'
  +'<div style="position:relative;height:92px;background:linear-gradient(135deg,#2E7D4F,#143522);">'
    +'<div style="position:absolute;left:50%;top:8px;transform:translateX(-50%);width:40px;height:5px;border-radius:3px;background:rgba(255,255,255,.55);"></div>'
    +'<div style="position:absolute;left:14px;bottom:12px;background:rgba(255,255,255,.94);border-radius:100px;padding:5px 11px;font-size:12px;font-weight:800;color:#143522;">'+ratingChip+'</div>'
    +'<button onclick="RT_cmActions(\''+c.ref+'\')" aria-label="Merken" style="position:absolute;right:12px;bottom:10px;border:none;width:42px;height:42px;border-radius:50%;background:'+(inList?'#1F8A4D':'rgba(255,255,255,.94)')+';cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.28);display:flex;align-items:center;justify-content:center;">'+bm+'</button>'
    +'<button onclick="RT_cmCloseSheet()" aria-label="Schliessen" style="position:absolute;right:62px;bottom:12px;border:none;background:rgba(255,255,255,.9);border-radius:50%;width:38px;height:38px;font-size:15px;color:#143522;cursor:pointer;">✕</button>'
  +'</div>'
  +'<div style="padding:12px 16px calc(env(safe-area-inset-bottom,0px) + 16px);">'
    +'<div style="font-size:18px;font-weight:800;color:#143522;line-height:1.25;">'+RT_cmEsc(c.name)+'</div>'
    +(meta.length?'<div style="font-size:13px;color:#5d7060;margin-top:5px;">'+meta.join(' · ')+'</div>':'');
 var _pmKey=RT_placeMatch(c);
 h+='<button onclick="RT_cmPlay(\''+c.ref+'\')" style="margin-top:13px;width:100%;border:none;background:#1F8A4D;color:#fff;font-family:Inter,sans-serif;font-weight:800;font-size:15px;padding:13px;border-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">'+(_pmKey?'▶︎ Hier spielen':'▶︎ Hier spielen · Löcher anlegen')+'</button>';
 if(loggedIn){
  h+='<div style="margin-top:13px;padding-top:12px;border-top:1px solid #eef1ee;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">'
    +'<div><div style="font-size:12px;color:#5d7060;margin-bottom:2px;">Deine Bewertung</div>'+RT_cmStars(c.ref,mine.stars||0)+'</div>'
    +'<div style="text-align:right;"><div style="font-size:12px;color:#5d7060;margin-bottom:3px;">Schwierigkeit</div>'
    +'<select onchange="RT_cmDiff(\''+c.ref+'\',this.value)" style="border:1.5px solid #DCE7D4;border-radius:10px;padding:7px 9px;font-size:13px;font-family:Inter,sans-serif;"><option value="">—</option>'
    +[1,2,3,4,5].map(function(i){ return '<option value="'+i+'"'+((mine.difficulty==i)?' selected':'')+'>'+RT_CM_DIFF[i]+'</option>'; }).join('')+'</select></div></div>';
 } else {
  h+='<div style="margin-top:12px;padding:11px 13px;background:#f3f7f3;border-radius:12px;font-size:12.5px;color:#3a4a3e;">Zum Merken, für Listen/Heimatplatz und zum Bewerten bitte im Konto anmelden.</div>';
 }
 h+='</div></div>';
 host.innerHTML=h;
}
function RT_cmActions(ref){
 if(!(sbReady()&&sb&&sbUser)){ if(RT_CM.sel) RT_cmSheet(RT_CM.sel); return; }
 var st=(RT_CM.lists||{})[ref]||{};
 var row=function(kind,label,ic){ var on=!!st[kind]; return '<button onclick="RT_cmActPick(\''+ref+'\',\''+kind+'\')" style="display:flex;align-items:center;gap:12px;width:100%;border:none;background:#fff;padding:16px 18px;font-size:15.5px;font-weight:600;color:#143522;font-family:Inter,sans-serif;cursor:pointer;text-align:left;"><span style="font-size:18px;width:22px;text-align:center;">'+ic+'</span><span style="flex:1;">'+label+'</span>'+(on?'<span style="color:#1F8A4D;font-weight:800;">✓</span>':'')+'</button>'; };
 var dv='<div style="height:1px;background:#eef1ee;margin:0 18px;"></div>';
 var o=document.createElement('div'); o.id='cm-act';
 o.style.cssText='position:fixed;inset:0;z-index:1010;background:rgba(10,20,12,.35);display:flex;flex-direction:column;justify-content:flex-end;';
 o.addEventListener('click',function(e){ if(e.target===o) RT_cmActClose(); });
 o.innerHTML='<div style="max-width:520px;width:100%;margin:0 auto;padding:0 8px calc(env(safe-area-inset-bottom,0px) + 10px);">'
   +'<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:8px;">'+row('saved','Zu gespeicherten Plätzen','🔖')+dv+row('bucket','Zur Bucket-Liste','📋')+dv+row('home','Als Heimatplatz','🏠')+'</div>'
   +'<button onclick="RT_cmActClose()" style="width:100%;border:none;background:#fff;border-radius:16px;padding:16px;font-size:16px;font-weight:800;color:#143522;font-family:Inter,sans-serif;cursor:pointer;">Abbrechen</button>'
 +'</div>';
 document.body.appendChild(o);
}
function RT_cmActPick(ref,kind){ RT_cmToggle(ref,kind); RT_cmActClose(); }
function RT_cmActClose(){ var o=document.getElementById('cm-act'); if(o&&o.parentNode) o.parentNode.removeChild(o); }
function RT_cmToggle(ref,kind){
 if(!(sbReady()&&sb&&sbUser)){ return; }
 var c=RT_CM.sel; if(!c||c.ref!==ref){ for(var i=0;i<(RT_CM.courses||[]).length;i++){ if(RT_CM.courses[i].ref===ref){ c=RT_CM.courses[i]; break; } } }
 var st=RT_CM.lists[ref]||(RT_CM.lists[ref]={});
 if(st[kind]){
  delete st[kind];
  sb.from('course_lists').delete().eq('user_id',sbUser.id).eq('course_ref',ref).eq('kind',kind).then(function(){});
 } else {
  st[kind]=1;
  sb.from('course_lists').upsert({user_id:sbUser.id,course_ref:ref,kind:kind,name:c?c.name:null,lat:c?c.lat:null,lon:c?c.lon:null,holes:c?c.holes:null}).then(function(){});
 }
 RT_cpLists=null;
 if(RT_CM.sel&&RT_CM.sel.ref===ref) RT_cmSheet(RT_CM.sel);
 var mk=RT_CM.mk[ref]; if(mk){ var s2=RT_CM.lists[ref]||{}; var c2=(s2.home?'#1F8A4D':(s2.saved||s2.bucket?'#e0913a':'#B03A3A')); mk.setStyle({color:c2,fillColor:c2}); var dd=(RT_CM.mkDot||{})[ref]; if(dd) dd.setStyle({fillColor:c2}); }
}
function RT_cmRate(ref,stars){
 if(!(sbReady()&&sb&&sbUser)){ return; }
 var cur=RT_CM.myR[ref]||{}; cur.stars=stars; RT_CM.myR[ref]=cur;
 var c=RT_CM.sel;
 sb.from('course_ratings').upsert({user_id:sbUser.id,course_ref:ref,stars:stars,difficulty:cur.difficulty||null,name:c?c.name:null,updated_at:new Date().toISOString()}).then(function(){
  if(sb) sb.rpc('course_ratings_agg',{refs:[ref]}).then(function(res){ var d=(res&&res.data&&res.data[0])||null; RT_CM.agg[ref]=d||{cnt:0}; if(RT_CM.sel&&RT_CM.sel.ref===ref) RT_cmSheet(RT_CM.sel); });
 });
 if(RT_CM.sel&&RT_CM.sel.ref===ref) RT_cmSheet(RT_CM.sel);
}
function RT_cmDiff(ref,val){
 if(!(sbReady()&&sb&&sbUser)){ return; }
 var n=parseInt(val,10); var d=(isNaN(n)?null:n);
 var cur=RT_CM.myR[ref]||{}; cur.difficulty=d; RT_CM.myR[ref]=cur;
 var c=RT_CM.sel;
 sb.from('course_ratings').upsert({user_id:sbUser.id,course_ref:ref,stars:cur.stars||null,difficulty:d,name:c?c.name:null,updated_at:new Date().toISOString()}).then(function(){
  if(sb) sb.rpc('course_ratings_agg',{refs:[ref]}).then(function(res){ var dd=(res&&res.data&&res.data[0])||null; RT_CM.agg[ref]=dd||{cnt:0}; if(RT_CM.sel&&RT_CM.sel.ref===ref) RT_cmSheet(RT_CM.sel); });
 });
}
/* Meine Plaetze (Listen) */
function RT_rMyCourses(){
 var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">'+
  '<button class="rt-btn3" style="padding:4px 8px 4px 0;font-size:18px;" onclick="RT_go(\'coursePick\')">&#8249;</button>'+
  '<div class="rt-h1" style="font-size:18px;">Meine Plätze</div></div>';
 if(!(sbReady()&&sb&&sbUser)){ return h+'<div class="rt-note">Zum Speichern von Plätzen bitte im Konto anmelden.</div>'; }
 h+='<div id="mc-body"><div class="rt-cs">Lädt …</div></div>';
 sb.from('course_lists').select('course_ref,kind,name,lat,lon,holes,created_at').order('created_at',{ascending:false}).then(function(res){
  var rows=(res&&res.data)||[]; var body=document.getElementById('mc-body'); if(!body) return; RT_CM._mc={}; rows.forEach(function(x){ RT_CM._mc[x.course_ref]=x; });
  if(!rows.length){ body.innerHTML='<div class="rtc"><div class="rt-cs" style="margin:0;">Noch keine Plätze gespeichert. Öffne „Auf der Karte suchen" und tippe einen Platz an.</div></div>'; return; }
  var groups={home:[],saved:[],bucket:[]}; rows.forEach(function(r){ (groups[r.kind]||(groups[r.kind]=[])).push(r); });
  var titles={home:'🏠 Heimatplätze',saved:'🔖 Gespeichert',bucket:'📋 Bucket-Liste'};
  var out='';
  ['home','saved','bucket'].forEach(function(k){ var arr=groups[k]||[]; if(!arr.length) return;
   out+='<div class="rt-ct" style="margin:14px 2px 8px;">'+titles[k]+' ('+arr.length+')</div>';
   arr.forEach(function(r){ var dist=RT_CM.userLL?RT_cmDistTxt({lat:r.lat,lon:r.lon}):null;
    var _mk=RT_placeMatch({ref:r.course_ref,name:r.name,lat:r.lat,lon:r.lon});
    var _sub=(_mk?('Spielbar ✓'+((r.holes!=null)?(' · '+r.holes+' Löcher'):'')):((r.holes!=null)?(r.holes+' Löcher'):'Löcher —'))+(dist?(' · '+dist):'');
    out+='<div class="rtc" style="margin-bottom:8px;display:flex;align-items:center;gap:8px;"><div style="flex:1;"><div style="font-weight:700;color:#143522;">'+RT_cmEsc(r.name||r.course_ref)+(_mk?' <span style="color:#1F8A4D;font-size:11px;font-weight:800;">✓</span>':'')+'</div>'
     +'<div class="rt-cs" style="margin:2px 0 0;">'+_sub+'</div></div>'
     +'<button class="rt-btn3" style="color:#1F8A4D;font-weight:800;padding:6px 8px;" onclick="RT_mcStart(\''+r.course_ref+'\')">'+(_mk?'Spielen':'Anlegen')+'</button>'
     +'<button class="rt-btn3" style="color:#B03A3A;padding:6px 8px;" onclick="RT_mcRemove(\''+r.course_ref+'\',\''+r.kind+'\')">Entfernen</button></div>';
   });
  });
  body.innerHTML=out;
 });
 return h;
}
function RT_mcRemove(ref,kind){
 if(!(sbReady()&&sb&&sbUser)) return;
 sb.from('course_lists').delete().eq('user_id',sbUser.id).eq('course_ref',ref).eq('kind',kind).then(function(){ if(RT_CM.lists[ref]) delete RT_CM.lists[ref][kind]; RT_cpLists=null; RT_render(); });
}
/* ===== Ende Platzsuche ===== */

/* ============================================================
   M5 · Shot-Tracer (Analyse-Tab) — "Realistischer Umbau"
   Video importieren/aufnehmen; nur 2 Taps: Ball + Landung. Ein ziehbarer Bogen-Punkt
   traced die tatsaechliche Flugkurve (quadratische Bezier). Die App KLASSIFIZIERT den
   Ballflug automatisch (Gerade/Draw/Fade/Hook/Slice) und gibt einen Coaching-Tipp.
   Ehrlich: Ballgeschwindigkeit/Apex/echte Distanz kommen NICHT aus dem Video (nur mit
   Launch-Monitor bzw. GPS beim Start aus der Bahn). Alles lokal im Browser.
   ============================================================ */
var RT_TRC={panel:'tab-analyse',video:null,canvas:null,url:null,fps:30,
  marks:{ball:null,land:null},apex:null,mode:null,handed:'r',dpr:1,drag:false,col:'#F2C230',
  track:null,extrap:null,tracking:false,_prev:null,_lost:0,
  rec:null,recChunks:null,stream:null,built:false};

var RT_TRC_SHAPES={
 'Gerade':{col:'#1F8A4D',good:true,tip:'Ziellinie und Schlagfläche standen quadratisch – sauber getroffen.',opp:'Für einen kontrollierten Draw: Stand minimal geschlossen, Schwung etwas von innen.'},
 'Draw':{col:'#1F8A4D',good:true,tip:'Kontrollierter Draw – der Ball dreht sauber ein. Gut für Länge und Wind von der Seite.',opp:'Für einen Fade: Stand leicht offen, Schlagfläche zum Ziel, etwas von außen anschwingen.'},
 'Fade':{col:'#1F8A4D',good:true,tip:'Kontrollierter Fade – verlässlich und gut zu steuern, ideal für Präzision.',opp:'Für einen Draw: Stand leicht geschlossen, von innen anschwingen, Hände aktiver durch den Treffmoment.'},
 'Hook':{col:'#E08A1E',good:false,tip:'Deutlicher Hook. Meist zu geschlossene Schlagfläche oder zu starker Griff.',opp:'Gegenmittel: Griff neutraler, Schlagfläche im Treffmoment nicht überdrehen, Körperrotation mitnehmen.'},
 'Slice':{col:'#E08A1E',good:false,tip:'Deutlicher Slice. Meist offene Schlagfläche oder Schwungbahn von außen.',opp:'Gegenmittel: Griff etwas stärker, von innen anschwingen, Schlagfläche früher schließen.'}
};

function RT_TRC_esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

function RT_TRC_ensureStyle(){
  if(document.getElementById('trc-style'))return;
  var s=document.createElement('style');s.id='trc-style';
  s.textContent=
  '.trcwrap{max-width:640px;margin:0 auto;padding:2px 2px 34px;}'
  +'.trchead{display:flex;align-items:center;gap:8px;margin-bottom:12px;}'
  +'.trctitle{font-size:18px;font-weight:800;color:#143522;}'
  +'.trccard{background:#fff;border-radius:16px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.06);margin-top:10px;}'
  +'.trcvid{position:relative;width:100%;background:#0b160f;border-radius:14px;overflow:hidden;line-height:0;}'
  +'.trcvid video{display:block;width:100%;height:auto;background:#0b160f;}'
  +'.trcvid canvas{position:absolute;left:0;top:0;touch-action:none;cursor:crosshair;}'
  +'.trcrow{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:10px;}'
  +'.trcb{border:1px solid #cfe0d2;background:#fff;color:#143522;border-radius:10px;padding:8px 12px;font-size:13px;font-weight:600;cursor:pointer;flex:none;}'
  +'.trcb:active{transform:scale(.97);}'
  +'.trcb.pri{background:#1F8A4D;border-color:#1F8A4D;color:#fff;}'
  +'.trcb.on{background:#12261B;border-color:#12261B;color:#fff;}'
  +'.trcb.set{border-color:#1F8A4D;color:#1F8A4D;}'
  +'.trcb.ic{padding:8px 10px;font-size:16px;line-height:1;}'
  +'.trchint{font-size:12.5px;color:#5d7060;line-height:1.5;margin-top:6px;}'
  +'.trcslab{font-size:12px;color:#5d7060;min-width:74px;}'
  +'.trcscrub{flex:1;min-width:120px;accent-color:#1F8A4D;}'
  +'.trctime{font-size:12px;color:#5d7060;font-variant-numeric:tabular-nums;min-width:78px;text-align:right;}';
  document.head.appendChild(s);
}

function RT_TRC_mount(panelId){
  RT_TRC.panel=panelId||'tab-analyse';RT_TRC_ensureStyle();
  try{ var _sc=localStorage.getItem('fp_trc_col'); if(_sc) RT_TRC.col=_sc; }catch(e){}
  RT_TRC_render();
}

function RT_TRC_render(){
  var el=document.getElementById(RT_TRC.panel);if(!el)return;
  var h='<div class="trcwrap">'
   +'<div class="trchead"><div class="trctitle">Shot-Tracer</div></div>'
   +'<div class="trccard">'
   +'<div class="trcvid" id="trc-stage">'
   +'<video id="trc-video" playsinline preload="metadata" style="display:none;"></video>'
   +'<canvas id="trc-canvas" style="display:none;"></canvas>'
   +'<div id="trc-empty" style="padding:40px 20px;text-align:center;color:#b9c8bd;">'
     +'<div style="font-size:40px;line-height:1;margin-bottom:8px;">🎥</div>'
     +'<div style="font-size:14px;color:#5d7060;line-height:1.5;">Video importieren oder aufnehmen,<br>dann nur Ball und Landung antippen.</div>'
   +'</div>'
   +'</div>'
   +'<div id="trc-controls" style="display:none;">'
     +'<div class="trcrow">'
       +'<button class="trcb pri" id="trc-play" onclick="RT_TRC_togglePlay()">▶︎ Play</button>'
       +'<button class="trcb ic" onclick="RT_TRC_frame(-1)" title="Ein Bild zurück">⏮</button>'
       +'<button class="trcb ic" onclick="RT_TRC_frame(1)" title="Ein Bild vor">⏭</button>'
       +'<button class="trcb" id="trc-slow" onclick="RT_TRC_slow()">Zeitlupe ¼×</button>'
     +'</div>'
     +'<div class="trcrow"><span class="trctime" id="trc-t">0.00 / 0.00 s</span>'
       +'<input class="trcscrub" id="trc-scrub" type="range" min="0" max="1000" value="0" oninput="RT_TRC_scrub(this.value)"></div>'
   +'</div>'
   +'</div>'
   +'<div class="trccard" id="trc-mark" style="display:none;">'
     +'<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">'
       +'<div style="font-weight:700;color:#143522;">Markieren</div>'
       +'<button class="trcb" id="trc-hand" onclick="RT_TRC_toggleHand()" style="padding:6px 10px;font-size:12px;">Rechtshänder</button>'
     +'</div>'
     +'<div class="trchint"><b>Automatisch:</b> Bild kurz nach dem Treffmoment ansteuern (⏮/⏭), <b>① Ball</b> antippen, dann <b>🎯 Ball verfolgen</b> – die App zeichnet den Ballflug Bild für Bild nach (durchgezogen) und extrapoliert ab Ball-Verlust den Rest (gestrichelt). <b>Manuell:</b> alternativ Ball + Landung tippen und den <span style="color:#E0A000;">gelben Punkt</span> auf die Kurve ziehen.</div>'
     +'<div class="trcrow">'
       +'<button class="trcb" id="trc-mb-ball" onclick="RT_TRC_setMode(\'ball\')">① Ball</button>'
       +'<button class="trcb" id="trc-mb-land" onclick="RT_TRC_setMode(\'land\')">② Landung</button>'
       +'<button class="trcb" onclick="RT_TRC_clearMarks()">Zurücksetzen</button>'
     +'</div>'
     +'<div class="trcrow"><button class="trcb pri" id="trc-track" onclick="RT_TRC_armTrack()" style="flex:1;">🎯 Ball verfolgen (Bild-für-Bild)</button></div>'
     +RT_TRC_colorRowHtml()
     +'<div id="trc-analysis" style="margin-top:12px;"></div>'
   +'</div>'
   +'<div class="trccard">'
     +'<div class="trcrow" style="flex-wrap:nowrap;gap:10px;">'
       +'<label class="trcb pri" style="flex:1;display:flex;align-items:center;justify-content:center;text-align:center;">Video importieren'
         +'<input type="file" accept="video/*" style="display:none;" onchange="RT_TRC_pickFile(this)"></label>'
       +'<button class="trcb" id="trc-rec" onclick="RT_TRC_toggleRec()" style="flex:1;">● Aufnehmen</button>'
     +'</div>'
     +'<div class="trcrow" style="gap:10px;">'
       +'<span class="trcslab" style="min-width:auto;">Bildrate</span>'
       +'<select class="trcb" id="trc-fps" onchange="RT_TRC_setFps(this.value)" style="padding:8px;flex:none;">'
         +'<option value="24">24</option><option value="25">25</option>'
         +'<option value="30" selected>30</option><option value="50">50</option>'
         +'<option value="60">60</option></select>'
     +'</div>'
     +'<div class="trchint">Für Zeitlupe/Einzelbild sollte die Bildrate zum Video passen. Aufnahmen laufen nur auf dem Gerät (Kamerafreigabe nötig).</div>'
   +'</div>'
   +'<div class="trccard" id="trc-hist" style="display:none;"></div>'
   +'</div>';
  el.innerHTML=h;
  RT_TRC.video=document.getElementById('trc-video');
  RT_TRC.canvas=document.getElementById('trc-canvas');
  RT_TRC.built=true;
  RT_TRC_bind();
  RT_TRC_syncButtons();
  RT_TRC_renderAnalysis();
  RT_TRC_renderHist();
  if(RT_TRC.url){ RT_TRC_attachSrc(RT_TRC.url); }
}

function RT_TRC_bind(){
  var v=RT_TRC.video,c=RT_TRC.canvas;if(!v||!c)return;
  v.addEventListener('loadedmetadata',RT_TRC_onLoaded);
  v.addEventListener('timeupdate',RT_TRC_onTime);
  v.addEventListener('seeked',function(){RT_TRC_onTime();RT_TRC_draw();});
  v.addEventListener('play',function(){RT_TRC_syncPlay();RT_TRC_startPlayLoop();});
  v.addEventListener('pause',function(){RT_TRC_syncPlay();RT_TRC_stopPlayLoop();RT_TRC_draw();});
  v.addEventListener('ended',function(){RT_TRC_syncPlay();RT_TRC_stopPlayLoop();RT_TRC_draw();});
  c.addEventListener('pointerdown',RT_TRC_ptrDown);
  c.addEventListener('pointermove',RT_TRC_ptrMove);
  c.addEventListener('pointerup',RT_TRC_ptrUp);
  c.addEventListener('pointercancel',RT_TRC_ptrUp);
  if(!RT_TRC._resizeBound){ window.addEventListener('resize',function(){RT_TRC_sizeOverlay();}); RT_TRC._resizeBound=true; }
}

function RT_TRC_setFps(v){RT_TRC.fps=parseFloat(v)||30;}

function RT_TRC_pickFile(inp){
  var f=inp&&inp.files&&inp.files[0];if(!f)return;
  RT_TRC_clearMarks(true);
  if(RT_TRC.url){try{URL.revokeObjectURL(RT_TRC.url);}catch(e){}}
  RT_TRC.url=URL.createObjectURL(f);
  RT_TRC_attachSrc(RT_TRC.url);
}
function RT_TRC_attachSrc(url){
  var v=RT_TRC.video;if(!v)return;
  v.src=url;v.style.display='block';
  var em=document.getElementById('trc-empty');if(em)em.style.display='none';
  try{v.load();}catch(e){}
}
function RT_TRC_onLoaded(){
  var v=RT_TRC.video;if(!v)return;
  document.getElementById('trc-controls').style.display='block';
  document.getElementById('trc-mark').style.display='block';
  RT_TRC.canvas.style.display='block';
  RT_TRC_sizeOverlay();
  RT_TRC_onTime();
}
function RT_TRC_sizeOverlay(){
  var v=RT_TRC.video,c=RT_TRC.canvas;if(!v||!c||!v.videoWidth)return;
  var w=v.clientWidth,hh=v.clientHeight;if(!w||!hh)return;
  var dpr=Math.min(window.devicePixelRatio||1,2);RT_TRC.dpr=dpr;
  c.width=Math.round(w*dpr);c.height=Math.round(hh*dpr);
  c.style.width=w+'px';c.style.height=hh+'px';
  RT_TRC_draw();
}
function RT_TRC_fmt(t){t=t||0;return t.toFixed(2);}
function RT_TRC_onTime(){
  var v=RT_TRC.video;if(!v)return;
  var d=v.duration||0,cur=v.currentTime||0;
  var t=document.getElementById('trc-t');if(t)t.textContent=RT_TRC_fmt(cur)+' / '+RT_TRC_fmt(d)+' s';
  var s=document.getElementById('trc-scrub');if(s&&d)s.value=Math.round(cur/d*1000);
}
function RT_TRC_togglePlay(){var v=RT_TRC.video;if(!v)return;if(v.paused)v.play();else v.pause();}
function RT_TRC_syncPlay(){var v=RT_TRC.video,b=document.getElementById('trc-play');if(!v||!b)return;b.innerHTML=v.paused?'▶︎ Play':'❚❚ Pause';}
function RT_TRC_slow(){
  var v=RT_TRC.video;if(!v)return;
  var slow=v.playbackRate>0.9;v.playbackRate=slow?0.25:1;
  var b=document.getElementById('trc-slow');if(b){b.className='trcb'+(slow?' on':'');b.textContent=slow?'Normal 1×':'Zeitlupe ¼×';}
}
function RT_TRC_scrub(val){var v=RT_TRC.video;if(!v||!v.duration)return;if(!v.paused)v.pause();v.currentTime=(val/1000)*v.duration;}
function RT_TRC_frame(dir){
  var v=RT_TRC.video;if(!v||!v.duration)return;if(!v.paused)v.pause();
  var fps=RT_TRC.fps||30;
  var frame=Math.round(v.currentTime*fps-0.5);
  var nf=Math.max(0,frame+dir);
  var tt=(nf+0.5)/fps;
  v.currentTime=Math.min(v.duration-1e-3,Math.max(0,tt));
}
function RT_TRC_toggleHand(){
  RT_TRC.handed=(RT_TRC.handed==='l')?'r':'l';
  var b=document.getElementById('trc-hand');if(b)b.textContent=(RT_TRC.handed==='l')?'Linkshänder':'Rechtshänder';
  RT_TRC_renderAnalysis();
}
function RT_TRC_setMode(which){
  RT_TRC.mode=(RT_TRC.mode===which)?null:which;
  RT_TRC_syncButtons();
}
function RT_TRC_evtXY(ev){
  var c=RT_TRC.canvas;var rect=c.getBoundingClientRect();
  var cx=(ev.clientX!=null?ev.clientX:0)-rect.left;
  var cy=(ev.clientY!=null?ev.clientY:0)-rect.top;
  return {x:Math.max(0,Math.min(1,cx/rect.width)),y:Math.max(0,Math.min(1,cy/rect.height)),rw:rect.width,rh:rect.height};
}
function RT_TRC_ptrDown(ev){
  var v=RT_TRC.video;var p=RT_TRC_evtXY(ev);
  if(RT_TRC.mode==='ball'||RT_TRC.mode==='land'){
    ev.preventDefault();
    RT_TRC.marks[RT_TRC.mode]={x:p.x,y:p.y,t:v?v.currentTime:0};
    RT_TRC.mode=null;
    if(RT_TRC.marks.ball&&RT_TRC.marks.land&&!RT_TRC.apex){
      RT_TRC.apex={x:(RT_TRC.marks.ball.x+RT_TRC.marks.land.x)/2,y:(RT_TRC.marks.ball.y+RT_TRC.marks.land.y)/2};
    }
    RT_TRC_syncButtons();RT_TRC_draw();RT_TRC_renderAnalysis();return;
  }
  if(RT_TRC.marks.ball&&RT_TRC.marks.land&&RT_TRC.apex){
    var dx=(p.x-RT_TRC.apex.x)*p.rw, dy=(p.y-RT_TRC.apex.y)*p.rh;
    if(Math.hypot(dx,dy)<34){ ev.preventDefault(); RT_TRC.drag=true; try{RT_TRC.canvas.setPointerCapture(ev.pointerId);}catch(e){} }
  }
}
function RT_TRC_ptrMove(ev){
  if(!RT_TRC.drag)return; ev.preventDefault();
  var p=RT_TRC_evtXY(ev); RT_TRC.apex={x:p.x,y:p.y};
  RT_TRC_draw(); RT_TRC_renderAnalysis();
}
function RT_TRC_ptrUp(ev){ if(RT_TRC.drag){ RT_TRC.drag=false; RT_TRC_renderAnalysis(); } }

function RT_TRC_clearMarks(silent){
  RT_TRC.marks={ball:null,land:null};RT_TRC.apex=null;RT_TRC.mode=null;RT_TRC.drag=false;
  RT_TRC.track=null;RT_TRC.extrap=null;RT_TRC.tracking=false;RT_TRC._prev=null;RT_TRC._lost=0;
  if(!silent){RT_TRC_syncButtons();RT_TRC_draw();RT_TRC_renderAnalysis();}
}
function RT_TRC_syncButtons(){
  ['ball','land'].forEach(function(k){
    var b=document.getElementById('trc-mb-'+k);if(!b)return;
    var active=(RT_TRC.mode===k),set=!!RT_TRC.marks[k];
    b.className='trcb'+(active?' on':(set?' set':''));
  });
}
function RT_TRC_classify(){
  var m=RT_TRC.marks,a=RT_TRC.apex; if(!m.ball||!m.land||!a) return null;
  var dx=m.land.x-m.ball.x, dy=m.land.y-m.ball.y; var len=Math.hypot(dx,dy)||1e-6;
  var ax=a.x-m.ball.x, ay=a.y-m.ball.y;
  var cross=dx*ay-dy*ax;
  var ratio=Math.abs(cross/(len*len));
  var rh=(RT_TRC.handed!=='l');
  var curveRight=(cross>0);
  var shape;
  if(ratio<0.045) shape='Gerade';
  else{ var strong=ratio>=0.14; var toRight=rh?curveRight:!curveRight; shape=toRight?(strong?'Slice':'Fade'):(strong?'Hook':'Draw'); }
  return {shape:shape, dir:(curveRight?'rechts':'links'), ratio:ratio};
}
function RT_TRC_renderAnalysis(){
  var host=document.getElementById('trc-analysis'); if(!host) return;
  var m=RT_TRC.marks;
  if(!m.ball){ host.innerHTML='<div class="trchint" style="margin-top:0;">Tippe <b>① Ball</b> an und markiere die Startlage im Video.</div>'; return; }
  if(!m.land){ host.innerHTML='<div class="trchint" style="margin-top:0;">Tippe <b>② Landung</b> an und markiere, wo der Ball aufkommt.</div>'; return; }
  var r=RT_TRC_classify(); if(!r){ host.innerHTML=''; return; }
  var info=RT_TRC_SHAPES[r.shape]||RT_TRC_SHAPES['Gerade'];
  var sub=(r.shape==='Gerade')?'gerader Ballflug':('dreht nach '+r.dir);
  host.innerHTML=
    '<div style="display:flex;align-items:center;gap:10px;">'
     +'<div style="flex:none;padding:7px 13px;border-radius:100px;background:'+info.col+';color:#fff;font-size:16px;font-weight:800;">'+r.shape+'</div>'
     +'<div style="font-size:12.5px;color:#5d7060;">'+sub+'</div>'
    +'</div>'
    +'<div style="font-size:13px;color:#143522;line-height:1.5;margin-top:9px;">'+info.tip+'</div>'
    +'<div style="font-size:12.5px;color:#3C5546;line-height:1.5;margin-top:7px;background:#f3f7f3;border-radius:10px;padding:9px 11px;">💡 '+info.opp+'</div>'
    +'<div class="trcrow"><button class="trcb pri" onclick="RT_TRC_playTraj()">▶︎ Flugbahn abspielen</button>'
    +'<button class="trcb" onclick="RT_TRC_shareImage()">Bild teilen</button></div>'
    +'<div class="trcrow"><button class="trcb pri" id="trc-expv" onclick="RT_TRC_exportVideo()">🎥 Video exportieren</button></div>'
    +RT_TRC_m6Controls(r)
    +'<div style="font-size:11px;color:#8A9C8E;margin-top:8px;">Ballgeschwindigkeit und Apex-Höhe kommen nicht aus dem Video. Die <b>exakte Schlaglänge</b> gibt es über die auf der Bahn per GPS gemessene Balllage – oben verknüpfen.</div>';
}
function RT_TRC_path(t){
  var m=RT_TRC.marks,a=RT_TRC.apex;var b=m.ball,l=m.land;
  if(!b||!l||!a)return{x:0,y:0};
  var u=1-t;
  return{x:u*u*b.x+2*u*t*a.x+t*t*l.x, y:u*u*b.y+2*u*t*a.y+t*t*l.y};
}
function RT_TRC_colRGB(){ var c=(RT_TRC.col||'#F2C230').replace('#',''); if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2]; return {r:parseInt(c.slice(0,2),16)||0,g:parseInt(c.slice(2,4),16)||0,b:parseInt(c.slice(4,6),16)||0}; }
function RT_TRC_strokeTrace(ctx,w,h,pr,baseW){
 var rgb=RT_TRC_colRGB(); var N=160; var prev=null;
 ctx.lineJoin='round'; ctx.lineCap='round';
 var wS=baseW*3.6, wE=baseW*0.45;   // Start ~50% breiter, duenn zum Ziel
 var eR=rgb.r*0.80, eG=rgb.g*0.52, eB=rgb.b*0.55;   // Zielfarbe: dunkler + staerker gesaettigt
 for(var i=0;i<=N;i++){ var t=i/N; if(t>pr) break; var p=RT_TRC_path(t); var X=p.x*w, Y=p.y*h;
  if(prev){ var a=Math.min(1,0.45+1.0*t); var lw=Math.max(1,wS+(wE-wS)*t);  // Start leicht transparent -> zum Ziel volle Deckkraft
   var cr=Math.round(rgb.r+(eR-rgb.r)*t), cg=Math.round(rgb.g+(eG-rgb.g)*t), cb=Math.round(rgb.b+(eB-rgb.b)*t);
   ctx.strokeStyle='rgba('+cr+','+cg+','+cb+','+a.toFixed(3)+')'; ctx.lineWidth=lw;
   ctx.beginPath(); ctx.moveTo(prev[0],prev[1]); ctx.lineTo(X,Y); ctx.stroke(); }
  prev=[X,Y];
 }
}
function RT_TRC_colorRowHtml(){
 var cur=(RT_TRC.col||'#F2C230').toLowerCase();
 var cols=['#F2C230','#FFFFFF','#FF3B30','#22D3EE','#34C759','#101816'];
 var sw=cols.map(function(c){ var on=(c.toLowerCase()===cur); return '<button class="trc-sw" data-c="'+c+'" onclick="RT_TRC_setColor(\''+c+'\')" style="width:26px;height:26px;border-radius:50%;background:'+c+';cursor:pointer;padding:0;border:2px solid '+(on?'#12261B':'rgba(0,0,0,.15)')+';outline:'+(on?'2px solid #1F8A4D':'none')+';outline-offset:1px;"></button>'; }).join('');
 return '<div class="trcrow" id="trc-colrow" style="gap:8px;align-items:center;margin-top:6px;"><span class="trcslab" style="min-width:auto;">Linienfarbe</span>'+sw+'<input type="color" id="trc-colcustom" value="'+cur+'" oninput="RT_TRC_setColor(this.value)" style="width:34px;height:30px;border:1px solid #cfe0d2;border-radius:8px;background:#fff;padding:2px;cursor:pointer;"></div>';
}
function RT_TRC_setColor(c){
 if(!c) return; RT_TRC.col=c; try{ localStorage.setItem('fp_trc_col',c); }catch(e){}
 try{ Array.prototype.forEach.call(document.querySelectorAll('#trc-colrow .trc-sw'),function(b){ var on=(b.getAttribute('data-c').toLowerCase()===c.toLowerCase()); b.style.border='2px solid '+(on?'#12261B':'rgba(0,0,0,.15)'); b.style.outline=on?'2px solid #1F8A4D':'none'; }); var ci=document.getElementById('trc-colcustom'); if(ci&&ci.value.toLowerCase()!==c.toLowerCase()) ci.value=c; }catch(e){}
 try{ RT_TRC_draw(); }catch(e){}
}
function RT_TRC_draw(prog){
  var c=RT_TRC.canvas;if(!c||!c.getContext)return;
  var ctx=c.getContext('2d');var dpr=RT_TRC.dpr||1;
  var w=c.width/dpr,h=c.height/dpr;
  ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,c.width,c.height);
  ctx.scale(dpr,dpr);
  var m=RT_TRC.marks;
  if(m.ball&&m.land&&RT_TRC.apex){
    var pr=(prog==null)?1:Math.max(0,Math.min(1,prog));
    RT_TRC_strokeTrace(ctx,w,h,pr,Math.max(6,w/90));
    var ph=RT_TRC_path(pr);ctx.fillStyle='#fff';ctx.strokeStyle='rgba(0,0,0,.45)';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(ph.x*w,ph.y*h,5,0,6.29);ctx.fill();ctx.stroke();
    if(prog==null){
      var A=RT_TRC.apex;ctx.fillStyle='rgba(224,160,0,.28)';ctx.strokeStyle='#E0A000';ctx.lineWidth=2.5;
      ctx.beginPath();ctx.arc(A.x*w,A.y*h,12,0,6.29);ctx.fill();ctx.stroke();
      ctx.fillStyle='#E0A000';ctx.beginPath();ctx.arc(A.x*w,A.y*h,3.5,0,6.29);ctx.fill();
    }
  }
  function dot(pt,col,lab){if(!pt)return;var X=pt.x*w,Y=pt.y*h;ctx.fillStyle=col;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(X,Y,6,0,6.29);ctx.fill();ctx.stroke();ctx.font='bold 11px Inter,sans-serif';var lx=X+9;ctx.textAlign='left';if(X>w*0.72){lx=X-9;ctx.textAlign='right';}var ly=Y-7;if(Y<16)ly=Y+16;ctx.lineWidth=3;ctx.strokeStyle='rgba(0,0,0,.55)';ctx.strokeText(lab,lx,ly);ctx.fillStyle='#fff';ctx.fillText(lab,lx,ly);ctx.textAlign='left';}
  dot(m.ball,'#1F8A4D','Ball');dot(m.land,'#B03A3A','Landung');
}
function RT_TRC_playTraj(){
  var m=RT_TRC.marks;if(!m.ball||!m.land){RT_TRC_toast('Bitte zuerst Ball und Landung markieren.');return;}
  var start=null,dur=1500;
  function step(ts){if(start==null)start=ts;var p=Math.min(1,(ts-start)/dur);RT_TRC_draw(p);if(p<1)requestAnimationFrame(step);else RT_TRC_draw();}
  requestAnimationFrame(step);
}
/* Fortschritt der Flugbahn passend zur Videozeit: vor dem Ball 0, zwischen Ball- und
   Landungszeitpunkt anwachsend, danach voll. So zeichnet sich die Kurve beim Abspielen live nach. */
function RT_TRC_progForTime(){
  var v=RT_TRC.video,m=RT_TRC.marks; if(!v||!m.ball||!m.land) return 1;
  var t0=m.ball.t,t1=m.land.t; if(t1<=t0) return (v.currentTime>=t0)?1:0;
  return Math.max(0,Math.min(1,(v.currentTime-t0)/(t1-t0)));
}
function RT_TRC_startPlayLoop(){ if(RT_TRC._loop) return; RT_TRC._loop=true; RT_TRC_playLoop(); }
function RT_TRC_stopPlayLoop(){ RT_TRC._loop=false; }
function RT_TRC_playLoop(){
  if(!RT_TRC._loop) return;
  var v=RT_TRC.video; if(!v||v.paused||v.ended){ RT_TRC._loop=false; if(RT_TRC.tracking&&RT_TRC.track&&RT_TRC.track.length>=3){ RT_TRC_finishTrack(); } return; }
  if(RT_TRC.track&&RT_TRC.track.length&&!RT_TRC.tracking){ RT_TRC_drawTracked(); }
  else if(RT_TRC.marks.ball&&RT_TRC.marks.land&&RT_TRC.apex){ RT_TRC_draw(RT_TRC_progForTime()); }
  if(v.requestVideoFrameCallback){ v.requestVideoFrameCallback(RT_TRC_playLoop); } else { requestAnimationFrame(RT_TRC_playLoop); }
}
/* ===== Bild-fuer-Bild-Ball-Tracking (halb-automatisch) =====
   Ball markieren -> beim Abspielen wird der Ball je Bild in einem Suchfenster um die
   vorhergesagte Position gesucht (hell UND bewegt, per Frame-Differenz). Solange er klar
   erkennbar ist, waechst die durchgezogene Linie. Ab Verlust wird die Restbahn aus der
   bisherigen Bewegung (Geschwindigkeit + Schwerkraft im Bild) extrapoliert und gestrichelt
   gezeichnet. Farbe = vom Nutzer gewaehlte Linienfarbe. Experimentell/qualitaetsabhaengig. */
function RT_TRC_frameData(AW,AH){
  var v=RT_TRC.video; if(!v) return null;
  var ac=RT_TRC._acanvas; if(!ac){ ac=RT_TRC._acanvas=document.createElement('canvas'); }
  if(ac.width!==AW||ac.height!==AH){ ac.width=AW; ac.height=AH; }
  var ax=ac.getContext('2d',{willReadFrequently:true}); if(!ax) return null;
  try{ ax.drawImage(v,0,0,AW,AH); return ax.getImageData(0,0,AW,AH); }catch(e){ return null; }
}
function RT_TRC_detect(now,prev,AW,AH,pred,rad){
  var cx=pred.x*AW, cy=pred.y*AH;
  var x0=Math.max(0,Math.floor(cx-rad)), x1=Math.min(AW-1,Math.ceil(cx+rad));
  var y0=Math.max(0,Math.floor(cy-rad)), y1=Math.min(AH-1,Math.ceil(cy+rad));
  var nd=now.data, pd=prev.data, X,Y,I, mx=0;
  for(Y=y0;Y<=y1;Y++){ for(X=x0;X<=x1;X++){ I=(Y*AW+X)*4;
    var mn=Math.min(nd[I],nd[I+1],nd[I+2])/255;
    var d=(Math.abs(nd[I]-pd[I])+Math.abs(nd[I+1]-pd[I+1])+Math.abs(nd[I+2]-pd[I+2]))/765;
    var sc=mn*d; if(sc>mx) mx=sc;
  } }
  if(mx<0.05) return null;
  var th=mx*0.55, sumX=0,sumY=0,sumW=0,cnt=0;
  for(Y=y0;Y<=y1;Y++){ for(X=x0;X<=x1;X++){ I=(Y*AW+X)*4;
    var mn2=Math.min(nd[I],nd[I+1],nd[I+2])/255;
    var dd=(Math.abs(nd[I]-pd[I])+Math.abs(nd[I+1]-pd[I+1])+Math.abs(nd[I+2]-pd[I+2]))/765;
    var s2=mn2*dd; if(s2>=th){ var w=s2*s2; sumX+=X*w; sumY+=Y*w; sumW+=w; cnt++; }
  } }
  if(sumW<=0) return null;
  return {x:(sumX/sumW)/AW, y:(sumY/sumW)/AH, conf:mx, cnt:cnt};
}
function RT_TRC_finishTrack(){
  RT_TRC.tracking=false;
  var btn=document.getElementById('trc-track'); if(btn){ btn.className='trcb pri'; btn.textContent='🎯 Ball verfolgen (Bild-für-Bild)'; }
  var tr=RT_TRC.track||[];
  if(tr.length>=3){
    var a=tr[tr.length-1], b=tr[tr.length-2], c=tr[tr.length-3];
    var vx=a.x-b.x, vy=a.y-b.y;
    var ay=(a.y-b.y)-(b.y-c.y); if(!(ay>0.0004)) ay=0.0009;   // Schwerkraft im Bild (nach unten)
    var ex=[], px=a.x, py=a.y, cvy=vy;
    for(var k=0;k<240;k++){ cvy+=ay; px+=vx; py+=cvy; ex.push({x:px,y:py}); if(py>=1.03||px<-0.05||px>1.05||py<-0.4) break; }
    RT_TRC.extrap=ex;
  }
  RT_TRC_drawTracked(); RT_TRC_renderAnalysis();
}
function RT_TRC_armBtn(txt,on){ var b=document.getElementById('trc-track'); if(b){ b.className=on?'trcb on':'trcb pri'; b.textContent=txt; } }
function RT_TRC_seekP(v,t){ return new Promise(function(res){ var done=false; var h=function(){ if(done)return; done=true; v.removeEventListener('seeked',h); res(); }; v.addEventListener('seeked',h); try{ v.currentTime=t; }catch(e){ done=true; res(); } setTimeout(function(){ if(!done){ done=true; try{v.removeEventListener('seeked',h);}catch(e){} res(); } },1500); }); }
/* Frame-fuer-Frame-Tracking durch praezises Durchsteppen (jedes Bild einzeln anspringen und
   analysieren) statt Echtzeit-Abspielen - im Cloud-Test zuverlaessig (~1px Genauigkeit),
   weil kein Bild uebersprungen wird. */
function RT_TRC_armTrack(){
  var v=RT_TRC.video, m=RT_TRC.marks;
  if(!v||!v.duration){ RT_TRC_toast('Zuerst ein Video laden.'); return; }
  if(RT_TRC.tracking){ RT_TRC.tracking=false; RT_TRC_armBtn('🎯 Ball verfolgen (Bild-für-Bild)',false); return; }
  if(!m.ball){ RT_TRC_toast('Zuerst den Ball markieren (① Ball) – am besten kurz nach dem Treffmoment.'); return; }
  RT_TRC.tracking=true; RT_TRC.track=[{x:m.ball.x,y:m.ball.y,t:m.ball.t}]; RT_TRC.extrap=null;
  try{ if(!v.paused) v.pause(); }catch(e){}
  RT_TRC_runTrack();
}
function RT_TRC_runTrack(){
  var v=RT_TRC.video, m=RT_TRC.marks;
  var fps=RT_TRC.fps||30; var vw=v.videoWidth||1280, vh=v.videoHeight||720;
  var AW=Math.min(vw,640), AH=Math.max(1,Math.round(AW*vh/vw));
  var f0=Math.round((m.ball.t||0)*fps), nF=Math.floor((v.duration||0)*fps);
  var prev=null, lost=0;
  RT_TRC_armBtn('● Analysiere …',true);
  RT_TRC_seekP(v,(f0+0.5)/fps).then(function(){
    prev=RT_TRC_frameData(AW,AH);
    var f=f0+1;
    function stepOne(){
      if(!RT_TRC.tracking || f>=nF){ RT_TRC.tracking=false; RT_TRC_finishTrack(); return; }
      RT_TRC_seekP(v,(f+0.5)/fps).then(function(){
        var now=RT_TRC_frameData(AW,AH);
        if(now&&prev){
          var tr=RT_TRC.track, n=tr.length, pred, rad;
          if(n>=2){ var a=tr[n-1],b=tr[n-2]; pred={x:a.x+(a.x-b.x),y:a.y+(a.y-b.y)}; rad=Math.max(18,AW*0.10); }
          else { pred={x:tr[0].x,y:tr[0].y}; rad=Math.max(26,AW*0.14); }
          var det=RT_TRC_detect(now,prev,AW,AH,pred,rad);
          if(det){ tr.push({x:det.x,y:det.y,t:v.currentTime}); lost=0; }
          else { lost++; if(lost>=3 && tr.length>=3){ RT_TRC.tracking=false; RT_TRC_finishTrack(); return; } }
          prev=now; RT_TRC_drawTracked();
        }
        f++; (window.requestAnimationFrame||window.setTimeout)(stepOne);
      });
    }
    stepOne();
  });
}
function RT_TRC_renderTrackedInto(ctx,W,H,curT){
  var tr=RT_TRC.track; if(!tr||!tr.length) return;
  var rgb=RT_TRC_colRGB(); var col='rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
  ctx.lineJoin='round'; ctx.lineCap='round';
  var lastPt=null, lastT=null, started=false;
  ctx.strokeStyle=col; ctx.lineWidth=Math.max(3,W/150); ctx.beginPath();
  for(var i=0;i<tr.length;i++){ var pt=tr[i]; if(curT!=null && pt.t>curT+1e-3) break; var X=pt.x*W, Y=pt.y*H; if(!started){ ctx.moveTo(X,Y); started=true; } else ctx.lineTo(X,Y); lastPt=[X,Y]; lastT=pt.t; }
  if(started) ctx.stroke();
  var ex=RT_TRC.extrap;
  if(ex&&ex.length&&lastPt&&(curT==null||(lastT!=null&&curT>=lastT-1e-3))){
    ctx.setLineDash([Math.max(6,W/70),Math.max(6,W/70)]); ctx.strokeStyle=col; ctx.lineWidth=Math.max(3,W/165);
    ctx.beginPath(); ctx.moveTo(lastPt[0],lastPt[1]);
    for(var j=0;j<ex.length;j++){ ctx.lineTo(ex[j].x*W, ex[j].y*H); }
    ctx.stroke(); ctx.setLineDash([]);
  }
  if(lastPt){ ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(0,0,0,.5)'; ctx.lineWidth=Math.max(1.5,W/700); ctx.beginPath(); ctx.arc(lastPt[0],lastPt[1],Math.max(4,W/240),0,6.29); ctx.fill(); ctx.stroke(); }
  var b0=tr[0]; if(b0){ ctx.fillStyle='#1F8A4D'; ctx.strokeStyle='#fff'; ctx.lineWidth=Math.max(2,W/500); ctx.beginPath(); ctx.arc(b0.x*W,b0.y*H,Math.max(5,W/200),0,6.29); ctx.fill(); ctx.stroke(); }
}
function RT_TRC_drawTracked(){
  var c=RT_TRC.canvas; if(!c||!c.getContext) return; var ctx=c.getContext('2d'); var dpr=RT_TRC.dpr||1; var w=c.width/dpr,h=c.height/dpr;
  ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,c.width,c.height); ctx.scale(dpr,dpr);
  var curT = RT_TRC.tracking ? null : (RT_TRC.video?RT_TRC.video.currentTime:null);
  RT_TRC_renderTrackedInto(ctx,w,h,curT);
}
/* Video mit eingebrannter, live nachgezeichneter Flugbahn exportieren (Canvas-Aufnahme via
   MediaRecorder). Spielt das Video einmal durch, zeichnet je Bild Video + Flugbahn-Fortschritt
   auf ein Canvas und nimmt dessen Stream auf. Auf iOS/Safari geraetgeabhaengig - v1. */
function RT_TRC_exportVideo(){
  var v=RT_TRC.video,m=RT_TRC.marks;
  if(!v||(!(RT_TRC.track&&RT_TRC.track.length>1) && (!m.ball||!m.land||!RT_TRC.apex))){ RT_TRC_toast('Bitte zuerst den Ball verfolgen oder Ball + Landung markieren.'); return; }
  if(typeof MediaRecorder==='undefined'){ RT_TRC_toast('Video-Export wird auf diesem Gerät nicht unterstützt.'); return; }
  var vw=v.videoWidth||1280, vh=v.videoHeight||720;
  var sc=Math.min(1,1080/Math.max(vw,vh)); var W=Math.round(vw*sc), H=Math.round(vh*sc);
  var cv=document.createElement('canvas'); cv.width=W; cv.height=H; var ctx=cv.getContext('2d');
  if(!cv.captureStream){ RT_TRC_toast('Video-Export auf diesem Gerät nicht möglich.'); return; }
  var stream; try{ stream=cv.captureStream(30); }catch(e){ RT_TRC_toast('Video-Export auf diesem Gerät nicht möglich.'); return; }
  var mime='video/webm';
  try{ if(MediaRecorder.isTypeSupported){ if(MediaRecorder.isTypeSupported('video/mp4')) mime='video/mp4'; else if(MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) mime='video/webm;codecs=vp9'; else if(MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) mime='video/webm;codecs=vp8'; } }catch(e){}
  var mr; try{ mr=new MediaRecorder(stream,{mimeType:mime}); }catch(e){ try{ mr=new MediaRecorder(stream); }catch(e2){ RT_TRC_toast('Video-Export nicht möglich.'); return; } }
  var chunks=[]; var prevRate=v.playbackRate; var running=true;
  mr.ondataavailable=function(e){ if(e.data&&e.data.size) chunks.push(e.data); };
  mr.onstop=function(){
    running=false; try{ v.playbackRate=prevRate; }catch(e){}
    var b=document.getElementById('trc-expv'); if(b){ b.className='trcb'; b.textContent='🎥 Video exportieren'; }
    var blob=new Blob(chunks,{type:(chunks[0]&&chunks[0].type)||mime});
    var ext=(blob.type.indexOf('mp4')>=0)?'mp4':'webm';
    try{
      var file=new File([blob],'shot-tracer.'+ext,{type:blob.type});
      if(navigator.canShare&&navigator.canShare({files:[file]})){ navigator.share({files:[file],title:'FairwayPilot Shot-Tracer'}).catch(function(){}); return; }
    }catch(e){}
    var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='shot-tracer.'+ext; document.body.appendChild(a); a.click();
    setTimeout(function(){ try{URL.revokeObjectURL(a.href); a.remove();}catch(e){} },1500);
  };
  function endStop(){ v.removeEventListener('ended',endStop); try{ if(mr.state!=='inactive') mr.stop(); }catch(e){} }
  function render(){
    if(!running) return;
    try{ ctx.drawImage(v,0,0,W,H); }catch(e){}
    if(RT_TRC.track&&RT_TRC.track.length){
      RT_TRC_renderTrackedInto(ctx,W,H,v.currentTime);
    } else if(m.ball&&m.land&&RT_TRC.apex){
      var pr=RT_TRC_progForTime();
      RT_TRC_strokeTrace(ctx,W,H,pr,Math.max(6,W/110));
      var ph=RT_TRC_path(pr); ctx.fillStyle='#fff'; ctx.strokeStyle='rgba(0,0,0,.45)'; ctx.lineWidth=Math.max(1.5,W/700);
      ctx.beginPath(); ctx.arc(ph.x*W,ph.y*H,Math.max(4,W/240),0,6.29); ctx.fill(); ctx.stroke();
    }
    if(!v.paused&&!v.ended){ if(v.requestVideoFrameCallback){ v.requestVideoFrameCallback(render); } else { requestAnimationFrame(render); } }
  }
  var b0=document.getElementById('trc-expv'); if(b0){ b0.className='trcb on'; b0.textContent='● Nimmt auf …'; }
  try{ v.playbackRate=0.5; }catch(e){}
  v.addEventListener('ended',endStop);
  var startRec=function(){
    v.removeEventListener('seeked',startRec);
    try{ mr.start(); }catch(e){ RT_TRC_toast('Aufnahme konnte nicht starten.'); running=false; return; }
    var pp=v.play(); if(pp&&pp.catch) pp.catch(function(){});
    if(v.requestVideoFrameCallback){ v.requestVideoFrameCallback(render); } else { requestAnimationFrame(render); }
  };
  v.addEventListener('seeked',startRec);
  try{ v.currentTime=0; }catch(e){ startRec(); }
  RT_TRC_toast('Video wird aufgezeichnet – einmal komplett abspielen lassen …');
}
function RT_TRC_toast(msg){
  var t=document.createElement('div');
  t.style.cssText='position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:4000;background:#12261B;color:#fff;border-radius:12px;padding:9px 15px;font:600 13px Inter,sans-serif;box-shadow:0 6px 22px rgba(0,0,0,.35);';
  t.textContent=msg;document.body.appendChild(t);
  setTimeout(function(){t.style.transition='opacity .4s';t.style.opacity='0';setTimeout(function(){try{t.remove();}catch(e){}},400);},2200);
}
function RT_TRC_toggleRec(){
  if(RT_TRC.rec&&RT_TRC.rec.state==='recording'){try{RT_TRC.rec.stop();}catch(e){}return;}
  if(!navigator.mediaDevices||!window.MediaRecorder){RT_TRC_toast('Aufnahme wird auf diesem Gerät nicht unterstützt.');return;}
  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false}).then(function(stream){
    RT_TRC.stream=stream;RT_TRC.recChunks=[];
    var mr=new MediaRecorder(stream);RT_TRC.rec=mr;
    mr.ondataavailable=function(e){if(e.data&&e.data.size)RT_TRC.recChunks.push(e.data);};
    mr.onstop=function(){
      try{stream.getTracks().forEach(function(t){t.stop();});}catch(e){}
      var blob=new Blob(RT_TRC.recChunks,{type:(RT_TRC.recChunks[0]&&RT_TRC.recChunks[0].type)||'video/mp4'});
      RT_TRC_clearMarks(true);
      if(RT_TRC.url){try{URL.revokeObjectURL(RT_TRC.url);}catch(e){}}
      RT_TRC.url=URL.createObjectURL(blob);RT_TRC_attachSrc(RT_TRC.url);
      var b=document.getElementById('trc-rec');if(b){b.className='trcb';b.textContent='● Aufnehmen';}
    };
    mr.start();
    var b=document.getElementById('trc-rec');if(b){b.className='trcb on';b.textContent='■ Stopp';}
  }).catch(function(){RT_TRC_toast('Kamerazugriff nicht möglich.');});
}
/* ===== Ende Shot-Tracer ===== */
/* ============================================================
   M6 · Shot-Tracer – Analyse-Erweiterung (GPS-Länge, Schläger, Historie, Export)
   Kernwert: die auf der Bahn per GPS gemessene Balllage liefert die ECHTE Schlaglänge –
   der Video-Tracer wird daran gekoppelt. Zusätzlich Schlägerwahl, lokale Historie mit
   Schlägerfilter und ein Bild-Export (Frame + Flugkurve) via Web-Share/Download.
   Alles lokal; keine Uploads. Fügt sich in RT_TRC ein.
   ============================================================ */
var RT_TRC_HIST_KEY='fp_tracer_hist_v1';

/* --- Schlägerauswahl --- */
function RT_TRC_clubList(){ var own=RT_bagInOrder(); return (own&&own.length)?own:RT_BAG_CLUBS; }
function RT_TRC_clubLabel(id){ for(var i=0;i<RT_BAG_CLUBS.length;i++){ if(RT_BAG_CLUBS[i].id===id) return RT_BAG_CLUBS[i].l; } return ''; }
function RT_TRC_setClub(v){ RT_TRC.club=v||''; }

/* --- Gemessene Schläge aus GPS-Balllagen (wie Shot-Analyse: p.pins[holeIdx]) --- */
function RT_TRC_shotList(){
 var rounds=(rtGet(RT_KEY)||[]).slice();
 var cur=RT_round; if(cur&&!rounds.some(function(r){ return r.id===cur.id; })) rounds.push(cur);
 var out=[];
 rounds.forEach(function(r){
  if(!r||!r.players||!r.nums) return;
  var pi=(typeof RT_myPlayerIndex==='function')?RT_myPlayerIndex(r):0;
  var p=r.players[pi]||r.players[0]; if(!p||!p.pins) return;
  for(var c=0;c<r.nums.length;c++){
   var arr=p.pins[c]; if(!arr||arr.length<2) continue;
   var pts=[]; for(var m=0;m<arr.length;m++){ if(arr[m]&&arr[m].lat!=null&&arr[m].lng!=null) pts.push(arr[m]); }
   for(var k=0;k<pts.length-1;k++){
    var d=RT_haversineM(pts[k].lat,pts[k].lng,pts[k+1].lat,pts[k+1].lng);
    if(!(d>=3&&d<=400)) continue;
    out.push({m:Math.round(d),course:r.courseName||'Platz',hole:r.nums[c],shot:k+1,date:r.date||'',ts:(r.date||'')+'-'+(r.id||'')});
   }
  }
 });
 out.sort(function(a,b){ return (b.date||'').localeCompare(a.date||''); });
 return out.slice(0,60);
}
function RT_TRC_openShotLink(){
 var list=RT_TRC_shotList();
 var o=document.createElement('div'); o.id='trc-shotsheet';
 o.style.cssText='position:fixed;inset:0;z-index:4200;background:rgba(8,20,13,.55);display:flex;flex-direction:column;justify-content:flex-end;';
 var rows='';
 if(!list.length){
  rows='<div style="padding:26px 18px;text-align:center;color:#5d7060;font-size:13px;line-height:1.5;">Noch keine per GPS gemessenen Schläge gefunden. Markiere beim Spielen auf der Bahn deine Balllagen – dann erscheinen hier die echten Schlaglängen zum Verknüpfen.</div>';
 } else {
  rows=list.map(function(s,i){
   return '<button onclick="RT_TRC_pickShot('+i+')" style="display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;text-align:left;border:none;border-bottom:1px solid #EEF2EC;background:#fff;padding:12px 16px;cursor:pointer;">'
     +'<span style="min-width:0;"><span style="font-size:14px;font-weight:700;color:#143522;">'+RT_TRC_esc(s.course)+'</span>'
       +'<span style="display:block;font-size:11.5px;color:#5d7060;">Loch '+s.hole+' · Schlag '+s.shot+(s.date?(' · '+RT_TRC_esc(s.date)):'')+'</span></span>'
     +'<span style="flex:none;font-size:15px;font-weight:800;color:#1F8A4D;">'+RT_fmtDist(s.m)+'</span></button>';
  }).join('');
 }
 o.innerHTML='<div style="background:#fff;border-radius:20px 20px 0 0;max-height:74vh;display:flex;flex-direction:column;overflow:hidden;">'
   +'<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px 10px;border-bottom:1px solid #EEF2EC;">'
     +'<div style="font-size:16px;font-weight:800;color:#143522;">Schlag verknüpfen</div>'
     +'<button class="trcb" onclick="RT_TRC_closeShotLink()" style="padding:6px 12px;">Schließen</button></div>'
   +'<div style="overflow-y:auto;-webkit-overflow-scrolling:touch;">'+rows+'</div>'
   +'<div style="padding:11px 16px calc(env(safe-area-inset-bottom,0px) + 12px);font-size:11px;color:#8A9C8E;line-height:1.5;">Die Länge stammt aus den auf der Bahn gemessenen GPS-Balllagen – die echte, gemessene Schlaglänge.</div>'
   +'</div>';
 o.addEventListener('click',function(e){ if(e.target===o) RT_TRC_closeShotLink(); });
 document.body.appendChild(o);
 RT_TRC._shots=list;
}
function RT_TRC_closeShotLink(){ var o=document.getElementById('trc-shotsheet'); if(o&&o.parentNode) o.parentNode.removeChild(o); }
function RT_TRC_pickShot(i){
 var s=(RT_TRC._shots||[])[i]; if(!s){ RT_TRC_closeShotLink(); return; }
 RT_TRC.measured={m:s.m,course:s.course,hole:s.hole,shot:s.shot,date:s.date};
 RT_TRC_closeShotLink(); RT_TRC_renderAnalysis();
}
function RT_TRC_clearLink(){ RT_TRC.measured=null; RT_TRC_renderAnalysis(); }

/* --- Steuerblock in der Analyse-Karte --- */
function RT_TRC_m6Controls(r){
 var clubs=RT_TRC_clubList();
 var opt='<option value="">Schläger (optional)</option>'+clubs.map(function(c){
   return '<option value="'+c.id+'"'+(RT_TRC.club===c.id?' selected':'')+'>'+RT_TRC_esc(c.l)+'</option>';
 }).join('');
 var h='<div style="margin-top:12px;border-top:1px solid #EEF2EC;padding-top:11px;">';
 // Gemessene Länge
 if(RT_TRC.measured){
  var mm=RT_TRC.measured;
  h+='<div style="display:flex;align-items:center;gap:10px;background:rgba(31,138,77,.08);border:1px solid rgba(31,138,77,.2);border-radius:12px;padding:10px 12px;">'
    +'<div style="flex:1;min-width:0;"><div style="font-size:11px;font-weight:800;letter-spacing:.4px;color:#1F8A4D;">GEMESSENE LÄNGE (GPS)</div>'
      +'<div style="font-size:20px;font-weight:800;color:#143522;line-height:1.1;margin-top:1px;">'+RT_fmtDist(mm.m)+'</div>'
      +'<div style="font-size:11px;color:#5d7060;">'+RT_TRC_esc(mm.course)+' · Loch '+mm.hole+' · Schlag '+mm.shot+'</div></div>'
    +'<button class="trcb" onclick="RT_TRC_clearLink()" style="padding:6px 10px;font-size:12px;flex:none;">Lösen</button></div>';
 } else {
  h+='<button class="trcb set" style="width:100%;" onclick="RT_TRC_openShotLink()">📍 Echte Schlaglänge verknüpfen (GPS)</button>';
 }
 // Schläger + Speichern
 h+='<div class="trcrow" style="margin-top:10px;">'
   +'<select class="trcb" onchange="RT_TRC_setClub(this.value)" style="padding:8px;flex:1;min-width:120px;">'+opt+'</select>'
   +'<button class="trcb pri" onclick="RT_TRC_saveHist()">In Historie speichern</button></div>';
 h+='</div>';
 return h;
}

/* --- Historie --- */
function RT_TRC_histData(){ var a=rtGet(RT_TRC_HIST_KEY); return (a&&a.length)?a:[]; }
function RT_TRC_histSave(a){ rtSet(RT_TRC_HIST_KEY,a); }
function RT_TRC_saveHist(){
 var r=RT_TRC_classify(); if(!r){ RT_TRC_toast('Bitte zuerst Ball, Landung und Flugkurve setzen.'); return; }
 var mm=RT_TRC.measured;
 var e={ id:'trc_'+RT_TRC_uid(), at:RT_TRC_now(), shape:r.shape, dir:r.dir, handed:RT_TRC.handed,
   club:RT_TRC.club||'', clubLabel:RT_TRC.club?RT_TRC_clubLabel(RT_TRC.club):'',
   meters:(mm?mm.m:null), holeLabel:(mm?(mm.course+' · Loch '+mm.hole):'') };
 var a=RT_TRC_histData(); a.unshift(e); if(a.length>200) a=a.slice(0,200); RT_TRC_histSave(a);
 RT_TRC_toast('In Historie gespeichert.'); RT_TRC_renderHist();
}
function RT_TRC_delHist(id){ var a=RT_TRC_histData().filter(function(e){ return e.id!==id; }); RT_TRC_histSave(a); RT_TRC_renderHist(); }
function RT_TRC_histFilter(v){ RT_TRC._hf=v||''; RT_TRC_renderHist(); }
function RT_TRC_renderHist(){
 var host=document.getElementById('trc-hist'); if(!host) return;
 var all=RT_TRC_histData();
 if(!all.length){ host.style.display='none'; host.innerHTML=''; return; }
 host.style.display='block';
 var f=RT_TRC._hf||'';
 var clubsUsed={}; all.forEach(function(e){ if(e.club) clubsUsed[e.club]=e.clubLabel||RT_TRC_clubLabel(e.club); });
 var fopt='<option value="">Alle Schläger</option>';
 RT_BAG_CLUBS.forEach(function(c){ if(clubsUsed[c.id]) fopt+='<option value="'+c.id+'"'+(f===c.id?' selected':'')+'>'+RT_TRC_esc(c.l)+'</option>'; });
 var list=all.filter(function(e){ return !f || e.club===f; });
 var rows=list.map(function(e){
  var info=RT_TRC_SHAPES[e.shape]||RT_TRC_SHAPES['Gerade'];
  var meta=[]; if(e.clubLabel) meta.push(RT_TRC_esc(e.clubLabel)); if(e.meters!=null) meta.push(RT_fmtDist(e.meters)); if(e.holeLabel) meta.push(RT_TRC_esc(e.holeLabel));
  return '<div style="display:flex;align-items:center;gap:10px;padding:9px 2px;border-top:1px solid #EEF2EC;">'
    +'<span style="flex:none;padding:4px 10px;border-radius:100px;background:'+info.col+';color:#fff;font-size:12px;font-weight:800;">'+RT_TRC_esc(e.shape)+'</span>'
    +'<span style="flex:1;min-width:0;font-size:12px;color:#5d7060;">'+(meta.length?meta.join(' · '):'—')+'<span style="display:block;font-size:10.5px;color:#9AAB9E;">'+RT_TRC_esc(RT_TRC_fmtWhen(e.at))+'</span></span>'
    +'<button class="trcb" onclick="RT_TRC_delHist(\''+e.id+'\')" style="padding:5px 9px;font-size:12px;flex:none;">Löschen</button></div>';
 }).join('');
 host.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px;">'
   +'<div style="font-weight:800;color:#143522;font-size:15px;">Historie</div>'
   +'<select class="trcb" onchange="RT_TRC_histFilter(this.value)" style="padding:6px 8px;font-size:12px;">'+fopt+'</select></div>'
   +(list.length?rows:'<div class="trchint" style="margin-top:2px;">Keine Einträge für diesen Schläger.</div>');
}

/* --- Bild-Export (Frame + Flugkurve) --- */
function RT_TRC_shareImage(){
 var v=RT_TRC.video,m=RT_TRC.marks; if(!v||!m.ball||!m.land||!RT_TRC.apex){ RT_TRC_toast('Bitte zuerst Ball, Landung und Flugkurve setzen.'); return; }
 var vw=v.videoWidth||1280, vh=v.videoHeight||720;
 var cv=document.createElement('canvas'); cv.width=vw; cv.height=vh; var ctx=cv.getContext('2d');
 try{ ctx.drawImage(v,0,0,vw,vh); }catch(e){ RT_TRC_toast('Video-Bild nicht verfügbar.'); return; }
 RT_TRC_strokeTrace(ctx,vw,vh,1,Math.max(7,vw/110));
 function dot(pt,col){ if(!pt)return; ctx.fillStyle=col; ctx.strokeStyle='#fff'; ctx.lineWidth=Math.max(2,vw/500); ctx.beginPath(); ctx.arc(pt.x*vw,pt.y*vh,Math.max(5,vw/150),0,6.29); ctx.fill(); ctx.stroke(); }
 dot(m.ball,'#1F8A4D'); dot(m.land,'#B03A3A');
 var r=RT_TRC_classify();
 var badge=(r?r.shape:''); if(RT_TRC.measured) badge+=(badge?'  ':'')+RT_fmtDist(RT_TRC.measured.m);
 if(badge){ var fs=Math.max(22,vw/26); ctx.font='800 '+fs+'px Inter,sans-serif'; ctx.textBaseline='top';
  var pad=fs*0.5, tw=ctx.measureText(badge).width;
  ctx.fillStyle='rgba(10,22,15,.72)'; ctx.fillRect(pad*0.6,pad*0.6,tw+pad*1.4,fs+pad*1.1);
  ctx.fillStyle='#fff'; ctx.fillText(badge,pad*1.3,pad*1.05); }
 var done=function(blob){ if(!blob){ RT_TRC_toast('Export fehlgeschlagen.'); return; }
  try{
   var file=new File([blob],'shot-tracer.png',{type:'image/png'});
   if(navigator.canShare&&navigator.canShare({files:[file]})){ navigator.share({files:[file],title:'FairwayPilot Shot-Tracer'}).catch(function(){}); return; }
  }catch(e){}
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='shot-tracer.png'; document.body.appendChild(a); a.click();
  setTimeout(function(){ try{URL.revokeObjectURL(a.href); a.remove();}catch(e){} },1200);
 };
 try{ cv.toBlob(done,'image/png'); }catch(e){ RT_TRC_toast('Export auf diesem Gerät nicht möglich.'); }
}

/* --- Hilfen (Zeit/ID ohne Date.now-Verbot im Browser unkritisch) --- */
function RT_TRC_uid(){ return (new Date()).getTime().toString(36)+Math.floor(Math.random()*1e6).toString(36); }
function RT_TRC_now(){ return (new Date()).getTime(); }
function RT_TRC_fmtWhen(ts){ if(!ts) return ''; var d=new Date(ts); function p(n){ return (n<10?'0':'')+n; } return p(d.getDate())+'.'+p(d.getMonth()+1)+'.'+d.getFullYear()+' '+p(d.getHours())+':'+p(d.getMinutes()); }
/* ===== Ende Shot-Tracer M6 ===== */


function RT_renderTabBar(){
  var nav=document.getElementById('nav-tabs'); if(!nav) return;
  nav.innerHTML=RT_TABS.map(function(t){
    return '<button id="tbtn-'+t.id+'" onclick="showTab(\''+t.id+'\')" style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 8px;border-radius:13px;cursor:pointer;border:none;background:none;flex:1 1 0;min-width:0;">'
      + t.icon
      + '<span id="tlbl-'+t.id+'" style="font-size:9px;font-weight:500;color:rgba(84,104,88,.9);font-family:Inter,sans-serif;text-align:center;line-height:1.15;white-space:nowrap;">'+t.label+'</span>'
      + '</button>';
  }).join('');
}
function showTab(tab){
  RT_curTab=tab;
  var _nav=document.getElementById('nav-tabs');
  if(_nav && !_nav.innerHTML){ RT_renderTabBar(); }
  RT_TABS.forEach(function(t){
    var panel=document.getElementById('tab-'+t.id);
    if(panel){ panel.style.display = (t.id===tab) ? 'block' : 'none'; }
    var btn=document.getElementById('tbtn-'+t.id);
    var lbl=document.getElementById('tlbl-'+t.id);
    if(btn){ btn.style.background = t.id===tab ? 'rgba(31,138,77,.12)' : 'none'; }
    if(lbl){ lbl.style.color = t.id===tab ? '#1F8A4D' : 'rgba(93,112,96,.95)'; }
  });
  var def=RT_tabById(tab);
  if(def && def.mount){ def.mount(); }
}
function RT_mountShell(panelId,title,text,icon){
  var el=document.getElementById(panelId); if(!el) return;
  el.innerHTML='<div class="card" style="text-align:center;padding:36px 22px;">'
    +'<img src="'+icon+'" style="width:56px;height:56px;border-radius:14px;display:inline-block;margin-bottom:12px;">'
    +'<div class="ct" style="font-size:17px;">'+title+'</div>'
    +'<div class="cs" style="margin-top:8px;line-height:1.5;">'+text+'</div>'
    +'</div>';
}
registerTab({id:'runde',label:'Runde',icon:'<img src="'+RT_IC_RUNDE+'" style="width:26px;height:26px;display:block;">',mount:function(){ RT_render(); }});
registerTab({id:'detail',label:'Schläge',icon:'<img src="'+RT_IC_DETAIL+'" style="width:26px;height:26px;display:block;">',mount:function(){ RT_hydrateHistoricalData(); var detailIcon=document.getElementById('detail-usericon'); if(detailIcon) detailIcon.innerHTML=RT_userIcon(); RD_renderSegButtons(); GD_renderRangeButtons(); GD_renderKPIs(); renderRounds('all'); renderPenChart(); renderFW(); renderSandChart(); renderPuttsChart(); renderMetrics(); renderPerf(); }});
registerTab({id:'hi',label:'Handicap',icon:'<img src="'+RT_IC_HI+'" style="width:26px;height:26px;display:block;">',mount:function(){ RT_hydrateHistoricalData(); var hiSub=document.getElementById('hi-subtitle'); if(hiSub) hiSub.textContent='HI-Verlauf '+RT_myDisplayName(); var hiChartSub=document.getElementById('hi-chart-sub'); if(hiChartSub) hiChartSub.textContent='Ungedeckelt · 9L x2 · HI '+rtDe(RT_ownHandicap())+' = eigenes Handicap'; var hiIcon=document.getElementById('hi-usericon'); if(hiIcon) hiIcon.innerHTML=RT_userIcon(); HV_renderWhsIndex(); HV_renderLegend(); HV_renderSegButtons(); HV_renderRangeButtons(); HV_renderKPIs(); HV_renderChart(); HV_renderWhsChart(); HV_renderStbfToggle(); HV_renderStbfChart(); HV_renderTable(); }});
registerTab({id:'lernen',label:'Lernen',icon:'<img src="'+RT_IC_LERNEN+'" style="width:26px;height:26px;display:block;">',mount:function(){ RT_LRN_mount('tab-lernen'); }});
/* ============================================================================
   Schwunganalyse (RT_SW) — KI-Videoanalyse des Golfschwungs (on-device)
   ---------------------------------------------------------------------------
   Läuft komplett auf dem Gerät: MediaPipe Pose Landmarker (33 Skelettpunkte)
   wird per dynamischem Import geladen. Das Video wird Bild für Bild abgetastet,
   Phasen (Adresse/Top/Treffmoment) werden erkannt und 11 Schwungmerkmale in
   drei Phasen (Set-up / Rückschwung / Treffmoment) bewertet (Bestanden/Verbessern).
   Ein regelbasierter KI-Coach liefert zu jedem Mangel eine Erklärung + Drill.
   Kein Upload, keine Cloud – Videos verlassen das Gerät nicht.
   ========================================================================== */
var RT_SW={panel:'tab-analyse',video:null,url:null,hand:'R',angle:'fo',
  busy:false,landmarker:null,frames:null,phases:null,result:null,sampleCanvas:null,detailTab:'setup'};
var RT_SW_HIST_KEY='fp_swing_hist_v1';
var RT_SW_TASKS_VER='0.10.14';

/* ---- MediaPipe Pose-Verbindungen (Teilmenge für Overlay) ---- */
var RT_SW_CONN=[[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24],
  [23,25],[25,27],[24,26],[26,28],[27,31],[28,32],[0,11],[0,12]];

/* ---- Coach-Wissensbasis: zu jedem Merkmal Titel, Warum, Drill ---- */
var RT_SW_COACH={
 spine_setup:{t:'Wirbelsäulenwinkel (Set-up)',ph:'setup',
  why:'Ein stabiler Wirbelsäulenwinkel im Stand ist die Grundlage für einen wiederholbaren Schwung. Steht der Oberkörper zu aufrecht oder kippt er seitlich weg, verändert sich der Schwungkreis und der saubere Treffpunkt wird zum Zufall.',
  drill:'Stell dich seitlich zum Spiegel in die Ansprechposition. Neige dich aus der Hüfte (nicht aus dem Rücken) leicht nach vorn, Arme hängen locker. Halte diesen Winkel und mache 10 langsame Trockenschwünge, ohne dich aufzurichten.'},
 stance_setup:{t:'Standbreite (Set-up)',ph:'setup',
  why:'Die Standbreite bestimmt Balance und Rotationsfreiheit. Zu schmal kostet Stabilität und Kraft, zu breit blockiert die Hüftdrehung. Als Richtwert stehen die Fußaußenkanten etwa schulterbreit (beim Driver etwas breiter).',
  drill:'Leg zwei Schläger als Rahmen auf den Boden: einen an die Fußspitzen, einen an die Fersen. Kontrolliere bei jedem Aufbau, dass die Füße schulterbreit stehen und die Gewichtsverteilung 50/50 ist.'},
 leadarm_back:{t:'Führungsarm (Rückschwung)',ph:'back',
  why:'Ein gestreckter Führungsarm am höchsten Punkt hält den Schwungradius konstant. Knickt er ein, verkürzt sich der Bogen, Timing und Energieübertragung leiden – häufige Ursache für dünne oder kraftlose Schläge.',
  drill:'Klemme einen Handschuh oder ein kleines Handtuch zwischen Führungsarm und Brust. Schwinge langsam zum Top, ohne dass es herausfällt – das erzwingt einen verbundenen, gestreckten Führungsarm.'},
 spine_back:{t:'Wirbelsäulenwinkel halten (Rückschwung)',ph:'back',
  why:'Der im Stand eingestellte Winkel muss durch den Rückschwung erhalten bleiben. Richtest du dich auf oder tauchst ab, wandert der Tiefpunkt des Schwungs und der Ballkontakt wird unsauber.',
  drill:'Trockenschwünge mit dem Rücken an einer Wand: Der Hinterkopf/das Gesäß behält bis zum Top den Kontakt zum eingestellten Winkel. Fühle, wie sich der Oberkörper dreht, ohne sich zu heben.'},
 hipsway_back:{t:'Hüftschub (Rückschwung)',ph:'back',
  why:'Zu viel seitliches Wegschieben der Hüfte im Rückschwung (statt Drehung) verlagert das Gewicht nach außen. Der Rückweg zum Ball wird ungenau – die Wahrscheinlichkeit für Fehlkontakt am Treffmoment steigt deutlich.',
  drill:'Stell einen Alignment-Stick oder eine Poolnudel außen an die hintere Hüfte. Drehe im Rückschwung ein, ohne den Stick wegzudrücken – die Hüfte rotiert, statt seitlich auszuweichen.'},
 head_back:{t:'Kopfbewegung (Rückschwung)',ph:'back',
  why:'Ein ruhiger Kopf ist der Ankerpunkt des Schwungs. Wandert er im Rückschwung stark, verschiebt sich der gesamte Schwungmittelpunkt und die Konstanz am Ball leidet.',
  drill:'Fixiere im Trockenschwung einen Punkt am Boden (oder Ball) mit den Augen. Ein Partner hält locker einen Finger an deinen Kopf – im Rückschwung darf sich der Kopf nur minimal davon lösen.'},
 hiprot_back:{t:'Hüftdrehung (Rückschwung)',ph:'back',
  why:'Die Hüftdrehung im Rückschwung erzeugt die Spannung zwischen Ober- und Unterkörper, aus der die Schlägerkopfgeschwindigkeit entsteht. Zu wenig Drehung kostet Weite, zu viel kann die Sequenz stören.',
  drill:'Trockenschwünge, bei denen du bewusst die Gürtelschnalle nach hinten drehst, während die Füße fest stehen. Ziel: spürbare Drehung der Hüfte, ohne dass das vordere Knie kollabiert.'},
 head_impact:{t:'Kopfbewegung (Treffmoment)',ph:'impact',
  why:'Bleibt der Kopf bis zum Treffmoment stabil hinter dem Ball, triffst du zentraler und mit mehr Kontrolle. Ein vorzeitiges Anheben („nachschauen") führt zu Fett-/Dünn-Kontakt.',
  drill:'Schlage halbe Bälle und behalte den Blick bewusst am Boden, bis der Ball weg ist. Erst danach den Kopf mit dem Durchschwung mitgehen lassen.'},
 hiprot_impact:{t:'Hüftöffnung (Treffmoment)',ph:'impact',
  why:'Im Treffmoment sollte die Hüfte bereits Richtung Ziel geöffnet sein. Ist sie noch geschlossen, arbeiten die Arme allein – das kostet Kraft und erzeugt oft einen offenen Schlägerkopf (Slice).',
  drill:'Übe den Durchschwung aus einer bewusst früh öffnenden Hüfte: Aus dem Top zuerst mit dem vorderen Fuß in den Boden drücken und die Hüfte zum Ziel drehen, bevor die Arme fallen.'},
 hipsway_impact:{t:'Hüftverlagerung (Treffmoment)',ph:'impact',
  why:'Eine kontrollierte Verlagerung zum Ziel ist gut – ein Wegrutschen der Hüfte über das vordere Bein hinaus („Slide") verschiebt aber den Tiefpunkt und führt zu inkonstantem Kontakt.',
  drill:'Schlage mit dem Gefühl, gegen einen festen vorderen Oberschenkel zu rotieren. Das vordere Bein wird zur Wand, über die sich der Körper dreht statt hinauszuschieben.'},
 tempo_impact:{t:'Schwungtempo',ph:'impact',
  why:'Gutes Tempo folgt etwa einem Verhältnis von 3:1 (Rückschwung zu Abschwung). Ein zu hastiger oder zu langsamer Abschwung zerstört die Sequenz und die Konstanz – Rhythmus schlägt rohe Kraft.',
  drill:'Zähle im Rückschwung „eins-zwei" und im Abschwung „drei". Mache 10 Trockenschwünge mit diesem Rhythmus, dann übertrage ihn auf halbe Schläge, ohne schneller zu werden.'}
};

/* Reihenfolge/Wichtigkeit für Priorisierung (kleiner = wichtiger bei Gleichstand) */
var RT_SW_IMPORTANCE=['hipsway_back','hiprot_impact','head_impact','tempo_impact',
  'hiprot_back','hipsway_impact','head_back','spine_back','leadarm_back','spine_setup','stance_setup'];

/* ---------- Styles ---------- */
function RT_SW_ensureStyle(){
 if(document.getElementById('sw-style'))return;
 var s=document.createElement('style');s.id='sw-style';
 s.textContent=''
 +'.swwrap{padding:2px 0 20px;}'
 +'.swcard{background:#fff;border:1px solid #eef0ea;border-radius:16px;padding:14px;margin:12px 2px;box-shadow:0 1px 4px rgba(20,40,25,.05);}'
 +'.swb{border:1px solid #cfe0d2;border-radius:10px;background:#fff;color:#143522;font-weight:600;font-family:inherit;font-size:13.5px;padding:11px 14px;cursor:pointer;min-height:44px;}'
 +'.swb:active{transform:scale(.97);}'
 +'.swb.pri{background:#1F8A4D;border-color:#1F8A4D;color:#fff;}'
 +'.swb.wide{width:100%;}'
 +'.swb.cta{width:100%;border-radius:14px;padding:15px;font-size:15px;font-weight:800;}'
 +'.swrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px;}'
 +'.swhint{font-size:12px;color:#5d7060;line-height:1.5;margin-top:8px;}'
 +'.swseg{display:flex;gap:6px;background:#e9efe9;border-radius:13px;padding:4px;margin:10px 2px;}'
 +'.swseg button{flex:1;border:none;border-radius:10px;background:none;font-family:inherit;font-weight:700;font-size:14px;color:#5d7060;padding:9px 6px;cursor:pointer;min-height:40px;}'
 +'.swseg button.on{background:#fff;color:#1F8A4D;box-shadow:0 1px 3px rgba(0,0,0,.12);}'
 +'.swvid{position:relative;width:100%;border-radius:12px;overflow:hidden;background:#0b160f;}'
 +'.swvid video{display:block;width:100%;height:auto;background:#0b160f;}'
 +'.swchip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#143522;}'
 +'.swdot{width:9px;height:9px;border-radius:50%;display:inline-block;}'
 +'.swtabs{display:flex;background:#1F8A4D;border-radius:12px 12px 0 0;overflow:hidden;}'
 +'.swtabs button{flex:1;border:none;background:#1F8A4D;color:#fff;font-family:inherit;font-weight:700;font-size:13.5px;padding:12px 4px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;}'
 +'.swtabs button.on{background:#fff;color:#1F8A4D;border-radius:10px 10px 0 0;}'
 +'.swtbl{width:100%;border-collapse:collapse;}'
 +'.swtbl th{text-align:left;font-size:12px;color:#8a9c8e;font-weight:700;padding:10px 6px;border-bottom:1px solid #eef0ea;}'
 +'.swtbl td{font-size:14px;padding:12px 6px;border-bottom:1px solid #f2f4ef;color:#3a4a3f;vertical-align:middle;}'
 +'.swkf{width:100%;border-radius:12px;display:block;background:#0b160f;}'
 +'.swkflab{position:absolute;left:8px;top:8px;background:#1F8A4D;color:#fff;font-size:11px;font-weight:800;border-radius:8px;padding:3px 9px;}'
 +'.swprog{height:8px;border-radius:6px;background:#e6ece6;overflow:hidden;}'
 +'.swprog>i{display:block;height:100%;width:0;background:#1F8A4D;transition:width .2s;}'
 +'.swkf{cursor:pointer;}'
 +'.sw-ov{position:fixed;inset:0;background:rgba(8,16,10,.86);z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;}'
 +'.sw-ov-in{max-width:520px;width:100%;}'
 +'.sw-ov-img{max-width:100%;max-height:78vh;border-radius:14px;display:block;margin:0 auto;box-shadow:0 10px 40px rgba(0,0,0,.5);}'
 +'.sw-ov-lab{text-align:center;color:#fff;font-weight:700;margin-top:12px;font-size:15px;}'
 +'.sw-sheet{background:#fff;border-radius:18px;padding:18px;max-height:86vh;overflow:auto;}'
 +'.sw-sheet-thumb{width:60px;height:80px;object-fit:cover;border-radius:10px;flex:none;}'
 +'.sw-note{width:100%;box-sizing:border-box;border:1px solid #e0e6df;border-radius:10px;padding:10px;font-family:inherit;font-size:14px;min-height:70px;margin-top:6px;resize:vertical;}'
 +'.sw-sheet-x{width:100%;margin-top:10px;background:none;border:none;color:#8a9c8e;font-family:inherit;font-weight:700;font-size:14px;padding:8px;cursor:pointer;}';
 document.head.appendChild(s);
}

/* ---------- Mount / Shell ---------- */
function RT_SW_mount(panelId){
 RT_SW.panel=panelId||'tab-analyse';RT_SW_ensureStyle();RT_SW_render();
}
function RT_SW_render(){
 var el=document.getElementById(RT_SW.panel);if(!el)return;
 var handLbl=(RT_SW.hand==='R')?'Rechtshänder':'Linkshänder';
 var h='<div class="swwrap">'
  +'<div class="swcard">'
   +'<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">'
     +'<div style="font-size:19px;font-weight:800;color:#143522;">Schwunganalyse</div>'
     +'<div class="swchip" style="color:#8a9c8e;">KI · on-device</div>'
   +'</div>'
   +'<div class="swhint">Nimm deinen Schwung von vorne oder von der Seite auf (ganzer Körper im Bild, Hoch- oder Querformat). Die KI erkennt 33 Körperpunkte und bewertet 11 Schwungmerkmale – alles läuft nur auf deinem Gerät.</div>'
   +'<div class="swvid" id="sw-stage">'
     +'<video id="sw-video" playsinline preload="metadata" muted style="display:none;"></video>'
     +'<div id="sw-empty" style="padding:38px 20px;text-align:center;color:#b9c8bd;">'
       +'<div style="font-size:40px;line-height:1;margin-bottom:8px;">🏌️</div>'
       +'<div style="font-size:14px;color:#5d7060;line-height:1.5;">Schwung-Video importieren oder aufnehmen,<br>dann „Analysieren" tippen.</div>'
     +'</div>'
   +'</div>'
   +'<div class="swrow" style="flex-wrap:nowrap;gap:10px;">'
     +'<label class="swb pri" style="flex:1;display:flex;align-items:center;justify-content:center;text-align:center;">Video importieren'
       +'<input type="file" accept="video/*" style="display:none;" onchange="RT_SW_pickFile(this)"></label>'
     +'<button class="swb" id="sw-rec" onclick="RT_SW_toggleRec()" style="flex:1;">● Aufnehmen</button>'
   +'</div>'
   +'<div class="swseg" style="margin:10px 2px 0;">'
     +'<button id="sw-hand-r" class="'+(RT_SW.hand==='R'?'on':'')+'" onclick="RT_SW_setHand(\'R\')">Rechtshänder</button>'
     +'<button id="sw-hand-l" class="'+(RT_SW.hand==='L'?'on':'')+'" onclick="RT_SW_setHand(\'L\')">Linkshänder</button>'
   +'</div>'
   +'<div class="swseg" style="margin:8px 2px 0;">'
     +'<button id="sw-ang-fo" class="'+(RT_SW.angle==='fo'?'on':'')+'" onclick="RT_SW_setAngle(\'fo\')">Von vorne</button>'
     +'<button id="sw-ang-dtl" class="'+(RT_SW.angle==='dtl'?'on':'')+'" onclick="RT_SW_setAngle(\'dtl\')">Von der Seite</button>'
   +'</div>'
   +'<div class="swrow" id="sw-analyze-row" style="display:none;">'
     +'<button class="swb pri cta" id="sw-analyze" onclick="RT_SW_analyze()">Schwung analysieren</button>'
   +'</div>'
   +'<div id="sw-progress" style="display:none;margin-top:12px;">'
     +'<div class="swhint" id="sw-progress-lab" style="margin-top:0;">KI wird geladen…</div>'
     +'<div class="swprog" style="margin-top:6px;"><i id="sw-progress-bar"></i></div>'
   +'</div>'
   +'<div class="swhint">Aufnahmen benötigen die Kamerafreigabe und laufen ausschließlich lokal.</div>'
  +'</div>'
  +'<div id="sw-result"></div>'
  +'<div class="swcard" id="sw-hist" style="display:none;"></div>'
 +'</div>';
 el.innerHTML=h;
 RT_SW.video=document.getElementById('sw-video');
 RT_SW_bind();
 if(RT_SW.url){ RT_SW_attachSrc(RT_SW.url); }
 if(RT_SW.result){ RT_SW_renderResult(RT_SW.result); }
 RT_SW_renderHist();
}
function RT_SW_bind(){
 var v=RT_SW.video;if(!v)return;
 v.addEventListener('loadedmetadata',function(){
   v.style.display='block';
   var em=document.getElementById('sw-empty');if(em)em.style.display='none';
   var ar=document.getElementById('sw-analyze-row');if(ar)ar.style.display='flex';
 });
}
function RT_SW_toggleHand(){ RT_SW.hand=(RT_SW.hand==='R')?'L':'R'; var b=document.getElementById('sw-hand'); if(b)b.textContent=(RT_SW.hand==='R')?'Rechtshänder':'Linkshänder'; }
function RT_SW_setAngle(a){ RT_SW.angle=a; var f=document.getElementById('sw-ang-fo'),d=document.getElementById('sw-ang-dtl'); if(f)f.className=(a==='fo')?'on':''; if(d)d.className=(a==='dtl')?'on':''; }
function RT_SW_setHand(hnd){ RT_SW.hand=hnd; var r=document.getElementById('sw-hand-r'),l=document.getElementById('sw-hand-l'); if(r)r.className=(hnd==='R')?'on':''; if(l)l.className=(hnd==='L')?'on':''; }
function RT_SW_pickFile(inp){
 var f=inp&&inp.files&&inp.files[0];if(!f)return;
 if(RT_SW.url){try{URL.revokeObjectURL(RT_SW.url);}catch(e){}}
 RT_SW.result=null; var rc=document.getElementById('sw-result'); if(rc)rc.innerHTML='';
 RT_SW.url=URL.createObjectURL(f);
 RT_SW_attachSrc(RT_SW.url);
}
function RT_SW_attachSrc(url){
 var v=RT_SW.video;if(!v)return; v.src=url; try{v.load();}catch(e){}
}

/* ---------- Aufnahme (nutzt getUserMedia + MediaRecorder) ---------- */
function RT_SW_toggleRec(){
 var b=document.getElementById('sw-rec');
 if(RT_SW._rec){ try{RT_SW._rec.stop();}catch(e){} return; }
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){ RT_SW_toast('Kamera nicht verfügbar.'); return; }
 navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:1280}},audio:false}).then(function(stream){
   var chunks=[]; var mr; try{ mr=new MediaRecorder(stream); }catch(e){ RT_SW_toast('Aufnahme nicht unterstützt.'); stream.getTracks().forEach(function(t){t.stop();}); return; }
   RT_SW._rec=mr; if(b){b.textContent='■ Stopp';b.classList.add('pri');}
   mr.ondataavailable=function(ev){ if(ev.data&&ev.data.size)chunks.push(ev.data); };
   mr.onstop=function(){ stream.getTracks().forEach(function(t){t.stop();}); RT_SW._rec=null; if(b){b.textContent='● Aufnehmen';b.classList.remove('pri');}
     var blob=new Blob(chunks,{type:chunks[0]?chunks[0].type:'video/mp4'});
     if(RT_SW.url){try{URL.revokeObjectURL(RT_SW.url);}catch(e){}}
     RT_SW.result=null; var rc=document.getElementById('sw-result'); if(rc)rc.innerHTML='';
     RT_SW.url=URL.createObjectURL(blob); RT_SW_attachSrc(RT_SW.url);
   };
   mr.start();
 }).catch(function(){ RT_SW_toast('Kamerazugriff verweigert.'); });
}

/* ---------- MediaPipe laden ---------- */
function RT_SW_loadLandmarker(){
 if(RT_SW.landmarker) return Promise.resolve(RT_SW.landmarker);
 var base='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@'+RT_SW_TASKS_VER;
 return import(base+'/vision_bundle.mjs').then(function(vision){
   return vision.FilesetResolver.forVisionTasks(base+'/wasm').then(function(fileset){
     return vision.PoseLandmarker.createFromOptions(fileset,{
       baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task',delegate:'GPU'},
       runningMode:'VIDEO',numPoses:1});
   });
 }).then(function(lm){ RT_SW.landmarker=lm; return lm; });
}

/* ---------- Frame-Abtastung ---------- */
function RT_SW_seek(v,t){ return new Promise(function(res){ var done=false; function on(){ if(done)return; done=true; v.removeEventListener('seeked',on); res(); } v.addEventListener('seeked',on); try{ v.currentTime=t; }catch(e){ done=true; res(); } setTimeout(function(){ if(!done){done=true; v.removeEventListener('seeked',on); res(); } },600); }); }

function RT_SW_progress(p,lab){ var b=document.getElementById('sw-progress-bar'); if(b)b.style.width=Math.round(p*100)+'%'; if(lab){ var l=document.getElementById('sw-progress-lab'); if(l)l.textContent=lab; } }

function RT_SW_sample(){
 var v=RT_SW.video; var dur=v&&v.duration||0;
 if(!dur||!v.videoWidth) return Promise.reject(new Error('Kein gültiges Video.'));
 var n=Math.min(90,Math.max(24,Math.round(dur*20)));
 var ratio=Math.min(1,480/v.videoWidth);
 var oc=document.createElement('canvas'); oc.width=Math.round(v.videoWidth*ratio); oc.height=Math.round(v.videoHeight*ratio);
 var octx=oc.getContext('2d');
 RT_SW.sampleCanvas=oc;
 var frames=[]; var lastTs=-1;
 return RT_SW_loadLandmarker().then(function(lm){
   var i=0;
   function step(){
     if(i>=n) return frames;
     var t=dur*(i/(n-1));
     return RT_SW_seek(v,t).then(function(){
       try{ octx.drawImage(v,0,0,oc.width,oc.height); }catch(e){}
       var ts=Math.round(t*1000); if(ts<=lastTs) ts=lastTs+1; lastTs=ts;
       var res=null; try{ res=lm.detectForVideo(oc,ts); }catch(e){}
       var lmk=(res&&res.landmarks&&res.landmarks[0])||null;
       var wl=(res&&res.worldLandmarks&&res.worldLandmarks[0])||null;
       frames.push({t:t,lm:lmk,wl:wl});
       i++; RT_SW_progress(0.15+0.8*(i/n),'Schwung wird analysiert … '+Math.round(i/n*100)+'%');
       return step();
     });
   }
   RT_SW_progress(0.12,'Schwung wird analysiert …');
   return step();
 });
}

/* ---------- Geometrie-Helfer ---------- */
function RT_SW_d(a,b){ var dx=a.x-b.x,dy=a.y-b.y; return Math.sqrt(dx*dx+dy*dy); }
function RT_SW_mid(a,b){ return {x:(a.x+b.x)/2,y:(a.y+b.y)/2}; }
function RT_SW_ang3(a,b,c){ var v1x=a.x-b.x,v1y=a.y-b.y,v2x=c.x-b.x,v2y=c.y-b.y; var d1=Math.hypot(v1x,v1y)||1e-6,d2=Math.hypot(v2x,v2y)||1e-6; var cs=(v1x*v2x+v1y*v2y)/(d1*d2); cs=Math.max(-1,Math.min(1,cs)); return Math.acos(cs)*180/Math.PI; }
function RT_SW_vertTilt(hipC,shC){ var dx=shC.x-hipC.x,dy=shC.y-hipC.y; return Math.abs(Math.atan2(dx,-dy)*180/Math.PI); }
function RT_SW_rotDeg(wl,ia,ib){ if(!wl||!wl[ia]||!wl[ib])return null; var dx=wl[ib].x-wl[ia].x,dz=(wl[ib].z||0)-(wl[ia].z||0); return Math.atan2(dz,dx)*180/Math.PI; }
function RT_SW_angDiff(a,b){ if(a===null||b===null)return null; var d=Math.abs(a-b)%360; if(d>180)d=360-d; return d; }

/* ---------- Phasenerkennung ---------- */
function RT_SW_detectPhases(frames){
 var valid=frames.filter(function(f){return f.lm;});
 if(valid.length<8) return null;
 function handC(f){ var l=f.lm[15],r=f.lm[16]; if(l&&r)return RT_SW_mid(l,r); return l||r||null; }
 var idx=[]; for(var i=0;i<frames.length;i++){ if(frames[i].lm&&handC(frames[i])) idx.push(i); }
 if(idx.length<8) return null;
 var n=frames.length;
 // Top = Hände am höchsten (min y) im mittleren Bereich
 var topIdx=idx[0], topY=1e9;
 idx.forEach(function(i){ var h=handC(frames[i]); if(h&&h.y<topY && i>=n*0.12 && i<=n*0.8){ topY=h.y; topIdx=i; } });
 // Adresse = ruhigstes Bild vor dem Top (kleinste Handbewegung im ersten Drittel)
 var addrIdx=idx[0], bestSpeed=1e9, prev=null, prevI=null;
 idx.forEach(function(i){ var h=handC(frames[i]); if(prev){ var sp=RT_SW_d(h,prev)/Math.max(1,i-prevI); if(i<=Math.max(3,topIdx*0.6) && sp<bestSpeed){ bestSpeed=sp; addrIdx=i; } } prev=h; prevI=i; });
 // Treffmoment = nach Top erstes Bild, in dem die Hände wieder auf Adress-Höhe sind
 var addrY=handC(frames[addrIdx]).y;
 var impIdx=topIdx, bestD=1e9;
 idx.forEach(function(i){ if(i>topIdx){ var h=handC(frames[i]); var dd=Math.abs(h.y-addrY); if(i<=topIdx+n*0.6 && dd<bestD){ bestD=dd; impIdx=i; } } });
 if(impIdx<=topIdx){ impIdx=Math.min(n-1,topIdx+2); }
 return {address:addrIdx,top:topIdx,impact:impIdx};
}

/* ---------- Metriken + Bewertung ---------- */
function RT_SW_evalMetric(id,val,pass){ var c=RT_SW_COACH[id]; return {id:id,title:c.t,phase:c.ph,value:val,pass:pass}; }

function RT_SW_computeMetrics(frames,ph){
 var A=frames[ph.address], T=frames[ph.top], I=frames[ph.impact];
 if(!A.lm||!T.lm||!I.lm) return null;
 var lead=(RT_SW.hand==='R')?{sh:11,el:13,wr:15}:{sh:12,el:14,wr:16};
 function shC(f){return RT_SW_mid(f.lm[11],f.lm[12]);}
 function hipC(f){return RT_SW_mid(f.lm[23],f.lm[24]);}
 var torsoA=Math.max(1e-3,RT_SW_d(shC(A),hipC(A)));
 var out=[]; var fmt=function(x,u){ return (x===null||isNaN(x))?'–':(Math.round(x*10)/10+(u||'')); };

 // Set-up: Wirbelsäulenwinkel
 var spineA=RT_SW_vertTilt(hipC(A),shC(A));
 out.push(RT_SW_evalMetric('spine_setup',fmt(spineA,'°'), spineA<=16));
 // Set-up: Standbreite (Knöchel vs Schulter)
 var ankW=Math.abs(A.lm[27].x-A.lm[28].x), shW=Math.abs(A.lm[11].x-A.lm[12].x)||1e-3; var ratio=ankW/shW;
 out.push(RT_SW_evalMetric('stance_setup',fmt(ratio*100,' %'), ratio>=0.95&&ratio<=1.7));
 // Rückschwung: Führungsarm am Top
 var la=RT_SW_ang3(T.lm[lead.sh],T.lm[lead.el],T.lm[lead.wr]);
 out.push(RT_SW_evalMetric('leadarm_back',fmt(la,'°'), la>=150));
 // Rückschwung: Wirbelsäulenwinkel halten
 var spineT=RT_SW_vertTilt(hipC(T),shC(T)); var spineDev=Math.abs(spineT-spineA);
 out.push(RT_SW_evalMetric('spine_back',fmt(spineDev,'° Abw.'), spineDev<=10));
 // Rückschwung: Hüftschub
 var swayB=Math.abs(hipC(T).x-hipC(A).x)/torsoA;
 out.push(RT_SW_evalMetric('hipsway_back',fmt(swayB*100,' %'), swayB<=0.14));
 // Rückschwung: Kopfbewegung
 var headB=RT_SW_d(T.lm[0],A.lm[0])/torsoA;
 out.push(RT_SW_evalMetric('head_back',fmt(headB*100,' %'), headB<=0.16));
 // Rückschwung: Hüftdrehung
 var hrA=RT_SW_rotDeg(A.wl,23,24), hrT=RT_SW_rotDeg(T.wl,23,24);
 var hipRotB=RT_SW_angDiff(hrA,hrT);
 if(hipRotB===null){ var wA=Math.abs(A.lm[23].x-A.lm[24].x)||1e-3,wT=Math.abs(T.lm[23].x-T.lm[24].x); hipRotB=Math.max(0,(1-wT/wA))*90; }
 out.push(RT_SW_evalMetric('hiprot_back',fmt(hipRotB,'°'), hipRotB>=22&&hipRotB<=60));
 // Treffmoment: Kopfbewegung
 var headI=RT_SW_d(I.lm[0],A.lm[0])/torsoA;
 out.push(RT_SW_evalMetric('head_impact',fmt(headI*100,' %'), headI<=0.20));
 // Treffmoment: Hüftöffnung
 var hrI=RT_SW_rotDeg(I.wl,23,24); var hipRotI=RT_SW_angDiff(hrA,hrI);
 if(hipRotI===null){ hipRotI=hipRotB*0.7; }
 out.push(RT_SW_evalMetric('hiprot_impact',fmt(hipRotI,'°'), hipRotI>=18));
 // Treffmoment: Hüftverlagerung
 var swayI=Math.abs(hipC(I).x-hipC(A).x)/torsoA;
 out.push(RT_SW_evalMetric('hipsway_impact',fmt(swayI*100,' %'), swayI<=0.28));
 // Tempo
 var tBack=Math.max(1e-3,T.t-A.t), tDown=Math.max(1e-3,I.t-T.t); var tempo=tBack/tDown;
 out.push(RT_SW_evalMetric('tempo_impact',(Math.round(tempo*10)/10)+' : 1', tempo>=2.2&&tempo<=3.8));

 // Severity (für Priorität): grobe Distanz zur Schwelle
 var sev={spine_setup:Math.max(0,spineA-16),stance_setup:Math.max(0,0.95-ratio,ratio-1.7)*100,
   leadarm_back:Math.max(0,150-la),spine_back:Math.max(0,spineDev-10),hipsway_back:Math.max(0,swayB-0.14)*100,
   head_back:Math.max(0,headB-0.16)*100,hiprot_back:Math.max(0,22-hipRotB,hipRotB-60),
   head_impact:Math.max(0,headI-0.20)*100,hiprot_impact:Math.max(0,18-hipRotI),
   hipsway_impact:Math.max(0,swayI-0.28)*100,tempo_impact:Math.max(0,2.2-tempo,tempo-3.8)*10};
 out.forEach(function(m){ m.sev=sev[m.id]||0; });
 return out;
}

/* ---------- Skelett-Overlay auf Schlüsselbild ---------- */
function RT_SW_keyframeDataUrl(frameIdx){
 var v=RT_SW.video, oc=RT_SW.sampleCanvas; if(!v||!oc) return null;
 var f=RT_SW.frames&&RT_SW.frames[frameIdx]; if(!f) return null;
 var c=document.createElement('canvas'); c.width=oc.width; c.height=oc.height; var ctx=c.getContext('2d');
 try{ ctx.drawImage(RT_SW._kfImg||oc,0,0,c.width,c.height); }catch(e){}
 if(f.lm){
   ctx.lineWidth=Math.max(2,c.width/160); ctx.strokeStyle='rgba(47,109,246,.95)';
   RT_SW_CONN.forEach(function(cn){ var a=f.lm[cn[0]],b=f.lm[cn[1]]; if(a&&b){ ctx.beginPath(); ctx.moveTo(a.x*c.width,a.y*c.height); ctx.lineTo(b.x*c.width,b.y*c.height); ctx.stroke(); } });
   ctx.fillStyle='#8FE1A9'; var r=Math.max(3,c.width/90);
   [0,11,12,13,14,15,16,23,24,25,26,27,28].forEach(function(i){ var p=f.lm[i]; if(p){ ctx.beginPath(); ctx.arc(p.x*c.width,p.y*c.height,r,0,7); ctx.fill(); } });
 }
 try{ return c.toDataURL('image/jpeg',0.8); }catch(e){ return null; }
}
function RT_SW_captureKeyframe(frameIdx){
 // zeichnet das Videobild des Schlüsselbildes neu (scharf) + Skelett
 var v=RT_SW.video, oc=RT_SW.sampleCanvas; if(!v||!oc) return Promise.resolve(null);
 var f=RT_SW.frames&&RT_SW.frames[frameIdx]; if(!f) return Promise.resolve(null);
 return RT_SW_seek(v,f.t).then(function(){
   var c=document.createElement('canvas'); c.width=oc.width; c.height=oc.height; var ctx=c.getContext('2d');
   try{ ctx.drawImage(v,0,0,c.width,c.height); }catch(e){}
   if(f.lm){
     ctx.lineWidth=Math.max(2,c.width/150); ctx.strokeStyle='rgba(47,109,246,.95)';
     RT_SW_CONN.forEach(function(cn){ var a=f.lm[cn[0]],b=f.lm[cn[1]]; if(a&&b){ ctx.beginPath(); ctx.moveTo(a.x*c.width,a.y*c.height); ctx.lineTo(b.x*c.width,b.y*c.height); ctx.stroke(); } });
     ctx.fillStyle='#8FE1A9'; var r=Math.max(3,c.width/85);
     [0,11,12,13,14,15,16,23,24,25,26,27,28].forEach(function(i){ var p=f.lm[i]; if(p){ ctx.beginPath(); ctx.arc(p.x*c.width,p.y*c.height,r,0,7); ctx.fill(); } });
   }
   try{ return c.toDataURL('image/jpeg',0.82); }catch(e){ return null; }
 });
}

/* ---------- Hauptablauf ---------- */
function RT_SW_analyze(){
 if(RT_SW.busy) return;
 if(!RT_isPremium() && RT_swingFreeLeft()<=0){ RT_showPaywall('swing'); return; }
 RT_SW.busy=true;
 var btn=document.getElementById('sw-analyze'); if(btn){btn.disabled=true;btn.textContent='Analysiere …';}
 var prog=document.getElementById('sw-progress'); if(prog)prog.style.display='block';
 RT_SW_progress(0.05,'KI-Modell wird geladen …');
 RT_SW_sample().then(function(frames){
   RT_SW.frames=frames;
   var ph=RT_SW_detectPhases(frames);
   if(!ph){ throw new Error('no-pose'); }
   RT_SW.phases=ph;
   var metrics=RT_SW_computeMetrics(frames,ph);
   if(!metrics){ throw new Error('no-pose'); }
   RT_SW_progress(0.97,'Schlüsselbilder werden erstellt …');
   return Promise.all([RT_SW_captureKeyframe(ph.address),RT_SW_captureKeyframe(ph.top),RT_SW_captureKeyframe(ph.impact)]).then(function(kf){
     var passed=metrics.filter(function(m){return m.pass;}).length;
     var improves=metrics.filter(function(m){return !m.pass;});
     improves.sort(function(a,b){ if(b.sev!==a.sev) return b.sev-a.sev; return RT_SW_IMPORTANCE.indexOf(a.id)-RT_SW_IMPORTANCE.indexOf(b.id); });
     var res={ts:Date.now(),angle:RT_SW.angle,hand:RT_SW.hand,total:metrics.length,passed:passed,
       metrics:metrics,top:improves[0]||null,kf:{address:kf[0],top:kf[1],impact:kf[2]}};
     RT_SW.result=res; RT_SW_saveHist(res);
     if(!RT_isPremium()) RT_swingFreeInc();
     if(prog)prog.style.display='none';
     if(btn){btn.disabled=false;btn.textContent='Erneut analysieren';}
     RT_SW.busy=false;
     RT_SW_renderResult(res); RT_SW_renderHist();
     var rc=document.getElementById('sw-result'); if(rc)rc.scrollIntoView({behavior:'smooth',block:'start'});
   });
 }).catch(function(err){
   RT_SW.busy=false; if(prog)prog.style.display='none';
   if(btn){btn.disabled=false;btn.textContent='Schwung analysieren';}
   var rc=document.getElementById('sw-result');
   var msg=(err&&err.message==='no-pose')
     ? 'Der Schwung konnte nicht sicher erkannt werden. Achte darauf, dass dein ganzer Körper im Bild ist, das Licht ausreicht und die Kamera ruhig steht.'
     : 'Die KI-Analyse konnte nicht geladen werden (Internetverbindung für das einmalige Laden des Modells nötig). Bitte erneut versuchen.';
   if(rc)rc.innerHTML='<div class="swcard" style="border-color:#f3d6d6;background:#fff8f8;"><div style="font-weight:800;color:#b3261e;margin-bottom:6px;">Analyse nicht möglich</div><div class="swhint" style="margin-top:0;">'+msg+'</div></div>';
 });
}

/* ---------- Ergebnis-UI ---------- */
function RT_SW_setDetailTab(t){ RT_SW.detailTab=t; if(RT_SW.result) RT_SW_renderResult(RT_SW.result); var rc=document.getElementById('sw-detailbox'); if(rc)rc.scrollIntoView({behavior:'smooth',block:'nearest'}); }
function RT_SW_dot(pass){ return '<span class="swdot" style="background:'+(pass?'#1FB25A':'#F0483E')+';"></span>'; }
function RT_SW_phaseLabel(p){ return p==='setup'?'Set-up':(p==='back'?'Rückschwung':'Treffmoment'); }

function RT_SW_renderResult(res){
 var rc=document.getElementById('sw-result'); if(!rc)return;
 var pct=res.total?res.passed/res.total:0; var deg=Math.round(pct*360);
 var improveCount=res.total-res.passed;
 var ring='<div style="position:relative;width:96px;height:96px;flex:none;">'
   +'<div style="width:96px;height:96px;border-radius:50%;background:conic-gradient(#1F8A4D '+deg+'deg,#e3efe6 0);display:flex;align-items:center;justify-content:center;">'
   +'<div style="width:74px;height:74px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;">'
   +'<div style="font-size:22px;font-weight:800;color:#143522;line-height:1;">'+res.passed+'/'+res.total+'</div>'
   +'<div style="font-size:10px;font-weight:700;color:#8a9c8e;letter-spacing:.5px;">BESTANDEN</div>'
   +'</div></div></div>';

 var head='<div class="swcard" style="background:linear-gradient(180deg,#12261b,#1c3a26);border:none;color:#fff;">'
   +'<div style="display:flex;align-items:center;gap:14px;">'+ring
   +'<div style="min-width:0;"><div style="font-size:12px;color:#8FE1A9;font-weight:700;">'+(res.angle==='fo'?'Von vorne':'Von der Seite')+'</div>'
   +'<div style="font-size:20px;font-weight:800;line-height:1.15;">Deine Schwung-Analyse</div>'
   +'<div style="font-size:13px;color:#cfe0d4;margin-top:2px;">'+(improveCount>0?(improveCount+' '+(improveCount===1?'Bereich':'Bereiche')+' zum Verbessern'):'Stark – alle Merkmale bestanden!')+'</div>'
   +'</div></div></div>';

 var topCard='';
 if(res.top){ var c=RT_SW_COACH[res.top.id]; var kfImg=res.kf[c.ph==='setup'?'address':(c.ph==='back'?'top':'impact')];
   topCard='<div class="swcard">'
    +'<div style="text-align:center;font-size:14px;color:#3a4a3f;">Deine <b style="color:#F0483E;">Top-Priorität</b></div>'
    +'<div style="text-align:center;font-size:20px;font-weight:800;color:#143522;margin:2px 0 10px;text-transform:uppercase;letter-spacing:.3px;">'+c.t+'</div>'
    +(kfImg?'<div style="position:relative;"><img class="swkf" src="'+kfImg+'" onclick="RT_SW_lightbox(this.src,\''+RT_SW_phaseLabel(c.ph)+'\')"><span class="swkflab">'+RT_SW_phaseLabel(c.ph)+'</span></div>':'')
    +'<div style="margin-top:12px;font-weight:800;color:#143522;">Warum das zählt</div>'
    +'<div class="swhint" style="margin-top:4px;">'+c.why+'</div>'
    +'<div style="margin-top:12px;font-weight:800;color:#143522;">Dein Drill</div>'
    +'<div class="swhint" style="margin-top:4px;">'+c.drill+'</div>'
    +'<div style="margin-top:8px;font-size:12px;color:#8a9c8e;">Gemessen: '+res.top.value+'</div>'
   +'</div>';
 }

 // Detail-Tabs
 var tab=RT_SW.detailTab||'setup';
 function phCount(p){ var arr=res.metrics.filter(function(m){return m.phase===p;}); var fail=arr.some(function(m){return !m.pass;}); return fail; }
 var tabsHtml='<div class="swtabs">'
   +'<button class="'+(tab==='setup'?'on':'')+'" onclick="RT_SW_setDetailTab(\'setup\')">'+RT_SW_dot(!phCount('setup'))+'Set-up</button>'
   +'<button class="'+(tab==='back'?'on':'')+'" onclick="RT_SW_setDetailTab(\'back\')">'+RT_SW_dot(!phCount('back'))+'Rückschwung</button>'
   +'<button class="'+(tab==='impact'?'on':'')+'" onclick="RT_SW_setDetailTab(\'impact\')">'+RT_SW_dot(!phCount('impact'))+'Treffmoment</button>'
 +'</div>';
 var rows=res.metrics.filter(function(m){return m.phase===tab;});
 // Priorität: Verbessern zuerst
 rows=rows.slice().sort(function(a,b){ if(a.pass!==b.pass) return a.pass?1:-1; return b.sev-a.sev; });
 var isTop=res.top?res.top.id:null;
 var tbody=rows.map(function(m,i){
   return '<tr>'
     +'<td style="width:64px;color:#8a9c8e;">'+(i+1)+(m.id===isTop?' <span style="color:#F0483E;font-weight:800;">Top</span>':'')+'</td>'
     +'<td>'+m.title.replace(/\s*\((Set-up|Rückschwung|Treffmoment)\)/,'')+'<div style="font-size:11px;color:#a7b3aa;">'+m.value+'</div></td>'
     +'<td style="width:110px;font-weight:800;color:'+(m.pass?'#1FB25A':'#F0483E')+';">'+(m.pass?'Bestanden':'Verbessern')+'</td>'
   +'</tr>';
 }).join('');
 var detail='<div class="swcard" id="sw-detailbox" style="padding:0;overflow:hidden;">'
   +'<div style="display:flex;align-items:center;justify-content:space-between;background:#1F8A4D;color:#fff;padding:12px 14px;">'
     +'<div style="font-weight:800;font-size:15px;">Analyse-Details</div>'
     +'<div style="display:flex;gap:12px;font-size:12px;font-weight:700;"><span class="swchip" style="color:#fff;">'+RT_SW_dot(true)+'Bestanden</span><span class="swchip" style="color:#fff;">'+RT_SW_dot(false)+'Verbessern</span></div>'
   +'</div>'
   +tabsHtml
   +'<div style="padding:4px 14px 8px;"><table class="swtbl"><thead><tr><th>Priorität</th><th>Merkmal</th><th>Ergebnis</th></tr></thead><tbody>'+tbody+'</tbody></table></div>'
 +'</div>';

 // Schlüsselbilder-Filmstreifen
 var strip='<div class="swcard"><div style="font-weight:800;color:#143522;margin-bottom:8px;">Schlüsselbilder mit Skelett</div>'
   +'<div style="display:flex;gap:8px;">'
   +['address','top','impact'].map(function(k){ var lbl=k==='address'?'Adresse':(k==='top'?'Top':'Treffer'); return '<div style="flex:1;position:relative;">'+(res.kf[k]?'<img class="swkf" src="'+res.kf[k]+'" onclick="RT_SW_lightbox(this.src,\''+lbl+'\')"><span class="swkflab" style="font-size:10px;padding:2px 6px;">'+lbl+'</span>':'<div style="aspect-ratio:9/16;background:#0b160f;border-radius:12px;"></div>')+'</div>'; }).join('')
   +'</div><div class="swhint">Die KI hat Adresse, den Punkt der höchsten Hände (Top) und den Treffmoment automatisch bestimmt.</div></div>';

 rc.innerHTML=head+topCard+detail+strip;
}

/* ---------- Historie ---------- */
function RT_SW_histData(){ var a=rtGet(RT_SW_HIST_KEY); return Array.isArray(a)?a:[]; }
function RT_SW_saveHist(res){
 var slim={ts:res.ts,angle:res.angle,passed:res.passed,total:res.total,topId:res.top?res.top.id:null,thumb:res.kf.impact||res.kf.top||res.kf.address||null,note:'',metrics:(res.metrics||[]).map(function(m){return {title:m.title,value:m.value,pass:m.pass,phase:m.phase,sev:m.sev};})};
 var a=RT_SW_histData(); a.unshift(slim); if(a.length>12)a=a.slice(0,12); rtSet(RT_SW_HIST_KEY,a);
}
function RT_SW_renderHist(){
 var box=document.getElementById('sw-hist'); if(!box)return;
 var a=RT_SW_histData(); if(!a.length){ box.style.display='none'; return; }
 box.style.display='block';
 var rows=a.map(function(e,i){ var d=new Date(e.ts); var dd=('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.';
   var tt=e.topId&&RT_SW_COACH[e.topId]?RT_SW_COACH[e.topId].t.replace(/\s*\(.*\)/,''):'–';
   return '<div onclick="RT_SW_histOpen('+i+')" style="display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid #f2f4ef;cursor:pointer;">'
     +(e.thumb?'<img src="'+e.thumb+'" style="width:38px;height:50px;object-fit:cover;border-radius:8px;flex:none;">':'')
     +'<div style="flex:1;min-width:0;"><div style="font-weight:700;color:#143522;font-size:13px;">'+e.passed+'/'+e.total+' bestanden · '+(e.angle==='fo'?'vorne':'Seite')+'</div>'
     +'<div style="font-size:11px;color:#8a9c8e;">'+dd+' · Fokus: '+tt+(e.note?' · 📝':'')+'</div></div>'
     +'<span style="color:#c2cdc4;font-size:20px;flex:none;">›</span></div>';
 }).join('');
 box.innerHTML='<div style="font-weight:800;color:#143522;">Verlauf</div>'+rows;
}

function RT_SW_lightbox(src,label){
 if(!src)return;
 var o=document.createElement('div'); o.className='sw-ov';
 var inner=document.createElement('div'); inner.className='sw-ov-in';
 var img=document.createElement('img'); img.src=src; img.className='sw-ov-img';
 inner.appendChild(img);
 if(label){ var l=document.createElement('div'); l.className='sw-ov-lab'; l.textContent=label; inner.appendChild(l); }
 o.appendChild(inner);
 o.addEventListener('click',function(){ try{document.body.removeChild(o);}catch(e){} });
 inner.addEventListener('click',function(e){ e.stopPropagation(); });
 document.body.appendChild(o);
}
function RT_SW_histClose(){ var o=document.getElementById('sw-histmodal'); if(o){ try{document.body.removeChild(o);}catch(e){} } }
function RT_SW_histSaveNote(i){ var a=RT_SW_histData(); if(!a[i])return; var t=document.getElementById('sw-hist-note'); a[i].note=t?t.value:''; rtSet(RT_SW_HIST_KEY,a); RT_SW_histClose(); RT_SW_renderHist(); RT_SW_toast('Notiz gespeichert'); }
function RT_SW_histDelete(i){ var a=RT_SW_histData(); if(!a[i])return; a.splice(i,1); rtSet(RT_SW_HIST_KEY,a); RT_SW_histClose(); RT_SW_renderHist(); RT_SW_toast('Analyse gelöscht'); }
function RT_SW_histOpen(i){
 var a=RT_SW_histData(); var e=a[i]; if(!e)return;
 var d=new Date(e.ts); var dd=('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+d.getFullYear();
 var tt=e.topId&&RT_SW_COACH[e.topId]?RT_SW_COACH[e.topId].t.replace(/\s*\(.*\)/,''):'–';
 var metricsHtml='';
 if(e.metrics&&e.metrics.length){
   var mr=e.metrics.slice().sort(function(x,y){ if(x.pass!==y.pass)return x.pass?1:-1; return (y.sev||0)-(x.sev||0); });
   metricsHtml='<table class="swtbl" style="margin-top:10px;"><tbody>'+mr.map(function(m){ return '<tr><td>'+m.title.replace(/\s*\((Set-up|Rückschwung|Treffmoment)\)/,'')+'<div style="font-size:11px;color:#a7b3aa;">'+m.value+'</div></td><td style="width:104px;font-weight:800;color:'+(m.pass?'#1FB25A':'#F0483E')+';">'+(m.pass?'Bestanden':'Verbessern')+'</td></tr>'; }).join('')+'</tbody></table>';
 }
 var o=document.createElement('div'); o.className='sw-ov'; o.id='sw-histmodal';
 var inner=document.createElement('div'); inner.className='sw-ov-in sw-sheet';
 inner.innerHTML=
   '<div style="display:flex;align-items:center;gap:12px;">'
   +(e.thumb?'<img src="'+e.thumb+'" class="sw-sheet-thumb" onclick="RT_SW_lightbox(this.src,\'Schlüsselbild\')">':'')
   +'<div style="flex:1;min-width:0;">'
     +'<div style="font-weight:800;color:#143522;font-size:17px;">'+e.passed+'/'+e.total+' bestanden</div>'
     +'<div style="font-size:12px;color:#8a9c8e;margin-top:2px;">'+dd+' · '+(e.angle==='fo'?'Von vorne':'Von der Seite')+'</div>'
     +'<div style="font-size:13px;color:#3a4a3f;margin-top:4px;">Fokus: <b>'+tt+'</b></div>'
   +'</div></div>'
   +metricsHtml
   +'<div style="margin-top:14px;font-weight:800;color:#143522;font-size:13px;">Notiz</div>'
   +'<textarea id="sw-hist-note" class="sw-note" placeholder="Eigene Notiz zu dieser Analyse…">'+(e.note?rtEsc(e.note):'')+'</textarea>'
   +'<div style="display:flex;gap:8px;margin-top:12px;">'
     +'<button class="swb" style="flex:1;color:#c0392b;border-color:#e3c4c0;" onclick="RT_SW_histDelete('+i+')">Löschen</button>'
     +'<button class="swb pri" style="flex:1;" onclick="RT_SW_histSaveNote('+i+')">Notiz speichern</button>'
   +'</div>'
   +'<button class="sw-sheet-x" onclick="RT_SW_histClose()">Schließen</button>';
 o.appendChild(inner);
 o.addEventListener('click',function(){ RT_SW_histClose(); });
 inner.addEventListener('click',function(ev){ ev.stopPropagation(); });
 document.body.appendChild(o);
}
function RT_SW_toast(msg){ var t=document.createElement('div'); t.textContent=msg; t.style.cssText='position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#12261b;color:#fff;padding:10px 16px;border-radius:100px;font-size:13px;z-index:99999;box-shadow:0 4px 14px rgba(0,0,0,.35);'; document.body.appendChild(t); setTimeout(function(){ try{document.body.removeChild(t);}catch(e){} },2200); }

/* ============================================================================
   Analyse-Dispatcher (RT_ANL) — Umschalter Schwunganalyse / Shot-Tracer
   ========================================================================== */
var RT_ANL_sub='swing', RT_ANL_panel='tab-analyse';
function RT_ANL_mount(panelId){
 RT_ANL_panel=panelId||'tab-analyse'; RT_SW_ensureStyle();
 var el=document.getElementById(RT_ANL_panel); if(!el)return;
 el.innerHTML='<div class="swseg" id="anl-seg">'
   +'<button id="anlseg-swing" class="'+(RT_ANL_sub==='swing'?'on':'')+'" onclick="RT_ANL_switch(\'swing\')">Schwunganalyse</button>'
   +'<button id="anlseg-trace" class="'+(RT_ANL_sub==='trace'?'on':'')+'" onclick="RT_ANL_switch(\'trace\')">Shot-Tracer</button>'
 +'</div><div id="anl-sub"></div>';
 RT_ANL_paint();
}
function RT_ANL_switch(s){ if(RT_ANL_sub===s)return; if(s==='trace'&&!RT_requirePremium('trace'))return; RT_ANL_sub=s; var a=document.getElementById('anlseg-swing'),b=document.getElementById('anlseg-trace'); if(a)a.className=(s==='swing')?'on':''; if(b)b.className=(s==='trace')?'on':''; RT_ANL_paint(); }
function RT_ANL_paint(){ var sub=document.getElementById('anl-sub'); if(!sub)return; if(RT_ANL_sub==='trace'){ RT_TRC_mount('anl-sub'); } else { RT_SW_mount('anl-sub'); } }
/* ===== Ende Schwunganalyse ===== */

registerTab({id:'analyse',label:'Analyse',icon:'<img src="'+RT_IC_ANALYSE+'" style="width:26px;height:26px;display:block;">',mount:function(){ RT_ANL_mount('tab-analyse'); }});
/* ===== Ende Registry ===== */

RT_hydrateCustomCourses();
/* RT_seedHistoricalRounds() NICHT MEHR automatisch bei jedem Laden ausfuehren: das hat
   Marks persoenliche Hole19-Importhistorie (32 Runden, fest im Code hinterlegt) bei JEDEM
   neuen Nutzer (z.B. eingeladenen Mitspielern wie Carsten) lokal eingespielt, noch bevor
   ueberhaupt ein Login stattfand - beim naechsten Cloud-Sync wurden diese Runden dann
   faelschlich in DEREN eigenes Konto gepusht. Marks eigene Migration ist laengst
   abgeschlossen (liegt sicher in seinem Account) - die Funktion wird daher nicht mehr
   automatisch aufgerufen. */
RT_hydrateHistoricalData();
/* Nach Reload/versehentlichem Weg-Wischen zurueck in die laufende Runde, damit keine
   Eingaben "verloren" wirken und die aktive Runde nicht versehentlich ueberschrieben wird. */
try{ if(rtGet('golflog_screen_v1')==='play' && RT_round && !RT_round.done){ RT_state.screen='play'; } }catch(e){}
/* Hochformat sperren, wo die Plattform es unterstuetzt (Android/PWA); iOS-Safari ignoriert das
   -> dort greift die CSS-Hochformat-Sperre (#orient-lock in app.html). */
try{ if(window.screen && screen.orientation && screen.orientation.lock){ screen.orientation.lock('portrait').catch(function(){}); } }catch(e){}
showTab('runde');
sbInit();
AG_render();
function adjustFooterPadding(){
  var nav=document.getElementById('bottom-nav'); if(!nav) return;
  var h=nav.getBoundingClientRect().height;
  /* Nur in der installierten PWA (Standalone) soll der Inhalt - wie oben unter der Statusleiste -
     bis an die untere Displaykante hinter die durchscheinende Nav scrollen: dort minimaler
     Reserve-Abstand. Im Browser bleibt der volle Abstand (Nav-Hoehe), damit sich nichts aendert. */
  var pad=Math.max(0,Math.ceil(h)-9);
  RT_TABS.map(function(t){return 'tab-'+t.id;}).forEach(function(id){
    var el=document.getElementById(id);
    if(el) el.style.paddingBottom=pad+'px';
  });
}
adjustFooterPadding();
window.addEventListener('resize',adjustFooterPadding);
window.addEventListener('load',adjustFooterPadding);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(adjustFooterPadding);
setTimeout(adjustFooterPadding,300);

/* Service Worker (M0.5): App-Shell offline, HTML network-first. */
if('serviceWorker' in navigator){
 var _fpHadCtrl=!!navigator.serviceWorker.controller, _fpReloaded=false;
 navigator.serviceWorker.addEventListener('controllerchange',function(){ if(_fpReloaded)return; _fpReloaded=true; if(_fpHadCtrl){ try{ location.reload(); }catch(e){} } });
 window.addEventListener('load',function(){ navigator.serviceWorker.register('/sw.js').then(function(reg){ try{ reg.update(); }catch(e){} setInterval(function(){ try{ reg.update(); }catch(e){} }, 60000); }).catch(function(){}); });
}
/* Sicherheitsnetz: aktive Runde vor dem Verlassen/Ausblenden sichern (iOS killt Tabs oft ohne
   beforeunload - pagehide/visibilitychange sind zuverlaessiger). Jeder Klick speichert bereits,
   das hier faengt zusaetzlich In-Memory-Zwischenstaende (z.B. laufendes Marker-Ziehen) ab. */
function RT_flushActive(){ try{ if(RT_round && !RT_round.done) rtSet(RT_ACT,RT_round); }catch(e){} }
/* Bildschirm waehrend einer laufenden Runde wachhalten: verhindert Auto-Sperre und damit einen
   Grossteil des Tab-Entladens durch iOS (Nutzer 'fliegt raus'). Feature-detected (Safari 16.4+/
   PWA); wo nicht vorhanden, passiert nichts. Muss nach Sichtbarkeitswechsel neu angefordert
   werden, da das System den Lock beim Ausblenden freigibt. */
var RT_wakeLockObj=null;
function RT_wakeReq(){
 try{
  if(!('wakeLock' in navigator)) return;
  if(document.visibilityState!=='visible') return;
  if(!(RT_state.screen==='play' && RT_round && !RT_round.done)) return;
  if(RT_wakeLockObj) return;
  navigator.wakeLock.request('screen').then(function(w){ RT_wakeLockObj=w; try{ w.addEventListener('release',function(){ RT_wakeLockObj=null; }); }catch(e){} }).catch(function(){ RT_wakeLockObj=null; });
 }catch(e){ RT_wakeLockObj=null; }
}
function RT_wakeRelease(){ try{ if(RT_wakeLockObj){ RT_wakeLockObj.release(); RT_wakeLockObj=null; } }catch(e){} }
window.addEventListener('pagehide',RT_flushActive);
document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden') RT_flushActive(); });
/* Rueckkehr in den Vordergrund (Firefox/iOS verwirft Hintergrund-Tabs aggressiv und laesst
   das Auth-Token ablaufen -> Nutzer 'fliegt raus'). Session hier neu abrufen; getSession()
   erneuert ein abgelaufenes Token, statt still abzumelden. onAuthStateChange rendert danach. */
document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible' && sb){ try{ sb.auth.getSession().then(function(r){ try{ var u=r&&r.data&&r.data.session&&r.data.session.user; if(u) sbUser=u; }catch(e){} }); }catch(e){} } });
window.addEventListener('focus',function(){ if(sb){ try{ sb.auth.getSession(); }catch(e){} } try{ RT_wakeReq(); }catch(e){} });
document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible'){ try{ RT_wakeReq(); }catch(e){} } });

/* ============================================================
   Premium / Paywall (Stripe) — Client-Entitlement + Gating
   Backend: /api/entitlement, /api/checkout, /api/portal, /api/redeem.
   Die Schwunganalyse laeuft on-device (kostet nichts) -> Gratis-Limit rein
   clientseitig (1/Monat). Die Auto-Recherche kostet echtes Geld -> zusaetzlich
   hart serverseitig in research.js/index.js abgesichert. Basis-GPS/Runde/
   Handicap/Golfwissen bleiben gratis.
   ============================================================ */
var RT_ENT=null; /* {premium,plan,status,current_period_end,free:{swing_left,research_left}} */
var RT_SWING_FREE_KEY='fp_swing_free_v1';
function RT_isPremium(){ return !!(RT_ENT&&RT_ENT.premium); }
async function RT_authToken(){ try{ if(!sb)return null; var s=await sb.auth.getSession(); return (s&&s.data&&s.data.session&&s.data.session.access_token)||null; }catch(e){ return null; } }
async function RT_loadEntitlement(){
 if(!sbReady()||!sbUser){ RT_ENT=null; return; }
 try{
  var t=await RT_authToken(); if(!t){ RT_ENT=null; return; }
  var r=await fetch('/api/entitlement',{headers:{'Authorization':'Bearer '+t}});
  var d=await r.json(); RT_ENT=d||null;
 }catch(e){ RT_ENT=null; }
 try{ RT_render(); }catch(e){}
}
function RT_swingMonth(){ var d=new Date(); return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2); }
function RT_swingFreeUsed(){ var o=rtGet(RT_SWING_FREE_KEY)||{}; return (o.period===RT_swingMonth())?(o.count||0):0; }
function RT_swingFreeInc(){ rtSet(RT_SWING_FREE_KEY,{period:RT_swingMonth(),count:RT_swingFreeUsed()+1}); }
function RT_swingFreeLeft(){ return Math.max(0,1-RT_swingFreeUsed()); }
function RT_researchLeft(){ if(RT_ENT&&RT_ENT.free&&typeof RT_ENT.free.research_left==='number')return RT_ENT.free.research_left; return 1; }
function RT_fmtDate(iso){ if(!iso)return ''; try{ var d=new Date(iso); return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+d.getFullYear(); }catch(e){ return ''; } }

var RT_PW_INFO={
 swing:{t:'KI-Schwunganalyse',d:'Analysiere deinen Schwung so oft du willst – mit Verlauf, Schlüsselbildern und Coaching. Gratis ist 1 Analyse pro Monat enthalten.'},
 research:{t:'Automatische Platzrecherche',d:'Par, Stroke-Index, CR/Slope und Adresse jedes Platzes automatisch recherchieren lassen. Gratis ist 1 Platz enthalten.'},
 trace:{t:'Shot-Tracer',d:'Zeichne den Ballflug aus deinem Video nach – mit Auto-Shape, Schlägerwahl und echter GPS-Schlaglänge.'},
 map:{t:'Erweiterte Bahnkarten',d:'Fahnenradar, Wind, Wetterradar, Entfernung & KI und Geländerelief direkt auf der Satelliten-Bahnkarte. Die einfache Entfernung zur Grünmitte bleibt gratis.'},
 exam:{t:'Platzreife-Prüfung',d:'Die vollständige Prüfungssimulation mit Zeit und Auswertung. Golfwissen, Lexikon und die Lernkapitel bleiben gratis.'},
 premium:{t:'FairwayPilot Premium',d:'Schalte alle Premium-Funktionen frei: unbegrenzte KI-Analyse & Recherche, Shot-Tracer, erweiterte Karten und die Platzreife-Prüfung.'}
};
function RT_requirePremium(feature){ if(RT_isPremium())return true; RT_showPaywall(feature); return false; }
function RT_pwClose(){ var e=document.getElementById('rt-paywall'); if(e&&e.parentNode)e.parentNode.removeChild(e); }
function RT_showPaywall(feature){
 RT_pwClose();
 var info=RT_PW_INFO[feature]||RT_PW_INFO.premium;
 var ov=document.createElement('div'); ov.id='rt-paywall';
 ov.style.cssText='position:fixed;inset:0;z-index:100000;background:rgba(8,18,12,.55);display:flex;align-items:flex-end;justify-content:center;';
 ov.addEventListener('click',function(ev){ if(ev.target===ov) RT_pwClose(); });
 var anon=(!sbReady()||!sbUser);
 var card=document.createElement('div');
 card.style.cssText='background:#fff;width:100%;max-width:480px;border-radius:20px 20px 0 0;padding:18px 18px calc(env(safe-area-inset-bottom,0px) + 18px);box-shadow:0 -6px 24px rgba(0,0,0,.3);';
 var h=''
  +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
   +'<img src="/icon-192.png" alt="" style="width:34px;height:34px;border-radius:9px;">'
   +'<div style="flex:1;font-weight:800;font-size:16px;color:#12261b;">FairwayPilot Premium</div>'
   +'<button id="rt-pw-close" aria-label="Schließen" style="border:none;background:#eef1ea;width:30px;height:30px;border-radius:50%;font-size:15px;cursor:pointer;color:#4a5a4e;">✕</button>'
  +'</div>'
  +'<div style="font-weight:800;font-size:15px;color:#1F8A4D;margin-bottom:4px;">'+info.t+'</div>'
  +'<div style="font-size:13.5px;line-height:1.5;color:#3a4a3e;margin-bottom:14px;">'+info.d+'</div>';
 if(anon){
  h+='<div style="font-size:13px;color:#3a4a3e;margin-bottom:12px;">Bitte melde dich zuerst im Konto an, um Premium zu testen oder einen Club-Code einzulösen.</div>'
   +'<button id="rt-pw-login" class="rt-btn" style="width:100%;">Zum Konto</button>';
 }else{
  h+='<div style="background:#f3f8f2;border-radius:12px;padding:11px 13px;font-size:12.5px;color:#2c3b30;margin-bottom:14px;">7 Tage kostenlos testen, danach <b>7,99&thinsp;€/Monat</b> oder <b>54,99&thinsp;€/Jahr</b> (−43&thinsp;%). Jederzeit kündbar.</div>'
   +'<label style="display:flex;gap:8px;align-items:flex-start;font-size:11px;color:#3a4a3e;margin-bottom:12px;line-height:1.45;cursor:pointer;"><input type="checkbox" id="rt-pw-consent" style="margin-top:1px;flex:none;width:16px;height:16px;accent-color:#1F8A4D;"><span>Ich stimme ausdrücklich zu, dass mit der Bereitstellung der Premium-Inhalte vor Ablauf der 14-tägigen Widerrufsfrist begonnen wird, und bestätige, dass ich dadurch mein Widerrufsrecht verliere (§&#8201;356 Abs.&#8201;5 BGB). Es gelten <a href="/agb" target="_blank" style="color:#1F8A4D;">AGB</a> &amp; <a href="/datenschutz" target="_blank" style="color:#1F8A4D;">Datenschutz</a>.</span></label>'
   +'<button id="rt-pw-year" class="rt-btn" style="width:100%;margin-bottom:8px;">7 Tage gratis testen · dann 54,99&thinsp;€/Jahr</button>'
   +'<button id="rt-pw-month" class="rt-btn2" style="width:100%;margin-bottom:12px;">Monatlich · 7,99&thinsp;€/Monat</button>'
   +'<div id="rt-pw-msg" style="font-size:12.5px;color:#b03a3a;min-height:16px;margin-bottom:6px;"></div>'
   +'<div style="text-align:center;"><button id="rt-pw-code" style="border:none;background:none;color:#1F8A4D;font-weight:700;font-size:13px;cursor:pointer;text-decoration:underline;">Ich habe einen Club-Code</button></div>';
 }
 h+='<div style="font-size:11px;color:#9aa79d;text-align:center;margin-top:10px;">Zahlung sicher über Stripe · keine Kartendaten in der App.</div>';
 card.innerHTML=h; ov.appendChild(card); document.body.appendChild(ov);
 var byId=function(i){ return document.getElementById(i); };
 if(byId('rt-pw-close'))byId('rt-pw-close').addEventListener('click',RT_pwClose);
 if(byId('rt-pw-login'))byId('rt-pw-login').addEventListener('click',function(){ RT_pwClose(); RT_go('user'); });
 if(byId('rt-pw-year'))byId('rt-pw-year').addEventListener('click',function(){ RT_checkout('yearly'); });
 if(byId('rt-pw-month'))byId('rt-pw-month').addEventListener('click',function(){ RT_checkout('monthly'); });
 if(byId('rt-pw-code'))byId('rt-pw-code').addEventListener('click',function(){ RT_pwClose(); RT_go('user'); setTimeout(function(){ var i=document.getElementById('rt-redeem-code'); if(i){ try{ i.scrollIntoView({behavior:'smooth',block:'center'}); i.focus(); }catch(e){} } },250); });
}
async function RT_checkout(plan){
 var msg=document.getElementById('rt-pw-msg');
 if(!sbReady()||!sbUser){ RT_pwClose(); RT_go('user'); return; }
 var _cb=document.getElementById('rt-pw-consent');
 if(_cb && !_cb.checked){ if(msg)msg.textContent='Bitte bestätige die Zustimmung zum sofortigen Leistungsbeginn, um fortzufahren.'; return; }
 if(msg)msg.textContent='Weiterleitung zu Stripe …';
 try{
  var t=await RT_authToken(); if(!t)throw new Error('Keine aktive Sitzung.');
  var r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+t},body:JSON.stringify({plan:plan, waiver:true})});
  var d=await r.json(); if(!r.ok||!d.url)throw new Error(d.error||('Fehler ('+r.status+')'));
  window.location.href=d.url;
 }catch(e){ if(msg)msg.textContent='Checkout fehlgeschlagen: '+(e.message||e); }
}
async function RT_portal(){
 RT_state.aboMsg=''; RT_state.aboBusy=true; RT_render();
 try{
  var t=await RT_authToken(); if(!t)throw new Error('Keine aktive Sitzung.');
  var r=await fetch('/api/portal',{method:'POST',headers:{'Authorization':'Bearer '+t}});
  var d=await r.json(); if(!r.ok||!d.url)throw new Error(d.error||('Fehler ('+r.status+')'));
  window.location.href=d.url;
 }catch(e){ RT_state.aboBusy=false; RT_state.aboMsg='Abo-Verwaltung fehlgeschlagen: '+(e.message||e); RT_render(); }
}
async function RT_redeemCode(){
 var inp=document.getElementById('rt-redeem-code'); var code=inp?String(inp.value||'').trim():'';
 if(!code){ RT_state.aboMsg='Bitte Code eingeben.'; RT_render(); return; }
 RT_state.redeemBusy=true; RT_state.aboMsg=''; RT_render();
 try{
  var t=await RT_authToken(); if(!t)throw new Error('Bitte zuerst anmelden.');
  var r=await fetch('/api/redeem',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+t},body:JSON.stringify({code:code})});
  var d=await r.json(); if(!r.ok||!d.ok)throw new Error(d.error||('Fehler ('+r.status+')'));
  RT_state.aboMsg='Code eingelöst – Premium ist aktiv. Viel Spaß!';
  await RT_loadEntitlement();
 }catch(e){ RT_state.aboMsg='Einlösen fehlgeschlagen: '+(e.message||e); }
 RT_state.redeemBusy=false; RT_render();
}
/* Premium-Karte im Konto-Screen (RT_rUser) */
function RT_premiumCard(){
 var h='';
 if(RT_isPremium()){
  var isClub=(RT_ENT&&RT_ENT.plan==='club');
  var until=RT_ENT&&RT_ENT.current_period_end?RT_fmtDate(RT_ENT.current_period_end):'';
  var planLbl=isClub?'über Club-Code freigeschaltet':(RT_ENT&&RT_ENT.plan==='monthly'?'Monats-Abo':(RT_ENT&&RT_ENT.plan==='yearly'?'Jahres-Abo':'aktiv'));
  h+='<div class="rtc" style="border-top-color:#1F8A4D;"><div class="rt-ct" style="color:#1F8A4D;">FairwayPilot Premium ✓</div>'
   +'<div class="rt-cs">'+planLbl+(until?(' · gültig bis '+until):'')+'. Alle Premium-Funktionen sind freigeschaltet.</div>';
  if(RT_ENT&&(RT_ENT.status==='trialing'))h+='<div class="rt-cs" style="color:#1F8A4D;">Testphase läuft'+(until?(' bis '+until):'')+'.</div>';
  if(!isClub)h+='<button class="rt-btn2" '+(RT_state.aboBusy?'disabled':'')+' onclick="RT_portal()">'+(RT_state.aboBusy?'…':'Abo verwalten (kündigen / Zahlungsmittel)')+'</button>';
  if(RT_state.aboMsg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(RT_state.aboMsg)+'</div>';
  h+='</div>';
 }else{
  h+='<div class="rtc" style="border-top-color:#1F8A4D;"><div class="rt-ct" style="color:#1F8A4D;">FairwayPilot Premium</div>'
   +'<div class="rt-cs">Unbegrenzte KI-Schwunganalyse & Platzrecherche, Shot-Tracer, erweiterte Bahnkarten (Fahnenradar/Wind/Relief) und die Platzreife-Prüfung.</div>'
   +'<div style="font-size:12.5px;color:#2c3b30;margin-bottom:8px;">Diesen Monat gratis übrig: <b>'+RT_swingFreeLeft()+'</b> KI-Analyse · <b>'+RT_researchLeft()+'</b> Platzrecherche.</div>'
   +'<button class="rt-btn" style="width:100%;margin-bottom:10px;" onclick="RT_showPaywall(\'premium\')">7 Tage kostenlos testen</button>'
   +'<div style="font-size:12.5px;font-weight:700;color:#2c3b30;margin-bottom:4px;">Club-Code einlösen</div>'
   +'<div class="rt-row"><input class="rt-inp" id="rt-redeem-code" placeholder="z. B. GEORGHAUSEN2026" style="flex:1;text-transform:uppercase;">'
   +'<button class="rt-btn2" style="flex:none;width:auto;" '+(RT_state.redeemBusy?'disabled':'')+' onclick="RT_redeemCode()">'+(RT_state.redeemBusy?'…':'Einlösen')+'</button></div>';
  if(RT_state.aboMsg)h+='<div class="rt-warn" style="margin-top:10px;margin-bottom:0;">'+rtEsc(RT_state.aboMsg)+'</div>';
  h+='</div>';
 }
 return h;
}
/* Nach Rueckkehr aus Stripe-Checkout (/app?abo=ok) Entitlement nachladen (Webhook kann kurz brauchen). */
try{ if(typeof location!=='undefined' && (location.search||'').indexOf('abo=ok')>=0){ setTimeout(function(){ try{ RT_loadEntitlement(); }catch(e){} }, 2500); } }catch(e){}
/* Nach Rueckkehr aus dem Stripe-Kundenportal (bfcache) Lade-Flags zuruecksetzen, damit der
   "Abo verwalten"-Button nicht als "…" haengen bleibt; bei echter Rueckkehr Entitlement neu laden. */
window.addEventListener('pageshow', function(e){ try{ RT_state.aboBusy=false; RT_state.redeemBusy=false; RT_render(); if(e&&e.persisted) RT_loadEntitlement(); }catch(_){} });



/* ================= Onboarding (Erststart-Flow + Erste-Schritte-Checkliste + Trial-Nudge) ================= */
var RT_onbStep=0, RT_onbData={name:'',hi:''};
function RT_onbHasData(){
 try{ if((rtGet(RT_KEY)||[]).length>0) return true; }catch(e){}
 var hs=RT_ownHandicapStored(); if(hs!==''&&hs!==null&&hs!==undefined) return true;
 try{ if(sbUser&&sbUser.user_metadata&&sbUser.user_metadata.display_name) return true; }catch(e){}
 return false;
}
function RT_onbCloseEl(){ var e=document.getElementById('rt-onb'); if(e&&e.parentNode) e.parentNode.removeChild(e); }
function RT_onbMaybeShow(){
 try{
  if(!sbUser) return; /* Onboarding erst nach der Anmeldung */
  if(rtGet(RT_ONBOARD_KEY)) return;
  if(RT_round&&!RT_round.done) return;
  if(RT_state&&RT_state.screen&&RT_state.screen!=='home') return;
  if(document.getElementById('rt-onb')) return;
  if(RT_onbHasData()){ rtSet(RT_ONBOARD_KEY,{done:true,auto:true}); return; }
  RT_onbStep=0; RT_onbData={name:'',hi:''};
  RT_onbShow();
 }catch(e){}
}
function RT_startOnboarding(){ try{ RT_onbStep=0; RT_onbData={name:'',hi:''}; RT_onbShow(); }catch(e){} }
function RT_onbFinish(startRound){
 try{ rtSet(RT_ONBOARD_KEY,{done:true}); }catch(e){}
 RT_onbCloseEl();
 try{ RT_render(); }catch(e){}
 if(startRound){ try{ RT_newRound(); }catch(e){} }
}
function RT_onbSaveName(v){
 v=(v||'').trim(); RT_onbData.name=v;
 if(v){ try{ rtSet(RT_LOCALNAME_KEY,v); }catch(e){} if(sb&&sbUser){ try{ sb.auth.updateUser({data:{display_name:v}}).then(function(r){ if(r&&r.data&&r.data.user) sbUser=r.data.user; }); }catch(e){} } }
}
function RT_onbSaveHi(v){
 v=(''+(v||'')).replace(',','.').trim(); RT_onbData.hi=v;
 var num=parseFloat(v);
 if(v!==''&&!isNaN(num)){ try{ rtSet(RT_OWNHI_KEY,num); }catch(e){} if(sb&&sbUser){ try{ sb.auth.updateUser({data:{handicap:num}}).then(function(r){ if(r&&r.data&&r.data.user) sbUser=r.data.user; }); }catch(e){} } }
}
function RT_onbShow(){
 RT_onbCloseEl();
 var ov=document.createElement('div'); ov.id='rt-onb';
 ov.style.cssText='position:fixed;inset:0;z-index:100001;background:rgba(8,18,12,.55);display:flex;align-items:flex-end;justify-content:center;';
 var card=document.createElement('div'); card.id='rt-onb-card';
 card.style.cssText='background:#fff;width:100%;max-width:480px;border-radius:20px 20px 0 0;padding:20px 18px calc(env(safe-area-inset-bottom,0px) + 18px);box-shadow:0 -6px 24px rgba(0,0,0,.3);font-family:Inter,-apple-system,sans-serif;max-height:88vh;overflow:auto;';
 ov.appendChild(card); document.body.appendChild(ov);
 RT_onbRender();
}
function RT_onbRender(){
 var card=document.getElementById('rt-onb-card'); if(!card) return;
 var total=4, step=RT_onbStep, i;
 var dots=''; for(i=0;i<total;i++){ dots+='<span style="width:7px;height:7px;border-radius:50%;background:'+(i===step?'#1F8A4D':'#D6E2CF')+';display:inline-block;margin:0 3px;"></span>'; }
 var head='<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><img src="/icon-192.png" alt="" style="width:34px;height:34px;border-radius:9px;"><div style="flex:1;font-weight:800;font-size:16px;color:#12261b;">Willkommen bei FairwayPilot</div></div>';
 var body='', foot='';
 if(step===0){
  body='<div style="font-size:15px;font-weight:800;color:#143522;margin-bottom:6px;">Dein digitaler Caddie fürs Handicap.</div>'
   +'<div style="font-size:13.5px;line-height:1.6;color:#3a4a3e;">In 30 Sekunden startklar. FairwayPilot erfasst deine Runden, führt dein Handicap automatisch (WHS) und bietet Bahnkarten, GPS-Distanzen und KI-Schwunganalyse.</div>';
  foot='<button id="rt-onb-next" class="rt-btn" style="width:100%;margin-top:16px;margin-bottom:8px;">Los geht’s</button>'
   +'<button id="rt-onb-skip" class="rt-btn3" style="width:100%;color:#8A9C8E;">Überspringen</button>';
 } else if(step===1){
  var pn=RT_onbData.name||''; if(!pn){ var dn=RT_myDisplayName(); if(dn&&dn!=='Ich') pn=dn; }
  body='<div style="font-size:15px;font-weight:800;color:#143522;margin-bottom:6px;">Wie heißt du?</div>'
   +'<div style="font-size:13px;color:#6b7d70;margin-bottom:10px;">Dein Name erscheint als Spieler auf der Scorecard.</div>'
   +'<input id="rt-onb-name" class="rt-inp" placeholder="Vorname" value="'+rtEsc(pn)+'" style="width:100%;box-sizing:border-box;">';
  foot='<button id="rt-onb-next" class="rt-btn" style="width:100%;margin-top:16px;margin-bottom:8px;">Weiter</button>'
   +'<button id="rt-onb-skip" class="rt-btn3" style="width:100%;color:#8A9C8E;">Überspringen</button>';
 } else if(step===2){
  var ph=RT_onbData.hi; if(ph===''){ var hs=RT_ownHandicapStored(); if(hs!==''&&hs!==null&&hs!==undefined) ph=''+hs; }
  body='<div style="font-size:15px;font-weight:800;color:#143522;margin-bottom:6px;">Dein Handicap-Index</div>'
   +'<div style="font-size:13px;color:#6b7d70;margin-bottom:10px;">Für die Spielvorgabe. Noch keins? Trag 54 ein – das passt sich automatisch an, sobald du Runden spielst.</div>'
   +'<input id="rt-onb-hi" class="rt-inp" type="text" inputmode="decimal" placeholder="z. B. 54" value="'+rtEsc(ph===undefined?'':ph)+'" style="width:100%;box-sizing:border-box;">';
  foot='<button id="rt-onb-next" class="rt-btn" style="width:100%;margin-top:16px;margin-bottom:8px;">Weiter</button>'
   +'<button id="rt-onb-skip" class="rt-btn3" style="width:100%;color:#8A9C8E;">Überspringen</button>';
 } else {
  body='<div style="font-size:15px;font-weight:800;color:#143522;margin-bottom:6px;">Alles bereit – viel Erfolg!</div>'
   +'<div style="font-size:13.5px;line-height:1.6;color:#3a4a3e;margin-bottom:12px;">Leg direkt mit deiner ersten Runde los. Auf der Startseite führt dich eine kurze Checkliste durch die nächsten Schritte.</div>'
   +'<div style="background:#f3f8f2;border-radius:12px;padding:11px 13px;font-size:12.5px;color:#2c3b30;">Premium (KI-Analyse, Shot-Tracer, erweiterte Karten) kannst du <b>7 Tage kostenlos testen</b> – jederzeit im Konto.</div>';
  foot='<button id="rt-onb-start" class="rt-btn" style="width:100%;margin-top:16px;margin-bottom:8px;">Erste Runde starten</button>'
   +'<button id="rt-onb-done" class="rt-btn2" style="width:100%;">Später – zur Startseite</button>';
 }
 card.innerHTML=head+body+'<div style="text-align:center;margin:16px 0 2px;">'+dots+'</div>'+foot;
 var byId=function(id){return document.getElementById(id);};
 var saveCur=function(){ if(step===1){ var n=byId('rt-onb-name'); if(n) RT_onbSaveName(n.value); } else if(step===2){ var hh=byId('rt-onb-hi'); if(hh) RT_onbSaveHi(hh.value); } };
 if(byId('rt-onb-next')) byId('rt-onb-next').addEventListener('click',function(){ saveCur(); RT_onbStep=Math.min(3,step+1); RT_onbRender(); });
 if(byId('rt-onb-skip')) byId('rt-onb-skip').addEventListener('click',function(){ saveCur(); RT_onbFinish(false); });
 if(byId('rt-onb-start')) byId('rt-onb-start').addEventListener('click',function(){ RT_onbFinish(true); });
 if(byId('rt-onb-done')) byId('rt-onb-done').addEventListener('click',function(){ RT_onbFinish(false); });
}
function RT_onbChecklistDismissed(){ return !!rtGet(RT_CHECKDISMISS_KEY); }
function RT_onbDismissChecklist(){ try{ rtSet(RT_CHECKDISMISS_KEY,1); }catch(e){} RT_render(); }
function RT_onbChecklistHtml(){
 try{
  if(RT_onbChecklistDismissed()) return '';
  var saved=(rtGet(RT_KEY)||[]).filter(function(r){return !r.hidden;});
  var hasRound=saved.some(function(r){return (r.done||r.promoted)&&!r.historical;});
  var hs=RT_ownHandicapStored(); var hasHi=(hs!==''&&hs!==null&&hs!==undefined);
  var hasBag=(typeof RT_bagCount==='function')?(RT_bagCount()>0):false;
  var isPrem=(typeof RT_isPremium==='function')?RT_isPremium():false;
  var steps=[
   {done:hasHi, t:'Handicap eintragen', a:"RT_go('user')"},
   {done:hasRound, t:'Erste Runde spielen', a:'RT_newRound()'},
   {done:hasBag, t:'Schläger ins Bag legen', a:"RT_go('bag')"},
   {done:isPrem, t:'Premium 7 Tage gratis testen', a:"RT_showPaywall('premium')"}
  ];
  var doneCnt=0; steps.forEach(function(x){ if(x.done) doneCnt++; });
  if(doneCnt>=steps.length) return '';
  var rows=steps.map(function(x){
   var box=x.done?'<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#1F8A4D;color:#fff;font-size:13px;flex:none;">✓</span>':'<span style="display:inline-block;width:22px;height:22px;border-radius:50%;border:2px solid #CBD8C4;box-sizing:border-box;flex:none;"></span>';
   var txt='<span style="flex:1;font-size:13.5px;color:'+(x.done?'#8A9C8E':'#143522')+';'+(x.done?'text-decoration:line-through;':'font-weight:600;')+'">'+x.t+'</span>';
   var arrow=x.done?'':'<span style="color:#1F8A4D;font-size:17px;flex:none;">›</span>';
   var attr=x.done?'':(' onclick="'+x.a+'"');
   return '<div'+attr+' style="display:flex;align-items:center;gap:10px;padding:8px 2px;cursor:'+(x.done?'default':'pointer')+';">'+box+txt+arrow+'</div>';
  }).join('');
  return '<div class="rtc" style="border-top-color:#1F8A4D;">'
   +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;"><div class="rt-ct" style="margin:0;color:#1F8A4D;">Erste Schritte</div>'
   +'<button onclick="RT_onbDismissChecklist()" aria-label="Ausblenden" style="border:none;background:#eef1ea;width:26px;height:26px;border-radius:50%;font-size:13px;cursor:pointer;color:#4a5a4e;">✕</button></div>'
   +'<div class="rt-cs" style="margin-bottom:8px;">'+doneCnt+' von '+steps.length+' erledigt</div>'
   +rows
   +'</div>';
 }catch(e){ return ''; }
}
function RT_onbMaybeTrialNudge(){
 try{
  if(rtGet(RT_TRIALNUDGE_KEY)) return;
  if(typeof RT_isPremium==='function' && RT_isPremium()) return;
  var done=(rtGet(RT_KEY)||[]).filter(function(r){return !r.hidden && (r.done||r.promoted) && !r.historical;});
  if(done.length!==1) return;
  rtSet(RT_TRIALNUDGE_KEY,1);
  setTimeout(function(){ try{ if(typeof RT_showPaywall==='function') RT_showPaywall('swing'); }catch(e){} }, 900);
 }catch(e){}
}
try{ if(typeof RT_onbMaybeShow==='function'){ setTimeout(function(){ try{ RT_onbMaybeShow(); }catch(e){} }, 800); } }catch(e){}

/* ===== Gemeinsames Scoring v2 (RSV2) — Client-Helferschicht (Stufe 2a) =====
   Additive Zugriffsschicht auf round_meta/round_scores/round_members/round_presence + RPCs.
   Aendert noch KEIN bestehendes Verhalten; wird in Folge-Stufen (2b ff.) verdrahtet. */
var RSV2 = {
  ch:null, chId:null, hbTimer:null,
  ready:function(){ return !!(typeof sb!=='undefined' && sb && sbUser); },
  /* Gemeinsame Runde anlegen (Owner). players:[{idx,name,scorer_uid?,member_uid?,data?}] */
  create:async function(rid,meta,players){
    if(!RSV2.ready()) return {ok:false,error:'not ready'};
    try{ var r=await sb.rpc('create_shared_round',{_rid:rid,_meta:meta||{},_players:players||[]}); if(r.error) throw r.error; return {ok:true}; }
    catch(e){ return {ok:false,error:(e&&e.message)||String(e)}; }
  },
  /* Runde laden: round_meta + alle round_scores. */
  load:async function(rid){
    if(!RSV2.ready()) return {ok:false};
    try{
      var m=await sb.from('round_meta').select('*').eq('round_id',rid).maybeSingle(); if(m.error) throw m.error;
      var s=await sb.from('round_scores').select('*').eq('round_id',rid).order('player_idx',{ascending:true}); if(s.error) throw s.error;
      return {ok:true, meta:(m.data||null), cards:(s.data||[])};
    }catch(e){ return {ok:false,error:(e&&e.message)||String(e)}; }
  },
  /* Eine Karte schreiben mit rev-Pruefung. Erfolg->{ok:true,rev}. Konflikt->{ok:false,conflict:true}. */
  writeCard:async function(rid,idx,data,expectedRev){
    if(!RSV2.ready()) return {ok:false};
    try{
      var q=sb.from('round_scores').update({data:data, rev:((expectedRev|0)+1), updated_at:new Date().toISOString()}).eq('round_id',rid).eq('player_idx',idx);
      if(typeof expectedRev==='number') q=q.eq('rev',expectedRev);
      var r=await q.select(); if(r.error) throw r.error;
      if(r.data && r.data.length) return {ok:true, rev:((expectedRev|0)+1)};
      return {ok:false, conflict:true};
    }catch(e){ return {ok:false,error:(e&&e.message)||String(e)}; }
  },
  /* Presence-Heartbeat fuer das eigene Konto. */
  heartbeat:async function(rid){
    if(!RSV2.ready()) return;
    try{ await sb.from('round_presence').upsert({round_id:rid, uid:sbUser.id, last_seen:new Date().toISOString()},{onConflict:'round_id,uid'}); }catch(e){}
  },
  /* Karten-Scorer neu zuweisen / uebernehmen. */
  assign:async function(rid,idx,newUid){
    if(!RSV2.ready()) return {ok:false};
    try{ var r=await sb.rpc('assign_scorer',{_rid:rid,_idx:idx,_new:newUid}); if(r.error) throw r.error; return {ok:true}; }
    catch(e){ return {ok:false,error:(e&&e.message)||String(e)}; }
  },
  /* Runde serverseitig beenden. */
  finish:async function(rid){
    if(!RSV2.ready()) return {ok:false};
    try{ var r=await sb.rpc('finish_shared_round',{_rid:rid}); if(r.error) throw r.error; return {ok:true}; }
    catch(e){ return {ok:false,error:(e&&e.message)||String(e)}; }
  },
  /* Realtime: Aenderungen an round_scores/round_meta dieser Runde. cb(kind,payload). */
  subscribe:function(rid,cb){
    try{
      RSV2.unsubscribe();
      var ch=sb.channel('rsv2-'+rid);
      ch.on('postgres_changes',{event:'*',schema:'public',table:'round_scores',filter:'round_id=eq.'+rid},function(p){ try{ cb&&cb('scores',p); }catch(e){} });
      ch.on('postgres_changes',{event:'*',schema:'public',table:'round_meta',filter:'round_id=eq.'+rid},function(p){ try{ cb&&cb('meta',p); }catch(e){} });
      ch.subscribe();
      RSV2.ch=ch; RSV2.chId=rid;
    }catch(e){ RSV2.ch=null; RSV2.chId=null; }
  },
  unsubscribe:function(){ try{ if(RSV2.ch){ sb.removeChannel(RSV2.ch); } }catch(e){} RSV2.ch=null; RSV2.chId=null; },
  startHeartbeat:function(rid){ RSV2.stopHeartbeat(); if(!rid) return; try{ RSV2.heartbeat(rid); }catch(e){} RSV2.hbTimer=setInterval(function(){ try{ RSV2.heartbeat(rid); }catch(e){} },20000); },
  stopHeartbeat:function(){ try{ if(RSV2.hbTimer) clearInterval(RSV2.hbTimer); }catch(e){} RSV2.hbTimer=null; }
};


/* ===== RSV2 Etappe 2b: Flag/Toggle, Scorer-Zuweisung im Setup, v2-Runde anlegen ===== */
function RSV2_ON(){ try{ return rtGet('fp_rsv2_off')?false:true; }catch(e){ return true; } }
function RSV2_toggle(){ try{ rtSet('fp_rsv2_off', !rtGet('fp_rsv2_off')); }catch(e){} try{ RT_render(); }catch(e){} }
function RT_v2Owner(){ return (sbUser&&sbUser.id)||null; }
function RT_v2LinkedUid(name){ try{ var st=(typeof PL_statusFor==='function')?PL_statusFor(name):null; return (st&&st.linked_user_id)||null; }catch(e){ return null; } }
function RT_v2ScorerFor(rd,i){ if(rd&&rd.scorerMap&&rd.scorerMap[i]) return rd.scorerMap[i]; return RT_v2Owner(); }
function RT_v2Meta(rd){ return {courseName:rd.courseName, date:rd.date, time:rd.time||'', lbl:rd.lbl, par:rd.par, si:rd.si, nums:rd.nums, cnt:rd.cnt, parSum:rd.parSum, courseKey:rd.courseKey||null, autoCount:rd.autoCount, scorerMap:rd.scorerMap||{}, v2:true}; }
function RT_v2CardData(p){ return {hi:p.hi,tee:p.tee,cr:p.cr,sl:p.sl,ph:p.ph,sex:p.sex, sc:p.sc,pu:p.pu,fw:p.fw,pe:p.pe,sa:p.sa,cx:p.cx,pins:p.pins}; }
function RT_v2PlayersPayload(rd){
 return rd.players.map(function(p,i){ return {idx:i, name:p.name, scorer_uid:RT_v2ScorerFor(rd,i), member_uid:RT_v2LinkedUid(p.name), data:RT_v2CardData(p)}; });
}
async function RT_v2Create(rd){
 try{
  if(!RSV2.ready()) return;
  rd._cardRev={}; for(var i=0;i<rd.players.length;i++) rd._cardRev[i]=1;
  await RSV2.create(rd.id, RT_v2Meta(rd), RT_v2PlayersPayload(rd));
 }catch(e){}
}
/* Setup-UI: pro Spieler festlegen, welches Konto die Karte fuehrt (nur bei RSV2_ON). */
function RT_suSetScorer(i,uid){ if(RT_su){ if(!RT_su.scorerMap)RT_su.scorerMap={}; RT_su.scorerMap[i]=uid; RT_render(); } }
function RT_suScorerHtml(){
 if(!RSV2_ON() || !RT_su || !RT_su.players || RT_su.players.length<2) return '';
 if(!RT_su.scorerMap) RT_su.scorerMap={};
 var me=RT_v2Owner();
 var accounts=[];
 if(me) accounts.push({uid:me, label:'Ich'+((typeof RT_myDisplayName==='function'&&RT_myDisplayName()!=='Ich')?(' ('+RT_myDisplayName()+')'):'')});
 RT_su.players.forEach(function(p){ var lu=RT_v2LinkedUid(p.name); if(lu&&lu!==me&&!accounts.some(function(a){return a.uid===lu;})) accounts.push({uid:lu, label:p.name}); });
 var h='<div style="margin-top:6px;padding-top:10px;border-top:1px solid #ECF2E6;">'
  +'<span class="rt-lbl">Wer führt welche Karte?</span>'
  +'<div class="rt-cs" style="margin:4px 0 8px;">Je Spieler festlegen, welches Konto die Karte führt – nur der zugewiesene Scorer kann sie schreiben, alle anderen sehen live mit.</div>';
 RT_su.players.forEach(function(p,i){
  var cur=RT_su.scorerMap[i]||me;
  h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><div style="flex:1;font-size:13px;font-weight:600;color:#143522;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+rtEsc(p.name)+'</div>'
   +'<select class="rt-inp" style="flex:none;width:auto;max-width:58%;" onchange="RT_suSetScorer('+i+',this.value)">';
  accounts.forEach(function(a){ h+='<option value="'+rtEsc(a.uid)+'"'+(a.uid===cur?' selected':'')+'>'+rtEsc(a.label)+'</option>'; });
  h+='</select></div>';
 });
 h+='</div>';
 return h;
}


/* ===== RSV2 Etappe 2c/2d: Live lesen/schreiben, Presence, Konflikt-Retry ===== */
function RT_v2Sync(){
 try{
  var rd=RT_round;
  var active=!!(rd && rd.v2 && !rd.done && typeof RSV2!=='undefined' && RSV2.ready() && RT_state.screen==='play');
  if(active){
   if(RSV2.chId!==rd.id){ RSV2.subscribe(rd.id, RT_v2OnRealtime); RSV2.startHeartbeat(rd.id); try{ RT_v2OnRealtime('init'); }catch(e){} }
   if(!RT_v2PollT){ RT_v2PollT=setInterval(function(){ try{ if(RT_round&&RT_round.v2&&!RT_round.done&&RT_state.screen==='play') RT_v2OnRealtime('poll'); }catch(e){} }, 12000); }
  }else{
   if(RSV2.chId){ RSV2.unsubscribe(); RSV2.stopHeartbeat(); }
   if(RT_v2PollT){ clearInterval(RT_v2PollT); RT_v2PollT=null; }
  }
 }catch(e){}
}
/* Fremde Karten (nicht von mir gefuehrt) live uebernehmen; meine Karten nur rev nachziehen. */
async function RT_v2OnRealtime(kind, payload){
 try{
  var rd=RT_round; if(!rd||!rd.v2) return;
  var res=await RSV2.load(rd.id);
  if(!res || !res.ok) return;
  if(RT_round!==rd) return;
  rd._cardRev=rd._cardRev||{};
  if(!rd.scorerMap) rd.scorerMap={};
  /* Zustand VOR dem Server-Abgleich merken, damit ein stiller 12s-Poll die Ansicht nur dann
     neu rendert, wenn sich wirklich etwas geaendert hat (sonst "Seite laedt staendig neu"). */
  var oldMapJson=JSON.stringify(rd.scorerMap||{});
  var oldPresJson=JSON.stringify(rd._presence||{});
  if(res.meta && res.meta.data && res.meta.data.scorerMap) rd.scorerMap=res.meta.data.scorerMap;
  var changed=false;
  (res.cards||[]).forEach(function(c){
   var i=c.player_idx; if(i<0||i>=rd.players.length) return;
   if(!rd.scorerMap) rd.scorerMap={};
   rd.scorerMap[i]=c.scorer_uid;
   var mine=!!(sbUser && c.scorer_uid===sbUser.id);
   if(!mine){
    var d=c.data||{}, p=rd.players[i];
    var before=JSON.stringify([p.sc,p.pu,p.fw,p.pe,p.sa,p.cx,p.pins,p.ph]);
    ['sc','pu','fw','pe','sa','cx','pins'].forEach(function(k){ if(d[k]!==undefined && d[k]!==null) p[k]=d[k]; });
    if(d.hi!==undefined) p.hi=d.hi; if(d.ph!==undefined) p.ph=d.ph; if(d.tee!==undefined) p.tee=d.tee;
    rd._cardRev[i]=c.rev;
    if(JSON.stringify([p.sc,p.pu,p.fw,p.pe,p.sa,p.cx,p.pins,p.ph])!==before) changed=true;
   }else{
    if(typeof c.rev==='number' && (!rd._cardRev[i] || c.rev>rd._cardRev[i])) rd._cardRev[i]=c.rev;
   }
  });
  if(res.meta && res.meta.done && !rd.done){ rd.done=true; changed=true; }
  try{ var prr=await RT_v2LoadPresenceRows(rd.id); rd._presence={}; (prr||[]).forEach(function(x){ rd._presence[x.uid]=Date.parse(x.last_seen)||0; }); }catch(e){}
  if(JSON.stringify(rd.scorerMap||{})!==oldMapJson) changed=true;
  if(JSON.stringify(rd._presence||{})!==oldPresJson) changed=true;
  try{ rtSet(RT_ACT,rd); RT_syncActiveToSavedLocalOnly(rd); }catch(e){}
  /* Nur neu zeichnen, wenn sich etwas geaendert hat ODER es ein direktes Ereignis war
     (init/after-assign) - der reine 12s-Poll rendert sonst nicht mehr. */
  var force=(kind==='init'||kind==='after-assign'||kind==='scores'||kind==='meta');
  if(changed||force){ try{ RT_render(); }catch(e){} }
 }catch(e){}
}
/* Lokale Persistenz OHNE erneuten v2-Push (verhindert Schreib-Schleife beim Empfang). */
function RT_syncActiveToSavedLocalOnly(rd){
 try{ var saved=rtGet(RT_KEY)||[]; var idx=-1; for(var i=0;i<saved.length;i++){ if(saved[i].id===rd.id){ idx=i; break; } } if(idx>=0) saved[idx]=rd; else saved.push(rd); rtSet(RT_KEY,saved); }catch(e){}
}
/* Meine Karten schreiben (rev-geprueft, ein Konflikt-Retry). */
async function RT_v2PushMine(rd){
 try{
  if(!rd||!rd.v2||typeof RSV2==='undefined'||!RSV2.ready()) return;
  rd._cardRev=rd._cardRev||{};
  for(var i=0;i<rd.players.length;i++){
   if(RT_v2ScorerFor(rd,i)!==sbUser.id) continue;
   var res=await RSV2.writeCard(rd.id, i, RT_v2CardData(rd.players[i]), rd._cardRev[i]||1);
   if(res.ok){ rd._cardRev[i]=res.rev; continue; }
   if(res.conflict){
    var lr=await RSV2.load(rd.id); var srvCard=null;
    if(lr.ok){ (lr.cards||[]).forEach(function(c){ if(c.player_idx===i){ srvCard=c; rd._cardRev[i]=c.rev; if(rd.scorerMap) rd.scorerMap[i]=c.scorer_uid; } }); }
    if(RT_v2ScorerFor(rd,i)===sbUser.id){ var r2=await RSV2.writeCard(rd.id,i,RT_v2CardData(rd.players[i]),rd._cardRev[i]||1); if(r2.ok) rd._cardRev[i]=r2.rev; }
    else if(srvCard){
     /* Der Server hat die Aenderung abgelehnt (RLS: diese Karte fuehrt ein anderes Konto).
        Lokale Eingabe zuruecknehmen, damit sie nicht kurz erscheint und wieder verschwindet,
        und dem Nutzer klar sagen, warum. */
     var d2=srvCard.data||{}, pp=rd.players[i];
     ['sc','pu','fw','pe','sa','cx','pins'].forEach(function(k){ if(d2[k]!==undefined && d2[k]!==null) pp[k]=d2[k]; });
     if(d2.ph!==undefined) pp.ph=d2.ph; if(d2.hi!==undefined) pp.hi=d2.hi; if(d2.tee!==undefined) pp.tee=d2.tee;
     try{ RT_syncActiveToSavedLocalOnly(rd); }catch(e){}
     var _pn=(rd.players[i]&&rd.players[i].name)||'Mitspieler'; var _sn=RT_v2ScorerName(rd,i);
     try{ RT_toast('Eintrag bei '+_pn+' nicht gespeichert – diese Karte führt '+_sn+'. Über „Karte übernehmen" kannst du sie übernehmen.'); }catch(e){}
     try{ RT_render(); }catch(e){}
    }
   }
  }
 }catch(e){}
}


/* ===== RSV2 Etappe 2e: Presence-Anzeige, Uebernahme, v2-Banner ===== */
var RT_v2PollT=null;
async function RT_v2LoadPresenceRows(rid){
 try{ if(typeof sb==='undefined'||!sb) return []; var r=await sb.from('round_presence').select('uid,last_seen').eq('round_id',rid); return (r&&r.data)||[]; }catch(e){ return []; }
}
function RT_v2ScorerName(rd,i){
 var uid=RT_v2ScorerFor(rd,i);
 if(sbUser&&uid===sbUser.id) return 'Du';
 if(rd&&rd.players){ for(var j=0;j<rd.players.length;j++){ if(RT_v2LinkedUid(rd.players[j].name)===uid) return rd.players[j].name; } }
 return 'Mitspieler';
}
function RT_v2Reachable(rd,uid){ try{ var t=rd&&rd._presence&&rd._presence[uid]; return !!(t && (Date.now()-t)<45000); }catch(e){ return false; } }
function RT_v2TakeCard(i){
 var rd=RT_round; if(!rd||!rd.v2||!sbUser) return;
 RT_pageConfirm('Karte von '+rtEsc(RT_v2ScorerName(rd,i))+' übernehmen? Du führst diese Karte dann selbst.', function(){
  RSV2.assign(rd.id, i, sbUser.id).then(function(res){
   if(res&&res.ok){ if(!rd.scorerMap)rd.scorerMap={}; rd.scorerMap[i]=sbUser.id; try{ RT_v2OnRealtime('after-assign'); }catch(e){} try{ RT_toast('Karte übernommen.'); }catch(e){} }
   else{ try{ RT_toast('Übernahme nicht möglich – der Scorer ist evtl. noch erreichbar.'); }catch(e){} }
  });
 }, 'Übernehmen', '#187040');
}
function RT_scPanelOpen(){ try{ return !!rtGet('fp_scPanelOpen'); }catch(e){ return false; } }
function RT_toggleScPanel(){ try{ rtSet('fp_scPanelOpen', RT_scPanelOpen()?0:1); }catch(e){} try{ RT_render(); }catch(e){} }
function RT_v2BannerHtml(rd){
 if(!rd||!rd.v2) return '';
 var open=RT_scPanelOpen();
 /* Eingeklappt: erklaerender Dreizeiler statt Namen. */
 var sub='Zeigt, wer welche Scorecard führt. Jeder trägt nur die eigene Karte ein – alle sehen live mit.';
 var h='<div class="rtc" style="padding:12px 14px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px;'+(open?'margin-bottom:10px;':'')+'">'+
  '<div style="min-width:0;"><div class="rt-ct" style="margin:0;">Scoring-Karten</div>'+
  '<div class="rt-cs" style="margin:0;">'+sub+'</div></div>'+
  '<button class="rt-btn2" style="margin:0;padding:9px 14px;font-size:12px;white-space:nowrap;flex:none;width:auto;min-width:120px;text-align:center;" onclick="RT_toggleScPanel()">'+(open?'Zuklappen':'Anzeigen')+'</button>'+
  '</div>';
 if(open){
  rd.players.forEach(function(p,i){
   var uid=RT_v2ScorerFor(rd,i);
   var mine=!!(sbUser&&uid===sbUser.id);
   var reach=mine||RT_v2Reachable(rd,uid);
   var dot='<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:'+(reach?'#2EA84F':'#C0392B')+';margin-right:6px;flex:none;"></span>';
   h+='<div style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:#143522;padding:3px 0;">'+dot
    +'<div style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><b>'+rtEsc(p.name)+'</b> · '+(mine?'Du führst':('führt: '+rtEsc(RT_v2ScorerName(rd,i))))+(!mine&&!reach?' (offline)':'')+'</div>'
    +((!mine && !reach)?'<button class="rt-btn2" style="width:auto;flex:none;padding:5px 10px;font-size:11px;margin:0;" onclick="RT_v2TakeCard('+i+')">übernehmen</button>':'')
    +'</div>';
  });
 }
 h+='</div>';
 return h;
}
