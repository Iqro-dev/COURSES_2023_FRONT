import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/dashboard'
import DefaultLayout from './layouts/default'
import AdminList from './pages/admin'
import DictionaryList from './pages/dictionary'
import Home from './pages/home'
import LecturerList from './pages/lecturer'
import LoginPage from './pages/login'
import NoMatch from './pages/no-match'
import Settings from './pages/settings'

export function RoutesTree() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<LoginPage />} />

          <Route path='*' element={<NoMatch />} />
        </Route>

        <Route path='dashboard' element={<DashboardLayout />}>
          <Route index element={<Home />} />

          <Route path='administrators' element={<AdminList />} />

          <Route path='lecturers' element={<LecturerList />} />

          <Route path='dictionaries' element={<DictionaryList />} />

          <Route path='settings' element={<Settings />} />

          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
