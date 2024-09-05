import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../pages/Layout/PrivateRoute";
import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login/>}
                />
                <Route
                    path="/cadastro"
                    element={<Cadastro />}
                />
                <Route path="/dashboard" element={<PrivateRoute />}>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}