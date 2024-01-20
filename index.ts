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

// create a vault of items that have the item name as keys and a function to update quality and sell date as values
const ITEM_VAULT = new Map<string, (item: Item) => void>();

// Sulfuras never needs to update quality or sell date
ITEM_VAULT.set("Sulfuras, Hand of Ragnaros", (_) => {});
ITEM_VAULT.set("Aged Brie", (item) => {
  // increase quality of Aged Brie until it reaches the limit
  item.quality = item.quality + 1 > 50 ? 50 : item.quality + 1;
  item.sellIn -= 1;
});

class Shop {
  public items: Item[];
  constructor(items: Item[] = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const qualityHandler = ITEM_VAULT.get(item.name);
      qualityHandler?.(item);
    });
    return this.items;
  }
}

export { Item, Shop };
