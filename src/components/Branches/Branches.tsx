import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'

function Branches({ branches }: any) {
  // const { t } = useTranslation() // TODO: use i18n

  const editBranch = (rowData: any) => {
    console.log('editBranch', rowData)
  }
  const removeBranch = (rowData: any) => {
    console.log('removeBranch', rowData)
  }
  const addBranch = () => {
    console.log('addBranch')
  }

  const actionBodyTemplate = (rowData: any) => {
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
          <Column field="first_name" header="First Name"></Column>
          <Column field="last_name" header="Last Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="position" header="Position"></Column>
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
