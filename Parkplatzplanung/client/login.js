const Button = document.querySelector("button");
const Teambezeichnung = document.querySelector("select")
const Passwort = document.querySelector("input")
const Passworte = ["Team1", "Team2", "Team4", "Team5", "Team6", "Team8", "Admin"]

Button.addEventListener("click", Login)
Passwort.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        Login(); 
    }
});

function Login() {

    if (Passwort.value == Passworte[Teambezeichnung.value - 1]) { //in [steht der Index] - 1 da im array mit 0 gestartet wird unser index aber 1 ausgibt
        
        window.localStorage.setItem("gewähltesTeam", Teambezeichnung.value)
        
        window.location.replace("/");
    }
};

