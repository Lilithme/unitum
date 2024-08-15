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

//Sidebar aufklappen/einklappen
const toggle = document.querySelector(".toggle"),
    main = document.querySelector(".main"),
    sidebar = document.querySelector(".sidebar");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    main.classList.toggle("sidebar-ausgeklappt")
})

// Generiert die KW Einträge
let KW_Liste = document.querySelector(".KW_Liste");
kwDaten.forEach((kw) => {
    let KWText = document.createElement("h3");
    KWText.innerText = kw.kw;
    if (kw.kw == selectedKW) KWText.classList.add("active");
    KW_Liste.appendChild(KWText);
    KWText.onclick = function () {
        selectKW(kw.kw);
        KWText.classList.add("active");
    };
});

// Generiert die Tag Einträge
let Tag_Liste = document.querySelector(".Tag_Liste");
const wochentage = ["MO", "DI", "MI", "DI", "FR"];
wochentage.forEach((Tag, i) => {
    let Tagtext = document.createElement("h3");
    Tagtext.innerText = Tag;
    if (i == selectedTag) Tagtext.classList.add("active");
    Tag_Liste.appendChild(Tagtext);
    Tagtext.onclick = function () {
        selectTag(i);
        Tagtext.classList.add("active");
    };
});

// 14:10 Einspielung der neuen KW,
//zweite Zeile erscheint erst wenn in erster Zeile etwas drin steht - darf nicht verschwinden, wenn in der ersten etwas verschwindet
// TLs sollen Parkplätze blockieren und alle Löschen können
