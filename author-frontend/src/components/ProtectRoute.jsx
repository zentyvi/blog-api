import { Navigate, Outlet } from "react-router";

export default function ProtectRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/log-in" replace />;
  }

  return <Outlet />;
}
