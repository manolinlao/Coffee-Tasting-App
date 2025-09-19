import type { BrewMethod, EnjoyedAt } from './constants';

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
    brewMethod: BrewMethod;
    brewOther?: string;
  };
}

export type TastingEntryInput = Omit<TastingEntry, 'id'>;
export type TastingEntryForm = Omit<TastingEntry, 'id' | 'userId'>;
export type ContextForm = TastingEntry['context'];
export type CoffeeForm = TastingEntry['coffee'];
