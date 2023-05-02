import { DataGrid, GridColDef, plPL } from '@mui/x-data-grid';

interface CustomDataGridProps {
  rows: any[];
  columns: GridColDef[];
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