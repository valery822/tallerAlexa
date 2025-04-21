import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Editar() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            alert("Error: No estás autenticado");
            return;
        }
    
        const cargarProducto = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/producto/buscarproducto/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const data = response.data;
                setNombre(data.nombre);
                setCategoria(data.categoria);
                setPrecio(data.precio);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
                alert("Error: No se pudo cargar la información del producto");
            }
        };
    
        cargarProducto();
    }, [id]);
    
    const actualizarProducto = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Error: No estás autenticado");
                return;
            }
    
            await axios.put(
                `http://localhost:3000/producto/editarproducto/${id}`,
                {
                    nombre,
                    categoria,
                    precio,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            alert("Éxito: Producto actualizado exitosamente");
            navigate("/listarproductos");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert("Error: No se pudo actualizar el producto");
        }
    };
    

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Actualizar Producto</h2>
            <div className="form-group mb-3">
                <label>Nombre:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="form-group mb-3">
                <label>Categoría:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                />
            </div>
            <div className="form-group mb-4">
                <label>Precio:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />
            </div>
            <button type="button" className="btn btn-success me-2" onClick={actualizarProducto}>
                Actualizar Producto
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/listarproductos")}>
                Cancelar
            </button>
        </div>
    );
}

export default Editar;