import { Grid, Typography, Box } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useAdmins } from '../../hooks/admin/use-admins'

export default function AdminsList() {
  const { admins } = useAdmins()

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
      field: 'adminPhoneNumber',
      headerName: 'Telefon',
      valueGetter: (params: any) => params.row?.admin?.phoneNumber ?? 'Brak numeru telefonu',
      flex: 1,
    },
  ]

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Administratorzy</Typography>

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
