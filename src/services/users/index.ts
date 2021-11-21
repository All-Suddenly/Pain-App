import bcrypt from 'bcrypt';
import { Collection, Db } from 'mongodb';

import { config } from '../../config';
import { getCollection } from '../../helpers/database';
import { createUserModel, CreateUserModelInput } from '../../models';

export function sanitizeUser(user: IUser) {
  user.password = '';

  return user;
}

export const getUserCollectionFromDatabase = (db: Db) =>
  getCollection('users', db);

export async function getUserByEmail(email: string, collection: Collection) {
  // TODO filter out password
  return collection.findOne({ email }) as Promise<IUser>;
}

export async function createUser(userInput: CreateUserModelInput) {
  const { email, name, password } = userInput;

  const hashedPassword = await bcrypt.hash(password, config.auth.saltRounds);

  return createUserModel({
    name,
    email,
    password: hashedPassword,
    confirmedAt: null,
    lastActivity: new Date(),
  });
}

export async function saveUser(user: IUser, collection: Collection) {
  const operationResult = await collection.insertOne(user);

  user._id = operationResult.insertedId;

  return user;
}
