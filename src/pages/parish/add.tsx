import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import {
  DiocesesAutocomplete,
  diocesesOptions,
} from '../../components/inputs/dioceses-autocomplete'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useValidationResolver } from '../../hooks/forms/use-validate'
import { useDioceses } from '../../hooks/diocese/use-dioceses'

export default function AddParish() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa jest wymagana'),
    address: Yup.string().required('Nazwa jest wymagana'),
  })

  const resolver = useValidationResolver(validationSchema)

  const { dioceses } = useDioceses()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver })

  const inputProps = (name: string) => {
    const commonProps = {
      ...register(name),
    }

    if (!!errors[name]) {
      return {
        ...commonProps,
        error: true,
        helperText: errors[name]?.message?.toString(),
      }
    }

    return { ...commonProps, error: false, helperText: '' }
  }

  const [checked, setChecked] = useState(false)

  const onValid: SubmitHandler<any> = (formData) => {
    if (dioceseId === -1) return
    console.log('valid', formData)

    const data = {
      name: formData.name,
      address: formData.address,
      dioceseId: dioceseId,
    }

    getApiResponse('/parishes', Methods.POST, data).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Parafia została dodana', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'success',
      })

      navigate(-1)
    })
  }

  const [dioceseId, setDioceseId] = useState(-1)

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  useEffect(() => {
    // console.log(dioceses)
  }, [dioceses])

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Dodaj parafię</Typography>

        <Box
          component='form'
          onSubmit={handleSubmit(onValid)}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          <TextField label={'Nazwa parafii'} id='name' {...inputProps('name')} />

          <TextField label={'Adres parafii'} id='address' {...inputProps('address')} />

          <DiocesesAutocomplete
            value={diocesesOptions.find((c) => c.value === dioceseId) ?? null}
            onChange={(_, e) => {
              setDioceseId(e?.value ?? -1)
            }}
            error={dioceseId === -1 && checked}
          />

          <Stack direction='row' justifyContent='space-between'>
            <LoadingButton color='primary' variant='contained' onClick={() => navigate(-1)}>
              Powrót
            </LoadingButton>

            <LoadingButton
              color='success'
              variant='contained'
              type='submit'
              onClick={() => setChecked(true)}
              sx={{ width: 150, alignSelf: 'end' }}
            >
              Zapisz
            </LoadingButton>
          </Stack>
        </Box>
      </Grid>
    </>
  )
}
