const Sequelize = require('sequelize');
const db = require('../../db');
const Estante = require('../models/estanteModel')

const Usuario = db.define('usuario', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    nome: {type: Sequelize.STRING, allowNull: false},
    sobrenome: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false, unique: true},
    senha: {type: Sequelize.STRING, allowNull: false}
});

// Usuario.hasMany(Estante, {
//   foreignKey: 'fk_id_usuario'
// });

module.exports = Usuario;
