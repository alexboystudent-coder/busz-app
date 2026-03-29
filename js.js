// menetrend adatok
const menetrend = [
    { t: "05:25", d: "Városháza" },
    { t: "05:55", d: "Vasútállomás" },
    { t: "06:50", d: "Városháza" },
    { t: "08:05", d: "Vasútállomás" },
    { t: "08:50", d: "Városháza" },
    { t: "10:05", d: "Vasútállomás" },
    { t: "10:50", d: "Városháza" },
    { t: "11:05", d: "Vasútállomás" },
    { t: "12:05", d: "Vasútállomás" },
    { t: "12:45", d: "Városháza" },
    { t: "13:05", d: "Vasútállomás" },
    { t: "13:20", d: "Vasútállomás" },
    { t: "13:45", d: "Városháza" },
    { t: "14:05", d: "Vasútállomás" },
    { t: "14:45", d: "Városháza" },
    { t: "15:05", d: "Vasútállomás" },
    { t: "15:45", d: "Városháza" },
    { t: "16:05", d: "Vasútállomás" },
    { t: "16:50", d: "Városháza" },
    { t: "17:05", d: "Vasútállomás" },
    { t: "18:05", d: "Vasútállomás" },
    { t: "18:50", d: "Városháza" },
    { t: "19:05", d: "Vasútállomás" },
    { t: "20:05", d: "Városháza" },
    { t: "22:40", d: "Városháza" }
];

// idő átalakítás percekre
function timeToMinutes(t) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

// visszaszámláló szín
function getCountdownColor(diff) {
    if (diff > 15) return "green";
    if (diff > 10) return "yellow";
    return "red";
}

// következő busz frissítése
function updateBus() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const currentSeconds = now.getSeconds();

    let nextBus = menetrend.find(bus => timeToMinutes(bus.t) > currentMinutes);

    if (nextBus) {
        const busMinutes = timeToMinutes(nextBus.t);
        const totalSecondsLeft = (busMinutes - currentMinutes) * 60 - currentSeconds;

        const hoursLeft = Math.floor(totalSecondsLeft / 3600);
        const minutesLeft = Math.floor((totalSecondsLeft % 3600) / 60);
        const secondsLeft = totalSecondsLeft % 60;

        let countdownText = "";
        if (hoursLeft > 0) {
            countdownText = `${hoursLeft} óra ${minutesLeft} perc ${secondsLeft} mp`;
        } else {
            countdownText = `${minutesLeft} perc ${secondsLeft} mp`;
        }

        document.getElementById('bus-time').innerText = nextBus.t;
        document.getElementById('bus-dest').innerText =
            "Cél: " + nextBus.d + " (" + countdownText + " múlva)";
        
        const diffMinutes = totalSecondsLeft / 60;
        document.getElementById('bus-time').style.color = getCountdownColor(diffMinutes);
    } else {
        document.getElementById('bus-time').innerText = "--:--";
        document.getElementById('bus-dest').innerText = "Ma már nincs több busz.";
        document.getElementById('bus-time').style.color = "white";
    }

    showAllBuses(); // frissítjük a teljes listát is
}

// teljes menetrend lista
function showAllBuses() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const container = document.getElementById("all-buses");
    container.innerHTML = "";

    let nextFound = false;

    menetrend.forEach(bus => {
        const div = document.createElement("div");
        div.textContent = bus.t + " - " + bus.d;

        if (!nextFound && timeToMinutes(bus.t) > currentMinutes) {
            div.classList.add("next");
            nextFound = true;
        }

        container.appendChild(div);
    });
}

// gomb esemény a kézi frissítéshez
document.getElementById("refresh-btn").addEventListener("click", updateBus);

// lenyíló menü gomb esemény
document.getElementById("toggle-buses").addEventListener("click", function() {
    const container = document.getElementById("all-buses");
    container.classList.toggle("collapsed");
    this.textContent = container.classList.contains("collapsed") ? "▼" : "▲";
});

// folyamatos másodperces frissítés
setInterval(updateBus, 1000);

// első betöltés
updateBus();