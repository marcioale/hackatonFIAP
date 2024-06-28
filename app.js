var http = require('http');


//A linha abaixo cria/sobe um server web na porta 8081
//http.createServer().listen(8081);

//A linha abaixo cria/sobe um server web e mostra a mensagem "Hello World! Welcome to my website" quando acessado via localhost  na porta 8081
http.createServer(function(req,res){res.end("Hello World! Welcome to my website")}).listen(8081);

console.log("O servidor rodando!");
