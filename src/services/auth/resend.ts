import { Db, ObjectId } from 'mongodb';

import { generateUUID } from '../../helpers/auth';
import { createTemplateEmail, sendEmail, TEMPLATES_IDS } from '../email';
import {
  createToken,
  getTokenCollectionFromDatabase,
  getTokens,
  saveToken,
  updateTokens,
} from '../tokens';
import { getUserByEmail, getUserCollectionFromDatabase } from '../users';

export async function resendTokenByEmail(email: string, database: Db) {
  const tokenCollection = getTokenCollectionFromDatabase(database);
  const userCollection = getUserCollectionFromDatabase(database);

  // user checks
  const user = await getUserByEmail(email, userCollection);

  if (!user || user.deletedAt) {
    throw new Error('User not found');
  }

  if (user.confirmedAt) {
    throw new Error('User already confirmed');
  }

  // invalidate all tokens
  const currentTokens = await getTokens(
    { userId: user._id, deletedAt: null },
    tokenCollection,
  );
  const currentTokensIds = currentTokens.map((token) => token._id);

  await updateTokens(
    { _id: { $in: currentTokensIds } },
    { deletedAt: new Date() },
    tokenCollection,
  );

  // create new token
  const token = generateUUID();
  const tokenDBObject = createToken({
    token,
    type: TokenType.CONFIRM,
    userId: new ObjectId(user._id),
  });

  await saveToken(tokenDBObject, tokenCollection, 'insert');

  // send confirmation email
  const resendConfirmEmail = createTemplateEmail(
    TEMPLATES_IDS.RESEND_CONFIRMATION,
    [{ email }],
    {
      NAME: user.name,
      TOKEN: token,
      URL: 'http://localhost:3000/account/confirm?token=',
    },
  );

  const sentEmailResults = await sendEmail(resendConfirmEmail);

  return {
    status: 'Success',
    statusCode: sentEmailResults?.response?.statusCode,
  };
}
