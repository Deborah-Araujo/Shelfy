const express = require('express')
const router = express.Router()

const estanteController = require('../controllers/estanteController');
const usuarioController = require('../controllers/usuarioController')

router.get('/todas', estanteController.estantesView);
router.post('/adicionar', usuarioController.verificarAutenticacao, estanteController.postAdicionarEstante);

module.exports = router;
