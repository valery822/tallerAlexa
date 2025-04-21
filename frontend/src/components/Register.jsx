import React, { useState } from 'react';
import axios from 'axios';
import '../stayle/Login.css';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navegar = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/usuario/crearusuarios', {
        nombre,
        correo,
        contrasena,
      });
      alert("Registro exitoso");
      navegar("/")
    } catch (error) {
      alert('Error al registrar: ' + error.respuesta?.data?.mensaje || error.message);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>

        <label htmlFor="usuario">Usuario</label>
        <input
          id="usuario"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="email"
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

        <button type="submit">Crear cuenta</button>
      </form>
      <a href="/">ir a Inicio</a>
    </div>
  );
};

export default Register;
