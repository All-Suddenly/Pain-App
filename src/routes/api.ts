import { Request, Router } from 'express';
import { Db } from 'mongodb';

import { UsersRoutes } from './users';

const router = Router();

// Route Helper Functions
export function getCollectionFromRequest(name: string, req: Request) {
  const db = req.app.get('db') as Db;
  return db.collection(name);
}

// Trackers
router.get('/trackers', async (req, res) => {
  return res.json(['Yes', 'No']);
});

router.use('/users', UsersRoutes);

export const APIRoutes = router;
