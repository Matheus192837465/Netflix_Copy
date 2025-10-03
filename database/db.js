//IMPORTANDO A BIBLIOTECA SEQUELIZE
const Sequelize = require('sequelize');

//CRIANDO UMA VARIAVEL QUE IRA IMPLEMENTAR ...
const sequelize = new Sequelize(
    'Projeto_BancoDeDados', 
    'root',
    '',
    //INSERINDO A INFORMÇÃO DO BANCO(OND ESTÁ E QUAL O DIALETO)
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

/*sequelize.authenticate().then(function()
{
    console.log("Conexão efetuada com sucesso");
}).catch((error)=>{
    console.log("Falha ao conectar: " + error);
});
*/

module.exports = {
    Sequelize,
    sequelize
}
