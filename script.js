// Lädt alle Tracker aus localStorage
function loadTrackers() {
  const trackers = JSON.parse(localStorage.getItem('trackers')) || [];
  const trackerContainer = document.getElementById('tracker-container');
  trackerContainer.innerHTML = ''; // Leeren vor dem Hinzufügen

  trackers.forEach((tracker, index) => {
    const trackerButton = document.createElement('button');
    trackerButton.textContent = tracker.title;
    trackerButton.onclick = () => selectTracker(index);
    trackerContainer.appendChild(trackerButton);
  });
}

// Speichert den neuen Tracker
function saveCleanDateTime() {
  const cleanTitle = document.getElementById('cleanTitle').value;
  const cleanDate = document.getElementById('cleanDate').value;
  const cleanTime = document.getElementById('cleanTime').value;

  if (cleanTitle && cleanDate && cleanTime) {
    const cleanDateTime = `${cleanDate}T${cleanTime}:00`; // ISO-Format
    const newTracker = {
      title: cleanTitle,
      dateTime: cleanDateTime
    };

    let trackers = JSON.parse(localStorage.getItem('trackers')) || [];
    trackers.push(newTracker);
    localStorage.setItem('trackers', JSON.stringify(trackers));

    loadTrackers();
    toggleModal();
  } else {
    alert("Bitte alle Felder ausfüllen.");
  }
}

// Wählt einen Tracker aus und berechnet die Zeit
function selectTracker(index) {
  const trackers = JSON.parse(localStorage.getItem('trackers'));
  const selectedTracker = trackers[index];

  document.getElementById('tracker-title').textContent = selectedTracker.title;
  localStorage.setItem('currentTracker', index);
  document.getElementById('head').style.display = 'none';
  document.getElementById('container').style.display = 'flex';
  calculateTimeClean();
}

// Berechnet die Zeit und Fortschritte für den ausgewählten Tracker
function calculateTimeClean() {
  const trackers = JSON.parse(localStorage.getItem('trackers')) || [];
  const currentTrackerIndex = localStorage.getItem('currentTracker');

  if (currentTrackerIndex !== null) {
    const selectedTracker = trackers[currentTrackerIndex];
    const cleanDateTime = new Date(selectedTracker.dateTime);
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

    // Fortschritt für Tage, Stunden, Minuten, Sekunden
    const dayProgress = (diffDays / 365) * 100;
    const hourProgress = (diffHours / 24) * 100;
    const minuteProgress = (diffMinutes / 60) * 100;
    const secondProgress = (diffSeconds / 60) * 100;

    // Update Progress Bars
    document.querySelector('.time-item:nth-child(1) .progress').style.width = dayProgress + '%';
    document.querySelector('.time-item:nth-child(2) .progress').style.width = hourProgress + '%';
    document.querySelector('.time-item:nth-child(3) .progress').style.width = minuteProgress + '%';
    document.querySelector('.time-item:nth-child(4) .progress').style.width = secondProgress + '%';
  }
}

// Setzt den aktuellen Tracker zurück
function resetCleanDateTime() {
  const currentTrackerIndex = localStorage.getItem('currentTracker');
  let trackers = JSON.parse(localStorage.getItem('trackers')) || [];

  if (currentTrackerIndex !== null) {
    trackers.splice(currentTrackerIndex, 1);
    localStorage.setItem('trackers', JSON.stringify(trackers));
    localStorage.removeItem('currentTracker');
    loadTrackers();
    resetDisplay();
  }
}

// Setzt das Display zurück
function resetDisplay() {
  document.getElementById('tracker-title').textContent = 'Tracker Name';
  document.getElementById('days').textContent = 0;
  document.getElementById('hours').textContent = 0;
  document.getElementById('minutes').textContent = 0;
  document.getElementById('seconds').textContent = 0;

  // Setze die Progress Bars zurück
  document.querySelector('.time-item:nth-child(1) .progress').style.width = '0%';
  document.querySelector('.time-item:nth-child(2) .progress').style.width = '0%';
  document.querySelector('.time-item:nth-child(3) .progress').style.width = '0%';
  document.querySelector('.time-item:nth-child(4) .progress').style.width = '0%';
  document.getElementById('container').style.display = 'none';
  document.getElementById('reset-modal').style.display = 'none';
  document.getElementById('head').style.display = 'flex';
}

// Toggle für Navigation und Modal
function toggleNav() {
  const nav = document.getElementById('nav');
  const navbtn = document.getElementById('navbtn');
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
    navbtn.src = 'icons/menu.svg';
    navbtn.style.transform = 'rotate(0deg)';
  } else {
    nav.style.display = 'flex';
    navbtn.src = 'icons/close.svg';
    navbtn.style.transform = 'rotate(180deg)';
  }
}

function toggleModal() {
  const modal = document.getElementById('modal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function toggleDisplay() {
  const head = document.getElementById('head');
  const container = document.getElementById('container');
  if (head.style.display === 'flex') {
    head.style.display = 'none';
    container.style.display = 'flex';
  } else {
    head.style.display = 'flex';
    container.style.display = 'none';
  }
}

function toggleResetModal() {
  const modal = document.getElementById('reset-modal');
  if (modal.style.display === 'flex') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
  }
}

// Lädt Tracker beim Start
window.onload = function() {
  loadTrackers();
  setInterval(calculateTimeClean, 1000);
};
