import { ITEM_VAULT } from "./vault";

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
