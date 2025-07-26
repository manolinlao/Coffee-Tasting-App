export interface TastingEntry {
  id?: number;
  userId: string;
  date: Date;
  coffeeName?: string;
  origin?: string;
  roaster?: string;
  method: string;
  score?: number | null;
  notes?: string;
  photos?: File[];
}

export type TastingEntryForm = Omit<TastingEntry, 'id' | 'userId'>;
