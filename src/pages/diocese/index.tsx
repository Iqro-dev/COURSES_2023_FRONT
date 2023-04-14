import { Grid, Typography, Box, Button } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useDioceses } from '../../hooks/diocese/use-dioceses'
import { Add, Delete, Preview } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'

export default function DiocesesList() {
  const { dioceses, reload } = useDioceses()

  const { enqueueSnackbar } = useSnackbar()

  const { getApiResponse } = useApi()

  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    getApiResponse(`/dioceses?id=${id}`, Methods.DELETE).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Usunięto diecezje', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'warning',
      })

      reload()
    })
  }

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
      width: 75,
    },
    {
      field: 'name',
      headerName: 'Nazwa diecezji',
      flex: 1,
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

        <GridActionsCellItem
          label={''}
          icon={<Delete color='error' />}
          onClick={() => handleDelete(params.id)}
        />,
      ],
      flex: 1,
      align: 'right',
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant='h4'>Diecezje</Typography>

          <Button variant='outlined' color='primary' component={Link} to='./add'>
            <Add />
            Dodaj diecezje
          </Button>
        </Box>

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
