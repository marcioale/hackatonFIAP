const  Sequelize  = require("sequelize")

const sequelize = new Sequelize('sistemaDeCadastro','root','root',{
    host: "localhost",
    dialect: 'mysql'
})

//sequelize.authenticate().then(function(){
//    console.log("Conectado com sucesso!")
//}).catch(function(erro){
//    console.log("Falha ao se conectar: "+erro)
//})


const Postagem = sequelize.define('postagens_1',{
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT        
    }
}) 

Postagem.sync({force: true})