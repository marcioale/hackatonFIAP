//Importar funções de calculo declaradas no arquivo funcoes.js
var calculos = require('./funcoes.js');

//Obter as funções matemáticas declaradas no arquivo funcoes.js
var SomaFunc = calculos.somar
var SubtrFunc = calculos.subtrair
var MultiFunc = calculos.multiplicar


console.log("Script para testar a feature Modules no NodeJS");

//Realizando calculo com as funções declaradas no arquivo funcoes.js
console.log(SomaFunc(3,4));
console.log(SubtrFunc(3,4));
console.log(MultiFunc(3,4));