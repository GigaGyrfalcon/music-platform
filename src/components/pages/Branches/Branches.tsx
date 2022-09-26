import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { axiosPrivate } from '../../../api'
import { MerchantSchema } from '../../../domain/merchant'
import { useConfirmDialog, useToast } from '../../../hooks'
import { BranchesTable } from '../../fragments'

function Branch() {
  const toast = useToast()
  const confirm = useConfirmDialog()
  const { t } = useTranslation()

  const getMerchant = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      '/merchant'
    )
  }

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
        `/branch/${id}`
      )
      refetch()
      toast.setToast(
        'success',
        t('message.success'),
        t('message.branch_deleted_successfully')
      )
    } catch (error) {
      toast.setToast('error', t('message.error'), `${error}`)
    }
  }

  const onDelete = (id: string) => {
    confirm.setConfirmDialog({
      header: t('message.delete_branch'),
      message: t('message.delete_branch_confirmation'),
      accept: () => acceptFn(id),
    })
  }

  return isSuccess ? (
    <BranchesTable branches={data.data.branches} onDelete={onDelete} />
  ) : null
}

export default Branch
