let selectedKW = 0;
let selectedTag = 0;

function selectKW(kw) {
	selectedKW = kw;
	Array.from(KW_Liste.children).forEach((child) => {
		child.classList.remove("active");
	});
	updateDatum();
	loadPlan(selectedDate());
}
function selectTag(tag) {
	if (selectedWeek()[tag] === undefined) return;
	selectedTag = tag;
	Array.from(Tag_Liste.children).forEach((child) => {
		child.classList.remove("active");
	});
	updateDatum();
	loadPlan(selectedDate());
}

function selectedWeek() {
	return kwDaten.find((kw) => kw.kw == selectedKW);
}
function selectedDate() {
	return new Date(kwDaten.find((kw) => kw.kw == selectedKW)[selectedTag]);
}

const aktuelleWoche = getWeekData(new Date());
const kleinsterAktuellerWochentag = Math.min(
	...Object.keys(JSON.parse(JSON.stringify(aktuelleWoche)))
		.filter((key) => key !== "kw" && aktuelleWoche[key] !== undefined)
		.map((key) => parseInt(key))
);
selectedKW = aktuelleWoche.kw;
selectedTag = new Date().getDay() - 1;

// Die Kalenderwochen Daten aller Wochen von -1 bis +5
const kwDaten = [];
for (let i = -1; i < 4; i++) {
	let datum = new Date(aktuelleWoche[kleinsterAktuellerWochentag]) ?? new Date();
	datum.setDate(datum.getDate() + i * 7);
	kwDaten.push(getWeekData(datum));
}

updateDatum();

// Setze das ausgewählte Datum auf der Seite
function updateDatum() {
	let Datum = document.querySelector(".Datum");
	let Datumtext = document.createElement("h3");
	const formatter = new Intl.DateTimeFormat("de-de", { day: "2-digit", month: "2-digit", year: "numeric" });
	const formattedDate = formatter.format(selectedDate());
	Datumtext.innerText = formattedDate;
	Datum.innerHTML = "";
	Datum.appendChild(Datumtext);
}

// Gibt die Kalenderwoche und das Datum von Montag - Freitag zurück
// Falls Tage nicht in dem aktuellen Jahr liegen, werden sie nicht angezeigt
function getWeekData(d) {
	const yearStart = new Date(d.getFullYear(), 0, 1);
	const kw = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	const montag = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 1);
	const dienstag = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 2);
	const mittwoch = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 3);
	const donnerstag = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 4);
	const freitag = new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay() + 5);
	return {
		kw,
		0: montag.getFullYear() === d.getFullYear() ? montag : undefined,
		1: dienstag.getFullYear() === d.getFullYear() ? dienstag : undefined,
		2: mittwoch.getFullYear() === d.getFullYear() ? mittwoch : undefined,
		3: donnerstag.getFullYear() === d.getFullYear() ? donnerstag : undefined,
		4: freitag.getFullYear() === d.getFullYear() ? freitag : undefined,
	};
}