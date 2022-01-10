import bcrypt from 'bcrypt';
import { Collection, Db, Document, Filter } from 'mongodb';

import { config } from '../../config';
import { getCollection } from '../../helpers/database';
import { createUserModel } from '../../models';

interface ICreateUserInput {
  email: string;
  name: string;
  password: string;
}

export function sanitizeUser(user: IUser) {
  user.hashedPassword = '';

  return user;
}

export const getUserCollectionFromDatabase = (db: Db) =>
  getCollection('users', db);

export async function createUser(userInput: ICreateUserInput) {
  const { email, name, password } = userInput;

  const hashedPassword = await bcrypt.hash(password, config.auth.saltRounds);

  return createUserModel({
    confirmedAt: null,
    email,
    hashedPassword,
    lastActivity: new Date(),
    name,
  });
}

export async function getUser(
  filter: Filter<Document>,
  collection: Collection,
) {
  const user = await collection.findOne<IUser>(filter);

  if (!user) {
    return null;
  }

  return createUserModel(user);
}

export async function getUserByEmail(email: string, collection: Collection) {
  return getUser({ email }, collection) as Promise<IUser>;
}

export async function insertUser(user: IUser, collection: Collection) {
  return collection.insertOne(user);
}

export async function updateUser(
  filter: Filter<Document>,
  user: IUser,
  collection: Collection,
) {
  return collection.updateOne(filter, { $set: user });
}

export async function saveUser(
  user: IUser,
  collection: Collection,
  operation: 'insert' | 'update' = 'update',
) {
  if (operation === 'insert') {
    const operationResult = await insertUser(user, collection);
    user._id = operationResult.insertedId;
  } else {
    await updateUser({ _id: user._id }, user, collection);
  }

  return user;
}
