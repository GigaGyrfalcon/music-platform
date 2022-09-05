import { z } from 'zod'

import { AddressSchema } from '../address'

export const BranchSchema = z.object({
  name: z.string(),
  address: AddressSchema,
})

export type Branch = z.infer<typeof BranchSchema>
