import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res) => {
  return res.json({ data: 'YES' });
});

export const AuthRoutes = router;
