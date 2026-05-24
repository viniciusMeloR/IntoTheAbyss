var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
})
// router com parametros do sessionStorage
router.get("/buscarQuizPorUsuario/:idUsuario", function (req, res) {
    quizController.buscarQuizPorUsuario(req, res);
})
router.get("/buscarEstatisticas", function (req, res) {
    quizController.buscarEstatisticas(req, res);
})

module.exports = router;