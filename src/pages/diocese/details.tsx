import { Grid, Typography, Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useDiocese } from '../../hooks/diocese/use-diocese'
import { useParishes } from '../../hooks/parish/use-parishes'
import { useEffect } from 'react'

export default function DioceseDetails() {
  const [params] = useSearchParams()

  const id = params.get('id')

  const { diocese } = useDiocese(parseInt(id ?? ''))

  const { parishes, loaded } = useParishes()

  useEffect(() => {
    console.log(parishes?.map((p) => p.dioceseId === diocese?.id))
  }, [loaded])

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły: {diocese?.name}</Typography>

        <Box sx={{ height: 500, width: '100%' }}>
          <Typography variant='h4'>Parafie...</Typography>
        </Box>
      </Grid>
    </>
  )
}
