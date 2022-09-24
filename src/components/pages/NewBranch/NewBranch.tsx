import { Card } from 'primereact/card'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { Branch, branchDefaultValues } from '../../../domain/branch'
import useToast from '../../../hooks/useToast'
import BranchForm from '../../forms/BranchFrom/BranchFrom'

function NewBranch() {
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Branch> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post('/branch', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('messages.success'),
          t('messages.branch_created_successfully')
        )
        navigate('/branches', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('messages.error_creating_branch'), error)
    }
  }

  return (
    <Card className="m-3">
      <h2>{t('add_branch')}</h2>
      <BranchForm
        onSubmit={onSubmit}
        branchDefaultValues={branchDefaultValues}
      />
    </Card>
  )
}

export default NewBranch
