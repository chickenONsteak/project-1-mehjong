// function throwTile(playerHand) {
//   // selected tile is spliced out of the array
//   // selected tile appears in the middle of the table
// }

import { playerDetails } from "./setup.js";

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

// FUNCTION TO REMOVE TILES FROM HAND WHEN SELECTING SETS DURING PING HU PHASE
function removeSelectedSets(player, formedSet) {
  const playerHand = player.tileInHand;
  for (let i = 0; i < formedSet; i++) {
    for (let j = 0; j < playerHand.length; j++)
      if (formedSet[i].tileId === playerHand[j].tileId) {
        playerHand.splice(j, 1);
        break;
      }
  }
}

// FUNCTION FOR PING HU
function canPingHu() {
  let setCount = 0;
  const selectedSet = [];
  const messageBoard = document.querySelector("#message-board");
  // count number of complete sets outside of hand
  setCount = currentPlayer.tilesOutsideHand.length / 3;
  // count number of complete sets in hand
  const pingHuButton = document.querySelector("#pingHu");
  pingHuButton.addEventListener("click", () => {
    pingHuButton.innerText.toggle("Sike");
    messageBoard.innerText = `Please select your sets of 3 first, you have ${setCount} sets so far`;
  });

  const playerHands = document.querySelector("#first-hand"); // TODO: CHANGE #FIRST-HAND TO THE SPECIFIC TILE, NOT THE ENTIRE ROW
  playerHands.addEventListener("click", (event) => {
    const selectedTile = event.target;

    // SELECT THE SETS OF 3 FIRST
    if (setCount < 4) {
      if (selectedSet.length < 2) {
        selectedSet.push(selectedTile);
      } else {
        const thirdSelectedTile = event.target;
        // sort the selected tiles and check if it's a legitimate set
        selectedSet.push(thirdSelectedTile).sort((a, b) => a - b);
        const middleTileId = selectedSet[1].tileId;
        if (
          middleTileId + 1 === selectedSet[2].tileId &&
          middleTileId - 1 === selectedSet[0].tileId
        ) {
          setCount++;
          messageBoard.innerText = `You have ${setCount} sets so far`;
        } else if (
          middleTileId === selectedSet[0].tileId &&
          middleTileId === selectedSet[2].tileId
        ) {
          setCount++;
          // remove set from hand
          const maddysIdx = playerDetails.findIndex(
            (obj) => obj.playerName === "Maddy"
          );
          removeSelectedSets(playerDetails[maddysIdx], selectedSet);
          selectedSet.length = 0; // empty out the array since a set has been formed
          messageBoard.innerText = `You have ${setCount} sets so far`;
        } else {
          messageBoard.innerText = `Please select the correct tiles to form a set, or press "Sike" and redo`;
        }
      }
    } else {
      // SELECT THE EYES AFTER THERE ARE 4 SETS OF 3
      messageBoard.innerText = "Now select a matching pair";
      selectedSet.push(selectedTile);
      if (selectedSet[0].tileId === selectedTile.tileId) {
        return true;
      }
    }
  });
  // let user select tiles
  // if the 3 tiles indeed form a set, then setCount++ — ELSE show message "select an appropriate tile"
  // once setCount = 4, prompt to select a matching pair — if no valid pair, show message "doesn't seem like you can ping hu"
}

export { canChi, canPung, canGang, canPingHu };
