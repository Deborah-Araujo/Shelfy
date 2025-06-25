const express = require('express')
const mustacheExpress = require('mustache-express')

const app = express()

app.engine('html', mustacheExpress());
app.set('view engine', 'html');

app.set('views', __dirname + '/src/views');
// Tentando usar imagens no homepage.html
app.use('/static', express.static(__dirname + '/static'));

app.use(express.urlencoded({extended: true}));

app.use('/', require('./src/routes/homepageRoutes')) 

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('app rodando na porta ' + PORT);
});