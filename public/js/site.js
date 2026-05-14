let modal = document.querySelector("#modalCadastro")
let modalLogin = document.querySelector("#modalLogin")
let cadastroNome = document.querySelector("#cadastroNome")
let cadastroEmail = document.querySelector("#cadastroEmail")
let cadastroSexo = document.querySelector("#cadastroSexo")
let cadastroSenha = document.querySelector("#cadastroSenha")
let cadastroConfirmar = document.querySelector("#cadastroConfirmar")
let validarNome = document.querySelector("#validarNome")
let validarEmail = document.querySelector("#validarEmail")
let validarSenha = document.querySelector("#validarSenha")
let validarConfirmar = document.querySelector("#validarConfirmar")
let loginNome = document.querySelector("#loginNome")
let loginSenha = document.querySelector("#loginSenha")
let caracteresEspeciais = ["!", "@", "#", "$", "%", "*"]
let numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


function cadastrar() {
  var nomeVar = cadastroNome.value;
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
      nomeServer: nomeVar,
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
  aguardar();

  var nomeVar = loginNome.value;
  var senhaVar = loginSenha.value;

  if (nomeVar == "" || senhaVar == "") {
    cardErro.style.display = "block"
    mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
    finalizarAguardar();
    return false;
  }
  else {
    setInterval(sumirMensagem, 5000)
  }

  console.log("FORM LOGIN: ", nomeVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
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
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;
        sessionStorage.SEXO_USUARIO = json.sexo;
        sessionStorage.TEMPO_USUARIO = json.tempo;

        setTimeout(function () {
          window.location = "./dashboard/cards.html";
        }, 1000);

      });

    } else {
      alert("Verifique se os dados estão certos!")
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

function abrirModal() {
  modal.showModal()
}
function fecharModal() {
  modal.close()
}
function fecharModalLogin() {
  modalLogin.close()
}
function login() {
  modalLogin.showModal()
}

cadastroNome.addEventListener('input', function () {
  let valor = cadastroNome.value
  let temCaracteresEspeciais = caracteresEspeciais.some(function (caracteresEX) {
    return valor.includes(caracteresEX);
  });

  let temNumeros = numeros.some(function (numero) {
    return valor.includes(numero);
  });

  if (cadastroNome.value.length <= 5 || !temCaracteresEspeciais || !temNumeros
    || cadastroNome.value.toUpperCase() == cadastroNome.value || cadastroNome.value.toLowerCase() == cadastroNome.value) {
    validarNome.textContent = "O nome precisa ter mais de 5 caracteres, um caractere especial, um caractere maisculo, um caractere minusculo e um número"
  } else {
    validarNome.textContent = ""
  }

})
cadastroEmail.addEventListener('input', function () {
  let valor = cadastroEmail.value
  if (!valor.includes("@")) {
    validarEmail.textContent = "O Email precisa ter Arroba"
  } else {
    validarEmail.textContent = ""
  }

})

cadastroSenha.addEventListener('input', function () {
  let valorSenha = cadastroSenha.value
  let temCaracteresEspeciais = caracteresEspeciais.some(function (caracteresEX) {
    return valorSenha.includes(caracteresEX);
  });

  let temNumeros = numeros.some(function (numero) {
    return valorSenha.includes(numero);
  });

  if (cadastroSenha.value.length <= 5 || !temCaracteresEspeciais || !temNumeros
    || cadastroSenha.value.toUpperCase() == cadastroSenha.value || cadastroSenha.value.toLowerCase() == cadastroSenha.value) {
    validarSenha.textContent = "A senha precisa ter mais de 5 caracteres, um caractere especial, um caractere maisculo, um caractere minusculo e um número"
  } else {
    validarSenha.textContent = ""
  }

})

cadastroConfirmar.addEventListener('input', function () {
  let valor = cadastroConfirmar.value
  if (valor != cadastroSenha.value) {
    validarConfirmar.textContent = "Senhas diferentes"
  } else {
    validarConfirmar.textContent = ""
  }
})


