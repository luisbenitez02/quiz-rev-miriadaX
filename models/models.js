//Este archivo contruye la DB con el modelito importado (quiz.js)
var path = require('path');

/*Postgres DATABASE_URL = postgres://user:passwd@host:port/database */
/*SQLite DATABASE_URL = sqlite://:@:/ */
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
//vamos a recuperar el usuario pass, host y todo eso aqui
var DB_name =  (url[6] || null);
var user =     (url[2] || null);
var pwd =      (url[3] || null);
var protocol = (url[1] || null);
var dialect =  (url[1] || null);
var port =     (url[5] || null);
var host =     (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//Cargar el ORM sequelize
var Sequelize = require('sequelize');

//usar la DB SQLite o Postgress
	//sequelize minuscula y luego mayuscula
var sequelize = new Sequelize(DB_name, user, pwd,
	  { dialect: protocol,
		protocol: protocol,
		port: port,
		host: host,
		storage: storage,//solo SQLite (.env)
		omitNull: true //solo Postgres
	   }
);

//Importa la definicion de la tabla en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz;//exportamos la definicion de la tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){/*OJO ESTO AHORA SE HACE CON PROMESAS--*/
	/*sucess(..) ejecuta el manejador una vez creada la tabla*/
	Quiz.count().then(function(count){
		if (count === 0) {//SE INICIALIZA SOLO SI ESTA VACIA
			Quiz.create({
				pregunta: '¿Cual es la capital de Italia?',
				respuesta: 'Roma'
			})/*.success se ejecuta cuando se haya creado la tabla*/
			.then(function(){
				console.log('Base de datos inicializada');
			});
		};
	});
});