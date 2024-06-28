// consulta1.js
const { Livro, Autor } = require('./tabela_supbase');

async function consulta1() {
  const resultado = await Livro.findAll({
    attributes: ['titulo', 'ano_publicacao'],
    include: {
      model: Autor,
      attributes: ['nome'],
    },
  });
  console.log(resultado);
}

consulta1();