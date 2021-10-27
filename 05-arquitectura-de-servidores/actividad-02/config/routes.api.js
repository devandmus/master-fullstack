import express from 'express';
import * as ApiControllers from '../controllers/api.controller.js';


const Router = express.Router();

Router.post('/posts', ApiControllers.create);
Router.get('/posts', ApiControllers.list);
Router.get('/posts/:id', ApiControllers.detail);
Router.patch('/posts/:id', ApiControllers.update);
Router.delete('/posts/:id', ApiControllers.remove);


export default Router;