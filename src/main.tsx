import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './providers/auth-provider'
import { RoutesTree } from './routes'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
  palette: {
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#db3131',
          '&$error': {
            color: '#db3131',
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <SnackbarProvider>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <RoutesTree />
      </AuthProvider>
    </ThemeProvider>
  </SnackbarProvider>
  ,
)
