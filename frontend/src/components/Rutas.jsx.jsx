import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from "react";
import Login from "../components/Login";
import Registrar from "../components/Register";
import LisProductos from "../components/ListarProductos";
import CerrarSesion from "../components/Cerrarsesion";
import Editar from "../components/Editar";
import Registrarp from "../components/Registrarp";
import Detalles from "../components/Detalles";
import { UserContext } from "./useContenxt";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token"); 
    return token ? children : <Navigate to="/" />; 
}

function Menu() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/registrar" element={<Registrar />} />
                    <Route path="/listarproductos" element={ <ProtectedRoute><LisProductos /></ProtectedRoute>}/>
                    <Route path="/cerrarsesion" element={ <ProtectedRoute> <CerrarSesion /> </ProtectedRoute>}/>
                    <Route path="/registrarp" element={ <ProtectedRoute> <Registrarp /></ProtectedRoute>}/>
                    <Route path="/editar/:id" element={<ProtectedRoute><Editar /></ProtectedRoute>}/>
                    <Route path="/detalles" element={<ProtectedRoute><Detalles /></ProtectedRoute>}/>
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default Menu;