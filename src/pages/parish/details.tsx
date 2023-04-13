import { Grid, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useParish } from '../../hooks/parish/use-parish'

export default function ParishDetails() {
  const [params] = useSearchParams()

  const id = params.get('id')

  const { parish } = useParish(parseInt(id ?? ''))

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły: {parish?.name}</Typography>
      </Grid>
    </>
  )
}
