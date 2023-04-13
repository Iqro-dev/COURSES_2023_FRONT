import { Grid, Typography, Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDiocese } from '../../hooks/diocese/use-diocese'
import { useParishes } from '../../hooks/parish/use-parishes'
import { useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

export default function DioceseDetails() {
  const [params] = useSearchParams()

  const id = params.get('id')

  const { diocese } = useDiocese(parseInt(id ?? ''))

  const { parishes, loaded } = useParishes()

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
      width: 50,
    },
    {
      field: 'name',
      headerName: 'Nazwa Parafii',
      minWidth: 150,
    },
    {
      field: 'address',
      headerName: 'Adres Parafii',
      minWidth: 200,
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
