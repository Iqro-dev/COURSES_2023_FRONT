import { Grid, Typography, Box, Button, Dialog, DialogTitle, DialogActions } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useDioceses } from '../../hooks/diocese/use-dioceses'
import { Add, Delete, Edit } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { CustomDataGrid } from '../../components/data-grid'

export default function DiocesesList() {
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [deleteDialogId, setDeleteDialogId] = useState(0)

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
      field: 'Akcje',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Edit />}
          onClick={() => navigate(`/dashboard/dioceses/details?id=${params.id}`)}
        />,

        <GridActionsCellItem
          label={''}
          icon={<Delete color='error' />}
          onClick={() => {
            setDeleteDialog(true)
            setDeleteDialogId(params.id)
          }}
        />,
      ],
      flex: 1,
      align: 'right',
    },
  ]

  return (
    <>
      <Dialog open={deleteDialog} sx={{ padding: 4 }}>
        <DialogTitle>Czy na pewno chcesz usunąć tą diecezję?</DialogTitle>

        <DialogActions
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Button
            color='primary'
            onClick={() => {
              setDeleteDialog(false)
            }}
          >
            Anuluj
          </Button>

          <Button
            color='error'
            onClick={() => {
              handleDelete(deleteDialogId)
              setDeleteDialog(false)
            }}
          >
            Usuń
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant='h4'>Diecezje</Typography>

          <Button variant='outlined' color='primary' component={Link} to='./add'>
            <Add />
            Dodaj diecezje
          </Button>
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <CustomDataGrid
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
