var quizmodel = require("../models/quizmodel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var pontuacao = req.body.pontuacao;
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    var idUsuario = req.body.idUsuario

    // Faça as validações dos valores
     if (pontuacao == undefined)  {
        res.status(400).send("Sua pontuação undefined!");
    } else if (acertos==undefined) {
        res.status(400).send("Seus acertos estão undefined");
    } else  if (erros == undefined)  {
        res.status(400).send("Seus erros estão undefined");
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

async function buscarQuizPorUsuario(req,res){ // criei uma função com async e await para exercitar e entender a diferença do then
    try{
    let idUsuario = req.params.idUsuario;
    let dadosQuizUsuario = await quizmodel.buscarQuizPorUsuario(idUsuario);
    let pontuacao = []
    let acertos = []
    let erros = []// aqui todos os dados estão sendo tratados no controller, sendo colocados dentro de arrays, lembrando que o model trouxe uma array de jsons e aqui estou colocando tudo dentro de arrays separadas
    for(let i=0;i<dadosQuizUsuario.length;i++){
        pontuacao.push(dadosQuizUsuario[i].pontuacao);
        acertos.push(dadosQuizUsuario[i].acertos);
        erros.push(dadosQuizUsuario[i].erros);
    }
    return res.json({
        pontuacao:pontuacao,
        acertos:acertos,
        erros:erros
    });
}catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao buscar dados do MySQL" });
}
}

function buscarEstatisticas(req, res) {
    quizmodel.buscarEstatisticas()
        .then(function (dadosEstatistica) {
            res.json(dadosEstatistica);

        })
        .catch(function (erro) {

            console.log(erro);

            res.status(500).json({
                erro: "Erro ao buscar estatísticas"
            });

        });
}
module.exports = {
    cadastrar,
    buscarQuizPorUsuario,
    buscarEstatisticas
}