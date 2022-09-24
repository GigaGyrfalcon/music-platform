import { Card } from 'primereact/card'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { User, userDefaultValues } from '../../../domain/user'
import useToast from '../../../hooks/useToast'
import UserForm from '../../forms/UserFrom/UserFrom'

function NewUsers() {
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post('/user', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('messages.success'),
          t('messages.user_created_successfully')
        )
        navigate('/users', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('messages.error_creating_user'), error)
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
