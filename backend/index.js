const Usuarios = require('./routers/UsuariosRouters');
const Productos = require('./routers/ProductosRouters');
const express = require('express');
const cors = require('cors');
const app = express();
const puerto = 3000;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use(express.json());


app.use('/usuario', Usuarios);
app.use('/producto', Productos);

app.listen(puerto, () => {
    console.log(`Servidor corriendo en http://localhost:${puerto}`);
});