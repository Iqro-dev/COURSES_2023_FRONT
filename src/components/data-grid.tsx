import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { plPL } from '../utils/datagrid-lang'

interface CustomDataGridProps {
  rows: any[]
  columns: GridColDef[]
}

export function CustomDataGrid({ rows, columns }: CustomDataGridProps) {
  return (
    <DataGrid
      localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
      rows={rows}
      columns={columns}
    />
  )
}
