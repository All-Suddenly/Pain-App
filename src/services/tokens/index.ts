import { Collection, Db } from 'mongodb';

import { createTokenModel, CreateTokenModelInput } from '../../models';

export function getTokenCollectionFromDatabase(database: Db) {
  return database.collection('tokens');
}

export function createTokenForUser(type: TokenType) {
  const tokenType = type.toString();

  return tokenType;
}

export function createToken(tokenInput: CreateTokenModelInput) {
  const { token, userId, type } = tokenInput;

  return createTokenModel({
    token,
    userId,
    type,
  });
}

export async function saveToken(token: IToken, collection: Collection) {
  const operationResult = await collection.insertOne(token);

  token._id = operationResult.insertedId;

  return token;
}

// createToken({
//   token: '',
//   type: TokenType.RESET,
//   userId: '',
// });
