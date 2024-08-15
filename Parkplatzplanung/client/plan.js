let selectedPlan = {};

function getPlatz(Nummer) {
    return Object.values(selectedPlan).find((platz) => platz.PlatzNr == Nummer)
}

function loadPlan(date) {
    fetch(`/api/plan/${formatDatum(date)}`)
        .then((res) => res.json())
        .then((plan) => {
            selectedPlan = plan;
            Parkplätze_generieren();
            allePlätzeEinsetzen();
        })
        .catch(() => {
            selectedPlan = {};
            Parkplätze_generieren();
        })
}

function savePlatz(platzNummer, pTeam, pName, pVon, pBis) {
    // Verhindere, dass Einträge an vergangenen Tagen durchgeführt werden können.
    if (new Date(selectedDate().toDateString()) < new Date(new Date().toDateString())) {
        Parkplätze_generieren();
        allePlätzeEinsetzen();
        return;
    }
    const query = new URLSearchParams({ platz: platzNummer, pTeam, pName, pVon, pBis });
    fetch(`/api/plan/${formatDatum(selectedDate())}?${query}`, {
        method: "POST",
    });
}

function platzEinsetzen(platzNummer, platz) {
    const platzElement = document.getElementById(platzNummer);
    if (!platzElement) return;
    const card = platzElement.querySelector(".card");
    card.style.boxShadow = `inset -5px -5px 6px rgba(255, 255, 255, 0.2),
        5px 5px 8px rgba(0, 0, 0, 0.1),
        -5px -5px 15px rgba(255, 255, 255, 0.8)`;
    card.style.background = `var(--team${platz.PTeam}-color)`;
    const name = platzElement.querySelector("select");
    name.value = platz.PName;
    const vonTime = platzElement.querySelectorAll("input[type='time']")[0];
    vonTime.value = platz.PVon;
    const bisTime = platzElement.querySelectorAll("input[type='time']")[1];
    bisTime.value = platz.PBis;
}

function allePlätzeEinsetzen() {
    Object.keys(selectedPlan).forEach((platzNummer) => {
        const platz = selectedPlan[platzNummer];
        platzEinsetzen(platzNummer, platz);
    });
}

function formatDatum(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const host = window.location.host;
const ws = new WebSocket(`ws://${host}`);
ws.onmessage = (event) => {
    const {date, platz} = JSON.parse(event.data);
    const platzNummer = platz.PlatzNr;
    if (date !== formatDatum(selectedDate())) return;
    selectedPlan[platzNummer] = platz;
    platzEinsetzen(platzNummer, platz);
};