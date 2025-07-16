// function throwTile(playerHand) {
//   // selected tile is spliced out of the array
//   // selected tile appears in the middle of the table
// }

import { playerDetails } from "./setup";

// FUNCTION FOR CHI
function canChi(currentIndex) {
  let previousPlayerIndex;
  if ((currentIndex = 0)) {
    previousPlayerIndex = playerDetails.length - 1;
  } else {
    previousPlayerIndex = currentIndex - 1;
  }
  const previousPlayer = playerDetails[previousPlayerIndex];
  // if previous player threw a character tile
  if (
    currentPlayer === previousPlayer &&
    lastThrownTile.tileId > 0 &&
    lastThrownTile.tileId < 30
  ) {
    // check if there's sequence in hand
    let tile1;
    let tile2;
    // RETURN TILE1 & TILE2
    for (let i = 0; i < currentPlayer.tileInHand.length; i++) {
      let currentTile = currentPlayer.tileInHand[i];
      if (lastThrownTile.tileId === currentTile.tileId + 1) {
        for (let j = 0; j < currentPlayer.tileInHand.length; j++) {
          if (
            lastThrownTile.tileId ===
            currentPlayer.tileInHand[j].tileId + 2
          ) {
            return true;
          }
        }
      } else if (lastThrownTile.tileId === currentTile.tileId + 2) {
        for (let j = 0; j < currentPlayer.tileInHand.length; j++) {
          if (
            lastThrownTile.tileId ===
            currentPlayer.tileInHand[j].tileId + 1
          ) {
            return true;
          }
        }
      } else if (lastThrownTile.tileId === currentTile.tileId - 1) {
        for (let j = 0; j < currentPlayer.tileInHand.length; j++) {
          if (
            lastThrownTile.tileId ===
            currentPlayer.tileInHand[j].tileId - 2
          ) {
            return true;
          }
        }
      } else if (lastThrownTile.tileId === currentTile.tileId - 2) {
        for (let j = 0; j < currentPlayer.tileInHand.length; j++) {
          if (
            lastThrownTile.tileId ===
            currentPlayer.tileInHand[j].tileId - 1
          ) {
            return true;
          }
        }
      } else {
        return false;
      }
    }
  }
}

// FUNCTION FOR PUNG
function canPung() {
  let duplicateCount = 0;
  for (tiles of currentPlayer.tileInHand) {
    if (tiles.tileId === lastThrownTile.tileId) {
      duplicateCount++;
    }
  }
  if (duplicateCount === 2) {
    return true;
  } else {
    return false;
  }
}

// FUNCTION FOR GANG
function canGang() {
  let duplicateCount = 0;
  for (tiles of currentPlayer.tileInHand) {
    if (tiles.tileId === lastThrownTile.tileId) {
      duplicateCount++;
    }
  }
  if (duplicateCount === 3) {
    return true;
  } else {
    return false;
  }
}

// FUNCTION FOR PING HU
function canPingHu() {
  let setCount = 0;
  // count number of complete sets outside of hand
  setCount = currentPlayer.tilesOutsideHand.length / 3;
  // count number of complete sets in hand
  const pingHuButton = document.querySelector("#pingHu");
  pingHuButton.addEventListener("click", () => {
    pingHuButton.innerText.toggle("No ping hu :(");
    document.querySelector("#message-board").innerText =
      "Please select your sets of 3 first";
  }); // let user select tiles
  // if the 3 tiles indeed form a set, then setCount++ — ELSE show message "select an appropriate tile"
  // once setCount = 4, prompt to select a matching pair — if no valid pair, show message "doesn't seem like you can ping hu"
}

export { canChi, canPung, canGang };
