import { Db, ObjectId } from 'mongodb';

import { generateUUID } from '../../helpers/auth';
import { createTemplateEmail, sendEmail, TEMPLATES_IDS } from '../email';
import {
  createToken,
  getTokenCollectionFromDatabase,
  saveToken,
} from '../tokens';
import {
  createUser,
  getUserByEmail,
  getUserCollectionFromDatabase,
  saveUser,
} from '../users';

export async function registerUserByEmail(
  name: string,
  email: string,
  password: string,
  database: Db,
) {
  const userCollection = getUserCollectionFromDatabase(database);
  const tokenCollection = getTokenCollectionFromDatabase(database);

  const userExists = await getUserByEmail(email, userCollection);

  if (userExists) {
    throw new Error('Email already taken');
  }

  const user = await createUser({
    name,
    email,
    password,
  });

  const savedUser = await saveUser(user, userCollection, 'insert');

  const token = generateUUID();
  const tokenDBObject = createToken({
    token,
    type: TokenType.CONFIRM,
    userId: new ObjectId(savedUser._id),
  });

  await saveToken(tokenDBObject, tokenCollection, 'insert');

  const welcomeConfirmEmail = createTemplateEmail(
    TEMPLATES_IDS.CONFIRMATION,
    [{ email }],
    {
      NAME: name,
      TOKEN: token,
      URL: 'http://localhost:3000/account/confirm?token=',
    },
  );

  const sentEmailResults = await sendEmail(welcomeConfirmEmail);

  return {
    status: 'Success',
    statusCode: sentEmailResults?.response?.statusCode,
  };
}
