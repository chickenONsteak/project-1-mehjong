// Create classes to generate tiles
class GenerateBaseTiles {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }
}

function createTiles(variations, type, numCopies) {
  const tiles = [];
  for (let i = 0; i < variations.length; i++) {
    for (let j = 0; j < numCopies; j++) {
      const newTile = new GenerateBaseTiles(variations[i], type);
      tiles.push(newTile);
    }
  }
  return tiles;
}

const allTiles = [];
const characters = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const dragon = ["hong zhong", "bai ban", "fa cai"];
const animal = ["cat", "mouse", "rooster", "centipede"];

const suoZi = createTiles(characters, "suo", 4);
console.log(suoZi);
// // create character tiles
// const suoZi = createCharacterTiles("suo");
// const tongZi = createCharacterTiles("tong");
// const wanZi = createCharacterTiles("wan");
// // create dragon tiles
// const dragon = [
//   new GenerateBaseTiles("hong zhong", "dragon", 4),
//   new GenerateBaseTiles("bai ban", "dragon", 4),
//   new GenerateBaseTiles("fa cai", "dragon", 4),
// ];
// // create wind tiles
// const wind = [
//   new GenerateBaseTiles("dong", "wind", 4),
//   new GenerateBaseTiles("nan", "wind", 4),
//   new GenerateBaseTiles("xi", "wind", 4),
//   new GenerateBaseTiles("bei", "wind", 4),
// ];
// // create animal tiles
// const animal = [
//   new GenerateBaseTiles("cat", "animal", 1),
//   new GenerateBaseTiles("mouse", "animal", 1),
//   new GenerateBaseTiles("rooster", "animal", 1),
//   new GenerateBaseTiles("centipede", "animal", 1),
// ];
