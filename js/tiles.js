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
const winds = ["dong", "nan", "xi", "bei"];
const dragons = ["hong zhong", "bai ban", "fa cai"];
const animals = ["cat", "mouse", "rooster", "centipede"];

allTiles.push(
  ...createTiles(characters, "suo", 4),
  ...createTiles(characters, "tong", 4),
  ...createTiles(characters, "wan", 4),
  ...createTiles(winds, "wind", 4),
  ...createTiles(dragons, "dragon", 4),
  ...createTiles(animals, "animal", 1)
);

// note: there are 140 tiles in total here (148 - 8 flowers)
export { allTiles };
