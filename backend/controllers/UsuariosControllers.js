const UsuarioServices = require("../services/UsuarioServices");

class UsuariosControllers {

    async listarUsuarios(req, res) {
        const usuarios = await UsuarioServices.listarLosUsuarios();
        res.json(usuarios);
    }

    async buscarUsuarios(req, res) {
        const usuario = await UsuarioServices.buscarLosUsuarios(req.params.id);
        usuario
            ?
            res.json(usuario) :
            res.status(404).json({ error: "Usuario no encontrado" });
    }

    async crearUsuarios(req, res) {
        try {
            const nuevoUsuario = await UsuarioServices.crearLosUsuarios(req.body);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(500).json({
                message: "Hubo un error al crear el usuario",
                error: error.message,
            });
        }
    }

    async actualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nombre, correo, contrasena } = req.body;
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            let resultado = await UsuarioServices.actualizarLosUsuario(id, { nombre, correo, contrasena });

            if (!resultado[0]) {
                return res.status(404).json({ error: "usuario no encontrado" });
            }

            res.json({ mensaje: "usuario actualizado correctamente" });
        } catch (e) {
            res.status(500).json({ error: "Error en el servidor al actualizar el usuario" });
        }
    }

    async eliminarUsuarios(req, res) {
        await UsuarioServices.eliminarLosUsuarios(req.params.id);
        res.json({ message: "Usuario eliminado" });
    }

    async Login(req, res) {
        const { correo, contrasena } = req.body;
        const resultado = await UsuarioServices.Login(correo, contrasena);

        if (resultado.error) {
            return res.status(401).json({ mensaje: resultado.error });
        }

        res.json(resultado);
    }
}




module.exports = new UsuariosControllers();