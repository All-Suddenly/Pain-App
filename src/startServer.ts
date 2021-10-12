import 'dotenv/config';

import path from 'path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import helmet from 'helmet';
import { MongoClient } from 'mongodb';

import { config } from './config';
import { APIRoutes } from './routes';

const databaseUrl = config.db.url;
const dbClient = new MongoClient(databaseUrl);

const databaseName = config.db.name;
const app = express();

export async function startServer() {
  // Establish DB Connection
  await dbClient.connect();
  console.log('Connected successfully to the mongo database');

  // Establish application contexts
  const db = dbClient.db(databaseName);
  app.set('db', db);

  // Setup Server Middleware
  app.use(helmet());
  app.use(cors());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Setting up auth
  app.use(
    jwt({
      algorithms: ['HS256'],
      credentialsRequired: false,
      secret: config.jwt.secret,
    }),
  );

  app.use(function AuthErrorCheck(
    err: { name: string },
    _req: unknown,
    _res: unknown,
    next: () => unknown,
  ) {
    if (err.name === 'UnauthorizedError') {
      next();
    }
  });

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
