import { Collection, Db } from 'mongodb';

import { getCollection } from '../../helpers/database';
import { createMeta } from '../../helpers/models';

export const getUserCollectionFromDatabase = (db: Db) =>
  getCollection('users', db);

export async function getUserByEmail(email: string, collection: Collection) {
  // TODO filter out password
  return collection.findOne({ email }) as Promise<IUser>;
}

export async function createUser(user: Partial<IUser>, collection: Collection) {
  const { email, name, password } = user;

  const newUser = await collection.insertOne({
    name,
    email,
    password,
    confirmedAt: null,
    lastActivity: new Date(),
    ...createMeta(),
    _id: undefined,
  });

  return newUser.insertedId;
}
