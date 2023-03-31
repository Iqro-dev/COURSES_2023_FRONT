import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function Navbar({ children }: PropsWithChildren) {
  return (
    <Box>
      <AppBar position='absolute'>
        <Toolbar
          variant='dense'
          sx={{
            // keep right padding when drawer closed
            height: '48px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h6'>Kursy przedmałżeńskie</Typography>

          <Box>{children}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
