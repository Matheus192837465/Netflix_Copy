const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Projeto_BancoDeDados', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Conectado ao banco com sucesso'))
    .catch(error => console.error('Erro ao conectar ao banco:', error));

module.exports = { sequelize };