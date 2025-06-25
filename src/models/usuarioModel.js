const Sequelize = require('sequelize');
const db = require('../../db');

const Usuario = db.define('usuario', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    nome: {type: Sequelize.STRING, allowNull: false},
    sobrenome: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false, unique: true},
    senha: {type: Sequelize.STRING, allowNull: false}
});

module.exports = Usuario;
