/* Kompakter, eigenstaendiger QR-Encoder (Byte-Modus, Versionen 1-10, EC-Level L/M).
   Reicht fuer kurze Einladungs-URLs. Kein Drittanbieter. MIT-inspiriert (Reed-Solomon ueber GF(256)).
   API: QR.matrix(text, ecLevel, forcedMask) -> { n, dark: [[bool]] } */
var QR=(function(){
 // GF(256) Tabellen
 var EXP=new Array(256), LOG=new Array(256);
 (function(){ var x=1; for(var i=0;i<255;i++){ EXP[i]=x; LOG[x]=i; x<<=1; if(x&0x100) x^=0x11d; } EXP[255]=EXP[0]; })();
 function gmul(a,b){ if(a===0||b===0) return 0; return EXP[(LOG[a]+LOG[b])%255]; }
 // Generatorpolynom fuer n EC-Codewoerter
 function genPoly(n){ var g=[1]; for(var i=0;i<n;i++){ var ng=new Array(g.length+1); for(var j=0;j<ng.length;j++) ng[j]=0; for(var j=0;j<g.length;j++){ ng[j]^=gmul(g[j],1); ng[j+1]^=gmul(g[j],EXP[i]); } g=ng; } return g; }
 function rsEC(data,n){ var res=data.slice().concat(new Array(n).fill(0)); var g=genPoly(n);
  for(var i=0;i<data.length;i++){ var c=res[i]; if(c!==0){ for(var j=0;j<g.length;j++) res[i+j]^=gmul(g[j],c); } }
  return res.slice(data.length); }
 // RS-Block-Tabelle: [version][ec] -> Liste von [anzahlBloecke, totalPerBlock, dataPerBlock]
 // ec: 0=L,1=M
 var RS={
  1:{0:[[1,26,19]],1:[[1,26,16]]},
  2:{0:[[1,44,34]],1:[[1,44,28]]},
  3:{0:[[1,70,55]],1:[[1,70,44]]},
  4:{0:[[1,100,80]],1:[[2,50,32]]},
  5:{0:[[1,134,108]],1:[[2,67,43]]},
  6:{0:[[2,86,68]],1:[[4,43,27]]},
  7:{0:[[2,98,78]],1:[[4,49,31]]},
  8:{0:[[2,121,97]],1:[[2,60,38],[2,61,39]]},
  9:{0:[[2,146,116]],1:[[3,58,36],[2,59,37]]},
  10:{0:[[2,86,68],[2,87,69]],1:[[4,69,43],[1,70,44]]}
 };
 function capacityBytes(v,ec){ var blocks=RS[v][ec]; var d=0; blocks.forEach(function(b){ d+=b[0]*b[2]; }); return d; }
 function totalDataCodewords(v,ec){ return capacityBytes(v,ec); }
 // Ausrichtungsmuster-Zentren
 var ALIGN={1:[],2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50]};
 function pickVersion(len,ec){ for(var v=1;v<=10;v++){ // char count indicator: 8 bit fuer v1-9, 16 bit ab v10
   var ccBits=(v<10)?8:16; var overheadBits=4+ccBits+4; // mode + count + terminator (grob)
   var avail=totalDataCodewords(v,ec)*8; if(avail>= (4+ccBits+len*8)) return v; }
  return -1; }
 function bitsToBytes(bits){ var out=[]; for(var i=0;i<bits.length;i+=8){ var b=0; for(var j=0;j<8;j++){ b=(b<<1)|(i+j<bits.length?bits[i+j]:0); } out.push(b); } return out; }
 function encodeData(text,v,ec){
  // UTF-8 Bytes
  var utf=unescape(encodeURIComponent(text)); var bytes=[]; for(var i=0;i<utf.length;i++) bytes.push(utf.charCodeAt(i)&0xff);
  var bits=[]; function push(val,n){ for(var k=n-1;k>=0;k--) bits.push((val>>k)&1); }
  push(0x4,4); // Byte-Modus
  var ccBits=(v<10)?8:16; push(bytes.length,ccBits);
  bytes.forEach(function(b){ push(b,8); });
  var cap=totalDataCodewords(v,ec)*8;
  // Terminator
  for(var t=0;t<4 && bits.length<cap;t++) bits.push(0);
  // auf Byte auffuellen
  while(bits.length%8!==0) bits.push(0);
  var data=bitsToBytes(bits);
  var pad=[0xEC,0x11], pi=0; while(data.length<totalDataCodewords(v,ec)){ data.push(pad[pi%2]); pi++; }
  return data;
 }
 function makeCodewords(text,v,ec){
  var data=encodeData(text,v,ec);
  var blocksDef=RS[v][ec]; var dataBlocks=[], ecBlocks=[], pos=0, ecLen=null;
  blocksDef.forEach(function(bd){ var cnt=bd[0], total=bd[1], dc=bd[2]; ecLen=total-dc; for(var i=0;i<cnt;i++){ var d=data.slice(pos,pos+dc); pos+=dc; dataBlocks.push(d); ecBlocks.push(rsEC(d,ecLen)); } });
  // Interleave data
  var maxD=0; dataBlocks.forEach(function(b){ if(b.length>maxD) maxD=b.length; });
  var res=[]; for(var i=0;i<maxD;i++){ for(var b=0;b<dataBlocks.length;b++){ if(i<dataBlocks[b].length) res.push(dataBlocks[b][i]); } }
  var maxE=0; ecBlocks.forEach(function(b){ if(b.length>maxE) maxE=b.length; });
  for(var i=0;i<maxE;i++){ for(var b=0;b<ecBlocks.length;b++){ if(i<ecBlocks[b].length) res.push(ecBlocks[b][i]); } }
  return res;
 }
 function sizeOf(v){ return v*4+17; }
 function maskFn(m,r,c){ switch(m){ case 0:return (r+c)%2===0; case 1:return r%2===0; case 2:return c%3===0; case 3:return (r+c)%3===0; case 4:return (Math.floor(r/2)+Math.floor(c/3))%2===0; case 5:return (r*c)%2+(r*c)%3===0; case 6:return ((r*c)%2+(r*c)%3)%2===0; case 7:return ((r+c)%2+(r*c)%3)%2===0; } return false; }
 // BCH fuer Format-Info (EC-Level + Maske), 15 bit
 function bchFormat(data){ var d=data<<10; while(bch_digit(d)-bch_digit(0x537)>=0){ d^=(0x537<<(bch_digit(d)-bch_digit(0x537))); } return ((data<<10)|d)^0x5412; }
 function bch_digit(x){ var n=0; while(x!==0){ n++; x>>>=1; } return n; }
 var ECBITS={0:1,1:0}; // format: L=01, M=00 (2-bit)
 function build(text,ec,forcedMask){
  var v=pickVersion(unescape(encodeURIComponent(text)).length, ec);
  if(v<0) throw new Error('URL zu lang fuer QR v<=10');
  var n=sizeOf(v);
  var m=[]; for(var i=0;i<n;i++){ m.push(new Array(n).fill(null)); }
  var reserved=[]; for(var i=0;i<n;i++){ reserved.push(new Array(n).fill(false)); }
  function setF(r,c,val){ m[r][c]=val; reserved[r][c]=true; }
  // Finder + Separatoren
  function finder(r0,c0){ for(var r=-1;r<=7;r++){ for(var c=-1;c<=7;c++){ var rr=r0+r, cc=c0+c; if(rr<0||cc<0||rr>=n||cc>=n) continue; var dark=(r>=0&&r<=6&&(c===0||c===6))||(c>=0&&c<=6&&(r===0||r===6))||(r>=2&&r<=4&&c>=2&&c<=4); setF(rr,cc,dark); } } }
  finder(0,0); finder(0,n-7); finder(n-7,0);
  // Timing
  for(var i=8;i<n-8;i++){ if(!reserved[6][i]) setF(6,i,i%2===0); if(!reserved[i][6]) setF(i,6,i%2===0); }
  // Alignment
  var ac=ALIGN[v];
  for(var a=0;a<ac.length;a++){ for(var b=0;b<ac.length;b++){ var rr=ac[a], cc=ac[b]; if(reserved[rr][cc]) continue; for(var dr=-2;dr<=2;dr++){ for(var dc=-2;dc<=2;dc++){ var dark=Math.max(Math.abs(dr),Math.abs(dc))!==1; setF(rr+dr,cc+dc,dark); } } } }
  // Dark module
  setF(n-8,8,true);
  // Format-Info Bereiche reservieren (werden spaeter gesetzt)
  for(var i=0;i<=8;i++){ if(i!==6){ if(!reserved[8][i]) reserved[8][i]=true; if(!reserved[i][8]) reserved[i][8]=true; } }
  for(var i=0;i<8;i++){ reserved[8][n-1-i]=true; reserved[n-1-i][8]=true; }
  // Daten platzieren
  var cw=makeCodewords(text,v,ec);
  var bits=[]; cw.forEach(function(b){ for(var k=7;k>=0;k--) bits.push((b>>k)&1); });
  function place(mask){
   var idx=0, upward=true;
   for(var col=n-1;col>0;col-=2){ if(col===6) col--; for(var t=0;t<n;t++){ var row=upward?(n-1-t):t; for(var cc=0;cc<2;cc++){ var c=col-cc; if(reserved[row][c]) continue; var dark=(idx<bits.length)?(bits[idx]===1):false; idx++; if(maskFn(mask,row,c)) dark=!dark; m[row][c]=dark; } } upward=!upward; }
  }
  function setFormat(mask){
   var fmt=bchFormat((ECBITS[ec]<<3)|mask);
   for(var i=0;i<15;i++){ var bit=((fmt>>i)&1)===1;
    if(i<6) m[i][8]=bit; else if(i<8) m[i+1][8]=bit; else m[n-15+i][8]=bit;
    if(i<8) m[8][n-1-i]=bit; else if(i<9) m[8][7]=bit; else m[8][14-i]=bit;
   }
   m[n-8][8]=true;
  }
  function penalty(){ var p=0; // Regel 1: Reihen/Spalten
   for(var r=0;r<n;r++){ var run=1; for(var c=1;c<n;c++){ if(m[r][c]===m[r][c-1]) run++; else { if(run>=5) p+=3+(run-5); run=1; } } if(run>=5) p+=3+(run-5); }
   for(var c=0;c<n;c++){ var run=1; for(var r=1;r<n;r++){ if(m[r][c]===m[r-1][c]) run++; else { if(run>=5) p+=3+(run-5); run=1; } } if(run>=5) p+=3+(run-5); }
   // Regel 2: 2x2 Bloecke
   for(var r=0;r<n-1;r++){ for(var c=0;c<n-1;c++){ var v0=m[r][c]; if(v0===m[r][c+1]&&v0===m[r+1][c]&&v0===m[r+1][c+1]) p+=3; } }
   // Regel 3: Muster
   function lineHas(get){ var cnt=0; for(var a=0;a<n;a++){ for(var b=0;b<n-10;b++){ var seq=[]; for(var k=0;k<11;k++) seq.push(get(a,b+k)?1:0); if(match(seq)) cnt++; } } return cnt; }
   function match(s){ var p1=[1,0,1,1,1,0,1,0,0,0,0], p2=[0,0,0,0,1,0,1,1,1,0,1]; var e1=true,e2=true; for(var k=0;k<11;k++){ if(s[k]!==p1[k]) e1=false; if(s[k]!==p2[k]) e2=false; } return e1||e2; }
   p+=40*lineHas(function(a,b){ return m[a][b]; });
   p+=40*lineHas(function(a,b){ return m[b][a]; });
   // Regel 4: dark ratio
   var dark=0; for(var r=0;r<n;r++) for(var c=0;c<n;c++) if(m[r][c]) dark++;
   var ratio=dark/(n*n)*100; var k=Math.floor(Math.abs(ratio-50)/5); p+=k*10;
   return p;
  }
  var bestMask=0;
  if(forcedMask!=null){ bestMask=forcedMask; place(bestMask); setFormat(bestMask); }
  else {
   var best=Infinity;
   for(var mm=0;mm<8;mm++){ // reset non-reserved
    for(var r=0;r<n;r++) for(var c=0;c<n;c++) if(!reserved[r][c]) m[r][c]=null;
    place(mm); setFormat(mm); var pen=penalty(); if(pen<best){ best=pen; bestMask=mm; } }
   for(var r=0;r<n;r++) for(var c=0;c<n;c++) if(!reserved[r][c]) m[r][c]=null;
   place(bestMask); setFormat(bestMask);
  }
  var dark=[]; for(var r=0;r<n;r++){ dark.push([]); for(var c=0;c<n;c++){ dark[r].push(!!m[r][c]); } }
  return { n:n, v:v, mask:bestMask, dark:dark };
 }
 return { matrix: function(text,ecLevel,forcedMask){ var ec=(ecLevel==='L')?0:1; return build(text,ec,forcedMask); } };
})();
if(typeof module!=='undefined') module.exports=QR;
