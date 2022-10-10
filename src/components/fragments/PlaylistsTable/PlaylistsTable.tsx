import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Playlist } from '../../../domain/playlist'

export function PlaylistsTable({
  playlists,
  onDelete,
}: {
  playlists: Playlist[]
  onDelete: (id: string) => void
}) {
  const { t } = useTranslation()

  const actionBodyTemplate = (data: Playlist) => {
    return (
      <>
        <Link className="no-underline" to={`/playlists/${data.id}/edit`}>
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
    <Panel header={t('playlists')} toggleable className="m-3">
      {playlists && (
        <DataTable value={playlists} responsiveLayout="scroll">
          <Column field="name" header="Playlist name"></Column>
          <Column field="branch.name" header="Branch name"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            header="Actions"
          ></Column>
        </DataTable>
      )}
      <div className="flex justify-content-end mt-3">
        <Link className="no-underline" to="/playlists/new">
          <Button
            icon="pi pi-plus"
            className="p-button-info"
            label="Add Playlist"
          />
        </Link>
      </div>
    </Panel>
  )
}
