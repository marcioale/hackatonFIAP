const db = require('./db.js')

const Espaco = db.sequelize.define('espacos',{
    nome_espaco: {
        type: db.Sequelize.STRING
    },
    capacidade: {
        type: db.Sequelize.INTEGER
    }
})





//Post.sync({force: true});
//Reserva.sync({force: true})
//Usuarios.sync({force: true})


module.exports = Espaco;