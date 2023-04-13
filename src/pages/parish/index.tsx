import { Grid, Typography, Box } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Preview } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useParishes } from '../../hooks/parish/use-parishes'

export default function ParishesList() {
  const { parishes } = useParishes()

  const navigate = useNavigate()

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
      width: 75,
    },
    {
      field: 'name',
      headerName: 'Nazwa parafii',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Preview />}
          onClick={() => navigate(`/dashboard/parishes/details?id=${params.id}`)}
        />,
      ],
      flex: 1,
      align: 'right',
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Parafie</Typography>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={
              parishes?.map((u, idx) => ({
                ...u,
                ordinalNumber: idx + 1,
              })) ?? []
            }
            columns={columns}
          />
        </Box>
      </Grid>
    </>
  )
}
