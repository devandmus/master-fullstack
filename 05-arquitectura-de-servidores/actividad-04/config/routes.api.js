import express from 'express';
import * as PostController from '../controllers/api.post.controller.js';
import * as UserController from '../controllers/api.user.controller.js';
import * as SessionController from '../controllers/api.login.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import upload from './multer.config.js';
const Router = express.Router();
// all over /api

// Post routes
// 4. El resto de endpoints de nuestra API (CRUD de Posts) deben requerir autenticación y devolver código HTTP 401 ante peticiones no autenticadas.
Router.post('/posts', isAuthenticated, upload.single('image'), PostController.create);
Router.get('/posts', isAuthenticated, PostController.list);
Router.get('/posts/:id', isAuthenticated, PostController.detail);
Router.patch('/posts/:id', isAuthenticated, PostController.update);
Router.delete('/posts/:id', isAuthenticated, PostController.remove);

// User routes
Router.post('/users', UserController.CreateUser);
Router.get('/users/:id/activate', UserController.Activate);


// Session routes
Router.post('/login', SessionController.Login);
Router.get('/loggout', isAuthenticated, SessionController.Loggout);


export default Router;
