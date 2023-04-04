import { Logout, Menu as MenuIcon } from '@mui/icons-material'
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
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useState, useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import { SidebarItems } from '../components/sidebar-items'
import { AuthContext } from '../providers/auth-provider'
import { useSettings } from '../hooks/use-settings'

export default function DashboardLayout() {
  const { settings } = useSettings()

  const matches = useMediaQuery('(min-width:800px)')

  const [anchorEl, setAnchorEl] = useState({
    account: null,
    menu: null,
  })

  const openAccountMenu = Boolean(anchorEl.account)

  const openSidebarMenu = Boolean(anchorEl.menu)

  const handleClick = (event: React.MouseEvent<HTMLElement>, anchor: string) => {
    setAnchorEl({ ...anchorEl, [anchor]: event.currentTarget })
    console.log(user)
  }

  const handleClose = (anchor: string) => {
    setAnchorEl({ ...anchorEl, [anchor]: null })
  }

  const { logout, user } = useContext(AuthContext)

  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ height: '100vh', display: 'flex' }}>
        <Navbar>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
            }}
          >
            <Stack direction='row' alignItems='center' gap={2}>
              {!matches && (
                <Box>
                  <IconButton
                    onClick={(e) => handleClick(e, 'menu')}
                    size='small'
                    id='account-menu-button'
                    color='inherit'
                    aria-controls={openSidebarMenu ? 'sidebar-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openSidebarMenu ? 'true' : undefined}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Menu
                    id='sidebar-menu'
                    anchorEl={anchorEl.menu}
                    open={openSidebarMenu}
                    onClose={() => handleClose('menu')}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <SidebarItems />
                  </Menu>
                </Box>
              )}

              <Typography variant='subtitle1'>
                {settings.headerText ?? 'Kursy przedmałżeńskie'}
              </Typography>
            </Stack>

            <Stack direction='row' alignItems='center' gap={2}>
              {matches && <Typography variant='subtitle1'>{user.email}</Typography>}

              <Tooltip title='Konto'>
                <IconButton
                  onClick={(e) => handleClick(e, 'account')}
                  size='small'
                  id='account-menu-button'
                  aria-controls={openAccountMenu ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={openAccountMenu ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>{user.email?.slice(0, 1) ?? ''}</Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <Menu
            id='account-menu'
            anchorEl={anchorEl.account}
            open={openAccountMenu}
            onClose={() => handleClose('account')}
            MenuListProps={{
              'aria-labelledby': 'account-menu-button',
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

        {matches && (
          <Sidebar>
            <SidebarItems />
          </Sidebar>
        )}

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
