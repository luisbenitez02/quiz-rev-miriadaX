//MV de acceso a rutas que requieren autenticacion
exports.loginRequired = function(req, res, next){
	if (req.session.user) {
		next();//si existe usuario autenticado ejecuta siguiente middleware
	}
	else{//de lo contrario manda a login
		res.redirect('/login');
	}
}

//Get login
exports.new = function(req,res){
	var errors = req.session.errors || {};//inicio variable de errores con los que trae o vacia
	req.session.errors = {}

	res.render('sessions/new', {errors: errors});
};

//POST /login --crear la sesion
exports.create= function(req,res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	//autenticar esta definido en el paquete user_controller (yo lo hice)
	userController.autenticar(login, password, function(error, user){
		if (error) {//si hay error mandamos mensaje
			req.session.errors = [{"message": 'Upps! error de autenticacion: '+ error}];
			res.redirect('/login');//dibujamos en login
			return;
		}
		//crea re.session.user y uarda campos id y username
		//la sesion se define por la existencia de req.session.user
		req.session.user = {id:user.id, username:user.username};

		res.redirect(req.session.redir.toString());//path anterior a login
	});
};

//DELETE/logout --destruye sesion
exports.destroy = function(req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
}