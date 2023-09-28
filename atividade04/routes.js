// routes.js
const express = require('express');
const router = express.Router();

// Rota para receber notificações
router.route('/notificar')
    .get(function (req, res) {
        // Responde com uma mensagem JSON
        res.json({
            message: "testando essa rota"
        });
    });

module.exports = router;