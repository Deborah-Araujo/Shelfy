const express = require('express')
const router = express.Router()

const livroController = require('../controllers/livroController')
const usuarioController = require('../controllers/usuarioController')

//id se refere à estante
router.post('/adicionar/:id', usuarioController.verificarAutenticacao, livroController.postAdicionarLivro)

router.post('/editar/:id_estante/:id_livro', usuarioController.verificarAutenticacao, livroController.postEditarLivro)
router.post('/deletar/:id_estante/:id_livro', usuarioController.verificarAutenticacao, livroController.postDeletarLivro)


module.exports = router