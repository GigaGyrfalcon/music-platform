import { useQuery } from '@tanstack/react-query'
import { Panel } from 'primereact/panel'
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
import { useToast } from '../../../hooks'
import AddressForm from '../../forms/AddressFrom/AddressFrom'
import BranchForm from '../../forms/BranchFrom/BranchFrom'

function EditBranch() {
  const toast = useToast()
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(branchDefaultValues)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const steps = [{ label: t('general_info') }, { label: t('address') }]

  const getBranch = async () =>
    await axiosPrivate(`${localStorage.getItem('token')}`).get(`/branch/${id}`)

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
          t('message.branch_updated_successfully')
        )
        navigate('/branches', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('message.error_updating_branch'), error)
    }
  }

  return isSuccess ? (
    <Panel header={t('edit_branch')} className="m-3">
      <Steps className="mb-3" model={steps} activeIndex={activeIndex ?? 0} />

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
    </Panel>
  ) : null
}

export default EditBranch
