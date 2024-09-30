const express = require("express");
const app = express();
//Chamada do módulo body parser após sua instalação conforme aula 22
const bodyParser = require('body-parser')
//Chamada do models para gravar conteudo do formulário do POST - aula 24
const Post = require('./models/Post.js')

//const Reserva = require('./models/cria_tabelas')
//const Espaco = require('./models/cria_tabelas1')
//const Db = require('./models/cria_tabelas2');

//const Professor = require('./models/cria_tabelas_teste')
//const Aula = require('./models/cria_tabelas_teste')
const Db = require('./models/cria_tabelas_hackaton');

/*Linhas abaixo de conexão com o banco mysql foram movidas para o arquivo /models/db.js na aula 23
Conexao com banco de dados via Sequelize - aula19
const  Sequelize  = require("sequelize")
const sequelize = new Sequelize('sistemaDeCadastro','root','root',{
    host: "localhost",
    dialect: 'mysql'l
})
*/

//Declaração do HandleBars ao express - aula 19
const handlebars = require('express-handlebars');
const { Usuario } = require("./models/cria_tabelas2.js");

//Configuração do handlebars no express - aula19
//Config
  //Template Engine
   app.engine('handlebars',handlebars.engine({defaultLayout: 'main'}))
   app.set('view engine','handlebars')

   app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,

        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'handlebars');

//Configuração do BodyParser conforme aula 22
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//=========================================================================================================================================================
app.get('/professor', function(req, res){
  Db.Professor.findAll({order: [['id','DESC']]}).then(function(recebeProfessor){
  //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
  console.log(recebeProfessor)
  res.render('professor', {professores: recebeProfessor})
  })
//   res.render('home')
})

app.get('/cadastrarusuario',function(req,res){  
     res.render('formularioUsuario.handlebars')
 })

 app.post('/addusuario',function(req,res){

    const request = req.body;
    let perfil = request.perfil;
    console.log(perfil)
    
    if (perfil == 'Professor')
      {
        Db.Professor.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: req.body.senha
        }).then(function(){
        //   res.send("Professor criado com sucesso!")
          res.redirect('/login')
        }).catch(function(erro){
          res.send("Houve um erro" + erro)
        })
      }
      else 
      {
        if (perfil == 'Aluno') 
          {
              Db.Aluno.create({
              nome: req.body.nome,
              cpf: req.body.cpf,
              email: req.body.email,
              senha: req.body.senha
              }).then(function(){
              //   res.send("Aluno criado com sucesso!")
                res.redirect('/login')
              }).catch(function(erro){
                res.send("Houve um erro" + erro)
              })

          } 
        else {  res.send("Perfil INVALIDO!")   } 
      }    
  })













  app.get('/cadastrarnovousuario',function(req,res){  
    res.render('formularioAula.handlebars')
  })

  app.get('/aulas', function(req, res){
    Db.Aula.findAll({order: [['idProfessor','ASC'],['aulaNome','ASC']],

      raw: true,
      include: [ {
    model: Db.Professor,
    attributes: ['id','Nome'], 
    }] }


    ).then(function(recebeAula){
    //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
    console.log(recebeAula)
    res.render('aula2', {aulas: recebeAula})
    })
  //   res.render('home')
  })

app.get('/cadastraaula',function(req,res){  
  res.render('formularioAula.handlebars')
})

/*
app.get('/cadastraaula2/:id/:email',function(req,res){  
  res.render('formularioAula.handlebars')
})
*/
app.post('/addaula',function(req,res){
  Db.Aula.create({
   aulaNome: req.body.nome,
   aulaURL: req.body.url,
   idProfessor: req.body.idProf
  }).then(function(){
    //   res.send("Professor criado com sucesso!")
       res.redirect('/aulas')
  }).catch(function(erro){
       res.send("Houve um erro" + erro)
  })    
})

app.get('/excluir/:id/:email',function(req,res){
  Db.Aula.destroy({where: {'id': req.params.id}}).then(function(){
    //res.send("Postagem excluída com sucesso!")
    res.redirect('/aulasprofessor/'+req.params.email)
    }).catch(function(erro){
      res.send("Esta Aula não existe!")
    })
})

app.get('/alterar/:id/:email', function(req, res){
  Db.Aula.findByPk(req.params.id)
    .then(aula => {
      res.render('formulario-altera-aula', {
        id: req.params.id,
        nome_aula: aula.aulaNome,
        aula_url: aula.aulaURL,
        id_professor: aula.idProfessor,
        email: req.params.email
      })
    })
    .catch(err => {
      res.send('Aula não encontrada!')
    })
})

app.post('/alterado/:id/:email', function(req, res){
  Db.Aula.update({
    aulaNome: req.body.nomeDaAula,
    aulaURL: req.body.urlDaAula
  //  idProfessor: req.body.idDoProfessor
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/aulasprofessor/'+req.params.email)
  }).catch(function(err){
    console.log(err);
  })
})

  

app.get('/logar', function(req, res){
 // Db.Professor.findAll({order: [['id','DESC']]}).then(function(recebeProfessor){
  //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
  //console.log(recebeProfessor)
  //res.render('professor', {professores: recebeProfessor})
  //})
//   res.render('home')
//})
Db.Aluno.findAll({
  attributes: ['id','nome','senha'],
  where: { email: 'joao@email.com', senha: 123456 },
  raw: true
//     include: [ {
//         model: Db.Espaco,
//         attributes: ['nome_espaco','capacidade'],
//     },
//     raw: true,
//     include: {
//{
//         model: Db.Usuario,
//         attributes: ['nome'],
//     } ]
}).then(function(teste1){
//  console.log(teste1)
//  console.log(teste1.id)
//  res.render('reservas', {reservas: teste1})
//{reservas: teste1}
  if( JSON.parse(JSON.stringify(teste1)) != false )
    { res.send("Reserva cancelada com sucesso!") } 
  else { res.send("Erro!") }

})

})

app.post('/logar1', function(req, res){

  const request = req.body;
  let perfil = request.perfil;
  console.log(perfil)

  if (perfil == 'Aluno')
  {

    Db.Aluno.findAll({
    attributes: ['id','nome','senha'],
    where: { email: req.body.usuario, senha: req.body.senha },
    raw: true
    }).then(function(teste1){
    if( JSON.parse(JSON.stringify(teste1)) != false )    
      res.redirect('/aulasaluno/'+req.body.usuario)
    else { res.send("Erro! Login Invalido") }
    })

  } else if (perfil == 'Professor') 
  {
    //res.send("Perfil Professor")
    Db.Professor.findAll({
      attributes: ['id','nome','senha'],
      where: { email: req.body.usuario, senha: req.body.senha },
      raw: true
      }).then(function(teste1){
      if( JSON.parse(JSON.stringify(teste1)) != false )    
        res.redirect('/aulasprofessor/'+req.body.usuario)
      else { res.send("Erro! Login Invalido") }
      })
    
  } else if (perfil == 'Administrador') 
  {    
    //res.send("Perfil Administrador!")
    Db.Administrador.findAll({
      attributes: ['id','nome','senha'],
      where: { email: req.body.usuario, senha: req.body.senha },
      raw: true
      }).then(function(teste1){
      if( JSON.parse(JSON.stringify(teste1)) != false )    
        res.redirect('/aulas')
      else { res.send("Erro! Login Invalido") }
      })
  }
  else { res.send("Perfil INVALIDO!") }
})

app.get('/aulasaluno/:id2', function(req, res){
  Db.Aluno.findAll({
      attributes: ['id','nome','email'],
      where: { email: req.params.id2 },
      raw: true,
      include: [ {
          model: Db.Professor,
          attributes: ['id','nome'],      
      include: [{
          model: Db.Aula,
          attributes: ['id','aulaNome','aulaURL'],
      }]
    }]    
  }).then(function(recebeAula){
      console.log(recebeAula)
      //res.render('reservas', {reservas: teste1})    
      res.render('aulaaluno', {aulas: recebeAula})
  })        
})

app.get('/aulasprofessor/:id2', function(req, res){
  Db.Professor.findAll({
      attributes: ['id','nome','email'],
      where: { email: req.params.id2 },
      raw: true,
      include: [ {
          model: Db.Aula,
          attributes: ['id','aulaNome','aulaURL'],      
     // include: [{
     //     model: Db.Aula,
     //     attributes: ['id','aulaNome','aulaURL'],
     // }]
    }]    
  }).then(function(recebeAula){
      console.log(recebeAula)
      //res.render('reservas', {reservas: teste1})    
      res.render('aulaprofessor', {aulas: recebeAula})
  })        
})

app.post('/logar4', function(req, res){

  Db.Aluno.findAll({
   attributes: ['id','nome','senha'],
   where: { email: req.body.usuario, senha: req.body.senha },
   raw: true
  }).then(function(teste1){
 //  console.log(teste1)
 //  console.log(teste1.id)
 //  res.render('reservas', {reservas: teste1})
 //{reservas: teste1}
  if( JSON.parse(JSON.stringify(teste1)) != false )
    { res.send("Reserva cancelada com sucesso!") } 
  else { res.send("Erro!") }

  })
})

app.get('/logar2', function(req, res){
  Db.Professor.findAll({order: [['id','DESC']]}).then(function(recebeProfessor){
  //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
  console.log(recebeProfessor)
  res.render('professor', {professores: recebeProfessor})
  })
//   res.render('home')
})

app.get('/logar3', function(req, res){
  Db.Aluno.findAll({order: [['id','DESC']]}).then(function(recebeProfessor){
  //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
  console.log(recebeProfessor)
  res.render('professor', {professores: recebeProfessor})
  })
//   res.render('home')
})

//=========================================================================================================================================================

app.get("/login",function(req,res){
  //res.send("Hello!");
  //res.sendFile(__dirname+ "/html/index.html")
  res.render('form-login')
});

app.listen(8081, function(){
    console.log("Servidor rodando na URL http://localhost:8081")
});