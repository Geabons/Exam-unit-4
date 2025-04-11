import game from "./models/Game.mjs";

let storedGames = [];
const gameKey = "";

function saveGameToStorage(gameObject) {
  localStorage.setItem(gameKey, importJSONToString(gameObject));
}

function loadGameFromStorage() {
  return localStorage.getItem(gameKey);
}

function retrieveGameFromStorage() {
  return JSON.parse(loadGameFromStorage());
}

function importJSONToString(JSONString) {
  return JSON.stringify(JSONString);
}

document.getElementById("importSource").onchange = function (e) {
  const file = e.target.files[0];
  let fileReader = new FileReader();
  fileReader.onload = function (event) {
    saveGameToStorage(event.target.result);
    //visualRecord
  };
  fileReader.onerror = function (event) {
    console.error("Error with reading file: ", event.target.error);
  };
  fileReader.readAsText(file);
};
