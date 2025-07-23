import { z } from 'zod';

export const TastingEntrySchema = z.object({
  date: z.date(),
  method: z.string().min(1),
  coffeeName: z.string().min(1).optional(),
  origin: z.string().min(1).optional(),
  roaster: z.string().min(1).optional(),
  score: z.number().min(0).max(10).optional(),
  notes: z.string().optional(),
  photos: z.array(z.instanceof(File)).optional()
});
