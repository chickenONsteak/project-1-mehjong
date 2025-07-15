// Create classes to generate tiles
class GenerateBaseTiles {
  constructor(tileId, distributed = false, faceUp = false) {
    this.tileId = tileId;
    this.distributed = distributed;
    this.faceUp = faceUp;
  }
}

function createTiles(tile, numCopies) {
  const tiles = [];
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < numCopies; j++) {
      const newTile = new GenerateBaseTiles(tile[i]);
      tiles.push(newTile);
    }
  }
  return tiles;
}

const allTiles = [];
const suoZi = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // yi suo, er suo, ...
const tongZi = [11, 12, 13, 14, 15, 16, 17, 18, 19]; // yi tong, er tong, ...
const wanZi = [21, 22, 23, 24, 25, 26, 27, 28, 29]; // yi wan, er wan, ...
const winds = [31, 32, 33, 34]; // dong, nan, xi, bei
const dragons = [41, 42, 43]; // hong zhong, bai ban, fa cai
const animals = [51, 52, 53, 54]; // cat, mouse, rooster, centipede

allTiles.push(
  ...createTiles(suoZi, 4),
  ...createTiles(tongZi, 4),
  ...createTiles(wanZi, 4),
  ...createTiles(winds, 4),
  ...createTiles(dragons, 4),
  ...createTiles(animals, 1)
);

// note: there are 140 tiles in total here (148 - 8 flowers)
export { allTiles, suoZi, tongZi, wanZi, winds, dragons, animals };
