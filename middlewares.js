const jsonwebtoken = require('jsonwebtoken');
function verificarToken(request, response, next){
 console.log("Soy un Middleware🤢🤢🤢" );
 next();
}




module.exports = {
    verificarToken
};
