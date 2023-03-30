import { useSnackbar } from 'notistack'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../providers/auth-provider'

export default function LoginPage() {
  const [values, setValues] = useState({
    showPassword: false,
    email: '',
    password: '',
    loading: false,
  })

  const { login: _login } = useContext(AuthContext)

  const { enqueueSnackbar } = useSnackbar()

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    setValues({
      ...values,
      loading: true,
    })

    _login(values.email, values.password).then(({ isSuccess, code }) => {
      if (isSuccess) {
        location.replace('/dashboard')
      }

      if (code === 404) {
        enqueueSnackbar('Niepoprawne dane', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })
      }

      if (code === 403) {
        enqueueSnackbar('Zablokowane', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'info',
        })
      }

      setValues({
        ...values,
        loading: false,
      })
    })
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Zaloguj się
          </Typography>

          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label={'Adres e-mail'}
                name='email'
                autoComplete='email'
                autoFocus
                disabled={values.loading}
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.currentTarget.value })}
              />
            </FormControl>

            <FormControl variant='outlined' margin='normal' fullWidth>
              <InputLabel htmlFor='password' required>
                Hasło
              </InputLabel>

              <OutlinedInput
                required
                name='password'
                label={'Hasło'}
                id='password'
                value={values.password}
                disabled={values.loading}
                onChange={(e) => setValues({ ...values, password: e.currentTarget.value })}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <LoadingButton
              sx={{ mt: 2, mb: 2 }}
              fullWidth
              variant='contained'
              type='submit'
              loading={values.loading}
            >
              Zaloguj się
            </LoadingButton>

            <Grid container>
              <Grid item xs>
                Zapomniałeś hasła?
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
