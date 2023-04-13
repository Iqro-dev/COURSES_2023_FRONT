import { Grid, Typography, Box } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useDioceses } from '../../hooks/diocese/use-dioceses'
import { Preview } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function DiocesesList() {
  const { dioceses } = useDioceses()

  const navigate = useNavigate()

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
    },
    {
      field: 'name',
      headerName: 'Diecezja',
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Preview />}
          onClick={() => navigate(`/dashboard/dioceses/details?id=${params.id}`)}
        />,
      ],
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Diecezje i parafie</Typography>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={
              dioceses?.map((u, idx) => ({
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
