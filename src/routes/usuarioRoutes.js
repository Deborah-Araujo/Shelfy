const express = require('express')
const router = express.Router()

const usuarioController = require('../controllers/usuarioController')

router.get('/login', usuarioController.loginView)
router.get('/cadastro', usuarioController.cadastroView)

module.exports = router