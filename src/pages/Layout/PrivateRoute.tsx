import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoute() {
  const token = localStorage.getItem("@auth/token")

  return token ? <Outlet /> : <Navigate to="/"/>
}