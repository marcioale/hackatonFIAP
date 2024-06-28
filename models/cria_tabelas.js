const db = require('./db.js')

const Espaco = db.sequelize.define('espacos',{
    nome_espaco: {
        type: db.Sequelize.STRING
    },
    capacidade: {
        type: db.Sequelize.INTEGER
    }
})

const Reserva = db.sequelize.define('reservas',{
    horario: {
        type: db.Sequelize.DATE
    },
    espacoId: {
        type: db.Sequelize.INTEGER
    },
    reservado: {
        type: db.Sequelize.BOOLEAN
    },
    nome_reserva: {
        type: db.Sequelize.INTEGER
    }
})

const Usuarios = db.sequelize.define('usuarios',{
    nome: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.INTEGER
    },
    categoria: {
        type: db.Sequelize.INTEGER
    }

})

//Post.sync({force: true});
//Reserva.sync({force: true})
//Usuarios.sync({force: true})

module.exports = Reserva;
//module.exports = Espaco;