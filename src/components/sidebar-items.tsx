import { AdminPanelSettings, CoPresent, LibraryBooks, Settings } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

export function SidebarItems() {
  const role = 'admin'

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
      privilegedRoles: ['admin'],
    },
    {
      name: 'Prowadzący',
      path: '/dashboard/lecturers',
      icon: <CoPresent />,
      privilegedRoles: ['admin'],
    },
    {
      name: 'Słowniki',
      path: '/dashboard/dictionaries',
      icon: <LibraryBooks />,
      privilegedRoles: ['admin', 'lecturer'],
    },
    {
      name: 'Ustawienia',
      path: '/dashboard/settings',
      icon: <Settings />,
      privilegedRoles: ['admin', 'lecturer'],
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
