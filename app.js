// ElectroCalc Web - Core Script
console.log("ElectroCalc Web Initialized - Resistor & Ohm's Law Modules Active");

document.addEventListener('DOMContentLoaded', () => {
  // Event listener modul resistor
  const btnCalcResistor = document.getElementById('btn-calc-resistor');
  if (btnCalcResistor) {
    btnCalcResistor.addEventListener('click', calculateResistor);
  }

  // Event listener modul hukum ohm
  const btnOhm = document.getElementById('btn-calc-ohm');
  const btnResetOhm = document.getElementById('btn-reset-ohm');
  if (btnOhm) btnOhm.addEventListener('click', calculateOhmsLaw);
  if (btnResetOhm) btnResetOhm.addEventListener('click', resetOhmsLaw);
});

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

  if (window.addHistoryLog) {
    window.addHistoryLog("Kalkulator Resistor", `Nilai: ${displayVal} (Toleransi ±${tol}%)`);
  }
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

  if (window.addHistoryLog) {
    window.addHistoryLog("Hukum Ohm", `V=${v.toFixed(2)}V, I=${i.toFixed(2)}A, R=${r.toFixed(2)}Ω, P=${p.toFixed(2)}W`);
  }
}

function resetOhmsLaw() {
  document.getElementById('ohm-v').value = '';
  document.getElementById('ohm-i').value = '';
  document.getElementById('ohm-r').value = '';
  document.getElementById('ohm-p').value = '';
  document.getElementById('ohm-summary').textContent = "Form telah direset.";
}
