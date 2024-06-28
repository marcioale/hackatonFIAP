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


const category = db.sequelize.define('category',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
    name: {type: db.Sequelize.STRING(80)},
},{freezeTableName: true});


const parental = db.sequelize.define('parental',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
    name: {type: db.Sequelize.STRING(80)},
},{freezeTableName: true});


const movies = db.sequelize.define('movies',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
    name: {type: db.Sequelize.STRING(80)},
    categoryId: {type: db.Sequelize.INTEGER(2)},
    parentalRatingId: {type: db.Sequelize.INTEGER(2)},
   // releaseYear: { Type: db.Sequelize.INTEGER(4), validate: { min: 1800, max: 2100}},
    directoryName: {type: db.Sequelize.STRING(80)},
    dubLeg: {type: db.Sequelize.STRING(10)},

},{freezeTableName: true});


movies.belongsTo(category, { foreignKey: 'categoryId',allowNull: true});

parental.hasMany(movies, { foreignKey: 'id' })
//movies.belongsTo(parental, { foreignKey: 'parentalRatingId',allowNull: true});
movies.belongsTo(parental, { foreignKey: 'parentalRatingId',allowNull: true});



//module.exports = parental;

module.exports = { movies, category, parental };

//category.sync({force: true})
//parental.sync({force: true})
//movies.sync({force: true})