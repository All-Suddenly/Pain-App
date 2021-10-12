import { Router } from 'express';

import { getDatabaseFromRequest, getUserCollection } from '../helpers/database';

export const UsersRoutes = Router();

// Users
UsersRoutes.get('/', async (req, res) => {
  const collection = getUserCollection(getDatabaseFromRequest(req));
  const users = await collection
    .find({}, { sort: { email: 1 }, projection: { password: 0 } })
    .toArray();

  return res.json(users);
});
