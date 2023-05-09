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

export default function AdminDetails() {
  const [params] = useSearchParams()
  const id = params.get('id')

  const { user, loaded } = useUser(parseInt(id ?? ''))

  const [adminDetails, setAdminDetails] = useState<User>({
    id: parseInt(id ?? ''),
    email: '',
    role: '' as Roles,
    status: false,
    admin: {
      firstName: '',
      lastName: '',
    }
  })

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const handleEdit = () => {
    setAdminDetails({
      ...adminDetails,
      email: user?.email.trim() ?? '',
    })

    getApiResponse('/users', Methods.PUT, adminDetails).then((res) => {
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
    if (user) setAdminDetails(user)
  }, [loaded])

  useEffect(() => {
    console.log(adminDetails)
  }, [adminDetails])

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły:</Typography>

        <Stack direction='column' gap={2}>
          <InputText
            label='Email'
            value={adminDetails?.email ?? ''}
            onChange={(e) =>
              setAdminDetails({
                ...adminDetails,
                email: e,
              })
            }
          />

          <InputText
            label='Imię'
            value={adminDetails?.admin?.firstName ?? ''}
            onChange={(e) =>
              setAdminDetails({
                ...adminDetails,
                admin: {
                  ...adminDetails.admin!,
                  firstName: e,
                },
              })
            }
          />

          <InputText
            label='Nazwisko'
            value={adminDetails?.admin?.lastName ?? ''}
            onChange={(e) =>
              setAdminDetails({
                ...adminDetails,
                admin: {
                  ...adminDetails.admin!,
                  lastName: e,
                },
              })
            }
          />
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => navigate(-1)} variant='contained' color='primary'>
            Powrót
          </Button>

          <Button onClick={handleEdit} disabled={!adminDetails?.admin?.lastName || !adminDetails?.admin?.firstName || !adminDetails?.email} variant='contained' color='success'>
            Zapisz
          </Button>
        </Stack>
      </Grid>
    </>
  )
}
