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
};

exports.index = function(req, res){
	var param = req.query.search;
    var texto = ('%' + param + '%').replace(/ /g,'%');
    if (param) {//si hay parametro opcional hago esto:
        models.Quiz.findAll({
        	where: ["pregunta LIKE ?", texto],//para postgress utiliza ILIKE
            order: [['pregunta', 'ASC']]//ESTOS DOS CORCHETES INDISPENSABLES
        }).then(function(quizes) {   
            res.render('quizes/index.ejs', {quizes: quizes, errors: []});//le pasamos array de errores
        }).catch(function(error) {next(error);});
    }else {//si no hay nada pinto toda la lista
            models.Quiz.findAll().then(function(quizes) {
                res.render('quizes/index.ejs', {quizes: quizes, errors: []});
            }).catch(function(error) {next(error);});
    }
};
	
//antes export.question
exports.show = function(req, res){
//findAll buscamos todos los datos en la base de datos (con find() buscamos uno)
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: req.quiz, errors: []});//mostramos la pregunta que me entrego load
	})
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = "Incorrecto";
	if (req.query.respuesta === req.quiz.respuesta) {//verifica que la respuesta esta bien
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

//GET quizes/new
exports.new = function(req, res){
	//creamos objeto quiz (mismos campso de la DB), 
	//temporal, aun no se inserta nada en la DB
	var quiz = models.Quiz.build(
		{pregunta:'¿Tu Pregunta?', respuesta:'Respuesta', tema:'otro'}
	);
	res.render('quizes/new', {quiz: quiz, errors: []});//pintamos en esa ruta
};

//POST quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );//parametros accesibles en el body
	//Vamos a validar los datos ingresados
	quiz
	.validate()
	.then(
		function(err){
			if(err){//si da error, damos orden de dibujarlo
				res.render('quizes/new', { quiz: quiz, errors: err.errors});
			} else {//si todo esta bien (campos OK)
			//Guarda en DB campos de pregunta y respuesta
			quiz
			.save({fields: ["pregunta","respuesta","tema"]})
			.then(function(){
				res.redirect('/quizes');//redireccionamos a quizes
			});
		}
	});
};

exports.edit = function(req, res){
	var quiz = req.quiz;//autoload, instancia de quiz
	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;//recogemos campo de tema

	req.quiz.validate().then( function(err){
		if(err){
			res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
		} else{//guarda los campos actualizados
			req.quiz.save({ fields: ['pregunta', 'respuesta','tema']})
			.then( function() {res.redirect('/quizes');}); 
		}
	});
};

exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch( function(error){next(error)});
};

exports.author = function(req, res){
	res.render('quizes/author', {name: 'Luis Benitez', errors: []});
};
/*esa variable pregunta se la estamos enviando a las vistas en la
carpeta quizes dentro de views*/