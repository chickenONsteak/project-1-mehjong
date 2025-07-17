const backOfTileImg = "../assets/back-of-tile.png";

// AT LANDING PAGE

import { playerDetails, unrevealedTiles } from "./setup.js";

// PLAYER PRESS START
document.querySelector("#start-button").addEventListener("click", () => {
  document.querySelector("#landing-page").style.display = "none";
  document.querySelector("#game-start").style.display = "grid";
});

// PLAYER PRESS HOW TO PLAY

// DISPLAY UNREVEALED TILES
// unrevealed tiles will be all tiles excluding Maddy's hand, distributed special tiles, and thrown tiles
function populateUnrevealedTable(allTiles) {
  const maddysIdx = playerDetails.findIndex(
    (obj) => obj.playerName === "Maddy"
  );
  const unrevealedTable = document.querySelector("#undistributed-tiles");
  // use .filter() to filter out tiles already in Maddy's hand first
  let unrevealedTiles = allTiles.filter((obj) => {
    // returns true if match
    const isMatch = playerDetails[maddysIdx].tilesInHand.some(
      (tile) => tile.tileId === obj.tileId
    );
    return !isMatch; // we want to keep only those that didn't match
  });

  // next, user .filter() again to filter out special tiles
  for (let i = 0; i < playerDetails.length; i++) {
    unrevealedTiles.filter((obj) => {
      const isMatch = playerDetails[i].tilesOutsideHand.some(
        (tile) => tile.tileId === obj.tileId
      );
      return !isMatch;
    });
  }

  // now, populate with img
  for (let i = 0; i < unrevealedTiles.length; i++) {
    const unrevealedTileImg = unrevealedTiles[i].imageURI;
    const newImg = document.createElement("img");
    newImg.id = `id-${unrevealedTiles[i].tileId}`;
    newImg.src = unrevealedTileImg;
    newImg.alt = `tile value ${unrevealedTiles[i].tileId}`; // not accessible but no time
    newImg.height = 25;
    unrevealedTable.appendChild(newImg);
  }
}

// DISPLAY MADDY'S HAND
function populatePlayersHand() {
  const playerHands = document.querySelector("#unrevealed-tiles1");
  const specialTiles = document.querySelector("#special-tiles1");
  const indexOfMaddy = playerDetails.findIndex(
    (obj) => obj.playerName === "Maddy"
  );
  // populate inside hand first
  for (let tile of playerDetails[indexOfMaddy].tilesInHand) {
    const tileURI = tile.imageURI;
    const newImg = document.createElement("img");
    newImg.id = `id-${tile.tileId}`;
    newImg.src = tileURI;
    newImg.alt = `tile value ${tile.tileId}`; // not accessible but no time
    newImg.height = 40;
    playerHands.appendChild(newImg);
  }
  // populate special tiles
  for (let tile of playerDetails[indexOfMaddy].specialTiles) {
    const tileURI = tile.imageURI;
    const newImg = document.createElement("img");
    newImg.id = `id-${tile.tileId}`;
    newImg.src = tileURI;
    newImg.alt = `tile value ${tile.tileId}`; // not accessible but no time
    newImg.height = 25;
    specialTiles.appendChild(newImg);
  }
}

function populateOpponentHands() {
  // starting from the 2nd hand
  for (let i = 2; i <= playerDetails.length; i++) {
    // populate the tiles in hand first
    const opponentHands = document.querySelector(`#unrevealed-tiles${i}`);
    const nameOfPlayer = document.querySelector(`#result${i}`).innerText;
    const playerIdx = playerDetails.findIndex(
      (obj) => obj.playerName === nameOfPlayer
    );
    const tileCount = playerDetails[playerIdx].tilesInHand.length;
    for (let j = 0; j < tileCount; j++) {
      const newImg = document.createElement("img");
      newImg.id = "tile-rear";
      newImg.src = backOfTileImg;
      newImg.alt = "rear of tile";
      newImg.height = 40;
      opponentHands.appendChild(newImg);
    }
    // populate special tiles next
    const opponentSpecialTiles = document.querySelector(`#special-tiles${i}`);
    const specialTiles = playerDetails[playerIdx].specialTiles;
    for (let j = 0; j < specialTiles.length; j++) {
      const specialTileImg = document.createElement("img");
      specialTileImg.id = `id-${specialTiles[j].tileId}`;
      specialTileImg.src = specialTiles[j].imageURI;
      specialTileImg.alt = `tile value ${specialTiles[j].tileId}`; // not accessible but no time
      specialTileImg.height = 25;
      opponentSpecialTiles.appendChild(specialTileImg);
    }
  }
}

// FOR PAUSING OF ROUND
function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// FOR FOCUS STYLING
function playerInFocus(currentIdx) {
  console.log(currentIdx);
  const focusBorder = document.querySelector(`#result${currentIdx}`);
  console.log(`#result${currentIdx}`);
  focusBorder.style.border = "8px solid yellow";
}

export {
  populateUnrevealedTable,
  populatePlayersHand,
  populateOpponentHands,
  pause,
  playerInFocus,
};
