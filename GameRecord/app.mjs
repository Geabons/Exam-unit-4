import game from "./models/Game.mjs";

let storedGames = [];
const gameKey = "gameEntries";

function saveGameToStorage(gameObject) {
  localStorage.setItem(
    gameKey,
    typeof gameObject !== "string" ? importJSONToString(gameObject) : gameObject
  );
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

document.getElementById("importSource").addEventListener("change", function () {
  const file = this.files[0];
  let fileReader = new FileReader();
  fileReader.onload = function (event) {
    storedGames = JSON.parse(event.target.result);
    saveGameToStorage(storedGames);
    displayBoardGames();
  };
  fileReader.onerror = function (event) {
    console.error("Error with reading file: ", event.target.error);
  };
  fileReader.readAsText(file);
});

function displayBoardGames() {
  let displayElement = document.getElementById("gameEntryDisplayElement");
  if (displayElement) {
    let htmlBuffer = "";
    for (let i = 0; i < storedGames.length; i++) {
      htmlBuffer += createGameEntry(i);
    }
    displayElement.innerHTML = htmlBuffer;
    editor();
  } else {
    throw new Error("HTML Display Element does not exist...");
  }
}

function createGameEntry(index) {
  const ENTRY = storedGames[index];
  let fieldName, fieldValue;
  const FIELD_NAMES = Object.keys(ENTRY);
  let res = "";
  for (let i = 0; i < FIELD_NAMES.length; i++) {
    fieldName = FIELD_NAMES[i];
    fieldValue = ENTRY[fieldName];
    let fieldType = "text";
    if (fieldName === "personalRating") {
      fieldType = "range";
    } else if (fieldName === "playCount") {
      fieldType = "number";
    }
    res += createGameEntryField(index, fieldName, fieldValue, fieldType);
  }
  return `<div class="gameEntry">${res}</div>`;
}

function createGameEntryField(index, fieldName, fieldValue, fieldType) {
  return `<div class="gameEntryField"><label>${fieldName}</label><input type="${fieldType}" value="${fieldValue}" data-fieldName="${fieldName}" data-index="${index}" /></div>`;
}

function editor() {
  let listOfAllInputFields = document.querySelectorAll(
    "#gameEntryDisplayElement input"
  );
  for (let i = 0; i < listOfAllInputFields.length; i++) {
    let inputField = listOfAllInputFields[i];
    inputField.addEventListener("input", function (e) {
      let inputElement = e.target;
      let fieldName = inputElement.getAttribute("data-fieldName");
      let gameEntryIndex = inputElement.getAttribute("data-index");
      storedGames[gameEntryIndex][fieldName] = inputElement.value;
      saveGameToStorage(storedGames);
    });
  }
}
