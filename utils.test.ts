import { describe, expect, it } from "vitest";
import {
  MAX_QUALITY_LIMIT,
  MIN_QUALITY_LIMIT,
  getKeyOfItemVault,
  getNextQuality,
} from "./utils";
import { Item } from ".";

describe("The getNextQuality function", () => {
  it("should cap maximum quality at the MAX_QUALITY_LIMIT", () => {
    const prevQuality = 48;
    const newQuality = getNextQuality(prevQuality + 4);
    expect(newQuality).toBe(MAX_QUALITY_LIMIT);
  });
  it("should cap minimum quality at the MIN_QUALITY_LIMIT", () => {
    const prevQuality = 2;
    const newQuality = getNextQuality(prevQuality - 4);
    expect(newQuality).toBe(MIN_QUALITY_LIMIT);
  });
  it("should update quality as expected the new value would not exceed the bounds", () => {
    const prevQuality = 2;
    const newQuality = getNextQuality(prevQuality + 2);
    expect(newQuality).toBe(4);
  });
});

describe("The getKeyOfItemVault function", () => {
  it("should return a key of the item vault if a match is found", () => {
    const returnedKey = getKeyOfItemVault(new Item("Conjured Item", 1, 0));
    expect(returnedKey).toBe("Conjured");
  });
  it("should return *** if a match is not found", () => {
    const returnedKey = getKeyOfItemVault(new Item("Some random item", 1, 0));
    expect(returnedKey).toBe("***");
  });
});
