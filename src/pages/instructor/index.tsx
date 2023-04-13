import { Grid, Typography, Box, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useInstructors } from '../../hooks/instructor/use-instructors'

export default function LecturersList() {
  const { instructors } = useInstructors()

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
    },
    {
      field: 'email',
      headerName: 'Login (e-mail)',
      width: 150,
    },
    {
      field: 'role',
      headerName: 'Rola',
      width: 150,
    },
    {
      field: 'instructorFirstName',
      headerName: 'Imię',
      valueGetter: (params: any) => params.row?.instructor?.firstName,
      width: 150,
    },
    {
      field: 'instructorLastName',
      headerName: 'Nazwisko',
      valueGetter: (params: any) => params.row?.instructor?.lastName,
      width: 150,
    },
    {
      field: 'instructorPhoneNumber',
      headerName: 'Telefon',
      valueGetter: (params: any) => params.row?.instructor?.phoneNumber ?? 'Brak numeru telefonu',
      width: 300,
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Prowadzący</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField label={'Imię'} />

          <TextField label={'Nazwisko'} />

          <TextField label={'Wiek'} />
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
