const express = require('express')
const router = express.Router()

const estanteController = require('../controllers/estanteController');

router.get('/todas', estanteController.estantesView);
router.post('/adicionar', estanteController.postAdicionarEstante);

module.exports = router;
