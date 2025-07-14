import { allTiles } from "./tiles.js";

let player1;
let player2;
let player3;
let player4;

// Roll dice and determine which player goes first
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function compareDiceRoll() {
  const diceRolls = [];
  for (let i = 1; i <= 4; i++) {
    const obj = { player: i, roll: rollDice() };
    diceRolls.push(obj);
  }

  diceRolls.sort((a, b) => b.roll - a.roll);
  return diceRolls;
}

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

// function distributeTiles() {}

const arr = compareDiceRoll();
console.log(arr);
