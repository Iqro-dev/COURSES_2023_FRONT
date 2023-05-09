import { Grid, Typography, Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useAdmins } from '../../hooks/admin/use-admins'
import { CustomDataGrid } from '../../components/data-grid'
import { Link, useNavigate } from 'react-router-dom'
import { Add, Delete, Edit } from '@mui/icons-material'
import { useState } from 'react'
import { useApi } from '../../hooks/use-api'
import { useSnackbar } from 'notistack'
import { Methods } from '../../types/fetch-methods'

export default function AdminsList() {
  const { admins, reload } = useAdmins()

  const navigate = useNavigate()

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState(0)

  const handleDelete = (id: number) => {
    getApiResponse(`/users?id=${id}`, Methods.DELETE).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Usunięto prowadzącego', {
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
      field: 'email',
      headerName: 'Login (e-mail)',
      flex: 1,
    },
    {
      field: 'adminFirstName',
      headerName: 'Imię',
      valueGetter: (params: any) => params.row?.admin?.firstName,
      flex: 1,
    },
    {
      field: 'adminLastName',
      headerName: 'Nazwisko',
      valueGetter: (params: any) => params.row?.admin?.lastName,
      flex: 1,
    },
    {
      field: 'Akcje',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Edit />}
          onClick={() => navigate(`/dashboard/administrators/details?id=${params.id}`)}
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
        <DialogTitle>Czy na pewno chcesz usunąć administratora?</DialogTitle>

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
          <Typography variant='h4'>Administratorzy</Typography>

          <Button variant='outlined' color='primary' component={Link} to='./add'>
            <Add />
            Dodaj administratora
          </Button>
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <CustomDataGrid
            rows={
              admins?.map((u, idx) => ({
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
