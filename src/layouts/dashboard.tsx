import { Logout } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useState, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import { SidebarItems } from '../components/sidebar-items'
import { AuthContext } from '../providers/auth-provider'

export default function DashboardLayout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    console.log(user)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { logout, user } = useContext(AuthContext)

  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ height: '100vh', display: 'flex' }}>
        <Navbar>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Typography variant='subtitle1'>{user.email}</Typography>

            <Tooltip title='Konto'>
              <IconButton
                onClick={handleClick}
                size='small'
                id='basic-button'
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openMenu ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{user.email?.slice(0, 1) ?? ''}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem>
              <Avatar />
              Moje konto
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Wyloguj się
            </MenuItem>
          </Menu>
        </Navbar>
        <Sidebar>
          <SidebarItems />
        </Sidebar>

        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            padding: 2,
            width: '100%',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar variant='dense' />
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Outlet />
            </Paper>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
