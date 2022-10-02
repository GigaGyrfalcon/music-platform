import './users.scss'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { axiosPrivate } from '../../../api'
import { MerchantSchema } from '../../../domain/merchant'
import { useConfirmDialog, useToast } from '../../../hooks'
import { UsersTable } from '../../fragments'

function Users() {
  const toast = useToast()
  const confirm = useConfirmDialog()
  const { t } = useTranslation()

  const getMerchant = async () =>
    await axiosPrivate(`${localStorage.getItem('token')}`).get('/merchant')

  const { data, isSuccess, refetch } = useQuery(['merchant'], getMerchant)

  useEffect(() => {
    if (isSuccess) {
      const parsed = MerchantSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
    }
  }, [isSuccess])

  const acceptFn = async (id: string) => {
    try {
      await axiosPrivate(`${localStorage.getItem('token')}`).delete(
        `/user/${id}`
      )
      refetch()
      toast.setToast(
        'success',
        t('message.success'),
        t('message.user_deleted_successfully')
      )
    } catch (error) {
      toast.setToast('error', t('message.error'), `${error}`)
    }
  }

  const onDelete = (id: string) => {
    confirm.setConfirmDialog({
      header: t('message.delete_user'),
      message: t('message.delete_user_confirmation'),
      accept: () => acceptFn(id),
    })
  }

  return isSuccess ? (
    <UsersTable users={data.data.users} onDelete={onDelete} />
  ) : null
}

export default Users
