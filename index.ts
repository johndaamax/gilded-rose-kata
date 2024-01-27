import { ITEM_VAULT, LEGENDARY_ITEMS } from "./vault";
import { getKeyOfItemVault } from "./utils";

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
      // Return early if item name is in the list of legendaries
      if (LEGENDARY_ITEMS.includes(item.name)) {
        return;
      }
      const degradingQuality =
        item.sellIn < 0 ? 2 * BASE_DEGRADING_QUALITY : BASE_DEGRADING_QUALITY;
      const qualityHandler = ITEM_VAULT.get(getKeyOfItemVault(item));
      qualityHandler?.(item, degradingQuality);
      item.sellIn -= 1;
    });
    return this.items;
  }
}

export { Item, Shop };
