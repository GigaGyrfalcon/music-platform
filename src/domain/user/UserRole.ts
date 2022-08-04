export const UserRoles = ['admin', 'media'] as const

export type UserRole = typeof UserRoles[number]
