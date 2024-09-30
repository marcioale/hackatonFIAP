const express = require("express");
const app = express();
//Chamada do módulo body parser após sua instalação conforme aula 22
const bodyParser = require('body-parser')
//Chamada do models para gravar conteudo do formulário do POST - aula 24
const Post = require('./models/Post.js')

const Reserva = require('./models/cria_tabelas')
const Espaco = require('./models/cria_tabelas1')
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

//Rota "/cad" criada abaixo para exibir o formulário HTML via handlebars, aula 20
app.get('/cad',function(req,res){
 //   res.send('ROTA DE CADASTRO DE POSTS')
    res.render('formulario.handlebars')
})

app.get('/cadastrarespaco',function(req,res){
    //   res.send('ROTA DE CADASTRO DE POSTS')
       res.render('formularioEspaco.handlebars')
   })

app.get('/deletar/:id',function(req,res){
  Reserva.destroy({where: {'espacoId': req.params.id}}).then(function(){
  
    Espaco.destroy({where: {'id': req.params.id}}).then(function(){
      //res.send("Postagem excluída com sucesso!")
      res.redirect('/espaco')
    }).catch(function(erro){
        res.send("Erro na exclusão do Espaço!")
    })
    //res.send("Postagem excluída com sucesso!")
    //res.redirect('/espaco')
}).catch(function(erro){
    res.send("Erro na exclusão das entradas de reserva para o espaço a ser excluído!")
})

})


app.post('/reservar/:id',function(req, res){
  Reserva.update({
   reservado: "Reservado",
   nomeReservaId: 4
 },
 {
   where: { id: req.params.id }
 }).then(function(){
   res.redirect('/reservas')
   //res.send("Reserva cancelada com sucesso!")
 }).catch(function(err){
   console.log(err);
 })

})

app.post('/cancelar/:id',function(req, res){
   Reserva.update({
    reservado: "Livre",
    nomeReservaId: null
  },
  {
    where: { id: req.params.id }
  }).then(function(){
    res.redirect('/reservas')
    //res.send("Reserva cancelada com sucesso!")
  }).catch(function(err){
    console.log(err);
  })
  
  /*  Reserva.destroy({where: {'id': req.params.id}}).then(function(){
      //res.send("Postagem excluída com sucesso!")
      res.redirect('/reserva')
  }).catch(function(erro){
      res.send("Esta Reserva não existe!")
  }) */
 })
 
app.get('/edit/:id', function(req, res){
    Post.findByPk(req.params.id)
      .then(post => {
        res.render('form-edit', {
          id: req.params.id,
          titulo: post.titulo,
          conteudo: post.conteudo
        })
      })
      .catch(err => {
        res.send('Post não encontrado!')
      })
  })


  app.get('/edit3/:id', function(req, res){
    Espaco.findByPk(req.params.id)
      .then(espaco => {
        res.render('form-edit-espaco', {
          id: req.params.id,
          nome_espaco: espaco.nome_espaco,
          capacidade: espaco.capacidade
        })
      })
      .catch(err => {
        res.send('Espaço não encontrado!')
      })
  })














//Rota criada para receber o redirect de quando um post é gravado com sucesso no banco - aula 24 e aula 25
app.get('/teste', function(req, res){
    Reserva.findAll({order: [['id','DESC']]}).then(function(recebeReservas){
    //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
    console.log(recebeReservas)
    res.render('home', {reservas: recebeReservas})
    })
 //   res.render('home')
})

//Rota criada para receber o redirect de quando um post é gravado com sucesso no banco - aula 24 e aula 25
app.get('/espaco', function(req, res){
    Espaco.findAll({order: [['id','DESC']]}).then(function(recebeEspaco){
    //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
    console.log(recebeEspaco)
    res.render('espaco3', {reservas: recebeEspaco})
    })
 //   res.render('home')
})

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



//<input type="text" name="nomeDaAula" VALUE="{{nome_aula}}">
//<p>URL do Video: </p>
//<!-- <textarea name="capacidadeEspaco" rows="8" cols="40" VALUE="{{capacidade}}"></textarea> !-->
//<input type="text" size="100" name="urlDaAula" VALUE="{{aula_url}}">
// <p>Id do Professor: </p>
//<input type="text" name="idDoProfessor" VALUE="{{id_professor}}"><br><br>









//=========================================================================================================================================================


app.get('/espaco2', function(req, res){
    Espaco.findAll({order: [['id','DESC']]}).then(function(recebeReservas){
     //   attributes: ['capacidade','espacoId','reservado'],
    //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
    console.log(recebeReservas)
    reservas: recebeReservas
    console.log("teste do console-------------------------------")
    console.log(recebeReservas.id)
   // res.render('espaco', {reservas: recebeReservas})
    })
 //   res.render('home')
})

//Rota criada para fazer o join de reserva
app.get('/reservas', function(req, res){
    Db.Reserva.findAll({
        attributes: ['id','horario','espacoId','reservado','nomeReservaId'],
        raw: true,
        include: [ {
            model: Db.Espaco,
            attributes: ['nome_espaco','capacidade'],
        },
   //     raw: true,
   //     include: {
   {
            model: Db.Usuario,
            attributes: ['nome'],
        } ]
    }).then(function(teste1){
        console.log(teste1)
        res.render('reservas', {reservas: teste1})
    })        
})



app.get("/login",function(req,res){
  //res.send("Hello!");
  //res.sendFile(__dirname+ "/html/index.html")
  res.render('form-login')
});



app.get('/reservas_teste_login', function(req, res){

  Db.Usuario.findAll({
      attributes: ['id','nome','senha'],
      where: { nome: 'Daniela Lima', senha: 123456},
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
  
/*
  Db.Reserva.findAll({
    attributes: ['id','horario','espacoId','reservado','nomeReservaId'],
    where: { id: 1 , espacoId: 1},
    raw: true,
    include: [ {
        model: Db.Espaco,
        attributes: ['nome_espaco','capacidade'],
    },
//     raw: true,
//     include: {
{
        model: Db.Usuario,
        attributes: ['nome'],
    } ]
}).then((Reserva) => {
  if (Reserva) {
    res.json({ status: true }); // send 200 response if record found
   } else {
    // What should be Status Code if record is not found.
    res.send('Not found')
   }

  })
  
*/



/*
  const result =  Db.Reserva.findAll({
    attributes: ['id','horario','espacoId','reservado','nomeReservaId'],
    where: { id: 1 , espacoId: 1 },
    raw: true
//    include: [ {
//        model: Db.Espaco,
//        attributes: ['nome_espaco','capacidade'],
//    },
//     raw: true,
//     include: {
//{
//        model: Db.Usuario,
//        attributes: ['nome'],
 //   } ]
});
//console.log(result.count);
//print(result)
*/
/*
if( JSON.parse(JSON.stringify(result)) != false )
  { res.send("Reserva cancelada com sucesso!") } 
else { res.send("Erro!") }
*/



/*
if( result.length != 0 )
  { res.send("Reserva cancelada com sucesso!") } 
else { res.send("Erro!") }
*/

})





app.get('/rotadeteste', function(req, res){
Db.movies.findAll({     
    //  include: [{model: Db.parental, required: true, attributes: ['name'],}] ,  order: [['id','DESC']],
      attributes: ['name','directoryName'],
      raw: true,
      include: {
          model: Db.parental,
          attributes: ['name'],
      }
  }).then(function(recebeReservas){
     console.log(recebeReservas)
  })

})










//Rota "/add" criada para exibir o formulário HTML via handlebars utilizando o metodo POST, aula 21
app.post('/add',function(req,res){
    // res.send('ROTA DE CADASTRO DE POSTS')       
       //res.send('FORMULARIO RECEBIDO!')
       
       //Capturando dados do formulário enviados via metodo POST, e exibindo na rota com o módulo BodyParser - Aula22
       //res.send("Texto: "+req.body.titulo+" Conteudo: "+req.body.conteudo)

       //Função criada para gravar no banco o conteudo do post do formulário da rota /add - aula24
       Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
       }).then(function(){
         //   res.send("Post criado com sucesso!")
            res.redirect('/')
       }).catch(function(erro){
            res.send("Houve um erro" + erro)
       })    
    })

    app.post('/addreserva',function(req,res){
        // res.send('ROTA DE CADASTRO DE POSTS')       
           //res.send('FORMULARIO RECEBIDO!')
           
           //Capturando dados do formulário enviados via metodo POST, e exibindo na rota com o módulo BodyParser - Aula22
           //res.send("Texto: "+req.body.titulo+" Conteudo: "+req.body.conteudo)
    
           //Função criada para gravar no banco o conteudo do post do formulário da rota /add - aula24
           Espaco.create({
            nome_espaco: req.body.espaco,
            capacidade: req.body.capacidade
           }).then(function(){
             //   res.send("Post criado com sucesso!")
                res.redirect('/espaco')
           }).catch(function(erro){
                res.send("Houve um erro" + erro)
           })    
        })


//Rota criada para ser exibida quando acessa a /
app.get("/home2",function(req,res){
    //res.send("Hello!");
    //res.sendFile(__dirname+ "/html/index.html")
    //res.render('home2')
    Post.findAll({order: [['id','DESC']]}).then(function(recebePosts){
        //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
        console.log(recebePosts)
        res.render('home2', {posts: recebePosts})
        })
     //   res.render('home')
});


app.post('/editado/:id', function(req, res){
    Post.update({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo
    },
    {
      where: { id: req.params.id }
    }).then(function(){
      res.redirect('/home2')
    }).catch(function(err){
      console.log(err);
    })
  })

  app.post('/editado3/:id', function(req, res){
    Espaco.update({
      nome_espaco: req.body.nomeEspaco,
      capacidade: req.body.capacidadeEspaco
    },
    {
      where: { id: req.params.id }
    }).then(function(){
      res.redirect('/espaco')
    }).catch(function(err){
      console.log(err);
    })
  })







//Rota criada para ser exibida quando acessa a /
app.get("/",function(req,res){
    //res.send("Hello!");
    //res.sendFile(__dirname+ "/html/index.html")
    res.render('home1')
});

//Rota criada para ser exibida quando acessa o caminho /sobre
app.get("/sobre",function(req,res){
   // res.send("Minha pagina sobre");
   res.sendFile(__dirname+"/html/sobre.html")
});

//Rota criada para ser exibida quando acessa o caminho /blog
app.get("/blog",function(req,res){
    res.send("Bem-vindo ao meu blog!");
});

app.get("/ola/:cargo/:nome/:cor",function(req,res){
//    res.send("OLA!");
//    res.send(req.params)
//    res.send("Ola  "+req.params.nome)
    res.send("<h1>Ola  "+req.params.nome+"</h1>"+"<h2> Seu CARGO é: "+req.params.cargo+"</h2>"+"<h3> Sua cor favorita é: "+req.params.cor+"</h3>")
});


app.listen(8081, function(){
    console.log("Servidor rodando na URL http://localhost:8081")
});