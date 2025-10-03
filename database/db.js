const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Projeto_BancoDeDados', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

sequelize.authenticate()
    .then(() => console.log(' Conectado ao banco com sucesso'))
    .catch(err => console.error(' Erro ao conectar ao banco:', err));

module.exports = { sequelize };
