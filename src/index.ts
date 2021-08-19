import 'dotenv/config';

import express, { response } from 'express';
import { Document, MongoClient, ObjectId } from 'mongodb';

const { MONGO_DB_NAME = '', MONGO_URL = ""  } = process.env;

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


  app.get('*', async (req, res) => {
    const { id = '' } = req.query;

    let user: Document | undefined;

    if (id) {
      user = await collection.findOne({ _id: new ObjectId(String(id)) });
    }

    return res.type('html').status(200).end(`<!DOCTYPE html>

    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div><h1>Hello ${user?.name || "World"}!</h1></div>
    </body>
    </html>`)
  });

  app.listen(3000, () => {
    console.log("The server is listenting");
  });
}


startServer().then().catch(error => console.log(error));
