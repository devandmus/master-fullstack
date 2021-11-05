import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import handlerError from 'http-errors';
import apiRoutes from './config/routes.api.js';
import sessionMiddleware from './middlewares/session.middleware.js'
import { loadUser } from './middlewares/auth.middleware.js';
import './config/db.config.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Middlewares
app.use(sessionMiddleware);
app.use(loadUser);

// Router
app.use('/api', apiRoutes);

// default error trigger
app.use((req, res, next) => {
  next(handlerError(404, 'Ruta no encontrada'));
});

// Error manager
app.use((error, req, res, next) => {
  const status = error.status || 500;
  error = status >= 500 ? { error: 'Error de servidor' } : error;
  return res
    .status(status)
    .json(error)
});

app.listen(process.env.PORT, () => {
  console.info('Server running');
});