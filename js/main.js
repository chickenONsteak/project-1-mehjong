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
  pause,
  playerInFocus,
} from "./updateScreens.js";

let undistributedTiles = [];
let lastThrownTile = [];
const discardedTiles = [];
let unrevealedTiles = structuredClone(allTiles); // deep copy allTiles

// STEP 1: PLAYER ROLLS THE DICE, SHUFFLE TILES, AND REMOVE SPECIAL TILES FROM HAND
const rollDiceButton = document.querySelector("#roll");
const message = document.querySelector("#message-board");
rollDiceButton.addEventListener("click", () => {
  rollDiceButton.style.display = "none";
  assignWinds();
  setTimeout(() => {
    // SHUFFLE TILES
    const shuffledTiles = shuffle(allTiles);
    undistributedTiles = distributeTiles(shuffledTiles);
    // REMOVE SPECIAL TILES FROM HAND
    undistributedTiles = takeReplacementTiles(undistributedTiles);
    // DISPLAY TILES ON THE UNREVEALED TABLE
    updateUnrevealedTiles(unrevealedTiles);
    unrevealedTiles.sort((a, b) => a.tileId - b.tileId);
    populateUnrevealedTable(unrevealedTiles);
    // DISPLAY HANDS
    populatePlayersHand();
    populateOpponentHands();
    document.querySelector("#start").style.display = "grid";
  }, 6000);
});

// STEP 2: GAME START
// wrap everything as an async function so I can utilise await to pause after tiles are thrown
document.querySelector("#start").addEventListener("click", async () => {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#discarded-tiles").style.display = "grid";
  let windsCompleted = 0;
  let roundsCompleted = 0;
  // only 4x4 rounds to simplify things
  while (windsCompleted < 4) {
    document.querySelector("#current-wind").innerText =
      windsInChinese[windsCompleted];
    while (roundsCompleted < 4) {
      // first player throw
      for (let i = 0; i < playerDetails.length; i++) {
        const currentPlayer = playerDetails[i];
        lastThrownTile.length = 0; // reset
        // HIGHLIGHT CURRENT PLAYER
        playerInFocus(i + 1);
        // HANDLING AUTO TOSSING OF TILES FOR CPU AND PLAYER CHOOSING WHAT TILES TO THROW
        const sumOfNonSpecialTiles =
          currentPlayer.tilesInHand.length +
          currentPlayer.tilesOutsideHand.length;
        if (currentPlayer.playerName === "Maddy") {
          // PLAYER CHOOSES WHICH TILE TO THROW
          document
            .querySelector("#unrevealed-tiles1")
            .addEventListener("click", (event) => {
              const discardedImg = event.target;
              let discardedId = discardedImg.id.split("-")[1];
              const discardedIdx = currentPlayer.tilesInHand.findIndex(
                (obj) => obj.tileId === discardedId
              );
              lastThrownTile.push(currentPlayer.tilesInHand[discardedIdx]);
              // REMOVE FROM HAND
              currentPlayer.tilesInHand.splice(discardedIdx, 1);
              // REMOVE THE IMG
              document.querySelector(`#${discardedImg.id}`).remove();
            });

          // CHI
          if (canChi(i, lastThrownTile)) {
            document.querySelector("#chi").style.display = "grid";
            message.innerText = "Select 2 tiles from your hand";
            const selectedSet = [];
            // SELECT 2 APPROPRIATE TILES IN HAND
            if (selectedSet.length < 2) {
              document
                .querySelector("#unrevealed-tiles1")
                .addEventListener("click", (event) => {
                  const tileImg = event.target;
                  const tileIdStr = parseInt(tileImg.id.split("-")[1]);
                  const tileIdx = currentPlayer.tilesInHand.findIndex(
                    (obj) => obj.tileId === tileIdStr
                  );

                  selectedSet.push(currentPlayer.tilesInHand[tileIdx]);
                });
              // IF ALREADY SELECTED 2, CHECK IF THE THROWN TILE INDEED FORMS A SET
            } else if (selectedSet.length === 2) {
              // REMOVE FROM HAND
              currentPlayer.tilesInHand = currentPlayer.tilesInHand.filter(
                (obj) => !selectedSet.some((tile) => tile.tileId === obj.tileId)
              );
              populatePlayersHand();
              selectedSet.push(lastThrownTile);
              selectedSet.sort((a, b) => a.tileId - b.tileId);
              if (
                selectedSet[0].tileId + 1 === selectedSet[1].tileId &&
                selectedSet[1].tileId + 1 === selectedSet[2].tileId
              ) {
                discardedTiles.pop();
                // POPULATE THE IMG
              }
            }
          }
          if (lastThrownTile.length === 1) {
            continue;
          }
        } else {
          if (sumOfNonSpecialTiles === 13) {
            drawTile(currentPlayer, undistributedTiles);
          }
          if (sumOfNonSpecialTiles === 14) {
            lastThrownTile = throwTile(currentPlayer, discardedTiles);
            // REMOVE FROM UNREVEALED TILES
            const matchedIdx = unrevealedTiles.findIndex(
              (obj) => obj.tileId === lastThrownTile.tileId
            );
            const img = document.querySelector(`#id-${lastThrownTile.tileId}`);
            img.remove();
            unrevealedTiles.splice(matchedIdx, 1);
            console.log(currentPlayer.tilesInHand.length);
            updateUnrevealedTiles(unrevealedTiles);
          }
          // PAUSE FOR PLAYER TO THINK
          await pause(5000);
          // UPDATE FOCUS BACK
          document.querySelector(`#result${i + 1}`).style.border =
            "1.5px solid black";
        }
      }
      if (undistributedTiles.length < 8) {
        roundsCompleted++;
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
    }
    windsCompleted++;
    roundsCompleted = 0;
  }
});
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
