import { z } from 'zod';
import { ENJOYED_AT } from './constants';

export const tastingEntryFormSchema = z.object({
  name: z.string().optional(),
  date: z.string().nonempty('La fecha es obligatoria'), // ISO (yyyy-mm-dd)
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
    brewMethod: z.enum(BREW_METHODS),
    brewOther: z.string().optional()
  })
});
