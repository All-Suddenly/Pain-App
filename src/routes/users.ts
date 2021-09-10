import { Request, Router } from 'express';

import { getCollectionFromRequest } from './api';

export const UsersRoutes = Router();

// Route Helper Functions
export const getUserCollection = (req: Request) =>
  getCollectionFromRequest('users', req);

// Users
UsersRoutes.get('/', async (req, res) => {
  const collection = getUserCollection(req);
  const users = await collection.find().toArray();

  return res.json(users);
});

UsersRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.query;
  const collection = getUserCollection(req);

  const newUser = await collection.insertOne({
    name,
    email,
    password,
  });

  return res.json(newUser);
});
