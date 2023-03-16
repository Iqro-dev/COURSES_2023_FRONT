import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import DefaultLayout from './layouts/default';
import Home from './pages/home';
import LoginPage from './pages/login';
import NoMatch from './pages/no-match';

export function RoutesTree() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<LoginPage />} />

          <Route path="*" element={<NoMatch />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Home />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
