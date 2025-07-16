import {
  assignWinds,
  shuffle,
  distributeTiles,
  takeReplacementTiles,
  sortHand,
} from "./setup.js";

const undistributedTiles = [];
const lastThrownTile = [];
const currentPlayer = [];

// PLAYER ROLLS THE DICE
const rollDiceButton = document.querySelector("#roll");
rollDiceButton.addEventListener("click", () => {
  rollDiceButton.style.display = "none";
  assignWinds();
});
