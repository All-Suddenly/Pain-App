import { Router } from 'express';

import { getDatabaseFromRequest } from '../helpers/database';
import { getUserCollectionFromDatabase } from '../services/users';

export const UsersRoutes = Router();

// Users
UsersRoutes.get('/', async (req, res) => {
  const collection = getUserCollectionFromDatabase(getDatabaseFromRequest(req));
  const users = await collection
    .find({}, { sort: { email: 1 }, projection: { password: 0 } })
    .toArray();

  return res.json(users);
});
