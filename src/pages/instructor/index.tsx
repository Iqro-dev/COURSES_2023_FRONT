import { Grid, Typography, Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useInstructors } from '../../hooks/instructor/use-instructors'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function LecturersList() {
  const { instructors } = useInstructors()

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
      field: 'instructorPhoneNumber',
      headerName: 'Telefon',
      valueGetter: (params: any) => params.row?.instructor?.phoneNumber ?? 'Brak numeru telefonu',
      flex: 1,
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant='h4'>Prowadzący</Typography>

          <Button variant='outlined' color='primary' component={Link} to='./add'>
            <Add />
            Dodaj prowadzącego
          </Button>
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
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
