import { z } from 'zod';
import { BEVERAGES, BREW_METHODS, ENJOYED_AT } from './constants';

export const FlavorNoteSchema = z.object({
  category: z.string().min(1, 'La categoría es obligatoria'),
  subcategory: z.string().optional(),
  note: z.string().optional(),
  intensity: z.number().min(1).max(5)
});

export const tastingEntryFormSchema = z.object({
  name: z.string().optional(),
  date: z.string().nonempty('Date is mandatory'), // ISO (yyyy-mm-dd)
  context: z.object({
    enjoyedAt: z.enum(ENJOYED_AT),
    enjoyedOther: z.string().optional()
  }),
  coffee: z.object({
    origin: z.string().optional(),
    roaster: z.string().optional(),
    roastDate: z.string().optional()
  }),
  method: z.object({
    brewMethod: z.enum([...BREW_METHODS]).optional(),
    brewOther: z.string().optional(),
    beverage: z.enum([...BEVERAGES]).optional(),
    beverageOther: z.string().optional()
  }),
  flavors: z.array(FlavorNoteSchema).default([])
});
