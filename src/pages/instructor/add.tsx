import {
  Box,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useValidationResolver } from '../../hooks/forms/use-validate'
import * as Yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { InstructorPost } from '../../types/instructor/instructor-post'
import { useParishes } from '../../hooks/parish/use-parishes'
import { ChangeEvent, useEffect, useState } from 'react'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import {
  ParishesAutocomplete,
  parishesOptions,
} from '../../components/inputs/parishes-autocomplete'
import { Clear } from '@mui/icons-material'
import { Image } from 'mui-image'
import { ImageObject } from '../../types/settings/image-object'

export default function AddInstructor() {
  const [avatar, setAvatar] = useState<ImageObject>({})
  const [qualifications, setQualifications] = useState<ImageObject[]>([])
  const [otherImages, setOtherImages] = useState<ImageObject[]>([])

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

  function setFileInput(e: ChangeEvent<HTMLInputElement>, type: string) {
    console.log('e', e)
    if (e.target.files) {
      console.log(e.target.files[0])
      if (type === 'profile_image')
        setAvatar({ objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
      else if (type === 'qualification_image')
        setQualifications([
          ...qualifications,
          { objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
        ])
      else if (type === 'other_image')
        setOtherImages([
          ...otherImages,
          { objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
        ])
    }
  }

  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

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

  const createFormData = (img: File, type: string) => {
    const formData = new FormData()

    formData.append('image_type', type)
    formData.append('file', img)

    return formData
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

    const dataPromise = getApiResponse('/users', Methods.POST, data)
    const imagePromises = []

    if (avatar.file)
      imagePromises.push(
        getApiResponse(
          '/images/instructors',
          Methods.POST,
          createFormData(avatar.file, 'profile_image'),
          true,
        ),
      )

    Promise.all(
      [dataPromise, ...imagePromises].map(
        (promise) =>
          new Promise(async (resolve, reject) => {
            const response = await promise
            if (!response.isSuccess) reject()
            resolve(response)
          }),
      ),
    )
      .then(() => {
        enqueueSnackbar('Zapisano', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'success',
        })
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
    console.log(parishes)
  }, [parishes])

  useEffect(() => {
    console.log(avatar)
  }, [avatar])

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

              <TextField label={'Opis'} id='description' {...inputProps('description')} />

              <TextField
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

          <Grid container direction='row' justifyContent={'end'} gap={2} sx={{ padding: 2 }}>
            <Stack gap={1}>
              <Typography variant='h5'>Zdjęcie profilowe</Typography>
              <ImageListItem>
                <Box sx={{ border: 0.1 }}>
                  <Image
                    src={avatar.objectUrl ?? ''}
                    alt={avatar.file?.name}
                    height='300px'
                    width='300px'
                    duration={500}
                    errorIcon={<img src='/avatar.svg' height='250px' width='250px' />}
                  />
                  {avatar.objectUrl && (
                    <ImageListItemBar
                      title={avatar.file?.name}
                      actionIcon={
                        <Stack direction='row'>
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`remove file ${avatar.file?.name}`}
                            onClick={() => {
                              setAvatar({ objectUrl: '', file: undefined })
                            }}
                          >
                            <Clear />
                          </IconButton>
                        </Stack>
                      }
                    />
                  )}
                </Box>
              </ImageListItem>

              <LoadingButton variant='contained' color='success' component='label'>
                Dodaj
                <input
                  type='file'
                  hidden
                  onChange={(e) => setFileInput(e, 'profile_image')}
                  onClick={onInputClick}
                  value={undefined}
                />
              </LoadingButton>
            </Stack>
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
