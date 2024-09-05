import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Bounce, ToastContainer } from "react-toastify";

interface ApiResponse {
  role: string;
}

export function PrivateAdminRoute() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchRole = async () => {
      const token = localStorage.getItem("@auth/token");

      if (!token) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_HOST}/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro na resposta");
        }

        const data: ApiResponse = await response.json();
        setRole(data.role);

      } catch {
        setError(true);

      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress color="inherit" />
        <div>Loading...</div>
      </div>
    );
  }

  if (error || role !== 'admin') {
    return (
      <>
        <Navigate to="/dashboard" />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </>
    );
  }

  return <Outlet />;
}
