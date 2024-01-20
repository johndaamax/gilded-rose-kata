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
