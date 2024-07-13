const db = require('./db.js')

const Reserva = db.sequelize.define('reservas',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
    horario: {
        type: db.Sequelize.DATE
    },
    espacoId: {
        type: db.Sequelize.INTEGER(2)
    },
    reservado: {
        //type: db.Sequelize.BOOLEAN
        type: db.Sequelize.STRING
    },
    nomeReservaId: {
        type: db.Sequelize.INTEGER(2)
    }
})

const Usuario = db.sequelize.define('usuarios',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
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

const Espaco = db.sequelize.define('espacos',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
    nome_espaco: {
        type: db.Sequelize.STRING
    },
    capacidade: {
        type: db.Sequelize.INTEGER
    }
})

//Espaco.hasMany(Reserva, { foreignKey: 'id' })
Reserva.belongsTo(Espaco, { foreignKey: 'espacoId',allowNull: true});

//Usuario.hasMany(Reserva, { foreignKey: 'id' })
Reserva.belongsTo(Usuario, { foreignKey: 'nomeReservaId',allowNull: true});


//Post.sync({force: true});
//Reserva.sync({force: true})
//Espaco.sync({force: true})
//Usuario.sync({force: true})

//module.exports = Espaco;

//movies.belongsTo(category, { foreignKey: 'categoryId',allowNull: true});

//parental.hasMany(movies, { foreignKey: 'id' })
//movies.belongsTo(parental, { foreignKey: 'parentalRatingId',allowNull: true});

//
//Reserva.sync({force: true})

module.exports = { Reserva, Espaco, Usuario };