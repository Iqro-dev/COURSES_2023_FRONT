import { Button, Grid, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { InputText } from '../../components/inputs/text'
import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useUser } from '../../hooks/users/use-user'
import { User } from '../../types/user'
import Roles from '../../types/roles'
import { ParishesAutocomplete, parishesOptions } from '../../components/inputs/parishes-autocomplete'

export default function InstructorDetails() {
  const [params] = useSearchParams()
  const id = params.get('id')

  const { user, loaded } = useUser(parseInt(id ?? ''))

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
      otherAttachPaths: '',
      profilePicturePath: '',
      qualificationsAttachPaths: '',
    }
  })

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const handleEdit = () => {
    delete instructorDetails.instructor.parishes
    setInstructorDetails({
      ...instructorDetails,
      email: user?.email.trim() ?? '',
    })

    getApiResponse('/users', Methods.PUT, instructorDetails).then((res) => {
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
    if (user) setInstructorDetails({
      ...user,
      instructor: {
        ...user.instructor,
        parishesIds: user?.instructor?.parishes?.map((parish) => parish.id) ?? [],
      }
    })
  }, [loaded])

  useEffect(() => {
    console.log(instructorDetails)
  }, [instructorDetails])

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
                  ...instructorDetails.instructor,
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
                  ...instructorDetails.instructor,
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
                  ...instructorDetails.instructor,
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
                  ...instructorDetails.instructor,
                  qualifications: e,
                },
              })
            }
          />

          <ParishesAutocomplete
            multiple
            value={parishesOptions.filter((c) => instructorDetails.instructor.parishesIds?.includes(c.value ?? -1)) ?? null}
            onChange={(_, e) => {
              const ids = e?.map((c) => c.value ?? -1) ?? []
              setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor,
                  parishesIds: ids as number[],
                },
              })
            }}
            error={instructorDetails.instructor.parishesIds?.length === 0}
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => navigate(-1)} variant='contained' color='primary'>
            Powrót
          </Button>

          <Button onClick={handleEdit} disabled={instructorDetails.instructor.parishesIds?.length === 0 || instructorDetails?.instructor?.qualifications === '' || instructorDetails?.instructor?.description === '' || instructorDetails?.instructor?.lastName === '' || instructorDetails?.instructor?.firstName === '' || instructorDetails?.email === ''} variant='contained' color='success'>
            Zapisz
          </Button>
        </Stack>
      </Grid>
    </>
  )
}
