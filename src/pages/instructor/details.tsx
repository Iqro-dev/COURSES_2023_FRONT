import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { InputText } from '../../components/inputs/text'
import { useState, useEffect, ChangeEvent, useContext } from 'react'
import { useSnackbar } from 'notistack'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useUser } from '../../hooks/users/use-user'
import { User } from '../../types/user'
import Roles from '../../types/roles'
import {
  ParishesAutocomplete,
  parishesOptions,
} from '../../components/inputs/parishes-autocomplete'
import { LoadingButton } from '@mui/lab'
import { Clear } from '@mui/icons-material'
import { Image } from 'mui-image'
import { ImageObject } from '../../types/settings/image-object'
import { AuthContext } from '../../providers/auth-provider'
import { useInstructorsFiles } from '../../hooks/instructor/use-instructor-files'

export default function InstructorDetails() {
  const [avatar, setAvatar] = useState<ImageObject>({})
  // const [qualifications, setQualifications] = useState<ImageObject[]>([])
  // const [otherImages, setOtherImages] = useState<ImageObject[]>([])

  const [params] = useSearchParams()
  const id = params.get('id')

  const { user } = useContext(AuthContext)

  const { avatar: avatarImage, loaded: loadedFiles } = useInstructorsFiles(parseInt(id ?? ''))

  const { user: instructor, loaded } = useUser(parseInt(id ?? ''))

  const [instructorDetails, setInstructorDetails] = useState<User>({
    id: parseInt(id ?? ''),
    email: '',
    role: '' as Roles,
    status: false,
    instructor: {
      firstName: '',
      lastName: '',
      description: '',
      qualifications: '',
      parishesIds: [],
    },
  })

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  function setFileInput(e: ChangeEvent<HTMLInputElement>, type: string) {
    console.log('e', e)
    if (e.target.files) {
      console.log(e.target.files[0])
      if (type === 'profile_image')
        setAvatar({ objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
      // else if (type === 'qualification_image')
      //   setQualifications([
      //     ...qualifications,
      //     { objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
      //   ])
      // else if (type === 'other_image')
      //   setOtherImages([
      //     ...otherImages,
      //     { objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] },
      //   ])
    }
  }

  const createFormData = (img: File, type: string) => {
    const formData = new FormData()

    formData.append('image_type', type)
    formData.append('file', img)

    return formData
  }

  const handleEdit = () => {
    setInstructorDetails({
      ...instructorDetails,
      email: instructorDetails?.email.trim() ?? '',
    })

    const imagePromises = []

    const dataPromise = getApiResponse('/users', Methods.PUT, instructorDetails)

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
        enqueueSnackbar('Zmiany zostały zapisane', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'info',
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
    console.log('instructor', instructor)
    if (instructor)
      setInstructorDetails({
        ...instructor,
        instructor: {
          ...instructor.instructor!,
          parishesIds: instructor?.instructor?.parishes?.map((parish) => parish.id) ?? [],
        },
      })
  }, [loaded, instructor])

  useEffect(() => {
    console.log(instructorDetails)
  }, [instructorDetails])

  useEffect(() => {
    setAvatar(avatarImage)
  }, [loadedFiles])

  useEffect(() => {
    console.log(avatar)
  }, [avatar])

  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły:</Typography>

        <Stack direction='column' gap={2}>
          <InputText
            label='Email'
            value={instructorDetails?.email ?? ''}
            onChange={(e) =>
              setInstructorDetails({
                ...instructorDetails,
                email: e,
              })
            }
          />

          <InputText
            label='Imię'
            value={instructorDetails?.instructor?.firstName ?? ''}
            onChange={(e) =>
              setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor!,
                  firstName: e,
                },
              })
            }
          />

          <InputText
            label='Nazwisko'
            value={instructorDetails?.instructor?.lastName ?? ''}
            onChange={(e) =>
              setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor!,
                  lastName: e,
                },
              })
            }
          />

          <InputText
            label='Opis'
            value={instructorDetails?.instructor?.description ?? ''}
            onChange={(e) =>
              setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor!,
                  description: e,
                },
              })
            }
          />

          <InputText
            label='Kwalifikacje'
            value={instructorDetails?.instructor?.qualifications ?? ''}
            onChange={(e) =>
              setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor!,
                  qualifications: e,
                },
              })
            }
          />

          <ParishesAutocomplete
            multiple
            value={
              parishesOptions.filter((c) =>
                instructorDetails.instructor?.parishesIds?.includes(c.value ?? -1),
              ) ?? null
            }
            onChange={(_, e) => {
              const ids = e?.map((c) => c.value ?? -1) ?? []
              setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor!,
                  parishesIds: ids as number[],
                },
              })
            }}
            error={instructorDetails.instructor?.parishesIds?.length === 0}
          />
        </Stack>

        {user.role === 'instructor' && (
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
        )}

        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => navigate(-1)} variant='contained' color='primary'>
            Powrót
          </Button>

          <Button
            onClick={handleEdit}
            disabled={
              instructorDetails.instructor?.parishesIds?.length === 0 ||
              !instructorDetails?.instructor?.qualifications ||
              !instructorDetails?.instructor?.description ||
              !instructorDetails?.instructor?.lastName ||
              !instructorDetails?.instructor?.firstName ||
              !instructorDetails?.email
            }
            variant='contained'
            color='success'
          >
            Zapisz
          </Button>
        </Stack>
      </Grid>
    </>
  )
}
