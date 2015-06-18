var models = require('../models/models.js');//importamos el modelo

// GET /quizes/question
exports.question = function(req,res){
	//con findAll buscamos todos los datos en la base de datos (con find() buscamos uno creo no...)
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});//mostramos las unica pregunta en la DB
	});
};

exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta) {
		res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
		};
	});
};

exports.author = function(req, res){
	res.render('quizes/author', {name: 'Luis Benitez'});
};
/*esa variable pregunta se la estamos enviando a las vistas en la
carpeta quizes dentro de views*/
