import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { useSettings } from '../hooks/use-settings'
import { Typography } from '@mui/material'

export default function DefaultLayout() {
  const { settings } = useSettings()
  return (
    <>
      <Navbar>
        <Typography variant='subtitle1'>
          {settings.headerText ?? 'Kursy przedmałżeńskie'}
        </Typography>
      </Navbar>
      <Outlet />
    </>
  )
}
