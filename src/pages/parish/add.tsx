import { Grid, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Parish } from '../../types/parish/parish'
import {
  DiocesesAutocomplete,
  diocesesOptions,
} from '../../components/inputs/dioceses-autocomplete'

export default function AddParish() {
  const [parish, setParish] = useState<Parish>({ name: '', address: '', dioceseId: -1 })

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const handleAddParish = () => {
    getApiResponse('/parishes', Methods.POST, parish).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Diecezja została dodana', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'success',
      })

      navigate(-1)
    })
  }

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Dodaj parafię</Typography>

        <TextField
          label={'Nazwa parafii'}
          required
          onChange={(e) => setParish({ ...parish, name: e.target.value })}
        />

        <TextField
          label={'Adres parafii'}
          required
          onChange={(e) => setParish({ ...parish, address: e.target.value })}
        />

        <DiocesesAutocomplete
          value={diocesesOptions.find((c) => c.value === parish.dioceseId) ?? null}
          onChange={(_, e) => {
            setParish((prev) => ({ ...prev, dioceseId: e?.value ?? -1 }))
          }}
        />

        <Stack direction='row' justifyContent='space-between'>
          <LoadingButton color='primary' variant='contained' onClick={() => navigate(-1)}>
            Powrót
          </LoadingButton>

          <LoadingButton
            color='success'
            disabled={!parish?.name || !parish?.address || parish.dioceseId === -1}
            variant='contained'
            onClick={handleAddParish}
            sx={{ width: 150, alignSelf: 'end' }}
          >
            Dodaj
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  )
}
