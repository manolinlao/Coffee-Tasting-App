import type { Beverage, BrewMethod, EnjoyedAt } from './constants';

export type FlavorNote = {
  category: string; // ej: "Frutal"
  subcategory?: string; // ej: "Cítrico"
  note?: string; // ej: "Limón"
  intensity: number; // 1–5 (ahora obligatorio)
};

export interface TastingEntry {
  id: number;
  userId: string;
  date: string; // ISO string
  name?: string;

  context: {
    enjoyedAt: EnjoyedAt;
    enjoyedOther?: string;
  };

  coffee: {
    origin?: string;
    roaster?: string;
    roastDate?: string;
  };

  method: {
    brewMethod?: BrewMethod;
    brewOther?: string;
    beverage?: Beverage;
    beverageOther?: string;
  };

  flavors?: FlavorNote[];
}

export type TastingEntryInput = Omit<TastingEntry, 'id'>;
export type TastingEntryForm = Omit<TastingEntry, 'id' | 'userId'>;
export type ContextForm = TastingEntry['context'];
export type CoffeeForm = TastingEntry['coffee'];
