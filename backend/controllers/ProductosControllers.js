const ProductosServices = require("../services/ProductosServices");

class ProductosControllers {

    async listarProductos(req, res) {
        const productos = await ProductosServices.listarLosProductos();
        res.json(productos);
    }

    async buscarProductos(req, res) {
        const producto = await ProductosServices.buscarLosProductos(req.params.id);
        producto
            ?
            res.json(producto) :
            res.status(404).json({ error: "Producto no encontrado" });
    }

    async crearProductos(req, res) {
        try {
            const nuevoProducto = await ProductosServices.crearLosProductos(req.body);
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error("Error al crear Producto:", error);
            res.status(500).json({
                message: "Hubo un error al crear el producto",
                error: error.message,
            });
        }
    }

    async actualizarProductos(req, res) {
        try {
            const { id } = req.params;
            const { nombre, categoria, precio } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await ProductosServices.actualizarLosProductos(id, { nombre, categoria, precio });

            if (!resultado[0]) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            res.json({ mensaje: "Producto actualizado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al actualizar el producto" });
        }
    }

    async eliminarProductos(req, res) {
        await ProductosServices.eliminarLosProductos(req.params.id);
        res.json({ message: "Producto eliminado" });
    }

}

module.exports = new ProductosControllers();