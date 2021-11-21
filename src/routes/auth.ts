import { Request, Router } from 'express';

import {
  confirmUserByToken,
  loginUserByEmail,
  registerUserByEmail,
} from '../services/auth';

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

interface IConfirmParams {
  token: string;
}

router.post('/login', async (req: Request<any, any, ILoginBody>, res, next) => {
  const database = req.app.get('db');
  const { email, password } = req.body;

  loginUserByEmail(email.toLowerCase(), password, database)
    .then((user) => res.send({ ...user }))
    .catch(next);
});

router.post(
  '/register',
  async (req: Request<any, any, IRegisterBody>, res, next) => {
    const database = req.app.get('db');
    const { email, name, password } = req.body;

    registerUserByEmail(name, email.toLowerCase(), password, database)
      .then((user) => res.send({ ...user }))
      .catch(next);
  },
);

// LOCALHOST:3000/CONFIRM?token=123456789

// LOCALHOST:4000/API/V1/AUTH/123456789

router.post(
  '/confirm/:token',
  async (req: Request<IConfirmParams>, res, next) => {
    const database = req.app.get('db');
    const { token } = req.params;

    confirmUserByToken(token, database)
      .then((user) => res.send({ ...user }))
      .catch(next);
  },
);

export const AuthRoutes = router;
