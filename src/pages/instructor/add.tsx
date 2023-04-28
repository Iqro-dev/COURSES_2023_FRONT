import { Grid, TextField, Typography } from '@mui/material'
import { Instructor } from '../../types/instructor/instructor'
import { useState } from 'react'

export default function AddInstructor() {
  const [instructor, setInstructor] = useState<Instructor>({
    firstName: '',
    lastName: '',
    description: '',
    qualifications: '',
  })

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Dodaj prowadzącego</Typography>

        <TextField
          label={'Imię'}
          required
          onChange={(e) => setInstructor({ ...instructor, firstName: e.target.value })}
        />

        <TextField
          label={'Nazwisko'}
          required
          onChange={(e) => setInstructor({ ...instructor, lastName: e.target.value })}
        />
        <TextField
          label={'Opis'}
          required
          onChange={(e) => setInstructor({ ...instructor, description: e.target.value })}
        />

        <TextField
          label={'Kwalifikacje'}
          required
          onChange={(e) => setInstructor({ ...instructor, qualifications: e.target.value })}
        />
      </Grid>
    </>
  )
}
