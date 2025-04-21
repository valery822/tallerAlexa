import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CerrarSesion from "../components/Cerrarsesion";
import { useUserContext } from "./useContenxt";

function ListarProducto() {
  const { selectedUser } = useUserContext(); 
  const navegar = useNavigate();
  const [productos, setProductos] = useState([]);

  const Eliminar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/producto/eliminarproducto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductos(productos.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/producto/listarproductos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);
  const handleDetallesUsuario = () => {
    if (selectedUser) {
        navegar("/detalles");
    } else {
        alert("No hay un usuario seleccionado. Por favor, inicia sesión nuevamente.");
    }
};
  return (
    <div>
      <h1>Lista</h1>
      <CerrarSesion/>
      <button onClick={handleDetallesUsuario}>Detalles del usuario</button>
      <a href="/registrarp"><button>Registrar Producto</button></a>
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio ($)</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, index) => (
            <tr key={index}>
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>{prod.precio}</td>
              <td>
              <button className="btn btn-warning mx-2" onClick={() => navegar(`/editar/${prod.id}`)}>  Editar </button>
              <button  className="btn btn-danger" onClick={() => Eliminar(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarProducto;