const express = require('express'); //importamos express
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');//importamos bcryptjs
const jsonwebtoken = require('jsonwebtoken');

const cors = require('cors');
const { request, response } = require('express');
const middleware = require('./middlewares');
const servidor = express() //instancia del servidor
const puerto = 3000
servidor.use(express.json())
servidor.use(cors())

servidor.listen(puerto, () => { //funciona nonima de flecha ()=> corremos el servidor
    console.log("Si funciona el servidor puerto 3000");
})

//Upss
let usuarios = [
    { _id: uuidv4(), correo: "uriel@gmail.com", contrasena: "123" },
    { _id: uuidv4(), correo: "juan@gmail.com", contrasena: "987" },
    { _id: uuidv4(), correo: "carlos@gmail.com", contrasena: "654" },
    { _id: uuidv4(), correo: "david@gmail.com", contrasena: "123" }
]

let usuariosEnscriptados = usuarios.map(usuario => {
    usuario.contrasena = bcrypt.hashSync(usuario.contrasena, 10)
    return usuario;
})

// console.log(usuariosEnscriptados)
// console.log(usuarios);

servidor.post('/login', (request, response) => {

    let body = request.body

    const { correo, contrasena } = body      // desentructuramos un objeto

//validar el correo y contraseña
if (!(correo && contrasena)){
return response.status(400).json({
    estatus: false, 
    mensaje: "Todos los campos son necesarios"
})
}


    let usuarioEncontrado = usuariosEnscriptados.find(usuario => {    //find devuelve el primer elemnto que cumple una condicion
        return usuario.correo == correo;
    })

    if (!usuarioEncontrado) {
        return response.status(400).json({
            estatus: false, 
            mensaje: "Datos invalidos"
        })
    }

    //VALIDADR CONTRASEÑA
    let esContrasenaCorrecta= bcrypt.compareSync(contrasena, usuarioEncontrado.contrasena)

    // console.log(usuarioEncontrado.correo + " - ", esContrasenaCorrecta);
    
    if (usuarioEncontrado && esContrasenaCorrecta ){
//crear el token para enviarlo al usuario
const token = jsonwebtoken.sign({
    correo
},"200448", {expiresIn: '1h'})
let usuario = {
    id: usuarioEncontrado._id,
    token
}
return response.status(200).json(usuario)
    }

    return response.status(500).send("Error en el servidor")


})

servidor.get('/usuarios', middleware.verificarToken , (req, res) => {
    return res.json(usuariosEnscriptados)
})
//middleware: Archivos o bloques de código, funcionan como intermediarios