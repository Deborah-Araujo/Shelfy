const express = require('express')
const router = express.Router()

const estanteController = require('../controllers/estanteController');
const usuarioController = require('../controllers/usuarioController')

router.get('/todas', usuarioController.verificarAutenticacao, estanteController.estantesView);
router.get('/:id', usuarioController.verificarAutenticacao, estanteController.estante_unicaView);
router.post('/adicionar', usuarioController.verificarAutenticacao, estanteController.postAdicionarEstante);
router.post('/editar/:id', usuarioController.verificarAutenticacao, estanteController.postEditarEstante);
// router.post('/deletar/:id', usuarioController.verificarAutenticacao, estanteController);

module.exports = router;
