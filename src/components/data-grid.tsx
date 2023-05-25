import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { plPL } from '../utils/datagrid-lang'
import { Box, Typography } from '@mui/material'

interface CustomDataGridProps {
  rows: any[]
  columns: GridColDef[]
}

export function CustomDataGrid({ rows, columns }: CustomDataGridProps) {
  const columnsEdit = columns.map((column) => {
    column.headerClassName = 'super-app-theme--header'
    column.renderHeader = () => {
      return (
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
          {column.headerName}
        </Typography>
      )
    }

    return column
  })

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: 'rgba(224, 222, 221, 0.55)',
        },
      }}
    >
      <DataGrid
        autoHeight
        localeText={plPL.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columnsEdit}
      />
    </Box>
  )
}
