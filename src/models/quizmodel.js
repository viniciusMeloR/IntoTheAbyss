var database = require("../database/config")

function cadastrar(pontuacao,acertos, erros, idUsuario) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", pontuacao,acertos,erros,idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO quiz(pontuacao,acertos,erros,fkUsuarioAbyss) VALUES ('${pontuacao}', '${acertos}', '${erros}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarQuizPorUsuario(usuario) {
    var instrucaoSql = `SELECT * FROM quiz WHERE fkUsuarioAbyss = ${usuario};`
    return database.executar(instrucaoSql);
}
function buscarEstatisticas() {
    var instrucaoSql = `SELECT usuarioAbyss.usuario AS usuario, AVG(pontuacao) AS media,
     MAX(pontuacao) AS maximo, MIN(pontuacao) AS minimo FROM quiz JOIN usuarioAbyss ON fkUsuarioAbyss = idUsuario
     GROUP BY usuarioAbyss.usuario ORDER BY media DESC LIMIT 5;`
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscarQuizPorUsuario,
    buscarEstatisticas
};