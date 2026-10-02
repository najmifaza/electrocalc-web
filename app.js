// ElectroCalc Web - Core Script
console.log("ElectroCalc Web Initialized - Complete Suite Active");

// Peta warna gelang resistor
const COLOR_MAP = {
  0: '#000000', // Hitam
  1: '#8B4513', // Cokelat
  2: '#ef4444', // Merah
  3: '#f97316', // Oranye
  4: '#eab308', // Kuning
  5: '#22c55e', // Hijau
  6: '#3b82f6', // Biru
  7: '#a855f7', // Ungu
  8: '#6b7280', // Abu-abu
  9: '#ffffff'  // Putih
};

const MULTIPLIER_COLOR = {
  1: '#000000',
  10: '#8B4513',
  100: '#ef4444',
  1000: '#f97316',
  10000: '#eab308',
  100000: '#22c55e',
  1000000: '#3b82f6',
  0.1: '#d4af37', // Emas
  0.01: '#c0c0c0' // Perak
};

const TOLERANCE_COLOR = {
  1: '#8B4513',
  2: '#ef4444',
  5: '#d4af37',
  10: '#c0c0c0',
  20: 'transparent'
};

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Event Listener
  const btnCalcResistor = document.getElementById('btn-calc-resistor');
  if (btnCalcResistor) btnCalcResistor.addEventListener('click', calculateResistor);

  const btnOhm = document.getElementById('btn-calc-ohm');
  const btnResetOhm = document.getElementById('btn-reset-ohm');
  if (btnOhm) btnOhm.addEventListener('click', calculateOhmsLaw);
  if (btnResetOhm) btnResetOhm.addEventListener('click', resetOhmsLaw);

  // Event listener Gelang Warna Resistor untuk update visual
  ['band1', 'band2', 'band3', 'band4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', updateResistorVisual);
  });

  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.textContent = isDark ? "☀️ Mode Terang" : "🌓 Mode Gelap";
    });
  }

  // Clear History
  const btnClearHist = document.getElementById('btn-clear-history');
  if (btnClearHist) {
    btnClearHist.addEventListener('click', () => {
      const list = document.getElementById('history-list');
      list.innerHTML = '<li class="empty-notice">Belum ada riwayat perhitungan.</li>';
    });
  }

  // Initial updates
  updateResistorVisual();
});

// Update visual gelang resistor
function updateResistorVisual() {
  const b1 = document.getElementById('band1').value;
  const b2 = document.getElementById('band2').value;
  const b3 = document.getElementById('band3').value;
  const b4 = document.getElementById('band4').value;

  document.getElementById('band1-box').style.backgroundColor = COLOR_MAP[b1] || '#8B4513';
  document.getElementById('band2-box').style.backgroundColor = COLOR_MAP[b2] || '#000000';
  document.getElementById('band3-box').style.backgroundColor = MULTIPLIER_COLOR[b3] || '#000000';
  document.getElementById('band4-box').style.backgroundColor = TOLERANCE_COLOR[b4] || '#d4af37';
}

// Modul 1: Kalkulator Resistor 4 Pita (Khoirin Naila Rusian)
function calculateResistor() {
  const b1 = parseInt(document.getElementById('band1').value);
  const b2 = parseInt(document.getElementById('band2').value);
  const mult = parseFloat(document.getElementById('band3').value);
  const tol = parseFloat(document.getElementById('band4').value);

  const baseVal = (b1 * 10 + b2) * mult;
  let displayVal = "";

  if (baseVal >= 1000000) {
    displayVal = (baseVal / 1000000).toFixed(2) + " MΩ";
  } else if (baseVal >= 1000) {
    displayVal = (baseVal / 1000).toFixed(2) + " kΩ";
  } else {
    displayVal = baseVal.toFixed(2) + " Ω";
  }

  const minVal = baseVal * (1 - tol / 100);
  const maxVal = baseVal * (1 + tol / 100);

  document.getElementById('resistor-val').textContent = `${displayVal} ±${tol}%`;
  document.getElementById('resistor-range').textContent = `${minVal.toFixed(1)} Ω s/d ${maxVal.toFixed(1)} Ω`;

  addHistoryLog("Kalkulator Resistor", `Nilai: ${displayVal} (Toleransi ±${tol}%)`);
}

// Modul 2: Kalkulator Hukum Ohm (Rizky Pratama)
function calculateOhmsLaw() {
  let v = parseFloat(document.getElementById('ohm-v').value);
  let i = parseFloat(document.getElementById('ohm-i').value);
  let r = parseFloat(document.getElementById('ohm-r').value);
  let p = parseFloat(document.getElementById('ohm-p').value);

  let knownCount = [v, i, r, p].filter(n => !isNaN(n)).length;
  if (knownCount < 2) {
    alert("Mohon masukkan minimal 2 parameter nilai!");
    return;
  }

  // Solusi iteratif untuk variabel V, I, R, P
  for (let loop = 0; loop < 3; loop++) {
    if (isNaN(v) && !isNaN(i) && !isNaN(r)) v = i * r;
    if (isNaN(v) && !isNaN(p) && !isNaN(i)) v = p / i;
    if (isNaN(v) && !isNaN(p) && !isNaN(r)) v = Math.sqrt(p * r);

    if (isNaN(i) && !isNaN(v) && !isNaN(r)) i = v / r;
    if (isNaN(i) && !isNaN(p) && !isNaN(v)) i = p / v;
    if (isNaN(i) && !isNaN(p) && !isNaN(r)) i = Math.sqrt(p / r);

    if (isNaN(r) && !isNaN(v) && !isNaN(i)) r = v / i;
    if (isNaN(r) && !isNaN(v) && !isNaN(p)) r = Math.pow(v, 2) / p;
    if (isNaN(r) && !isNaN(p) && !isNaN(i)) r = p / Math.pow(i, 2);

    if (isNaN(p) && !isNaN(v) && !isNaN(i)) p = v * i;
    if (isNaN(p) && !isNaN(i) && !isNaN(r)) p = Math.pow(i, 2) * r;
    if (isNaN(p) && !isNaN(v) && !isNaN(r)) p = Math.pow(v, 2) / r;
  }

  document.getElementById('ohm-v').value = v.toFixed(3);
  document.getElementById('ohm-i').value = i.toFixed(3);
  document.getElementById('ohm-r').value = r.toFixed(3);
  document.getElementById('ohm-p').value = p.toFixed(3);

  document.getElementById('ohm-summary').innerHTML = 
    `<strong>Tegangan (V):</strong> ${v.toFixed(3)} V<br>` +
    `<strong>Arus (I):</strong> ${i.toFixed(3)} A<br>` +
    `<strong>Hambatan (R):</strong> ${r.toFixed(3)} Ω<br>` +
    `<strong>Daya (P):</strong> ${p.toFixed(3)} W`;

  addHistoryLog("Hukum Ohm", `V=${v.toFixed(2)}V, I=${i.toFixed(2)}A, R=${r.toFixed(2)}Ω, P=${p.toFixed(2)}W`);
}

function resetOhmsLaw() {
  document.getElementById('ohm-v').value = '';
  document.getElementById('ohm-i').value = '';
  document.getElementById('ohm-r').value = '';
  document.getElementById('ohm-p').value = '';
  document.getElementById('ohm-summary').textContent = "Form telah direset.";
}

// Modul 3: Log Riwayat Perhitungan (Daffa Raihan)
function addHistoryLog(moduleName, detailText) {
  const list = document.getElementById('history-list');
  const emptyNotice = list.querySelector('.empty-notice');
  if (emptyNotice) {
    emptyNotice.remove();
  }

  const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const li = document.createElement('li');
  li.innerHTML = `<span><strong>[${timeStr}] ${moduleName}:</strong> ${detailText}</span>`;
  
  list.insertBefore(li, list.firstChild);
}
