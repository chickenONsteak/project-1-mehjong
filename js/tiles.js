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

allTiles.push(
  ...createTiles(characters, "suo", 4),
  ...createTiles(characters, "tong", 4),
  ...createTiles(characters, "wan", 4),
  ...createTiles(dragon, "dragon", 4),
  ...createTiles(animal, "animal", 1)
);

export { allTiles };
