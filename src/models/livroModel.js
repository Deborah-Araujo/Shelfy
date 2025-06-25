const Sequelize = require('sequelize');
const db = require('../../db');

const Livro = db.define('livro', {
    id_livro: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    titulo_livro: {type: Sequelize.STRING, allowNull: false},
    status_livro: {type: Sequelize.STRING, allowNull: false},
    autor_livro: {type: Sequelize.STRING, allowNull: false},
    descricao_livro: {type: Sequelize.STRING, allowNull: true},
    fk_id_estante_livro: {type: Sequelize.INTEGER, allowNull: false}
});

module.exports = Livro;
