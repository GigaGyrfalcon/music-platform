import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { User } from '../../../domain/user'

export function UsersTable({
  users,
  onDelete,
}: {
  users: User[]
  onDelete: (id: string) => void
}) {
  const { t } = useTranslation()

  const actionBodyTemplate = (data: User) => {
    return (
      <>
        <Link className="no-underline" to={`/users/${data.id}/edit`}>
          <span className="px-1 text-700 pi pi-pencil"></span>
        </Link>
        <span
          className="px-1 cursor-pointer text-700 pi pi-trash"
          onClick={() => onDelete(`${data.id}`)}
        ></span>
      </>
    )
  }

  return (
    <Card className="m-3">
      <Link className="no-underline" to="/users">
        <h2 className="mt-0 text-700">{t('users')}</h2>
      </Link>
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
