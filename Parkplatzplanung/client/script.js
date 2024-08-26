
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
const wochentage = ["MO", "DI", "MI", "DO", "FR"];
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

//----------- Objekte mit Team Bezeichnungen und MA ------------------------------------------------

let isAdmin = false;
let selectedTeam = window.localStorage.getItem("gewähltesTeam");
if (selectedTeam == undefined) {
    window.location.replace("/login.html");
}
if (selectedTeam == "7") {
    isAdmin = true;
    selectedTeam = "1";
}

const Team1 = {
    Teambezeichnung: "Team1",
    Mitarbeiter: ['Mathias', 'Julia', 'Matthias', 'Samantha', 'Manu', 'Steffi']
};

const Team2 = {
    Teambezeichnung: "Team2",
    Mitarbeiter: ['Data', 'Worf', 'Jean-Luc', 'Saru', 'Seven']
};

const Team3 = {
    Teambezeichnung: "Team4",
    Mitarbeiter: ['Harry', 'Ste', 'Barbara', 'Tamy', 'Olga', 'Mathias G.']
};

const Team4 = {
    Teambezeichnung: "Team5",
    Mitarbeiter: ['Tealc', 'Janet', 'Jack', 'Daniel', 'Samantha']
};

const Team5 = {
    Teambezeichnung: "Team6",
    Mitarbeiter: ['Aragon', 'Gandalf', 'Sauron', 'Legolas', 'Galadriel', 'Frodo', 'Gimli']
};

const Team6 = {
    Teambezeichnung: "Team8",
    Mitarbeiter: ['Aragon', 'Tealc', 'Anakin', 'Data', 'Harry']
};

const Team0 = {
    Teambezeichnung: "Teamleiter",
    Mitarbeiter: ['Aragon', 'Tealc', 'Anakin', 'Data', 'Harry']
};

const AllTeams = [Team1, Team2, Team3, Team4, Team5, Team6]

function Namensbefüllung(Team) {
    let CardContainerList = document.querySelectorAll('.CardContainer')
    let allNames = [...Team1.Mitarbeiter, ...Team2.Mitarbeiter, ...Team3.Mitarbeiter, ...Team4.Mitarbeiter, ...Team5.Mitarbeiter]
    for (let j = 0 ; j < CardContainerList.length; j++){
        const CardContainer = CardContainerList[j];
        const planPlatz = getPlatz(CardContainer.id);
        const PSelect = CardContainer.querySelectorAll("select")[0];
        const PVon = CardContainer.querySelectorAll("input[type='time']")[0];
        const PBis = CardContainer.querySelectorAll("input[type='time']")[1];
        const SSelect = CardContainer.querySelectorAll("select")[1];
        const SVon = CardContainer.querySelectorAll("input[type='time']")[2];
        const SBis = CardContainer.querySelectorAll("input[type='time']")[3];
        if (planPlatz && planPlatz.PTeam && planPlatz.PTeam != selectedTeam) {
            PSelect.disabled = true;
            PVon.disabled = true;
            PBis.disabled = true;
        } else {
            PSelect.disabled = false;
            PVon.disabled = false;
            PBis.disabled = false;
        }
        
        if (planPlatz && parseInt(planPlatz.STeam) && parseInt(planPlatz.STeam) != selectedTeam) {
            SSelect.disabled = true;
            SVon.disabled = true;
            SBis.disabled = true;
        } else {
            SSelect.disabled = false;
            SVon.disabled = false;
            SBis.disabled = false;
        }
        PSelect.innerHTML = "<option value=''>Name wählen</option>";
        SSelect.innerHTML = "<option value=''>Name wählen</option>";
        for (let i = 0; i < allNames.length; i++) {
            const Name = allNames[i];
            let Option = document.createElement("option")
            Option.innerText = Name
            Option.value = Name
            // Blende den Namen aus, wenn er nicht teil des aktuellen Teams ist
            if (!AllTeams[selectedTeam - 1].Mitarbeiter.includes(Name)) {
                Option.style.display = "none";
            }
            PSelect.appendChild(Option);
        }
        for (let i = 0; i < allNames.length; i++) {
            const Name = allNames[i];
            let Option = document.createElement("option")
            Option.innerText = Name
            Option.value = Name
            // Blende den Namen aus, wenn er nicht teil des aktuellen Teams ist
            if (!AllTeams[selectedTeam - 1].Mitarbeiter.includes(Name)) {
                Option.style.display = "none";
            }
            SSelect.appendChild(Option);
        }
    }
    allePlätzeEinsetzen();
}


let Navigation = document.querySelectorAll('.nav-link')
for (let i = 0; i < Navigation.length; i++) {
    const NavLink = Navigation[i];
    const Team = AllTeams[i];
    const Teammitglieder = document.createElement("ul")
    NavLink.insertAdjacentElement('afterend', Teammitglieder);
    Teammitglieder.classList.add("name-liste")
    for (let i = 0; i < Team.Mitarbeiter.length; i++) {
        const Name = Team.Mitarbeiter[i];
        let Teammitglied = document.createElement("li")
        Teammitglied.innerText = Name
        Teammitglied.value = Name
        Teammitglieder.appendChild(Teammitglied);
    }
    NavLink.onclick = function(){
        let NamenListen = document.querySelectorAll(".name-liste")
        Array.from(NamenListen).forEach((Liste) => {
            Liste.classList.remove("sichtbar");
        });
        Teammitglieder.classList.toggle("sichtbar")
        if (isAdmin == true) {
            selectedTeam = i + 1
        }

        Namensbefüllung(AllTeams[i]);
    }
}
loadPlan(selectedDate())


// Logout 

const Logoutbutton = document.querySelector(".Logout")
Logoutbutton.addEventListener("click", () => {

    window.localStorageStorage.removeItem("gewähltesTeam")
    window.location.replace("/login.html");

});

// Dark & Light Mode

const DarkLightMode = document.querySelector("input.input");

// Überprüfe, ob das Element existiert
if (DarkLightMode) {
    let light = true;

    DarkLightMode.addEventListener("click", () => {
        if (light) {
            // Setze die Farben für den "dunkleren" Modus
            document.documentElement.style.setProperty('--body-color', '#131416');
            document.documentElement.style.setProperty('--sidebar-color', '#18181e');
            document.documentElement.style.setProperty('--text-color', '#969696');
            document.documentElement.style.setProperty('--primary-shadow-color', '#080809')
            document.documentElement.style.setProperty('--primary-shadow-color-light', '#1e2023')
            document.documentElement.style.setProperty('--background-container-color', '#18181e')
            document.documentElement.style.setProperty('--team-color', 'rgb(89 97 111)')
            document.documentElement.style.setProperty('--kw-color', 'rgb(89 97 111)')
            
        } else {
            // Setze die Farben zurück in den "helleren" Modus
            document.documentElement.style.setProperty('--body-color', 'rgb(240, 239, 239)');
            document.documentElement.style.setProperty('--sidebar-color', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#5f5f5f');
            document.documentElement.style.setProperty('--primary-shadow-color', 'rgba(0, 0, 0, 0.1)')
            document.documentElement.style.setProperty('--primary-shadow-color-light', 'rgba(255, 255, 255, 0.8)')
            document.documentElement.style.setProperty('--background-container-color', 'rgb(240, 239, 239)')
            document.documentElement.style.setProperty('--team-color', '#ffffff')
            document.documentElement.style.setProperty('--kw-color', 'rgb(206, 218, 219)')
        }
        // Umschalten des Modus
        light = !light;
    });
} else {
    console.error("Das Element 'label.toggle' wurde nicht gefunden.");
}
