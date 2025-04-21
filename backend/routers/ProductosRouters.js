const express = require("express");
const router = express.Router();
const ProductosControllers = require("../controllers/ProductosControllers");
const permisos = require("../miildeware/Permisos");


router.get("/listarproductos",permisos, ProductosControllers.listarProductos);
router.get("/buscarproducto/:id",permisos, ProductosControllers.buscarProductos);
router.post("/crearproducto",permisos, ProductosControllers.crearProductos);
router.put("/editarproducto/:id",permisos, ProductosControllers.actualizarProductos);
router.delete("/eliminarproducto/:id",permisos, ProductosControllers.eliminarProductos);

module.exports = router;