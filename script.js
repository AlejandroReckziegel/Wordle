let palabra;
fetch("https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase")
    .then(response => response.json())
    .then(response => {
        palabra = response[0]
    })
    .catch(error => {
        let diccionario = ["APPLE", "AMBER", "BEACH", "BRAVE", "CLEAN", "CHAIR", "DREAM", "DRINK",
            "EARTH", "EMAIL", "FROST", "FLAME", "GHOST", "GREAT", "HOUSE", "HEART", "INERT", "IMAGE",
            "JOINT", "JUDGE"]
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)]
    });
let intentos = 6;
const INTENTAR = document.getElementById("guess-button");
const NUEVOJUEGO = document.getElementById("play-again-button");
const INPUT = document.getElementById("guess-input");

INPUT.addEventListener("input", () => {
    if (INPUT.value.length == 5) {
        INTENTAR.disabled = false;
    } else {
        INTENTAR.disabled = true;
    }
});

INTENTAR.addEventListener("click", () => {
    let intento = INPUT.value.toUpperCase();
    intentos--
    if (intento === palabra) {
        terminar("GANASTE!");
    } else if (intentos == 0) {
        terminar("Perdiste... la palabra era: " + palabra);
    }
    document.getElementById("attempts-left").innerHTML = "Intentos restantes: " + intentos;

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    for (let i in palabra) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        if (intento[i] === palabra[i]) {
            SPAN.innerHTML = intento[i];
            SPAN.style.color = "#00ff00";
            SPAN.style.border = "3px solid #00ff00";
            SPAN.style.background = "#005000";
        } else if (palabra.includes(intento[i])) {
            SPAN.innerHTML = intento[i];
            SPAN.style.color = "#ffff00";
            SPAN.style.border = "3px solid #ffff00";
            SPAN.style.background = "#505000";
        } else {
            SPAN.innerHTML = intento[i];
            SPAN.style.color = "#f0f0f0";
            SPAN.style.border = "3px solid #f0f0f0";
            SPAN.style.background = "#505050";
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    INPUT.value = "";
    INTENTAR.disabled = true;
});

function terminar(mensaje) {
    document.getElementById("guess-input").disabled = true;
    document.getElementById('guesses').innerHTML = mensaje;
    INTENTAR.style.display = "none";
    NUEVOJUEGO.style.display = "block";
}

NUEVOJUEGO.addEventListener("click", () => {
    location.reload();
});