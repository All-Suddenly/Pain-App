import bcrypt from 'bcrypt';
import { Db } from 'mongodb';

import { config } from '../../config';
import { getUserCollection } from '../../helpers/database';
import { generateToken } from '../../helpers/jwt/generateToken';
import { userSchema } from '../../helpers/validation';
import { createUser, getUserByEmail } from '../users';

export async function register(
  name: string,
  email: string,
  password: string,
  database: Db,
) {
  // lowercase email
  const userCollection = getUserCollection(database);

  const userExists = await getUserByEmail(email, userCollection);

  if (userExists) {
    throw new Error('Email already taken');
  }

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

  const user: Partial<IUser> = {
    _id: '',
    name,
    email,
    password: await bcrypt.hash(password, config.auth.saltRounds),
  };

  const newUserId = await createUser(user, userCollection);

  user._id = newUserId;
  user.password = '';

  const newtoken = await generateToken(user as IUser);

  return {
    token: newtoken,
    user,
  };
}
