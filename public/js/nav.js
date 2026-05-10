let telaUsuario = document.getElementById("telaUsuario");
let personagens = document.getElementById("personagensPrincipais");
let apitos = document.getElementById("telaApitos")
let camadas = document.getElementById("camadasAbismo")

function mudarTela(tela) {
  if (tela == 'personagens') {
    personagens.style.display = "flex"
    telaUsuario.style.display = "none"
    apitos.style.display = "none"
    camadas.style.display = "none"
  } if (tela == 'telaUsuario') {
    personagens.style.display = "none"
    telaUsuario.style.display = "flex"
    apitos.style.display = "none"
    camadas.style.display = "none"
  } if (tela == 'apitos') {
    personagens.style.display = "none"
    telaUsuario.style.display = "none"
    apitos.style.display = "flex"
    camadas.style.display = "none"
  } if (tela == 'camadas') {
    personagens.style.display = "none"
    telaUsuario.style.display = "none"
    apitos.style.display = "none"
    camadas.style.display = "flex"
  }
}
/*   function mostrarPersonagens(){
    if(personagens.style.display === "none"){
      personagens.style.display = "flex";
      telaUsuario.style.display = "none";
    }else{
      personagens.style.display = "none"
    }
  }
 
  /* function perfil(){
    if(telaUsuario.style.display === "none"){
      telaUsuario.style.display = "flex"
    }else{
      telaUsuario.style.display = "none"
    }
  }
 
  function mostrarApitos(){
    if(apitos.style.display == "none"){
      apitos.style.display = "flex"
    }else{
      apitos.style.display = "none"
    }
  } */