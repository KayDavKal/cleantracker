// Funktion zum Speichern des clean-Datums und der Zeit
function saveCleanDateTime() {
    const cleanDate = document.getElementById('cleanDate').value;
    const cleanTime = document.getElementById('cleanTime').value;

    if (cleanDate && cleanTime) {
        // Datum und Zeit im Local Storage speichern
        const cleanDateTime = `${cleanDate}T${cleanTime}:00`; // ISO-Format
        localStorage.setItem('cleanDateTime', cleanDateTime);
        calculateTimeClean();
    } else {
        alert("Bitte Datum und Zeit auswählen.");
    }
}

// Funktion zum Berechnen der Zeit seit dem clean-Datum und der clean-Zeit
function calculateTimeClean() {
    const savedDateTime = localStorage.getItem('cleanDateTime');
    if (savedDateTime) {
        const cleanDateTime = new Date(savedDateTime);
        const now = new Date();
        const diffTime = Math.abs(now - cleanDateTime); // Differenz in Millisekunden

        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = diffDays;
        document.getElementById('hours').textContent = diffHours;
        document.getElementById('minutes').textContent = diffMinutes;
        document.getElementById('seconds').textContent = diffSeconds;
    }
}

// Funktion zum Zurücksetzen des clean-Datums und der clean-Zeit
function resetCleanDateTime() {
    localStorage.removeItem('cleanDateTime');
    document.getElementById('days').textContent = 0;
    document.getElementById('hours').textContent = 0;
    document.getElementById('minutes').textContent = 0;
    document.getElementById('seconds').textContent = 0;
}

// Beim Laden der Seite prüfen, ob ein clean-Datum und eine clean-Zeit gespeichert ist
window.onload = function() {
    calculateTimeClean();

    // Aktualisierung der Anzeige jede Sekunde
    setInterval(calculateTimeClean, 1000);
};
