import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Branch } from '../../../domain/branch'

export function BranchesTable({
  branches,
  onDelete,
}: {
  branches: Branch[]
  onDelete: (id: string) => void
}) {
  const { t } = useTranslation()

  const actionBodyTemplate = (data: Branch) => {
    return (
      <>
        <Link className="no-underline" to={`/branches/${data.id}/edit`}>
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
    <Panel header={t('branches')} toggleable className="m-3">
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
            label="Add Branch"
          />
        </Link>
      </div>
    </Panel>
  )
}
