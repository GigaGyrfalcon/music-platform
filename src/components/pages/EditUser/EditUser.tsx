import { useQuery } from '@tanstack/react-query'
import { Card } from 'primereact/card'
import { Steps } from 'primereact/steps'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { Address } from '../../../domain/address'
import { User, userDefaultValues, UserSchema } from '../../../domain/user'
import { useToast } from '../../../hooks'
import AddressForm from '../../forms/AddressFrom/AddressFrom'
import UserForm from '../../forms/UserFrom/UserFrom'

function EditUser() {
  const toast = useToast()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(userDefaultValues)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const steps = [{ label: t('user_details') }, { label: t('address') }]

  const getUser = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      `/user/${id}`
    )
  }
  const { data, isSuccess, remove } = useQuery(['user', id], getUser)

  useEffect(() => {
    if (isSuccess) {
      const parsed = UserSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
      setFormValues(data.data)
      setActiveIndex(0)
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    setFormValues({ ...formValues, ...values })
    setActiveIndex(1)
  }

  const onAddressSubmit: SubmitHandler<Address> = async (values: Address) => {
    setFormValues({ ...formValues, address: values })
    saveUser({ ...formValues, address: values })
    remove()
  }

  const saveUser = async (values: User) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).put('/user', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('message.success'),
          t('message.user_updated_successfully')
        )
        navigate('/users', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('message.error_updating_user'), error)
    }
  }

  return isSuccess ? (
    <Card className="m-3">
      <h2>{t('edit_user')}</h2>

      <Steps className="mb-3" model={steps} activeIndex={activeIndex ?? 0} />

      {activeIndex === 0 && (
        <UserForm
          onSubmit={onSubmit}
          defaultValues={formValues}
          submitButtonLabel={'button.next'}
        />
      )}

      {activeIndex === 1 && (
        <AddressForm
          onSubmit={onAddressSubmit}
          defaultValues={formValues.address}
          cancelButtonLabel={'button.back'}
          cancelButtonFn={() => setActiveIndex(0)}
        />
      )}
    </Card>
  ) : null
}

export default EditUser
