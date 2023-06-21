import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { InputText } from '../../components/inputs/text'
import { useState, useEffect, useContext } from 'react'
import { useSnackbar } from 'notistack'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useUser } from '../../hooks/users/use-user'
import { User } from '../../types/user'
import Roles from '../../types/roles'
import { AuthContext } from '../../providers/auth-provider'

export default function AdminDetails() {
  const [params] = useSearchParams()
  const id = params.get('id')

  const { user, loaded } = useUser(parseInt(id ?? ''))

  const {
    auth: { id: authId }
  } = useContext(AuthContext)

  const [changePassword, setChangePassword] = useState(false)

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  })

  const [adminDetails, setAdminDetails] = useState<User>({
    id: parseInt(id ?? ''),
    email: '',
    role: '' as Roles,
    status: false,
    admin: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
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

    let editPromises = []

    editPromises.push(getApiResponse('/users', Methods.PUT, adminDetails))

    if (changePassword)
      editPromises.push(
        getApiResponse('/users/password', Methods.PUT, { UserId: adminDetails.id, OldPassword: passwords.oldPassword, NewPassword: passwords.newPassword })
      )

    Promise.all(
      editPromises.map(
        (promise) =>
          new Promise(async (resolve, reject) => {
            const response = await promise
            if (!response.isSuccess) reject()
            resolve(response)
          }),
      ),
    ).then(() => {
      enqueueSnackbar('Zmiany zostały zapisane', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'info',
      })

      navigate(-1)
    }).catch(() => {
      enqueueSnackbar('Coś poszło nie tak', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'error',
      })
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

          <InputText
            label='Numer telefonu'
            value={adminDetails?.admin?.phoneNumber ?? ''}
            onChange={(e) =>
              setAdminDetails({
                ...adminDetails,
                admin: {
                  ...adminDetails.admin!,
                  phoneNumber: e,
                },
              })
            }
          />
        </Stack>

        <Stack direction='column' gap={2} sx={{ padding: 2 }}>
          <FormControlLabel control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangePassword(e.target.checked)} />} label="Zmiana hasła" />

          <Stack direction='column' gap={2} sx={{ padding: 1 }}>
            {adminDetails.id === authId && < InputText
              label='Stare hasło'
              value={passwords.oldPassword}
              disabled={!changePassword}
              type='password'
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e })
              }
            />}

            <InputText
              label='Nowe hasło'
              value={passwords.newPassword}
              disabled={!changePassword}
              error={passwords.newPassword !== passwords.repeatNewPassword}
              helperText={passwords.newPassword !== passwords.repeatNewPassword ? 'Hasła nie są takie same' : ''}
              type='password'
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e })
              }
            />

            <InputText
              label='Powtórz nowe hasło'
              value={passwords.repeatNewPassword}
              disabled={!changePassword}
              error={passwords.newPassword !== passwords.repeatNewPassword}
              type='password'
              onChange={(e) =>
                setPasswords({ ...passwords, repeatNewPassword: e })
              }
            />
          </Stack>
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
          <Button onClick={() => navigate(-1)} variant='contained' color='primary'>
            Powrót
          </Button>

          <Button onClick={handleEdit} disabled={!adminDetails?.admin?.lastName || !adminDetails?.admin?.firstName || !adminDetails?.email ||
            (changePassword && (passwords.newPassword !== passwords.repeatNewPassword))} variant='contained' color='success'>
            Zapisz
          </Button>
        </Stack>
      </Grid>
    </>
  )
}
