let contentElements = document.querySelectorAll('.content');

let htmlContent = `
<select name="Name" id="Name">
    <option value="">Name wählen</option>
    <option value="Tamy">Tamy</option>
    <option value="Jason">Jason</option>
</select>
<br>
<label>Uhrzeit</label>
<input type="time">
<input type="time">
`;
contentElements.forEach(element => {
    element.innerHTML += htmlContent;
});


function getWeekNumberAndMonday(d) {
    // Kopiere das übergebene Datum und erhalte den Tag der Woche (0 = Sonntag, 1 = Montag, ...)
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // falls Sonntag, -6 Tage, sonst 1 Tag
    const mondayDate = new Date(d.setDate(diff));

    // Bestimme den ersten Tag des Jahres (1. Januar)
    const yearStart = new Date(d.getFullYear(), 0, 1);
    // Berechne die Differenz in Tagen zwischen dem Montag und dem Jahresanfang
    const weekNo = Math.ceil((((mondayDate - yearStart) / 86400000) + 1) / 7);

    // Rückgabe der Kalenderwoche und des Montags
    return {
        weekNumber: weekNo,
        mondayDate: mondayDate
    };
}

// Verwende die Funktion, um die aktuelle Kalenderwoche und das Datum des Montags zu bekommen
const result = getWeekNumberAndMonday(new Date());
console.log("Aktuelle Kalenderwoche:", result.weekNumber);
console.log("Datum des Montags:", result.mondayDate.toLocaleDateString());



let KW_Liste = document.querySelector('.KW_Liste');

for (let i = -1; i < 6; i++) {
    let KW = document.createElement("h3");
    KW.innerText = "KW" + (result.weekNumber + i);
    KW_Liste.appendChild(KW)
    KW.onclick = function () {
        console.log(result.weekNumber + i)
        DeactivateKW()
        KW.classList.add("active")
    }
}
function DeactivateKW() {
    console.log(KW_Liste.children);
    Array.from(KW_Liste.children).forEach((child) => {
        child.classList.remove("active");
    });
}

let Datum = document.querySelector('.Datum');
let Datumtext = document.createElement("h3")
const formatter = new Intl.DateTimeFormat('de-de', { day: '2-digit', month: '2-digit', year: 'numeric' });
const formattedDate = formatter.format(result.mondayDate);
Datumtext.innerText = formattedDate;
Datum.appendChild(Datumtext)

let Tag_Liste = document.querySelector('.Tag_Liste');
const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"]
wochentage.forEach((Tag) => {
    let Tagtext = document.createElement("h3")
    Tagtext.innerText = Tag
    Tag_Liste.appendChild(Tagtext)
    Tagtext.onclick = function () {
        DeactivateTag()
        Tagtext.classList.add("active")
    }
})
function DeactivateTag() {
    console.log(Tag_Liste.children);
    Array.from(Tag_Liste.children).forEach((child) => {
        child.classList.remove("active");
    });
}