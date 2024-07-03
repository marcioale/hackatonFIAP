const express = require("express");
const app = express();
//Chamada do módulo body parser após sua instalação conforme aula 22
const bodyParser = require('body-parser')
//Chamada do models para gravar conteudo do formulário do POST - aula 24
const Post = require('./models/Post.js')

const Reserva = require('./models/cria_tabelas')
const Espaco = require('./models/cria_tabelas1')
const Db = require('./models/cria_tabelas2');

/*Linhas abaixo de conexão com o banco mysql foram movidas para o arquivo /models/db.js na aula 23
Conexao com banco de dados via Sequelize - aula19
const  Sequelize  = require("sequelize")
const sequelize = new Sequelize('sistemaDeCadastro','root','root',{
    host: "localhost",
    dialect: 'mysql'
})
*/

//Declaração do HandleBars ao express - aula 19
const handlebars = require('express-handlebars')

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
    Espaco.findAll({order: [['id','DESC']]}).then(function(recebeReservas){
    //    res.render('home', {nome: "Victor", sobrenome: "Lima" })
    console.log(recebeReservas)
    res.render('espaco', {reservas: recebeReservas})
    })
 //   res.render('home')
})

//Rota criada para fazer o join de reserva
app.get('/reserva', function(req, res){
    Db.Reserva.findAll({
        attributes: ['horario','espacoId','reservado'],
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