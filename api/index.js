'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/siscom', (err, res) => {
	if(err) {
		throw err;
	}else{
		console.log("La conexión a la base de datos está funcionando correctamente");
		
		app.listen(port, function(){
			console.log("Servidor Web funcionando en http://localhost:" + port);
		});
	}
});