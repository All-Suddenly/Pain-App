import bcrypt from 'bcrypt';
import { Db } from 'mongodb';

import { config } from '../../config';
import { generateToken } from '../../helpers/jwt/generateToken';
import { userSchema } from '../../helpers/validation';
import {
  createUser,
  getUserByEmail,
  getUserCollectionFromDatabase,
} from '../users';

export async function registerUserByEmail(
  name: string,
  email: string,
  password: string,
  database: Db,
) {
  const userCollection = getUserCollectionFromDatabase(database);

  const userExists = await getUserByEmail(email, userCollection);

  if (userExists) {
    throw new Error('Email already taken');
  }

  // TODO: User Model Service
  const user: Partial<IUser> = {
    _id: '',
    name,
    email,
    password: await bcrypt.hash(password, config.auth.saltRounds),
  };

  const newUserId = await createUser(user, userCollection);

  // TODO SEND CONFIRMATION EMAIL

  user._id = newUserId;
  user.password = '';

  const newtoken = await generateToken(user as IUser);

  return {
    token: newtoken,
    user,
  };
}
