import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
