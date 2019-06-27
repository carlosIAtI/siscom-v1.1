'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	nombre: String,
	apellidos: String,
	correo: String,
	fecha_nacimiento:String,
	telefono: Number,
	escuela: String,
	cp: Number,
	sucursal: Number,
	password: String,
	creado_en: String,
	actualizado_en: String,
	role: String,
	futuro1: String,
	futuro2: String
});

module.exports = mongoose.model('User', UserSchema);