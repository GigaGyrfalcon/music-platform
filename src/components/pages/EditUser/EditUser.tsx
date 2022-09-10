import { useQuery } from '@tanstack/react-query'
import { Card } from 'primereact/card'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { User, UserSchema } from '../../../domain/user'
import useToast from '../../../hooks/useToast'
import UserForm from '../../forms/UserFrom/UserFrom'

function EditUsers() {
  const toast = useToast()
  const { t } = useTranslation()
  const { id } = useParams()

  const getUser = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      `/user/${id}`
    )
  }
  const { data, isSuccess } = useQuery(['merchant'], getUser)

  useEffect(() => {
    if (isSuccess) {
      const parsed = UserSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    console.log(values)
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).put('/user', values)
      if (response.status === 200) {
        alert('User updated successfully')
      }
    } catch (error) {
      alert('Error updating user')
    }
  }

  return isSuccess ? (
    <Card className="m-3">
      <h2>{t('edit_user')}</h2>
      <UserForm onSubmit={onSubmit} userDefaultValues={data.data} />
    </Card>
  ) : null
}

export default EditUsers
