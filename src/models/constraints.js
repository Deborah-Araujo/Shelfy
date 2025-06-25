// As constraints foram definidas saparadamente para evitar import cricular entre as models 

const Usuario = require('./usuarioModel');
const Estante = require('./estanteModel');
const Livro = require('./livroModel')

// Associação entre usário e estante
Usuario.hasMany(Estante, { foreignKey: 'fk_id_usuario' });
Estante.belongsTo(Usuario, { foreignKey: 'fk_id_usuario' });

// Associação entre estante e livro
Estante.hasMany(Livro, {foreignKey: 'fk_id_estante_livro'});
Livro.belongsTo(Estante, {foreignKey: 'fk_id_estante_livro'});

module.exports = {
    Usuario,
    Estante,
    Livro
};
