import { Box, AppBar, Toolbar } from '@mui/material'
import { PropsWithChildren } from 'react'
import { useSettings } from '../hooks/use-settings'

export default function Navbar({ children }: PropsWithChildren) {
  const { settings } = useSettings()

  return (
    <Box>
      <AppBar position='absolute' sx={{ backgroundColor: settings.headerColor ?? '#000000' }}>
        <Toolbar
          variant='dense'
          sx={{
            height: '48px',
            display: 'flex',
            width: '100%',
          }}
        >
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
