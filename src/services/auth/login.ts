import bcrypt from 'bcrypt';
import { Db } from 'mongodb';

import { generateToken } from '../../helpers/jwt/generateToken';
import { getUserByEmail, getUserCollectionFromDatabase } from '../users';

export async function loginUserByEmail(
  email: string,
  password: string,
  database: Db,
) {
  const userCollection = getUserCollectionFromDatabase(database);

  const userExists = await getUserByEmail(email, userCollection);

  if (!userExists) {
    throw new Error('No User Found');
  }

  if (!userExists?.confirmedAt) {
    throw new Error('Unconfirmed');
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
