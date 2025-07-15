import { allTiles, winds } from "./tiles.js";

const players = ["Maddy", "Yen", "Yi Lin", "Shuwei"]; // CONTAINS: consolidated player names
const playerDetails = []; // CONTAINS: player order, player names, and assigned wind

// ROLL DICE AND DETERMINE WHICH PLAYER GOES FIRST
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

// ASSIGN WINDS ACCORDING TO WHO GOES FIRST ETC
function assignWinds() {
  // FIRSTLY: sort the dice rolls
  // the human player is always the 1st roller
  const diceRolls = [];
  for (let i = 0; i < players.length; i++) {
    const obj = { roller: players[i], rollResults: rollDice() };
    diceRolls.push(obj);
  }
  diceRolls.sort((a, b) => b.rollResults - a.rollResults);

  // NEXT: the order is determined by the roll results, with player1 being the person who rolled the highest
  for (let i = 0; i < players.length; i++) {
    let temporary = players[i];
    players[i] = diceRolls[i].roller;
    diceRolls[i].roller = temporary;
  }

  // FINALLY: assign winds to the players
  for (let i = 0; i < players.length; i++) {
    const obj = {
      player: i + 1,
      playerName: players[i],
      assignedWind: winds[i],
      tilesInHand: [],
      tilesOutsideHand: [],
      tai: 0,
    };
    playerDetails.push(obj);
  }
}

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
          undrawnTiles.splice(0, 2);
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
          currentPlayer.tilesOutsideHand.push(currentPlayer.tilesInHand[j]);
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

function sortHand(playerInfo) {
  playerInfo.tilesInHand.sort((a, b) => a.tileId - b.tileId);
}

assignWinds();
// console.log(playerDetails);
const shuffledTiles = shuffle(allTiles);
let undistributedTiles = distributeTiles(shuffledTiles);
for (let i = 0; i < playerDetails.length; i++) {
  sortHand(playerDetails[i]);
  console.log(playerDetails[i].tilesInHand);
}
undistributedTiles = takeReplacementTiles(undistributedTiles);
console.log(undistributedTiles);
for (let i = 0; i < playerDetails.length; i++) {
  console.log(playerDetails[i].tilesInHand);
  console.log(playerDetails[i].tilesOutsideHand);
}
