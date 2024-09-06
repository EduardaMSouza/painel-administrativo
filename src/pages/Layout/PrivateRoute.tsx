import { Navigate, Outlet } from "react-router-dom";
import { useLoginContext } from "../../context/LoginContext";

export function PrivateRoute() {

  const login = useLoginContext();

  if(!login) {
    return <Navigate to="/" state={{ error: "Usuário precisa estar logado para entrar nessa página" }} />;
  }

  return <Outlet />;
}
