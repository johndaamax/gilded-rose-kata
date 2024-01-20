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

  describe("Backstage passes", () => {
    it("should remove all quality when its sell day has passed", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(-2);
    });
    it("should increase quality by 2 when its sell day is <=10", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 7, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(27);
      expect(items[0].sellIn).toBe(6);
    });
    it("should increase quality by 3 when its sell day is <=5", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 2, 35),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(38);
      expect(items[0].sellIn).toBe(1);
    });
    it("should increase the Backstage Pass quality by 1 when its sell day > 10", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 12, 19),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(20);
      expect(items[0].sellIn).toBe(11);
    });
  });
});
