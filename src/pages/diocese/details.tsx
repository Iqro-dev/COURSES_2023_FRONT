import { Grid, Typography, Box } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDiocese } from '../../hooks/diocese/use-diocese'
import { useParishes } from '../../hooks/parish/use-parishes'
import { useEffect } from 'react'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Preview } from '@mui/icons-material'

export default function DioceseDetails() {
  const [params] = useSearchParams()

  const id = params.get('id')

  const navigate = useNavigate()

  const { diocese } = useDiocese(parseInt(id ?? ''))

  const { parishes, loaded } = useParishes()

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
      width: 75,
    },
    {
      field: 'name',
      headerName: 'Nazwa Parafii',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Adres Parafii',
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

  useEffect(() => {
    console.log()
  }, [loaded])

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły: {diocese?.name}</Typography>

        <Typography variant='h4'>Parafie</Typography>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={
              parishes
                ?.filter((p) => p.dioceseId === diocese?.id)
                .map((u, idx) => ({
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
