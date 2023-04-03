import { Box, AppBar, Toolbar, Typography } from '@mui/material'
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
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>{settings.headerText ?? 'Kursy przedmałżeńskie'}</Typography>

          <Box>{children}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
