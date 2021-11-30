import { Collection, Db, Document, Filter, ObjectId } from 'mongodb';

import { createHashFromToken } from '../../helpers/auth';
import { createTokenModel } from '../../models';

interface ICreateTokenInput {
  token: string;
  userId: ObjectId;
  type: TokenType;
}

export function getTokenCollectionFromDatabase(database: Db) {
  return database.collection('tokens');
}

export function createToken(tokenInput: ICreateTokenInput) {
  const { token, userId, type } = tokenInput;

  const hashedToken = createHashFromToken(token);

  return createTokenModel({
    hashedToken,
    userId,
    type,
  });
}

export async function getToken(
  filter: Filter<Document>,
  collection: Collection,
) {
  const token = await collection.findOne<IToken>(filter);

  if (!token) {
    return null;
  }

  return createTokenModel(token);
}

export async function getTokens(
  filter: Filter<Document>,
  collection: Collection,
) {
  const tokens = await collection.find<IToken>(filter).toArray();

  return tokens.map(createTokenModel);
}

export function createTokenForUser(type: TokenType) {
  const tokenType = type.toString();

  return tokenType;
}

export async function insertToken(token: IToken, collection: Collection) {
  return collection.insertOne(token);
}

export async function updateToken(
  filter: Filter<Document>,
  update: Partial<IToken>,
  collection: Collection,
) {
  return collection.updateOne(filter, { $set: update });
}

export async function updateTokens(
  filter: Filter<Document>,
  update: Partial<IToken>,
  collection: Collection,
) {
  return collection.updateMany(filter, { $set: update });
}

export async function saveToken(
  token: IToken,
  collection: Collection,
  operation: 'insert' | 'update' = 'update',
) {
  if (operation === 'insert') {
    const operationResult = await insertToken(token, collection);
    token._id = operationResult.insertedId;
  } else {
    await updateToken({ _id: token._id }, token, collection);
  }

  return token;
}

export async function getTokenByHashedToken(
  hashedToken: string,
  collection: Collection,
) {
  return getToken({ hashedToken }, collection);
}

// createToken({
//   token: '',
//   type: TokenType.RESET,
//   userId: '',
// });
