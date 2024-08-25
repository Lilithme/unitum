const UG1 = [16];
const UG2 = [125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 152];
const Glaspalast = [4, 5, 13];
const AllParkplatzbereich = [UG1, UG2, Glaspalast];

function Parkplätze_generieren() {
	let Parkplatzliste = document.querySelectorAll(".ParkplatzContainer");
	for (let i = 0; i < Parkplatzliste.length; i++) {
		const ParkplatzContainer = Parkplatzliste[i];
		const Parkbereich = AllParkplatzbereich[i];

		// Wenn die Elemente schon existieren, sollen sie nur zurück gesetzt werden
		// Das erlaubt das abspielen Animationen
		let elementeExistierenBereits = ParkplatzContainer.children.length > 0;
		for (let j = 0; j < Parkbereich.length; j++) {
			const PlatzNr = Parkbereich[j];
			if (elementeExistierenBereits) {
				clearParkplatz(PlatzNr);
			} else {
				const CardContainer = generiereParkplatz(PlatzNr);
				ParkplatzContainer.appendChild(CardContainer);
			}
		}
	}
	Namensbefüllung(AllTeams[selectedTeam - 1]);
}

function clearParkplatz(Nummer) {
	const platzElement = document.getElementById(Nummer);
	if (!platzElement) throw new Error(`Platz ${Nummer} nicht gefunden`);

	const pCard = platzElement.querySelectorAll(".card")[0];
	pCard.style = undefined;
	const pName = platzElement.querySelectorAll("select")[0];
	pName.value = "";
	const pVonTime = platzElement.querySelectorAll("input[type='time']")[0];
	pVonTime.value = "";
	const pBisTime = platzElement.querySelectorAll("input[type='time']")[1];
	pBisTime.value = "";

	const sCard = platzElement.querySelectorAll(".card")[1];
	sCard.style = undefined;
	sCard.classList.remove("ausgeklappt");
	const sName = platzElement.querySelectorAll("select")[1];
	sName.value = "";
	const sVonTime = platzElement.querySelectorAll("input[type='time']")[2];
	sVonTime.value = "";
	const sBisTime = platzElement.querySelectorAll("input[type='time']")[3];
	sBisTime.value = "";
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

	if ((platz && platz.PVon && platz.PBis)) {
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
	PCard.onclick = function () {
		let planPlatz = getPlatz(Nummer);
		if (!planPlatz?.PTeam || planPlatz?.PTeam == "") {
			const platz = getPlatz(Nummer);
			savePlatz(
				Nummer,
				selectedTeam,
				PSelect.value,
				PVon.value,
				PBis.value,
				platz?.STeam,
				SSelect.value,
				SVon.value,
				SBis.value
			);
		}
		if (planPlatz && planPlatz.PTeam == selectedTeam) {
			const platz = getPlatz(Nummer);
			savePlatz(Nummer, "", "", "", "", platz?.STeam, SSelect.value, SVon.value, SBis.value);
		}
	};
	//Stoppt den Klick durch die Karte durch wenn man Namen usw aufwählt - verhindert, dass Karte wieder abgewählt wird.
	PSelect.onclick = function (e) {
		e.stopPropagation();
	};
	PSelect.onchange = function () {
		const platz = getPlatz(Nummer);
		savePlatz(
			Nummer,
			selectedTeam,
			PSelect.value,
			PVon.value,
			PBis.value,
			platz?.STeam,
			SSelect.value,
			SVon.value,
			SBis.value
		);
	};
	PVon.onclick = function (e) {
		e.stopPropagation();
	};
	PVon.onchange = function () {
		const platz = getPlatz(Nummer);
		savePlatz(
			Nummer,
			selectedTeam,
			PSelect.value,
			PVon.value,
			PBis.value,
			platz?.STeam,
			SSelect.value,
			SVon.value,
			SBis.value
		);
	};
	PBis.onclick = function (e) {
		e.stopPropagation();
	};
	PBis.onchange = function () {
		const platz = getPlatz(Nummer);
		savePlatz(
			Nummer,
			selectedTeam,
			PSelect.value,
			PVon.value,
			PBis.value,
			platz?.STeam,
			SSelect.value,
			SVon.value,
			SBis.value
		);
	};

	// SEKUNDÄR CLICKS & CHANGES
	SCard.onclick = function () {
		let planPlatz = getPlatz(Nummer);
		if (!planPlatz?.STeam || planPlatz?.STeam == "") {
			const platz = getPlatz(Nummer);
			savePlatz(
				Nummer,
				platz.PTeam,
				PSelect.value,
				PVon.value,
				PBis.value,
				selectedTeam,
				SSelect.value,
				SVon.value,
				SBis.value
			);
		}
		if (planPlatz && planPlatz.STeam == selectedTeam ) {
			const platz = getPlatz(Nummer);
			savePlatz(Nummer, platz.PTeam, PSelect.value, PVon.value, PBis.value, "", "", "", "");
		}
	};
	SSelect.onclick = function (e) {
		e.stopPropagation();
	};
	SSelect.onchange = function () {
		const platz = getPlatz(Nummer);
		savePlatz(
			Nummer,
			platz.PTeam,
			PSelect.value,
			PVon.value,
			PBis.value,
			selectedTeam,
			SSelect.value,
			SVon.value,
			SBis.value
		);
	};
	SVon.onclick = function (e) {
		e.stopPropagation();
	};
	SVon.onchange = function () {
		const platz = getPlatz(Nummer);
		savePlatz(
			Nummer,
			platz.PTeam,
			PSelect.value,
			PVon.value,
			PBis.value,
			selectedTeam,
			SSelect.value,
			SVon.value,
			SBis.value
		);
	};
	SBis.onclick = function (e) {
		e.stopPropagation();
	};
	SBis.onchange = function () {
		const platz = getPlatz(Nummer);
		savePlatz(
			Nummer,
			platz.PTeam,
			PSelect.value,
			PVon.value,
			PBis.value,
			selectedTeam,
			SSelect.value,
			SVon.value,
			SBis.value
		);
	};

	return CardContainer;
}
