import { addressDefaultValues } from '../address'
import { UserRoles } from '.'

export const userDefaultValues = {
  first_name: '',
  middle_name: '',
  last_name: '',
  position: '',
  email: '',
  phone: '',
  is_contact_person: false,
  role: UserRoles[0],
  address: addressDefaultValues,
}
