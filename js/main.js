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
  thrownTiles,
  updateUnrevealedTiles,
} from "./setup.js";
import { allTiles } from "./tiles.js";
import { canChi, canPung, canGang, canPingHu } from "./player-logic.js";

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
updateUnrevealedTiles();
// organise undistributed tiles
undistributedTiles.sort((a, b) => a.tileId - b.tileId);
undistributedTiles = takeReplacementTiles(undistributedTiles);
updateUnrevealedTiles();
console.log(playerDetails);

// STEP 2: GAME START
let isGameOver = false;
while (!isGameOver) {
  // first player throw (note: only 4x4 rounds to simplify things)
  let readyToPingHu = false;
  for (let i = 0; i < winds.length; i++) {
    document.querySelector("#current-wind").innerText = windsInChinese[i];
    for (let j = 0; j < playerDetails.length; j) {
      const currentPlayer = playerDetails[j];

      // HANDLING AUTO TOSSING OF TILES FOR CPU AND PLAYER CHOOSING WHAT TILES TO THROW
      const sumOfNonSpecialTiles =
        currentPlayer.tilesInHand.length +
        currentPlayer.tilesOutsideHand.length;
      if (currentPlayer.playerName === "Maddy") {
        continue; // let player pick which tile to throw
      } else {
        if (sumOfNonSpecialTiles === 13) {
          drawTile();
        } else if (sumOfNonSpecialTiles === 14) {
          lastThrownTile = throwTile(currentPlayer);
        }
      }
      // SET TIMER FOR PLAYER TO THINK
      setTimeout(() => {
        j++;
      }, 5000);

      const pingHuButton = document.querySelector("#pingHu");
      pingHuButton.addEventListener("click", () => {
        if (canPingHu()) {
          isGameOver = true;
        } else {
          // press the button again to
        }
      });

      // HANDLING PLAYER CHI / PUNG
      // reveal chi button if canChi
      if (canChi()) {
        // need to store the boolean in a var
        const chiButton = document.querySelector("#chi");
        chiButton.style.display = "grid";
        chiButton.addEventListener("click", () => {
          currentPlayer.tilesOutsideHand.push(lastThrownTile);
          currentPlayer.tilesOutsideHand.push(tile1, tile2); // TODO: declare what tile1 and tile2 are
          thrownTiles.pop();
          lastThrownTile.pop();
        });
      } else {
        document.querySelector("#chi").style.display = "none"; // hide it back
      }

      // reveal pung button if canPung
      if (canPung()) {
        // need to store the boolean in a var
        const pungButton = document.querySelector("#pung");
        pungButton.style.display = "grid";
        pungButton.addEventListener("click", () => {
          currentPlayer.tilesOutsideHand.push(lastThrownTile);
          currentPlayer.tilesOutsideHand.push(tile1, tile2); // TODO: declare what tile1 and tile2 are
          thrownTiles.pop();
          lastThrownTile.pop();
        });
      } else {
        document.querySelector("#pung").style.display = "none"; // hide it back
      }

      //   // DEPRIORITISED
      //   // reveal gang button if canGang
      //   if (canGang()) {
      //     // need to store the boolean in a var
      //     const pungButton = document.querySelector("#gang");
      //     pungButton.style.display = "grid";
      //     pungButton.addEventListener("click", () => {
      //       currentPlayer.tilesOutsideHand.push(lastThrownTile); // TODO: does not cater to own Gang
      //       currentPlayer.tilesOutsideHand.push(tile1, tile2, tile3); // TODO: declare what tile1, tile2, and tile3 are
      //       thrownTiles.pop();
      //       lastThrownTile.pop();
      //     });
      //   } else {
      //     document.querySelector("#pung").style.display = "none"; // hide it back
      //   }

      // canPingHu function
      //   function canPingHu() {

      //   }
    }
  }
  isGameOver = true;
}
