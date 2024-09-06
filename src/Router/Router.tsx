import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../pages/Layout/PrivateRoute";
import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro";
import Header from "../components/Header/Header";
import Dashboard from "../pages/Dashboard";
import Footer from "../components/Footer/Footer";
import { LoginProvider } from "../context/LoginContext";
import UserManagePage from "../components/UserManagePage/UserManagePage";

export default function Router() {
    return (
        <>
            <LoginProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={<Login />}
                        />
                        <Route
                            path="/cadastro"
                            element={<Cadastro />}
                        />
                        <Route path="/dashboard" element={<PrivateRoute />}>
                            <Route path="" element={<Dashboard />}></Route>
                            <Route path="users/:id" element={<UserManagePage />} />
                        </Route>
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </LoginProvider>

        </>

    );
}