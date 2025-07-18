import { allTiles, winds } from "./tiles.js";

const windsInChinese = ["东", "南", "西", "北"];
const players = ["Maddy", "Yen", "Yi Lin", "Shuwei"]; // CONTAINS: consolidated player names
const playerDetails = []; // CONTAINS: player order, player names, and assigned wind
const thrownTiles = [];
const unrevealedTiles = [allTiles]; // CONTAINS: tiles that are either undistributed or in opponent's hands

// ROLL DICE AND DETERMINE WHICH PLAYER GOES FIRST
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

// ASSIGN WINDS ACCORDING TO WHO GOES FIRST ETC
function assignWinds() {
  // STEP 1: sort the dice rolls
  // the human player is always the 1st roller
  const diceRolls = [];
  for (let i = 0; i < players.length; i++) {
    const obj = { roller: players[i], rollResults: rollDice() };
    diceRolls.push(obj);
    // display roll results after 0.5s
    setTimeout(() => {
      document.querySelector(`#result${i + 1}`).innerText = obj.rollResults;
    }, 500);
  }
  // STEP 2: the order is determined by the roll results, with player1 being the person who rolled the highest
  diceRolls.sort((a, b) => b.rollResults - a.rollResults);
  for (let i = 0; i < players.length; i++) {
    let temporary = players[i];
    players[i] = diceRolls[i].roller;
    diceRolls[i].roller = temporary;
  }

  // STEP 3: assign winds to the players
  for (let i = 0; i < players.length; i++) {
    const obj = {
      player: i + 1,
      playerName: players[i],
      assignedWind: winds[i],
      tilesInHand: [],
      tilesOutsideHand: [],
      specialTiles: [],
      tai: 0,
    };
    playerDetails.push(obj);
  }

  // [Y, YL, M, S]
  // [M, Y, S, YL]
  // [SW, Y, YL, M]
  // STEP 4: display wind AND turn number
  // firstly, find out what position is Maddy — this is because we want to lock Maddy as the first hand (player's hand)
  const maddysIndex = players.indexOf("Maddy");
  setTimeout(() => {
    document.querySelector("#result1").innerText = windsInChinese[maddysIndex];
    document.querySelector("#turn-order1").innerText =
      windsInChinese[maddysIndex];
  }, 2500);
  setTimeout(() => {
    document.querySelector("#result1").innerText = "Maddy";
  }, 5000);

  // next, fill positions to the right of Maddy
  let handUICounterRight = 2; // Maddy is anchored as first hand
  let handUICounterLeft = 4;
  for (
    let nextPlayerIdx = maddysIndex + 1;
    nextPlayerIdx < players.length;
    nextPlayerIdx++
  ) {
    // due to setTimeout being an async function, created "temp" to temporarily lock in the handUICounterRight for each iteration
    const temp = handUICounterRight;
    // console.log("idx", nextPlayerIdx);
    setTimeout(() => {
      document.querySelector(`#result${temp}`).innerText =
        windsInChinese[nextPlayerIdx];
      document.querySelector(`#turn-order${temp}`).innerText =
        windsInChinese[nextPlayerIdx];
    }, 2500);
    setTimeout(() => {
      document.querySelector(`#result${temp}`).innerText =
        players[nextPlayerIdx];
    }, 5000);
    handUICounterRight++;
  }
  // finally, populating players to the left of Maddy
  for (
    let prevPlayerIdx = maddysIndex - 1;
    prevPlayerIdx >= 0;
    prevPlayerIdx--
  ) {
    // due to setTimeout being an async function, created "temp" to temporarily lock in the handUICounterLeft for each iteration
    const temp = handUICounterLeft;
    setTimeout(() => {
      document.querySelector(`#result${temp}`).innerText =
        windsInChinese[prevPlayerIdx];
      document.querySelector(`#turn-order${temp}`).innerText =
        windsInChinese[prevPlayerIdx];
    }, 2500);
    setTimeout(() => {
      document.querySelector(`#result${temp}`).innerText =
        players[prevPlayerIdx];
    }, 5000);
    handUICounterLeft--;
  }
}
// // firstly, find out what position is Maddy — this is because we want to lock Maddy as the first hand (player's hand)
// let handUICounter = 1; // Maddy is anchored as first hand
// const maddysIndex = players.indexOf("Maddy");
// setTimeout(() => {
//   document.querySelector("#result1").innerText = windsInChinese[maddysIndex];
//   document.querySelector("#turn-order1").innerText = maddysIndex + 1;
// }, 2500);
// setTimeout(() => {
//   document.querySelector("#result1").innerText = "Maddy";
// }, 5000);
// // finally, populate players before AND after Maddy (if she's not the player to go first / last respectively)
// // populating players to the right of Maddy
// for (let i = maddysIndex + 1; i < players.length; i++) {
//   handUICounter++;
//   // due to setTimeout being an async function, created uiPosition to lock in the handUICounter for each iteration
//   const uiPosition = handUICounter;
//   setTimeout(() => {
//     document.querySelector(`#result${uiPosition}`).innerText =
//       windsInChinese[i];
//     document.querySelector(`#turn-order${uiPosition}`).innerText = i + 1;
//   }, 2500);
//   setTimeout(() => {
//     document.querySelector(`#result${uiPosition}`).innerText = players[i];
//   }, 5000);
// }
// // populating players to the left of Maddy
// for (let i = maddysIndex - 1; i >= 0; i--) {
//   handUICounter++;
//   // due to setTimeout being an async function, created uiPosition to lock in the handUICounter for each iteration
//   const uiPosition = handUICounter;
//   setTimeout(() => {
//     document.querySelector(`#result${uiPosition}`).innerText =
//       windsInChinese[i];
//     document.querySelector(`#turn-order${uiPosition}`).innerText = i + 1;
//   }, 2500);
//   setTimeout(() => {
//     document.querySelector(`#result${uiPosition}`).innerText = players[i];
//   }, 5000);
// }

// for (let i = 0; i < players.length; i++) {
//   // skip if Maddy
//   if (i === maddysIndex) {
//     continue;
//   }
//   handUICounter++;
//   // due to setTimeout being an async function, created uiPosition to lock in the handUICounter for each iteration
//   const uiPosition = handUICounter;
//   setTimeout(() => {
//     document.querySelector(`#result${uiPosition}`).innerText =
//       windsInChinese[i];
//     document.querySelector(`#turn-order${uiPosition}`).innerText = i + 1;
//   }, 2500);
// }
// }

// SHUFFLE THE TILES
// use Durstenfeld's version of the Fisher-Yates shuffle
function shuffle(fullSetOfTiles) {
  // note: the condition for the FOR loop to stop = unshuffledIndex > 0
  // this is because for e.g. when there are only 2 items left unshuffled, we will get unshuffledIndex = 1 ->
  // this means that when swapping, the 2nd tile (the last unshuffled tile) will be swapped with a random tile — which can be the 1st or 2nd tile (itself)
  for (
    let unshuffledIndex = fullSetOfTiles.length - 1;
    unshuffledIndex > 0;
    unshuffledIndex--
  ) {
    let randomIndex = Math.floor(Math.random() * (unshuffledIndex + 1));
    [fullSetOfTiles[unshuffledIndex], fullSetOfTiles[randomIndex]] = [
      fullSetOfTiles[randomIndex],
      fullSetOfTiles[unshuffledIndex],
    ];
  }
  return fullSetOfTiles;
}

// DISTRIBUTING THE TILES
function distributeTiles(undrawnTiles) {
  let lastPlayerHandTiles = playerDetails[playerDetails.length - 1].tilesInHand; // we want the distribution to stop once the last player has drawn his/her tiles
  while (lastPlayerHandTiles.length < 13) {
    // players draw 4 tiles at a time until they have 12 tiles
    if (lastPlayerHandTiles.length < 12) {
      for (let i = 0; i < playerDetails.length; i++) {
        // move into player's hands
        playerDetails[i].tilesInHand.push(
          undrawnTiles[0],
          undrawnTiles[1],
          undrawnTiles[2],
          undrawnTiles[3]
        );
        // remove from undistributed tiles
        undrawnTiles.splice(0, 4);
      }
    } else if (lastPlayerHandTiles.length === 12) {
      // once the last player draws his 12th tile, the 1st player draws 2 tiles while others draw 1 tile each
      for (let i = 0; i < playerDetails.length; i++) {
        if (i === 0) {
          playerDetails[i].tilesInHand.push(undrawnTiles[0], undrawnTiles[1]);
          undrawnTiles.splice(0, 2);
        } else {
          playerDetails[i].tilesInHand.push(undrawnTiles[0]);
          undrawnTiles.splice(0, 1);
        }
      }
    }
  }
  // update tile property (distributed) to true
  for (let i = 0; i < playerDetails.length; i++) {
    for (let j = 0; j < playerDetails[i].tilesInHand.length; j++) {
      playerDetails[i].tilesInHand[j].distributed = true;
    }
  }
  return undrawnTiles;
}

// CHECK FOR SPECIAL TILES IN HAND LIKE ANIMAL TILES
function takeReplacementTiles(undrawnTiles) {
  let needToBu = true;
  do {
    needToBu = false; // assume no need to "bu" first
    for (let i = 0; i < playerDetails.length; i++) {
      const currentPlayer = playerDetails[i];
      // total sum of special tiles held by all players — will act as a factor for the switch
      // note: this resets back to 0 after all 4 players have finished their round of "bu"
      let specialTileCount = 0;
      // STEP 1: check player by player for special tiles and push them outside of hand
      // note: loop from the back to prevent skipping over tiles when index shifts
      for (let j = currentPlayer.tilesInHand.length - 1; j >= 0; j--) {
        // if there are special tiles (animal tiles are 51, 52, 53, and 54), push them to outside of the hand
        if (currentPlayer.tilesInHand[j].tileId >= 51) {
          // update tile property (faceUp) to true
          currentPlayer.tilesInHand[j].faceUp = true;
          // move from hand to outside of hand, facing up
          currentPlayer.specialTiles.push(currentPlayer.tilesInHand[j]);
          currentPlayer.tilesInHand.splice(j, 1);
          // STEP 2: draw the num of tiles pushed out of hand from the end of the undistributed tile
          const buTile = undrawnTiles.pop();
          buTile.distributed = true;
          currentPlayer.tilesInHand.push(buTile);
          specialTileCount++;
        }
      }
      // STEP 3: flip back the switch if any of the players had a special tile
      // this is because there is a chance that the "bu" tile might be a special tile again
      if (specialTileCount > 0) {
        needToBu = true;
      }
    }
  } while (needToBu);
  for (let i = 0; i < playerDetails.length; i++) {
    sortHand(playerDetails[i]);
  }
  return undrawnTiles;
}

// to update the tiles that have yet to be revealed
function updateUnrevealedTiles(unrevealedTiles) {
  for (let i = 0; i < playerDetails.length; i++) {
    // remove those from outside of hands first
    for (let tile of playerDetails[i].tilesOutsideHand) {
      for (let j = 0; j < unrevealedTiles.length; j++) {
        if (tile.tileId === unrevealedTiles[j].tileId) {
          unrevealedTiles.splice(j, 1);
          break; // remove once and go to next tile outside hand
        }
      }
    }
    // remove those inside Maddy's hands
    if (playerDetails[i].playerName === "Maddy") {
      for (let tile of playerDetails[i].tilesInHand) {
        for (let j = 0; j < unrevealedTiles.length; j++) {
          if (tile.tileId === unrevealedTiles[j].tileId) {
            unrevealedTiles.splice(j, 1);
            break; // remove once and go to next tile inside Maddy's hand
          }
        }
      }
    }
  }
  return unrevealedTiles;
}

function sortHand(playerInfo) {
  playerInfo.tilesInHand.sort((a, b) => a.tileId - b.tileId);
}

function drawTile(player, undistributedTiles) {
  const frontTile = undistributedTiles.shift();
  if (frontTile >= 51) {
    player.specialTiles.push(frontTile);
    // remove from unrevealedTiles
    const matchedIdx = unrevealedTiles.findIndex(
      (obj) => obj.tileId === frontTile
    );
    unrevealedTiles.splice(matchedIdx, 1);
    drawTile(player);
  } else {
    player.tilesInHand.push(frontTile);
    sortHand(player);
  }
}

function throwTile(player, thrownTiles) {
  const thrownTile =
    player.tilesInHand[Math.floor(Math.random() * player.tilesInHand.length)];
  thrownTiles.push(thrownTile);
  // update CPU hand img
  for (let i = 1; i <= playerDetails.length; i++) {
    if (player.playerName === document.querySelector(`#result${i}`).innerText) {
      const img = document.querySelector("#tile-rear");
      img.remove();
      const newImg = document.createElement("img");
      newImg.id = `id-${thrownTile.tileId}`;
      newImg.src = thrownTile.imageURI;
      newImg.alt = `tile value ${thrownTile.tileId}`;
      newImg.height = 25;
      document.querySelector("#discarded-tiles").appendChild(newImg);
    }
  }
  // update discarded table
  const discardedTable = document.querySelector("#discarded-tiles");
  const discardedTileImg = document.createElement("img");
  discardedTileImg.id = `id-${thrownTile.tileId}`;
  discardedTileImg.src = thrownTile.imageURI;
  discardedTileImg.alt = `tile value ${thrownTile.tileId}`;
  discardedTileImg.height = 25;
  discardedTable.appendChild(discardedTileImg);

  return thrownTile;
}
// assignWinds();
// // console.log(playerDetails);
// const shuffledTiles = shuffle(allTiles);
// let undistributedTiles = distributeTiles(shuffledTiles);
// for (let i = 0; i < playerDetails.length; i++) {
//   sortHand(playerDetails[i]);
//   console.log(playerDetails[i].tilesInHand);
// }
// undistributedTiles = takeReplacementTiles(undistributedTiles);
// console.log(undistributedTiles);
// for (let i = 0; i < playerDetails.length; i++) {
//   console.log(playerDetails[i].tilesInHand);
//   console.log(playerDetails[i].specialTiles);
// }

export {
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
  unrevealedTiles,
};
