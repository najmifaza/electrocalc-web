// ElectroCalc Web - Core Script
console.log("ElectroCalc Web Initialized - Ohm's Law Module Active");

document.addEventListener('DOMContentLoaded', () => {
  const btnOhm = document.getElementById('btn-calc-ohm');
  const btnReset = document.getElementById('btn-reset-ohm');
  if (btnOhm) btnOhm.addEventListener('click', calculateOhmsLaw);
  if (btnReset) btnReset.addEventListener('click', resetOhmsLaw);
});

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

  // Iterative solver for V, I, R, P
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
}

function resetOhmsLaw() {
  document.getElementById('ohm-v').value = '';
  document.getElementById('ohm-i').value = '';
  document.getElementById('ohm-r').value = '';
  document.getElementById('ohm-p').value = '';
  document.getElementById('ohm-summary').textContent = "Form telah direset.";
}
