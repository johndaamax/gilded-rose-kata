import { Item } from ".";
import { ITEM_VAULT } from "./vault";

const MAX_QUALITY_LIMIT = 50;
const MIN_QUALITY_LIMIT = 0;

// helper to set bounds to our quality
export const getNextQuality = (nextQuality: number): number => {
  return nextQuality > MAX_QUALITY_LIMIT
    ? MAX_QUALITY_LIMIT
    : nextQuality < MIN_QUALITY_LIMIT
    ? MIN_QUALITY_LIMIT
    : nextQuality;
};

// helper to match items on a more general key (ex. all Conjured items will match a Conjured key from the item vault)
export const getKeyOfItemVault = (item: Item): string => {
  for (const key of ITEM_VAULT.keys()) {
    if (item.name.toLowerCase().includes(key.toLowerCase())) {
      return key;
    }
  }
  // handle *** as anything else that is not in the vault (base case)
  return "***";
};
