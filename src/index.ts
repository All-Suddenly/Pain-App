import 'dotenv/config';

import express, { response } from 'express';
import { MongoClient } from 'mongodb';

const { MONGO_DB_NAME = '', MONGO_URL = "", PORT = 4000 } = process.env;

const databaseUrl = MONGO_URL;
const client = new MongoClient(databaseUrl);

const databaseName = MONGO_DB_NAME;
const app = express();


async function startServer() {
  await client.connect()
  console.log('Connected successfully to the mongo database');

  const db = client.db(databaseName);
  const collection = db.collection('users');

  app.get('/api/users', async (req, res) => {
    const users = await collection.find().toArray();

    return res.json(users);
  });

  app.post('/api/users', async (req, res) => {
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
    app.use(express.static('client/build'))
  
    // Serve index.html for non routed paths
    const path = require('path')
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  } else {
    app.get('*', (req, res) => {
      res.send("In development mode.")
    })
  }

  app.listen(PORT, () => {
    console.log("The server is listenting");
  });
}


startServer().then().catch(error => console.log(error));
