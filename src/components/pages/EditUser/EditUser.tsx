import { useQuery } from '@tanstack/react-query'
import { Card } from 'primereact/card'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { User, UserSchema } from '../../../domain/user'
import useToast from '../../../hooks/useToast'
import UserForm from '../../forms/UserFrom/UserFrom'

function EditUser() {
  const toast = useToast()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()

  const getUser = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      `/user/${id}`
    )
  }
  const { data, isSuccess } = useQuery(['user', id], getUser)

  useEffect(() => {
    if (isSuccess) {
      const parsed = UserSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).put('/user', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('messages.success'),
          t('messages.user_updated_successfully')
        )
        navigate('/users', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('messages.error_updating_user'), error)
    }
  }

  return isSuccess ? (
    <Card className="m-3">
      <h2>{t('edit_user')}</h2>
      <UserForm onSubmit={onSubmit} userDefaultValues={data.data} />
    </Card>
  ) : null
}

export default EditUser
