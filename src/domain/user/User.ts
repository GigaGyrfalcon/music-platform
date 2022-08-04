import { Address } from '../address/Address'
import { UserRole } from './UserRole'

export type User = {
  first_name: string
  middle_name: string | null
  last_name: string
  position: string
  email: string
  phone: string
  is_contact_person: boolean
  address: Address
  role: UserRole
}
