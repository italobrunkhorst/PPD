// middleware.js
const bodyParser = require('body-parser');
const emitir = function (req, res, next) {
    var notificar = req.query.notificacao || '';
    if (notificar != '') {
        io.emit('notificacao', notificar); // Emite uma notificação via Socket.io
        next(); // Passa para o próximo middleware
    } else {
        next(); // Passa para o próximo middleware
    }
}

module.exports = (app) => {
    // Configura o uso do bodyParser para analisar os corpos das requisições
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(emitir); // Utiliza o middleware de emissão de notificações
}