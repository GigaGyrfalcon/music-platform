import { z } from 'zod'
export const UserRoles = ['admin', 'media'] as const

export const UserRoleSchema = z.union([z.literal('admin'), z.literal('media')])
export type UserRole = z.infer<typeof UserRoleSchema>
