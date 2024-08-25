let selectedPlan = {};

function getPlatz(Nummer) {
    return Object.values(selectedPlan).find((platz) => platz.PlatzNr == Nummer)
}

// fetch holt plan .then = danach => liest es als json und danach benutzt den plan zum anzeigen. .catch wenn nicht klappt dann nix anzeigen
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

function savePlatz(platzNummer, pTeam, pName, pVon, pBis, sTeam, sName, sVon, sBis) {
    // Verhindere, dass Einträge an vergangenen Tagen durchgeführt werden können.
    if (new Date(selectedDate().toDateString()) < new Date(new Date().toDateString())) {
        Parkplätze_generieren();
        allePlätzeEinsetzen();
        return;
    }
    const query = new URLSearchParams({ platz: platzNummer, pTeam:parseInt(pTeam) || "", pName, pVon, pBis, sTeam:parseInt(sTeam) || "", sName, sVon, sBis });
    fetch(`/api/plan/${formatDatum(selectedDate())}?${query}`, {
        method: "POST",
    });
}

function platzEinsetzen(platzNummer, platz) {
    const platzElement = document.getElementById(platzNummer);
    if (!platzElement) return;

    // Primäre Karte
    const pCard = platzElement.querySelectorAll(".card")[0];
    const pName = platzElement.querySelectorAll("select")[0];
    const pVonTime = platzElement.querySelectorAll("input[type='time']")[0];
    const pBisTime = platzElement.querySelectorAll("input[type='time']")[1];

    // Sekundäre Karte
    const sCard = platzElement.querySelector(".sec");
    const sName = platzElement.querySelectorAll("select")[1];
    const sVonTime = platzElement.querySelectorAll("input[type='time']")[2];
    const sBisTime = platzElement.querySelectorAll("input[type='time']")[3];

    // Wenn die primäre Karte leer ist, Daten der sekundären Karte in die primäre Karte übernehmen
    if (!platz.PTeam && !platz.PName && !platz.PVon && !platz.PBis && platz.STeam && platz.SName) {
        platz.PTeam = platz.STeam;
        platz.PName = platz.SName;
        platz.PVon = platz.SVon;
        platz.PBis = platz.SBis;

        // Sekundäre Karte leeren
        platz.STeam = "";
        platz.SName = "";
        platz.SVon = "";
        platz.SBis = "";

        // Sekundäre Karte einklappen
        sCard.classList.remove("ausgeklappt");
    }

    // Primäre Karte stylen und Daten setzen
    pCard.style.boxShadow = `inset -5px -5px 6px rgba(255, 255, 255, 0.2),
        5px 5px 8px rgba(0, 0, 0, 0.1),
        -5px -5px 15px rgba(255, 255, 255, 0.8)`;
    pCard.style.background = `var(--team${platz.PTeam}-color)`;
    pName.value = platz.PName;
    pVonTime.value = platz.PVon;
    pBisTime.value = platz.PBis;

    // Sekundäre Karte stylen und Daten setzen (wird geleert, wenn sie übertragen wurde)
    if ((platz && platz.PVon && platz.PBis) || (platz && !!parseInt(platz.STeam))) {
        sCard.classList.add("ausgeklappt");
    } else {
        sCard.classList.remove("ausgeklappt");
    }

    sCard.style.boxShadow = `inset -5px -5px 6px rgba(255, 255, 255, 0.2),
        5px 5px 8px rgba(0, 0, 0, 0.1),
        -5px -5px 15px rgba(255, 255, 255, 0.8)`;
    sCard.style.background = `var(--team${platz.STeam}-color)`;
    sName.value = platz.SName;
    sVonTime.value = platz.SVon;
    sBisTime.value = platz.SBis;
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
    Namensbefüllung(AllTeams[selectedTeam - 1]);
};