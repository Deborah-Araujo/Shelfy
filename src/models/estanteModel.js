const Sequelize = require('sequelize');
const db = require('../../db');
const Usuario = require('../models/usuarioModel');

console.log('Usuario model:', Usuario);

const Estante = db.define('estante', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    nome: {type: Sequelize.STRING, allowNull: false},
    tema: {type: Sequelize.STRING, allowNull: false},
    cor: {type: Sequelize.STRING, allowNull: false},
    descricao: {type: Sequelize.STRING, allowNull: true},
    id_dono: {type: Sequelize.INTEGER, allowNull: false}
});

// Associação aqui:
// Estante.belongsTo(Usuario, {
//     foreignKey: 'fk_id_usuario'
// });

module.exports = Estante;
