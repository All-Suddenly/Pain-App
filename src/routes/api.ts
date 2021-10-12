import { Router } from 'express';

import { AuthRoutes } from './auth';
import { UsersRoutes } from './users';

const router = Router();

// Trackers
router.get('/trackers', async (req, res) => {
  return res.json(['Yes', 'No']);
});

router.use('/users', UsersRoutes);
router.use('/auth', AuthRoutes);

export const APIRoutes = router;
