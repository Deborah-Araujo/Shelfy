const Estante = require('../models/estanteModel');

function estantesView(req, res) {
    res.render('estantes.html')
}

function postAdicionarEstante(req, res){
    const user_id = req.session.id;

    console.log('fk_id_usuario:', user_id);


    const dados_estante = {
        ...req.body,
        id_dono: user_id
    };

    erro_campos = validarCampos(dados_estante)

    if (!erro_campos) {
        Estante.create(dados_estante).then(()=>{
            res.redirect('/');
        });

    } else {
        console.log("Erro aqui")
        res.redirect('/');
    }
}

function validarCampos(dados_estante) {
    erro_form = false

    if (!dados_estante.nome || dados_estante.nome.trim().length === 0) {
        erro_form = true
    }

    if (!dados_estante.tema || dados_estante.tema.trim().length === 0) {
        erro_form = true
    }

    if (!dados_estante.cor || dados_estante.cor.trim().length === 0) {
        erro_form = true
    }

    if (!dados_estante.descricao || dados_estante.descricao.trim().length === 0) {
        erro_form = true
    }

    return erro_form
}

module.exports = {
    estantesView,
    postAdicionarEstante
}