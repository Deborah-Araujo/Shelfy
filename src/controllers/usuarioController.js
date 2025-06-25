function loginView (req, res) {
    res.render('login.html')
}

function cadastroView (req, res) {
    res.render('cadastro.html')
}

module.exports = {
    loginView,
    cadastroView
}