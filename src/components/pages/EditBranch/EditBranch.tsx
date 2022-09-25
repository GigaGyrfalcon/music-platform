import { useQuery } from '@tanstack/react-query'
import { Card } from 'primereact/card'
import { Steps } from 'primereact/steps'
import { useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { Address } from '../../../domain/address'
import {
  Branch,
  branchDefaultValues,
  BranchSchema,
} from '../../../domain/branch'
import useToast from '../../../hooks/useToast'
import AddressForm from '../../forms/AddressFrom/AddressFrom'
import BranchForm from '../../forms/BranchFrom/BranchFrom'

function EditBranch() {
  const toast = useToast()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(branchDefaultValues)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const interactiveItems = [
    { label: t('general_info') },
    { label: t('Address') },
  ]

  const getBranch = async () => {
    return await axiosPrivate(`${localStorage.getItem('token')}`).get(
      `/branch/${id}`
    )
  }
  const { data, isSuccess, remove } = useQuery(['branch', id], getBranch)

  useEffect(() => {
    if (isSuccess) {
      const parsed = BranchSchema.safeParse(data.data)
      if (!parsed.success) {
        toast.setToast('warn', 'warning', `${parsed.error.message}`, true)
      }
      setFormValues(data.data)
      setActiveIndex(0)
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<Branch> = async (values: Branch) => {
    setFormValues({ ...formValues, ...values })
    setActiveIndex(1)
  }

  const onAddressSubmit: SubmitHandler<Address> = async (values: Address) => {
    setFormValues({ ...formValues, address: values })
    saveBranch({ ...formValues, address: values })
    remove()
  }

  const saveBranch = async (values: Branch) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).put('/branch', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('success'),
          t('messages.branch_updated_successfully')
        )
        navigate('/branches', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('messages.error_updating_branch'), error)
    }
  }

  return isSuccess ? (
    <Card className="m-3">
      <h2>{t('edit_branch')}</h2>

      <Steps
        className="mb-3"
        model={interactiveItems}
        activeIndex={activeIndex ?? 0}
        readOnly={false}
      />

      {activeIndex === 0 && (
        <BranchForm
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

export default EditBranch
