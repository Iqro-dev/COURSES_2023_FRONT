import { AdminPanelSettings, Church as ChurchIcon, CoPresent, Settings } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

export function SidebarItems() {
  const role = localStorage.getItem('auth.role') ?? 'user'

  interface Link {
    name: string
    path: string
    icon: JSX.Element
    privilegedRoles: string[]
  }

  const links: Link[] = [
    {
      name: 'Administratorzy',
      path: '/dashboard/administrators',
      icon: <AdminPanelSettings />,
      privilegedRoles: ['superadmin', 'admin'],
    },
    {
      name: 'Prowadzący',
      path: '/dashboard/lecturers',
      icon: <CoPresent />,
      privilegedRoles: ['superadmin', 'admin'],
    },
    {
      name: 'Diecezje i parafie',
      path: '/dashboard/dioceses',
      icon: <ChurchIcon />,
      privilegedRoles: ['superadmin', 'admin', 'lecturer'],
    },
    {
      name: 'Ustawienia',
      path: '/dashboard/settings',
      icon: <Settings />,
      privilegedRoles: ['superadmin', 'admin'],
    },
  ]
  return (
    <>
      <List>
        {links
          .filter((link) => link.privilegedRoles.includes(role))
          .map(({ name, path, icon }, idx) => (
            <ListItemButton key={idx} component={Link} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          ))}
      </List>
    </>
  )
}
