import { Box, Grid, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import { SidebarItems } from '../components/sidebar-items'

export default function DashboardLayout() {
  return (
    <>
      <Box sx={{ height: '100vh' }}>
        <Navbar />

        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
          <Sidebar>
            <SidebarItems />
          </Sidebar>

          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              padding: 2,
              width: '100%',
            }}
          >
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
              </Paper>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  )
}
