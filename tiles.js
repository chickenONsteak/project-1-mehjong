// Create classes to generate tiles
class GenerateBaseTiles {
  constructor(value, type, quantity) {
    this.value = value;
    this.type = type;
    this.quantity = quantity;
  }
}

class GenerateAnimals extends GenerateBaseTiles {
  constructor(value, type = "animal", quantity = 1, additionalTai = 1) {
    super(value, type, quantity);
    this.additionalTai = additionalTai;
  }
}

// Create character tiles
// suo zi
const yiSuo = new GenerateBaseTiles(1, "suo", 4);
const erSuo = new GenerateBaseTiles(2, "suo", 4);
const sanSuo = new GenerateBaseTiles(3, "suo", 4);
const siSuo = new GenerateBaseTiles(4, "suo", 4);
const wuSuo = new GenerateBaseTiles(5, "suo", 4);
const liuSuo = new GenerateBaseTiles(6, "suo", 4);
const qiSuo = new GenerateBaseTiles(7, "suo", 4);
const baSuo = new GenerateBaseTiles(8, "suo", 4);
const jiuSuo = new GenerateBaseTiles(9, "suo", 4);

// tong zi
const yiTong = new GenerateBaseTiles(1, "tong", 4);
const erTong = new GenerateBaseTiles(2, "tong", 4);
const sanTong = new GenerateBaseTiles(3, "tong", 4);
const siTong = new GenerateBaseTiles(4, "tong", 4);
const wuTong = new GenerateBaseTiles(5, "tong", 4);
const liuTong = new GenerateBaseTiles(6, "tong", 4);
const qiTong = new GenerateBaseTiles(7, "tong", 4);
const baTong = new GenerateBaseTiles(8, "tong", 4);
const jiuTong = new GenerateBaseTiles(9, "tong", 4);

// wan zi
const yiWan = new GenerateBaseTiles(1, "wan", 4);
const erWan = new GenerateBaseTiles(2, "wan", 4);
const sanWan = new GenerateBaseTiles(3, "wan", 4);
const siWan = new GenerateBaseTiles(4, "wan", 4);
const wuWan = new GenerateBaseTiles(5, "wan", 4);
const liuWan = new GenerateBaseTiles(6, "wan", 4);
const qiWan = new GenerateBaseTiles(7, "wan", 4);
const baWan = new GenerateBaseTiles(8, "wan", 4);
const jiuWan = new GenerateBaseTiles(9, "wan", 4);

// dragon tiles
const hongZhong = new GenerateBaseTiles("hong zhong", "dragon", 4);
const baiBan = new GenerateBaseTiles("bai ban", "dragon", 4);
const faCai = new GenerateBaseTiles("fa cai", "dragon", 4);

// winds
const dong = new GenerateBaseTiles("dong", "wind", 4);
const nan = new GenerateBaseTiles("nan", "wind", 4);
const xi = new GenerateBaseTiles("xi", "wind", 4);
const bei = new GenerateBaseTiles("bei", "wind", 4);

// Create special tiles
// animals
const cat = new GenerateAnimals("cat");
const mouse = new GenerateAnimals("mouse");
const rooster = new GenerateAnimals("rooster");
const centipede = new GenerateAnimals("centipede");
