import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useValidationResolver } from '../../hooks/forms/use-validate'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { AdminPost } from '../../types/admin/admin-post'

export default function AddAdmin() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('E-mail musi być poprawny').required('E-mail jest wymagany'),
    password: Yup.string()
      .required('Hasło jest wymagane')
      .min(4, 'Hasło musi mieć przynajmniej 4 znaki'),
    repeatPassword: Yup.string()
      .required('Hasło jest wymagane')
      .oneOf([Yup.ref('password'), ''], 'Hasła muszą być takie same')
      .min(4, 'Hasło musi mieć przynajmniej 4 znaki'),
    firstName: Yup.string().required('Imię jest wymagane'),
    lastName: Yup.string().required('Nazwisko jest wymagane'),
  })

  const resolver = useValidationResolver(validationSchema)

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const { getApiResponse } = useApi()

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

    const data: AdminPost = {
      email: formData.email,
      passwordHash: formData.password,
      role: 'admin',
      status: true,
      admin: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      },
    }

    getApiResponse('/users', Methods.POST, data).then((res) => {
      console.log(res)
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Zapisano', {
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
        <Typography variant='h4'>Dodaj administratora</Typography>

        <Box
          component='form'
          onSubmit={handleSubmit(onValid)}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >
          <TextField label={'E-mail'} id='email' {...inputProps('email')} />

          <TextField label={'Hasło'} type='password' id='password' {...inputProps('password')} />

          <TextField
            label={'Powtórz hasło'}
            type='password'
            id='repeatPassword'
            {...inputProps('repeatPassword')}
          />

          <Typography>Dane administratora</Typography>

          <TextField label={'Imię'} id='firstName' {...inputProps('firstName')} />

          <TextField label={'Nazwisko'} id='lastName' {...inputProps('lastName')} />

          <TextField label={'Numer telefonu'} id='lastName' {...inputProps('phoneNumber')} />

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
