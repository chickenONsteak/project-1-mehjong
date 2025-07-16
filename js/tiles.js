// CONSTANTS
// ---
// ASSETS
// const faceDownImg =
const yiSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/MJs1-.svg/120px-MJs1-.svg.png";
const erSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/MJs2-.svg/120px-MJs2-.svg.png";
const sanSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/MJs3-.svg/120px-MJs3-.svg.png";
const siSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/MJs4-.svg/120px-MJs4-.svg.png";
const wuSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/MJs5-.svg/120px-MJs5-.svg.png";
const liuSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/MJs6-.svg/120px-MJs6-.svg.png";
const qiSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/MJs7-.svg/120px-MJs7-.svg.png";
const baSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/MJs8-.svg/120px-MJs8-.svg.png";
const jiuSuoImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/MJs9-.svg/120px-MJs9-.svg.png";
const yiTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/MJt1-.svg/120px-MJt1-.svg.png";
const erTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/MJt2-.svg/120px-MJt2-.svg.png";
const sanTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/MJt3-.svg/120px-MJt3-.svg.png";
const siTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/MJt4-.svg/120px-MJt4-.svg.png";
const wuTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/MJt5-.svg/120px-MJt5-.svg.png";
const liuTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/MJt6-.svg/120px-MJt6-.svg.png";
const qiTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/MJt7-.svg/120px-MJt7-.svg.png";
const baTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/MJt8-.svg/120px-MJt8-.svg.png";
const jiuTongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/MJt9-.svg/120px-MJt9-.svg.png";
const yiWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/MJw1-.svg/120px-MJw1-.svg.png";
const erWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/MJw2-.svg/120px-MJw2-.svg.png";
const sanWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/MJw3-.svg/120px-MJw3-.svg.png";
const siWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/MJw4-.svg/120px-MJw4-.svg.png";
const wuWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/MJw5-.svg/120px-MJw5-.svg.png";
const liuWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/MJw6-.svg/120px-MJw6-.svg.png";
const qiWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/MJw7-.svg/120px-MJw7-.svg.png";
const baWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/MJw8-.svg/120px-MJw8-.svg.png";
const jiuWanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/MJw9-.svg/120px-MJw9-.svg.png";
const dongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/MJf1-.svg/120px-MJf1-.svg.png";
const nanImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/MJf2-.svg/120px-MJf2-.svg.png";
const xiImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/MJf3-.svg/120px-MJf3-.svg.png";
const beiImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/MJf4-.svg/120px-MJf4-.svg.png";
const hongImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MJd1-.svg/120px-MJd1-.svg.png";
const faImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/MJd2-.svg/120px-MJd2-.svg.png";
const baiImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/MJd3-.svg/120px-MJd3-.svg.png";
const catImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/MJat1-.svg/120px-MJat1-.svg.png";
const mouseImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/MJat2-.svg/120px-MJat2-.svg.png";
const roosterImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/MJat3-.svg/120px-MJat3-.svg.png";
const centipedeImg =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/MJat4-.svg/120px-MJat4-.svg.png";

// TILES
const allTiles = [];
const suoZi = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // yi suo, er suo, ...
const tongZi = [11, 12, 13, 14, 15, 16, 17, 18, 19]; // yi tong, er tong, ...
const wanZi = [21, 22, 23, 24, 25, 26, 27, 28, 29]; // yi wan, er wan, ...
const winds = [31, 32, 33, 34]; // dong, nan, xi, bei
const dragons = [41, 42, 43]; // hong zhong, bai ban, fa cai
const animals = [51, 52, 53, 54]; // cat, mouse, rooster, centipede

// TILE IMAGES
const suoImages = [
  yiSuoImg,
  erSuoImg,
  sanSuoImg,
  siSuoImg,
  wuSuoImg,
  liuSuoImg,
  qiSuoImg,
  baSuoImg,
  jiuSuoImg,
];
const tongImages = [
  yiTongImg,
  erTongImg,
  sanTongImg,
  siTongImg,
  wuTongImg,
  liuTongImg,
  qiTongImg,
  baTongImg,
  jiuTongImg,
];
const wanImages = [
  yiWanImg,
  erWanImg,
  sanWanImg,
  siWanImg,
  wuWanImg,
  liuWanImg,
  qiWanImg,
  baWanImg,
  jiuWanImg,
];
const windsImages = [dongImg, nanImg, xiImg, beiImg];
const dragonsImages = [hongImg, faImg, baiImg];
const animalsImages = [catImg, mouseImg, roosterImg, centipedeImg];

// FUNCTIONS
// ---
// Create classes to generate tiles
class GenerateBaseTiles {
  constructor(tileId, imageURI, distributed = false, faceUp = false) {
    this.tileId = tileId;
    this.imageURI = imageURI;
    this.distributed = distributed;
    this.faceUp = faceUp;
  }
}

function createTiles(tile, image, numCopies) {
  const tiles = [];
  for (let i = 0; i < tile.length; i++) {
    for (let j = 0; j < numCopies; j++) {
      const newTile = new GenerateBaseTiles(tile[i], image[i]);
      tiles.push(newTile);
    }
  }

  return tiles;
}

allTiles.push(
  ...createTiles(suoZi, suoImages, 4),
  ...createTiles(tongZi, tongImages, 4),
  ...createTiles(wanZi, wanImages, 4),
  ...createTiles(winds, windsImages, 4),
  ...createTiles(dragons, dragonsImages, 4),
  ...createTiles(animals, animalsImages, 1)
);

// note: there are 140 tiles in total here (148 - 8 flowers)
export { allTiles, suoZi, tongZi, wanZi, winds, dragons, animals };
