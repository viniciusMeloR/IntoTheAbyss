var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.nomeServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(nome, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            usuario:resultadoAutenticar[0].usuario,
                            senha: resultadoAutenticar[0].senha,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var usuario = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var sexo = req.body.sexoServer;
    var tempo = req.body.tempoServer;

    // Faça as validações dos valores
     if (nome == undefined || nome.length < 6|| !nome.includes("!") ||!nome.includes("@")
    ||!nome.includes("#")||!nome.includes("$")||!nome.includes("%")||!nome.includes("*")
||!nome.includes(0)||!nome.includes(1)||!nome.includes(2)||!nome.includes(3)
||!nome.includes(4)||!nome.includes(5) ||!nome.includes(6)||!nome.includes(7)
||!nome.includes(8)||!nome.includes(9)|| nome.toUpperCase()==nome || nome.toLowerCase()==nome)  {
        res.status(400).send("Seu Usuario está undefined!");
    } else if (email == undefined || !email.includes("@")) {
        res.status(400).send("Seu email está undefined! Ou falta o @");
    } else  if (senha == undefined || senha.length < 6|| !senha.includes("!") ||!senha.includes("@")
    ||!senha.includes("#")||!senha.includes("$")||!senha.includes("%")||!senha.includes("*")
||!senha.includes(0)||!senha.includes(1)||!senha.includes(2)||!senha.includes(3)
||!senha.includes(4)||!senha.includes(5) ||!senha.includes(6)||!senha.includes(7)
||!senha.includes(8)||!senha.includes(9)|| senha.toUpperCase()==senha || senha.toLowerCase()==senha)  {
        res.status(400).send("Sua senha está undefined!");
    } else if (sexo == undefined) {
        res.status(400).send("Seu sexo esta undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(usuario, email, senha, sexo, tempo)
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
    autenticar,
    cadastrar
}