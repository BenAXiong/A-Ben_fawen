export const normalizeTense = (tenseValue: unknown): string[] => {
    if (Array.isArray(tenseValue)) {
      return tenseValue;
    }
    if (typeof tenseValue === "string") {
      return Array(6).fill(tenseValue);
    }
    return []; // Default for unknown cases
  };
  