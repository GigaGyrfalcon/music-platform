import { Card } from 'primereact/card'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { axiosPrivate } from '../../../api'
import { User, userDefaultValues } from '../../../domain/user'
import UserForm from '../../forms/UserFrom/UserFrom'

function NewUsers() {
  const { t } = useTranslation()

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post('/user', values)
      if (response.status === 200) {
        alert('User created successfully')
      }
    } catch (error) {
      alert('Error creating user')
    }
  }

  return (
    <Card className="m-3">
      <h2>{t('add_user')}</h2>
      <UserForm onSubmit={onSubmit} userDefaultValues={userDefaultValues} />
    </Card>
  )
}

export default NewUsers
