function saveCleanDateTime() {
  const cleanDate = document.getElementById('cleanDate').value;
  const cleanTime = document.getElementById('cleanTime').value;

  if (cleanDate && cleanTime) {
    const cleanDateTime = `${cleanDate}T${cleanTime}:00`; // ISO-Format
    localStorage.setItem('cleanDateTime', cleanDateTime);
    calculateTimeClean();
  } else {
    alert("Bitte Datum und Zeit auswählen.");
  }
}

function calculateTimeClean() {
  const savedDateTime = localStorage.getItem('cleanDateTime');
  if (savedDateTime) {
    const cleanDateTime = new Date(savedDateTime);
    const now = new Date();
    const diffTime = Math.abs(now - cleanDateTime);

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    // Setze die Zeit in die entsprechenden Elemente
    document.getElementById('days').textContent = diffDays;
    document.getElementById('hours').textContent = diffHours;
    document.getElementById('minutes').textContent = diffMinutes;
    document.getElementById('seconds').textContent = diffSeconds;

    // Berechne den Fortschritt für Stunden, Minuten und Sekunden
    const hourProgress = (diffHours / 24) * 100; // Prozentwert für Stunden
    const minuteProgress = (diffMinutes / 60) * 100; // Prozentwert für Minuten
    const secondProgress = (diffSeconds / 60) * 100; // Prozentwert für Sekunden

    // Update die Breite der Progress Bars
    document.querySelector('.time-item:nth-child(2) .progress').style.width = hourProgress + '%';
    document.querySelector('.time-item:nth-child(3) .progress').style.width = minuteProgress + '%';
    document.querySelector('.time-item:nth-child(4) .progress').style.width = secondProgress + '%';
  }
}

function resetCleanDateTime() {
  localStorage.removeItem('cleanDateTime');
  document.getElementById('days').textContent = 0;
  document.getElementById('hours').textContent = 0;
  document.getElementById('minutes').textContent = 0;
  document.getElementById('seconds').textContent = 0;

  // Setze die Progress Bars zurück
  document.querySelector('.time-item:nth-child(2) .progress').style.width = '0%';
  document.querySelector('.time-item:nth-child(3) .progress').style.width = '0%';
  document.querySelector('.time-item:nth-child(4) .progress').style.width = '0%';
}

window.onload = function() {
  calculateTimeClean();
  setInterval(calculateTimeClean, 1000);
};
