import { Grid, Typography, Box, TextField } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAdmins } from '../../hooks/admin/use-admins'

export default function AdminsList() {
  const { admins } = useAdmins()

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
      field: 'adminFirstName',
      headerName: 'Imię',
      valueGetter: (params: any) => params.row?.admin?.firstName,
      width: 150,
    },
    {
      field: 'adminLastName',
      headerName: 'Nazwisko',
      valueGetter: (params: any) => params.row?.admin?.lastName,
      width: 150,
    },
    {
      field: 'adminPhoneNumber',
      headerName: 'Telefon',
      valueGetter: (params: any) => params.row?.admin?.phoneNumber ?? 'Brak numeru telefonu',
      width: 300,
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Administratorzy</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TextField label={'Imię'} />

          <TextField label={'Nazwisko'} />

          <TextField label={'Wiek'} />
        </Box>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
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
