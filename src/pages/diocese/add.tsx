import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { useValidationResolver } from '../../hooks/forms/use-validate'
import { LoadingButton } from '@mui/lab'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function AddDiocese() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nazwa jest wymagana'),
  })

  const resolver = useValidationResolver(validationSchema)

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

  const onValid: SubmitHandler<any> = (formData) => {
    console.log('valid', formData)

    const data = {
      name: formData.name,
    }

    getApiResponse('/dioceses', Methods.POST, data).then((res) => {
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

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Dodaj diecezje</Typography>

        <Box
          component='form'
          onSubmit={handleSubmit(onValid)}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          <TextField label={'Nazwa diecezji'} id='name' {...inputProps('name')} />

          <Stack direction='row' justifyContent='space-between'>
            <LoadingButton color='primary' variant='contained' onClick={() => navigate(-1)}>
              Powrót
            </LoadingButton>

            <LoadingButton
              color='success'
              variant='contained'
              type='submit'
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
