const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session');

const db  = require('./db');
const app = express()

app.engine('html', mustacheExpress());
app.set('view engine', 'html');

app.set('views', __dirname + '/src/views');

app.use('/static', express.static(__dirname + '/static'));

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'secret-token',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
}));

app.use('/', require('./src/routes/homepageRoutes')) 
app.use('/user', require('./src/routes/usuarioRoutes')) //Fica sendo um prefixo pra rotas do usuário. Pra acessar login, por exemplo, tem que acessar: /user/login

db.sync();

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('app rodando na porta ' + PORT);
});