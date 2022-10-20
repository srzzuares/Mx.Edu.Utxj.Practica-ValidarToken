let formulario = document.querySelector("#formLogin")

formulario.addEventListener("submit", evento => {
    evento.preventDefault()

    console.log("Formulario enviado");

    let correo =
        document.querySelector("#txtCorreo").value
    let contrasena =
        document.querySelector("#txtContrasena").value

    // TODO: Enviar los datos del form al servidor
    let usuario = {
        correo,
        contrasena
    }
    axios.post('http://localhost:3000/login', usuario)
    .then(respuestaServidor =>{
        console.log(respuestaServidor)
    })
      
})