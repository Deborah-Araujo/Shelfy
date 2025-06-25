const Estante = require('../models/estanteModel');

async function estantesView(req, res) {
  const estantes = await Estante.findAll({
    where: { fk_id_usuario: req.session.id_usuario }
  });

  res.render('estantes.html', { estantes });
}

async function estante_unicaView(req, res) {
  const id = req.params.id;

  const estante = await Estante.findOne({
        where: {
        id: id,
        fk_id_usuario: req.session.id_usuario
        }
  });

  res.render('estante_unica.html', { estante });
}

function postAdicionarEstante(req, res){
    const user_id = req.session.id_usuario;

    const dados_estante = {
    ...req.body,
    fk_id_usuario: user_id
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
    postAdicionarEstante,
    estante_unicaView
}