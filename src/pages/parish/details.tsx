import { Grid, Stack, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useParish } from '../../hooks/parish/use-parish'
import { InputText } from '../../components/inputs/text'
import { useState, useEffect } from 'react'
import { Parish } from '../../types/parish/parish'
import { DiocesesAutocomplete } from '../../components/inputs/dioceses-autocomplete'

export default function ParishDetails() {
  const [parishDetails, setParishDetails] = useState<Parish>({
    name: '',
    address: '',
    dioceseId: -1,
  })

  const [params] = useSearchParams()

  const id = params.get('id')

  const { parish, loaded } = useParish(parseInt(id ?? ''))

  useEffect(() => {
    if (parish) setParishDetails(parish)
  }, [loaded])

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły:</Typography>

        <Stack direction='column' alignItems='start' gap={2}>
          <InputText
            label={'Nazwa parafii'}
            onChange={(e) => {
              setParishDetails({ ...parishDetails, name: e })
            }}
            value={parishDetails.name}
            defaultValue={parish?.name}
          />

          <InputText
            label={'Adres parafii'}
            onChange={(e) => {
              setParishDetails({ ...parishDetails, address: e })
            }}
            value={parishDetails.address}
            defaultValue={parish?.address}
          />

          <DiocesesAutocomplete
            value={parishDetails.dioceseId}
            defaultValue={parish?.dioceseId}
            onChange={(e) => {
              setParishDetails((prev) => ({ ...prev, dioceseId: e ?? -1 }))
            }}
          />
        </Stack>
      </Grid>
    </>
  )
}
