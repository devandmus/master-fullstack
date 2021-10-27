import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

MongoMemoryServer
  .create()
  .then(server => mongoose.connect(server.getUri()), {
    newUrlParser: true,
    dbName: 'express-api-rest',
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.error('Error connecting to database')
  })

process.on('SIGTERM', () => {
  mongoose.disconnect();
})