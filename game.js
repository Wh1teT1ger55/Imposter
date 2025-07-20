let jsonData = [];
let playerArr =[];
let playerCount = 0;
let nextPlayerI = 0;
let wordCount = jsonData.length;



// Wird durch "Start"-Button aufgerufen
async function loadJSON() {
    const response = await fetch('data.json'); // Pfad zur JSON-Datei
    jsonData = await response.json(); // JSON-Daten in der globalen Variable speichern
    wordCount = jsonData.length;
    startRound();
}


// Random Zahl von min bis max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hideElement(id) {
    document.getElementById(id).classList.add("hidden"); 
}

function showElement(id) {
    document.getElementById(id).classList.remove("hidden")
}

// Random Crew Wort welches in das Spielerverzeichnis (playerArr) hinzugefügt wird
function crewWord(wordNum) {
    randomWord = jsonData[wordNum]["wort"];
    playerArr.push(`{"crew": "${randomWord}"}`);
    console.log("Du bist ein Crew Mate");
    console.log("Wort: " + randomWord);
}

// Das gleiche bei den Impostern
function imposterWord(wordNum) {
    randomHelpNum = getRandomInt(0, 2);     // 1 aus 3 Hilfswörtern wird gezogen
    randomHelp = jsonData[wordNum]["hilfswoerter"][randomHelpNum];
    playerArr.push(`{"imposter": "${randomHelp}"}`);
    console.log("Du bist ein IMPOSTER");
    console.log("Hilfswort: " + randomHelp);
}

function nextPlayer() {
    let wordField = document.getElementById("word");
    if (nextPlayerI >= 0) {
        let activePlayer = JSON.parse(playerArr[nextPlayerI]);
        if ("crew" in activePlayer) {
            hideElement("imposter");
            document.getElementById("card").classList.remove("card-red"); 
            showElement("crewmate");
            wordField.innerText = `Wort: ${activePlayer.crew}`;
            console.log("Wort:", activePlayer.crew);
        } else if ("imposter" in activePlayer) {
            hideElement("crewmate");
            showElement("imposter");
            document.getElementById("card").classList.add("card-red"); 
            wordField.innerText = `Hilfswort: ${activePlayer.imposter}`;
            console.log("Hilfswort:", activePlayer.imposter);
        }
        console.log("nextPlayerI:", nextPlayerI);
        nextPlayerI--;
    } else {
        hideElement("in-game");
        showElement("after-game");
    }
}

function resetToDefault() {
    showElement("pre-game");
    hideElement("in-game");
    hideElement("after-game");
    showElement("start-game");
}

// Allgemeine Spielfunktion / Main Funktion
function startRound() {
    hideElement("pre-game");
    showElement("in-game")     // Einstellungen werden ausgeblendet
    let randomWordNum = getRandomInt(0, wordCount - 1);     // Random Nummer für "jsonData" Array --> Random Wort
    playerCount = parseInt(document.getElementById("player-count").value);      // Spieleranzahl aus Form auslesen
    console.log(playerCount);    
    nextPlayerI = playerCount - 1;                       
    let imposterCount = parseInt(document.getElementById("imposter-count").value);  // Imposteranzahl aus Form auslesen
    console.log(imposterCount);
    let crewCount = playerCount - imposterCount;
    if (imposterCount > playerCount) {
        imposterCount = 1;
    }
    for (let i = 0; i < playerCount; i++) {
        if (imposterCount > 0 && crewCount > 0) {
            if (Math.random() < 0.5) {
                imposterWord(randomWordNum);
                imposterCount--;
            } else {
                crewWord(randomWordNum);
                crewCount--;
            }
        } else if (imposterCount == 0) {
            crewWord(randomWordNum);
        } else if (crewCount == 0) {
            imposterWord(randomWordNum);
        }
    }
    nextPlayer();
    showElement("next")
    console.log(playerArr);        
}




document.addEventListener("DOMContentLoaded", () => {
    resetToDefault();
});