import 'dotenv/config';

import path from 'path';

import cors from 'cors';
import express from 'express';
import { MongoClient } from 'mongodb';

import { APIRoutes } from './routes';

const { MONGO_DB_NAME = '', MONGO_URL = '' } = process.env;

const databaseUrl = MONGO_URL;
const dbClient = new MongoClient(databaseUrl);

const databaseName = MONGO_DB_NAME;
const app = express();

export async function startServer() {
  // Establish DB Connection
  await dbClient.connect();
  console.log('Connected successfully to the mongo database');

  // Establish application contexts
  const db = dbClient.db(databaseName);
  app.set('db', db);

  // Setup Server Middleware
  app.use(cors());

  // Setup Routes
  app.use('/api/v1', APIRoutes);

  // Misc
  if (process.env.NODE_ENV === 'production') {
    // Serve static assets
    app.use(express.static('client/build'));

    // Serve index.html for non routed paths
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  } else {
    app.get('*', (req, res) => {
      res.send('In development mode.');
    });
  }

  return app;
}
