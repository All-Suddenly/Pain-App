import bcrypt from 'bcrypt';
import { Db } from 'mongodb';

import { getUserCollection } from '../../helpers/database';
import { generateToken } from '../../helpers/jwt/generateToken';
import { getUserByEmail } from '../users';

export async function login(email: string, password: string, database: Db) {
  const userCollection = getUserCollection(database);

  const userExists = await getUserByEmail(email, userCollection);

  if (!userExists) {
    throw new Error('No User Found');
  }

  const validPassword = await bcrypt.compare(password, userExists.password);

  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  //TODO: Generate a persistent ID

  const token = await generateToken(userExists);

  // TODO: update user login activity

  return {
    token,
    user: userExists,
  };
}
