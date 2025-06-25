const Sequelize = require('sequelize');
const db = require('../../db');

const Estante = db.define('estante', {
    id_estante: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    nome_estante: {type: Sequelize.STRING, allowNull: false},
    tema_estante: {type: Sequelize.STRING, allowNull: false},
    cor_estante: {type: Sequelize.STRING, allowNull: false},
    descricao_estante: {type: Sequelize.STRING, allowNull: true},
    fk_id_usuario_estante: {type: Sequelize.INTEGER, allowNull: false}
});

module.exports = Estante;
