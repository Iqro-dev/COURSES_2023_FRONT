import { Button, Grid, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useParish } from '../../hooks/parish/use-parish'
import { InputText } from '../../components/inputs/text'
import { useState, useEffect } from 'react'
import { Parish } from '../../types/parish/parish'
import { DiocesesAutocomplete, diocesesOptions } from '../../components/inputs/dioceses-autocomplete'
import { useSnackbar } from 'notistack'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'

export default function ParishDetails() {
  const [parishDetails, setParishDetails] = useState<Parish>({
    name: '',
    address: '',
    dioceseId: -1,
  })

  const [params] = useSearchParams()

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const id = params.get('id')

  const { parish, loaded } = useParish(parseInt(id ?? ''))

  const handleEdit = () => {
    setParishDetails({ ...parishDetails, name: parishDetails.name.trim(), address: parishDetails.address.trim() })

    console.log(parishDetails)

    getApiResponse('/parishes', Methods.PUT, parishDetails).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Zmiany zostały zapisane', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'info',
      })

      navigate(-1)
    })
  }

  useEffect(() => {
    if (parish) setParishDetails(parish)
  }, [loaded])

  useEffect(() => {
    console.log(parishDetails)
  }, [parishDetails])

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły:</Typography>

        <Stack direction='column' gap={2}>
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
            value={diocesesOptions.find((c) => c.value === parishDetails.dioceseId) ?? null}
            onChange={(_, e) => {
              setParishDetails((prev) => ({ ...prev, dioceseId: e?.value ?? -1 }))
            }}
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => navigate(-1)} variant='contained' color='primary'>Powrót</Button>

          <Button onClick={handleEdit} variant='contained' color='success'>Zapisz</Button>
        </Stack>
      </Grid>
    </>
  )
}
