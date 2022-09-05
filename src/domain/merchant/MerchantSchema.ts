import { z } from 'zod'

import { AddressSchema } from '../address'
import { BranchSchema } from '../branch'
import { UserSchema } from '../user'

export const MerchantSchema = z.object({
  legal_name: z.string(),
  description: z.string().optional(),
  is_active: z.boolean(),
  users: UserSchema.array(),
  address: AddressSchema,
  branches: BranchSchema.array().optional(),
})

export type Merchant = z.infer<typeof MerchantSchema>
