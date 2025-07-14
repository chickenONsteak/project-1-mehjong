import { allTiles, characters, winds, dragons, animals } from "./tiles.js";

const players = ["Maddy", "Yen", "Yi Lin", "Shuwei"]; // CONTAINS: consolidated player names
const playerDetails = []; // CONTAINS: player order, player names, and assigned wind

// ROLL DICE AND DETERMINE WHICH PLAYER GOES FIRST
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

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
  let lastPlayerHandTiles = playerDetails[playerDetails.length - 1].tilesInHand;
  while (lastPlayerHandTiles.length < 13) {
    if (lastPlayerHandTiles.length < 12) {
      for (let i = 0; i < playerDetails.length; i++) {
        playerDetails[i].tilesInHand.push(
          undrawnTiles[0],
          undrawnTiles[1],
          undrawnTiles[2],
          undrawnTiles[3]
        );
        undrawnTiles.splice(0, 4);
      }
    } else if (lastPlayerHandTiles.length === 12) {
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
}

assignWinds();
console.log(playerDetails);
// console.log(allTiles);
distributeTiles(shuffle(allTiles));
console.log(playerDetails[0].tilesInHand);
