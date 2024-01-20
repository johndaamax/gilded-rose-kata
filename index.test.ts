import { assert, describe, expect, it } from "vitest";
import { Item, Shop } from ".";

describe("Gilded Rose", function () {
  it("should not change quality or sellIn values of Sulfuras", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  });
});
