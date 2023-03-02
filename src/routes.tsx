import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import Home from "./pages/home";
import NoMatch from "./pages/no-match";

export function RoutesTree() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
