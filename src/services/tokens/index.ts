import { Collection, Db, Document, Filter } from 'mongodb';

import { createTokenModel, CreateTokenModelInput } from '../../models';

export function getTokenCollectionFromDatabase(database: Db) {
  return database.collection('tokens');
}

export function createToken(tokenInput: CreateTokenModelInput) {
  const { hashedToken, userId, type } = tokenInput;

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

export function createTokenForUser(type: TokenType) {
  const tokenType = type.toString();

  return tokenType;
}

export async function insertToken(token: IToken, collection: Collection) {
  return collection.insertOne(token);
}

export async function updateToken(
  filter: Filter<Document>,
  update: IToken,
  collection: Collection,
) {
  return collection.updateOne(filter, { $set: update });
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
