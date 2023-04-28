import { Box, Grid, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useValidationResolver } from '../../hooks/forms/use-validate'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InstructorPost } from '../../types/instructor/instructor-post'

export default function AddInstructor() {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('E-mail jest wymagany'),
    password: Yup.string().required('Hasło jest wymagane'),
    repeatPassword: Yup.string()
      .required('Hasło jest wymagane')
      .oneOf([Yup.ref('password'), ''], 'Hasła muszą być takie same'),
    firstName: Yup.string().required('Imię jest wymagane'),
    lastName: Yup.string().required('Nazwisko jest wymagane'),
    description: Yup.string().required('Opis jest wymagany'),
    qualifications: Yup.string().required('Kwalifikacje są wymagane'),
    parishesIds: Yup.array().of(Yup.number()).required('Proszę wybrać parafię'),
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

    if (!!errors[name])
      return {
        ...commonProps,
        error: true,
        helperText: errors[name]?.message?.toString(),
      }
    return { ...commonProps }
  }

  const onValid: SubmitHandler<any> = (formData) => {
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
        parishesIds: formData.parishesIds,
      },
    }

    console.log(data)
  }

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Dodaj prowadzącego</Typography>

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

          <Typography>Dane prowadzącego</Typography>

          <TextField label={'Imię'} id='firstName' {...inputProps('firstName')} />

          <TextField label={'Nazwisko'} id='lastName' {...inputProps('lastName')} />

          <TextField label={'Opis'} id='description' {...inputProps('description')} />

          <TextField label={'Kwalifikacje'} id='qualifications' {...inputProps('qualifications')} />

          <LoadingButton color='success' variant='contained' type='submit'>
            <Typography>Dodaj</Typography>
          </LoadingButton>
        </Box>
      </Grid>
    </>
  )
}
