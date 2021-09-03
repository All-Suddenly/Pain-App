import 'dotenv/config';

import path from 'path';

import cors from 'cors';
import express, { response } from 'express';
import { MongoClient } from 'mongodb';

const { MONGO_DB_NAME = '', MONGO_URL = '', PORT = 4000 } = process.env;

const databaseUrl = MONGO_URL;
const dbClient = new MongoClient(databaseUrl);

const databaseName = MONGO_DB_NAME;
const app = express();

async function startServer() {
  await dbClient.connect();
  console.log('Connected successfully to the mongo database');

  const db = dbClient.db(databaseName);
  const collection = db.collection('users');

  app.use(cors());

  // Delay server responses for a second
  app.use((req, res, next) => {
    setTimeout(() => {
      return next();
    }, 1000);
  });

  app.get('/api/trackers', async (req, res) => {
    return res.json(['Yes', 'No']);
  });

  app.get('/api/users', async (req, res) => {
    const users = await collection.find().toArray();

    return res.json(users);
  });

  app.post('/api/users', async (req) => {
    const { name, email, password } = req.query;

    const newUser = await collection.insertOne({
      name,
      email,
      password,
    });

    return response.json(newUser);
  });

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

  app.listen(PORT, () => {
    console.log(`The server is listenting on: http://localhost:${PORT}`);
  });
}

startServer()
  .then()
  .catch((error) => console.log(error));
