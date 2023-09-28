// Importa as bibliotecas necessárias
const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(4555);
const io = require('socket.io').listen(server);
const router = require('./routes'); // Importa o roteador de routes.js
const middleware = require('./middleware'); // Importa o middleware de middleware.js
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

middleware(app); // Configura o middleware

const port = process.env.PORT || 8080; // Define a porta padrão com base na variável de ambiente

app.use('/api', router); // Define a rota base '/api' para o roteador

// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log('Conectado à porta ' + port);
});
