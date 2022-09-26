import { Card } from 'primereact/card'
import { Steps } from 'primereact/steps'
import { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { Address } from '../../../domain/address'
import { User, userDefaultValues } from '../../../domain/user'
import { useToast } from '../../../hooks'
import AddressForm from '../../forms/AddressFrom/AddressFrom'
import UserForm from '../../forms/UserFrom/UserFrom'

function NewUsers() {
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(userDefaultValues)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const steps = [{ label: t('user_details') }, { label: t('address') }]

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    setFormValues({ ...formValues, ...values })
    setActiveIndex(1)
  }

  const onAddressSubmit: SubmitHandler<Address> = async (values: Address) => {
    setFormValues({ ...formValues, address: values })
    saveUser({ ...formValues, address: values })
  }

  const saveUser = async (values: User) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post('/user', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('message.success'),
          t('message.user_created_successfully')
        )
        navigate('/users', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('message.error_creating_user'), error)
    }
  }

  return (
    <Card className="m-3">
      <h2>{t('add_user')}</h2>

      <Steps className="mb-3" model={steps} activeIndex={activeIndex} />

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
  )
}

export default NewUsers
