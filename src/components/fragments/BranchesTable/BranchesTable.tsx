import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Branch } from '../../../domain/branch'

function Branches({ branches }: { branches: Branch[] }) {
  const { t } = useTranslation()

  const removeBranch = (data: Branch) => {
    console.log('removeBranch', data)
  }
  const addBranch = () => {
    console.log('addBranch')
  }

  const actionBodyTemplate = (data: Branch) => {
    return (
      <>
        <Link className="no-underline" to={`/branches/${data.id}/edit`}>
          <span className="px-1 text-700 pi pi-pencil"></span>
        </Link>
        <span
          className="px-1 cursor-pointer text-700 pi pi-trash"
          onClick={() => removeBranch(data)}
        ></span>
      </>
    )
  }

  return (
    <Card className="m-3">
      <Link className="no-underline" to="/branches">
        <h2 className="mt-0 text-700">{t('branches')}</h2>
      </Link>
      {branches && (
        <DataTable value={branches} responsiveLayout="scroll">
          <Column field="name" header="First Name"></Column>
          <Column field="address.address_line_1" header="Address"></Column>
          <Column field="address.city" header="City"></Column>
          <Column field="address.state" header="State"></Column>
          <Column field="address.country" header="country"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Actions"
          ></Column>
        </DataTable>
      )}
      <div className="flex justify-content-end mt-3">
        <Link className="no-underline" to="/branches/new">
          <Button
            icon="pi pi-plus"
            className="p-button-info"
            onClick={() => addBranch()}
            label="Add Branch"
          />
        </Link>
      </div>
    </Card>
  )
}

export default Branches
