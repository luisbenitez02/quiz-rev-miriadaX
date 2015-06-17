var express = require('express');
var router = express.Router();

//Pasos 1b y 1c Importamos el enrutador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });//titulo de la pagina
});

//Definimos dos rutas para el acceso
router.get('/quizes/question', quizController.question);//esto va a estar conectado con las vistas
//por ello se creo la carpeta quizes y se van a crear unos index muy cools
router.get('/quizes/answer', quizController.answer);
module.exports = router;
