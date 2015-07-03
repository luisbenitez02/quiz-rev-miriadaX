var express = require('express');
var router = express.Router();

//Pasos 1b y 1c Importamos el enrutador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });//titulo de la pagina
});

/*OJOOO ESTE AUTOLOAD VA AQUI ANTES DE QUE SE EVALUEN EL RESTO*/
router.param('quizId', quizController.load);//si el parametro existe ejecuta el load

//Definimos rutas para el acceso
/*router.get('/quizes/question', quizController.question);*/
//Se creo la carpeta quizes y se van a crear unos index
router.get('/quizes', quizController.index);//quizes/:search? parametro opcional da errores 

router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//antes GEt/quizes/answer (trae parametro para comparar id con respuesta)

router.get('/quizes/new', quizController.new);//nueva pregunta (form)
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);//editar pregunta
router.put('/quizes/:quizId(\\d+)', quizController.update);//actualiza pregunta en la DB
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);//borra pregunta
router.get('/author', quizController.author);
//muestra pagina de autor
module.exports = router;