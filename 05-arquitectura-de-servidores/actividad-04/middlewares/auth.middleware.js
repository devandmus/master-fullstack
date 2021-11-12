import handlerError from 'http-errors';
import UserModel from '../models/user.model.js';


const loadUser = async (req, res, next) => {
  const userId = req.session.loggedUser;
  if(userId)
    await UserModel
      .findById(userId)
      .then(user => {
        if(user)
          req.user = user;
      })
      .catch(next);
  next();
}


const isAuthenticated = (req, res, next) =>
  req.user ? next() : next(handlerError(401, 'Sin autorización'));


export {
  loadUser,
  isAuthenticated,
}