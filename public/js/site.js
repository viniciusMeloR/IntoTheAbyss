
let cadastroNome = document.querySelector("#cadastroNome")
let cadastroEmail = document.querySelector("#cadastroEmail")
let cadastroSexo = document.querySelector("#cadastroSexo")
let cadastroSenha = document.querySelector("#cadastroSenha")
let cadastroConfirmar = document.querySelector("#cadastroConfirmar")
let loginNome = document.querySelector("#loginNome")
let loginSenha = document.querySelector("#loginSenha")
let cardErro = document.querySelector("#cardErro")
let mensagem_erro = document.querySelector("#mensagem_erro")


function cadastrar() {
  var UsuarioVar = cadastroNome.value;
  var emailVar = cadastroEmail.value;
  var sexo = cadastroSexo.value
  var senhaVar = cadastroSenha.value;
  var confirmarSenha = cadastroConfirmar.value;
  var tempo = new Date()

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: UsuarioVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      sexoServer: sexo,
      tempoServer: tempo
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        setTimeout(() => {
          window.location = "index.html";
        }, "2000");
      } else {
        alert("Verifique se os dados estão certos!")
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function entrar() {

  console.log("FUNÇÃO ENTRAR FOI CHAMADA");

  aguardarLogin();

  var UsuarioVar = loginNome.value;
  var senhaVar = loginSenha.value;

  if (UsuarioVar == "" || senhaVar == "") {
    cardErro.style.display = "block"
    mensagem_erro.innerHTML = "Campos em branco";
    finalizarAguardarLogin();
    return false;
  }
  else {
    setInterval(sumirMensagem, 5000)
  }

  console.log("FORM LOGIN: ", UsuarioVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeServer: UsuarioVar,
      senhaServer: senhaVar
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
      console.log(resposta);

      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.usuario;
        sessionStorage.ID_USUARIO = json.id;
        sessionStorage.SEXO_USUARIO = json.sexo;
        sessionStorage.TEMPO_USUARIO = json.tempo;

        setTimeout(function () {
          window.location = "./Usuario.html";
        }, 1000);

      });

    } else {
      alert("Verifique se os dados contem os requistos!, se conter, usuario de login já existe!")
      console.log("Houve um erro ao tentar realizar o login!");

      resposta.text().then(texto => {
        console.error(texto);
        finalizarAguardar(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;
}



 function sumirMensagem() {
    cardErro.style.display = "none";
  }


