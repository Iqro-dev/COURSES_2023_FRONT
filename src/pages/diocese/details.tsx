import { Grid, Typography, Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDiocese } from '../../hooks/diocese/use-diocese'

export default function DioceseDetails() {
  const [params] = useSearchParams()

  const id = params.get('id')

  const { diocese } = useDiocese(parseInt(id ?? ''))

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły diecezji</Typography>

        <Box sx={{ height: 500, width: '100%' }}>
          <Typography variant='h5'>Nazwa diecezji:</Typography>
          <Typography variant='body1'>{diocese?.name}</Typography>
        </Box>
      </Grid>
    </>
  )
}
