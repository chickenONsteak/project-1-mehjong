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
import { allTiles, winds } from "./tiles.js";
import { canChi, canPung, canGang, canPingHu } from "./player-logic.js";
import {
  populateUnrevealedTable,
  populatePlayersHand,
  populateOpponentHands,
} from "./updateScreens.js";

let undistributedTiles = [];
let lastThrownTile = [];
const currentPlayer = [];
let unrevealedTiles = [];

// STEP 1: PLAYER ROLLS THE DICE, SHUFFLE TILES, AND REMOVE SPECIAL TILES FROM HAND
const rollDiceButton = document.querySelector("#roll");
rollDiceButton.addEventListener("click", () => {
  rollDiceButton.style.display = "none";
  assignWinds();
  setTimeout(() => {
    // SHUFFLE TILES
    const shuffledTiles = shuffle(allTiles);
    undistributedTiles = distributeTiles(shuffledTiles);
    unrevealedTiles = updateUnrevealedTiles(undistributedTiles);
    // DISPLAY TILES ON THE UNREVEALED TABLE
    unrevealedTiles.sort((a, b) => a.tileId - b.tileId);
    populateUnrevealedTable(unrevealedTiles);
    // REMOVE SPECIAL TILES FROM HAND
    undistributedTiles = takeReplacementTiles(undistributedTiles);
    // DISPLAY HANDS
    unrevealedTiles = updateUnrevealedTiles(unrevealedTiles);
    populatePlayersHand();
    populateOpponentHands();
    // UPDATE UNREVEALED TABLE AGAIN
    populateUnrevealedTable(unrevealedTiles);
    console.log(playerDetails);
    console.log(unrevealedTiles.length);
  }, 6000);
});
// assignWinds(); // testing purposes

// // SHUFFLE TILES
// const shuffledTiles = shuffle(allTiles);
// undistributedTiles = distributeTiles(shuffledTiles);
// unrevealedTiles = updateUnrevealedTiles();
// // "bu"
// undistributedTiles = takeReplacementTiles(undistributedTiles);
// // organise unrevealed tiles
// unrevealedTiles = updateUnrevealedTiles();
// unrevealedTiles.sort((a, b) => a.tileId - b.tileId);
// console.log(playerDetails);

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
        continue; // TODO: let player pick which tile to throw
      } else {
        if (sumOfNonSpecialTiles === 13) {
          drawTile();
        } else if (sumOfNonSpecialTiles === 14) {
          lastThrownTile = throwTile(currentPlayer);
          // remove from unrevealed tiles
          const matchedIdx = unrevealedTiles.findIndex(
            (obj) => obj.tileId === lastThrownTile.tileId
          );
          unrevealedTiles.splice(matchedIdx, 1);
        }
      }

      // IF PLAYER PRESS PING HU, PAUSE THE GAME
      const pingHuButton = document.querySelector("#pingHu");
      pingHuButton.addEventListener("click", () => {
        if (canPingHu()) {
          isGameOver = true;
        } else {
          // press the button again to
        }
      });

      // SET TIMER FOR PLAYER TO THINK
      setTimeout(() => {
        j++;
      }, 5000);

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

      // // DEPRIORITISED
      // // reveal pung button if canPung
      // if (canPung()) {
      //   // need to store the boolean in a var
      //   const pungButton = document.querySelector("#pung");
      //   pungButton.style.display = "grid";
      //   pungButton.addEventListener("click", () => {
      //     currentPlayer.tilesOutsideHand.push(lastThrownTile);
      //     currentPlayer.tilesOutsideHand.push(tile1, tile2); // TODO: declare what tile1 and tile2 are
      //     thrownTiles.pop();
      //     lastThrownTile.pop();
      //   });
      // } else {
      //   document.querySelector("#pung").style.display = "none"; // hide it back
      // }

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
