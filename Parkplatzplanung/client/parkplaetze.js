const UG1 = [{
    PlatzNr: 16,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}]

const UG2 = [{
    PlatzNr: 125,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 126,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 127,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 128,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 129,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 130,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 131,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 132,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 133,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 134,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 135,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 152,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}]

const Glaspalast = [{
    PlatzNr: 4,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 5,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}, {
    PlatzNr: 13,
    Geblockt: false,
    PName: "",
    PTeam: "",
    PVon: "",
    PBis: "",
    SName: "",
    STeam: "",
    SVon: "",
    SBis: "",
}]

const AllParkplatzbereich = [UG1, UG2, Glaspalast];

function Parkplätze_generieren() {
    let Parkplatzliste = document.querySelectorAll(".ParkplatzContainer")
    for (let i = 0; i < Parkplatzliste.length; i++) {
        const ParkplatzContainer = Parkplatzliste[i];
        ParkplatzContainer.innerHTML = "";

        const Parkbereich = AllParkplatzbereich[i];
        for (let j = 0; j < Parkbereich.length; j++) {
            const Parkplatz = Parkbereich[j];
            const CardContainer = generiereParkplatz(Parkplatz.PlatzNr);
            ParkplatzContainer.appendChild(CardContainer);
        }
    }
    Namensbefüllung(AllTeams[selectedTeam - 1]);
}



function generiereParkplatz(Nummer) {
    let CardContainer = document.createElement("div");
    CardContainer.classList.add("CardContainer");
    CardContainer.id = Nummer;

    // PRIMÄR
    let PCard = document.createElement("div");
    PCard.classList.add("card");
    CardContainer.appendChild(PCard);

    let PContent = document.createElement("div");
    PContent.classList.add("content");
    PCard.appendChild(PContent);

    let Title = document.createElement("h3");
    Title.innerText = "Platz-Nr. " + Nummer;
    PContent.appendChild(Title);

    let PSelect = document.createElement("select");
    PContent.appendChild(PSelect);

    let PLabel = document.createElement("label");
    PLabel.innerText = "Uhrzeit";
    PContent.appendChild(PLabel);

    let PVon = document.createElement("input");
    PVon.type = "time";
    PContent.appendChild(PVon);

    let PBis = document.createElement("input");
    PBis.type = "time";
    PContent.appendChild(PBis);

    // SEKUNDÄR
    let SCard = document.createElement("div");
    SCard.classList.add("card");
    SCard.classList.add("sec");
    const platz = getPlatz(Nummer);
    console.log(Nummer, !!(platz && !!platz.PTeam && platz.PTeam != "") || !!(platz && !!platz.STeam && platz.STeam != ""));
    
    if ((platz && !!platz.PTeam && platz.PTeam != "") || (platz && !!platz.STeam && platz.STeam != "")) {
        SCard.classList.add("ausgeklappt");
    } else {
        SCard.classList.remove("ausgeklappt");
    }
    CardContainer.appendChild(SCard);

    let SContent = document.createElement("div");
    SContent.classList.add("content");
    SCard.appendChild(SContent);

    let SSelect = document.createElement("select");
    SContent.appendChild(SSelect);

    let SLabel = document.createElement("label");
    SLabel.innerText = "Uhrzeit";
    SContent.appendChild(SLabel);

    let SVon = document.createElement("input");
    SVon.type = "time";
    SContent.appendChild(SVon);

    let SBis = document.createElement("input");
    SBis.type = "time";
    SContent.appendChild(SBis);

    // PRIMÄR CLICKS & CHANGES
    PCard.onclick = function() {
        let planPlatz = getPlatz(Nummer);
        if (!planPlatz?.PTeam || planPlatz?.PTeam == "") {
            const platz = getPlatz(Nummer);
            savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value, platz?.STeam, SSelect.value, SVon.value, SBis.value);
        }
        if (planPlatz && planPlatz.PTeam == selectedTeam) {
            const platz = getPlatz(Nummer);
            savePlatz(Nummer, "", "", "", "", platz?.STeam, SSelect.value, SVon.value, SBis.value);
        }
    }
    PSelect.onclick = function(e) { e.stopPropagation() }
    PSelect.onchange = function() {
        const platz = getPlatz(Nummer);
        savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value, platz?.STeam, SSelect.value, SVon.value, SBis.value);
    };
    PVon.onclick = function(e) { e.stopPropagation() }
    PVon.onchange = function(){
        const platz = getPlatz(Nummer);
        savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value, platz?.STeam, SSelect.value, SVon.value, SBis.value);
    }
    PBis.onclick = function(e) { e.stopPropagation() }
    PBis.onchange = function(){
        const platz = getPlatz(Nummer);
        savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value, platz?.STeam, SSelect.value, SVon.value, SBis.value);
    }

    // SEKUNDÄR CLICKS & CHANGES
    SCard.onclick = function() {
        let planPlatz = getPlatz(Nummer);
        if (!planPlatz?.STeam || planPlatz?.STeam == "") {
            const platz = getPlatz(Nummer);
            savePlatz(Nummer, platz.PTeam, PSelect.value, PVon.value, PBis.value, selectedTeam, SSelect.value, SVon.value, SBis.value);
        }
        if (planPlatz && planPlatz.STeam == selectedTeam) {
            const platz = getPlatz(Nummer);
            savePlatz(Nummer, platz.PTeam, PSelect.value, PVon.value, PBis.value, "", "", "", "");
        }
    }
    SSelect.onclick = function(e) { e.stopPropagation() }
    SSelect.onchange = function() {
        const platz = getPlatz(Nummer);
        savePlatz(Nummer, platz.PTeam, PSelect.value, PVon.value, PBis.value, selectedTeam, SSelect.value, SVon.value, SBis.value);
    };
    SVon.onclick = function(e) { e.stopPropagation() }
    SVon.onchange = function(){
        const platz = getPlatz(Nummer);
        savePlatz(Nummer, platz.PTeam, PSelect.value, PVon.value, PBis.value, selectedTeam, SSelect.value, SVon.value, SBis.value);
    }
    SBis.onclick = function(e) { e.stopPropagation() }
    SBis.onchange = function(){
        const platz = getPlatz(Nummer);
        savePlatz(Nummer, platz.PTeam, PSelect.value, PVon.value, PBis.value, selectedTeam, SSelect.value, SVon.value, SBis.value);
    }

    return CardContainer;
}
