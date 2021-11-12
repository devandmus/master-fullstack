import handlerError from 'http-errors';
import UserModel from '../models/user.model.js';
import validationEmail from '../config/mailer.config.js';

// POST /api/users
// - No necesita estar autenticada
// - Recibe body JSON con los campos name, email, password y bio
// - Almacena el usuario en Base de Datos en memoria cifrando su contraseña
const CreateUser = (req, res, next) => {
  const { name, email, password, bio } = req.body
  UserModel
    .create({ name, email, password , bio })
    .then(user => {
      validationEmail(user);
      res
        .status(201)
        .json(user);
    })
    .catch(err => {
      if(err.code === 11000)
        err = 'Email unavailable'
      next(handlerError(400, err))
    });
}


const Activate = (req, res, next) => {
  UserModel
    .findByIdAndUpdate(req.params.id, { active: true}, { new: true})
    .then(user =>
      user ? res.json(user) : next(handlerError(404, 'Usuario no encontrado'))
    )
    .catch(next);
}

export {
  CreateUser,
  Activate,
}