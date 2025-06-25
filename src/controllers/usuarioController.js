const Usuario = require('../models/usuarioModel');

function loginView(req, res) {
    const erro_login = req.query.erro_login;

    res.render('login.html', {erro_login});
}

function cadastroView (req, res) {
    res.render('cadastro.html')
}

function verificarAutenticacao(req, res, next){
    if(req.session.autorizado){
        console.log('usuário autorizado');
        next();
    }
    else{
        console.log('usuário NÃO autorizado');
        res.redirect('/user/login');
    }
}

async function postAutenticarUsuario(req, res) {
    const dados_usuario = req.body;
    erro_campos = validarCamposLogin(dados_usuario)

    if (!erro_campos) {
        const usuario = await Usuario.findOne({
            where: {
                email: dados_usuario.email,
                senha: dados_usuario.senha
            }
        });

        if(usuario !== null){
            console.log('USUÁRIO AUTENTICADO');
            req.session.autorizado = true;
            req.session.id_usuario = usuario.id;
            req.session.nome_usuario = usuario.nome;
            req.session.email_usuario = usuario.email;
            res.redirect('/');
        } else {
            res.redirect('/user/login?erro_login=1');
        }
    } else {
        res.render('login.html', {erro_campos, dados_usuario});    
    }
}

function validarCamposLogin(dados_login) {
    erro_form = false

    if (!dados_login.email || dados_login.email.trim().length === 0) {
        erro_form = true
    }

    if (!dados_login.senha || dados_login.senha.trim().length === 0) {
        erro_form = true
    }

    return erro_form
}

function postCadastrarUsuario(req, res){
    const dados_usuario = req.body;
    erro_campos = validarCamposCadastro(dados_usuario)

    if (!erro_campos) {
        Usuario.create(dados_usuario).then(()=>{
            res.redirect('/user/login');
        });

    } else {
        res.render('cadastro.html', {erro_campos, dados_usuario});
    }
}

function validarCamposCadastro(dados_cadastro) {
    erro_form = false

    if (!dados_cadastro.nome || dados_cadastro.nome.trim().length === 0) {
        erro_form = true
    }

    if (!dados_cadastro.sobrenome || dados_cadastro.sobrenome.trim().length === 0) {
        erro_form = true
    }

    if (!dados_cadastro.email || dados_cadastro.email.trim().length === 0) {
        erro_form = true
    }

    if (!dados_cadastro.senha || dados_cadastro.senha.trim().length === 0) {
        erro_form = true
    }

    return erro_form
}

module.exports = {
    loginView,
    cadastroView,
    postCadastrarUsuario,
    postAutenticarUsuario,
    verificarAutenticacao
}