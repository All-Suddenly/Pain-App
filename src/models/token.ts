import { createMeta } from '../helpers/models';

export type CreateTokenModelInput = CopyWithPartial<IToken, keyof IBaseMeta>;

export function createTokenModel({
  userId,
  token,
  type,
  ...meta
}: CreateTokenModelInput): IToken {
  return {
    ...createMeta(),
    ...meta,
    token,
    userId,
    type,
  };
}

// createTokenModel({ userId: '', token: '' });
