const db = require('./db.js')

const Professor = db.sequelize.define('professores',{
    id: { type: db.Sequelize.INTEGER(2),autoIncrement: true,primaryKey: true },
    nome: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING(11)
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.INTEGER
    }
})

const Aluno = db.sequelize.define('alunos',{
    nome: {
        type: db.Sequelize.STRING
    },
    idProfessor: { type: db.Sequelize.INTEGER(2)
    },
    cpf: {
        type: db.Sequelize.STRING(11)
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.INTEGER
    }
})

const Administrador = db.sequelize.define('administradores',{
    nome: {
        type: db.Sequelize.STRING
    }, 
    cpf: {
        type: db.Sequelize.STRING(11)
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.INTEGER
    }
})


const Aula = db.sequelize.define('aulas',{
    aulaNome: {
        type: db.Sequelize.STRING
    },
    aulaURL: {
        type: db.Sequelize.STRING
    },
    idProfessor: { type: db.Sequelize.INTEGER(2)
    }    
})


Professor.hasMany(Aula, { foreignKey: 'idProfessor' })

//Reserva.belongsTo(Usuario, { foreignKey: 'idProfessor',allowNull: true});
Aluno.belongsTo(Professor, { foreignKey: 'idProfessor',allowNull: true});
Aula.belongsTo(Professor, { foreignKey: 'idProfessor',allowNull: true});

//Professor.sync({force: true})
//Aluno.sync({force: true})
//Aula.sync({force: true})
//Administrador.sync({force: true})


//module.exports = Professor;

//module.exports = Aula;
//module.exports = Professor;

module.exports = { Professor, Aula, Aluno,Administrador };