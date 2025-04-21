import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Registrarp() {
    const navegar = useNavigate();
    const [producto, setProducto] = useState({
        nombre: "",
        categoria: "",
        precio: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:3000/producto/crearproducto",
                producto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Producto registrado con éxito");
            navegar("/listarproductos");
            console.log(response.data);
            setProducto({ nombre: "", categoria: "", precio: "" });
        } catch (error) {
            console.error("Error al registrar el producto:", error);
            alert("Hubo un error al registrar el producto");
        }
    };

    return (
        <div>
            <h1>Registrar el producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input
                        type="text"
                        name="categoria"
                        value={producto.categoria}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Registrarp;