import { z } from 'zod'

export const AddressSchema = z.object({
  address_line_1: z.string(),
  address_line_2: z.string(),
  city: z.string(),
  state: z.string(),
  postal_code: z.string(),
  country: z.string(),
})

export type Address = z.infer<typeof AddressSchema>
