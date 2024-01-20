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

  describe("Aged Brie", () => {
    it("should increase quality by 1 if < 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 12)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
      expect(items[0].sellIn).toBe(9);
    });
    it("should cap quality at 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 25, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
      expect(items[0].sellIn).toBe(24);
    });
  });
});
