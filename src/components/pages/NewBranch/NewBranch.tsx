import { Panel } from 'primereact/panel'
import { Steps } from 'primereact/steps'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { axiosPrivate } from '../../../api'
import { Address } from '../../../domain/address'
import { Branch, branchDefaultValues } from '../../../domain/branch'
import { useToast } from '../../../hooks'
import AddressForm from '../../forms/AddressFrom/AddressFrom'
import BranchForm from '../../forms/BranchFrom/BranchFrom'

function NewBranch() {
  const { t } = useTranslation()
  const toast = useToast()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(branchDefaultValues)
  const [activeIndex, setActiveIndex] = useState(0)

  const steps = [{ label: t('general_info') }, { label: t('address') }]

  const onSubmit: SubmitHandler<Branch> = async (values: Branch) => {
    setFormValues({ ...formValues, ...values })
    setActiveIndex(1)
  }

  const onAddressSubmit: SubmitHandler<Address> = async (values: Address) => {
    setFormValues({ ...formValues, address: values })
    saveBranch({ ...formValues, address: values })
  }

  const saveBranch = async (values: Branch) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post('/branch', values)
      if (response.status === 200) {
        toast.setToast(
          'success',
          t('message.success'),
          t('message.branch_created_successfully')
        )
        navigate('/branches', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', t('message.error_creating_branch'), error)
    }
  }

  return (
    <Panel header={t('add_branch')} className="m-3">
      <Steps className="mb-3" model={steps} activeIndex={activeIndex} />

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
  )
}

export default NewBranch
