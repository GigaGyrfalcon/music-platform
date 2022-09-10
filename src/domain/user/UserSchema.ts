import { z } from 'zod'

import { AddressSchema } from '../address'
export const UserRoles = ['admin', 'media'] as const

export const UserRoleSchema = z.union([z.literal('admin'), z.literal('media')])

export const UserSchema = z.object({
  id: z.number().optional(),
  first_name: z.string(),
  middle_name: z.string().optional(),
  last_name: z.string(),
  position: z.string(),
  email: z.string(),
  phone: z.string(),
  is_contact_person: z.boolean(),
  role: UserRoleSchema,
  address: AddressSchema,
})

export type User = z.infer<typeof UserSchema>
export type UserRole = z.infer<typeof UserRoleSchema>
