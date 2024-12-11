import verbsData from "../../assets/verbs.json";
import { Verbs, filtersRules } from "../../utils/VerbFilters/filtersRules";

export const VerbFilters: Record<string, (verbs: Verbs[]) => Verbs[]> = Object.fromEntries(
    Object.entries(filtersRules).flatMap(([tense, verbTypes]) =>
      Object.entries(verbTypes).map(([verbType, filterFn]) => {
        const key = `${tense}_${verbType}`;
        return [key, filterFn];
      })
    )
  );

  
  export const getFilteredVerbs = (
    tense: string,
    verbType: string,
    reflexive: boolean
  ) => {
    const filterKey = `${tense}_${verbType}`;
  
    // Check if there's a corresponding filter
    if (!VerbFilters[filterKey]) return [];
  
    // Apply the filter
    let filtered = VerbFilters[filterKey](verbsData);
  
    // Remove reflexive verbs if not selected
    if (!reflexive) {
      filtered = filtered.filter(
        (verb) => !verb.infinitif.startsWith("se ") && !verb.infinitif.startsWith("s'")
      );
    }
  
    // Shuffle the filtered verbs
    return filtered.sort(() => Math.random() - 0.5);
  };
  