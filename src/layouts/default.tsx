import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="App">
      <h1>Kursy</h1>
      <Outlet />
    </div>
  );
}
