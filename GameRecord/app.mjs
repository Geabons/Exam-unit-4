import game from "./models/Game.mjs";

let storedGames = [];
const gameKey = "";

function saveGameToStorage(gameObject){
    localStorage.setItem(gameKey, importJSONToString(gameObject));
}

function loadGameFromStorage(){
    return localStorage.getItem(gameKey);
}

function retrieveGameFromStorage(){
    return JSON.parse(loadGameFromStorage());
}

function importJSONToString(JSONString){
    return JSON.stringify(JSONString);
}