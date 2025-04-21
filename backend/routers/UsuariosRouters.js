const express = require("express");
const router = express.Router();
const UsuariosControllers = require("../controllers/UsuariosControllers");

router.get("/listarusuarios", UsuariosControllers.listarUsuarios);
router.post("/login", UsuariosControllers.Login);
router.get("/buscarusuarios/:id", UsuariosControllers.buscarUsuarios);
router.post("/crearusuarios", UsuariosControllers.crearUsuarios);
router.put("/editarusuarios/:id", UsuariosControllers.actualizarUsuario);
router.delete("/eliminarusuarios/:id", UsuariosControllers.eliminarUsuarios);

module.exports = router;