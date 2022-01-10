import { Db } from 'mongodb';

import { createHashFromToken } from '../../helpers/auth';
import { generateToken } from '../../helpers/jwt/generateToken';
import {
  getTokenByHashedToken,
  getTokenCollectionFromDatabase,
  saveToken,
} from '../tokens';
import { getUser, getUserCollectionFromDatabase, saveUser } from '../users';

export async function confirmUserByToken(token: string, database: Db) {
  const hashLookupKey = createHashFromToken(token);
  const tokenCollection = getTokenCollectionFromDatabase(database);

  const savedToken = await getTokenByHashedToken(
    hashLookupKey,
    tokenCollection,
  );

  if (!savedToken || savedToken.deletedAt) {
    throw new Error('Invalid token');
  }

  const { userId } = savedToken;

  const userCollection = getUserCollectionFromDatabase(database);

  const user = await getUser({ _id: userId }, userCollection);

  if (!user || user.deletedAt) {
    throw new Error('Invalid user');
  }

  if (user.confirmedAt) {
    throw new Error('User already confirmed');
  }

  savedToken.deletedAt = new Date();
  await saveToken(savedToken, tokenCollection, 'update');

  user.confirmedAt = new Date();
  user.lastActivity = new Date();

  await saveUser(user, userCollection, 'update');

  const jwtToken = await generateToken(user);

  return {
    token: jwtToken,
    user,
  };
}
