const { Productos } = require("../models");
const jwt = require("jsonwebtoken");
class ProductosServices {

    async listarLosProductos() {
        return await Productos.findAll();
    }

    async buscarLosProductos(id) {
        return await Productos.findByPk(id);
    }

    async crearLosProductos(data) {
        return await Productos.create(data);
    }


    async eliminarLosProductos(id) {
        const producto = await Productos.findByPk(id);
        if (producto) {
            return await producto.destroy();
        }
        return null;
    }

    async actualizarLosProductos(id, datos) {
        try {
            let actualizado = await Productos.update(datos, { where: { id } });
            return actualizado;
        } catch (e) {
            console.log("Error en el servidor al actualizar el producto:", e);
        }
    }
}

module.exports = new ProductosServices();