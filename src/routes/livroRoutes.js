const express = require('express')
const router = express.Router()

const livroController = require('../controllers/livroController')
const usuarioController = require('../controllers/usuarioController')

router.post('/adicionar/:id', usuarioController.verificarAutenticacao, livroController.postAdicionarLivro)

module.exports = router