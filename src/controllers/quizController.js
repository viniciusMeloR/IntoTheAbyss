var usuarioModel = require("../models/quizModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var quiz1 = req.body.quiz1;
    var quiz2 = req.body.quiz2;
    var quiz3 = req.body.quiz3;
    var quiz4 = req.body.quiz4;

    // Faça as validações dos valores
     if (quiz1 == undefined)  {
        res.status(400).send("Seu quiz1 está undefined!");
    } else if (quiz2==undefined) {
        res.status(400).send("Seu quiz2 está undefined");
    } else  if (quiz3 == undefined)  {
        res.status(400).send("Seu quizz3 está undefined");
    } else if (quiz4==undefined) {
        res.status(400).send("Seu quizz4 está undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(quiz1,quiz2,quiz3,quiz4)
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