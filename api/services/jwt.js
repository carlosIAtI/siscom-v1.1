'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'siscom';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		nombre: user.nombre,
		apellidos: user.apellidos,
		correo: user.correo,
		telefono: user.telefono,
		escuela: user.escuela,
		cp: user.cp,
		sucursal: user.sucursal,
		iat: moment().unix,
		exp: moment().add(30, 'days').unix
	};
	
	return jwt.encode(payload, secret);
};