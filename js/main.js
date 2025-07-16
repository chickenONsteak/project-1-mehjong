import {
  assignWinds,
  shuffle,
  distributeTiles,
  takeReplacementTiles,
  sortHand,
  playerDetails,
  drawTile,
  throwTile,
  windsInChinese,
} from "./setup.js";
import { allTiles } from "./tiles.js";

let undistributedTiles = [];
let lastThrownTile = [];
const currentPlayer = [];

// // STEP 1: PLAYER ROLLS THE DICE, SHUFFLE TILES, AND REMOVE SPECIAL TILES FROM HAND
// const rollDiceButton = document.querySelector("#roll");
// rollDiceButton.addEventListener("click", () => {
//   rollDiceButton.style.display = "none";
//   assignWinds();
//   setTimeout(() => {
//     // SHUFFLE TILES
//     const shuffledTiles = shuffle(allTiles);
//     undistributedTiles = distributeTiles(shuffledTiles);
//     // TO INCLUDE — TILES ON THE UNDISTRIBUTED TABLE
//     // REMOVE SPECIAL TILES FROM HAND
//     undistributedTiles = takeReplacementTiles(undistributedTiles);
//     // TO INCLUDE — TILES OUTSIDE OF HAND
//   }, 10000);
// });
assignWinds(); // testing purposes

// SHUFFLE TILES
const shuffledTiles = shuffle(allTiles);
undistributedTiles = distributeTiles(shuffledTiles);
// organise undistributed tiles
undistributedTiles.sort((a, b) => a.tileId - b.tileId);
undistributedTiles = takeReplacementTiles(undistributedTiles);
console.log(playerDetails);

// STEP 2: GAME START
let isGameOver = false;
while (!isGameOver) {
  // first player throw (note: only 4x4 rounds to simplify things)
  for (let i = 0; i < winds.length; i++) {
    document.querySelector("#current-wind").innerText = windsInChinese[i];
    for (let j = 0; j < playerDetails.length; j) {
      const sumOfNonSpecialTiles =
        playerDetails[j].tilesInHand.length +
        playerDetails[i].tilesOutsideHand.length;
      if (playerDetails[j].playerName === "Maddy") {
        continue;
      } else {
        if (sumOfNonSpecialTiles === 13) {
          drawTile();
        } else if (sumOfNonSpecialTiles === 14) {
          lastThrownTile = throwTile(playerDetails[j]);
        }
      }
      j++;
    }
  }
  isGameOver = true;
}
