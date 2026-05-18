var database = require("../database/config")

function cadastrar(quiz1, quiz2, quiz3, quiz4, idUsuario) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", quiz1,quiz2,quiz3,quiz4,idUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO quizz (quizz1,quizz2,quizz3,quizz4,fkUsuarioAbyss) VALUES ('${quiz1}', '${quiz2}', '${quiz3}', '${quiz4}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};