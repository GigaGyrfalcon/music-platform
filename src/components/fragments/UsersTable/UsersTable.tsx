import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { Link } from 'react-router-dom'

import { User } from '../../../domain/user'

function UsersTable({ users }: { users: User[] }) {
  // const { t } = useTranslation() // TODO: use i18n

  const editUser = (rowData: User) => {
    console.log('editUser', rowData)
  }
  const removeUser = (rowData: User) => {
    console.log('removeUser', rowData)
  }

  const actionBodyTemplate = (rowData: User) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => removeUser(rowData)}
        />
      </>
    )
  }

  return (
    <Card className="m-3">
      <h2 className="mt-0">
        <Link className="no-underline" to="/users">
          Users
        </Link>
      </h2>
      {users && (
        <DataTable value={users} responsiveLayout="scroll">
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
        <Link className="no-underline" to="/users/new">
          <Button
            icon="pi pi-user-plus"
            className="p-button-info"
            label="Add User"
          />
        </Link>
      </div>
    </Card>
  )
}

export default UsersTable
