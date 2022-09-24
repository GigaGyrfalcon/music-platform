import { Card } from 'primereact/card'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { axiosPrivate } from '../../../api'
import { Branch, branchDefaultValues } from '../../../domain/branch'
import BranchForm from '../../forms/BranchFrom/BranchFrom'

function NewBranch() {
  const { t } = useTranslation()

  const onSubmit: SubmitHandler<Branch> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post('/branch', values)
      console.log(response)
      if (response.status === 200) {
        alert('Branch created successfully')
      }
    } catch (error) {
      alert('Error creating branch')
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
