import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/dashboard'
import DefaultLayout from './layouts/default'
import AdminsList from './pages/admin'
import DiocesesList from './pages/diocese'
import Home from './pages/home'
import InstructorsList from './pages/instructor'
import LoginPage from './pages/login'
import NoMatch from './pages/no-match'
import Settings from './pages/settings'
import DioceseDetails from './pages/diocese/details'
import ParishesList from './pages/parish'
import ParishDetails from './pages/parish/details'
import AddDiocese from './pages/diocese/add'
import AddParish from './pages/parish/add'
import AuthRoute from './components/routes/auth-route'
import AddInstructor from './pages/instructor/add'
import InstructorDetails from './pages/instructor/details'
import AddAdmin from './pages/admin/add'
import AdminDetails from './pages/admin/details'

export function RoutesTree() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <AuthRoute>
              <DefaultLayout />
            </AuthRoute>
          }
        >
          <Route index element={<LoginPage />} />

          <Route path='*' element={<NoMatch />} />
        </Route>

        <Route
          path='dashboard'
          element={
            <AuthRoute>
              <DashboardLayout />
            </AuthRoute>
          }
        >
          <Route index element={<Home />} />

          <Route path='admin'>
            <Route index element={<AdminsList />} />

            <Route path='add' element={<AddAdmin />} />

            <Route path='details' element={<AdminDetails />} />
          </Route>

          <Route path='instructor'>
            <Route index element={<InstructorsList />} />

            <Route path='details' element={<InstructorDetails />} />

            <Route path='add' element={<AddInstructor />} />
          </Route>

          <Route path='dioceses'>
            <Route index element={<DiocesesList />} />

            <Route path='details' element={<DioceseDetails />} />

            <Route path='add' element={<AddDiocese />} />
          </Route>

          <Route path='parishes'>
            <Route index element={<ParishesList />} />

            <Route path='details' element={<ParishDetails />} />

            <Route path='add' element={<AddParish />} />
          </Route>

          <Route path='settings' element={<Settings />} />

          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
