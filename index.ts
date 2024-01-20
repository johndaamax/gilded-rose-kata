class Item {
  public name: string;
  public sellIn: number;
  public quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  public items: Item[];
  constructor(items: Item[] = []) {
    this.items = items;
  }
  updateQuality() {
    return this.items;
  }
}

export { Item, Shop };
