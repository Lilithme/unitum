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

    PCard.onclick = function() {
        let planPlatz = getPlatz(Nummer);
        if (!planPlatz?.PTeam) {
            savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value)
        }
        if (planPlatz && planPlatz.PTeam == selectedTeam) {
            savePlatz(Nummer, "", "", "", "")
        }
    }
    PSelect.onclick = function(e) { e.stopPropagation() }
    PSelect.addEventListener("change", function() {
        savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value)
    });
    PVon.onclick = function(e) { e.stopPropagation() }
    PVon.onchange = function(){
        savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value)
    }
    PBis.onclick = function(e) { e.stopPropagation() }
    PBis.onchange = function(){
        savePlatz(Nummer, selectedTeam, PSelect.value, PVon.value, PBis.value)
    }
   
    return CardContainer;
}
