'use strict';
// ═══════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════
const CX = 370, CY = 245, SVG_W = 750, SVG_H = 510;

let RINGS = {
  lower: { iRx:99,  iRy:66,  oRx:162, oRy:112 },
  upper: { iRx:165, iRy:115, oRx:232, oRy:161 }
};

// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
let CATEGORIES = {
  A:     { name:'South Premium',  color:'#F59E0B', bg:'rgba(245,158,11,.18)'  },
  B:     { name:'General Lower',  color:'#10B981', bg:'rgba(16,185,129,.18)'  },
  C:     { name:'Upper Tier',     color:'#38BDF8', bg:'rgba(56,189,248,.18)'  },
  D:     { name:'Lower Premium',  color:'#34D399', bg:'rgba(52,211,153,.18)'  },
  E:     { name:'Outer Upper',    color:'#A855F7', bg:'rgba(168,85,247,.18)'  },
  Suite: { name:'Suites & Box',   color:'#EAB308', bg:'rgba(234,179,8,.18)'   }
};

let BLOCKS = {
  A:{ s:64,  e:128, ring:'lower', cat:'A', tier:'Field Level',  ss:1, se:120, gate:'8', occ:78,  desc:'South Premium — Best pitch-level views in the entire stadium.' },
  B:{ s:130, e:164, ring:'lower', cat:'D', tier:'Lower',        ss:1, se:100, gate:'9', occ:52,  desc:'Lower South-West — Excellent close-up pitch action.' },
  C:{ s:166, e:211, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:85,  gate:'1', occ:40,  desc:'Lower West — Side-on full-pitch perspective.' },
  D:{ s:218, e:258, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:95,  gate:'2', occ:35,  desc:'Lower North-West — Great angle to watch batting crease.' },
  E:{ s:278, e:318, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:95,  gate:'4', occ:95,  desc:'Lower North-East — Opposite-end premium view.' },
  F:{ s:320, e:352, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:80,  gate:'5', occ:48,  desc:'Lower East-North — Perfect for slip-cordon action.' },
  G:{ s:354, e:25,  ring:'lower', cat:'D', tier:'Lower',        ss:1, se:100, gate:'5', occ:67,  desc:'Lower East — Inline with the crease for boundary replays.' },
  H:{ s:27,  e:62,  ring:'lower', cat:'B', tier:'Lower',        ss:1, se:100, gate:'6', occ:44,  desc:'Lower South-East — Exciting square-boundary angle.' },
  J:{ s:130, e:163, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'9', occ:30,  desc:'Upper South-West — Elevated panoramic oval views.' },
  K:{ s:165, e:196, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'1', occ:25,  desc:'Upper West — Wide panoramic west-side views from height.' },
  L:{ s:198, e:218, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:140, gate:'2', occ:65,  desc:'Upper West-North — Elevated north-western perspective.' },
  M:{ s:220, e:259, ring:'upper', cat:'C', tier:'Upper',        ss:1, se:130, gate:'2', occ:42,  desc:'Upper North-West — Aerial view of pitch and outfield.' },
  N:{ s:261, e:302, ring:'upper', cat:'C', tier:'Upper',        ss:1, se:140, gate:'3', occ:38,  desc:'Upper North — Directly above the batting end.' },
  P:{ s:304, e:338, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:130, gate:'4', occ:92,  desc:'Upper North-East — High altitude north-east perspective.' },
  Q:{ s:340, e:60,  ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'6', occ:58,  desc:'Upper East — Sweeping east-side panoramic view.' },
  R:{ s:62,  e:112, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'7', occ:35,  desc:'Upper South-East — Elevated square-leg perspective.' }
};

let SUITES = [
  { id:'PGL3', name:'Presidential Gallery', short:'PGL 3', level:'Level 3', s:78,  e:148, iRx:235, iRy:162, oRx:250, oRy:174, ss:1, se:80,  gate:'8', occ:85, color:'#EAB308', desc:'Exclusive presidential gallery with VIP hospitality.' },
  { id:'PSB4', name:'Presidential Suites',  short:'PSB 4', level:'Level 4', s:82,  e:144, iRx:253, iRy:176, oRx:268, oRy:188, ss:1, se:50,  gate:'8', occ:70, color:'#D97706', desc:'Private presidential suite boxes with premium service.' },
  { id:'PMS5', name:'Premium Suites Box',   short:'PMS 5', level:'Level 5', s:86,  e:140, iRx:271, iRy:190, oRx:285, oRy:202, ss:1, se:40,  gate:'8', occ:60, color:'#B45309', desc:'Ultra-premium suites with finest amenities.' }
];

let GATES = {
  '1':{ angle:190, name:'Gate 1', loc:'West Entrance',        blocks:['C','K']              },
  '2':{ angle:237, name:'Gate 2', loc:'North-West Entrance',  blocks:['D','L','M']          },
  '3':{ angle:281, name:'Gate 3', loc:'North Entrance',       blocks:['N']                  },
  '4':{ angle:321, name:'Gate 4', loc:'North-East Entrance',  blocks:['E','P']              },
  '5':{ angle:4,   name:'Gate 5', loc:'East Entrance',        blocks:['F','G','Q']          },
  '6':{ angle:44,  name:'Gate 6', loc:'East-South Entrance',  blocks:['H','Q','R']          },
  '7':{ angle:87,  name:'Gate 7', loc:'South-East Entrance',  blocks:['H','R']              },
  '8':{ angle:96,  name:'Gate 8', loc:'South Entrance',       blocks:['A','PGL3','PSB4','PMS5'], south:true },
  '9':{ angle:148, name:'Gate 9', loc:'South-West Entrance',  blocks:['B','J']              }
};

// Toilet locations (angle in SVG degrees, placed at outer rim)
let TOILETS = [
  { id:'T1', label:'Toilet Block T1', angle:100, rx:310, ry:220, desc:'Near Gate 8 · South' },
  { id:'T2', label:'Toilet Block T2', angle:175, rx:310, ry:220, desc:'Near Gate 1 · West' },
  { id:'T3', label:'Toilet Block T3', angle:240, rx:310, ry:220, desc:'Near Gate 2 · North-West' },
  { id:'T4', label:'Toilet Block T4', angle:305, rx:310, ry:220, desc:'Near Gate 4 · North-East' },
  { id:'T5', label:'Toilet Block T5', angle:25,  rx:310, ry:220, desc:'Near Gate 5 · East' },
  { id:'T6', label:'Toilet Block T6', angle:58,  rx:310, ry:220, desc:'Near Gate 6 · East-South' },
];

// Parking zones outside stadium
let PARKING_ZONES = [
  { id:'P1', label:'Parking Zone P1', angle:108, rx:345, ry:248, desc:'South Main · ~200 spots' },
  { id:'P2', label:'Parking Zone P2', angle:162, rx:345, ry:248, desc:'South-West · ~150 spots' },
  { id:'P3', label:'Parking Zone P3', angle:215, rx:345, ry:248, desc:'West · ~180 spots' },
  { id:'P4', label:'Parking Zone P4', angle:266, rx:345, ry:248, desc:'North-West · ~120 spots' },
  { id:'P5', label:'Parking Zone P5', angle:325, rx:345, ry:248, desc:'North-East · ~160 spots' },
  { id:'P6', label:'Parking Zone P6', angle:20,  rx:345, ry:248, desc:'East · ~140 spots' },
  { id:'P7', label:'Parking Zone P7', angle:62,  rx:345, ry:248, desc:'East-South · ~100 spots' },
];

// ═══════════════════════════════════════════════
// VENUE CONFIGS
// ═══════════════════════════════════════════════
const NMS_CONFIG = {
  name: 'Modi Stadium',
  location: 'Ahmedabad',
  capacity: '1,32,000',
  rings: {
    lower: { iRx:99,  iRy:66,  oRx:162, oRy:112 },
    upper: { iRx:165, iRy:115, oRx:232, oRy:161 }
  },
  categories: {
    A:     { name:'South Premium',  color:'#F59E0B', bg:'rgba(245,158,11,.18)'  },
    B:     { name:'General Lower',  color:'#10B981', bg:'rgba(16,185,129,.18)'  },
    C:     { name:'Upper Tier',     color:'#38BDF8', bg:'rgba(56,189,248,.18)'  },
    D:     { name:'Lower Premium',  color:'#34D399', bg:'rgba(52,211,153,.18)'  },
    E:     { name:'Outer Upper',    color:'#A855F7', bg:'rgba(168,85,247,.18)'  },
    Suite: { name:'Suites & Box',   color:'#EAB308', bg:'rgba(234,179,8,.18)'   }
  },
  blocks: {
    A:{ s:64,  e:128, ring:'lower', cat:'A', tier:'Field Level',  ss:1, se:120, gate:'8', occ:78,  desc:'South Premium — Best pitch-level views in the entire stadium.' },
    B:{ s:130, e:164, ring:'lower', cat:'D', tier:'Lower',        ss:1, se:100, gate:'9', occ:52,  desc:'Lower South-West — Excellent close-up pitch action.' },
    C:{ s:166, e:211, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:85,  gate:'1', occ:40,  desc:'Lower West — Side-on full-pitch perspective.' },
    D:{ s:218, e:258, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:95,  gate:'2', occ:35,  desc:'Lower North-West — Great angle to watch batting crease.' },
    E:{ s:278, e:318, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:95,  gate:'4', occ:95,  desc:'Lower North-East — Opposite-end premium view.' },
    F:{ s:320, e:352, ring:'lower', cat:'B', tier:'Lower',        ss:1, se:80,  gate:'5', occ:48,  desc:'Lower East-North — Perfect for slip-cordon action.' },
    G:{ s:354, e:25,  ring:'lower', cat:'D', tier:'Lower',        ss:1, se:100, gate:'5', occ:67,  desc:'Lower East — Inline with the crease for boundary replays.' },
    H:{ s:27,  e:62,  ring:'lower', cat:'B', tier:'Lower',        ss:1, se:100, gate:'6', occ:44,  desc:'Lower South-East — Exciting square-boundary angle.' },
    J:{ s:130, e:163, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'9', occ:30,  desc:'Upper South-West — Elevated panoramic oval views.' },
    K:{ s:165, e:196, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'1', occ:25,  desc:'Upper West — Wide panoramic west-side views from height.' },
    L:{ s:198, e:218, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:140, gate:'2', occ:65,  desc:'Upper West-North — Elevated north-western perspective.' },
    M:{ s:220, e:259, ring:'upper', cat:'C', tier:'Upper',        ss:1, se:130, gate:'2', occ:42,  desc:'Upper North-West — Aerial view of pitch and outfield.' },
    N:{ s:261, e:302, ring:'upper', cat:'C', tier:'Upper',        ss:1, se:140, gate:'3', occ:38,  desc:'Upper North — Directly above the batting end.' },
    P:{ s:304, e:338, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:130, gate:'4', occ:92,  desc:'Upper North-East — High altitude north-east perspective.' },
    Q:{ s:340, e:60,  ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'6', occ:58,  desc:'Upper East — Sweeping east-side panoramic view.' },
    R:{ s:62,  e:112, ring:'upper', cat:'E', tier:'Upper',        ss:1, se:150, gate:'7', occ:35,  desc:'Upper South-East — Elevated square-leg perspective.' }
  },
  suites: [
    { id:'PGL3', name:'Presidential Gallery', short:'PGL 3', level:'Level 3', s:78,  e:148, iRx:235, iRy:162, oRx:250, oRy:174, ss:1, se:80,  gate:'8', occ:85, color:'#EAB308', desc:'Exclusive presidential gallery with VIP hospitality.' },
    { id:'PSB4', name:'Presidential Suites',  short:'PSB 4', level:'Level 4', s:82,  e:144, iRx:253, iRy:176, oRx:268, oRy:188, ss:1, se:50,  gate:'8', occ:70, color:'#D97706', desc:'Private presidential suite boxes with premium service.' },
    { id:'PMS5', name:'Premium Suites Box',   short:'PMS 5', level:'Level 5', s:86,  e:140, iRx:271, iRy:190, oRx:285, oRy:202, ss:1, se:40,  gate:'8', occ:60, color:'#B45309', desc:'Ultra-premium suites with finest amenities.' }
  ],
  gates: {
    '1':{ angle:190, name:'Gate 1', loc:'West Entrance',        blocks:['C','K']              },
    '2':{ angle:237, name:'Gate 2', loc:'North-West Entrance',  blocks:['D','L','M']          },
    '3':{ angle:281, name:'Gate 3', loc:'North Entrance',       blocks:['N']                  },
    '4':{ angle:321, name:'Gate 4', loc:'North-East Entrance',  blocks:['E','P']              },
    '5':{ angle:4,   name:'Gate 5', loc:'East Entrance',        blocks:['F','G','Q']          },
    '6':{ angle:44,  name:'Gate 6', loc:'East-South Entrance',  blocks:['H','Q','R']          },
    '7':{ angle:87,  name:'Gate 7', loc:'South-East Entrance',  blocks:['H','R']              },
    '8':{ angle:96,  name:'Gate 8', loc:'South Entrance',       blocks:['A','PGL3','PSB4','PMS5'], south:true },
    '9':{ angle:148, name:'Gate 9', loc:'South-West Entrance',  blocks:['B','J']              }
  },
  toilets: [
    { id:'T1', label:'Toilet Block T1', angle:100, rx:310, ry:220, desc:'Near Gate 8 · South' },
    { id:'T2', label:'Toilet Block T2', angle:175, rx:310, ry:220, desc:'Near Gate 1 · West' },
    { id:'T3', label:'Toilet Block T3', angle:240, rx:310, ry:220, desc:'Near Gate 2 · North-West' },
    { id:'T4', label:'Toilet Block T4', angle:305, rx:310, ry:220, desc:'Near Gate 4 · North-East' },
    { id:'T5', label:'Toilet Block T5', angle:25,  rx:310, ry:220, desc:'Near Gate 5 · East' },
    { id:'T6', label:'Toilet Block T6', angle:58,  rx:310, ry:220, desc:'Near Gate 6 · East-South' },
  ],
  parking: [
    { id:'P1', label:'Parking Zone P1', angle:108, rx:345, ry:248, desc:'South Main · ~200 spots' },
    { id:'P2', label:'Parking Zone P2', angle:162, rx:345, ry:248, desc:'South-West · ~150 spots' },
    { id:'P3', label:'Parking Zone P3', angle:215, rx:345, ry:248, desc:'West · ~180 spots' },
    { id:'P4', label:'Parking Zone P4', angle:266, rx:345, ry:248, desc:'North-West · ~120 spots' },
    { id:'P5', label:'Parking Zone P5', angle:325, rx:345, ry:248, desc:'North-East · ~160 spots' },
    { id:'P6', label:'Parking Zone P6', angle:20,  rx:345, ry:248, desc:'East · ~140 spots' },
    { id:'P7', label:'Parking Zone P7', angle:62,  rx:345, ry:248, desc:'East-South · ~100 spots' },
  ],
  drawField: function() {
    return `<ellipse cx="${CX}" cy="${CY}" rx="98" ry="65" fill="rgba(20,83,45,.85)" stroke="rgba(34,197,94,.25)" stroke-width=".8"/>
<ellipse cx="${CX}" cy="${CY}" rx="80" ry="53" fill="url(#field-grad)" stroke="rgba(34,197,94,.5)" stroke-width="1.4" filter="url(#glow)"/>
<ellipse cx="${CX}" cy="${CY}" rx="54" ry="39" fill="none" stroke="rgba(255,255,255,.1)" stroke-width=".6" stroke-dasharray="3,5"/>
<rect x="${CX-5}" y="${CY-17}" width="10" height="34" rx="1.5" fill="rgba(230,195,115,.32)" stroke="rgba(255,245,195,.48)" stroke-width=".7"/>
<line x1="${CX-8}" y1="${CY-12}" x2="${CX+8}" y2="${CY-12}" stroke="rgba(255,255,255,.45)" stroke-width=".7"/>
<line x1="${CX-8}" y1="${CY+12}" x2="${CX+8}" y2="${CY+12}" stroke="rgba(255,255,255,.45)" stroke-width=".7"/>
<text x="${CX}" y="${CY}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,.55)" font-size="7" font-family="Inter,sans-serif" font-weight="700" letter-spacing="1.5">FIELD</text>`;
  }
};

const JLN_CONFIG = {
  name: 'Jawaharlal Nehru Stadium Delhi',
  location: 'Delhi',
  capacity: '60,254',
  rings: {
    // We MUST use 'lower' and 'upper' so the render() function recognizes them
    lower: { iRx:100,  iRy:100,  oRx:150, oRy:150 }, 
    upper: { iRx:155,  iRy:155,  oRx:210, oRy:210 }
  },
  categories: {
    GE:   { name:'Gallery Ends',    color:'#F59E0B', bg:'rgba(245,158,11,.18)'  },
    GS:  { name:'Gallery Sides',   color:'#10B981', bg:'rgba(16,185,129,.18)'  },
    VIP:            { name:'VIP Section',     color:'#A855F7', bg:'rgba(168,85,247,.18)'  }
  },
  blocks: {
    // Notice 'ring' now matches 'lower' or 'upper'
    A:{ s:0,   e:90,  ring:'lower', cat:'GS', tier:'Lower', ss:1, se:200, gate:'1', occ:65, desc:'West Lower — Finish line view.' },
    B:{ s:90,  e:180, ring:'lower', cat:'GE',  tier:'Lower', ss:1, se:150, gate:'2', occ:70, desc:'North Lower — Track curve view.' },
    C:{ s:180, e:270, ring:'lower', cat:'GS', tier:'Lower', ss:1, se:200, gate:'3', occ:60, desc:'East Lower — Side-on perspective.' },
    D:{ s:270, e:360, ring:'lower', cat:'GE',  tier:'Lower', ss:1, se:150, gate:'4', occ:75, desc:'South Lower — Near scoreboard.' },
    E:{ s:0,   e:120, ring:'upper', cat:'GS', tier:'Upper', ss:1, se:300, gate:'1', occ:50, desc:'Upper West — Panoramic view.' },
    F:{ s:120, e:240, ring:'upper', cat:'GE',  tier:'Upper', ss:1, se:300, gate:'2', occ:45, desc:'Upper North — High altitude view.' },
    G:{ s:240, e:360, ring:'upper', cat:'GS', tier:'Upper', ss:1, se:300, gate:'3', occ:55, desc:'Upper East — Wide perspective.' }
  },
  suites: [], 
  gates: {
    '1':{ angle:180, name:'Gate 1', loc:'West Entrance', blocks:['A','E'] },
    '2':{ angle:270, name:'Gate 2', loc:'North Entrance', blocks:['B','F'] },
    '3':{ angle:0,   name:'Gate 3', loc:'East Entrance', blocks:['C','G'] },
    '4':{ angle:90,  name:'Gate 4', loc:'South Entrance', blocks:['D'] }
  },
  toilets: [
    { id:'T1', label:'Toilet T1', angle:135, rx:240, ry:240, desc:'North-West' },
    { id:'T2', label:'Toilet T2', angle:315, rx:240, ry:240, desc:'South-East' }
  ],
  parking: [
    { id:'P1', label:'Parking P1', angle:225, rx:300, ry:300, desc:'West Lot' },
    { id:'P2', label:'Parking P2', angle:45,  rx:300, ry:300, desc:'East Lot' }
  ],
  drawField: function() {
    return `
      <!-- Athletics Track (Red/Maroon) -->
      <circle cx="${CX}" cy="${CY}" r="92" fill="#7f1d1d" stroke="#b91c1c" stroke-width="2"/>
      <circle cx="${CX}" cy="${CY}" r="85" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.5" stroke-dasharray="2,2"/>
      <!-- Pitch -->
      <rect x="${CX-45}" y="${CY-65}" width="90" height="130" rx="2" fill="url(#field-grad)" stroke="rgba(255,255,255,0.2)" />
      <text x="${CX}" y="${CY}" text-anchor="middle" fill="rgba(255,255,255,0.3)" font-size="8" font-weight="800">JLN ARENA</text>
    `;
  }
};

function updateManualLocationOptions() {
  const sel = document.getElementById('manual-location-sel');
  if (!sel) return;

  // Clear existing options except the first
  while (sel.options.length > 1) {
    sel.remove(1);
  }

  // Add block options grouped by ring
  const rings = {};
  for (const [id, b] of Object.entries(BLOCKS)) {
    if (!rings[b.ring]) rings[b.ring] = [];
    rings[b.ring].push(id);
  }

  for (const [ring, blocks] of Object.entries(rings)) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = ring.charAt(0).toUpperCase() + ring.slice(1) + ' Ring';
    for (const block of blocks.sort()) {
      const option = document.createElement('option');
      option.value = block;
      option.textContent = `Block ${block}`;
      optgroup.appendChild(option);
    }
    sel.appendChild(optgroup);
  }
}
let currentConfig = NMS_CONFIG; // Default

function loadVenue(venueName) {
  if (venueName === 'Modi Stadium') {
    currentConfig = NMS_CONFIG;
  } else if (venueName === 'Jawaharlal Nehru Stadium Delhi') {
    currentConfig = JLN_CONFIG;
  } else {
    currentConfig = NMS_CONFIG;
  }

  // Force update all global variables
  RINGS = currentConfig.rings;
  CATEGORIES = currentConfig.categories;
  BLOCKS = currentConfig.blocks;
  SUITES = currentConfig.suites || []; // If empty, clear old suites
  GATES = currentConfig.gates;
  TOILETS = currentConfig.toilets;
  PARKING_ZONES = currentConfig.parking;

  // Update UI Labels
  document.getElementById('stadium-title').textContent = currentConfig.name;
  document.getElementById('stadium-subtitle').textContent = `${currentConfig.location} · Capacity: ${currentConfig.capacity}`;
  
  // Update Top Bar Stats
  const capVal = document.getElementById('cap-val');
  const gatesVal = document.getElementById('gates-val');
  const blocksVal = document.getElementById('blocks-val');
  
  if (capVal) capVal.textContent = currentConfig.capacity;
  if (gatesVal) gatesVal.textContent = Object.keys(GATES).length;
  if (blocksVal) blocksVal.textContent = Object.keys(BLOCKS).length + (currentConfig.suites ? currentConfig.suites.length : 0);

  // Jump live-crowd baseline so simulation starts fresh for the new venue
  const liveCrowdEl = document.getElementById('live-crowd');
  if (liveCrowdEl) {
    const freshVal = Math.floor(parseInt(currentConfig.capacity.replace(/,/g,'')) * 0.7);
    liveCrowdEl.textContent = freshVal.toLocaleString('en-IN');
  }

  // Reset internal state
  ST.selBlock = null;
  ST.selGate = null;
  ST.navTarget = null;

  // Refresh Side Panel
  buildLegend();
  updateManualLocationOptions();
  
  // CRITICAL: Redraw the map
  render(); 
}

// ═══════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════
const ST = {
  selBlock: null, selGate: null, selCat: null,
  heatmap: false, showBest: false,
  gatePath: null,
  zoom: 1, panX: 0, panY: 0,
  dragging: false, lastX: 0, lastY: 0,
  // Location & Navigation
  loc: null,       // { inside: bool, blockId: string|null, x, y }
  navTarget: null, // { x, y, label }
  // Live systems
  weather: 'sunny',
  securityStatus: 'operational',
  complaints: [],
  // Facility overlays
  showToilets: false,
  showParking: false,
};

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
const rad = d => d * Math.PI / 180;
const status = occ => occ >= 90 ? 'full' : occ >= 68 ? 'limited' : 'available';
const statusColor = s => ({ available:'#10B981', limited:'#F59E0B', full:'#EF4444' })[s] || '#999';
const heatColor  = occ => occ < 35 ? 'rgba(34,197,94,.52)' : occ < 65 ? 'rgba(234,179,8,.5)' : 'rgba(239,68,68,.54)';

function arcPath(iRx, iRy, oRx, oRy, s, e, gap=1.4) {
  let ss = s + gap, ee = e - gap;
  if (ee <= ss) ee += 360;
  const la = (ee - ss) > 180 ? 1 : 0;
  const [sr, er] = [rad(ss), rad(ee)];
  const p = (r, a) => `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
  return `M${p(iRx,sr)} A${iRx} ${iRy} 0 ${la} 1 ${p(iRx,er)} L${p(oRx,er)} A${oRx} ${oRy} 0 ${la} 0 ${p(oRx,sr)} Z`;
}

function lineArc(rx, ry, s, e, gap=1.4) {
  let ss = s + gap, ee = e - gap;
  if (ee <= ss) ee += 360;
  const la = (ee - ss) > 180 ? 1 : 0;
  const [sr, er] = [rad(ss), rad(ee)];
  const p = a => `${(CX + rx * Math.cos(a)).toFixed(1)} ${(CY + ry * Math.sin(a)).toFixed(1)}`;
  return `M${p(sr)} A${rx} ${ry} 0 ${la} 1 ${p(er)}`;
}

function midPt(rx, ry, s, e) {
  let ne = e; if (ne <= s) ne += 360;
  const m = rad((s + ne) / 2);
  return { x: CX + rx * Math.cos(m), y: CY + ry * Math.sin(m) };
}

function gatePos(g) {
  const rx = g.south ? 296 : 250, ry = g.south ? 210 : 176;
  return { x: CX + rx * Math.cos(rad(g.angle)), y: CY + ry * Math.sin(rad(g.angle)) };
}

function allBlockData(id) {
  if (BLOCKS[id]) {
    const b = BLOCKS[id], r = RINGS[b.ring];
    return { ...b, iRx:r.iRx, iRy:r.iRy, oRx:r.oRx, oRy:r.oRy, isSuite:false };
  }
  const s = SUITES.find(x => x.id === id);
  if (s) return { ...s, ring:'suite', cat:'Suite', tier:s.level, ss:s.ss, se:s.se, gate:s.gate, occ:s.occ, desc:s.desc, isSuite:true };
  return null;
}

// ═══════════════════════════════════════════════
// SVG RENDER
// ═══════════════════════════════════════════════
function render() {
  let h = '';

  // Background glow
  h += `<ellipse cx="${CX}" cy="${CY}" rx="300" ry="213" fill="rgba(16,185,129,.04)"/>`;
  h += `<ellipse cx="${CX}" cy="${CY}" rx="245" ry="172" fill="rgba(16,185,129,.04)"/>`;
  h += `<ellipse cx="${CX}" cy="${CY}" rx="295" ry="208" fill="none" stroke="rgba(255,255,255,.055)" stroke-width=".8" stroke-dasharray="6,9"/>`;

  // Field
  h += currentConfig.drawField();

  // Row lines
  const ringKeys = Object.keys(RINGS);
  for (let i = 0; i < ringKeys.length; i++) {
    const ringName = ringKeys[i];
    const ring = RINGS[ringName];
    const tValues = i === 0 ? [.22,.45,.68] : [.2,.4,.6,.8]; // Different for inner/lower vs outer/upper
    for (const t of tValues) {
      const rx = ring.iRx + (ring.oRx - ring.iRx)*t;
      const ry = ring.iRy + (ring.oRy - ring.iRy)*t;
      for (const [,b] of Object.entries(BLOCKS))
        if (b.ring === ringName) h += `<path d="${lineArc(rx,ry,b.s,b.e)}" fill="none" stroke="rgba(255,255,255,.065)" stroke-width=".55"/>`;
    }
  }

  // Faded state helpers
  const hasSel = !!(ST.selBlock || ST.selGate || ST.selCat);
  const fadeBlock = id => {
    if (!hasSel) return false;
    if (ST.selBlock === id) return false;
    if (ST.selCat && (BLOCKS[id]?.cat === ST.selCat || SUITES.find(s=>s.id===id)?.cat === ST.selCat)) return false;
    if (ST.selGate && GATES[ST.selGate]?.blocks.includes(id)) return false;
    return true;
  };
  const fadeGate = id => {
    if (!hasSel) return false;
    if (ST.selGate === id) return false;
    if (ST.selBlock && GATES[id]?.blocks.includes(ST.selBlock)) return false;
    return true;
  };

  // ── BLOCKS ──
  for (const [id, b] of Object.entries(BLOCKS)) {
    const r = RINGS[b.ring];
    const cat = CATEGORIES[b.cat];
    const st = status(b.occ);
    const sel = ST.selBlock === id;
    const gHl = ST.selGate && GATES[ST.selGate]?.blocks.includes(id);
    const faded = fadeBlock(id);
    const path = arcPath(r.iRx, r.iRy, r.oRx, r.oRy, b.s, b.e);
    const fo = faded ? .15 : sel ? 1 : .78;
    const sc = sel ? '#fff' : gHl ? '#F97316' : cat.color;
    const sw = sel ? 2 : gHl ? 1.5 : .8;
    const so = faded ? .12 : sel ? .92 : gHl ? .85 : .42;
    const filt = sel ? 'filter="url(#glow)"' : '';
    h += `<path id="blk-${id}" class="sblk" d="${path}" fill="${cat.color}" fill-opacity="${fo}" stroke="${sc}" stroke-opacity="${so}" stroke-width="${sw}" ${filt} data-block="${id}" cursor="pointer"/>`;
    if (ST.heatmap && !faded)
      h += `<path d="${path}" fill="${heatColor(b.occ)}" stroke="none" pointer-events="none"/>`;
    // Label
    const mRx = (r.iRx+r.oRx)/2, mRy = (r.iRy+r.oRy)/2;
    const lp = midPt(mRx, mRy, b.s, b.e);
    const fs = Object.keys(RINGS).indexOf(b.ring) === 0 ? 11 : 9.5; // First ring larger font
    const to = faded ? .22 : .92;
    h += `<text x="${lp.x.toFixed(1)}" y="${lp.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,${to})" font-size="${fs}" font-family="Inter,sans-serif" font-weight="${sel?800:700}" pointer-events="none">${id}</text>`;
    // Status dot
    h += `<circle cx="${lp.x.toFixed(1)}" cy="${(lp.y+fs*.9).toFixed(1)}" r="2.4" fill="${statusColor(st)}" fill-opacity="${faded?.18:.88}" pointer-events="none"/>`;
  }

  // ── SUITES ──
  for (const s of SUITES) {
    const sel = ST.selBlock === s.id;
    const gHl = ST.selGate && GATES[ST.selGate]?.blocks.includes(s.id);
    const faded = fadeBlock(s.id);
    const path = arcPath(s.iRx, s.iRy, s.oRx, s.oRy, s.s, s.e);
    const fo = faded?.15 : sel?1:.82;
    const so = faded?.1 : sel?1:.48;
    const sw = sel?2:gHl?1.5:.8;
    h += `<path id="blk-${s.id}" class="sblk" d="${path}" fill="${s.color}" fill-opacity="${fo}" stroke="rgba(255,220,90,${so})" stroke-width="${sw}" data-block="${s.id}" cursor="pointer"/>`;
    if (ST.heatmap && !faded)
      h += `<path d="${path}" fill="${heatColor(s.occ)}" stroke="none" pointer-events="none"/>`;
    const mRx = (s.iRx+s.oRx)/2, mRy = (s.iRy+s.oRy)/2;
    const lp = midPt(mRx, mRy, s.s, s.e);
    const to = faded?.18:.88;
    h += `<text x="${lp.x.toFixed(1)}" y="${(lp.y-3.5).toFixed(1)}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,${to})" font-size="6" font-family="Inter,sans-serif" font-weight="700" pointer-events="none">${s.short}</text>`;
    h += `<text x="${lp.x.toFixed(1)}" y="${(lp.y+3.5).toFixed(1)}" text-anchor="middle" dominant-baseline="middle" fill="rgba(255,255,255,${to*.7})" font-size="5" font-family="Inter,sans-serif" pointer-events="none">${s.level}</text>`;
  }

  // ── GATE PATH LINE ──
  if (ST.gatePath && ST.selBlock) {
    const gate = GATES[ST.gatePath];
    if (gate) {
      const gp = gatePos(gate);
      const bd = allBlockData(ST.selBlock);
      if (bd) {
        const bc = bd.isSuite 
          ? midPt((bd.iRx+bd.oRx)/2, (bd.iRy+bd.oRy)/2, bd.s, bd.e)
          : midPt((RINGS[bd.ring].iRx+RINGS[bd.ring].oRx)/2, (RINGS[bd.ring].iRy+RINGS[bd.ring].oRy)/2, bd.s, bd.e);
        h += `<line x1="${bc.x.toFixed(1)}" y1="${bc.y.toFixed(1)}" x2="${gp.x.toFixed(1)}" y2="${gp.y.toFixed(1)}" stroke="#F97316" stroke-width="2" stroke-opacity=".78" class="gate-path"/>`;
        for (let i = 1; i <= 3; i++) {
          const t = i / 4;
          h += `<circle cx="${(bc.x+(gp.x-bc.x)*t).toFixed(1)}" cy="${(bc.y+(gp.y-bc.y)*t).toFixed(1)}" r="2.5" fill="#F97316" fill-opacity="${.3+t*.5}" pointer-events="none"/>`;
        }
      }
    }
  }

  // ── GATES ──
  for (const [id, g] of Object.entries(GATES)) {
    const gp = gatePos(g);
    const sel = ST.selGate === id;
    const hlBlock = ST.selBlock && GATES[id]?.blocks.includes(ST.selBlock);
    const faded = fadeGate(id);
    const r = sel ? 13 : 10;
    const fo = faded?.1 : sel?1:.15;
    const so = faded?.1 : sel?1:.7;
    const sw = sel?2:1.2;
    h += `<circle id="gte-${id}" class="sgate" cx="${gp.x.toFixed(1)}" cy="${gp.y.toFixed(1)}" r="${r}" fill="${sel?'#F97316':`rgba(249,115,22,${fo})`}" stroke="#F97316" stroke-opacity="${so}" stroke-width="${sw}" ${sel?'filter="url(#glow)"':''} data-gate="${id}" cursor="pointer"/>`;
    h += `<text x="${gp.x.toFixed(1)}" y="${gp.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" fill="${faded?'rgba(249,115,22,.28)':sel?'#fff':'#F97316'}" font-size="${sel?7:6}" font-family="Inter,sans-serif" font-weight="800" pointer-events="none">G${id}</text>`;
  }

  // Compass + Title
  h += `<text x="${CX}" y="11" text-anchor="middle" fill="rgba(255,255,255,.28)" font-size="9" font-family="Inter,sans-serif" font-weight="600">N</text>`;
  h += `<text x="${SVG_W-10}" y="${CY+4}" text-anchor="middle" fill="rgba(255,255,255,.28)" font-size="9" font-family="Inter,sans-serif" font-weight="600">E</text>`;
  h += `<text x="${CX}" y="${SVG_H-5}" text-anchor="middle" fill="rgba(255,255,255,.28)" font-size="9" font-family="Inter,sans-serif" font-weight="600">S</text>`;
  h += `<text x="10" y="${CY+4}" text-anchor="middle" fill="rgba(255,255,255,.28)" font-size="9" font-family="Inter,sans-serif" font-weight="600">W</text>`;
  h += `<text x="${CX}" y="${CY-30}" text-anchor="middle" fill="rgba(255,255,255,.12)" font-size="8" font-family="Inter,sans-serif" font-weight="600" letter-spacing="2">${currentConfig.name.toUpperCase()}</text>`;

  // ── TOILET MARKERS ──
  if (ST.showToilets) {
    for (const t of TOILETS) {
      const a = rad(t.angle);
      const tx = (CX + t.rx * Math.cos(a)).toFixed(1);
      const ty = (CY + t.ry * Math.sin(a)).toFixed(1);
      h += `<g class="facility-marker" data-facility="toilet" data-id="${t.id}" cursor="pointer">
        <circle cx="${tx}" cy="${ty}" r="10" fill="rgba(14,165,233,.22)" stroke="#0ea5e9" stroke-width="1.4" stroke-opacity=".75"/>
        <text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" font-size="9" pointer-events="none">🚻</text>
        <text x="${tx}" y="${(parseFloat(ty)+17).toFixed(1)}" text-anchor="middle" fill="#7dd3fc" font-size="5.5" font-family="Inter,sans-serif" font-weight="700" stroke="rgba(6,10,20,.8)" stroke-width="2" paint-order="stroke" pointer-events="none">${t.id}</text>
      </g>`;
    }
  }

  // ── PARKING MARKERS ──
  if (ST.showParking) {
    for (const p of PARKING_ZONES) {
      const a = rad(p.angle);
      const px = (CX + p.rx * Math.cos(a)).toFixed(1);
      const py = (CY + p.ry * Math.sin(a)).toFixed(1);
      h += `<g class="facility-marker" data-facility="parking" data-id="${p.id}" cursor="pointer">
        <rect x="${(parseFloat(px)-10).toFixed(1)}" y="${(parseFloat(py)-10).toFixed(1)}" width="20" height="20" rx="4" fill="rgba(168,85,247,.22)" stroke="#a855f7" stroke-width="1.4" stroke-opacity=".75"/>
        <text x="${px}" y="${py}" text-anchor="middle" dominant-baseline="middle" font-size="9" pointer-events="none">🅿️</text>
        <text x="${px}" y="${(parseFloat(py)+17).toFixed(1)}" text-anchor="middle" fill="#d8b4fe" font-size="5.5" font-family="Inter,sans-serif" font-weight="700" stroke="rgba(6,10,20,.8)" stroke-width="2" paint-order="stroke" pointer-events="none">${p.id}</text>
      </g>`;
    }
  }

  // Inject user location dot
  if (ST.loc) h += buildLocSVG();
  // Inject animated nav path
  if (ST.loc && ST.navTarget) h += buildNavPath();

  document.getElementById('map-root').innerHTML = h;
  attachFacilityEvents();
  attachSVGEvents();
  updateCounts();
}

// ═══════════════════════════════════════════════
// FACILITY HELPERS
// ═══════════════════════════════════════════════
function facilityPos(item) {
  const a = rad(item.angle);
  return { x: CX + item.rx * Math.cos(a), y: CY + item.ry * Math.sin(a) };
}

function nearestFacility(arr, x, y) {
  let best = null, bestDist = Infinity;
  for (const item of arr) {
    const pos = facilityPos(item);
    const d = Math.hypot(pos.x - x, pos.y - y);
    if (d < bestDist) { bestDist = d; best = item; }
  }
  return { item: best, dist: bestDist };
}

function attachFacilityEvents() {
  document.querySelectorAll('.facility-marker').forEach(el => {
    el.addEventListener('click', e => {
      const type = el.dataset.facility;
      const id   = el.dataset.id;
      const info = type === 'toilet'
        ? TOILETS.find(t => t.id === id)
        : PARKING_ZONES.find(p => p.id === id);
      if (!info) return;

      // If location is active, set as nav target
      if (ST.loc) {
        const pos = facilityPos(info);
        ST.navTarget = { x: pos.x, y: pos.y, label: info.label };
        showNavSuggestion();
      }

      const emoji = type === 'toilet' ? '🚻' : '🅿️';
      showAlertToast({
        icon: emoji,
        title: `${info.label}`,
        msg: info.desc,
        cls: type === 'toilet' ? 'alert-toilet' : 'alert-parking'
      });
      render(); // Redraw for path
    });
  });
}

// ═══════════════════════════════════════════════
// SVG EVENTS
// ═══════════════════════════════════════════════
function attachSVGEvents() {
  document.querySelectorAll('[data-block]').forEach(el => {
    el.addEventListener('click', e => {
      const id = e.currentTarget.dataset.block;
      ST.selBlock === id ? deselect() : selectBlock(id);
    });
    el.addEventListener('mouseenter', e => showTip(e.currentTarget.dataset.block, e));
    el.addEventListener('mousemove', positionTip);
    el.addEventListener('mouseleave', hideTip);
  });

  document.querySelectorAll('[data-gate]').forEach(el => {
    el.addEventListener('click', e => {
      const id = e.currentTarget.dataset.gate;
      ST.selGate === id ? deselect() : selectGate(id);
    });
    el.addEventListener('mouseenter', e => showGateTip(e.currentTarget.dataset.gate, e));
    el.addEventListener('mousemove', positionTip);
    el.addEventListener('mouseleave', hideTip);
  });
}

// ═══════════════════════════════════════════════
// SELECTION
// ═══════════════════════════════════════════════
function selectBlock(id) {
  ST.selBlock = id; ST.selGate = null; ST.gatePath = null; ST.showBest = false;
  if (ST.loc) updateNavTargetToBlock(id);
  render(); updateRightBlock(); zoomTo(id);
  document.getElementById('hover-info').textContent = `Block ${id} selected`;
}

function selectGate(id) {
  ST.selGate = id; ST.selBlock = null; ST.gatePath = null; ST.showBest = false;
  render(); updateRightGate();
}

function deselect() {
  ST.selBlock = null; ST.selGate = null; ST.selCat = null; ST.gatePath = null; ST.showBest = false;
  resetView(); render();
  updateLegendActiveStates();
  if (ST.loc) { ST.navTarget = null; showNavSuggestion(); }
  else { showState('none'); }
  document.getElementById('hover-info').textContent = 'Hover over a section to explore';
}

// ═══════════════════════════════════════════════
// RIGHT PANEL
// ═══════════════════════════════════════════════
function showState(s) {
  ['none','block','gate','best','nav'].forEach(n => {
    const el = document.getElementById(`state-${n}`);
    if (el) el.style.display = n === s ? 'flex' : 'none';
  });
}

function updateRightBlock() {
  const id = ST.selBlock;
  const bd = allBlockData(id);
  if (!bd) return;
  const cat = CATEGORIES[bd.cat];
  const st = status(bd.occ);

  showState('block');
  document.getElementById('sel-badge').textContent = bd.isSuite ? bd.short : `Block ${id}`;

  const sb = document.getElementById('sel-status');
  sb.textContent = st.charAt(0).toUpperCase() + st.slice(1);
  sb.className = `status-badge sb-${st === 'available' ? 'avail' : st === 'limited' ? 'limit' : 'full'}`;

  const ct = document.getElementById('sel-cat-tag');
  document.getElementById('sel-cat-name').textContent = cat.name;
  ct.style.cssText = `background:${cat.bg};border:1px solid ${cat.color}40;color:${cat.color};display:inline-block;padding:3px 10px;border-radius:6px;font-size:.72rem;font-weight:600;width:fit-content`;

  document.getElementById('d-seats').textContent = `${bd.ss}–${bd.se}`;
  document.getElementById('d-gate').textContent = `Gate ${bd.gate}`;
  document.getElementById('d-tier').textContent = bd.tier;
  document.getElementById('d-occ').textContent = `${bd.occ}%`;

  const fill = document.getElementById('occ-fill');
  fill.style.width = bd.occ + '%';
  fill.style.background = `linear-gradient(90deg,${statusColor(st)},${statusColor(st)}88)`;
  document.getElementById('sel-desc').textContent = bd.desc;
  document.getElementById('seat-input').max = bd.se;
  document.getElementById('seat-input').value = '';
  document.getElementById('seat-result').innerHTML = '';
}

function updateRightGate() {
  const g = GATES[ST.selGate];
  if (!g) return;
  showState('gate');
  document.getElementById('gate-badge').textContent = g.name;
  document.getElementById('g-loc').textContent = g.loc;
  document.getElementById('g-blocks').textContent = g.blocks.join(', ');
}

// ═══════════════════════════════════════════════
// TOOLTIP
// ═══════════════════════════════════════════════
function showTip(id, e) {
  const bd = allBlockData(id);
  if (!bd) return;
  const cat = CATEGORIES[bd.cat];
  const st = status(bd.occ);
  const sc = statusColor(st);
  document.getElementById('tt-block').textContent = bd.isSuite ? bd.short : `Block ${id}`;
  document.getElementById('tt-block').style.color = cat.color;
  document.getElementById('tt-cat').textContent = cat.name;
  document.getElementById('tt-seats').innerHTML = `Seats: <span>${bd.ss}–${bd.se}</span>`;
  document.getElementById('tt-gate').innerHTML = `Gate: <span>Gate ${bd.gate}</span>`;
  document.querySelector('.tt-dot').style.background = sc;
  document.getElementById('tt-status-txt').textContent = st.charAt(0).toUpperCase()+st.slice(1);
  document.getElementById('tt-status-txt').style.color = sc;
  document.getElementById('tooltip').classList.remove('hidden');
  positionTip(e);
}

function showGateTip(id, e) {
  const g = GATES[id];
  if (!g) return;
  document.getElementById('tt-block').textContent = g.name;
  document.getElementById('tt-block').style.color = '#F97316';
  document.getElementById('tt-cat').textContent = g.loc;
  document.getElementById('tt-seats').innerHTML = `Blocks: <span>${g.blocks.join(', ')}</span>`;
  document.getElementById('tt-gate').innerHTML = '';
  document.querySelector('.tt-dot').style.background = '#F97316';
  document.getElementById('tt-status-txt').textContent = 'Gate';
  document.getElementById('tt-status-txt').style.color = '#F97316';
  document.getElementById('tooltip').classList.remove('hidden');
  positionTip(e);
}

function positionTip(e) {
  const tip = document.getElementById('tooltip');
  const x = e.clientX + 14, y = e.clientY - 10;
  const tw = 170, th = 120;
  tip.style.left = (x + tw > window.innerWidth ? x - tw - 28 : x) + 'px';
  tip.style.top  = (y + th > window.innerHeight ? y - th : y) + 'px';
}

function hideTip() { document.getElementById('tooltip').classList.add('hidden'); }

// ═══════════════════════════════════════════════
// SEARCH & VALIDATION
// ═══════════════════════════════════════════════
const VALID_BLOCKS = new Set([...Object.keys(BLOCKS), ...SUITES.map(s=>s.id)]);

function parseInput(raw) {
  const v = raw.trim().toUpperCase().replace(/\s+/g,' ');
  if (!v) return { type:'empty' };

  // Gate
  const gm = v.match(/^(?:GATE\s*)?G?(\d)$/);
  if (gm) return GATES[gm[1]] ? { type:'gate', id:gm[1] } : { type:'error', msg:`Gate ${gm[1]} not found. Valid: ${Object.keys(GATES).join(', ')}.` };

  // Block only
  const bm = v.match(/^(?:BLOCK\s+)?([A-Z_]+)$/);
  if (bm) {
    const l = bm[1];
    if (BLOCKS[l]) return { type:'block', id:l };
    return { type:'error', msg:`Block ${l} doesn't exist. Valid: ${Object.keys(BLOCKS).join(', ')}.` };
  }

  // Suite
  for (const s of SUITES) if (v.includes(s.id)) return { type:'block', id:s.id };

  // Seat  e.g. A-45, A 45, BLOCK A SEAT 45
  const sm = v.match(/^(?:BLOCK\s+)?([A-Z_]+)[\s\-]+(?:SEAT\s+)?(\d+)$/);
  if (sm) {
    const [, l, n] = sm; const num = parseInt(n);
    if (!BLOCKS[l]) return { type:'error', msg:`Block ${l} does not exist.` };
    const b = BLOCKS[l];
    if (num < b.ss || num > b.se) return { type:'error', msg:`Seat ${num} out of range for Block ${l} (${b.ss}–${b.se}).` };
    return { type:'seat', blockId:l, seat:num };
  }

  return { type:'error', msg:`"${raw}" is not a valid block, seat, or gate. Try "Block A", "Gate 5", "A-45".` };
}

function getSuggestions(raw) {
  const v = raw.trim().toUpperCase();
  if (!v) return [];
  const res = [];
  for (const [id, b] of Object.entries(BLOCKS)) {
    if (id.startsWith(v) || `BLOCK ${id}`.startsWith(v)) {
      const cat = CATEGORIES[b.cat];
      res.push({ type:'block', id, name:`Block ${id}`, sub:`${cat.name} · Seats ${b.ss}–${b.se}`, color:cat.color });
    }
  }
  if ('GATE'.startsWith(v) || v.startsWith('G') || v.match(/^\d/)) {
    const gp = v.replace(/^(?:GATE\s*|G)/,'');
    for (const [id, g] of Object.entries(GATES))
      if (!gp || id.startsWith(gp))
        res.push({ type:'gate', id, name:g.name, sub:`${g.loc} · ${g.blocks.slice(0,3).join(', ')}`, color:'#F97316' });
  }
  return res.slice(0, 8);
}

function renderSuggestions(list) {
  const dd = document.getElementById('search-dropdown');
  if (!list.length) { dd.classList.add('hidden'); return; }
  dd.innerHTML = list.map(s => `
    <div class="sug-item" data-type="${s.type}" data-id="${s.id}">
      <div class="sug-icon" style="background:${s.color}28;color:${s.color}">${s.type==='gate'?'🚪':s.id.slice(0,2)}</div>
      <div><div class="sug-name">${s.name}</div><div class="sug-sub">${s.sub}</div></div>
    </div>`).join('');
  dd.classList.remove('hidden');
  dd.querySelectorAll('.sug-item').forEach(el =>
    el.addEventListener('click', () => {
      const { type, id } = el.dataset;
      executeSearch(type==='gate' ? `Gate ${id}` : `Block ${id}`);
      document.getElementById('search-input').value = type==='gate' ? `Gate ${id}` : `Block ${id}`;
      dd.classList.add('hidden');
    })
  );
}

function executeSearch(raw) {
  const res = parseInput(raw);
  if (res.type === 'empty') return;
  if (res.type === 'error') { showError(res.msg); return; }
  hideError();
  document.getElementById('search-dropdown').classList.add('hidden');
  if (res.type === 'block') selectBlock(res.id);
  else if (res.type === 'gate') selectGate(res.id);
  else if (res.type === 'seat') {
    selectBlock(res.blockId);
    setTimeout(() => {
      document.getElementById('seat-input').value = res.seat;
      checkSeat();
    }, 200);
  }
}

function showError(msg) {
  const e = document.getElementById('search-error');
  document.getElementById('error-text').textContent = msg;
  e.classList.remove('hidden');
  document.getElementById('search-dropdown').classList.add('hidden');
  const w = document.getElementById('search-wrapper');
  w.classList.add('error','shake');
  setTimeout(() => w.classList.remove('shake','error'), 900);
}
function hideError() {
  document.getElementById('search-error').classList.add('hidden');
  document.getElementById('search-wrapper').classList.remove('error');
}

// ═══════════════════════════════════════════════
// SEAT CHECKER
// ═══════════════════════════════════════════════
function checkSeat() {
  const id = ST.selBlock;
  const b = BLOCKS[id]; if (!b) return;
  const num = parseInt(document.getElementById('seat-input').value);
  const res = document.getElementById('seat-result');
  if (!num) { res.innerHTML = ''; return; }
  if (num >= b.ss && num <= b.se) {
    res.innerHTML = `<span class="seat-ok"><i class="fa-solid fa-check-circle"></i> Seat ${num} in Block ${id} — valid!</span>`;
  } else {
    res.innerHTML = `<span class="seat-err"><i class="fa-solid fa-xmark-circle"></i> Seat ${num} doesn't exist (${b.ss}–${b.se})</span>`;
  }
}

// ═══════════════════════════════════════════════
// ZOOM / PAN
// ═══════════════════════════════════════════════
function applyTransform(animate=false) {
  const root = document.getElementById('map-root');
  root.style.transition = animate ? 'transform .4s cubic-bezier(.16,1,.3,1)' : 'none';
  root.style.transformOrigin = 'center center';
  root.style.transform = `translate(${ST.panX}px,${ST.panY}px) scale(${ST.zoom})`;
  document.getElementById('zoom-label').textContent = `${Math.round(ST.zoom*100)} %`;
}

function zoomTo(id) {
  const bd = allBlockData(id); if (!bd) return;
  const mp = bd.isSuite
    ? midPt((bd.iRx+bd.oRx)/2, (bd.iRy+bd.oRy)/2, bd.s, bd.e)
    : midPt((RINGS[bd.ring].iRx+RINGS[bd.ring].oRx)/2, (RINGS[bd.ring].iRy+RINGS[bd.ring].oRy)/2, bd.s, bd.e);
  const svgEl = document.getElementById('stadium-svg');
  const vw = svgEl.clientWidth, vh = svgEl.clientHeight;
  const scaleX = vw / SVG_W, scaleY = vh / SVG_H;
  const scale = Math.min(scaleX, scaleY);
  const sx = (mp.x / SVG_W) * vw, sy = (mp.y / SVG_H) * vh;
  ST.zoom = 2; ST.panX = vw/2 - sx*ST.zoom/scale; ST.panY = vh/2 - sy*ST.zoom/scale;
  // clamp
  const maxPan = 200;
  ST.panX = Math.max(-maxPan, Math.min(maxPan, ST.panX));
  ST.panY = Math.max(-maxPan, Math.min(maxPan, ST.panY));
  applyTransform(true);
}

function resetView() { ST.zoom=1; ST.panX=0; ST.panY=0; applyTransform(true); }

function handleWheel(e) {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 1.12 : 0.9;
  const nz = Math.max(0.5, Math.min(5, ST.zoom * delta));
  ST.zoom = nz;
  applyTransform();
}

// ═══════════════════════════════════════════════
// HEATMAP
// ═══════════════════════════════════════════════
let heatInterval = null;
function toggleHeatmap() {
  ST.heatmap = !ST.heatmap;
  const btn = document.getElementById('heatmap-btn');
  const card = document.getElementById('heat-legend-card');
  if (ST.heatmap) {
    btn.classList.add('active-hl');
    btn.innerHTML = '<i class="fa-solid fa-fire-flame-curved"></i> Heatmap ON';
    card.style.display = 'block';
    heatInterval = setInterval(() => {
      // Randomly nudge occupancy
      for (const b of Object.values(BLOCKS)) b.occ = Math.max(5, Math.min(99, b.occ + (Math.random()*6-3)));
      for (const s of SUITES) s.occ = Math.max(5, Math.min(99, s.occ + (Math.random()*4-2)));
      render();
    }, 2500);
  } else {
    btn.classList.remove('active-hl');
    btn.innerHTML = '<i class="fa-solid fa-fire-flame-curved"></i> Crowd Heatmap';
    card.style.display = 'none';
    if (heatInterval) clearInterval(heatInterval);
  }
  render();
}

// ═══════════════════════════════════════════════
// BEST SEAT FINDER
// ═══════════════════════════════════════════════
const CAT_WEIGHT = { A:2.2, D:1.8, B:1.4, C:1.5, E:1.2, Suite:2.5 };

function findBestSeats() {
  ST.showBest = true; ST.selBlock = null; ST.selGate = null;
  const all = [];
  for (const [id, b] of Object.entries(BLOCKS)) {
    if (b.occ >= 90) continue;
    const score = (100 - b.occ) * (CAT_WEIGHT[b.cat]||1);
    all.push({ id, name:`Block ${id}`, cat:b.cat, occ:b.occ, score, desc:b.desc, gate:`Gate ${b.gate}` });
  }
  all.sort((a,b) => b.score - a.score);
  const top = all.slice(0,3);

  showState('best');
  const bl = document.getElementById('best-list');
  bl.innerHTML = top.map((s,i) => `
    <div class="bsc" data-block="${s.id}">
      <div class="bsc-rank r${i+1}">${i+1}</div>
      <div class="bsc-info">
        <div class="bsc-block" style="color:${CATEGORIES[s.cat].color}">${s.name}</div>
        <div class="bsc-detail">${CATEGORIES[s.cat].name} · ${s.occ}% full · ${s.gate}</div>
      </div>
      <div class="bsc-score">${Math.round(s.score)}</div>
    </div>`).join('');

  bl.querySelectorAll('.bsc').forEach(el =>
    el.addEventListener('click', () => selectBlock(el.dataset.block))
  );
  render();
}

// ═══════════════════════════════════════════════
// LEGEND
// ═══════════════════════════════════════════════
function buildLegend() {
  const el = document.getElementById('category-legend');
  el.innerHTML = Object.entries(CATEGORIES).map(([id, c]) => `
    <div class="legend-item" data-cat="${id}">
      <div class="leg-dot" style="background:${c.color}28;color:${c.color}">${id}</div>
      <div><div class="leg-name">${c.name}</div></div>
    </div>`).join('');
  updateLegendActiveStates();
}

function updateLegendActiveStates() {
  document.querySelectorAll('#category-legend .legend-item').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === ST.selCat);
  });
}

function updateCounts() {
  let av=0, li=0, fu=0;
  for (const b of Object.values(BLOCKS)) {
    const s = status(b.occ);
    if (s==='available') av++; else if (s==='limited') li++; else fu++;
  }
  for (const s of SUITES) {
    const st = status(s.occ);
    if (st==='available') av++; else if (st==='limited') li++; else fu++;
  }
  document.getElementById('cnt-avail').textContent = av;
  document.getElementById('cnt-limit').textContent = li;
  document.getElementById('cnt-full').textContent  = fu;
}

// ═══════════════════════════════════════════════
// LIVE CROWD ANIMATION
// ═══════════════════════════════════════════════
function animateCrowd() {
  setInterval(() => {
    const cap = parseInt(currentConfig.capacity.replace(/,/g,''));
    if (isNaN(cap)) return;
    let val = parseInt(document.getElementById('live-crowd').textContent.replace(/,/g,'')) || Math.floor(cap * 0.7);
    val += Math.floor(Math.random()*120) - 40;
    val = Math.max(cap * 0.4, Math.min(cap * 0.99, val));
    document.getElementById('live-crowd').textContent = val.toLocaleString('en-IN');
    ST.occupancyPct = (val / cap) * 100;
  }, 3000);
}

// ═══════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildLegend();
  loadVenue('Modi Stadium'); // Default
  animateCrowd();

  // Search
  const inp = document.getElementById('search-input');
  inp.addEventListener('input', () => {
    const v = inp.value.trim();
    document.getElementById('search-clear').style.display = v ? 'flex' : 'none';
    hideError();
    renderSuggestions(getSuggestions(v));
  });
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') { executeSearch(inp.value); document.getElementById('search-dropdown').classList.add('hidden'); }
    if (e.key === 'Escape') { document.getElementById('search-dropdown').classList.add('hidden'); hideError(); }
  });
  document.getElementById('search-btn').addEventListener('click', () => {
    executeSearch(inp.value);
    document.getElementById('search-dropdown').classList.add('hidden');
  });
  document.getElementById('search-clear').addEventListener('click', () => {
    inp.value = ''; inp.focus();
    document.getElementById('search-clear').style.display = 'none';
    document.getElementById('search-dropdown').classList.add('hidden');
    hideError();
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('#search-container')) {
      document.getElementById('search-dropdown').classList.add('hidden');
    }
  });

  // Tools
  document.getElementById('best-seat-btn').addEventListener('click', findBestSeats);
  document.getElementById('heatmap-btn').addEventListener('click', toggleHeatmap);
  document.getElementById('reset-btn').addEventListener('click', () => { deselect(); });
  document.getElementById('desel-btn').addEventListener('click', deselect);

  // Map controls
  document.getElementById('zoom-in-btn').addEventListener('click', () => {
    ST.zoom = Math.min(5, ST.zoom * 1.25); applyTransform(true);
  });
  document.getElementById('zoom-out-btn').addEventListener('click', () => {
    ST.zoom = Math.max(0.5, ST.zoom / 1.25); applyTransform(true);
  });
  document.getElementById('zoom-reset-btn').addEventListener('click', deselect);

  // Zoom wheel
  document.getElementById('svg-viewport').addEventListener('wheel', handleWheel, { passive:false });

  // Pan drag
  const vp = document.getElementById('svg-viewport');
  vp.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    ST.dragging = true; ST.lastX = e.clientX; ST.lastY = e.clientY;
    vp.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!ST.dragging) return;
    ST.panX += e.clientX - ST.lastX;
    ST.panY += e.clientY - ST.lastY;
    ST.lastX = e.clientX; ST.lastY = e.clientY;
    applyTransform();
  });
  window.addEventListener('mouseup', () => {
    ST.dragging = false;
    vp.classList.remove('dragging');
  });

  // Double-click reset
  vp.addEventListener('dblclick', () => { if (!ST.selBlock) return; resetView(); });

  // Seat checker
  document.getElementById('seat-check-btn').addEventListener('click', checkSeat);
  document.getElementById('seat-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') checkSeat();
  });

  // Switch Venue button logic consolidated later
  document.getElementById('desel-gate-btn').addEventListener('click', deselect);
  document.getElementById('close-best-btn').addEventListener('click', deselect);

  // Show gate path
  document.getElementById('show-gate-btn').addEventListener('click', () => {
    if (!ST.selBlock) return;
    const bd = allBlockData(ST.selBlock);
    if (!bd) return;
    ST.gatePath = ST.gatePath ? null : bd.gate;
    const btn = document.getElementById('show-gate-btn');
    btn.innerHTML = ST.gatePath
      ? '<i class="fa-solid fa-xmark"></i> Hide Path'
      : '<i class="fa-solid fa-route"></i> Gate Path';
    render();
    updateRightBlock();
  });

  document.getElementById('category-legend').addEventListener('click', e => {
    const item = e.target.closest('[data-cat]');
    if (!item) return;
    const cat = item.dataset.cat;
    
    if (ST.selCat === cat) {
      ST.selCat = null;
    } else {
      ST.selCat = cat;
      ST.selBlock = null;
      ST.selGate = null;
    }
    updateLegendActiveStates();
    render();
    if (ST.selCat) {
      document.getElementById('hover-info').textContent = `Highlighting category: ${CATEGORIES[ST.selCat].name}`;
      showState('none'); 
    } else {
      deselect();
    }
  });

  // ── ONBOARDING ──
  initOnboarding();

  // ── VENUE SWITCHING ──
  document.getElementById('switch-venue-btn').addEventListener('click', () => {
    const saved = getStoredUser(); 
    if (saved && saved.name) {
      document.getElementById('ob-name').value = saved.name;
      document.getElementById('ob-group').value = saved.group || 0;
      document.getElementById('ob-seat').value = saved.seat || '';
      document.getElementById('ob-venue').value = currentConfig.name; // Pre-fill with CURRENT venue
    } else {
      // If no saved data, just pre-fill current venue anyway
      document.getElementById('ob-venue').value = currentConfig.name;
    }

    const overlay = document.getElementById('onboarding-overlay');
    const modal = document.getElementById('onboarding-modal');
    overlay.style.display = 'flex';
    overlay.classList.remove('ob-exit');
    modal.classList.remove('ob-exit');
    modal.style.animation = 'none';
    modal.offsetHeight; 
    modal.style.animation = 'obSlideUp .4s cubic-bezier(.16,1,.3,1) both';
    const btnText = document.getElementById('ob-btn-text');
    if(btnText) btnText.innerHTML = '<i class="fa-solid fa-rocket"></i> Enter the Stadium';
  });

  // ── INPUT CLEARING ──
  document.querySelectorAll('.input-clear-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        input.value = '';
        input.focus();
      }
    });
  });

  // ── NEW SYSTEMS ──
  initNewSystems();
  initWeatherSystem();
});

// ═══════════════════════════════════════════════
// WEATHER SYSTEM
// ═══════════════════════════════════════════════
function initWeatherSystem() {
  const chip = document.getElementById('weather-chip');
  if (chip) chip.addEventListener('click', showWeatherDetails);
  
  const closeBtn = document.getElementById('wm-close');
  if (closeBtn) closeBtn.addEventListener('click', hideWeatherDetails);
  
  const overlay = document.getElementById('weather-overlay');
  if (overlay) overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideWeatherDetails();
  });
}

function showWeatherDetails() {
  const overlay = document.getElementById('weather-overlay');
  const locName = document.getElementById('wm-location-name');
  const tempMain = document.getElementById('wm-temp-main');
  const condDetail = document.getElementById('wm-cond-detail');
  const hourlyList = document.getElementById('wm-hourly-list');

  overlay.style.display = 'flex';
  locName.textContent = currentConfig.name;

  // Generate fake data based on current conditions
  const currentTemp = 28 + Math.floor(Math.random() * 6 - 3);
  tempMain.textContent = `${currentTemp}°C`;
  condDetail.textContent = `Mostly Sunny · Humidity: ${40 + Math.floor(Math.random() * 20)}% · UV Index: ${5 + Math.floor(Math.random() * 4)}`;

  // 24 Hour Forecast Simulation
  let h = '';
  const now = new Date();
  const icons = ['☀️', '🌤️', '⛅', '☁️', '🌦️'];
  
  for (let i = 0; i < 24; i++) {
    const future = new Date(now.getTime() + i * 3600000);
    const hour = future.getHours();
    const timeStr = hour === 0 ? '12 AM' : hour > 12 ? `${hour - 12} PM` : `${hour} ${hour === 12 ? 'PM' : 'AM'}`;
    
    // Simple temp curve simulation
    const curve = Math.sin((hour - 6) * Math.PI / 12); // peak at 6pm? no, peak at 3pm
    const tShift = Math.sin((hour - 8) * (Math.PI / 12)) * 8;
    const temp = Math.round(24 + tShift + (Math.random() * 2 - 1));
    const icon = icons[Math.floor(Math.random() * icons.length)];

    h += `
      <div class="hourly-chip">
        <span class="hourly-time">${i === 0 ? 'Now' : timeStr}</span>
        <span class="hourly-icon">${icon}</span>
        <span class="hourly-temp">${temp}°C</span>
      </div>
    `;
  }
  hourlyList.innerHTML = h;
}

function hideWeatherDetails() {
  const overlay = document.getElementById('weather-overlay');
  overlay.style.display = 'none';
}

// ═══════════════════════════════════════════════
// ONBOARDING & WELCOME BANNER
// ═══════════════════════════════════════════════
const LS_KEY = 'stadium_user_v1';
const SUPPORTED_VENUES = ['Modi Stadium', 'Jawaharlal Nehru Stadium Delhi'];

function getStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem(LS_KEY));
    if (user && SUPPORTED_VENUES.includes(user.venue)) return user;
    return null; // Invalid or old venue
  } catch { return null; }
}
function saveUser(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}

function initOnboarding() {
  const stored = getStoredUser();
  
  // Show the overlay every time (fulfilling "take new input every time")
  showOverlay();

  // If we have stored data, pre-fill it to make it easier for the user
  if (stored) {
    if (stored.name) document.getElementById('ob-name').value = stored.name;
    if (stored.venue) document.getElementById('ob-venue').value = stored.venue;
    if (stored.group) document.getElementById('ob-group').value = stored.group;
    if (stored.seat) document.getElementById('ob-seat').value = stored.seat;
  }
}

function showOverlay() {
  const overlay = document.getElementById('onboarding-overlay');
  overlay.style.display = 'flex';

  const form = document.getElementById('onboarding-form');
  form.addEventListener('submit', handleOnboardingSubmit);
}

function hideOverlay() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.classList.add('ob-exit');
  setTimeout(() => { overlay.style.display = 'none'; overlay.classList.remove('ob-exit'); }, 420);
}

function handleOnboardingSubmit(e) {
  e.preventDefault();
  const nameEl  = document.getElementById('ob-name');
  const venueEl = document.getElementById('ob-venue');
  const groupEl = document.getElementById('ob-group');
  const seatEl  = document.getElementById('ob-seat');
  const errName  = document.getElementById('err-name');
  const errVenue = document.getElementById('err-venue');

  let valid = true;

  // Validate name
  const name = nameEl.value.trim();
  if (!name) {
    nameEl.classList.add('ob-invalid');
    errName.classList.add('visible');
    valid = false;
  } else {
    nameEl.classList.remove('ob-invalid');
    errName.classList.remove('visible');
  }

  // Validate venue
  const venue = venueEl.value;
  if (!venue) {
    venueEl.classList.add('ob-invalid');
    errVenue.classList.add('visible');
    valid = false;
  } else {
    venueEl.classList.remove('ob-invalid');
    errVenue.classList.remove('visible');
  }

  if (!valid) {
    // Shake the form
    const modal = document.getElementById('onboarding-modal');
    modal.style.animation = 'none';
    modal.offsetHeight; // reflow
    modal.style.animation = 'obSlideUp .25s cubic-bezier(.36,.07,.19,.97) both';
    return;
  }

  const group = parseInt(groupEl.value) || 0;
  const seat  = seatEl.value.trim();

  const userData = { name, venue, group, seat, ts: Date.now() };
  saveUser(userData);

  // Load the venue
  loadVenue(venue);

  // Animate button
  const btn = document.getElementById('ob-btn-text');
  btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> Welcome aboard!';

  setTimeout(() => {
    hideOverlay();
    showWelcomeBanner(userData);
    if (seat) triggerSeatSearch(seat);
  }, 420);
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function showWelcomeBanner(user) {
  const banner  = document.getElementById('welcome-banner');
  const avatar  = document.getElementById('wb-avatar');
  const greeting= document.getElementById('wb-greeting');
  const details = document.getElementById('wb-details');
  const tags    = document.getElementById('wb-tags');

  // Avatar initials
  avatar.textContent = getInitials(user.name);

  // Greeting
  greeting.textContent = `${getTimeGreeting()}, ${user.name.split(' ')[0]}! 👋`;

  // Detail line
  const groupStr = user.group > 0 ? ` · ${user.group} companion${user.group > 1 ? 's' : ''}` : '';
  const seatStr  = user.seat ? ` · Seat ${user.seat}` : '';
  details.textContent = `${user.venue}${groupStr}${seatStr}`;

  // Tags
  const tagData = [
    { icon: 'fa-location-dot',  text: user.venue.split(' ').slice(0,3).join(' ') },
    user.group > 0 && { icon: 'fa-users', text: `+${user.group} people` },
    user.seat     && { icon: 'fa-couch',  text: `Seat ${user.seat}` },
  ].filter(Boolean);

  tags.innerHTML = tagData.map(t =>
    `<div class="wb-tag"><i class="fa-solid ${t.icon}"></i>${t.text}</div>`
  ).join('');

  // Show banner & adjust layout
  banner.style.display = 'flex';
  document.body.classList.add('has-banner');

  // Dismiss handler
  document.getElementById('wb-close').addEventListener('click', () => {
    banner.classList.add('wb-hiding');
    setTimeout(() => {
      banner.style.display = 'none';
      banner.classList.remove('wb-hiding');
      document.body.classList.remove('has-banner');
    }, 370);
  });
}

function triggerSeatSearch(seat) {
  // Pre-fill the search bar and execute after a short delay
  const inp = document.getElementById('search-input');
  if (!inp) return;
  setTimeout(() => {
    inp.value = seat;
    document.getElementById('search-clear').style.display = 'flex';
    executeSearch(seat);
  }, 600);
}

// ═══════════════════════════════════════════════
// LOCATION SYSTEM
// ═══════════════════════════════════════════════
function getOutsidePos(gateId) {
  const g = GATES[gateId];
  const gp = gatePos(g);
  // Scale gate position outward from center by 1.14x
  return { x: CX + (gp.x - CX) * 1.14, y: CY + (gp.y - CY) * 1.14 };
}

function simulateLocation() {
  const inside = Math.random() > 0.4; // 60% inside
  if (inside) {
    const blockIds = Object.keys(BLOCKS);
    const blockId = blockIds[Math.floor(Math.random() * blockIds.length)];
    const b = BLOCKS[blockId];
    const r = RINGS[b.ring];
    const pt = midPt((r.iRx + r.oRx) / 2, (r.iRy + r.oRy) / 2, b.s, b.e);
    ST.loc = { inside: true, blockId, x: pt.x, y: pt.y };
  } else {
    const gateIds = Object.keys(GATES);
    const gateId = gateIds[Math.floor(Math.random() * gateIds.length)];
    const pos = getOutsidePos(gateId);
    ST.loc = { inside: false, blockId: null, x: pos.x, y: pos.y };
  }
  ST.navTarget = null;
  render();
  updateLocStatus();
  showNavSuggestion();
}

function setManualLocation(val) {
  if (!val) {
    ST.loc = null; ST.navTarget = null;
    render(); updateLocStatus(); showState('none');
    return;
  }
  if (val === 'outside') {
    const pos = getOutsidePos('8');
    ST.loc = { inside: false, blockId: null, x: pos.x, y: pos.y };
  } else {
    const b = BLOCKS[val]; if (!b) return;
    const r = RINGS[b.ring];
    const pt = midPt((r.iRx + r.oRx) / 2, (r.iRy + r.oRy) / 2, b.s, b.e);
    ST.loc = { inside: true, blockId: val, x: pt.x, y: pt.y };
  }
  ST.navTarget = null;
  render();
  updateLocStatus();
  showNavSuggestion();
}

function buildLocSVG() {
  const { x, y } = ST.loc;
  return `
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20"
      fill="rgba(6,182,212,.14)" class="loc-pulse-ring" pointer-events="none"/>
    <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7"
      fill="#06B6D4" stroke="#fff" stroke-width="2" stroke-opacity=".9"
      filter="url(#glow)" pointer-events="none" class="loc-dot"/>
    <text x="${x.toFixed(1)}" y="${(y - 14).toFixed(1)}"
      text-anchor="middle" fill="#22d3ee" font-size="7.5"
      font-family="Inter,sans-serif" font-weight="700"
      stroke="rgba(6,10,20,.7)" stroke-width="2.5" paint-order="stroke"
      pointer-events="none">You are here</text>`;
}

function buildNavPath() {
  const { x: fx, y: fy } = ST.loc;
  const { x: tx, y: ty } = ST.navTarget;
  return `<line x1="${fx.toFixed(1)}" y1="${fy.toFixed(1)}"
    x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}"
    stroke="#06B6D4" stroke-width="2.5" stroke-opacity=".82"
    class="nav-path-line" pointer-events="none"/>`;
}

function nearestGate(x, y) {
  let best = null, bestDist = Infinity;
  for (const [id, g] of Object.entries(GATES)) {
    const gp = gatePos(g);
    const d = Math.hypot(gp.x - x, gp.y - y);
    if (d < bestDist) { bestDist = d; best = id; }
  }
  return best;
}

function updateNavTargetToBlock(blockId) {
  const bd = allBlockData(blockId); if (!bd) return;
  const pt = bd.isSuite
    ? midPt((bd.iRx + bd.oRx) / 2, (bd.iRy + bd.oRy) / 2, bd.s, bd.e)
    : midPt((RINGS[bd.ring].iRx + RINGS[bd.ring].oRx) / 2, (RINGS[bd.ring].iRy + RINGS[bd.ring].oRy) / 2, bd.s, bd.e);
  ST.navTarget = { x: pt.x, y: pt.y, label: blockId };
}

function showNavSuggestion() {
  if (!ST.loc) { showState('none'); return; }
  
  let targetX, targetY, targetLabel, targetType;

  if (ST.navTarget) {
    targetX = ST.navTarget.x;
    targetY = ST.navTarget.y;
    targetLabel = ST.navTarget.label;
    targetType = targetLabel.includes('Toilet') ? 'toilet' : targetLabel.includes('Parking') ? 'parking' : 'block';
  } else {
    // Default to nearest gate if no specific target
    const gateId = nearestGate(ST.loc.x, ST.loc.y);
    const gate = GATES[gateId];
    const gp = gatePos(gate);
    targetX = gp.x; targetY = gp.y;
    targetLabel = gate.name;
    targetType = ST.loc.inside ? 'exit' : 'entry';
    ST.navTarget = { x: targetX, y: targetY, label: targetLabel };
  }

  const distPx = Math.hypot(targetX - ST.loc.x, targetY - ST.loc.y);
  const distM = Math.round(distPx * 1.1);
  const wait = ST.navTarget.label.startsWith('Gate') ? Math.round(GATE_WAIT[ST.navTarget.label.replace('Gate ','')]) : 0;

  // Facilities info for the nav footer
  const nearestT = nearestFacility(TOILETS, ST.loc.x, ST.loc.y);
  const nearestP = nearestFacility(PARKING_ZONES, ST.loc.x, ST.loc.y);

  let html = `
    <div class="nav-card ${targetType}">
      <div class="nav-card-icon">
        ${targetType==='toilet'?'🚻':targetType==='parking'?'🅿️':targetType==='entry'?'<i class="fa-solid fa-right-to-bracket"></i>':'<i class="fa-solid fa-person-walking-arrow-right"></i>'}
      </div>
      <div class="nav-card-info">
        <div class="nav-card-title">Navigating to</div>
        <div class="nav-card-gate">${targetLabel}</div>
        <div class="nav-card-detail">~${distM} meters away ${wait ? `&nbsp;·&nbsp; ${wait}m wait` : ''}</div>
      </div>
    </div>
    <div class="nav-tip">
      <i class="fa-solid fa-circle-info"></i>&nbsp; 
      ${ST.loc.inside ? `You are in <strong>Block ${ST.loc.blockId}</strong>.` : `You are <strong>outside</strong> the stadium.`}
      Follow the dashed line.
    </div>`;

  // Always show nearest facilities if they aren't the primary target
  if (targetType !== 'toilet') {
     html += `
      <div class="nav-card toilet mini" onclick="selectFacility('toilet','${nearestT.item.id}')" style="cursor:pointer;opacity:0.8;transform:scale(0.95)">
        <div class="nav-card-info">
          <div class="nav-card-title">Nearest Toilet</div>
          <div class="nav-card-gate" style="font-size:0.75rem">${nearestT.item.id} · ~${Math.round(nearestT.dist*1.1)}m</div>
        </div>
      </div>`;
  }
  if (targetType !== 'parking') {
     html += `
      <div class="nav-card parking mini" onclick="selectFacility('parking','${nearestP.item.id}')" style="cursor:pointer;opacity:0.8;transform:scale(0.95)">
        <div class="nav-card-info">
          <div class="nav-card-title">Nearest Parking</div>
          <div class="nav-card-gate" style="font-size:0.75rem">${nearestP.item.id} · ~${Math.round(nearestP.dist*1.1)}m</div>
        </div>
      </div>`;
  }

  document.getElementById('nav-suggestion').innerHTML = html;
  showState('nav');
  render();
}

// Global helper for the navigation cards
window.selectFacility = (type, id) => {
  const info = type === 'toilet' ? TOILETS.find(t => t.id === id) : PARKING_ZONES.find(p => p.id === id);
  if (!info || !ST.loc) return;
  const pos = facilityPos(info);
  ST.navTarget = { x: pos.x, y: pos.y, label: info.label };
  showNavSuggestion();
};

function updateLocStatus() {
  const el = document.getElementById('loc-status'); if (!el) return;
  if (!ST.loc) { el.innerHTML = ''; return; }
  el.innerHTML = ST.loc.inside
    ? `<div class="loc-status-pill inside"><i class="fa-solid fa-circle-dot"></i> Inside · Block ${ST.loc.blockId || '?'}</div>`
    : `<div class="loc-status-pill outside"><i class="fa-solid fa-location-dot"></i> Outside Stadium</div>`;
}

// ═══════════════════════════════════════════════
// GATE WAIT TIMES & CROWD
// ═══════════════════════════════════════════════
const GATE_WAIT = { '1':4,'2':7,'3':3,'4':11,'5':6,'6':5,'7':8,'8':15,'9':9 };

function updateWaitTimes() {
  const baseWait = (ST.occupancyPct || 70) / 10; // 70% -> 7 min base
  for (const id of Object.keys(GATE_WAIT)) {
    const noise = (Math.random() * 4 - 2);
    // Gates have inherent "busy-ness" multipliers
    const mult = id === '8' ? 1.5 : id === '3' ? 0.7 : 1;
    GATE_WAIT[id] = Math.max(1, Math.min(45, baseWait * mult + noise));
  }
}

function crowdLevel(occ) {
  if (occ < 50) return { label:'Low',      cls:'crowd-low'  };
  if (occ < 78) return { label:'Moderate', cls:'crowd-mod'  };
  return              { label:'High',     cls:'crowd-high' };
}

function buildGateWaitList() {
  const el = document.getElementById('gate-wait-list'); if (!el) return;
  el.innerHTML = Object.entries(GATES).map(([id, g]) => {
    const wait = Math.round(GATE_WAIT[id]);
    const avgOcc = g.blocks.reduce((a, b) => {
      const bd = allBlockData(b); return a + (bd ? bd.occ : 50);
    }, 0) / g.blocks.length;
    const cl = crowdLevel(avgOcc);
    return `<div class="gw-row">
      <div class="gw-gate">G${id}</div>
      <div class="gw-name">${g.loc.split(' ')[0]}</div>
      <div class="gw-pill ${cl.cls}">${cl.label}</div>
      <div class="gw-wait">${wait}m</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// SMART SUGGESTIONS
// ═══════════════════════════════════════════════
const FOOD_ZONES = [
  { name:'East Food Court',    items:'Burgers · Chai · Biryani',   tip:'Gate 5 area' },
  { name:'South-East Stalls',  items:'Vada Pav · Juice · Snacks',  tip:'Gate 6 area' },
  { name:'North Canteen',      items:'Thali · Lassi · Ice Cream',  tip:'Gate 3 area' },
  { name:'West Refreshments',  items:'Sandwiches · Coffee · Rolls',tip:'Gate 1 area' },
];

function buildSmartTips() {
  const el = document.getElementById('smart-tips-list'); if (!el) return;
  // Least crowded entry gate
  let lowGateId = '1', lowOcc = Infinity;
  for (const [id, g] of Object.entries(GATES)) {
    const avg = g.blocks.reduce((a, b) => { const bd = allBlockData(b); return a + (bd ? bd.occ : 50); }, 0) / g.blocks.length;
    if (avg < lowOcc) { lowOcc = avg; lowGateId = id; }
  }
  // Fastest exit (lowest wait)
  const fastExit = Object.entries(GATE_WAIT).sort((a, b) => a[1] - b[1])[0];
  const food = FOOD_ZONES[Math.floor(Math.random() * FOOD_ZONES.length)];
  // Weather tip
  const wTips = {
    sunny:  { icon:'fa-droplet',      tip:'Stay hydrated! UV index is high.',    cls:'tip-amber'  },
    cloudy: { icon:'fa-wind',          tip:'Comfortable breeze. Light jacket ok.',cls:'tip-blue'   },
    rain:   { icon:'fa-umbrella',      tip:'Rain expected. Seek covered stands.',cls:'tip-blue'   },
  };
  const wt = wTips[ST.weather] || wTips.sunny;
  el.innerHTML = `
    <div class="tip-item tip-green">
      <i class="fa-solid fa-door-open"></i>
      <div><div class="tip-title">Least Crowded Entry</div>
           <div class="tip-sub">Gate ${lowGateId} · ${GATES[lowGateId].loc}</div></div>
    </div>
    <div class="tip-item tip-amber">
      <i class="fa-solid fa-utensils"></i>
      <div><div class="tip-title">${food.name}</div>
           <div class="tip-sub">${food.items} · ${food.tip}</div></div>
    </div>
    <div class="tip-item tip-purple">
      <i class="fa-solid fa-person-running"></i>
      <div><div class="tip-title">Fastest Exit</div>
           <div class="tip-sub">Gate ${fastExit[0]} · ${Math.round(fastExit[1])}m wait · ${GATES[fastExit[0]].loc}</div></div>
    </div>
    <div class="tip-item ${wt.cls}">
      <i class="fa-solid ${wt.icon}"></i>
      <div><div class="tip-title">Weather Advice</div>
           <div class="tip-sub">${wt.tip}</div></div>
    </div>`;
}

// ═══════════════════════════════════════════════
// ALERTS & SAFETY
// ═══════════════════════════════════════════════
const ALERT_TYPES = [
  { icon:'🔥', title:'Fire Hazard Alert',     msg:'Smoke detected near Gate 7 area. Evacuate safely via Gate 6.',         cls:'alert-fire'   },
  { icon:'⚠️', title:'Structural Notice',     msg:'Section J under inspection. Use alternate routes via Gate 1 or 9.',    cls:'alert-struct' },
  { icon:'👥', title:'Overcrowding Warning',  msg:'Block E exceeds safe capacity. Please spread to adjacent sections.',   cls:'alert-crowd'  },
  { icon:'🚔', title:'Security Alert',        msg:'Increased security checks at Gate 8. Allow extra 10 min.',             cls:'alert-sec'    },
  { icon:'💨', title:'Suffocation Risk',      msg:'Poor ventilation in Block P upper deck. Move to open areas.',          cls:'alert-suf'    },
];
let _alertTimer = null, _alertDismissTimer = null;

function randomAlert() {
  const a = { ...ALERT_TYPES[Math.floor(Math.random() * ALERT_TYPES.length)] };
  if (ST.loc && ST.loc.inside) {
    const gateId = nearestGate(ST.loc.x, ST.loc.y);
    a.msg += ` Nearest exit: ${GATES[gateId].name}.`;
  }
  showAlertToast(a);
}

function showAlertToast(a) {
  const toast = document.getElementById('alert-toast'); if (!toast) return;
  // Remove all variant classes
  toast.className = '';
  toast.classList.add(a.cls);
  document.getElementById('at-icon').textContent = a.icon;
  document.getElementById('at-title').textContent = a.title;
  document.getElementById('at-msg').textContent = a.msg;
  toast.style.display = 'flex';
  // Countdown bar animation
  const bar = document.getElementById('at-countdown-bar');
  bar.style.transition = 'none'; bar.style.width = '100%';
  requestAnimationFrame(() => {
    bar.style.transition = 'width 8s linear';
    bar.style.width = '0%';
  });
  if (_alertDismissTimer) clearTimeout(_alertDismissTimer);
  _alertDismissTimer = setTimeout(dismissAlertToast, 8000);
}

function dismissAlertToast() {
  const toast = document.getElementById('alert-toast'); if (!toast) return;
  toast.classList.add('alert-hiding');
  setTimeout(() => {
    toast.style.display = 'none';
    toast.className = '';
  }, 380);
}

// ═══════════════════════════════════════════════
// SECURITY STATUS
// ═══════════════════════════════════════════════
const SEC_STATES = [
  { label:'Secure',   color:'#10B981', icon:'fa-shield'             },
  { label:'Alert',    color:'#F59E0B', icon:'fa-shield-halved'      },
  { label:'Elevated', color:'#EF4444', icon:'fa-shield-exclamation' },
];

function updateSecurityStatus() {
  if (Math.random() > 0.68) {
    const s = SEC_STATES[Math.floor(Math.random() * SEC_STATES.length)];
    const dot   = document.getElementById('security-dot');
    const lbl   = document.getElementById('security-label');
    const badge = document.getElementById('security-status-badge');
    if (dot)   { dot.style.background = s.color; dot.style.boxShadow = `0 0 7px ${s.color}88`; }
    if (lbl)   { lbl.textContent = s.label; lbl.style.color = s.color; }
    if (badge) badge.innerHTML = `<div class="sec-badge" style="color:${s.color};border-color:${s.color}38;background:${s.color}12"><i class="fa-solid ${s.icon}"></i>&nbsp; Security: ${s.label}</div>`;
  }
}

function initSecurityBadge() {
  const badge = document.getElementById('security-status-badge');
  const dot   = document.getElementById('security-dot');
  if (dot)   { dot.style.background = '#10B981'; dot.style.boxShadow = '0 0 7px rgba(16,185,129,.6)'; }
  if (badge) badge.innerHTML = `<div class="sec-badge" style="color:#10B981;border-color:#10B98138;background:#10B98112"><i class="fa-solid fa-shield"></i>&nbsp; Security: Secure</div>`;
}

// ═══════════════════════════════════════════════
// COMPLAINT SYSTEM
// ═══════════════════════════════════════════════
function openComplaintModal() {
  document.getElementById('complaint-overlay').style.display = 'flex';
}
function closeComplaintModal() {
  document.getElementById('complaint-overlay').style.display = 'none';
}
function handleComplaintSubmit(e) {
  e.preventDefault();
  const cat = document.querySelector('input[name="complaint-cat"]:checked');
  const errCat = document.getElementById('err-cat');
  if (!cat) { errCat.classList.add('visible'); return; }
  errCat.classList.remove('visible');
  const desc = document.getElementById('complaint-desc').value.trim();
  ST.complaints.push({ category: cat.value, desc, ts: Date.now() });
  closeComplaintModal();
  document.getElementById('complaint-form').reset();
  showAlertToast({
    icon: '✅',
    title: 'Report Submitted',
    msg: `Complaint #${ST.complaints.length} logged (${cat.value.replace(/_/g,' ')}). Our team will respond shortly.`,
    cls: 'alert-success'
  });
}

// ═══════════════════════════════════════════════
// WEATHER SYSTEM
// ═══════════════════════════════════════════════
const WEATHER_DATA = {
  sunny:  { icon:'☀️',  label:'Sunny'  },
  cloudy: { icon:'⛅',  label:'Cloudy' },
  rain:   { icon:'🌧️', label:'Rainy'  },
};
const WEATHER_CYCLE = ['sunny','sunny','cloudy','sunny','rain','cloudy'];
let _weatherIdx = 0;

function cycleWeather() {
  _weatherIdx = (_weatherIdx + 1) % WEATHER_CYCLE.length;
  ST.weather = WEATHER_CYCLE[_weatherIdx];
  updateWeatherChip();
  buildSmartTips(); // tips include weather advice
}
function updateWeatherChip() {
  const w = WEATHER_DATA[ST.weather];
  const icon = document.getElementById('weather-icon');
  const lbl  = document.getElementById('weather-label');
  if (icon) icon.textContent = w.icon;
  if (lbl)  lbl.textContent  = w.label;
}

// ═══════════════════════════════════════════════
// MASTER INIT
// ═══════════════════════════════════════════════
function initNewSystems() {
  // Gate waits + smart tips (initial build + refresh)
  buildGateWaitList();
  buildSmartTips();
  setInterval(() => { updateWaitTimes(); buildGateWaitList(); buildSmartTips(); }, 5000);

  // ── Toilet / Parking toggle buttons
  const toiletBtn  = document.getElementById('toilet-btn');
  const parkingBtn = document.getElementById('parking-btn');
  if (toiletBtn) toiletBtn.addEventListener('click', () => {
    ST.showToilets = !ST.showToilets;
    toiletBtn.classList.toggle('active-hl', ST.showToilets);
    toiletBtn.innerHTML = ST.showToilets
      ? '<i class="fa-solid fa-restroom"></i> Toilets ON'
      : '<i class="fa-solid fa-restroom"></i> Show Toilets';
    render();
  });
  if (parkingBtn) parkingBtn.addEventListener('click', () => {
    ST.showParking = !ST.showParking;
    parkingBtn.classList.toggle('active-hl', ST.showParking);
    parkingBtn.innerHTML = ST.showParking
      ? '<i class="fa-solid fa-square-parking"></i> Parking ON'
      : '<i class="fa-solid fa-square-parking"></i> Show Parking';
    render();
  });

  // Security
  initSecurityBadge();
  setInterval(updateSecurityStatus, 45000);

  // Weather cycling
  updateWeatherChip();
  setInterval(cycleWeather, 120000);

  // Staggered random alerts (35–60 s)
  function scheduleAlert() {
    _alertTimer = setTimeout(() => { randomAlert(); scheduleAlert(); }, 35000 + Math.random() * 25000);
  }
  scheduleAlert();

  // ── Location: Use My Location button
  const locBtn = document.getElementById('use-location-btn');
  if (locBtn) locBtn.addEventListener('click', () => {
    locBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Detecting…';
    locBtn.disabled = true;
    setTimeout(() => {
      simulateLocation();
      locBtn.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Location Active';
      locBtn.classList.add('loc-active');
      locBtn.disabled = false;
    }, 1200);
  });

  // ── Location: manual override dropdown
  const manSel = document.getElementById('manual-location-sel');
  if (manSel) manSel.addEventListener('change', e => {
    setManualLocation(e.target.value);
    const lb = document.getElementById('use-location-btn');
    if (lb && e.target.value) {
      lb.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Location Active';
      lb.classList.add('loc-active');
    } else if (lb) {
      lb.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Use My Location';
      lb.classList.remove('loc-active');
    }
  });

  // ── Nav "Clear Location" button
  const navClose = document.getElementById('nav-close-btn');
  if (navClose) navClose.addEventListener('click', () => {
    ST.loc = null; ST.navTarget = null;
    const ms = document.getElementById('manual-location-sel');
    const lb = document.getElementById('use-location-btn');
    if (ms) ms.value = '';
    if (lb) { lb.innerHTML = '<i class="fa-solid fa-circle-dot"></i> Use My Location'; lb.classList.remove('loc-active'); }
    updateLocStatus();
    render();
    showState('none');
  });

  // ── Alert toast dismiss button
  const atClose = document.getElementById('at-close');
  if (atClose) atClose.addEventListener('click', dismissAlertToast);

  // ── Complaint FAB
  const fab = document.getElementById('complaint-fab');
  if (fab) fab.addEventListener('click', openComplaintModal);

  // ── Complaint modal close
  const cmClose = document.getElementById('cm-close');
  if (cmClose) cmClose.addEventListener('click', closeComplaintModal);

  // Click overlay to close
  const co = document.getElementById('complaint-overlay');
  if (co) co.addEventListener('click', e => { if (e.target === co) closeComplaintModal(); });

  // Complaint form submit
  const cf = document.getElementById('complaint-form');
  if (cf) cf.addEventListener('submit', handleComplaintSubmit);
}
