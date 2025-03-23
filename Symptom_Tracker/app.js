document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('symptom-form');
  const severityInput = document.getElementById('symptom-severity');
  const severityValue = document.getElementById('severity-value');
  const symptomList = document.getElementById('symptom-list');
  let symptoms = [];

  // Update severity value live
  severityInput.addEventListener('input', () => {
    severityValue.textContent = severityInput.value;
  });

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('symptom-name').value.trim();
    const date = document.getElementById('symptom-date').value;
    const severity = severityInput.value;
    const notes = document.getElementById('symptom-notes').value.trim();

    if (!name || !date) {
      alert("Please fill in the symptom name and date.");
      return;
    }

    const symptom = { name, date, severity, notes };
    symptoms.push(symptom);
    renderSymptoms();
    form.reset();
    severityValue.textContent = '5'; // reset slider display
    severityInput.value = 5;
  });

  // Render all symptoms
  function renderSymptoms() {
    symptomList.innerHTML = '';
    symptoms.forEach((symptom, index) => {
      const entry = document.createElement('div');
      entry.classList.add('symptom-entry');
      entry.innerHTML = `
        <h3>${symptom.name}</h3>
        <p><strong>Date:</strong> ${symptom.date}</p>
        <p><strong>Severity:</strong> ${symptom.severity}</p>
        <p><strong>Notes:</strong> ${symptom.notes || "None"}</p>
        <button onclick="deleteSymptom(${index})">Delete</button>
      `;
      symptomList.appendChild(entry);
    });
  }

  // Make delete function global
  window.deleteSymptom = function (index) {
    symptoms.splice(index, 1);
    renderSymptoms();
  };
});
