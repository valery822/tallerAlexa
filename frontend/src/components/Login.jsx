import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../stayle/Login.css';
import { useUserContext } from './useContenxt';
const Login = () => {
  const { setSelectedUser } = useUserContext();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/usuario/login', {
        correo,
        contrasena,
      });
      console.log('Respuesta del servidor:', response.data);
      const { token, usuario } = response.data;
      localStorage.setItem("token", token);
      setSelectedUser(usuario); 
      if (token) {
        alert("Inicio de sesión exitoso");
        navigate("/listarproductos"); 
    } else {
        alert("Token no recibido. Redirigiendo a página de error.");
    } 
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <label htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <a href="/registrar">Ir a registrar</a>
    </div>
  );
};

export default Login;
