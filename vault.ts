import { Item } from ".";
import { getNextQuality } from "./utils";

// create a vault of items that have the item name as keys and a function to update quality and sell date as values
export const ITEM_VAULT = new Map<
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
ITEM_VAULT.set("Backstage passes", (item) => {
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
ITEM_VAULT.set("Conjured", (item: Item, degradingQuality: number) => {
  // lower the quality of Conjured items twice as much
  const CONJURED_DEGRADING_QUALITY = 2 * degradingQuality;
  item.quality = getNextQuality(item.quality - CONJURED_DEGRADING_QUALITY);
  item.sellIn -= 1;
});
ITEM_VAULT.set("***", (item: Item, degradingQuality: number) => {
  // general case, when nothing else matches
  item.quality = getNextQuality(item.quality - degradingQuality);
  item.sellIn -= 1;
});
