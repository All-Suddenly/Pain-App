import { createMeta } from '../helpers/models';

export type CreateUserModelInput = CopyWithPartial<IUser, keyof IBaseMeta>;

export function createUserModel({
  confirmedAt,
  email,
  hashedPassword,
  lastActivity,
  name,
  ...meta
}: CreateUserModelInput): IUser {
  return {
    ...createMeta(),
    ...meta,
    confirmedAt,
    email,
    hashedPassword,
    lastActivity,
    name,
  };
}

// createUserModel({
//   name: 'John Doe',
//   email: 'example@gmail.com',
//   password: '123456',
//   confirmedAt: new Date(),
//   lastActivity: new Date(),
// });
