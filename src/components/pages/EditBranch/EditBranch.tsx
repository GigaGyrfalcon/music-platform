import { useQuery } from '@tanstack/react-query'
import { Card } from 'primereact/card'
import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { Branch, BranchSchema } from '../../../domain/branch'
import useToast from '../../../hooks/useToast'
import BranchForm from '../../forms/BranchFrom/BranchFrom'

function EditBranch() {
  const toast = useToast()
  const { t } = useTranslation()
  const { id } = useParams()

  const getBranch = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      `/branch/${id}`
    )
  }
  const { data, isSuccess } = useQuery(['branch'], getBranch)

  useEffect(() => {
    if (isSuccess) {
      const parsed = BranchSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<Branch> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).put('/branch', values)
      if (response.status === 200) {
        alert('Branch updated successfully')
      }
    } catch (error) {
      alert('Error updating branch')
    }
  }

  return isSuccess ? (
    <Card className="m-3">
      <h2>{t('edit_branch')}</h2>
      <BranchForm onSubmit={onSubmit} branchDefaultValues={data.data} />
    </Card>
  ) : null
}

export default EditBranch
