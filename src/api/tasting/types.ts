export interface TastingEntry {
  id?: number;
  date: Date;
  coffeeName?: string;
  origin?: string;
  roaster?: string;
  method: string;
  score?: number | null;
  notes?: string;
  photos?: File[];
}
