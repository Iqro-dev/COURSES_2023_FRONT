import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { InputText } from '../../components/inputs/text'
import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useUser } from '../../hooks/users/use-user'
import { User } from '../../types/user'
import Roles from '../../types/roles'
import { useParishes } from '../../hooks/parish/use-parishes'

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

  const { parishes } = useParishes()

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

          <FormControl>
            <InputLabel>Parafie</InputLabel>

            <Select
              multiple
              value={instructorDetails?.instructor?.parishesIds ?? []}
              onChange={(e) => setInstructorDetails({
                ...instructorDetails,
                instructor: {
                  ...instructorDetails.instructor,
                  parishesIds: e.target.value as number[],
                },
              })}
              input={<OutlinedInput label="Name" />}
            >
              {parishes?.map((parish) => (
                <MenuItem
                  key={parish.id}
                  value={parish.id}
                >
                  {parish.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => navigate(-1)} variant='contained' color='primary'>
            Powrót
          </Button>

          <Button onClick={handleEdit} variant='contained' color='success'>
            Zapisz
          </Button>
        </Stack>
      </Grid>
    </>
  )
}
