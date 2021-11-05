import UserModel from '../models/user.model.js';


// 2. POST /api/login
// - Recibe body con email, password
// - Devuelve HTTP 200 OK con Cookie de sesión si las credenciales son correctas
// - Devuelve HTTP 400 en caso de error en la validación de datos
// - Devuelve HTTP 401 si las credenciales no son correctas
const Login = (req, res, next) => {
  const { email, password } = req.body
  UserModel
    .findOne({ email, activate: true })
    .then(user => (
      user
      ? user
      : res
        .status(400)
        .json({ error: 'Validación de datos' })
    ))
    .then(user => {
      user
        .hasValidPassword(password)
        .then(isValid => {
          if(isValid) {
            req.session.loggedUser = user._id.toString();
            res.json(user)
          }
          else res
            .status(401)
            .json({ error: 'Crendeciales incorrectas' })
        })
    })
    .catch(err => next(err));
}


// 3. POST /api/logout
// - Devuelve HTTP 401 si la petición no está correctamente autenticada
// - Devuelve HTTP 204 y elimina la sesión del usuario.
const Loggout = (req, res, next) => {
  req.session.destroy();
  res
    .status(204)
    .send();
}


export {
  Login,
  Loggout,
}