//Vamos a crear la tabla que contiene las preguntas
//Aqui solamente se define como es la tabla quiz
module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',/*nombre de la tabla*/
		/*Nombre del campo: tipo de dato*/
		{ pregunta: DataTypes.STRING,
		  respuesta: DataTypes.STRING,
	});
};
/*OJOOOO!!! EL ID SIEMPRE ESTA PREDETERMINADO*/