var quizmodel = require("../models/quizmodel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var pontuacao = req.body.pontuacao;
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    var idUsuario = req.body.idUsuario

    // Faça as validações dos valores
     if (pontuacao == undefined)  {
        res.status(400).send("Seu quiz1 está undefined!");
    } else if (acertos==undefined) {
        res.status(400).send("Seu quiz2 está undefined");
    } else  if (erros == undefined)  {
        res.status(400).send("Seu quizz3 está undefined");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        quizmodel.cadastrar(pontuacao, acertos, erros, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}