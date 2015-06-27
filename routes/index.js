var express = require('express');
var router = express.Router();

//Pasos 1b y 1c Importamos el enrutador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });//titulo de la pagina
});

/*OJOOO ESTE AUTOLOAD VA AQUI ANTES DE QUE SE EVALUEN EL RESTO*/
router.param('quizId', quizController.load);//si el parametro existe ejecuta el load

//Definimos rutas para el acceso
/*router.get('/quizes/question', quizController.question);*/
//Se creo la carpeta quizes y se van a crear unos index
router.get('/quizes:search?', quizController.index);//acceso a la lista de preguntas
///quizes/:search? parametro opcional

router.get('/quizes/:quizId(\\d+)', quizController.show);
//antes GET/quizes/question (trae una sola pregunta)
//show convenio de rails para mostrar recurso individual

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//antes GEt/quizes/answer (trae parametro para comparar id con respuesta)

router.get('/author', quizController.author);
//muestra pagina de autor
module.exports = router;