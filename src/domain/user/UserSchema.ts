import { z } from 'zod'

import { AddressSchema } from '../address'
import { UserRoleSchema } from '.'

export const UserSchema = z.object({
  first_name: z.string(),
  middle_name: z.string(),
  last_name: z.string(),
  position: z.string(),
  email: z.string(),
  phone: z.string(),
  is_contact_person: z.boolean(),
  role: UserRoleSchema,
  address: AddressSchema,
})

export type User = z.infer<typeof UserSchema>
