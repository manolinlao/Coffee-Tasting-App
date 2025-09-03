import { z } from 'zod';

export const tastingEntryFormSchema = z.object({
  name: z.string().optional(),
  date: z.string().nonempty('La fecha es obligatoria'), // ISO (yyyy-mm-dd)
  context: z.object({
    enjoyedAt: z.enum(['home', 'coffeeShop', 'other']),
    enjoyedOther: z.string().optional()
  }),
  coffee: z.object({
    origin: z.string().optional(),
    roaster: z.string().optional(),
    roastDate: z.string().optional()
  })
});
