// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardarCadastro() {
    document.getElementById("div_aguardar_cadastro").style.display = "flex";
}

function aguardarLogin() {
    document.getElementById("div_aguardar_login").style.display = "flex";
}

function finalizarAguardarLogin(texto) {
    var divAguardar = document.getElementById("div_aguardar_login");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function finalizarAguardarCadastro(texto) {
    var divAguardar = document.getElementById("div_aguardar_cadastro");
    divAguardar.style.display = "none";

    var divErrosCadastro = document.getElementById("div_erros_cadastro");
    if (texto) {
        divErrosCadastro.style.display = "flex";
        divErrosCadastro.innerHTML = texto;
    }
}
window.onload = () => {
  document.getElementById("div_aguardar_cadastro").style.display = "none";
  document.getElementById("div_aguardar_login").style.display = "none";
};

