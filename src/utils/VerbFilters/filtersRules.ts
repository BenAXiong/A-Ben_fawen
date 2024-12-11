export interface Verbs {
  _id: string;
  infinitif: string;
  participePasse: string;
  participePresent?: string;
  auxiliaire: string;
  present: string[]; // Array of verb forms for "Présent"
  imparfait: string[];
  passeSimple: string[];
  futurSimple: string[];
  passeCompose: string[];
  plusQueParfait: string[];
  passeAnterieur: string[];
  futurAnterieur: string[];
  subjonctifPresent: string[];
  subjonctifImparfait: string[];
  subjonctifPasse: string[];
  subjonctifPlusQueParfait: string[];
  conditionnelPresent: string[];
  conditionnelPasse: string[];
  conditionnelPasseII: string[];
  imperatifPasse?: string[];
}

type FiltersRules = {
  [verbType: string]: (verbs: Verbs[]) => Verbs[];
};

export const filtersRules: Record<string, FiltersRules> = {
  "Présent": {
    "régulier": (verbs) => verbs.filter((v) => v.infinitif.endsWith("er") && v.infinitif !== "aller"),
    "irrégulier1": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier2": (verbs) => verbs.filter((v) => v.infinitif.endsWith("oir")),
    "irrégulier3": (verbs) => verbs.filter((v) => v.infinitif.endsWith("re") && !v.infinitif.endsWith("dre") && !v.infinitif.endsWith("tre")),
    "irrégulierAll": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir")),
  },
  "Imparfait": {
    "régulier": (verbs) => verbs.filter((v) => v.infinitif.endsWith("er") && v.infinitif !== "aller"),
    "irrégulier1": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier2": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier3": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulierAll": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir")),
  },
  "Futur": {
    "régulier": (verbs) => verbs.filter((v) => v.infinitif.endsWith("er") && v.infinitif !== "aller"),
    "irrégulier1": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier2": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier3": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulierAll": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir")),
  },
  "Conditionnel Présent": {
    "régulier": (verbs) => verbs.filter((v) => v.infinitif.endsWith("er") && v.infinitif !== "aller"),
    "irrégulier1": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier2": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier3": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulierAll": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir")),
  },
  "Passé Composé": {
    "régulier": (verbs) => verbs.filter((v) => v.infinitif.endsWith("er") && v.infinitif !== "aller"),
    "irrégulier1": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier2": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier3": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulierAll": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir")),
  },
  "Subjonctif": {
    "régulier": (verbs) => verbs.filter((v) => v.infinitif.endsWith("er") && v.infinitif !== "aller"),
    "irrégulier1": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier2": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulier3": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir") && !v.infinitif.endsWith("oir")),
    "irrégulierAll": (verbs) => verbs.filter((v) => v.infinitif.endsWith("ir")),
  },
};