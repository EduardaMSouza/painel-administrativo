import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../pages/Layout/PrivateRoute";
import Login from "../pages/Login"
import Cadastro from "../pages/Cadastro";
import Header from "../components/Header/Header";


export default function Router() {
    return (
        <BrowserRouter>
            <Header/>
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