import { getNextQuality } from "./utils";

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
// the base value of how much the quality will degrade each day
const BASE_DEGRADING_QUALITY = 1;
// create a vault of items that have the item name as keys and a function to update quality and sell date as values
const ITEM_VAULT = new Map<
  string,
  (item: Item, degradingQuality: number) => void
>();

// Sulfuras never needs to update quality or sell date
ITEM_VAULT.set("Sulfuras, Hand of Ragnaros", (_) => {});
ITEM_VAULT.set("Aged Brie", (item) => {
  // increase quality of Aged Brie until it reaches the limit
  item.quality = getNextQuality(item.quality + 1);
  item.sellIn -= 1;
});
ITEM_VAULT.set("Backstage passes to a TAFKAL80ETC concert", (item) => {
  // increase quality of backstage passes according to the requirements
  if (item.sellIn < 0) {
    item.quality = 0;
  } else if (item.sellIn <= 5) {
    item.quality = getNextQuality(item.quality + 3);
  } else if (item.sellIn <= 10) {
    item.quality = getNextQuality(item.quality + 2);
  } else {
    item.quality = getNextQuality(item.quality + 1);
  }
  item.sellIn -= 1;
});
ITEM_VAULT.set("Conjured Mana Cake", (item: Item, degradingQuality: number) => {
  // lower the quality of Conjured items twice as much
  const CONJURED_DEGRADING_QUALITY = 2 * degradingQuality;
  item.quality = getNextQuality(item.quality - CONJURED_DEGRADING_QUALITY);
  item.sellIn -= 1;
});
ITEM_VAULT.set("***", (item: Item, degradingQuality: number) => {
  item.quality = getNextQuality(item.quality - degradingQuality);
  item.sellIn -= 1;
});

class Shop {
  public items: Item[];
  constructor(items: Item[] = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const degradingQuality =
        item.sellIn < 0 ? 2 * BASE_DEGRADING_QUALITY : BASE_DEGRADING_QUALITY;
      // handle *** as anything else that is not in the vault (base case)
      const qualityHandler = ITEM_VAULT.get(item.name) || ITEM_VAULT.get("***");
      qualityHandler?.(item, degradingQuality);
    });
    return this.items;
  }
}

export { Item, Shop };
