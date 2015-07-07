var express = require('express');
var router = express.Router();

//Pasos 1b y 1c Importamos el enrutador
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });//titulo de la pagina
});

/*OJOOO ESTE AUTOLOAD VA AQUI ANTES DE QUE SE EVALUEN EL RESTO*/
router.param('quizId', quizController.load);//si el parametro existe ejecuta el load

//Definicion rutas de Session
router.get('/login', sessionController.new);//form autenticacion
router.post('/login', sessionController.create);//inicia la sesion
router.delete('/logout', sessionController.destroy);//deberia ser delete no tenemos DB con sesiones y usuarios

//Definimos rutas para el acceso
router.get('/quizes', quizController.index);//quizes/:search? parametro opcional da errores 

router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//antes GEt/quizes/answer (trae parametro para comparar id con respuesta)

router.get('/quizes/new', quizController.new);//nueva pregunta (form)
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);//editar pregunta
router.put('/quizes/:quizId(\\d+)', quizController.update);//actualiza pregunta en la DB
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);//borra pregunta
router.get('/author', quizController.author);//muestra pagina de autor

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);


module.exports = router;