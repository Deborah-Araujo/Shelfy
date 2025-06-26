const express = require('express')
const router = express.Router()

const usuarioController = require('../controllers/usuarioController')

router.get('/login', usuarioController.loginView)
router.get('/cadastro', usuarioController.cadastroView)
router.get('/sair', usuarioController.logout);

router.post('/cadastrar_usuario', usuarioController.postCadastrarUsuario);
router.post('/autenticar', usuarioController.postAutenticarUsuario);

module.exports = router