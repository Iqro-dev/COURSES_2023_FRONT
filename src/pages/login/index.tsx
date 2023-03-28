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
import { FormEvent, useState } from 'react'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'

export default function LoginPage() {
  const [values, setValues] = useState({
    showPassword: false,
  })

  const { getApiResponse } = useApi()

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    getApiResponse('/settings', Methods.GET).then((response) => {
      console.log(response)
    })

    // location.replace('/dashboard')
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
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label={'Adres e-mail'}
              name='email'
              autoComplete='email'
              autoFocus
            />

            <FormControl variant='outlined' margin='normal' fullWidth>
              <InputLabel htmlFor='password' required>
                Hasło
              </InputLabel>

              <OutlinedInput
                required
                name='password'
                label={'Hasło'}
                id='password'
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

            <LoadingButton sx={{ mt: 2, mb: 2 }} fullWidth variant='contained' type='submit'>
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
