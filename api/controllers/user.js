'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del api rest'
    });
}

///////////////////////////////////////////////
// REGISTRO
///////////////////////////////////////////////

function saveUser(req, res) {
    var user = new User();

    var params = req.body;

    console.log(params);

    user.nombre = params.nombre;
    user.apellidos = params.apellidos;
    user.correo = params.correo;
    user.fecha_nacimiento = params.fecha_nacimiento;
    user.telefono = params.telefono;
    user.escuela = params.escuela;
    user.cp = params.cp;
    user.sucursal = params.sucursal;
    user.creado_en = new Date();
    user.actualizado_en = new Date();
    user.role = 'ROLE_USER';
    user.futuro1 = 'null';
    user.futuro2 = 'null';

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    function validar_telefono(telefono) {
        var regex = /^\d{10}$/;
        return regex.test(telefono) ? true : false;
    }

    function validar_cp(cp) {
        var regex = /^\d{5}$/;
        return regex.test(cp) ? true : false;
    }

    function validar_password(password) {
        var regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        return regex.test(password) ? true : false;
    }

    if (params.password) {
        // Encriptar contraseña
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;

            if (user.nombre != null && user.apellidos != null && user.correo != null && user.fecha_nacimiento != null && user.sucursal != null) {

                if (validar_email(user.correo) == false) {
                    res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
                } else if (validar_telefono(user.telefono) == false) {
                    res.status(404).send({ message: 'El número de teléfono debe contener 10 dígitos.' });
                } else if (user.cp != null && (validar_cp(user.cp) == false)) {
                    res.status(404).send({ message: 'El código postal debe contener 5 dígitos.' });
                } else if (validar_password(params.password) == false) {
                    res.status(404).send({ message: 'La clave debe tener entre 8-16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Puede tener otros símbolos.' });
                } else {
                    // Guardar el usuario
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: 'Error al guardar el usuario' });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: 'No se ha registrado el usuario' });
                            } else {
                                res.status(200).send({ user: userStored });
                            }
                        }
                    });
                }

            } else {
                res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
            }

        });
    } else {
        //res.status(404).send({message: 'Introduzca una contraseña'});
        res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
    }

}

///////////////////////////////////////////////
// LOGIN
///////////////////////////////////////////////

function loginUser(req, res) {
    var params = req.body;

    var correo = params.correo;
    var password = params.password;

    function validar_email(correo) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(correo) ? true : false;
    }

    User.findOne({ correo: correo.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {

            if (correo.length <= 0 || password.length <= 0) {
                res.status(404).send({ message: 'Ingrese todos sus datos para continuar.' });
            } else if (validar_email(correo) == false) {
                res.status(404).send({ message: 'Introduzca un E-Mail válido.' });
            } else {

                if (!user) {
                    res.status(404).send({ message: 'E-Mail o clave incorrectas, por favor verifiquelas.' });
                } else {

                    // Comprobar la contraseña
                    bcrypt.compare(password, user.password, function(err, check) {
                        if (check) {
                            // Devolver los datos del usuario logueado
                            if (params.gethash) {
                                // Devolver un token de jwt
                                res.status(200).send({
                                    token: jwt.createToken(user)
                                });
                            } else {
                                res.status(200).send({ user });
                            }
                        } else {
                            res.status(404).send({ message: 'E-Mail o clave incorrectas, por favor verifiquelas.' });
                        }
                    });
                }

            }
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser
};