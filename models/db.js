

//Conexao com banco de dados via Sequelize - aula19
const  Sequelize  = require("sequelize")
const sequelize = new Sequelize('postapp','root','root',{
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize

}