// AT LANDING PAGE

import { playerDetails } from "./setup.js";

// PLAYER PRESS START
document.querySelector("#start-button").addEventListener("click", () => {
  document.querySelector("#landing-page").style.display = "none";
  document.querySelector("#game-start").style.display = "grid";
});

// PLAYER PRESS HOW TO PLAY

// DISPLAY UNREVEALED TILES
function populateUnrevealedTable(unrevealedTiles) {
  const unrevealedTable = document.querySelector("#undistributed-tiles");
  for (let i = 0; i < unrevealedTiles.length; i++) {
    const unrevealedTileImg = unrevealedTiles[i].imageURI;
    const newImg = document.createElement("img");
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
    newImg.src = tileURI;
    newImg.alt = `tile value ${tile.tileId}`; // not accessible but no time
    newImg.height = 40;
    playerHands.appendChild(newImg);
  }
  // populate special tiles
  for (let tile of playerDetails[indexOfMaddy].specialTiles) {
    const tileURI = tile.imageURI;
    const newImg = document.createElement("img");
    newImg.src = tileURI;
    newImg.alt = `tile value ${tile.tileId}`; // not accessible but no time
    newImg.height = 25;
    specialTiles.appendChild(newImg);
  }

  // populate outside hand
  // populate special tiles
}

export { populateUnrevealedTable, populatePlayersHand };
