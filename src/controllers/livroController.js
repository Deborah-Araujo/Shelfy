const Livro = require('../models/livroModel');

function postAdicionarLivro(req, res){
    const id_estante = req.params.id;

    console.log(id_estante)

    const dados_livro = {
    ...req.body,
    fk_id_estante_livro: id_estante
    };

    erro_campos = validarCampos(dados_livro)

    if (!erro_campos) {
        Livro.create(dados_livro).then(() => res.redirect(`/estantes/${id_estante}`)).catch((err) => {
            console.error('Erro ao criar livro:', err);
            res.status(500).send('Erro ao salvar livro');
        });
    } else {
        console.log("Erro aqui")
        res.redirect('/');
    }
}

async function getLivrosNaEstante(id) {
  try {
    const livros = await Livro.findAll({
      where: { fk_id_estante_livro: id }
    });

    return livros; // <- retorna mesmo se vier um array vazio []
  } catch (err) {
    console.error('Erro ao buscar livros na estante:', err);
    return []; // segurança: retorna array vazio se der erro
  }
}

function postEditarLivro(req, res) {
    const dados_livro = {
        ...req.body,
        fk_id_usuario_estante: req.session.id_usuario
    };

    erro_campos = validarCampos(dados_livro)

    if (!erro_campos) {
        Livro.update(dados_livro, { where: { id_livro: req.params.id_livro }}).then(() => res.redirect(`/estantes/${req.params.id_estante}`)).catch((err) => {
            console.error('Erro ao editar livro:', err);
            res.status(500).send('Erro ao editar livro');
        });
    } else {
        console.log("Erro aqui")
        res.redirect('/');
    }    
}

async function postDeletarLivro(req, res) {
    console.log('tentando deletar:', req.params.id_livro )
    try {
        await Livro.destroy({ where: { id_livro: req.params.id_livro } });

        res.redirect(`/estantes/${ req.params.id_estante }`);
    } catch (error) {
        console.error('Erro ao deletar lirvo:', error);
        res.status(500).send('Erro ao deletar livro');
    }
}

function validarCampos(dados_livro) {
    erro_form = false

    if (!dados_livro.titulo_livro || dados_livro.titulo_livro.trim().length === 0) {
        erro_form = true
    }

    if (!dados_livro.status_livro || dados_livro.status_livro.trim().length === 0) {
        erro_form = true
    }

    if (!dados_livro.autor_livro || dados_livro.autor_livro.trim().length === 0) {
        erro_form = true
    }

    if (!dados_livro.descricao_livro || dados_livro.descricao_livro.trim().length === 0) {
        erro_form = true
    }

    return erro_form
}

module.exports = {
    postAdicionarLivro,
    getLivrosNaEstante,
    postEditarLivro,
    postDeletarLivro
}
