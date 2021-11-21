import { createMeta } from '../helpers/models';

export type CreateUserModelInput = CopyWithPartial<IUser, keyof IBaseMeta>;

export function createUserModel({
  name,
  email,
  password,
  confirmedAt,
  lastActivity,
  ...meta
}: CreateUserModelInput): IUser {
  return {
    ...createMeta(),
    ...meta,
    name,
    email,
    password,
    confirmedAt,
    lastActivity,
  };
}

// createUserModel({
//   name: 'John Doe',
//   email: 'example@gmail.com',
//   password: '123456',
//   confirmedAt: new Date(),
//   lastActivity: new Date(),
// });
