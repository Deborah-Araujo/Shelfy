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
    getLivrosNaEstante
}
