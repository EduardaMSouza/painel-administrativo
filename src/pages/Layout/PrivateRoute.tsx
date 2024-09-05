import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const token = localStorage.getItem("@auth/token");

  if (!token) {
    return <Navigate to="/" state={{ error: "Usuário precisa estar logado para entrar nessa página" }} />;
  }

  

  return <Outlet />;
}
