import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useValidationResolver } from '../../hooks/forms/use-validate'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InstructorPost } from '../../types/instructor/instructor-post'
import { useParishes } from '../../hooks/parish/use-parishes'
import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import {
  ParishesAutocomplete,
  parishesOptions,
} from '../../components/inputs/parishes-autocomplete'

export default function AddInstructor() {
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
    description: Yup.string().required('Opis jest wymagany'),
    qualifications: Yup.string().required('Kwalifikacje są wymagane'),
  })

  const resolver = useValidationResolver(validationSchema)

  const [checked, setChecked] = useState(false)

  const [selectedParishes, setSelectedParishes] = useState<number[]>([])

  const { parishes } = useParishes()

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
    if (selectedParishes.length === 0) return
    console.log('valid', formData)

    const data: InstructorPost = {
      email: formData.email,
      passwordHash: formData.password,
      role: 'instructor',
      status: true,
      instructor: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        description: formData.description,
        qualifications: formData.qualifications,
        parishesIds: selectedParishes,
      },
    }

    getApiResponse('/users', Methods.POST, data)
      .then(() => {
        enqueueSnackbar('Zapisano', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'success',
        })
        navigate(-1)
      })
      .catch(() => {
        enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })
      })
  }

  useEffect(() => {
    // console.log(parishes)
  }, [parishes])

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(onValid)}>
        <Stack direction='row'>
          <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
            <Typography variant='h4'>Dodaj prowadzącego</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
              <TextField label={'E-mail'} id='email' {...inputProps('email')} />

              <TextField
                label={'Hasło'}
                type='password'
                id='password'
                {...inputProps('password')}
              />

              <TextField
                label={'Powtórz hasło'}
                type='password'
                id='repeatPassword'
                {...inputProps('repeatPassword')}
              />

              <Typography>Dane prowadzącego</Typography>

              <TextField label={'Imię'} id='firstName' {...inputProps('firstName')} />

              <TextField label={'Nazwisko'} id='lastName' {...inputProps('lastName')} />

              <TextField multiline rows={6} label={'Opis'} id='description' {...inputProps('description')} />

              <TextField
                rows={6}
                maxRows={20}
                multiline
                label={'Kwalifikacje'}
                id='qualifications'
                {...inputProps('qualifications')}
              />

              <ParishesAutocomplete
                multiple
                value={
                  parishesOptions.filter((c) => selectedParishes.includes(c.value ?? -1)) ?? null
                }
                onChange={(_, e) => {
                  const ids = e?.map((c) => c.value ?? -1) ?? []
                  setSelectedParishes([...ids])
                }}
                error={selectedParishes.length === 0 && checked}
              />
            </Box>
          </Grid>
        </Stack>

        <Stack direction='row' justifyContent='space-between' sx={{ padding: 2 }}>
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
    </>
  )
}
