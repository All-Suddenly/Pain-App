import { Router } from 'express';

import { getUserCollection } from './users';

const router = Router();

router.post('/login', async (req, res) => {
  const collection = getUserCollection(req);
  const email = req.body.email;
  const user = await collection.findOne({ email });

  if (user) {
    delete user.password;
  }

  return res.json({ data: user });
});

export const AuthRoutes = router;
