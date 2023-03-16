import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
