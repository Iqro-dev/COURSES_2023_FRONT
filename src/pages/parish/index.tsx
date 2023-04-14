import { Grid, Typography, Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Add, Delete, Edit } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useParishes } from '../../hooks/parish/use-parishes'
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'

export default function ParishesList() {
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [deleteDialogId, setDeleteDialogId] = useState(0)

  const { enqueueSnackbar } = useSnackbar()

  const { getApiResponse } = useApi()

  const { parishes, reload } = useParishes()

  const navigate = useNavigate()

  const handleDelete = (id: number) => {
    getApiResponse(`/parishes?id=${id}`, Methods.DELETE).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Usunięto parafię', {
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
      headerName: 'Nazwa parafii',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Adres parafii',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Edit />}
          onClick={() => navigate(`/dashboard/parishes/details?id=${params.id}`)}
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
          <Typography variant='h4'>Parafie</Typography>

          <Button variant='outlined' color='primary' component={Link} to='./add'>
            <Add />
            Dodaj parafie
          </Button>
        </Box>

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
