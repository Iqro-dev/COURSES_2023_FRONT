import { Grid, Typography, Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useInstructors } from '../../hooks/instructor/use-instructors'
import { Add, Delete, Edit } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Methods } from '../../types/fetch-methods'
import { useApi } from '../../hooks/use-api'
import { useSnackbar } from 'notistack'
import { CustomDataGrid } from '../../components/data-grid'

export default function InstructorsList() {
  const { instructors, reload } = useInstructors()

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
      field: 'instructorFirstName',
      headerName: 'Imię',
      valueGetter: (params: any) => params.row?.instructor?.firstName,
      flex: 1,
    },
    {
      field: 'instructorLastName',
      headerName: 'Nazwisko',
      valueGetter: (params: any) => params.row?.instructor?.lastName,
      flex: 1,
    },
    {
      field: 'Akcje',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Edit />}
          onClick={() => navigate(`/dashboard/instructor/details?id=${params.id}`)}
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
        <DialogTitle>Czy na pewno chcesz usunąć prowadzącego?</DialogTitle>

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
          <Typography variant='h4'>Prowadzący</Typography>

          <Button variant='outlined' color='primary' component={Link} to='./add'>
            <Add />
            Dodaj prowadzącego
          </Button>
        </Box>

        <Box sx={{ width: '100%' }}>
          <CustomDataGrid
            rows={
              instructors?.map((u, idx) => ({
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
