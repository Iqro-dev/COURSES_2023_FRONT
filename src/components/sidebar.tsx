import { Divider, List, Paper, Toolbar } from '@mui/material'
import { PropsWithChildren } from 'react'

interface SidebarProps extends PropsWithChildren { }

export default function Sidebar({ children }: SidebarProps) {
  return (
    <>
      <Paper elevation={6} square>
        <Toolbar variant='dense' />
        <List component='nav' sx={{ overflowX: 'hidden', backgroundColor: 'white', width: 250 }}>
          {children}
          <Divider />
        </List>
      </Paper>
    </>
  )
}
