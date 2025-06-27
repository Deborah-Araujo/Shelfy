const Estante = require('../models/estanteModel');
const Livro = require('../models/livroModel')
// const livroController = require('../controllers/livroController')

// TESTE - barra de busca
const { Op } = require('sequelize');

async function estantesView(req, res) {
    // TESTE - barra de busca
    const termoBusca = req.query.busca || '';

    const estantes = await Estante.findAll({
        where: { 
            fk_id_usuario_estante: req.session.id_usuario,
            nome_estante: {
                [Op.like]: `%${termoBusca}%` // TESTE - barra de busca
            }
        }
    });

//buscando nome de usuario pra colocar na sidebar
const nomeUsuario = req.session.nome_usuario
const emailUsuario = req.session.email_usuario

res.render('estantes.html', { 
    estantes, 
    nomeUsuario,
    emailUsuario,
    busca: termoBusca
 });
}

async function estante_unicaView(req, res) {

    const termoBusca = req.query.busca || '';
    
    const estante = await Estante.findOne({
        where: {
            id_estante: req.params.id,
            fk_id_usuario_estante: req.session.id_usuario
        },
        include: [{
            model: Livro,
            where: {
                titulo_livro: {
                    [Op.like]: `%${termoBusca}%`
                }
            },
            required: false 
        }]
    });

    console.log(estante.livros)

    //buscando nome de usuario pra colocar na sidebar
    const nomeUsuario = req.session.nome_usuario;
    const emailUsuario = req.session.email_usuario

    res.render('estante_unica.html', { 
        estante,
        nomeUsuario,
        emailUsuario,
        busca: termoBusca
     });
}

function postAdicionarEstante(req, res){
    const user_id = req.session.id_usuario;

    const dados_estante = {
        ...req.body,
        fk_id_usuario_estante: user_id
    };

    erro_campos = validarCampos(dados_estante)

    if (!erro_campos) {
        Estante.create(dados_estante).then(() => res.redirect('/estantes/todas')).catch((err) => {
            console.error('Erro ao criar estante:', err);
            res.status(500).send('Erro ao salvar estante');
        });
    } else {
        console.log("Erro aqui")
        res.redirect('/');
    }
}

function postEditarEstante(req, res) {
    const dados_estante = {
        ...req.body,
        fk_id_usuario_estante: req.session.id_usuario
    };

    erro_campos = validarCampos(dados_estante)

    if (!erro_campos) {
        Estante.update(dados_estante, { where: { id_estante: req.params.id } }).then(() => res.redirect('/estantes/todas')).catch((err) => {
            console.error('Erro ao editar estante:', err);
            res.status(500).send('Erro ao editar estante');
        });
    } else {
        console.log("Erro aqui")
        res.redirect('/');
    }    
}

async function postDeletarEstante(req, res) {
    try {
        const id = req.params.id;
        await Estante.destroy({ where: { id_estante: id } });

        res.redirect('/estantes/todas');
    } catch (error) {
        console.error('Erro ao deletar estante:', error);
        res.status(500).send('Erro ao deletar estante');
    }
}

function validarCampos(dados_estante) {
    erro_form = false

    if (!dados_estante.nome_estante || dados_estante.nome_estante.trim().length === 0) {
        erro_form = true
    }

    if (!dados_estante.tema_estante || dados_estante.tema_estante.trim().length === 0) {
        erro_form = true
    }

    if (!dados_estante.cor_estante || dados_estante.cor_estante.trim().length === 0) {
        erro_form = true
    }

    if (!dados_estante.descricao_estante || dados_estante.descricao_estante.trim().length === 0) {
        erro_form = true
    }

    return erro_form
}

module.exports = {
    estantesView,
    estante_unicaView,
    postAdicionarEstante,
    postEditarEstante,
    postDeletarEstante
}