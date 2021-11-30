import { Request, Router } from 'express';

import { userSchema } from '../helpers/validation';
import {
  confirmUserByToken,
  loginUserByEmail,
  registerUserByEmail,
  resendTokenByEmail,
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

interface IResendBody {
  email: string;
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

    try {
      userSchema.validateSync(
        {
          email,
          password,
        },
        {
          abortEarly: false,
        },
      );
    } catch (error) {
      throw new Error(`Invalid User input, ${error.errors}`);
    }

    registerUserByEmail(name, email.toLowerCase(), password, database)
      .then((user) => res.send({ ...user }))
      .catch(next);
  },
);

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

router.post(
  '/resend',
  async (req: Request<any, any, IResendBody>, res, next) => {
    const database = req.app.get('db');
    const { email } = req.body;

    resendTokenByEmail(email.toLowerCase(), database)
      .then((user) => res.send({ ...user }))
      .catch(next);
  },
);

export const AuthRoutes = router;
