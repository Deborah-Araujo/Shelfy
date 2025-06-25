function homepageView (req, res) {
    res.render('homepage.html')
    // Posso mudar para o seguinte código, caso necessário:
    // res.render('homepage');
}

module.exports = {
    homepageView
}