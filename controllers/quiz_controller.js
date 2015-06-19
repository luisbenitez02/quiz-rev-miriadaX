var models = require('../models/models.js');//importamos el modelo

/*-------Autoload - factoriza el codigo si la ruta incluye :quizId-----*/
//le pasa quizId
//busca en la base de datos y cuando tiene el objeto verifica si existe
//lo asigna a quiz.req y ejecuta el middleware correspondiente con next
//middleware que sigue
exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();//llama al proximo si no hay error
			} else {
				next(new Error ('No existe quizId= ' + quizId));
			}
		}
	).catch(function(error){next(error);});
}

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes) {
		//buscamos todas las preguntas
		res.render('quizes/index', { quizes : quizes});
		}
	).catch(function(error){ next(error);})//si hay error lleva a l siguiente middleware de error
};
//antes export.question
exports.show = function(req, res){
//findAll buscamos todos los datos en la base de datos (con find() buscamos uno)
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz});//mostramos la pregunta que me entrego load
	})
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = "Incorrecto";
	if (req.query.respuesta === req.quiz.respuesta) {//verifica que la respuesta esta bien
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

exports.author = function(req, res){
	res.render('quizes/author', {name: 'Luis Benitez'});
};
/*esa variable pregunta se la estamos enviando a las vistas en la
carpeta quizes dentro de views*/