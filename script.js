// Create classes to generate tiles
class GenerateBaseTiles {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }
}

class GenerateAnimals extends GenerateBaseTiles {
  constructor(value, type = "Animal", additionalTai = 1) {
    super(value, type);
    this.additionalTai = additionalTai;
  }
}

// Create tiles
