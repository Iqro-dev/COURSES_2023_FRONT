import { Box, Grid, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function AdminList() {
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const columns = [
    {
      field: 'id',
      headerName: 'Lp.',
    },
    {
      field: 'firstName',
      headerName: 'Imię',
    },
    {
      field: 'lastName',
      headerName: 'Nazwisko',
    },
    {
      field: 'age',
      headerName: 'Wiek',
    }
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
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Grid>
    </>
  )
}
