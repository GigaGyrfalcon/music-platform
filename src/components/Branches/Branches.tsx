import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

import { Branch } from '../../domain/branch'

function Branches({ branches }: { branches: Branch[] }) {
  // const { t } = useTranslation() // TODO: use i18n

  const editBranch = (rowData: Branch) => {
    console.log('editBranch', rowData)
  }
  const removeBranch = (rowData: Branch) => {
    console.log('removeBranch', rowData)
  }
  const addBranch = () => {
    console.log('addBranch')
  }

  const actionBodyTemplate = (rowData: Branch) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editBranch(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => removeBranch(rowData)}
        />
      </>
    )
  }

  return (
    <Card className="m-3">
      <h3 className="mt-0">Branches</h3>
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
        <Button
          icon="pi pi-plus"
          className="p-button-info"
          onClick={() => addBranch()}
          label="Add Branch"
        />
      </div>
    </Card>
  )
}

export default Branches
