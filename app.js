// ElectroCalc Web - Core Script

// Inisialisasi Modul Resistor
document.addEventListener('DOMContentLoaded', () => {
  const btnCalc = document.getElementById('btn-calc-resistor');
  if (btnCalc) {
    btnCalc.addEventListener('click', calculateResistor);
  }
});

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
}
