import bcrypt from 'bcrypt';
import { Db } from 'mongodb';

import { generateToken } from '../../helpers/jwt/generateToken';
import {
  getUserByEmail,
  getUserCollectionFromDatabase,
  saveUser,
} from '../users';

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

  const validPassword = await bcrypt.compare(
    password,
    userExists.hashedPassword,
  );

  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  if (!userExists?.confirmedAt) {
    throw new Error('Unconfirmed');
  }

  //TODO: Generate a persistent ID

  userExists.lastActivity = new Date();

  await saveUser(userExists, userCollection, 'update');

  const token = await generateToken(userExists);

  return {
    token,
    user: userExists,
  };
}
