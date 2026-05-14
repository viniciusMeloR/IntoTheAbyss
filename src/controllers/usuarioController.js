var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var usuario = req.body.nomeServer;
    var senha = req.body.senhaServer;

    if (usuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(usuario, senha)
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
                            email: resultadoAutenticar[0].email,
                            sexo: resultadoAutenticar[0].sexo,
                            tempo: resultadoAutenticar[0].tempo
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
function validarSenhaOuUsuario(texto) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*]).{6,}$/;

    return regex.test(texto);
}
function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var sexo = req.body.sexoServer;
    var tempo = req.body.tempoServer;

    if (nome == undefined || !validarSenhaOuUsuario(nome)) {
        res.status(400).send(
            "Usuário inválido! Precisa ter no mínimo 6 caracteres, letra maiúscula, minúscula, número e caractere especial."
        );
    } else if (email == undefined || !email.includes("@")) {
        res.status(400).send("Email inválido!");

    } else if (senha == undefined || !validarSenhaOuUsuario(senha)) {
        res.status(400).send(
            "Senha inválida! Precisa ter no mínimo 6 caracteres, letra maiúscula, minúscula, número e caractere especial."
        );

    } else if (sexo == undefined) {
        res.status(400).send("Sexo undefined!");

    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, sexo, tempo)
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