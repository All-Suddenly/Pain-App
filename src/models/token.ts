import { createMeta } from '../helpers/models';

export type CreateTokenModelInput = CopyWithPartial<IToken, keyof IBaseMeta>;

export function createTokenModel({
  userId,
  hashedToken,
  type,
  ...meta
}: CreateTokenModelInput): IToken {
  return {
    ...createMeta(),
    ...meta,
    hashedToken,
    userId,
    type,
  };
}

// createTokenModel({ userId: '', token: '' });
