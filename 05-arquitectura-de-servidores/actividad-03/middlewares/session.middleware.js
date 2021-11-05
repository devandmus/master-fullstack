import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';

const SESSION_MAX_AGE = Number(process.env.SESSION_MAX_AGE) || 60480000;
const MongoStore = connectMongo(expressSession);

const session = expressSession({
  secret: process.env.SECRET || 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: process.env.SESSION_SECURE,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: SESSION_MAX_AGE,
  })
})

export default session;