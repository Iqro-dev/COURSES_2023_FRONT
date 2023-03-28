import { Box, AppBar, Toolbar, Typography } from '@mui/material'

export default function Navbar() {
  return (
    <Box>
      <AppBar position='absolute'>
        <Toolbar variant='dense'
          sx={{
            pr: '24px', // keep right padding when drawer closed
            height: '48px',
          }}>
          <Typography variant='h6'>Kursy przedmałżeńskie</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
