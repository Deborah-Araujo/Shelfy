const express = require('express')
const router = express.Router()

const livroController = require('../controllers/livroController')
const usuarioController = require('../controllers/usuarioController')

//id se refere à estante
router.post('/adicionar/:id', usuarioController.verificarAutenticacao, livroController.postAdicionarLivro)

// router.post('/editar/:id', usuarioController.verificarAutenticacao, livroController)
// router.post('/deletar/:id', usuarioController.verificarAutenticacao, livroController)

module.exports = router