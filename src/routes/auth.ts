import { Request, Router } from 'express';
import { string } from 'yup/lib/locale';

import { login } from '../services/auth';
import { register } from '../services/auth/register';

const router = Router();

interface ILoginBody {
  email: string;
  password: string;
}

interface IRegisterBody {
  email: string;
  name: string;
  password: string;
}

router.post('/login', async (req: Request<any, any, ILoginBody>, res, next) => {
  const database = req.app.get('db');
  const { email, password } = req.body;

  login(email, password, database)
    .then((user) => res.send({ ...user }))
    .catch(next);
});

router.post(
  '/register',
  async (req: Request<any, any, IRegisterBody>, res, next) => {
    const database = req.app.get('db');
    const { email, name, password } = req.body;

    register(name, email, password, database)
      .then((user) => res.send({ ...user }))
      .catch(next);
  },
);

export const AuthRoutes = router;
