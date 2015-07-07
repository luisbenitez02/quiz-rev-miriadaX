var users ={
	admin: {id:1, username:'admin', password:'0204'},
	pepe: {id:2, username:'pepe', password:'5678'}
};

//Comprueba si esta registrado
//si autenticacion falla o hay error llama callback(error)
exports.autenticar = function(login, password, callback){
	if (users[login]){
		if (password === users[login].password) {
			callback(null, users[login]);
		}
		else{
			callback( new Error('Password erroneo'));
		}
	} else{
		callback( new Error('Usuario Inexistente'));
	}
}; 